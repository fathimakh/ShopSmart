import { Link, useLocation } from 'react-router-dom'
import { FiX } from 'react-icons/fi'
import { useShop } from '../../context/ShopContext'
import './CompareBar.css'

function CompareBar() {
  const { compareItems, compareLimit, toggleCompare, clearCompare } = useShop()
  const location = useLocation()

  if (!compareItems.length || location.pathname === '/compare') return null

  return (
    <div className="compare-bar" role="region" aria-label="Comparison tray">
      <div className="container compare-bar-inner">
        <ul className="compare-bar-items">
          {compareItems.map((item) => (
            <li key={item.id}>
              <img src={item.thumbnail} alt={item.title} width="44" height="44" />
              <button type="button" onClick={() => toggleCompare(item.id)}>
                <FiX aria-hidden="true" />
                <span className="visually-hidden">Remove {item.title} from comparison</span>
              </button>
            </li>
          ))}
        </ul>

        <p className="compare-bar-count">
          {compareItems.length} of {compareLimit} selected
        </p>

        <div className="compare-bar-actions">
          <button type="button" className="btn btn-ghost" onClick={clearCompare}>
            Clear
          </button>
          <Link className="btn btn-primary" to="/compare">
            Compare now
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CompareBar
