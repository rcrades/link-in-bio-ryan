import { convexAuth } from "@convex-dev/auth/server";
import { Password } from "@convex-dev/auth/providers/Password";
import { shouldAutoPromote } from "./devBypass";

function normalizeEmail(value: unknown) {
  return String(value ?? "")
    .trim()
    .toLowerCase();
}

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [
    Password({
      profile(params) {
        return { email: normalizeEmail(params.email) };
      },
    }),
  ],
  callbacks: {
    async beforeSessionCreation(ctx, { userId }) {
      const user = await ctx.db.get(userId);
      if (!user || (user.approved && user.isAdmin)) return;

      if (
        shouldAutoPromote(
          user.email,
          process.env.DEV_AUTH_BYPASS,
          process.env.DEV_AUTH_BYPASS_EMAIL,
        )
      ) {
        await ctx.db.patch(userId, { approved: true, isAdmin: true });
      }
    },
  },
});
