import { mutation } from "./_generated/server";
import { v } from "convex/values";

// One-off helper to promote a user account to admin by email, gated by
// SEED_SECRET so it can't be called by site visitors. Useful when the
// dev-bypass email doesn't match (e.g. Gmail dot variants).
export const promoteByEmail = mutation({
  args: { secret: v.string(), email: v.string() },
  handler: async (ctx, { secret, email }) => {
    if (secret !== process.env.SEED_SECRET) throw new Error("Bad secret");
    const normalized = email.trim().toLowerCase();
    const user = await ctx.db
      .query("users")
      .withIndex("email", (q) => q.eq("email", normalized))
      .unique();
    if (!user) throw new Error(`No user found with email ${normalized}`);
    await ctx.db.patch(user._id, { approved: true, isAdmin: true });
    return { ok: true, userId: user._id };
  },
});
