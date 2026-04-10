import type { Metadata } from "next";
import { adminDb } from "@/lib/firebase-admin";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Galleria Cantieri — Foto e Video Lavori Edili Parma",
  description:
    "Guarda la galleria reale dei cantieri di Edil Simo a Parma: foto e video di interventi di muratura, ristrutturazioni e nuove costruzioni documentati direttamente sul campo.",
  alternates: { canonical: "https://edil-simo.vercel.app/progetti" },
  openGraph: {
    url: "https://edil-simo.vercel.app/progetti",
    title: "Galleria Cantieri | Edil Simo Parma — Foto e Video Lavori",
    description:
      "Foto e video reali dei nostri cantieri a Parma: muratura, ristrutturazioni e costruzioni documentate sul campo.",
  },
};

interface MediaItem {
  id: string;
  url: string;
  type: "image" | "video";
  title: string;
  description: string;
  featured: boolean;
}

async function getMedia(): Promise<{ images: MediaItem[]; videos: MediaItem[] }> {
  try {
    const snapshot = await adminDb
      .collection("media")
      .orderBy("createdAt", "desc")
      .get();

    const all = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as MediaItem));

    return {
      images: all.filter((m) => m.type === "image"),
      videos: all.filter((m) => m.type === "video"),
    };
  } catch {
    // Firestore not yet configured — return empty so the page still renders
    return { images: [], videos: [] };
  }
}

export default async function ProgettiPage() {
  const { images, videos } = await getMedia();

  return (
    <>
      <section className="bg-neutral-900 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-amber-400">
              Lavori reali
            </p>
            <h1 className="mb-4 text-3xl font-black text-white sm:text-5xl">
              Galleria Fotografica e Video di Cantiere
            </h1>
            <p className="mx-auto text-lg text-neutral-300">
              In questa pagina trovi materiale reale dei nostri interventi: fasi di muratura,
              lavorazioni operative e avanzamento dei cantieri documentati direttamente sul campo.
            </p>
          </div>
        </div>
      </section>

      {videos.length > 0 && (
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex items-center justify-between">
              <h2 className="text-2xl font-black text-neutral-900 sm:text-3xl">Video di Cantiere</h2>
              <span className="rounded-full bg-neutral-200 px-4 py-1 text-sm font-semibold text-neutral-700">
                {videos.length} video
              </span>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {videos.map((item) => (
                <article
                  key={item.id}
                  className="overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50 shadow-sm"
                >
                  {item.featured && (
                    <div className="flex items-center gap-1.5 bg-amber-400 px-4 py-1.5 text-xs font-bold text-neutral-900">
                      <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                      </svg>
                      In evidenza
                    </div>
                  )}
                  <video
                    src={item.url}
                    controls
                    preload="metadata"
                    className="h-64 w-full bg-black object-cover"
                  >
                    Il tuo browser non supporta il tag video.
                  </video>
                  <div className="p-4">
                    <h3 className="mb-2 text-base font-bold text-neutral-900">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-neutral-600">{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-neutral-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-center justify-between">
            <h2 className="text-2xl font-black text-neutral-900 sm:text-3xl">Foto di Progetto</h2>
            <span className="rounded-full bg-amber-100 px-4 py-1 text-sm font-semibold text-amber-700">
              {images.length} immagini
            </span>
          </div>

          {images.length === 0 ? (
            <div className="flex h-40 items-center justify-center rounded-xl border border-dashed border-neutral-300 text-neutral-400">
              <p className="text-sm">Nessuna immagine disponibile</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {images.map((item) => (
                <article
                  key={item.id}
                  className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                >
                  {item.featured && (
                    <div className="flex items-center gap-1.5 bg-amber-400 px-4 py-1.5 text-xs font-bold text-neutral-900">
                      <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                      </svg>
                      In evidenza
                    </div>
                  )}
                  <div className="relative h-56">
                    <Image
                      src={item.url}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      unoptimized
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="mb-2 text-base font-bold text-neutral-900">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-neutral-600">{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
