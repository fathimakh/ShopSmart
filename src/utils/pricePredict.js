const WEEKS = 12
const FORECAST_STEPS = 2

// Small deterministic generator so a product always shows the same price history
// instead of a new random chart on every render.
function seededRandom(seed) {
  let state = seed >>> 0
  return () => {
    state += 0x6d2b79f5
    let value = Math.imul(state ^ (state >>> 15), 1 | state)
    value ^= value + Math.imul(value ^ (value >>> 7), 61 | value)
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * Reconstructs a weekly price history that starts near the pre-discount price and
 * ends on today's price, with a little noise so the trend is not a straight line.
 */
export function buildPriceHistory(product) {
  const random = seededRandom(product.id * 7919 + Math.round(product.price * 100))
  // Discounted products start from their pre-discount price; the rest start slightly
  // above or below today's price so both rising and falling trends show up.
  const start =
    product.discount >= 8 ? product.originalPrice : product.price * (0.82 + random() * 0.34)
  const drift = (random() - 0.45) * 0.06

  const history = []
  for (let week = 0; week < WEEKS; week += 1) {
    const progress = week / (WEEKS - 1)
    const trend = start + (product.price - start) * progress
    const noise = (random() - 0.5) * product.price * 0.05
    const wobble = product.price * drift * Math.sin(week * 1.1)
    history.push(Math.max(0.5, Number((trend + noise + wobble).toFixed(2))))
  }

  history[WEEKS - 1] = product.price
  return history
}

function linearRegression(values) {
  const n = values.length
  const meanX = (n - 1) / 2
  const meanY = values.reduce((total, value) => total + value, 0) / n

  let covariance = 0
  let varianceX = 0
  values.forEach((value, index) => {
    covariance += (index - meanX) * (value - meanY)
    varianceX += (index - meanX) ** 2
  })

  const slope = varianceX ? covariance / varianceX : 0
  const intercept = meanY - slope * meanX

  // R squared tells how closely the straight line explains the movement, which is
  // used as the confidence of the forecast.
  let residual = 0
  let total = 0
  values.forEach((value, index) => {
    residual += (value - (intercept + slope * index)) ** 2
    total += (value - meanY) ** 2
  })

  return { slope, intercept, rSquared: total ? 1 - residual / total : 0 }
}

export function predictPrice(product) {
  const history = buildPriceHistory(product)
  const { slope, intercept, rSquared } = linearRegression(history)

  const rawForecast = intercept + slope * (history.length - 1 + FORECAST_STEPS)
  const forecast = Number(
    Math.min(Math.max(rawForecast, product.price * 0.6), product.price * 1.4).toFixed(2)
  )

  const changePercent = ((forecast - product.price) / product.price) * 100
  const confidence = Math.round(Math.min(Math.max(rSquared, 0), 1) * 100)

  let verdict = 'steady'
  if (confidence >= 35 && changePercent <= -2) verdict = 'drop'
  if (confidence >= 35 && changePercent >= 2) verdict = 'rise'

  return {
    history,
    forecast,
    changePercent: Number(changePercent.toFixed(1)),
    confidence,
    verdict,
    weeks: WEEKS
  }
}
