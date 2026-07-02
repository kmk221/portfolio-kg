# Inside the Rule Engine — Slide Deck Outline

Replacing programmatic jargon and Excel workarounds with plain-English rule logic compliance teams can trust.
**Kristin Garza · Lead UX Designer · ~9–12 months · Shipped**

---

## Slide 1 – Inside the Rule Engine

- Lead UX Designer
- ~9–12 months · Shipped
- Compliance rule engine · institutional trading
- Plain-English logic in place of raw conditional syntax

**Visuals:** Hero rule-engine overview video (`design-vid-b3.mov`); `BeforeAfterWipe` legacy → redesign.

---

## Slide 2 – Context & business problem

- The rule engine sits upstream of every trade
- It governs which orders can execute for 3,300+ firms
- Misconfigured rules can cause millions in trade errors
- The system ran on tribal knowledge and Excel workarounds

**Visuals:** `legacy-rules-screenshot.png`; upstream-of-every-trade framing.

---

## Slide 3 – My role & scope

- Led discovery, synthesis, and a cross-functional design sprint
- Revived stalled interviews no one had acted on
- Chose the highest-leverage slice before designing a pixel
- Partnered with product, engineering, business, and UXR

**Visuals:** `AffinityMap` synthesis board; sprint framing.

---

## Slide 4 – What users were working with

- Dense grid table; text truncated, unsearchable beyond Ctrl+F
- 100+ keywords with no definitions — pure trial and error
- One text box for up to 20,000 comma-separated values
- Rule rationale and history lived in outside spreadsheets

**Visuals:** `legacy-rules-annotated.html`; `legacy-rule-creation.png`; `legacy-vid-b1.mov`, `legacy-vid-b2.mov`.

---

## Slide 5 – Five problems, clearly named

- The rules list isn't searchable
- Keyword selection is opaque and error-prone
- The system expects expertise it never teaches
- Documentation, audit trail, and help are all missing or buried

**Visuals:** `SynthesisSection` (5 problem areas + user quotes); affinity clusters.

---

## Slide 6 – Sprint: from problems to concepts

- Framed each problem as a "How might we"
- Sketched 7 concepts across six opportunity areas
- Kept constraints and business logic in the room
- Anchored everything in plain-language rule logic

**Visuals:** `IdeationReel` (7 HMW concept cards); sprint sketches.

---

## Slide 7 – The pivot: design within the wall

- Strongest concept was a reusable List Manager
- Infrastructure couldn't store lists apart from rules
- I confirmed the constraint, then designed within it
- Made in-rule input far better: CSV upload + real-time validation

**Visuals:** Legacy multi-step import ritual; structured value-input concept.

---

## Slide 8 – Prioritizing where to start

- Mapped impact vs. effort against real constraints
- Phase 1: a findable list with plain-language preview
- Phases 2–3: guided creation, edit, and change history
- Deferred List Manager — most complex, better scoped later

**Visuals:** `LofiFlow` (6-step wireframe journey); prioritization matrix.

---

## Slide 9 – The solution: list + creation

- Two-panel list: rules beside plain-English logic
- Real search plus status and keyword filters — no more Ctrl+F
- A guided stepped flow replaces the expert-only form
- Live preview builds a readable sentence as you build the rule

**Visuals:** `PartBFeatureTabs`; `design-vid-b1/b2/b3.mov`; rule-logic preview panel.

---

## Slide 10 – Validation & iteration

- Tested with compliance officers; each step mapped to a question
- Preview panel felt editable → made it clearly read-only
- Flat value box confused users → structured grid + upload + validation
- Added per-row validation and the missing role definitions

**Visuals:** `IterationCards` (4 v1/v2 comparisons); `v1-rule-logic.png` vs `v2-rule-logic.png`.

---

## Slide 11 – Outcomes

- 7 of 7 usability participants responded positively
- Plain-language preview named the biggest confidence booster
- Retired Ctrl+F and the shadow Excel workarounds
- Set the interaction patterns for the broader compliance suite

**Visuals:** `BeforeAfterWipe`; outcome trio — guided creation / findable list / confidence before go-live.

---

## Slide 12 – Reflection

- Define success metrics during discovery, not after ship
- Starting simple beat the system-heavy List Manager
- Design patterns, not just screens — and document them
- What you leave behind matters as much as what you ship

**Visuals:** Emerging pattern-language artifacts; Phase 2 roadmap (edit, history, List Manager).
