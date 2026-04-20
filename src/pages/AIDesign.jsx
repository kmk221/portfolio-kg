import { useEffect } from 'react'
import Nav from '../components/Nav.jsx'

const pageBg = '#3d3d42'
const cream = 'rgba(243,239,217,1)'
const creamGlass = 'rgba(243,239,217,0.05)'
const creamGlassHover = 'rgba(243,239,217,0.08)'
const creamBorder = 'rgba(243,239,217,0.09)'
const creamBorderHover = 'rgba(243,239,217,0.16)'
const textPrimary = '#f0ede6'
const textSecondary = 'rgba(213,209,201,0.6)'
const textMuted = 'rgba(213,209,201,0.45)'
const terracotta = '#d4a07a'
const blueLabel = 'rgba(160,173,192,0.7)'
const sideP = 'clamp(24px, 5vw, 48px)'
const contentW = '1100px'

const sec = (extra) => ({
  maxWidth: contentW, margin: '0 auto', padding: `0 ${sideP}`,
  position: 'relative', zIndex: 1, ...extra
})

const divider = { borderBottom: '1px solid rgba(243,239,217,0.06)' }

const glassCard = {
  background: creamGlass,
  backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
  border: `1px solid ${creamBorder}`,
  borderRadius: 14,
  boxShadow: '0 2px 20px rgba(0,0,0,0.06), inset 0 1px 0 rgba(243,239,217,0.05)',
  transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease, background 0.25s ease',
}

const quotes = [
  {
    lines: [
      '"This design process… we treat it as gospel. That\'s basically dead."',
      'Designers should focus more on "supporting implementation and execution."',
    ],
    source: 'Jenny Wen · Lenny\'s Podcast, "The Design Process Is Dead"',
    url: 'https://www.lennysnewsletter.com/p/the-design-process-is-dead',
  },
  {
    lines: [
      'Teams risk defaulting to pattern selection instead of problem definition — choosing components instead of questioning intent.',
      "The opportunity isn't just to design faster — it's to design with clarity. Making decisions explicit, systems understandable, and experiences coherent across the product.",
    ],
    source: 'Addy Osmani · "Comprehension Debt"',
    url: 'https://addyosmani.com/blog/comprehension-debt/',
  },
  {
    lines: [
      "The first thing AI gives you is generic by definition — it's the average of everything it's seen.",
      "Taste is knowing what's good and being able to articulate why.",
    ],
    source: 'Dylan Field · Figma',
    url: 'https://www.lennysnewsletter.com/p/why-ai-makes-design-craft-and-quality-the-new-moat',
  },
]
const wideQuote = {
  label: 'Hypothesis',
  text: '"In a world where anyone can make anything — what matters is your ability to choose and curate what you make."',
  source: 'Jenny Wen · Hatch Conference 2025',
  url: 'https://www.youtube.com/watch?v=4u94juYwLLM',
}

const contentPieces = [
  { type: 'Podcast', color: '#a07bc4', colorEnd: '#b89bd4', title: 'The Design Process Is Dead', tldr: "Jenny Wen on Lenny's Podcast — why the traditional linear design process doesn't hold up in the AI era, and what's replacing it. The episode that inspired this whole page.", cta: 'Listen →', url: 'https://www.lennysnewsletter.com/p/the-design-process-is-dead' },
  { type: 'Article', color: '#7a8fa8', colorEnd: '#a0b3c8', title: 'Comprehension Debt', tldr: "Addy Osmani on the hidden cost of AI-generated code — the growing gap between what we produce and what we actually understand.", cta: 'Read Article →', url: 'https://addyosmani.com/blog/comprehension-debt/' },
  { type: 'Podcast', color: '#8a7bb8', colorEnd: '#a896d1', title: 'Claude Cowork for Designers', tldr: 'Patricia Reiners on the Future of UX podcast — five concrete workflows that change how designers work day-to-day: research synthesis, competitive analysis, flow specs, design system docs, and portfolio case studies.', cta: 'Listen →', url: 'https://podcasts.apple.com/us/podcast/152-claude-cowork-for-designers-in-30-min-5-real-workflows/id1480706373?i=1000761766238' },
  { type: 'Podcast', color: '#7a6ba8', colorEnd: '#9887c4', title: 'Taste Is Your Moat', tldr: "Figma CEO Dylan Field on Lenny's Podcast — why craft, taste, and judgment are the real differentiators as AI accelerates execution, and how designers become more essential, not less.", cta: 'Listen →', url: 'https://www.lennysnewsletter.com/p/why-ai-makes-design-craft-and-quality-the-new-moat' },
  { type: 'Article', color: '#7a8fa8', colorEnd: '#a0b3c8', title: 'A.I. Is Coming for Culture', tldr: 'Joshua Rothman in The New Yorker on what happens to meaning, taste, and shared cultural experience when machines can generate artifacts at scale — and why human judgment still matters.', cta: 'Read Article →', url: 'https://www.newyorker.com/magazine/2025/09/01/ai-is-coming-for-culture' },
  { type: 'Podcast', color: '#5d6db0', colorEnd: '#8593c9', title: 'Hard Fork', tldr: "Kevin Roose and Casey Newton on the real-world implications of AI across industries — grounding the conversation in what's actually happening, not theory.", cta: 'Listen →', url: 'https://www.nytimes.com/column/hard-fork' },
  { type: 'Talk', color: '#c4a26e', colorEnd: '#dbb98a', title: 'Designing for Delight at Figma', tldr: 'Jenny Wen on how Figma\'s team approached moments of delight — and why "make people smile" is a valid design goal.', cta: 'Watch / Listen →', url: 'https://www.dive.club/deep-dives/jenny-wen' },
  { type: 'Substack', color: '#B17C5D', colorEnd: '#d4a07a', title: "Don't Trust the Process", tldr: "Jenny Wen's Substack post on why rigid design process is holding teams back in the AI era — and why starting with a solution isn't heresy anymore.", cta: 'Read on Substack →', url: 'https://jennywen.substack.com/p/dont-trust-the-design-process' },
]

const voices = [
  { name: "Lenny's Newsletter", url: 'https://www.lennysnewsletter.com/' },
  { name: 'The Rundown AI', url: 'https://www.therundown.ai/' },
  { name: 'Jenny Wen', url: 'http://jennywen.ca/' },
  { name: 'Dive Club', url: 'https://www.dive.club/' },
  { name: 'Patricia Reiners · Future of UX', url: 'https://podcasts.apple.com/us/podcast/future-of-ux-your-design-tech-and-user/id1480706373' },
  { name: 'a16z Podcast', url: 'https://a16z.com/podcasts/a16z-show/' },
  { name: 'Hard Fork · NYT', url: 'https://www.nytimes.com/column/hard-fork' },
  { name: 'NN/g AI Research', url: 'https://www.nngroup.com/topic/ai/' },
  { name: "Jakob Nielsen's Substack", url: 'https://jakobnielsenphd.substack.com/' },
  { name: 'Addy Osmani', url: 'https://addyosmani.com/' },
  { name: 'Design Observer', url: 'https://designobserver.com/' },
]

function QuoteCard({ text, lines, source, url, wide, label }) {
  const base = wide
    ? { ...glassCard, gridColumn: '1 / -1', background: 'rgba(212,160,122,0.06)', borderColor: 'rgba(212,160,122,0.12)' }
    : { ...glassCard }
  const quoteLines = lines || (text ? [text] : [])
  return (
    <div
      style={{ ...base, padding: 32, cursor: 'default', display: 'flex', flexDirection: 'column' }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-3px)'
        e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.15)'
        e.currentTarget.style.borderColor = wide ? 'rgba(212,160,122,0.2)' : creamBorderHover
        e.currentTarget.style.background = wide ? 'rgba(212,160,122,0.09)' : creamGlassHover
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = base.boxShadow
        e.currentTarget.style.borderColor = wide ? 'rgba(212,160,122,0.12)' : creamBorder
        e.currentTarget.style.background = wide ? 'rgba(212,160,122,0.06)' : creamGlass
      }}
    >
      <svg
        viewBox="0 0 24 24" width="28" height="28" fill="none"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        style={{ color: terracotta, opacity: 0.55, marginBottom: 14, display: 'block' }}
        aria-hidden="true"
      >
        <path d="M9 18h6" />
        <path d="M10 21h4" />
        <path d="M12 3a6 6 0 0 0-4 10.5c.8.7 1.5 1.4 1.5 2.5v2h5v-2c0-1.1.7-1.8 1.5-2.5A6 6 0 0 0 12 3Z" />
      </svg>
      {label && (
        <p style={{
          fontSize: 12, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase',
          color: terracotta, marginBottom: 14,
        }}>
          {label}
        </p>
      )}
      {quoteLines.map((line, i) => (
        <p
          key={i}
          style={{
            fontSize: 17, fontWeight: 500, lineHeight: 1.6, color: textPrimary,
            marginBottom: 16,
            paddingBottom: i < quoteLines.length - 1 ? 16 : 0,
            borderBottom: i < quoteLines.length - 1 ? '1px solid rgba(243,239,217,0.06)' : 'none',
          }}
        >
          {line}
        </p>
      ))}
      {url ? (
        <a
          href={url} target="_blank" rel="noreferrer"
          style={{
            fontSize: 13, color: blueLabel, fontWeight: 600, marginTop: 'auto',
            textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6,
            transition: 'color 0.2s ease',
            alignSelf: 'flex-start',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = terracotta }}
          onMouseLeave={e => { e.currentTarget.style.color = blueLabel }}
        >
          {source} <span style={{ fontSize: 11, opacity: 0.7 }}>↗</span>
        </a>
      ) : (
        <p style={{ fontSize: 13, color: blueLabel, fontWeight: 600, marginTop: 'auto' }}>{source}</p>
      )}
    </div>
  )
}

function ContentCard({ type, color, colorEnd, title, tldr, cta, url }) {
  return (
    <a
      href={url} target="_blank" rel="noreferrer"
      style={{
        ...glassCard, minWidth: 300, maxWidth: 300, scrollSnapAlign: 'start',
        overflow: 'hidden', textDecoration: 'none', color: 'inherit',
        display: 'flex', flexDirection: 'column',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.boxShadow = '0 20px 56px rgba(0,0,0,0.18)'
        e.currentTarget.style.borderColor = creamBorderHover
        e.currentTarget.style.background = creamGlassHover
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = glassCard.boxShadow
        e.currentTarget.style.borderColor = creamBorder
        e.currentTarget.style.background = creamGlass
      }}
    >
      <div style={{ height: 4, width: '100%', background: `linear-gradient(90deg, ${color}, ${colorEnd})` }} />
      <div style={{ padding: 28, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: colorEnd, marginBottom: 12, opacity: 0.85 }}>{type}</p>
        <p style={{ fontSize: 17, fontWeight: 700, color: textPrimary, marginBottom: 12, lineHeight: 1.4 }}>{title}</p>
        <p style={{ fontSize: 13, color: textMuted, lineHeight: 1.65, flex: 1 }}>{tldr}</p>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: terracotta, marginTop: 20 }}>{cta}</span>
      </div>
    </a>
  )
}

export default function AIDesign() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div style={{ background: pageBg, minHeight: '100vh', color: textSecondary, fontFamily: "'Inter', sans-serif", lineHeight: 1.6 }}>
      {/* Ambient glow */}
      <div style={{ position: 'fixed', top: -100, right: -180, width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(177,124,93,0.1) 0%, transparent 70%)', filter: 'blur(140px)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', bottom: 150, left: -120, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(144,161,185,0.08) 0%, transparent 70%)', filter: 'blur(140px)', pointerEvents: 'none', zIndex: 0 }} />

      <Nav />

      {/* Hero */}
      <div style={{ ...sec({ paddingTop: 120, paddingBottom: 80 }), ...divider }}>
        <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: terracotta, marginBottom: 16 }}>AI × Design</p>
        <h1 style={{ fontSize: 'clamp(32px, 4.5vw, 42px)', fontWeight: 700, lineHeight: 1.15, color: textPrimary, maxWidth: 700, marginBottom: 20 }}>
          The design process isn't dead<span style={{ color: terracotta }}>.</span><br />
          It just got a remix<span style={{ color: terracotta }}>.</span>
        </h1>
        <p style={{ fontSize: 18, color: textSecondary, maxWidth: 620, lineHeight: 1.7 }}>
          A running collection of the ideas, talks, and articles shaping how I think about
          design in the age of AI — plus my own take on what's changing, what's not, and
          where the real value lives.
        </p>
      </div>

      {/* My Take */}
      <div style={{ ...sec({ paddingTop: 80, paddingBottom: 80 }), ...divider }}>
        <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: blueLabel, marginBottom: 24 }}>My Take</p>
        <div style={{
          ...glassCard, padding: 44, borderRadius: 16,
        }}>
          <blockquote style={{
            fontSize: 'clamp(18px, 2.2vw, 22px)', fontWeight: 500, lineHeight: 1.7,
            color: textPrimary, maxWidth: 800,
            borderLeft: `3px solid ${terracotta}`, paddingLeft: 28,
            margin: 0,
          }}>
            AI compresses the design process — but it also introduces a new risk: we can
            generate solutions faster than we can understand them. That's why my focus
            isn't just on speed — it's on clarity. Ensuring that what we design is not
            only usable, but explainable, scalable, and grounded in a shared understanding
            across teams.
          </blockquote>
        </div>
      </div>

      {/* Quotes */}
      <div style={{ ...sec({ paddingTop: 80, paddingBottom: 80 }), ...divider }}>
        <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: blueLabel, marginBottom: 40 }}>Ideas I Keep Coming Back To</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {quotes.map((q, i) => <QuoteCard key={i} lines={q.lines} source={q.source} url={q.url} />)}
          <QuoteCard text={wideQuote.text} source={wideQuote.source} label={wideQuote.label} url={wideQuote.url} wide />
        </div>
      </div>

      {/* Where I Focus — deeper insight */}
      <div style={{ ...sec({ paddingTop: 80, paddingBottom: 80 }), ...divider }}>
        <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: blueLabel, marginBottom: 24 }}>Where I Focus</p>
        <div style={{
          ...glassCard, padding: 44, borderRadius: 16,
          background: 'rgba(212,160,122,0.05)', borderColor: 'rgba(212,160,122,0.1)',
        }}>
          <h2 style={{
            fontSize: 'clamp(22px, 2.6vw, 28px)', fontWeight: 700, lineHeight: 1.3,
            color: textPrimary, marginBottom: 24, maxWidth: 760,
          }}>
            The biggest risk in the AI era isn't slow execution<span style={{ color: terracotta }}>.</span><br />
            It's <span style={{ color: terracotta }}>comprehension debt</span>.
          </h2>
          <p style={{
            fontSize: 17, lineHeight: 1.75, color: textPrimary, maxWidth: 780, marginBottom: 18,
          }}>
            AI has made it easy to generate interfaces — but much harder to maintain
            shared understanding. In complex systems, the biggest risk isn't slow execution —
            it's comprehension debt: shipping solutions that work, but that no one can fully
            explain or evolve.
          </p>
          <p style={{
            fontSize: 17, lineHeight: 1.75, color: textPrimary, maxWidth: 780, margin: 0,
          }}>
            My role as a designer is to reduce that risk — by designing not just screens, but
            clarity: aligning teams around intent, making decisions explicit, and ensuring
            the system holds together as it scales.
          </p>
        </div>
      </div>

      {/* Content Carousel */}
      <div style={{ ...sec({ paddingTop: 80, paddingBottom: 80 }), ...divider }}>
        <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: blueLabel, marginBottom: 12 }}>How AI is reshaping design</p>
        <p style={{ fontSize: 15, color: textMuted, marginBottom: 36 }}>The talks, articles, and research shaping how I think about design in the age of AI — swipe through for the pieces I keep coming back to.</p>
        <div style={{
          display: 'flex', gap: 20, overflowX: 'auto',
          paddingBottom: 12, scrollSnapType: 'x mandatory',
        }}>
          {contentPieces.map((p, i) => <ContentCard key={i} {...p} />)}
        </div>
      </div>

      {/* Voices I Follow */}
      <div style={{ ...sec({ paddingTop: 80, paddingBottom: 80 }) }}>
        <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: blueLabel, marginBottom: 12 }}>Voices I Follow</p>
        <p style={{ fontSize: 15, color: textMuted, marginBottom: 36 }}>
          If you're thinking about AI × design too, here are the people and publications keeping me sharp.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          {voices.map(v => (
            <a
              key={v.name} href={v.url} target="_blank" rel="noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '10px 22px', borderRadius: 100,
                background: creamGlass,
                backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
                border: `1px solid ${creamBorder}`,
                fontSize: 14, fontWeight: 500, color: 'rgba(240,237,230,0.75)',
                textDecoration: 'none',
                boxShadow: 'inset 0 1px 0 rgba(243,239,217,0.04)',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(243,239,217,0.09)'
                e.currentTarget.style.borderColor = creamBorderHover
                e.currentTarget.style.transform = 'translateY(-1px)'
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.1), inset 0 1px 0 rgba(243,239,217,0.06)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = creamGlass
                e.currentTarget.style.borderColor = creamBorder
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(243,239,217,0.04)'
              }}
            >
              {v.name} <span style={{ color: 'rgba(160,173,192,0.45)', fontSize: 12 }}>↗</span>
            </a>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        padding: '48px', textAlign: 'center', position: 'relative', zIndex: 1,
        borderTop: '1px solid rgba(243,239,217,0.06)',
      }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'rgba(240,237,230,0.5)', marginBottom: 16 }}>
          kristin<span style={{ color: terracotta }}>.</span>garza · UX Designer
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24 }}>
          <a href="https://www.linkedin.com/in/kristin-garza" target="_blank" rel="noreferrer" style={{ fontSize: 13, color: 'rgba(213,209,201,0.4)', textDecoration: 'none' }}>LinkedIn</a>
          <a href="mailto:kmkerney221@gmail.com" style={{ fontSize: 13, color: 'rgba(213,209,201,0.4)', textDecoration: 'none' }}>Email</a>
          <a href="/resume.pdf" target="_blank" rel="noreferrer" style={{ fontSize: 13, color: 'rgba(213,209,201,0.4)', textDecoration: 'none' }}>Resume</a>
        </div>
      </footer>
    </div>
  )
}
