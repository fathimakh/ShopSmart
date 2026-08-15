import ProductCard from '../ProductCard/ProductCard'
import './ProductGrid.css'

function SkeletonCard() {
  return (
    <div className="product-skeleton card" aria-hidden="true">
      <div className="skeleton product-skeleton-media" />
      <div className="product-skeleton-body">
        <div className="skeleton product-skeleton-line short" />
        <div className="skeleton product-skeleton-line" />
        <div className="skeleton product-skeleton-line medium" />
      </div>
    </div>
  )
}

function ProductGrid({ products, isLoading, skeletonCount = 8 }) {
  if (isLoading) {
    return (
      <div className="product-grid" role="status" aria-live="polite">
        <span className="visually-hidden">Loading products</span>
        {Array.from({ length: skeletonCount }, (_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    )
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductGrid
