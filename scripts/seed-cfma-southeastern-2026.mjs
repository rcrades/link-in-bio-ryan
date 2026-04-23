#!/usr/bin/env node
// Seeds the upcoming Southeastern CFMA 2026 speaking engagement into the
// appearances table. Uploads the bridge hero image + Ramp logo to Convex
// storage first. Idempotent: keyed on title + date.
//
// Usage:
//   VITE_CONVEX_URL=https://<slug>.convex.cloud SEED_SECRET=<hex> \
//     node scripts/seed-cfma-southeastern-2026.mjs

import fs from "node:fs/promises";
import path from "node:path";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js";

const CONVEX_URL = process.env.VITE_CONVEX_URL;
const SECRET = process.env.SEED_SECRET;

if (!CONVEX_URL) throw new Error("VITE_CONVEX_URL env required");
if (!SECRET) throw new Error("SEED_SECRET env required");

const root = path.resolve(new URL("..", import.meta.url).pathname);
const client = new ConvexHttpClient(CONVEX_URL);

function contentTypeFor(p) {
  const ext = path.extname(p).toLowerCase();
  if (ext === ".png") return "image/png";
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  if (ext === ".webp") return "image/webp";
  if (ext === ".avif") return "image/avif";
  if (ext === ".svg") return "image/svg+xml";
  return "application/octet-stream";
}

async function uploadPublicFile(relPath) {
  const diskPath = path.join(root, "public", relPath.replace(/^\//, ""));
  const bytes = await fs.readFile(diskPath);
  const uploadUrl = await client.mutation(api.seed.generateUploadUrl, { secret: SECRET });
  const res = await fetch(uploadUrl, {
    method: "POST",
    headers: { "Content-Type": contentTypeFor(diskPath) },
    body: bytes,
  });
  if (!res.ok) throw new Error(`Upload failed for ${relPath}: ${res.status} ${await res.text()}`);
  const { storageId } = await res.json();
  console.log(`  uploaded ${relPath} → ${storageId}`);
  return storageId;
}

console.log("Uploading hero assets…");
const backgroundStorageId = await uploadPublicFile("southeastern-cfma-bridge.jpg");
const logoStorageId = await uploadPublicFile("logos/ramp.svg");

const ABSTRACT = `Artificial intelligence is increasingly embedded across construction and accounting technology: from estimating and preconstruction tools to spend management, accounts payable, and financial analysis. While these tools promise efficiency and consistency, they also introduce new considerations related to controls, data integrity, and professional judgment.

This panel brings together leaders from construction and accounting technology to discuss how AI is being applied in practice today. Rather than focusing on emerging technology for its own sake, the session examines how AI is changing the day-to-day experience of accounting work, what risks CPAs should be mindful of, and how to evaluate AI-enabled tools across the full construction finance stack.`;

const OBJECTIVES = [
  "Distinguish between rules-based automation, assistive AI, and more autonomous (agentic) workflows in accounting",
  "Assess implications of AI-enabled tools on audit trails, internal controls, and compliance",
  "Develop criteria for evaluating AI solutions across estimating, accounting, and financial operations",
];

const CO_PRESENTERS = [
  {
    name: "Teddy",
    organization: "Ramp",
    role: "Product team",
    notes: "Co-presenter from Ramp product team. Last name + exact title TBD — confirm before event.",
  },
  {
    name: "Blake",
    organization: "United Infrastructure Group",
    role: "Ramp customer",
    notes: "Customer perspective on Ramp in a construction finance stack. Last name TBD.",
  },
];

const PLANNING_NOTES = `Format TBD — Ramp team noted this may land as a panel. Confirm moderator vs. panelist role closer to the event.

Conference runs Aug 19–21, 2026 at The Westin Chattanooga. Session is on Aug 20.

Partner contact: Ramp team (shared the initial session description + co-presenter list).`;

console.log("Upserting Southeastern CFMA 2026 talk…");
const result = await client.mutation(api.seed.upsertOne, {
  secret: SECRET,
  state: "upcoming",
  visible: true,
  // "in-person" triggers the rich speaking-engagement card (bridge background +
  // partner logo + title + speaker line). The panel format lives in planningFormat.
  type: "in-person",
  title: "Accounting in the Age of AI: What's Changing, What's Not, and What Construction CPAs Need to Watch For",
  date: "2026-08-20",
  dateDisplay: "Thursday, Aug 20, 2026",
  url: "https://www.southeastern.cfmaregional.org/",
  source: "Southeastern CFMA Regional Conference",
  speaker: "Ryan Rademann",
  presentedBy: "With Ramp",
  backgroundStorageId,
  logoStorageId,
  hideHeadshot: true,
  planningAbstract: ABSTRACT,
  planningObjectives: OBJECTIVES,
  planningCoPresenters: CO_PRESENTERS,
  planningFormat: "Panel (TBD — may evolve into moderated discussion)",
  planningNotes: PLANNING_NOTES,
});

console.log("seed result:", result);
