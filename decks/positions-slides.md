# Well-Positioned — Slide Deck Outline

Designing in-flow positions context for institutional trading workflows.
**Kristin Garza · Lead UX Designer – Trading · 8 weeks (Q4 2025)**

---

## Slide 1 – Well-Positioned

- Lead UX Designer – Trading
- 8 weeks · Q4 2025
- Institutional trading platform · design systems
- Bringing account and position data to the moment it matters

**Visuals:** Selected horizontal-panel pattern (`LoFiHorizontal`) as the hero; or `featuredexample.png` (live multi-order ticket).

---

## Slide 2 – The cost of hidden context

- Positions data was buried or siloed across 10 trading apps
- Advisors ran a second monitor just to see their own holdings
- Trade errors here are a compliance and business risk, not a UX nit
- Brief was "fix one order ticket" — I reframed it to the platform

**Visuals:** Platform-audit collage (`positions.svg`, `orderentry.svg`, `oneview.svg`, `HOM.svg`); annotated `featuredexample.png`.

---

## Slide 3 – My role & scope

- Lead UX Designer; owned research → pattern → rollout
- Reframed a single-ticket fix into a reusable platform pattern
- Partnered with Product, Engineering, and the Design System team
- Built success measurement and event tracking in from day one

**Visuals:** `JourneyMap` (5-stage trader journey); scope / partners diagram.

---

## Slide 4 – The experience advisors lived in

- Audit found 10 apps, 5 patterns, 12+ usability issues
- Positions hid in bottom drawers — vertical, low-affordance
- Opening the drawer obscured the trade form and forced toggling
- Dense pages needed horizontal scroll just to scan holdings

**Visuals:** Annotated `featuredexample.png`; problem animations `AnimContextSwitch`, `AnimHiddenInfo`, `AnimCompeting`.

---

## Slide 5 – Discovery & key insights

- Four methods: platform audit, heuristics, SME interviews, journey map
- Everyone had invented the same workaround: positions on a 2nd monitor
- Three themes: low visibility, cognitive overload, structural conflict
- Positions is prerequisite context — not supplementary, on-demand content

**Visuals:** Insight cards (`visibility.svg`, `cognitiveover.svg`, `structural.svg`); SME pull quotes.

---

## Slide 6 – Five concepts, one direction

- Explored modal, floating, vertical, overlay, and horizontal cards
- Judged each on visibility, interaction cost, and space efficiency
- Horizontal cards won: scannable, zero-click, no competition
- Surfaced the 4–5 fields that matter, not all 12+ columns

**Visuals:** `LoFiHorizontal` (selected) beside `LoFiModal` / `LoFiFloating` / `LoFiVertical` / `LoFiOverlay`; `concepts/*.svg`.

---

## Slide 7 – The reframe that unlocked scale

- Shifted from "integrate the drawer" to "design an in-flow pattern"
- Principles: in-flow not on-demand; scan over dive
- Horizontal over vertical; hierarchy over density
- Designed context-agnostic — positions now, any dense data next

**Visuals:** Solution-principles panel; platform-scale "one decision → 10+ apps" diagram.

---

## Slide 8 – The solution: a positions panel

- A persistent horizontal panel beside the trade form
- Both visible at once — no toggling, no memory load
- Collapsible; scans many holdings with key fields first
- Built to design-system spec so any app can reuse it

**Visuals:** `LoFiHorizontal` full + narrow states; component-spec cards (`specs.svg`, `usage.svg`, `design.svg`).

---

## Slide 9 – Before & after

- **Before:** hidden drawer, vertical, obscures the order form
- **Before:** forces a choice between seeing positions and trading
- **After:** in-flow panel, horizontal, always in context
- **After:** positions and entry live side by side — no second monitor

**Visuals:** Legacy multi-order ticket vs. redesigned panel; `AnimCompeting` vs. `LoFiHorizontal`.

---

## Slide 10 – Measuring without analytics

- No mature analytics existed — so I defined the framework
- Proposed metrics: task completion, time-to-order, efficiency, tickets
- Baselined support tickets ~240/mo, targeting under 160/mo
- Specced event tracking into engineering handoff from day one

**Visuals:** Success-framework table; event-tracking spec (`order_entry_started` → `_completed`).

---

## Slide 11 – Outcomes & impact

- Pattern shipped across 10+ applications
- ~90% design-system coverage
- 10+ product teams aligned on one layout standard
- Formalized as an official DS component — no per-app rebuild

**Visuals:** Rollout phases (pilot → expand → scale → generalize); impact stat grid.

---

## Slide 12 – Reflection

- The best answer looked obvious only in hindsight
- A platform-scale diagram aligned stakeholders faster than metrics
- Reframing beat re-skinning — I changed the mental model, not the paint
- Pattern now extends to account, model, and compliance context

**Visuals:** Platform-impact diagram; contextual-data pattern roadmap.
