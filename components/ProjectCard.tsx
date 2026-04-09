import Image from "next/image";

interface ProjectCardProps {
  title: string;
  description: string;
  category: string;
  location: string;
  imageUrl: string;
  imageAlt: string;
  year?: string;
}

export default function ProjectCard({
  title,
  description,
  category,
  location,
  imageUrl,
  imageAlt,
  year,
}: ProjectCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all duration-400 cursor-pointer">
      {/* Image */}
      <div className="relative h-72 overflow-hidden">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover object-center group-hover:scale-110 transition-transform duration-600"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Base overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-gray-900/80 via-gray-900/20 to-transparent" />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gray-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-amber-400 text-gray-900 text-xs font-bold rounded-full uppercase tracking-wide">
            {category}
          </span>
        </div>

        {/* Year badge */}
        {year && (
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 bg-gray-900/70 text-white text-xs font-medium rounded-full">
              {year}
            </span>
          </div>
        )}

        {/* Bottom content (always visible) */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="text-white font-bold text-lg leading-snug mb-1">{title}</h3>
          <div className="flex items-center gap-1 text-gray-300 text-xs">
            <svg className="w-3.5 h-3.5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {location}
          </div>
        </div>

        {/* Hover description */}
        <div className="absolute inset-0 flex items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-white text-sm text-center leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}
