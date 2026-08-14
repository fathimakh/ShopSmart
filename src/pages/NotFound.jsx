import { Link } from 'react-router-dom'
import './NotFound.css'

function NotFound() {
  return (
    <div className="container not-found">
      <p className="not-found-code">404</p>
      <h1>We could not find that page</h1>
      <p className="not-found-text">
        The link may be broken or the product you were looking for is no longer listed.
      </p>
      <Link className="btn btn-primary" to="/">
        Back to shopping
      </Link>
    </div>
  )
}

export default NotFound
