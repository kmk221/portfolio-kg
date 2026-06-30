import { useState } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav.jsx'
import './case-study-shared.css'
import './Shortlist.css'

/* Centered content container — matches the other case studies. */
const wrap = { maxWidth: 'var(--content-width)', width: '100%', margin: '0 auto', padding: '0 var(--side-padding)' }
const section = { background: 'transparent', padding: 'var(--section-padding) 0' }

/* What each saved item surfaces — the three details people lean on most. */
const surfaces = ['Who recommended it', 'Runtime', 'Genre']

export default function Shortlist() {
  const [view, setView] = useState('mobile')
  return (
    <div className="cs-page shortlist-page">
      <Nav />

      {/* ── HERO ── */}
      <section style={{ ...section, paddingBottom: 0 }}>
        <div style={wrap}>
          <Link to="/bits" className="sl-back">← Bits &amp; Pieces</Link>
          <div style={{ marginBottom: 24 }}>
            <span className="eyebrow">Self-initiated · Mobile + Smart TV</span>
          </div>
          <h1 style={{ fontFamily: 'var(--f-serif)', fontWeight: 300, fontSize: 'clamp(36px, 5vw, 64px)', letterSpacing: '-0.01em', lineHeight: 1.1, color: 'var(--ink)', margin: '0 0 22px' }}>
            Shortlist
          </h1>
          <p className="sl-lede">
            A mobile + Smart TV pair that answers “What should we watch tonight?” with a
            small, intentional list of saves.
          </p>
          <p className="cs-body" style={{ marginTop: 18 }}>
            Shortlist lets you capture TV recommendations on your phone in the moment, then open
            your TV to a focused list of only the things you actually added. No wall of tiles —
            just your saved picks, ready for a quick yes or no.
          </p>
        </div>
      </section>

      {/* ── MEDIA: looping demos (Mobile / Smart TV toggle) ──
           Each view is a muted, autoplaying loop in public/shortlist/.
           Swap a clip by changing the <video src>. */}
      <section style={{ ...section, paddingTop: 'clamp(40px, 6vw, 72px)' }}>
        <div style={wrap}>
          <p className="sl-frame-label">Prototype demos</p>
          <div className="sl-stage">
            <div className="sl-toggle" role="tablist" aria-label="Prototype demo">
              <button
                role="tab"
                aria-selected={view === 'mobile'}
                className={view === 'mobile' ? 'active' : ''}
                onClick={() => setView('mobile')}
              >
                Mobile
              </button>
              <button
                role="tab"
                aria-selected={view === 'tv'}
                className={view === 'tv' ? 'active' : ''}
                onClick={() => setView('tv')}
              >
                Smart TV
              </button>
            </div>

            {view === 'mobile' ? (
              <figure className="sl-media-item sl-show-mobile">
                <div className="sl-frame sl-frame-mobile">
                  <video
                    className="sl-frame-media"
                    src="/shortlist/shortlist-demo-new.mp4"
                    autoPlay loop muted playsInline
                    aria-label="Mobile prototype demo loop"
                  />
                </div>
                <figcaption className="sl-cap">Mobile · saving a rec in the moment.</figcaption>
              </figure>
            ) : (
              <figure className="sl-media-item sl-show-tv">
                <div className="sl-frame sl-frame-tv">
                  <video
                    className="sl-frame-media"
                    src="/shortlist/shortlist-tv-demo.mp4"
                    autoPlay loop muted playsInline
                    aria-label="Smart TV prototype demo loop"
                  />
                </div>
                <figcaption className="sl-cap">Smart TV · browsing the short list and filtering by runtime.</figcaption>
              </figure>
            )}
          </div>
        </div>
      </section>

      {/* ── WHY + KEY INSIGHT ── */}
      <section style={section}>
        <div style={wrap}>
          <h2 className="cs-h2">Why I built it</h2>
          <p className="cs-body">
            I wanted to explore a mobile–TV pairing I don’t usually get to design for, prototype
            directly in code, and solve a real annoyance in my own weeknight viewing.
          </p>
          <p className="sl-insight">
            People don’t need more options; they need a smaller list of things they already
            trust — and a faster way to decide.
          </p>
        </div>
      </section>

      {/* ── DESIGN MOVE + WHAT EACH ITEM SURFACES ── */}
      <section style={{ ...section, paddingTop: 0 }}>
        <div style={wrap}>
          <h2 className="cs-h2">The design move</h2>
          <p className="cs-body">
            Instead of the usual hero-plus-carousels, the TV layout shows your whole short list on
            the left and one “tonight’s pick” expanded on the right. The constraint — a tiny,
            intentional list — becomes the main affordance for low-effort choosing.
          </p>
          <p className="cs-body" style={{ marginTop: 18 }}>
            Each saved item surfaces three details people said they rely on most when matching a
            pick to their mood and the time they have:
          </p>
          <ul className="sl-surfaces">
            {surfaces.map((s) => <li key={s}>{s}</li>)}
          </ul>
        </div>
      </section>

      {/* ── PLATFORMS & FLOW ── */}
      <section style={{ ...section, paddingTop: 0 }}>
        <div style={wrap}>
          <h2 className="cs-h2">Platforms &amp; flow</h2>
          <div className="sl-flow">
            <div className="sl-flow-item">
              <p className="k">Mobile</p>
              <p>Search, tap, and save a rec — plus who told you and why — in under 10 seconds.</p>
            </div>
            <div className="sl-flow-item">
              <p className="k">Smart TV</p>
              <p>Browse a short, personal list, filter by runtime, and hit play.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── VISUAL SYSTEM ── */}
      <section style={{ ...section, paddingTop: 0 }}>
        <div style={wrap}>
          <h2 className="cs-h2">Visual system</h2>
          <p className="cs-body">
            The mobile app uses a light, approachable theme to make building a list feel low-stakes
            and casual. The TV experience shifts to a dark, cinema-friendly palette for comfort and
            legibility on a large screen.
          </p>
        </div>
      </section>

      {/* ── FOOTNOTE + live prototypes ── */}
      <section style={{ ...section, paddingTop: 0 }}>
        <div style={wrap}>
          <p className="sl-footnote">
            A self-initiated project — built to explore designing across phone and TV, and
            prototyped directly in code.
          </p>
          <div className="sl-links">
            <a href="/shortlist/shortlist-mobile-app-v1.html" target="_blank" rel="noreferrer">Live mobile ↗</a>
            <a href="/shortlist/shortlist-tv-concept-a-v2.html" target="_blank" rel="noreferrer">Live TV ↗</a>
          </div>
        </div>
      </section>

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
