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

const TITLE = "La rotta che esiste già";

const BACK = {
  it: "Torna alle analisi",
  en: "Back to analysis",
  pt: "Voltar às análises",
} as const;

const body: Block[] = [
  { p: "Ogni anno 150 mila persone volano tra Milano e Lima. Nessuna compagnia vola tra Milano e Lima. Emirates se n'è accorta." },
  { p: "Secondo Leonard Berberi, corrispondente di aviazione del Corriere della Sera (12 agosto), Emirates è vicina a ottenere l'approvazione per operare il collegamento diretto Milano Malpensa–Lima sfruttando un'appendice degli accordi bilaterali tra Italia ed Emirati Arabi Uniti. Mancherebbe soltanto l'ultima firma, riferiscono le fonti del Corriere, ma l'estensione del cosiddetto regime di «quinta libertà» potrebbe essere autorizzata già dalla prossima stagione invernale — la finestra che nel settore parte a fine ottobre e termina negli ultimi giorni di marzo." },
  { p: "Due avvertenze prima dell'analisi, perché in BMG attribuiamo e usiamo il condizionale finché l'inchiostro non è asciutto. Primo: autorizzazione non significa operatività. Emirates stessa, contattata dal Corriere, non ha smentito di aver chiesto i diritti, ma ha dichiarato di non avere piani immediati per Lima e di valutare continuamente le rotte in base a domanda, condizioni di mercato e disponibilità di aeromobili. Secondo: oggi Emirates non serve Lima in alcun modo — nemmeno dal proprio hub di Dubai. Ciò che si sta mettendo al sicuro è un'opzione, non un orario." },
  { p: "Un precedente di opzione mai esercitata esiste già. Come ricorda la testata specializzata Italiavola, Emirates aveva ottenuto in passato quattro frequenze settimanali per un'altra rotta in quinta libertà da Malpensa — a lungo si è parlato di Città del Messico — e non l'ha mai aperta. La stessa fonte indica il 25 ottobre, avvio dell'orario invernale, come probabile data di efficacia della nuova autorizzazione. Emirates serve oggi Malpensa con tre voli giornalieri da Dubai, il terzo ripristinato il 1° agosto con l'A350-900, più la prosecuzione quotidiana in quinta libertà su New York." },
  { p: "Ed è proprio questo a rendere la vicenda degna di lettura." },
  { h: "La rendita che viene contesa" },
  { p: "Si consideri il numero sepolto a metà dell'articolo del Corriere: circa 150 mila passeggeri all'anno volano tra Milano e la capitale peruviana, tutti facendo scalo altrove. Lima è la maggiore destinazione non servita da voli diretti da Milano — un mercato con tre strati di domanda distinti (la comunità peruviana in Italia, il turismo, il business) più le merci in entrambe le direzioni." },
  { p: "Oggi quel traffico viene raccolto dagli hub dei grandi gruppi europei. I passeggeri della Lombardia vengono «pescati» — il verbo è del Corriere — e portati a Roma, Francoforte, Parigi, Madrid o Londra, per poi essere trasportati oltreoceano. Non è una rotta: è una rendita. La domanda esiste indipendentemente dalle scelte di prodotto di qualsiasi compagnia. Gli hub si limitano a collocarsi tra la domanda e la geografia, e a incassare il pedaggio." },
  { p: "E i caselli sono meno numerosi di quanto la mappa suggerisca. Secondo la testata brasiliana Aeroin, gli unici collegamenti diretti di Lima con l'Europa sono oggi Amsterdam, Barcellona, Parigi e Madrid: i sistemi Air France-KLM e IAG. La rendita, in altre parole, è incassata da due gruppi; tutti gli altri, Italia compresa, li alimentano." },
  { p: "La quinta libertà è lo strumento giuridico che consente a un vettore di un Paese terzo di contendere quella rendita. Emirates applica già il modello nella direzione opposta: il volo EK205 Dubai–Milano–New York vende biglietti anche solo sulla tratta Milano–New York, pur non essendo la compagnia né italiana né statunitense. Quella rotta è stata collaudata in tutti i modi che contano: ha superato il ricorso presentato dall'associazione dei vettori italiani Assaereo, con la giustizia amministrativa italiana che ha dato ragione a Emirates, e il suo successo portò — a detta dello stesso presidente Tim Clark all'epoca — una decina di città europee a chiedere alla compagnia un servizio transatlantico analogo. Malpensa–Lima sarebbe la stessa architettura, già passata al vaglio dei tribunali, puntata verso sud." },
  { p: "Un'avvertenza onesta su quell'architettura. Una tratta in quinta libertà è slegata da Dubai commercialmente, non operativamente: l'aeromobile parte comunque dall'hub. Quando la guerra con l'Iran ha chiuso lo spazio aereo del Golfo a marzo, l'intera rete in quinta libertà di Emirates — Malpensa–New York compresa, insieme ad Atene–Newark, Barcellona–Città del Messico e Miami–Bogotá — si è fermata per giorni. Un Milano–Lima operato da Emirates porterebbe con sé un'esposizione geopolitica che una connessione via Madrid o Parigi non ha. L'architettura contende la rendita; non abolisce il rischio." },
  { h: "Il posto vacante" },
  { p: "C'è uno strato più profondo in questa vicenda, ed è italiano, non emiratino. Il mercato in cui Emirates si sta muovendo non è stato tolto a nessuno. È stato lasciato libero — deliberatamente." },
  { p: "Malpensa era stata costruita per essere esattamente ciò di cui parla questo dossier: il progetto «Malpensa 2000» apre nel 1998 come hub intercontinentale del Nord Italia. Dieci anni dopo Alitalia lo smantella — decisione annunciata nel piano del 2007, eseguita nel 2008 e cementata dal salvataggio CAI, che concentrò la rete su Roma Fiumicino. La logica di tenere un hub solo era economica; la scelta di quale hub tenere fu politica. Perché la domanda non si è mai spostata. Il bacino di Malpensa — la Lombardia e le regioni limitrofe — è il più ricco del Paese, e lo squilibrio si legge negli orari: come nota lo stesso Corriere, oggi da Malpensa ci sono più voli diretti per l'Asia che da Roma Fiumicino. La compagnia di bandiera italiana si è ritirata dal mercato aereo più ricco d'Italia, lasciandolo strutturalmente scoperto sul lungo raggio." },
  { p: "Ciò che è seguito è stato meccanico. Lufthansa ha provato a riempire il vuoto in proprio con Lufthansa Italia (2009-2011) e ha rinunciato. I low cost hanno preso il corto raggio. Emirates ha aperto il New York in quinta libertà nel 2013. E adesso Lima. Nessuno di questi operatori sta strappando una rendita: sta occupando un posto vacante, messo a bando di fatto dal 2008." },
  { p: "Vista così, la doglianza di ITA si rovescia. La compagnia che l'ha preceduta abbandonò Malpensa per proteggere l'hub di Roma — e la sua erede oggi obietta perché qualcun altro serve, da Malpensa, mercati che Roma non ha mai servito. I 150 mila passeggeri instradati ogni anno via Madrid e Parigi non sono una minaccia creata da Emirates. Sono la fattura annuale, ancora in corso, di una decisione presa diciotto anni fa." },
  { h: "L'altra metà del continente" },
  { p: "Chi ci legge conosce la nostra tesi ricorrente: il Brasile concentra all'incirca metà del PIL sudamericano, e l'altra metà non è una nota a piè di pagina — è un mercato con una struttura diversa. È significativo che il primo nuovo nodo Europa–Sudamerica in discussione da Milano non sia brasiliano. Da Malpensa, oggi l'unico volo diretto verso il continente è il San Paolo di LATAM. La rosa di ulteriori rotte in quinta libertà allo studio di Emirates, secondo le fonti del Corriere, comprende San Paolo — ma anche Santiago del Cile, Città del Messico e Los Angeles." },
  { p: "Gli analisti citati nell'articolo osservano che l'America Latina è in questo momento il mercato che mostra i rendimenti migliori. Quando un vettore con la disciplina di rete di Emirates comincia a collezionare opzioni in quinta libertà attraverso l'Atlantico, non è sentimento. È una scommessa misurata sul fatto che il corridoio Europa–America Latina sia sottoservito rispetto a quanto rende." },
  { h: "A chi si complica la vita" },
  { p: "ITA Airways — oggi al 41% di Lufthansa, quota che salirà al 90% a inizio 2027 — sta costruendo la propria espansione latinoamericana da Roma Fiumicino, con Santiago tra le aggiunte pianificate. Un Malpensa–Lima operato da un vettore del Golfo drenerebbe esattamente il feederaggio del Nord Italia che rende sostenibili le rotte di lungo raggio marginali da Roma. L'amministratore delegato di SEA, Armando Brunini, aveva già detto al Corriere che il focus di Malpensa sarebbe stato ora il Sudamerica. Il gestore aeroportuale di Milano e la compagnia di bandiera si trovano, su questo dossier, su fronti opposti." },
  { p: "C'è qui un paradosso che vale la pena sottolineare. Secondo Aeroin, nessun vettore del gruppo Lufthansa serve Lima: né da Francoforte, né da Monaco, né da Zurigo. Il gruppo che presto possiederà il 90% della compagnia di bandiera italiana non ha alcun prodotto nel mercato che difenderebbe. L'obiezione a Emirates sul Milano–Lima non è «serviamo meglio questo mercato»; è «preferiremmo che questo mercato continuasse a passare dall'hub di qualcuno» — e oggi nemmeno da quello di Lufthansa." },
  { h: "Che cosa significa per gli attori del corridoio" },
  { p: "Per le imprese con cui lavoriamo, tre letture pratiche." },
  { p: "La connettività è regolatoria prima che commerciale. Il vincolo stringente sul Milano–Lima non è mai stata la domanda: i 150 mila passeggeri annui lo dimostrano. Era una firma su un'appendice bilaterale. Finestre come questa si aprono per atto amministrativo e allo stesso modo possono chiudersi; a beneficiarne sono gli operatori che guardano le carte, non quelli che aspettano il comunicato stampa." },
  { p: "Le stive sono infrastruttura. L'autorizzazione in discussione copre passeggeri e merci. Un widebody diretto tra Lombardia e Perù è capacità di export per deperibili, componentistica e farmaceutico in entrambe le direzioni — capacità che oggi passa da hub terzi, con i costi di tempo e di handling che ciò comporta." },
  { p: "Guardate la rosa, non solo il titolo. Se Santiago, Città del Messico e San Paolo da Malpensa sono davvero allo studio, la mappa della connettività Europa–America Latina la sta ridisegnando un vettore che non appartiene a nessuno dei due continenti. Per chi pianifica un ingresso di mercato su una delle due sponde, l'assunto «si passa da un hub europeo» ha una data di scadenza." },
  { p: "La rotta esiste già. La domanda a cui i regolatori stanno per rispondere è soltanto chi verrà pagato per farla." },
  { p: "Fonti: Corriere della Sera (Leonard Berberi, 12 agosto 2026), con dati di rotta attribuiti dal Corriere a Cirium; Italiavola (12 agosto 2026); Aeroin (12 agosto 2026); archivio Gulf News sul caso Assaereo e sulle dichiarazioni di Tim Clark." },
];

export default function LimaIT() {
  const { lang } = useT();
  const article = getArticleBySlug("lima_it");
  const desc =
    "Ogni anno 150.000 persone volano tra Milano e Lima, e nessuna compagnia serve la rotta. Perché l'opzione fifth-freedom di Emirates è una lotta per una rendita che l'Italia ha lasciato vacante nel 2008.";
  useCanonical("/lima_it", {
    title: `${TITLE} | Business Matching Global`,
    description: desc,
    type: "article",
  });


  return (
    <main className="min-h-screen bg-background">
      <div className="container max-w-3xl py-16 md:py-24">
        <div className="flex items-center justify-between gap-4 mb-8">
          <Link
            to="/analysis"
            className="inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Torna alle analisi
          </Link>
          <LangSwitcher to="/lima" />
        </div>
        <article className="prose-invert">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4">
            {article?.title.it ?? TITLE}
          </h1>
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
          <ShareBlock title={article?.title.it ?? TITLE} />
        </article>
        <AnalysisFooter />
      </div>
    </main>
  );
}
