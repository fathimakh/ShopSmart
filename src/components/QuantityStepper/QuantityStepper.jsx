import { FiMinus, FiPlus } from 'react-icons/fi'
import './QuantityStepper.css'

function QuantityStepper({ value, onChange, min = 1, max = 99, label = 'Quantity' }) {
  return (
    <div className="quantity-stepper">
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label={`Decrease ${label.toLowerCase()}`}
      >
        <FiMinus aria-hidden="true" />
      </button>
      <span aria-live="polite">
        <span className="visually-hidden">{label}: </span>
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label={`Increase ${label.toLowerCase()}`}
      >
        <FiPlus aria-hidden="true" />
      </button>
    </div>
  )
}

export default QuantityStepper
