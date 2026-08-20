import { useMemo } from 'react'
import { FiActivity, FiTrendingDown, FiTrendingUp } from 'react-icons/fi'
import { predictPrice } from '../../utils/pricePredict'
import { formatPrice } from '../../utils/format'
import './PricePrediction.css'

const CHART_WIDTH = 320
const CHART_HEIGHT = 90
const PADDING = 8

const verdicts = {
  drop: {
    icon: FiTrendingDown,
    label: 'Likely to drop',
    tone: 'is-drop',
    advice: (difference) => `Waiting a couple of weeks could save about ${formatPrice(difference)}.`
  },
  rise: {
    icon: FiTrendingUp,
    label: 'Likely to rise',
    tone: 'is-rise',
    advice: (difference) => `Buying now could save about ${formatPrice(difference)} against the forecast.`
  },
  steady: {
    icon: FiActivity,
    label: 'Holding steady',
    tone: 'is-steady',
    advice: () => 'The price has barely moved recently, so there is little to gain by waiting.'
  }
}

/**
 * Maps prices onto the SVG canvas. The y axis is flipped, because SVG measures from
 * the top down while a price chart reads from the bottom up, and a flat series would
 * divide by a zero span so it falls back to 1.
 */
function buildPoints(values) {
  const highest = Math.max(...values)
  const lowest = Math.min(...values)
  const span = highest - lowest || 1
  const step = (CHART_WIDTH - PADDING * 2) / (values.length - 1)

  return values.map((value, index) => {
    const x = PADDING + index * step
    const y = PADDING + (1 - (value - lowest) / span) * (CHART_HEIGHT - PADDING * 2)
    return [Number(x.toFixed(2)), Number(y.toFixed(2))]
  })
}

function PricePrediction({ product }) {
  const prediction = useMemo(() => predictPrice(product), [product])
  const points = useMemo(
    () => buildPoints([...prediction.history, prediction.forecast]),
    [prediction]
  )

  const verdict = verdicts[prediction.verdict]
  const Icon = verdict.icon
  const historyPoints = points.slice(0, -1)
  const forecastPoints = points.slice(-2)
  const difference = Math.abs(prediction.forecast - product.price)

  return (
    <section className={`price-prediction card ${verdict.tone}`} aria-labelledby="forecast-heading">
      <div className="price-prediction-head">
        <h2 id="forecast-heading">Price outlook</h2>
        <span className="price-prediction-badge">
          <Icon aria-hidden="true" />
          {verdict.label}
        </span>
      </div>

      <svg
        className="price-prediction-chart"
        viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
        role="img"
        aria-label={`Price over the last ${prediction.weeks} weeks with a two week forecast of ${formatPrice(prediction.forecast)}`}
      >
        <polyline
          className="price-prediction-line"
          points={historyPoints.map(([x, y]) => `${x},${y}`).join(' ')}
        />
        <polyline
          className="price-prediction-forecast"
          points={forecastPoints.map(([x, y]) => `${x},${y}`).join(' ')}
        />
        <circle
          className="price-prediction-dot"
          cx={points[points.length - 1][0]}
          cy={points[points.length - 1][1]}
          r="4"
        />
      </svg>

      <p className="price-prediction-summary">
        Trend fitted over {prediction.weeks} weeks points to{' '}
        <strong>{formatPrice(prediction.forecast)}</strong> in two weeks
        {prediction.changePercent !== 0 ? ` (${prediction.changePercent}%)` : ''}, with{' '}
        {prediction.confidence}% confidence.
      </p>
      <p className="price-prediction-advice">{verdict.advice(difference)}</p>
    </section>
  )
}

export default PricePrediction
