import Nav from '../components/Nav.jsx'
import './case-study-shared.css'
import './Shortlist.css'

/* Centered content container — matches the other case studies. */
const wrap = { maxWidth: 'var(--content-width)', width: '100%', margin: '0 auto', padding: '0 var(--side-padding)' }
const section = { background: 'transparent', padding: 'var(--section-padding) 0' }

/* What each saved item surfaces — the three details people lean on most. */
const surfaces = ['Who recommended it', 'Runtime', 'Genre']

export default function Shortlist() {
  return (
    <div className="cs-page shortlist-page">
      <Nav />

      {/* ── HERO ── */}
      <section style={{ ...section, paddingBottom: 0 }}>
        <div style={wrap}>
          <div style={{ marginBottom: 24 }}>
            <span className="eyebrow">Just For Fun · Mobile + Smart TV</span>
          </div>
          <h1 style={{ fontFamily: 'var(--f-serif)', fontWeight: 300, fontSize: 'clamp(36px, 5vw, 64px)', letterSpacing: '-0.01em', lineHeight: 1.1, color: 'var(--ink)', margin: '0 0 22px' }}>
            Shortlist
          </h1>
          <p className="sl-lede">
            A mobile + Smart TV pair that answers “What should we watch tonight?” with a
            small, intentional list of saves.
          </p>
        </div>
      </section>

      {/* ── HERO MEDIA: annotated composition ──
           Phone + TV loops with handwritten (Permanent Marker) annotations and
           the two hand-drawn arrows. Arrow + caption positions are driven by
           the --a1-* / --a2-* and grid placements in Shortlist.css so they can
           be nudged without touching markup. Arrows are decorative (aria-hidden);
           the captions carry the narrative copy. */}
      <section style={{ ...section, paddingTop: 'clamp(28px, 4vw, 48px)' }}>
        <div style={wrap}>
          <div className="sl-annotated">
            {/* Caption 1 + arrow 1 as one group, so its top can align with
                the phone's top. */}
            <div className="sl-anno-left">
              <p className="sl-note sl-note-1">
                Quickly capture TV and movie recs in the moment in Shortlist
              </p>
              <img className="sl-arrow sl-arrow-1" src="/shortlist/arrow-1.svg" alt="" aria-hidden="true" />
            </div>

            {/* Phone loop */}
            <figure className="sl-media-item sl-show-mobile sl-anno-phone">
              <div className="sl-frame sl-frame-mobile">
                <video
                  className="sl-frame-media"
                  src="/shortlist/shortlist-demo-new.mp4"
                  autoPlay loop muted playsInline
                  aria-label="Mobile prototype demo loop"
                />
              </div>
            </figure>

            {/* Caption 2 + arrow 2 — one line, arrow top-aligned to the
                text's top-right, flowing down to the TV. */}
            <div className="sl-anno-mid">
              <p className="sl-note sl-note-2">
                Then view your Shortlist on mobile or TV
              </p>
              <img className="sl-arrow sl-arrow-2" src="/shortlist/arrow-2.svg" alt="" aria-hidden="true" />
            </div>

            {/* TV loop */}
            <figure className="sl-media-item sl-show-tv sl-anno-tv">
              <div className="sl-frame sl-frame-tv">
                <video
                  className="sl-frame-media"
                  src="/shortlist/shortlist-tv-demo.mp4"
                  autoPlay loop muted playsInline
                  aria-label="Smart TV prototype demo loop"
                />
              </div>
            </figure>

            {/* Caption 3 — closing statement with arrow 3 to its left. */}
            <div className="sl-anno-bot">
              <img className="sl-arrow sl-arrow-3" src="/shortlist/arrow-3.svg" alt="" aria-hidden="true" />
              <p className="sl-note sl-note-3">
                No walls of tiles, just your Shortlist for an effortless decision
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY + KEY INSIGHT ── */}
      <section style={section}>
        <div style={wrap}>
          <div className="section-spread" style={{ marginBottom: 14 }}><span className="eyebrow">Context</span><span className="rule"></span></div>
          <h2 className="cs-h2">Why I built it</h2>
          <p className="cs-body">
            I wanted to explore devices and contexts that I don’t typically design for, practice
            prototyping in code, and solve a real annoyance in my own weeknight viewing.
          </p>
          <div className="sl-insight-card">
            <p className="sl-insight-label">What I learned from user research</p>
            <p className="sl-insight-quote">
              People don’t need more options; they need a smaller list of things they already
              trust — and a faster way to decide.
            </p>
          </div>
        </div>
      </section>

      {/* ── DESIGN MOVE + WHAT EACH ITEM SURFACES ── */}
      <section style={{ ...section, paddingTop: 0 }}>
        <div style={wrap}>
          <div className="section-spread" style={{ marginBottom: 14 }}><span className="eyebrow">Approach</span><span className="rule"></span></div>
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
          <div className="section-spread" style={{ marginBottom: 14 }}><span className="eyebrow">Structure</span><span className="rule"></span></div>
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
          <div className="section-spread" style={{ marginBottom: 14 }}><span className="eyebrow">Craft</span><span className="rule"></span></div>
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

      <nav className="cs-case-nav" aria-label="Bits navigation">
        <a href="/illustrations" className="cs-case-nav-item cs-case-nav-item--next" style={{ marginLeft: 'auto' }}>
          <span className="cs-case-nav-dir">Next →</span>
          <span className="cs-case-nav-title">Line Art & Characters</span>
        </a>
      </nav>

      <footer className="site-foot" id="contact" style={{ marginTop: 0 }}>
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
