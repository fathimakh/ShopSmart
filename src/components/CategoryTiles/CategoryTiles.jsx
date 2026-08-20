import { NavLink } from 'react-router-dom'
import { titleCase } from '../../utils/format'
import './CategoryTiles.css'

// Storefronts lead with categories, so each tile borrows the picture of its best
// rated product rather than shipping a separate set of category images.
function CategoryTiles({ categories, heading = 'Shop by category', subtitle = 'Open a category to see everything in it' }) {
  if (!categories.length) return null

  return (
    <section className="category-tiles" aria-labelledby="category-heading">
      <div className="section-heading">
        <h2 id="category-heading">{heading}</h2>
        <p>{subtitle}</p>
      </div>

      <ul>
        {categories.map(({ category, thumbnail, count }) => (
          <li key={category}>
            <NavLink
              to={`/category/${category}`}
              className={({ isActive }) => (isActive ? 'category-tile is-active' : 'category-tile')}
            >
              <span className="category-tile-media">
                <img src={thumbnail} alt="" loading="lazy" width="72" height="72" />
              </span>
              <span className="category-tile-name">{titleCase(category)}</span>
              <span className="category-tile-count">{count} items</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default CategoryTiles
