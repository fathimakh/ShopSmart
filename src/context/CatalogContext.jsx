import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { fetchProducts, getFallbackProducts } from '../services/api'

const CatalogContext = createContext(null)

export function CatalogProvider({ children }) {
  const [products, setProducts] = useState([])
  const [status, setStatus] = useState('loading')
  const [usingOfflineData, setUsingOfflineData] = useState(false)

  const loadCatalogue = useCallback(async () => {
    setStatus('loading')
    try {
      const data = await fetchProducts()
      setProducts(data)
      setUsingOfflineData(false)
      setStatus('ready')
    } catch (error) {
      // Keep the store usable when the API is unreachable rather than showing a dead page.
      setProducts(getFallbackProducts())
      setUsingOfflineData(true)
      setStatus('ready')
    }
  }, [])

  useEffect(() => {
    loadCatalogue()
  }, [loadCatalogue])

  const value = useMemo(() => {
    const categories = [...new Set(products.map((product) => product.category))].sort()
    const brands = [...new Set(products.map((product) => product.brand))].sort()
    const prices = products.map((product) => product.price)

    return {
      products,
      status,
      usingOfflineData,
      categories,
      brands,
      priceRange: {
        min: prices.length ? Math.floor(Math.min(...prices)) : 0,
        max: prices.length ? Math.ceil(Math.max(...prices)) : 0
      },
      reload: loadCatalogue
    }
  }, [products, status, usingOfflineData, loadCatalogue])

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>
}

export function useCatalog() {
  const context = useContext(CatalogContext)
  if (!context) {
    throw new Error('useCatalog must be used inside a CatalogProvider')
  }
  return context
}
