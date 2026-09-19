import { useConvexAuth, useQuery } from "convex/react";
import type { FunctionReference } from "convex/server";
import { api } from "../../convex/_generated/api";
import { SignIn } from "./SignIn";
import { Brief } from "./Brief";
import type { GuestBriefContent } from "./types";

type GuestBriefQuery = FunctionReference<
  "query",
  "public",
  Record<string, never>,
  GuestBriefContent
>;

const getApprovedGuestBrief = (
  api as unknown as { guestBrief: { getApproved: GuestBriefQuery } }
).guestBrief.getApproved;

export function App() {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const me = useQuery(api.users.me, isAuthenticated ? {} : "skip");
  const brief = useQuery(
    getApprovedGuestBrief,
    isAuthenticated && me?.approved ? {} : "skip"
  );

  if (isLoading) return <LoadingShell />;
  if (!isAuthenticated) return <SignIn />;
  if (me === undefined) return <LoadingShell />;
  if (!me || !me.approved) return <AwaitingApproval email={me?.email} />;
  if (brief === undefined) return <LoadingShell />;
  return <Brief brief={brief} />;
}

function LoadingShell() {
  return (
    <div className="gb-shell">
      <div className="gb-center">Loading…</div>
    </div>
  );
}

function AwaitingApproval({ email }: { email?: string }) {
  return (
    <div className="gb-shell">
      <div className="gb-card">
        <h1>Thanks for signing up</h1>
        <p>
          You are signed in as <strong>{email}</strong>. This account is not
          approved for the guest brief yet.
        </p>
        <p className="gb-muted">
          Reply to the email that sent you here and Ryan can sort it out.
        </p>
      </div>
    </div>
  );
}
