import { NavLink } from 'react-router-dom'
import { FiGrid, FiHeart, FiShoppingCart, FiZap } from 'react-icons/fi'
import { useShop } from '../../context/ShopContext'
import './BottomNav.css'

const items = [
  { to: '/', label: 'Shop', icon: FiGrid, end: true, countKey: null },
  { to: '/assistant', label: 'Assistant', icon: FiZap, countKey: null },
  { to: '/wishlist', label: 'Saved', icon: FiHeart, countKey: 'wishlistCount' },
  { to: '/cart', label: 'Cart', icon: FiShoppingCart, countKey: 'cartCount' }
]

// Phone sized screens get the usual thumb reachable bar instead of reaching for the
// menu button in the top corner.
function BottomNav() {
  const counts = useShop()

  return (
    <nav className="bottom-nav" aria-label="Primary mobile">
      <ul>
        {items.map(({ to, label, icon: Icon, end, countKey }) => {
          const count = countKey ? counts[countKey] : 0

          return (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) => (isActive ? 'bottom-nav-link is-active' : 'bottom-nav-link')}
              >
                <span className="bottom-nav-icon">
                  <Icon aria-hidden="true" />
                  {count > 0 ? (
                    <span className="bottom-nav-count">
                      {count > 9 ? '9+' : count}
                      <span className="visually-hidden"> items</span>
                    </span>
                  ) : null}
                </span>
                {label}
              </NavLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default BottomNav
