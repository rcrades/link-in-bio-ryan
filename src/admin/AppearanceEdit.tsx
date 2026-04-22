import { useEffect, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";

type StateValue = "idea" | "planning" | "upcoming" | "recent" | "media" | "archived";
type TypeValue = "video" | "article" | "interview" | "in-person" | "podcast" | "panel";

type Form = {
  state: StateValue;
  visible: boolean;
  type: TypeValue;
  title: string;
  description: string;
  date: string;
  url: string;
  source: string;
  speaker: string;
  presentedBy: string;
  time: string;
  hideEventBand: boolean;
  hideHeadshot: boolean;
  thumbnailId: string;
  thumbnailStorageId: Id<"_storage"> | null;
  logoStorageId: Id<"_storage"> | null;
  logoBg: "" | "light" | "dark";
  headshotStorageId: Id<"_storage"> | null;
  backgroundStorageId: Id<"_storage"> | null;
  logoKey: string;
  orderHint: string;
};

const EMPTY_FORM: Form = {
  state: "idea",
  visible: true,
  type: "in-person",
  title: "",
  description: "",
  date: new Date().toISOString().slice(0, 10),
  url: "",
  source: "",
  speaker: "",
  presentedBy: "",
  time: "",
  hideEventBand: false,
  hideHeadshot: false,
  thumbnailId: "",
  thumbnailStorageId: null,
  logoStorageId: null,
  logoBg: "",
  headshotStorageId: null,
  backgroundStorageId: null,
  logoKey: "",
  orderHint: "",
};

const STATES: StateValue[] = ["idea", "planning", "upcoming", "recent", "media", "archived"];
const TYPES: TypeValue[] = ["video", "article", "interview", "in-person", "podcast", "panel"];

export function AppearanceEdit({
  id,
  onSaved,
  onDeleted,
}: {
  id: Id<"appearances"> | null;
  onSaved: (id: Id<"appearances">) => void;
  onDeleted: () => void;
}) {
  const existing = useQuery(api.appearances.get, id ? { id } : "skip");
  const upsert = useMutation(api.appearances.upsert);
  const remove = useMutation(api.appearances.remove);
  const setState = useMutation(api.appearances.setState);
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);

  const [form, setForm] = useState<Form>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"content" | "planning">("content");

  useEffect(() => {
    if (id === null) {
      setForm(EMPTY_FORM);
      return;
    }
    if (existing) {
      setForm({
        state: existing.state,
        visible: existing.visible,
        type: existing.type,
        title: existing.title,
        description: existing.description ?? "",
        date: existing.date,
        url: existing.url ?? "",
        source: existing.source ?? "",
        speaker: existing.speaker ?? "",
        presentedBy: existing.presentedBy ?? "",
        time: existing.time ?? "",
        hideEventBand: !!existing.hideEventBand,
        hideHeadshot: !!existing.hideHeadshot,
        thumbnailId: existing.thumbnailId ?? "",
        thumbnailStorageId: existing.thumbnailStorageId ?? null,
        logoStorageId: existing.logoStorageId ?? null,
        logoBg: existing.logoBg ?? "",
        headshotStorageId: existing.headshotStorageId ?? null,
        backgroundStorageId: existing.backgroundStorageId ?? null,
        logoKey: existing.logoKey ?? "",
        orderHint: existing.orderHint?.toString() ?? "",
      });
    }
  }, [id, existing]);

  if (id && existing === undefined) return <div className="admin-empty">Loading…</div>;

  async function uploadFile(file: File): Promise<Id<"_storage">> {
    const uploadUrl = await generateUploadUrl({});
    const res = await fetch(uploadUrl, {
      method: "POST",
      headers: { "Content-Type": file.type },
      body: file,
    });
    if (!res.ok) throw new Error(`Upload failed: ${res.status}`);
    const json = (await res.json()) as { storageId: Id<"_storage"> };
    return json.storageId;
  }

  async function handleFileChange(
    e: React.ChangeEvent<HTMLInputElement>,
    field: "thumbnailStorageId" | "logoStorageId" | "headshotStorageId" | "backgroundStorageId",
  ) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const storageId = await uploadFile(file);
      setForm((f) => ({ ...f, [field]: storageId }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      const newId = await upsert({
        id: id ?? undefined,
        state: form.state,
        visible: form.visible,
        orderHint: form.orderHint ? Number(form.orderHint) : undefined,
        type: form.type,
        title: form.title,
        description: form.description || undefined,
        date: form.date,
        url: form.url || undefined,
        source: form.source || undefined,
        speaker: form.speaker || undefined,
        presentedBy: form.presentedBy || undefined,
        time: form.time || undefined,
        hideEventBand: form.hideEventBand || undefined,
        hideHeadshot: form.hideHeadshot || undefined,
        thumbnailId: form.thumbnailId || undefined,
        thumbnailStorageId: form.thumbnailStorageId ?? undefined,
        logoStorageId: form.logoStorageId ?? undefined,
        logoBg: form.logoBg || undefined,
        headshotStorageId: form.headshotStorageId ?? undefined,
        backgroundStorageId: form.backgroundStorageId ?? undefined,
        logoKey: form.logoKey || undefined,
      });
      onSaved(newId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!id) return;
    if (!confirm("Delete this appearance permanently?")) return;
    await remove({ id });
    onDeleted();
  }

  async function handleStateChange(next: StateValue) {
    if (!id) {
      setForm((f) => ({ ...f, state: next }));
      return;
    }
    await setState({ id, state: next });
    setForm((f) => ({ ...f, state: next }));
  }

  const thumbnailPreview = id && existing?.thumbnailUrl ? existing.thumbnailUrl : null;
  const logoPreview = id && existing?.logoUrl ? existing.logoUrl : null;

  return (
    <form className="admin-edit" onSubmit={handleSave}>
      <div className="admin-edit-tabs">
        <button
          type="button"
          className={activeTab === "content" ? "active" : ""}
          onClick={() => setActiveTab("content")}
        >
          Card content
        </button>
        <button
          type="button"
          className={activeTab === "planning" ? "active" : ""}
          onClick={() => setActiveTab("planning")}
        >
          Planning
        </button>
      </div>

      {activeTab === "content" && (
        <>
          <div className="admin-edit-row">
            <label>
              State
              <select
                value={form.state}
                onChange={(e) => handleStateChange(e.target.value as StateValue)}
              >
                {STATES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </label>
            <label className="admin-edit-checkbox">
              <input
                type="checkbox"
                checked={form.visible}
                onChange={(e) => setForm((f) => ({ ...f, visible: e.target.checked }))}
              />
              Visible on site
            </label>
          </div>

          <div className="admin-edit-row">
            <label>
              Type
              <select
                value={form.type}
                onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as TypeValue }))}
              >
                {TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </label>
            <label>
              Date
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                required
              />
            </label>
          </div>

          <label>
            Title
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              required
            />
          </label>

          <label>
            Description (Recent Activity shows this under title)
            <input
              type="text"
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            />
          </label>

          <label>
            URL
            <input
              type="url"
              value={form.url}
              onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))}
            />
          </label>

          <label>
            Source (event or publication name)
            <input
              type="text"
              value={form.source}
              onChange={(e) => setForm((f) => ({ ...f, source: e.target.value }))}
            />
          </label>

          <fieldset className="admin-edit-fieldset">
            <legend>Imagery</legend>

            <label>
              YouTube video ID (auto-generates thumbnail)
              <input
                type="text"
                value={form.thumbnailId}
                onChange={(e) => setForm((f) => ({ ...f, thumbnailId: e.target.value }))}
                placeholder="e.g. i8l8gEdD6fQ"
              />
            </label>

            <div className="admin-edit-row">
              <label>
                Thumbnail image
                <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "thumbnailStorageId")} />
                {thumbnailPreview && (
                  <img src={thumbnailPreview} alt="" className="admin-edit-preview" />
                )}
              </label>
              <label>
                Logo image (for article/event cards)
                <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "logoStorageId")} />
                {logoPreview && <img src={logoPreview} alt="" className="admin-edit-preview" />}
              </label>
            </div>

            <label>
              Logo background tone
              <select
                value={form.logoBg}
                onChange={(e) => setForm((f) => ({ ...f, logoBg: e.target.value as "" | "light" | "dark" }))}
              >
                <option value="">(auto)</option>
                <option value="light">light</option>
                <option value="dark">dark</option>
              </select>
            </label>
          </fieldset>

          <fieldset className="admin-edit-fieldset">
            <legend>In-person details (only used for Media/in-person cards)</legend>
            <div className="admin-edit-row">
              <label>
                Speaker
                <input
                  type="text"
                  value={form.speaker}
                  onChange={(e) => setForm((f) => ({ ...f, speaker: e.target.value }))}
                />
              </label>
              <label>
                Presented by
                <input
                  type="text"
                  value={form.presentedBy}
                  onChange={(e) => setForm((f) => ({ ...f, presentedBy: e.target.value }))}
                />
              </label>
            </div>
            <label>
              Time
              <input
                type="text"
                value={form.time}
                onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))}
              />
            </label>
            <div className="admin-edit-row">
              <label className="admin-edit-checkbox">
                <input
                  type="checkbox"
                  checked={form.hideEventBand}
                  onChange={(e) => setForm((f) => ({ ...f, hideEventBand: e.target.checked }))}
                />
                Hide event band
              </label>
              <label className="admin-edit-checkbox">
                <input
                  type="checkbox"
                  checked={form.hideHeadshot}
                  onChange={(e) => setForm((f) => ({ ...f, hideHeadshot: e.target.checked }))}
                />
                Hide headshot
              </label>
            </div>
          </fieldset>

          {error && <p className="admin-error">{error}</p>}

          <div className="admin-edit-actions">
            <button type="submit" disabled={saving}>
              {saving ? "Saving…" : id ? "Save changes" : "Create appearance"}
            </button>
            {id && (
              <button type="button" className="admin-danger" onClick={handleDelete}>
                Delete
              </button>
            )}
          </div>
        </>
      )}

      {activeTab === "planning" && (
        <div className="admin-edit-placeholder">
          <h2>Planning workspace</h2>
          <p>
            The richer planning layer — thesis, brief, research, social posts,
            speaker applications — hooks up here in v2. Each will link back to
            this appearance record.
          </p>
        </div>
      )}
    </form>
  );
}
