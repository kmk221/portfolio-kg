import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import CaseStudy from './pages/CaseStudy.jsx'
import RulesCaseStudy from './pages/RulesCaseStudy.jsx'
import OrderManagementCaseStudy from './pages/OrderManagementCaseStudy.jsx'
import ColorPreview from './pages/ColorPreview.jsx'
import AIDesign from './pages/AIDesign.jsx'
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/case-study/positions" element={<CaseStudy />} />
        <Route path="/case-study/rules" element={<RulesCaseStudy />} />
        <Route path="/case-study/order-management" element={<OrderManagementCaseStudy />} />
        <Route path="/ai-design" element={<AIDesign />} />
        <Route path="/preview/color" element={<ColorPreview />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
