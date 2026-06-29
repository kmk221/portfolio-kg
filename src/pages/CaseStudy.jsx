import { useEffect, useState, useRef } from 'react'
import Nav from '../components/Nav.jsx'
import './case-study-shared.css'
import './CaseStudy.css'

// --- Mini animated illustrations for heuristic cards ---
const panelBg = '#3d4f63'
const panelBorder = 'rgba(144,161,185,0.25)'
const textDim = 'rgba(246,251,222,0.45)'
const textBright = 'rgba(246,251,222,0.9)'
const green = '#5a9e7c'

// 1. Forced Context Switching  -  type qty, open drawer to check shares, come back
function AnimContextSwitch() {
  // s0=idle, s1="1", s2="13", s3="130"+pause, s4=drawer opens+pause, s5=highlight+long pause,
  // s6=drawer closes+pause, s7="13", s8="1", s9="", s10="1", s11="12", s12="120", s13=pause, s14=reset
  const [step, setStep] = useState(0)
  const [typedQty, setTypedQty] = useState('')
  //                   0      1      2      3      4      5      6      7      8      9     10     11    12
  const durations = [1000,  700,   700,  1200,   800,  2000,  1200,   700,   700,   700,   700,  1200,  400]

  const timerRef = useRef(null)
  useEffect(() => {
    let s = 0
    const advance = () => {
      s = (s + 1) % durations.length
      setStep(s)
      if (s === 1)  setTypedQty('1')
      if (s === 2)  setTypedQty('13')
      if (s === 3)  setTypedQty('130')
      if (s === 7)  setTypedQty('13')   // backspace "0"
      if (s === 8)  setTypedQty('1')    // backspace "3"
      if (s === 9)  setTypedQty('12')   // type "2"
      if (s === 10) setTypedQty('120')  // type "0"
      if (s === 12) setTypedQty('')
      timerRef.current = setTimeout(advance, durations[s])
    }
    timerRef.current = setTimeout(advance, durations[0])
    return () => clearTimeout(timerRef.current)
  }, [])

  const drawerOpen = step >= 4 && step <= 5
  const drawerH = drawerOpen ? 58 : 0
  const highlightRow = step === 5
  const blockWidths = [100, 75, 100, 60, 85, 55, 90, 70]
  const qtyFieldActive = step <= 3 || step >= 7

  return (
    <div style={{ background: panelBg, borderRadius: 8, padding: 10, fontFamily: 'Inter,sans-serif', fontSize: 10, color: textBright, border: `1px solid ${panelBorder}`, minHeight: 90, overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column', gap: 4 }}>
      {/* Header */}
      <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: 0.5, color: textDim }}>ORDER ENTRY TICKET</div>
      {/* Form fields  -  Qty field is live, rest are blocks */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5, flex: 1 }}>
        {/* Shares / Qty field  -  special */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6 }}>
          <span style={{ fontSize: 8, color: textDim, whiteSpace: 'nowrap' }}>Shares</span>
          <div style={{
            flex: 1, height: 14, background: qtyFieldActive ? 'rgba(144,161,185,0.25)' : 'rgba(255,255,255,0.07)',
            borderRadius: 3, border: `1px solid ${qtyFieldActive ? 'rgba(144,161,185,0.6)' : 'rgba(255,255,255,0.05)'}`,
            display: 'flex', alignItems: 'center', padding: '0 5px', transition: 'all 0.3s',
          }}>
            <span style={{ fontSize: 9, fontWeight: 700, color: textBright }}>{typedQty}</span>
            {qtyFieldActive && <span style={{ fontSize: 9, color: 'rgba(144,161,185,0.8)', marginLeft: 1, animation: 'none', opacity: step % 2 === 0 ? 1 : 0.2 }}>|</span>}
          </div>
        </div>
        {/* Rest of form as blocks */}
        {blockWidths.slice(0, 5).map((w, i) => (
          <div key={i} style={{ height: 7, width: `${w}%`, background: 'rgba(255,255,255,0.09)', borderRadius: 3 }}/>
        ))}
      </div>
      {/* Status hint */}
      <div style={{ fontSize: 7, color: textDim, textAlign: 'right', minHeight: 10 }}>
        {(step >= 1 && step <= 3) && 'entering shares...'}
        {(step === 4 || step === 5) && 'checking positions...'}
        
        {(step >= 7 && step <= 10) && 'correcting...'}
        {step === 11 && '120 ✓'}
      </div>
      {/* Positions drawer */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: drawerH, background: '#2d3e50', border: '1px solid rgba(144,161,185,0.4)', borderRadius: '6px 6px 0 0', transition: 'height 0.4s ease', overflow: 'hidden' }}>
        {drawerH > 10 && (
          <div style={{ padding: '6px 10px', display: 'flex', flexDirection: 'column', gap: 3 }}>
            <div style={{ fontSize: 7, fontWeight: 700, letterSpacing: 0.5, color: textDim, marginBottom: 2 }}>POSITIONS</div>
            {[{t:'AAPL',sh:'120 sh'},{t:'MSFT',sh:'85 sh'},{t:'GOOGL',sh:'40 sh'}].map((r, i) => (
              <div key={r.t} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '2px 4px', borderRadius: 3,
                background: highlightRow && i === 0 ? 'rgba(144,161,185,0.3)' : 'transparent',
                border: highlightRow && i === 0 ? '1px solid rgba(144,161,185,0.5)' : '1px solid transparent',
                transition: 'all 0.3s',
              }}>
                <span style={{ fontSize: 8, fontWeight: 700, color: textBright }}>{r.t}</span>
                <span style={{ fontSize: 8, color: highlightRow && i === 0 ? textBright : textDim, fontWeight: highlightRow && i === 0 ? 700 : 400 }}>{r.sh}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// 2. Hidden Positions  -  drawer hidden, fades in on hover-like cycle
function AnimHiddenInfo() {
  const [pulse, setPulse] = useState(false)
  useEffect(() => {
    const t = setInterval(() => setPulse(p => !p), 900)
    return () => clearInterval(t)
  }, [])

  const blockWidths = [100, 75, 100, 60, 85, 55, 90, 70]

  return (
    <div style={{ background: panelBg, borderRadius: 8, padding: 10, fontFamily: 'Inter,sans-serif', fontSize: 10, color: textBright, border: `1px solid ${panelBorder}`, minHeight: 90, overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column', gap: 4 }}>
      {/* Header */}
      <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: 0.5, color: textDim }}>ORDER ENTRY TICKET</div>
      {/* Blocked form fields */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5, flex: 1 }}>
        {blockWidths.map((w, i) => (
          <div key={i} style={{ height: 7, width: `${w}%`, background: 'rgba(255,255,255,0.09)', borderRadius: 3 }}/>
        ))}
      </div>
      {/* Collapsed drawer at bottom  -  static, but pulses to draw attention */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 16, background: 'rgba(144,161,185,0.15)', borderTop: '1px solid rgba(144,161,185,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px' }}>
        <span style={{ fontSize: 7, color: textDim, letterSpacing: 0.3 }}>▲  POSITIONS</span>
        {/* Pulsing exclamation */}
        <div style={{
          width: 14, height: 14, borderRadius: '50%',
          background: pulse ? 'rgba(177,124,93,0.85)' : 'rgba(177,124,93,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background 0.4s, transform 0.4s',
          transform: pulse ? 'scale(1.2)' : 'scale(1)',
          boxShadow: pulse ? '0 0 6px rgba(177,124,93,0.6)' : 'none',
        }}>
          <span style={{ fontSize: 9, fontWeight: 900, color: 'white', lineHeight: 1 }}>!</span>
        </div>
      </div>
    </div>
  )
}

// 4. Competing Elements  -  drawer at bottom fights with order entry form
function AnimCompeting() {
  const [drawerH, setDrawerH] = useState(0)
  useEffect(() => {
    let growing = true
    const t = setInterval(() => {
      setDrawerH(h => {
        if (growing) {
          const next = h + 4
          if (next >= 52) { growing = false; return 52 }
          return next
        } else {
          const next = h - 4
          if (next <= 0) { growing = true; return 0 }
          return next
        }
      })
    }, 60)
    return () => clearInterval(t)
  }, [])

  const blockWidths = [100, 75, 100, 60, 85, 55, 90, 70]
  const drawerOpen = drawerH > 10

  return (
    <div style={{ background: panelBg, borderRadius: 8, padding: 10, fontFamily: 'Inter,sans-serif', fontSize: 10, color: textBright, border: `1px solid ${panelBorder}`, minHeight: 90, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 4 }}>
      {/* Header */}
      <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: 0.5, color: textDim }}>ORDER ENTRY TICKET</div>
      {/* Blocked form fields  -  lower ones dim as drawer rises */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5, flex: 1 }}>
        {blockWidths.map((w, i) => {
          const blockedThreshold = Math.floor((1 - drawerH / 52) * blockWidths.length)
          const isBlocked = i >= blockedThreshold
          return (
            <div key={i} style={{
              height: 7, width: `${w}%`,
              background: 'rgba(255,255,255,0.09)',
              borderRadius: 3,
              opacity: isBlocked ? 0.3 : 1,
              transition: 'opacity 0.1s, background 0.1s',
            }}/>
          )
        })}
      </div>
      {/* Positions drawer sliding up from bottom */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: drawerH, background: '#2d3e50', border: '1px solid rgba(144,161,185,0.4)', borderRadius: '6px 6px 0 0', overflow: 'hidden', transition: 'none' }}>
        {drawerOpen && (
          <div style={{ padding: '5px 10px', display: 'flex', flexDirection: 'column', gap: 3 }}>
            <div style={{ fontSize: 7, fontWeight: 700, letterSpacing: 0.5, color: textDim, marginBottom: 1 }}>POSITIONS</div>
            {['AAPL','MSFT','GOOGL'].map(t => (
              <div key={t} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(144,161,185,0.12)', paddingBottom: 2 }}>
                <span style={{ fontSize: 8, fontWeight: 700, color: textBright }}>{t}</span>
                <span style={{ fontSize: 8, color: green }}>+1.8%</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

const heuristicItems = [
  { heuristic: 'Recognition Rather than Recall', severity: 'Critical', title: 'Forced Context Switching', desc: 'Advisors needed to remember positions data while navigating to and from the positions drawer, placing unnecessary load on working memory during complex trading tasks.', animation: <AnimContextSwitch /> },
  { heuristic: 'Visibility of System Status', severity: 'High', title: 'Hidden Positions Information', desc: 'Positions data was buried in collapsed drawers with minimal affordance. Users had no indication of what data was available or how to access it without prior knowledge.', animation: <AnimHiddenInfo /> },
  { heuristic: 'User Control and Freedom', severity: 'High', title: 'Competing Interface Elements', desc: 'Bottom drawer competed with trade entry form for visual focus and screen space, creating an either/or choice when both were needed simultaneously.', animation: <AnimCompeting /> },
]

const journeyStages = [
  {
    num: 1, stage: 'Pre-Trade Research', emotion: 'Neutral', emotionScore: 3,
    color: '#90a1b9',
    actions: ['Review client portfolio', 'Check current positions', 'Identify needs'],
    pains: ['Positions in separate app', 'No integration with research tools'],
    face: (
      <svg width="32" height="32" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="14" cy="14" r="11"/><line x1="10" y1="18" x2="18" y2="18"/><circle cx="10.5" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="17.5" cy="12" r="1" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    num: 2, stage: 'Decision Making', emotion: 'Concerned', emotionScore: 2,
    color: '#a0906e',
    actions: ['Calculate target allocations', 'Determine trades needed', 'Reference holdings'],
    pains: ['Context switching between apps', 'Manual calculations'],
    face: (
      <svg width="32" height="32" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="14" cy="14" r="11"/><path d="M10 19 Q14 16.5 18 19"/><circle cx="10.5" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="17.5" cy="12" r="1" fill="currentColor" stroke="none"/><path d="M11 9.5 Q12 8 13.5 9"/>
      </svg>
    ),
  },
  {
    num: 3, stage: 'Orders Drafting', emotion: 'Frustrated', emotionScore: 1,
    color: '#b17c5d',
    actions: ['Open trade ticket', 'Enter order details', 'Verify against positions'],
    pains: ['Positions hidden in drawer', "Can't see both simultaneously", 'Repeated toggling'],
    face: (
      <svg width="32" height="32" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="14" cy="14" r="11"/><path d="M10 20 Q14 16 18 20"/><path d="M9.5 11 L12 12.5"/><path d="M18.5 11 L16 12.5"/><path d="M10 9 Q11.5 7.5 13 9"/><path d="M15 9 Q16.5 7.5 18 9"/>
      </svg>
    ),
  },
  {
    num: 4, stage: 'Validation', emotion: 'Anxious', emotionScore: 1,
    color: '#b17c5d',
    actions: ['Double-check order accuracy', 'Verify position impact', 'Confirm allocation'],
    pains: ['Drawer obscures order form', 'Increased error risk'],
    face: (
      <svg width="32" height="32" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="14" cy="14" r="11"/><path d="M10 19.5 Q12 17 14 19 Q16 17 18 19.5"/><path d="M10 11.5 Q11 10 12.5 11.5"/><path d="M15.5 11.5 Q17 10 18 11.5"/><line x1="14" y1="5" x2="14" y2="7"/>
      </svg>
    ),
  },
  {
    num: 5, stage: 'Execution', emotion: 'Relieved & Exhausted', emotionScore: 2.5,
    color: '#6a81b2',
    actions: ['Submit orders', 'Monitor confirmation', 'Update records'],
    pains: ['Uncertainty during submission', 'Post-trade verification needed'],
    face: (
      <svg width="32" height="32" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="14" cy="14" r="11"/><path d="M10 17 Q14 20.5 18 17"/><path d="M9 12 Q10.5 10.5 12 12"/><path d="M16 12 Q17.5 10.5 19 12"/><line x1="9" y1="9" x2="11" y2="10.5"/><line x1="19" y1="9" x2="17" y2="10.5"/>
      </svg>
    ),
  },
]

function JourneyMap() {
  const [active, setActive] = useState(0)
  const stage = journeyStages[active]

  // Emotion arc  -  viewBox 0 0 100 100, preserveAspectRatio none for full-width stretch
  // Circles rendered as HTML divs (percentage positioned) to avoid distortion
  const W = 100, H = 100
  const yPct = journeyStages.map(s => 100 - ((s.emotionScore / 5) * 80) - 8) // % from top
  const pts = journeyStages.map((s, i) => ({
    x: (2 * i + 1) * 10,
    y: yPct[i],
  }))
  const path = pts.map((p, i) =>
    i === 0 ? `M ${p.x} ${p.y}` : `C ${(pts[i-1].x + p.x)/2} ${pts[i-1].y} ${(pts[i-1].x + p.x)/2} ${p.y} ${p.x} ${p.y}`
  ).join(' ')

  return (
    <div style={{ marginTop: 40 }}>
      {/* Stage tabs + arc share the same width wrapper */}
      <div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 0, position: 'relative' }}>
          {/* Connector line */}
          <div style={{ position: 'absolute', top: 28, left: '10%', right: '10%', height: 2, background: 'rgba(144,161,185,0.2)', zIndex: 0 }} />
          {journeyStages.map((s, i) => (
            <button key={i} onClick={() => setActive(i)} style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: '0 8px 20px', position: 'relative', zIndex: 1,
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                background: active === i ? s.color : 'white',
                border: `2px solid ${active === i ? s.color : 'rgba(144,161,185,0.3)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: active === i ? 'white' : s.color,
                transition: 'all 0.2s', boxShadow: active === i ? `0 4px 16px ${s.color}40` : 'none',
              }}>
                {s.face}
              </div>
              <span style={{
                fontSize: 12, fontWeight: active === i ? 700 : 500,
                color: active === i ? s.color : 'var(--steel-blue)',
                textAlign: 'center', lineHeight: 1.3, transition: 'all 0.2s',
              }}>{s.stage}</span>
            </button>
          ))}
        </div>

        {/* Emotion arc */}
        <div style={{ marginTop: 8, marginBottom: 24 }}>
          <div style={{ position: 'relative', height: 160 }}>
            {/* Line-only SVG  -  stretches full width without distorting circles */}
            <svg viewBox="0 0 100 100" preserveAspectRatio="none"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
              <path d={path} stroke="#90a1b9" strokeWidth="1.5" fill="none"
                strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke"/>
            </svg>
            {/* Circles as HTML  -  percentage positioned, always perfect circles */}
            {pts.map((p, i) => (
              <div key={i} onClick={() => setActive(i)} style={{
                position: 'absolute',
                left: `${p.x}%`, top: `${p.y}%`,
                transform: 'translate(-50%, -50%)',
                width: 15, height: 15, borderRadius: '50%',
                background: i === active ? journeyStages[i].color : 'white',
                border: `2px solid ${i === active ? journeyStages[i].color : '#90a1b9'}`,
                boxShadow: i === active ? `0 0 0 3px ${journeyStages[i].color}30` : 'none',
                cursor: 'pointer', transition: 'all 0.2s', zIndex: 1,
              }} />
            ))}
          </div>
        </div>
      </div>

      {/* Detail panel */}
      <div style={{
        borderRadius: 14, overflow: 'hidden',
        border: `1.5px solid ${stage.color}40`,
        background: 'var(--bg)',
        transition: 'all 0.2s',
      }}>
        {/* Header */}
        <div style={{ padding: '20px 28px', background: stage.color, display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ color: 'white', opacity: 0.9 }}>{stage.face}</div>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: 2 }}>Stage {stage.num}</p>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: 'white', margin: 0 }}>{stage.stage}</h3>
          </div>
          <div style={{ marginLeft: 'auto', background: 'rgba(255,255,255,0.15)', borderRadius: 8, padding: '6px 14px' }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.7)', margin: 0, letterSpacing: 0.5 }}>Emotion</p>
            <p style={{ fontSize: 14, fontWeight: 700, color: 'white', margin: 0 }}>{stage.emotion}</p>
          </div>
        </div>
        {/* Body */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
          <div style={{ padding: '24px 28px', borderRight: '1px solid rgba(144,161,185,0.15)' }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--steel-blue)', marginBottom: 12 }}>Actions</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {stage.actions.map((a, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <img src="/check.svg" alt="" style={{ width: 15, height: 15, flexShrink: 0, marginTop: 2 }} />
                  <span style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.5 }}>{a}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ padding: '24px 28px' }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: '#c27070', marginBottom: 12 }}>Pain Points</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {stage.pains.map((p, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <img src="/x.svg" alt="" style={{ width: 15, height: 15, flexShrink: 0, marginTop: 2 }} />
                  <span style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.5 }}>{p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Stage counter hint */}
      <p className="cs-caption" style={{textAlign:'center',marginTop:12}}>Stage {active + 1} of {journeyStages.length}  -  click any stage to explore</p>
    </div>
  )
}

// ─── Lo-Fi Concept Illustrations ───────────────────────────────────────────
const BG = '#3d4f63'
const SURFACE = 'rgba(255,255,255,0.07)'
const BORDER = 'rgba(144,161,185,0.22)'
const LABEL = 'rgba(246,251,222,0.5)'
const TEXT = 'rgba(246,251,222,0.88)'
const BLOCK = 'rgba(255,255,255,0.1)'
const BLOCK_DIM = 'rgba(255,255,255,0.06)'
const DIVIDER = 'rgba(144,161,185,0.18)'

// Shared primitives
const Chip = ({w=32, h=7, dim=false}) => <div style={{width:w, height:h, background: dim ? BLOCK_DIM : BLOCK, borderRadius:3, flexShrink:0}}/>
const Row = ({label, dim=false, style={}}) => (
  <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:8, ...style}}>
    {label ? <span style={{fontSize:8, fontWeight:700, color: dim ? LABEL : TEXT, letterSpacing:0.3, whiteSpace:'nowrap'}}>{label}</span> : <Chip w={40} dim={dim}/>}
    <Chip w={28} dim={dim}/>
  </div>
)
const SectionLabel = ({children, color=LABEL}) => (
  <div style={{fontSize:10, fontWeight:700, letterSpacing:1, textTransform:'uppercase', color, marginBottom:6}}>{children}</div>
)
const Panel = ({children, style={}}) => (
  <div style={{background:SURFACE, border:`1px solid ${BORDER}`, borderRadius:6, padding:'8px 10px', ...style}}>{children}</div>
)
const PositionRow = ({ticker, dim=false}) => (
  <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'3px 0', borderBottom:`1px solid ${DIVIDER}`}}>
    <span style={{fontSize:11, fontWeight:700, color: dim ? LABEL : TEXT}}>{ticker}</span>
    <div style={{display:'flex', gap:6, alignItems:'center'}}>
      <Chip w={22} dim={dim}/><Chip w={18} dim={dim}/>
      <span style={{fontSize:10, color:'rgba(90,180,120,0.8)', fontWeight:600, minWidth:22, textAlign:'right'}}>+2.1%</span>
    </div>
  </div>
)
const FormField = ({label, dim=false}) => (
  <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:5}}>
    <span style={{fontSize:10, color: dim ? 'rgba(144,161,185,0.4)' : LABEL}}>{label}</span>
    <div style={{width:48, height:7, background: dim ? BLOCK_DIM : BLOCK, borderRadius:3}}/>
  </div>
)
const Btn = ({label, primary=false}) => (
  <div style={{display:'inline-flex', alignItems:'center', justifyContent:'center', padding:'4px 10px', borderRadius:4,
    background: primary ? 'rgba(106,129,178,0.6)' : SURFACE,
    border:`1px solid ${primary ? 'rgba(106,129,178,0.6)' : BORDER}`,
    fontSize:10, fontWeight:700, color: primary ? TEXT : LABEL, cursor:'default'}}>{label}</div>
)

// Dot grid background texture
// Placeholder form block  -  big rectangle suggesting a form area
const FormBlock = ({rows=3, dim=false}) => (
  <div style={{display:'flex', flexDirection:'column', gap:6, flex:1}}>
    {Array.from({length:rows}).map((_,i)=>(
      <div key={i} style={{height:18, background: dim ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.09)', borderRadius:4}}/>
    ))}
  </div>
)

const DotGrid = () => (
  <svg style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none'}} xmlns="http://www.w3.org/2000/svg">
    <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
      <circle cx="1" cy="1" r="0.8" fill="rgba(144,161,185,0.2)"/>
    </pattern>
    <rect width="100%" height="100%" fill="url(#dots)"/>
  </svg>
)

// Nav bar shared
const NavBar = ({title="Last Name surname", right=null}) => (
  <div style={{display:'flex', justifyContent:'space-between', alignItems:'center',
    padding:'6px 10px', background:'rgba(255,255,255,0.05)', borderBottom:`1px solid ${BORDER}`, marginBottom:8}}>
    <span style={{fontSize:11, fontWeight:700, color:TEXT}}>{title}</span>
    {right || <div style={{display:'flex', gap:4}}>{['Order Entry','Trade Entry'].map(t=><span key={t} style={{fontSize:7,color:LABEL}}>{t}</span>)}</div>}
  </div>
)

// ── 1. Horizontal Cards (selected) ──────────────────────────────────────────
function LoFiHorizontal() {
  const [posOpen, setPosOpen] = useState(true)
  const positions = [
    {t:'AAPL',sh:'120 sh',g:'+2.4%'},{t:'MSFT',sh:'85 sh',g:'+1.1%'},{t:'GOOGL',sh:'40 sh',g:'-0.8%',neg:true},
    {t:'NVDA',sh:'60 sh',g:'+5.2%'},{t:'AMZN',sh:'30 sh',g:'+0.6%'},{t:'JPM',sh:'90 sh',g:'-1.3%',neg:true},
    {t:'TSLA',sh:'25 sh',g:'+3.1%'},{t:'V',sh:'200 sh',g:'+0.9%'},{t:'BRK',sh:'10 sh',g:'+1.4%'},
    {t:'HD',sh:'55 sh',g:'-0.4%',neg:true},{t:'PG',sh:'80 sh',g:'+0.7%'},{t:'MA',sh:'45 sh',g:'+2.1%'},
  ]
  return (
    <div style={{background:BG, borderRadius:10, overflow:'hidden', position:'relative', width:'100%', height:'100%', fontFamily:'Inter,sans-serif', display:'flex', flexDirection:'column'}}>
      <DotGrid/>

      <div style={{flex:1, padding:'10px 10px 10px', display:'flex', gap:8, position:'relative', zIndex:1}}>
        {/* Left card  -  Order Entry Ticket */}
        <Panel style={{flex:2, display:'flex', flexDirection:'column'}}>
          <SectionLabel color='rgba(144,161,185,0.8)'>Order Entry Ticket</SectionLabel>
          <div style={{display:'flex', flexDirection:'column', gap:10, flex:1}}>
            <div style={{display:'flex', flexDirection:'column', gap:5}}>
              <div style={{height:16, width:'100%', background:'rgba(255,255,255,0.09)', borderRadius:4}}/>
              <div style={{height:16, width:'85%', background:'rgba(255,255,255,0.09)', borderRadius:4}}/>
            </div>
            <div style={{height:1, background:DIVIDER}}/>
            <div style={{display:'flex', flexDirection:'column', gap:5}}>
              <div style={{height:16, width:'100%', background:'rgba(255,255,255,0.09)', borderRadius:4}}/>
              <div style={{height:16, width:'70%', background:'rgba(255,255,255,0.09)', borderRadius:4}}/>
              <div style={{height:16, width:'90%', background:'rgba(255,255,255,0.09)', borderRadius:4}}/>
            </div>
            <div style={{height:1, background:DIVIDER}}/>
            <div style={{display:'flex', flexDirection:'column', gap:5}}>
              <div style={{height:16, width:'60%', background:'rgba(255,255,255,0.09)', borderRadius:4}}/>
              <div style={{height:16, width:'80%', background:'rgba(255,255,255,0.09)', borderRadius:4}}/>
            </div>
          </div>
          <div style={{display:'flex', gap:6, marginTop:10}}>
            <Btn label="Cancel"/><Btn label="Verify Order" primary/>
          </div>
        </Panel>
        {/* Right card  -  Positions, collapsible */}
        <div
          onClick={() => setPosOpen(o => !o)}
          style={{
            flexShrink: 0,
            width: posOpen ? '33%' : 28,
            transition: 'width 0.35s ease',
            background:'#2d3e50',
            borderRadius:8,
            border:'1px solid rgba(144,161,185,0.4)',
            overflow:'hidden',
            cursor:'pointer',
            display:'flex',
            flexDirection: posOpen ? 'column' : 'row',
            alignItems: posOpen ? 'stretch' : 'center',
            justifyContent: posOpen ? 'flex-start' : 'center',
            position:'relative',
          }}
        >
          {posOpen ? (
            <div style={{padding:'8px 10px', display:'flex', flexDirection:'column', position:'absolute', inset:0}}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10}}>
                <SectionLabel color={TEXT}>Positions</SectionLabel>
                <span style={{position:'relative', display:'inline-flex', alignItems:'center', justifyContent:'center', width:16, height:16}}>
                  <span style={{fontSize:10, color:'rgba(144,161,185,0.7)', lineHeight:1}}>›</span>
                  <span style={{
                    position:'absolute', top:-4, right:-4,
                    width:10, height:10, borderRadius:'50%',
                    background:'rgba(230,180,60,0.85)',
                    animation:'lofi-blink 1.2s ease-in-out infinite',
                    pointerEvents:'none',
                  }}/>
                </span>
              </div>
              <div style={{flex:1, overflowY:'auto', marginRight:-4, paddingRight:4,
                scrollbarWidth:'thin',
                scrollbarColor:'rgba(144,161,185,0.45) rgba(255,255,255,0.04)',
              }}>
                {positions.map(r=>(
                  <div key={r.t} style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'5px 0', borderBottom:`1px solid ${DIVIDER}`}}>
                    <span style={{fontSize:11,fontWeight:700,color:TEXT,minWidth:40}}>{r.t}</span>
                    <span style={{fontSize:10,color:LABEL}}>{r.sh}</span>
                    <span style={{fontSize:10,fontWeight:600,color:r.neg?'rgba(194,112,112,0.9)':'rgba(90,180,120,0.9)'}}>{r.g}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{display:'flex', flexDirection:'column', alignItems:'center', gap:6}}>
              <span style={{position:'relative', display:'inline-flex', alignItems:'center', justifyContent:'center', width:14, height:14}}>
                <span style={{fontSize:9, color:'rgba(144,161,185,0.8)', lineHeight:1}}>‹</span>
                <span style={{
                  position:'absolute', top:-4, right:-4,
                  width:10, height:10, borderRadius:'50%',
                  background:'rgba(230,180,60,0.85)',
                  animation:'lofi-blink 1.2s ease-in-out infinite',
                  pointerEvents:'none',
                }}/>
              </span>
              <span style={{fontSize:7, fontWeight:700, color:'rgba(144,161,185,0.6)', letterSpacing:1, writingMode:'vertical-rl', transform:'rotate(180deg)', userSelect:'none'}}>POSITIONS</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ── 2. Modal Layer ───────────────────────────────────────────────────────────
function LoFiModal() {
  return (
    <div style={{background:BG, borderRadius:10, overflow:'hidden', position:'relative', width:'100%', height:'100%', fontFamily:'Inter,sans-serif', display:'flex', flexDirection:'column'}}>
      <DotGrid/>

      <div style={{flex:1, padding:'10px 10px 10px', position:'relative', zIndex:1}}>
        {/* Dimmed background form */}
        <Panel style={{opacity:0.35}}>
          <SectionLabel>Order Entry Ticket</SectionLabel>
          <div style={{display:'flex', flexDirection:'column', gap:10, flex:1}}>
            <div style={{display:'flex', flexDirection:'column', gap:5}}>
              <div style={{height:16, width:'100%', background:'rgba(255,255,255,0.09)', borderRadius:4}}/>
              <div style={{height:16, width:'85%', background:'rgba(255,255,255,0.09)', borderRadius:4}}/>
            </div>
            <div style={{height:1, background:DIVIDER}}/>
            <div style={{display:'flex', flexDirection:'column', gap:5}}>
              <div style={{height:16, width:'100%', background:'rgba(255,255,255,0.09)', borderRadius:4}}/>
              <div style={{height:16, width:'70%', background:'rgba(255,255,255,0.09)', borderRadius:4}}/>
              <div style={{height:16, width:'90%', background:'rgba(255,255,255,0.09)', borderRadius:4}}/>
            </div>
            <div style={{height:1, background:DIVIDER}}/>
            <div style={{display:'flex', flexDirection:'column', gap:5}}>
              <div style={{height:16, width:'60%', background:'rgba(255,255,255,0.09)', borderRadius:4}}/>
              <div style={{height:16, width:'80%', background:'rgba(255,255,255,0.09)', borderRadius:4}}/>
            </div>
          </div>
        </Panel>
        {/* Modal overlay */}
        <div style={{position:'absolute', inset:'12px 6px', display:'flex', alignItems:'center', justifyContent:'center', zIndex:10}}>
          <div style={{background:'#2d3e50', border:`1px solid rgba(144,161,185,0.4)`, borderRadius:8, padding:'12px 14px', width:'80%', boxShadow:'0 8px 32px rgba(0,0,0,0.4)'}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8}}>
              <SectionLabel color={TEXT}>Positions</SectionLabel>
              <span style={{fontSize:9, color:LABEL, cursor:'default'}}>✕</span>
            </div>
            <PositionRow ticker="AAPL"/>
            <PositionRow ticker="MSFT"/>
            <PositionRow ticker="GOOGL"/>
            <PositionRow ticker="NVDA"/>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── 3. Floating Widget ───────────────────────────────────────────────────────
function LoFiFloating() {
  return (
    <div style={{background:BG, borderRadius:10, overflow:'hidden', position:'relative', width:'100%', height:'100%', fontFamily:'Inter,sans-serif', display:'flex', flexDirection:'column'}}>
      <DotGrid/>

      <div style={{flex:1, padding:'10px 10px 10px', position:'relative', zIndex:1, display:'flex', flexDirection:'column'}}>
        {/* Full form */}
        <Panel style={{flex:1, display:'flex', flexDirection:'column'}}>
          <SectionLabel>Order Entry Ticket</SectionLabel>
          <div style={{display:'flex', flexDirection:'column', gap:10, flex:1}}>
            <div style={{display:'flex', flexDirection:'column', gap:5}}>
              <div style={{height:16, width:'100%', background:'rgba(255,255,255,0.09)', borderRadius:4}}/>
              <div style={{height:16, width:'85%', background:'rgba(255,255,255,0.09)', borderRadius:4}}/>
            </div>
            <div style={{height:1, background:DIVIDER}}/>
            <div style={{display:'flex', flexDirection:'column', gap:5}}>
              <div style={{height:16, width:'100%', background:'rgba(255,255,255,0.09)', borderRadius:4}}/>
              <div style={{height:16, width:'70%', background:'rgba(255,255,255,0.09)', borderRadius:4}}/>
              <div style={{height:16, width:'90%', background:'rgba(255,255,255,0.09)', borderRadius:4}}/>
            </div>
            <div style={{height:1, background:DIVIDER}}/>
            <div style={{display:'flex', flexDirection:'column', gap:5}}>
              <div style={{height:16, width:'60%', background:'rgba(255,255,255,0.09)', borderRadius:4}}/>
              <div style={{height:16, width:'80%', background:'rgba(255,255,255,0.09)', borderRadius:4}}/>
            </div>
          </div>
          <div style={{display:'flex', gap:6, marginTop:'auto', paddingTop:8}}><Btn label="Cancel"/><Btn label="Verify Order" primary/></div>
        </Panel>
        {/* Floating widget  -  draggable looking */}
        <div style={{position:'absolute', top:16, right:4, width:'42%', background:'#2d3e50', border:`1.5px solid rgba(144,161,185,0.45)`, borderRadius:7, padding:'8px 10px', boxShadow:'0 4px 20px rgba(0,0,0,0.35)', zIndex:20}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6, cursor:'move'}}>
            <SectionLabel color={TEXT}>Positions</SectionLabel>
            <div style={{display:'flex', gap:4}}>
              <span style={{fontSize:8,color:LABEL}}>⋮⋮</span>
              <span style={{fontSize:8,color:LABEL}}>✕</span>
            </div>
          </div>
          <PositionRow ticker="AAPL"/>
          <PositionRow ticker="MSFT"/>
          <PositionRow ticker="GOOGL"/>
        </div>
      </div>
    </div>
  )
}

// ── 4. Vertical Cards ────────────────────────────────────────────────────────
function LoFiVertical() {
  return (
    <div style={{background:BG, borderRadius:10, overflow:'hidden', position:'relative', width:'100%', height:'100%', fontFamily:'Inter,sans-serif', display:'flex', flexDirection:'column'}}>
      <DotGrid/>

      <div style={{flex:1, padding:'10px 10px 10px', display:'flex', flexDirection:'column', gap:6, position:'relative', zIndex:1}}>
        {/* Top: order entry ticket */}
        <Panel style={{flex:1, display:'flex', flexDirection:'column'}}>
          <SectionLabel>Order Entry Ticket</SectionLabel>
          <div style={{display:'flex', flexDirection:'column', gap:8}}>
            <div style={{display:'flex', flexDirection:'column', gap:5}}>
              <div style={{height:7, width:'100%', background:'rgba(255,255,255,0.09)', borderRadius:3}}/>
              <div style={{height:7, width:'85%', background:'rgba(255,255,255,0.09)', borderRadius:3}}/>
            </div>
            <div style={{height:1, background:DIVIDER}}/>
            <div style={{display:'flex', flexDirection:'column', gap:5}}>
              <div style={{height:7, width:'100%', background:'rgba(255,255,255,0.09)', borderRadius:3}}/>
              <div style={{height:7, width:'70%', background:'rgba(255,255,255,0.09)', borderRadius:3}}/>
              <div style={{height:7, width:'90%', background:'rgba(255,255,255,0.09)', borderRadius:3}}/>
            </div>
            <div style={{height:1, background:DIVIDER}}/>
            <div style={{display:'flex', flexDirection:'column', gap:5}}>
              <div style={{height:7, width:'60%', background:'rgba(255,255,255,0.09)', borderRadius:3}}/>
              <div style={{height:7, width:'80%', background:'rgba(255,255,255,0.09)', borderRadius:3}}/>
            </div>
          </div>
          <div style={{display:'flex', gap:5, marginTop:'auto', paddingTop:8}}><Btn label="Cancel"/><Btn label="Verify Order" primary/></div>
        </Panel>
        {/* Bottom: positions strip */}
        <Panel style={{background:'rgba(144,161,185,0.1)', borderColor:'rgba(144,161,185,0.3)'}}>
          <SectionLabel color={TEXT}>Positions</SectionLabel>
          {['AAPL','MSFT','GOOGL'].map(t=>(
            <div key={t} style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'4px 0', borderBottom:`1px solid ${DIVIDER}`}}>
              <span style={{fontSize:8,fontWeight:700,color:TEXT,minWidth:36}}>{t}</span>
              <Chip w={20} dim/>
              <Chip w={28} dim/>
              <span style={{fontSize:8,fontWeight:600,color:'rgba(90,180,120,0.9)'}}>+1.8%</span>
            </div>
          ))}
        </Panel>
      </div>
    </div>
  )
}

// ── 5. Overlay Panel ─────────────────────────────────────────────────────────
function LoFiOverlay() {
  const blockWidths = [100, 75, 100, 60, 85, 55, 90, 70]
  const positions = [
    {t:'AAPL',sh:'120 sh',g:'+2.4%'},{t:'MSFT',sh:'85 sh',g:'+1.1%'},{t:'GOOGL',sh:'40 sh',g:'-0.8%',neg:true},
    {t:'NVDA',sh:'60 sh',g:'+5.2%'},{t:'AMZN',sh:'30 sh',g:'+0.6%'},{t:'JPM',sh:'90 sh',g:'-1.3%',neg:true},
    {t:'TSLA',sh:'25 sh',g:'+3.1%'},{t:'V',sh:'200 sh',g:'+0.9%'},
  ]
  return (
    <div style={{background:BG, overflow:'hidden', position:'relative', width:'100%', height:'100%', fontFamily:'Inter,sans-serif'}}>
      <DotGrid/>

      {/* Full-bleed order entry ticket  -  no border/card */}
      <div style={{position:'absolute', inset:0, padding:'10px 12px', display:'flex', flexDirection:'column', gap:6, zIndex:1}}>
        <SectionLabel color='rgba(144,161,185,0.5)'>Order Entry Ticket</SectionLabel>
        <div style={{display:'flex', flexDirection:'column', gap:8}}>
          <div style={{display:'flex', flexDirection:'column', gap:5}}>
            <div style={{height:16, width:'100%', background:'rgba(255,255,255,0.07)', borderRadius:4}}/>
            <div style={{height:16, width:'85%', background:'rgba(255,255,255,0.07)', borderRadius:4}}/>
          </div>
          <div style={{height:1, background:'rgba(144,161,185,0.1)'}}/>
          <div style={{display:'flex', flexDirection:'column', gap:5}}>
            <div style={{height:16, width:'100%', background:'rgba(255,255,255,0.07)', borderRadius:4}}/>
            <div style={{height:16, width:'70%', background:'rgba(255,255,255,0.07)', borderRadius:4}}/>
            <div style={{height:16, width:'90%', background:'rgba(255,255,255,0.07)', borderRadius:4}}/>
          </div>
          <div style={{height:1, background:'rgba(144,161,185,0.1)'}}/>
          <div style={{display:'flex', flexDirection:'column', gap:5}}>
            <div style={{height:16, width:'60%', background:'rgba(255,255,255,0.07)', borderRadius:4}}/>
            <div style={{height:16, width:'80%', background:'rgba(255,255,255,0.07)', borderRadius:4}}/>
          </div>
        </div>
        <div style={{display:'flex', gap:6, marginTop:'auto'}}>
          <Btn label="Cancel"/><Btn label="Verify Order" primary/>
        </div>
      </div>

      {/* Overlay panel  -  slides over the top of the content, no gap */}
      <div style={{
        position:'absolute', top:0, right:0, bottom:0, width:'34%',
        background:'#222f3e',
        borderLeft:'1px solid rgba(144,161,185,0.4)',
        boxShadow:'-6px 0 24px rgba(0,0,0,0.45)',
        zIndex:10,
        display:'flex', flexDirection:'column',
        overflow:'hidden',
      }}>
        <div style={{padding:'10px 10px 6px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:`1px solid ${DIVIDER}`}}>
          <SectionLabel color={TEXT}>Positions</SectionLabel>
          <span style={{fontSize:9,color:LABEL,cursor:'default'}}>✕ Close</span>
        </div>
        <div style={{flex:1, overflowY:'auto', padding:'0 10px',
          scrollbarWidth:'thin', scrollbarColor:'rgba(144,161,185,0.4) rgba(255,255,255,0.03)'}}>
          {positions.map(r=>(
            <div key={r.t} style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'6px 0', borderBottom:`1px solid ${DIVIDER}`}}>
              <span style={{fontSize:11,fontWeight:700,color:TEXT,minWidth:36}}>{r.t}</span>
              <span style={{fontSize:10,color:LABEL}}>{r.sh}</span>
              <span style={{fontSize:10,fontWeight:600,color:r.neg?'rgba(194,112,112,0.9)':'rgba(90,180,120,0.9)'}}>{r.g}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Scales illustration content proportionally  -  must be called as a function per-render for hooks to work
function ScaledIllustration({ children, designWidth = 480, designHeight = 270, inset = 0 }) {
  const measureRef = useRef(null)
  const [scale, setScale] = useState(1)
  useEffect(() => {
    const el = measureRef.current
    if (!el) return
    const measure = () => {
      const w = el.getBoundingClientRect().width
      if (w > 0) setScale(w / designWidth)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [designWidth])
  // Outer div: fills the column, shows the background color (cream/terracotta)
  // measureRef div: sits inset by `inset` px on all sides, measured for scaling
  return (
    <div style={{ width: '100%', position: 'relative', paddingTop: `calc(${designHeight / designWidth * 100}% + ${inset * 2}px)` }}>
      <div ref={measureRef} style={{
        position: 'absolute',
        top: inset, left: inset, right: inset, bottom: inset,
        overflow: 'hidden',
        borderRadius: 8,
      }}>
        <div style={{
          position: 'absolute',
          top: 0, left: 0,
          width: designWidth,
          height: designHeight,
          transformOrigin: 'top left',
          transform: `scale(${scale})`,
        }}>
          {children}
        </div>
      </div>
    </div>
  )
}

function getConceptIllustration(name, inset = 0) {
  if (name === 'Modal Layer') return <ScaledIllustration inset={inset}><LoFiModal/></ScaledIllustration>
  if (name === 'Floating Widget') return <ScaledIllustration inset={inset}><LoFiFloating/></ScaledIllustration>
  if (name === 'Vertical Cards') return <ScaledIllustration inset={inset}><LoFiVertical/></ScaledIllustration>
  if (name === 'Overlay Panel') return <ScaledIllustration inset={inset}><LoFiOverlay/></ScaledIllustration>
  if (name === 'Horizontal Cards') return <ScaledIllustration inset={inset}><LoFiHorizontal/></ScaledIllustration>
  return null
}

const concepts = [
  { name: 'Modal Layer', img: '/concepts/modal.svg', pros: ["Clean interface, doesn't consume layout space"], cons: ['Requires click to access  -  breaks workflow'] },
  { name: 'Floating Widget', img: '/concepts/floating.svg', pros: ['Flexible positioning'], cons: ['Can obstruct content, adds window management'] },
  { name: 'Vertical Cards', img: '/concepts/vertical.svg', pros: ['Always visible'], cons: ['Vertical scrolling required, consumes horizontal space'] },
  { name: 'Overlay Panel', img: '/concepts/overlay.svg', pros: ['Hides when not needed'], cons: ['Requires toggle, can feel disruptive'] },
]

function ConceptCarousel() {
  const [idx, setIdx] = useState(0)
  const prev = () => setIdx(i => (i - 1 + concepts.length) % concepts.length)
  const next = () => setIdx(i => (i + 1) % concepts.length)
  const concept = concepts[idx]
  return (
    <div style={{ marginTop: 24 }}>
      <div className="concept-card-grid" style={{ border: '1px solid var(--hairline)', borderRadius: 14, overflow: 'hidden', display: 'grid', gridTemplateColumns: '2fr 1fr' }}>
        {/* Illustration  -  16:9 */}
        <div style={{ background: 'rgba(55,43,11,0.03)' }}>
          {getConceptIllustration(concept.name, 16)}
        </div>
        {/* Text  -  right side */}
        <div style={{ padding: '36px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderLeft: '1px solid var(--hairline)', background: 'rgba(243,239,217,0.4)' }}>
          <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--ink-3)', background: 'transparent', border: '1px solid var(--hairline-strong)', padding: '4px 10px', borderRadius: 999, alignSelf: 'flex-start', marginBottom: 20 }}>Other Concepts Explored</span>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--ink-2)', marginBottom: 20 }}>{concept.name}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {concept.pros.map((p, i) => (
              <p key={"p"+i} className="concept-pro" style={{ margin: 0 }}><img src="/check.svg" alt="check" /><span>{p}</span></p>
            ))}
            {concept.cons.map((c, i) => (
              <p key={"c"+i} className="concept-con" style={{ margin: 0 }}><img src="/x.svg" alt="x" /><span>{c}</span></p>
            ))}
          </div>
        </div>
      </div>
      {/* Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, marginTop: 20 }}>
        <button onClick={prev} style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid var(--hairline-strong)', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--clay)' }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polyline points="10,3 5,8 10,13"/></svg>
        </button>
        <div style={{ display: 'flex', gap: 8 }}>
          {concepts.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} style={{ width: 8, height: 8, borderRadius: '50%', border: 'none', cursor: 'pointer', padding: 0, background: i === idx ? 'var(--clay)' : 'var(--hairline-strong)', transition: 'background 0.2s' }} />
          ))}
        </div>
        <button onClick={next} style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid var(--hairline-strong)', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--clay)' }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polyline points="6,3 11,8 6,13"/></svg>
        </button>
      </div>
      <p className="cs-caption" style={{textAlign:'center',marginTop:8}}>{idx + 1} of {concepts.length} concepts</p>
    </div>
  )
}

// Chapter list for the side-rail scrollspy. Each id matches a section's id
// below; collapsed-on-hover dot strip at ≥1440px.
const CHAPTERS = [
  { id: 'ch-tldr',        label: 'Context' },
  { id: 'ch-research',    label: 'Research' },
  { id: 'ch-solution',    label: 'Redesign' },
  { id: 'ch-outcomes',    label: 'Outcome' },
  { id: 'ch-reflection',  label: 'Reflection' },
]

export default function CaseStudy() {
  const [activeChapter, setActiveChapter] = useState(CHAPTERS[0].id)
  const [navVisible, setNavVisible] = useState(false)
  const [navCollapsed, setNavCollapsed] = useState(false)

  useEffect(() => { window.scrollTo(0, 0) }, [])

  // Scrollspy: track active chapter + show/hide rail past hero, hide near
  // bottom. Mirrors the OM/Rules implementation.
  useEffect(() => {
    const sections = CHAPTERS.map((c) => document.getElementById(c.id)).filter(Boolean)
    if (!sections.length) return
    const threshold = () => Math.max(140, window.innerHeight * 0.28)
    const update = () => {
      const t = threshold()
      let current = sections[0].id
      for (const s of sections) {
        const rect = s.getBoundingClientRect()
        if (rect.top - t <= 0) current = s.id
        else break
      }
      setActiveChapter((prev) => (prev === current ? prev : current))
      const scrollY = window.scrollY || window.pageYOffset
      const past = scrollY > 520
      const docH = document.documentElement.scrollHeight
      const viewH = window.innerHeight
      const nearBottom = scrollY + viewH > docH - 600
      setNavVisible(past && !nearBottom)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  const scrollToChapter = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - 24
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <div className="cs-page positions-page">
      <Nav />

      {/* Sticky chapter nav  -  left rail at ≥1100px viewport */}
      <aside
        className={`om-chapter-nav${navVisible ? ' is-visible' : ''}${navCollapsed ? ' is-collapsed' : ''}`}
        aria-label="Case study chapters"
      >
        <div className="om-chapter-nav-header">
          <span className="om-chapter-nav-title">{navCollapsed ? '' : "What's inside"}</span>
          <button
            type="button"
            className="om-chapter-nav-toggle"
            aria-label={navCollapsed ? 'Expand navigation' : 'Collapse navigation'}
            onClick={() => setNavCollapsed(c => !c)}
          >
            {navCollapsed ? '›' : '‹'}
          </button>
        </div>
        <ul className="om-chapter-nav-list">
          {CHAPTERS.map(({ id, label }) => (
            <li key={id}>
              <button
                type="button"
                className={`om-chapter-nav-link${activeChapter === id ? ' is-active' : ''}`}
                aria-current={activeChapter === id ? 'true' : undefined}
                onClick={() => scrollToChapter(id)}
              >
                <span className="om-chapter-nav-label">{label}</span>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Home-style ambient radial-gradient wrapper  -  same 11-orb wash used on
          home and OM, cycling steel-blue → gold → terracotta down the full page. */}
      <div>

      {/* 1. HERO */}
      <section style={{
        background: 'transparent',
        minHeight: 'auto',
        paddingTop: 'var(--section-padding)', overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column'
      }}>
        <div style={{ maxWidth: 'var(--content-width)', width: '100%', margin: '0 auto', padding: '0 var(--side-padding)' }}>
          <div style={{ marginBottom: 32 }}>
            <span className="eyebrow">Case Study · Trading Platform · Design Systems · 2025</span>
          </div>
          <h1 style={{ fontFamily: 'var(--f-serif)', fontWeight: 300, fontSize: 'clamp(36px, 5vw, 64px)', letterSpacing: '-0.01em', lineHeight: 1.1, color: 'var(--ink-2)', margin: '0 0 20px' }}>Well-Positioned<span style={{ color: 'var(--clay)' }}>.</span></h1>
          <p style={{ fontFamily: 'var(--f-serif)', fontStyle: 'normal', fontWeight: 300, fontSize: 'clamp(17px, 1.5vw, 21px)', lineHeight: 1.55, color: 'var(--ink-2)', maxWidth: 560, margin: '0 0 36px' }}>Designing in-flow context for institutional investing workflows—bringing account and position data to the moment it matters most.</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['Research', 'Strategy', 'Product Design', 'Design Systems'].map(tag => (
              <span key={tag} className="chip chip--neutral">{tag}</span>
            ))}
          </div>
        </div>
        {/* High-fidelity hero mockup — order entry ticket + inline positions panel */}
        <div style={{ maxWidth: 'var(--content-width)', width: '100%', margin: '48px auto 0', padding: '0 var(--side-padding)', paddingBottom: 0 }}>
          <div style={{ borderRadius: '12px 12px 0 0', overflow: 'hidden', boxShadow: '0 20px 60px rgba(22,38,62,0.22), 0 4px 16px rgba(22,38,62,0.12)', border: '1px solid rgba(125,145,165,0.18)', borderBottom: 'none' }}>
            {/* App top nav */}
            <div style={{ background: '#1a2744', padding: '0 20px', height: 38, display: 'flex', alignItems: 'center', gap: 0, justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                {['🏠 Home', 'Menu ▾', 'User Options ▾'].map(item => (
                  <span key={item} style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', fontWeight: 500, cursor: 'pointer' }}>{item}</span>
                ))}
              </div>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>↩ Sign Out</span>
            </div>
            {/* App body */}
            <div style={{ display: 'flex', background: '#f4f5f7', minHeight: 480 }}>
              {/* Left sidebar */}
              <div style={{ width: 36, background: '#1a2744', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 16, gap: 18, flexShrink: 0 }}>
                {['👤','📄','🔔','📋','📈','📊','✏️'].map((icon, i) => (
                  <div key={i} style={{ width: 24, height: 24, borderRadius: 6, background: i === 3 ? 'rgba(255,255,255,0.15)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, opacity: i === 3 ? 1 : 0.45 }}>{icon}</div>
                ))}
              </div>
              {/* Main content */}
              <div style={{ flex: 1, padding: '24px 28px' }}>
                {/* Page header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                  <div>
                    <div style={{ fontSize: 11, color: '#6b7a99', marginBottom: 4, fontWeight: 500 }}>← Back to Orders</div>
                    <div style={{ fontSize: 17, fontWeight: 700, color: '#1a2744' }}>Order Entry Ticket</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ fontSize: 10, color: '#6b7a99' }}>Jane Smith · IRA · ****4821</div>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4caf7d' }} />
                    <span style={{ fontSize: 10, color: '#4caf7d', fontWeight: 600 }}>Live</span>
                  </div>
                </div>
                {/* Two-panel layout */}
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  {/* Order ticket panel */}
                  <div style={{ flex: 2, background: '#fff', borderRadius: 10, border: '1px solid #e2e6ef', padding: '20px 20px 16px', flexShrink: 0 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6b7a99', marginBottom: 16 }}>Order Entry Ticket</div>
                    {/* Symbol */}
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ fontSize: 10, color: '#6b7a99', marginBottom: 4, fontWeight: 500 }}>Symbol</div>
                      <div style={{ height: 32, background: '#f4f5f7', border: '1px solid #dde2ef', borderRadius: 6, display: 'flex', alignItems: 'center', padding: '0 10px', fontSize: 13, color: '#1a2744', fontWeight: 700 }}>AAPL</div>
                    </div>
                    {/* Buy / Sell */}
                    <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
                      <div style={{ flex: 1, height: 32, background: '#e8f5ee', border: '1.5px solid #4caf7d', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#2d7a52', fontWeight: 700 }}>BUY</div>
                      <div style={{ flex: 1, height: 32, background: '#f4f5f7', border: '1px solid #dde2ef', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#9aa3b8', fontWeight: 600 }}>SELL</div>
                    </div>
                    {/* Qty + Price */}
                    <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 10, color: '#6b7a99', marginBottom: 4, fontWeight: 500 }}>Quantity</div>
                        <div style={{ height: 32, background: '#fff', border: '1.5px solid #4a7cdc', borderRadius: 6, display: 'flex', alignItems: 'center', padding: '0 10px', fontSize: 13, color: '#1a2744', fontWeight: 700 }}>120</div>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 10, color: '#6b7a99', marginBottom: 4, fontWeight: 500 }}>Price Type</div>
                        <div style={{ height: 32, background: '#f4f5f7', border: '1px solid #dde2ef', borderRadius: 6, display: 'flex', alignItems: 'center', padding: '0 10px', fontSize: 11, color: '#1a2744', fontWeight: 600 }}>Market ▾</div>
                      </div>
                    </div>
                    {/* TIF */}
                    <div style={{ marginBottom: 20 }}>
                      <div style={{ fontSize: 10, color: '#6b7a99', marginBottom: 4, fontWeight: 500 }}>Time in Force</div>
                      <div style={{ height: 32, background: '#f4f5f7', border: '1px solid #dde2ef', borderRadius: 6, display: 'flex', alignItems: 'center', padding: '0 10px', fontSize: 11, color: '#1a2744', fontWeight: 600 }}>Day ▾</div>
                    </div>
                    {/* Buttons */}
                    <div style={{ display: 'flex', gap: 8 }}>
                      <div style={{ flex: 1, height: 34, background: '#fff', border: '1px solid #dde2ef', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#6b7a99', fontWeight: 600, cursor: 'pointer' }}>Cancel</div>
                      <div style={{ flex: 2, height: 34, background: '#4a7cdc', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Verify Order</div>
                    </div>
                  </div>
                  {/* Positions panel */}
                  <div style={{ flex: 1, minWidth: 0, background: '#fff', borderRadius: 10, border: '1px solid #e2e6ef', overflow: 'hidden' }}>
                    <div style={{ padding: '14px 18px 10px', borderBottom: '1px solid #f0f2f7', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#1a2744' }}>Positions</span>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#f5b731' }} />
                    </div>
                    {/* Column headers */}
                    <div style={{ padding: '8px 18px', display: 'grid', gridTemplateColumns: '1fr 60px 64px', gap: 0, borderBottom: '1px solid #f0f2f7' }}>
                      {['Symbol', 'Shares', 'Day %'].map(h => (
                        <span key={h} style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9aa3b8' }}>{h}</span>
                      ))}
                    </div>
                    {[
                      { s: 'AAPL', q: '120 sh', p: '+2.4%', pos: true, hl: true },
                      { s: 'MSFT', q: '85 sh',  p: '+1.1%', pos: true },
                      { s: 'GOOGL', q: '40 sh', p: '-0.8%', pos: false },
                      { s: 'NVDA', q: '60 sh',  p: '+5.2%', pos: true },
                      { s: 'AMZN', q: '30 sh',  p: '+0.6%', pos: true },
                      { s: 'JPM',  q: '90 sh',  p: '-1.3%', pos: false },
                      { s: 'TSLA', q: '25 sh',  p: '+3.1%', pos: true },
                    ].map(row => (
                      <div key={row.s} style={{ padding: '10px 18px', display: 'grid', gridTemplateColumns: '1fr 60px 64px', borderBottom: '1px solid #f7f8fb', background: row.hl ? '#f0f4ff' : '#fff', alignItems: 'center' }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: row.hl ? '#4a7cdc' : '#1a2744' }}>{row.s}</span>
                        <span style={{ fontSize: 11, color: '#6b7a99', fontWeight: 500 }}>{row.q}</span>
                        <span style={{ fontSize: 11, fontWeight: 700, color: row.pos ? '#2d7a52' : '#c0392b', textAlign: 'right' }}>{row.p}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TL;DR */}
      <section id="ch-tldr" style={{ background: 'transparent', padding: 'var(--section-padding) 0' }}>
        <div style={{ maxWidth: 'var(--content-width)', width: '100%', margin: '0 auto', padding: '0 var(--side-padding)', display: 'flex', flexDirection: 'column', gap: 56 }}>
          <div>
            <h2 style={{ fontFamily: 'var(--f-serif)', fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 300, color: 'var(--ink-2)', lineHeight: 1.1, marginBottom: 40 }}>tl;dr</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 36, maxWidth: 820 }}>
              <div>
                <div className="section-spread" style={{ marginBottom: 12 }}><span className="eyebrow">Context</span><span className="rule"></span></div>
                <ul className="cs-body" style={{ margin: 0, paddingLeft: '1.2em' }}>
                  <li style={{ marginBottom: 8 }}>Across 10 trading apps, essential positions data was buried or in separate tools</li>
                  <li style={{ marginBottom: 8 }}>Advisors relied on a second monitor just to see their own positions</li>
                  <li>Brief: fix one order ticket; I reframed it to fix the platform</li>
                </ul>
              </div>
              <div>
                <div className="section-spread" style={{ marginBottom: 12 }}><span className="eyebrow">Approach</span><span className="rule"></span></div>
                <ul className="cs-body" style={{ margin: 0, paddingLeft: '1.2em' }}>
                  <li style={{ marginBottom: 8 }}>Designed a horizontal positions panel that surfaced context without competing with the workflow</li>
                  <li style={{ marginBottom: 8 }}>Partnered with design system to formalize it as a reusable component, no per-app custom work</li>
                  <li>Embedded success measurement and event tracking from day one</li>
                </ul>
              </div>
              <div>
                <div className="section-spread" style={{ marginBottom: 12 }}><span className="eyebrow">Outcome</span><span className="rule"></span></div>
                <ul className="cs-body" style={{ margin: 0, paddingLeft: '1.2em' }}>
                  <li style={{ marginBottom: 8 }}>Pattern shipped across 10+ applications with ~90% design system coverage</li>
                  <li style={{ marginBottom: 8 }}>Aligned 10+ product teams on a single layout standard for dense workflows</li>
                  <li>Gave advisors reliable, in-flow positions context where they needed it most</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="meta-pills">
            <span className="chip chip--neutral">Lead UX Designer  -  Trading</span>
            <span className="chip chip--neutral">8 weeks (Q4 2025)</span>
            <span className="chip chip--neutral">Product Design · Engineering · Product Management</span>
          </div>
        </div>
      </section>

      {/* 3. FRAMING  -  warm callout on cream, matching CS1's highlighted blocks */}
      <section style={{ background: 'transparent', padding: 'var(--section-padding) 0' }}>
        <div style={{ maxWidth: 'var(--content-width)', width: '100%', margin: '0 auto', padding: '0 var(--side-padding)' }}>
          <h2 className="cs-h2" style={{ marginBottom: 32 }}>
            impact + scale {'>'} convenience + speed
          </h2>
          <div style={{ maxWidth: 961, padding: '28px 32px', borderLeft: '4px solid var(--clay)', background: 'rgba(184,103,87,0.04)', borderRadius: '0 12px 12px 0' }}>
            <p className="cs-body" style={{marginBottom:16}}>
              This work was initially planned as a routine feature lift-and-shift; bringing an existing positions drawer pattern from another order ticket into a new trading application. While this approach optimized for speed, early design exploration revealed that simply integrating the existing drawer into the new app would perpetuate significant discoverability and workflow issues that existed on the platform.
            </p>
            <p className="cs-body" style={{margin:0}}>
              I led lightweight design explorations that reframed the problem from <em>how to integrate an existing component</em> to <em>how to design for efficient in-flow decision-making</em>. In partnership with product, design system, and development teams, we identified an opportunity to establish a simple yet impactful new solution that would scale beyond a single trade ticket and support a broader range of contextual utilities across the platform's data-dense workflows.
            </p>
            <p className="cs-body" style={{marginTop:16,marginBottom:0}}>
              The goal wasn't to solve one ticket — it was to establish a pattern that wouldn't require custom work each time a new application needed positions context.
            </p>
          </div>
        </div>
      </section>

      {/* 4. PROJECT DETAILS */}
      <section id="ch-context" style={{ background: 'transparent', padding: 'var(--section-padding) 0' }}>
        <div style={{ maxWidth: 'var(--content-width)', width: '100%', margin: '0 auto', padding: '0 var(--side-padding)' }}>
          {/* Measurement constraint callout */}
          <div style={{ padding: '28px 36px', background: 'transparent', border: '1px solid var(--clay-edge)', borderRadius: 12 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 10 }}>
              <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                <polygon points="9,0 18,16 0,16" fill="#F5C518"/>
                <rect x="8" y="5" width="2" height="5" fill="#7a5c00"/>
                <rect x="8" y="12" width="2" height="2" fill="#7a5c00"/>
              </svg>
              <p style={{ fontFamily: 'var(--f-mono)', fontSize: 13, fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--clay)', margin: 0 }}>A note on measurement</p>
            </div>
            <p className="cs-body" style={{margin:0,paddingLeft:32}}>
              This project was completed in an environment without mature analytics infrastructure or established KPI frameworks for UX work. Quantitative instrumentation wasn't yet standard practice on this platform. Rather than treat this as an inevitable constraint, I defined and proposed a comprehensive measurement approach to guide future implementation and product decisions. The plan included a detailed success framework and measurement plan  -  in the <strong>Measuring Success</strong> section below.
            </p>
          </div>
        </div>
      </section>

      {/* 5. PROBLEM HYPOTHESIS */}
      <section id="ch-hypothesis" style={{ background: 'transparent', padding: 'var(--section-padding) 0' }}>
        <div style={{ maxWidth: 'var(--content-width)', width: '100%', margin: '0 auto', padding: '0 var(--side-padding)' }}>
          <h2 className="cs-h2">Initial Problem Hypothesis</h2>
          <p className="cs-body" style={{ marginBottom: 0 }}><strong>The initial hypothesis was clear: positions data is critical to every trade decision, yet it remained hidden, secondary, or spatially competitive with the primary task.</strong></p>
        </div>
      </section>

      {/* 7. PLATFORM AUDIT */}
      <section id="ch-research" style={{ background: 'transparent', padding: 'var(--section-padding) 0' }}>
        <div style={{ maxWidth: 'var(--content-width)', width: '100%', margin: '0 auto', padding: '0 var(--side-padding)' }}>
          <h2 className="cs-h2">Platform Audit</h2>
          <p className="cs-body">I conducted a comprehensive audit of all trading platform applications to document how positions data was currently surfaced across the ecosystem.</p>
          <div className="stats-row" style={{ marginTop: 40 }}>
            {[['10', 'Applications Identified'], ['5', 'Different Patterns'], ['12+', 'Usability Issues']].map(([n, l]) => (
              <div key={l} className="stat-item" style={{ background: 'var(--bg)' }}>
                <div className="stat-number">{n}</div>
                <div className="stat-label">{l}</div>
              </div>
            ))}
          </div>
          {/* Featured Example */}
          <div style={{ marginTop: 48, borderRadius: 12, overflow: 'hidden', border: '1px solid var(--hairline)' }}>
            <div style={{ padding: '16px 24px', background: 'white', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid var(--hairline)' }}>
              <h4 style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink-2)', margin: 0 }}>Multi-Order Ticket</h4>
              <span className="featured-badge">Featured Example</span>
              <span style={{ fontSize: 12, color: 'var(--ink-mute)', marginLeft: 'auto' }}>Bottom Drawer Pattern</span>
            </div>
            <div style={{ padding: 24, background: 'rgba(55,43,11,0.03)' }}>
              <img src="/featuredexample.png" alt="Multi-Order Ticket featured example" style={{ width: '100%', display: 'block', borderRadius: 8 }} />
            </div>
            <div style={{ padding: '24px', background: 'white' }}>
              <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink-2)', marginBottom: 16 }}>Critical Issues Identified</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {[
                  { title: 'Low Discoverability', desc: 'Viewing positions data begins workflow, but the trigger to open the drawer is hidden at the bottom of the page' },
                  { title: 'Inefficient Use of Screen Space', desc: "Drawer's shape allowed for viewing many details on a few positions when users actually needed a few key details on many positions" },
                  { title: 'Unclear Trigger Component & Label', desc: 'Ambiguous trigger placement and text suggests navigation rather than in-page context' },
                  { title: 'Obscures Primary Interface', desc: 'Opening drawer covers trade entry form  -  forces toggle behavior between positions and order entry' },
                ].map((issue, i) => (
                  <div key={i} style={{ background: 'rgba(184,103,87,0.05)', borderLeft: '3px solid var(--clay)', borderRadius: 4, padding: '14px 16px 14px 18px' }}>
                    <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink-2)', marginBottom: 6 }}>{issue.title}</p>
                    <p className="cs-caption" style={{margin:0}}>{issue.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="audit-grid" style={{ marginTop: 40 }}>
            {[
              { title: 'Positions App  -  Opened/Unrealized', pattern: 'Full Page Application', img: '/positions.svg', issues: ['Separate application  -  no in-context viewing', '12+ columns create information overload', 'Horizontal scrolling required', 'Poor scanability  -  all data equal weight'] },
              { title: 'Order Entry Tickets (6 apps)', pattern: 'Bottom Drawer', img: '/orderentry.svg', issues: ['Low discoverability', 'Unclear trigger component & label', 'Competes with primary interface', 'Can only see a few positions  -  vertical scrolling required'] },
              { title: 'OneView Monitor', pattern: 'Small Tile', img: '/oneview.svg', issues: ['Competes with other widgets for attention', 'Size constraints limit breadth and depth of data shown', 'Not contextual to certain decisions, yet widget is fixed in open state'] },
              { title: 'Held Orders Manager', pattern: 'Fixed Side Panel', img: '/HOM.svg', issues: ['Limited horizontal space reduces data density', 'Always open  -  occupying key screen real-estate even when not needed'] },
            ].map(card => (
              <div key={card.title} className="audit-card">
                <div className="audit-card-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <h4 className="audit-card-title">{card.title}</h4>
                  </div>
                  <p className="audit-card-pattern">{card.pattern}</p>
                </div>
                <div style={{ padding: '16px 24px 0', background: 'rgba(55,43,11,0.03)', display: 'flex', justifyContent: 'center' }}>
                  <img src={card.img} alt={card.title} style={{ width: '100%', maxHeight: 160, objectFit: 'contain', display: 'block' }} />
                </div>
                <div className="audit-card-body">
                  <ul className="audit-issues">{card.issues.map((issue, i) => <li key={i}>{issue}</li>)}</ul>
                </div>
              </div>
            ))}
          </div>
          <div className="finding-callout" style={{ marginTop: 40 }}>
            <p className="finding-callout-label">Summary</p>
            <p className="finding-callout-text">Positions data had been architecturally positioned as supplementary, on-demand content  -  but was behaviorally used as essential, always-on context. The recurring theme across every application: vertical orientation, spatial competition, and hidden triggers.</p>
          </div>
          <div className="finding-callout" style={{ marginTop: 24 }}>
            <p className="finding-callout-label">Behavioral Insight</p>
            <p className="finding-callout-text">The most telling signal wasn't in any interview — it was behavioral: the majority of advisors had independently developed the same workaround: open positions in a separate window, position on a second monitor, and manually reference while entering trades. When users invent the same workaround independently, the design has already told them the answer. The solution needed to give users simultaneous access to both positions and the trade entry form — without the second monitor.</p>
          </div>
        </div>
      </section>

      {/* 8. HEURISTIC INSPECTION */}
      <section style={{ background: 'transparent', padding: 'var(--section-padding) 0' }}>
        <div style={{ maxWidth: 'var(--content-width)', width: '100%', margin: '0 auto', padding: '0 var(--side-padding)' }}>
          <h2 className="cs-h2">Heuristic Inspection</h2>
          <p className="cs-body">Across these applications, a heuristic evaluation surfaced consistent violations that compounded into significant workflow friction for advisors.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 40 }}>
            {heuristicItems.map(item => (
              <div key={item.title} style={{ borderRadius: 12, border: '1px solid var(--hairline)', overflow: 'hidden', background: 'var(--bg)' }}>
                {/* Animation */}
                <div style={{ padding: '20px 20px 16px' }}>
                  {item.animation}
                </div>
                {/* Info */}
                <div style={{ padding: '0 20px 20px', borderTop: '1px solid var(--hairline)', paddingTop: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 6 }}>
                    <h4 style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink-2)', margin: 0 }}>{item.title}</h4>
                    <span className={`issue-severity issue-severity--${item.severity.toLowerCase()}`} style={{ flexShrink: 0 }}>{item.severity}</span>
                  </div>
                  <span style={{ fontSize: 11, color: 'var(--clay)', fontWeight: 600, display: 'block', marginBottom: 10 }}>{item.heuristic}</span>
                  <p className="cs-caption" style={{margin:0}}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="finding-callout" style={{ marginTop: 40 }}>
            <p className="finding-callout-label">Key Finding</p>
            <p className="finding-callout-text">The core issue was the structural model being used. Positions data had been treated as supplementary information accessed on demand, when it was actually prerequisite context for every trade. The design forced a choice between seeing positions and entering trades  -  two fundamentally interdependent tasks.</p>
          </div>
        </div>
      </section>

            {/* 9. SME INSIGHTS */}
      <section style={{ background: 'transparent', padding: 'var(--section-padding) 0' }}>
        <div style={{ maxWidth: 'var(--content-width)', width: '100%', margin: '0 auto', padding: '0 var(--side-padding)' }}>
          <h2 className="cs-h2">SME Insights &amp; Analytics</h2>
          <p className="cs-body">Quantitative analytics and qualitative SME interviews validated the findings from the platform audit and heuristic evaluation.</p>
          <div className="sme-quotes" style={{ marginTop: 32 }}>
            {[
              { quote: "I always have positions open in a second monitor. There's no way I can trade without seeing what I already own.", role: 'Senior Trading Advisor, SME Interview' },
              { quote: "Every time I open that drawer I lose my place in the ticket. By the time I close it I've forgotten half of what I needed to check.", role: 'Advisor, Internal User Research' },
              { quote: "Most of our clients mention that they didn't even realize there was a way to view positions within the ticket itself until we show it to them.", role: 'Technology Consultant, Internal SME Interview' },
            ].map((q, i) => (
              <div key={i} className="quote-block">
                <p className="quote-text">"{q.quote}"</p>
                <p className="quote-attribution"> -  {q.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. JOURNEY MAPPING */}
      <section style={{ background: 'transparent', padding: 'var(--section-padding) 0' }}>
        <div style={{ maxWidth: 'var(--content-width)', width: '100%', margin: '0 auto', padding: '0 var(--side-padding)' }}>
          <h2 className="cs-h2">Journey Mapping</h2>
          <JourneyMap />
        </div>
      </section>

            {/* 11. INSIGHT SYNTHESIS */}
      <section style={{ background: 'transparent', padding: 'var(--section-padding) 0' }}>
        <div style={{ maxWidth: 'var(--content-width)', width: '100%', margin: '0 auto', padding: '0 var(--side-padding)' }}>
          <h2 className="cs-h2">Insight Synthesis</h2>
          <p className="cs-body">Across four research methods, three critical themes emerged consistently.</p>
          <div className="insight-grid">
            {[
              { title: 'Low Visibility', img: '/visibility.svg', items: ['Low affordance  -  triggers appeared to navigate away rather than reveal content', 'Positions buried below fold or behind interaction layers', 'No persistent visual indicator that positions data was available', 'Users unaware of the full scope of accessible data'] },
              { title: 'Cognitive Overload', img: '/cognitiveover.svg', items: ['Context switching created memory load at critical decision moments', 'Users mentally juggling positions data while entering trade details', 'Repeated toggling between views broke workflow momentum', 'Flat data hierarchy made it hard to identify the most relevant positions'] },
              { title: 'Structural Conflict', img: '/structural.svg', items: ['Positions and trade entry competed for screen space', 'Vertical orientation limited number of positions visible simultaneously', 'Design treated positions as on-demand rather than in-flow information', 'No single layout standard existed across the platform for this pattern'] },
            ].map(card => (
              <div key={card.title} className="insight-card">
                {card.img && <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(177,124,93,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, flexShrink: 0 }}><img src={card.img} alt={card.title} style={{ width: 24, height: 24, filter: 'invert(55%) sepia(27%) saturate(700%) hue-rotate(330deg) brightness(88%)' }} /></div>}
                <h3 className="insight-card-title">{card.title}</h3>
                <ul className="insight-list">{card.items.map((item, i) => <li key={i}>{item}</li>)}</ul>
              </div>
            ))}
          </div>
          <div className="finding-callout">
            <p className="finding-callout-label">Critical Insight</p>
            <p className="finding-callout-text">The issues weren't isolated  -  they compounded. What appeared to be a simple discoverability problem was a structural mismatch. Fixing the drawer wouldn't solve it. The mental model needed to change: positions as essential, always-on context  -  not supplementary, on-demand content.</p>
          </div>
        </div>
      </section>

      {/* 12. PROBLEM DEFINED  -  warm cream with CS1-style callout emphasis */}
      <section id="ch-problem" style={{ background: 'transparent', padding: 'var(--section-padding) 0' }}>
        <div style={{ maxWidth: 'var(--content-width)', width: '100%', margin: '0 auto', padding: '0 var(--side-padding)' }}>
          <h2 className="cs-h2">Problem: Validated &amp; Defined</h2>
          <div style={{ maxWidth: 820, padding: '28px 32px', borderLeft: '4px solid var(--clay)', background: 'rgba(184,103,87,0.04)', borderRadius: '0 12px 12px 0', marginTop: 32 }}>
            <p style={{ fontSize: 'clamp(16px, 1.6vw, 19px)', fontWeight: 500, lineHeight: 1.6, color: 'var(--ink-2)', marginBottom: 16 }}>
              Portfolio positions data is prerequisite context for every trade decision  -  yet the current design treats it as supplementary, on-demand information. This structural mismatch forces advisors to choose between seeing their positions and entering a trade, two tasks that must happen simultaneously.
            </p>
            <p className="cs-body" style={{margin:0}}>
              The result: advisors interrupt their workflows, accept higher cognitive load, build manual workarounds, and make decisions with incomplete information  -  introducing friction, inefficiency, and risk at the highest-stakes moment of the trading process.
            </p>
          </div>

          <div className="quote-block" style={{ marginTop: 40 }}>
            <p className="quote-text">"The positions drawer isn't just a UX issue  -  it's a compliance risk. Advisors are making decisions without complete information because the tool makes it too hard to have both visible at once."</p>
            <p className="quote-attribution"> -  Compliance Officer, Internal SME Interview</p>
          </div>

          {/* Business Impact callout  -  outlined cards, matching CS1's constraint cards */}
          <div style={{ marginTop: 48, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div style={{ background: 'transparent', borderRadius: 12, padding: '28px 32px', border: '1px solid var(--clay-edge)' }}>
              <p style={{ fontFamily: 'var(--f-mono)', fontSize: 11, fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--clay)', marginBottom: 10 }}>Client Relationship Risk</p>
              <p className="cs-body" style={{margin:0}}>Trading errors are among the most costly outcomes a firm can face. When advisors make decisions with incomplete position data, errors increase  -  damaging trust between our clients and the end investors they trade on behalf of. In an industry where reputation is everything, preventable errors are not a UX problem. They are a business problem.</p>
            </div>
            <div style={{ background: 'transparent', borderRadius: 12, padding: '28px 32px', border: '1px solid var(--clay-edge)' }}>
              <p style={{ fontFamily: 'var(--f-mono)', fontSize: 11, fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--clay)', marginBottom: 10 }}>Operational Cost</p>
              <p className="cs-body" style={{margin:0}}>Each trading error generates downstream work: service inquiries, manual corrections, and follow-up from our support teams. Reducing workflow friction isn't just about advisor experience  -  it directly reduces the volume of error-driven support load and the internal cost of remediation that follows.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 13. SOLUTION PARAMETERS */}
      <section id="ch-solution" style={{ background: 'transparent', padding: 'var(--section-padding) 0' }}>
        <div style={{ maxWidth: 'var(--content-width)', width: '100%', margin: '0 auto', padding: '0 var(--side-padding)' }}>
          <h2 className="cs-h2">Defining Solution Parameters</h2>
          <div style={{ marginTop: 40 }}>
            <h3 className="cs-h3">Solution Principles</h3>
            <div className="principle-row">
              {[
                { label: 'In-Flow, Not On-Demand', desc: 'Persistent in-context element, not a triggered overlay' },
                { label: 'Scan Over Dive', desc: 'Quick reference across multiple positions, not exhaustive detail on one' },
                { label: 'Horizontal Over Vertical', desc: 'Leverage horizontal real estate to maximize positions visible simultaneously' },
                { label: 'Hierarchy Over Density', desc: 'Surface critical fields prominently; deprioritize secondary data' },
              ].map(p => (
                <div key={p.label} className="principle-item">
                  <span className="principle-arrow">→</span>
                  <p className="principle-text"><strong>{p.label}:</strong> {p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 14. IDEATION */}
      <section style={{ background: 'transparent', padding: 'var(--section-padding) 0' }}>
        <div style={{ maxWidth: 'var(--content-width)', width: '100%', margin: '0 auto', padding: '0 var(--side-padding)' }}>
          <h2 className="cs-h2">Ideation &amp; Lo-Fi Exploration</h2>
          <p className="cs-body">I explored multiple approaches to organizing positions data alongside trade entry, each with different tradeoffs around visibility, interaction cost, and space efficiency.</p>

          {/* Selected Direction  -  promoted */}
          <div className="concept-card-grid" style={{ marginTop: 40, border: '1.5px solid var(--clay)', borderRadius: 14, overflow: 'hidden', display: 'grid', gridTemplateColumns: '2fr 1fr' }}>
            {/* Illustration  -  16:9 aspect ratio */}
            <div style={{ background: 'rgba(177,124,93,0.05)' }}>
              {getConceptIllustration("Horizontal Cards", 16)}
            </div>
            {/* Text  -  right side */}
            <div style={{ padding: '36px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderLeft: '1px solid rgba(177,124,93,0.15)', background: 'rgba(177,124,93,0.03)' }}>
              <span className="selected-badge" style={{ alignSelf: 'flex-start', marginBottom: 20 }}>Selected Direction</span>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--ink-2)', marginBottom: 20 }}>Horizontal Cards</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {['Optimal scannability, efficient use of space, no interaction cost', 'Scales to multiple positions simultaneously', 'Complements rather than competes with trade form'].map((p, i) => (
                  <p key={i} className="concept-pro" style={{ margin: 0 }}><img src="/check.svg" alt="check" /><span>{p}</span></p>
                ))}
              </div>
            </div>
          </div>

          {/* Carousel  -  other concepts */}
          <ConceptCarousel />
        </div>
      </section>

      {/* 15. KEY DESIGN DECISIONS  -  warm cream, matching CS1 */}
      <section style={{ background: 'transparent', padding: 'var(--section-padding) 0' }}>
        <div style={{ maxWidth: 'var(--content-width)', width: '100%', margin: '0 auto', padding: '0 var(--side-padding)' }}>
          <h2 className="cs-h2">Key Design Decisions</h2>
          <div className="decision-list">
            {[
              { title: 'Eliminated Context Switching', desc: 'By making positions persistently visible alongside the trade form  -  not behind a toggle  -  advisors could reference and enter data simultaneously for the first time.' },
              { title: 'Prioritized Breadth over Depth', desc: 'The horizontal card layout maximizes the number of positions visible at once. I surfaced the 4-5 most relevant fields  -  ticker, shares, current value, unrealized gain/loss  -  not all 12+ columns.' },
              { title: 'Built in the Spirit of the Design System', desc: 'Designed to align with the existing visual language, spacing tokens, and interaction patterns. Worked directly with the design system team during development to formalize the component spec.' },
              { title: 'Scalable Across All Trading Use Cases', desc: 'Designed as a context-agnostic "horizontal contextual data panel"  -  applicable not just to positions, but to any data-dense workflow across the platform requiring secondary reference data.' },
            ].map((d, i) => (
              <div key={i} className="decision-item">
                <div className="decision-check" style={{ background: 'var(--clay-tint)', borderColor: 'var(--clay-edge)' }}><img src="/check.svg" alt="check" style={{ width: 24, height: 24, filter: 'invert(55%) sepia(27%) saturate(700%) hue-rotate(330deg) brightness(88%)' }} /></div>
                <div>
                  <h4 className="cs-h4">{d.title}</h4>
                  <p className="cs-body" style={{ margin: 0 }}>{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 16. DESIGN SYSTEM */}
      <section style={{ background: 'transparent', padding: 'var(--section-padding) 0' }}>
        <div style={{ maxWidth: 'var(--content-width)', width: '100%', margin: '0 auto', padding: '0 var(--side-padding)' }}>
          <h2 className="cs-h2">Contribution to Design System</h2>
          <p className="cs-body">I partnered with the design system team to formalize the horizontal positions panel as an official design system component  -  enabling platform-wide adoption with minimal custom work per application.</p>
          <div className="ds-grid">
            {[
              { img: '/specs.svg', title: 'Component Specs', items: ['Anatomy diagrams with spacing and sizing tokens', 'Column configuration options and defaults', 'Responsive breakpoint behavior', 'State variations (default, hover, selected, loading, empty)'] },
              { img: '/usage.svg', title: 'Usage Guidelines', items: ['When to use horizontal vs. vertical layouts', 'Best practices for column prioritization', 'Accessibility requirements and keyboard navigation', 'Proper and improper usage examples'] },
              { img: '/design.svg', title: 'Design Tokens', items: ['Color tokens for data states (positive, negative, neutral)', 'Typography scale for data density contexts', 'Spacing tokens for compact and standard densities', 'Border and shadow tokens for panel elevation'] },
            ].map(card => (
              <div key={card.title} className="ds-card">
                <div className="ds-card-icon"><img src={card.img} alt={card.title} style={{ width: 24, height: 24, filter: "invert(55%) sepia(27%) saturate(700%) hue-rotate(330deg) brightness(88%)" }} /></div>
                <h3 className="ds-card-title">{card.title}</h3>
                <ul className="details-list">{card.items.map((item, i) => <li key={i}>{item}</li>)}</ul>
              </div>
            ))}
          </div>
          <div className="impact-stats">
            {[['10+', 'Applications using pattern'], ['~90%', 'Design system coverage'], ['10+', 'Product teams aligned']].map(([n, l]) => (
              <div key={l} className="impact-stat" style={{ background: 'white' }}>
                <div className="impact-number">{n}</div>
                <div className="impact-label">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 17. ROLLOUT */}
      <section style={{ background: 'transparent', padding: 'var(--section-padding) 0' }}>
        <div style={{ maxWidth: 'var(--content-width)', width: '100%', margin: '0 auto', padding: '0 var(--side-padding)' }}>
          <h2 className="cs-h2">Scaling &amp; Rollout</h2>
          <p className="cs-body">Any change to live trading workflows required careful, staged rollout. I structured a phased approach that prioritized learning and iteration at each stage before expanding.</p>
          <div className="app-grid" style={{ marginTop: 40 }}>
            {[
              { phase: 'Phase 1', title: 'Pilot  -  Multi-Order Ticket', desc: 'Introduced the horizontal positions panel in the highest-traffic trading application. Collected feedback and iterated on column priority and display density.', status: 'Complete', sc: 'var(--clay-ink)', sb: 'var(--clay)' },
              { phase: 'Phase 2', title: 'Expand  -  Order Entry Tickets', desc: 'Applied the standardized component across the 6 individual order entry ticket applications, using the design system component to ensure consistency.', status: 'Complete', sc: 'var(--clay-ink)', sb: 'var(--clay)' },
              { phase: 'Phase 3', title: 'Scale  -  Platform-Wide', desc: 'Rolled out the pattern to all 10 identified applications and established it as the default layout standard for data-dense contexts.', status: 'In Progress', sc: 'var(--ink-3)', sb: 'var(--hairline-strong)' },
              { phase: 'Future', title: 'Generalize  -  Contextual Data Pattern', desc: 'Extend beyond positions to support account summaries, model benchmarks, compliance checks, and order history.', status: 'Planned', sc: 'var(--ink-3)', sb: 'var(--hairline-strong)' },
            ].map(item => (
              <div key={item.phase} style={{ padding: '28px 32px', border: '1px solid var(--hairline)', borderRadius: 12, background: 'white' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--clay)' }}>{item.phase}</span>
                  <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 999, color: item.sc, background: 'transparent', border: `1px solid ${item.sb}` }}>{item.status}</span>
                </div>
                <h4 style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink-2)', marginBottom: 8 }}>{item.title}</h4>
                <p className="cs-body">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 17b. MEASURING SUCCESS */}
      <section style={{ background: 'transparent', padding: 'var(--section-padding) 0' }}>
        <div style={{ maxWidth: 'var(--content-width)', width: '100%', margin: '0 auto', padding: '0 var(--side-padding)' }}>
          <h2 className="cs-h2">Measuring Success</h2>
          <p className="cs-body" style={{maxWidth:700,marginBottom:56}}>
            One of the biggest challenges on this project was the absence of mature analytics infrastructure. Legacy tooling didn't support event-level tracking, and there were no established baseline metrics for this feature area. Rather than let this become a blind spot, I worked to define what rigorous measurement would look like  -  both as a design deliverable and as a foundation for future instrumentation.
          </p>

          {/* Constraint callout */}
          <div style={{ padding: '24px 32px', background: 'rgba(251,250,244,0.6)', border: '1px solid rgba(177,124,93,0.2)', borderRadius: 10, marginBottom: 56 }}>
            <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--clay)', marginBottom: 10 }}>The constraint</p>
            <p className="cs-body" style={{margin:0}}>
              When I asked stakeholders "What would make this successful?", the answer was: "We don't have strong enough analytics tools to tell us what success looks like today." Rather than viewing this as a blocker, I treated it as an opportunity to establish a measurement framework from the ground up  -  one that could be implemented as the new platform launched.
            </p>
          </div>

          {/* Success metrics grid */}
          <h3 className="cs-h3" style={{ marginBottom: 24 }}>Proposed Success Framework</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20, marginBottom: 56 }}>
            {[
              {
                label: 'Task Completion Rate',
                badge: 'Critical',
                badgeColor: 'var(--clay-ink)',
                what: '% of users who successfully complete an order entry with the new positions panel',
                how: 'Event tracking: position_panel_task_completed',
                target: 'Baseline TBD → Improve by 25%+ within 60 days',
              },
              {
                label: 'Time to Complete Order',
                badge: 'Critical',
                badgeColor: 'var(--clay-ink)',
                what: 'Average time from opening order entry to submitting order',
                how: 'Timestamp delta: start_order → complete_order',
                target: 'Baseline TBD → Reduce by 30% (hypothesis: ~4min → ~2.5min)',
              },
              {
                label: 'Support Ticket Volume',
                badge: 'High (Can measure now!)',
                badgeColor: 'var(--ink-3)',
                what: '# of support tickets tagged "order entry" or "position tracking"',
                how: 'Support system data (existing)',
                target: 'Current baseline ~240/month → Reduce to <160/month (-30%)',
              },
              {
                label: 'Trading Efficiency (Orders/Hour)',
                badge: 'Critical',
                badgeColor: 'var(--clay-ink)',
                what: 'Average orders completed per trading hour per user',
                how: 'May be available in existing business systems',
                target: 'Current unknown → Improve by 20%+',
              },
            ].map(metric => (
              <div key={metric.label} style={{ padding: '24px 28px', border: '1px solid var(--clay-edge)', borderRadius: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink-2)', margin: 0 }}>{metric.label}</p>
                  <span style={{ fontSize: 11, fontWeight: 700, color: metric.badgeColor, background: 'transparent', border: `1px solid ${metric.badgeColor}`, padding: '3px 10px', borderRadius: 999, whiteSpace: 'nowrap', marginLeft: 12 }}>{metric.badge}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <p className="cs-caption" style={{margin:0}}><strong>What:</strong> {metric.what}</p>
                  <p className="cs-caption" style={{margin:0}}><strong>How:</strong> {metric.how}</p>
                  <p style={{ fontSize: 13, color: 'var(--clay-ink)', margin: 0 }}><strong>Target:</strong> {metric.target}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Interim note */}
          <div style={{ padding: '20px 28px', background: 'rgba(184,103,87,0.05)', borderLeft: '3px solid var(--clay)', borderRadius: '0 8px 8px 0', marginBottom: 56 }}>
            <p className="cs-body" style={{margin:0,fontStyle:'italic'}}>
              In the interim, I tracked qualitative signals through user interviews and support ticket analysis to validate directional improvements while instrumentation was being built.
            </p>
          </div>

          {/* Instrumentation spec */}
          <h3 className="cs-h3" style={{ marginBottom: 16 }}>Instrumentation Plan</h3>
          <p className="cs-body" style={{marginBottom:28}}>
            I collaborated with engineering to ensure the redesign included proper event architecture from day one  -  so that when the analytics platform launched, tracking would already be in place with no retroactive instrumentation needed.
          </p>
          <div style={{ background: 'transparent', border: '1px solid var(--clay-edge)', borderRadius: 10, padding: '28px 32px', marginBottom: 28 }}>
            {[
              { event: 'position_panel_opened', trigger: 'User clicks to expand position panel', params: 'user_id, timestamp, panel_state (collapsed→expanded)' },
              { event: 'order_entry_started', trigger: 'User begins filling out order form', params: 'user_id, timestamp, order_type, source_screen' },
              { event: 'order_entry_completed', trigger: 'User successfully submits order', params: 'user_id, timestamp, order_id, time_to_complete, position_panel_used (boolean)' },
              { event: 'order_entry_error', trigger: 'User encounters an error during order entry', params: 'user_id, timestamp, error_type, error_message, step_in_flow' },
            ].map(spec => (
              <div key={spec.event} style={{ marginBottom: 20, paddingBottom: 20, borderBottom: '1px solid var(--hairline)' }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--clay-ink)', margin: '0 0 6px', fontFamily: 'var(--f-mono)' }}>{spec.event}</p>
                <p className="cs-caption" style={{margin:'0 0 4px'}}><span style={{ color: 'var(--ink-mute)' }}>Trigger:</span> {spec.trigger}</p>
                <p className="cs-caption" style={{margin:0}}><span style={{ color: 'var(--ink-mute)' }}>Parameters:</span> {spec.params}</p>
              </div>
            ))}
          </div>
          <p className="cs-body" style={{marginBottom:0}}>
            This spec became part of our engineering handoff documentation and enabled the team to measure all critical metrics outlined in the success framework above.
          </p>
        </div>
      </section>

      {/* 18. RESULTS  -  warm cream, matching CS1 */}
      <section id="ch-outcomes" style={{ background: 'transparent', padding: 'var(--section-padding) 0' }}>
        <div style={{ maxWidth: 'var(--content-width)', width: '100%', margin: '0 auto', padding: '0 var(--side-padding)' }}>
          <h2 className="cs-h2" style={{ marginBottom: 48 }}>Results &amp; Impact</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 56 }}>
            {[
              { icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9E644B" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="22" y2="22"/>
                  </svg>
                ), title: 'Improved Discoverability', desc: 'Positions information now visible without hunting through drawers or switching applications' },
              { icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9E644B" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="2" y1="12" x2="22" y2="12"/><polyline points="8,6 2,12 8,18"/><polyline points="16,6 22,12 16,18"/>
                  </svg>
                ), title: 'Better Scannability', desc: 'Horizontal layout leverages available screen real estate  -  more positions visible at once' },
              { icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9E644B" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                  </svg>
                ), title: 'Platform Consistency', desc: 'Unified pattern across all trading pages reduces cognitive overhead when switching applications' },
            ].map(card => (
              <div key={card.title} style={{ padding: '28px', background: 'transparent', border: '1px solid var(--clay-edge)', borderRadius: 12 }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--clay-tint)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>{card.icon}</div>
                <h4 style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>{card.title}</h4>
                <p className="cs-body">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 19. REFLECTIONS */}
      <section id="ch-reflection" style={{ background: 'transparent', padding: 'var(--section-padding) 0' }}>
        <div style={{ maxWidth: 'var(--content-width)', width: '100%', margin: '0 auto', padding: '0 var(--side-padding)' }}>
          <h2 className="cs-h2">Reflections &amp; Learnings</h2>
          <div style={{ padding: '32px 40px', background: 'rgba(251,250,244,0.5)', border: '1px solid rgba(177,124,93,0.15)', borderRadius: 12, marginBottom: 40 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[
                { title: 'The best solutions often feel deceptively simple:', desc: 'The horizontal card pattern looks obvious in hindsight  -  but it required substantial research to understand why it was right, and substantial facilitation work to get alignment on reframing the problem before we could arrive there.' },
                { title: 'Visualizing platform-level impact unlocked stakeholder alignment:', desc: 'Showing how a single design decision could scale to 10+ applications in a single diagram was more persuasive than any usability metric. This framing transformed a single-feature discussion into a platform strategy conversation.' },
              ].map((item, i) => (
                <div key={i}>
                  <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--clay)', marginBottom: 6 }}>{item.title}</p>
                  <p className="cs-body">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case study navigation */}
      <nav className="cs-case-nav" aria-label="Case study navigation">
        <a href="/case-study/rules" className="cs-case-nav-item cs-case-nav-item--prev">
          <span className="cs-case-nav-dir">← Previous</span>
          <span className="cs-case-nav-title">Inside the Rule Engine</span>
        </a>
      </nav>

      <footer className="footer">
        <div className="footer-left">kristin<span>.garza</span> · UX Designer</div>
        <div className="footer-links">
          <a href="https://www.linkedin.com/in/kristin-garza" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="mailto:kmkerney221@gmail.com">Email</a>
          <a href="/resume.pdf" target="_blank" rel="noreferrer">Resume</a>
        </div>
      </footer>

      </div>
    </div>
  )
}
