# Agent Guidelines

Guidelines for AI agents working on this codebase. `AGENTS.md` and `CLAUDE.md` are intentionally mirrored; keep both files in sync when updating repo-level instructions.

## Related Documentation
- [README.md](README.md) - Project overview, features, and setup

## Commands
- Build: `vercel build`
- Development: `vercel dev`

## Code Conventions

### TypeScript
- Use TypeScript for all new code in `src/`
- Keep types inline unless shared across multiple files
- Prefer explicit typing over `any`

### CSS & Tailwind
- Use CSS custom properties defined in `:root` and `.dark`
- Follow the existing naming conventions (`.link-card`, `.social-card`, etc.)
- Use `var(--property-name)` for all colors and spacing where possible
- Prefer Tailwind utility classes over adding new CSS rules
- Single custom breakpoint: `desktop:` (1000px) - no other breakpoints

### Grid Alignment Rules
When working with the desktop two-column grid:
- Use `self-start` on grid content cells to ensure top alignment
- Use `mb-*` for card spacing, NOT `my-*` (avoids first-card top margin misalignment)
- Example: `link-card` uses `mb-5` not `my-5` so columns align at top

### Layout
Two layouts only - no intermediate breakpoints:
- Mobile (< 1000px): single column stack
- Desktop (>= 1000px): two-column grid

### JSON Data
All content lives in `src/data/`:
- `links.json` - Social links and regular link cards
- `publications.json` - Articles, videos, interviews
- `causes.json` - Community involvement
- `activity.json` - Recent activity items for desktop prominence

## Design Principles

### Tone
- Subtle, understated presentation
- No aggressive calls to action
- Informal, approachable personality
- Let content speak for itself

### Visual Style
- Small thumbnails, not hero images
- Hover effects should be smooth, not jarring
- Maintain existing animation timings (cubic-bezier(0.34, 1.56, 0.64, 1))
- Preserve the warm editorial color palette

### Accessibility
- Always include `aria-label` on interactive elements
- Maintain keyboard navigation
- Ensure color contrast meets WCAG standards

## File Structure
```
src/
├── main.ts           # Main page logic
├── style.css         # Global styles
├── data/             # JSON content files
└── utils/            # Utility functions
```

## Making Changes
1. Test in both dark and light mode
2. Verify desktop (>= 1000px) and mobile (< 1000px) layouts
3. Run `vercel build` to ensure no type errors
4. Keep changes minimal and focused

## PR Screenshot Evidence for UI Changes

The reviewer merges from GitHub without running the app locally. Screenshots embedded in the PR body are the review surface. A UI-affecting PR without screenshots is incomplete; do not open it until the screenshot evidence is in the body.

Follow the local PR screenshot evidence skill at `/Users/rcr-macmini-2026/.codex/skills/pr-screenshot-evidence/SKILL.md`.

Capture viewport screenshots, not full-page screenshots unless the review specifically needs the whole page. Capture both hard layouts whenever the change crosses the `desktop:` breakpoint at 1000px, which is nearly every layout change here:
- Desktop: 1440x900
- Mobile: 375x812

Upload PNGs to the Vercel Blob store `rcr-screenshots`. Use screenshot-specific tokens in this order:
1. `RCR_SCREENSHOTS_BLOB_READ_WRITE_TOKEN`
2. `SCREENSHOT_BLOB_READ_WRITE_TOKEN`

Use deterministic Blob pathnames:
- Before a PR number exists: `link-in-bio-ryan/local/<branch>/<type>-<viewport>-<label>.png`
- After a PR number exists: `link-in-bio-ryan/pr-<number>/<type>-<viewport>-<label>.png`

Use labels such as `before`, `after`, `issue`, or `fix` for `<type>`, viewport names such as `desktop-1440x900` or `mobile-375x812`, and a short state label for `<label>`. If a branch name contains `/` or spaces, replace them with `__` in the Blob pathname.

Embed the returned public Blob URLs directly in the PR body, usually under `## Desktop` and `## Mobile` sections. When capture tooling exposes DOM metrics (`scrollWidth`, `clientWidth`, `overflows`, activity-item count), include those metrics next to the screenshots.

Validate each screenshot before embedding it. Confirm it is not blank, still loading, cropped misleadingly, or showing the wrong state. On this content-rich page, a PNG under 20 KB usually means a loading state; retry with a longer wait.

Never use legacy Convex screenshot URLs (including `/screenshot?id=...`), GitHub uploads, committed PNGs, or a generic app Blob token unless you have verified that the token writes to `rcr-screenshots`.

## Responsive Layout Strategy

### Breakpoints
- Mobile/tablet: under 1000px width - compact layout with Recent Activity
- Desktop: 1000px and above - two-column layout with Recent Activity prominent

### Design Philosophy
No "fully responsive" gymnastics. Two clear layouts:
1. Mobile (< 1000px): compact header (photo + text side-by-side), horizontal social row, CTA button, Recent Activity, then remaining links. Theme toggle at bottom.
2. Desktop (>= 1000px): two-column grid with Recent Activity in the right column above the fold. Theme toggle top-right.

### Mobile Layout Structure
1. Photo with name, role, and location
2. Compact social row (LinkedIn, X, v0)
3. Prominent "Schedule a Meeting" CTA
4. Recent Activity with video thumbnails and articles
5. Remaining links (Wipfli Bio, Stealth Mode)
6. Publications, Causes, and Tech Stack sections
7. Theme switch at the bottom

### Desktop Layout Structure
1. Horizontal, left-aligned profile header
2. Two-column grid
3. Social links and regular link cards in the left column
4. Recent Activity header and items in the right column
5. Publications, Causes, and Tech Stack full width below the grid

### Desktop Grid Alignment
The desktop layout uses a two-column CSS grid. To ensure the left and right columns align at the top:
- Grid content cells use `self-start` to align to the top of their grid area
- Cards use `mb-*` (bottom margin only), NOT `my-*` (top and bottom margin)
- The first card in each column must have no top margin to align properly

Critical: using `my-5` on cards will misalign columns because the first card gets pushed down. Always use `mb-5` instead.

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
- `developmentOnly: true` limits a feature to development (localhost, port-based URLs, or Vite dev mode)
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
