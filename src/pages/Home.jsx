import { Link } from 'react-router-dom'
import Nav from '../components/Nav.jsx'
import { useScrollReveal, useScrollRevealGroup } from '../hooks/useScrollReveal.js'
import styles from './Home.module.css'

// Hero illustration from Figma section 1:3
const heroIllustration = "https://www.figma.com/api/mcp/asset/8236ecda-43fb-452f-bc96-62873d0b703c"

export default function Home() {
  const projectGridRef = useScrollRevealGroup()
  const aboutRef = useScrollRevealGroup()

  return (
    <div className={styles.page}>
      <Nav />

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={`${styles.eyebrow} fade-up fade-up-delay-1`}>Product Design Portfolio</p>
          <h1 className={`${styles.heroTitle} fade-up fade-up-delay-2`}>
            Designing systems<br />
            <span className={styles.heroTitleLight}>that scale with people.</span>
          </h1>
          <p className={`${styles.heroSub} fade-up fade-up-delay-3`}>
            Lead UX Designer focused on complex data-dense workflows,<br />
            design systems, and institutional product experiences.
          </p>
        </div>
      </section>

      {/* ── WORK ── */}
      <section className={styles.work} id="work">
        <div className={styles.workHeader}>
          <p className={styles.sectionLabel}>Selected Work</p>
        </div>

        <div className={styles.projectGrid} ref={projectGridRef}>

          {/* ── PROJECT 1: Featured case study ── */}
          <Link to="/work/positions-case-study" data-reveal className={`${styles.projectCard} ${styles.projectCardFeatured}`}>
            <div className={styles.projectCardInner}>
              <div className={styles.projectMeta}>
                <span className={styles.projectTag}>UX Case Study</span>
                <span className={styles.projectTag}>Trading · Fintech</span>
              </div>
              <div className={styles.projectContent}>
                <h2 className={styles.projectTitle}>Surfacing Contextual Data at Scale</h2>
                <p className={styles.projectSub}>Designing in-flow context for institutional investing workflows</p>
                <div className={styles.projectDetails}>
                  <span>Lead UX Designer</span>
                  <span className={styles.dot}>·</span>
                  <span>8 weeks</span>
                  <span className={styles.dot}>·</span>
                  <span>Enterprise Platform</span>
                </div>
              </div>
              <div className={styles.projectArrow}>
                Read Case Study →
              </div>
            </div>
            <div className={styles.projectImageArea}>
              <div className={styles.projectImagePlaceholder}>
                <img
                  src="https://www.figma.com/api/mcp/asset/8236ecda-43fb-452f-bc96-62873d0b703c"
                  alt="Positions case study illustration"
                  className={styles.heroImg}
                />
              </div>
            </div>
          </Link>

          {/* ── PLACEHOLDER PROJECT 2 ── */}
          <div data-reveal data-reveal-delay="1" className={`${styles.projectCard} ${styles.projectCardComingSoon}`}>
            <div className={styles.projectCardInner}>
              <div className={styles.projectMeta}>
                <span className={styles.projectTag}>Coming Soon</span>
              </div>
              <div className={styles.projectContent}>
                <h2 className={styles.projectTitleMuted}>Next Case Study</h2>
                <p className={styles.projectSubMuted}>In progress — check back soon.</p>
              </div>
            </div>
          </div>

          {/* ── PLACEHOLDER PROJECT 3 ── */}
          <div data-reveal data-reveal-delay="2" className={`${styles.projectCard} ${styles.projectCardComingSoon}`}>
            <div className={styles.projectCardInner}>
              <div className={styles.projectMeta}>
                <span className={styles.projectTag}>Coming Soon</span>
              </div>
              <div className={styles.projectContent}>
                <h2 className={styles.projectTitleMuted}>Next Case Study</h2>
                <p className={styles.projectSubMuted}>In progress — check back soon.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className={styles.about} id="about">
        <div className={styles.aboutInner} ref={aboutRef}>
          <div className={styles.aboutLeft} data-reveal>
            <p className={styles.sectionLabel}>About</p>
            <h2 className={styles.aboutTitle}>
              I design for<br />
              <em>complexity</em> —<br />
              not despite it.
            </h2>
          </div>
          <div className={styles.aboutRight} data-reveal data-reveal-delay="1">
            <p className={styles.aboutBody}>
              I'm a Lead UX Designer specializing in data-dense, high-stakes product environments — institutional investing platforms, trading workflows, and design systems that serve tens of thousands of professionals.
            </p>
            <p className={styles.aboutBody}>
              My work sits at the intersection of information architecture, interaction design, and systems thinking. I care deeply about the moment when complexity becomes clarity.
            </p>
            <div className={styles.aboutStats}>
              <div className={styles.stat}>
                <span className={styles.statNum}>10+</span>
                <span className={styles.statLabel}>Applications impacted</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNum}>~90%</span>
                <span className={styles.statLabel}>Design system coverage</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNum}>10+</span>
                <span className={styles.statLabel}>Product teams aligned</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <p className={styles.footerName}>Your Name</p>
          <div className={styles.footerLinks}>
            <a href="mailto:kmkerney221@gmail.com">Email</a>
            <a href="https://www.linkedin.com/in/kristin-garza" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://read.cv" target="_blank" rel="noreferrer">Read.cv</a>
          </div>
          <p className={styles.footerCopy}>© 2025</p>
        </div>
      </footer>
    </div>
  )
}
