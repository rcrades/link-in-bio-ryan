import { useState } from "react";
import { useQuery } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { AppearancesList } from "./AppearancesList";
import { AppearanceEdit } from "./AppearanceEdit";
import { ImagesView } from "./ImagesView";

type Me = {
  _id: Id<"users">;
  email: string;
  approved: boolean;
  isAdmin: boolean;
};

type View = "appearances" | "images";

export function Dashboard({ me }: { me: Me }) {
  const { signOut } = useAuthActions();
  const [view, setView] = useState<View>("appearances");

  return (
    <div className="admin-app">
      <header className="admin-header">
        <h1>Content admin</h1>
        <nav className="admin-nav">
          <button
            type="button"
            className={view === "appearances" ? "active" : ""}
            onClick={() => setView("appearances")}
          >
            Appearances
          </button>
          <button
            type="button"
            className={view === "images" ? "active" : ""}
            onClick={() => setView("images")}
          >
            Images
          </button>
        </nav>
        <div className="admin-header-right">
          <span className="admin-me">{me.email}</span>
          <button type="button" onClick={() => void signOut()}>Sign out</button>
        </div>
      </header>
      {view === "appearances" ? <AppearancesView /> : <ImagesView />}
    </div>
  );
}

function AppearancesView() {
  const [selectedId, setSelectedId] = useState<Id<"appearances"> | "new" | null>(null);
  const appearances = useQuery(api.appearances.listAdmin, {});

  return (
    <main className="admin-main" data-selected={selectedId !== null ? "yes" : "no"}>
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
        {selectedId !== null && (
          <button
            type="button"
            className="admin-back-mobile"
            onClick={() => setSelectedId(null)}
          >
            ← List
          </button>
        )}
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
  );
}
