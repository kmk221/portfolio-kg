import { useEffect, useState } from 'react'
import Nav from '../components/Nav.jsx'

export default function Illustrations() {
  const [mainArtworks, setMainArtworks] = useState([])
  const [decorativeArtworks, setDecorativeArtworks] = useState([])
  const [flippedCards, setFlippedCards] = useState({ 'front2.svg': false, 'Frame 46.svg': false })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    // Auto-flip invites every 3 seconds
    const flipInterval = setInterval(() => {
      setFlippedCards(prev => ({
        'front2.svg': !prev['front2.svg'],
        'Frame 46.svg': !prev['Frame 46.svg']
      }))
    }, 3000)

    return () => clearInterval(flipInterval)
  }, [])

  const stories = {
    'Frame.svg': 'Surprised a friend with canvas beach bags for everyone at her bachelorette party on the cape',
    'Frame 1.svg': 'A 60th birthday card for my mother in law',
    'Frame 46.svg': 'A save the date for my best friend - took a photo of them at our wedding and converted their outfits into bride and groom attire',
    'Frame 7.svg': 'A Christmas card for my husband the year we got married - a remake of our actual wedding photo on a chairlift',
    'Frame 5.svg': 'A logo for a friend\'s private pilates studio',
    'Group 397.svg': 'Canvas bags for a family member\'s annual running group trip to a special home on Sea Island',
    'Frame 3.svg': 'A keepsake for a friend\'s baby shower',
    'Frame 281.svg': 'A collaboration with a favorite textile artist',
    'Group 60.svg': 'Cocktail napkins for my brother\'s wedding',
    'Frame 285.svg': 'Embroidered cocktail napkins for friend\'s wedding gift',
    'Group 62.png': 'College reunion weekend itinerary',
    'front2.svg': 'Wedding invite for best friends with custom drawings of buildings from their favorite street and wedding venue in Denver',
  }

  const featuredItems = ['Frame.svg', 'Frame 46.svg', 'Frame 281.svg']

  useEffect(() => {
    // Decorative/smaller illustrations
    const decorative = [
      'MARG.svg',
      'Group 36.svg',
      'Group 39.svg',
      'Group 46.svg',
      'Group 68.svg',
      'Group 69.svg',
    ]

    // Main artworks
    const main = [
      'Frame 1.svg',
      'Frame 17.svg',
      'Frame 281.svg',
      'Frame 284.svg',
      'Frame 3.svg',
      'Frame 46.svg',
      'Frame 5.svg',
      'Frame 7.svg',
      'Frame.svg',
      'front2.svg',
      'Group 397.svg',
      'Group 60.svg',
      'Group 62.png',
      'Frame 285.svg',
    ]

    setMainArtworks(main)
    setDecorativeArtworks(decorative)
  }, [])

  const projects = [
    {
      category: 'Wedding Invitations',
      title: 'Custom wedding invitation designs',
      description: 'A series of hand-drawn invitation designs featuring custom line illustrations and architectural elements. Clean typography paired with playful scene illustrations created for friends and family.',
      tags: ['Line Art', 'Print Design', 'Custom'],
      accent: 'clay'
    },
    {
      category: 'Event Poster',
      title: 'S&P Event identity and poster',
      description: 'Bold typography and illustrated cityscape for a high-energy market event. Features custom line art of buildings and urban scenery — exploring type-and-image hierarchy.',
      tags: ['Poster Design', 'Typography', 'Illustration'],
      accent: 'slate'
    },
    {
      category: 'Character Work',
      title: 'People and character illustrations',
      description: 'A collection of character illustrations for various projects — from wedding guest portraits to lifestyle illustrations. Each piece explores different styles and expressive approaches.',
      tags: ['Character Design', 'People', 'Custom Art'],
      accent: 'ochre'
    },
    {
      category: 'Scene & Story',
      title: 'Moments, scenes, environments',
      description: 'Illustrations of moments and scenes — families, sailboats, travel memories. Each piece tells a specific story or captures a feeling through minimal lines and careful composition.',
      tags: ['Scene Art', 'Environmental', 'Storytelling'],
      accent: 'slate'
    },
    {
      category: 'Line Studies',
      title: 'Graphic and line explorations',
      description: 'Experimental line work, botanical illustrations, and graphic design studies exploring form, line weight, composition, and visual rhythm. Studies in constraint and craft.',
      tags: ['Line Art', 'Graphic Design', 'Studies'],
      accent: 'clay'
    },
    {
      category: 'Custom Graphics',
      title: 'Logos and branded work',
      description: 'Hand-drawn graphics and custom artwork created for friends and family — logos, labels, and original illustrations for personal projects and commissions.',
      tags: ['Graphics', 'Branding', 'Custom'],
      accent: 'ochre'
    },
  ]

  return (
    <div style={{ background: 'var(--surface)', minHeight: '100vh' }}>
      <Nav />
      <main className="page" style={{ background: 'var(--surface)' }}>

        {/* ── HERO ── */}
        <section className="page-section" style={{ paddingTop: 80, background: 'var(--surface)' }}>
          <h1 style={{
            fontFamily: 'var(--f-slab)',
            fontSize: 'clamp(42px, 6vw, 72px)',
            fontWeight: 400,
            lineHeight: 1.08,
            letterSpacing: '-0.01em',
            color: 'var(--ink)',
            margin: '0 0 16px',
          }}>
            Line Art & Characters.
          </h1>
          <p style={{
            fontFamily: 'var(--f-sans)',
            fontSize: 18,
            lineHeight: 1.7,
            color: 'var(--ink-2)',
            maxWidth: '72ch',
            margin: '0 0 48px',
          }}>
            A collection of illustrations, character designs, and custom graphics created for friends and family. Personal projects that explore line work, visual storytelling, and the fundamentals of design applied beyond the screen.
          </p>
        </section>

        {/* ── PHILOSOPHY ── */}
        <section className="page-section" style={{ background: 'var(--surface)', paddingTop: 80, paddingBottom: 80, borderBottom: '1px solid var(--hairline)' }}>
          <div style={{ maxWidth: 'var(--content)', margin: '0 auto', padding: '0 var(--side-p)' }}>
            <div className="section-spread" style={{ marginBottom: 32 }}>
              <span className="eyebrow" style={{ color: 'var(--ink-mute)' }}>Why This Work</span>
              <span className="rule" />
            </div>
            <p style={{
              fontFamily: 'var(--f-sans)',
              fontSize: 16,
              lineHeight: 1.75,
              color: 'var(--ink-2)',
              maxWidth: '72ch',
              margin: '0 0 16px',
            }}>
              These projects started as requests from friends and family, but they became a space to explore design fundamentals without the constraints of a product brief. Line work, composition, typography, character development — the same design thinking that shapes interfaces and systems, just expressed through a different medium.
            </p>
            <p style={{
              fontFamily: 'var(--f-sans)',
              fontSize: 16,
              lineHeight: 1.75,
              color: 'var(--ink-2)',
              maxWidth: '72ch',
              margin: 0,
            }}>
              There's something valuable about creating physical or print pieces. It slows you down. It forces you to think differently about hierarchy, whitespace, and the permanence of your choices. And honestly, it's fun.
            </p>
          </div>
        </section>

        {/* ── IMAGE GALLERY ── */}
        <section className="page-section" style={{ background: 'var(--surface)', paddingTop: 80, paddingBottom: 80 }}>
          <div style={{ maxWidth: 'var(--content)', margin: '0 auto', padding: '0 var(--side-p)' }}>
            <div className="section-spread" style={{ marginBottom: 60 }}>
              <span className="eyebrow">Illustrations</span>
              <span className="rule" />
            </div>

            <div style={{ columnCount: 'auto', columnWidth: '400px', columnGap: '32px', marginBottom: 100 }}>
              {mainArtworks.map((svg, idx) => (
                svg === 'front2.svg' || svg === 'Frame 46.svg' ? (
                  // Flip cards
                  <div
                    key={idx}
                    style={{
                      breakInside: 'avoid',
                      marginBottom: 32,
                      perspective: '1000px',
                      position: 'relative',
                    }}
                  >
                    <div
                      style={{
                        position: 'relative',
                        width: '100%',
                        aspectRatio: '1',
                        transformStyle: 'preserve-3d',
                        transition: 'transform 0.6s',
                        transform: flippedCards[svg] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                      }}
                    >
                      {/* Front */}
                      <div
                        style={{
                          position: 'absolute',
                          width: '100%',
                          height: '100%',
                          backfaceVisibility: 'hidden',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <img
                          src={`/illustrations/${svg}?v=${Date.now()}`}
                          alt={svg === 'front2.svg' ? 'Wedding invite front' : 'Invite front'}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.3))',
                            display: 'block',
                          }}
                        />
                      </div>
                      {/* Back */}
                      <div
                        style={{
                          position: 'absolute',
                          width: '100%',
                          height: '100%',
                          backfaceVisibility: 'hidden',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transform: 'rotateY(180deg)',
                        }}
                      >
                        <img
                          src={`/illustrations/${svg === 'front2.svg' ? 'back 2.svg' : 'Frame 47.svg'}?v=${Date.now()}`}
                          alt={svg === 'front2.svg' ? 'Wedding invite back' : 'Invite back'}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.3))',
                            display: 'block',
                          }}
                        />
                      </div>
                    </div>
                    {stories[svg] && (
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'rgba(0,0,0,0.75)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          opacity: 0,
                          transition: 'opacity 0.3s ease',
                          padding: '20px',
                          borderRadius: 'var(--r-3)',
                          cursor: 'default',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.opacity = '1'
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.opacity = '0'
                        }}
                      >
                        <p style={{
                          color: 'rgba(245,232,211,0.96)',
                          fontSize: 14,
                          lineHeight: 1.6,
                          textAlign: 'center',
                          fontFamily: 'var(--f-sans)',
                          margin: 0,
                        }}>
                          {stories[svg]}
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div
                    key={idx}
                    style={{
                      breakInside: 'avoid',
                      marginBottom: 32,
                      position: 'relative',
                      transition: 'transform 200ms ease',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'scale(1.02)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'scale(1)'
                    }}
                  >
                    <img
                      src={`/illustrations/${svg}?v=${Date.now()}`}
                      alt={svg}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.3))',
                        display: 'block',
                      }}
                    />
                    {stories[svg] && (
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'rgba(0,0,0,0.75)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          opacity: 0,
                          transition: 'opacity 0.3s ease',
                          padding: '20px',
                          borderRadius: 'var(--r-3)',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.opacity = '1'
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.opacity = '0'
                        }}
                      >
                        <p style={{
                          color: 'rgba(245,232,211,0.96)',
                          fontSize: 14,
                          lineHeight: 1.6,
                          textAlign: 'center',
                          fontFamily: 'var(--f-sans)',
                          margin: 0,
                        }}>
                          {stories[svg]}
                        </p>
                      </div>
                    )}
                  </div>
                )
              ))}
            </div>
          </div>
        </section>

        {/* ── ABOUT THIS WORK ── */}
        <section className="page-section" style={{ borderTop: '1px solid var(--hairline)' }}>
          <div className="section-spread" style={{ marginBottom: 32 }}>
            <span className="eyebrow" style={{ color: 'var(--ink-mute)' }}>About This Work</span>
            <span className="rule" />
          </div>
          <div style={{ maxWidth: '68ch' }}>
            <p style={{
              fontFamily: 'var(--f-sans)',
              fontSize: 16,
              lineHeight: 1.75,
              color: 'var(--ink-2)',
              margin: '0 0 16px',
            }}>
              Every piece here is hand-drawn by me, with a mouse, in Figma. No AI, no shortcuts. Just patient, click-by-click line work.
            </p>
            <p style={{
              fontFamily: 'var(--f-sans)',
              fontSize: 16,
              lineHeight: 1.75,
              color: 'var(--ink-2)',
              margin: '0 0 16px',
            }}>
              These started as surprises, a birthday card here, a wedding gift there. Once friends and family saw a few, they started asking for more. Many of the people illustrations are drawn from real photos or memories, but I like to add creative twists that make them feel a little more personal.
            </p>
            <p style={{
              fontFamily: 'var(--f-sans)',
              fontSize: 16,
              lineHeight: 1.75,
              color: 'var(--ink-2)',
              margin: 0,
            }}>
              What I love about this work is the iteration, trying different versions, adjusting a line weight or a composition until something really pops. But what keeps me coming back is seeing someone's face when they recognize themselves or a memory in a drawing. That reaction is exactly what I want from my design career: to iterate with care, obsess over the details, and create experiences that spark joy.
            </p>
          </div>
        </section>

      </main>

      {/* ── FOOTER ── */}
      <footer className="site-foot" id="contact" style={{ background: 'var(--surface)', borderTop: '1px solid var(--hairline)' }}>
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
