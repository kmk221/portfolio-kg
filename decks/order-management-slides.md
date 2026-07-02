# Addition Through Subtraction — Slide Deck Outline

Pivoting from a feature-heavy dashboard to a focused, essential order-management workflow — and a pattern that scaled across the platform.
**Kristin Garza · Lead UX Designer · ~9–12 months (2025) · Shipped**

---

## Slide 1 – Addition Through Subtraction

- Lead UX Designer
- ~9–12 months · 2025 · Shipped
- Order management · institutional trading
- A focused workflow that unlocked a platform-wide pattern

**Visuals:** `shipped-still.png` hero; clickable `order-management-prototype.html`.

---

## Slide 2 – At the center of every trade

- The execution layer where trades are placed and checked
- Daily surface across 3,300+ firms, ~$1.6T AUM, 8.7M accounts
- Trade errors carry huge financial and regulatory cost
- Part of a broader platform modernization

**Visuals:** `map-x2.png` ecosystem map; `legacy-still.png`.

---

## Slide 3 – My role & scope

- Lead UX Designer; owned research through ship
- Drove the pivot from dashboard to essentials-first
- Partnered with Product, Engineering, Business, and UXR
- Designed within real technical and accessibility constraints

**Visuals:** Legacy problem videos; ecosystem map.

---

## Slide 4 – The legacy experience

- Spatial problem: filters and details collapse the table from both ends
- Hidden actions: bulk select buried in shift-clicks and right-menus
- Blind send: no visibility into what's sent or why errors exist
- The highest-stakes step was done with the least information

**Visuals:** `legacy-spatial-1.mov`, `legacy-hidden-actions.mov`, `legacy-blind-send.mov`; `legacy-still.png`.

---

## Slide 5 – Discovery & key insights

- Tested the dashboard hypothesis with ~20 traders
- The list is the work — not a broad control center
- Details need to be closer; reliability beat flash
- Confidence before sending is a compliance requirement, not a nicety

**Visuals:** Dashboard vs. enhanced-table eye-path comparison; "Honda Accord" quote; `concept-1.png`.

---

## Slide 6 – The pivot: walk back to simple

- Feature-rich dashboard created a chaotic eye path (1→2→3→4)
- Enhanced table gave a clean left-to-right scan (1→2→3)
- I walked back to essentials-first — with the evidence to defend it
- Four principles: protect the table, go horizontal, surface actions, confirm

**Visuals:** Eye-path diagram (dashboard vs. table); the four design principles.

---

## Slide 7 – Designing within constraints

- Every decision cleared AG Grid, the design system, backend, and a11y
- Native column filters failed a11y → composed a horizontal panel from atoms
- Live quotes and logos deferred for performance
- The gap between ideal and shippable defined the MVP and the backlog

**Visuals:** Four-constraints panel; deferred `postmvp-*.png` concepts.

---

## Slide 8 – The solution

- Horizontal collapsible filters with active pills above the table
- Rebalanced table: key signals first, alerts aligned by column
- Order details in a side panel — fix without losing your place
- Smart selection plus a plain-language verification step before send

**Visuals:** `filters.mov`, `table.mov`, `order-details.mov`, `smart-selection.mov`, `verification-modal.mov`.

---

## Slide 9 – Before & after

- **Surface:** cluttered and dense → clear hierarchy, scannable
- **Send:** vague blanket options → grouped totals + per-order detail
- Both changes remove ambiguity at the riskiest moments
- Traders act with certainty instead of hope

**Visuals:** `legacy-still.png` vs `shipped-still.png`; `legacy-send-still.png` vs `shipped-send-still.png`.

---

## Slide 10 – Pilot & what we learned

- Piloted with users who had both legacy and redesign
- Tab clarity: sent and draft states weren't distinct enough
- Details drawer interrupted scrolling → opened a split-panel path
- Error scanning still effortful → stronger row-level indicators

**Visuals:** `pre.mov` vs `post.mov`; three pilot-feedback themes.

---

## Slide 11 – Outcomes & impact

- 100% positive pilot feedback in user office hours
- Filter pattern adopted by 2 products; DS pursuing 15+ apps
- Shared AG-Grid stylesheet for 20+ teams and 30+ devs
- Established a research-driven playbook and a clear roadmap

**Visuals:** Adoption diagram; paired before/after viewer.

---

## Slide 12 – Reflection

- Used research to cut through "more" as the default answer
- Protected the parts of the system people already trusted
- Shipped only the changes that make the day calmer and clearer
- Walking the heavy path first gave conviction to ship simple

**Visuals:** Legacy vs. shipped closing pair; what's-next roadmap.
