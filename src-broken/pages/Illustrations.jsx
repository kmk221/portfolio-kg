import { useEffect, useState } from 'react'
import Nav from '../components/Nav.jsx'

export default function Illustrations() {
  const [mainArtworks, setMainArtworks] = useState([])
  const [decorativeArtworks, setDecorativeArtworks] = useState([])
  const [flippedCards, setFlippedCards] = useState({ 'front2.svg': false, 'Frame 46new.svg': false, 'Frame 281.svg': false, 'Frame.svg': false })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    // Auto-flip invites every 3 seconds
    const flipInterval = setInterval(() => {
      setFlippedCards(prev => ({
        'front2.svg': !prev['front2.svg'],
        'Frame 46new.svg': !prev['Frame 46new.svg'],
        'Frame 281.svg': !prev['Frame 281.svg'],
        'Frame.svg': !prev['Frame.svg']
      }))
    }, 3000)

    return () => clearInterval(flipInterval)
  }, [])

  const stories = {
    'Frame.svg': 'Surprised a friend with canvas beach bags for everyone at her bachelorette party on the cape',
    'Frame 1.svg': 'A 60th birthday card for my mother in law',
    'Frame 46new.svg': 'Originally an engagement greeting card I\'d made for a friend. I\'d taken a photo of them and converted their outfits to bride and groom attire. They loved it so much they asked me to use it for their Save the Dates.',
    'Frame 7.svg': 'A Christmas card I made for my husband the year we got married. A festive remake of one of our wedding photos on a chairlift in Crested Butte, CO - our venue and one of our favorite places.',
    'Frame 5.svg': 'A logo for a friend\'s pilates company',
    'Group 397.svg': 'Canvas bags for a family member\'s annual running group trip to a special home on Sea Island',
    'Frame 3.svg': 'A keepsake for a friend\'s baby shower',
    'Frame 281.svg': 'A collaboration with a favorite textile artist that I met on a trip to Portugal',
    'Group 60.svg': 'Cocktail napkins for my brother\'s wedding',
    'Frame 285.svg': 'Embroidered cocktail napkins for friend\'s wedding gift',
    'Group 62.svg': 'College reunion weekend itinerary',
    'front2.svg': 'Wedding invite for friends with custom drawings of buildings from their favorite street and wedding venue in Denver',
  }

  const featuredItems = ['Frame.svg', 'Frame 46new.svg', 'Frame 281.svg']

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
      'Frame 281.svg',
      'Frame 46new.svg',
      'Frame 1.svg',
      'Frame 17.svg',
      'Frame 284.svg',
      'Frame 3.svg',
      'Frame 5.svg',
      'Frame 7.svg',
      'Frame.svg',
      'front2.svg',
      'Group 397.svg',
      'Group 60.svg',
      'Group 62.svg',
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
      description: 'Bold typography and illustrated cityscape for a high-energy market event. Features custom line art of buildings and urban scenery  -  exploring type-and-image hierarchy.',
      tags: ['Poster Design', 'Typography', 'Illustration'],
      accent: 'slate'
    },
    {
      category: 'Character Work',
      title: 'People and character illustrations',
      description: 'A collection of character illustrations for various projects  -  from wedding guest portraits to lifestyle illustrations. Each piece explores different styles and expressive approaches.',
      tags: ['Character Design', 'People', 'Custom Art'],
      accent: 'ochre'
    },
    {
      category: 'Scene & Story',
      title: 'Moments, scenes, environments',
      description: 'Illustrations of moments and scenes  -  families, sailboats, travel memories. Each piece tells a specific story or captures a feeling through minimal lines and careful composition.',
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
      description: 'Hand-drawn graphics and custom artwork created for friends and family  -  logos, labels, and original illustrations for personal projects and commissions.',
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

        {/* ── ABOUT THIS WORK ── */}
        <section className="page-section" style={{ background: 'var(--surface)', paddingTop: 80, paddingBottom: 80, borderBottom: '1px solid var(--hairline)' }}>
          <div style={{ maxWidth: 'var(--content)', margin: '0 auto', padding: '0 var(--side-p)' }}>
            <div className="section-spread" style={{ marginBottom: 32 }}>
              <span className="eyebrow" style={{ color: 'var(--ink-mute)' }}>About This Work</span>
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
              Every piece here is hand-drawn by me, with a mouse, in Figma. No AI, no shortcuts. Just patient, click-by-click line work. These started as surprises: a birthday card here, a party favor there. Once friends and family saw a few, they started asking for more - wedding invites, custom canvas bags, embroidered keepsakes. Many of the illustrations are drawn from real photos or memories, but I like to add small twists that make them feel a little more personal.
            </p>
            <p style={{
              fontFamily: 'var(--f-sans)',
              fontSize: 16,
              lineHeight: 1.75,
              color: 'var(--ink-2)',
              maxWidth: '72ch',
              margin: 0,
            }}>
              There's something therapeutic about starting from nothing and slowly bringing a moment to life, click by click. I love the iteration: trying different versions, adjusting a line weight or composition until something feels inevitable. But what keeps me coming back is seeing someone's face when they recognize themselves or a memory in a drawing. That reaction is the same thing I'm chasing in my product work: using judgment to pick a direction, iterating with care, obsessing over details, and creating experiences that feel simple, human, and quietly delightful. In a world where anyone can generate an image, the value is in the taste, intention, and craft behind it, and in making something that feels deeply personal to the people it's made for.
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

            {/* ── ROW 1: Frame 46 left, Frame 1 + Frame 17 stacked right ── */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 0.65fr',
              gridTemplateRows: '1.4fr 1fr',
              gap: '16px',
              marginBottom: 16,
              aspectRatio: '1.6',
            }}>
              {/* Frame 46  -  flip card, spans both rows */}
              <div style={{
                gridRow: '1 / -1',
                perspective: '1000px',
                position: 'relative',
                borderRadius: 0,
                overflow: 'hidden',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              }}>
                <div style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.6s',
                  transform: flippedCards['Frame 46new.svg'] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}>
                  <img
                    src={`/illustrations/Frame 46new.svg?v=${Date.now()}`}
                    alt="Save the date front"
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', backfaceVisibility: 'hidden', display: 'block' }}
                  />
                  <img
                    src={`/illustrations/Frame 47.svg?v=${Date.now()}`}
                    alt="Save the date back"
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', display: 'block' }}
                  />
                </div>
                {stories['Frame 46new.svg'] && (
                  <div
                    style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.3s ease', padding: '20px', borderRadius: 0, cursor: 'default' }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = '1' }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = '0' }}
                  >
                    <p style={{ color: 'rgba(245,232,211,0.96)', fontSize: 14, lineHeight: 1.6, textAlign: 'center', fontFamily: 'var(--f-sans)', margin: 0 }}>{stories['Frame 46new.svg']}</p>
                  </div>
                )}
              </div>

              {/* Frame 1  -  top right, taller rectangle */}
              <div style={{ position: 'relative', borderRadius: 0, overflow: 'hidden', background: '#F3A3CA', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <img src={`/illustrations/Frame 1.svg?v=${Date.now()}`} alt="Birthday card" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
                {stories['Frame 1.svg'] && (
                  <div
                    style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.3s ease', padding: '20px', borderRadius: 0 }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = '1' }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = '0' }}
                  >
                    <p style={{ color: 'rgba(245,232,211,0.96)', fontSize: 14, lineHeight: 1.6, textAlign: 'center', fontFamily: 'var(--f-sans)', margin: 0 }}>{stories['Frame 1.svg']}</p>
                  </div>
                )}
              </div>

              {/* Frame 17  -  bottom right, more square */}
              <div style={{ position: 'relative', borderRadius: 0, overflow: 'hidden', background: '#FAFCE1', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <img src={`/illustrations/Frame 17.svg?v=${Date.now()}`} alt="Couple illustration" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
              </div>
            </div>

            {/* ── ROW 2: Frame 285 (larger rect) + Frame 60 (smaller square) ── */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1.5fr 1fr',
              gap: '16px',
              marginBottom: 16,
              height: '500px',
            }}>
              <div style={{ position: 'relative', borderRadius: 0, overflow: 'hidden', background: '#FFF1F1', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <img src={`/illustrations/Frame 285.svg?v=${Date.now()}`} alt="Embroidered cocktail napkins" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
                {stories['Frame 285.svg'] && (
                  <div
                    style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.3s ease', padding: '20px', borderRadius: 0 }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = '1' }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = '0' }}
                  >
                    <p style={{ color: 'rgba(245,232,211,0.96)', fontSize: 14, lineHeight: 1.6, textAlign: 'center', fontFamily: 'var(--f-sans)', margin: 0 }}>{stories['Frame 285.svg']}</p>
                  </div>
                )}
              </div>
              <div style={{ position: 'relative', borderRadius: 0, overflow: 'hidden', background: '#FAFFFE', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '15%', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <img src={`/illustrations/Frame 60.svg?v=${Date.now()}`} alt="Cocktail napkins" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
                {stories['Group 60.svg'] && (
                  <div
                    style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.3s ease', padding: '20px', borderRadius: 0 }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = '1' }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = '0' }}
                  >
                    <p style={{ color: 'rgba(245,232,211,0.96)', fontSize: 14, lineHeight: 1.6, textAlign: 'center', fontFamily: 'var(--f-sans)', margin: 0 }}>{stories['Group 60.svg']}</p>
                  </div>
                )}
              </div>
            </div>

            {/* ── ROW 3: Frame 281 (cowboys) full width ── */}
            <div style={{
              marginBottom: 16,
              perspective: '1000px',
              position: 'relative',
              filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.06))',
            }}>
              <div style={{
                position: 'relative',
                width: '100%',
                transformStyle: 'preserve-3d',
                transition: 'transform 0.6s',
                transform: flippedCards['Frame 281.svg'] ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}>
                <img src={`/illustrations/Frame 281.svg?v=${Date.now()}`} alt="Cowboys front" style={{ width: '100%', height: 'auto', display: 'block', backfaceVisibility: 'hidden' }} />
                <img src={`/illustrations/Frame 286.svg?v=${Date.now()}`} alt="Cowboys back" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain', display: 'block', backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }} />
              </div>
              {stories['Frame 281.svg'] && (
                <div
                  style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.3s ease', padding: '20px', cursor: 'default' }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = '1' }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = '0' }}
                >
                  <p style={{ color: 'rgba(245,232,211,0.96)', fontSize: 14, lineHeight: 1.6, textAlign: 'center', fontFamily: 'var(--f-sans)', margin: 0 }}>{stories['Frame 281.svg']}</p>
                </div>
              )}
            </div>

            {/* ── ROW 4: Frame 284 (smaller left) + Group 397 (larger right) ── */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '0.7fr 1.3fr',
              gap: '16px',
              marginBottom: 16,
              height: '500px',
            }}>
              <div style={{ position: 'relative', overflow: 'hidden', background: '#858DA3', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <img src={`/illustrations/Frame 284.svg?v=${Date.now()}`} alt="Wedding illustration" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
              </div>
              <div style={{ position: 'relative', overflow: 'hidden', background: '#FFF7E5', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <img src={`/illustrations/Group 397.svg?v=${Date.now()}`} alt="Canvas bags" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
                {stories['Group 397.svg'] && (
                  <div
                    style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.3s ease', padding: '20px' }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = '1' }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = '0' }}
                  >
                    <p style={{ color: 'rgba(245,232,211,0.96)', fontSize: 14, lineHeight: 1.6, textAlign: 'center', fontFamily: 'var(--f-sans)', margin: 0 }}>{stories['Group 397.svg']}</p>
                  </div>
                )}
              </div>
            </div>
            {/* ── ROW 5: front2 (smaller left) + Frame (larger right), both flip ── */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '0.65fr 1fr',
              gap: '16px',
              marginBottom: 16,
              aspectRatio: '1.6',
            }}>
              {/* front2  -  flip card, zoomed out */}
              <div style={{
                perspective: '1000px',
                position: 'relative',
                overflow: 'hidden',
                background: '#FFFEF5',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              }}>
                <div style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.6s',
                  transform: flippedCards['front2.svg'] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}>
                  <img
                    src={`/illustrations/front2.svg?v=${Date.now()}`}
                    alt="Wedding invite front"
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', backfaceVisibility: 'hidden', display: 'block' }}
                  />
                  <img
                    src={`/illustrations/back 2.svg?v=${Date.now()}`}
                    alt="Wedding invite back"
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', display: 'block' }}
                  />
                </div>
                {stories['front2.svg'] && (
                  <div
                    style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.3s ease', padding: '20px', cursor: 'default' }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = '1' }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = '0' }}
                  >
                    <p style={{ color: 'rgba(245,232,211,0.96)', fontSize: 14, lineHeight: 1.6, textAlign: 'center', fontFamily: 'var(--f-sans)', margin: 0 }}>{stories['front2.svg']}</p>
                  </div>
                )}
              </div>

              {/* Frame  -  flip card, same size as Row 1 left image */}
              <div style={{
                perspective: '1000px',
                position: 'relative',
                overflow: 'hidden',
                background: flippedCards['Frame.svg'] ? '#4373ED' : '#FFFEF5',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                transition: 'background 0.6s',
              }}>
                <div style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.6s',
                  transform: flippedCards['Frame.svg'] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}>
                  <img
                    src={`/illustrations/Frame.svg?v=${Date.now()}`}
                    alt="Sailboat front"
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', display: 'block', backfaceVisibility: 'hidden' }}
                  />
                  <img
                    src={`/illustrations/Frame2.svg?v=${Date.now()}`}
                    alt="Sailboat back"
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain', backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', display: 'block' }}
                  />
                </div>
                {stories['Frame.svg'] && (
                  <div
                    style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.3s ease', padding: '20px', cursor: 'default' }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = '1' }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = '0' }}
                  >
                    <p style={{ color: 'rgba(245,232,211,0.96)', fontSize: 14, lineHeight: 1.6, textAlign: 'center', fontFamily: 'var(--f-sans)', margin: 0 }}>{stories['Frame.svg']}</p>
                  </div>
                )}
              </div>
            </div>
            {/* ── ROW 6: Frame 3 (larger left) + Frame 5 (smaller right, zoomed out) ── */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1.3fr 0.7fr',
              gap: '16px',
              marginBottom: 16,
              height: '450px',
            }}>
              <div style={{ position: 'relative', overflow: 'hidden', background: '#FFECB9', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <img src={`/illustrations/Frame 3.svg?v=${Date.now()}`} alt="Baby shower keepsake" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
                {stories['Frame 3.svg'] && (
                  <div
                    style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.3s ease', padding: '20px' }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = '1' }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = '0' }}
                  >
                    <p style={{ color: 'rgba(245,232,211,0.96)', fontSize: 14, lineHeight: 1.6, textAlign: 'center', fontFamily: 'var(--f-sans)', margin: 0 }}>{stories['Frame 3.svg']}</p>
                  </div>
                )}
              </div>
              <div style={{ position: 'relative', overflow: 'hidden', background: '#344A53', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20%', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <img src={`/illustrations/Frame 5.svg?v=${Date.now()}`} alt="Pilates logo" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
                {stories['Frame 5.svg'] && (
                  <div
                    style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.3s ease', padding: '20px' }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = '1' }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = '0' }}
                  >
                    <p style={{ color: 'rgba(245,232,211,0.96)', fontSize: 14, lineHeight: 1.6, textAlign: 'center', fontFamily: 'var(--f-sans)', margin: 0 }}>{stories['Frame 5.svg']}</p>
                  </div>
                )}
              </div>
            </div>

            {/* ── ROW 7: Frame 7 + Group 62 ── */}
            <div style={{
              display: 'flex',
              gap: '16px',
              marginBottom: 16,
              alignItems: 'stretch',
            }}>
              <div style={{ position: 'relative', overflow: 'hidden', background: '#F6F6FB', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', flex: '1 1 0' }}>
                <img src={`/illustrations/Frame 7.svg?v=${Date.now()}`} alt="Christmas card chairlift" style={{ width: '105%', height: 'auto', objectFit: 'cover', display: 'block', marginLeft: '-2.5%' }} />
                {stories['Frame 7.svg'] && (
                  <div
                    style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.3s ease', padding: '20px' }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = '1' }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = '0' }}
                  >
                    <p style={{ color: 'rgba(245,232,211,0.96)', fontSize: 14, lineHeight: 1.6, textAlign: 'center', fontFamily: 'var(--f-sans)', margin: 0 }}>{stories['Frame 7.svg']}</p>
                  </div>
                )}
              </div>
              <div style={{ position: 'relative', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', flexShrink: 0 }}>
                <img src={`/illustrations/Group 62.svg?v=${Date.now()}`} alt="College reunion itinerary" style={{ height: '700px', width: 'auto', objectFit: 'contain', display: 'block' }} />
                {stories['Group 62.svg'] && (
                  <div
                    style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.3s ease', padding: '20px' }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = '1' }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = '0' }}
                  >
                    <p style={{ color: 'rgba(245,232,211,0.96)', fontSize: 14, lineHeight: 1.6, textAlign: 'center', fontFamily: 'var(--f-sans)', margin: 0 }}>{stories['Group 62.svg']}</p>
                  </div>
                )}
              </div>
            </div>
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
