import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { createPortal } from 'react-dom'

export default function Nav() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const [open, setOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const navRef = useRef(null)

  // Detect mobile viewport
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 760)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Publish the real nav height as --nav-h so sticky sub-navs (case studies)
  // can dock flush beneath it regardless of viewport / content height.
  useEffect(() => {
    const setH = () => {
      if (navRef.current) {
        document.documentElement.style.setProperty('--nav-h', `${navRef.current.offsetHeight}px`)
      }
    }
    setH()
    window.addEventListener('resize', setH)
    return () => window.removeEventListener('resize', setH)
  }, [isMobile])

  // Home only: the nav blends into the hero on landing and becomes a distinct
  // bar once it passes the hero band and sits over the cream body.
  useEffect(() => {
    if (!isHome) { setScrolled(false); return }
    const threshold = () => {
      const hero = document.querySelector('.page-hero')
      const navH = navRef.current ? navRef.current.offsetHeight : 56
      return hero ? hero.offsetHeight - navH : 480
    }
    let t = threshold()
    const onScroll = () => setScrolled(window.scrollY > t)
    const onResize = () => { t = threshold(); onScroll() }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [isHome, pathname])

  // All pages: auto-hide the nav while scrolling DOWN, reveal it on scroll UP
  // (and always show it at the very top).
  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      if (y <= 8) setHidden(false)
      else if (y > lastY + 4) setHidden(true)
      else if (y < lastY - 4) setHidden(false)
      lastY = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on route change
  useEffect(() => { setOpen(false); setHidden(false) }, [pathname])

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const drawer = isMobile && open ? createPortal(
    <div className="nav-mobile-drawer" onClick={() => setOpen(false)}>
      <ul onClick={e => e.stopPropagation()}>
        {isHome ? (
          <li><a href="#work" onClick={() => setOpen(false)}>Work</a></li>
        ) : (
          <li><Link to="/">Work</Link></li>
        )}
        <li><Link to="/bits">Bits &amp; Pieces</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/about#contact">Get in touch</Link></li>
      </ul>
    </div>,
    document.body
  ) : null

  return (
    <>
      <nav
        ref={navRef}
        className={`nav ${isHome ? 'nav--home' : ''} ${isHome && scrolled ? 'nav--scrolled' : ''} ${hidden ? 'nav--hidden' : ''}`}
      >
        <div className="nav-inner">
          <Link to="/" className="wordmark" aria-label="kristin.garza">
            kristin<span className="wordmark-dot">.</span>garza
          </Link>

          {/* Desktop nav  -  only rendered when not mobile */}
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
                <Link to="/about#contact" className="btn btn--secondary btn--sm">
                  Get in touch
                </Link>
              </li>
            </ul>
          )}

          {/* Hamburger  -  only on mobile */}
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
      </nav>

      {/* Drawer rendered via portal directly into document.body,
          outside the nav's backdrop-filter stacking context */}
      {drawer}
    </>
  )
}
