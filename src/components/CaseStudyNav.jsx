import { Link, useLocation } from 'react-router-dom'

// Case-study order mirrors the home "Selected Work" grid; "Next" loops back
// to the first so it never dead-ends.
const ORDER = [
  { path: '/case-study/order-management', label: 'Addition Through Subtraction' },
  { path: '/case-study/rules',            label: 'Inside the Rule Engine' },
  { path: '/case-study/positions',        label: 'Well-Positioned' },
]

/**
 * Sticky secondary nav for case-study pages: docks flush beneath the main Nav
 * (via --nav-h) with a back-to-work link on the left and the next case study
 * on the right. Purely a navigation layer — no page content lives here.
 */
export default function CaseStudyNav() {
  const { pathname } = useLocation()
  const i = ORDER.findIndex(c => c.path === pathname)
  const next = i === -1 ? ORDER[0] : ORDER[(i + 1) % ORDER.length]

  return (
    <div className="cs-subnav">
      <div className="cs-subnav-inner">
        <Link to="/#work" className="cs-subnav-link cs-subnav-back">
          ← All Work
        </Link>
        <Link to={next.path} className="cs-subnav-link cs-subnav-next">
          Next Case Study →
        </Link>
      </div>
    </div>
  )
}
