import { Route, Routes } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import CompareBar from './components/CompareBar/CompareBar'
import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import Compare from './pages/Compare'
import NotFound from './pages/NotFound'
import './App.css'

function App() {
  return (
    <div className="app">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <CompareBar />
      <Footer />
    </div>
  )
}

export default App
