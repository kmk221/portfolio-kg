import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import App from './App.jsx'
import Bits from './pages/Bits.jsx'
import CaseStudy from './pages/CaseStudy.jsx'
import RulesCaseStudy from './pages/RulesCaseStudy.jsx'
import OrderManagementCaseStudy from './pages/OrderManagementCaseStudy.jsx'
import CaseStudyOM from './pages/CaseStudyOM.jsx'
import ColorPreview from './pages/ColorPreview.jsx'
import DesignSystem from './pages/DesignSystem.jsx'
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
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])
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
        <Route path="/about" element={<About />} />
        <Route path="/ai-design" element={<AIDesign />} />
        <Route path="/illustrations" element={<Illustrations />} />
        <Route path="/preview/color" element={<ColorPreview />} />
        <Route path="/design-system" element={<DesignSystem />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
