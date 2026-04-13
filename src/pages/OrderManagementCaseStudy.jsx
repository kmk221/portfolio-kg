import { useEffect } from 'react'
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
 * The interactive "compare" lightbox (pre/post viewer) is implemented as
 * globally exposed functions on `window` so the inline onclick="..."
 * attributes inside the imported HTML continue to work. They are cleaned
 * up on unmount.
 */
export default function OrderManagementCaseStudy() {
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

  return (
    <>
      <Nav />
      <div className="om-page" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
    </>
  )
}
