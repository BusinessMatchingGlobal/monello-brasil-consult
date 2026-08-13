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
  { p: "Ogni anno 150.000 persone volano tra Milano e Lima. Nessuna compagnia aerea vola tra Milano e Lima. Emirates se n'è accorta." },
  { p: "Secondo il corrispondente di aviazione del Corriere della Sera, Leonard Berberi (12 agosto), Emirates è vicina a ottenere l'approvazione per operare un servizio diretto Milano Malpensa–Lima in virtù di un allegato agli accordi bilaterali Italia–Emirati Arabi. Mancherebbe ancora la firma regolatoria finale, dicono le fonti del Corriere, ma l'estensione del cosiddetto regime di \"quinta libertà\" potrebbe essere autorizzata già nella prossima stagione invernale — la finestra industriale che va da fine ottobre a fine marzo." },
  { p: "Due avvertenze prima dell'analisi, perché da BMG citiamo le fonti e usiamo il condizionale finché l'inchiostro non è asciutto. Prima: l'autorizzazione non è l'operazione. Emirates stessa, interpellata dal Corriere, non ha negato di aver richiesto i diritti ma ha dichiarato di non avere \"piani immediati\" per Lima e di valutare continuamente le rotte in base alla domanda, alle condizioni di mercato e alla disponibilità di aeromobili. Seconda: Emirates oggi non serve Lima per nulla — nemmeno dal proprio hub di Dubai. Ciò che si sta assicurando è un'opzione, non un orario." },
  { p: "Esiste perfino un precedente di opzione non utilizzata. Come ricorda lo specialista Italiavola, Emirates in passato aveva già ottenuto quattro frequenze settimanali per un'altra rotta fifth-freedom da Malpensa — da tempo oggetto di voci che indicavano Città del Messico — e non l'ha mai aperta. Lo stesso outlet indica il 25 ottobre, inizio dell'orario invernale, come probabile data effettiva della nuova autorizzazione. Emirates serve oggi Malpensa tre volte al giorno da Dubai, con la terza frequenza ripristinata il 1 agosto con l'A350-900, oltre alla quotidiana continuità fifth-freedom verso New York." },
  { p: "È proprio questo che rende la storia degna di essere letta." },
  { h: "La rendita in contestazione" },
  { p: "Considerate il numero sepolto nel mezzo dell'articolo del Corriere: circa 150.000 passeggeri all'anno volano tra Milano e la capitale peruviana, e ognuno di loro si collega altrove. Lima è la più grande destinazione non servita in modo nonstop da Milano — un mercato con tre distinti strati di domanda (la comunità peruviana in Italia, il turismo, gli affari) più cargo in entrambe le direzioni." },
  { p: "Oggi quel traffico è raccolto dagli hub delle grandi compagnie europee. I passeggeri della Lombardia vengono \"pescati\" — il verbo è del Corriere — e trasportati a Roma, Francoforte, Parigi, Madrid o Londra, per poi volare oltre Atlantico. Questa non è una rotta; è una rendita. La domanda esiste indipendentemente da qualsiasi decisione di prodotto di una compagnia aerea. Gli hub si limitano a sedersi tra la domanda e la geografia e a riscuotere il pedaggio." },
  { p: "E le barriere sono meno di quanto suggerisca la mappa. Secondo l'outlet brasiliano Aeroin, oggi gli unici collegamenti nonstop di Lima con l'Europa sono Amsterdam, Barcellona, Parigi e Madrid — i sistemi Air France-KLM e IAG. La rendita, in altre parole, è riscossa da due gruppi aerei; tutti gli altri, Italia inclusa, li alimentano." },
  { p: "La quinta libertà è lo strumento giuridico che consente a un vettore di terza parte di contestare quella rendita. Emirates gestisce già il modello nella direzione opposta: il volo EK205 Dubai–Milano–New York vende posti sulla sola tratta Milano–New York, pur non essendo Emirates né italiana né americana. Quella rotta è stata testata in ogni modo rilevante: ha superato una sfida legale promossa dall'associazione dei vettori italiani Assaereo, con un tribunale amministrativo italiano che si è pronunciato a favore di Emirates, e il suo successo ha spinto — per il racconto dello stesso presidente di Emirates Tim Clark all'epoca — circa dieci città europee a chiedere alla compagnia servizi transatlantici simili. Malpensa–Lima sarebbe la stessa architettura, blindata in sede giudiziaria, puntata a sud." },
  { p: "Una doverosa avvertenza su questa architettura. Una tratta fifth-freedom è slegata da Dubai sul piano commerciale, non su quello operativo: l'aeromobile proviene comunque dall'hub. Quando la guerra con l'Iran ha chiuso lo spazio aereo del Golfo a marzo, l'intera rete fifth-freedom di Emirates — Malpensa–New York compresa, insieme ad Atene–Newark, Barcellona–Città del Messico e Miami–Bogotá — si è fermata per giorni. Un Milano–Lima nonstop operato da Emirates comporterebbe un'esposizione geopolitica che una connessione Madrid o Parigi non ha. L'architettura contesta la rendita; non abolisce il rischio." },
  { h: "La vacanza" },
  { p: "C'è uno strato più profondo in questa storia, ed è italiano, non emiratino. Il mercato in cui Emirates sta entrando non è stato tolto a nessuno. È stato lasciato vuoto — deliberatamente." },
  { p: "Malpensa è stata costruita per essere esattamente ciò che descrive questo dossier: il progetto \"Malpensa 2000\" inaugurato nel 1998 come hub intercontinentale per il Nord Italia. Dieci anni dopo, Alitalia l'ha de-hubbed — una decisione annunciata nel piano 2007, attuata nel 2008 e consolidata dal salvataggio CAI, che concentrò la rete su Roma Fiumicino. La logica di mantenere un unico hub era economica; la scelta di quale hub tenere era politica. Perché la domanda non si è mai spostata. La catchment di Malpensa — la Lombardia e le regioni circostanti — è la più ricca del Paese, e lo squilibrio si legge negli orari: come nota lo stesso Corriere, oggi da Malpensa ci sono più voli nonstop per l'Asia che da Fiumicino. La compagnia di bandiera italiana si è ritirata dal mercato aereo più ricco d'Italia e lo ha lasciato strutturalmente non servito per il lungo raggio." },
  { p: "Ciò che è seguito è stato meccanico. Lufthansa ha provato a colmare il vuoto con Lufthansa Italia (2009–2011) e ha rinunciato. I vettori low-cost hanno preso il corto raggio. Emirates ha aperto il servizio fifth-freedom per New York nel 2013. E ora Lima. Ciascuno di questi operatori non sta cogliendo una rendita; sta occupando una vacanza che viene pubblicizzata dal 2008." },
  { p: "Vista in questo modo, la lamentela di ITA si inverte. La compagnia predecessore aveva abbandonato Malpensa per proteggere l'hub di Roma — e la sua successora ora si oppone perché qualcun altro serve, da Malpensa, mercati che Roma non ha mai servito affatto. I 150.000 passeggeri instradati ogni anno via Madrid e Parigi non sono una minaccia creata da Emirates. Sono la fattura annuale ancora in corso di pagamento per una decisione presa diciotto anni fa." },
  { h: "L'altra metà del continente" },
  { p: "I lettori di questa pagina conoscono la nostra tesi ricorrente: il Brasile concentra circa la metà del PIL sudamericano, e l'altra metà non è una nota a piè di pagina — è un mercato strutturato in modo diverso. È indicativo che il primo nuovo nodo Europa–Sudamerica in discussione da Milano non sia brasiliano. Da Malpensa, l'unico nonstop verso il continente oggi è il servizio LATAM per San Paolo. La shortlist di Emirates per ulteriori rotte fifth-freedom, secondo le fonti del Corriere, include San Paolo — ma anche Santiago, Città del Messico e Los Angeles." },
  { p: "Gli analisti citati nell'articolo notano che l'America Latina è attualmente il mercato che mostra i migliori yield economici. Quando un vettore con la disciplina di rete di Emirates inizia a raccogliere opzioni fifth-freedom oltre Atlantico, non è sentimentalismo. È una scommessa misurata sul fatto che il corridoio Europa–America Latina sia sotto-servito rispetto a ciò che rende." },
  { h: "Chi si complica" },
  { p: "ITA Airways — oggi al 41% di Lufthansa, in procinto di arrivare al 90% all'inizio del 2027 — sta costruendo la propria espansione latinoamericana da Roma Fiumicino, con Santiago tra le aggiunte previste. Un Malpensa–Lima nonstop operato da un vettore del Golfo drenerebbe esattamente il feed del nord Italia che rende marginalmente sostenibili le rotte a lungo raggio da Roma. L'amministratore delegato di SEA, Armando Brunini, aveva già detto al Corriere che l'attenzione di Malpensa si sarebbe ora concentrata sul Sudamerica. Sul punto, l'operatore aeroportuale milanese e la compagnia di bandiera milanese-circa stanno su fronti opposti." },
  { p: "C'è un paradosso che vale la pena sottolineare. Secondo Aeroin, nessun vettore del Gruppo Lufthansa serve Lima — né da Francoforte, né da Monaco, né da Zurigo. Il gruppo che a breve possiederà il 90% della compagnia di bandiera italiana non ha prodotto nel mercato che vorrebbe difendere. L'obiezione a Emirates su Milano–Lima non è \"noi serviamo questo mercato meglio\"; è \"preferiremmo che questo mercato continuasse a collegarsi attraverso l'hub di qualcun altro\" — e non neanche, oggi, attraverso quello della Lufthansa." },
  { h: "Cosa significa per gli stakeholder del corridoio" },
  { p: "Per le aziende con cui lavoriamo, tre letture pratiche." },
  { p: "La connettività è regolatoria prima che commerciale. Il vincolo vincolante su Milano–Lima non è mai stata la domanda — 150.000 passeggeri annui lo dimostrano. Era una firma su un allegato bilaterale. Finestre come questa si aprono per atto amministrativo e possono chiudersi allo stesso modo; gli operatori che ne beneficiano sono quelli che osservano la documentazione, non quelli che aspettano il comunicato stampa." },
  { p: "Le stive sono infrastruttura. L'autorizzazione in discussione copre passeggeri e cargo. Un widebody nonstop tra Lombardia e Perù è capacità di esportazione per prodotti deperibili, parti di macchinari e farmaci in entrambe le direzioni — capacità che oggi si instrada attraverso hub di terzi con i costi di tempo e movimentazione che ciò comporta." },
  { p: "Guardate alla shortlist, non solo al titolo. Se Santiago, Città del Messico e San Paolo da Malpensa fossero davvero in studio, la mappa della connettività Europa–America Latina viene ridisegnata da un vettore di nessuno dei due continenti. Per chiunque stia pianificando un ingresso di mercato su entrambe le sponde dell'Atlantico, l'assunto che \"ti colleghi attraverso un hub europeo\" ha una data di scadenza." },
  { p: "La rotta esiste già. La domanda che i regolatori stanno per rispondere è semplicemente: chi viene pagato per essa." },
  { p: "Fonti: Corriere della Sera (Leonard Berberi, 12 agosto 2026), con dati di rotta attribuiti dal Corriere a Cirium; Italiavola (12 agosto 2026); Aeroin (12 agosto 2026); archivio Gulf News sul caso Assaereo e sulle dichiarazioni di Tim Clark." },
];

export default function LimaIT() {
  const { lang, setLang } = useT();
  const article = getArticleBySlug("lima_it");
  const desc =
    "Ogni anno 150.000 persone volano tra Milano e Lima, e nessuna compagnia serve la rotta. Perché l'opzione fifth-freedom di Emirates è una lotta per una rendita che l'Italia ha lasciato vacante nel 2008.";
  useCanonical("/lima_it", {
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
