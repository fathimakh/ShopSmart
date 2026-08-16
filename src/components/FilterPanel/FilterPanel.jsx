import { useState } from 'react'
import { FiRotateCcw } from 'react-icons/fi'
import { priceBands, ratingOptions, toggleValue } from '../../utils/filters'
import { titleCase } from '../../utils/format'
import './FilterPanel.css'

function FilterPanel({ categories, brands, filters, onChange, onReset }) {
  const [brandQuery, setBrandQuery] = useState('')

  const visibleBrands = brands.filter((brand) =>
    brand.toLowerCase().includes(brandQuery.trim().toLowerCase())
  )

  const isBandActive = (band) =>
    filters.minPrice === band.minPrice && filters.maxPrice === band.maxPrice

  const updatePrice = (key) => (event) => {
    const { value } = event.target
    if (value === '' || Number(value) >= 0) {
      onChange({ ...filters, [key]: value })
    }
  }

  return (
    <form className="filter-panel" onSubmit={(event) => event.preventDefault()}>
      <div className="filter-panel-head">
        <h2>Filters</h2>
        <button type="button" className="btn btn-ghost filter-reset" onClick={onReset}>
          <FiRotateCcw aria-hidden="true" />
          Reset
        </button>
      </div>

      <fieldset className="filter-group">
        <legend>Category</legend>
        <div className="filter-scroll">
          {categories.map((category) => (
            <label key={category} className="filter-check">
              <input
                type="checkbox"
                checked={filters.categories.includes(category)}
                onChange={() =>
                  onChange({ ...filters, categories: toggleValue(filters.categories, category) })
                }
              />
              <span>{titleCase(category)}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="filter-group">
        <legend>Price</legend>
        <div className="filter-bands">
          {priceBands.map((band) => (
            <button
              key={band.label}
              type="button"
              className={isBandActive(band) ? 'filter-band is-active' : 'filter-band'}
              aria-pressed={isBandActive(band)}
              onClick={() =>
                onChange({
                  ...filters,
                  minPrice: isBandActive(band) ? '' : band.minPrice,
                  maxPrice: isBandActive(band) ? '' : band.maxPrice
                })
              }
            >
              {band.label}
            </button>
          ))}
        </div>
        <div className="filter-price-inputs">
          <label>
            <span>Min</span>
            <input
              type="number"
              min="0"
              inputMode="decimal"
              placeholder="0"
              value={filters.minPrice}
              onChange={updatePrice('minPrice')}
            />
          </label>
          <label>
            <span>Max</span>
            <input
              type="number"
              min="0"
              inputMode="decimal"
              placeholder="Any"
              value={filters.maxPrice}
              onChange={updatePrice('maxPrice')}
            />
          </label>
        </div>
      </fieldset>

      <fieldset className="filter-group">
        <legend>Customer rating</legend>
        {ratingOptions.map((option) => (
          <label key={option.value} className="filter-check">
            <input
              type="radio"
              name="minRating"
              checked={filters.minRating === option.value}
              onChange={() => onChange({ ...filters, minRating: option.value })}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </fieldset>

      <fieldset className="filter-group">
        <legend>Brand</legend>
        <input
          type="search"
          className="filter-brand-search"
          placeholder="Search brands"
          aria-label="Search brands"
          value={brandQuery}
          onChange={(event) => setBrandQuery(event.target.value)}
        />
        <div className="filter-scroll">
          {visibleBrands.map((brand) => (
            <label key={brand} className="filter-check">
              <input
                type="checkbox"
                checked={filters.brands.includes(brand)}
                onChange={() => onChange({ ...filters, brands: toggleValue(filters.brands, brand) })}
              />
              <span>{brand}</span>
            </label>
          ))}
          {!visibleBrands.length ? <p className="filter-empty">No brand matches that name.</p> : null}
        </div>
      </fieldset>
    </form>
  )
}

export default FilterPanel
