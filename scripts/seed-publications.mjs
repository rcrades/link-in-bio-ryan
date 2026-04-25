#!/usr/bin/env node
// Seeds the historical publications list (talks, articles, interviews, videos)
// from src/data/publications.json into the appearances table with state="media".
// Uploads any referenced headshot/background images to Convex file storage first.
//
// Insert-only and keyed on (title, date) — items already in the table (e.g. an
// upcoming talk also listed in publications.json) are skipped so their state
// is preserved. Safe to re-run.
//
// Usage:
//   VITE_CONVEX_URL=https://<slug>.convex.cloud SEED_SECRET=<hex> \
//     node scripts/seed-publications.mjs

import fs from "node:fs/promises";
import path from "node:path";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js";
import publicationsData from "../src/data/publications.json" with { type: "json" };

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

// Cache so the same asset (e.g. /profile-backup.jpg shared across talks) is
// uploaded once per run.
const uploadCache = new Map();

async function uploadPublicFile(relPath) {
  if (uploadCache.has(relPath)) return uploadCache.get(relPath);
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
  uploadCache.set(relPath, storageId);
  console.log(`  uploaded ${relPath} → ${storageId}`);
  return storageId;
}

const items = [];
for (const p of publicationsData.publications) {
  const item = {
    type: p.type,
    title: p.title,
    date: p.date,
    dateDisplay: p.dateDisplay,
    url: p.url,
    source: p.source,
    speaker: p.speaker,
    presentedBy: p.presentedBy,
    time: p.time,
    hideEventBand: p.hideEventBand,
    hideHeadshot: p.hideHeadshot,
    logoKey: p.logoKey,
  };
  if (p.headshot) {
    item.headshotStorageId = await uploadPublicFile(p.headshot);
  }
  if (p.background) {
    item.backgroundStorageId = await uploadPublicFile(p.background);
  }
  if (p.logo) {
    item.logoStorageId = await uploadPublicFile(p.logo);
    if (p.logoBg) item.logoBg = p.logoBg;
  }
  items.push(item);
  console.log(`prepared: ${p.title}`);
}

const result = await client.mutation(api.seed.seedPublications, { secret: SECRET, items });
console.log("seed result:", result);
