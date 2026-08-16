import { FiSearch, FiX } from 'react-icons/fi'
import './SearchBar.css'

function SearchBar({ value, onChange, placeholder = 'Search products, brands or categories' }) {
  return (
    <div className="search-bar">
      <label className="visually-hidden" htmlFor="product-search">
        Search products
      </label>
      <FiSearch className="search-bar-icon" aria-hidden="true" />
      <input
        id="product-search"
        type="search"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
      {value ? (
        <button type="button" className="search-bar-clear" onClick={() => onChange('')}>
          <FiX aria-hidden="true" />
          <span className="visually-hidden">Clear search</span>
        </button>
      ) : null}
    </div>
  )
}

export default SearchBar
