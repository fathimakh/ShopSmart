export const defaultFilters = {
  categories: [],
  brands: [],
  minPrice: '',
  maxPrice: '',
  minRating: 0
}

export const priceBands = [
  { label: 'Under $50', minPrice: '', maxPrice: '50' },
  { label: '$50 - $200', minPrice: '50', maxPrice: '200' },
  { label: '$200 - $1000', minPrice: '200', maxPrice: '1000' },
  { label: 'Over $1000', minPrice: '1000', maxPrice: '' }
]

export const ratingOptions = [
  { label: 'Any rating', value: 0 },
  { label: '3 stars and up', value: 3 },
  { label: '4 stars and up', value: 4 },
  { label: '4.5 stars and up', value: 4.5 }
]

export function applyFilters(products, filters) {
  const min = filters.minPrice === '' ? null : Number(filters.minPrice)
  const max = filters.maxPrice === '' ? null : Number(filters.maxPrice)

  return products.filter((product) => {
    if (filters.categories.length && !filters.categories.includes(product.category)) {
      return false
    }
    if (filters.brands.length && !filters.brands.includes(product.brand)) {
      return false
    }
    if (min !== null && product.price < min) return false
    if (max !== null && product.price > max) return false
    if (filters.minRating && product.rating < filters.minRating) return false
    return true
  })
}

export function countActiveFilters(filters) {
  let count = filters.categories.length + filters.brands.length
  if (filters.minPrice !== '' || filters.maxPrice !== '') count += 1
  if (filters.minRating) count += 1
  return count
}

export function toggleValue(list, value) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value]
}

export const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'rating', label: 'Highest rated' },
  { value: 'popularity', label: 'Most popular' },
  { value: 'newest', label: 'Newest arrivals' },
  { value: 'discount', label: 'Biggest discount' }
]

export function searchProducts(products, query) {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean)
  if (!terms.length) return products

  return products.filter((product) => {
    const haystack = [product.title, product.brand, product.categoryLabel, product.description]
      .concat(product.tags)
      .join(' ')
      .toLowerCase()
    return terms.every((term) => haystack.includes(term))
  })
}

export function sortProducts(products, sortBy) {
  const sorted = [...products]

  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price)
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating)
    case 'popularity':
      // The catalogue has no sales figure, so review volume weighted by rating stands in for it.
      return sorted.sort((a, b) => b.reviewCount * b.rating - a.reviewCount * a.rating)
    case 'newest':
      return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    case 'discount':
      return sorted.sort((a, b) => b.discount - a.discount)
    default:
      return sorted
  }
}
