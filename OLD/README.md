# OLD — archived duplicates (safe to delete later)

These files were retired during the design-system consolidation (Phase 1, 2026-06-29).
They are **not** referenced by the live site or by any preview page. Nothing imports
or links them. They are kept here only as a safety net until you confirm cleanup.

## Why they were archived

The repo had **three** copies of `tokens.css`. The build (`src/main.jsx`) only ever
loaded `src/tokens.css`, so that one was made the single canonical source of truth.
The other two copies were redundant or divergent and are archived here:

| Archived file        | Came from            | Notes |
|----------------------|----------------------|-------|
| `tokens.root.css`    | `./tokens.css` (repo root) | Byte-identical to canonical `src/tokens.css`. Pure duplicate. |
| `tokens.pages.css`   | `./src/pages/tokens.css`   | The copy mistakenly thought to be the source of truth. **Never loaded by the build.** Diverged from canonical at one line (`--clay-ink` vs canonical `--clay-deep`). |

## What changed alongside this

The two preview pages that used to link these copies were repointed to the canonical file:
- `design-system.html` → now links `src/tokens.css`
- `src/pages/design-system.html` → now links `../tokens.css` (and its previously broken
  `tokens-orphaned.css` link was fixed to `../../tokens-orphaned.css`)

## Unused alternate homepage (archived 2026-06-29)

`Home.jsx` + `Home.module.css` were an **unused alternate home design** (project-card grid,
dark About panel, gold stats). The live `/` route renders `src/App.jsx`, which uses global
classNames from `tokens.css`/`styles.css` — it never imported these. `Home.jsx` was routed
and imported **nowhere**; its only relationship was importing its own `Home.module.css`, so
the two were moved together and the import stays co-located (no build reference).

| Archived file        | Came from              | Notes |
|----------------------|------------------------|-------|
| `Home.jsx`           | `./src/pages/Home.jsx`        | Orphaned — not imported or routed anywhere. |
| `Home.module.css`    | `./src/pages/Home.module.css` | Only consumed by `Home.jsx`. (Tokenized this session before archiving; safe to revive.) |

To undo: `git mv OLD/Home.jsx src/pages/Home.jsx` and `git mv OLD/Home.module.css src/pages/Home.module.css`.

## Repo structure cleanup — archived 2026-06-29 (Phase 2)

Moved here via `git mv` (history preserved). None are referenced by the live app or build.

| Archived (in OLD/) | Came from | Why |
|---|---|---|
| `src-broken/`, `src-broken.zip` | repo root | Broken experiment dump (full of `X 2/3/4/5` dupes) + its zip. |
| `src - old/` | repo root | Previous `src/` snapshot. |
| `latest artifacts compliance/` | repo root | Old case-study HTML + sketches + photos (research/source material). |
| `illustrations-root/` | root `illustrations/` | **Duplicate** of `public/illustrations/` (identical files). App serves `/illustrations/` from `public/`, so the root copy was unused. |
| `permanent-marker.ttf`, `permanent-marker 2.ttf` | repo root | Unused — fonts load via Google `@import` in `tokens.css`; no `@font-face` referenced these. |
| `gen-paths.mjs`, `gen-paths 2.mjs` | repo root | One-off generator (reads the .ttf → SVG glyph paths). Not in `package.json` scripts; not an active workflow. |
| `design-system.src.html` | `src/design-system.html` | Stale variant (inlined its own tokens). |
| `design-system.pages.html` | `src/pages/design-system.html` | Duplicate of canonical root `design-system.html`. |
| `CaseStudyOM.jsx` | `src/pages/CaseStudyOM.jsx` | Orphaned — imported in `main.jsx` but never routed. Dead import removed from `main.jsx`. |

Canonical design-system reference kept at repo-root `design-system.html`; `public/shortlist/design-system.html` kept (Shortlist product). `tokens-orphaned.css` deliberately left in place (deferred decision).

To undo any: `git mv OLD/<name> <original path>` (and for CaseStudyOM, re-add its import line to `src/main.jsx`).

## To undo (token files)

`git mv OLD/tokens.root.css tokens.css` and `git mv OLD/tokens.pages.css src/pages/tokens.css`,
then revert the two `design-system.html` link edits.
