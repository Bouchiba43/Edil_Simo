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
                <dt className="text-sm font-semibold uppercase tracking-wider text-neutral-500">PEC</dt>
                <dd className="mt-1 text-base break-all">
                  <a
                    href="mailto:edilsimodibouchibaousama@legalmail.it"
                    className="text-amber-700 transition-colors hover:text-amber-600"
                  >
                    edilsimodibouchibaousama@legalmail.it
                  </a>
                </dd>
              </div>
            </dl>
          </aside>

          <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm lg:col-span-3">
            <h2 className="mb-6 text-2xl font-bold text-neutral-900">
              Invia un messaggio
            </h2>

            <form className="space-y-5">
              <div>
                <label htmlFor="nome" className="mb-2 block text-sm font-semibold text-neutral-700">
                  Nome
                </label>
                <input
                  id="nome"
                  name="nome"
                  type="text"
                  placeholder="Il tuo nome"
                  className="w-full rounded-md border border-neutral-300 bg-white px-4 py-3 text-neutral-900 outline-none transition-all duration-200 placeholder:text-neutral-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-semibold text-neutral-700">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="nome@email.it"
                  className="w-full rounded-md border border-neutral-300 bg-white px-4 py-3 text-neutral-900 outline-none transition-all duration-200 placeholder:text-neutral-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                />
              </div>

              <div>
                <label htmlFor="messaggio" className="mb-2 block text-sm font-semibold text-neutral-700">
                  Messaggio
                </label>
                <textarea
                  id="messaggio"
                  name="messaggio"
                  rows={6}
                  placeholder="Descrivi brevemente il tuo progetto"
                  className="w-full rounded-md border border-neutral-300 bg-white px-4 py-3 text-neutral-900 outline-none transition-all duration-200 placeholder:text-neutral-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-md bg-neutral-900 px-7 py-3 text-base font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-neutral-700 hover:shadow-lg"
              >
                Invia richiesta
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
