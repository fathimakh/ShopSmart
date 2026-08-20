import { useCallback, useRef, useState } from 'react'

function read(key, fallback) {
  try {
    const stored = window.localStorage.getItem(key)
    return stored ? JSON.parse(stored) : fallback
  } catch (error) {
    return fallback
  }
}

/**
 * State that is written to local storage as soon as it changes.
 *
 * The write happens in the setter rather than in an effect on purpose: a component
 * that saves something and navigates away in the same click would unmount before an
 * effect could run, and the value would be lost.
 */
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => read(key, initialValue))
  const latest = useRef(value)
  latest.current = value

  const update = useCallback(
    (next) => {
      const resolved = typeof next === 'function' ? next(latest.current) : next
      latest.current = resolved

      try {
        window.localStorage.setItem(key, JSON.stringify(resolved))
      } catch (error) {
        // Storage can be full or blocked in private mode; the app still works without it.
      }

      setValue(resolved)
    },
    [key]
  )

  return [value, update]
}
