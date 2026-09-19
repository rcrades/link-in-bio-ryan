# Bio Site Migration Delta Ledger

This file mirrors migration contracts that affect the legacy
`link-in-bio-ryan` site. The canonical cross-site ledger remains in the
`biosite` repository.

## Canonical future-state copy — approved 2026-09-18 CDT

Ryan delegated the final copy choice and selected the current Next.js wording as
the canonical contract for all three previously open rows:

- `V0-001`: preserve the explanatory heading, both template descriptions, and
  the v0 profile link from the Next.js page in the legacy renderer.
- `GB-002`: use the current Next.js Groundbreak wording across the pitch,
  thesis, dossier, and preview while preserving the legacy layouts.
- `GUEST-001`: use the current approved-only Guest Brief returned by the shared
  `original-puffin-455` `guestBrief:getApproved` query. The legacy client must
  render the returned blocks only after authentication and approval; protected
  brief copy must never be restored to browser source or bundled assets.

These IDs are decided and implemented as a biosite-to-legacy copy sync. Future
audits must treat them as accepted contracts, not recurring owner decisions.
Guest Brief authorization and payload isolation remain separate security gates.
No shared-backend deployment or production-domain change is part of this sync.

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
