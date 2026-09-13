import { useEffect } from "react";

const EMAIL = "info@businessmatching.global";

/** Set the questionnaire URL here when available. */
const QUESTIONNAIRE_URL = "";

const Turismo = () => {
  useEffect(() => {
    document.title = "Minas Gerais e il retail italiano";

    let robots = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const created = !robots;
    if (!robots) {
      robots = document.createElement("meta");
      robots.setAttribute("name", "robots");
      document.head.appendChild(robots);
    }
    const previous = robots.getAttribute("content");
    robots.setAttribute("content", "noindex, nofollow");

    return () => {
      if (created) robots?.remove();
      else if (previous !== null) robots?.setAttribute("content", previous);
    };
  }, []);

  const href =
    QUESTIONNAIRE_URL ||
    `mailto:${EMAIL}?subject=${encodeURIComponent("Questionario Minas Gerais")}`;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <main className="flex-1 w-full max-w-2xl mx-auto px-6 py-10 sm:py-20">
        <header>
          <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight leading-tight">
            Minas Gerais e il retail italiano
          </h1>
          <p className="mt-3 text-base sm:text-lg text-muted-foreground">
            Un'indagine tra le agenzie di viaggio che costruiscono viaggi su misura
          </p>
        </header>

        <section className="mt-8 space-y-5 text-[15px] sm:text-base leading-relaxed">
          <p>
            Business Matching Global lavora sul corridoio Europa-Brasile. Stiamo preparando il
            lancio del Minas Gerais sul mercato turistico italiano: uno degli stati brasiliani più
            ricchi di patrimonio artistico, naturale e gastronomico, e tra i meno presenti nei
            cataloghi.
          </p>
          <p>
            Vogliamo costruire questo prodotto con il canale che dovrà venderlo, non consegnarlo già
            confezionato. Le risposte di chi partecipa decideranno da dove si comincia, cosa si mette
            a disposizione e in che forma.
          </p>
        </section>

        <section className="mt-10 text-center">
          <a
            href={href}
            className="inline-flex w-full sm:w-auto items-center justify-center rounded-md bg-primary px-8 py-4 text-base sm:text-lg font-medium text-primary-foreground hover:bg-primary/90"
          >
            Compila il questionario — 3 minuti
          </a>
          <p className="mt-4 text-sm text-muted-foreground">
            A chi partecipa inviamo i risultati aggregati e l'invito al primo incontro online.
          </p>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="max-w-2xl mx-auto px-6 py-6 text-sm text-muted-foreground space-y-1">
          <p>Business Matching Global</p>
          <p>
            <a href={`mailto:${EMAIL}`} className="hover:text-foreground">
              {EMAIL}
            </a>
          </p>
          <p>
            <a
              href="https://businessmatching.global"
              className="hover:text-foreground"
              rel="noopener"
            >
              businessmatching.global
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Turismo;
