import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { Doc, Id } from "./_generated/dataModel";
import { requireAdmin } from "./authGuards";

const stateLiterals = v.union(
  v.literal("idea"),
  v.literal("planning"),
  v.literal("upcoming"),
  v.literal("recent"),
  v.literal("media"),
  v.literal("archived"),
);

const typeLiterals = v.union(
  v.literal("video"),
  v.literal("article"),
  v.literal("interview"),
  v.literal("in-person"),
  v.literal("podcast"),
  v.literal("panel"),
);

async function resolveUrls(
  ctx: { storage: { getUrl: (id: Id<"_storage">) => Promise<string | null> } },
  doc: Doc<"appearances">,
) {
  const [thumbnailUrl, logoUrl, headshotUrl, backgroundUrl] = await Promise.all([
    doc.thumbnailStorageId ? ctx.storage.getUrl(doc.thumbnailStorageId) : null,
    doc.logoStorageId ? ctx.storage.getUrl(doc.logoStorageId) : null,
    doc.headshotStorageId ? ctx.storage.getUrl(doc.headshotStorageId) : null,
    doc.backgroundStorageId ? ctx.storage.getUrl(doc.backgroundStorageId) : null,
  ]);
  return { thumbnailUrl, logoUrl, headshotUrl, backgroundUrl };
}

/** Public: items to render in a specific homepage section. Only visible items, sorted newest first. */
export const listPublic = query({
  args: { state: stateLiterals },
  handler: async (ctx, { state }) => {
    const rows = await ctx.db
      .query("appearances")
      .withIndex("by_state", (q) => q.eq("state", state))
      .collect();

    const visible = rows.filter((r) => r.visible);
    visible.sort((a, b) => {
      const dateCmp = b.date.localeCompare(a.date);
      if (dateCmp !== 0) return dateCmp;
      return (a.orderHint ?? 0) - (b.orderHint ?? 0);
    });

    return Promise.all(
      visible.map(async (doc) => {
        const urls = await resolveUrls(ctx, doc);
        return {
          _id: doc._id,
          state: doc.state,
          type: doc.type,
          title: doc.title,
          description: doc.description,
          date: doc.date,
          dateDisplay: doc.dateDisplay,
          url: doc.url,
          source: doc.source,
          speaker: doc.speaker,
          presentedBy: doc.presentedBy,
          time: doc.time,
          hideEventBand: doc.hideEventBand,
          hideHeadshot: doc.hideHeadshot,
          thumbnailId: doc.thumbnailId,
          logoBg: doc.logoBg,
          logoKey: doc.logoKey,
          ...urls,
        };
      }),
    );
  },
});

/** Admin: all items including hidden/drafts. */
export const listAdmin = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    const rows = await ctx.db.query("appearances").collect();
    rows.sort((a, b) => b.date.localeCompare(a.date));
    return Promise.all(
      rows.map(async (doc) => ({ ...doc, ...(await resolveUrls(ctx, doc)) })),
    );
  },
});

export const get = query({
  args: { id: v.id("appearances") },
  handler: async (ctx, { id }) => {
    await requireAdmin(ctx);
    const doc = await ctx.db.get(id);
    if (!doc) return null;
    return { ...doc, ...(await resolveUrls(ctx, doc)) };
  },
});

const upsertArgs = {
  id: v.optional(v.id("appearances")),
  state: stateLiterals,
  visible: v.boolean(),
  orderHint: v.optional(v.number()),
  type: typeLiterals,
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
};

export const upsert = mutation({
  args: upsertArgs,
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const { id, ...rest } = args;
    if (id) {
      await ctx.db.patch(id, rest);
      return id;
    }
    return await ctx.db.insert("appearances", rest);
  },
});

export const setState = mutation({
  args: { id: v.id("appearances"), state: stateLiterals },
  handler: async (ctx, { id, state }) => {
    await requireAdmin(ctx);
    await ctx.db.patch(id, { state });
  },
});

export const setVisible = mutation({
  args: { id: v.id("appearances"), visible: v.boolean() },
  handler: async (ctx, { id, visible }) => {
    await requireAdmin(ctx);
    await ctx.db.patch(id, { visible });
  },
});

export const remove = mutation({
  args: { id: v.id("appearances") },
  handler: async (ctx, { id }) => {
    await requireAdmin(ctx);
    await ctx.db.delete(id);
  },
});
