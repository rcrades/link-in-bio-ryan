import { QueryCtx, MutationCtx } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";
import { getAuthUserId } from "@convex-dev/auth/server";

export async function requireAuth(ctx: QueryCtx | MutationCtx): Promise<Id<"users">> {
  const userId = await getAuthUserId(ctx);
  if (!userId) throw new Error("Not authenticated");
  return userId;
}

export async function requireAdmin(
  ctx: QueryCtx | MutationCtx,
): Promise<Doc<"users">> {
  const userId = await requireAuth(ctx);
  const user = await ctx.db.get(userId);
  if (!user) throw new Error("Not authenticated");
  if (!user.approved || !user.isAdmin) throw new Error("Unauthorized");
  return user;
}
