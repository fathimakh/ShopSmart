import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { FiColumns, FiHeart, FiMenu, FiShoppingCart, FiTruck, FiX, FiZap } from 'react-icons/fi'
import { useShop } from '../../context/ShopContext'
import './Header.css'

const navLinks = [
  { to: '/', label: 'Shop', icon: null, end: true, countKey: null },
  { to: '/assistant', label: 'Assistant', icon: FiZap, countKey: null },
  { to: '/compare', label: 'Compare', icon: FiColumns, countKey: 'compareCount' },
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

  useEffect(() => {
    if (!menuOpen) return undefined

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  return (
    <header className="header">
      <p className="header-strip">
        <FiTruck aria-hidden="true" />
        Free delivery over $150
        <span className="header-strip-divider" aria-hidden="true" />
        <span className="header-strip-note">Demo store, no real payments are taken</span>
      </p>

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
