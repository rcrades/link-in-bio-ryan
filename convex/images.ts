import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { requireAdmin } from "./authGuards";

export const list = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    const rows = await ctx.db
      .query("images")
      .withIndex("by_uploaded_at")
      .order("desc")
      .collect();
    return Promise.all(
      rows.map(async (r) => ({
        _id: r._id,
        storageId: r.storageId,
        name: r.name,
        contentType: r.contentType,
        size: r.size,
        tag: r.tag,
        alt: r.alt,
        uploadedAt: r.uploadedAt,
        url: await ctx.storage.getUrl(r.storageId),
      })),
    );
  },
});

export const publicV0Templates = query({
  args: {},
  handler: async (ctx) => {
    const rows = await ctx.db
      .query("images")
      .withIndex("by_tag", (q) => q.eq("tag", "v0-templates"))
      .collect();

    return Promise.all(
      rows.map(async (r) => ({
        name: r.name,
        alt: r.alt,
        url: await ctx.storage.getUrl(r.storageId),
      })),
    );
  },
});

export const save = mutation({
  args: {
    storageId: v.id("_storage"),
    name: v.string(),
    contentType: v.optional(v.string()),
    size: v.optional(v.number()),
    tag: v.optional(v.string()),
    alt: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await requireAdmin(ctx);
    return await ctx.db.insert("images", {
      storageId: args.storageId,
      name: args.name,
      contentType: args.contentType,
      size: args.size,
      tag: args.tag,
      alt: args.alt,
      uploadedAt: Date.now(),
      uploadedBy: user._id,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("images"),
    name: v.optional(v.string()),
    tag: v.optional(v.string()),
    alt: v.optional(v.string()),
  },
  handler: async (ctx, { id, name, tag, alt }) => {
    await requireAdmin(ctx);
    const patch: Record<string, unknown> = {};
    if (name !== undefined) patch.name = name;
    if (tag !== undefined) patch.tag = tag || undefined;
    if (alt !== undefined) patch.alt = alt || undefined;
    await ctx.db.patch(id, patch);
  },
});

export const remove = mutation({
  args: { id: v.id("images") },
  handler: async (ctx, { id }) => {
    await requireAdmin(ctx);
    const row = await ctx.db.get(id);
    if (!row) return;
    await ctx.storage.delete(row.storageId);
    await ctx.db.delete(id);
  },
});
