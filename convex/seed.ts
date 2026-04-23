import { mutation } from "./_generated/server";
import { v } from "convex/values";

// One-time seed flow guarded by SEED_SECRET env var. Intended to be called
// once per deployment from scripts/seed-appearances.mjs. Idempotent: skips
// insertion if the appearances table is non-empty.

function checkSecret(provided: string) {
  const expected = process.env.SEED_SECRET;
  if (!expected) throw new Error("SEED_SECRET not set on deployment");
  if (provided !== expected) throw new Error("Bad seed secret");
}

export const generateUploadUrl = mutation({
  args: { secret: v.string() },
  handler: async (ctx, { secret }) => {
    checkSecret(secret);
    return await ctx.storage.generateUploadUrl();
  },
});

export const seedRecentActivity = mutation({
  args: {
    secret: v.string(),
    items: v.array(
      v.object({
        type: v.union(
          v.literal("video"),
          v.literal("article"),
          v.literal("interview"),
          v.literal("in-person"),
          v.literal("podcast"),
          v.literal("panel"),
        ),
        title: v.string(),
        description: v.optional(v.string()),
        date: v.string(),
        url: v.optional(v.string()),
        thumbnailId: v.optional(v.string()),
        thumbnailStorageId: v.optional(v.id("_storage")),
        logoStorageId: v.optional(v.id("_storage")),
        logoBg: v.optional(v.union(v.literal("light"), v.literal("dark"))),
      }),
    ),
  },
  handler: async (ctx, { secret, items }) => {
    checkSecret(secret);
    const existing = await ctx.db.query("appearances").take(1);
    if (existing.length > 0) {
      return { skipped: true, reason: "appearances table already populated" };
    }
    const inserted: string[] = [];
    for (const it of items) {
      const id = await ctx.db.insert("appearances", {
        state: "recent",
        visible: true,
        type: it.type,
        title: it.title,
        description: it.description,
        date: it.date,
        url: it.url,
        thumbnailId: it.thumbnailId,
        thumbnailStorageId: it.thumbnailStorageId,
        logoStorageId: it.logoStorageId,
        logoBg: it.logoBg,
      });
      inserted.push(id);
    }
    return { inserted: inserted.length };
  },
});

/**
 * Upsert a single appearance, keyed on title + date. Used by scripts that
 * need to add or update a specific talk (e.g. an upcoming speaking engagement)
 * without wiping the full appearances table. Idempotent across re-runs.
 */
export const upsertOne = mutation({
  args: {
    secret: v.string(),
    state: v.union(
      v.literal("idea"),
      v.literal("planning"),
      v.literal("upcoming"),
      v.literal("recent"),
      v.literal("media"),
      v.literal("archived"),
    ),
    visible: v.boolean(),
    type: v.union(
      v.literal("video"),
      v.literal("article"),
      v.literal("interview"),
      v.literal("in-person"),
      v.literal("podcast"),
      v.literal("panel"),
    ),
    title: v.string(),
    description: v.optional(v.string()),
    date: v.string(),
    dateDisplay: v.optional(v.string()),
    url: v.optional(v.string()),
    source: v.optional(v.string()),
    speaker: v.optional(v.string()),
    presentedBy: v.optional(v.string()),
    time: v.optional(v.string()),
    hideEventBand: v.optional(v.boolean()),
    hideHeadshot: v.optional(v.boolean()),
    thumbnailId: v.optional(v.string()),
    thumbnailStorageId: v.optional(v.id("_storage")),
    logoStorageId: v.optional(v.id("_storage")),
    logoBg: v.optional(v.union(v.literal("light"), v.literal("dark"))),
    headshotStorageId: v.optional(v.id("_storage")),
    backgroundStorageId: v.optional(v.id("_storage")),
    logoKey: v.optional(v.string()),
    orderHint: v.optional(v.number()),
    planningAbstract: v.optional(v.string()),
    planningObjectives: v.optional(v.array(v.string())),
    planningCoPresenters: v.optional(
      v.array(
        v.object({
          name: v.string(),
          organization: v.optional(v.string()),
          role: v.optional(v.string()),
          notes: v.optional(v.string()),
        }),
      ),
    ),
    planningFormat: v.optional(v.string()),
    planningNotes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    checkSecret(args.secret);
    const { secret: _secret, ...rest } = args;
    const existing = await ctx.db
      .query("appearances")
      .filter((q) => q.and(q.eq(q.field("title"), rest.title), q.eq(q.field("date"), rest.date)))
      .first();
    if (existing) {
      await ctx.db.patch(existing._id, rest);
      return { updated: existing._id };
    }
    const id = await ctx.db.insert("appearances", rest);
    return { inserted: id };
  },
});
