import fs from "node:fs/promises";
import path from "node:path";
import Image from "next/image";

interface CatalogItem {
  file_name: string;
  title: string;
  description: string;
}

interface CatalogSection {
  folder: "projects/images" | "projects/videos";
  media: CatalogItem[];
}

async function getMediaCatalog(): Promise<CatalogSection[]> {
  const catalogPath = path.join(process.cwd(), "public", "projects", "media-catalog.json");
  const fallbackImagesDir = path.join(process.cwd(), "public", "projects", "images");

  try {
    const raw = await fs.readFile(catalogPath, "utf8");
    return JSON.parse(raw) as CatalogSection[];
  } catch {
    // Fallback: if catalog is missing, render only image filenames with generic copy.
    const files = (await fs.readdir(fallbackImagesDir)).sort((a, b) =>
      a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }),
    );

    return [
      {
        folder: "projects/images",
        media: files.map((file, idx) => ({
          file_name: file,
          title: `Intervento di muratura - Foto ${String(idx + 1).padStart(3, "0")}`,
          description:
            "Documentazione fotografica delle lavorazioni edili con focus su qualita esecutiva e avanzamento del cantiere.",
        })),
      },
      {
        folder: "projects/videos",
        media: [],
      },
    ];
  }
}

export default async function ProgettiPage() {
  const catalog = await getMediaCatalog();
  const images = catalog.find((section) => section.folder === "projects/images")?.media ?? [];
  const videos = catalog.find((section) => section.folder === "projects/videos")?.media ?? [];

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

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-center justify-between">
            <h2 className="text-2xl font-black text-neutral-900 sm:text-3xl">Video di Cantiere</h2>
            <span className="rounded-full bg-neutral-200 px-4 py-1 text-sm font-semibold text-neutral-700">
              {videos.length} video
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {videos.map((item) => {
              const src = `/projects/videos/${item.file_name}`;
              return (
                <article
                  key={`video-${item.file_name}`}
                  className="overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50 shadow-sm"
                >
                  <video
                    src={src}
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
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-center justify-between">
            <h2 className="text-2xl font-black text-neutral-900 sm:text-3xl">Foto di Progetto</h2>
            <span className="rounded-full bg-amber-100 px-4 py-1 text-sm font-semibold text-amber-700">
              {images.length} immagini
            </span>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {images.map((item) => {
              const src = `/projects/images/${item.file_name}`;
              return (
                <article
                  key={`img-${item.file_name}`}
                  className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative h-56">
                    <Image
                      src={src}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="mb-2 text-base font-bold text-neutral-900">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-neutral-600">{item.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
