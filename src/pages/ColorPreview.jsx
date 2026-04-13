import { useState } from 'react'

// New palette
const accent = '#8C8958'
const accentDark = '#59573B'
const accentMid = 'rgba(140,137,88,0.4)'
const accentLight = 'rgba(140,137,88,0.1)'
const warmGray = '#4A4540'
const deepText = '#5C5A3E'
const cream = '#F3F1EE'
const pageBg = '#FAF9F6'
const peach = '#D6A180'
const peachLight = 'rgba(214,161,128,0.12)'
const espresso = '#241D15'
const borderLight = 'rgba(140,137,88,0.15)'

const sideP = 'clamp(20px, 5vw, 80px)'
const contentW = '1200px'
const sec = (bg) => ({ width: '100%', padding: `100px ${sideP}`, background: bg })
const ct = { maxWidth: contentW, width: '100%', margin: '0 auto' }

function StepLabel({ children }) {
  return (
    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: accent, display: 'flex', alignItems: 'center', gap: 10, marginBottom: 40 }}>
      {children}
      <span style={{ flex: 1, height: 1, background: accentMid }} />
    </div>
  )
}

export default function ColorPreview() {
  return (
    <div style={{ fontFamily: 'Inter,sans-serif', background: pageBg, color: warmGray, fontSize: 16, lineHeight: 1.5 }}>

      {/* HERO */}
      <section style={{ ...sec(cream), paddingTop: 140, paddingBottom: 0, overflow: 'hidden' }}>
        <div style={ct}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
            {['Research', 'Strategy', 'Product Design', 'Testing'].map(tag => (
              <span key={tag} style={{ fontSize: 11, fontWeight: 600, padding: '4px 12px', borderRadius: 20, background: accentLight, border: `1px solid ${accentMid}`, color: accentDark }}>{tag}</span>
            ))}
            <span style={{ fontSize: 11, fontWeight: 600, padding: '4px 12px', borderRadius: 20, background: 'rgba(214,161,128,0.15)', border: '1px solid rgba(214,161,128,0.35)', color: '#8B5E3C' }}>Shipped ✓</span>
          </div>
          <h1 style={{ fontSize: 42, fontWeight: 700, lineHeight: 1.25, letterSpacing: '-0.5px', color: espresso, maxWidth: 780, marginBottom: 16 }}>
            Redesigning Order Management — How Enterprise Trading Gets Monitored, Reviewed, and Acted On
          </h1>
          <p style={{ fontSize: 18, fontWeight: 400, fontStyle: 'italic', color: 'rgba(89,87,59,0.6)', marginBottom: 60 }}>
            From a fragile legacy system to a modern, reliable experience — navigating constraints, protecting what matters
          </p>

          {/* Mini hero mockup */}
          <div style={{ background: espresso, borderRadius: '12px 12px 0 0', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', paddingBottom: 0 }}>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 6, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              {['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.12)'].map((c, i) => <span key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: c }} />)}
              <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', fontWeight: 600, marginLeft: 6 }}>Order Management</span>
            </div>
            <div style={{ padding: '16px 20px' }}>
              <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
                <span style={{ fontSize: 9, padding: '2px 10px', borderRadius: 20, background: 'rgba(140,137,88,0.2)', border: '1px solid rgba(140,137,88,0.4)', color: 'rgba(140,137,88,0.9)' }}>Account: XXXXXX</span>
                <span style={{ fontSize: 9, padding: '2px 10px', borderRadius: 20, background: 'rgba(214,161,128,0.15)', border: '1px solid rgba(214,161,128,0.3)', color: 'rgba(214,161,128,0.9)' }}>Action: BUY</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px 60px 60px 60px 80px', gap: 0, borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: 6, marginBottom: 8 }}>
                {['Order Type', 'Symbol', 'Action', 'Qty', 'Price', 'Account'].map(h => (
                  <span key={h} style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase' }}>{h}</span>
                ))}
              </div>
              {[
                { type: 'Option', sym: 'AAPL', action: 'BUY', qty: 'x,xxx', price: '$xx.xx', acct: 'xxxxxxx' },
                { type: 'Equity', sym: 'META', action: 'SELL', qty: 'x,xxx', price: '$xx.xx', acct: 'xxxxxxx' },
                { type: 'Option', sym: 'TSLA', action: 'BUY', qty: 'x,xxx', price: '$xx.xx', acct: 'xxxxxxx' },
                { type: 'Equity', sym: 'JPM', action: 'BUY', qty: 'x,xxx', price: '$x.xx', acct: 'xxxxxxx' },
                { type: 'Option', sym: 'NVDA', action: 'SELL', qty: 'x,xxx', price: '$xx.xx', acct: 'xxxxxxx' },
              ].map((r, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 80px 60px 60px 60px 80px', gap: 0, padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', alignItems: 'center' }}>
                  <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)' }}>{r.type}</span>
                  <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>{r.sym}</span>
                  <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 8px', borderRadius: 4, background: r.action === 'BUY' ? 'rgba(90,158,124,0.2)' : 'rgba(194,112,112,0.2)', color: r.action === 'BUY' ? '#5a9e7c' : '#c27070', display: 'inline-block', width: 'fit-content' }}>{r.action}</span>
                  <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>{r.qty}</span>
                  <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>{r.price}</span>
                  <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>{r.acct}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TL;DR */}
      <section style={sec(pageBg)}>
        <div style={ct}>
          <h2 style={{ fontSize: 72, fontWeight: 800, color: espresso, lineHeight: 1, marginBottom: 40 }}>tl;dr</h2>
          <p style={{ fontSize: 20, fontWeight: 500, lineHeight: 1.65, letterSpacing: '-0.3px', color: peach, maxWidth: 820, marginBottom: 48 }}>
            A platform-wide modernization effort gave us the opportunity to redesign Order Management — the surface where compliance and operations teams at major broker-dealers, banks, and advisory firms monitor and act on thousands of trades daily.
          </p>
          <div style={{ background: accentLight, border: `1px solid ${accentMid}`, borderRadius: 14, padding: '28px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24 }}>
            {[
              { l: 'Role', v: 'Lead UX Designer — Trading' },
              { l: 'Timeline', v: 'Q1 2024–Q1 2025' },
              { l: 'Team', v: 'Design · Product · Engineering · UXR' },
              { l: 'Status', v: 'Shipped ✓' },
            ].map((item, i, arr) => (
              <div key={item.l} style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                <div style={{ whiteSpace: 'nowrap' }}>
                  <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: accent, marginBottom: 6 }}>{item.l}</p>
                  <p style={{ fontSize: 15, fontWeight: 600, color: warmGray, margin: 0 }}>{item.v}</p>
                </div>
                {i < arr.length - 1 && <div style={{ width: 1, height: 36, background: accentMid, flexShrink: 0 }} />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FRAMING */}
      <section style={sec(cream)}>
        <div style={ct}>
          <StepLabel>Context</StepLabel>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: espresso, lineHeight: 1.3, marginBottom: 28, letterSpacing: '-0.3px' }}>
            A modernization that was also <span style={{ fontWeight: 300 }}>a design opportunity</span>
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: deepText, maxWidth: 760, marginBottom: 28 }}>
            The legacy Order Management system was built on an aging tech stack — fragile enough that it needed to be rebuilt entirely. But a forced rebuild is also a rare design opportunity. We weren't just porting the old UI forward; we had the chance to fundamentally rethink how tens of thousands of orders are monitored, reviewed, and acted on every day.
          </p>
        </div>
      </section>

      {/* DISCOVERY */}
      <section style={{ ...sec('#E8E6DF'), paddingTop: 160, paddingBottom: 160 }}>
        <div style={ct}>
          <StepLabel>Step 01 — Discovery</StepLabel>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: warmGray, letterSpacing: '-0.3px', marginBottom: 28 }}>The Legacy Experience</h2>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: deepText, maxWidth: 640, marginBottom: 48 }}>
            Before designing anything new, we needed to understand what users were working with — and why it wasn't working.
          </p>

          {/* Callout */}
          <div style={{ padding: '28px 36px', background: peachLight, border: '1px solid rgba(214,161,128,0.25)', borderRadius: 12, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <span style={{ fontSize: 20, flexShrink: 0, marginTop: 2 }}>⚠️</span>
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8B5E3C', marginBottom: 6 }}>The Spatial Problem</p>
              <p style={{ fontSize: 14, lineHeight: 1.65, color: warmGray, margin: 0 }}>The filter panel consumed vertical space from the top, the order details drawer pushed up from the bottom. Users were forced to choose between filtering, viewing details, or seeing their orders.</p>
            </div>
          </div>
        </div>
      </section>

      {/* RESEARCH */}
      <section style={sec(pageBg)}>
        <div style={ct}>
          <StepLabel>Step 02 — Research</StepLabel>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: warmGray, letterSpacing: '-0.3px', marginBottom: 28 }}>What Users Told Us</h2>
          <p style={{ fontSize: 16, lineHeight: 1.75, color: deepText, maxWidth: 680, marginBottom: 40 }}>
            Partnered with UXR to run exploratory interviews and concept tests across ~20 participants on both the clearing and custody sides of the business.
          </p>

          {/* Research cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 48 }}>
            {[
              { title: 'Addresses the Full Journey', desc: 'Order management is a continuous workflow. Entry through execution — not siloed tasks.' },
              { title: 'Efficient, Reliable, Intuitive', desc: 'The Honda Accord principle: not flashy, but reliable. Predictable every time.' },
              { title: 'Tailored to the Individual', desc: 'Different roles, different needs. Configurability and noise reduction matter.' },
              { title: 'Supports a Range of Experiences', desc: 'Firms vary wildly. 50 orders a day or 50,000. The system works at any scale.' },
            ].map((card) => (
              <div key={card.title} style={{ padding: '24px 28px', background: cream, border: `1px solid ${borderLight}`, borderRadius: 12 }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: accentDark, marginBottom: 8 }}>{card.title}</p>
                <p style={{ fontSize: 13, lineHeight: 1.6, color: warmGray, margin: 0 }}>{card.desc}</p>
              </div>
            ))}
          </div>

          {/* Pull quote */}
          <div style={{ padding: '28px 32px', background: peachLight, border: '1px solid rgba(214,161,128,0.25)', borderRadius: 12, borderLeft: `4px solid ${peach}` }}>
            <p style={{ fontSize: 18, fontStyle: 'italic', color: warmGray, margin: 0, lineHeight: 1.7 }}>
              "It works like a Honda Accord today. It's not the flashiest, but it's reliable."
            </p>
            <p style={{ fontSize: 12, fontWeight: 600, color: '#8B5E3C', marginTop: 12, margin: '12px 0 0 0' }}>— Operations Manager, Custody firm</p>
          </div>

          {/* Key insights */}
          <div style={{ marginTop: 48 }}>
            <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: accent, marginBottom: 20 }}>Key Insights</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
              {[
                { title: 'Zoom In / Zoom Out', desc: 'See hundreds of orders, then dive deep into one — without losing place.' },
                { title: 'Confidence in Filtering', desc: 'Users need to know what they filtered out, not just what remains.' },
                { title: 'Reduce Manual Labor', desc: 'Visible selection and bulk actions. Right-click menus weren\'t enough.' },
              ].map(card => (
                <div key={card.title} style={{ padding: 20, background: accentLight, borderRadius: 8, border: `1px solid ${borderLight}` }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: accentDark, margin: '0 0 8px 0' }}>{card.title}</p>
                  <p style={{ fontSize: 13, lineHeight: 1.6, color: warmGray, margin: 0 }}>{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Color swatch reference */}
      <section style={{ ...sec('#E8E6DF'), paddingTop: 80, paddingBottom: 80 }}>
        <div style={ct}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: accent, marginBottom: 24 }}>Palette Reference</p>
          <div style={{ display: 'flex', gap: 12 }}>
            {[
              { color: cream, label: 'Cream #F3F1EE' },
              { color: accent, label: 'Olive #8C8958' },
              { color: accentDark, label: 'Dark Olive #59573B' },
              { color: peach, label: 'Peach #D6A180' },
              { color: espresso, label: 'Espresso #241D15' },
            ].map(s => (
              <div key={s.label} style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ height: 60, background: s.color, borderRadius: 8, border: '1px solid rgba(0,0,0,0.08)', marginBottom: 8 }} />
                <span style={{ fontSize: 10, color: warmGray }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
