import { useEffect } from 'react'
import Nav from '../components/Nav.jsx'
import styles from './AIDesign.module.css'

const quotes = [
  {
    lines: [
      '"This design process… we treat it as gospel. That\'s basically dead."',
      'Designers should focus more on "supporting implementation and execution."',
    ],
    source: 'Jenny Wen · Lenny\'s Podcast',
    url: 'https://www.lennysnewsletter.com/p/the-design-process-is-dead',
  },
  {
    lines: [
      'Teams risk defaulting to pattern selection instead of problem definition  -  choosing components instead of questioning intent.',
      "The opportunity isn't just to design faster  -  it's to design with clarity.",
    ],
    source: 'Addy Osmani · "Comprehension Debt"',
    url: 'https://addyosmani.com/blog/comprehension-debt/',
  },
  {
    lines: [
      "The first thing AI gives you is generic by definition  -  it's the average of everything it's seen.",
      "Taste is knowing what's good and being able to articulate why.",
    ],
    source: 'Dylan Field · Figma',
    url: 'https://www.lennysnewsletter.com/p/why-ai-makes-design-craft-and-quality-the-new-moat',
  },
]

const wideQuote = {
  label: 'Hypothesis',
  text: '"In a world where anyone can make anything  -  what matters is your ability to choose and curate what you make."',
  source: 'Jenny Wen · Hatch Conference 2025',
  url: 'https://www.youtube.com/watch?v=4u94juYwLLM',
}

const contentPieces = [
  { type: 'Podcast', typeColor: 'var(--clay-ink)', barColor: 'var(--clay)', title: 'The Design Process Is Dead', tldr: "Jenny Wen on Lenny's Podcast  -  why the traditional linear design process doesn't hold up in the AI era, and what's replacing it.", cta: 'Listen →', url: 'https://www.lennysnewsletter.com/p/the-design-process-is-dead' },
  { type: 'Article', typeColor: 'var(--slate-deep)', barColor: 'var(--slate)', title: 'Comprehension Debt', tldr: "Addy Osmani on the hidden cost of AI-generated code  -  the growing gap between what we produce and what we actually understand.", cta: 'Read →', url: 'https://addyosmani.com/blog/comprehension-debt/' },
  { type: 'Podcast', typeColor: 'var(--clay-ink)', barColor: 'var(--clay)', title: 'Claude Cowork for Designers', tldr: 'Patricia Reiners  -  five concrete workflows that change how designers work day-to-day: research synthesis, competitive analysis, flow specs, design system docs, and portfolio case studies.', cta: 'Listen →', url: 'https://podcasts.apple.com/us/podcast/152-claude-cowork-for-designers-in-30-min-5-real-workflows/id1480706373?i=1000761766238' },
  { type: 'Podcast', typeColor: 'var(--clay-ink)', barColor: 'var(--clay)', title: 'Taste Is Your Moat', tldr: "Figma CEO Dylan Field on why craft, taste, and judgment are the real differentiators as AI accelerates execution, and how designers become more essential, not less.", cta: 'Listen →', url: 'https://www.lennysnewsletter.com/p/why-ai-makes-design-craft-and-quality-the-new-moat' },
  { type: 'Article', typeColor: 'var(--slate-deep)', barColor: 'var(--slate)', title: 'A.I. Is Coming for Culture', tldr: 'Joshua Rothman in The New Yorker on what happens to meaning, taste, and shared cultural experience when machines can generate artifacts at scale.', cta: 'Read →', url: 'https://www.newyorker.com/magazine/2025/09/01/ai-is-coming-for-culture' },
  { type: 'Podcast', typeColor: 'var(--clay-ink)', barColor: 'var(--clay)', title: 'Hard Fork', tldr: "Kevin Roose and Casey Newton on the real-world implications of AI across industries  -  grounding the conversation in what's actually happening, not theory.", cta: 'Listen →', url: 'https://www.nytimes.com/column/hard-fork' },
  { type: 'Talk', typeColor: 'var(--ochre-ink)', barColor: 'var(--ochre)', title: 'Designing for Delight at Figma', tldr: 'Jenny Wen on how Figma\'s team approached moments of delight  -  and why "make people smile" is a valid design goal.', cta: 'Watch →', url: 'https://www.dive.club/deep-dives/jenny-wen' },
  { type: 'Substack', typeColor: 'var(--ochre-ink)', barColor: 'var(--ochre)', title: "Don't Trust the Process", tldr: "Jenny Wen on why rigid design process is holding teams back in the AI era  -  and why starting with a solution isn't heresy anymore.", cta: 'Read →', url: 'https://jennywen.substack.com/p/dont-trust-the-design-process' },
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

function QuoteIcon() {
  return (
    <svg
      viewBox="0 0 24 24" width="22" height="22" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      className={styles.quoteCardIcon}
      aria-hidden="true"
    >
      <path d="M9 18h6" />
      <path d="M10 21h4" />
      <path d="M12 3a6 6 0 0 0-4 10.5c.8.7 1.5 1.4 1.5 2.5v2h5v-2c0-1.1.7-1.8 1.5-2.5A6 6 0 0 0 12 3Z" />
    </svg>
  )
}

function QuoteCard({ lines, source, url, wide, label }) {
  return (
    <div className={`${styles.quoteCard} ${wide ? styles.wide : ''}`}>
      <QuoteIcon />
      {label && <p className={styles.quoteCardLabel}>{label}</p>}
      {lines.map((line, i) => (
        <p key={i} className={styles.quoteCardText}>{line}</p>
      ))}
      {url ? (
        <a href={url} target="_blank" rel="noreferrer" className={styles.quoteCardSource}>
          {source} <span>↗</span>
        </a>
      ) : (
        <span className={styles.quoteCardSource}>{source}</span>
      )}
    </div>
  )
}

function ContentCard({ type, typeColor, barColor, title, tldr, cta, url }) {
  return (
    <a href={url} target="_blank" rel="noreferrer" className={styles.contentCard}>
      <div className={styles.contentCardBar} style={{ background: barColor }} />
      <div className={styles.contentCardBody}>
        <p className={styles.contentCardType} style={{ color: typeColor }}>{type}</p>
        <p className={styles.contentCardTitle}>{title}</p>
        <p className={styles.contentCardTldr}>{tldr}</p>
        <span className={styles.contentCardCta}>{cta}</span>
      </div>
    </a>
  )
}

export default function AIDesign() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className={styles.page}>
      <Nav />

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div style={{ marginBottom: 24 }}>
            <span className="eyebrow">Content That Shapes My Thinking</span>
          </div>
          <h1 className={styles.heroTitle}>AI × Design.</h1>
          <p className={styles.heroSub}>
            A running collection of the ideas, talks, and articles shaping how I think about
            design in the age of AI  -  plus my own take on what's changing, what's not, and
            where the real value lives.
          </p>
        </div>
      </section>

      {/* ── MY TAKE ── */}
      <section className={styles.myTake}>
        <div className={styles.myTakeInner}>
          <div className={`${styles.sectionLabelWrap} ${styles.light}`}>
            <p className={styles.myTakeLabel}>My Take</p>
          </div>
          <blockquote className={styles.myTakeQuote}>
            Used well, AI is a genuine multiplier  -  compressing the distance between an
            idea and a testable solution, and freeing up space for deeper thinking. But
            used carelessly, it's just a faster way to produce the wrong thing. The real
            risk isn't slow execution  -  it's shipping AI slop: outputs that look finished
            but have lost the thread of why we were going in that direction in the first
            place. My job is to keep that thread intact  -  staying anchored to user needs
            and intent even as the tools accelerate everything around them.
          </blockquote>
        </div>
      </section>

      {/* ── WHERE I FOCUS ── */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionLabelWrap}>
            <p className={styles.sectionLabel}>Where I Focus</p>
          </div>
          <div>
            <h2 className={styles.sectionTitle}>
              The biggest risk in the AI era isn't slow execution.<br />
              It's <span className="accent" style={{ color: 'var(--clay)', fontStyle: 'italic' }}>comprehension debt</span>.
            </h2>
            <p className={styles.sectionBody}>
              AI has made it easy to generate interfaces  -  but much harder to maintain
              shared understanding. In complex systems, the biggest risk isn't slow execution  - 
              it's comprehension debt: shipping solutions that work, but that no one can fully
              explain or evolve.
            </p>
            <p className={styles.sectionBody}>
              My role as a designer is to reduce that risk  -  by designing not just screens, but
              clarity: aligning teams around intent, making decisions explicit, and ensuring
              the system holds together as it scales.
            </p>
          </div>
        </div>
      </section>

      {/* ── IDEAS I KEEP COMING BACK TO ── */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionLabelWrap}>
            <p className={styles.sectionLabel}>Ideas I Keep Coming Back To</p>
          </div>
          <div className={styles.quoteGrid}>
            {quotes.map((q, i) => (
              <QuoteCard key={i} lines={q.lines} source={q.source} url={q.url} />
            ))}
            <QuoteCard
              lines={[wideQuote.text]}
              source={wideQuote.source}
              label={wideQuote.label}
              url={wideQuote.url}
              wide
            />
          </div>
        </div>
      </section>

      {/* ── CONTENT CAROUSEL ── */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionLabelWrap}>
            <p className={styles.sectionLabel}>How AI Is Reshaping Design</p>
          </div>
          <div>
            <p className={styles.carouselHint}>Scroll → for the pieces I keep coming back to</p>
            <div className={styles.carousel}>
              {contentPieces.map((p, i) => (
                <ContentCard key={i} {...p} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VOICES I FOLLOW ── */}
      <section className={styles.section} style={{ borderBottom: 'none' }}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionLabelWrap}>
            <p className={styles.sectionLabel}>Voices I Follow</p>
          </div>
          <div>
            <p className={styles.sectionBody} style={{ marginBottom: 28 }}>
              If you're thinking about AI × design too, here are the people and publications keeping me sharp.
            </p>
            <div className={styles.voicesPills}>
              {voices.map(v => (
                <a key={v.name} href={v.url} target="_blank" rel="noreferrer" className={styles.voicePill}>
                  {v.name}
                  <span className={styles.voicePillArrow}>↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <nav className="cs-case-nav" aria-label="Bits navigation">
        <a href="/illustrations" className="cs-case-nav-item cs-case-nav-item--prev">
          <span className="cs-case-nav-dir">← Previous</span>
          <span className="cs-case-nav-title">Line Art & Characters</span>
        </a>
      </nav>

      <footer className="site-foot" style={{ marginTop: 0 }}>
        <div className="inner">
          <p className="left">kristin.garza · UX Designer</p>
          <div className="right">
            <a href="https://www.linkedin.com/in/kristin-garza" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="mailto:kmkerney221@gmail.com">Email</a>
            <a href="/KristinGarzaResume.pdf" target="_blank" rel="noreferrer">Resume</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
