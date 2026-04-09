import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";

const servizi = [
  {
    title: "Costruzione edifici",
    description:
      "Realizzazione di edifici residenziali e commerciali, dalla preparazione del cantiere alla consegna chiavi in mano.",
    imageUrl:
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "Nuova costruzione edilizia",
  },
  {
    title: "Ristrutturazione",
    description:
      "Interventi completi su appartamenti, uffici e stabili condominiali con soluzioni funzionali e finiture di qualita.",
    imageUrl:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "Ristrutturazione interna",
  },
  {
    title: "Lavori pubblici",
    description:
      "Gestione di opere pubbliche e infrastrutturali con attenzione a tempi, sicurezza e conformita normativa.",
    imageUrl:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "Infrastruttura urbana in costruzione",
  },
  {
    title: "Manutenzione",
    description:
      "Piani di manutenzione ordinaria e straordinaria per mantenere edifici e impianti efficienti nel tempo.",
    imageUrl:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "Tecnico durante attivita di manutenzione",
  },
  {
    title: "Efficientamento energetico",
    description:
      "Interventi su involucro e impianti per ridurre consumi energetici e migliorare comfort e classe energetica.",
    imageUrl:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "Riqualificazione energetica edificio",
  },
  {
    title: "Opere di finitura",
    description:
      "Intonaci, pavimentazioni, tinteggiature e dettagli finali per valorizzare ogni ambiente con precisione artigianale.",
    imageUrl:
      "https://images.unsplash.com/photo-1612151855475-877969f4a6cc?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "Lavori di finitura in cantiere",
  },
];

const processo = [
  {
    step: "01",
    titolo: "Sopralluogo e analisi",
    testo: "Raccogliamo esigenze tecniche e obiettivi per definire una soluzione concreta e sostenibile.",
  },
  {
    step: "02",
    titolo: "Preventivo dettagliato",
    testo: "Presentiamo un preventivo chiaro con attivita, tempistiche e costi, senza voci nascoste.",
  },
  {
    step: "03",
    titolo: "Esecuzione lavori",
    testo: "Coordiniamo tutte le maestranze e monitoriamo l&apos;avanzamento con standard elevati di qualita.",
  },
  {
    step: "04",
    titolo: "Consegna e assistenza",
    testo: "Concludiamo con verifica finale e supporto post-intervento per garantire risultati duraturi.",
  },
];

export default function ServiziPage() {
  return (
    <>
      <Hero
        title="Servizi Edili Completi"
        subtitle="Dalla costruzione alla manutenzione, offriamo soluzioni professionali per privati, aziende e settore pubblico in tutta Italia."
        imageUrl="https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1600&auto=format&fit=crop&q=80"
        imageAlt="Facciata edificio moderno"
        size="medium"
      />

      <section className="bg-neutral-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">
              Le nostre competenze
            </p>
            <h1 className="mb-4 text-3xl font-black text-neutral-900 sm:text-4xl">
              Servizi progettati per ogni esigenza costruttiva
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-neutral-700">
              Operiamo con un approccio integrato per garantire continuita operativa, controllo dei
              costi e risultati in linea con gli standard richiesti.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {servizi.map((servizio) => (
              <ServiceCard key={servizio.title} {...servizio} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">
              Come lavoriamo
            </p>
            <h2 className="text-3xl font-black text-neutral-900 sm:text-4xl">
              Un processo operativo chiaro e controllato
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {processo.map((item) => (
              <article
                key={item.step}
                className="rounded-xl border border-neutral-200 bg-neutral-50 p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <p className="mb-3 text-sm font-bold tracking-wider text-amber-600">STEP {item.step}</p>
                <h3 className="mb-2 text-xl font-bold text-neutral-900">{item.titolo}</h3>
                <p className="text-neutral-700">{item.testo}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
