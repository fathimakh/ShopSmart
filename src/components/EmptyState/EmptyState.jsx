import { FiSearch } from 'react-icons/fi'
import './EmptyState.css'

function EmptyState({ title, message, action, icon: Icon = FiSearch }) {
  return (
    <div className="empty-state card">
      <span className="empty-state-icon" aria-hidden="true">
        <Icon />
      </span>
      <h3>{title}</h3>
      {message ? <p>{message}</p> : null}
      {action}
    </div>
  )
}

export default EmptyState
