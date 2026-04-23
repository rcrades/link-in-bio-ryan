import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
  ...authTables,

  users: defineTable({
    email: v.string(),
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.number()),
    isAnonymous: v.optional(v.boolean()),
    approved: v.optional(v.boolean()),
    isAdmin: v.optional(v.boolean()),
  }).index("email", ["email"]),

  appearances: defineTable({
    state: v.union(
      v.literal("idea"),
      v.literal("planning"),
      v.literal("upcoming"),
      v.literal("recent"),
      v.literal("media"),
      v.literal("archived"),
    ),
    visible: v.boolean(),
    orderHint: v.optional(v.number()),

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
  })
    .index("by_state", ["state"])
    .index("by_state_visible_date", ["state", "visible", "date"])
    .index("by_date", ["date"]),

  images: defineTable({
    storageId: v.id("_storage"),
    name: v.string(),
    contentType: v.optional(v.string()),
    size: v.optional(v.number()),
    tag: v.optional(v.string()),
    alt: v.optional(v.string()),
    uploadedAt: v.number(),
    uploadedBy: v.optional(v.id("users")),
  })
    .index("by_uploaded_at", ["uploadedAt"])
    .index("by_tag", ["tag"]),
});
