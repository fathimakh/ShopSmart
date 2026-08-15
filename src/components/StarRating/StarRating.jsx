import { FiStar } from 'react-icons/fi'
import './StarRating.css'

function StarRating({ value, showValue = true, size = 'md' }) {
  const rounded = Math.round(value)

  return (
    <span className={`star-rating star-rating-${size}`}>
      <span className="star-rating-icons" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((star) => (
          <FiStar key={star} className={star <= rounded ? 'is-filled' : ''} />
        ))}
      </span>
      {showValue ? <span className="star-rating-value">{value.toFixed(1)}</span> : null}
      <span className="visually-hidden">Rated {value.toFixed(1)} out of 5</span>
    </span>
  )
}

export default StarRating
