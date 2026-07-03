import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import App from './App.jsx'
import Bits from './pages/Bits.jsx'
import CaseStudy from './pages/CaseStudy.jsx'
import RulesCaseStudy from './pages/RulesCaseStudy.jsx'
import OrderManagementCaseStudy from './pages/OrderManagementCaseStudy.jsx'
// Full (protected) reference versions — do not pare these down when simplifying the concise pages above.
import CaseStudyFull from './pages/CaseStudyFull.jsx'
import RulesCaseStudyFull from './pages/RulesCaseStudyFull.jsx'
import OrderManagementCaseStudyFull from './pages/OrderManagementCaseStudyFull.jsx'
import ColorPreview from './pages/ColorPreview.jsx'
import About from './pages/About.jsx'
import AIDesign from './pages/AIDesign.jsx'
import Illustrations from './pages/Illustrations.jsx'
import Shortlist from './pages/Shortlist.jsx'
import './tokens.css'
import './styles.css'

// Disable the browser's automatic scroll restoration so back/forward also
// lands at the top rather than wherever the previous scroll offset was.
if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}

// Scrolls to the top of the page whenever the pathname changes.
// Must live inside <BrowserRouter> because it uses useLocation().
function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    // Honor an anchor hash (e.g. "/#work" from a case study's "All Work" link):
    // wait for the destination route to mount, then jump to that section.
    if (hash) {
      requestAnimationFrame(() => {
        const el = document.getElementById(hash.slice(1))
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY
          window.scrollTo({ top, left: 0, behavior: 'instant' })
        } else {
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
        }
      })
      return
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])
  return null
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/bits" element={<Bits />} />
        <Route path="/bits/shortlist" element={<Shortlist />} />
        <Route path="/case-study/positions" element={<CaseStudy />} />
        <Route path="/case-study/rules" element={<RulesCaseStudy />} />
        <Route path="/case-study/order-management" element={<OrderManagementCaseStudy />} />
        {/* Full (protected) reference versions */}
        <Route path="/case-study/positions/full" element={<CaseStudyFull />} />
        <Route path="/case-study/rules/full" element={<RulesCaseStudyFull />} />
        <Route path="/case-study/order-management/full" element={<OrderManagementCaseStudyFull />} />
        <Route path="/about" element={<About />} />
        <Route path="/ai-design" element={<AIDesign />} />
        <Route path="/illustrations" element={<Illustrations />} />
        <Route path="/preview/color" element={<ColorPreview />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
