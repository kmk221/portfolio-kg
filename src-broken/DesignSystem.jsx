import '../tokens.css'

/* ─────────────────────────────────────────────
   Design System Preview
   Renders every token and component class
   from tokens.css visually.
   Route: /design-system
   ───────────────────────────────────────────── */

function Section({ title, children }) {
  return (
    <section style={{ marginBottom: 80 }}>
      <div className="section-spread" style={{ marginBottom: 40 }}>
        <span className="eyebrow">{title}</span>
        <span className="rule" />
      </div>
      {children}
    </section>
  )
}

function Label({ children }) {
  return (
    <p style={{
      fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.12em',
      textTransform: 'uppercase', color: 'var(--ink-mute)', marginTop: 8, marginBottom: 0,
    }}>
      {children}
    </p>
  )
}

function Swatch({ bg, label, border }) {
  return (
    <div>
      <div style={{
        height: 64, borderRadius: 'var(--r-3)',
        background: bg,
        border: border || '1px solid rgba(0,0,0,0.06)',
      }} />
      <Label>{label}</Label>
    </div>
  )
}

export default function DesignSystem() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* ── Page header ── */}
      <div style={{
        borderBottom: '1px solid var(--hairline)',
        padding: '48px 64px 40px',
        background: 'var(--surface)',
      }}>
        <span className="eyebrow with-rule" style={{ marginBottom: 16, display: 'inline-flex' }}>
          kristin.garza
        </span>
        <h1 className="h-2" style={{ marginBottom: 8 }}>Design System</h1>
        <p className="small" style={{ color: 'var(--ink-3)' }}>
          Tokens, typography, components — the full living reference.
        </p>
      </div>

      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '80px 64px' }}>

        {/* ══════════════════════════ COLOR ══════════════════════════ */}
        <Section title="Color — Surfaces">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}>
            <Swatch bg="var(--bg)"        label="--bg  #FAF7F0" border="1px solid var(--hairline)" />
            <Swatch bg="var(--surface)"   label="--surface  #FFFFFF" border="1px solid var(--hairline)" />
            <Swatch bg="var(--surface-2)" label="--surface-2  #F2EBDB" />
            <Swatch bg="var(--hairline)"  label="--hairline  #E6DCC6" />
            <Swatch bg="var(--hairline-strong)" label="--hairline-strong  #C9BC9B" />
          </div>
        </Section>

        <Section title="Color — Ink">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            <Swatch bg="var(--ink)"      label="--ink  #1F1A0F" />
            <Swatch bg="var(--ink-2)"    label="--ink-2  #3D3322" />
            <Swatch bg="var(--ink-3)"    label="--ink-3  #6B5E45" />
            <Swatch bg="var(--ink-mute)" label="--ink-mute  #8A7C5E" />
          </div>
        </Section>

        <Section title="Color — Clay (primary accent)">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}>
            <Swatch bg="var(--clay)"      label="--clay  #9E644B" />
            <Swatch bg="var(--clay-deep)" label="--clay-deep  #C47655" />
            <Swatch bg="var(--clay-ink)"  label="--clay-ink  #8E4A2E" />
            <Swatch bg="var(--clay-tint)" label="--clay-tint  #F2DCD0" />
            <Swatch bg="var(--clay-edge)" label="--clay-edge  #D9AC97" />
          </div>
        </Section>

        <Section title="Color — Ochre">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            <Swatch bg="var(--ochre)"      label="--ochre  #BF933F" />
            <Swatch bg="var(--ochre-deep)" label="--ochre-deep  #7A5A1C" />
            <Swatch bg="var(--ochre-tint)" label="--ochre-tint  #F4E5C0" />
            <Swatch bg="var(--ochre-edge)" label="--ochre-edge  #D4A95C" />
          </div>
        </Section>

        <Section title="Color — Slate">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            <Swatch bg="var(--slate)"      label="--slate  #718C8F" />
            <Swatch bg="var(--slate-deep)" label="--slate-deep  #3E5F62" />
            <Swatch bg="var(--slate-tint)" label="--slate-tint  #A5BCBD" />
            <Swatch bg="var(--slate-edge)" label="--slate-edge  #8FAAAC" />
          </div>
        </Section>

        <Section title="Color — Utility">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            <Swatch bg="var(--focus)"     label="--focus  #2B4068" />
            <Swatch bg="var(--selection)" label="--selection  rgba(183,113,83,0.22)" border="1px solid var(--hairline)" />
          </div>
        </Section>

        {/* ══════════════════════════ TYPOGRAPHY ══════════════════════════ */}
        <Section title="Typography — Type Scale">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>

            {/* Display */}
            <div>
              <Label>.h-display — Crimson Pro 200, 48–80px, ls 20px</Label>
              <p className="h-display" style={{ marginTop: 8 }}>Display<span className="punct">.</span></p>
            </div>

            {/* Script */}
            <div>
              <Label>.h-script — Permanent Marker, 52–90px</Label>
              <p className="h-script" style={{ marginTop: 8 }}>Script</p>
            </div>

            {/* H1 */}
            <div>
              <Label>.h-1 — Crimson Pro 400, 44–80px</Label>
              <p className="h-1" style={{ marginTop: 8 }}>Heading One</p>
            </div>

            {/* H2 */}
            <div>
              <Label>.h-2 — Crimson Pro 300, 28–40px</Label>
              <p className="h-2" style={{ marginTop: 8 }}>Heading Two — Thoughtful, measured, clear</p>
            </div>

            {/* H3 */}
            <div>
              <Label>.h-3 — Plus Jakarta Sans 600, 18px</Label>
              <p className="h-3" style={{ marginTop: 8 }}>Heading Three — UI section label</p>
            </div>

            {/* Editorial */}
            <div>
              <Label>.editorial — Crimson Pro italic 300</Label>
              <p className="editorial" style={{ fontSize: 24, marginTop: 8 }}>Editorial voice — a quieter, slower read</p>
            </div>

            {/* Body */}
            <div>
              <Label>.body — Plus Jakarta Sans 400, 16px, lh 1.65</Label>
              <p className="body" style={{ marginTop: 8, maxWidth: 640 }}>
                Body text is set in Plus Jakarta Sans at 16px with a line-height of 1.65. It reads clearly at normal reading distances and scales gracefully on mobile. Color is <code>--ink-2</code>.
              </p>
            </div>

            {/* Small */}
            <div>
              <Label>.small — 13px, lh 1.5, --ink-3</Label>
              <p className="small" style={{ marginTop: 8 }}>Small text — captions, metadata, secondary labels</p>
            </div>

            {/* Caption */}
            <div>
              <Label>.caption — 12px, lh 1.4, --ink-mute</Label>
              <p className="caption" style={{ marginTop: 8 }}>Caption — figure annotations, timestamps, footnotes</p>
            </div>

            {/* Mono */}
            <div>
              <Label>.mono — JetBrains Mono, 12px</Label>
              <p className="mono" style={{ marginTop: 8, color: 'var(--ink-2)' }}>
                Mono — 0xABCD1234 · api_key · const TOKEN = "eyJhb..."
              </p>
            </div>

          </div>
        </Section>

        <Section title="Typography — Eyebrow">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

            <div>
              <Label>.eyebrow — JetBrains Mono 500, 13px, 0.16em ls, --clay</Label>
              <div style={{ marginTop: 12 }}>
                <span className="eyebrow">Eyebrow label</span>
              </div>
            </div>

            <div>
              <Label>.eyebrow.with-rule — adds a 56px trailing hairline</Label>
              <div style={{ marginTop: 12 }}>
                <span className="eyebrow with-rule">Eyebrow with rule</span>
              </div>
            </div>

            <div>
              <Label>.section-spread — eyebrow + full-width rule (layout pattern)</Label>
              <div className="section-spread" style={{ marginTop: 12 }}>
                <span className="eyebrow">Section label</span>
                <span className="rule" />
              </div>
            </div>

          </div>
        </Section>

        {/* ══════════════════════════ SPACING ══════════════════════════ */}
        <Section title="Spacing Scale">
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-end' }}>
            {[
              { v: '--s-1', px: 4 },
              { v: '--s-2', px: 8 },
              { v: '--s-3', px: 12 },
              { v: '--s-4', px: 16 },
              { v: '--s-5', px: 24 },
              { v: '--s-6', px: 32 },
              { v: '--s-7', px: 48 },
              { v: '--s-8', px: 64 },
              { v: '--s-9', px: 96 },
              { v: '--s-10', px: 128 },
            ].map(({ v, px }) => (
              <div key={v} style={{ textAlign: 'center' }}>
                <div style={{
                  width: px, height: px, background: 'var(--clay-tint)',
                  border: '1px solid var(--clay-edge)', borderRadius: 2,
                  margin: '0 auto',
                }} />
                <Label>{v}<br />{px}px</Label>
              </div>
            ))}
          </div>
        </Section>

        {/* ══════════════════════════ RADIUS ══════════════════════════ */}
        <Section title="Border Radius">
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {[
              { v: '--r-1', r: '4px', label: '4px' },
              { v: '--r-2', r: '8px', label: '8px' },
              { v: '--r-3', r: '12px', label: '12px' },
              { v: '--r-4', r: '20px', label: '20px' },
              { v: '--r-pill', r: '999px', label: 'pill' },
            ].map(({ v, r, label }) => (
              <div key={v}>
                <div style={{
                  width: 80, height: 80,
                  background: 'var(--clay-tint)',
                  border: '1px solid var(--clay-edge)',
                  borderRadius: r,
                }} />
                <Label>{v}<br />{label}</Label>
              </div>
            ))}
          </div>
        </Section>

        {/* ══════════════════════════ SHADOWS ══════════════════════════ */}
        <Section title="Shadows">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {[
              { v: '--shadow-1', label: 'Subtle — hover lift' },
              { v: '--shadow-2', label: 'Card — resting state' },
              { v: '--shadow-3', label: 'Elevated — modal / overlay' },
            ].map(({ v, label }) => (
              <div key={v}>
                <div style={{
                  height: 80, background: 'var(--surface)',
                  borderRadius: 'var(--r-3)',
                  boxShadow: `var(${v})`,
                }} />
                <Label>{v}<br />{label}</Label>
              </div>
            ))}
          </div>
        </Section>

        {/* ══════════════════════════ COMPONENTS ══════════════════════════ */}
        <Section title="Components — Cards">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>

            {/* Clay card */}
            <div style={{
              padding: '24px 28px',
              background: 'var(--clay-tint)',
              border: '1px solid var(--clay-edge)',
              borderRadius: 'var(--r-3)',
            }}>
              <span className="eyebrow" style={{ marginBottom: 8, display: 'block' }}>Clay</span>
              <p className="small" style={{ color: 'var(--clay-ink)', margin: 0 }}>
                Primary accent card — callouts, highlights, reframes.
              </p>
            </div>

            {/* Ochre card */}
            <div style={{
              padding: '24px 28px',
              background: 'var(--ochre-tint)',
              border: '1px solid var(--ochre-edge)',
              borderRadius: 'var(--r-3)',
            }}>
              <span className="eyebrow" style={{ marginBottom: 8, display: 'block', color: 'var(--ochre)' }}>Ochre</span>
              <p className="small" style={{ color: 'var(--ink-3)', margin: 0 }}>
                Warm secondary — quotes, insights, research findings.
              </p>
            </div>

            {/* Slate card */}
            <div style={{
              padding: '24px 28px',
              background: 'var(--slate-tint)',
              border: '1px solid var(--slate-edge)',
              borderRadius: 'var(--r-3)',
            }}>
              <span className="eyebrow" style={{ marginBottom: 8, display: 'block', color: 'var(--slate-deep)' }}>Slate</span>
              <p className="small" style={{ color: 'var(--ink-3)', margin: 0 }}>
                Cool tertiary — shipped outcomes, system states, data.
              </p>
            </div>

            {/* Surface card */}
            <div style={{
              padding: '24px 28px',
              background: 'var(--surface)',
              border: '1px solid var(--hairline)',
              borderRadius: 'var(--r-3)',
              boxShadow: 'var(--shadow-2)',
            }}>
              <span className="eyebrow" style={{ marginBottom: 8, display: 'block' }}>Surface</span>
              <p className="small" style={{ color: 'var(--ink-3)', margin: 0 }}>
                Neutral card on --bg — default content container.
              </p>
            </div>

            {/* Surface-2 card */}
            <div style={{
              padding: '24px 28px',
              background: 'var(--surface-2)',
              border: '1px solid var(--hairline)',
              borderRadius: 'var(--r-3)',
            }}>
              <span className="eyebrow" style={{ marginBottom: 8, display: 'block' }}>Surface 2</span>
              <p className="small" style={{ color: 'var(--ink-3)', margin: 0 }}>
                Warm off-white — alternating sections, nested containers.
              </p>
            </div>

          </div>
        </Section>

        <Section title="Components — Pills & Tags">
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
            {[
              { label: 'Product Design', bg: 'var(--clay-tint)', border: 'var(--clay-edge)', color: 'var(--clay-ink)' },
              { label: 'Systems Thinking', bg: 'var(--clay-tint)', border: 'var(--clay-edge)', color: 'var(--clay-ink)' },
              { label: 'Design Systems', bg: 'var(--ochre-tint)', border: 'var(--ochre-edge)', color: 'var(--ochre)' },
              { label: 'Human-Centered UX', bg: 'var(--slate-tint)', border: 'var(--slate-edge)', color: 'var(--slate-deep)' },
              { label: 'AI-Augmented Design', bg: 'var(--clay-tint)', border: 'var(--clay-edge)', color: 'var(--clay-ink)' },
              { label: 'Shipped ✓', bg: 'var(--ochre-tint)', border: 'var(--ochre-edge)', color: 'var(--ochre)' },
            ].map(({ label, bg, border, color }) => (
              <span key={label} style={{
                fontFamily: 'var(--f-mono)',
                fontSize: 11, fontWeight: 500,
                letterSpacing: '0.08em',
                padding: '5px 14px', borderRadius: 'var(--r-pill)',
                background: bg, border: `1px solid ${border}`, color,
              }}>
                {label}
              </span>
            ))}
          </div>
        </Section>

        <Section title="Components — Buttons">
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
            <button style={{
              fontFamily: 'var(--f-mono)', fontSize: 12, fontWeight: 500,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              padding: '10px 24px', borderRadius: 'var(--r-2)',
              background: 'var(--clay)', color: 'var(--bg)',
              border: 'none', cursor: 'pointer',
            }}>
              Primary
            </button>
            <button style={{
              fontFamily: 'var(--f-mono)', fontSize: 12, fontWeight: 500,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              padding: '10px 24px', borderRadius: 'var(--r-2)',
              background: 'transparent', color: 'var(--clay)',
              border: '1px solid var(--clay-edge)', cursor: 'pointer',
            }}>
              Secondary
            </button>
            <button style={{
              fontFamily: 'var(--f-mono)', fontSize: 12, fontWeight: 500,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              padding: '10px 24px', borderRadius: 'var(--r-2)',
              background: 'var(--ink)', color: 'var(--bg)',
              border: 'none', cursor: 'pointer',
            }}>
              Dark
            </button>
          </div>
        </Section>

        <Section title="Components — Callout Patterns">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Reframe callout */}
            <div style={{
              padding: '24px 28px', borderRadius: 'var(--r-3)',
              background: 'var(--clay-tint)', border: '1px solid var(--clay-edge)',
              display: 'flex', gap: 16, alignItems: 'flex-start',
            }}>
              <span style={{ fontSize: 20, flexShrink: 0 }}>↳</span>
              <div>
                <p className="eyebrow" style={{ marginBottom: 6, display: 'block' }}>The Reframe</p>
                <p className="small" style={{ margin: 0, color: 'var(--ink-3)' }}>
                  Clay callout — used for key insights, design tensions, reframing moments.
                </p>
              </div>
            </div>

            {/* Quote callout */}
            <div style={{
              padding: '24px 28px', borderRadius: 'var(--r-3)',
              background: 'var(--ochre-tint)', border: '1px solid var(--ochre-edge)',
              borderLeft: '4px solid var(--ochre)',
            }}>
              <p className="editorial" style={{ fontSize: 18, marginBottom: 10 }}>
                "It works like a Honda Accord. Not the flashiest, but reliable every single day."
              </p>
              <span className="eyebrow" style={{ color: 'var(--ochre)', fontSize: 11 }}>
                Operations Manager, Custody firm
              </span>
            </div>

            {/* Slate callout */}
            <div style={{
              padding: '24px 28px', borderRadius: 'var(--r-3)',
              background: 'var(--slate-tint)', border: '1px solid var(--slate-edge)',
            }}>
              <p className="eyebrow" style={{ marginBottom: 6, display: 'block', color: 'var(--slate-deep)' }}>Shipped in V1</p>
              <p className="small" style={{ margin: 0, color: 'var(--ink-3)' }}>
                Slate callout — shipped outcomes, system states, confirmed results.
              </p>
            </div>

          </div>
        </Section>

        <Section title="Components — KG Mark (handwritten signature)">
          <div style={{ display: 'flex', gap: 48, alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <div>
              <span className="kg-mark kg-mark--xl" style={{ color: 'var(--clay)' }} aria-label="KG" />
              <Label>--xl · 320–720px</Label>
            </div>
            <div>
              <span className="kg-mark kg-mark--md" style={{ color: 'var(--clay)' }} aria-label="KG" />
              <Label>--md · 220–360px</Label>
            </div>
            <div>
              <span className="kg-mark kg-mark--sm" style={{ color: 'var(--clay)' }} aria-label="KG" />
              <Label>--sm · 124px</Label>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginTop: 24 }}>
            {['var(--clay)', 'var(--ochre)', 'var(--slate)', 'var(--ink)', 'var(--ink-mute)'].map(c => (
              <div key={c}>
                <span className="kg-mark kg-mark--sm" style={{ color: c }} aria-label="KG" />
                <Label>{c}</Label>
              </div>
            ))}
          </div>
        </Section>

        {/* Shadows */}
        <Section title="Shadows">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { token: '--shadow-1', label: 'Subtle lift — cards at rest', shadow: 'var(--shadow-1)' },
              { token: '--shadow-2', label: 'Hover / floating panels', shadow: 'var(--shadow-2)' },
              { token: '--shadow-3', label: 'Modals / elevated overlays', shadow: 'var(--shadow-3)' },
            ].map(({ token, label, shadow }) => (
              <div key={token} style={{ padding: '32px 28px', background: 'var(--surface)', borderRadius: 'var(--r-3)', boxShadow: shadow }}>
                <Label>{token}</Label>
                <p className="small" style={{ margin: '8px 0 0', color: 'var(--ink-3)' }}>{label}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Border Radii */}
        <Section title="Border Radii">
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-end' }}>
            {[
              { token: '--r-1', value: '4px' },
              { token: '--r-2', value: '8px' },
              { token: '--r-3', value: '12px' },
              { token: '--r-4', value: '20px' },
              { token: '--r-pill', value: '999px' },
            ].map(({ token, value }) => (
              <div key={token}>
                <div style={{ width: 64, height: 64, background: 'var(--clay-tint)', border: '1px solid var(--clay-edge)', borderRadius: `var(${token})` }} />
                <Label>{token} · {value}</Label>
              </div>
            ))}
          </div>
        </Section>

        {/* Spacing Scale */}
        <Section title="Spacing Scale">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { token: '--s-1', value: '4px' },
              { token: '--s-2', value: '8px' },
              { token: '--s-3', value: '12px' },
              { token: '--s-4', value: '16px' },
              { token: '--s-5', value: '24px' },
              { token: '--s-6', value: '32px' },
              { token: '--s-7', value: '48px' },
              { token: '--s-8', value: '64px' },
              { token: '--s-9', value: '96px' },
              { token: '--s-10', value: '128px' },
            ].map(({ token, value }) => (
              <div key={token} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: `var(${token})`, height: 16, minWidth: 4, background: 'var(--clay)', borderRadius: 2, flexShrink: 0 }} />
                <Label>{token} · {value}</Label>
              </div>
            ))}
          </div>
        </Section>

        {/* ══════════════════════════ TYPE FAMILIES ══════════════════════════ */}
        <Section title="Type Families">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
            {[
              { name: '--f-serif', aliases: '--f-display · --f-editorial · --f-display-serif · --f-slab', label: 'Crimson Pro', spec: 'Editorial serif — H1, H2, lede, voice', sample: 'Abcdefghijklmnopqrstuvwxyz', style: { fontFamily: 'var(--f-serif)', fontSize: 28, fontWeight: 300 } },
              { name: '--f-sans', aliases: '--f-ui', label: 'Plus Jakarta Sans', spec: 'Body + UI — all running text', sample: 'Abcdefghijklmnopqrstuvwxyz', style: { fontFamily: 'var(--f-sans)', fontSize: 22, fontWeight: 400 } },
              { name: '--f-mono', aliases: null, label: 'JetBrains Mono', spec: 'Eyebrow + data labels', sample: 'ABCDEFGHIJKLMNOPQRST 0123456789', style: { fontFamily: 'var(--f-mono)', fontSize: 16, fontWeight: 500, letterSpacing: '0.08em' } },
              { name: '--f-script', aliases: null, label: 'Permanent Marker', spec: 'Script accent — display use only', sample: 'Kristin', style: { fontFamily: 'var(--f-script)', fontSize: 32 } },
            ].map(({ name, aliases, label, spec, sample, style }) => (
              <div key={name} style={{ padding: '28px 32px', background: 'var(--surface)', border: '1px solid var(--hairline)', borderRadius: 'var(--r-3)' }}>
                <Label>{name} — {label}</Label>
                {aliases && <p style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.08em', color: 'var(--clay)', margin: '4px 0 0', textTransform: 'uppercase' }}>aliases: {aliases}</p>}
                <p style={{ ...style, margin: '12px 0 8px', color: 'var(--ink)' }}>{sample}</p>
                <p className="caption" style={{ margin: 0 }}>{spec}</p>
              </div>
            ))}
          </div>
        </Section>

      </div>
    </div>
  )
}
