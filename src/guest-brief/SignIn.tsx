import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";

export function SignIn() {
  const { signIn } = useAuthActions();
  const [mode, setMode] = useState<"signIn" | "signUp">("signIn");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await signIn("password", { email, password, flow: mode });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="gb-shell">
      <form className="gb-card" onSubmit={handleSubmit}>
        <div className="gb-eyebrow">Guest brief</div>
        <h1>{mode === "signIn" ? "Sign in to read the brief" : "Create an account"}</h1>
        <p className="gb-muted gb-small">
          This page is lightly gated while the show takes shape. Use the email
          Ryan sent the invite to.
        </p>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={mode === "signIn" ? "current-password" : "new-password"}
            minLength={8}
            required
          />
        </label>
        {error && <p className="gb-error">{error}</p>}
        <button type="submit" disabled={submitting}>
          {submitting ? "…" : mode === "signIn" ? "Sign in" : "Create account"}
        </button>
        <button
          type="button"
          className="gb-link"
          onClick={() => {
            setError(null);
            setMode(mode === "signIn" ? "signUp" : "signIn");
          }}
        >
          {mode === "signIn"
            ? "Create an account"
            : "Use an existing account"}
        </button>
      </form>
    </div>
  );
}
