import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";

const valori = [
  {
    titolo: "Affidabilita",
    descrizione:
      "Programmazione precisa, comunicazione chiara e rispetto degli impegni in ogni fase del cantiere.",
  },
  {
    titolo: "Qualita",
    descrizione:
      "Materiali certificati e maestranze specializzate per risultati solidi, sicuri e duraturi nel tempo.",
  },
  {
    titolo: "Sicurezza",
    descrizione:
      "Operiamo nel pieno rispetto delle normative vigenti, con procedure rigorose e controlli costanti.",
  },
  {
    titolo: "Trasparenza",
    descrizione:
      "Preventivi dettagliati, tempi definiti e aggiornamenti continui per una collaborazione senza sorprese.",
  },
];

export default function ChiSiamoPage() {
  return (
    <>
      <Hero
        title="Chi Siamo"
        subtitle="Edil simo di bouchiba ousama e una realta italiana del settore edilizio che unisce esperienza artigianale e approccio moderno alla gestione dei progetti."
        imageUrl="https://images.unsplash.com/photo-1429497419816-9ca5cfb4571a?w=1600&auto=format&fit=crop&q=80"
        imageAlt="Squadra di operai in cantiere"
        size="medium"
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">
                La nostra storia
              </p>
              <h1 className="mb-6 text-3xl font-black leading-tight text-neutral-900 sm:text-4xl">
                Costruiamo fiducia prima ancora degli edifici
              </h1>
              <p className="mb-4 text-lg leading-relaxed text-neutral-700">
                Fondata da <strong>Bouchiba Ousama</strong>, l&apos;azienda nasce con l&apos;obiettivo di
                offrire servizi edilizi completi e affidabili per privati, aziende e pubbliche
                amministrazioni.
              </p>
              <p className="mb-4 text-lg leading-relaxed text-neutral-700">
                Seguiamo ogni intervento dalla fase di analisi iniziale fino alla consegna finale,
                coordinando lavorazioni, fornitori e tempi operativi con un metodo preciso e
                orientato al risultato.
              </p>
              <p className="text-lg leading-relaxed text-neutral-700">
                La nostra forza e la capacita di adattarci a contesti diversi: nuove costruzioni,
                ristrutturazioni complesse e manutenzioni programmate, sempre con attenzione alla
                qualita e alla sicurezza.
              </p>
            </div>

            <div className="relative">
              <div className="relative h-115 overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&auto=format&fit=crop&q=80"
                  alt="Cantiere con gru"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 rounded-xl border border-neutral-100 bg-white px-6 py-4 shadow-xl">
                <p className="text-3xl font-black text-amber-500">Dal 2026</p>
                <p className="text-sm font-medium text-neutral-600">Attivita iniziata l&apos;08/04/2026</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-neutral-900 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-amber-400">
              I nostri valori
            </p>
            <h2 className="text-3xl font-black text-white sm:text-4xl">
              Il metodo con cui lavoriamo ogni giorno
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {valori.map((valore) => (
              <article
                key={valore.titolo}
                className="rounded-xl border border-neutral-700 bg-neutral-800/60 p-6 transition-colors duration-300 hover:border-amber-400"
              >
                <h3 className="mb-2 text-xl font-bold text-white">{valore.titolo}</h3>
                <p className="leading-relaxed text-neutral-300">{valore.descrizione}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-black text-neutral-900 sm:text-4xl">
            Cerchi un partner serio per il tuo prossimo intervento edile?
          </h2>
          <p className="mx-auto mb-8 max-w-3xl text-lg text-neutral-700">
            Contattaci per una consulenza preliminare e un preventivo personalizzato in base alle
            tue esigenze operative e di budget.
          </p>
          <Link
            href="/contatti"
            className="inline-flex items-center gap-2 rounded-md bg-amber-400 px-8 py-4 text-base font-extrabold text-neutral-900 transition-all duration-200 hover:-translate-y-0.5 hover:bg-amber-300 hover:shadow-lg"
          >
            Parla con il nostro team
            <span aria-hidden>-&gt;</span>
          </Link>
        </div>
      </section>
    </>
  );
}
