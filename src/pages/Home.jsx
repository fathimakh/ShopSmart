import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FiSliders } from 'react-icons/fi'
import { useCatalog } from '../context/CatalogContext'
import { useShop } from '../context/ShopContext'
import Hero from '../components/Hero/Hero'
import CategoryTiles from '../components/CategoryTiles/CategoryTiles'
import ActiveFilters from '../components/ActiveFilters/ActiveFilters'
import FilterPanel from '../components/FilterPanel/FilterPanel'
import ProductGrid from '../components/ProductGrid/ProductGrid'
import SearchBar from '../components/SearchBar/SearchBar'
import AiSearchPanel from '../components/AiSearchPanel/AiSearchPanel'
import RecommendationRow from '../components/RecommendationRow/RecommendationRow'
import EmptyState from '../components/EmptyState/EmptyState'
import useDebounce from '../hooks/useDebounce'
import { buildTextIndex } from '../utils/textIndex'
import { rankByRelevance } from '../utils/nlpSearch'
import { getRecommendations } from '../utils/recommend'
import {
  applyFilters,
  countActiveFilters,
  defaultFilters,
  searchProducts,
  sortOptions,
  sortProducts
} from '../utils/filters'
import { pluralize } from '../utils/format'
import './Home.css'

function Home() {
  const { products, status, usingOfflineData, categories, brands } = useCatalog()
  const { recentlyViewed, wishlist, cart } = useShop()
  const [filters, setFilters] = useState(defaultFilters)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [sortBy, setSortBy] = useState('featured')
  const [aiSearch, setAiSearch] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()
  const debouncedQuery = useDebounce(query)

  const isLoading = status === 'loading'
  const activeFilterCount = countActiveFilters(filters)

  // Building the index once per catalogue keeps every later search cheap.
  const textIndex = useMemo(() => buildTextIndex(products), [products])

  const visibleProducts = useMemo(() => {
    const filtered = applyFilters(products, filters)
    const matches = aiSearch
      ? rankByRelevance(filtered, textIndex, aiSearch.keywords)
      : searchProducts(filtered, debouncedQuery)

    return sortBy === 'relevance' ? matches : sortProducts(matches, sortBy)
  }, [products, filters, debouncedQuery, sortBy, aiSearch, textIndex])

  // A representative image and a count for every category tile.
  const categoryTiles = useMemo(
    () =>
      categories.map((category) => {
        const inCategory = products.filter((product) => product.category === category)
        const best = inCategory.reduce(
          (top, product) => (product.rating > top.rating ? product : top),
          inCategory[0]
        )
        return { category, count: inCategory.length, thumbnail: best.thumbnail }
      }),
    [categories, products]
  )

  const featured = useMemo(
    () => [...products].sort((a, b) => b.discount - a.discount || b.rating - a.rating).slice(0, 3),
    [products]
  )

  const deals = useMemo(
    () => sortProducts(products, 'discount').slice(0, 8),
    [products]
  )

  const recommendations = useMemo(
    () =>
      getRecommendations(products, textIndex, {
        viewed: recentlyViewed,
        wishlist,
        cart: cart.map((item) => item.id)
      }),
    [products, textIndex, recentlyViewed, wishlist, cart]
  )

  // The assistant page does the reading. Its answer arrives here through router state
  // when the shopper asks to see the results in the full shop.
  useEffect(() => {
    const handoff = location.state?.aiSearch
    if (!handoff) return

    setAiSearch(handoff)
    setFilters({ ...defaultFilters, ...handoff.filters })
    setSortBy(handoff.sortBy || 'relevance')
    setQuery('')
    navigate('/', { replace: true, state: null })
  }, [location.state, navigate])

  const askAssistant = (naturalQuery) => {
    navigate('/assistant', { state: { query: naturalQuery } })
  }

  const clearAiSearch = () => {
    setAiSearch(null)
    setFilters(defaultFilters)
    setSortBy('featured')
  }

  return (
    <div className="container home">
      {!isLoading ? (
        <Hero
          featured={featured}
          catalogueSize={products.length}
          categoryCount={categories.length}
          brandCount={brands.length}
        />
      ) : null}

      {usingOfflineData ? (
        <p className="home-notice" role="status">
          Live catalogue is unavailable right now, so a saved offline copy is being shown.
        </p>
      ) : null}

      <CategoryTiles categories={categoryTiles} />

      <AiSearchPanel
        onSearch={askAssistant}
        onClear={clearAiSearch}
        chips={aiSearch ? aiSearch.chips : []}
        summary={aiSearch ? aiSearch.summary : ''}
        source={aiSearch ? aiSearch.source : null}
        resultCount={visibleProducts.length}
      />

      <RecommendationRow
        title="Today's biggest savings"
        subtitle="The steepest discounts in the catalogue right now"
        products={deals}
      />

      <RecommendationRow
        title="Recommended for you"
        subtitle="Based on the products you viewed, saved and added to your cart"
        products={recommendations}
      />

      <div className="home-toolbar">
        <SearchBar value={query} onChange={setQuery} />
        <label className="home-sort">
          <span className="visually-hidden">Sort products by</span>
          <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="home-layout">
        <button
          type="button"
          className="btn btn-outline home-filter-toggle"
          aria-expanded={filtersOpen}
          aria-controls="filter-panel"
          onClick={() => setFiltersOpen((open) => !open)}
        >
          <FiSliders aria-hidden="true" />
          Filters
          {activeFilterCount ? <span className="home-filter-count">{activeFilterCount}</span> : null}
        </button>

        <aside
          id="filter-panel"
          className={filtersOpen ? 'home-sidebar is-open' : 'home-sidebar'}
          aria-label="Product filters"
        >
          <FilterPanel
            categories={categories}
            brands={brands}
            filters={filters}
            onChange={setFilters}
            onReset={clearAiSearch}
          />
        </aside>

        <section className="home-results" aria-labelledby="results-heading">
          <ActiveFilters
            filters={filters}
            onChange={setFilters}
            onReset={clearAiSearch}
          />

          <div className="section-heading">
            <h2 id="results-heading">
              {aiSearch ? 'Best matches' : debouncedQuery ? `Results for "${debouncedQuery}"` : 'All products'}
            </h2>
            <p role="status" aria-live="polite">
              {isLoading ? 'Loading products' : `${pluralize(visibleProducts.length, 'product')} found`}
            </p>
          </div>

          {!isLoading && !visibleProducts.length ? (
            <EmptyState
              title="No products match your search"
              message="Try a different search term, widen the price range or remove a category."
              action={
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    clearAiSearch()
                    setQuery('')
                  }}
                >
                  Clear search and filters
                </button>
              }
            />
          ) : (
            <ProductGrid products={visibleProducts} isLoading={isLoading} />
          )}
        </section>
      </div>
    </div>
  )
}

export default Home
