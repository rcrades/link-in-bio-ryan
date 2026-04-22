#!/usr/bin/env node
// Seeds the current activity.json content into the appearances table.
// Uploads image assets (thumbnails + logos) to Convex file storage first.
// Idempotent: skips if appearances is non-empty.
//
// Usage:
//   VITE_CONVEX_URL=https://<slug>.convex.cloud SEED_SECRET=<hex> node scripts/seed-appearances.mjs

import fs from "node:fs/promises";
import path from "node:path";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js";
import activityData from "../src/data/activity.json" with { type: "json" };

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

const items = [];
for (const a of activityData.activities) {
  const item = {
    type: a.type,
    title: a.title,
    description: a.description,
    date: a.date,
    url: a.url,
    thumbnailId: a.thumbnailId,
  };
  if (a.thumbnail) {
    item.thumbnailStorageId = await uploadPublicFile(a.thumbnail);
  }
  if (a.logo) {
    item.logoStorageId = await uploadPublicFile(a.logo);
    if (a.logoBg) item.logoBg = a.logoBg;
  }
  items.push(item);
  console.log(`prepared: ${a.title}`);
}

const result = await client.mutation(api.seed.seedRecentActivity, { secret: SECRET, items });
console.log("seed result:", result);
