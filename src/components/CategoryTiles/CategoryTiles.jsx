import { titleCase } from '../../utils/format'
import './CategoryTiles.css'

// Storefronts lead with categories, so each tile borrows the picture of its best
// rated product rather than shipping a separate set of category images.
function CategoryTiles({ categories, activeCategory, onSelect }) {
  if (!categories.length) return null

  return (
    <section className="category-tiles" aria-labelledby="category-heading">
      <div className="section-heading">
        <h2 id="category-heading">Shop by category</h2>
        <p>Tap a category to filter the catalogue</p>
      </div>

      <ul>
        {categories.map(({ category, thumbnail, count }) => {
          const isActive = activeCategory === category

          return (
            <li key={category}>
              <button
                type="button"
                className={isActive ? 'category-tile is-active' : 'category-tile'}
                aria-pressed={isActive}
                onClick={() => onSelect(category)}
              >
                <span className="category-tile-media">
                  <img src={thumbnail} alt="" loading="lazy" width="72" height="72" />
                </span>
                <span className="category-tile-name">{titleCase(category)}</span>
                <span className="category-tile-count">{count}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default CategoryTiles
