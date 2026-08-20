import { useCallback } from 'react'
import useLocalStorage from './useLocalStorage'

const ORDERS_KEY = 'shopsmart:orders'

// Orders live in local storage, so the history survives a refresh without a back end.
export default function useOrders() {
  const [orders, setOrders] = useLocalStorage(ORDERS_KEY, [])

  const placeOrder = useCallback(
    (order) => setOrders((current) => [order, ...current]),
    [setOrders]
  )

  const clearOrders = useCallback(() => setOrders([]), [setOrders])

  return { orders, placeOrder, clearOrders }
}
