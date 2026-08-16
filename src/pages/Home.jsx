import { useMemo, useState } from 'react'
import { FiSliders } from 'react-icons/fi'
import { useCatalog } from '../context/CatalogContext'
import FilterPanel from '../components/FilterPanel/FilterPanel'
import ProductGrid from '../components/ProductGrid/ProductGrid'
import SearchBar from '../components/SearchBar/SearchBar'
import EmptyState from '../components/EmptyState/EmptyState'
import useDebounce from '../hooks/useDebounce'
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
  const [filters, setFilters] = useState(defaultFilters)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [sortBy, setSortBy] = useState('featured')
  const debouncedQuery = useDebounce(query)

  const isLoading = status === 'loading'
  const activeFilterCount = countActiveFilters(filters)

  const visibleProducts = useMemo(() => {
    const matches = searchProducts(applyFilters(products, filters), debouncedQuery)
    return sortProducts(matches, sortBy)
  }, [products, filters, debouncedQuery, sortBy])

  return (
    <div className="container home">
      <section className="home-hero">
        <p className="badge badge-primary">Smarter product discovery</p>
        <h1>Find the right product without endless scrolling</h1>
        <p className="home-hero-text">
          Browse a live catalogue, narrow it down with detailed filters and compare the
          shortlist side by side before you buy.
        </p>
      </section>

      {usingOfflineData ? (
        <p className="home-notice" role="status">
          Live catalogue is unavailable right now, so a saved offline copy is being shown.
        </p>
      ) : null}

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
            onReset={() => setFilters(defaultFilters)}
          />
        </aside>

        <section className="home-results" aria-labelledby="results-heading">
          <div className="section-heading">
            <h2 id="results-heading">{debouncedQuery ? `Results for "${debouncedQuery}"` : 'All products'}</h2>
            {!isLoading ? <p>{pluralize(visibleProducts.length, 'product')} found</p> : null}
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
                    setFilters(defaultFilters)
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
