import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Download, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCanonical, SITE } from "@/lib/useCanonical";
import { Nav, InfoBar } from "@/pages/OurServices";

const PATH = "/servizi/business-matching";

const steps: Array<[string, string]> = [
  [
    "Definiamo il profilo",
    "Prima di cercare stabiliamo insieme chi stiamo cercando: settore, dimensione, area geografica, canale, volumi, capacità tecnica. Un profilo preciso vale più di una ricerca ampia.",
  ],
  [
    "Mappiamo il mercato",
    "Costruiamo l'universo delle aziende che corrispondono al profilo, incrociando fonti pubbliche, banche dati professionali, registri camerali, associazioni di categoria e conoscenza diretta del mercato.",
  ],
  [
    "Selezioniamo e verifichiamo",
    "Riduciamo la mappatura a una rosa ristretta. Per ciascuna azienda verifichiamo esistenza e regolarità, attività effettiva, dimensione, posizionamento e — dove possibile — chi decide davvero.",
  ],
  [
    "Contattiamo",
    "Su tuo mandato prendiamo contatto in lingua locale, presentiamo la tua proposta e qualifichiamo l'interesse reale. Chi non risponde o non è interessato non ti viene consegnato come «lead».",
  ],
  [
    "Introduciamo",
    "Ti mettiamo in contatto diretto con chi ha manifestato un interesse concreto, e ti prepariamo alla conversazione: chi hai davanti, come lavora, cosa aspettarti.",
  ],
];

const deliverables = [
  "La rosa selezionata, con scheda per ogni azienda: attività, dimensione, posizionamento, elementi verificati e perché rientra nel profilo.",
  "L'esito del contatto, azienda per azienda: chi ha risposto, chi ha manifestato interesse, chi ha declinato e per quale motivo. Anche i rifiuti sono informazione utile — dicono qualcosa sul mercato.",
  "Le introduzioni, con il contesto necessario per arrivare preparato alla prima conversazione.",
];

const notDoing = [
  "Non vendiamo database né elenchi preconfezionati.",
  "Non presentiamo come «contatto qualificato» un'azienda che non ha risposto.",
  "Non promettiamo un numero di incontri prima di aver visto il mercato.",
  "Non lavoriamo per due clienti concorrenti sullo stesso profilo nello stesso periodo.",
];

const formats: Array<[string, string]> = [
  ["Mappatura e selezione", "quando hai già una struttura commerciale e ti serve solo sapere con chi parlare."],
  ["Mappatura, selezione e contatto", "il percorso completo, dalla ricerca all'introduzione."],
  ["Presidio continuativo", "quando il mercato va seguito nel tempo e non esplorato una volta sola."],
];

const faqs: Array<[string, string]> = [
  [
    "In quanto tempo?",
    "Dipende dall'ampiezza del profilo e dal settore. Una mappatura con selezione richiede in genere alcune settimane; la fase di contatto dipende dai tempi di risposta del mercato, che in Brasile ad agosto e a gennaio sono più lenti.",
  ],
  [
    "In che lingua contattate le aziende?",
    "In portoghese in Brasile, nella lingua locale in Europa. La corrispondenza ti viene riportata tradotta.",
  ],
  [
    "Lavorate anche nella direzione opposta?",
    "Sì. Cerchiamo partner europei per aziende brasiliane con la stessa metodologia.",
  ],
  [
    "Cosa succede se il mercato non risponde?",
    "Te lo diciamo, con i dati alla mano. Un mercato che non risponde è un'informazione che vale il costo della ricerca: ti evita di costruirci sopra una strategia.",
  ],
  [
    "La mia richiesta è riservata?",
    "Sì. Il tuo nome viene comunicato alle controparti solo quando lo autorizzi, e la fase iniziale può essere condotta senza rivelare l'identità del committente.",
  ],
];

function useStructuredData() {
  useEffect(() => {
    const graph = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          name: "Business Matching Brasile–Europa",
          serviceType: "Business matching e ricerca partner commerciali",
          url: SITE + PATH,
          provider: { "@id": SITE + "/#organization" },
          areaServed: [
            { "@type": "Country", name: "Brasile" },
            { "@type": "Country", name: "Italia" },
            { "@type": "AdministrativeArea", name: "Unione Europea" },
          ],
          description:
            "Identifichiamo, verifichiamo e contattiamo potenziali clienti, distributori, fornitori e partner tra Europa e Brasile.",
        },
        {
          "@type": "FAQPage",
          mainEntity: faqs.map(([q, a]) => ({
            "@type": "Question",
            name: q,
            acceptedAnswer: { "@type": "Answer", text: a },
          })),
        },
      ],
    };
    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = "ld-business-matching";
    el.textContent = JSON.stringify(graph);
    document.head.appendChild(el);
    return () => {
      el.remove();
    };
  }, []);
}

export default function BusinessMatching() {
  useCanonical(PATH, {
    title: "Business Matching Brasile–Europa | Ricerca e contatto partner commerciali",
    description:
      "Identifichiamo, verifichiamo e contattiamo potenziali clienti, distributori, fornitori e partner tra Europa e Brasile. Non vendiamo liste: apriamo conversazioni.",
  });
  useStructuredData();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        {/* Hero */}
        <section className="pt-32 md:pt-44 pb-12 md:pb-16">
          <div className="container max-w-4xl">
            <span className="text-xs tracking-wider uppercase text-primary mb-4 inline-block">
              Business Matching
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight">
              Un contatto non è una lista. È una conversazione che comincia.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed text-justify">
              Identifichiamo, verifichiamo e contattiamo per tuo conto i potenziali clienti, distributori,
              importatori, fornitori o partner industriali giusti — in Brasile o in Europa.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full">
                <a href="/#contact">
                  Parliamone <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full">
                <Link to="/sample-report">
                  <Download className="mr-1 h-4 w-4" /> Scarica un esempio di report (PDF)
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Il problema con le liste */}
        <section className="py-14 md:py-20 border-t border-border/60">
          <div className="container max-w-3xl">
            <h2 className="font-display text-2xl md:text-3xl mb-6">Il problema con le liste</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-justify">
              <p>
                Chiunque può comprare un elenco di aziende. I database esistono, costano poco e restituiscono
                centinaia di nomi in pochi minuti.
              </p>
              <p>
                Poi cominciano i problemi. Metà di quelle aziende non è più attiva nel settore indicato. Un terzo
                non ha la dimensione o la struttura per lavorare con te. Alcune sono concorrenti del tuo futuro
                partner. E nessuna sa chi sei, perché nessuno le ha ancora contattate.
              </p>
              <p>
                Un elenco non è un'opportunità commerciale: è materiale grezzo che qualcuno deve ancora lavorare.
                Di solito quel qualcuno finisci per essere tu, in una lingua che non parli e su un mercato che non
                conosci.
              </p>
            </div>
          </div>
        </section>

        {/* Come lavoriamo */}
        <section className="py-16 md:py-24 bg-foreground text-background">
          <div className="container max-w-5xl">
            <h2 className="font-display text-2xl md:text-3xl text-background mb-10">Come lavoriamo</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {steps.map(([title, body], i) => (
                <div
                  key={title}
                  className="p-6 md:p-7 rounded-2xl bg-background/[0.04] border border-background/10"
                >
                  <span className="text-xs tracking-wider uppercase text-primary">0{i + 1} —</span>
                  <h3 className="font-display text-xl md:text-2xl text-background mt-1 mb-3">{title}</h3>
                  <p className="text-background/70 leading-relaxed text-justify">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cosa ricevi */}
        <section className="py-14 md:py-20">
          <div className="container max-w-3xl">
            <h2 className="font-display text-2xl md:text-3xl mb-6">Cosa ricevi</h2>
            <ul className="space-y-4">
              {deliverables.map((d) => (
                <li key={d} className="flex gap-3 text-muted-foreground leading-relaxed text-justify">
                  <Check className="h-5 w-5 mt-0.5 text-primary shrink-0" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Come misuriamo */}
        <section className="py-14 md:py-20 border-t border-border/60">
          <div className="container max-w-3xl">
            <h2 className="font-display text-2xl md:text-3xl mb-6">Come misuriamo il lavoro</h2>
            <p className="text-lg text-foreground/90 mb-5">
              Non contiamo i nomi consegnati. Contiamo le conversazioni che si aprono.
            </p>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-justify">
              <p>
                Una mappatura può restituire quaranta aziende e produrne quattro con cui vale la pena parlare.
                Un'altra ne restituisce dodici e ne produce sei. Il numero non è il risultato: il risultato è
                quante di quelle porte si aprono davvero.
              </p>
              <p>
                Per questo non promettiamo quantità in anticipo. Ti diciamo quante aziende abbiamo considerato,
                quante hanno superato la verifica e quante hanno risposto.
              </p>
            </div>
          </div>
        </section>

        {/* Cosa non facciamo */}
        <section className="py-14 md:py-20 border-t border-border/60">
          <div className="container max-w-3xl">
            <h2 className="font-display text-2xl md:text-3xl mb-6">Cosa non facciamo</h2>
            <ul className="space-y-4">
              {notDoing.map((n) => (
                <li key={n} className="flex gap-3 text-muted-foreground leading-relaxed">
                  <X className="h-5 w-5 mt-0.5 text-amber shrink-0" />
                  <span>{n}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Formati */}
        <section className="py-14 md:py-20 border-t border-border/60">
          <div className="container max-w-4xl">
            <h2 className="font-display text-2xl md:text-3xl mb-8">Formati</h2>
            <div className="grid md:grid-cols-3 gap-5">
              {formats.map(([title, desc]) => (
                <div key={title} className="p-6 rounded-2xl border border-border/70">
                  <h3 className="font-display text-lg mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-sm text-muted-foreground leading-relaxed text-justify">
              Ogni progetto è preventivato sul perimetro concordato. Sono possibili formule con componente legata
              al risultato, da definire caso per caso.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="rounded-full">
                <a href="/#contact">
                  Richiedi un preventivo <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-14 md:py-20 border-t border-border/60">
          <div className="container max-w-3xl">
            <h2 className="font-display text-2xl md:text-3xl mb-8">Domande frequenti</h2>
            <dl className="space-y-6">
              {faqs.map(([q, a]) => (
                <div key={q}>
                  <dt className="font-display text-lg mb-2">{q}</dt>
                  <dd className="text-muted-foreground leading-relaxed text-justify">{a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Collegamenti interni */}
        <section className="py-12 border-t border-border/60">
          <div className="container max-w-3xl text-sm text-muted-foreground leading-relaxed">
            <p>
              Devi ancora capire se il mercato esiste? Parti dalla{" "}
              <Link to="/Our_Services" className="underline hover:text-foreground">
                Business Intelligence
              </Link>
              . Hai già trovato il partner e devi capire come far arrivare la merce? Vedi{" "}
              <Link to="/Our_Services" className="underline hover:text-foreground">
                Import/Export Intelligence
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Chiusura */}
        <section className="py-16 md:py-24 bg-foreground text-background">
          <div className="container max-w-3xl text-center">
            <h2 className="font-display text-3xl md:text-4xl text-background mb-5">
              Il mercato non si apre da solo.
            </h2>
            <p className="text-background/70 leading-relaxed mb-8">
              Raccontaci cosa stai cercando e ti diremo con franchezza se possiamo trovartelo.
            </p>
            <Button asChild size="lg" className="rounded-full">
              <a href="/#contact">
                Parliamone <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
          </div>
        </section>
      </main>
      <InfoBar />
    </div>
  );
}
