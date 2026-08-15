import { useCatalog } from '../context/CatalogContext'
import ProductGrid from '../components/ProductGrid/ProductGrid'
import { pluralize } from '../utils/format'
import './Home.css'

function Home() {
  const { products, status, usingOfflineData } = useCatalog()
  const isLoading = status === 'loading'

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

      <section className="home-results" aria-labelledby="results-heading">
        <div className="section-heading">
          <h2 id="results-heading">All products</h2>
          {!isLoading ? <p>{pluralize(products.length, 'product')}</p> : null}
        </div>
        <ProductGrid products={products} isLoading={isLoading} />
      </section>
    </div>
  )
}

export default Home
