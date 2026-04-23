import { Id } from "../../convex/_generated/dataModel";

type Item = {
  _id: Id<"appearances">;
  state: string;
  visible: boolean;
  type: string;
  title: string;
  date: string;
  source?: string;
  thumbnailUrl: string | null;
  logoUrl: string | null;
  thumbnailId?: string;
};

const STATE_ORDER = ["idea", "planning", "upcoming", "recent", "media", "archived"] as const;

export function AppearancesList({
  items,
  loading,
  selectedId,
  onSelect,
}: {
  items: Item[];
  loading: boolean;
  selectedId: Id<"appearances"> | null;
  onSelect: (id: Id<"appearances">) => void;
}) {
  if (loading) return <div className="admin-empty">Loading…</div>;
  if (items.length === 0) {
    return <div className="admin-empty">No appearances yet. Create your first one.</div>;
  }

  const grouped = STATE_ORDER.map((state) => ({
    state,
    items: items.filter((i) => i.state === state),
  })).filter((g) => g.items.length > 0);

  return (
    <div className="admin-list">
      {grouped.map(({ state, items }) => (
        <div key={state} className="admin-list-group">
          <div className="admin-list-group-header">{state} ({items.length})</div>
          {items.map((item) => (
            <button
              key={item._id}
              type="button"
              className={
                "admin-list-item" +
                (selectedId === item._id ? " admin-list-item-selected" : "") +
                (!item.visible ? " admin-list-item-hidden" : "")
              }
              onClick={() => onSelect(item._id)}
            >
              <div className="admin-list-item-title">
                <span className="admin-list-item-type">{item.type}</span>
                {item.title}
              </div>
              <div className="admin-list-item-meta">
                {item.date}
                {item.source ? ` · ${item.source}` : ""}
                {!item.visible ? " · hidden" : ""}
              </div>
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
