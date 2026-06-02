import { Link } from 'react-router-dom'
import Nav from './components/Nav.jsx'

export default function Home() {
  return (
    <div>
      <Nav />

      <main className="page">

        {/* ── HERO ── */}
        <section className="page-hero">
          <div className="lockup">
            <span className="eyebrow with-rule eyebrow--hero">
              <span className="eyebrow-name" style={{ fontFamily: 'var(--f-script)', fontStyle: 'normal', fontSize: 16 }}>Kristin Garza</span>
              <span className="eyebrow-sep"> · </span>
              <span className="eyebrow-title">UX Designer · Product Thinker</span>
            </span>
            <h1 className="hero-headline">
              Taming complexity and making<br />
              hard tasks simple for&nbsp;<span style={{ fontFamily: 'var(--f-script)', fontStyle: 'normal', letterSpacing: 1, color: 'var(--slate-deep)', display: 'inline-block', lineHeight: '1', verticalAlign: '0.05em' }}>humans</span><br />
              who depend on them.
            </h1>
            <div className="ctas">
              <a href="#work" className="btn btn--lg">View work ↓</a>
              <a href="mailto:kmkerney221@gmail.com" className="btn btn--secondary btn--lg">
                Get in touch
              </a>
            </div>
          </div>

          <div className="illus">
            <img src="/kristin-illustration.svg" alt="Kristin Garza illustration" />
          </div>

        </section>

        {/* ── ABOUT ── */}
        <section id="about" className="page-section page-section--secondary">
          <div style={{ paddingTop: 32 }}>
            <div className="section-spread" style={{ marginBottom: 16 }}>
              <span className="eyebrow">About</span>
              <span className="rule" />
            </div>
            <div className="skills-row" style={{ margin: '24px 0 28px' }}>
              <span className="chip chip--neutral">Product Strategy</span>
              <span className="chip chip--neutral">Platform Ecosystems</span>
              <span className="chip chip--neutral">Systems Thinking</span>
              <span className="chip chip--neutral">Enterprise UX</span>
              <span className="chip chip--neutral">AI-Augmented Design</span>
              <span className="chip chip--neutral">Design Systems</span>
            </div>
            <p style={{ fontSize: 15, color: 'var(--ink-3)', lineHeight: 1.65, maxWidth: '60ch', margin: '0 0 24px' }}>
              I'm a Lead UX Designer who thrives at the intersection of product strategy, systems thinking, and technical constraints — unwinding tangled workflows into experiences that feel effortless. I like to go deep on the complexity beneath the surface, understanding every constraint and dependency. Then I untangle it in a way the user never knows it existed. I bring stakeholder alignment and a deep commitment to user needs to every problem I take on, most recently unifying 15+ trading applications under a cohesive design system at a leading B2B financial services firm.
            </p>
            <Link to="/about" className="btn btn--secondary">
              More + resume →
            </Link>
          </div>
        </section>

        {/* ── SELECTED WORK ── */}
        <section id="work" className="page-section">
          <div className="section-spread">
            <span className="eyebrow">Selected Work</span>
            <span className="rule" />
          </div>
          <p style={{ fontSize: 15, color: 'var(--ink-3)', lineHeight: 1.65, maxWidth: '60ch', margin: '0 0 40px' }}>
            Three case studies designing high-stakes workflows for institutional investing professionals — where clarity, reliability, and precision aren't nice-to-haves.
          </p>

          <div className="work-grid">

            {/* Order Management — clay */}
            <Link to="/case-study/order-management" className="work-card clay">
              <div className="shot">
                <div className="preview-stub">
                  <div className="h">
                    <span>SAVED ORDERS</span>
                    <span style={{ color: 'var(--clay)' }}>●</span>
                  </div>
                  <div className="row">
                    <span>☑ AAPL</span>
                    <span className="num">5,000</span>
                  </div>
                  <div className="row">
                    <span>☑ MSFT</span>
                    <span className="num">2,200</span>
                  </div>
                  <div className="row">
                    <span>☐ GOOGL</span>
                    <span className="num">600</span>
                  </div>
                  <div className="row" style={{ borderBottom: 0, justifyContent: 'flex-end' }}>
                    <span className="acc">SEND →</span>
                  </div>
                </div>
              </div>
              <div className="body">
                <h3>Redesigning Order Management</h3>
                <p>The surface every trade at an advisory firm flows through — redesigned to enhance visibility, reduce errors, and remove the steps traders had quietly learned to skip.</p>
                <div className="cta"><span /><span className="arr" style={{ color: 'var(--clay-deep)' }}>→</span></div>
              </div>
            </Link>

            {/* Rule Engine — ochre */}
            <Link to="/case-study/rules" className="work-card ochre">
              <div className="shot">
                <div className="preview-stub">
                  <div className="h">
                    <span>REJECT HIGH-DOLLAR TSLA</span>
                    <span style={{ color: 'var(--clay)' }}>ACTIVE</span>
                  </div>
                  <div className="row">
                    <span>IF</span>
                    <span>Ticker is TSLA</span>
                  </div>
                  <div className="row">
                    <span>AND</span>
                    <span>Value &gt; $100,000</span>
                  </div>
                  <div className="row" style={{ borderBottom: 0 }}>
                    <span>THEN</span>
                    <span className="pos">Reject the order</span>
                  </div>
                </div>
              </div>
              <div className="body">
                <h3>Inside the Rule Engine</h3>
                <p>A conditional logic engine that automates which trades reach the market — redesigned to replace tribal knowledge with approachable, intuitive workflows compliance teams can move through confidently.</p>
                <div className="cta"><span /><span className="arr" style={{ color: 'var(--ochre-deep)' }}>→</span></div>
              </div>
            </Link>

            {/* Positions — slate/agave */}
            <Link to="/case-study/positions" className="work-card slate">
              <div className="shot">
                <div className="preview-stub">
                  <div className="h">
                    <span>POSITIONS</span>
                    <span>USD</span>
                  </div>
                  <div className="row">
                    <span>AAPL</span>
                    <span className="num">$21,340</span>
                    <span className="pos">+3.4%</span>
                  </div>
                  <div className="row">
                    <span>MSFT</span>
                    <span className="num">$22,130</span>
                    <span className="pos">+1.1%</span>
                  </div>
                  <div className="row" style={{ borderBottom: 0 }}>
                    <span>GOOGL</span>
                    <span className="num">$8,200</span>
                    <span className="neg">−0.6%</span>
                  </div>
                </div>
              </div>
              <div className="body">
                <h3>Simplifying Positions Info</h3>
                <p>Surfacing critical portfolio data next to trading workflows — eliminating context switching, reducing reliance on memorization, and scaling as a reusable platform-wide component.</p>
                <div className="cta"><span /><span className="arr" style={{ color: 'var(--slate-deep)' }}>→</span></div>
              </div>
            </Link>

          </div>
        </section>

        {/* ── BITS & PIECES ── */}
        <section id="bits" className="page-section page-section--secondary">
          <div style={{ paddingTop: 32 }}>
            <div className="section-spread" style={{ marginBottom: 16 }}>
              <span className="eyebrow">Bits &amp; Pieces</span>
              <span className="rule" />
            </div>
            <p style={{ fontSize: 15, color: 'var(--ink-3)', lineHeight: 1.65, maxWidth: '56ch', margin: '0 0 24px' }}>
              AI × Design ideas, smaller wins, design system contributions, strategic pushback, and for-fun projects — work that didn't need a full case study but still shaped how I think.
            </p>
            <Link to="/bits" className="btn btn--secondary">
              View Bits &amp; Pieces →
            </Link>
          </div>
        </section>

      </main>

      {/* ── FOOTER ── */}
      <footer className="site-foot" id="contact">
        <div className="inner">
          <span className="left">kristin<span style={{ opacity: 0.6 }}>.garza</span> · UX Designer</span>
          <span className="right">
            <a href="https://www.linkedin.com/in/kristin-garza" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="mailto:kmkerney221@gmail.com">Email</a>
            <a href="/KristinGarzaResume.pdf" target="_blank" rel="noreferrer">Resume</a>
          </span>
        </div>
      </footer>
    </div>
  )
}
