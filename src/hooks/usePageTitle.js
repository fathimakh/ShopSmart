import { useEffect } from 'react'

const BASE_TITLE = 'ShopSmart'

export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | ${BASE_TITLE}` : `${BASE_TITLE} | AI Shopping Assistant`
    return () => {
      document.title = `${BASE_TITLE} | AI Shopping Assistant`
    }
  }, [title])
}
