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
