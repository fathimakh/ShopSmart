import { createContext, useCallback, useContext, useMemo } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { useCatalog } from './CatalogContext'

const ShopContext = createContext(null)

const CART_KEY = 'shopsmart:cart'
const WISHLIST_KEY = 'shopsmart:wishlist'
const COMPARE_KEY = 'shopsmart:compare'
const COMPARE_LIMIT = 4

export function ShopProvider({ children }) {
  const { products } = useCatalog()
  const [cart, setCart] = useLocalStorage(CART_KEY, [])
  const [wishlist, setWishlist] = useLocalStorage(WISHLIST_KEY, [])
  const [compare, setCompare] = useLocalStorage(COMPARE_KEY, [])

  const addToCart = useCallback(
    (productId, quantity = 1) => {
      setCart((current) => {
        const existing = current.find((item) => item.id === productId)
        if (existing) {
          return current.map((item) =>
            item.id === productId ? { ...item, quantity: item.quantity + quantity } : item
          )
        }
        return [...current, { id: productId, quantity }]
      })
    },
    [setCart]
  )

  const updateQuantity = useCallback(
    (productId, quantity) => {
      if (quantity < 1) return
      setCart((current) =>
        current.map((item) => (item.id === productId ? { ...item, quantity } : item))
      )
    },
    [setCart]
  )

  const removeFromCart = useCallback(
    (productId) => setCart((current) => current.filter((item) => item.id !== productId)),
    [setCart]
  )

  const clearCart = useCallback(() => setCart([]), [setCart])

  const toggleWishlist = useCallback(
    (productId) => {
      setWishlist((current) =>
        current.includes(productId)
          ? current.filter((id) => id !== productId)
          : [...current, productId]
      )
    },
    [setWishlist]
  )

  const clearWishlist = useCallback(() => setWishlist([]), [setWishlist])

  const toggleCompare = useCallback(
    (productId) => {
      setCompare((current) => {
        if (current.includes(productId)) {
          return current.filter((id) => id !== productId)
        }
        // Four columns is the most that stays readable on a laptop screen.
        return current.length >= COMPARE_LIMIT ? current : [...current, productId]
      })
    },
    [setCompare]
  )

  const clearCompare = useCallback(() => setCompare([]), [setCompare])

  const value = useMemo(() => {
    const cartItems = cart
      .map((item) => {
        const product = products.find((entry) => entry.id === item.id)
        return product ? { ...product, quantity: item.quantity } : null
      })
      .filter(Boolean)

    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
    const savings = cartItems.reduce(
      (total, item) => total + (item.originalPrice - item.price) * item.quantity,
      0
    )

    const compareItems = compare
      .map((id) => products.find((product) => product.id === id))
      .filter(Boolean)

    const wishlistItems = wishlist
      .map((id) => products.find((product) => product.id === id))
      .filter(Boolean)

    return {
      cart,
      cartItems,
      cartCount: cart.reduce((total, item) => total + item.quantity, 0),
      subtotal,
      savings,
      isInCart: (productId) => cart.some((item) => item.id === productId),
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      wishlist,
      wishlistItems,
      wishlistCount: wishlist.length,
      isWishlisted: (productId) => wishlist.includes(productId),
      toggleWishlist,
      clearWishlist,
      compare,
      compareItems,
      compareCount: compare.length,
      compareLimit: COMPARE_LIMIT,
      isCompared: (productId) => compare.includes(productId),
      isCompareFull: compare.length >= COMPARE_LIMIT,
      toggleCompare,
      clearCompare
    }
  }, [
    cart,
    wishlist,
    compare,
    products,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    toggleWishlist,
    clearWishlist,
    toggleCompare,
    clearCompare
  ])

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}

export function useShop() {
  const context = useContext(ShopContext)
  if (!context) {
    throw new Error('useShop must be used inside a ShopProvider')
  }
  return context
}
