import Nav from '../components/Nav.jsx'

export default function About() {
  return (
    <div>
      <Nav />
      <main className="page">

        {/* ── HEADER ── */}
        <section className="page-section" style={{ paddingBottom: 0 }}>
          <div className="section-spread" style={{ marginBottom: 24 }}>
            <span className="eyebrow">About</span>
            <span className="rule" />
          </div>
          <div className="about-header-layout">
            <p className="about-header-bio">
              Product Designer with 10+ years of experience across enterprise financial services, project management, and leadership. Specialized in deconstructing complex institutional workflows into highly efficient and simple user experiences. Proven track record of leveraging user insights to drive operational efficiency and deliver data-driven solutions in high-stakes environments.
            </p>
            <div className="about-contact-pills">
              <a href="mailto:kmkerney221@gmail.com">kmkerney221@gmail.com</a>
              <a href="https://www.linkedin.com/in/kristin-garza" target="_blank" rel="noreferrer">linkedin.com/in/kristin-garza</a>
              <span>Austin, TX</span>
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
                    { title: 'Product Design & Strategy', body: 'Problem framing, designing data-dense enterprise workflows, information architecture, and scalable UX patterns.' },
                    { title: 'Execution & Craft', body: 'User research, usability testing (UserTesting, Qualtrics), and translating complex insights into validated product decisions.' },
                    { title: 'Research & Insights', body: 'High-fidelity prototyping (Figma), interaction design, and ensuring accessibility and usability best practices.' },
                    { title: 'AI-Augmented & Technical Workflows', body: 'AI-augmented design (Claude, Lovable), rapid prototyping (Vercel), and front-end development fundamentals (HTML/CSS).' },
                    { title: 'Systems Thinking', body: 'Architecting solutions across fragmented enterprise ecosystems using Service Blueprinting to map end-to-end user journeys against technical constraints.' },
                    { title: 'Regulatory & Compliance UX', body: 'Designing within rigid financial regulatory constraints (FINRA/SEC); managing secure Identity & Access Management (IAM) and authentication workflows.' },
                    { title: 'Collaboration & Product Delivery', body: 'Agile delivery (JIRA, Confluence), cross-functional leadership, and data-informed decision-making via Adobe Analytics.' },
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
                      { label: 'Platform Ecosystem Strategy', body: 'Unified 15+ trading applications under a standardized design system, replacing legacy fragmentation with reusable atomic components. Reduced development overhead and accelerated speed-to-market while ensuring a cohesive, enterprise-wide platform experience.' },
                      { label: 'Strategic Leadership & Product Vision', body: 'Partnered with PM and Engineering leadership to align disparate trading squads under a unified roadmap; led the strategic prioritization of high-impact design efforts within technical and regulatory constraints to ensure the most valuable product enhancements were delivered first.' },
                      { label: 'Performance Optimization', body: 'Streamlined data-dense trading interfaces to reduce costly trade errors and service inquiries that burdened product, sales, and service teams. Transformed legacy bottlenecks into high-velocity workflows that increased user satisfaction and long-term platform loyalty.' },
                      { label: 'AI-Driven Delivery', body: 'Leveraged AI-augmented workflows to discover, build, and test more quickly for earlier stakeholder alignment and collaboration on complex, data-dense, and technical features.' },
                    ],
                  },
                  {
                    dates: '2021 – 2022',
                    title: 'UX Designer, Core Platform Utilities',
                    company: 'Fidelity Investments',
                    bullets: [
                      { label: 'User Research', body: 'Conducted targeted user research and usability testing to demystify opaque institutional workflows, translating qualitative findings into actionable design recommendations for platform-wide utilities including search, workflow management, security & authentication, and help systems.' },
                      { label: 'Cross-functional Leadership', body: 'Facilitated design thinking workshops that brought together developers, product owners, and user groups to foster a collaborative, user-centered product culture.' },
                      { label: 'Strategic Insights', body: 'Provided design leadership and visual strategy for internal and client-facing solutions, ensuring a seamless transition from legacy workflows to enhanced digital experiences.' },
                    ],
                  },
                  {
                    dates: '2021',
                    title: 'UX Design Immersive',
                    company: 'General Assembly',
                    bullets: [
                      { label: 'Intensive Career Transition', body: 'Completed a 1000+ hour immersive program with a dedicated outcomes focus, mastering the end-to-end product lifecycle from discovery to delivery.' },
                      { label: 'Sharper Sense (Client Consultancy)', body: 'Led a high-impact design sprint to define product strategy and core feature sets for a biotech company, delivering a full handoff of a high-fidelity prototyped site and strategic content that facilitated successful seed funding and initial launch.' },
                      { label: 'Epic Funds (Client Consultancy)', body: 'Led a comprehensive product discovery and redesign process for a private equity fund. Provided strategic consultation to determine optimal product-market fit between a promotional site and a functional technology platform, resulting in increased brand clarity and consumer engagement.' },
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
                      { label: 'Early UX Leadership', body: "Awarded 1st place in Fidelity's company-wide Process Improvement Competition for a user-centered redesign of the account re-registration process; advised mobile and web trading squads on design decisions via the Young Savvy Advisory Board." },
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

      </main>

      <footer className="site-foot" id="contact">
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
