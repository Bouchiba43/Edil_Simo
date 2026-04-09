import Image from "next/image";
import Link from "next/link";

interface HeroProps {
  title: string;
  subtitle: string;
  ctaLabel?: string;
  ctaHref?: string;
  imageUrl: string;
  imageAlt: string;
  overlay?: boolean;
  size?: "large" | "medium";
}

export default function Hero({
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  imageUrl,
  imageAlt,
  overlay = true,
  size = "large",
}: HeroProps) {
  const heightClass = size === "large" ? "min-h-[90vh]" : "min-h-[50vh]";

  return (
    <section className={`relative flex items-center justify-center ${heightClass} overflow-hidden`}>
      {/* Background Image */}
      <Image
        src={imageUrl}
        alt={imageAlt}
        fill
        className="object-cover object-center"
        priority
        sizes="100vw"
      />

      {/* Overlay */}
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/60 to-gray-900/40" />
      )}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-1 w-12 bg-amber-400" />
            <span className="text-amber-400 text-sm font-semibold uppercase tracking-widest">
              Edil Simo
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
            {title}
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 leading-relaxed mb-8 max-w-2xl">
            {subtitle}
          </p>
          {ctaLabel && ctaHref && (
            <div className="flex flex-wrap gap-4">
              <Link
                href={ctaHref}
                className="inline-flex items-center gap-2 px-8 py-4 bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold rounded-md text-base transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
              >
                {ctaLabel}
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/servizi"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold rounded-md text-base transition-all duration-200"
              >
                I Nostri Servizi
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
