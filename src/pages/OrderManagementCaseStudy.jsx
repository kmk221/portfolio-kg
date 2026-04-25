import { useEffect, useRef, useState } from 'react'
import Nav from '../components/Nav.jsx'
import bodyHtml from './OrderManagementCaseStudy.body.html?raw'
import './OrderManagementCaseStudy.css'

/**
 * Order Management Case Study
 *
 * This page renders the full case study authored in OM-Case-Study.html.
 * The HTML body is imported as a raw string (via Vite's ?raw suffix) and
 * injected via dangerouslySetInnerHTML so the original markup, inline
 * styles, and animations render exactly as designed.
 *
 * The page is wrapped in a home-style radial-gradient ambient background
 * and introduced by a React-rendered hero (eyebrow + title + fadeUp pills)
 * that mirrors the home page's aesthetic. [data-reveal] sections in the
 * injected HTML fade up on scroll via the shared IntersectionObserver.
 *
 * The interactive "compare" lightbox (pre/post viewer) is implemented as
 * globally exposed functions on `window` so the inline onclick="..."
 * attributes inside the imported HTML continue to work. They are cleaned
 * up on unmount.
 */

// Chapter list for the sticky scrollspy rail. Each `id` matches the
// corresponding section's id in OrderManagementCaseStudy.body.html, and
// `label` is the rail label shown on desktop (≥1200px).
const CHAPTERS = [
  { id: 'ch-tldr',         label: 'tl;dr' },
  { id: 'ch-framing',      label: 'Context' },
  { id: 'ch-legacy',       label: 'Legacy' },
  { id: 'ch-research',     label: 'Research' },
  { id: 'ch-principles',   label: 'Principles' },
  { id: 'ch-main-surface', label: 'Main surface' },
  { id: 'ch-send-flow',    label: 'Send flow' },
  { id: 'ch-outcome',      label: 'Outcome' },
  { id: 'ch-pilot',        label: 'Pilot' },
  { id: 'ch-next',         label: "What's next" },
]

// Same hook used on the home page — adds .revealed to [data-reveal] elements
// once they cross 10% into the viewport.
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

export default function OrderManagementCaseStudy() {
  const pageRef = useScrollReveal()
  const chapterBarRef = useRef(null)
  const [activeChapter, setActiveChapter] = useState(CHAPTERS[0].id)
  const [navVisible, setNavVisible] = useState(false)

  useEffect(() => {
    // Scroll to top whenever this page mounts.
    window.scrollTo(0, 0)

    // --- Compare lightbox wiring (ported from the HTML's <script>) ---
    const pairs = {
      pilot:   { type: 'video', pre: '/om-assets/pre.mov',               post: '/om-assets/post.mov',              labels: ['Before', 'After']  },
      surface: { type: 'image', pre: '/om-assets/legacy-still.png',      post: '/om-assets/shipped-still.png',     labels: ['Legacy', 'Shipped'] },
      send:    { type: 'image', pre: '/om-assets/legacy-send-still.png', post: '/om-assets/shipped-send-still.png',labels: ['Legacy', 'Shipped'] },
    }
    let current = null

    const getEls = () => ({
      lb: document.getElementById('compareLightbox'),
      stage: document.getElementById('compareLightboxStage'),
      toggle: document.getElementById('compareLightboxToggle'),
    })

    const setActive = (mode) => {
      const { toggle } = getEls()
      if (!toggle) return
      toggle.querySelectorAll('button').forEach((b) => {
        const on = b.dataset.mode === mode
        b.style.background = on ? '#fff' : 'transparent'
        b.style.color = on ? '#1a1a1a' : '#fff'
      })
    }

    const setLabels = (labels) => {
      const { toggle } = getEls()
      if (!toggle) return
      const btns = toggle.querySelectorAll('button')
      if (btns[0]) btns[0].textContent = labels[0]
      if (btns[1]) btns[1].textContent = labels[1]
    }

    const render = (mode) => {
      if (!current) return
      const pair = pairs[current]
      const src = mode === 'pre' ? pair.pre : pair.post
      const { stage } = getEls()
      if (!stage) return
      stage.innerHTML = ''
      let el
      if (pair.type === 'video') {
        el = document.createElement('video')
        el.autoplay = true
        el.loop = true
        el.muted = true
        el.playsInline = true
        el.setAttribute('playsinline', '')
        el.style.cssText =
          'max-width:100%;max-height:100%;display:block;border-radius:10px;box-shadow:0 20px 60px rgba(0,0,0,0.6);background:#000;'
        const s = document.createElement('source')
        s.src = src
        s.type = 'video/mp4'
        el.appendChild(s)
        el.load()
      } else {
        el = document.createElement('img')
        el.src = src
        el.style.cssText =
          'max-width:100%;max-height:100%;display:block;border-radius:10px;box-shadow:0 20px 60px rgba(0,0,0,0.6);background:#fff;object-fit:contain;'
      }
      stage.appendChild(el)
      setActive(mode)
    }

    window.openCompare = (id, mode) => {
      if (!pairs[id]) return
      current = id
      setLabels(pairs[id].labels)
      render(mode || 'pre')
      const { lb } = getEls()
      if (!lb) return
      lb.style.display = 'flex'
      document.body.style.overflow = 'hidden'
    }

    window.switchCompare = (mode) => render(mode)

    window.closeCompare = () => {
      const { lb, stage } = getEls()
      if (lb) lb.style.display = 'none'
      if (stage) stage.innerHTML = ''
      current = null
      document.body.style.overflow = ''
    }

    // Clicking the lightbox backdrop (not the content) closes it.
    const onBackdropClick = (e) => {
      const { lb } = getEls()
      if (lb && e.target === lb) window.closeCompare()
    }

    // Keyboard: Esc closes, arrows switch.
    const onKey = (e) => {
      const { lb } = getEls()
      if (!lb || lb.style.display !== 'flex') return
      if (e.key === 'Escape') window.closeCompare()
      if (e.key === 'ArrowLeft') window.switchCompare('pre')
      if (e.key === 'ArrowRight') window.switchCompare('post')
    }

    // Wait a tick so the injected HTML (and #compareLightbox) exists in the DOM.
    const wireUp = () => {
      const { lb } = getEls()
      if (lb) lb.addEventListener('click', onBackdropClick)
      document.addEventListener('keydown', onKey)
    }
    const rafId = requestAnimationFrame(wireUp)

    return () => {
      cancelAnimationFrame(rafId)
      const { lb } = getEls()
      if (lb) lb.removeEventListener('click', onBackdropClick)
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      delete window.openCompare
      delete window.switchCompare
      delete window.closeCompare
    }
  }, [])

  // --- Tabs: reusable progressive-disclosure pattern ---
  // Finds every [data-om-tabs] group in the injected HTML, wires up click +
  // arrow-key navigation, plays the active video and pauses hidden ones.
  useEffect(() => {
    const cleanups = []

    const initTabGroup = (group) => {
      const tabs = Array.from(group.querySelectorAll('[data-om-tab]'))
      const panels = Array.from(group.querySelectorAll('[data-om-tabpanel]'))
      if (!tabs.length || !panels.length) return

      const setActive = (id) => {
        tabs.forEach((t) => {
          const on = t.dataset.omTab === id
          t.setAttribute('aria-selected', on ? 'true' : 'false')
          t.setAttribute('tabindex', on ? '0' : '-1')
        })
        panels.forEach((p) => {
          const on = p.dataset.omTabpanel === id
          if (on) {
            p.removeAttribute('hidden')
            const v = p.querySelector('video')
            if (v) { try { v.currentTime = 0; v.play() } catch (_) { /* no-op */ } }
          } else {
            p.setAttribute('hidden', '')
            const v = p.querySelector('video')
            if (v) { try { v.pause() } catch (_) { /* no-op */ } }
          }
        })
      }

      // Ensure first panel's video starts playing on mount (autoplay removed
      // from markup so we can control per-tab).
      const initiallyActive = tabs.find((t) => t.getAttribute('aria-selected') === 'true') || tabs[0]
      setActive(initiallyActive.dataset.omTab)

      const onClick = (e) => {
        const btn = e.currentTarget
        setActive(btn.dataset.omTab)
        btn.focus()
      }
      const onKey = (e) => {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft' && e.key !== 'Home' && e.key !== 'End') return
        e.preventDefault()
        const idx = tabs.indexOf(e.currentTarget)
        let next = idx
        if (e.key === 'ArrowRight') next = (idx + 1) % tabs.length
        if (e.key === 'ArrowLeft')  next = (idx - 1 + tabs.length) % tabs.length
        if (e.key === 'Home')       next = 0
        if (e.key === 'End')        next = tabs.length - 1
        const target = tabs[next]
        setActive(target.dataset.omTab)
        target.focus()
      }

      tabs.forEach((t) => {
        t.addEventListener('click', onClick)
        t.addEventListener('keydown', onKey)
      })

      cleanups.push(() => {
        tabs.forEach((t) => {
          t.removeEventListener('click', onClick)
          t.removeEventListener('keydown', onKey)
        })
      })
    }

    // Wait a frame so dangerouslySetInnerHTML content is in the DOM.
    const rafId = requestAnimationFrame(() => {
      document.querySelectorAll('[data-om-tabs]').forEach(initTabGroup)
    })

    return () => {
      cancelAnimationFrame(rafId)
      cleanups.forEach((fn) => fn())
    }
  }, [])

  // --- Expand cards: click peek to reveal more ---
  // Markup: <div data-om-expand-card> with .om-expand-trigger button +
  // .om-expand-content (initially [hidden]). Toggles aria-expanded, hidden,
  // and a data-open attribute used by the CSS for the "+" → "×" rotation.
  useEffect(() => {
    const cleanups = []

    const initExpandCard = (card) => {
      // Find the trigger + content as DIRECT children of this card so nested
      // expand-cards (a section-expand wrapping inner expand-cards) don't
      // hijack each other's elements.
      const trigger =
        card.querySelector(':scope > .om-expand-trigger') ||
        card.querySelector(':scope > .om-section-expand-trigger')
      const content =
        card.querySelector(':scope > .om-expand-content') ||
        card.querySelector(':scope > .om-section-expand-content')
      if (!trigger || !content) return

      const setOpen = (open) => {
        trigger.setAttribute('aria-expanded', open ? 'true' : 'false')
        card.setAttribute('data-open', open ? 'true' : 'false')
        if (open) content.removeAttribute('hidden')
        else content.setAttribute('hidden', '')
      }

      const onClick = () => {
        const open = trigger.getAttribute('aria-expanded') !== 'true'
        setOpen(open)
      }

      trigger.addEventListener('click', onClick)
      cleanups.push(() => trigger.removeEventListener('click', onClick))
    }

    const rafId = requestAnimationFrame(() => {
      document
        .querySelectorAll('[data-om-expand-card], [data-om-section-expand]')
        .forEach(initExpandCard)
    })

    return () => {
      cancelAnimationFrame(rafId)
      cleanups.forEach((fn) => fn())
    }
  }, [])

  // --- Chapter nav: scrollspy + visibility ---
  // Watches each chapter section. The "active" chapter is the topmost section
  // whose top has crossed ~30% down the viewport — i.e. the one the reader is
  // currently scrolling through. Nav fades in once the reader has scrolled
  // past the hero, and out once they reach the closing reflection.
  useEffect(() => {
    const sections = CHAPTERS
      .map((c) => document.getElementById(c.id))
      .filter(Boolean)
    if (!sections.length) return

    // Track each section's top relative to viewport. Recompute on scroll +
    // resize. We pick the last section whose top has crossed our threshold.
    const threshold = () => Math.max(140, window.innerHeight * 0.28)

    const update = () => {
      const t = threshold()
      let current = sections[0].id
      for (const s of sections) {
        const rect = s.getBoundingClientRect()
        if (rect.top - t <= 0) current = s.id
        else break
      }
      setActiveChapter((prev) => (prev === current ? prev : current))

      // Show nav once we're past the hero (~520px into the page) and hide
      // again once we're within ~600px of the bottom (the reflection coda).
      const scrollY = window.scrollY || window.pageYOffset
      const past = scrollY > 520
      const docH = document.documentElement.scrollHeight
      const viewH = window.innerHeight
      const nearBottom = scrollY + viewH > docH - 600
      setNavVisible(past && !nearBottom)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  // When the active chapter changes, auto-center its label inside the
  // bottom word bar (only relevant when the bar is the visible variant —
  // overflow scrolling kicks in when the labels exceed viewport width).
  useEffect(() => {
    const bar = chapterBarRef.current
    if (!bar) return
    const active = bar.querySelector('.is-active')
    if (!active) return
    const barRect = bar.getBoundingClientRect()
    const linkRect = active.getBoundingClientRect()
    const offset = (linkRect.left - barRect.left) - (barRect.width - linkRect.width) / 2
    bar.scrollTo({
      left: bar.scrollLeft + offset,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    })
  }, [activeChapter])

  // Smooth-scroll a chapter into view, accounting for the fixed top nav.
  const scrollToChapter = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    const navOffset = 88 // ≈ height of the top Nav so the section title isn't hidden
    const top = el.getBoundingClientRect().top + window.scrollY - navOffset
    window.scrollTo({
      top,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    })
  }

  // Hero pill tags — mirror the home page's fadeUp stagger.
  const heroPills = [
    { label: 'Research',       variant: 'blue' },
    { label: 'Strategy',       variant: 'gold' },
    { label: 'Product Design', variant: 'warm' },
    { label: 'Testing',        variant: 'blue' },
    { label: 'Shipped \u2713', variant: 'gold' },
  ]

  return (
    <div ref={pageRef} style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <Nav />

      {/* Sticky chapter nav — left rail at ≥1440px viewport.
          .is-visible only adds the fade-in once the reader is past the hero. */}
      <aside
        className={`om-chapter-nav${navVisible ? ' is-visible' : ''}`}
        aria-label="Case study chapters"
      >
        <ul className="om-chapter-nav-list">
          {CHAPTERS.map(({ id, label }) => (
            <li key={id}>
              <button
                type="button"
                className={`om-chapter-nav-link${activeChapter === id ? ' is-active' : ''}`}
                aria-current={activeChapter === id ? 'true' : undefined}
                onClick={() => scrollToChapter(id)}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Floating word bar — mid-viewport fallback (768–1439px). Same
          scrollspy state drives the active label; the bar scrolls
          horizontally if it overflows, with auto-centering on active. */}
      <aside
        ref={chapterBarRef}
        className={`om-chapter-bar${navVisible ? ' is-visible' : ''}`}
        aria-label="Case study chapter shortcuts"
      >
        <ul>
          {CHAPTERS.map(({ id, label }) => (
            <li key={id}>
              <button
                type="button"
                className={`om-chapter-bar-link${activeChapter === id ? ' is-active' : ''}`}
                aria-current={activeChapter === id ? 'true' : undefined}
                onClick={() => scrollToChapter(id)}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </aside>


      {/* Home-style ambient radial-gradient wrapper — same multi-color wash
          behind the hero + body content. The case study is ~4-5x taller than
          the home, so the 7-orb pattern used on home would leave visible
          cream gaps between bursts. Scaled up to 11 larger, softer orbs that
          cycle steel-blue → gold → terracotta down the full page length —
          keeps the wash continuous and the individual pops subtle. */}
      <div style={{
        background: `
          radial-gradient(1200px circle at 15% 2%, rgba(196, 207, 223, 0.42) 0%, transparent 35%),
          radial-gradient(1100px circle at 92% 8%, rgba(221, 179, 101, 0.34) 0%, transparent 32%),
          radial-gradient(1000px circle at 6% 18%, rgba(184, 103, 87, 0.26) 0%, transparent 30%),
          radial-gradient(1200px circle at 88% 26%, rgba(196, 207, 223, 0.30) 0%, transparent 32%),
          radial-gradient(950px circle at 18% 36%, rgba(221, 179, 101, 0.28) 0%, transparent 30%),
          radial-gradient(1100px circle at 82% 46%, rgba(184, 103, 87, 0.22) 0%, transparent 32%),
          radial-gradient(1000px circle at 8% 56%, rgba(196, 207, 223, 0.32) 0%, transparent 30%),
          radial-gradient(1150px circle at 92% 66%, rgba(221, 179, 101, 0.28) 0%, transparent 32%),
          radial-gradient(1050px circle at 12% 76%, rgba(184, 103, 87, 0.22) 0%, transparent 30%),
          radial-gradient(1100px circle at 88% 86%, rgba(196, 207, 223, 0.26) 0%, transparent 32%),
          radial-gradient(980px circle at 30% 96%, rgba(221, 179, 101, 0.24) 0%, transparent 28%),
          var(--cream)
        `,
      }}>
        {/* Home-style hero — eyebrow, big title with terracotta period, italic
            subtitle, and staggered fadeUp pills on the right. */}
        <section
          className="home-hero"
          style={{
            minHeight: 'auto',
            padding: '140px 80px 40px',
          }}
        >
          <div className="hero-content" style={{ alignItems: 'flex-start' }}>
            <div className="hero-text">
              <p className="hero-eyebrow">Case Study · Order Management</p>
              <h1
                className="hero-name"
                style={{
                  fontSize: 'clamp(36px, 5vw, 64px)',
                  letterSpacing: '-1px',
                  lineHeight: 1.08,
                  textTransform: 'none',
                  marginBottom: 18,
                  fontWeight: 300,
                }}
              >
                Killing the Big Idea<span>.</span>
              </h1>
              <p
                className="hero-title"
                style={{
                  fontSize: 'clamp(15px, 1.15vw, 17px)',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  lineHeight: 1.6,
                  letterSpacing: '0.01em',
                  color: 'rgba(55, 43, 11, 0.62)',
                  marginBottom: 0,
                  maxWidth: 540,
                }}
              >
                We explored the bold direction, let research kill it, and shipped the disciplined one — sometimes the most impactful design work is knowing what not to build.
              </p>
            </div>
            <div className="hero-pills">
              {heroPills.map(({ label, variant }, i) => (
                <span
                  key={label}
                  className={`hero-pill hero-pill--${variant}`}
                  style={{ animation: `fadeUp 0.5s ease ${0.8 + i * 0.1}s both` }}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* The original case study body — inline styles and animations
            preserved, retinted to the home palette via .om-page scoped vars. */}
        <div className="om-page" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
      </div>
    </div>
  )
}
