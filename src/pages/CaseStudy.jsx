import { useEffect, useState, useRef } from 'react'
import Nav from '../components/Nav.jsx'

// --- Mini animated illustrations for heuristic cards ---
const panelBg = '#3d4f63'
const panelBorder = 'rgba(144,161,185,0.25)'
const rowBg = 'rgba(255,255,255,0.06)'
const textDim = 'rgba(246,251,222,0.45)'
const textBright = 'rgba(246,251,222,0.9)'
const green = '#5a9e7c'
const red = '#c27070'

// 1. Forced Context Switching — type qty, open drawer to check shares, come back
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
      {/* Form fields — Qty field is live, rest are blocks */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5, flex: 1 }}>
        {/* Shares / Qty field — special */}
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

// 2. Hidden Positions — drawer hidden, fades in on hover-like cycle
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
      {/* Collapsed drawer at bottom — static, but pulses to draw attention */}
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

// 3. Inefficient Workflow — drawer slides up covering form
function AnimInefficient() {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const t = setInterval(() => setOpen(o => !o), 1600)
    return () => clearInterval(t)
  }, [])

  const drawerH = open ? 62 : 0
  const blockWidths = [100, 75, 100, 60, 85, 55, 90, 70]

  return (
    <div style={{ background: panelBg, borderRadius: 8, padding: 10, fontFamily: 'Inter,sans-serif', fontSize: 10, color: textBright, border: `1px solid ${panelBorder}`, minHeight: 90, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 4 }}>
      {/* Header */}
      <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: 0.5, color: textDim }}>ORDER ENTRY TICKET</div>
      {/* Blocked-out form fields */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5, flex: 1 }}>
        {blockWidths.map((w, i) => (
          <div key={i} style={{
            height: 7, width: `${w}%`,
            background: open && i >= 4 ? 'rgba(194,112,112,0.18)' : 'rgba(255,255,255,0.09)',
            borderRadius: 3,
            opacity: open && i >= 4 ? 0.35 : 1,
            transition: 'opacity 0.4s, background 0.4s',
          }}/>
        ))}
      </div>
      {/* Red tint overlay on blocked portion */}
      {open && (
        <div style={{ position: 'absolute', bottom: drawerH, left: 0, right: 0, height: 38, background: 'rgba(194,112,112,0.08)', borderTop: '1px dashed rgba(194,112,112,0.35)', transition: 'opacity 0.4s', pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 8 }}>
          <span style={{ fontSize: 8, color: 'rgba(194,112,112,0.7)', fontWeight: 700 }}>blocked</span>
        </div>
      )}
      {/* Drawer sliding up from bottom */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: drawerH, background: '#2d3e50', border: '1px solid rgba(144,161,185,0.4)', borderRadius: '6px 6px 0 0', transition: 'height 0.4s ease', overflow: 'hidden' }}>
        {drawerH > 10 && (
          <div style={{ padding: '6px 10px', display: 'flex', gap: 6 }}>
            {/* Vertical list of tickers */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
              <div style={{ fontSize: 7, fontWeight: 700, letterSpacing: 0.5, color: textDim, marginBottom: 2 }}>POSITIONS</div>
              {['AAPL','MSFT','GOOGL','NVDA'].map(t => (
                <div key={t} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(144,161,185,0.12)', paddingBottom: 2 }}>
                  <span style={{ fontSize: 8, fontWeight: 700, color: textBright }}>{t}</span>
                  <span style={{ fontSize: 8, color: green }}>+1.8%</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// 4. Competing Elements — drawer at bottom fights with order entry form
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
      {/* Blocked form fields — lower ones dim as drawer rises */}
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

// 5. Information Overload — too many columns scrolling
function AnimOverload() {
  const [scrollY, setScrollY] = useState(0)
  const totalRows = 18
  const visibleRows = 3
  const maxScroll = totalRows - visibleRows

  useEffect(() => {
    let dir = 1
    const t = setInterval(() => {
      setScrollY(y => {
        const next = y + dir
        if (next >= maxScroll) dir = -1
        if (next <= 0) dir = 1
        return next
      })
    }, 180)
    return () => clearInterval(t)
  }, [])

  const tickers = ['AAPL','MSFT','GOOGL','NVDA','AMZN','JPM','TSLA','META','BRK','V','JNJ','WMT','PG','UNH','HD','BAC','XOM','CVX','LLY','MA']
  const visibleTickers = tickers.slice(scrollY, scrollY + visibleRows)
  const scrollPct = (scrollY / maxScroll) * 100

  return (
    <div style={{ background: panelBg, borderRadius: 8, padding: 10, fontFamily: 'Inter,sans-serif', fontSize: 10, color: textBright, border: `1px solid ${panelBorder}`, minHeight: 90, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: 0.5, color: textDim }}>POSITIONS — {totalRows} ROWS</div>
        <div style={{ fontSize: 8, color: textDim }}>↕ scrolling</div>
      </div>
      <div style={{ flex: 1, display: 'flex', gap: 4, overflow: 'hidden' }}>
        {/* List */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Header row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 4, paddingBottom: 4, borderBottom: `1px solid rgba(144,161,185,0.2)` }}>
            {['Ticker','Value','P&L'].map(h => <span key={h} style={{ fontSize: 8, fontWeight: 700, color: textDim }}>{h}</span>)}
          </div>
          {/* Visible rows */}
          {visibleTickers.map((t, i) => (
            <div key={t} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 4, padding: '2px 0', borderBottom: `1px solid rgba(144,161,185,0.1)`, transition: 'opacity 0.1s', opacity: i === 0 || i === visibleRows - 1 ? 0.4 : 1 }}>
              <span style={{ fontSize: 9, fontWeight: 700, color: textBright }}>{t}</span>
              <div style={{ height: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 2, alignSelf: 'center' }}/>
              <span style={{ fontSize: 9, color: ['GOOGL','JPM','BRK','JNJ','BAC'].includes(t) ? red : green, fontWeight: 600 }}>
                {['GOOGL','JPM','BRK','JNJ','BAC'].includes(t) ? '-' : '+'}{(1 + (t.charCodeAt(0) % 40) / 10).toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
        {/* Scrollbar */}
        <div style={{ width: 5, background: 'rgba(255,255,255,0.07)', borderRadius: 3, position: 'relative', flexShrink: 0 }}>
          <div style={{
            position: 'absolute', left: 0, right: 0,
            height: `${(visibleRows / totalRows) * 100}%`,
            top: `${scrollPct * (1 - visibleRows / totalRows)}%`,
            background: 'rgba(144,161,185,0.6)', borderRadius: 3,
            transition: 'top 0.18s linear',
          }}/>
        </div>
      </div>
    </div>
  )
}

// 6. Inconsistent Implementation — 4 different drawer styles cycling
function AnimInconsistent() {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % 4), 1200)
    return () => clearInterval(t)
  }, [])

  const posColor = 'rgba(144,161,185,0.85)'
  const mainBlock = { background: 'rgba(255,255,255,0.07)', borderRadius: 3 }

  // Each app: a small wireframe with POSITIONS block in a different location
  const apps = [
    // App 1: Bottom drawer — positions strip at bottom
    <div key="a" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
      <div style={{ ...mainBlock, flex: 1 }}/>
      <div style={{ height: '28%', background: posColor, borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: 7, fontWeight: 800, color: panelBg, letterSpacing: 0.5 }}>POSITIONS</span>
      </div>
    </div>,
    // App 2: Side panel — positions on right
    <div key="b" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row', gap: 2 }}>
      <div style={{ ...mainBlock, flex: 1 }}/>
      <div style={{ width: '35%', background: posColor, borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: 7, fontWeight: 800, color: panelBg, letterSpacing: 0.5, writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>POSITIONS</span>
      </div>
    </div>,
    // App 3: Dashboard tile — positions is one tile in a grid
    <div key="c" style={{ width: '100%', height: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 2 }}>
      <div style={{ ...mainBlock }}/>
      <div style={{ background: posColor, borderRadius: 3, border: '1.5px dashed rgba(255,255,255,0.4)' }}/>
      <div style={{ ...mainBlock }}/>
      <div style={{ ...mainBlock }}/>
    </div>,
    // App 4: Full page — positions takes whole screen
    <div key="d" style={{ width: '100%', height: '100%', background: posColor, borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontSize: 7, fontWeight: 800, color: panelBg, letterSpacing: 0.5 }}>POSITIONS</span>
    </div>,
  ]

  const labels = ['Bottom Drawer', 'Side Panel', 'Small Tile', 'Full Page App']

  return (
    <div style={{ background: panelBg, borderRadius: 8, padding: 10, fontFamily: 'Inter,sans-serif', color: textBright, border: `1px solid ${panelBorder}`, minHeight: 90, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 5, flex: 1 }}>
        {apps.map((app, i) => (
          <div key={i} style={{
            background: rowBg, borderRadius: 5, padding: 5,
            border: `1.5px solid ${i === active ? 'rgba(144,161,185,0.7)' : 'rgba(144,161,185,0.12)'}`,
            opacity: i === active ? 1 : 0.45,
            transition: 'all 0.5s',
            display: 'flex', flexDirection: 'column', gap: 4,
          }}>
            <div style={{ fontSize: 7, fontWeight: 700, color: i === active ? textBright : textDim, letterSpacing: 0.3, marginBottom: 2 }}>App {i+1}</div>
            <div style={{ flex: 1 }}>{app}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 6, fontSize: 8, color: textDim, textAlign: 'center' }}>{labels[active]}</div>
    </div>
  )
}

const heuristicItems = [
  { heuristic: 'Recognition Rather than Recall', severity: 'Critical', title: 'Forced Context Switching', desc: 'Advisors needed to remember positions data while navigating to and from the positions drawer, placing unnecessary load on working memory during complex trading tasks.', animation: <AnimContextSwitch /> },
  { heuristic: 'Visibility of System Status', severity: 'High', title: 'Hidden Positions Information', desc: 'Positions data was buried in collapsed drawers with minimal affordance. Users had no indication of what data was available or how to access it without prior knowledge.', animation: <AnimHiddenInfo /> },
  { heuristic: 'Flexibility and Efficiency of Use', severity: 'High', title: 'Inefficient Workflow Patterns', desc: 'Opening the positions drawer obscured the primary trade entry form, forcing users to toggle between views rather than reference both simultaneously.', animation: <AnimInefficient /> },
  { heuristic: 'User Control and Freedom', severity: 'High', title: 'Competing Interface Elements', desc: 'Bottom drawer competed with trade entry form for visual focus and screen space, creating an either/or choice when both were needed simultaneously.', animation: <AnimCompeting /> },
  { heuristic: 'Aesthetic and Minimalist Design', severity: 'Medium', title: 'Wrong Depth of Detail', desc: 'The drawer optimized for depth over breadth — surfacing exhaustive details on a few positions, when the workflow demands the opposite: a handful of key fields across many positions simultaneously.', animation: <AnimOverload /> },
  { heuristic: 'Consistency and Standards', severity: 'Medium', title: 'Inconsistent Implementation', desc: 'Four different trading applications implemented positions access in four different ways — increasing cognitive overhead for users who switched between applications.', animation: <AnimInconsistent /> },
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

  // Emotion arc — viewBox 0 0 100 100, preserveAspectRatio none for full-width stretch
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
            {/* Line-only SVG — stretches full width without distorting circles */}
            <svg viewBox="0 0 100 100" preserveAspectRatio="none"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
              <path d={path} stroke="#90a1b9" strokeWidth="1.5" fill="none"
                strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke"/>
            </svg>
            {/* Circles as HTML — percentage positioned, always perfect circles */}
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
        background: 'var(--cream)',
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
                  <span style={{ fontSize: 14, color: 'var(--deep-blue)', lineHeight: 1.5 }}>{a}</span>
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
                  <span style={{ fontSize: 14, color: 'var(--deep-blue)', lineHeight: 1.5 }}>{p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Stage counter hint */}
      <p style={{ textAlign: 'center', fontSize: 12, color: 'rgba(144,161,185,0.6)', marginTop: 12 }}>Stage {active + 1} of {journeyStages.length} — click any stage to explore</p>
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
// Placeholder form block — big rectangle suggesting a form area
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
        {/* Left card — Order Entry Ticket */}
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
        {/* Right card — Positions, collapsible */}
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
        {/* Floating widget — draggable looking */}
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

      {/* Full-bleed order entry ticket — no border/card */}
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

      {/* Overlay panel — slides over the top of the content, no gap */}
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

// Scales illustration content proportionally — must be called as a function per-render for hooks to work
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
  { name: 'Modal Layer', img: '/concepts/modal.svg', pros: ["Clean interface, doesn't consume layout space"], cons: ['Requires click to access — breaks workflow'] },
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
      <div className="concept-card-grid" style={{ border: '1px solid rgba(144,161,185,0.25)', borderRadius: 14, overflow: 'hidden', display: 'grid', gridTemplateColumns: '2fr 1fr' }}>
        {/* Illustration — 16:9 */}
        <div style={{ background: 'rgba(202,213,226,0.1)' }}>
          {getConceptIllustration(concept.name, 16)}
        </div>
        {/* Text — right side */}
        <div style={{ padding: '36px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderLeft: '1px solid rgba(144,161,185,0.15)', background: 'rgba(243,239,217,0.4)' }}>
          <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--steel-blue)', background: 'rgba(144,161,185,0.12)', border: '1px solid rgba(144,161,185,0.3)', padding: '4px 10px', borderRadius: 4, alignSelf: 'flex-start', marginBottom: 20 }}>Other Concepts Explored</span>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--warm-gray)', marginBottom: 20 }}>{concept.name}</h3>
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
        <button onClick={prev} style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(144,161,185,0.35)', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--steel-blue)' }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polyline points="10,3 5,8 10,13"/></svg>
        </button>
        <div style={{ display: 'flex', gap: 8 }}>
          {concepts.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} style={{ width: 8, height: 8, borderRadius: '50%', border: 'none', cursor: 'pointer', padding: 0, background: i === idx ? 'var(--steel-blue)' : 'rgba(144,161,185,0.3)', transition: 'background 0.2s' }} />
          ))}
        </div>
        <button onClick={next} style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(144,161,185,0.35)', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--steel-blue)' }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polyline points="6,3 11,8 6,13"/></svg>
        </button>
      </div>
      <p style={{ textAlign: 'center', fontSize: 12, color: 'rgba(144,161,185,0.7)', marginTop: 8 }}>{idx + 1} of {concepts.length} concepts</p>
    </div>
  )
}

export default function CaseStudy() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="cs-page">
      <Nav />

      {/* 1. HERO */}
      <section style={{ background: 'rgba(251,250,244,0.3)', paddingTop: 150, paddingLeft: 'var(--side-padding)', paddingRight: 'var(--side-padding)', overflow: 'hidden' }}>
        <div style={{ maxWidth: 'var(--content-width)', width: '100%', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(46,74,107,0.55)' }}>UX Case Study</span>
            <span style={{ width: 1, height: 12, background: 'rgba(125,145,165,0.35)' }} />
            {['Research', 'Strategy', 'Product Design', 'Design Systems'].map(tag => (
              <span key={tag} style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 20, background: 'rgba(125,145,165,0.12)', color: 'var(--deep-blue)' }}>{tag}</span>
            ))}
          </div>
          <h1 className="cs-hero-title">Surfacing Positions Data in Trading Applications</h1>
          <p className="cs-hero-subtitle">Designing in-flow context for institutional investing workflows</p>
        </div>
        <div style={{ maxWidth: 'var(--content-width)', width: '100%', margin: '48px auto 0', overflow: 'hidden', paddingBottom: 0 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 32, paddingTop: 48 }}>
            {/* Screen 1 — Order ticket with in-context positions panel */}
            <div style={{ width: 560, height: 360, background: 'rgba(22,38,62,0.92)', borderRadius: '10px 10px 0 0', boxShadow: '0 8px 32px rgba(46,74,107,0.22)', border: '1px solid rgba(125,145,165,0.2)', overflow: 'hidden', flexShrink: 0, marginBottom: 0 }}>
              <div style={{ background: 'rgba(255,255,255,0.1)', borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 6 }}>
                {[0.3, 0.2].map((o, i) => <span key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: `rgba(255,255,255,${o})`, display: 'inline-block' }} />)}
                <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.6)', fontWeight: 600, marginLeft: 6 }}>Order Entry — Jane Smith (IRA · ****4821)</span>
                <div style={{ marginLeft: 'auto', background: 'rgba(90,158,124,0.3)', borderRadius: 4, padding: '2px 8px', fontSize: 8, color: 'rgba(220,255,230,0.9)', fontWeight: 600 }}>● Live</div>
              </div>
              <div style={{ display: 'flex', height: 'calc(100% - 29px)' }}>
                {/* Left — order ticket form */}
                <div style={{ width: 230, borderRight: '1px solid rgba(255,255,255,0.1)', padding: 14, flexShrink: 0 }}>
                  <div style={{ fontSize: 7, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', marginBottom: 10, textTransform: 'uppercase' }}>Order Ticket</div>
                  <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.5)', marginBottom: 3 }}>Symbol</div>
                  <div style={{ height: 18, background: 'rgba(255,255,255,0.12)', borderRadius: 3, marginBottom: 10, display: 'flex', alignItems: 'center', padding: '0 6px', fontSize: 9, color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>AAPL</div>
                  <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
                    <div style={{ flex: 1, height: 18, background: 'rgba(90,158,124,0.3)', borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, color: 'rgba(220,255,230,0.95)', fontWeight: 700 }}>BUY</div>
                    <div style={{ flex: 1, height: 18, background: 'rgba(255,255,255,0.08)', borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>SELL</div>
                  </div>
                  <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.5)', marginBottom: 3 }}>Qty</div>
                      <div style={{ height: 18, background: 'rgba(144,180,255,0.18)', border: '1px solid rgba(144,180,255,0.45)', borderRadius: 3, display: 'flex', alignItems: 'center', padding: '0 6px', fontSize: 9, color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>120</div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.5)', marginBottom: 3 }}>Price</div>
                      <div style={{ height: 18, background: 'rgba(255,255,255,0.12)', borderRadius: 3, display: 'flex', alignItems: 'center', padding: '0 6px', fontSize: 9, color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>MKT</div>
                    </div>
                  </div>
                  <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.5)', marginBottom: 3 }}>Time in force</div>
                  <div style={{ height: 18, background: 'rgba(255,255,255,0.12)', borderRadius: 3, marginBottom: 14, display: 'flex', alignItems: 'center', padding: '0 6px', fontSize: 9, color: 'rgba(255,255,255,0.85)' }}>Day</div>
                  <div style={{ height: 22, background: 'rgba(144,180,255,0.35)', border: '1px solid rgba(144,180,255,0.55)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: 'rgba(255,255,255,0.95)', fontWeight: 700, letterSpacing: 0.3 }}>PREVIEW ORDER</div>
                </div>
                {/* Right — in-context positions panel (the outcome) */}
                <div style={{ flex: 1, padding: 14, overflow: 'hidden', background: 'rgba(246,251,222,0.035)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                    <div style={{ width: 3, height: 10, background: 'rgba(246,251,222,0.6)', borderRadius: 2 }} />
                    <div style={{ fontSize: 7, fontWeight: 700, color: 'rgba(246,251,222,0.75)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Positions — in context</div>
                    <div style={{ marginLeft: 'auto', fontSize: 7, color: 'rgba(255,255,255,0.4)' }}>12 holdings</div>
                  </div>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                    <div style={{ flex: 1, background: 'rgba(255,255,255,0.06)', borderRadius: 4, padding: '6px 8px' }}>
                      <div style={{ fontSize: 6.5, color: 'rgba(255,255,255,0.45)', marginBottom: 2 }}>AAPL SHARES HELD</div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.95)' }}>842</div>
                    </div>
                    <div style={{ flex: 1, background: 'rgba(255,255,255,0.06)', borderRadius: 4, padding: '6px 8px' }}>
                      <div style={{ fontSize: 6.5, color: 'rgba(255,255,255,0.45)', marginBottom: 2 }}>MARKET VALUE</div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.95)' }}>$186.4k</div>
                    </div>
                    <div style={{ flex: 1, background: 'rgba(90,158,124,0.18)', borderRadius: 4, padding: '6px 8px' }}>
                      <div style={{ fontSize: 6.5, color: 'rgba(255,255,255,0.45)', marginBottom: 2 }}>DAY P/L</div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(150,220,180,0.95)' }}>+1.8%</div>
                    </div>
                  </div>
                  <div style={{ padding: '4px 0', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: 8 }}>
                    {['SYMBOL', 'QTY', 'MKT VAL', 'DAY %'].map(h => <span key={h} style={{ flex: 1, fontSize: 6.5, fontWeight: 700, color: 'rgba(255,255,255,0.45)', letterSpacing: 0.3 }}>{h}</span>)}
                  </div>
                  {[
                    { s: 'AAPL', q: '842', v: '$186.4k', p: '+1.8%', hl: true },
                    { s: 'MSFT', q: '410', v: '$172.1k', p: '+0.4%' },
                    { s: 'GOOGL', q: '260', v: '$41.6k', p: '-0.2%', neg: true },
                    { s: 'NVDA', q: '95', v: '$118.3k', p: '+2.6%' },
                    { s: 'VTI', q: '1,200', v: '$324.0k', p: '+0.3%' },
                  ].map(row => (
                    <div key={row.s} style={{ padding: '5px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: 8, alignItems: 'center', background: row.hl ? 'rgba(144,180,255,0.08)' : 'transparent', borderRadius: row.hl ? 3 : 0, paddingLeft: row.hl ? 4 : 0 }}>
                      <span style={{ flex: 1, fontSize: 8, fontWeight: 700, color: row.hl ? 'rgba(180,210,255,0.95)' : 'rgba(255,255,255,0.82)' }}>{row.s}</span>
                      <span style={{ flex: 1, fontSize: 8, color: 'rgba(255,255,255,0.7)' }}>{row.q}</span>
                      <span style={{ flex: 1, fontSize: 8, color: 'rgba(255,255,255,0.7)' }}>{row.v}</span>
                      <span style={{ flex: 1, fontSize: 8, fontWeight: 600, color: row.neg ? 'rgba(220,140,140,0.9)' : 'rgba(150,220,180,0.9)' }}>{row.p}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Screen 2 — Legacy positions drawer (hidden/collapsed) */}
            <div style={{ width: 340, height: 290, background: 'rgba(22,38,62,0.88)', borderRadius: '10px 10px 0 0', boxShadow: '0 8px 32px rgba(46,74,107,0.18)', border: '1px solid rgba(125,145,165,0.18)', overflow: 'hidden', flexShrink: 0, alignSelf: 'flex-end', marginBottom: 40 }}>
              <div style={{ background: 'rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'rgba(255,255,255,0.3)', display: 'inline-block' }} />
                <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.55)', fontWeight: 600, marginLeft: 6 }}>Legacy Trade Ticket</span>
              </div>
              <div style={{ position: 'relative', height: 'calc(100% - 29px)' }}>
                <div style={{ padding: 12 }}>
                  <div style={{ fontSize: 7, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', marginBottom: 10, textTransform: 'uppercase' }}>Order Form</div>
                  {['Symbol', 'Action', 'Quantity', 'Price', 'TIF'].map((l, i) => (
                    <div key={l} style={{ marginBottom: 8 }}>
                      <div style={{ fontSize: 6.5, color: 'rgba(255,255,255,0.4)', marginBottom: 2 }}>{l}</div>
                      <div style={{ height: 14, background: 'rgba(255,255,255,0.08)', borderRadius: 2, width: i === 0 ? '60%' : i === 2 ? '40%' : '80%' }} />
                    </div>
                  ))}
                  {/* "where are my positions?" indicator */}
                  <div style={{ marginTop: 10, padding: '6px 8px', background: 'rgba(194,112,112,0.1)', border: '1px dashed rgba(194,112,112,0.4)', borderRadius: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 9, color: 'rgba(230,170,170,0.9)' }}>?</span>
                    <span style={{ fontSize: 7, color: 'rgba(230,170,170,0.75)', fontStyle: 'italic' }}>positions buried in drawer</span>
                  </div>
                </div>
                {/* Collapsed bottom drawer */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 20, background: 'rgba(144,161,185,0.15)', borderTop: '1px solid rgba(144,161,185,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px' }}>
                  <span style={{ fontSize: 7, color: 'rgba(255,255,255,0.5)', letterSpacing: 0.3, fontWeight: 600 }}>▲  POSITIONS</span>
                  <span style={{ fontSize: 7, color: 'rgba(255,255,255,0.35)' }}>hidden</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TL;DR */}
      <section style={{ background: 'white', padding: '140px var(--side-padding)' }}>
        <div style={{ maxWidth: 'var(--content-width)', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 56 }}>
          <div>
            <h2 style={{ fontSize: 80, fontWeight: 700, color: 'var(--deep-blue)', lineHeight: 1.2, marginBottom: 20 }}>tl;dr</h2>
            <p style={{ fontSize: 22, fontWeight: 500, lineHeight: 1.65, letterSpacing: '-0.3px', color: 'var(--terracotta)' }}>
              Across the Wealthscape investing platform, we re-architected how portfolio positions data appeared within trading workflows. We then scaled this order ticket enhancement into a reusable design system component and layout pattern, unlocking compounding efficiency gains across the platform's many data-dense applications.
            </p>
          </div>
          <div style={{ background: 'rgba(202,213,226,0.15)', border: '1px solid rgba(202,213,226,0.25)', borderRadius: 15, padding: '40px 50px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {[
              { label: 'Role', value: 'Lead UX Designer — Trading' },
              { label: 'Timeline', value: '8 weeks (Q4 2025)' },
              { label: 'Team', value: 'Product Design, Engineering, Product Management' },
            ].map(item => (
              <div key={item.label}>
                <p className="meta-label" style={{ marginBottom: 6 }}>{item.label}</p>
                <p className="meta-value">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FRAMING — steel blue */}
      <section style={{ background: 'var(--steel-blue)', padding: '140px var(--side-padding)' }}>
        <div style={{ maxWidth: 'var(--content-width)', width: '100%', margin: '0 auto' }}>
          <h2 style={{ fontSize: 30, letterSpacing: 0.4, color: 'var(--text-light)', lineHeight: 1.3, marginBottom: 32, paddingTop: 32 }}>
            <strong style={{ fontWeight: 900 }}>impact + scale {'>'}</strong>{' '}
            <span style={{ fontWeight: 300 }}>convenience + speed</span>
          </h2>
          <p style={{ fontSize: 16, fontWeight: 500, lineHeight: 1.7, letterSpacing: '-0.31px', color: 'white', maxWidth: 961, marginBottom: 16 }}>
            This work was initially planned as a routine feature lift-and-shift; bringing an existing positions drawer pattern from another order ticket into a new trading application. While this approach optimized for speed, early design exploration revealed that simply integrating the existing drawer into the new app would perpetuate significant discoverability and workflow issues that existed on the platform.
          </p>
          <p style={{ fontSize: 16, fontWeight: 500, lineHeight: 1.7, letterSpacing: '-0.31px', color: 'white', maxWidth: 961 }}>
            I led lightweight design explorations that reframed the problem from <em>how to integrate an existing component</em> to <em>how to design for efficient in-flow decision-making</em>. In partnership with product, design system, and development teams, we identified an opportunity to establish a simple yet impactful new solution that would scale beyond a single trade ticket and support a broader range of contextual utilities across the platform's data-dense workflows.
          </p>
        </div>
      </section>

      {/* 4. PROJECT DETAILS */}
      <section style={{ background: 'white', padding: '140px var(--side-padding)' }}>
        <div style={{ maxWidth: 'var(--content-width)', width: '100%', margin: '0 auto' }}>
          <h2 className="cs-h2">Project Details</h2>
          <div className="details-grid">
            {[
              { heading: 'Context', items: [
                'Wealthscape is an institutional investing platform used by advisors to manage client portfolios',
                'Trading workflows span multiple applications, varying by advisor role and asset class',
                'While these apps evolved independently, all relied on portfolio positions data as critical context',
              ]},
              { heading: 'Opportunity', items: [
                'Despite being central to trading, portfolio positions were treated as secondary across these applications',
                'Positions info was hidden within drawers rather than intentionally integrated into workflows',
                'Advisors were forced to interrupt order entry to reference holdings — introducing friction and risk',
              ]},
              { heading: 'Key Outcomes', items: [
                'Redesigned positions as an in-context component surfaced alongside trade entry',
                'Improved discoverability and scan-ability of key portfolio data at the moment of decision',
                'Reduced context switching and supported faster, more confident, accurate trade execution',
                'Established a new design system component and page layout standard for data-dense workflows',
              ]},
            ].map(col => (
              <div key={col.heading} className="details-col">
                <img
                  src={col.heading === 'Context' ? '/context.svg' : col.heading === 'Opportunity' ? '/opportunity.svg' : '/key outcomes.svg'}
                  alt={col.heading}
                  style={{ width: '100%', marginBottom: 24, borderRadius: 8 }}
                />
                <h3 className="details-col-heading">{col.heading}</h3>
                <ul className="details-list">{col.items.map((item, i) => <li key={i}>{item}</li>)}</ul>
              </div>
            ))}
          </div>

          {/* Measurement constraint callout */}
          <div style={{ marginTop: 48, padding: '28px 36px', background: 'rgba(106,129,178,0.08)', border: '1px solid rgba(106,129,178,0.2)', borderRadius: 12 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 10 }}>
              <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                <polygon points="9,0 18,16 0,16" fill="#F5C518"/>
                <rect x="8" y="5" width="2" height="5" fill="#7a5c00"/>
                <rect x="8" y="12" width="2" height="2" fill="#7a5c00"/>
              </svg>
              <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--muted-blue)', margin: 0 }}>A note on measurement</p>
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--deep-blue)', margin: 0, paddingLeft: 32 }}>
              This project was completed in an environment without mature analytics infrastructure or established KPI frameworks for UX work. Quantitative instrumentation wasn't yet standard practice on this platform. Rather than treat this as an inevitable constraint, I defined and proposed a comprehensive measurement approach to guide future implementation and product decisions. The plan included a detailed success framework and measurement plan — in the <strong>Measuring Success</strong> section below.
            </p>
          </div>
        </div>
      </section>

      {/* 5. PROBLEM HYPOTHESIS */}
      <section style={{ background: 'var(--cream)', padding: '140px var(--side-padding)' }}>
        <div style={{ maxWidth: 'var(--content-width)', width: '100%', margin: '0 auto' }}>
          <h2 className="cs-h2">Initial Problem Hypothesis &amp; Key Questions</h2>
          <p className="cs-body">Our trading platform serves professional traders managing complex institutional portfolios. <strong>The initial hypothesis was clear: positions data is critical to every trade decision, yet it remained hidden, secondary, or spatially competitive with the primary task.</strong> We set out to understand the full scope of this problem before proposing any solution.</p>
          <p className="cs-body" style={{ marginBottom: 16 }}>Key questions guiding discovery:</p>
          <ul style={{ paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 0 }}>
            {[
              'How and where does positions data currently appear across trading applications?',
              'What friction does this cause for advisors during order entry?',
              'Are there workarounds that reveal latent user needs?',
              'What would ideal in-flow positions access look like across different trading contexts?',
            ].map((q, i) => (
              <li key={i} style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--deep-blue)' }}>{q}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6. PROCESS */}
      <section style={{ background: '#B17C5D', padding: '140px var(--side-padding)' }}>
        <div style={{ maxWidth: 'var(--content-width)', width: '100%', margin: '0 auto' }}>
          <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#f6fbde', marginBottom: 56 }}>Design Process</p>
          <img src="/process.svg" alt="Our design process" style={{ width: '100%', maxWidth: 900, display: 'block', margin: '0 auto' }} />
        </div>
      </section>

      {/* 7. PLATFORM AUDIT */}
      <section style={{ background: 'var(--cream)', padding: '140px var(--side-padding)' }}>
        <div style={{ maxWidth: 'var(--content-width)', width: '100%', margin: '0 auto' }}>
          <h2 className="cs-h2">Platform Audit</h2>
          <p className="cs-body">I conducted a comprehensive audit of all trading platform applications to document how positions data was currently surfaced across the ecosystem.</p>
          <div className="stats-row" style={{ marginTop: 40 }}>
            {[['10', 'Applications Identified'], ['5', 'Different Patterns'], ['12+', 'Usability Issues']].map(([n, l]) => (
              <div key={l} className="stat-item" style={{ background: 'var(--cream)' }}>
                <div className="stat-number">{n}</div>
                <div className="stat-label">{l}</div>
              </div>
            ))}
          </div>
          {/* Featured Example */}
          <div style={{ marginTop: 48, borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(144,161,185,0.2)' }}>
            <div style={{ padding: '16px 24px', background: 'white', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid rgba(144,161,185,0.15)' }}>
              <h4 style={{ fontSize: 15, fontWeight: 700, color: 'var(--deep-blue)', margin: 0 }}>Multi-Order Ticket</h4>
              <span className="featured-badge">Featured Example</span>
              <span style={{ fontSize: 12, color: 'var(--steel-blue)', marginLeft: 'auto' }}>Bottom Drawer Pattern</span>
            </div>
            <div style={{ padding: 24, background: 'rgba(202,213,226,0.08)' }}>
              <img src="/featuredexample.png" alt="Multi-Order Ticket featured example" style={{ width: '100%', display: 'block', borderRadius: 8 }} />
            </div>
            <div style={{ padding: '24px', background: 'white' }}>
              <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--warm-gray)', marginBottom: 16 }}>Critical Issues Identified</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {[
                  { title: 'Low Discoverability', desc: 'Viewing positions data begins workflow, but the trigger to open the drawer is hidden at the bottom of the page' },
                  { title: 'Inefficient Use of Screen Space', desc: "Drawer's shape allowed for viewing many details on a few positions when users actually needed a few key details on many positions" },
                  { title: 'Unclear Trigger Component & Label', desc: 'Ambiguous trigger placement and text suggests navigation rather than in-page context' },
                  { title: 'Obscures Primary Interface', desc: 'Opening drawer covers trade entry form — forces toggle behavior between positions and order entry' },
                ].map((issue, i) => (
                  <div key={i} style={{ background: 'rgba(202,213,226,0.15)', borderLeft: '4px solid #d89396', borderRadius: 4, padding: '14px 16px 14px 18px' }}>
                    <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--warm-gray)', marginBottom: 6 }}>{issue.title}</p>
                    <p style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--deep-blue)', margin: 0 }}>{issue.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="audit-grid" style={{ marginTop: 40 }}>
            {[
              { title: 'Positions App — Opened/Unrealized', pattern: 'Full Page Application', img: '/positions.svg', issues: ['Separate application — no in-context viewing', '12+ columns create information overload', 'Horizontal scrolling required', 'Poor scanability — all data equal weight'] },
              { title: 'Order Entry Tickets (6 apps)', pattern: 'Bottom Drawer', img: '/orderentry.svg', issues: ['Low discoverability', 'Unclear trigger component & label', 'Competes with primary interface', 'Can only see a few positions — vertical scrolling required'] },
              { title: 'OneView Monitor', pattern: 'Small Tile', img: '/oneview.svg', issues: ['Competes with other widgets for attention', 'Size constraints limit breadth and depth of data shown', 'Not contextual to certain decisions, yet widget is fixed in open state'] },
              { title: 'Held Orders Manager', pattern: 'Fixed Side Panel', img: '/HOM.svg', issues: ['Limited horizontal space reduces data density', 'Always open — occupying key screen real-estate even when not needed'] },
            ].map(card => (
              <div key={card.title} className="audit-card">
                <div className="audit-card-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <h4 className="audit-card-title">{card.title}</h4>
                  </div>
                  <p className="audit-card-pattern">{card.pattern}</p>
                </div>
                <div style={{ padding: '16px 24px 0', background: 'rgba(202,213,226,0.08)', display: 'flex', justifyContent: 'center' }}>
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
            <p className="finding-callout-text">Positions data had been architecturally positioned as supplementary, on-demand content — but was behaviorally used as essential, always-on context. The recurring theme across every application: vertical orientation, spatial competition, and hidden triggers.</p>
          </div>
        </div>
      </section>

      {/* 8. HEURISTIC INSPECTION */}
      <section style={{ background: 'white', padding: '140px var(--side-padding)' }}>
        <div style={{ maxWidth: 'var(--content-width)', width: '100%', margin: '0 auto' }}>
          <h2 className="cs-h2">Heuristic Inspection</h2>
          <p className="cs-body">Across these applications, a heuristic evaluation surfaced consistent violations that compounded into significant workflow friction for advisors.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 40 }}>
            {heuristicItems.map(item => (
              <div key={item.title} style={{ borderRadius: 12, border: '1px solid rgba(144,161,185,0.18)', overflow: 'hidden', background: 'var(--cream)' }}>
                {/* Animation */}
                <div style={{ padding: '20px 20px 16px' }}>
                  {item.animation}
                </div>
                {/* Info */}
                <div style={{ padding: '0 20px 20px', borderTop: '1px solid rgba(144,161,185,0.12)', paddingTop: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 6 }}>
                    <h4 style={{ fontSize: 15, fontWeight: 700, color: 'var(--warm-gray)', margin: 0 }}>{item.title}</h4>
                    <span className={`issue-severity issue-severity--${item.severity.toLowerCase()}`} style={{ flexShrink: 0 }}>{item.severity}</span>
                  </div>
                  <span style={{ fontSize: 11, color: '#B17C5D', fontWeight: 600, display: 'block', marginBottom: 10 }}>{item.heuristic}</span>
                  <p style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--deep-blue)', margin: 0 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="finding-callout" style={{ marginTop: 40 }}>
            <p className="finding-callout-label">Key Finding</p>
            <p className="finding-callout-text">The core issue was the structural model being used. Positions data had been treated as supplementary information accessed on demand, when it was actually prerequisite context for every trade. The design forced a choice between seeing positions and entering trades — two fundamentally interdependent tasks.</p>
          </div>
        </div>
      </section>

            {/* 9. SME INSIGHTS */}
      <section style={{ background: 'var(--cream)', padding: '140px var(--side-padding)' }}>
        <div style={{ maxWidth: 'var(--content-width)', width: '100%', margin: '0 auto' }}>
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
                <p className="quote-attribution">— {q.role}</p>
              </div>
            ))}
          </div>
          <div className="finding-callout" style={{ marginTop: 40 }}>
            <p className="finding-callout-label">Behavioral Analytics Insight</p>
            <p className="finding-callout-text">The majority of advisors had independently developed the same workaround: open positions in a separate window, position on second monitor, and manually reference while entering trades. This self-created workaround validated our design direction — the solution needed to give users simultaneous access to both positions and the trade entry form.</p>
          </div>
        </div>
      </section>

      {/* 10. JOURNEY MAPPING */}
      <section style={{ background: 'white', padding: '140px var(--side-padding)' }}>
        <div style={{ maxWidth: 'var(--content-width)', width: '100%', margin: '0 auto' }}>
          <h2 className="cs-h2">Journey Mapping</h2>
          <p className="cs-body">Mapping the end-to-end workflow revealed how positions friction compounded across every stage of the advisor's trading journey.</p>
          <JourneyMap />
          <div className="quote-block" style={{ marginTop: 40 }}>
            <p className="quote-text">"The positions drawer isn't just a UX issue — it's a compliance risk. Advisors are making decisions without complete information because the tool makes it too hard to have both visible at once."</p>
            <p className="quote-attribution">— Compliance Officer, Internal SME Interview</p>
          </div>
        </div>
      </section>

            {/* 11. INSIGHT SYNTHESIS */}
      <section style={{ background: 'var(--cream)', padding: '140px var(--side-padding)' }}>
        <div style={{ maxWidth: 'var(--content-width)', width: '100%', margin: '0 auto' }}>
          <h2 className="cs-h2">Insight Synthesis</h2>
          <p className="cs-body">Across four research methods, three critical themes emerged consistently.</p>
          <div className="insight-grid">
            {[
              { title: 'Low Visibility', img: '/visibility.svg', items: ['Low affordance — triggers appeared to navigate away rather than reveal content', 'Positions buried below fold or behind interaction layers', 'No persistent visual indicator that positions data was available', 'Users unaware of the full scope of accessible data'] },
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
            <p className="finding-callout-text">The issues weren't isolated — they compounded. What appeared to be a simple discoverability problem was a structural mismatch. Fixing the drawer wouldn't solve it. The mental model needed to change: positions as essential, always-on context — not supplementary, on-demand content.</p>
          </div>
        </div>
      </section>

      {/* 12. PROBLEM DEFINED */}
      <section style={{ background: '#9e6b63', padding: '140px var(--side-padding)' }}>
        <div style={{ maxWidth: 'var(--content-width)', width: '100%', margin: '0 auto' }}>
          <h2 className="cs-h2" style={{ color: '#f6fbde' }}>Problem: Validated &amp; Defined</h2>
          <p style={{ fontSize: 20, fontWeight: 700, lineHeight: 1.5, color: '#f6fbde', marginBottom: 20, marginTop: 32 }}>
            Portfolio positions data is prerequisite context for every trade decision — yet the current design treats it as supplementary, on-demand information. This structural mismatch forces advisors to choose between seeing their positions and entering a trade, two tasks that must happen simultaneously.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: 'rgba(246,251,222,0.85)' }}>
            The result: advisors interrupt their workflows, accept higher cognitive load, build manual workarounds, and make decisions with incomplete information — introducing friction, inefficiency, and risk at the highest-stakes moment of the trading process.
          </p>

          {/* Business Impact callout */}
          <div style={{ marginTop: 48, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div style={{ background: 'rgba(0,0,0,0.15)', borderRadius: 12, padding: '28px 32px', borderTop: '3px solid rgba(246,251,222,0.4)' }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: 'rgba(246,251,222,0.6)', marginBottom: 10 }}>Client Relationship Risk</p>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: 'rgba(246,251,222,0.9)', margin: 0 }}>Trading errors are among the most costly outcomes a firm can face. When advisors make decisions with incomplete position data, errors increase — damaging trust between our clients and the end investors they trade on behalf of. In an industry where reputation is everything, preventable errors are not a UX problem. They are a business problem.</p>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.15)', borderRadius: 12, padding: '28px 32px', borderTop: '3px solid rgba(246,251,222,0.4)' }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: 'rgba(246,251,222,0.6)', marginBottom: 10 }}>Operational Cost</p>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: 'rgba(246,251,222,0.9)', margin: 0 }}>Each trading error generates downstream work: service inquiries, manual corrections, and follow-up from our support teams. Reducing workflow friction isn't just about advisor experience — it directly reduces the volume of error-driven support load and the internal cost of remediation that follows.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 13. SOLUTION PARAMETERS */}
      <section style={{ background: 'var(--cream)', padding: '140px var(--side-padding)' }}>
        <div style={{ maxWidth: 'var(--content-width)', width: '100%', margin: '0 auto' }}>
          <h2 className="cs-h2">Defining Solution Parameters</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginTop: 40 }}>
            {[
              { img: '/requirement.svg', title: 'Requirements', items: ['Positions visible alongside trade entry without user action', 'Must not obscure or compete with primary interface', 'Must work across all 10 applications with minimal custom work', 'Implementable within design system constraints'] },
              { img: '/howmight.svg', title: 'How Might We...', items: ['Surface positions data native to the trade entry flow?', 'Optimize for breadth over depth?', 'Establish a pattern flexible enough to scale platform-wide?', 'Reduce interactions needed to reference positions to zero?'] },
              { img: '/strategic.svg', title: 'Alignment', items: ['Design system team committed to contributing new component', 'Engineering confirmed feasibility of horizontal panel layout', 'Product aligned on piloting in one application first'] },
            ].map(card => (
              <div key={card.title} style={{ background: 'white', border: '1px solid rgba(144,161,185,0.2)', borderRadius: 12, padding: '32px 28px' }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(177,124,93,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}><img src={card.img} alt={card.title} style={{ width: 24, height: 24, filter: 'invert(55%) sepia(27%) saturate(700%) hue-rotate(330deg) brightness(88%)' }} /></div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--warm-gray)', marginBottom: 16 }}>{card.title}</h3>
                <ul className="details-list">{card.items.map((item, i) => <li key={i}>{item}</li>)}</ul>
              </div>
            ))}
          </div>
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
      <section style={{ background: 'white', padding: '140px var(--side-padding)' }}>
        <div style={{ maxWidth: 'var(--content-width)', width: '100%', margin: '0 auto' }}>
          <h2 className="cs-h2">Ideation &amp; Lo-Fi Exploration</h2>
          <p className="cs-body">I explored multiple approaches to organizing positions data alongside trade entry, each with different tradeoffs around visibility, interaction cost, and space efficiency.</p>

          {/* Selected Direction — promoted */}
          <div className="concept-card-grid" style={{ marginTop: 40, border: '1.5px solid var(--terracotta)', borderRadius: 14, overflow: 'hidden', display: 'grid', gridTemplateColumns: '2fr 1fr' }}>
            {/* Illustration — 16:9 aspect ratio */}
            <div style={{ background: 'rgba(177,124,93,0.05)' }}>
              {getConceptIllustration("Horizontal Cards", 16)}
            </div>
            {/* Text — right side */}
            <div style={{ padding: '36px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderLeft: '1px solid rgba(177,124,93,0.15)', background: 'rgba(177,124,93,0.03)' }}>
              <span className="selected-badge" style={{ alignSelf: 'flex-start', marginBottom: 20 }}>Selected Direction</span>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--warm-gray)', marginBottom: 20 }}>Horizontal Cards</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {['Optimal scannability, efficient use of space, no interaction cost', 'Scales to multiple positions simultaneously', 'Complements rather than competes with trade form'].map((p, i) => (
                  <p key={i} className="concept-pro" style={{ margin: 0 }}><img src="/check.svg" alt="check" /><span>{p}</span></p>
                ))}
              </div>
            </div>
          </div>

          {/* Carousel — other concepts */}
          <ConceptCarousel />
        </div>
      </section>

      {/* 15. KEY DESIGN DECISIONS */}
      <section style={{ background: '#3d4f63', padding: '140px var(--side-padding)' }}>
        <div style={{ maxWidth: 'var(--content-width)', width: '100%', margin: '0 auto' }}>
          <h2 className="cs-h2" style={{ color: '#f6fbde' }}>Key Design Decisions</h2>
          <div className="decision-list">
            {[
              { title: 'Eliminated Context Switching', desc: 'By making positions persistently visible alongside the trade form — not behind a toggle — advisors could reference and enter data simultaneously for the first time.' },
              { title: 'Prioritized Breadth over Depth', desc: 'The horizontal card layout maximizes the number of positions visible at once. We surfaced the 4-5 most relevant fields — ticker, shares, current value, unrealized gain/loss — not all 12+ columns.' },
              { title: 'Built in the Spirit of the Design System', desc: 'Designed to align with the existing visual language, spacing tokens, and interaction patterns. Worked directly with the design system team during development to formalize the component spec.' },
              { title: 'Scalable Across All Trading Use Cases', desc: 'Designed as a context-agnostic "horizontal contextual data panel" — applicable not just to positions, but to any data-dense workflow across the platform requiring secondary reference data.' },
            ].map((d, i) => (
              <div key={i} className="decision-item">
                <div className="decision-check" style={{ background: 'rgba(246,251,222,0.12)', borderColor: 'rgba(246,251,222,0.2)' }}><img src="/check.svg" alt="check" style={{ width: 24, height: 24, filter: 'brightness(0) invert(1)' }} /></div>
                <div>
                  <h4 className="cs-h4" style={{ color: '#f6fbde' }}>{d.title}</h4>
                  <p className="cs-body" style={{ margin: 0, color: 'rgba(246,251,222,0.75)' }}>{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 16. DESIGN SYSTEM */}
      <section style={{ background: 'white', padding: '140px var(--side-padding)' }}>
        <div style={{ maxWidth: 'var(--content-width)', width: '100%', margin: '0 auto' }}>
          <h2 className="cs-h2">Contribution to Design System</h2>
          <p className="cs-body">I partnered with the design system team to formalize the horizontal positions panel as an official design system component — enabling platform-wide adoption with minimal custom work per application.</p>
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
      <section style={{ background: 'var(--cream)', padding: '140px var(--side-padding)' }}>
        <div style={{ maxWidth: 'var(--content-width)', width: '100%', margin: '0 auto' }}>
          <h2 className="cs-h2">Scaling &amp; Rollout</h2>
          <p className="cs-body">Any change to live trading workflows required careful, staged rollout. We structured a phased approach that prioritized learning and iteration at each stage before expanding.</p>
          <div className="app-grid" style={{ marginTop: 40 }}>
            {[
              { phase: 'Phase 1', title: 'Pilot — Multi-Order Ticket', desc: 'Introduced the horizontal positions panel in the highest-traffic trading application. Collected feedback and iterated on column priority and display density.', status: 'Complete', sc: '#5a9e7c', sb: 'rgba(90,158,124,0.3)' },
              { phase: 'Phase 2', title: 'Expand — Order Entry Tickets', desc: 'Applied the standardized component across the 6 individual order entry ticket applications, using the design system component to ensure consistency.', status: 'Complete', sc: '#5a9e7c', sb: 'rgba(90,158,124,0.3)' },
              { phase: 'Phase 3', title: 'Scale — Platform-Wide', desc: 'Rolled out the pattern to all 10 identified applications and established it as the default layout standard for data-dense contexts.', status: 'In Progress', sc: 'var(--muted-blue)', sb: 'rgba(106,129,178,0.3)' },
              { phase: 'Future', title: 'Generalize — Contextual Data Pattern', desc: 'Extend beyond positions to support account summaries, model benchmarks, compliance checks, and order history.', status: 'Planned', sc: 'var(--steel-blue)', sb: 'rgba(144,161,185,0.3)' },
            ].map(item => (
              <div key={item.phase} style={{ padding: '28px 32px', border: '1px solid rgba(144,161,185,0.2)', borderRadius: 12, background: 'white' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--terracotta)' }}>{item.phase}</span>
                  <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 4, color: item.sc, background: 'rgba(0,0,0,0.04)', border: `1px solid ${item.sb}` }}>{item.status}</span>
                </div>
                <h4 style={{ fontSize: 16, fontWeight: 700, color: 'var(--warm-gray)', marginBottom: 8 }}>{item.title}</h4>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--deep-blue)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 17b. MEASURING SUCCESS */}
      <section style={{ background: 'white', padding: '140px var(--side-padding)' }}>
        <div style={{ maxWidth: 'var(--content-width)', width: '100%', margin: '0 auto' }}>
          <h2 className="cs-h2">Measuring Success</h2>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--deep-blue)', maxWidth: 700, marginBottom: 56 }}>
            One of the biggest challenges on this project was the absence of mature analytics infrastructure. Legacy tooling didn't support event-level tracking, and there were no established baseline metrics for this feature area. Rather than let this become a blind spot, I worked to define what rigorous measurement would look like — both as a design deliverable and as a foundation for future instrumentation.
          </p>

          {/* Constraint callout */}
          <div style={{ padding: '24px 32px', background: 'rgba(251,250,244,0.6)', border: '1px solid rgba(177,124,93,0.2)', borderRadius: 10, marginBottom: 56 }}>
            <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--terracotta)', marginBottom: 10 }}>The constraint</p>
            <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--deep-blue)', margin: 0 }}>
              When I asked stakeholders "What would make this successful?", the answer was: "We don't have strong enough analytics tools to tell us what success looks like today." Rather than viewing this as a blocker, I treated it as an opportunity to establish a measurement framework from the ground up — one that could be implemented as the new platform launched.
            </p>
          </div>

          {/* Success metrics grid */}
          <h3 className="cs-h3" style={{ marginBottom: 24 }}>Proposed Success Framework</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20, marginBottom: 56 }}>
            {[
              {
                label: 'Task Completion Rate',
                badge: 'Critical',
                badgeColor: '#c0392b',
                what: '% of users who successfully complete an order entry with the new positions panel',
                how: 'Event tracking: position_panel_task_completed',
                target: 'Baseline TBD → Improve by 25%+ within 60 days',
              },
              {
                label: 'Time to Complete Order',
                badge: 'Critical',
                badgeColor: '#c0392b',
                what: 'Average time from opening order entry to submitting order',
                how: 'Timestamp delta: start_order → complete_order',
                target: 'Baseline TBD → Reduce by 30% (hypothesis: ~4min → ~2.5min)',
              },
              {
                label: 'Support Ticket Volume',
                badge: 'High (Can measure now!)',
                badgeColor: '#e67e22',
                what: '# of support tickets tagged "order entry" or "position tracking"',
                how: 'Support system data (existing)',
                target: 'Current baseline ~240/month → Reduce to <160/month (-30%)',
              },
              {
                label: 'Trading Efficiency (Orders/Hour)',
                badge: 'Critical',
                badgeColor: '#c0392b',
                what: 'Average orders completed per trading hour per user',
                how: 'May be available in existing business systems',
                target: 'Current unknown → Improve by 20%+',
              },
            ].map(metric => (
              <div key={metric.label} style={{ padding: '24px 28px', border: '1px solid rgba(144,161,185,0.25)', borderRadius: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--deep-blue)', margin: 0 }}>{metric.label}</p>
                  <span style={{ fontSize: 11, fontWeight: 700, color: 'white', background: metric.badgeColor, padding: '3px 10px', borderRadius: 4, whiteSpace: 'nowrap', marginLeft: 12 }}>{metric.badge}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <p style={{ fontSize: 13, color: 'var(--warm-gray)', margin: 0 }}><strong>What:</strong> {metric.what}</p>
                  <p style={{ fontSize: 13, color: 'var(--warm-gray)', margin: 0 }}><strong>How:</strong> {metric.how}</p>
                  <p style={{ fontSize: 13, color: 'var(--muted-blue)', margin: 0 }}><strong>Target:</strong> {metric.target}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Interim note */}
          <div style={{ padding: '20px 28px', background: 'rgba(106,129,178,0.06)', borderLeft: '3px solid var(--muted-blue)', borderRadius: '0 8px 8px 0', marginBottom: 56 }}>
            <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--deep-blue)', margin: 0, fontStyle: 'italic' }}>
              In the interim, I tracked qualitative signals through user interviews and support ticket analysis to validate directional improvements while instrumentation was being built.
            </p>
          </div>

          {/* Instrumentation spec */}
          <h3 className="cs-h3" style={{ marginBottom: 16 }}>Instrumentation Plan</h3>
          <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--deep-blue)', marginBottom: 28 }}>
            I collaborated with engineering to ensure the redesign included proper event architecture from day one — so that when the analytics platform launched, tracking would already be in place with no retroactive instrumentation needed.
          </p>
          <div style={{ background: '#1e1e2e', borderRadius: 10, padding: '28px 32px', marginBottom: 28 }}>
            {[
              { event: 'position_panel_opened', trigger: 'User clicks to expand position panel', params: 'user_id, timestamp, panel_state (collapsed→expanded)' },
              { event: 'order_entry_started', trigger: 'User begins filling out order form', params: 'user_id, timestamp, order_type, source_screen' },
              { event: 'order_entry_completed', trigger: 'User successfully submits order', params: 'user_id, timestamp, order_id, time_to_complete, position_panel_used (boolean)' },
              { event: 'order_entry_error', trigger: 'User encounters an error during order entry', params: 'user_id, timestamp, error_type, error_message, step_in_flow' },
            ].map(spec => (
              <div key={spec.event} style={{ marginBottom: 20, paddingBottom: 20, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#a8d8a8', margin: '0 0 6px', fontFamily: 'monospace' }}>{spec.event}</p>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', margin: '0 0 4px' }}><span style={{ color: 'rgba(255,255,255,0.4)' }}>Trigger:</span> {spec.trigger}</p>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', margin: 0 }}><span style={{ color: 'rgba(255,255,255,0.4)' }}>Parameters:</span> {spec.params}</p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--warm-gray)', marginBottom: 0 }}>
            This spec became part of our engineering handoff documentation and enabled the team to measure all critical metrics outlined in the success framework above.
          </p>
        </div>
      </section>

      {/* 18. RESULTS — steel blue */}
      <section style={{ background: 'var(--steel-blue)', padding: '140px var(--side-padding)' }}>
        <div style={{ maxWidth: 'var(--content-width)', width: '100%', margin: '0 auto' }}>
          <h2 style={{ fontSize: 36, fontWeight: 700, color: 'var(--text-light)', marginBottom: 48 }}>Results &amp; Impact</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 56 }}>
            {[
              { icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(246,251,222,0.9)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="22" y2="22"/>
                  </svg>
                ), title: 'Improved Discoverability', desc: 'Positions information now visible without hunting through drawers or switching applications' },
              { icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(246,251,222,0.9)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="2" y1="12" x2="22" y2="12"/><polyline points="8,6 2,12 8,18"/><polyline points="16,6 22,12 16,18"/>
                  </svg>
                ), title: 'Better Scannability', desc: 'Horizontal layout leverages available screen real estate — more positions visible at once' },
              { icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(246,251,222,0.9)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                  </svg>
                ), title: 'Platform Consistency', desc: 'Unified pattern across all trading pages reduces cognitive overhead when switching applications' },
            ].map(card => (
              <div key={card.title} style={{ padding: '28px', background: 'rgba(246,251,222,0.07)', border: '1px solid rgba(246,251,222,0.12)', borderRadius: 12 }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(246,251,222,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>{card.icon}</div>
                <h4 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-light)', marginBottom: 8 }}>{card.title}</h4>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: 'rgba(246,251,222,0.65)' }}>{card.desc}</p>
              </div>
            ))}
          </div>
          <div>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: 'rgba(246,251,222,0.8)', marginBottom: 24 }}>Initial Feedback from SMEs</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { quote: "This is the first time I've been able to see both my positions and my order in the same view. It sounds simple but it changes everything about how I work.", role: 'Product Manager, Internal SME' },
                { quote: "Clients are asking fewer questions about why their orders look different from what they expected. The in-context positions panel gives advisors the confidence to get it right the first time.", role: 'Client Success Manager, Internal SME' },
                { quote: "We've had to do almost no customization per application. The design system component just works.", role: 'Implementation Specialist, Internal SME' },
              ].map((q, i) => (
                <div key={i} style={{ padding: '20px 28px', background: 'rgba(246,251,222,0.06)', border: '1px solid rgba(246,251,222,0.1)', borderRadius: 10 }}>
                  <p style={{ fontSize: 15, fontStyle: 'italic', lineHeight: 1.6, color: 'rgba(246,251,222,0.9)', marginBottom: 8 }}>"{q.quote}"</p>
                  <p style={{ fontSize: 12, fontWeight: 500, color: 'rgba(246,251,222,0.45)' }}>— {q.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 19. REFLECTIONS */}
      <section style={{ background: 'white', padding: '140px var(--side-padding)' }}>
        <div style={{ maxWidth: 'var(--content-width)', width: '100%', margin: '0 auto' }}>
          <h2 className="cs-h2">Reflections &amp; Learnings</h2>
          <div style={{ padding: '32px 40px', background: 'rgba(251,250,244,0.5)', border: '1px solid rgba(177,124,93,0.15)', borderRadius: 12, marginBottom: 40 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[
                { title: 'The best solutions often feel deceptively simple:', desc: 'The horizontal card pattern looks obvious in hindsight — but it required substantial research to understand why it was right, and substantial facilitation work to get alignment on reframing the problem before we could arrive there.' },
                { title: 'Visualizing platform-level impact unlocked stakeholder alignment:', desc: 'Showing how a single design decision could scale to 10+ applications in a single diagram was more persuasive than any usability metric. This framing transformed a single-feature discussion into a platform strategy conversation.' },
              ].map((item, i) => (
                <div key={i}>
                  <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--terracotta)', marginBottom: 6 }}>{item.title}</p>
                  <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--deep-blue)' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="reflection-grid">
            <div>
              <h3 className="reflection-col-heading">What Went Well</h3>
              <ul className="reflection-list good">
                <li><img src="/check.svg" alt="check" /><span>Rapid prototyping allowed us to test and discard ideas quickly — we evaluated 5 concepts in the time a traditional process might review 1</span></li>
                <li><img src="/check.svg" alt="check" /><span>Early cross-functional alignment with engineering prevented late-stage redesigns</span></li>
                <li><img src="/check.svg" alt="check" /><span>Design system team involvement from day one meant the contributed component required almost no rework post-handoff</span></li>
                <li><img src="/check.svg" alt="check" /><span>Research artifacts (journey map, audit matrix) became reusable tools referenced by other teams months after the project ended</span></li>
              </ul>
            </div>
            <div>
              <h3 className="reflection-col-heading">What I'd Do Differently</h3>
              <ul className="reflection-list different">
                <li>Involve more end-user advisors earlier in concept evaluation — SME proxies provided good coverage but couldn't fully replicate real trader response</li>
                <li>Define quantitative success metrics upfront — our outcome measurement was largely qualitative. I've since developed the success framework and instrumentation plan documented in this case study as a model for future projects</li>
                <li>Document design rationale more formally during development — some nuanced decisions weren't captured and required re-explanation later</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 20. NEXT STEPS */}
      <section style={{ background: 'var(--cream)', padding: '100px var(--side-padding) 120px' }}>
        <div style={{ maxWidth: 'var(--content-width)', width: '100%', margin: '0 auto' }}>
          <h2 className="cs-h2">Next Steps</h2>
          <div className="next-steps-grid">
            <div>
              <h3 className="next-steps-heading">Planned Enhancements</h3>
              <ul className="next-steps-list">
                <li>Advanced filtering and search within the positions panel</li>
                <li>Customizable alerts based on position changes or thresholds</li>
                <li>Mobile-optimized version for on-the-go monitoring</li>
                <li>Integration with trade execution confirmation workflows</li>
              </ul>
            </div>
            <div>
              <h3 className="next-steps-heading">Continuous Improvement</h3>
              <ul className="next-steps-list">
                <li>Monthly feedback sessions with representative advisor cohorts</li>
                <li>A/B testing of new features before full rollout</li>
                <li>Analytics monitoring for usage patterns and adoption gaps</li>
                <li>Quarterly review of feature adoption and satisfaction metrics</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-left">kristin<span>.garza</span> · UX Designer</div>
        <div className="footer-links">
          <a href="https://www.linkedin.com/in/kristin-garza" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="mailto:kmkerney221@gmail.com">Email</a>
          <a href="/resume.pdf" target="_blank" rel="noreferrer">Resume</a>
        </div>
      </footer>
    </div>
  )
}
