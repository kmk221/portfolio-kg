import { Link, useLocation } from 'react-router-dom'

export default function Nav() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link to="/" className="wordmark" aria-label="kristin.garza">
          kristin<span style={{ color: 'var(--clay)' }}>.</span>garza
        </Link>
        <ul>
          {isHome ? (
            <li><a href="#work">Work</a></li>
          ) : (
            <li><Link to="/">Work</Link></li>
          )}
          <li><Link to="/bits">Bits &amp; Pieces</Link></li>
          <li><Link to="/about">About</Link></li>
          <li>
            <a href="mailto:kmkerney221@gmail.com" className="btn btn--secondary btn--sm">
              Get in touch
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
