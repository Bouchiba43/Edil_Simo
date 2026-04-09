import Image from "next/image";
import Link from "next/link";

interface ServiceCardProps {
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  icon?: React.ReactNode;
  href?: string;
}

export default function ServiceCard({
  title,
  description,
  imageUrl,
  imageAlt,
  icon,
  href = "/servizi",
}: ServiceCardProps) {
  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gray-900/20 group-hover:bg-gray-900/10 transition-colors duration-300" />
        {icon && (
          <div className="absolute bottom-4 left-4 w-10 h-10 bg-amber-400 rounded-lg flex items-center justify-center text-gray-900">
            {icon}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">{description}</p>
        <Link
          href={href}
          className="inline-flex items-center gap-1 text-amber-600 hover:text-amber-700 font-semibold text-sm transition-colors"
        >
          Scopri di più
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
