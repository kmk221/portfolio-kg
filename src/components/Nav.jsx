import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'
  const isDark = location.pathname === '/ai-design'

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const darkNavStyle = isDark ? {
    background: scrolled ? 'rgba(55,55,60,0.75)' : 'rgba(55,55,60,0.45)',
    borderBottomColor: 'rgba(243,239,217,0.08)',
  } : {}

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''} ${isDark ? 'nav--dark' : ''}`} style={darkNavStyle}>
      <Link to="/" className="nav-logo" style={isDark ? { color: '#f0ede6' } : {}}>
      kristin<span>.</span>garza
      </Link>
      <ul className="nav-links">
        {isHome ? (
          <>
            <li><a href="#work">Work</a></li>
            <li><a href="#about">About</a></li>
          </>
        ) : (
          <>
            <li><Link to="/" style={isDark ? { color: 'rgba(213,209,201,0.7)' } : {}}>← All Work</Link></li>
          </>
        )}
        <li><a href="mailto:kmkerney221@gmail.com" className="nav-cta" style={isDark ? { background: '#DDB365', color: '#2a2a2e', borderColor: '#DDB365' } : {}}>Get in touch</a></li>
      </ul>
    </nav>
  )
}
