import { useState } from 'react'
import Nav from '../components/Nav.jsx'

// Embedded contact form. Submitting composes a pre-filled email to Kristin via
// the visitor's mail client (mailto) — a real send with no backend required.
function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const onSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio inquiry — ${name || 'hello'}`)
    const body = encodeURIComponent(`${message}\n\n— ${name}${email ? ` · ${email}` : ''}`)
    window.location.href = `mailto:kmkerney221@gmail.com?subject=${subject}&body=${body}`
  }
  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <div className="contact-field-row">
        <label className="contact-field">
          <span>Name<span className="req">*</span></span>
          <input type="text" required value={name} onChange={e => setName(e.target.value)} placeholder="David Rose" />
        </label>
        <label className="contact-field">
          <span>Email<span className="req">*</span></span>
          <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="david@roseapothecary.com" />
        </label>
      </div>
      <label className="contact-field">
        <span>Message<span className="req">*</span></span>
        <textarea required rows={5} value={message} onChange={e => setMessage(e.target.value)} placeholder="Tell me a bit about what you're working on…" />
      </label>
      <button type="submit" className="btn btn--lg">Send message</button>
    </form>
  )
}

export default function About() {
  const [copied, setCopied] = useState(false)
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('kmkerney221@gmail.com')
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch { /* clipboard unavailable — no-op */ }
  }
  return (
    <div>
      <Nav />
      <main className="page">

        {/* ── HERO ── (shared page-hero format: eyebrow + light serif H1 + serif lede) */}
        <section className="page-section" style={{ paddingBottom: 0 }}>
          <div style={{ marginBottom: 24 }}>
            <span className="eyebrow">About</span>
          </div>
          <div className="about-header-layout">
            <div className="about-photo">
              <img src="/kristin-photo.png" alt="Kristin Garza" />
            </div>
            <div className="about-header-main">
              <h1 className="about-hero-title">Hi, I&apos;m Kristin.</h1>
              <p className="about-hero-lede">
                A Senior UX Designer who&apos;s spent the last 10 years thoughtfully untangling experiences that feel complex, daunting and burdensome and making them simple, approachable, and human — shaped by real needs and data, but guided by instinct and bold choices that challenge what&apos;s expected.
              </p>
              <div className="about-contact-pills">
                <span className="chip chip--neutral about-email-pill">
                  <a href="mailto:kmkerney221@gmail.com">kmkerney221@gmail.com</a>
                  <button
                    type="button"
                    className={`about-copy-btn${copied ? ' is-copied' : ''}`}
                    onClick={copyEmail}
                    aria-label={copied ? 'Email address copied' : 'Copy email address'}
                    title={copied ? 'Copied!' : 'Copy email'}
                  >
                    {copied ? (
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
                    ) : (
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                    )}
                  </button>
                </span>
                <a href="https://www.linkedin.com/in/kristin-garza" target="_blank" rel="noreferrer" className="chip chip--neutral">linkedin.com/in/kristin-garza</a>
                <span className="chip chip--neutral">Austin, TX</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── MAIN CONTENT ── */}
        <section className="page-section" style={{ paddingTop: 64 }}>
          <div className="about-body-grid">

            {/* ── LEFT: Skills + Education ── */}
            <div className="about-sidebar">

              {/* Skills */}
              <div style={{ marginBottom: 48 }}>
                <span className="eyebrow" style={{ display: 'block', marginBottom: 20 }}>Skills</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  {[
                    { title: 'Product Design & Strategy', body: 'Problem framing, defining product vision, simplifying data-dense workflows, information architecture, and scalable UX patterns.' },
                    { title: 'Execution & Craft', body: 'High-fidelity prototyping, interaction design, micro-interactions, and experiences that feel approachable, accessible, and enjoyable.' },
                    { title: 'Research & Insights', body: 'User interviews, usability testing (UserTesting, Qualtrics), synthesizing complex insights, and using them to guide clear, confident product decisions.' },
                    { title: 'AI-Augmented & Technical Workflows', body: 'Harnessing AI as a design partner to explore concepts faster within real constraints — prompting with design systems and technical requirements in mind, stress-testing clickable code prototypes, and using judgment, craft, and front-end fundamentals to choose which directions to pursue and what ultimately ships.' },
                    { title: 'Systems Thinking', body: 'Architecting solutions across fragmented enterprise ecosystems; service blueprinting end-to-end journeys against technical, regulatory, and organizational constraints.' },
                    { title: 'Regulatory & Compliance UX', body: 'Designing within strict financial regulations and sensitive client-data constraints, translating complex compliance and security requirements into experiences that feel clear, trustworthy, and human.' },
                    { title: 'Collaboration & Product Delivery', body: 'Agile delivery (JIRA, Confluence), partnering with cross-functional teams, and aligning stakeholders through clear narratives and user-informed decisions.' },
                  ].map(skill => (
                    <div key={skill.title}>
                      <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--clay-ink)', margin: '0 0 4px', fontFamily: 'var(--f-sans)' }}>{skill.title}</p>
                      <p style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.6, margin: 0 }}>{skill.body}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div>
                <span className="eyebrow" style={{ display: 'block', marginBottom: 20 }}>Education</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)', margin: '0 0 2px' }}>Human Centered Design Certificate</p>
                    <p style={{ fontSize: 13, color: 'var(--clay-ink)', margin: '0 0 1px', fontFamily: 'var(--f-mono)', letterSpacing: '0.02em' }}>Cornell University (Online) · 2025</p>
                  </div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)', margin: '0 0 2px' }}>BS Psychology  -  Cognitive Neuroscience</p>
                    <p style={{ fontSize: 13, color: 'var(--clay-ink)', margin: '0 0 1px', fontFamily: 'var(--f-mono)', letterSpacing: '0.02em' }}>University of Denver · 2014</p>
                    <p style={{ fontSize: 12, color: 'var(--ink-3)', margin: 0 }}>Magna Cum Laude</p>
                  </div>
                </div>
              </div>

            </div>

            {/* ── RIGHT: Experience ── */}
            <div className="about-experience-col">
              <span className="eyebrow" style={{ display: 'block', marginBottom: 32 }}>Experience</span>

              {/* Vertical timeline */}
              <div className="about-timeline" style={{ position: 'relative', paddingLeft: 28 }}>

                {/* Continuous vertical line */}
                <div className="about-timeline-line" style={{
                  position: 'absolute',
                  left: 5,
                  top: 8,
                  bottom: 8,
                  width: 1,
                  background: 'var(--hairline)',
                }} />

                {[
                  {
                    dates: '2022 – 2025',
                    title: 'Lead UX Designer, Trading',
                    company: 'Fidelity Investments',
                    bullets: [
                      { label: 'Platform Ecosystem Strategy', body: 'Unified 15+ trading applications under a standardized design system, replacing legacy fragmentation with reusable atomic components. Delivered a cohesive, human-centered platform experience while reducing development overhead and accelerating speed-to-market.' },
                      { label: 'Strategic Leadership & Product Vision', body: 'Partnered with PM and Engineering leadership to align disparate trading squads under a unified roadmap. Led prioritization of high-impact design work within technical and regulatory constraints, focusing on the flows that most improved client confidence and day-to-day usability.' },
                      { label: 'Performance Optimization', body: 'Redesigned data-dense trading interfaces to reduce costly trade errors and service inquiries that burdened product, sales, and service teams. Turned legacy bottlenecks into approachable, clear, high-velocity workflows that increased satisfaction and efficiency.' },
                      { label: 'AI-Driven Delivery', body: 'Leveraged AI-augmented workflows to explore concepts, prototype, and test more quickly, enabling earlier alignment on complex, technical features without sacrificing craft or clarity.' },
                    ],
                  },
                  {
                    dates: '2021 – 2022',
                    title: 'UX Designer, Core Platform Utilities',
                    company: 'Fidelity Investments',
                    bullets: [
                      { label: 'User Research', body: 'Conducted targeted user research and usability testing to understand complex institutional workflows, translating findings into clearer, more intuitive designs for platform-wide utilities (search, workflow management, security & authentication, help systems).' },
                      { label: 'Cross-functional Leadership', body: 'Facilitated design workshops with developers, product owners, and user groups to build shared understanding and keep complex decisions anchored in real user needs.' },
                      { label: 'Strategic Insights', body: 'Provided design leadership and visual strategy for internal and client-facing solutions, guiding teams through the transition from legacy workflows to more cohesive, human-centered digital experiences.' },
                    ],
                  },
                  {
                    dates: '2021',
                    title: 'UX Design Immersive',
                    company: 'General Assembly',
                    bullets: [
                      { label: 'Intensive Career Transition', body: 'Completed a 1000+ hour immersive program with a dedicated outcomes focus, mastering the end-to-end product lifecycle from discovery to delivery, with a focus on complex, multi-stakeholder problems.' },
                      { label: 'Sharper Sense (Client Consultancy)', body: 'Led a high-impact design sprint to define product strategy and core feature sets for a biotech company, delivering a full handoff of a high-fidelity prototyped site and strategic content that facilitated successful seed funding and initial launch.' },
                      { label: 'Epic Funds (Client Consultancy)', body: 'Led a comprehensive product discovery and redesign process for a private equity fund. Provided strategic consultation to determine optimal product-market fit between a promotional site and a functional technology platform, resulting in increased brand clarity and consumer engagement.' },
                      { label: 'Stakeholder Management', body: 'Developed and presented high-fidelity prototypes and research synthesis to local business partners, ensuring design solutions aligned with technical constraints and business goals.' },
                    ],
                  },
                  {
                    dates: '2014 – 2021',
                    title: 'Trading, Leadership, Operations & Project Management',
                    company: 'Fidelity Investments',
                    bullets: [
                      { label: 'Strategic Career Progression', body: 'Progressed through foundational roles from retail trading and brokerage operations to Agile project management, team leadership, and new employee onboarding.' },
                      { label: 'Service Design & Onboarding', body: 'Directed site-wide onboarding for 150+ new hires, redesigning the training user journey to drastically reduce speed-to-proficiency and improve employee engagement.' },
                      { label: 'Operational Strategy & Cost Savings', body: 'Delivered $1.2M in annual cost savings by re-engineering a 500-person operations workflow  -  utilizing systems thinking to define new performance metrics and career progressions.' },
                      { label: 'Early UX Leadership', body: "Awarded 1st place in Fidelity's company-wide Process Improvement Competition for a user-centered redesign of the account re-registration process; advised mobile and web trading squads on design decisions via the Young Savvy Advisory Board; attended and provided internal SME guidance at hackathon conference to help modernize an internal operations application." },
                    ],
                  },
                ].map((job, i, arr) => (
                  <div key={job.dates} style={{ position: 'relative', paddingBottom: i < arr.length - 1 ? 52 : 0 }}>

                    {/* Timeline node  -  centered on the 1px line at x=5 from container edge */}
                    <div style={{
                      position: 'absolute',
                      left: -28,
                      top: 6,
                      width: 11,
                      height: 11,
                      borderRadius: '50%',
                      background: 'var(--clay-ink)',
                      border: '2px solid var(--bg, #fff)',
                      boxShadow: '0 0 0 1px var(--clay-ink)',
                    }} />

                    {/* Date badge */}
                    <span style={{ fontSize: 12, fontFamily: 'var(--f-mono)', color: 'var(--ink-3)', letterSpacing: '0.06em', border: '1px solid var(--hairline)', borderRadius: 20, padding: '3px 10px', display: 'inline-block', marginBottom: 8 }}>{job.dates}</span>

                    <h3 style={{ fontFamily: 'var(--f-sans)', fontWeight: 600, fontSize: 17, color: 'var(--ink)', margin: '0 0 2px' }}>
                      {job.title} <span style={{ fontWeight: 400, color: 'var(--ink-3)' }}>| {job.company}</span>
                    </h3>
                    <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
                      {job.bullets.map(item => (
                        <p key={item.label} style={{ fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.65, margin: 0 }}>
                          <strong style={{ color: 'var(--ink-2)', fontWeight: 600 }}>{item.label}: </strong>{item.body}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}

              </div>

              {/* Download CTA */}
              <div className="about-resume-cta" style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid var(--hairline)' }}>
                <a href="/KristinGarzaResume.pdf" target="_blank" rel="noreferrer" className="btn btn--secondary">
                  Download resume →
                </a>
              </div>

            </div>
          </div>
        </section>

        {/* ── OUTSIDE OF WORK ── */}
        <section className="page-section" style={{ paddingTop: 0 }}>
          <div className="section-spread" style={{ marginBottom: 24 }}>
            <span className="eyebrow">Outside of Work</span>
            <span className="rule" />
          </div>
          <div className="about-fun">
            <p>Outside of work, I&apos;m happiest when I&apos;m with my family — my adventurous husband, our 7-month-old wild-child son, and our rambunctious furry daughter (our 10-year-old chocolate lab). We love sneaking away to the mountains to bike and ski, and to the coast of Maine to see family, friends, and the ocean.</p>
            <p>Travel is my reset: finding new places, meeting people along the way, and tracking down really good food wherever I land. Most recently, I spent the most incredible 10 days exploring the mountains and beaches of Mallorca with my husband and baby. Highly recommend!</p>
          </div>
          <div className="about-reel" aria-label="Photos from life outside of work">
            <div className="about-reel-track">
              {Array.from({ length: 20 }, (_, i) => (
                <img
                  key={i}
                  src={`/about-me/reel-${(i % 10) + 1}.jpg`}
                  alt=""
                  loading="lazy"
                  draggable="false"
                  aria-hidden={i >= 10 ? 'true' : undefined}
                />
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* ── CONTACT — embedded email form (full-bleed blue band) ── */}
      <section className="contact-band" id="contact">
        <div className="contact-inner">
          <div className="section-spread" style={{ marginBottom: 20 }}>
            <span className="eyebrow">Contact</span>
            <span className="rule" />
          </div>
          <h2 className="contact-title">Let&apos;s Chat</h2>
          <p className="contact-lede" style={{ marginBottom: 16 }}>I love connecting with other designers, builders, and entrepreneurs — especially if you&apos;re interested in:</p>
          <ul className="contact-list">
            <li>help with product design and custom illustrations</li>
            <li>career development</li>
            <li>collaboration on a side project</li>
            <li>discussing the current state of design, technology, and AI</li>
          </ul>
          <p className="contact-lede">Shoot me a message if you want to chat!</p>
          <ContactForm />
        </div>
      </section>

      <footer className="site-foot">
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
