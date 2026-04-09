import ProjectCard from "@/components/ProjectCard";
import Hero from "@/components/Hero";

const progetti = [
  {
    title: "Complesso Residenziale Le Magnolie",
    description:
      "Nuova costruzione di un complesso residenziale con soluzioni strutturali antisismiche ed elevato comfort abitativo.",
    category: "Residenziale",
    location: "Milano",
    year: "2025",
    imageUrl:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "Edificio residenziale moderno",
  },
  {
    title: "Ristrutturazione Palazzo Storico",
    description:
      "Intervento conservativo su facciate e interni con valorizzazione degli elementi architettonici originali.",
    category: "Restauro",
    location: "Bergamo",
    year: "2024",
    imageUrl:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "Palazzo storico ristrutturato",
  },
  {
    title: "Polo Direzionale Nord",
    description:
      "Realizzazione di spazi direzionali e commerciali con impianti efficienti e layout flessibili per le aziende.",
    category: "Commerciale",
    location: "Monza",
    year: "2025",
    imageUrl:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "Edificio direzionale in vetro",
  },
  {
    title: "Riqualificazione Condominio Aurora",
    description:
      "Rifacimento facciate, isolamento termico e sistemazione delle parti comuni per migliorare efficienza e valore immobiliare.",
    category: "Riqualificazione",
    location: "Sesto San Giovanni",
    year: "2023",
    imageUrl:
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "Condominio dopo riqualificazione",
  },
  {
    title: "Opere Stradali Via del Lavoro",
    description:
      "Intervento di rifacimento manto stradale e adeguamento delle reti di drenaggio in area urbana ad alto traffico.",
    category: "Lavori pubblici",
    location: "Lodi",
    year: "2024",
    imageUrl:
      "https://images.unsplash.com/photo-1599707254554-027aeb4deacd?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "Macchinari per lavori stradali",
  },
  {
    title: "Capannone Logistico Sud",
    description:
      "Costruzione di un capannone industriale con aree di carico/scarico ottimizzate e struttura ad alta resistenza.",
    category: "Industriale",
    location: "Piacenza",
    year: "2022",
    imageUrl:
      "https://images.unsplash.com/photo-1485083269755-a7b559a4fe5e?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "Struttura industriale",
  },
];

export default function ProgettiPage() {
  return (
    <>
      <Hero
        title="Progetti Realizzati"
        subtitle="Una selezione di interventi che raccontano il nostro approccio: precisione tecnica, qualita esecutiva e attenzione al dettaglio."
        imageUrl="https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?w=1600&auto=format&fit=crop&q=80"
        imageAlt="Skyline urbano con edifici moderni"
        size="medium"
      />

      <section className="bg-neutral-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">
              Portfolio lavori
            </p>
            <h1 className="mb-4 text-3xl font-black text-neutral-900 sm:text-4xl">
              Interventi completati in ambito residenziale, pubblico e industriale
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-neutral-700">
              Ogni progetto e sviluppato su esigenze specifiche del cliente, con controllo puntuale
              di tempi, costi e qualita realizzativa.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {progetti.map((progetto) => (
              <ProjectCard key={progetto.title} {...progetto} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
