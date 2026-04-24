# Codebase Cleanup Backlog

This backlog captures the remaining cleanup work from the April 2026 codebase review. The feature-flag drift was handled first: flags now only render in development-like environments, matching the behavior documented in `README.md` and `CLAUDE.md`.

## 1. Stop Tracking Generated And Vendor Files

### Why It Matters

The repository currently tracks thousands of files that should be produced locally or by CI: `node_modules/`, a few `dist/` build artifacts, and `.DS_Store`. This creates noisy diffs, makes dependency updates risky, increases repository weight, and can leave the working tree dirty after ordinary commands like `npm ci` or `npm run build`.

### Proposed Scope

- Confirm exactly what is tracked with:
  - `git ls-files node_modules`
  - `git ls-files dist`
  - `git ls-files '*.DS_Store'`
- Remove generated/vendor files from the index while keeping local copies available:
  - `git rm -r --cached node_modules dist`
  - `git rm --cached public/.DS_Store dist/.DS_Store`
- Keep `.gitignore` as the source of truth for generated content. It already includes `node_modules`, `dist`, and `.DS_Store`, so the main issue is that these paths were committed before or despite ignore rules.
- Decide whether `screenshots/` should remain tracked. The repo has historical debugging screenshots, while `AGENTS.md` and `CLAUDE.md` say PR screenshots should be hosted instead of committed. If old screenshots are still valuable, keep them with a short README note. If not, remove them in a separate cleanup commit.

### Acceptance Criteria

- `git ls-files node_modules` returns no files.
- `git ls-files dist` returns no files unless there is a documented reason for a specific static artifact.
- `git ls-files '*.DS_Store'` returns no files.
- Running `npm ci` and `npm run build` does not create tracked-file changes.
- The commit does not delete local working copies of dependencies or build output unnecessarily.

### Verification

- Run `npm ci`.
- Run `npm run build`.
- Run `git status --short` and confirm only intentional source/docs changes appear.

## 2. Normalize Breakpoints And Responsive Rules

### Why It Matters

The documented layout strategy is intentionally simple: mobile below 1000px and desktop at 1000px or wider. The code has drifted from that. Examples include Tailwind classes like `sm:p-5` and `lg:flex-row` in `src/main.ts`, while `tailwind.config.cjs` defines only the custom `desktop` screen. There are also raw CSS media queries at several widths, including 480, 560, 640, 720, 900, 999, and 1024px.

Some of these may be harmless or page-specific, but they make layout behavior harder to reason about and can create silent no-op Tailwind classes when default screens are not configured.

### Proposed Scope

- Audit all breakpoint usage with:
  - `rg -n "\\b(sm|md|lg|xl|2xl):|@media" src pages index.html`
- Replace accidental Tailwind default breakpoints with `desktop:` where the rule belongs to the main two-layout system.
- For raw CSS media queries, sort them into three buckets:
  - Main link-in-bio layout rules that should use 1000px only.
  - Small-component polish rules that are justified because they prevent text overflow or modal breakage.
  - Standalone page rules, such as admin, guest brief, or Groundbreak pages, that should either be documented as separate experiences or brought into the same two-layout convention.
- Pay special attention to accordion behavior: `src/main.ts` uses `lg:flex-row`, while `src/style.css` uses a 1024px query for expanded accordion behavior. Those should align with the `desktop` breakpoint unless there is a deliberate reason not to.

### Acceptance Criteria

- No accidental `sm:`, `md:`, `lg:`, `xl:`, or `2xl:` classes remain in files compiled by the current Tailwind config.
- Main-page layout changes happen at 1000px, matching `desktop:`.
- Any remaining non-1000px media query has a short comment explaining its purpose, or it lives in a page-specific stylesheet whose layout strategy is documented.
- Mobile 375x812 and desktop 1440x900 screenshots show no overflow or breakpoint weirdness.

### Verification

- Run `npm run build`.
- Test at 375x812 and 1440x900.
- Check DOM metrics for `scrollWidth`, `clientWidth`, and obvious horizontal overflow.

## 3. Split And Type The Main Page Renderer

### Why It Matters

`src/main.ts` is doing too much: feature flags, theme bootstrapping, Convex fetching, JSON mapping, HTML rendering, modal behavior, accordion behavior, filters, icon setup, and page initialization. It is also using broad `any[]` inputs and building large `innerHTML` strings. That works, but it weakens TypeScript, makes review harder, and increases the chance that a content field can accidentally break markup.

The admin and guest brief sections already use React. The main page does not have to be converted all at once, but it should at least be divided into smaller typed modules.

### Proposed Scope

- Add explicit local types for the content rendered on the main page:
  - Social links
  - Regular links
  - Recent activity
  - Publications and upcoming appearances
  - Causes
- Move feature-flag and environment detection into a small utility module.
- Move Convex-to-view-model mapping into a small data-loading module.
- Move rendering helpers into focused files, for example:
  - `renderSocialLinks`
  - `renderRegularLinks`
  - `renderRecentActivity`
  - `renderPublications`
  - `renderModals`
- Keep the first refactor behavior-preserving. Avoid redesigning the UI while splitting the file.
- Consider escaping or sanitizing dynamic text inserted into template strings, especially content that comes from Convex or editable admin fields.
- After the split, decide whether the main page should remain string-rendered or move toward React like the admin and guest brief pages.

### Acceptance Criteria

- `src/main.ts` is reduced to orchestration: load data, render the page, initialize behavior.
- Public render helpers accept typed inputs and return strings or components consistently.
- No new `any` types are introduced.
- Existing UI behavior is preserved in light and dark mode, mobile and desktop.
- Build output remains healthy and no new lint/type errors appear.

### Verification

- Run `npm run build`.
- Smoke-test homepage interactions:
  - Theme toggle
  - Tech stack modal
  - Sitemap modal
  - Publications and community accordion
  - Publication filters
- Capture desktop and mobile screenshots if the refactor touches rendered markup or styling.

## 4. Clean Up Dependency And Tooling Hygiene

### Why It Matters

After a clean install, the project builds, but `npm audit --omit=dev` reports production vulnerabilities, mostly through the direct `vercel` dependency. If `vercel` is used only as a CLI/build tool, it should not ship as a production dependency. The build also warns that Browserslist data is stale, and local installs warn when running outside the declared Node 20 engine.

### Proposed Scope

- Determine whether `vercel` is needed at runtime. If it is only used for `vercel build` and `vercel dev`, move it from `dependencies` to `devDependencies`.
- Run `npm audit --omit=dev` after moving CLI-only packages and review what remains.
- Update patch/minor versions where safe, especially tooling packages that address audit findings.
- Refresh Browserslist data if that changes lockfile entries cleanly.
- Decide whether to enforce Node 20 locally with an `.nvmrc`, `.node-version`, Volta config, or documented setup command.
- Review the large Lucide build chunk. The current `import * as lucide from 'lucide'` pattern is convenient but pulls a large icon chunk. If page performance matters, import only the icons used or isolate icon setup per page.

### Acceptance Criteria

- `npm run build` passes on Node 20.
- `npm audit --omit=dev` has no high-severity production findings, or any remaining findings are documented with rationale.
- CLI-only packages are in `devDependencies`.
- The lockfile is updated intentionally and reproducibly.
- Tooling warnings are either resolved or documented.

### Verification

- Run `npm ci`.
- Run `npm run build`.
- Run `npm audit --omit=dev`.
- Confirm the Vercel build command still works in the intended deployment environment.
