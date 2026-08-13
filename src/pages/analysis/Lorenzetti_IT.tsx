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

const TITLE = "La doccia che decide come si lava il Brasile";

const body: Block[] = [
  { p: "Fate ispezionare un bagno brasiliano a un ingegnere europeo e osservate la sequenza delle reazioni. Prima l'allarme: un soffione di plastica con dentro una resistenza nuda da 7.500 watt, i fili elettrici a vista sul soffitto, l'acqua che si scalda nell'istante esatto in cui tocca il corpo. Nei forum degli espatriati la chiamano ducha da morte — la doccia della morte. Poi lo smarrimento: in tutto l'appartamento non esiste una tubazione dell'acqua calda. Infine, se l'ingegnere resta abbastanza a lungo, qualcosa che somiglia al rispetto." },
  { p: "Perché l'oggetto che ha davanti non è un'improvvisazione. È uno dei casi più riusciti di ingegneria del vincolo nella storia dei beni di consumo — ed è stato progettato, brevettato e industrializzato da una famiglia di immigrati italiani partita da Genova." },
  { h: "Un'invenzione italiana che il Brasile ha fatto sua" },
  { p: "Nel 1923 l'ingegnere civile Alessandro Lorenzetti — arrivato da Genova decenni prima per lavorare alle opere del Porto di Vitória e alla ferrovia Santos–Jundiaí — fondò con il connazionale Carlo Tonanni un'officina di viti di precisione nella Mooca, il quartiere industriale italiano di San Paolo. Quattro dipendenti, quattro torni automatici." },
  { p: "La svolta arrivò con la generazione successiva. Nel 1952, mentre il Brasile si urbanizzava e la rete elettrica correva attraverso le città, il figlio di Alessandro, Lorenzo — metido a inventor, come lo chiamavano in famiglia — brevettò la doccia elettrica automatica: un apparecchio che si accendeva con la pressione stessa dell'acqua. Niente leva, niente fiamma pilota, niente serbatoio. Apri il rubinetto, esce acqua calda." },
  { p: "Settant'anni dopo, la Lorenzetti S.A. opera con cinque stabilimenti tra San Paolo e Minas Gerais, ha registrato ricavi record sopra i 2 miliardi di reais ed esporta in oltre 45 paesi — soprattutto in America Latina e in Africa, mercati che replicano le condizioni esatte del Brasile degli anni Cinquanta: elettrificazione in crescita, niente rete gas, famiglie a corto di capitale. Il riconoscimento definitivo è arrivato a una fiera in Cina, dove alcuni dipendenti Lorenzetti si sono imbattuti in uno stand interamente contraffatto del proprio marchio. Nessuno contraffà un incidente di percorso." },
  { h: "Il rasoio e la resistenza" },
  { p: "Agli occhi europei, i conti sembrano assurdi. Un leader di mercato costruito su un prodotto che al dettaglio costa 60–150 reais — il prezzo di una cena in pizzeria — in una categoria dove l'equivalente europeo, una caldaia a gas o uno scaldabagno ad accumulo, costa cinquanta volte tanto? Dov'è il margine?" },
  { p: "La risposta è che l'apparecchio economico è la porta, non il business. Il CapEx quasi nullo mette un Lorenzetti in praticamente ogni bagno del paese — una base installata che nessun produttore di caldaie potrà mai avvicinare in Brasile. E dentro ognuna di quelle docce c'è un consumabile: la resistenza si brucia, regolarmente, logorata dall'acqua dura e dai cicli termici. La famiglia brasiliana non compra una doccia nuova. Compra una resistência — pochi reais, disponibile in ogni ferramenta e supermercato del paese — e spesso la monta da sola. Lorenzetti vende l'apparecchio una volta e il ricambio per sempre, su decine di milioni di bagni. È il modello rasoio-e-lametta applicato all'acqua calda; la resistenza piatta brevettata Loren Ultra, introdotta nel 2015, chiude ulteriormente il cerchio rendendo il consumabile proprietario." },
  { p: "Il terzo strato è il marchio come standard. Quando il cognome di famiglia diventa il nome comune della categoria — i brasiliani comprano um lorenzetti come si fotocopia con una Xerox — e ogni elettricista del paese sa installare e riparare il prodotto a occhi chiusi, spodestare l'incumbent costa quasi tutto allo sfidante e quasi nulla all'incumbent. Lo stand contraffatto in Cina era semplicemente il mercato che certificava quello status." },
  { p: "Letto come formula: CapEx minimo per massimizzare la base installata, un consumabile ricorrente per monetizzarla, un marchio-standard per difenderla. Settant'anni di rendita costruiti su un oggetto da sessanta reais — l'esatta inversione del modello europeo, che concentra il margine in un prodotto ad alto CapEx venduto una volta sola. Nessuna delle due logiche è ingenua. Ognuna è la risposta razionale alla propria infrastruttura." },
  { h: "La logica del vincolo" },
  { p: "Per capire perché la doccia elettrica ha conquistato il Brasile — e perché non potrà mai conquistare l'Europa — bisogna leggere l'infrastruttura, non il prodotto." },
  { p: "La casa non ha un impianto di acqua calda. Il chuveiro scalda l'acqua nel punto d'uso, nel momento dell'uso. Zero perdite di accumulo, zero tubazioni dell'acqua calda, rendimento di conversione vicino al 100% sull'apparecchio. Costo di installazione: il prezzo del dispositivo, circa 60–150 reais per i modelli base, più un circuito dedicato. In un'economia dove il vincolo stringente della famiglia è il capitale iniziale, non è un compromesso. È l'ottimo." },
  { p: "Il conto lo paga la rete. Milioni di docce che si accendono tra le 18 e le 21 — il banho del dopo-lavoro — hanno creato il famigerato picco residenziale serale brasiliano. Per decenni le società di distribuzione hanno dimensionato la capacità su un carico che esiste tre ore al giorno. Le sperimentazioni tariffarie orarie, la tarifa branca, le campagne per spostare i consumi: molto di tutto questo risale a questo singolo elettrodomestico." },
  { p: "Il modello tariffario lo permette. Ecco la divergenza strutturale che sfugge agli europei. Una famiglia italiana contrattualizza la potenza — tipicamente 3 kW — e il contatore stacca fisicamente sopra quella soglia. Una doccia da 7,5 kW non riuscirebbe nemmeno ad accendersi. La fornitura residenziale brasiliana non ha un tetto di potenza impegnata equivalente: il cliente paga l'energia consumata, e il carico è libero di impennarsi. L'Italia disciplina la domanda a monte, nel contratto; il Brasile la assorbe a valle, nella rete." },
  { p: "Il regime di sicurezza lo tollera. Una resistenza nuda in un flusso d'acqua disperde corrente per costruzione. La norma brasiliana NBR 5410 impone dal 1997 dispositivi differenziali da 30 mA nelle aree bagnate — la stessa soglia delle norme europee — ma ogni elettricista brasiliano conosce la frase \"o chuveiro desarma o DR\": la doccia fa scattare il differenziale. Il rimedio popolare raramente è una doccia nuova. È rimuovere il differenziale — e le rilevazioni di Procobre e Abracopel stimano che solo circa un quarto delle case brasiliane abbia un differenziale installato. Il sistema si regge su un compromesso normativo che nessun regolatore europeo firmerebbe, e una generazione di brasiliani è cresciuta conoscendo il lieve formigamento — il formicolio — di una doccia messa a terra su un tubo dell'acqua, o sul nulla. I moderni design a resistenza incapsulata hanno in gran parte ingegnerizzato via il rischio; il parco installato è un'altra storia." },
  { h: "La lavatrice che non scalda mai" },
  { p: "Una volta capito il chuveiro, la seconda peculiarità brasiliana si spiega da sola: la lavatrice brasiliana standard non ha resistenza. Lava a freddo. Sempre." },
  { p: "Le ragioni si incastrano con precisione. Il budget elettrico della casa — cablaggio, quadro, la stessa fornitura — è già speso sul bagno; non c'è spazio per un secondo carico resistivo da 2 kW nella zona lavanderia. Il clima rende il lavaggio a freddo accettabile per lo sporco quotidiano. E l'industria dei detersivi si è co-evoluta: le formulazioni brasiliane sono sistemi enzimatici ottimizzati per 20–30°C, l'immagine speculare di un mercato europeo rimasto per decenni calibrato su cicli a 40–60°C." },
  { p: "Entrate oggi in un negozio di elettrodomestici a San Paolo o a Belo Horizonte e il mercato si legge in tre fasce. Lo standard di massa: le top-load con agitatore di Brastemp, Consul e dell'onnipresente Electrolux — muli da 15-17 chili, acqua fredda, cicli sotto i quaranta minuti, quasi indistruttibili, presenti in quasi ogni casa brasiliana. La fascia premium: le lavasciuga frontali Lava e Seca, un segmento in boom negli appartamenti della classe media e medio-alta, dominato da LG e Samsung — macchine che funzionano esattamente come le cugine europee, scaldando l'acqua internamente e trattando i capi con delicatezza, posizionate e prezzate come beni di lusso. In mezzo, un compromesso recente: le top-load a turbina (un disco piatto rotante al posto del palo centrale), più gentili sui tessuti, più deboli sullo sporco ostinato." },
  { p: "Perché il mercato di massa ha bisogno di quell'agitatore centrale così aggressivo? La teoria della detergenza industriale risponde con il Cerchio di Sinner — formulato intorno al 1959 da Herbert Sinner, chimico della Henkel, la casa tedesca del Persil, e ancora oggi il modello fondativo insegnato nel lavaggio professionale: ogni lavaggio è la somma di quattro forze — temperatura, chimica, azione meccanica e tempo — rappresentate come spicchi di un cerchio che deve restare sempre pieno. Se riduci uno spicchio, gli altri devono allargarsi per compensare. La macchina brasiliana elimina quasi del tutto la temperatura e si rifiuta di compensare con il tempo (il ciclo dura un terzo di quello europeo), quindi l'intero carico ricade sulla meccanica: l'agitatore afferra, torce e strofina il bucato con scatti secchi e alternati, una simulazione motorizzata di un lavaggio a mano vigoroso. I panni escono puliti, in fretta, e misurabilmente più vecchi. Il cotone si assottiglia, i bordi si sfilacciano, compare il pilling, gli elastici cedono in anticipo." },
  { p: "Notate cosa è successo al costo. Non è sparito — è migrato. La famiglia ha risparmiato sull'elettrodomestico e sulla bolletta, e paga invece con una vita più breve del guardaroba: una spesa ricorrente che non compare su nessuna etichetta energetica, nessun cartellino, nessuna tabella comparativa. Costi che sopravvivono spostandosi su righe che nessuno prezza — è la grammatica del Custo Brasil, applicata a una lavanderia di casa." },
  { p: "L'architettura scende ancora di fascia. Sotto la top-load automatica c'è il tanquinho — la lavatrice semiautomatica, e vale la pena essere precisi su quanto poca macchina sia davvero. Una vasca di plastica con agitatore e timer: lava e risciacqua, ma il resto lo fa la persona — riempirla con la manichetta, dosare il detersivo, scaricare l'acqua, trasferire il carico e strizzarlo a mano o passarlo a una centrífuga, la centrifuga a sé stante che sopravvive in Brasile come categoria merceologica autonoma mezzo secolo dopo essere sparita dagli scaffali europei. Le capacità vanno da 8 a 16 chili — le famiglie li usano soprattutto per i carichi pesanti, coperte, tappeti — e il costo di esercizio è quasi un errore di arrotondamento: senza riscaldamento e senza motore di centrifuga, un tipico modello da 10 chili dichiara circa 0,10 kWh a ciclo. Il prezzo d'acquisto, una frazione di quello di un'automatica, compra mezza lavatrice; l'altra metà la fornisce la famiglia, in lavoro. È la stessa migrazione vista con l'agitatore e il guardaroba: il costo che il cartellino non mostra non è svanito — si è spostato su una riga che nessuno prezza, in questo caso il pomeriggio di qualcuno." },
  { p: "Il leader nazionale delle semiautomatiche è la Suggar di Belo Horizonte — un'azienda fondata nel 1978 attorno a un prodotto completamente diverso, il depuratore d'aria da cucina, che i brasiliani ancora oggi chiamano \"um suggar\" chiunque l'abbia prodotto. Due aziende in una sola storia il cui cognome è diventato il nome comune di una categoria di prodotto: in questo mercato, il premio per chi legge il vincolo per primo è diventare la lingua stessa. E i milioni di tanquinhos venduti ogni anno dicono che la famiglia trova lo scambio del tutto razionale." },
  { p: "E quando una casa brasiliana ha l'acqua calda — un aquecedor de passagem a gas, un impianto solare sul tetto, tipici del patrimonio abitativo medio-alto — la lavatrice si rifiuta comunque di scaldarla. Alcuni modelli si limitano ad accettare acqua già calda in ingresso, di norma con un limite intorno ai 40°C per proteggere la vasca di plastica e le valvole. La divisione del lavoro è esplicita: scaldare l'acqua è compito della casa, non dell'elettrodomestico. L'Europa ha internalizzato il calore dentro la macchina perché la macchina, storicamente, aveva un solo allaccio: quello freddo. Il Brasile lo ha esternalizzato perché la casa, storicamente, aveva un solo scaldacqua: la doccia." },
  { h: "Nessuno dei due prodotti attraversa l'oceano" },
  { p: "Questa è la parte che conta per chiunque pianifichi un ingresso di mercato, in entrambe le direzioni." },
  { p: "Il chuveiro elétrico non può essere esportato in Europa — non per i costi, ma per incompatibilità sistemica: differenziali da 30 mA obbligatori che la sua fisica farebbe scattare, tetti di potenza contrattualizzata che il suo wattaggio sfonderebbe, e una cultura della conformità impiantistica senza alcun appetito per il compromesso brasiliano. Nella direzione opposta, l'ecosistema europeo dell'acqua calda — caldaie a gas, lavatrici che scaldano, radiatori — non può essere esportato in Brasile, perché l'infrastruttura a valle del prodotto non esiste: il gas canalizzato raggiunge una fettina di San Paolo e Rio, e l'impianto della casa media non può ospitare carichi resistivi oltre l'unico che già ha." },
  { p: "Due mercati industriali sofisticati. Due industrie dell'elettrodomestico mature. Flusso di prodotto quasi nullo tra loro in queste categorie — e il gusto del consumatore non c'entra nulla. L'asimmetria è infrastrutturale, regolatoria e tariffaria. Il prodotto è un fossile del sistema che lo ha generato." },
  { p: "Il che riporta la storia a Lorenzetti, e alla ragione per cui un'officina di viti della Mooca del 1923 è diventata un leader di mercato centenario mentre generazioni di importatori fallivano. Alessandro Lorenzetti non spedì la soluzione italiana attraverso l'Atlantico. Suo figlio lesse il vincolo brasiliano reale — idroelettricità abbondante, niente gas, niente capitale, case senza tubazioni per il calore — e ingegnerizzò la risposta nativa. Il prodotto è nato in Brasile perché il metodo è stato applicato in Brasile." },
  { p: "Un secolo dopo la lezione è immutata. Prima di chiedervi quanto costa spedire il vostro prodotto, fatevi una domanda più difficile: quanta parte del sistema da cui il vostro prodotto dipende esiste dall'altra parte dell'oceano — e se la risposta è \"poca\", il vostro vero export è davvero il prodotto, o il metodo che ne progetterebbe il gemello brasiliano?" },
  { p: "Business Matching Global mappa l'infrastruttura dietro il mercato — prima che parta il container." },
];

export default function LorenzettiIT() {
  const { lang, setLang } = useT();
  const article = getArticleBySlug("lorenzetti_it");
  const desc =
    "Come una famiglia di immigrati italiani ha progettato la doccia elettrica brasiliana — e perché quell'apparecchio, la lavatrice a freddo e il tanquinho rivelano la logica infrastrutturale del Custo Brasil.";
  useCanonical("/lorenzetti", {
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
            Torna alle analisi
          </Link>
          <LangSwitcher to="/lorenzetti" />
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
