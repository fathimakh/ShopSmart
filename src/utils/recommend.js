import { buildProfileVector, cosineSimilarity, scoreAgainstProfile } from './textIndex'

// A product that shares a category is usually a better suggestion than one that only
// shares a few words, so category and price closeness top up the text similarity.
const CATEGORY_BOOST = 0.25
const BRAND_BOOST = 0.08
const PRICE_WEIGHT = 0.12

function priceCloseness(a, b) {
  const highest = Math.max(a.price, b.price)
  if (!highest) return 0
  return 1 - Math.abs(a.price - b.price) / highest
}

export function getSimilarProducts(product, products, index, limit = 6) {
  return products
    .filter((candidate) => candidate.id !== product.id)
    .map((candidate) => {
      const textScore = cosineSimilarity(index, product.id, candidate.id)
      const sameCategory = candidate.category === product.category
      const sameBrand = candidate.brand === product.brand

      let score = textScore
      if (sameCategory) score += CATEGORY_BOOST
      if (sameBrand) score += BRAND_BOOST
      // Price closeness only refines products that are already related, otherwise any
      // similarly priced item from another aisle would creep into the list.
      if (textScore > 0 || sameCategory || sameBrand) {
        score += priceCloseness(product, candidate) * PRICE_WEIGHT
      }

      return { candidate, score }
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.candidate)
}

const INTEREST_WEIGHTS = {
  cart: 3,
  wishlist: 2,
  viewed: 1
}

/**
 * Builds a taste profile from what the shopper looked at, saved and added to the cart,
 * then returns the closest products they have not interacted with yet.
 */
export function getRecommendations(products, index, interests, limit = 8) {
  const seeds = []
  const seen = new Set()

  Object.entries(INTEREST_WEIGHTS).forEach(([key, weight]) => {
    const ids = interests[key] || []
    ids.forEach((id, position) => {
      seen.add(id)
      // Recent activity carries more weight than older activity.
      seeds.push({ id, weight: weight / (1 + position * 0.35) })
    })
  })

  if (!seeds.length) return []

  const profile = buildProfileVector(index, seeds)

  return products
    .filter((product) => !seen.has(product.id))
    .map((product) => ({ product, score: scoreAgainstProfile(index, product.id, profile) }))
    .filter((entry) => entry.score > 0.05)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.product)
}
