import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiCheck, FiCreditCard, FiInfo, FiShoppingBag, FiSmartphone, FiTruck } from 'react-icons/fi'
import { useShop } from '../context/ShopContext'
import useLocalStorage from '../hooks/useLocalStorage'
import usePageTitle from '../hooks/usePageTitle'
import FormField from '../components/FormField/FormField'
import EmptyState from '../components/EmptyState/EmptyState'
import { formatDate, formatPrice, pluralize } from '../utils/format'
import {
  buildOrderNumber,
  estimatedDelivery,
  formatCardNumber,
  formatExpiry,
  validateDelivery,
  validatePayment
} from '../utils/checkoutValidation'
import './Checkout.css'

const DELIVERY_FEE = 4.99
const FREE_DELIVERY_THRESHOLD = 150

const steps = [
  { id: 'delivery', label: 'Delivery' },
  { id: 'payment', label: 'Payment' },
  { id: 'review', label: 'Review' }
]

const paymentMethods = [
  { id: 'card', label: 'Card', description: 'Credit or debit card', icon: FiCreditCard },
  { id: 'upi', label: 'UPI', description: 'Pay using any UPI app', icon: FiSmartphone },
  { id: 'cod', label: 'Cash on delivery', description: 'Pay when it arrives', icon: FiTruck }
]

const emptyDelivery = {
  name: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  pincode: ''
}

const emptyPayment = {
  method: 'card',
  cardName: '',
  cardNumber: '',
  expiry: '',
  cvv: '',
  upiId: ''
}

function Checkout() {
  usePageTitle('Checkout')
  const navigate = useNavigate()
  const { cartItems, cartCount, subtotal, savings, clearCart } = useShop()

  const [step, setStep] = useState('delivery')
  const [delivery, setDelivery] = useState(emptyDelivery)
  const [payment, setPayment] = useState(emptyPayment)
  const [errors, setErrors] = useState({})
  const [isPlacing, setIsPlacing] = useState(false)
  const [order, setOrder] = useLocalStorage('shopsmart:lastOrder', null)

  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE
  const total = subtotal + deliveryFee

  const updateDelivery = (field) => (event) => {
    setDelivery((current) => ({ ...current, [field]: event.target.value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  const updatePayment = (field, transform) => (event) => {
    const value = transform ? transform(event.target.value) : event.target.value
    setPayment((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  const goToPayment = (event) => {
    event.preventDefault()
    const found = validateDelivery(delivery)
    setErrors(found)
    if (!Object.keys(found).length) setStep('payment')
  }

  const goToReview = (event) => {
    event.preventDefault()
    const found = validatePayment(payment)
    setErrors(found)
    if (!Object.keys(found).length) setStep('review')
  }

  const placeOrder = () => {
    setIsPlacing(true)
    const placedAt = Date.now()

    // Nothing is sent anywhere. The short wait only makes the confirmation feel
    // like a real order being accepted rather than an instant page swap.
    setTimeout(() => {
      setOrder({
        number: buildOrderNumber(placedAt),
        placedAt,
        arrivesOn: estimatedDelivery(placedAt),
        items: cartItems.map((item) => ({
          id: item.id,
          title: item.title,
          brand: item.brand,
          thumbnail: item.thumbnail,
          price: item.price,
          quantity: item.quantity
        })),
        delivery,
        method: payment.method,
        // Only the last four digits are kept, and only in this browser.
        cardLast4: payment.method === 'card' ? payment.cardNumber.slice(-4) : null,
        subtotal,
        savings,
        deliveryFee,
        total
      })
      clearCart()
      setIsPlacing(false)
    }, 900)
  }

  if (order && step !== 'done') {
    const methodLabel = paymentMethods.find((method) => method.id === order.method)?.label

    return (
      <div className="container checkout-done">
        <div className="checkout-success card">
          <span className="checkout-success-icon" aria-hidden="true">
            <FiCheck />
          </span>
          <h1>Order confirmed</h1>
          <p className="checkout-success-text">
            Thanks {order.delivery.name.split(' ')[0]}, your order is on its way. A
            confirmation has been sent to {order.delivery.email}.
          </p>

          <dl className="checkout-success-meta">
            <div>
              <dt>Order number</dt>
              <dd>{order.number}</dd>
            </div>
            <div>
              <dt>Arriving by</dt>
              <dd>{formatDate(order.arrivesOn)}</dd>
            </div>
            <div>
              <dt>Paid with</dt>
              <dd>{order.cardLast4 ? `${methodLabel} ending ${order.cardLast4}` : methodLabel}</dd>
            </div>
            <div>
              <dt>Total</dt>
              <dd>{formatPrice(order.total)}</dd>
            </div>
          </dl>

          <ul className="checkout-success-items">
            {order.items.map((item) => (
              <li key={item.id}>
                <img src={item.thumbnail} alt={item.title} width="56" height="56" loading="lazy" />
                <div>
                  <p className="checkout-success-item-title">{item.title}</p>
                  <p className="checkout-success-item-meta">
                    {item.brand} - {pluralize(item.quantity, 'unit')}
                  </p>
                </div>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>

          <p className="checkout-success-address">
            Delivering to {order.delivery.address}, {order.delivery.city},{' '}
            {order.delivery.state} {order.delivery.pincode}
          </p>

          <div className="checkout-success-actions">
            <Link className="btn btn-primary" to="/">
              Continue shopping
            </Link>
            <button type="button" className="btn btn-outline" onClick={() => setOrder(null)}>
              Start a new order
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!cartItems.length) {
    return (
      <div className="container">
        <EmptyState
          icon={FiShoppingBag}
          headingLevel={1}
          title="There is nothing to check out"
          message="Add a product to your cart and the checkout will open here."
          action={
            <Link className="btn btn-primary" to="/">
              Browse products
            </Link>
          }
        />
      </div>
    )
  }

  const activeIndex = steps.findIndex((entry) => entry.id === step)

  return (
    <div className="container checkout">
      <div className="section-heading">
        <h1>Checkout</h1>
        <p>{pluralize(cartCount, 'item')} in this order</p>
      </div>

      <p className="checkout-demo" role="note">
        <FiInfo aria-hidden="true" />
        This is a demonstration store. No payment is taken, nothing is sent to a server,
        and no card details are stored, so please use made up details.
      </p>

      <ol className="checkout-steps">
        {steps.map((entry, index) => (
          <li
            key={entry.id}
            className={index <= activeIndex ? 'is-active' : ''}
            aria-current={entry.id === step ? 'step' : undefined}
          >
            <span className="checkout-step-number">{index < activeIndex ? <FiCheck /> : index + 1}</span>
            {entry.label}
          </li>
        ))}
      </ol>

      <div className="checkout-layout">
        <div className="checkout-panel card">
          {step === 'delivery' ? (
            <form onSubmit={goToPayment} noValidate>
              <h2>Delivery address</h2>
              <div className="checkout-grid">
                <FormField
                  id="name"
                  label="Full name"
                  value={delivery.name}
                  onChange={updateDelivery('name')}
                  error={errors.name}
                  autoComplete="name"
                />
                <FormField
                  id="email"
                  label="Email"
                  type="email"
                  value={delivery.email}
                  onChange={updateDelivery('email')}
                  error={errors.email}
                  autoComplete="email"
                />
                <FormField
                  id="phone"
                  label="Phone"
                  inputMode="numeric"
                  value={delivery.phone}
                  onChange={updateDelivery('phone')}
                  error={errors.phone}
                  autoComplete="tel"
                />
                <FormField
                  id="pincode"
                  label="PIN code"
                  inputMode="numeric"
                  value={delivery.pincode}
                  onChange={updateDelivery('pincode')}
                  error={errors.pincode}
                  autoComplete="postal-code"
                />
                <div className="checkout-grid-wide">
                  <FormField
                    id="address"
                    label="Street address"
                    value={delivery.address}
                    onChange={updateDelivery('address')}
                    error={errors.address}
                    autoComplete="street-address"
                  />
                </div>
                <FormField
                  id="city"
                  label="City"
                  value={delivery.city}
                  onChange={updateDelivery('city')}
                  error={errors.city}
                  autoComplete="address-level2"
                />
                <FormField
                  id="state"
                  label="State"
                  value={delivery.state}
                  onChange={updateDelivery('state')}
                  error={errors.state}
                  autoComplete="address-level1"
                />
              </div>

              <div className="checkout-actions">
                <Link className="btn btn-ghost" to="/cart">
                  Back to cart
                </Link>
                <button type="submit" className="btn btn-primary">
                  Continue to payment
                </button>
              </div>
            </form>
          ) : null}

          {step === 'payment' ? (
            <form onSubmit={goToReview} noValidate>
              <h2>Payment method</h2>

              <fieldset className="checkout-methods">
                <legend className="visually-hidden">Choose how to pay</legend>
                {paymentMethods.map(({ id, label, description, icon: Icon }) => (
                  <label key={id} className={payment.method === id ? 'is-selected' : ''}>
                    <input
                      type="radio"
                      name="method"
                      value={id}
                      checked={payment.method === id}
                      onChange={() => setPayment((current) => ({ ...current, method: id }))}
                    />
                    <Icon aria-hidden="true" />
                    <span>
                      <strong>{label}</strong>
                      {description}
                    </span>
                  </label>
                ))}
              </fieldset>

              {payment.method === 'card' ? (
                <div className="checkout-grid">
                  <div className="checkout-grid-wide">
                    <FormField
                      id="cardName"
                      label="Name on card"
                      value={payment.cardName}
                      onChange={updatePayment('cardName')}
                      error={errors.cardName}
                    />
                  </div>
                  <div className="checkout-grid-wide">
                    <FormField
                      id="cardNumber"
                      label="Card number"
                      inputMode="numeric"
                      placeholder="4242 4242 4242 4242"
                      hint="Any 16 digits work here. Never enter a real card number."
                      value={payment.cardNumber}
                      onChange={updatePayment('cardNumber', formatCardNumber)}
                      error={errors.cardNumber}
                    />
                  </div>
                  <FormField
                    id="expiry"
                    label="Expiry"
                    placeholder="MM/YY"
                    inputMode="numeric"
                    value={payment.expiry}
                    onChange={updatePayment('expiry', formatExpiry)}
                    error={errors.expiry}
                  />
                  <FormField
                    id="cvv"
                    label="CVV"
                    inputMode="numeric"
                    maxLength={3}
                    value={payment.cvv}
                    onChange={updatePayment('cvv')}
                    error={errors.cvv}
                  />
                </div>
              ) : null}

              {payment.method === 'upi' ? (
                <div className="checkout-grid">
                  <div className="checkout-grid-wide">
                    <FormField
                      id="upiId"
                      label="UPI ID"
                      placeholder="name@bank"
                      value={payment.upiId}
                      onChange={updatePayment('upiId')}
                      error={errors.upiId}
                    />
                  </div>
                </div>
              ) : null}

              {payment.method === 'cod' ? (
                <p className="checkout-note">
                  Keep {formatPrice(total)} ready for the delivery agent. Card and UPI are
                  also accepted at the door.
                </p>
              ) : null}

              <div className="checkout-actions">
                <button type="button" className="btn btn-ghost" onClick={() => setStep('delivery')}>
                  Back
                </button>
                <button type="submit" className="btn btn-primary">
                  Review order
                </button>
              </div>
            </form>
          ) : null}

          {step === 'review' ? (
            <div>
              <h2>Review and confirm</h2>

              <div className="checkout-review">
                <section>
                  <h3>Delivering to</h3>
                  <p>{delivery.name}</p>
                  <p>
                    {delivery.address}, {delivery.city}, {delivery.state} {delivery.pincode}
                  </p>
                  <p>
                    {delivery.phone} - {delivery.email}
                  </p>
                  <button type="button" className="btn btn-ghost" onClick={() => setStep('delivery')}>
                    Change
                  </button>
                </section>

                <section>
                  <h3>Paying with</h3>
                  <p>
                    {payment.method === 'card'
                      ? `Card ending ${payment.cardNumber.slice(-4)}`
                      : null}
                    {payment.method === 'upi' ? payment.upiId : null}
                    {payment.method === 'cod' ? 'Cash on delivery' : null}
                  </p>
                  <button type="button" className="btn btn-ghost" onClick={() => setStep('payment')}>
                    Change
                  </button>
                </section>
              </div>

              <ul className="checkout-items">
                {cartItems.map((item) => (
                  <li key={item.id}>
                    <img src={item.thumbnail} alt={item.title} width="48" height="48" loading="lazy" />
                    <span className="checkout-item-title">{item.title}</span>
                    <span className="checkout-item-qty">x{item.quantity}</span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </li>
                ))}
              </ul>

              <div className="checkout-actions">
                <button type="button" className="btn btn-ghost" onClick={() => setStep('payment')}>
                  Back
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={placeOrder}
                  disabled={isPlacing}
                >
                  {isPlacing ? 'Placing order' : `Place order - ${formatPrice(total)}`}
                </button>
              </div>
            </div>
          ) : null}
        </div>

        <aside className="checkout-summary card" aria-label="Order summary">
          <h2>Summary</h2>
          <dl>
            <div>
              <dt>Subtotal</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            {savings > 0 ? (
              <div className="checkout-summary-savings">
                <dt>Discount savings</dt>
                <dd>-{formatPrice(savings)}</dd>
              </div>
            ) : null}
            <div>
              <dt>Delivery</dt>
              <dd>{deliveryFee === 0 ? 'Free' : formatPrice(deliveryFee)}</dd>
            </div>
            <div className="checkout-summary-total">
              <dt>Total</dt>
              <dd>{formatPrice(total)}</dd>
            </div>
          </dl>
          <button type="button" className="btn btn-ghost btn-block" onClick={() => navigate('/cart')}>
            Edit cart
          </button>
        </aside>
      </div>
    </div>
  )
}

export default Checkout
