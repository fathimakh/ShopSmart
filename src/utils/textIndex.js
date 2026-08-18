const STOP_WORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'but', 'by', 'can', 'for', 'from', 'has', 'have',
  'i', 'in', 'is', 'it', 'its', 'me', 'my', 'of', 'on', 'or', 'show', 'some', 'that', 'the',
  'their', 'them', 'there', 'these', 'they', 'this', 'to', 'want', 'was', 'we', 'were', 'what',
  'which', 'will', 'with', 'you', 'your'
])

export function tokenize(text) {
  if (!text) return []
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((token) => token.length > 2 && !STOP_WORDS.has(token))
}

// Titles and tags describe a product far better than its marketing copy, so the
// fields are weighted before the term frequencies are counted.
const FIELD_WEIGHTS = [
  ['title', 3],
  ['brand', 2],
  ['categoryLabel', 2],
  ['tags', 2],
  ['description', 1]
]

function termCounts(product) {
  const counts = new Map()

  FIELD_WEIGHTS.forEach(([field, weight]) => {
    const value = field === 'tags' ? product.tags.join(' ') : product[field]
    tokenize(value).forEach((term) => {
      counts.set(term, (counts.get(term) || 0) + weight)
    })
  })

  return counts
}

/**
 * Builds a TF-IDF vector for every product. Rare words end up with a high weight,
 * so matching "titanium" counts for much more than matching "new".
 */
export function buildTextIndex(products) {
  const counts = products.map((product) => [product.id, termCounts(product)])
  const documentFrequency = new Map()

  counts.forEach(([, terms]) => {
    terms.forEach((_, term) => {
      documentFrequency.set(term, (documentFrequency.get(term) || 0) + 1)
    })
  })

  const total = products.length || 1
  const idf = new Map()
  documentFrequency.forEach((frequency, term) => {
    idf.set(term, Math.log((total + 1) / (frequency + 1)) + 1)
  })

  const vectors = new Map()
  const norms = new Map()

  counts.forEach(([id, terms]) => {
    const vector = new Map()
    let squaredSum = 0

    terms.forEach((count, term) => {
      const weight = (1 + Math.log(count)) * (idf.get(term) || 1)
      vector.set(term, weight)
      squaredSum += weight * weight
    })

    vectors.set(id, vector)
    norms.set(id, Math.sqrt(squaredSum) || 1)
  })

  return { vectors, norms, idf }
}

export function scoreTerms(index, productId, terms) {
  const vector = index.vectors.get(productId)
  if (!vector || !terms.length) return 0

  let score = 0
  terms.forEach((term) => {
    if (vector.has(term)) {
      score += vector.get(term)
    }
  })

  return score / index.norms.get(productId)
}

export function cosineSimilarity(index, idA, idB) {
  const vectorA = index.vectors.get(idA)
  const vectorB = index.vectors.get(idB)
  if (!vectorA || !vectorB) return 0

  // Walking the shorter vector keeps the comparison cheap on a large catalogue.
  const [shorter, longer] =
    vectorA.size < vectorB.size ? [vectorA, vectorB] : [vectorB, vectorA]

  let dot = 0
  shorter.forEach((weight, term) => {
    if (longer.has(term)) {
      dot += weight * longer.get(term)
    }
  })

  return dot / (index.norms.get(idA) * index.norms.get(idB))
}
