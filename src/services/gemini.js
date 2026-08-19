import { describeFilters } from '../utils/nlpSearch'
import { sortOptions } from '../utils/filters'

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const MODEL = 'gemini-2.5-flash'
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`
const REQUEST_TIMEOUT = 9000

const SYSTEM_PROMPT = [
  "You are a shop assistant who converts a shopper's request into catalogue filters.",
  'Only use category slugs and brand names from the lists you are given.',
  'Leave a field null when the shopper did not imply it.',
  'Keywords are the descriptive words worth matching against product text: lowercase,',
  'and without the brand or category words you already mapped.',
  'When an earlier request is included, the new message is usually a refinement of it:',
  'keep the earlier filters that the shopper has not contradicted, and change only what',
  'the new message asks for.',
  'Summary is one friendly sentence addressed to the shopper describing what you looked for.'
].join(' ')

const RESPONSE_SCHEMA = {
  type: 'object',
  properties: {
    categories: { type: 'array', items: { type: 'string' } },
    brands: { type: 'array', items: { type: 'string' } },
    minPrice: { type: 'number', nullable: true },
    maxPrice: { type: 'number', nullable: true },
    minRating: { type: 'number', nullable: true },
    onSale: { type: 'boolean' },
    sortBy: { type: 'string', enum: sortOptions.map((option) => option.value) },
    keywords: { type: 'array', items: { type: 'string' } },
    summary: { type: 'string' }
  },
  required: ['categories', 'brands', 'onSale', 'sortBy', 'keywords', 'summary']
}

export function isGeminiEnabled() {
  return Boolean(API_KEY)
}

function toPriceString(value) {
  if (typeof value !== 'number' || !Number.isFinite(value) || value <= 0) return ''
  return String(Math.round(value))
}

/**
 * The model is told which slugs exist, but its answer is still checked against the
 * real catalogue so a hallucinated category or brand can never reach the filters.
 */
function toFilters(answer, categories, brands) {
  const validCategories = (answer.categories || []).filter((category) =>
    categories.includes(category)
  )

  const validBrands = (answer.brands || [])
    .map((brand) => brands.find((known) => known.toLowerCase() === String(brand).toLowerCase()))
    .filter(Boolean)

  let minPrice = toPriceString(answer.minPrice)
  let maxPrice = toPriceString(answer.maxPrice)
  if (minPrice && maxPrice && Number(minPrice) > Number(maxPrice)) {
    ;[minPrice, maxPrice] = [maxPrice, minPrice]
  }

  const rating = Number(answer.minRating)
  const minRating = Number.isFinite(rating) && rating > 0 && rating <= 5 ? rating : 0

  return {
    categories: validCategories,
    brands: validBrands,
    minPrice,
    maxPrice,
    minRating,
    minDiscount: answer.onSale ? 10 : 0
  }
}

export async function parseQueryWithGemini(
  query,
  { categories = [], brands = [], previous = null } = {}
) {
  if (!API_KEY) {
    throw new Error('Gemini API key is not configured')
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT)

  const prompt = [
    `Categories: ${categories.join(', ')}`,
    `Brands: ${brands.join(', ')}`,
    ''
  ]

  if (previous) {
    prompt.push(`Earlier request: ${previous.query}`)
    prompt.push(`Filters used for it: ${JSON.stringify(previous.filters)}`)
    prompt.push('')
  }

  prompt.push(`Shopper message: ${query}`)

  try {
    const response = await fetch(`${ENDPOINT}?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: [{ parts: [{ text: prompt.join('\n') }] }],
        generationConfig: {
          temperature: 0.1,
          responseMimeType: 'application/json',
          responseSchema: RESPONSE_SCHEMA,
          // Latency matters more than deliberation for a search box.
          thinkingConfig: { thinkingBudget: 0 }
        }
      })
    })

    if (!response.ok) {
      throw new Error(`Gemini request failed with status ${response.status}`)
    }

    const data = await response.json()
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text
    if (!text) {
      throw new Error('Gemini returned an empty answer')
    }

    const answer = JSON.parse(text)
    const filters = toFilters(answer, categories, brands)
    const keywords = (answer.keywords || [])
      .filter((keyword) => typeof keyword === 'string')
      .flatMap((keyword) => keyword.toLowerCase().split(/\s+/))
      .filter((keyword) => keyword.length > 2)
      .slice(0, 8)

    const validSort = sortOptions.some((option) => option.value === answer.sortBy)

    return {
      filters,
      sortBy: validSort && answer.sortBy !== 'relevance' ? answer.sortBy : null,
      keywords,
      chips: describeFilters(filters, keywords),
      summary: typeof answer.summary === 'string' ? answer.summary : '',
      source: 'gemini'
    }
  } finally {
    clearTimeout(timeout)
  }
}
