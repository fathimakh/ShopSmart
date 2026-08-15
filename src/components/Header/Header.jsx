import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { FiColumns, FiHeart, FiMenu, FiShoppingCart, FiX } from 'react-icons/fi'
import './Header.css'

const navLinks = [
  { to: '/', label: 'Shop', icon: null, end: true },
  { to: '/compare', label: 'Compare', icon: FiColumns },
  { to: '/wishlist', label: 'Wishlist', icon: FiHeart },
  { to: '/cart', label: 'Cart', icon: FiShoppingCart }
]

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

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
            {navLinks.map(({ to, label, icon: Icon, end }) => (
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
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
