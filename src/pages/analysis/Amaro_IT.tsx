import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useT } from "@/lib/i18n";
import { getArticleBySlug } from "@/lib/analysis";
import { AnalysisFooter } from "@/components/AnalysisFooter";
import { useCanonical } from "@/lib/useCanonical";
import { ShareBlock } from "@/components/ShareBlock";
import { useEffect } from "react";
import { LangSwitcher } from "@/components/LangSwitcher";

type Block = { h: string } | { p: string };

const body: Block[] = [
  { h: "Prima del tappeto rosso, c'era una casa di paglia" },
  { p: "Rolim Adolfo Amaro nacque nel 1942 a Pereira Barreto, nel profondo entroterra dello Stato di San Paolo, in una casa di sapé senza elettricità né bagno, primogenito di cinque figli. Lasciò la scuola intorno alla seconda media per contribuire alle spese di famiglia: aiuto meccanico, apprendista contabile, fattorino di banca. A diciassette anni prese la licenza di pilota; a ventuno volava su Cessna biposto per una compagnia di aerotaxi. Trasportò merci sull'Amazzonia senza strade, fondò e vendette la sua prima piccola compagnia aerea e nel 1968 entrò come socio di minoranza in un modesto aerotaxi di Marília: la Táxi Aéreo Marília. Quattro anni dopo ne aveva il controllo. Il mondo l'avrebbe conosciuta dalle iniziali — TAM — e avrebbe conosciuto lui, semplicemente, come il Comandante Rolim." },
  { p: "Ciò che costruì da quell'acronimo è storia dell'impresa brasiliana: i Cessna con radar che professionalizzarono il volo regionale negli anni Settanta, i Fokker F-27 che collegavano gli aeroporti centrali di San Paolo e Rio negli anni Ottanta, i jet Fokker 100 del 1990 che portarono un'aviazione di alto standard su rotte che nessuno riteneva degne, e infine la compagnia che avrebbe superato i giganti. Morì come i piloti temono e come le leggende assumono la loro forma definitiva: un incidente in elicottero, l'8 luglio 2001, a cinquantotto anni. La veglia si tenne nell'hangar TAM di Congonhas, sullo stesso piazzale dove si stendeva il tappeto rosso. Venticinque anni dopo, le business school brasiliane lo insegnano ancora, un aeroporto porta il suo nome e un'onorificenza statale istituita nel 2025 porta il suo titolo. Questa testata lo studia per una ragione più circoscritta: nessuno, nella storia di questo corridoio, ha capito meglio di lui i costi che non compaiono mai in fattura." },
  { h: "La prima intuizione: il tappeto" },
  { p: "La storia è stata raccontata molte volte, anche da noi: un umile tappetino ai piedi della scaletta, messo lì perché i passeggeri si pulissero le scarpe, e un proprietario che lo guardò e vide tutt'altro. Dal 1989 il tappeto rosso alla porta dell'aereo — spesso con Rolim stesso accanto, a stringere mani e distribuire caramelle — divenne il simbolo commerciale più riconoscibile dell'aviazione brasiliana." },
  { p: "Ciò che conta è l'intuizione che ci sta sotto. Nel Brasile di quell'epoca — un'economia chiusa dove, come scrisse uno dei suoi biografi, il consumatore era trattato come un fastidio inevitabile — Rolim decise che il passeggero era il punto. Il suo credo era di una semplicità disarmante: tratta il cliente come vorresti essere trattato tu. Il tappeto non era decorazione: era la punta visibile di un sistema operativo. Diceva al passeggero sei ricevuto, non processato — e, con altrettanta intenzione, diceva a ogni dipendente TAM che guardava quale standard il capo si aspettasse. Un simbolo che disciplina l'interno mentre seduce l'esterno non è spesa di marketing. È cultura, comprata al prezzo di un tappeto." },
  { h: "La seconda intuizione: il passaparola" },
  { p: "La seconda intuizione di Rolim riguardava i media. La pubblicità si compra; la raccomandazione si guadagna — e in un mestiere di relazione la seconda si capitalizza mentre la prima si svaluta. Progettò la compagnia perché fosse il passeggero a fare la pubblicità: il tappeto, le caramelle, lo standard di servizio e, sopra tutto, la radicale accessibilità del vertice. Nel 1991 creò un servizio il cui nome non ha bisogno di spiegazioni — Fale com o Presidente, \"Parla con il Presidente\": una linea diretta con cui qualunque passeggero poteva raggiungerlo. Era famoso per ripetere che il cliente non interrompe mai il lavoro, perché il cliente è il lavoro." },
  { p: "Letta come strategia e non come sentimento, è economia di precisione: ogni reclamo risolto trasformava un detrattore in un narratore, e ogni storia vendeva poltrone che nessun budget pubblicitario avrebbe potuto raggiungere. La TAM crebbe fino a diventare la prima compagnia del Brasile competendo contro rivali più grandi, più antichi e meglio collegati. Il passaparola era la rete di distribuzione." },
  { h: "I sette comandamenti" },
  { p: "Nel 1997 distillò la sua dottrina nei Sete Mandamentos — sette comandamenti che guidarono la gestione della TAM e che ancora oggi si citano nei consigli d'amministrazione brasiliani. Elencati nudi, metà di loro sembra il contrario di ciò che intendevano. Meritano una spiegazione uno per uno — perché la tensione tra di essi è la dottrina." },
  { p: "1. Nulla sostituisce il profitto. Il più frainteso dei sette: messo al primo posto dall'uomo del tappeto rosso suona come cinismo, ed è l'opposto. Senza profitto non esiste nient'altro — né il servizio, né la sicurezza, né gli stipendi, né il tappeto stesso. Il profitto non è il fine contrapposto al cliente: è la condizione che permette di servirlo domani. Una compagnia in perdita che coccola i passeggeri sta soltanto scegliendo la data del proprio funerale." },
  { p: "2. Alla ricerca dell'ottimo non si fa il buono. Il perfezionismo come forma di paralisi. Chi aspetta la soluzione impeccabile non consegna mai quella buona che serviva oggi — e intanto un concorrente, con qualcosa di mediocre ma esistente, si è preso il mercato. Fai il buono adesso; migliora dopo." },
  { p: "3. Più importante del cliente è la sicurezza. L'unico limite al \"cliente re\". Il passeggero ha ragione su tutto — orari, servizio, cortesia — tranne che su una cosa: quando la sicurezza dice no, è no, per quanto forte protesti e qualunque cosa costi. È anche una gerarchia morale: la sua vita viene prima della sua soddisfazione." },
  { p: "4. Il modo più facile di guadagnare è smettere di perdere. Prima di inseguire ricavi nuovi, tappa le falle — sprechi, inefficienze, errori ripetuti. Ma la lettura profonda, quella che rende Rolim Rolim, è che le perdite più grandi sono quelle invisibili: il passeggero perso per sempre dopo una cancellazione gestita male non compare in nessun bilancio, eppure è la voce di perdita più cara che una compagnia possieda. \"Smettere di perdere\" vale su entrambi i libri contabili — quello che il contabile vede e quello che non vede." },
  { p: "5. Pensa molto prima di agire. Il contrappeso al comandamento 2: esegui in fretta, decidi con lentezza. Le decisioni strutturali — una flotta, una rotta, un'acquisizione — si pesano a lungo, perché in aviazione un errore strategico si paga per un decennio. Insieme, il 2 e il 5 formano la coppia: deliberazione lenta, esecuzione rapida. Mai il contrario." },
  { p: "6. L'umiltà è fondamentale. Da un uomo partito da una casa di paglia, non era retorica. Significava tre cose operative: ascoltare la prima linea (un presidente che risponde al telefono dei passeggeri è umiltà istituzionalizzata); non credersi mai arrivati — l'arroganza è l'anticamera del declino, e il cimitero dell'aviazione è pieno di giganti morti d'orgoglio; e ammettere gli errori in fretta, che è il presupposto del comandamento 4." },
  { p: "7. Chi non ha l'intelligenza per creare deve avere il coraggio di copiare. Il più controcorrente: una demolizione dell'ego creativo. Se qualcuno, ovunque nel mondo, ha già risolto il tuo problema meglio di te, copiarlo non è vergogna — è un dovere verso l'azienda. Coraggio è la parola operativa: copiare richiede di ammettere che un altro è stato più bravo, cosa a cui l'orgoglio manageriale raramente sopravvive. Il tappeto rosso stesso, del resto, nacque come umile gesto di qualcun altro, copiato verso l'alto. I lettori di queste note riconosceranno la tesi: è il trasferimento di metodo, enunciato con trent'anni d'anticipo — il miglior metodo esistente si adotta e si adatta, non si reinventa per vanità." },
  { p: "Letti in sequenza, i sette formano un sistema con una tensione voluta: i primi quattro sono durezza economica, gli ultimi tre disciplina del carattere. E si noti cosa la lista non è: il manifesto di un romantico del servizio. L'uomo del tappeto rosso metteva il profitto al primo posto, la sicurezza sopra il cliente e la copia pragmatica sopra la vanità creativa. Ed è esattamente per questo che il tappeto funzionava — non fu mai carità. Era la voce a più alto rendimento del budget, gestita da uno che sapeva fare i conti. Il tappeto sta esattamente nel punto dove le due metà della lista si toccano." },
  { h: "Hard cost, soft cost — e i giorni in cui le cose si rompono" },
  { p: "Ed ecco la lezione di cui questo corridoio ha più bisogno. Ogni manager di compagnia aerea sa leggere gli hard cost: carburante, leasing, manutenzione, equipaggi. Il dono più raro di Rolim era saper dare un prezzo ai soft cost — l'impressione dei primi tre secondi, il passeggero perso per sempre dopo una cancellazione gestita male, la reputazione che decide se un ritardo viene perdonato o è fatale. Il suo quarto comandamento — smettere di perdere — si applica a entrambi i registri, e lui sapeva che era da quello invisibile che i patrimoni davvero colavano via. Per questo i momenti che le altre compagnie trattavano come guasti operativi, lui li trattava come la scena più importante del prodotto: un imprevisto è l'unico momento in cui il passeggero scopre che cosa l'azienda stia davvero vendendo. Gestito con la logica del tappeto, crea la fedeltà più feroce che esista; gestito con la logica della coda, crea le storie che svuotano gli aerei." },
  { p: "Venticinque anni dopo che Congonhas si fermò per la sua veglia, il settore ha ottimizzato quasi tutto ciò che l'epoca di Rolim aveva lasciato da ottimizzare — tranne la cosa che lui ottimizzò per prima. Gli hard cost non sono mai stati gestiti meglio. I soft cost non sono mai stati più abbandonati." },
  { p: "Ed è forse questo il tratto più contemporaneo di un uomo nato in una casa di paglia: aveva capito che in aviazione, come in ogni mestiere di relazione, il comandamento del profitto e il tappeto non sono rivali. L'uno finanzia l'altro. Li scrisse nella stessa lista." },
  { h: "Dove vive la memoria" },
  { p: "La memoria di Rolim ha i suoi custodi. Il Museu Asas de um Sonho, nato dalla sua stessa passione per la storia del volo, resta il riferimento nazionale per la conservazione del patrimonio aeronautico brasiliano — e nel 2025 lo Stato di San Paolo ha istituito un'onorificenza che porta il suo nome, la Asas de Um Sonho – Mérito Comandante Rolim Adolfo Amaro, conferita a chi porta avanti i valori che rappresentava. La Fundação Eductam, da lui creata in vita, incanalò l'altra sua convinzione — borse di studio e opere umanitarie per chi, come il ragazzo di Pereira Barreto, partiva da zero. Un aeroporto a Jundiaí porta il suo nome; una cattedra dell'Accademia Brasiliana degli Eventi e del Turismo porta il suo patrocinio." },
  { p: "Le istituzioni custodiscono la memoria. Il metodo, però, si custodisce nell'unico modo in cui i metodi si sono sempre custoditi: praticandolo. Venticinque anni dopo, questa seconda forma di custodia resta aperta a chiunque, in questo settore, voglia candidarsi." },
];

const BACK = {
  it: "Torna alle analisi",
  en: "Back to analysis",
  pt: "Voltar às análises",
} as const;

export default function AmaroIT() {
  const { lang, setLang } = useT();
  const article = getArticleBySlug("amaro_it");
  const desc =
    "Rolim Adolfo Amaro, fondatore della TAM, il tappeto rosso e i sette comandamenti: come un comandante nato in una casa di paglia diede un prezzo ai costi che i contabili non vedono.";
  useCanonical("/Amaro_IT", {
    title: `${article?.title[lang] ?? "Amaro"} — Business Matching Global`,
    description: desc,
    type: "article",
  });

  useEffect(() => {
    const previous = lang;
    if (lang !== "it") setLang("it");
    return () => {
      if (previous !== "it") setLang(previous);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <LangSwitcher to="/amaro" />
        </div>
        <article className="prose-invert">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4">
            {article?.title[lang]}
          </h1>
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
          <ShareBlock title={article?.title[lang] ?? "Amaro"} />
        </article>
        <AnalysisFooter />
      </div>
    </main>
  );
}
