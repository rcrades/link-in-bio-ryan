# Agent Guidelines

Guidelines for AI agents working on this codebase.

## Related Documentation
- [README.md](README.md) - Project overview, features, and setup
- [CLAUDE.md](CLAUDE.md) - Development commands, feature flags, and layout strategy

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
- **Mobile** (< 1000px): Single column stack
- **Desktop** (≥ 1000px): Two-column grid

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
2. Verify desktop (≥1000px) and mobile (<1000px) layouts
3. Run `vercel build` to ensure no type errors
4. Keep changes minimal and focused

## CRITICAL: PRs with UI changes require hosted screenshots in the body

The reviewer merges from GitHub **without running the app**. Embedded screenshots in the PR body *are* the review surface. A UI-affecting PR without screenshots is incomplete — do not open it.

**Protocol (uses the `convex-screenshot-host` skill):**
- Capture at **both** viewports whenever the change crosses the 1000px breakpoint (which is nearly every layout change here):
  - Desktop **1440×900**
  - Mobile **375×812**
- Upload each PNG to `https://resilient-echidna-374.convex.site/upload-screenshot` with header `X-Filename: link-in-bio-ryan-<feature>-<timestamp>.png` (prefix is load-bearing — the host is shared across repos).
- Embed the returned `screenshot?id=...` URL under `## Desktop` and `## Mobile` in the PR body, with DOM metrics (`scrollWidth`, `clientWidth`, `overflows`, activity-item count) pulled from the capture script.
- **Validate each shot** by `Read`-ing the PNG back before upload. <20 KB on a content-rich page = loading state; retry with a longer `waitForTimeout`.
- **Never commit PNGs to the repo** — upload, embed URL, done. 30-day retention is fine for review cycles.

Do not skip this step "for speed." The reviewer cannot merge what they cannot see, and agents have shipped loading-state screenshots into PRs by skipping the Read-back check. Follow the global `convex-screenshot-host` skill contract exactly.
