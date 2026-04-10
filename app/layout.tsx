import type { Metadata } from "next";
import { Montserrat, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BASE_URL = "https://edil-simo.vercel.app";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Edil Simo | Impresa Edile a Parma — Muratura, Ristrutturazioni, Costruzioni",
    template: "%s | Edil Simo Parma",
  },
  description:
    "Edil Simo di Bouchiba Ousama: impresa edile a Parma specializzata in muratura, ristrutturazioni, nuove costruzioni e lavori pubblici. Preventivo gratuito. ☎ +39 320 721 8412",
  keywords: [
    "impresa edile Parma",
    "muratura Parma",
    "ristrutturazione Parma",
    "costruzioni edili Parma",
    "lavori edili Parma",
    "edil simo",
    "Bouchiba Ousama",
    "preventivo edile Parma",
    "impresa costruzioni Parma",
    "ristrutturazione appartamento Parma",
  ],
  authors: [{ name: "Edil Simo di Bouchiba Ousama" }],
  creator: "Edil Simo di Bouchiba Ousama",
  publisher: "Edil Simo di Bouchiba Ousama",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: BASE_URL,
    siteName: "Edil Simo",
    title: "Edil Simo | Impresa Edile a Parma — Muratura e Ristrutturazioni",
    description:
      "Impresa edile a Parma specializzata in muratura, ristrutturazioni e nuove costruzioni. Materiali certificati, tempi rispettati, preventivo gratuito.",
    images: [
      {
        url: "/edil_favicon.png",
        width: 512,
        height: 512,
        alt: "Logo Edil Simo — Impresa Edile Parma",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Edil Simo | Impresa Edile a Parma",
    description:
      "Muratura, ristrutturazioni e nuove costruzioni a Parma. Preventivo gratuito. ☎ +39 320 721 8412",
    images: ["/edil_favicon.png"],
  },
  icons: {
    icon: "/edil_favicon.png",
    shortcut: "/edil_favicon.png",
    apple: "/edil_favicon.png",
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
  name: "Edil Simo di Bouchiba Ousama",
  alternateName: "Edil Simo",
  description:
    "Impresa edile a Parma specializzata in muratura, ristrutturazioni, nuove costruzioni e lavori pubblici.",
  url: BASE_URL,
  telephone: "+393207218412",
  email: "Ousa.bouchiba3@hotmail.it",
  foundingDate: "2026-04-08",
  founder: {
    "@type": "Person",
    name: "Bouchiba Ousama",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Borgo del Naviglio 22",
    addressLocality: "Parma",
    addressRegion: "PR",
    postalCode: "43121",
    addressCountry: "IT",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 44.8015,
    longitude: 10.3279,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "07:00",
      closes: "17:00",
    },
  ],
  areaServed: {
    "@type": "State",
    name: "Emilia-Romagna",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servizi Edili",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Muratura" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Ristrutturazione" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Nuove Costruzioni" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Lavori Pubblici" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Efficientamento Energetico" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Opere di Finitura" } },
    ],
  },
  priceRange: "€€",
  image: `${BASE_URL}/edil_favicon.png`,
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${montserrat.variable} ${sourceSans.variable} h-full scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </head>
      <body className={`${sourceSans.className} min-h-full flex flex-col bg-neutral-50 text-neutral-900 antialiased`}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
