# Well-Positioned — Full Archival Deck

Verbatim archive of the live case study at `/case-study/positions`. All human-readable text reproduced in reading order. Code-drawn React components are noted as visuals but cannot be embedded as images.

---

## Slide 1 – Hero / Title

**Eyebrow:** Case Study · Trading Platform · Design Systems · 2025

# Well-Positioned

Designing in-flow context for institutional investing workflows—bringing account and position data to the moment it matters most.

**Chips:** Research · Strategy · Product Design · Design Systems

**Visuals:** High-fidelity hero mockup (code-drawn React) — an Order Entry Ticket app screen with inline Positions panel (top nav "🏠 Home / Menu ▾ / User Options ▾ / ↩ Sign Out"; left icon rail; Order Entry Ticket with Symbol AAPL, BUY/SELL, Quantity 120, Price Type Market ▾, Time in Force Day ▾, Cancel / Verify Order; Positions table with Symbol/Shares/Day % columns and rows AAPL 120 sh +2.4%, MSFT 85 sh +1.1%, GOOGL 40 sh -0.8%, NVDA 60 sh +5.2%, AMZN 30 sh +0.6%, JPM 90 sh -1.3%, TSLA 25 sh +3.1%; account header "Jane Smith · IRA · ****4821 · Live").

---

## Slide 2 – tl;dr

# tl;dr

**Context**

- Across 10 trading apps, essential positions data was buried or in separate tools
- Advisors relied on a second monitor just to see their own positions
- Brief: fix one order ticket; I reframed it to fix the platform

**Approach**

- Designed a horizontal positions panel that surfaced context without competing with the workflow
- Partnered with design system to formalize it as a reusable component, no per-app custom work
- Embedded success measurement and event tracking from day one

**Outcome**

- Pattern shipped across 10+ applications with ~90% design system coverage
- Aligned 10+ product teams on a single layout standard for dense workflows
- Gave advisors reliable, in-flow positions context where they needed it most

**Meta pills:** Lead UX Designer — Trading · 8 weeks (Q4 2025) · Product Design · Engineering · Product Management

**Visuals:** none (text section).

---

## Slide 3 – Framing

## impact + scale > convenience + speed

This work was initially planned as a routine feature lift-and-shift; bringing an existing positions drawer pattern from another order ticket into a new trading application. While this approach optimized for speed, early design exploration revealed that simply integrating the existing drawer into the new app would perpetuate significant discoverability and workflow issues that existed on the platform.

I led lightweight design explorations that reframed the problem from *how to integrate an existing component* to *how to design for efficient in-flow decision-making*. In partnership with product, design system, and development teams, we identified an opportunity to establish a simple yet impactful new solution that would scale beyond a single trade ticket and support a broader range of contextual utilities across the platform's data-dense workflows.

The goal wasn't to solve one ticket — it was to establish a pattern that wouldn't require custom work each time a new application needed positions context.

**Visuals:** none (text callout).

---

## Slide 4 – A note on measurement (Project Details)

**A note on measurement**

This project was completed in an environment without mature analytics infrastructure or established KPI frameworks for UX work. Quantitative instrumentation wasn't yet standard practice on this platform. Rather than treat this as an inevitable constraint, I defined and proposed a comprehensive measurement approach to guide future implementation and product decisions. The plan included a detailed success framework and measurement plan — in the **Measuring Success** section below.

**Visuals:** none (warning-icon callout).

---

## Slide 5 – Initial Problem Hypothesis

## Initial Problem Hypothesis

**The initial hypothesis was clear: positions data is critical to every trade decision, yet it remained hidden, secondary, or spatially competitive with the primary task.**

**Visuals:** none (text section).

---

## Slide 6 – Platform Audit (overview + featured example)

## Platform Audit

I conducted a comprehensive audit of all trading platform applications to document how positions data was currently surfaced across the ecosystem.

**Stats:** 10 — Applications Identified · 5 — Different Patterns · 12+ — Usability Issues

### Featured Example — Multi-Order Ticket · Featured Example · Bottom Drawer Pattern

**Critical Issues Identified**

- **Low Discoverability:** Viewing positions data begins workflow, but the trigger to open the drawer is hidden at the bottom of the page
- **Inefficient Use of Screen Space:** Drawer's shape allowed for viewing many details on a few positions when users actually needed a few key details on many positions
- **Unclear Trigger Component & Label:** Ambiguous trigger placement and text suggests navigation rather than in-page context
- **Obscures Primary Interface:** Opening drawer covers trade entry form — forces toggle behavior between positions and order entry

**Visuals:** `featuredexample.png` (Multi-Order Ticket featured example).

---

## Slide 7 – Platform Audit (per-app pattern breakdown)

**Positions App — Opened/Unrealized** · Full Page Application

- Separate application — no in-context viewing
- 12+ columns create information overload
- Horizontal scrolling required
- Poor scanability — all data equal weight

**Order Entry Tickets (6 apps)** · Bottom Drawer

- Low discoverability
- Unclear trigger component & label
- Competes with primary interface
- Can only see a few positions — vertical scrolling required

**OneView Monitor** · Small Tile

- Competes with other widgets for attention
- Size constraints limit breadth and depth of data shown
- Not contextual to certain decisions, yet widget is fixed in open state

**Held Orders Manager** · Fixed Side Panel

- Limited horizontal space reduces data density
- Always open — occupying key screen real-estate even when not needed

**Visuals:** `positions.svg`, `orderentry.svg`, `oneview.svg`, `HOM.svg`.

---

## Slide 8 – Platform Audit (findings)

**Summary**

Positions data had been architecturally positioned as supplementary, on-demand content — but was behaviorally used as essential, always-on context. The recurring theme across every application: vertical orientation, spatial competition, and hidden triggers.

**Behavioral Insight**

The most telling signal wasn't in any interview — it was behavioral: the majority of advisors had independently developed the same workaround: open positions in a separate window, position on a second monitor, and manually reference while entering trades. When users invent the same workaround independently, the design has already told them the answer. The solution needed to give users simultaneous access to both positions and the trade entry form — without the second monitor.

**Visuals:** none (finding callouts).

---

## Slide 9 – Heuristic Inspection

## Heuristic Inspection

Across these applications, a heuristic evaluation surfaced consistent violations that compounded into significant workflow friction for advisors.

**Forced Context Switching** — *Critical* — Recognition Rather than Recall
Advisors needed to remember positions data while navigating to and from the positions drawer, placing unnecessary load on working memory during complex trading tasks.

**Hidden Positions Information** — *High* — Visibility of System Status
Positions data was buried in collapsed drawers with minimal affordance. Users had no indication of what data was available or how to access it without prior knowledge.

**Competing Interface Elements** — *High* — User Control and Freedom
Bottom drawer competed with trade entry form for visual focus and screen space, creating an either/or choice when both were needed simultaneously.

**Key Finding**

The core issue was the structural model being used. Positions data had been treated as supplementary information accessed on demand, when it was actually prerequisite context for every trade. The design forced a choice between seeing positions and entering trades — two fundamentally interdependent tasks.

**Visuals:** `AnimContextSwitch` (code-drawn animation), `AnimHiddenInfo` (code-drawn animation), `AnimCompeting` (code-drawn animation).

---

## Slide 10 – SME Insights & Analytics

## SME Insights & Analytics

Quantitative analytics and qualitative SME interviews validated the findings from the platform audit and heuristic evaluation.

> "I always have positions open in a second monitor. There's no way I can trade without seeing what I already own."
> — Senior Trading Advisor, SME Interview

> "Every time I open that drawer I lose my place in the ticket. By the time I close it I've forgotten half of what I needed to check."
> — Advisor, Internal User Research

> "Most of our clients mention that they didn't even realize there was a way to view positions within the ticket itself until we show it to them."
> — Technology Consultant, Internal SME Interview

**Visuals:** none (quote blocks).

---

## Slide 11 – Journey Mapping (stages 1–3)

## Journey Mapping

**Stage 1 — Pre-Trade Research** · Emotion: Neutral

- Actions: Review client portfolio · Check current positions · Identify needs
- Pain Points: Positions in separate app · No integration with research tools

**Stage 2 — Decision Making** · Emotion: Concerned

- Actions: Calculate target allocations · Determine trades needed · Reference holdings
- Pain Points: Context switching between apps · Manual calculations

**Stage 3 — Orders Drafting** · Emotion: Frustrated

- Actions: Open trade ticket · Enter order details · Verify against positions
- Pain Points: Positions hidden in drawer · Can't see both simultaneously · Repeated toggling

**Visuals:** `JourneyMap` (interactive, code-drawn — tabbed stage selector, emotion arc, actions/pain-points detail panel).

---

## Slide 12 – Journey Mapping (stages 4–5)

**Stage 4 — Validation** · Emotion: Anxious

- Actions: Double-check order accuracy · Verify position impact · Confirm allocation
- Pain Points: Drawer obscures order form · Increased error risk

**Stage 5 — Execution** · Emotion: Relieved & Exhausted

- Actions: Submit orders · Monitor confirmation · Update records
- Pain Points: Uncertainty during submission · Post-trade verification needed

Caption: Stage X of 5 — click any stage to explore

**Visuals:** `JourneyMap` (interactive, code-drawn — continued).

---

## Slide 13 – Insight Synthesis

## Insight Synthesis

Across four research methods, three critical themes emerged consistently.

**Low Visibility**

- Low affordance — triggers appeared to navigate away rather than reveal content
- Positions buried below fold or behind interaction layers
- No persistent visual indicator that positions data was available
- Users unaware of the full scope of accessible data

**Cognitive Overload**

- Context switching created memory load at critical decision moments
- Users mentally juggling positions data while entering trade details
- Repeated toggling between views broke workflow momentum
- Flat data hierarchy made it hard to identify the most relevant positions

**Structural Conflict**

- Positions and trade entry competed for screen space
- Vertical orientation limited number of positions visible simultaneously
- Design treated positions as on-demand rather than in-flow information
- No single layout standard existed across the platform for this pattern

**Critical Insight**

The issues weren't isolated — they compounded. What appeared to be a simple discoverability problem was a structural mismatch. Fixing the drawer wouldn't solve it. The mental model needed to change: positions as essential, always-on context — not supplementary, on-demand content.

**Visuals:** `visibility.svg`, `cognitiveover.svg`, `structural.svg`.

---

## Slide 14 – Problem: Validated & Defined

## Problem: Validated & Defined

Portfolio positions data is prerequisite context for every trade decision — yet the current design treats it as supplementary, on-demand information. This structural mismatch forces advisors to choose between seeing their positions and entering a trade, two tasks that must happen simultaneously.

The result: advisors interrupt their workflows, accept higher cognitive load, build manual workarounds, and make decisions with incomplete information — introducing friction, inefficiency, and risk at the highest-stakes moment of the trading process.

> "The positions drawer isn't just a UX issue — it's a compliance risk. Advisors are making decisions without complete information because the tool makes it too hard to have both visible at once."
> — Compliance Officer, Internal SME Interview

**Client Relationship Risk**

Trading errors are among the most costly outcomes a firm can face. When advisors make decisions with incomplete position data, errors increase — damaging trust between our clients and the end investors they trade on behalf of. In an industry where reputation is everything, preventable errors are not a UX problem. They are a business problem.

**Operational Cost**

Each trading error generates downstream work: service inquiries, manual corrections, and follow-up from our support teams. Reducing workflow friction isn't just about advisor experience — it directly reduces the volume of error-driven support load and the internal cost of remediation that follows.

**Visuals:** none (callout + quote + two outlined impact cards).

---

## Slide 15 – Defining Solution Parameters

## Defining Solution Parameters

### Solution Principles

- **In-Flow, Not On-Demand:** Persistent in-context element, not a triggered overlay
- **Scan Over Dive:** Quick reference across multiple positions, not exhaustive detail on one
- **Horizontal Over Vertical:** Leverage horizontal real estate to maximize positions visible simultaneously
- **Hierarchy Over Density:** Surface critical fields prominently; deprioritize secondary data

**Visuals:** none (principle rows with → arrows).

---

## Slide 16 – Ideation & Lo-Fi Exploration (selected direction)

## Ideation & Lo-Fi Exploration

I explored multiple approaches to organizing positions data alongside trade entry, each with different tradeoffs around visibility, interaction cost, and space efficiency.

**Selected Direction — Horizontal Cards**

- Optimal scannability, efficient use of space, no interaction cost
- Scales to multiple positions simultaneously
- Complements rather than competes with trade form

**Visuals:** `LoFiHorizontal` (code-drawn lo-fi — Order Entry Ticket beside a collapsible horizontal Positions card listing AAPL, MSFT, GOOGL, NVDA, AMZN, JPM, TSLA, V, BRK, HD, PG, MA).

---

## Slide 17 – Ideation & Lo-Fi Exploration (other concepts)

**Other Concepts Explored** (carousel)

**Modal Layer**

- Pro: Clean interface, doesn't consume layout space
- Con: Requires click to access — breaks workflow

**Floating Widget**

- Pro: Flexible positioning
- Con: Can obstruct content, adds window management

**Vertical Cards**

- Pro: Always visible
- Con: Vertical scrolling required, consumes horizontal space

**Overlay Panel**

- Pro: Hides when not needed
- Con: Requires toggle, can feel disruptive

Caption: X of 4 concepts

**Visuals:** `LoFiModal`, `LoFiFloating`, `LoFiVertical`, `LoFiOverlay` (code-drawn lo-fi illustrations rendered in the carousel). Static SVG equivalents also exist in the repo: `concept-modal.svg`, `concept-floating.svg`, `concept-vertical.svg`, `concept-overlay.svg`.

---

## Slide 18 – Key Design Decisions

## Key Design Decisions

- **Eliminated Context Switching:** By making positions persistently visible alongside the trade form — not behind a toggle — advisors could reference and enter data simultaneously for the first time.
- **Prioritized Breadth over Depth:** The horizontal card layout maximizes the number of positions visible at once. I surfaced the 4-5 most relevant fields — ticker, shares, current value, unrealized gain/loss — not all 12+ columns.
- **Built in the Spirit of the Design System:** Designed to align with the existing visual language, spacing tokens, and interaction patterns. Worked directly with the design system team during development to formalize the component spec.
- **Scalable Across All Trading Use Cases:** Designed as a context-agnostic "horizontal contextual data panel" — applicable not just to positions, but to any data-dense workflow across the platform requiring secondary reference data.

**Visuals:** `check.svg` (decision check icons).

---

## Slide 19 – Contribution to Design System

## Contribution to Design System

I partnered with the design system team to formalize the horizontal positions panel as an official design system component — enabling platform-wide adoption with minimal custom work per application.

**Component Specs**

- Anatomy diagrams with spacing and sizing tokens
- Column configuration options and defaults
- Responsive breakpoint behavior
- State variations (default, hover, selected, loading, empty)

**Usage Guidelines**

- When to use horizontal vs. vertical layouts
- Best practices for column prioritization
- Accessibility requirements and keyboard navigation
- Proper and improper usage examples

**Design Tokens**

- Color tokens for data states (positive, negative, neutral)
- Typography scale for data density contexts
- Spacing tokens for compact and standard densities
- Border and shadow tokens for panel elevation

**Impact stats:** 10+ — Applications using pattern · ~90% — Design system coverage · 10+ — Product teams aligned

**Visuals:** `specs.svg`, `usage.svg`, `design.svg`.

---

## Slide 20 – Scaling & Rollout

## Scaling & Rollout

Any change to live trading workflows required careful, staged rollout. I structured a phased approach that prioritized learning and iteration at each stage before expanding.

**Phase 1 — Pilot — Multi-Order Ticket** · Complete
Introduced the horizontal positions panel in the highest-traffic trading application. Collected feedback and iterated on column priority and display density.

**Phase 2 — Expand — Order Entry Tickets** · Complete
Applied the standardized component across the 6 individual order entry ticket applications, using the design system component to ensure consistency.

**Phase 3 — Scale — Platform-Wide** · In Progress
Rolled out the pattern to all 10 identified applications and established it as the default layout standard for data-dense contexts.

**Future — Generalize — Contextual Data Pattern** · Planned
Extend beyond positions to support account summaries, model benchmarks, compliance checks, and order history.

**Visuals:** none (phase cards).

---

## Slide 21 – Measuring Success (constraint)

## Measuring Success

One of the biggest challenges on this project was the absence of mature analytics infrastructure. Legacy tooling didn't support event-level tracking, and there were no established baseline metrics for this feature area. Rather than let this become a blind spot, I worked to define what rigorous measurement would look like — both as a design deliverable and as a foundation for future instrumentation.

**The constraint**

When I asked stakeholders "What would make this successful?", the answer was: "We don't have strong enough analytics tools to tell us what success looks like today." Rather than viewing this as a blocker, I treated it as an opportunity to establish a measurement framework from the ground up — one that could be implemented as the new platform launched.

**Visuals:** none (text + constraint callout).

---

## Slide 22 – Measuring Success (Proposed Success Framework)

### Proposed Success Framework

**Task Completion Rate** · Critical

- What: % of users who successfully complete an order entry with the new positions panel
- How: Event tracking: position_panel_task_completed
- Target: Baseline TBD → Improve by 25%+ within 60 days

**Time to Complete Order** · Critical

- What: Average time from opening order entry to submitting order
- How: Timestamp delta: start_order → complete_order
- Target: Baseline TBD → Reduce by 30% (hypothesis: ~4min → ~2.5min)

**Support Ticket Volume** · High (Can measure now!)

- What: # of support tickets tagged "order entry" or "position tracking"
- How: Support system data (existing)
- Target: Current baseline ~240/month → Reduce to <160/month (-30%)

**Trading Efficiency (Orders/Hour)** · Critical

- What: Average orders completed per trading hour per user
- How: May be available in existing business systems
- Target: Current unknown → Improve by 20%+

*In the interim, I tracked qualitative signals through user interviews and support ticket analysis to validate directional improvements while instrumentation was being built.*

**Visuals:** none (metric cards).

---

## Slide 23 – Measuring Success (Instrumentation Plan)

### Instrumentation Plan

I collaborated with engineering to ensure the redesign included proper event architecture from day one — so that when the analytics platform launched, tracking would already be in place with no retroactive instrumentation needed.

**position_panel_opened**
Trigger: User clicks to expand position panel
Parameters: user_id, timestamp, panel_state (collapsed→expanded)

**order_entry_started**
Trigger: User begins filling out order form
Parameters: user_id, timestamp, order_type, source_screen

**order_entry_completed**
Trigger: User successfully submits order
Parameters: user_id, timestamp, order_id, time_to_complete, position_panel_used (boolean)

**order_entry_error**
Trigger: User encounters an error during order entry
Parameters: user_id, timestamp, error_type, error_message, step_in_flow

This spec became part of our engineering handoff documentation and enabled the team to measure all critical metrics outlined in the success framework above.

**Visuals:** none (event spec list).

---

## Slide 24 – Results & Impact

## Results & Impact

**Improved Discoverability**
Positions information now visible without hunting through drawers or switching applications

**Better Scannability**
Horizontal layout leverages available screen real estate — more positions visible at once

**Platform Consistency**
Unified pattern across all trading pages reduces cognitive overhead when switching applications

**Visuals:** none (icon result cards).

---

## Slide 25 – Reflections & Learnings

## Reflections & Learnings

**The best solutions often feel deceptively simple:**
The horizontal card pattern looks obvious in hindsight — but it required substantial research to understand why it was right, and substantial facilitation work to get alignment on reframing the problem before we could arrive there.

**Visualizing platform-level impact unlocked stakeholder alignment:**
Showing how a single design decision could scale to 10+ applications in a single diagram was more persuasive than any usability metric. This framing transformed a single-feature discussion into a platform strategy conversation.

Case study navigation: ← Previous — Inside the Rule Engine

**Visuals:** none (reflection callouts).
