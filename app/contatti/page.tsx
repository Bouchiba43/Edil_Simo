import ContactForm from "@/components/ContactForm";

export default function ContattiPage() {
  return (
    <section className="bg-neutral-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">
            Contattaci
          </p>
          <h1 className="mb-4 text-3xl font-black text-neutral-900 sm:text-4xl">
            Parliamo del tuo prossimo progetto
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-neutral-700">
            Siamo disponibili per sopralluoghi, consulenze tecniche e preventivi personalizzati.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          <aside className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm lg:col-span-2">
            <h2 className="mb-6 text-2xl font-bold text-neutral-900">
              Informazioni aziendali
            </h2>

            <dl className="space-y-4 text-neutral-700">
              <div>
                <dt className="text-sm font-semibold uppercase tracking-wider text-neutral-500">Azienda</dt>
                <dd className="mt-1 text-base">Edil simo di bouchiba ousama</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold uppercase tracking-wider text-neutral-500">Titolare</dt>
                <dd className="mt-1 text-base">Bouchiba Ousama</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold uppercase tracking-wider text-neutral-500">Email</dt>
                <dd className="mt-1 text-base break-all">
                  <a
                    href="mailto:Ousa.bouchiba3@hotmail.it"
                    className="text-amber-700 transition-colors hover:text-amber-600"
                  >
                    Ousa.bouchiba3@hotmail.it
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold uppercase tracking-wider text-neutral-500">Telefono</dt>
                <dd className="mt-1 text-base">+39 320 721 8412</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold uppercase tracking-wider text-neutral-500">Indirizzo</dt>
                <dd className="mt-1 text-base">Borgo del Naviglio 22, 43121 Parma (PR), Italia</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold uppercase tracking-wider text-neutral-500">Orari di lavoro</dt>
                <dd className="mt-2 text-base">
                  <ul className="space-y-1">
                    <li className="flex items-center justify-between gap-4"><span>Lunedi</span><span>07:00 - 18:00</span></li>
                    <li className="flex items-center justify-between gap-4"><span>Martedi</span><span>07:00 - 18:00</span></li>
                    <li className="flex items-center justify-between gap-4"><span>Mercoledi</span><span>07:00 - 18:00</span></li>
                    <li className="flex items-center justify-between gap-4"><span>Giovedi</span><span>07:00 - 18:00</span></li>
                    <li className="flex items-center justify-between gap-4"><span>Venerdi</span><span>07:00 - 18:00</span></li>
                    <li className="flex items-center justify-between gap-4"><span>Sabato</span><span>07:00 - 17:00</span></li>
                    <li className="flex items-center justify-between gap-4"><span>Domenica</span><span>Chiuso</span></li>
                  </ul>
                </dd>
              </div>
            </dl>
          </aside>

          <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm lg:col-span-3">
            <h2 className="mb-6 text-2xl font-bold text-neutral-900">
              Invia un messaggio
            </h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
