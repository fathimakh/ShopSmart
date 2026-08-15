import fallbackProducts from './fallbackProducts'
import { titleCase } from '../utils/format'

const API_URL = 'https://dummyjson.com/products?limit=0'
const REQUEST_TIMEOUT = 10000

// The API returns the already discounted price, so the pre-discount figure has to be
// rebuilt to show a struck-through original price on the card.
function originalPrice(price, discountPercentage) {
  if (!discountPercentage) return price
  return Math.round((price / (1 - discountPercentage / 100)) * 100) / 100
}

function normalizeProduct(raw) {
  const reviews = raw.reviews || []

  return {
    id: raw.id,
    title: raw.title,
    description: raw.description,
    brand: raw.brand || 'Generic',
    category: raw.category,
    categoryLabel: titleCase(raw.category),
    price: raw.price,
    originalPrice: originalPrice(raw.price, raw.discountPercentage),
    discount: Math.round(raw.discountPercentage || 0),
    rating: raw.rating,
    reviews,
    reviewCount: reviews.length,
    stock: raw.stock,
    availability: raw.availabilityStatus,
    tags: raw.tags || [],
    thumbnail: raw.thumbnail,
    images: raw.images && raw.images.length ? raw.images : [raw.thumbnail],
    createdAt: raw.meta ? raw.meta.createdAt : null,
    specs: {
      SKU: raw.sku,
      Weight: `${raw.weight} g`,
      Dimensions: raw.dimensions
        ? `${raw.dimensions.width} x ${raw.dimensions.height} x ${raw.dimensions.depth} cm`
        : 'Not specified',
      Warranty: raw.warrantyInformation,
      Shipping: raw.shippingInformation,
      Returns: raw.returnPolicy,
      'Minimum order': `${raw.minimumOrderQuantity} unit(s)`
    }
  }
}

export async function fetchProducts() {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT)

  try {
    const response = await fetch(API_URL, { signal: controller.signal })
    if (!response.ok) {
      throw new Error(`Catalogue request failed with status ${response.status}`)
    }
    const data = await response.json()
    return data.products.map(normalizeProduct)
  } finally {
    clearTimeout(timeout)
  }
}

export function getFallbackProducts() {
  return fallbackProducts.map(normalizeProduct)
}
