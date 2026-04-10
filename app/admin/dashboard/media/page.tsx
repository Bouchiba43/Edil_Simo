"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { auth } from "@/lib/firebase";
import Image from "next/image";

interface MediaItem {
  id: string;
  url: string;
  key: string;
  type: "image" | "video";
  title: string;
  description: string;
  featured: boolean;
  mimeType: string;
  fileSize: number;
  createdAt: { _seconds: number } | null;
}

interface MediaResponse {
  items: MediaItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const LIMIT = 12;

const DESCRIPTION_TEMPLATE =
  "Documentazione fotografica delle lavorazioni edili in cantiere, con attenzione alla qualita esecutiva e alla corretta posa dei materiali. Lo scatto evidenzia una fase operativa utile a mostrare lo stato di avanzamento e la cura dei dettagli costruttivi.";

async function getToken() {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");
  return user.getIdToken();
}

export default function MediaPage() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [total, setTotal] = useState(0);
  const [imageCount, setImageCount] = useState(0); // unfiltered image count for template
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [typeFilter, setTypeFilter] = useState<"" | "image" | "video">("");
  const [featuredFilter, setFeaturedFilter] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [editItem, setEditItem] = useState<MediaItem | null>(null);

  const fetchImageCount = useCallback(async () => {
    try {
      const token = await getToken();
      const res = await fetch("/api/admin/media?type=image&limit=1&page=1", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data: MediaResponse = await res.json();
      setImageCount(data.total ?? 0);
    } catch { /* non-critical */ }
  }, []);

  const fetchMedia = useCallback(async () => {
    setLoading(true);
    try {
      const token = await getToken();
      const params = new URLSearchParams({ page: String(page), limit: String(LIMIT) });
      if (typeFilter) params.set("type", typeFilter);
      if (featuredFilter) params.set("featured", "true");

      const res = await fetch(`/api/admin/media?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data: MediaResponse = await res.json();
      setMedia(data.items ?? []);
      setTotal(data.total ?? 0);
      setTotalPages(data.totalPages ?? 1);
    } finally {
      setLoading(false);
    }
  }, [page, typeFilter, featuredFilter]);

  useEffect(() => { fetchMedia(); }, [fetchMedia]);
  useEffect(() => { fetchImageCount(); }, [fetchImageCount]);
  useEffect(() => { setPage(1); }, [typeFilter, featuredFilter]);

  async function toggleFeatured(item: MediaItem) {
    const token = await getToken();
    await fetch(`/api/admin/media/${item.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ featured: !item.featured }),
    });
    fetchMedia();
  }

  async function deleteItem(item: MediaItem) {
    if (!confirm(`Eliminare "${item.title || item.key}"?`)) return;
    const token = await getToken();
    await fetch(`/api/admin/media/${item.id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchMedia();
    fetchImageCount();
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Gestione Media</h1>
          <p className="mt-1 text-sm text-neutral-400">{total} file totali</p>
        </div>
        <button
          onClick={() => setUploadOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-amber-400 px-5 py-2.5 font-bold text-neutral-900 transition hover:bg-amber-300"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
          </svg>
          Carica media
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-3">
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value as "" | "image" | "video")}
          className="rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2 text-sm text-white focus:border-amber-400 focus:outline-none"
        >
          <option value="">Tutti i tipi</option>
          <option value="image">Immagini</option>
          <option value="video">Video</option>
        </select>

        <button
          onClick={() => setFeaturedFilter((v) => !v)}
          className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition ${
            featuredFilter
              ? "border-amber-400 bg-amber-400/10 text-amber-400"
              : "border-neutral-700 bg-neutral-800 text-neutral-400 hover:text-white"
          }`}
        >
          <svg className="h-4 w-4" fill={featuredFilter ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
          </svg>
          In evidenza
        </button>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-amber-400 border-t-transparent" />
        </div>
      ) : media.length === 0 ? (
        <div className="flex h-64 flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-neutral-700 text-neutral-500">
          <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
          <p className="text-sm font-medium">Nessun media trovato</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {media.map((item) => (
            <MediaCard
              key={item.id}
              item={item}
              onToggleFeatured={() => toggleFeatured(item)}
              onDelete={() => deleteItem(item)}
              onEdit={() => setEditItem(item)}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2 text-sm text-white disabled:opacity-40 hover:bg-neutral-700 transition"
          >
            ← Precedente
          </button>
          <span className="text-sm text-neutral-400">
            Pagina {page} di {totalPages}
          </span>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2 text-sm text-white disabled:opacity-40 hover:bg-neutral-700 transition"
          >
            Successiva →
          </button>
        </div>
      )}

      {/* Upload Modal */}
      {uploadOpen && (
        <UploadModal
          nextImageNumber={imageCount + 1}
          onClose={() => setUploadOpen(false)}
          onSuccess={() => { setUploadOpen(false); fetchMedia(); fetchImageCount(); }}
        />
      )}

      {/* Edit Modal */}
      {editItem && (
        <EditModal
          item={editItem}
          onClose={() => setEditItem(null)}
          onSuccess={() => { setEditItem(null); fetchMedia(); }}
        />
      )}
    </div>
  );
}

// ─── MediaCard ───────────────────────────────────────────────────────────────

function MediaCard({
  item,
  onToggleFeatured,
  onDelete,
  onEdit,
}: {
  item: MediaItem;
  onToggleFeatured: () => void;
  onDelete: () => void;
  onEdit: () => void;
}) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900">
      <div className="relative h-48 bg-neutral-800">
        {item.type === "video" ? (
          // Don't render a <video> in the grid — each one triggers a network
          // request and stalls rendering. Show a static placeholder instead.
          <div className="flex h-full w-full items-center justify-center">
            <svg className="h-12 w-12 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </div>
        ) : (
          <Image
            src={item.url}
            alt={item.title || item.key}
            fill
            loading="lazy"
            className="object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            unoptimized
          />
        )}
        <span className="absolute left-2 top-2 rounded-md bg-black/60 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
          {item.type === "video" ? "Video" : "Foto"}
        </span>
        {item.featured && (
          <span className="absolute right-2 top-2 rounded-md bg-amber-400/90 px-2 py-0.5 text-xs font-bold text-neutral-900 backdrop-blur-sm">
            In evidenza
          </span>
        )}
      </div>

      <div className="p-3">
        <p className="truncate text-sm font-semibold text-white">
          {item.title || <span className="text-neutral-500 italic">Senza titolo</span>}
        </p>
        {item.description && (
          <p className="mt-0.5 line-clamp-2 text-xs text-neutral-500">{item.description}</p>
        )}
      </div>

      <div className="flex border-t border-neutral-800">
        <button
          onClick={onToggleFeatured}
          title={item.featured ? "Rimuovi da evidenza" : "Metti in evidenza"}
          className={`flex flex-1 items-center justify-center gap-1.5 py-2 text-xs font-medium transition ${
            item.featured
              ? "text-amber-400 hover:bg-amber-400/10"
              : "text-neutral-500 hover:bg-neutral-800 hover:text-amber-400"
          }`}
        >
          <svg className="h-3.5 w-3.5" fill={item.featured ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
          </svg>
          {item.featured ? "Evidenziato" : "Evidenzia"}
        </button>

        <button
          onClick={onEdit}
          className="flex flex-1 items-center justify-center gap-1.5 border-l border-neutral-800 py-2 text-xs font-medium text-neutral-500 transition hover:bg-neutral-800 hover:text-white"
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
          </svg>
          Modifica
        </button>

        <button
          onClick={onDelete}
          className="flex flex-1 items-center justify-center gap-1.5 border-l border-neutral-800 py-2 text-xs font-medium text-neutral-500 transition hover:bg-red-500/10 hover:text-red-400"
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
          Elimina
        </button>
      </div>
    </div>
  );
}

// ─── UploadModal ─────────────────────────────────────────────────────────────

function UploadModal({
  nextImageNumber,
  onClose,
  onSuccess,
}: {
  nextImageNumber: number;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const defaultTitle = `Intervento di muratura - Foto ${String(nextImageNumber).padStart(3, "0")}`;
  const [files, setFiles] = useState<File[]>([]);
  const [title, setTitle] = useState(defaultTitle);
  const [description, setDescription] = useState(DESCRIPTION_TEMPLATE);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFilesSelected(selected: File[]) {
    setFiles(selected);
    if (selected.length === 0) return;

    const isImage = selected[0].type.startsWith("image/");
    if (selected.length === 1 && isImage) {
      setTitle(`Intervento di muratura - Foto ${String(nextImageNumber).padStart(3, "0")}`);
      setDescription(DESCRIPTION_TEMPLATE);
    } else if (selected.length === 1 && !isImage) {
      setTitle("Video di cantiere");
      setDescription("Riprese video delle lavorazioni edili in cantiere.");
    }
    // Multiple files — keep defaults, they'll be auto-numbered during upload
  }

  async function handleUpload() {
    if (files.length === 0) return;
    setUploading(true);
    setError("");
    setProgress({ done: 0, total: files.length });

    try {
      const token = await getToken();
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const form = new FormData();
        form.append("file", file);

        const uploadRes = await fetch("/api/admin/upload", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: form,
        });
        if (!uploadRes.ok) throw new Error(`Upload fallito per ${file.name}`);
        const { url, key, type, mimeType, fileSize } = await uploadRes.json();

        // For multi-file: auto-number images sequentially
        let itemTitle = title;
        if (files.length > 1 && type === "image") {
          itemTitle = `Intervento di muratura - Foto ${String(nextImageNumber + i).padStart(3, "0")}`;
        } else if (files.length > 1) {
          itemTitle = file.name.replace(/\.[^.]+$/, "");
        }

        await fetch("/api/admin/media", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({
            url,
            key,
            type,
            title: itemTitle,
            description: files.length === 1 ? description : DESCRIPTION_TEMPLATE,
            mimeType,
            fileSize,
          }),
        });

        setProgress({ done: i + 1, total: files.length });
      }
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Errore durante il caricamento");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl bg-neutral-900 shadow-2xl">
        <div className="flex items-center justify-between border-b border-neutral-800 px-6 py-4">
          <h2 className="text-lg font-bold text-white">Carica media</h2>
          <button onClick={onClose} className="text-neutral-400 hover:text-white">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4 p-6">
          {/* Drop zone */}
          <div
            onClick={() => inputRef.current?.click()}
            className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-neutral-700 py-10 transition hover:border-amber-400"
          >
            <svg className="h-10 w-10 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            {files.length > 0 ? (
              <p className="text-sm font-medium text-amber-400">{files.length} file selezionati</p>
            ) : (
              <p className="text-sm text-neutral-400">Clicca per selezionare immagini o video</p>
            )}
            <input
              ref={inputRef}
              type="file"
              multiple
              accept="image/*,video/*"
              className="hidden"
              onChange={(e) => handleFilesSelected(Array.from(e.target.files ?? []))}
            />
          </div>

          {files.length <= 1 && (
            <>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-neutral-300">Titolo</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-neutral-300">Descrizione</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full resize-none rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none"
                />
              </div>
            </>
          )}

          {files.length > 1 && (
            <p className="rounded-lg bg-amber-400/10 px-4 py-3 text-xs text-amber-300">
              Le foto verranno titolate automaticamente da Foto {String(nextImageNumber).padStart(3, "0")} a Foto {String(nextImageNumber + files.filter(f => f.type.startsWith("image/")).length - 1).padStart(3, "0")}.
            </p>
          )}

          {error && <p className="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">{error}</p>}

          {progress && (
            <div>
              <div className="mb-1 flex justify-between text-xs text-neutral-400">
                <span>Caricamento…</span>
                <span>{progress.done}/{progress.total}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-neutral-800">
                <div
                  className="h-full bg-amber-400 transition-all duration-300"
                  style={{ width: `${(progress.done / progress.total) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3 border-t border-neutral-800 px-6 py-4">
          <button
            onClick={onClose}
            disabled={uploading}
            className="flex-1 rounded-lg border border-neutral-700 py-2.5 text-sm font-medium text-neutral-300 hover:bg-neutral-800 disabled:opacity-50 transition"
          >
            Annulla
          </button>
          <button
            onClick={handleUpload}
            disabled={files.length === 0 || uploading}
            className="flex-1 rounded-lg bg-amber-400 py-2.5 text-sm font-bold text-neutral-900 hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-50 transition"
          >
            {uploading ? "Caricamento…" : `Carica${files.length > 0 ? ` (${files.length})` : ""}`}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── EditModal ────────────────────────────────────────────────────────────────

function EditModal({
  item,
  onClose,
  onSuccess,
}: {
  item: MediaItem;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    try {
      const token = await getToken();
      await fetch(`/api/admin/media/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title, description }),
      });
      onSuccess();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-neutral-900 shadow-2xl">
        <div className="flex items-center justify-between border-b border-neutral-800 px-6 py-4">
          <h2 className="text-lg font-bold text-white">Modifica media</h2>
          <button onClick={onClose} className="text-neutral-400 hover:text-white">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4 p-6">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-neutral-300">Titolo</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-neutral-300">Descrizione</label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full resize-none rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex gap-3 border-t border-neutral-800 px-6 py-4">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-neutral-700 py-2.5 text-sm font-medium text-neutral-300 hover:bg-neutral-800 transition"
          >
            Annulla
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 rounded-lg bg-amber-400 py-2.5 text-sm font-bold text-neutral-900 hover:bg-amber-300 disabled:opacity-50 transition"
          >
            {saving ? "Salvataggio…" : "Salva"}
          </button>
        </div>
      </div>
    </div>
  );
}
