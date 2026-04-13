import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Nav from './components/Nav.jsx'

function useScrollReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const container = ref.current
    if (!container) return
    const targets = container.querySelectorAll('[data-reveal]')
    if (!targets.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    )
    targets.forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [])
  return ref
}

export default function App() {
  const pageRef = useScrollReveal()

  return (
    <div ref={pageRef} style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <Nav />

      {/* Hero */}
      <section className="home-hero">
        <div className="hero-content">
          <div className="hero-text">
            <p className="hero-eyebrow">UX Designer · Product Thinker</p>
            <h1 className="hero-name">Kristin Garza<span>.</span></h1>
            <p className="hero-title">
              I design for clarity in complex systems — turning data-dense workflows into intuitive,
              high-impact experiences for enterprise users.
            </p>
            <div className="hero-actions">
              <a href="#work" className="btn-primary">
                View Work <span style={{ fontSize: 18, lineHeight: 1 }}>↓</span>
              </a>
              <a href="mailto:kmkerney221@gmail.com" className="btn-secondary">Get in Touch</a>
            </div>
          </div>
          <div className="hero-pills">
            {['Product Strategy', 'Platform Ecosystems', 'Systems Thinking', 'Enterprise UX', 'AI-Augmented Design'].map((skill, i) => (
              <span key={skill} className={`hero-pill ${i % 2 === 0 ? 'hero-pill--blue' : 'hero-pill--warm'}`}
                style={{ animation: `fadeUp 0.5s ease ${0.8 + i * 0.1}s both` }}
              >{skill}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Work */}
      <section className="work-section" id="work">
        <div className="section-label">Selected Work</div>

        {/* Order Management Case Study */}
        <Link to="/case-study/order-management" className="project-card" data-reveal>
          <div className="project-card-image" style={{
            background: 'linear-gradient(135deg, #3a3525 0%, #241D15 100%)',
            position: 'relative', overflow: 'hidden', minHeight: 400,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <div style={{ position: 'absolute', inset: 0,
              backgroundImage: 'radial-gradient(rgba(179,134,107,0.12) 1px, transparent 1px)',
              backgroundSize: '32px 32px' }} />
            <div style={{ position: 'relative', zIndex: 1, padding: 40, width: '100%' }}>
              <div style={{ background: 'rgba(243,241,238,0.05)', border: '1px solid rgba(179,134,107,0.25)',
                borderRadius: 8, padding: '16px 20px' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(179,134,107,0.7)', letterSpacing: 1,
                  textTransform: 'uppercase', marginBottom: 12 }}>
                  Order Queue
                </div>
                {[
                  { id: 'ORD-1042', sym: 'AAPL', qty: '5,000', status: 'Verified' },
                  { id: 'ORD-1043', sym: 'MSFT', qty: '2,200', status: 'Pending' },
                  { id: 'ORD-1044', sym: 'GOOGL', qty: '800', status: 'Verified' },
                ].map(row => (
                  <div key={row.id} style={{ display: 'grid',
                    gridTemplateColumns: '1.2fr 0.8fr 0.8fr 1fr',
                    padding: '8px 0', borderTop: '1px solid rgba(243,241,238,0.06)', alignItems: 'center' }}>
                    <span style={{ fontSize: 11, color: 'rgba(243,241,238,0.55)', fontFamily: 'monospace' }}>{row.id}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: 'rgba(243,241,238,0.9)' }}>{row.sym}</span>
                    <span style={{ fontSize: 12, color: 'rgba(243,241,238,0.6)' }}>{row.qty}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, textAlign: 'right',
                      color: row.status === 'Verified' ? 'rgba(140,137,88,0.95)' : 'rgba(179,134,107,0.85)' }}>
                      {row.status}
                    </span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                <div style={{ flex: 1, background: 'rgba(200,90,90,0.2)', border: '1px solid rgba(200,90,90,0.35)',
                  borderRadius: 6, padding: '8px 12px', fontSize: 11, fontWeight: 700, letterSpacing: 1,
                  textTransform: 'uppercase', color: 'rgba(243,241,238,0.6)', textAlign: 'center' }}>
                  Before: Blind Send
                </div>
                <div style={{ flex: 1, background: 'rgba(140,137,88,0.25)', border: '1px solid rgba(140,137,88,0.4)',
                  borderRadius: 6, padding: '8px 12px', fontSize: 11, fontWeight: 700, letterSpacing: 1,
                  textTransform: 'uppercase', color: 'rgba(243,241,238,0.7)', textAlign: 'center' }}>
                  After: Verified
                </div>
              </div>
            </div>
          </div>
          <div className="project-card-content">
            <div>
              <span className="project-tag">UX Case Study · Enterprise Trading</span>
              <h2 className="project-title">Redesigning Order Management for Enterprise Trading</h2>
              <p className="project-desc">
                A forced migration became a design opportunity — rebuilding the order management surface to reduce trade entry errors, surface verification, and protect the order list.
              </p>
              <div className="project-meta">
                <div className="project-meta-item">
                  <span className="project-meta-label">Role</span>
                  <span className="project-meta-value">Lead UX Designer</span>
                </div>
                <div className="project-meta-item">
                  <span className="project-meta-label">Platform</span>
                  <span className="project-meta-value">Enterprise Platform</span>
                </div>
                <div className="project-meta-item">
                  <span className="project-meta-label">Status</span>
                  <span className="project-meta-value">Shipped ✓</span>
                </div>
              </div>
            </div>
            <div className="project-arrow">Read Case Study →</div>
          </div>
        </Link>

        {/* Rules Case Study */}
        <Link to="/case-study/rules" className="project-card" data-reveal>
          <div className="project-card-image" style={{
            background: 'linear-gradient(135deg, #2d5c52 0%, #4a7c6f 100%)',
            position: 'relative', overflow: 'hidden', minHeight: 400,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <div style={{ position: 'absolute', inset: 0,
              backgroundImage: 'radial-gradient(rgba(246,251,222,0.08) 1px, transparent 1px)',
              backgroundSize: '32px 32px' }} />
            <div style={{ position: 'relative', zIndex: 1, padding: 40, width: '100%' }}>
              <div style={{ background: 'rgba(246,251,222,0.07)', border: '1px solid rgba(246,251,222,0.15)', borderRadius: 8, padding: '16px 20px' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(246,251,222,0.5)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>Rule Management</div>
                {[
                  { name: 'Crypto ETF Blacklist', status: 'Active' },
                  { name: 'Suitability Check — IRA', status: 'Active' },
                  { name: 'Foreign Equity Cap', status: 'Inactive' },
                ].map(row => (
                  <div key={row.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderTop: '1px solid rgba(246,251,222,0.06)' }}>
                    <span style={{ fontSize: 13, color: 'rgba(246,251,222,0.8)' }}>{row.name}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 10px', borderRadius: 20,
                      background: row.status === 'Active' ? 'rgba(74,190,155,0.2)' : 'rgba(255,255,255,0.08)',
                      color: row.status === 'Active' ? 'rgba(74,190,155,0.9)' : 'rgba(246,251,222,0.35)' }}>
                      {row.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="project-card-content">
            <div>
              <span className="project-tag">UX Case Study · Enterprise Fintech</span>
              <h2 className="project-title">Inside the Rule Engine — Compliance, Redesigned</h2>
              <p className="project-desc">
                From discovery to shipped product — redesigning rule management and creation for a complex compliance suite, replacing tribal knowledge with guided workflows.
              </p>
              <div className="project-meta">
                <div className="project-meta-item">
                  <span className="project-meta-label">Role</span>
                  <span className="project-meta-value">Lead UX Designer</span>
                </div>
                <div className="project-meta-item">
                  <span className="project-meta-label">Timeline</span>
                  <span className="project-meta-value">Q1–Q4 2025</span>
                </div>
                <div className="project-meta-item">
                  <span className="project-meta-label">Status</span>
                  <span className="project-meta-value">Shipped ✓</span>
                </div>
              </div>
            </div>
            <div className="project-arrow">Read Case Study →</div>
          </div>
        </Link>

        {/* Positions Case Study */}
        <Link to="/case-study/positions" className="project-card" data-reveal>
          <div className="project-card-image" style={{
            background: 'linear-gradient(135deg, #90a1b9 0%, #62748e 100%)',
            position: 'relative', overflow: 'hidden', minHeight: 400,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <div style={{ position: 'absolute', inset: 0,
              backgroundImage: 'radial-gradient(rgba(246,251,222,0.1) 1px, transparent 1px)',
              backgroundSize: '32px 32px' }} />
            <div style={{ position: 'relative', zIndex: 1, padding: 40, width: '100%' }}>
              <div style={{ background: 'rgba(246,251,222,0.07)', border: '1px solid rgba(246,251,222,0.15)',
                borderRadius: 8, padding: '16px 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(246,251,222,0.6)', letterSpacing: 1, textTransform: 'uppercase' }}>
                    Positions Panel
                  </span>
                  <div style={{ display: 'flex', gap: 4 }}>
                    {['AAPL','MSFT','GOOGL'].map(t => (
                      <span key={t} style={{ fontSize: 10, fontWeight: 700, color: 'rgba(246,251,222,0.5)',
                        background: 'rgba(246,251,222,0.07)', padding: '2px 6px', borderRadius: 4 }}>{t}</span>
                    ))}
                  </div>
                </div>
                {[
                  { ticker: 'AAPL', shares: '120 sh', value: '$21,240', change: '+2.4%', pos: true },
                  { ticker: 'MSFT', shares: '85 sh', value: '$32,130', change: '+1.1%', pos: true },
                  { ticker: 'GOOGL', shares: '40 sh', value: '$55,200', change: '-0.8%', pos: false },
                ].map(row => (
                  <div key={row.ticker} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr',
                    padding: '8px 0', borderTop: '1px solid rgba(246,251,222,0.06)', alignItems: 'center' }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: 'rgba(246,251,222,0.9)' }}>{row.ticker}</span>
                    <span style={{ fontSize: 12, color: 'rgba(246,251,222,0.5)' }}>{row.shares}</span>
                    <span style={{ fontSize: 12, color: 'rgba(246,251,222,0.7)' }}>{row.value}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, textAlign: 'right',
                      color: row.pos ? '#90d4a8' : '#e8857a' }}>{row.change}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                <div style={{ flex: 1, background: 'rgba(200,90,90,0.25)', border: '1px solid rgba(200,90,90,0.35)',
                  borderRadius: 6, padding: '8px 12px', fontSize: 11, fontWeight: 700, letterSpacing: 1,
                  textTransform: 'uppercase', color: 'rgba(246,251,222,0.6)', textAlign: 'center' }}>
                  Before: Hidden drawer
                </div>
                <div style={{ flex: 1, background: 'rgba(90,170,130,0.25)', border: '1px solid rgba(90,170,130,0.35)',
                  borderRadius: 6, padding: '8px 12px', fontSize: 11, fontWeight: 700, letterSpacing: 1,
                  textTransform: 'uppercase', color: 'rgba(246,251,222,0.6)', textAlign: 'center' }}>
                  After: Inline panel
                </div>
              </div>
            </div>
          </div>
          <div className="project-card-content">
            <div>
              <span className="project-tag">UX Case Study · Enterprise Fintech</span>
              <h2 className="project-title">Simplifying Positions Information in Trading Applications</h2>
              <p className="project-desc">
                Re-architected how portfolio positions data surfaces within institutional trading workflows —
                reducing context switching, improving scannability, and scaling the pattern platform-wide
                via a new design system component.
              </p>
              <div className="project-meta">
                <div className="project-meta-item">
                  <span className="project-meta-label">Role</span>
                  <span className="project-meta-value">Lead UX Designer</span>
                </div>
                <div className="project-meta-item">
                  <span className="project-meta-label">Timeline</span>
                  <span className="project-meta-value">8 weeks</span>
                </div>
                <div className="project-meta-item">
                  <span className="project-meta-label">Platform</span>
                  <span className="project-meta-value">Enterprise Platform</span>
                </div>
              </div>
            </div>
            <div className="project-arrow">Read Case Study →</div>
          </div>
        </Link>

      </section>

      {/* Sneak Peeks — Mini work carousel */}
      <section style={{
        padding: '80px clamp(40px, 6vw, 80px) 100px',
        background: 'var(--cream)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{
            display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
            marginBottom: 40,
          }}>
            <div>
              <div className="section-label" style={{ marginBottom: 8 }}>Bits & Pieces</div>
              <p style={{ fontSize: 15, color: 'var(--deep-blue)', opacity: 0.75, maxWidth: 480 }}>
                Smaller wins, design system contributions, and strategic work that didn't need a full case study — but still shaped real products.
              </p>
            </div>
          </div>

          <div style={{
            display: 'flex', gap: 24, overflowX: 'auto',
            paddingBottom: 8, scrollSnapType: 'x mandatory',
          }}>

            {/* Card: Reusable Quote Component */}
            <div style={{
              minWidth: 340, maxWidth: 340, scrollSnapAlign: 'start',
              background: '#FEFDFB', borderRadius: 14,
              border: '1px solid rgba(144,161,185,0.12)',
              overflow: 'hidden', transition: 'transform 0.25s ease, box-shadow 0.25s ease',
              cursor: 'default', position: 'relative',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(89,80,74,0.1)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <div style={{ position: 'absolute', top: 12, right: 12, zIndex: 2, fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--steel-blue)', background: 'rgba(144,161,185,0.12)', padding: '4px 10px', borderRadius: 20 }}>Coming soon</div>
              <div style={{
                height: 180, background: 'linear-gradient(135deg, #3a3525, #4a3d2d)',
                position: 'relative', overflow: 'hidden',
                display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
              }}>
                <div style={{ position: 'absolute', inset: 0,
                  backgroundImage: 'radial-gradient(rgba(179,134,107,0.1) 1px, transparent 1px)',
                  backgroundSize: '24px 24px' }} />
                <div style={{ position: 'relative', zIndex: 1, width: '100%' }}>
                  <div style={{
                    background: 'rgba(243,241,238,0.06)', border: '1px solid rgba(179,134,107,0.2)',
                    borderRadius: 8, padding: '14px 16px', display: 'flex', gap: 12, alignItems: 'flex-start',
                  }}>
                    <div style={{ width: 3, minHeight: 36, borderRadius: 2, background: 'rgba(179,134,107,0.5)', flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: 11, color: 'rgba(243,241,238,0.7)', lineHeight: 1.5, marginBottom: 6 }}>
                        "Market quote data unified across 4 trading surfaces..."
                      </div>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <span style={{ fontSize: 9, padding: '2px 8px', borderRadius: 10, background: 'rgba(140,137,88,0.25)', color: 'rgba(243,241,238,0.6)', fontWeight: 700 }}>Reusable</span>
                        <span style={{ fontSize: 9, padding: '2px 8px', borderRadius: 10, background: 'rgba(179,134,107,0.2)', color: 'rgba(243,241,238,0.6)', fontWeight: 700 }}>Design System</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ padding: '24px 28px' }}>
                <span style={{
                  fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
                  color: 'var(--terracotta)', marginBottom: 10, display: 'block',
                }}>Design System · Trading</span>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--warm-gray)', lineHeight: 1.35, marginBottom: 10 }}>
                  Building a Reusable Quote Component
                </h3>
                <p style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--deep-blue)', opacity: 0.75 }}>
                  Designed and documented a unified market quote component adopted across 4 trading surfaces — replacing fragmented one-offs with a consistent, scalable pattern.
                </p>
                <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid rgba(144,161,185,0.1)',
                  display: 'flex', gap: 16, fontSize: 12 }}>
                  <span style={{ color: 'var(--deep-blue)', opacity: 0.65 }}>Platform: Enterprise Platform</span>
                  <span style={{ color: 'var(--deep-blue)', opacity: 0.65 }}>Status: Shipped</span>
                </div>
              </div>
            </div>

            {/* Card: Strategic Vision — Killing a Bad Idea */}
            <div style={{
              minWidth: 340, maxWidth: 340, scrollSnapAlign: 'start',
              background: '#FEFDFB', borderRadius: 14,
              border: '1px solid rgba(144,161,185,0.12)',
              overflow: 'hidden', transition: 'transform 0.25s ease, box-shadow 0.25s ease',
              cursor: 'default', position: 'relative',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(89,80,74,0.1)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <div style={{ position: 'absolute', top: 12, right: 12, zIndex: 2, fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--steel-blue)', background: 'rgba(144,161,185,0.12)', padding: '4px 10px', borderRadius: 20 }}>Coming soon</div>
              <div style={{
                height: 180, background: 'linear-gradient(135deg, #2d5c52, #3a6e62)',
                position: 'relative', overflow: 'hidden',
                display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
              }}>
                <div style={{ position: 'absolute', inset: 0,
                  backgroundImage: 'radial-gradient(rgba(246,251,222,0.06) 1px, transparent 1px)',
                  backgroundSize: '24px 24px' }} />
                <div style={{ position: 'relative', zIndex: 1, width: '100%' }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'stretch' }}>
                    <div style={{
                      flex: 1, background: 'rgba(200,90,90,0.15)', border: '1px solid rgba(200,90,90,0.25)',
                      borderRadius: 8, padding: 14, textAlign: 'center',
                    }}>
                      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
                        color: 'rgba(246,251,222,0.4)', marginBottom: 8 }}>PM Proposal</div>
                      <div style={{ fontSize: 18, color: 'rgba(230,120,110,0.7)' }}>✕</div>
                      <div style={{ fontSize: 10, color: 'rgba(246,251,222,0.35)', marginTop: 4 }}>Low user value</div>
                    </div>
                    <div style={{
                      flex: 1, background: 'rgba(90,170,130,0.15)', border: '1px solid rgba(90,170,130,0.3)',
                      borderRadius: 8, padding: 14, textAlign: 'center',
                    }}>
                      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
                        color: 'rgba(246,251,222,0.4)', marginBottom: 8 }}>Counter-Proposal</div>
                      <div style={{ fontSize: 18, color: 'rgba(74,190,155,0.8)' }}>✓</div>
                      <div style={{ fontSize: 10, color: 'rgba(246,251,222,0.35)', marginTop: 4 }}>Research-backed</div>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ padding: '24px 28px' }}>
                <span style={{
                  fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
                  color: 'var(--terracotta)', marginBottom: 10, display: 'block',
                }}>Strategy · Trading Vision</span>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--warm-gray)', lineHeight: 1.35, marginBottom: 10 }}>
                  Killing a Feature to Protect the Trader
                </h3>
                <p style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--deep-blue)', opacity: 0.75 }}>
                  Used research and strategic vision work to push back on a PM-driven feature that would have added friction to critical trading workflows — and redirected effort toward what traders actually needed.
                </p>
                <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid rgba(144,161,185,0.1)',
                  display: 'flex', gap: 16, fontSize: 12 }}>
                  <span style={{ color: 'var(--deep-blue)', opacity: 0.65 }}>Impact: Feature killed</span>
                  <span style={{ color: 'var(--deep-blue)', opacity: 0.65 }}>Outcome: Redirected</span>
                </div>
              </div>
            </div>

            {/* Placeholder card: Coming Soon */}
            <div style={{
              minWidth: 340, maxWidth: 340, scrollSnapAlign: 'start',
              borderRadius: 14,
              border: '2px dashed rgba(144,161,185,0.18)',
              overflow: 'hidden',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              minHeight: 380,
            }}>
              <div style={{ textAlign: 'center', padding: 40 }}>
                <div style={{ fontSize: 28, marginBottom: 12, opacity: 0.25 }}>+</div>
                <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--steel-blue)', opacity: 0.7 }}>More coming soon</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* AI × Design — Standalone Section */}
      <section style={{
        background: 'linear-gradient(135deg, #3d3d42 0%, #48484e 50%, #3d3d42 100%)',
        position: 'relative', overflow: 'hidden',
        padding: 'clamp(60px, 8vw, 100px) clamp(40px, 6vw, 80px)',
      }}>
        {/* Dot grid */}
        <div style={{ position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(rgba(243,239,217,0.03) 1px, transparent 1px)',
          backgroundSize: '32px 32px', pointerEvents: 'none' }} />
        {/* Ambient glows */}
        <div style={{ position: 'absolute', top: -80, right: -100, width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(177,124,93,0.12) 0%, transparent 70%)',
          filter: 'blur(80px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -60, left: -80, width: 350, height: 350, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(144,161,185,0.1) 0%, transparent 70%)',
          filter: 'blur(80px)', pointerEvents: 'none' }} />

        <div className="beyond-grid" style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto',
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px, 5vw, 80px)', alignItems: 'center' }}>

          {/* Left: Text content */}
          <div>
            <p style={{
              fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase',
              color: '#d4a07a', marginBottom: 20,
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              Beyond the Work
              <span style={{ flex: 1, height: 1, background: 'rgba(212,160,122,0.2)' }} />
            </p>
            <h2 style={{
              fontSize: 'clamp(28px, 3.5vw, 36px)', fontWeight: 700, lineHeight: 1.2,
              color: '#f0ede6', marginBottom: 20,
            }}>
              AI × Design<span style={{ color: '#d4a07a' }}>.</span>
            </h2>
            <p style={{
              fontSize: 16, lineHeight: 1.7, color: 'rgba(213,209,201,0.6)',
              marginBottom: 32, maxWidth: 480,
            }}>
              A running collection of ideas, talks, and articles shaping how I think about
              design in the age of AI — plus my own take on what's changing and where the
              real value lives.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 36 }}>
              {['AI & Craft', 'Design Process', 'Jenny Wen', 'Addy Osmani', 'Curated Reads'].map(tag => (
                <span key={tag} style={{
                  fontSize: 12, fontWeight: 500, padding: '6px 16px', borderRadius: 100,
                  background: 'rgba(243,239,217,0.05)',
                  border: '1px solid rgba(243,239,217,0.09)',
                  color: 'rgba(240,237,230,0.55)',
                }}>{tag}</span>
              ))}
            </div>
            <Link to="/ai-design" style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '13px 28px', borderRadius: 28,
              background: '#d4a07a', color: '#2a2a2e',
              fontSize: 14, fontWeight: 700, letterSpacing: '0.02em',
              textDecoration: 'none',
              boxShadow: '0 4px 24px rgba(212,160,122,0.3)',
              transition: 'all 0.25s ease',
            }}>
              Explore Collection <span style={{ fontSize: 16 }}>→</span>
            </Link>
          </div>

          {/* Right: Glass preview cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Featured quote glass card */}
            <div style={{
              background: 'rgba(243,239,217,0.05)',
              backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(243,239,217,0.1)',
              borderRadius: 14, padding: '32px 36px',
              boxShadow: '0 4px 32px rgba(0,0,0,0.1), inset 0 1px 0 rgba(243,239,217,0.06)',
            }}>
              <div style={{ fontSize: 40, lineHeight: 1, color: 'rgba(212,160,122,0.35)', fontFamily: 'Georgia, serif', marginBottom: 10 }}>"</div>
              <p style={{ fontSize: 17, fontWeight: 500, lineHeight: 1.6, color: 'rgba(240,237,230,0.85)', marginBottom: 14 }}>
                The design process isn't dead — it just got a remix.
              </p>
              <p style={{ fontSize: 12, fontWeight: 600, color: 'rgba(160,173,192,0.5)' }}>— Kristin Garza</p>
            </div>

            {/* Two smaller glass cards */}
            <div className="glass-card-pair" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{
                background: 'rgba(243,239,217,0.04)',
                backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(243,239,217,0.08)',
                borderRadius: 12, padding: '22px 24px',
                boxShadow: 'inset 0 1px 0 rgba(243,239,217,0.04)',
              }}>
                <div style={{ height: 3, width: 32, borderRadius: 2, background: 'linear-gradient(90deg, #B17C5D, #d4a07a)', marginBottom: 14 }} />
                <p style={{ fontSize: 13, fontWeight: 700, color: 'rgba(240,237,230,0.8)', marginBottom: 6, lineHeight: 1.3 }}>
                  Don't Trust the Process
                </p>
                <p style={{ fontSize: 11, color: 'rgba(213,209,201,0.4)' }}>Jenny Wen</p>
              </div>
              <div style={{
                background: 'rgba(243,239,217,0.04)',
                backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(243,239,217,0.08)',
                borderRadius: 12, padding: '22px 24px',
                boxShadow: 'inset 0 1px 0 rgba(243,239,217,0.04)',
              }}>
                <div style={{ height: 3, width: 32, borderRadius: 2, background: 'linear-gradient(90deg, #7a8fa8, #a0b3c8)', marginBottom: 14 }} />
                <p style={{ fontSize: 13, fontWeight: 700, color: 'rgba(240,237,230,0.8)', marginBottom: 6, lineHeight: 1.3 }}>
                  Comprehension Debt
                </p>
                <p style={{ fontSize: 11, color: 'rgba(213,209,201,0.4)' }}>Addy Osmani</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fun Projects — Passion work carousel */}
      <section style={{
        padding: '80px clamp(40px, 6vw, 80px) 100px',
        background: 'var(--cream)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{
            display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
            marginBottom: 40,
          }}>
            <div>
              <div className="section-label" style={{ marginBottom: 8 }}>Just for Fun</div>
              <p style={{ fontSize: 15, color: 'var(--deep-blue)', opacity: 0.75, maxWidth: 480 }}>
                Passion projects, creative experiments, and things I build when I'm not solving enterprise problems — because design should be fun too.
              </p>
            </div>
          </div>

          <div style={{
            display: 'flex', gap: 24, overflowX: 'auto',
            paddingBottom: 8, scrollSnapType: 'x mandatory',
          }}>

            {/* Card: Line Illustrations */}
            <div style={{
              minWidth: 320, maxWidth: 320, scrollSnapAlign: 'start',
              borderRadius: 14,
              border: '1px solid rgba(144,161,185,0.12)',
              overflow: 'hidden', transition: 'transform 0.25s ease, box-shadow 0.25s ease',
              background: 'white', cursor: 'default',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(89,80,74,0.1)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <div style={{
                height: 200, background: 'linear-gradient(135deg, #f5f0eb, #ede8e3)',
                position: 'relative', overflow: 'hidden',
                display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 28,
              }}>
                {/* Stylized line art hint */}
                <svg width="180" height="140" viewBox="0 0 180 140" fill="none" style={{ opacity: 0.5 }}>
                  <path d="M20 120 Q50 20 90 70 T160 30" stroke="var(--terracotta)" strokeWidth="2" fill="none" strokeLinecap="round" />
                  <path d="M30 110 Q70 40 110 80 T170 50" stroke="var(--steel-blue)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeDasharray="4 6" />
                  <circle cx="90" cy="70" r="8" stroke="var(--terracotta)" strokeWidth="1.5" fill="rgba(177,124,93,0.08)" />
                  <circle cx="45" cy="55" r="5" stroke="var(--steel-blue)" strokeWidth="1" fill="rgba(144,161,185,0.08)" />
                  <circle cx="140" cy="40" r="6" stroke="var(--terracotta)" strokeWidth="1" fill="rgba(177,124,93,0.06)" />
                </svg>
              </div>
              <div style={{ padding: '24px 28px' }}>
                <span style={{
                  fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
                  color: 'var(--terracotta)', marginBottom: 10, display: 'block',
                }}>Illustration</span>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--warm-gray)', lineHeight: 1.35, marginBottom: 10 }}>
                  Line Illustration Work
                </h3>
                <p style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--deep-blue)', opacity: 0.75 }}>
                  A collection of line illustrations — my go-to creative outlet. Minimal strokes, playful compositions.
                </p>
                <p style={{ fontSize: 12, color: 'var(--terracotta)', fontWeight: 600, marginTop: 16 }}>Coming soon</p>
              </div>
            </div>

            {/* Card: Vibe-Coded Project 1 */}
            <div style={{
              minWidth: 320, maxWidth: 320, scrollSnapAlign: 'start',
              borderRadius: 14,
              border: '1px solid rgba(144,161,185,0.12)',
              overflow: 'hidden', transition: 'transform 0.25s ease, box-shadow 0.25s ease',
              background: 'white', cursor: 'default',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(89,80,74,0.1)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <div style={{
                height: 200, background: 'linear-gradient(135deg, #62748e, #90a1b9)',
                position: 'relative', overflow: 'hidden',
                display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 28,
              }}>
                <div style={{ position: 'absolute', inset: 0,
                  backgroundImage: 'radial-gradient(rgba(246,251,222,0.08) 1px, transparent 1px)',
                  backgroundSize: '20px 20px' }} />
                <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase',
                    color: 'rgba(246,251,222,0.5)', marginBottom: 8 }}>Vibe Coded</div>
                  <div style={{ fontSize: 28, fontWeight: 700, color: 'rgba(246,251,222,0.9)', letterSpacing: '-0.02em' }}>{"</>"}</div>
                </div>
              </div>
              <div style={{ padding: '24px 28px' }}>
                <span style={{
                  fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
                  color: 'var(--terracotta)', marginBottom: 10, display: 'block',
                }}>Passion Project · Code</span>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--warm-gray)', lineHeight: 1.35, marginBottom: 10 }}>
                  Vibe-Coded Experiments
                </h3>
                <p style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--deep-blue)', opacity: 0.75 }}>
                  Side projects built by feel — quick creative builds where the goal is to learn something new or just make something that sparks joy.
                </p>
                <p style={{ fontSize: 12, color: 'var(--terracotta)', fontWeight: 600, marginTop: 16 }}>Coming soon</p>
              </div>
            </div>

            {/* Placeholder */}
            <div style={{
              minWidth: 320, maxWidth: 320, scrollSnapAlign: 'start',
              borderRadius: 14,
              border: '2px dashed rgba(144,161,185,0.18)',
              overflow: 'hidden',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              minHeight: 380,
            }}>
              <div style={{ textAlign: 'center', padding: 40 }}>
                <div style={{ fontSize: 28, marginBottom: 12, opacity: 0.25 }}>+</div>
                <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--steel-blue)', opacity: 0.7 }}>More experiments ahead</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* About */}
      <section className="about-section" id="about">
        <div data-reveal>
          <p className="about-label">About</p>
          <h2 className="about-heading">Designing for complexity, without adding to it</h2>
          <p className="about-body">
            I'm a UX designer specializing in enterprise financial applications — where the stakes
            are high, the data is dense, and the users are experts. I believe good design for
            professionals respects their expertise and gets out of their way.
          </p>
          <p className="about-body">
            Most recently, I led UX for trading platforms at a leading financial services firm — unifying 15+ applications
            under a cohesive design system and streamlining high-stakes workflows for institutional investors.
            I'm now exploring my next opportunity to bring systems thinking and enterprise design leadership
            to complex product challenges.
          </p>
        </div>
        <div data-reveal data-reveal-delay="1">
          <p className="about-label" style={{ marginBottom: 24 }}>Craft &amp; Approach</p>
          <div className="skills-grid">
            {['UX Research & Synthesis','Systems-level Thinking','Design System Contribution',
              'Interaction Design','Stakeholder Facilitation','Prototyping & Testing',
              'Data Visualization','Accessibility'].map(s => (
              <div key={s} className="skill-chip">{s}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
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
