import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Nav() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const [open, setOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile viewport
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 760)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

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

        {/* Desktop nav — only rendered when not mobile */}
        {!isMobile && (
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
        )}

        {/* Hamburger — only on mobile */}
        {isMobile && (
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
        )}
      </div>

      {/* Mobile drawer */}
      {isMobile && open && (
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
