import { useConvexAuth, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { SignIn } from "./SignIn";
import { Dashboard } from "./Dashboard";

export function App() {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const me = useQuery(api.users.me, isAuthenticated ? {} : "skip");

  if (isLoading) return <LoadingShell />;
  if (!isAuthenticated) return <SignIn />;
  if (me === undefined) return <LoadingShell />;
  if (!me || !me.approved || !me.isAdmin) {
    return <NotApproved email={me?.email} />;
  }
  return <Dashboard me={me} />;
}

function LoadingShell() {
  return (
    <div className="admin-shell">
      <div className="admin-center">Loading…</div>
    </div>
  );
}

function NotApproved({ email }: { email?: string }) {
  return (
    <div className="admin-shell">
      <div className="admin-card">
        <h1>Awaiting approval</h1>
        <p>
          Signed in as <strong>{email}</strong>, but this account isn't
          approved for admin access yet.
        </p>
      </div>
    </div>
  );
}
