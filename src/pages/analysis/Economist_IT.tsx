import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { useT } from "@/lib/i18n";
import { getArticleBySlug } from "@/lib/analysis";
import { AnalysisFooter } from "@/components/AnalysisFooter";
import { useCanonical } from "@/lib/useCanonical";
import { ShareBlock } from "@/components/ShareBlock";
import { LangSwitcher } from "@/components/LangSwitcher";

type Block = { h: string } | { p: string };

const TITLE = "Dieci volte in borsa, e ancora nessun attacco: la lezione Embraer sul capitale del vincolo";

const BACK = {
  it: "Torna alle analisi",
  en: "Back to analysis",
  pt: "Voltar às análises",
} as const;

const body: Block[] = [
  { p: "Serie #CustoBrasil — Intelligence strutturale sull'equazione dei costi del Brasile" },
  { p: "Il titolo di un'azienda si moltiplica per circa dieci in cinque anni. Il portafoglio ordini tocca il record di 34,5 miliardi di dollari. The Economist le dedica un articolo con un titolo che dice \"dimenticate Airbus e Boeing\" — il tipo di copertura che i CEO inseguono per una carriera intera." },
  { p: "E la cosa più audace che il suo amministratore delegato dichiara, quando gli chiedono se ora attaccherà il duopolio?" },
  { p: "Che è molto a suo agio con la situazione attuale." },
  { p: "Quella risposta — riportata dall'Economist il 30 luglio — è la frase più brasiliana dell'intero articolo, e quasi nessuno la leggerà in questo modo. Questo pezzo spiega perché dovrebbero." },
  { h: "Cosa ha documentato The Economist" },
  { p: "Ridotta ai suoi fatti strutturali, la storia è notevole. Embraer, terzo costruttore mondiale di jet passeggeri, ha consegnato 141 aeromobili nel 2021 e quest'anno potrebbe arrivare a 255. Da inizio 2021 il titolo ha sovraperformato sia Airbus sia Boeing di un ordine di grandezza. La domanda cresce simultaneamente su tutte e tre le linee: jet commerciali, aviazione executive — dove il Phenom 300 guida la sua categoria da quattordici anni consecutivi — e difesa, dove il riarmo globale continua a spingere gli ordini del KC-390." },
  { p: "Il motore della crescita commerciale è il tempo. Una compagnia aerea che oggi ordina un narrow-body ad Airbus o Boeing aspetta dagli otto ai dieci anni, contro un backlog combinato del duopolio di circa 16.000 aeromobili. L'E2 di Embraer si consegna in meno di due. In un mercato strozzato dall'offerta, la velocità di consegna è il prodotto — ed Embraer stima il proprio segmento in 8.500 aeromobili nei prossimi vent'anni, con l'A220 come unico concorrente diretto per dimensione. Come osserva il CEO Francisco Gomes Neto, anche dimezzando il mercato e prendendone metà degli ordini, la domanda saturerebbe la capacità produttiva per vent'anni." },
  { p: "Sepolto nell'articolo c'è un dettaglio che da solo vale la lettura, per chiunque studi l'architettura dei mercati: il più piccolo E175 è oggi l'unico aeromobile in produzione che le compagnie regionali americane possono operare, perché le scope clause nei contratti collettivi dei piloti limitano la dimensione degli aerei affidabili ai vettori regionali. Un artefatto di relazioni industriali funziona come fossato regolatorio da miliardi. I lettori di questa serie riconosceranno il pattern all'istante — è la stessa lezione che continuiamo a estrarre dal Brasile: il regolamento è il mercato, e chi lo legge strutturalmente, invece di lamentarsene, possiede il segmento." },
  { h: "Il fantasma Bombardier" },
  { p: "Perché allora non attaccare? The Economist espone la tentazione con onestà: Airbus e Boeing non sostituiranno i loro narrow-body principali prima della fine degli anni Trenta, e nessuna delle due ha incentivi a investire pesantemente finché i modelli attuali vendono — un'apertura genuina. La stessa Boeing stima il mercato totale in 36.000 jet in vent'anni. Un analista di Bank of America inquadra il salto come il passaggio di Embraer al livello successivo." },
  { p: "Ma il contro-caso ha un nome, e il nome è Bombardier. L'assalto del rivale canadese al duopolio l'ha portato sull'orlo del fallimento e si è concluso con la cessione del programma ad Airbus per una cifra simbolica nel 2018 — diventando, con ironia brutale, proprio quell'A220 che oggi compete con l'E2. Il numero uno di Airbus, Guillaume Faury, ha pubblicamente avvertito Embraer di pensarci due volte. Un nuovo jet di taglia maggiore costerebbe nell'ordine dei 10 miliardi di dollari che — secondo l'analisi UBS citata nell'articolo — Embraer non potrebbe sostenere da sola: servirebbero motoristi, fornitori, clienti e investitori esterni come partner. Internamente, si dice che la questione divida." },
  { h: "La lettura Custo Brasil" },
  { p: "Ecco ciò che un desk di analisi di San Paolo non vi dirà, e che questa serie esiste per dire: la cautela di Gomes Neto non è timidezza. È la stessa disciplina di capitale che ha costruito l'azienda — il Custo Brasil che opera come istinto ereditato." },
  { p: "Bombardier poteva permettersi la scommessa perché è cresciuta dentro un sistema di sostegno sovrano paziente e mercati dei capitali profondi, pronti a raccoglierla in caso di caduta. È caduta lo stesso. Embraer è cresciuta dove il capitale è caro, il cliente sovrano è esile, e un singolo programma fallito significa morte, non ristrutturazione. Un'azienda forgiata sotto quel vincolo non gioca l'intera impresa su un assalto frontale da 10 miliardi — compone: una ventina di nuovi aeromobili certificati in circa vent'anni, ogni programma chiuso dentro un rischio sopravvivibile. Quella cadenza di certificazione, che il CEO cita come prova che Embraer potrebbe costruire il jet più grande, si legge meglio come prova del perché non ne abbia avuto bisogno." },
  { p: "Il titolo moltiplicato per dieci è il mercato che dà il voto esattamente a questo comportamento. Gli investitori non stanno pagando la promessa di una guerra al duopolio. Stanno pagando l'unico costruttore aeronautico al mondo la cui storia di crescita non richiede ipotesi eroiche — solo slot di consegna che i giganti non possono offrire, un fossato scritto nei contratti di lavoro altrui, e una cultura manageriale strutturalmente incapace dell'errore di Bombardier." },
  { p: "Per gli stakeholder europei che questo desk serve, il takeaway è pratico. Quando valutate una controparte brasiliana — un fornitore, un target, un partner — e la trovate in espansione più lenta di quanto il portafoglio ordini giustificherebbe, non leggetelo automaticamente come mancanza di ambizione. Potreste avere davanti la disciplina che il Custo Brasil alleva nei suoi sopravvissuti: quelli ancora in piedi sono, per selezione, quelli che non hanno mai scommesso ciò che non potevano perdere." },
  { p: "La questione del duopolio resterà aperta per anni, ed Embraer ha il lusso di decidere tardi. La domanda più interessante è la nostra: quante altre aziende brasiliane vengono oggi sottovalutate proprio per il tratto che le rende durature?" },
  { p: "Fonte: The Economist, \"Forget Airbus and Boeing. Embraer is soaring\", 30 luglio 2026; comunicazioni Embraer Q2 2026." },
];

export default function EconomistIT() {
  const { lang, setLang } = useT();
  const article = getArticleBySlug("economist_it");
  const desc =
    "Embraer cresciuta di dieci volte, backlog a 34,5 miliardi di dollari, e The Economist dice 'dimenticate Airbus e Boeing'. Perché l'AD ancora rifiuta di attaccare il duopolio — e cosa dice della disciplina del capitale brasiliana.";
  useCanonical("/economist", {
    title: `${TITLE} — Business Matching Global`,
    description: desc,
    type: "article",
  });

  useEffect(() => {
    const previous = lang;
    if (lang !== "it") setLang("it");
    return () => {
      if (previous !== "it") setLang(previous);
    };
  }, [lang, setLang]);

  return (
    <main className="min-h-screen bg-background">
      <div className="container max-w-3xl py-16 md:py-24">
        <div className="flex items-center justify-between gap-4 mb-8">
          <Link
            to="/analysis"
            className="inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            {BACK[lang]}
          </Link>
          <LangSwitcher to="/economist" />
        </div>
        <article className="prose-invert">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4">{TITLE}</h1>
          <p className="text-xs text-foreground/70 mb-2">#CustoBrasil — Business Matching Global</p>
          <p className="text-xs text-foreground/70 mb-10 tabular-nums">{article?.date}</p>
          <div className="space-y-5 text-foreground/85 text-justify leading-relaxed">
            {body.map((block, i) =>
              "h" in block ? (
                <h2 key={i} className="text-xl md:text-2xl font-semibold text-foreground text-left mt-8 mb-2">
                  {block.h}
                </h2>
              ) : (
                <p key={i}>{block.p}</p>
              )
            )}
          </div>
          <ShareBlock title={TITLE} />
        </article>
        <AnalysisFooter />
      </div>
    </main>
  );
}
