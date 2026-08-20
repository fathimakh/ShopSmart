import { Suspense, lazy } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import CompareBar from './components/CompareBar/CompareBar'
import BottomNav from './components/BottomNav/BottomNav'
import Home from './pages/Home'
import './App.css'

// The shop page loads with the app; the rest arrive when the shopper navigates to them.
const ProductDetails = lazy(() => import('./pages/ProductDetails'))
const Cart = lazy(() => import('./pages/Cart'))
const Wishlist = lazy(() => import('./pages/Wishlist'))
const Compare = lazy(() => import('./pages/Compare'))
const Assistant = lazy(() => import('./pages/Assistant'))
const Checkout = lazy(() => import('./pages/Checkout'))
const CategoryPage = lazy(() => import('./pages/CategoryPage'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Pages that end in a fixed composer read better without the footer below them.
const pagesWithoutFooter = ['/assistant']

function App() {
  const { pathname } = useLocation()
  const showFooter = !pagesWithoutFooter.includes(pathname)

  return (
    <div className="app">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="app-main">
        <Suspense fallback={<p className="app-loading">Loading page</p>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/category/:slug" element={<CategoryPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/assistant" element={<Assistant />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <CompareBar />
      {showFooter ? <Footer /> : null}
      <BottomNav />
    </div>
  )
}

export default App
