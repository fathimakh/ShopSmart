import { Link } from 'react-router-dom'
import { FiArrowRight, FiRefreshCw, FiShield, FiTruck, FiZap } from 'react-icons/fi'
import { formatPrice } from '../../utils/format'
import './Hero.css'

const promises = [
  { icon: FiTruck, title: 'Free delivery', text: 'On orders over $150' },
  { icon: FiRefreshCw, title: 'Easy returns', text: 'Straight from the order page' },
  { icon: FiShield, title: 'Secure checkout', text: 'Demo only, no card is charged' }
]

function Hero({ featured, catalogueSize, categoryCount, brandCount }) {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero-banner">
        <div className="hero-copy">
          <p className="badge badge-primary">Smarter product discovery</p>
          <h1 id="hero-heading">Find it faster, buy it smarter</h1>
          <p className="hero-text">
            {catalogueSize} products across {categoryCount} categories. Describe what you
            need in plain English and the assistant narrows it down for you.
          </p>

          <div className="hero-actions">
            <Link className="btn btn-primary" to="/assistant">
              <FiZap aria-hidden="true" />
              Ask the assistant
            </Link>
            <a className="btn btn-outline" href="#results-heading">
              Browse the catalogue
              <FiArrowRight aria-hidden="true" />
            </a>
          </div>

          <dl className="hero-stats">
            <div>
              <dt>Products</dt>
              <dd>{catalogueSize}</dd>
            </div>
            <div>
              <dt>Categories</dt>
              <dd>{categoryCount}</dd>
            </div>
            <div>
              <dt>Brands</dt>
              <dd>{brandCount}</dd>
            </div>
          </dl>
        </div>

        <ul className="hero-showcase">
          {featured.map((product, index) => (
            <li key={product.id} className={`hero-tile hero-tile-${index + 1}`}>
              <Link to={`/product/${product.id}`}>
                <img src={product.thumbnail} alt={product.title} loading="lazy" width="200" height="200" />
                <span className="hero-tile-meta">
                  <strong>{formatPrice(product.price)}</strong>
                  {product.discount >= 10 ? <em>{product.discount}% off</em> : null}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <ul className="hero-promises">
        {promises.map(({ icon: Icon, title, text }) => (
          <li key={title}>
            <span aria-hidden="true">
              <Icon />
            </span>
            <div>
              <p className="hero-promise-title">{title}</p>
              <p className="hero-promise-text">{text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Hero
