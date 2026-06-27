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
              Senior UX Designer with 10+ years of experience across enterprise financial services, product strategy, and leadership. I specialize in bringing clarity to complex institutional workflows and making data-dense tools feel simple, thoughtful, and human. My work is shaped by real needs and data but guided by instinct, bold choices, and design that challenges what's expected. My goal is to lower barriers, create momentum, and help people feel more capable, confident, and connected to what matters.
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
