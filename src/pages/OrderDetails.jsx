import { Link, useLocation, useParams } from 'react-router-dom'
import { FiCheck, FiChevronRight, FiPackage, FiTruck } from 'react-icons/fi'
import { useShop } from '../context/ShopContext'
import useOrders from '../hooks/useOrders'
import usePageTitle from '../hooks/usePageTitle'
import EmptyState from '../components/EmptyState/EmptyState'
import { formatDate, formatPrice, pluralize } from '../utils/format'
import { orderItemCount, orderStatus, paymentSummary } from '../utils/orders'
import './OrderDetails.css'

function OrderDetails() {
  const { number } = useParams()
  const { orders } = useOrders()
  const { addToCart } = useShop()
  const location = useLocation()
  const justPlaced = Boolean(location.state?.justPlaced)

  usePageTitle(`Order ${number}`)

  const order = orders.find((entry) => entry.number === number)

  if (!order) {
    return (
      <div className="container">
        <EmptyState
          icon={FiPackage}
          headingLevel={1}
          title="Order not found"
          message="Orders are stored on the device they were placed from, so this one is not here."
          action={
            <Link className="btn btn-primary" to="/orders">
              Back to your orders
            </Link>
          }
        />
      </div>
    )
  }

  const status = orderStatus(order)

  return (
    <div className="container order-details">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Shop</Link>
        <FiChevronRight aria-hidden="true" />
        <Link to="/orders">Your orders</Link>
        <FiChevronRight aria-hidden="true" />
        <span aria-current="page">{order.number}</span>
      </nav>

      {justPlaced ? (
        <div className="order-confirmed" role="status">
          <span aria-hidden="true">
            <FiCheck />
          </span>
          <div>
            <h1>Order confirmed</h1>
            <p>
              Thanks {order.delivery.name.split(' ')[0]}, a confirmation has been sent to{' '}
              {order.delivery.email}.
            </p>
          </div>
        </div>
      ) : (
        <h1 className="order-details-title">Order {order.number}</h1>
      )}

      <div className="order-summary-bar card">
        <dl>
          <div>
            <dt>Status</dt>
            <dd>
              <span className={`order-status ${status.tone}`}>{status.label}</span>
            </dd>
          </div>
          <div>
            <dt>Placed on</dt>
            <dd>{formatDate(order.placedAt)}</dd>
          </div>
          <div>
            <dt>Arriving by</dt>
            <dd>{formatDate(order.arrivesOn)}</dd>
          </div>
          <div>
            <dt>Total</dt>
            <dd>{formatPrice(order.total)}</dd>
          </div>
        </dl>
      </div>

      <div className="order-details-layout">
        <section className="card order-items-panel" aria-labelledby="order-items">
          <h2 id="order-items">{pluralize(orderItemCount(order), 'item')} in this order</h2>

          <ul className="order-items">
            {order.items.map((item) => (
              <li key={item.id}>
                <Link to={`/product/${item.id}`} className="order-item-media">
                  <img src={item.thumbnail} alt={item.title} width="64" height="64" loading="lazy" />
                </Link>
                <div className="order-item-info">
                  <p className="order-item-brand">{item.brand}</p>
                  <p className="order-item-title">
                    <Link to={`/product/${item.id}`}>{item.title}</Link>
                  </p>
                  <p className="order-item-qty">
                    {pluralize(item.quantity, 'unit')} at {formatPrice(item.price)}
                  </p>
                </div>
                <span className="order-item-total">{formatPrice(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="btn btn-outline"
            onClick={() => order.items.forEach((item) => addToCart(item.id, item.quantity))}
          >
            Buy these again
          </button>
        </section>

        <aside className="order-side">
          <section className="card order-panel" aria-labelledby="order-delivery">
            <h2 id="order-delivery">
              <FiTruck aria-hidden="true" />
              Delivery
            </h2>
            <p>{order.delivery.name}</p>
            <p>
              {order.delivery.address}, {order.delivery.city}, {order.delivery.state}{' '}
              {order.delivery.pincode}
            </p>
            <p>{order.delivery.phone}</p>
          </section>

          <section className="card order-panel" aria-labelledby="order-payment">
            <h2 id="order-payment">Payment</h2>
            <p>{paymentSummary(order)}</p>
            <dl className="order-totals">
              <div>
                <dt>Subtotal</dt>
                <dd>{formatPrice(order.subtotal)}</dd>
              </div>
              {order.savings > 0 ? (
                <div className="order-totals-savings">
                  <dt>Discount savings</dt>
                  <dd>-{formatPrice(order.savings)}</dd>
                </div>
              ) : null}
              <div>
                <dt>Delivery</dt>
                <dd>{order.deliveryFee === 0 ? 'Free' : formatPrice(order.deliveryFee)}</dd>
              </div>
              <div className="order-totals-grand">
                <dt>Total</dt>
                <dd>{formatPrice(order.total)}</dd>
              </div>
            </dl>
          </section>
        </aside>
      </div>

      <div className="order-details-actions">
        <Link className="btn btn-primary" to="/">
          Continue shopping
        </Link>
        <Link className="btn btn-outline" to="/orders">
          All your orders
        </Link>
      </div>
    </div>
  )
}

export default OrderDetails
