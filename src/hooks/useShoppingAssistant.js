import { useCallback, useMemo, useState } from 'react'
import { useCatalog } from '../context/CatalogContext'
import useLocalStorage from './useLocalStorage'
import { isGeminiEnabled, parseQueryWithGemini } from '../services/gemini'
import { mergeWithPrevious, parseQuery, rankByRelevance } from '../utils/nlpSearch'
import { buildTextIndex } from '../utils/textIndex'
import { applyFilters, countActiveFilters, sortProducts } from '../utils/filters'
import { pluralize } from '../utils/format'

const CHAT_KEY = 'shopsmart:conversation'
const RESULTS_PER_ANSWER = 6

function createId(role) {
  return `${role}-${Date.now()}-${Math.round(Math.random() * 1000)}`
}

function fallbackReply(count) {
  if (!count) {
    return 'I could not find anything for that. Try a wider price range or a different category.'
  }
  return `Here ${count === 1 ? 'is' : 'are'} ${pluralize(count, 'product')} that fit.`
}

/**
 * Owns the assistant conversation: reads each message, turns it into filters, and
 * answers with the products that match. Gemini handles the reading when a key is
 * present, and the on-device parser covers everything else.
 */
export default function useShoppingAssistant() {
  const { products, categories, brands } = useCatalog()
  const [messages, setMessages] = useLocalStorage(CHAT_KEY, [])
  const [isThinking, setIsThinking] = useState(false)

  const textIndex = useMemo(() => buildTextIndex(products), [products])

  const lastAnswer = useMemo(
    () => [...messages].reverse().find((message) => message.role === 'assistant' && message.filters),
    [messages]
  )

  const ask = useCallback(
    async (rawQuery) => {
      const query = rawQuery.trim()
      if (!query || isThinking) return

      setMessages((current) => [...current, { id: createId('you'), role: 'user', text: query }])
      setIsThinking(true)

      const previous = lastAnswer ? { query: lastAnswer.query, filters: lastAnswer.filters } : null

      let parsed = null
      if (isGeminiEnabled()) {
        try {
          const answer = await parseQueryWithGemini(query, { categories, brands, previous })
          if (countActiveFilters(answer.filters) || answer.keywords.length) {
            parsed = answer
          }
        } catch (error) {
          parsed = null
        }
      }

      if (!parsed) {
        parsed = mergeWithPrevious(
          parseQuery(query, { categories, brands }),
          previous ? previous.filters : null
        )
      }

      const filtered = applyFilters(products, parsed.filters)
      const ranked = rankByRelevance(filtered, textIndex, parsed.keywords)
      const matches = parsed.sortBy ? sortProducts(ranked, parsed.sortBy) : ranked

      setMessages((current) => [
        ...current,
        {
          id: createId('assistant'),
          role: 'assistant',
          query,
          text: parsed.summary || fallbackReply(matches.length),
          chips: parsed.chips,
          filters: parsed.filters,
          sortBy: parsed.sortBy,
          keywords: parsed.keywords,
          source: parsed.source,
          total: matches.length,
          productIds: matches.slice(0, RESULTS_PER_ANSWER).map((product) => product.id)
        }
      ])
      setIsThinking(false)
    },
    [isThinking, lastAnswer, categories, brands, products, textIndex, setMessages]
  )

  const clear = useCallback(() => setMessages([]), [setMessages])

  const resolveProducts = useCallback(
    (ids) => ids.map((id) => products.find((product) => product.id === id)).filter(Boolean),
    [products]
  )

  return { messages, isThinking, ask, clear, resolveProducts }
}
