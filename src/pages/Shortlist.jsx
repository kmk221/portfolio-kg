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
            I wanted to explore devices and contexts I don’t usually design for, practice
            prototyping directly in code, and solve a small but real annoyance in my own weeknight
            viewing — the time and effort it takes to decide what to watch next.
          </p>
          <div className="sl-insight-card">
            <div className="sl-insight-callout">
              <p className="cs-body">
                <strong>What I learned from user research</strong> — People don’t need more
                options; they need a smaller list of things they already trust, and a faster
                way to decide. They also need one place to save and easily reference all the
                recommendations they’ve heard.
              </p>
            </div>
            <figure className="sl-sketch">
              <img
                src="/shortlist/shortlist-illustration.png"
                alt="Storyboard from endless scrolling to a trusted shortlist: a viewer overwhelmed by an endless wall of TV tiles, trying to remember a friend's recommendation, beside a calmer personal Shortlist on the TV."
              />
            </figure>
          </div>
        </div>
      </section>

      {/* ── DESIGN MOVE + WHAT EACH ITEM SURFACES ── */}
      <section style={{ ...section, paddingTop: 0 }}>
        <div style={wrap}>
          <div className="section-spread" style={{ marginBottom: 14 }}><span className="eyebrow">Approach</span><span className="rule"></span></div>
          <h2 className="cs-h2">The design move</h2>
          <p className="cs-body">
            Most streaming interfaces drown you in a sea of tiles and never-ending horizontal
            carousels — endless scrolling that makes deciding harder, not easier. Shortlist
            deliberately moves the other way: the TV shows your whole short list on the left and
            one “tonight’s pick” expanded on the right. A tiny, intentional list — not an infinite
            grid — becomes the main affordance for low-effort choosing.
          </p>
          <p className="cs-body" style={{ marginTop: 18 }}>
            Each saved item surfaces three details people said they rely on most:
          </p>
          <ul className="sl-surfaces">
            {surfaces.map((s) => <li key={s} className="chip chip--neutral">{s}</li>)}
          </ul>
        </div>
      </section>

      {/* ── PLATFORMS & FLOW ── */}
      <section style={{ ...section, paddingTop: 0 }}>
        <div style={wrap}>
          <div className="section-spread" style={{ marginBottom: 14 }}><span className="eyebrow">Structure</span><span className="rule"></span></div>
          <h2 className="cs-h2">Platforms &amp; flow</h2>
          <p className="cs-body sl-tl-intro">
            Designed around two different moments: saving a recommendation when it comes up,
            then returning later when it’s actually time to watch.
          </p>
          <div className="sl-timeline">
            <div className="sl-tl-step">
              <div className="sl-tl-rail">
                <span className="sl-tl-dot" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="7" y="2" width="10" height="20" rx="2.5" />
                    <line x1="10.5" y1="18.5" x2="13.5" y2="18.5" />
                  </svg>
                </span>
              </div>
              <div className="sl-tl-card">
                <p className="sl-tl-label"><span className="sl-tl-when">Friday Night</span> @ Happy Hour</p>
                <p className="sl-tl-body">When someone mentions a show, the phone is the quickest place to save it — plus who recommended it and why.</p>
                <figure className="sl-platform-media" style={{ aspectRatio: '972 / 595' }}>
                  <img src="/shortlist/platform-mobile.svg" alt="Two friends talking — one says they're binging Severance, the other saves the rec on their phone." />
                </figure>
              </div>
            </div>

            <div className="sl-tl-step">
              <div className="sl-tl-rail">
                <span className="sl-tl-dot" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="13" rx="2" />
                    <path d="M8 21h8" />
                    <path d="M12 17v4" />
                  </svg>
                </span>
              </div>
              <div className="sl-tl-card">
                <p className="sl-tl-label"><span className="sl-tl-when">Sunday Night</span> @ the Couch</p>
                <p className="sl-tl-body">Later, on the couch, the TV experience brings that refined list back with the details users need to make a quick easy decision: recommender, runtime, and genre.</p>
                <figure className="sl-platform-media" style={{ aspectRatio: '1070 / 508' }}>
                  <img src="/shortlist/platform-tv.svg" alt="Someone on the couch with a remote, browsing their personal Shortlist on a Smart TV." />
                </figure>
              </div>
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

          {/* One design system, two themed variants — shared foundation up top,
              the light/dark palettes + a shared component rendered in each below. */}
          <div className="sl-ds">
            <div className="sl-ds-shared">
              <span className="sl-ds-cap">One shared foundation</span>
              <div className="sl-ds-shared-grid">
                <div className="sl-ds-found">
                  <span className="sl-ds-sw" style={{ background: '#E07840' }} />
                  <span className="sl-ds-found-label">Brand accent<br /><b>#E07840</b></span>
                </div>
                <div className="sl-ds-found">
                  <span className="sl-ds-dots">
                    {['#b05828', '#4d7a3c', '#5a4a80', '#4f6a72', '#8a4530'].map((c) => (
                      <i key={c} style={{ background: c }} />
                    ))}
                  </span>
                  <span className="sl-ds-found-label">Recommender<br /><b>avatars</b></span>
                </div>
                <div className="sl-ds-found">
                  <span className="sl-ds-type">Aa</span>
                  <span className="sl-ds-found-label">Type<br /><b>Bitter · DM Sans</b></span>
                </div>
                <div className="sl-ds-found">
                  <span className="sl-ds-logo-icon" role="img" aria-label="Shortlist logo" />
                  <span className="sl-ds-found-label">Logo<br /><b>Shortlist</b></span>
                </div>
              </div>
            </div>

            <div className="sl-ds-variants">
              <article className="sl-ds-variant sl-ds-variant--light">
                <span className="sl-ds-cap">Mobile · Light</span>
                <div className="sl-ds-swatches">
                  {[['Background', '#F3F0E9'], ['Surface', '#FBF9F5'], ['Text', '#2A221A'], ['Accent', '#E07840']].map(([role, hex]) => (
                    <div className="sl-ds-swatch" key={role}>
                      <span className="sl-ds-sw" style={{ background: hex }} />
                      <span className="sl-ds-swatch-role">{role}</span>
                      <span className="sl-ds-swatch-hex">{hex}</span>
                    </div>
                  ))}
                </div>
                <div className="sl-ds-demo" style={{ background: '#FBF9F5', borderColor: 'rgba(42,34,26,0.12)' }}>
                  <span className="sl-ds-demo-av" style={{ background: '#5a4a80' }}>TW</span>
                  <span className="sl-ds-demo-title" style={{ color: '#1c140d' }}>Severance</span>
                  <span className="sl-ds-demo-btn">Save</span>
                </div>
              </article>

              <article className="sl-ds-variant sl-ds-variant--dark">
                <span className="sl-ds-cap">Smart TV · Dark</span>
                <div className="sl-ds-swatches">
                  {[['Background', '#080604'], ['Surface', '#1C1814'], ['Text', '#F0EBE2'], ['Accent', '#E07840']].map(([role, hex]) => (
                    <div className="sl-ds-swatch" key={role}>
                      <span className="sl-ds-sw" style={{ background: hex }} />
                      <span className="sl-ds-swatch-role">{role}</span>
                      <span className="sl-ds-swatch-hex">{hex}</span>
                    </div>
                  ))}
                </div>
                <div className="sl-ds-demo sl-ds-demo--rail" style={{ background: '#1C1814', borderColor: 'rgba(255,255,255,0.10)' }}>
                  <span className="sl-ds-demo-av" style={{ background: '#5a4a80' }}>TW</span>
                  <span className="sl-ds-demo-title" style={{ color: '#f0ebe2' }}>Severance</span>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* ── LIVE PROTOTYPES ── */}
      <section style={{ ...section, paddingTop: 0 }}>
        <div style={wrap}>
          <div className="section-spread" style={{ marginBottom: 14 }}><span className="eyebrow">Prototypes</span><span className="rule"></span></div>
          <h2 className="cs-h2">Try it yourself</h2>
          <div className="sl-links">
            <a href="/shortlist/shortlist-mobile-app-v1.html" target="_blank" rel="noreferrer">Mobile prototype ↗</a>
            <a href="/shortlist/shortlist-tv-concept-a-v2.html" target="_blank" rel="noreferrer">TV prototype ↗</a>
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
