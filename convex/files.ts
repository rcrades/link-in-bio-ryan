import { mutation } from "./_generated/server";
import { requireAdmin } from "./authGuards";

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    return await ctx.storage.generateUploadUrl();
  },
});
