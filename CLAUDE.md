# Project Commands

## Build and Development
- Build: `vercel build`
- Development: `vercel dev`

## Related Documentation
- [README.md](README.md) - Project overview, features, and setup
- [AGENTS.md](AGENTS.md) - AI agent guidelines and conventions

## CRITICAL: Every PR that changes UI MUST include hosted screenshots

The reviewer merges from GitHub **without running the app locally**. Screenshots embedded in the PR body *are* the review mechanism — they are not optional decoration. A PR without screenshots for a visual change is an incomplete PR and should not be opened.

**Use the `convex-screenshot-host` skill** to:
1. Capture the above-the-fold viewport at desktop (1440×900) **and** mobile (375×812) whenever a change crosses the `desktop:` breakpoint at 1000px — which is almost every layout change in this project.
2. Upload each PNG to `https://resilient-echidna-374.convex.site/upload-screenshot` with an `X-Filename` prefixed `link-in-bio-ryan-...` so uploads from this repo stay identifiable in the shared host.
3. Embed the returned `screenshot?id=...` URL in the PR body under `## Desktop` and `## Mobile` sections, including DOM metrics (`scrollWidth`, `clientWidth`, `overflows`) from the capture script.

Why this is non-negotiable here:
- The repo has two hard layouts (mobile < 1000px, desktop ≥ 1000px) — a single-viewport screenshot hides breakpoint regressions.
- `Read`-back each captured PNG before uploading: a <20 KB file on this content-rich page means you captured a loading state and must retry with a longer wait.
- Don't commit screenshot files to the repo. Upload → embed URL. The host has 30-day retention; that's fine for review cycles.

See the global `convex-screenshot-host` skill for the exact capture script and curl invocation. The Playwright dependency lives in `/tmp/screenshot-work/` — reuse it across PRs.

## Responsive Layout Strategy

### Breakpoints
- **Mobile/Tablet**: Under 1000px width - compact layout with Recent Activity
- **Desktop**: 1000px and above - two-column layout with Recent Activity prominent

### Design Philosophy
No "fully responsive" gymnastics. Two clear layouts:
1. **Mobile** (< 1000px): Compact header (photo+text side-by-side), horizontal social row, CTA button, Recent Activity, then remaining links. Theme toggle at bottom.
2. **Desktop** (≥ 1000px): Two-column grid with Recent Activity in the right column (above the fold). Theme toggle top-right.

### Mobile Layout Structure
```
┌─────────────────────────────────────────────────┐
│  [Photo] [Name, Role, Location]                 │
├─────────────────────────────────────────────────┤
│  [LinkedIn] [X] [v0] (compact social row)       │
├─────────────────────────────────────────────────┤
│  [Schedule a Meeting - prominent CTA button]    │
├─────────────────────────────────────────────────┤
│  Recent Activity (video thumbnails, articles)   │
├─────────────────────────────────────────────────┤
│  [Remaining Links: Wipfli Bio, Stealth Mode]    │
├─────────────────────────────────────────────────┤
│  [Publications, Causes, Tech Stack sections]    │
├─────────────────────────────────────────────────┤
│  [Switch Theme button at bottom]                │
└─────────────────────────────────────────────────┘
```

### Desktop Layout Structure
```
┌─────────────────────────────────────────────────┐
│  [Profile Header - horizontal, left-aligned]    │
├─────────────────────┬───────────────────────────┤
│  Social Links       │  Recent Activity Header   │
├─────────────────────┼───────────────────────────┤
│  Links & Cards      │  Recent Activity Items    │
│  (all regular links)│  (video thumbnails)       │
├─────────────────────┴───────────────────────────┤
│  [Publications, Causes, Tech Stack - full width]│
└─────────────────────────────────────────────────┘
```

### Desktop Grid Alignment
The desktop layout uses a 2-column CSS grid. To ensure the left and right columns align at the top:
- Grid content cells use `self-start` to align to top of their grid area
- Cards use `mb-*` (bottom margin only), NOT `my-*` (top + bottom margin)
- The first card in each column must have no top margin to align properly

**Critical**: Using `my-5` on cards will misalign columns because the first card gets pushed down. Always use `mb-5` instead.

## Feature Flags
Simple lightweight feature flagging system in `src/main.ts`:

### Configuration
```typescript
const FEATURE_FLAGS = {
  publications: {
    enabled: true,
    developmentOnly: false,
  },
};
```

### Behavior
- `enabled: false` hides a feature everywhere
- `developmentOnly: true` limits a feature to **development** (localhost, port-based URLs, or Vite dev mode)
- `developmentOnly: false` allows an enabled feature to render in production
- Easy toggle: change flag values and refresh page

### Environment Detection
Auto-detects development via:
- `import.meta.env.DEV` (Vite)
- `localhost` or `127.0.0.1` hostname
- Any URL with port number

### Current Flags
- `publications`: Publications and Media section (enabled in production and development)

## Content Management

### Recent Activity
The Recent Activity section showcases recent appearances, talks, or content. Located in `src/data/activity.json`:

```json
{
  "activities": [
    {
      "title": "Office Hours Global",
      "description": "Brief description",
      "date": "2024-12-19",
      "type": "video",
      "url": "https://youtube.com/...",
      "thumbnailId": "youtube-video-id"
    }
  ]
}
```

### Tone
The site aims for subtlety - no aggressive CTAs or intensity. Let the content speak for itself with small thumbnails and understated presentation that reflects an informal, approachable personality.
