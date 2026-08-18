import ProductCard from '../ProductCard/ProductCard'
import './RecommendationRow.css'

function RecommendationRow({ title, subtitle, products }) {
  if (!products.length) return null

  return (
    <section className="recommendation-row" aria-label={title}>
      <div className="section-heading">
        <h2>{title}</h2>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>

      <ul className="recommendation-track">
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default RecommendationRow
