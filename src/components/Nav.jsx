import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Nav() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const [open, setOpen] = useState(false)

  // Close menu on route change
  useEffect(() => { setOpen(false) }, [pathname])

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link to="/" className="wordmark" aria-label="kristin.garza">
          kristin<span style={{ color: 'var(--clay)' }}>.</span>garza
        </Link>

        {/* Desktop nav */}
        <ul className="nav-links-desktop">
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

        {/* Hamburger button — mobile only */}
        <button
          className="nav-hamburger"
          onClick={() => setOpen(o => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <span className={`nav-hamburger-bar ${open ? 'open' : ''}`} />
          <span className={`nav-hamburger-bar ${open ? 'open' : ''}`} />
          <span className={`nav-hamburger-bar ${open ? 'open' : ''}`} />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="nav-mobile-drawer" onClick={() => setOpen(false)}>
          <ul onClick={e => e.stopPropagation()}>
            {isHome ? (
              <li><a href="#work" onClick={() => setOpen(false)}>Work</a></li>
            ) : (
              <li><Link to="/">Work</Link></li>
            )}
            <li><Link to="/bits">Bits &amp; Pieces</Link></li>
            <li><Link to="/about">About</Link></li>
            <li>
              <a href="mailto:kmkerney221@gmail.com" className="btn" style={{ width: '100%', justifyContent: 'center' }}>
                Get in touch
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}
