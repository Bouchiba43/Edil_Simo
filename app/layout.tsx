import type { Metadata } from "next";
import { Montserrat, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
  title: "Edil simo di bouchiba ousama | Impresa Edile in Italia",
  description:
    "Edil simo di bouchiba ousama: costruzione edifici, ristrutturazioni, lavori pubblici e manutenzioni con professionalità e qualità in tutta Italia.",
  icons: {
    icon: "/edil_favicon.png",
    shortcut: "/edil_favicon.png",
    apple: "/edil_favicon.png",
  },
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
      <body className={`${sourceSans.className} min-h-full flex flex-col bg-neutral-50 text-neutral-900 antialiased`}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
