import { useState } from 'react'
import { FiCornerDownLeft, FiX, FiZap } from 'react-icons/fi'
import './AiSearchPanel.css'

const examples = [
  'wireless headphones under $50 rated above 4',
  'cheapest samsung smartphone',
  'top rated laptops around $1200',
  'womens bags on sale'
]

function AiSearchPanel({ onSearch, onClear, chips, resultCount }) {
  const [value, setValue] = useState('')

  const runSearch = (query) => {
    const trimmed = query.trim()
    if (!trimmed) return
    setValue(trimmed)
    onSearch(trimmed)
  }

  const clear = () => {
    setValue('')
    onClear()
  }

  return (
    <section className="ai-search" aria-labelledby="ai-search-heading">
      <div className="ai-search-head">
        <span className="ai-search-icon" aria-hidden="true">
          <FiZap />
        </span>
        <div>
          <h2 id="ai-search-heading">Ask for what you need</h2>
          <p>
            Describe the product in your own words. Price, rating, brand and category are
            picked out of the sentence automatically.
          </p>
        </div>
      </div>

      <form
        className="ai-search-form"
        onSubmit={(event) => {
          event.preventDefault()
          runSearch(value)
        }}
      >
        <label className="visually-hidden" htmlFor="ai-search-input">
          Describe the product you are looking for
        </label>
        <input
          id="ai-search-input"
          type="text"
          value={value}
          placeholder="e.g. lightweight running shoes under $80 with good reviews"
          onChange={(event) => setValue(event.target.value)}
        />
        <button type="submit" className="btn btn-primary" disabled={!value.trim()}>
          <FiCornerDownLeft aria-hidden="true" />
          Search
        </button>
      </form>

      {chips.length ? (
        <div className="ai-search-result" role="status">
          <p className="ai-search-result-label">Understood as</p>
          <ul className="ai-search-chips">
            {chips.map((chip) => (
              <li key={chip} className="badge badge-primary">
                {chip}
              </li>
            ))}
          </ul>
          <p className="ai-search-count">{resultCount} matching products</p>
          <button type="button" className="btn btn-ghost ai-search-clear" onClick={clear}>
            <FiX aria-hidden="true" />
            Clear
          </button>
        </div>
      ) : (
        <div className="ai-search-examples">
          <p>Try:</p>
          <ul>
            {examples.map((example) => (
              <li key={example}>
                <button type="button" onClick={() => runSearch(example)}>
                  {example}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}

export default AiSearchPanel
