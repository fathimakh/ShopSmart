import { FiSearch } from 'react-icons/fi'
import './EmptyState.css'

// When the empty state is all a page shows, its title is that page's main heading,
// so the level is configurable rather than always sitting at h3.
function EmptyState({ title, message, action, icon: Icon = FiSearch, headingLevel = 2 }) {
  const Heading = `h${headingLevel}`

  return (
    <div className="empty-state card">
      <span className="empty-state-icon" aria-hidden="true">
        <Icon />
      </span>
      <Heading className="empty-state-title">{title}</Heading>
      {message ? <p>{message}</p> : null}
      {action}
    </div>
  )
}

export default EmptyState
