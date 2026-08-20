const DAY = 24 * 60 * 60 * 1000

/**
 * Works the status out from the timestamps stored with the order, so a demo order
 * moves through processing, shipping and delivered as the days pass.
 */
export function orderStatus(order, now = Date.now()) {
  const arrives = new Date(order.arrivesOn).getTime()

  if (now >= arrives) return { label: 'Delivered', tone: 'is-delivered' }
  if (now >= order.placedAt + DAY) return { label: 'On the way', tone: 'is-shipping' }
  return { label: 'Processing', tone: 'is-processing' }
}

export function orderItemCount(order) {
  return order.items.reduce((total, item) => total + item.quantity, 0)
}

export const paymentLabels = {
  card: 'Card',
  upi: 'UPI',
  cod: 'Cash on delivery'
}

export function paymentSummary(order) {
  const label = paymentLabels[order.method] || order.method
  return order.cardLast4 ? `${label} ending ${order.cardLast4}` : label
}
