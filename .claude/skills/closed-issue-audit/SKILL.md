---
name: closed-issue-audit
description: Audit a closed rcrades/link-in-bio-ryan GitHub issue after a PR or merge to decide whether it is genuinely resolved. Use when asked to audit, verify, re-check, or apply the complete-complete convention to a closed issue.
---

# Closed Issue Audit

## Purpose

Verify closed issues against their acceptance criteria and current repository truth. The goal is a clear verdict: either the issue is complete-complete and can remain closed, or it has a concrete gap that should be reopened or handled in a follow-up issue.

## Workflow

1. **Load issue and closure context**
   - Read the issue body, acceptance criteria, labels, comments, closing PRs, merge commits, and reviewer evidence.
   - Identify whether the issue was closed by a merged PR, a manual close, or a follow-up after another PR.
   - Keep issue-facing comments plain-language. Put technical proof in PR bodies, screenshots, checks, or implementation notes.

2. **Audit from current truth**
   - Prefer current `origin/main` or a clean audit worktree over an old feature branch.
   - Preserve unrelated local changes. If the current worktree is dirty, create a clean audit worktree from the relevant remote base.
   - Compare merged code, content data, docs, screenshots, and reviewer evidence against every acceptance criterion.
   - For UI/content issues, check both hard layouts: desktop >= 1000px and mobile < 1000px. Also check dark and light mode when relevant.

3. **Run or refresh verification**
   - Run focused commands that prove the criteria. Use `vercel build` for repo changes unless the audit is purely GitHub metadata or issue hygiene.
   - For docs-only audits, verify the relevant mirrored docs or skill files stay synchronized and run `git diff --check`.
   - For UI-affecting audits, follow the repo screenshot-evidence workflow before saying the review surface is complete.
   - Record exact commands and results.

4. **Check issue hygiene**
   - Stale checkboxes, status text, labels, or completion notes are hygiene problems, not automatic failures.
   - If current evidence proves a criterion is satisfied, update the issue body before posting the final verdict.
   - If the repo uses an `audit-passed` label, add or confirm it only after a complete-complete audit.
   - If any criterion is not satisfied, do not check it off and do not use the complete-complete verdict.

5. **Post or edit the audit comment**
   - Comments must start with `Codex here:`.
   - If complete-complete, the first line must use this header:

```text
Codex here: ✅✅ **Verdict: complete-complete. I fully agree #<issue> should remain closed.**
```

   - Put the verdict first. Then list concise findings, exact post-merge verification, and any non-blocking caveats.
   - If not complete-complete, start with a clear reopen or follow-up verdict and list the blocking acceptance criteria.
