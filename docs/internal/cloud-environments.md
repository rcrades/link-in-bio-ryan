# Cloud Agent Environments

This is the shared record of the cloud agent environments that work on Ryan's
bio sites, so that no driver (Claude Code, Codex, or another agent) depends on
another driver's private notes or local skills. It lists names, hosts, and
verification state only. **Never put a secret value in this file.** Update it
in the same PR whenever an environment, secret, host, or start instruction
changes, and re-check the live provider settings before relying on it.

The same record lives in `rcrades/biosite` (private) at
`docs/internal/cloud-environments.md`. Keep the two copies in step.

## Codex Cloud: `biosite`

One environment covers both bio-site repositories, so a task can read and
change either one.

| Item                  | Setting |
| --------------------- | ------- |
| Where it lives        | chatgpt.com → Settings → Codex Cloud → Environments → `biosite` (Private, Only me) |
| Repositories          | `rcrades/biosite` (Next.js, pnpm) checked out at `/workspace/biosite`; `rcrades/link-in-bio-ryan` (legacy Vite site, npm) at `/workspace/link-in-bio-ryan`. Base branch `main` for both |
| Development Convex    | Network secret `DEV_CONVEX_DATA_KEY`, sent only to `original-puffin-455.convex.cloud`. Despite its `dev:` name, this deployment holds the **live data for both sites** |
| Production Convex     | Network secret `PROD_CONVEX_DATA_KEY`, sent only to `greedy-kangaroo-156.convex.cloud` (the project's unused production deployment; the biosite build guard rejects it as a frontend target) |
| PR screenshot uploads | Network secret `RCR_SCREENSHOTS_BLOB_READ_WRITE_TOKEN`, sent only to `vercel.com` |
| Plain variables       | `CI=true`, `HUSKY=0`, `COREPACK_ENABLE_DOWNLOAD_PROMPT=0`, `COREPACK_ENABLE_AUTO_PIN=0`, `NEXT_TELEMETRY_DISABLED=1`, `NEXT_TURBOPACK_EXPERIMENTAL_USE_SYSTEM_TLS_CERTS=1`, `XDG_CACHE_HOME`, `XDG_CONFIG_HOME`, `XDG_DATA_HOME`, `PNPM_HOME`, `COREPACK_HOME`, `npm_config_cache` (all under `/workspace/.cloud-env`), and the public URLs `NEXT_PUBLIC_CONVEX_URL` / `VITE_CONVEX_URL` = `https://original-puffin-455.convex.cloud` |
| Allowed hosts         | Package-manager preset plus `original-puffin-455.convex.cloud`, `original-puffin-455.convex.site`, `greedy-kangaroo-156.convex.cloud`, `fonts.googleapis.com`, `fonts.gstatic.com`, `vercel.com`, `u9m58mqjikxrp4ko.public.blob.vercel-storage.com`, `nodejs.org` |
| Install script        | Pins Node 24.21.0 (SHA-256-verified download from nodejs.org), installs Corepack 0.34.0 and activates pnpm 10.32.1, exports `PATH` and `NODE_OPTIONS=--use-system-ca`, unsets `CONVEX_DEPLOY_KEY`, `VERCEL_TOKEN`, `VERCEL_ENV`, `VERCEL_OIDC_TOKEN`, and `SEED_SECRET`, then runs `pnpm install --frozen-lockfile` in biosite and `npm ci` in link-in-bio-ryan |
| Start instructions    | Read each repo's `AGENTS.md` (and `CLAUDE.md` when present) first. pnpm only in biosite, npm only in link-in-bio-ryan; branch off `main`, never push to `main`. Every Convex write on either deployment (mutation, data edit, import, migration, env change) needs Ryan's explicit go-ahead in that task. Never run `convex deploy`, `convex dev`, `pnpm convex:deploy`, any `vercel` command, `pnpm cutover:preflight`, biosite `scripts/import-cutover-audit.mjs`, or link-in-bio-ryan `scripts/seed-*.mjs`. Never enable the auth bypass. Never copy Guest Brief or admin data into logs, PR bodies, issues, or screenshots |
| Last verified         | 2026-10-13 setup task: frozen installs; biosite `pnpm lint` (0 problems), `pnpm typecheck`, `pnpm test` (43/43), `pnpm build` (14/14 static pages, Google Fonts fetched); link-in-bio-ryan `npm run build` (1,605 modules, no test script). The secrets and live Convex reads were not yet verified from a fresh task |

### Why Node 24

The biosite timeout tests in `scripts/site-data.test.mjs` are cancelled on
Node 22 (28 passed, 15 cancelled), because `AbortSignal.timeout` is unref'd and
the event loop can empty before the deadline fires. They pass on Node 24, which
is also Vercel's default. link-in-bio-ryan's `.node-version` says `20.x`; `npm ci`
on Node 24 only prints an accepted `EBADENGINE` warning.

### Convex keys

Keys follow the naming convention `codex-<project>-data-<prod|dev>`, matching
Programview and CeremonyLab:

| Key name                  | Deployment            | Permissions |
| ------------------------- | --------------------- | ----------- |
| `codex-biosite-data-dev`  | `original-puffin-455` | `deployment:data:view`, `deployment:functions:runInternalQueries`, `deployment:functions:runInternalMutations` |
| `codex-biosite-data-prod` | `greedy-kangaroo-156` | same three |

Deploy, pause, environment-variable, backup, and every other permission stay
off. These keys are separate from any Vercel or local deploy key, so each can
be revoked on its own from the deployment's Convex Settings page.

### How Codex secrets differ from Claude Code credentials

- Codex network secrets are placeholder substitution only. The task sees a
  placeholder in `$DEV_CONVEX_DATA_KEY`; the proxy swaps in the real value only
  when the task itself sends that placeholder to the allowed host. Codex never
  adds headers, so callers must send `Authorization: Convex $DEV_CONVEX_DATA_KEY`
  (or the prod key) themselves.
- `@vercel/blob` reads a store id out of the token string. Whether it accepts
  Codex's placeholder is unverified, so screenshot uploads may fail until a
  fresh task proves them.
- Secrets typed into the environment panel stay staged until **Save draft**.
  If a publish reports "settings changed or in use" and you choose **Discard
  unsaved changes**, staged secrets are lost. Save the draft, then **Retry**.
- New secrets reach only tasks started after the environment is republished.
- Behind Codex's proxy, Node's fetch needs system CA trust
  (`NODE_OPTIONS=--use-system-ca`) and Turbopack needs
  `NEXT_TURBOPACK_EXPERIMENTAL_USE_SYSTEM_TLS_CERTS=1` for `next/font/google`.
  Keep TLS verification on and never add `--use-env-proxy`. The Corepack bundled
  with Node fails DNS behind the proxy, so the install script installs
  Corepack 0.34.0 instead.
- `PATH` and `NODE_OPTIONS` cannot be plain variables, so the install script
  and start skill export them.
- Only public Convex URLs belong in plain variables. Codex environment
  variables are readable by every command a task runs.

## Claude Code cloud

No bio-site Claude Code cloud environment is recorded here yet. When one is set
up or confirmed, add a section with the same items as above.
