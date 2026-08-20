import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { CatalogProvider } from './context/CatalogContext'
import { ShopProvider } from './context/ShopContext'
import App from './App'
import './index.css'
import './styles/browse.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CatalogProvider>
        <ShopProvider>
          <App />
        </ShopProvider>
      </CatalogProvider>
    </BrowserRouter>
  </React.StrictMode>
)
