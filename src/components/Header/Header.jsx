import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { FiColumns, FiHeart, FiMenu, FiShoppingCart, FiX } from 'react-icons/fi'
import { useShop } from '../../context/ShopContext'
import './Header.css'

const navLinks = [
  { to: '/', label: 'Shop', icon: null, end: true, countKey: null },
  { to: '/compare', label: 'Compare', icon: FiColumns, countKey: null },
  { to: '/wishlist', label: 'Wishlist', icon: FiHeart, countKey: 'wishlistCount' },
  { to: '/cart', label: 'Cart', icon: FiShoppingCart, countKey: 'cartCount' }
]

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const counts = useShop()

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  return (
    <header className="header">
      <div className="container header-inner">
        <Link className="header-brand" to="/">
          <span className="header-mark" aria-hidden="true">
            S
          </span>
          <span>
            Shop<strong>Smart</strong>
          </span>
        </Link>

        <button
          type="button"
          className="header-toggle"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
          <span className="visually-hidden">{menuOpen ? 'Close menu' : 'Open menu'}</span>
        </button>

        <nav
          id="primary-navigation"
          className={menuOpen ? 'header-nav is-open' : 'header-nav'}
          aria-label="Primary"
        >
          <ul>
            {navLinks.map(({ to, label, icon: Icon, end, countKey }) => {
              const count = countKey ? counts[countKey] : 0

              return (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={end}
                    className={({ isActive }) =>
                      isActive ? 'header-link is-active' : 'header-link'
                    }
                  >
                    {Icon ? <Icon aria-hidden="true" /> : null}
                    {label}
                    {count > 0 ? (
                      <span className="header-count">
                        {count}
                        <span className="visually-hidden"> items</span>
                      </span>
                    ) : null}
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
