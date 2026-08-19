import { Link } from 'react-router-dom'
import { FiHeart } from 'react-icons/fi'
import { useShop } from '../context/ShopContext'
import { useCatalog } from '../context/CatalogContext'
import ProductGrid from '../components/ProductGrid/ProductGrid'
import EmptyState from '../components/EmptyState/EmptyState'
import { formatPrice, pluralize } from '../utils/format'
import './Wishlist.css'
import usePageTitle from '../hooks/usePageTitle'

function Wishlist() {
  usePageTitle('Wishlist')
  const { wishlistItems, clearWishlist, addToCart } = useShop()
  const { status } = useCatalog()

  if (status === 'loading') {
    return (
      <div className="container">
        <ProductGrid products={[]} isLoading skeletonCount={4} />
      </div>
    )
  }

  if (!wishlistItems.length) {
    return (
      <div className="container">
        <EmptyState
          icon={FiHeart}
          title="No saved products yet"
          message="Tap the heart on any product to keep it here for later."
          action={
            <Link className="btn btn-primary" to="/">
              Browse products
            </Link>
          }
        />
      </div>
    )
  }

  const wishlistValue = wishlistItems.reduce((total, item) => total + item.price, 0)

  return (
    <div className="container wishlist">
      <div className="section-heading">
        <h1>Wishlist</h1>
        <p>
          {pluralize(wishlistItems.length, 'product')} worth {formatPrice(wishlistValue)}
        </p>
      </div>

      <div className="wishlist-actions">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => wishlistItems.forEach((item) => addToCart(item.id))}
        >
          Move everything to cart
        </button>
        <button type="button" className="btn btn-outline" onClick={clearWishlist}>
          Clear wishlist
        </button>
      </div>

      <ProductGrid products={wishlistItems} />
    </div>
  )
}

export default Wishlist
