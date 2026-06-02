import { Link } from 'react-router-dom'
import Nav from '../components/Nav.jsx'

const META = [
  { label: 'Role',     value: 'Lead UX Designer' },
  { label: 'Timeline', value: '9–12 months' },
  { label: 'Team',     value: 'Design · Product · Engineering · UXR' },
  { label: 'Status',   value: 'Shipped ✓' },
]

const PAIN_POINTS = [
  {
    num: '01',
    title: 'The Spatial Problem',
    body: 'Filters expanded vertically from the top, order details from the bottom — both crushed the orders table. Users had to choose: filter, view details, or see their list. Pick one.',
  },
  {
    num: '02',
    title: 'Hidden Actions',
    body: 'No checkboxes, no visual affordance for selection. Bulk actions required shift-clicking and a right-click context menu. Buttons toggled enabled/disabled with no explanation.',
  },
  {
    num: '03',
    title: 'The Blind Send Flow',
    body: 'Invisible selection → vague send options → a verification screen with no individual orders visible and nothing fixable → no confirmation after sending.',
  },
]

const PRINCIPLES = [
  { num: '01', title: 'Protect the table',         body: 'Nothing shrinks or obscures the order list. The list is the primary job.' },
  { num: '02', title: 'Go horizontal',              body: 'Stop competing for limited vertical space. Filters, details, and actions live side-by-side.' },
  { num: '03', title: 'Make configuration effortless', body: 'Setup feels practically automatic. Saved views and column config are first-class.' },
  { num: '04', title: 'Surface relevant actions',  body: 'The right next step should feel obvious — no hunting for what to do.' },
  { num: '05', title: 'One surface, one job',       body: 'Monitoring and acting — not deep account analysis. Stay focused.' },
]

const SHIPPED = [
  'Horizontal layout — no more vertical space competition',
  'Configurable views and column management',
  'Visible checkboxes and bulk-action selection with counts',
  'Redesigned send flow with full error transparency',
  'Expandable order details panel behind a single click',
  'Active filter chips above the table',
]

const OUTCOMES = [
  'Filter without losing context or list position',
  'See issues at a glance via row-level warning indicators',
  'Select intentionally with clear visible affordance',
  'Review before sending with full error transparency and inline fixes',
  'Get confirmation and automatic routing to execution tracking',
  'Configure views to match each user\'s daily workflow',
]

const IMPACT = [
  'New horizontal filter molecule became a reusable platform pattern',
  'Established a research-driven approach for all future modernization work',
  'Created a clear roadmap from "ideal" designs that couldn\'t ship in V1',
]

const PILOT = [
  { finding: 'Tab visibility', detail: 'Sent vs. Draft tabs weren\'t distinct enough — users missed the state change. Led to stronger visual differentiation in the follow-up.' },
  { finding: 'Details friction', detail: 'The overlay panel blocked grid scrolling. Opened the door to the split-panel concept that\'s now on the roadmap.' },
  { finding: 'Error scanning', detail: 'Finding issues across large order sets wasn\'t fast enough. Refined the row-level indicator system post-launch.' },
]

export default function CaseStudyOM() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Nav />

      {/* ── HERO ── */}
      <div className="page" style={{ paddingTop: 72, paddingBottom: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 48 }}>
          <span className="eyebrow">Order Management · 2024</span>
          <Link to="/" style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-mute)', textDecoration: 'none' }}>← All work</Link>
        </div>

        {/* Key takeaway as the lead — content before headline */}
        <div style={{ borderTop: '1px solid var(--hairline)', paddingTop: 48, marginBottom: 0 }}>
          <div className="mono" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--clay)', marginBottom: 24 }}>The Takeaway</div>
          <p style={{
            fontFamily: 'var(--f-display-serif)',
            fontWeight: 300,
            fontStyle: 'normal',
            fontSize: 32,
            lineHeight: '45.4px',
            letterSpacing: '-0.38px',
            color: 'var(--ink-2)',
            maxWidth: '64ch',
            margin: '0 0 48px',
          }}>
            We explored a flashy dashboard concept, let research kill it, and shipped the disciplined version. The order ticket had grown into three modals stacked on top of each other — we pulled "build" and "submit" apart, simplified the visual hierarchy, and removed the steps traders had quietly learned to skip.
          </p>
        </div>

        {/* Stats row */}
        <div style={{ borderTop: '1px solid var(--hairline)', borderBottom: '1px solid var(--hairline)', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', padding: '40px 0' }}>
          {[
            { stat: 'Lead UX',    label: 'Role' },
            { stat: '9–12 mo',    label: 'Timeline' },
            { stat: '~20',        label: 'Research participants' },
            { stat: 'Shipped ✓',  label: 'Status' },
          ].map(({ stat, label }) => (
            <div key={label} style={{ borderLeft: '1px solid var(--hairline)', paddingLeft: 24 }}>
              <div style={{ fontFamily: 'var(--f-slab)', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 400, color: 'var(--ink)', lineHeight: 1.1, marginBottom: 8 }}>{stat}</div>
              <div className="mono" style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--clay)' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      <main className="page">

        {/* ── THE PROBLEM ── */}
        <section className="page-section">
          <div className="eyebrow-line">
            <span className="eyebrow">The Problem</span>
            <span className="rule" />
          </div>
          <h2 className="section-title">Three compounding pain points</h2>
          <p className="section-lede">
            Order Management is the central hub for all trades — every order from
            entry to execution passes through this surface. The legacy system had
            three problems that made daily work harder than it needed to be.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {PAIN_POINTS.map(({ num, title, body }) => (
              <div key={num} style={{
                background: 'var(--surface)',
                border: '1px solid var(--hairline)',
                borderRadius: 'var(--r-3)',
                padding: 28,
              }}>
                <div className="mono" style={{ fontSize: 11, color: 'var(--clay)', letterSpacing: '0.14em', marginBottom: 12 }}>{num}</div>
                <h3 className="h-3" style={{ marginBottom: 12 }}>{title}</h3>
                <p className="body" style={{ fontSize: 14, color: 'var(--ink-3)' }}>{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── THE APPROACH ── */}
        <section className="page-section">
          <div className="eyebrow-line">
            <span className="eyebrow">The Approach</span>
            <span className="rule" />
          </div>
          <h2 className="section-title">We thought users wanted a dashboard.</h2>
          <p className="section-lede">
            A forced tech migration created a rare design opportunity. Between anecdotal
            feedback and our own usability analysis, we formed a hypothesis: a
            Bloomberg-style central dashboard would give users a single place to move
            fluidly through the full order journey. Product leaders loved it.
          </p>

          <div style={{
            background: 'var(--slate-tint)',
            border: '1px solid var(--slate-edge)',
            borderRadius: 'var(--r-3)',
            padding: '32px 40px',
            marginBottom: 32,
          }}>
            <div className="mono" style={{ fontSize: 11, color: 'var(--slate-deep)', letterSpacing: '0.14em', marginBottom: 16 }}>Research · ~20 participants</div>
            <h3 className="h-2" style={{ marginBottom: 16 }}>The research told a different story.</h3>
            <p style={{ fontSize: 16, lineHeight: 1.65, color: 'var(--ink-2)', maxWidth: '68ch', marginBottom: 24 }}>
              Users didn't want a dashboard. The concept felt overwhelming — too many
              panels competing for attention with no clear hierarchy. What they actually
              wanted was simpler: the list they already had, made faster and more reliable.
            </p>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              {[
                { label: 'Too busy', note: 'Panels competed for attention before users even started working' },
                { label: 'Wrong groupings', note: 'Account search next to alerts next to order details — no clear hierarchy' },
                { label: 'The list is the thing', note: 'Users needed to work through the list — not reorganize around it' },
              ].map(({ label, note }) => (
                <div key={label} style={{
                  background: 'rgba(255,255,255,0.6)',
                  borderRadius: 'var(--r-2)',
                  padding: '16px 20px',
                  flex: '1 1 200px',
                }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--slate-deep)', marginBottom: 6 }}>{label}</div>
                  <div style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.5 }}>{note}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ borderLeft: '3px solid var(--clay)', paddingLeft: 28, margin: '0 0 8px' }}>
            <p style={{
              fontFamily: 'var(--f-serif)',
              fontStyle: 'italic',
              fontSize: 'clamp(20px, 2vw, 26px)',
              lineHeight: 1.4,
              color: 'var(--ink-2)',
              margin: '0 0 10px',
            }}>
              "It works like a Honda Accord. Not flashy, but reliable."
            </p>
            <span className="mono" style={{ fontSize: 11, color: 'var(--ink-mute)', letterSpacing: '0.1em' }}>
              — Senior Adviser, Custody Firm
            </span>
          </div>
          <p style={{ fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.6, maxWidth: '60ch', marginTop: 12 }}>
            Reliability isn't a preference — it's a hard requirement. Downtime isn't
            inconvenience; it's a missed execution window.
          </p>
        </section>

        {/* ── DESIGN PRINCIPLES ── */}
        <section className="page-section">
          <div className="eyebrow-line">
            <span className="eyebrow">Design Principles</span>
            <span className="rule" />
          </div>
          <h2 className="section-title">Rules for every decision.</h2>
          <p className="section-lede">
            Research and concept feedback shaped a clear set of guiding principles.
            Every feature, every tradeoff, every "not yet" came back to these.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
            {PRINCIPLES.map(({ num, title, body }) => (
              <div key={num} style={{
                background: 'var(--surface)',
                border: '1px solid var(--hairline)',
                borderRadius: 'var(--r-3)',
                padding: '24px 20px',
              }}>
                <div className="mono" style={{ fontSize: 11, color: 'var(--clay)', letterSpacing: '0.14em', marginBottom: 12 }}>{num}</div>
                <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--ink)', marginBottom: 8, lineHeight: 1.3 }}>{title}</div>
                <p style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.5, margin: 0 }}>{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── WHAT SHIPPED ── */}
        <section className="page-section">
          <div className="eyebrow-line">
            <span className="eyebrow">What Shipped</span>
            <span className="rule" />
          </div>
          <h2 className="section-title">A surface built to protect the list.</h2>
          <p className="section-lede">
            Every decision came back to the Honda Accord test: does this help the
            fundamental capabilities run more reliably, or does it add another thing
            that can break?
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>
            <div>
              <div className="mono" style={{ fontSize: 11, color: 'var(--clay)', letterSpacing: '0.14em', marginBottom: 20 }}>Shipped in V1</div>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {SHIPPED.map((item) => (
                  <li key={item} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: 15, color: 'var(--ink-2)', lineHeight: 1.5 }}>
                    <span style={{ color: 'var(--clay)', fontWeight: 700, marginTop: 1, flexShrink: 0 }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="mono" style={{ fontSize: 11, color: 'var(--ink-mute)', letterSpacing: '0.14em', marginBottom: 20 }}>Deferred to roadmap</div>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  'Proactive alerting system',
                  'Live quotes and security logos per row',
                  'Account-level data for every trade',
                  'Saved views with backend persistence',
                  'Deeper cross-linking between workflow steps',
                ].map((item) => (
                  <li key={item} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: 15, color: 'var(--ink-mute)', lineHeight: 1.5 }}>
                    <span style={{ flexShrink: 0 }}>–</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── OUTCOME ── */}
        <section className="page-section">
          <div className="eyebrow-line">
            <span className="eyebrow">Outcome</span>
            <span className="rule" />
          </div>
          <h2 className="section-title">What it changed for users.</h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, marginBottom: 48 }}>
            <div>
              <div className="mono" style={{ fontSize: 11, color: 'var(--clay)', letterSpacing: '0.14em', marginBottom: 20 }}>User impact</div>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
                {OUTCOMES.map((item) => (
                  <li key={item} style={{ fontSize: 15, color: 'var(--ink-2)', lineHeight: 1.55, paddingBottom: 14, borderBottom: '1px solid var(--hairline)' }}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="mono" style={{ fontSize: 11, color: 'var(--clay)', letterSpacing: '0.14em', marginBottom: 20 }}>Broader impact</div>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
                {IMPACT.map((item) => (
                  <li key={item} style={{ fontSize: 15, color: 'var(--ink-2)', lineHeight: 1.55, paddingBottom: 14, borderBottom: '1px solid var(--hairline)' }}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div style={{
            background: 'var(--surface-2)',
            border: '1px solid var(--hairline)',
            borderRadius: 'var(--r-3)',
            padding: 36,
          }}>
            <div className="mono" style={{ fontSize: 11, color: 'var(--ink-mute)', letterSpacing: '0.14em', marginBottom: 20 }}>Pilot feedback — what we learned after launch</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {PILOT.map(({ finding, detail }) => (
                <div key={finding} style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 20, alignItems: 'start' }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--ink)' }}>{finding}</div>
                  <div style={{ fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.6 }}>{detail}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BACK NAV ── */}
        <div style={{ padding: '48px 0 96px', borderTop: '1px solid var(--hairline)', marginTop: 48, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" className="btn btn--secondary">← All work</Link>
          <Link to="/case-study/rules" className="btn">Next case study →</Link>
        </div>

      </main>

      <footer className="site-foot">
        <div className="inner">
          <span className="left">kristin<span style={{ opacity: 0.6 }}>.garza</span> · UX Designer</span>
          <span className="right">
            <a href="https://www.linkedin.com/in/kristin-garza" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="mailto:kmkerney221@gmail.com">Email</a>
            <a href="/resume.pdf" target="_blank" rel="noreferrer">Resume</a>
          </span>
        </div>
      </footer>
    </div>
  )
}
