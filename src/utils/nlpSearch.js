import { scoreTerms, tokenize } from './textIndex'
import { titleCase } from './format'

// Everyday words shoppers use, mapped to the slugs the catalogue actually stores.
const CATEGORY_SYNONYMS = [
  { words: ['phone', 'phones', 'smartphone', 'smartphones', 'mobile', 'iphone', 'android'], categories: ['smartphones'] },
  { words: ['laptop', 'laptops', 'notebook', 'macbook', 'ultrabook'], categories: ['laptops'] },
  { words: ['tablet', 'tablets', 'ipad'], categories: ['tablets'] },
  { words: ['headphone', 'headphones', 'earphone', 'earphones', 'earbuds', 'charger', 'cable', 'powerbank'], categories: ['mobile-accessories'] },
  { words: ['watch', 'watches'], categories: ['mens-watches', 'womens-watches'] },
  { words: ['shoe', 'shoes', 'sneaker', 'sneakers', 'boots'], categories: ['mens-shoes', 'womens-shoes'] },
  { words: ['shirt', 'shirts', 'tshirt', 'top', 'tops', 'blouse'], categories: ['mens-shirts', 'tops'] },
  { words: ['dress', 'dresses', 'gown'], categories: ['womens-dresses'] },
  { words: ['bag', 'bags', 'handbag', 'purse'], categories: ['womens-bags'] },
  { words: ['jewellery', 'jewelry', 'ring', 'necklace', 'earrings'], categories: ['womens-jewellery'] },
  { words: ['sunglass', 'sunglasses', 'shades', 'goggles'], categories: ['sunglasses'] },
  { words: ['perfume', 'perfumes', 'fragrance', 'fragrances', 'cologne', 'scent'], categories: ['fragrances'] },
  { words: ['makeup', 'cosmetic', 'cosmetics', 'lipstick', 'mascara', 'beauty'], categories: ['beauty'] },
  { words: ['skincare', 'moisturiser', 'moisturizer', 'serum', 'facewash', 'cream'], categories: ['skin-care'] },
  { words: ['furniture', 'sofa', 'chair', 'table', 'bed'], categories: ['furniture'] },
  { words: ['decor', 'decoration', 'decorations', 'vase', 'painting'], categories: ['home-decoration'] },
  { words: ['kitchen', 'cookware', 'utensil', 'utensils', 'pan', 'knife'], categories: ['kitchen-accessories'] },
  { words: ['grocery', 'groceries', 'food', 'snacks', 'fruit', 'vegetables'], categories: ['groceries'] },
  { words: ['sports', 'sport', 'gym', 'fitness', 'workout', 'cricket', 'football'], categories: ['sports-accessories'] },
  { words: ['bike', 'bikes', 'motorcycle', 'motorbike', 'scooter'], categories: ['motorcycle'] },
  { words: ['car', 'cars', 'vehicle', 'vehicles'], categories: ['vehicle'] }
]

const GENDER_HINTS = [
  { words: ['women', 'womens', 'woman', 'ladies', 'female', 'girls'], prefix: 'womens-' },
  { words: ['men', 'mens', 'man', 'male', 'boys', 'gents'], prefix: 'mens-' }
]

const AMOUNT = String.raw`\$?\d[\d,]*(?:\.\d+)?k?`

const PRICE_RULES = [
  {
    pattern: new RegExp(String.raw`(?:between|from)\s+(${AMOUNT})\s*(?:and|to|-)\s*(${AMOUNT})`, 'i'),
    apply: (match) => ({ minPrice: toAmount(match[1]), maxPrice: toAmount(match[2]) })
  },
  {
    pattern: new RegExp(
      String.raw`(?:under|below|less than|cheaper than|within|upto|up to|max|maximum|budget of|not more than|no more than)\s+(${AMOUNT})`,
      'i'
    ),
    apply: (match) => ({ maxPrice: toAmount(match[1]) })
  },
  {
    pattern: new RegExp(
      String.raw`(?:over|above|more than|at least|starting at|starting from|minimum)\s+(${AMOUNT})`,
      'i'
    ),
    apply: (match) => ({ minPrice: toAmount(match[1]) })
  },
  {
    pattern: new RegExp(String.raw`(?:around|about|near|approximately|roughly|close to)\s+(${AMOUNT})`, 'i'),
    // "around 500" is treated as a 20% band on either side of the figure.
    apply: (match) => {
      const amount = toAmount(match[1])
      return { minPrice: Math.round(amount * 0.8), maxPrice: Math.round(amount * 1.2) }
    }
  }
]

const RATING_RULES = [
  {
    pattern: /(?:rated|rating)\s*(?:of|above|over|more than|at least|greater than)?\s*(\d(?:\.\d)?)/i,
    apply: (match) => Number(match[1])
  },
  { pattern: /(\d(?:\.\d)?)\s*\+?\s*stars?/i, apply: (match) => Number(match[1]) },
  { pattern: /top rated|best rated|highest rated|highly rated|well reviewed|great reviews/i, apply: () => 4.5 },
  { pattern: /good reviews|good rating|decent rating|reliable/i, apply: () => 4 }
]

const SORT_RULES = [
  { pattern: /cheapest|lowest price|least expensive|most affordable/i, sortBy: 'price-asc' },
  { pattern: /most expensive|highest price|premium|luxury/i, sortBy: 'price-desc' },
  { pattern: /top rated|best rated|highest rated|highly rated/i, sortBy: 'rating' },
  { pattern: /popular|trending|best selling|bestseller|most reviewed/i, sortBy: 'popularity' },
  { pattern: /newest|latest|new arrival|new arrivals|recent/i, sortBy: 'newest' },
  { pattern: /biggest discount|best deal|best deals|highest discount/i, sortBy: 'discount' }
]

const DEAL_PATTERN = /on sale|sale|discount|discounted|deal|deals|offer|offers|bargain/i

function toAmount(raw) {
  const clean = String(raw).replace(/[$,]/g, '').toLowerCase()
  const value = parseFloat(clean)
  return clean.endsWith('k') ? value * 1000 : value
}

function matchGender(text) {
  return GENDER_HINTS.find((hint) => hint.words.some((word) => new RegExp(`\\b${word}\\b`, 'i').test(text)))
}

function matchCategories(text, availableCategories) {
  const found = new Set()

  CATEGORY_SYNONYMS.forEach((entry) => {
    const hit = entry.words.some((word) => new RegExp(`\\b${word}\\b`, 'i').test(text))
    if (hit) {
      entry.categories.forEach((category) => found.add(category))
    }
  })

  // Also accept the raw slug wording, for example "home decoration".
  availableCategories.forEach((category) => {
    if (new RegExp(`\\b${category.replace(/-/g, '[ -]')}\\b`, 'i').test(text)) {
      found.add(category)
    }
  })

  const gender = matchGender(text)
  if (gender) {
    const narrowed = [...found].filter((category) => category.startsWith(gender.prefix))
    if (narrowed.length) return narrowed
  }

  return [...found].filter((category) => availableCategories.includes(category))
}

function matchBrands(text, availableBrands) {
  return availableBrands.filter((brand) =>
    new RegExp(`\\b${brand.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i').test(text)
  )
}

/**
 * Turns a sentence such as "cheap wireless headphones under $50 rated above 4"
 * into the same filter object the sidebar produces, plus the keywords used for
 * relevance ranking.
 */
export function parseQuery(query, { categories = [], brands = [] } = {}) {
  const text = query.trim()
  const result = {
    filters: { categories: [], brands: [], minPrice: '', maxPrice: '', minRating: 0, minDiscount: 0 },
    sortBy: null,
    keywords: [],
    chips: [],
    source: 'device'
  }

  if (!text) return result

  let remaining = text

  PRICE_RULES.forEach((rule) => {
    if (result.filters.minPrice !== '' || result.filters.maxPrice !== '') return
    const match = remaining.match(rule.pattern)
    if (!match) return

    const { minPrice, maxPrice } = rule.apply(match)
    if (minPrice !== undefined) result.filters.minPrice = String(minPrice)
    if (maxPrice !== undefined) result.filters.maxPrice = String(maxPrice)
    remaining = remaining.replace(match[0], ' ')
  })

  RATING_RULES.some((rule) => {
    const match = remaining.match(rule.pattern)
    if (!match) return false
    const rating = rule.apply(match)
    if (rating > 0 && rating <= 5) {
      result.filters.minRating = rating
      remaining = remaining.replace(match[0], ' ')
      return true
    }
    return false
  })

  if (DEAL_PATTERN.test(text)) {
    result.filters.minDiscount = 10
  }

  const sortRule = SORT_RULES.find((rule) => rule.pattern.test(text))
  if (sortRule) {
    result.sortBy = sortRule.sortBy
  }

  result.filters.categories = matchCategories(text, categories)
  result.filters.brands = matchBrands(text, brands)

  const consumedWords = new Set(
    GENDER_HINTS.flatMap((hint) => hint.words).concat([
      'cheap', 'cheapest', 'affordable', 'expensive', 'premium', 'best', 'good', 'top', 'rated',
      'rating', 'stars', 'star', 'reviews', 'popular', 'trending', 'newest', 'latest', 'deal',
      'deals', 'offer', 'offers', 'sale', 'discount', 'discounted', 'under', 'below', 'above',
      'over', 'between', 'around', 'about', 'price', 'budget', 'looking', 'need', 'find', 'buy',
      'something', 'anything', 'products', 'product', 'items', 'item'
    ])
  )

  result.keywords = tokenize(remaining)
    .filter((token) => !consumedWords.has(token))
    .filter((token) => !/^\d+$/.test(token))

  result.chips = describeFilters(result.filters, result.keywords)

  return result
}

/**
 * Turns a filter object into the short chips shown under the search box, so the
 * shopper can see exactly how their sentence was read.
 */
export function describeFilters(filters, keywords = []) {
  const chips = []

  if (filters.categories.length) {
    chips.push(`In ${filters.categories.map(titleCase).join(', ')}`)
  }
  if (filters.brands.length) {
    chips.push(`Brand: ${filters.brands.join(', ')}`)
  }
  if (filters.minPrice !== '' && filters.maxPrice !== '') {
    chips.push(`$${filters.minPrice} to $${filters.maxPrice}`)
  } else if (filters.maxPrice !== '') {
    chips.push(`Under $${filters.maxPrice}`)
  } else if (filters.minPrice !== '') {
    chips.push(`Over $${filters.minPrice}`)
  }
  if (filters.minRating) {
    chips.push(`${filters.minRating} stars and up`)
  }
  if (filters.minDiscount) {
    chips.push('On discount')
  }
  if (keywords.length) {
    chips.push(`Matching "${keywords.join(' ')}"`)
  }

  return chips
}

/**
 * Orders products by how strongly they match the keywords left over after parsing.
 * Products with no keyword overlap are dropped, unless nothing matched at all.
 */
export function rankByRelevance(products, index, keywords) {
  if (!keywords.length) return products

  const scored = products.map((product) => ({
    product,
    score: scoreTerms(index, product.id, keywords)
  }))

  const matched = scored.filter((entry) => entry.score > 0)
  const pool = matched.length ? matched : scored

  return pool.sort((a, b) => b.score - a.score).map((entry) => entry.product)
}
