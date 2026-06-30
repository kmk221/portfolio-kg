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

## To undo (token files)

`git mv OLD/tokens.root.css tokens.css` and `git mv OLD/tokens.pages.css src/pages/tokens.css`,
then revert the two `design-system.html` link edits.
