import { Link } from 'react-router-dom'
import StarRating from '../StarRating/StarRating'
import { formatPrice } from '../../utils/format'
import './ProductCard.css'

function ProductCard({ product }) {
  return (
    <article className="product-card card">
      <Link className="product-card-media" to={`/product/${product.id}`}>
        <img src={product.thumbnail} alt={product.title} loading="lazy" width="320" height="320" />
        {product.discount >= 10 ? (
          <span className="badge badge-accent product-card-discount">{product.discount}% off</span>
        ) : null}
      </Link>

      <div className="product-card-body">
        <p className="product-card-brand">{product.brand}</p>
        <h3 className="product-card-title">
          <Link to={`/product/${product.id}`}>{product.title}</Link>
        </h3>
        <StarRating value={product.rating} size="sm" />

        <div className="product-card-footer">
          <p className="product-card-price">
            {formatPrice(product.price)}
            {product.discount >= 10 ? (
              <span className="product-card-original">{formatPrice(product.originalPrice)}</span>
            ) : null}
          </p>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
