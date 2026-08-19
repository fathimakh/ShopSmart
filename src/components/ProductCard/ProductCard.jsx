import { memo } from 'react'
import { Link } from 'react-router-dom'
import { FiCheck, FiHeart, FiShoppingCart } from 'react-icons/fi'
import StarRating from '../StarRating/StarRating'
import { useShop } from '../../context/ShopContext'
import { formatPrice } from '../../utils/format'
import './ProductCard.css'

function ProductCard({ product }) {
  const { addToCart, isInCart, isWishlisted, toggleWishlist, isCompared, isCompareFull, toggleCompare } =
    useShop()
  const inCart = isInCart(product.id)
  const wishlisted = isWishlisted(product.id)
  const compared = isCompared(product.id)

  return (
    <article className="product-card card">
      <Link className="product-card-media" to={`/product/${product.id}`}>
        <img src={product.thumbnail} alt={product.title} loading="lazy" width="320" height="320" />
        {product.discount >= 10 ? (
          <span className="badge badge-accent product-card-discount">{product.discount}% off</span>
        ) : null}
      </Link>

      <button
        type="button"
        className={wishlisted ? 'product-card-wish is-active' : 'product-card-wish'}
        aria-pressed={wishlisted}
        onClick={() => toggleWishlist(product.id)}
      >
        <FiHeart aria-hidden="true" />
        <span className="visually-hidden">
          {wishlisted ? 'Remove from wishlist' : 'Save to wishlist'} - {product.title}
        </span>
      </button>

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

          <button
            type="button"
            className={inCart ? 'btn btn-outline product-card-cart' : 'btn btn-primary product-card-cart'}
            onClick={() => addToCart(product.id)}
          >
            {inCart ? <FiCheck aria-hidden="true" /> : <FiShoppingCart aria-hidden="true" />}
            {inCart ? 'In cart' : 'Add to cart'}
            <span className="visually-hidden"> - {product.title}</span>
          </button>

          <label className={compared ? 'product-card-compare is-active' : 'product-card-compare'}>
            <input
              type="checkbox"
              checked={compared}
              disabled={!compared && isCompareFull}
              onChange={() => toggleCompare(product.id)}
            />
            <span>Compare</span>
          </label>
        </div>
      </div>
    </article>
  )
}

export default memo(ProductCard)
