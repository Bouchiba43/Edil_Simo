import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";

const homeServices = [
  {
    title: "Costruzione Edifici",
    description:
      "Realizziamo nuove costruzioni residenziali e commerciali con materiali di prima qualità e nel pieno rispetto delle normative vigenti.",
    imageUrl:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=80",
    imageAlt: "Costruzione edificio",
  },
  {
    title: "Ristrutturazione",
    description:
      "Trasformiamo i vostri spazi con interventi di ristrutturazione completa o parziale, garantendo risultati estetici e funzionali impeccabili.",
    imageUrl:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&auto=format&fit=crop&q=80",
    imageAlt: "Ristrutturazione appartamento",
  },
  {
    title: "Lavori Pubblici",
    description:
      "Esperienza consolidata nella realizzazione di opere pubbliche: strade, infrastrutture urbane e opere di pubblica utilità.",
    imageUrl:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&auto=format&fit=crop&q=80",
    imageAlt: "Cantiere lavori pubblici",
  },
];

const stats = [
  { value: "2026", label: "Anno di Avvio" },
  { value: "300+", label: "Progetti Completati" },
  { value: "50+", label: "Clienti Soddisfatti" },
  { value: "100%", label: "Qualità Garantita" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <Hero
        title="Costruiamo il Tuo Futuro con Passione e Qualità"
        subtitle="Edil Simo e la tua impresa edile di fiducia a Parma. Realizziamo costruzioni, ristrutturazioni e lavori pubblici con professionalita, rispettando tempi e budget."
        ctaLabel="Contattaci Ora"
        ctaHref="/contatti"
        imageUrl="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&auto=format&fit=crop&q=80"
        imageAlt="Cantiere edile Edil Simo Milano"
      />

      {/* Stats bar */}
      <div className="bg-amber-400 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl font-black text-gray-900">{stat.value}</p>
                <p className="text-sm font-semibold text-gray-800 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About intro */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-1 w-10 bg-amber-400" />
                <span className="text-amber-600 text-sm font-semibold uppercase tracking-widest">
                  Chi Siamo
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6 leading-tight">
                Un&apos;Impresa Edile con Radici Solide e Visione Moderna
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Fondata da Bouchiba Ousama, <strong>Edil Simo</strong> nasce dalla passione per il
                costruire e dal rispetto per ogni cliente. Operiamo a Parma e in tutta Italia
                con un team di professionisti altamente qualificati.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Ogni cantiere è per noi una sfida che affrontiamo con dedizione, utilizzando
                materiali certificati e tecniche costruttive all&apos;avanguardia per garantire
                risultati duraturi e sicuri.
              </p>
              <Link
                href="/chi-siamo"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-700 text-white font-semibold rounded-md transition-colors duration-200"
              >
                Scopri la Nostra Storia
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <div className="relative">
              <div className="relative h-112 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=900&auto=format&fit=crop&q=80"
                  alt="Squadra Edil Simo al lavoro"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-5 border border-gray-100">
                <p className="text-3xl font-black text-amber-500">Dal 2026</p>
                <p className="text-sm text-gray-600 font-medium">Attivita avviata l&apos;08/04/2026</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="h-1 w-10 bg-amber-400" />
              <span className="text-amber-600 text-sm font-semibold uppercase tracking-widest">
                Cosa Facciamo
              </span>
              <div className="h-1 w-10 bg-amber-400" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              I Nostri Servizi Principali
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Offriamo soluzioni complete nel settore edile, dalla progettazione alla consegna finale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {homeServices.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/servizi"
              className="inline-flex items-center gap-2 px-8 py-4 bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold rounded-md text-base transition-all duration-200 hover:shadow-lg"
            >
              Vedi Tutti i Servizi
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="h-1 w-10 bg-amber-400" />
              <span className="text-amber-400 text-sm font-semibold uppercase tracking-widest">
                Perché Sceglierci
              </span>
              <div className="h-1 w-10 bg-amber-400" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-black mb-4">
              Qualità Che Si Vede, Affidabilità Che Si Sente
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "Materiali Certificati",
                desc: "Utilizziamo esclusivamente materiali di prima qualità, certificati e conformi alle normative europee.",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "Rispetto dei Tempi",
                desc: "Consegniamo ogni progetto nei tempi concordati, senza sorprese o ritardi ingiustificati.",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
                title: "Team Esperto",
                desc: "Un team di tecnici e operai specializzati con anni di esperienza nel settore edile italiano.",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                ),
                title: "Prezzi Trasparenti",
                desc: "Preventivi chiari e dettagliati. Nessun costo nascosto, nessuna sorpresa in fattura.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="text-center p-6 rounded-xl border border-gray-700 hover:border-amber-400 transition-colors duration-300 group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800 group-hover:bg-amber-400 text-amber-400 group-hover:text-gray-900 rounded-xl mb-4 transition-all duration-300">
                  {item.icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative py-20 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=1600&auto=format&fit=crop&q=80"
          alt="Cantiere edile"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gray-900/75" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Hai un Progetto in Mente?
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Contattaci oggi stesso per un sopralluogo gratuito e un preventivo senza impegno.
            Siamo pronti a trasformare la tua idea in realtà.
          </p>
          <Link
            href="/contatti"
            className="inline-flex items-center gap-2 px-10 py-4 bg-amber-400 hover:bg-amber-300 text-gray-900 font-black rounded-md text-lg transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
          >
            Richiedi un Preventivo Gratuito
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
