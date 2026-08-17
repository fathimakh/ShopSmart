import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FiChevronRight, FiHeart, FiPackage, FiShoppingCart, FiTruck } from 'react-icons/fi'
import { useCatalog } from '../context/CatalogContext'
import { useShop } from '../context/ShopContext'
import StarRating from '../components/StarRating/StarRating'
import QuantityStepper from '../components/QuantityStepper/QuantityStepper'
import EmptyState from '../components/EmptyState/EmptyState'
import { formatDate, formatPrice, pluralize } from '../utils/format'
import './ProductDetails.css'

function ProductDetails() {
  const { id } = useParams()
  const { products, status } = useCatalog()
  const { addToCart, isWishlisted, toggleWishlist } = useShop()
  const [activeImage, setActiveImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const product = useMemo(
    () => products.find((item) => String(item.id) === id),
    [products, id]
  )

  useEffect(() => {
    setActiveImage(0)
    setQuantity(1)
    window.scrollTo({ top: 0 })
  }, [id])

  if (status === 'loading') {
    return (
      <div className="container product-loading" role="status">
        <div className="skeleton product-loading-media" />
        <div className="product-loading-body">
          <div className="skeleton product-loading-line short" />
          <div className="skeleton product-loading-line" />
          <div className="skeleton product-loading-line medium" />
        </div>
        <span className="visually-hidden">Loading product details</span>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container">
        <EmptyState
          icon={FiPackage}
          title="Product not found"
          message="This product is no longer part of the catalogue."
          action={
            <Link className="btn btn-primary" to="/">
              Browse all products
            </Link>
          }
        />
      </div>
    )
  }

  return (
    <div className="container product-details">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Shop</Link>
        <FiChevronRight aria-hidden="true" />
        <span>{product.categoryLabel}</span>
        <FiChevronRight aria-hidden="true" />
        <span aria-current="page">{product.title}</span>
      </nav>

      <div className="product-details-main">
        <section className="product-gallery" aria-label="Product images">
          <div className="product-gallery-main">
            <img src={product.images[activeImage]} alt={product.title} width="520" height="520" />
          </div>
          {product.images.length > 1 ? (
            <div className="product-gallery-thumbs">
              {product.images.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  className={index === activeImage ? 'is-active' : ''}
                  onClick={() => setActiveImage(index)}
                  aria-label={`Show image ${index + 1} of ${product.images.length}`}
                >
                  <img src={image} alt="" loading="lazy" width="80" height="80" />
                </button>
              ))}
            </div>
          ) : null}
        </section>

        <section className="product-summary">
          <p className="product-summary-brand">{product.brand}</p>
          <h1>{product.title}</h1>

          <div className="product-summary-rating">
            <StarRating value={product.rating} size="lg" />
            <span>{pluralize(product.reviewCount, 'review')}</span>
          </div>

          <div className="product-summary-price">
            <span className="product-summary-amount">{formatPrice(product.price)}</span>
            {product.discount >= 1 ? (
              <>
                <span className="product-summary-original">{formatPrice(product.originalPrice)}</span>
                <span className="badge badge-accent">{product.discount}% off</span>
              </>
            ) : null}
          </div>

          <p className="product-summary-description">{product.description}</p>

          <div className="product-actions">
            <QuantityStepper value={quantity} max={product.stock} onChange={setQuantity} />
            <button
              type="button"
              className="btn btn-primary product-actions-cart"
              onClick={() => addToCart(product.id, quantity)}
            >
              <FiShoppingCart aria-hidden="true" />
              Add to cart
            </button>
            <button
              type="button"
              className={
                isWishlisted(product.id)
                  ? 'btn btn-outline product-actions-wish is-active'
                  : 'btn btn-outline product-actions-wish'
              }
              aria-pressed={isWishlisted(product.id)}
              onClick={() => toggleWishlist(product.id)}
            >
              <FiHeart aria-hidden="true" />
              {isWishlisted(product.id) ? 'Saved' : 'Save'}
            </button>
          </div>

          <ul className="product-summary-meta">
            <li>
              <FiPackage aria-hidden="true" />
              <span>
                {product.availability} - {product.stock} left in stock
              </span>
            </li>
            <li>
              <FiTruck aria-hidden="true" />
              <span>{product.specs.Shipping}</span>
            </li>
          </ul>
        </section>
      </div>

      <section className="product-section" aria-labelledby="specifications-heading">
        <h2 id="specifications-heading">Specifications</h2>
        <dl className="product-specs card">
          {Object.entries(product.specs).map(([label, value]) => (
            <div key={label} className="product-spec-row">
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="product-section" aria-labelledby="reviews-heading">
        <h2 id="reviews-heading">Customer reviews</h2>
        {product.reviews.length ? (
          <ul className="product-reviews">
            {product.reviews.map((review, index) => (
              <li key={`${review.reviewerEmail}-${index}`} className="product-review card">
                <div className="product-review-head">
                  <div>
                    <p className="product-review-name">{review.reviewerName}</p>
                    <p className="product-review-date">{formatDate(review.date)}</p>
                  </div>
                  <StarRating value={review.rating} size="sm" showValue={false} />
                </div>
                <p className="product-review-comment">{review.comment}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="product-reviews-empty">This product has no reviews yet.</p>
        )}
      </section>
    </div>
  )
}

export default ProductDetails
