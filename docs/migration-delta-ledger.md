# Bio Site Migration Delta Ledger

This file mirrors migration contracts that affect the legacy
`link-in-bio-ryan` site. The canonical cross-site ledger remains in the
`biosite` repository.

## CO Pod appearance — 2026-09-10

- ID: `MEDIA-CO-POD-2026`; class: `SHARED` content; direction: biosite -> legacy.
- Ryan approved YouTube `F39F5MvHYU8` for both sites with publication date
  `2026-06-11`, verified from the YouTube watch-page `publishDate` and
  `uploadDate`.
- Shared Convex contract: CO Pod is a visible `recent` interview; UCA is
  `archived` with its row and asset retained; there are no `media` rows.
- JSON fallback contract: CO Pod replaces UCA in Recent Activity and appears in
  publications; UCA remains public in publications as historical material.
- Legacy baseline: `origin/main` at `3bd51d6`.
- Acceptance: CO Pod appears in Recent Activity and Publications; UCA is absent
  from Recent Activity and retained in Publications; unrelated fallback entries
  remain unchanged. No shared Convex mutation is part of this repository change.

## Historical video inventory — 2026-09-10

- ID: MEDIA-VIDEO-INVENTORY-2026; class: SHARED content; direction: biosite -> legacy.
- Ryan approved adding Landscape Smart (`01iwobdHTrk`), Chicago Forecast Summit (`LrVjGBvmbLs`), and Chicago CRE Downtown Office (`SdLN4Pg4lRo`) as separate video/interview records.
- Keep the existing REjournals article, “Taking the pulse of Chicago's downtown office sector,” and its article link unchanged alongside the Chicago CRE video. Groundbreak `VZxeggf1-Q0` already exists and must not be duplicated.
- Dates are YouTube publication dates, verified from watch-page publishDate/uploadDate: 2025-06-23, 2022-01-10, and 2021-01-31 respectively.
- Baselines: biosite `62682a6`; legacy `e094af3`. Shared Convex media remains empty; both sites render these publication records from checked-in data. Recent Activity is unchanged.
- Acceptance: all three YouTube links present once in each publication inventory; Chicago article and video independently accessible; existing records unchanged.
