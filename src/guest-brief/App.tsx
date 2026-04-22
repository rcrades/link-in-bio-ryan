import { useConvexAuth, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { SignIn } from "./SignIn";
import { Brief } from "./Brief";

export function App() {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const me = useQuery(api.users.me, isAuthenticated ? {} : "skip");

  if (isLoading) return <LoadingShell />;
  if (!isAuthenticated) return <SignIn />;
  if (me === undefined) return <LoadingShell />;
  if (!me || !me.approved) return <AwaitingApproval email={me?.email} />;
  return <Brief />;
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
          You're signed in as <strong>{email}</strong>. We haven't approved this
          account for the guest brief yet — usually that's a one-line reply on
          the email that sent you here.
        </p>
        <p className="gb-muted">
          If you got here without an intro, drop a note to ryan and we'll sort
          it out.
        </p>
      </div>
    </div>
  );
}
