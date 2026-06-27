import { Link } from 'react-router-dom'
import Nav from '../components/Nav.jsx'

export default function Bits() {
  return (
    <div>
      <Nav />
      <main className="page">

        {/* ── HERO ── */}
        <section className="page-section" style={{ paddingTop: 80 }}>
          <h1 style={{
            fontFamily: 'var(--f-slab)',
            fontSize: 'clamp(42px, 6vw, 72px)',
            fontWeight: 400,
            lineHeight: 1.08,
            letterSpacing: '-0.01em',
            color: 'var(--ink)',
            margin: '0 0 64px',
          }}>
            Bits &amp; Pieces.
          </h1>

          {/* ── CONTENT THAT SHAPES MY THINKING ── */}
          <div className="section-spread" style={{ marginBottom: 32 }}>
            <span className="eyebrow" style={{ color: 'var(--ink-mute)' }}>Content That Shapes My Thinking</span>
            <span className="rule" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, marginBottom: 80 }}>

            {/* AI × Design  -  large feature tile */}
            <Link
              to="/ai-design"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                minHeight: 280,
                padding: '32px 36px',
                background: 'var(--ochre)',
                borderRadius: 'var(--r-3)',
                textDecoration: 'none',
                color: 'inherit',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 180ms ease, box-shadow 180ms ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(55,43,11,0.18)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
            >

              <div style={{ position: 'relative', zIndex: 1 }}>
                <h2 style={{
                  fontFamily: 'var(--f-serif)',
                  fontSize: 'clamp(28px, 4vw, 40px)',
                  fontWeight: 300,
                  color: 'rgba(245,232,211,0.96)',
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  margin: '0 0 20px',
                }}>
                  AI × Design.
                </h2>
                <p style={{
                  fontFamily: 'var(--f-sans)',
                  fontSize: 14, lineHeight: 1.65,
                  color: 'rgba(245,232,211,0.75)',
                  maxWidth: '46ch',
                  margin: '0 0 24px',
                }}>
                  A running collection of ideas, talks, and articles shaping how I think about design in the age of AI  -  plus my own take on what's changing and where the real value lives.
                </p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {['AI & Craft', 'Design Process', 'Tools & Workflow'].map(tag => (
                    <span key={tag} style={{
                      fontFamily: 'var(--f-sans)',
                      fontSize: 11, fontWeight: 600,
                      padding: '6px 14px',
                      borderRadius: 'var(--r-pill)',
                      background: 'rgba(245,232,211,0.12)',
                      color: 'rgba(245,232,211,0.85)',
                      border: '1px solid rgba(245,232,211,0.22)',
                    }}>{tag}</span>
                  ))}
                </div>
              </div>
            </Link>

          </div>

          {/* ── JUST FOR FUN ── */}
          <div className="section-spread" style={{ marginBottom: 16 }}>
            <span className="eyebrow" style={{ color: 'var(--ink-mute)' }}>Just for Fun</span>
            <span className="rule" />
          </div>
          <p style={{ fontFamily: 'var(--f-sans)', fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.65, maxWidth: '56ch', margin: '0 0 32px' }}>
            Passion projects, creative experiments, and things I build when I'm not solving enterprise problems  -  because design should be fun too.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 80 }}>

            {/* Line Illustration Work */}
            <Link
              to="/illustrations"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                minHeight: 280,
                padding: '32px 36px',
                background: 'var(--clay-tint)',
                borderRadius: 'var(--r-3)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 180ms ease, box-shadow 180ms ease',
                textDecoration: 'none',
                color: 'inherit',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(55,43,11,0.12)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
            >
              {/* Decorative SVG  -  upper area */}
              <div aria-hidden="true" style={{ position: 'absolute', top: 32, left: 36, right: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.55 }}>
                <svg viewBox="0 0 400 120" width="100%" height="120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 90 Q80 20 160 60 Q240 100 320 30 Q370 5 395 40" stroke="var(--clay)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                  <path d="M40 70 Q110 110 200 50 Q280 0 360 60" stroke="var(--clay)" strokeWidth="1" strokeLinecap="round" strokeDasharray="5 8" fill="none" opacity="0.5" />
                  <circle cx="160" cy="60" r="6" stroke="var(--clay)" strokeWidth="1.5" fill="none" />
                  <circle cx="320" cy="30" r="4" stroke="var(--clay)" strokeWidth="1" fill="none" opacity="0.6" />
                  <circle cx="80" cy="55" r="3" stroke="var(--clay)" strokeWidth="1" fill="none" opacity="0.4" />
                </svg>
              </div>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <p style={{ fontFamily: 'var(--f-mono)', fontSize: 10, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--clay-ink)', margin: '0 0 14px', opacity: 0.7 }}>Illustration</p>
                <h3 style={{ fontFamily: 'var(--f-serif)', fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 300, lineHeight: 1.15, letterSpacing: '-0.018em', color: 'var(--ink)', margin: '0 0 14px' }}>Line Art & Characters.</h3>
                <p style={{ fontFamily: 'var(--f-sans)', fontSize: 14, lineHeight: 1.65, color: 'var(--ink-2)', maxWidth: '46ch', margin: '0 0 20px' }}>A collection of line illustrations, character designs, and custom graphics  -  my creative outlet when I'm not designing products. Minimal strokes, playful compositions.</p>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'var(--f-mono)', fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--clay-ink)', opacity: 0.6 }}>Explore →</span>
              </div>
            </Link>

            {/* Vibe-Coded Experiments — Shortlist */}
            <Link
              to="/bits/shortlist"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                minHeight: 280,
                padding: '32px 36px',
                background: 'var(--ochre-deep)',
                borderRadius: 'var(--r-3)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 180ms ease, box-shadow 180ms ease',
                textDecoration: 'none',
                color: 'inherit',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(55,43,11,0.18)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
            >
              {/* Decorative code symbol  -  upper area */}
              <div aria-hidden="true" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -70%)', fontFamily: 'var(--f-mono)', fontSize: 'clamp(64px, 8vw, 100px)', fontWeight: 300, color: 'rgba(245,232,211,0.12)', lineHeight: 1, whiteSpace: 'nowrap', userSelect: 'none' }}>
                &lt;/&gt;
              </div>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <p style={{ fontFamily: 'var(--f-mono)', fontSize: 10, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(245,232,211,0.6)', margin: '0 0 14px' }}>Passion Project · Mobile + TV</p>
                <h3 style={{ fontFamily: 'var(--f-serif)', fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 300, lineHeight: 1.15, letterSpacing: '-0.018em', color: 'rgba(245,232,211,0.96)', margin: '0 0 14px' }}>Shortlist.</h3>
                <p style={{ fontFamily: 'var(--f-sans)', fontSize: 14, lineHeight: 1.65, color: 'rgba(245,232,211,0.72)', maxWidth: '46ch', margin: '0 0 20px' }}>A mobile + Smart TV app for “what do we watch tonight?”  -  taken from research to a coded hi-fi prototype. My window into mobile and multi-device design.</p>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'var(--f-mono)', fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(245,232,211,0.5)' }}>Read the mini case study →</span>
              </div>
            </Link>

          </div>

          {/* ── SMALLER WINS ── (removed for now) ── */}
          {false && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, marginBottom: 80 }}>

            {/* Tile 1  -  Quote Component */}
            <div style={{
              background: 'var(--surface)',
              border: '1px solid var(--hairline)',
              borderRadius: 'var(--r-3)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}>
              {/* Preview */}
              <div style={{
                position: 'relative',
                background: '#1A1F2E',
                padding: '28px 24px 20px',
                minHeight: 180,
                display: 'flex',
                flexDirection: 'column',
                gap: 0,
              }}>
                <span style={{
                  position: 'absolute', top: 12, right: 14,
                  fontFamily: 'var(--f-mono)', fontSize: 10, fontWeight: 600,
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: 'rgba(245,232,211,0.5)',
                }}>Coming Soon</span>

                {/* Mock quote widget */}
                <div style={{
                  background: '#242B3D', borderRadius: 8,
                  border: '1px solid rgba(255,255,255,0.08)',
                  padding: '14px 16px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: '50%',
                      background: 'var(--clay)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'var(--f-mono)', fontSize: 11, fontWeight: 700, color: 'var(--bg)',
                    }}>B</div>
                    <div>
                      <div style={{ fontFamily: 'var(--f-mono)', fontSize: 12, fontWeight: 600, color: '#E8E0D0' }}>BRK-A</div>
                      <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, color: 'rgba(232,224,208,0.5)' }}>Berkshire Hathaway</div>
                    </div>
                    <span style={{ marginLeft: 'auto', fontFamily: 'var(--f-mono)', fontSize: 11, color: 'rgba(232,224,208,0.35)' }}>···</span>
                  </div>
                  {[
                    { label: 'Last',   val: '$735,920.00', color: '#E8E0D0' },
                    { label: 'Change', val: '−$4,700 (0.64%)', color: '#8FA5BF' },
                    { label: 'Volume', val: '388', color: '#E8E0D0' },
                  ].map(row => (
                    <div key={row.label} style={{
                      display: 'flex', justifyContent: 'space-between',
                      fontFamily: 'var(--f-mono)', fontSize: 11,
                      color: 'rgba(232,224,208,0.55)',
                      padding: '5px 0',
                      borderTop: '1px solid rgba(255,255,255,0.05)',
                    }}>
                      <span>{row.label}</span>
                      <span style={{ color: row.color }}>{row.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Copy */}
              <div style={{ padding: '24px 24px 28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <p style={{
                  fontFamily: 'var(--f-mono)', fontSize: 10, fontWeight: 600,
                  letterSpacing: '0.16em', textTransform: 'uppercase',
                  color: 'var(--clay)', marginBottom: 10,
                }}>Design System</p>
                <h3 style={{
                  fontFamily: 'var(--f-serif)', fontSize: 22, fontWeight: 400,
                  lineHeight: 1.2, letterSpacing: '-0.012em',
                  color: 'var(--ink)', margin: '0 0 12px',
                }}>Building a Reusable Quote Component</h3>
                <p style={{
                  fontFamily: 'var(--f-sans)', fontSize: 14, lineHeight: 1.6,
                  color: 'var(--ink-3)', margin: 0,
                }}>
                  Designed and documented a unified market quote component adopted across 4 trading surfaces  -  replacing fragmented one-offs with a consistent, scalable pattern.
                </p>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  fontFamily: 'var(--f-mono)', fontSize: 10, fontWeight: 600,
                  letterSpacing: '0.14em', textTransform: 'uppercase',
                  color: 'var(--ink-mute)', marginTop: 20,
                }}>Coming soon</span>
              </div>
            </div>

            {/* Tile 2  -  Kill a Feature */}
            <div style={{
              background: 'var(--surface)',
              border: '1px solid var(--hairline)',
              borderRadius: 'var(--r-3)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}>
              {/* Preview */}
              <div style={{
                position: 'relative',
                background: 'var(--slate-tint)',
                padding: '28px 24px 20px',
                minHeight: 180,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
              }}>
                <span style={{
                  position: 'absolute', top: 12, right: 14,
                  fontFamily: 'var(--f-mono)', fontSize: 10, fontWeight: 600,
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: 'var(--slate-deep)',
                }}>Coming Soon</span>

                {/* PM Proposal card */}
                <div style={{
                  background: 'var(--surface)', borderRadius: 8,
                  border: '1px solid var(--hairline)',
                  padding: '14px 18px', textAlign: 'center', flex: 1,
                  boxShadow: '0 2px 8px rgba(55,43,11,0.06)',
                }}>
                  <p style={{ fontFamily: 'var(--f-mono)', fontSize: 9, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-mute)', marginBottom: 12 }}>PM Proposal</p>
                  <span style={{ fontSize: 24, color: '#C04040' }}>✕</span>
                  <p style={{ fontFamily: 'var(--f-sans)', fontSize: 11, color: 'var(--ink-3)', marginTop: 10 }}>Low user value</p>
                </div>

                {/* Counter-proposal card */}
                <div style={{
                  background: 'var(--ochre-tint)', borderRadius: 8,
                  border: '1px solid var(--ochre-edge)',
                  padding: '14px 18px', textAlign: 'center', flex: 1,
                  boxShadow: '0 2px 8px rgba(55,43,11,0.06)',
                }}>
                  <p style={{ fontFamily: 'var(--f-mono)', fontSize: 9, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ochre-ink)', marginBottom: 12 }}>Counter-Proposal</p>
                  <span style={{ fontSize: 24, color: 'var(--ochre-ink)' }}>✓</span>
                  <p style={{ fontFamily: 'var(--f-sans)', fontSize: 11, color: 'var(--ink-3)', marginTop: 10 }}>Research-backed</p>
                </div>
              </div>

              {/* Copy */}
              <div style={{ padding: '24px 24px 28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <p style={{
                  fontFamily: 'var(--f-mono)', fontSize: 10, fontWeight: 600,
                  letterSpacing: '0.16em', textTransform: 'uppercase',
                  color: 'var(--slate-deep)', marginBottom: 10,
                }}>Strategy · Trading Vision</p>
                <h3 style={{
                  fontFamily: 'var(--f-serif)', fontSize: 22, fontWeight: 400,
                  lineHeight: 1.2, letterSpacing: '-0.012em',
                  color: 'var(--ink)', margin: '0 0 12px',
                }}>Killing a Feature to Protect the Trader</h3>
                <p style={{
                  fontFamily: 'var(--f-sans)', fontSize: 14, lineHeight: 1.6,
                  color: 'var(--ink-3)', margin: 0,
                }}>
                  Used research and strategic vision work to push back on a PM-driven feature that would have added friction to critical trading workflows  -  and redirected effort toward what traders actually needed.
                </p>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  fontFamily: 'var(--f-mono)', fontSize: 10, fontWeight: 600,
                  letterSpacing: '0.14em', textTransform: 'uppercase',
                  color: 'var(--ink-mute)', marginTop: 20,
                }}>Coming soon</span>
              </div>
            </div>

          </div>
          )}

        </section>

      </main>

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
