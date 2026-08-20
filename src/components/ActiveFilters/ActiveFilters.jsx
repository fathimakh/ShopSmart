import { FiX } from 'react-icons/fi'
import { titleCase } from '../../utils/format'
import './ActiveFilters.css'

// Chips make it obvious what is narrowing the list, and let it be undone in one tap
// instead of hunting for the control in the sidebar.
function ActiveFilters({ filters, onChange, onReset }) {
  const chips = []

  filters.categories.forEach((category) => {
    chips.push({
      key: `category-${category}`,
      label: titleCase(category),
      remove: () => ({
        ...filters,
        categories: filters.categories.filter((entry) => entry !== category)
      })
    })
  })

  filters.brands.forEach((brand) => {
    chips.push({
      key: `brand-${brand}`,
      label: brand,
      remove: () => ({ ...filters, brands: filters.brands.filter((entry) => entry !== brand) })
    })
  })

  if (filters.minPrice !== '' || filters.maxPrice !== '') {
    const label =
      filters.minPrice !== '' && filters.maxPrice !== ''
        ? `$${filters.minPrice} to $${filters.maxPrice}`
        : filters.maxPrice !== ''
          ? `Under $${filters.maxPrice}`
          : `Over $${filters.minPrice}`

    chips.push({
      key: 'price',
      label,
      remove: () => ({ ...filters, minPrice: '', maxPrice: '' })
    })
  }

  if (filters.minRating) {
    chips.push({
      key: 'rating',
      label: `${filters.minRating} stars and up`,
      remove: () => ({ ...filters, minRating: 0 })
    })
  }

  if (filters.minDiscount) {
    chips.push({
      key: 'discount',
      label: 'On discount',
      remove: () => ({ ...filters, minDiscount: 0 })
    })
  }

  if (!chips.length) return null

  return (
    <div className="active-filters">
      <span className="active-filters-label">Filtering by</span>
      <ul>
        {chips.map((chip) => (
          <li key={chip.key}>
            <button type="button" onClick={() => onChange(chip.remove())}>
              {chip.label}
              <FiX aria-hidden="true" />
              <span className="visually-hidden">, remove this filter</span>
            </button>
          </li>
        ))}
      </ul>
      <button type="button" className="active-filters-clear" onClick={onReset}>
        Clear all
      </button>
    </div>
  )
}

export default ActiveFilters
