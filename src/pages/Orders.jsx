import { Link } from 'react-router-dom'
import { FiChevronRight, FiPackage } from 'react-icons/fi'
import { useShop } from '../context/ShopContext'
import useOrders from '../hooks/useOrders'
import usePageTitle from '../hooks/usePageTitle'
import EmptyState from '../components/EmptyState/EmptyState'
import { formatDate, formatPrice, pluralize } from '../utils/format'
import { orderItemCount, orderStatus } from '../utils/orders'
import './Orders.css'

function Orders() {
  usePageTitle('Your orders')
  const { orders } = useOrders()
  const { addToCart } = useShop()

  if (!orders.length) {
    return (
      <div className="container">
        <EmptyState
          icon={FiPackage}
          headingLevel={1}
          title="No orders yet"
          message="Orders placed at the demo checkout are kept here on this device."
          action={
            <Link className="btn btn-primary" to="/">
              Start shopping
            </Link>
          }
        />
      </div>
    )
  }

  return (
    <div className="container orders">
      <div className="section-heading">
        <h1>Your orders</h1>
        <p>{pluralize(orders.length, 'order')} placed on this device</p>
      </div>

      <ul className="orders-list">
        {orders.map((order) => {
          const status = orderStatus(order)

          return (
            <li key={order.number} className="order-card card">
              <div className="order-card-head">
                <div>
                  <p className="order-card-number">Order {order.number}</p>
                  <p className="order-card-date">Placed on {formatDate(order.placedAt)}</p>
                </div>
                <span className={`order-status ${status.tone}`}>{status.label}</span>
              </div>

              <ul className="order-card-items">
                {order.items.slice(0, 4).map((item) => (
                  <li key={item.id}>
                    <img src={item.thumbnail} alt={item.title} width="48" height="48" loading="lazy" />
                  </li>
                ))}
                {order.items.length > 4 ? (
                  <li className="order-card-more">+{order.items.length - 4}</li>
                ) : null}
              </ul>

              <div className="order-card-foot">
                <p>
                  {pluralize(orderItemCount(order), 'item')} - {formatPrice(order.total)}
                </p>
                <div className="order-card-actions">
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => order.items.forEach((item) => addToCart(item.id, item.quantity))}
                  >
                    Buy again
                  </button>
                  <Link className="btn btn-primary" to={`/orders/${order.number}`}>
                    View details
                    <FiChevronRight aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Orders
