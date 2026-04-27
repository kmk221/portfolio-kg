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

      {/* Continuous gradient wrapper covering Hero + Work + Bits & Pieces */}
      <div style={{
        background: `
          radial-gradient(900px circle at 15% 4%, rgba(196, 207, 223, 0.52) 0%, transparent 32%),
          radial-gradient(760px circle at 92% 12%, rgba(221, 179, 101, 0.42) 0%, transparent 30%),
          radial-gradient(680px circle at 6% 30%, rgba(184, 103, 87, 0.34) 0%, transparent 28%),
          radial-gradient(820px circle at 88% 42%, rgba(196, 207, 223, 0.36) 0%, transparent 30%),
          radial-gradient(640px circle at 18% 60%, rgba(221, 179, 101, 0.36) 0%, transparent 28%),
          radial-gradient(720px circle at 82% 78%, rgba(184, 103, 87, 0.3) 0%, transparent 30%),
          radial-gradient(600px circle at 30% 95%, rgba(221, 179, 101, 0.28) 0%, transparent 28%),
          var(--cream)
        `,
      }}>

      {/* Hero */}
      <section className="home-hero">
        <div className="hero-content">
          <div className="hero-text">
            <p className="hero-eyebrow">UX Designer · Product Thinker</p>
            <h1 className="hero-name">Kristin Garza<span>.</span></h1>
            <p className="hero-title">
              I design for clarity wherever the problem is complex — turning data-dense workflows
              into intuitive, high-impact products.
            </p>
            <div className="hero-actions">
              <a href="#work" className="btn-primary">
                View Work <span style={{ fontSize: 18, lineHeight: 1 }}>↓</span>
              </a>
              <a href="mailto:kmkerney221@gmail.com" className="btn-secondary">Get in Touch</a>
            </div>
          </div>
          <div className="hero-pills">
            {[
              { label: 'Product Strategy', variant: 'blue' },
              { label: 'Platform Ecosystems', variant: 'gold' },
              { label: 'Systems Thinking', variant: 'warm' },
              { label: 'Enterprise UX', variant: 'blue' },
              { label: 'AI-Augmented Design', variant: 'gold' },
            ].map(({ label, variant }, i) => (
              <span key={label} className={`hero-pill hero-pill--${variant}`}
                style={{ animation: `fadeUp 0.5s ease ${0.8 + i * 0.1}s both` }}
              >{label}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Work */}
      <section className="work-section" id="work">
        <div className="work-header">
          <div className="section-label">Selected Work</div>
          <p className="work-intro">Three flagship case studies — each tackling complex data-dense workflows for institutional trading platforms.</p>
        </div>

        <div className="work-grid">

          {/* Order Management */}
          <Link to="/case-study/order-management" className="case-card" data-reveal>
            <div className="case-card-image" style={{
              background: 'linear-gradient(135deg, #E6C07A 0%, #DDB365 100%)',
            }}>
              <div className="case-card-pattern" style={{
                backgroundImage: 'radial-gradient(rgba(55,43,11,0.14) 1px, transparent 1px)',
                backgroundSize: '28px 28px'
              }} />
              <div className="case-card-mock">
                <div className="case-card-mock-label" style={{ color: 'rgba(55,43,11,0.7)' }}>Saved Orders</div>
                {[
                  { sym: 'AAPL', qty: '5,000', checked: true },
                  { sym: 'MSFT', qty: '2,200', checked: true },
                  { sym: 'GOOGL', qty: '800', checked: false },
                ].map(row => (
                  <div key={row.sym} className="case-card-mock-row" style={{
                    borderColor: 'rgba(55,43,11,0.12)',
                    gridTemplateColumns: 'auto 1fr auto',
                    gap: 10
                  }}>
                    <span style={{
                      width: 13, height: 13, borderRadius: 3,
                      background: row.checked ? 'rgba(55,43,11,0.35)' : 'transparent',
                      border: row.checked ? '1.5px solid rgba(55,43,11,0.35)' : '1.5px solid rgba(55,43,11,0.28)',
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      color: 'rgba(245,232,211,0.9)', fontSize: 9, fontWeight: 700, lineHeight: 1
                    }}>{row.checked ? '✓' : ''}</span>
                    <span style={{ fontWeight: 700, color: 'rgba(55,43,11,0.95)' }}>{row.sym}</span>
                    <span style={{ color: 'rgba(55,43,11,0.65)', textAlign: 'right' }}>{row.qty}</span>
                  </div>
                ))}
                <div style={{
                  display: 'flex', justifyContent: 'flex-end',
                  marginTop: 10, paddingTop: 10,
                  borderTop: '1px solid rgba(55,43,11,0.12)'
                }}>
                  <span style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: 0.6, textTransform: 'uppercase',
                    color: 'rgba(55,43,11,0.75)',
                    background: 'rgba(55,43,11,0.08)',
                    border: '1px solid rgba(55,43,11,0.22)',
                    padding: '4px 11px', borderRadius: 5,
                    display: 'inline-flex', alignItems: 'center', gap: 5
                  }}>Send <span style={{ fontSize: 11, lineHeight: 1 }}>→</span></span>
                </div>
              </div>
            </div>
            <div className="case-card-body">
              <h3 className="case-card-title">Redesigning Order Management</h3>
              <p className="case-card-sub">Simplifying the order management surface to enhance order visibility and reduce trade errors.</p>
              <div className="case-card-foot">
                <span className="case-card-arrow">Read case study →</span>
              </div>
            </div>
          </Link>

          {/* Rules */}
          <Link to="/case-study/rules" className="case-card" data-reveal data-reveal-delay="1">
            <div className="case-card-image" style={{
              background: 'linear-gradient(135deg, #D4DDE9 0%, #C4CFDF 100%)',
            }}>
              <div className="case-card-pattern" style={{
                backgroundImage: 'radial-gradient(rgba(55,43,11,0.08) 1px, transparent 1px)',
                backgroundSize: '28px 28px'
              }} />
              <div className="case-card-mock">
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                  gap: 8, marginBottom: 12
                }}>
                  <div style={{
                    fontSize: 11, fontWeight: 700, color: 'rgba(55,43,11,0.85)',
                    lineHeight: 1.25
                  }}>
                    Reject High Dollar TSLA Trades
                  </div>
                  <span style={{
                    fontSize: 9, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase',
                    padding: '2px 8px', borderRadius: 20,
                    background: 'rgba(221,179,101,0.3)', color: 'rgba(107,78,20,0.85)',
                    flexShrink: 0
                  }}>Active</span>
                </div>
                <div style={{
                  display: 'flex', flexDirection: 'column', gap: 10,
                  paddingTop: 10, borderTop: '1px solid rgba(55,43,11,0.12)'
                }}>
                  <div style={{ display: 'flex', gap: 10, fontSize: 10, lineHeight: 1.5 }}>
                    <span style={{ fontWeight: 700, color: 'rgba(55,43,11,0.5)', minWidth: 32, letterSpacing: 0.4 }}>IF</span>
                    <span style={{ color: 'rgba(55,43,11,0.6)' }}>ticker is <strong style={{ color: 'rgba(55,43,11,0.85)', fontWeight: 700 }}>TSLA</strong></span>
                  </div>
                  <div style={{ display: 'flex', gap: 10, fontSize: 10, lineHeight: 1.5 }}>
                    <span style={{ fontWeight: 700, color: 'rgba(55,43,11,0.5)', minWidth: 32, letterSpacing: 0.4 }}>AND</span>
                    <span style={{ color: 'rgba(55,43,11,0.6)' }}>value &gt; <strong style={{ color: 'rgba(55,43,11,0.85)', fontWeight: 700 }}>$100,000</strong></span>
                  </div>
                  <div style={{ display: 'flex', gap: 10, fontSize: 10, lineHeight: 1.5 }}>
                    <span style={{ fontWeight: 700, color: 'rgba(55,43,11,0.5)', minWidth: 32, letterSpacing: 0.4 }}>THEN</span>
                    <span style={{ color: 'rgba(55,43,11,0.6)' }}>reject the order</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="case-card-body">
              <h3 className="case-card-title">Inside the Rule Engine</h3>
              <p className="case-card-sub">Compliance rule management redesigned — replacing tribal knowledge with guided workflows.</p>
              <div className="case-card-foot">
                <span className="case-card-arrow">Read case study →</span>
              </div>
            </div>
          </Link>

          {/* Positions */}
          <Link to="/case-study/positions" className="case-card case-card--dark-mock" data-reveal data-reveal-delay="2">
            <div className="case-card-image" style={{
              background: 'linear-gradient(135deg, #C27A6E 0%, #B86757 100%)',
            }}>
              <div className="case-card-pattern" style={{
                backgroundImage: 'radial-gradient(rgba(245,232,211,0.18) 1px, transparent 1px)',
                backgroundSize: '28px 28px'
              }} />
              <div className="case-card-mock">
                <div className="case-card-mock-label" style={{ color: 'rgba(245,232,211,0.75)' }}>Positions Panel</div>
                {[
                  { ticker: 'AAPL', value: '$21,240', change: '+2.4%', pos: true },
                  { ticker: 'MSFT', value: '$32,130', change: '+1.1%', pos: true },
                  { ticker: 'GOOGL', value: '$55,200', change: '-0.8%', pos: false },
                ].map(row => (
                  <div key={row.ticker} className="case-card-mock-row" style={{ borderColor: 'rgba(245,232,211,0.12)' }}>
                    <span style={{ fontWeight: 700, color: 'rgba(245,232,211,0.95)' }}>{row.ticker}</span>
                    <span style={{ color: 'rgba(245,232,211,0.75)' }}>{row.value}</span>
                    <span style={{ fontSize: 10, fontWeight: 700, textAlign: 'right',
                      color: row.pos ? '#DDB365' : 'rgba(245,232,211,0.55)' }}>{row.change}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="case-card-body">
              <h3 className="case-card-title">Simplifying Positions Info</h3>
              <p className="case-card-sub">Re-architected how portfolio positions surface in trading workflows — scaled platform-wide.</p>
              <div className="case-card-foot">
                <span className="case-card-arrow">Read case study →</span>
              </div>
            </div>
          </Link>

        </div>
      </section>

      {/* Sneak Peeks — Mini work carousel */}
      <section style={{
        padding: '80px clamp(40px, 6vw, 80px) 100px',
        background: 'transparent',
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
                height: 180, background: 'linear-gradient(135deg, #372B0B, #2A1F08)',
                position: 'relative', overflow: 'hidden',
                display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
              }}>
                <div style={{ position: 'absolute', inset: 0,
                  backgroundImage: 'radial-gradient(rgba(184,103,87,0.14) 1px, transparent 1px)',
                  backgroundSize: '24px 24px' }} />
                <div style={{ position: 'relative', zIndex: 1, width: '100%' }}>
                  <div style={{
                    background: 'rgba(245,232,211,0.06)', border: '1px solid rgba(184,103,87,0.3)',
                    borderRadius: 8, padding: '12px 14px',
                  }}>
                    {/* Ticker header */}
                    <div style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      gap: 8, marginBottom: 10, paddingBottom: 10,
                      borderBottom: '1px solid rgba(245,232,211,0.1)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{
                          width: 22, height: 22, borderRadius: '50%',
                          background: 'rgba(184,103,87,0.3)',
                          border: '1px solid rgba(184,103,87,0.5)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 11, fontWeight: 700,
                          color: 'rgba(245,232,211,0.9)',
                          fontFamily: 'Georgia, serif', fontStyle: 'italic',
                          lineHeight: 1
                        }}>B</div>
                        <div>
                          <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(245,232,211,0.95)', lineHeight: 1.2 }}>BRK-A</div>
                          <div style={{ fontSize: 9, color: 'rgba(245,232,211,0.55)', lineHeight: 1.2 }}>Berkshire Hathaway</div>
                        </div>
                      </div>
                      <span style={{ color: 'rgba(245,232,211,0.4)', fontSize: 12, lineHeight: 1 }}>⋮</span>
                    </div>

                    {/* Data rows */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10 }}>
                        <span style={{ color: 'rgba(245,232,211,0.55)' }}>Last</span>
                        <span style={{ color: 'rgba(245,232,211,0.95)', fontWeight: 700 }}>$735,920.00</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10 }}>
                        <span style={{ color: 'rgba(245,232,211,0.55)' }}>Change</span>
                        <span style={{ color: 'rgba(245,232,211,0.8)' }}>−$4,700 (0.64%)</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10 }}>
                        <span style={{ color: 'rgba(245,232,211,0.55)' }}>Volume</span>
                        <span style={{ color: 'rgba(245,232,211,0.8)' }}>388</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ padding: '24px 28px' }}>
                <span style={{
                  fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
                  color: 'var(--terracotta)', marginBottom: 10, display: 'block',
                }}>Design System</span>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--warm-gray)', lineHeight: 1.35, marginBottom: 10 }}>
                  Building a Reusable Quote Component
                </h3>
                <p style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--deep-blue)', opacity: 0.75 }}>
                  Designed and documented a unified market quote component adopted across 4 trading surfaces — replacing fragmented one-offs with a consistent, scalable pattern.
                </p>
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
                height: 180, background: 'linear-gradient(135deg, #D4DDE9, #C4CFDF)',
                position: 'relative', overflow: 'hidden',
                display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
              }}>
                <div style={{ position: 'absolute', inset: 0,
                  backgroundImage: 'radial-gradient(rgba(55,43,11,0.08) 1px, transparent 1px)',
                  backgroundSize: '24px 24px' }} />
                <div style={{ position: 'relative', zIndex: 1, width: '100%' }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'stretch' }}>
                    <div style={{
                      flex: 1, background: 'rgba(184,103,87,0.18)', border: '1px solid rgba(184,103,87,0.35)',
                      borderRadius: 8, padding: 14, textAlign: 'center',
                    }}>
                      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
                        color: 'rgba(55,43,11,0.55)', marginBottom: 8 }}>PM Proposal</div>
                      <div style={{ fontSize: 18, color: '#B86757' }}>✕</div>
                      <div style={{ fontSize: 10, color: 'rgba(55,43,11,0.5)', marginTop: 4 }}>Low user value</div>
                    </div>
                    <div style={{
                      flex: 1, background: 'rgba(221,179,101,0.22)', border: '1px solid rgba(221,179,101,0.42)',
                      borderRadius: 8, padding: 14, textAlign: 'center',
                    }}>
                      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
                        color: 'rgba(55,43,11,0.55)', marginBottom: 8 }}>Counter-Proposal</div>
                      <div style={{ fontSize: 18, color: '#8B6515' }}>✓</div>
                      <div style={{ fontSize: 10, color: 'rgba(55,43,11,0.5)', marginTop: 4 }}>Research-backed</div>
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

      </div>
      {/* End continuous gradient wrapper */}

      {/* AI × Design — Standalone Section */}
      <section style={{
        background: 'linear-gradient(135deg, #DDB365 0%, #E6C07A 50%, #DDB365 100%)',
        position: 'relative', overflow: 'hidden',
        padding: 'clamp(60px, 8vw, 100px) clamp(40px, 6vw, 80px)',
      }}>
        {/* Dot grid */}
        <div style={{ position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(rgba(55,43,11,0.08) 1px, transparent 1px)',
          backgroundSize: '32px 32px', pointerEvents: 'none' }} />
        {/* Ambient glows */}
        <div style={{ position: 'absolute', top: -80, right: -100, width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(184,103,87,0.3) 0%, transparent 70%)',
          filter: 'blur(80px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -60, left: -80, width: 350, height: 350, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(196,207,223,0.25) 0%, transparent 70%)',
          filter: 'blur(80px)', pointerEvents: 'none' }} />

        <div className="beyond-grid" style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto',
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px, 5vw, 80px)', alignItems: 'center' }}>

          {/* Left: Text content */}
          <div>
            <p style={{
              fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase',
              color: '#B86757', marginBottom: 20,
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              Beyond the Work
              <span style={{ flex: 1, height: 1, background: 'rgba(184,103,87,0.3)' }} />
            </p>
            <h2 style={{
              fontSize: 'clamp(28px, 3.5vw, 36px)', fontWeight: 700, lineHeight: 1.2,
              color: '#372B0B', marginBottom: 20,
            }}>
              AI × Design<span style={{ color: '#B86757' }}>.</span>
            </h2>
            <p style={{
              fontSize: 16, lineHeight: 1.7, color: 'rgba(55,43,11,0.72)',
              marginBottom: 32, maxWidth: 480,
            }}>
              A running collection of ideas, talks, and articles shaping how I think about
              design in the age of AI — plus my own take on what's changing and where the
              real value lives.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 36 }}>
              {['AI & Craft', 'Design Process', 'Tools & Workflow', 'Future of UX', 'Curated Reads'].map(tag => (
                <span key={tag} style={{
                  fontSize: 12, fontWeight: 500, padding: '6px 16px', borderRadius: 100,
                  background: 'rgba(245,232,211,0.45)',
                  border: '1px solid rgba(55,43,11,0.14)',
                  color: 'rgba(55,43,11,0.78)',
                }}>{tag}</span>
              ))}
            </div>
            <Link to="/ai-design" style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '13px 28px', borderRadius: 28,
              background: '#B86757', color: '#F5E8D3',
              fontSize: 14, fontWeight: 700, letterSpacing: '0.02em',
              textDecoration: 'none',
              boxShadow: '0 4px 24px rgba(184,103,87,0.3)',
              transition: 'all 0.25s ease',
            }}>
              Explore Collection <span style={{ fontSize: 16 }}>→</span>
            </Link>
          </div>

          {/* Right: Glass preview cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Featured quote glass card */}
            <div style={{
              background: 'rgba(245,232,211,0.4)',
              backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(55,43,11,0.14)',
              borderRadius: 14, padding: '32px 36px',
              boxShadow: '0 4px 32px rgba(55,43,11,0.12), inset 0 1px 0 rgba(245,232,211,0.4)',
            }}>
              <p style={{ fontSize: 17, fontWeight: 500, lineHeight: 1.6, color: 'rgba(55,43,11,0.82)', margin: 0 }}>
                The design process isn't dead — it just got a remix.
              </p>
            </div>

            {/* Two smaller glass cards */}
            <div className="glass-card-pair" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{
                background: 'rgba(245,232,211,0.35)',
                backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(55,43,11,0.14)',
                borderRadius: 12, padding: '22px 24px',
                boxShadow: 'inset 0 1px 0 rgba(245,232,211,0.3)',
              }}>
                <div style={{ height: 3, width: 32, borderRadius: 2, background: '#B86757', marginBottom: 14 }} />
                <p style={{ fontSize: 13, fontWeight: 700, color: 'rgba(55,43,11,0.85)', marginBottom: 6, lineHeight: 1.3 }}>
                  Don't Trust the Process
                </p>
                <p style={{ fontSize: 11, color: 'rgba(55,43,11,0.5)' }}>Jenny Wen</p>
              </div>
              <div style={{
                background: 'rgba(245,232,211,0.35)',
                backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(55,43,11,0.14)',
                borderRadius: 12, padding: '22px 24px',
                boxShadow: 'inset 0 1px 0 rgba(245,232,211,0.3)',
              }}>
                <div style={{ height: 3, width: 32, borderRadius: 2, background: '#5F7A9A', marginBottom: 14 }} />
                <p style={{ fontSize: 13, fontWeight: 700, color: 'rgba(55,43,11,0.85)', marginBottom: 6, lineHeight: 1.3 }}>
                  Comprehension Debt
                </p>
                <p style={{ fontSize: 11, color: 'rgba(55,43,11,0.5)' }}>Addy Osmani</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fun Projects — Passion work carousel */}
      <section style={{
        padding: '80px clamp(40px, 6vw, 80px) 100px',
        background: `
          radial-gradient(620px circle at 8% 25%, rgba(221, 179, 101, 0.35) 0%, transparent 55%),
          radial-gradient(560px circle at 94% 60%, rgba(196, 207, 223, 0.32) 0%, transparent 55%),
          radial-gradient(480px circle at 42% 92%, rgba(184, 103, 87, 0.24) 0%, transparent 55%),
          var(--cream)
        `,
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
                height: 200, background: 'linear-gradient(135deg, #F5E8D3, #E8D9BE)',
                position: 'relative', overflow: 'hidden',
                display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 28,
              }}>
                {/* Stylized line art hint */}
                <svg width="180" height="140" viewBox="0 0 180 140" fill="none" style={{ opacity: 0.65 }}>
                  <path d="M20 120 Q50 20 90 70 T160 30" stroke="#B86757" strokeWidth="2" fill="none" strokeLinecap="round" />
                  <path d="M30 110 Q70 40 110 80 T170 50" stroke="#DDB365" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeDasharray="4 6" />
                  <circle cx="90" cy="70" r="8" stroke="#B86757" strokeWidth="1.5" fill="rgba(184,103,87,0.1)" />
                  <circle cx="45" cy="55" r="5" stroke="#DDB365" strokeWidth="1" fill="rgba(221,179,101,0.1)" />
                  <circle cx="140" cy="40" r="6" stroke="#B86757" strokeWidth="1" fill="rgba(184,103,87,0.08)" />
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
                height: 200, background: 'linear-gradient(135deg, #E6C07A, #DDB365)',
                position: 'relative', overflow: 'hidden',
                display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 28,
              }}>
                <div style={{ position: 'absolute', inset: 0,
                  backgroundImage: 'radial-gradient(rgba(55,43,11,0.12) 1px, transparent 1px)',
                  backgroundSize: '20px 20px' }} />
                <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase',
                    color: 'rgba(55,43,11,0.65)', marginBottom: 8 }}>Vibe Coded</div>
                  <div style={{ fontSize: 28, fontWeight: 700, color: '#372B0B', letterSpacing: '-0.02em' }}>{"</>"}</div>
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
        <div className="about-inner">
          <div data-reveal>
            <p className="about-label">About</p>
            <h2 className="about-heading">Designing for complexity, without adding to it</h2>
            <p className="about-body">
              I'm a UX designer drawn to complex, data-dense problems — where the stakes are high
              and the users are experts. I believe good design respects users' expertise and gets
              out of their way.
            </p>
            <p className="about-body">
              Most recently, I led UX for trading platforms at a leading financial services firm — unifying 15+ applications
              under a cohesive design system and streamlining high-stakes workflows for institutional investors.
              I'm now exploring my next opportunity to bring systems thinking and design leadership
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
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-left">kristin<span>.garza</span> · UX Designer</div>
          <div className="footer-links">
            <a href="https://www.linkedin.com/in/kristin-garza" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="mailto:kmkerney221@gmail.com">Email</a>
            <a href="/resume.pdf" target="_blank" rel="noreferrer">Resume</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
