import { Link } from 'react-router-dom'
import Nav from './components/Nav.jsx'

export default function Home() {
  return (
    <div>
      <Nav />

      {/* ── HERO — full-bleed blue band ── */}
      <section className="page-hero">
        <div className="page-hero-inner">
          {/* headline + illustration are one vertically-centered unit */}
          <div className="hero-top">
            <h1 className="hero-headline">
              Design that feels simple, useful, and <span style={{ fontFamily: 'var(--f-script)', fontStyle: 'normal', letterSpacing: '-0.01em', color: 'var(--bg)', display: 'inline-block', lineHeight: '1', verticalAlign: '0.02em' }}>human</span><span style={{ color: 'var(--ochre)' }}>.</span>
            </h1>
            <div className="illus">
              <img src="/kristin-circle.svg" alt="Kristin Garza illustration" />
            </div>
          </div>

          <div className="ctas">
            <a href="#work" className="btn btn--lg">View work <span style={{ display: 'inline-block', transform: 'rotate(-90deg)', fontSize: '1.5em', lineHeight: 0, verticalAlign: '-0.08em' }}>←</span></a>
            <Link to="/about#contact" className="btn btn--secondary btn--lg">
              Get in touch
            </Link>
          </div>

          {/* Illustration shown below buttons on mobile only */}
          <div className="illus-mobile">
            <img src="/kristin-circle.svg" alt="Kristin Garza illustration" />
          </div>
        </div>
      </section>

      <main className="page">

        {/* ── ABOUT ── */}
        <section id="about" className="page-section page-section--secondary">
          <div style={{ paddingTop: 32 }}>
            <div className="section-spread" style={{ marginBottom: 24 }}>
              <span className="eyebrow">About</span>
              <span className="rule" />
            </div>
            <div className="home-about-layout">
              <div className="home-about-text">
                <p className="body" style={{ color: 'var(--ink-3)', margin: '0 0 var(--s-5)' }}>
                  I'm a senior UX designer who specializes in bringing clarity to complex systems and making products feel simple, useful, and human. I care about craft, warmth, and designing experiences that feel intuitive without losing depth. I'm drawn to designing for people and products that help make life a little better. My work is shaped by real needs and data, but also guided by instinct and bold choices that challenge what's expected and create moments of surprise and delight. My goal is to lower barriers, create momentum, and help people feel more capable, confident, and connected to what matters.
                </p>
                <Link to="/about" className="btn btn--secondary">
                  More + resume →
                </Link>
              </div>
              <div className="home-about-chips">
                <span className="chip chip--neutral">Product Design</span>
                <span className="chip chip--neutral">Systems Thinking</span>
                <span className="chip chip--neutral">Design Systems</span>
                <span className="chip chip--neutral">Human-Centered UX</span>
                <span className="chip chip--neutral">AI-Augmented Design</span>
                <span className="chip chip--neutral">Craft + Clarity</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── SELECTED WORK ── */}
        <section id="work" className="page-section">
          <div className="section-spread">
            <span className="eyebrow">Selected Work</span>
            <span className="rule" />
          </div>
          <p className="body" style={{ color: 'var(--ink-3)', maxWidth: '60ch', margin: '0 0 var(--s-7)' }}>
            Three case studies designing high-stakes workflows for institutional investing professionals  -  where clarity, reliability, and precision aren't nice-to-haves.
          </p>

          <div className="work-grid">

            {/* Order Management  -  clay */}
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
                <div className="cat">Order Management · Trading</div>
                <h3>Addition Through Subtraction</h3>
                <p>The core trading surface at an advisory firm—redesigned to make high-stakes work clearer, calmer, and harder to get wrong.</p>
                <div className="cta"><span /><span className="arr" style={{ color: 'var(--clay-ink)' }}>→</span></div>
              </div>
            </Link>

            {/* Rule Engine  -  ochre */}
            <Link to="/case-study/rules" className="work-card clay">
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
                <div className="cat">Compliance · Rules Engine</div>
                <h3>Inside the Rule Engine</h3>
                <p>A conditional logic engine that automates which trades reach the market  -  redesigned to replace tribal knowledge with approachable, intuitive workflows compliance teams can move through confidently.</p>
                <div className="cta"><span /><span className="arr" style={{ color: 'var(--clay-ink)' }}>→</span></div>
              </div>
            </Link>

            {/* Positions  -  slate/agave */}
            <Link to="/case-study/positions" className="work-card clay">
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
                <div className="cat">Trading Platform · Design Systems</div>
                <h3>Well-Positioned</h3>
                <p>Surfacing critical portfolio data next to trading workflows  -  eliminating context switching, reducing reliance on memorization, and scaling as a reusable platform-wide component.</p>
                <div className="cta"><span /><span className="arr" style={{ color: 'var(--clay-ink)' }}>→</span></div>
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
            <p className="body" style={{ color: 'var(--ink-3)', maxWidth: '56ch', margin: '0 0 var(--s-5)' }}>
              AI × Design ideas, smaller wins, design system contributions, strategic pushback, and for-fun projects  -  work that didn't need a full case study but still shaped how I think.
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
