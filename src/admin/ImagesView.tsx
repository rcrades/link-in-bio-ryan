import { useRef, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";

type Img = {
  _id: Id<"images">;
  storageId: Id<"_storage">;
  name: string;
  contentType?: string;
  size?: number;
  tag?: string;
  alt?: string;
  uploadedAt: number;
  url: string | null;
};

export function ImagesView() {
  const images = useQuery(api.images.list, {});
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const saveImage = useMutation(api.images.save);
  const updateImage = useMutation(api.images.update);
  const removeImage = useMutation(api.images.remove);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadName, setUploadName] = useState("");
  const [uploadTag, setUploadTag] = useState("");
  const [uploadAlt, setUploadAlt] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      setError("Pick a file first.");
      return;
    }
    setError(null);
    setUploading(true);
    try {
      const uploadUrl = await generateUploadUrl({});
      const res = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });
      if (!res.ok) throw new Error(`Upload failed: ${res.status}`);
      const { storageId } = (await res.json()) as { storageId: Id<"_storage"> };
      await saveImage({
        storageId,
        name: uploadName.trim() || file.name,
        contentType: file.type || undefined,
        size: file.size,
        tag: uploadTag.trim() || undefined,
        alt: uploadAlt.trim() || undefined,
      });
      setUploadName("");
      setUploadTag("");
      setUploadAlt("");
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function handleCopy(id: string) {
    try {
      await navigator.clipboard.writeText(id);
      setCopiedId(id);
      setTimeout(() => setCopiedId((c) => (c === id ? null : c)), 1500);
    } catch {
      setError("Copy failed");
    }
  }

  async function handleDelete(img: Img) {
    if (!confirm(`Delete "${img.name}"? This can't be undone.`)) return;
    await removeImage({ id: img._id });
  }

  return (
    <main className="admin-images">
      <section className="admin-images-upload">
        <h2>Upload image</h2>
        <form onSubmit={handleUpload} className="admin-images-form">
          <label>
            File
            <input ref={fileInputRef} type="file" accept="image/*" required />
          </label>
          <div className="admin-edit-row">
            <label>
              Name <span className="admin-muted-hint">(defaults to filename)</span>
              <input
                type="text"
                value={uploadName}
                onChange={(e) => setUploadName(e.target.value)}
                placeholder="e.g. Podcast cover v1"
              />
            </label>
            <label>
              Tag <span className="admin-muted-hint">(optional — group images)</span>
              <input
                type="text"
                value={uploadTag}
                onChange={(e) => setUploadTag(e.target.value)}
                placeholder="e.g. guest-brief"
              />
            </label>
          </div>
          <label>
            Alt text
            <input
              type="text"
              value={uploadAlt}
              onChange={(e) => setUploadAlt(e.target.value)}
              placeholder="Describe the image for screen readers"
            />
          </label>
          {error && <p className="admin-error">{error}</p>}
          <div className="admin-edit-actions">
            <button type="submit" disabled={uploading}>
              {uploading ? "Uploading…" : "Upload"}
            </button>
          </div>
        </form>
      </section>

      <section className="admin-images-gallery">
        <h2>Library {images && `(${images.length})`}</h2>
        {images === undefined && <div className="admin-empty">Loading…</div>}
        {images && images.length === 0 && (
          <div className="admin-empty">No images yet. Upload one above.</div>
        )}
        {images && images.length > 0 && (
          <div className="admin-images-grid">
            {images.map((img) => (
              <ImageCard
                key={img._id}
                img={img as Img}
                copied={copiedId === img.storageId}
                onCopy={() => handleCopy(img.storageId)}
                onDelete={() => handleDelete(img as Img)}
                onUpdate={(patch) => updateImage({ id: img._id, ...patch })}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function ImageCard({
  img,
  copied,
  onCopy,
  onDelete,
  onUpdate,
}: {
  img: Img;
  copied: boolean;
  onCopy: () => void;
  onDelete: () => void;
  onUpdate: (patch: { name?: string; tag?: string; alt?: string }) => Promise<unknown>;
}) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(img.name);
  const [tag, setTag] = useState(img.tag ?? "");
  const [alt, setAlt] = useState(img.alt ?? "");
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    try {
      await onUpdate({ name, tag, alt });
      setEditing(false);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="admin-image-card">
      <div className="admin-image-thumb">
        {img.url ? (
          <img src={img.url} alt={img.alt ?? ""} loading="lazy" />
        ) : (
          <div className="admin-image-broken">No preview</div>
        )}
      </div>
      {!editing ? (
        <div className="admin-image-meta">
          <div className="admin-image-name">{img.name}</div>
          <div className="admin-image-sub">
            {img.tag && <span className="admin-image-tag">{img.tag}</span>}
            {img.size && <span>{(img.size / 1024).toFixed(0)} KB</span>}
            <span>{new Date(img.uploadedAt).toLocaleDateString()}</span>
          </div>
          <div className="admin-image-id">
            <code>{img.storageId}</code>
          </div>
          <div className="admin-image-actions">
            <button type="button" onClick={onCopy}>
              {copied ? "Copied" : "Copy ID"}
            </button>
            <button type="button" onClick={() => setEditing(true)}>
              Edit
            </button>
            <button type="button" className="admin-danger-link" onClick={onDelete}>
              Delete
            </button>
          </div>
        </div>
      ) : (
        <div className="admin-image-meta admin-image-edit">
          <label>
            Name
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            Tag
            <input type="text" value={tag} onChange={(e) => setTag(e.target.value)} />
          </label>
          <label>
            Alt text
            <input type="text" value={alt} onChange={(e) => setAlt(e.target.value)} />
          </label>
          <div className="admin-image-actions">
            <button type="button" onClick={handleSave} disabled={saving}>
              {saving ? "Saving…" : "Save"}
            </button>
            <button type="button" onClick={() => setEditing(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
