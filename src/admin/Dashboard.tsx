import { useState } from "react";
import { useQuery } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { AppearancesList } from "./AppearancesList";
import { AppearanceEdit } from "./AppearanceEdit";

type Me = {
  _id: Id<"users">;
  email: string;
  approved: boolean;
  isAdmin: boolean;
};

export function Dashboard({ me }: { me: Me }) {
  const { signOut } = useAuthActions();
  const [selectedId, setSelectedId] = useState<Id<"appearances"> | "new" | null>(null);
  const appearances = useQuery(api.appearances.listAdmin, {});

  return (
    <div className="admin-app">
      <header className="admin-header">
        <h1>Content admin</h1>
        <div className="admin-header-right">
          <span className="admin-me">{me.email}</span>
          <button type="button" onClick={() => void signOut()}>Sign out</button>
        </div>
      </header>
      <main className="admin-main">
        <section className="admin-list-col">
          <div className="admin-list-toolbar">
            <button type="button" onClick={() => setSelectedId("new")}>
              + New appearance
            </button>
          </div>
          <AppearancesList
            items={appearances ?? []}
            loading={appearances === undefined}
            selectedId={selectedId === "new" ? null : selectedId}
            onSelect={setSelectedId}
          />
        </section>
        <section className="admin-edit-col">
          {selectedId === null ? (
            <div className="admin-empty">Select an appearance on the left, or create a new one.</div>
          ) : (
            <AppearanceEdit
              key={selectedId}
              id={selectedId === "new" ? null : selectedId}
              onSaved={(id) => setSelectedId(id)}
              onDeleted={() => setSelectedId(null)}
            />
          )}
        </section>
      </main>
    </div>
  );
}
