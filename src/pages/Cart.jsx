import { Link } from 'react-router-dom'
import { FiShoppingCart, FiTrash2 } from 'react-icons/fi'
import { useShop } from '../context/ShopContext'
import QuantityStepper from '../components/QuantityStepper/QuantityStepper'
import EmptyState from '../components/EmptyState/EmptyState'
import { formatPrice, pluralize } from '../utils/format'
import './Cart.css'

const DELIVERY_FEE = 4.99
const FREE_DELIVERY_THRESHOLD = 150

function Cart() {
  const { cartItems, cartCount, subtotal, savings, updateQuantity, removeFromCart, clearCart } =
    useShop()

  if (!cartItems.length) {
    return (
      <div className="container">
        <EmptyState
          icon={FiShoppingCart}
          title="Your cart is empty"
          message="Products you add will stay here, even if you close the browser."
          action={
            <Link className="btn btn-primary" to="/">
              Start shopping
            </Link>
          }
        />
      </div>
    )
  }

  const delivery = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE
  const total = subtotal + delivery

  return (
    <div className="container cart">
      <div className="section-heading">
        <h1>Shopping cart</h1>
        <p>{pluralize(cartCount, 'item')}</p>
      </div>

      <div className="cart-layout">
        <ul className="cart-items">
          {cartItems.map((item) => (
            <li key={item.id} className="cart-item card">
              <Link to={`/product/${item.id}`} className="cart-item-media">
                <img src={item.thumbnail} alt={item.title} loading="lazy" width="96" height="96" />
              </Link>

              <div className="cart-item-info">
                <p className="cart-item-brand">{item.brand}</p>
                <h2 className="cart-item-title">
                  <Link to={`/product/${item.id}`}>{item.title}</Link>
                </h2>
                <p className="cart-item-unit">{formatPrice(item.price)} each</p>
              </div>

              <div className="cart-item-actions">
                <QuantityStepper
                  value={item.quantity}
                  max={item.stock}
                  onChange={(quantity) => updateQuantity(item.id, quantity)}
                />
                <p className="cart-item-total">{formatPrice(item.price * item.quantity)}</p>
                <button
                  type="button"
                  className="btn btn-ghost cart-item-remove"
                  onClick={() => removeFromCart(item.id)}
                >
                  <FiTrash2 aria-hidden="true" />
                  <span className="visually-hidden">Remove {item.title} from cart</span>
                </button>
              </div>
            </li>
          ))}
        </ul>

        <aside className="cart-summary card" aria-label="Order summary">
          <h2>Order summary</h2>
          <dl>
            <div>
              <dt>Subtotal</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            {savings > 0 ? (
              <div className="cart-summary-savings">
                <dt>Discount savings</dt>
                <dd>-{formatPrice(savings)}</dd>
              </div>
            ) : null}
            <div>
              <dt>Delivery</dt>
              <dd>{delivery === 0 ? 'Free' : formatPrice(delivery)}</dd>
            </div>
            <div className="cart-summary-total">
              <dt>Total</dt>
              <dd>{formatPrice(total)}</dd>
            </div>
          </dl>

          {delivery > 0 ? (
            <p className="cart-summary-hint">
              Add {formatPrice(FREE_DELIVERY_THRESHOLD - subtotal)} more to get free delivery.
            </p>
          ) : null}

          <button type="button" className="btn btn-primary btn-block">
            Proceed to checkout
          </button>
          <button type="button" className="btn btn-ghost btn-block" onClick={clearCart}>
            Clear cart
          </button>
        </aside>
      </div>
    </div>
  )
}

export default Cart
