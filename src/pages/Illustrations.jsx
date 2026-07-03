import { useEffect, useState } from 'react'
import Nav from '../components/Nav.jsx'

// Hover-story text, keyed by the illustration's front SVG filename.
const stories = {
  'Frame.svg': 'Surprised a friend with canvas beach bags for everyone at her bachelorette party on the cape',
  'Frame 1.svg': 'A 60th birthday card for my mother in law',
  'Frame 46new.svg': "Originally an engagement greeting card I'd made for a friend. I'd taken a photo of them and converted their outfits to bride and groom attire. They loved it so much they asked me to use it for their Save the Dates.",
  'Frame 7.svg': 'A Christmas card I made for my husband the year we got married. A festive remake of one of our wedding photos on a chairlift in Crested Butte, CO - our venue and one of our favorite places.',
  'Frame 5.svg': "A logo for a friend's pilates company",
  'Group 397.svg': "Canvas bags for a family member's annual running group trip to a special home on Sea Island",
  'Frame 3.svg': "A keepsake for a friend's baby shower",
  'Frame 281.svg': 'A collaboration with a favorite textile artist that I met on a trip to Portugal',
  'Group 60.svg': "Cocktail napkins for my brother's wedding",
  'Frame 285.svg': "Embroidered cocktail napkins for friend's wedding gift",
  'Group 62.svg': 'College reunion weekend itinerary',
  'front2.svg': 'Wedding invite for friends with custom drawings of buildings from their favorite street and wedding venue in Denver',
}

// Masonry items. `flip` cards auto-rotate front↔back; `propped` gives the
// Save-the-Date the whole-block "card leaning against a wall" treatment.
// Order is interleaved so the 3 columns balance nicely.
// Explicit 3-column layout (deterministic placement, top-to-bottom per column).
// Non-flip PNGs sit inside a coloured frame (the tile bg shows as a mat via `pad`).
// Flip PNGs (front `a` / back `b`) use the propped "leaning card on a coloured
// wall" treatment — drop shadow + rounded corners, same as the old cards.
const FRAME_PAD = '8%'
const COLUMNS = [
  // ── Column 1 ──
  [
    { front: '1a.png', back: '1b.png', flip: true, propped: true, aspect: '0.79', propPad: '15% 15% 15%', bg: '#F85636', alt: 'Save the Date — Victoria & Mike' },
    { front: '4.png', bg: '#4A7A4A', pad: FRAME_PAD, alt: 'Dip-kiss dancers line drawing' },
    { front: '7.png', bg: '#DDCC33', aspect: '1', pad: '23% 15%', alt: 'Giraffe baby-shower advice card' },
    { front: '11.png', bg: '#F3A3CA', pad: FRAME_PAD, alt: 'Happy Birthday — life of every party' },
    { front: '14.png', bg: '#4373ED', pad: FRAME_PAD, alt: 'MG Pilates logo' },
  ],
  // ── Column 2 ──
  [
    { front: '2.png', bg: '#DDCC33', aspect: '1.019', pad: '21.7% 22%', alt: 'Couple portrait with hearts' },
    { front: '5a.png', back: '5b.png', flip: true, propped: true, aspect: '0.79', propPad: '15% 24% 15%', bg: '#F3A3CA', alt: 'S&P — Hey Kiddo Denver invite' },
    { front: '8a.png', back: '8b.png', flip: true, propped: true, aspect: '1.4', bg: '#4373ED', alt: 'Cowboy & cowgirl' },
    { front: '10.png', bg: '#F39238', aspect: '0.79', pad: '24.6% 15%', alt: 'Bride & groom on a Christmas chairlift' },
    { front: '13.png', alt: 'Keeping Austin Weird weekend itinerary' },
  ],
  // ── Column 3 ──
  [
    { front: '3a.png', back: '3b.png', flip: true, propped: true, aspect: '0.79', propPad: '15% 15% 15%', bg: '#4373ED', alt: 'Sailboat — Cotuit 2024' },
    { front: '6.png', bg: '#F39238', aspect: '0.79', pad: '28.3% 15%', alt: 'Doodle dog — I do too, xoxo Stevie' },
    { front: '9.png', bg: '#F35D38', aspect: '0.79', pad: '39.6% 15%', alt: 'Sea Island house — running on Sea Island time' },
    { front: '12.png', bg: '#4A7A4A', pad: FRAME_PAD, alt: 'Wedding couple' },
  ],
]

const src = (f) => `/illustrations/${f}?v=3`

export default function Illustrations() {
  const [flippedCards, setFlippedCards] = useState({
    '1a.png': false, '3a.png': false, '5a.png': false, '8a.png': false,
  })

  useEffect(() => { window.scrollTo(0, 0) }, [])

  // Auto-flip the invite/save-the-date cards every 3 seconds.
  useEffect(() => {
    const t = setInterval(() => {
      setFlippedCards(prev => ({
        '1a.png': !prev['1a.png'],
        '3a.png': !prev['3a.png'],
        '5a.png': !prev['5a.png'],
        '8a.png': !prev['8a.png'],
      }))
    }, 3000)
    return () => clearInterval(t)
  }, [])

  // Gentle, controlled slow-scroll to the About section at the bottom.
  // Uses behavior:'instant' per frame so the global CSS scroll-behavior:smooth
  // doesn't fight the animation.
  const scrollToAbout = () => {
    const el = document.getElementById('about-work')
    if (!el) return
    const startY = window.scrollY
    const targetY = Math.max(0, el.getBoundingClientRect().top + window.scrollY - 24)
    const dist = targetY - startY
    const duration = Math.min(2400, Math.max(1000, Math.abs(dist) * 0.5))
    const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
    let startT = null
    const step = (ts) => {
      if (startT === null) startT = ts
      const p = Math.min((ts - startT) / duration, 1)
      window.scrollTo({ top: startY + dist * ease(p), left: 0, behavior: 'instant' })
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }

  const renderTile = (item) => {
    if (item.placeholder) {
      return (
        <div key={item.label} className="illo-tile illo-tile--placeholder" style={{ background: item.bg, aspectRatio: item.aspect || '1' }}>
          <span className="illo-ph-label">{item.label}<br />{item.bg}</span>
        </div>
      )
    }
    const { front, back, flip, bg, pad, propPad, story, propped, alt, aspect } = item
    const flipped = flip ? flippedCards[front] : false
    const storyText = story ? stories[story] : null
    const flipStyle = { transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }
    const padStyle = pad ? { padding: pad } : undefined
    // Per-card override for the leaning-card mat (shrinks the propped image).
    const propPadStyle = propPad ? { padding: propPad } : undefined

    return (
      <div key={front} className={`illo-tile${aspect ? ' illo-tile--framed' : ''}`} style={{ background: bg || 'transparent', ...(aspect ? { aspectRatio: aspect } : {}) }}>
        {propped ? (
          <div className="illo-flip" style={flipStyle}>
            <div className="illo-prop-face" style={propPadStyle}>
              <img src={src(front)} alt={`${alt} front`} className="illo-prop-img" />
            </div>
            <div className="illo-prop-face illo-prop-face--back" style={propPadStyle}>
              <img src={src(back)} alt={`${alt} back`} className="illo-prop-img" />
            </div>
          </div>
        ) : flip ? (
          <div className="illo-flip" style={flipStyle}>
            <img src={src(front)} alt={`${alt} front`} className="illo-front" style={padStyle} />
            <img src={src(back)} alt={`${alt} back`} className="illo-back" style={padStyle} />
          </div>
        ) : (
          <img src={src(front)} alt={alt} className="illo-img" style={padStyle} />
        )}
        {storyText && (
          <div className="illo-story"><p>{storyText}</p></div>
        )}
      </div>
    )
  }

  return (
    <div style={{ background: 'var(--surface)', minHeight: '100vh', overflowX: 'clip' }}>
      <Nav />
      <main className="page" style={{ background: 'var(--surface)' }}>

        {/* ── HERO ── (shared page-hero format: eyebrow + light serif H1 + serif lede) */}
        <section className="page-section" style={{ paddingTop: 80, background: 'var(--surface)' }}>
          <div style={{ marginBottom: 24 }}>
            <span className="eyebrow">Just For Fun · Illustration</span>
          </div>
          <h1 style={{ fontFamily: 'var(--f-serif)', fontWeight: 300, fontSize: 'clamp(36px, 5vw, 64px)', letterSpacing: '-0.01em', lineHeight: 1.1, color: 'var(--ink)', margin: '0 0 22px' }}>
            Line Art &amp; Characters.
          </h1>
          <p style={{ fontFamily: 'var(--f-serif)', fontWeight: 300, fontSize: 'clamp(19px, 1.9vw, 24px)', lineHeight: 1.45, letterSpacing: '-0.01em', color: 'var(--ink)', maxWidth: 560, margin: 0 }}>
            A collection of illustrations, character designs, and custom graphics created for friends and family. Personal projects that explore line work, visual storytelling, and the fundamentals of design applied beyond the screen.
          </p>
          <div style={{ marginTop: 40 }}>
            <button type="button" className="btn btn--secondary" onClick={scrollToAbout}>
              About this work
              <span aria-hidden="true" style={{ display: 'inline-block', fontSize: '1.25em', lineHeight: 0, marginLeft: 2 }}>↓</span>
            </button>
          </div>
        </section>

        {/* ── IMAGE GALLERY (full-bleed, 3-column masonry) ── */}
        <section className="page-section" style={{ background: 'var(--surface)', paddingTop: 72, paddingBottom: 72, marginLeft: 'calc(50% - 50vw)', marginRight: 'calc(50% - 50vw)', width: '100vw' }}>
          <div style={{ maxWidth: 1480, margin: '0 auto', padding: '0 42px' }}>
            <div className="section-spread" style={{ marginBottom: 48 }}>
              <span className="eyebrow">Illustrations</span>
              <span className="rule" />
            </div>
            <div className="illo-masonry">
              {COLUMNS.map((col, ci) => (
                <div className="illo-col" key={ci}>
                  {col.map(renderTile)}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ABOUT THIS WORK (below the gallery) ── */}
        <section id="about-work" className="page-section" style={{ background: 'var(--surface)', paddingTop: 48, paddingBottom: 80 }}>
          <div className="section-spread" style={{ marginBottom: 32 }}>
            <span className="eyebrow" style={{ color: 'var(--ink-mute)' }}>About This Work</span>
            <span className="rule" />
          </div>
          <p style={{ fontFamily: 'var(--f-sans)', fontSize: 16, lineHeight: 1.75, color: 'var(--ink-2)', maxWidth: '72ch', margin: '0 0 16px' }}>
            Every piece here is hand-drawn by me, with a mouse, in Figma. No AI, no shortcuts. Just patient, click-by-click line work. These started as surprises: a birthday card here, a party favor there. Once friends and family saw a few, they started asking for more - wedding invites, custom canvas bags, embroidered keepsakes. Many of the illustrations are drawn from real photos or memories, but I like to add small twists that make them feel a little more personal.
          </p>
          <p style={{ fontFamily: 'var(--f-sans)', fontSize: 16, lineHeight: 1.75, color: 'var(--ink-2)', maxWidth: '72ch', margin: 0 }}>
            There&apos;s something therapeutic about starting from nothing and slowly bringing a moment to life, click by click. I love the iteration: trying different versions, adjusting a line weight or composition until something feels inevitable. But what keeps me coming back is seeing someone&apos;s face when they recognize themselves or a memory in a drawing. That reaction is the same thing I&apos;m chasing in my product work: using judgment to pick a direction, iterating with care, obsessing over details, and creating experiences that feel simple, human, and quietly delightful. In a world where anyone can generate an image, the value is in the taste, intention, and craft behind it, and in making something that feels deeply personal to the people it&apos;s made for.
          </p>
        </section>

      </main>

      <nav className="cs-case-nav" aria-label="Bits navigation">
        <a href="/bits/shortlist" className="cs-case-nav-item cs-case-nav-item--prev">
          <span className="cs-case-nav-dir">← Previous</span>
          <span className="cs-case-nav-title">Shortlist</span>
        </a>
        <a href="/ai-design" className="cs-case-nav-item cs-case-nav-item--next">
          <span className="cs-case-nav-dir">Next →</span>
          <span className="cs-case-nav-title">AI × Design</span>
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
