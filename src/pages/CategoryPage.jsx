import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FiChevronRight, FiGrid } from 'react-icons/fi'
import { useCatalog } from '../context/CatalogContext'
import FilterPanel from '../components/FilterPanel/FilterPanel'
import ProductGrid from '../components/ProductGrid/ProductGrid'
import SearchBar from '../components/SearchBar/SearchBar'
import ActiveFilters from '../components/ActiveFilters/ActiveFilters'
import CategoryTiles from '../components/CategoryTiles/CategoryTiles'
import EmptyState from '../components/EmptyState/EmptyState'
import useDebounce from '../hooks/useDebounce'
import usePageTitle from '../hooks/usePageTitle'
import { applyFilters, defaultFilters, searchProducts, sortOptions, sortProducts } from '../utils/filters'
import { formatPrice, pluralize, titleCase } from '../utils/format'
import './CategoryPage.css'

function CategoryPage() {
  const { slug } = useParams()
  const { products, status, categories } = useCatalog()
  const [filters, setFilters] = useState(defaultFilters)
  const [sortBy, setSortBy] = useState('featured')
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query)

  const label = titleCase(slug)
  usePageTitle(label)

  const isLoading = status === 'loading'
  const exists = categories.includes(slug)

  // Every filter on this page is scoped to the one category being browsed.
  const inCategory = useMemo(
    () => products.filter((product) => product.category === slug),
    [products, slug]
  )

  const brands = useMemo(
    () => [...new Set(inCategory.map((product) => product.brand))].sort(),
    [inCategory]
  )

  const visibleProducts = useMemo(() => {
    const matches = searchProducts(applyFilters(inCategory, filters), debouncedQuery)
    return sortProducts(matches, sortBy)
  }, [inCategory, filters, debouncedQuery, sortBy])

  const otherCategories = useMemo(
    () =>
      categories
        .filter((category) => category !== slug)
        .map((category) => {
          const items = products.filter((product) => product.category === category)
          const best = items.reduce((top, item) => (item.rating > top.rating ? item : top), items[0])
          return { category, count: items.length, thumbnail: best?.thumbnail }
        })
        .filter((entry) => entry.thumbnail),
    [categories, products, slug]
  )

  useEffect(() => {
    setFilters(defaultFilters)
    setSortBy('featured')
    setQuery('')
    window.scrollTo({ top: 0 })
  }, [slug])

  if (!isLoading && !exists) {
    return (
      <div className="container">
        <EmptyState
          icon={FiGrid}
          headingLevel={1}
          title="That category does not exist"
          message="It may have been renamed. Browse the full catalogue instead."
          action={
            <Link className="btn btn-primary" to="/">
              Back to the shop
            </Link>
          }
        />
      </div>
    )
  }

  const cheapest = inCategory.length ? Math.min(...inCategory.map((item) => item.price)) : 0
  const topRating = inCategory.length ? Math.max(...inCategory.map((item) => item.rating)) : 0

  return (
    <div className="container category-page">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Shop</Link>
        <FiChevronRight aria-hidden="true" />
        <span aria-current="page">{label}</span>
      </nav>

      <header className="category-banner">
        <div>
          <h1>{label}</h1>
          <p>
            {pluralize(inCategory.length, 'product')} in this category
            {inCategory.length ? `, from ${formatPrice(cheapest)}` : ''}
          </p>
        </div>
        {inCategory.length ? (
          <dl className="category-banner-stats">
            <div>
              <dt>Starting at</dt>
              <dd>{formatPrice(cheapest)}</dd>
            </div>
            <div>
              <dt>Top rating</dt>
              <dd>{topRating.toFixed(1)}</dd>
            </div>
            <div>
              <dt>Brands</dt>
              <dd>{brands.length}</dd>
            </div>
          </dl>
        ) : null}
      </header>

      <div className="home-toolbar">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder={`Search within ${label}`}
        />
        <label className="home-sort">
          <span className="visually-hidden">Sort products by</span>
          <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
            {sortOptions
              .filter((option) => option.value !== 'relevance')
              .map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
          </select>
        </label>
      </div>

      <div className="home-layout">
        <aside className="home-sidebar is-open" aria-label="Filters">
          <FilterPanel
            categories={[]}
            showCategories={false}
            brands={brands}
            filters={filters}
            onChange={setFilters}
            onReset={() => setFilters(defaultFilters)}
          />
        </aside>

        <section aria-labelledby="category-results">
          <ActiveFilters
            filters={filters}
            onChange={setFilters}
            onReset={() => setFilters(defaultFilters)}
          />

          <div className="section-heading">
            <h2 id="category-results">All {label}</h2>
            <p role="status" aria-live="polite">
              {isLoading ? 'Loading products' : `${pluralize(visibleProducts.length, 'product')} shown`}
            </p>
          </div>

          {!isLoading && !visibleProducts.length ? (
            <EmptyState
              title="Nothing matches these filters"
              message="Try clearing a filter or searching for a different term."
              action={
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    setFilters(defaultFilters)
                    setQuery('')
                  }}
                >
                  Clear filters
                </button>
              }
            />
          ) : (
            <ProductGrid products={visibleProducts} isLoading={isLoading} skeletonCount={6} />
          )}
        </section>
      </div>

      <CategoryTiles
        categories={otherCategories}
        heading="Keep browsing"
        subtitle="Other categories in the catalogue"
      />
    </div>
  )
}

export default CategoryPage
