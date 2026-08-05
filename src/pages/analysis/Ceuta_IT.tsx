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

const TITLE = "Votare con i piedi";

const body: Block[] = [
  { p: "#CustoBrasil — Business Matching Global · 02-08-2026, aggiornato al 05-08-2026" },
  { p: "Cosa ci dice quello che è accaduto a fine luglio a Ceuta — una volta filtrato il clamore" },
  { p: "Alcuni testi sono scritti per persuadere. Questo è scritto basandosi su un'attenta verifica dei fatti. Nei giorni successivi agli eventi di Ceuta, nelle capitali europee e sui social media ha circolato un volume insolito di affermazioni categoriche — molte delle quali verificabili, e molte altre assolutamente prive di fondamento. Quanto segue non è una difesa di alcun governo. È un esercizio volto a ricostruire il quadro dei fatti, perché nell'analisi di mercato, come in politica, solo i fatti verificati e verificabili rivelano quello che realmente è accaduto e sta accadendo." },
  { h: "Fatto numero uno: Ceuta non fa parte dello spazio Schengen — e non ne ha mai fatto parte" },
  { p: "L'affermazione più clamorosa della settimana scorsa — secondo cui i migranti entrati a Ceuta avrebbero «violato lo spazio Schengen» e potrebbero raggiungere liberamente Milano o Helsinki — crolla al primo controllo della normativa vigente." },
  { p: "Quando la Spagna aderì all'Accordo di Schengen nel 1991, al suo Atto di adesione fu allegata una dichiarazione specifica su Ceuta e Melilla, che escludeva le due città nordafricane dal regime di libera circolazione. Tale status speciale è ancora in vigore oggi nell'articolo 41 del Codice delle frontiere Schengen. In concreto: l'ingresso a Ceuta non conferisce il diritto di rimanere in Spagna, di raggiungere la penisola iberica o di circolare in Europa. I controlli all'uscita tra Ceuta e la terraferma esistono dal 1991." },
  { p: "I numeri confermano che il sistema ha funzionato come previsto. Delle circa 50.000–60.000 persone che hanno attraversato il confine in meno di 24 ore, le autorità spagnole riferiscono che oltre 48.000 sono state rimpatriate in Marocco entro 48 ore. Il 1° agosto, la presidente della Commissione von der Leyen — dopo una videochiamata con i commissari Brunner e Šuica — ha dichiarato pubblicamente che la stragrande maggioranza di coloro che erano entrati era già tornata in Marocco grazie all'operato delle forze spagnole e marocchine, e che nessuna persona aveva raggiunto la Spagna continentale o il resto dell'UE." },
  { p: "Un governo ha tuttavia sospeso l'accordo di Schengen con la Spagna per un mese, ripristinando controlli selettivi alle frontiere marittime e aeree. Due dettagli procedurali completano il quadro: Bruxelles ha osservato che la sospensione era stata annunciata prima che qualsiasi notifica formale giungesse alla Commissione, e un portavoce dell'UE ha chiesto pubblicamente a Roma di spiegare in che modo la crisi di Ceuta costituisse una minaccia alla sicurezza — il presupposto giuridico per il ripristino dei controlli interni. Bruxelles ha inoltre sottolineato che l'enclave, come Melilla, è una frontiera esterna dove erano in atto i controlli necessari, e che da essa non erano stati rilevati flussi migratori." },
  { p: "Lo stesso governo ha poi promosso, insieme alla Danimarca, una lettera firmata da 22 capi di Stato e di governo europei — indirizzata ai presidenti del Consiglio europeo e della Commissione e alla presidenza irlandese di turno — in cui si chiedeva una videoconferenza urgente dei ministri dell'Interno e una risposta europea coordinata in materia di frontiere esterne, rimpatri e traffico di esseri umani. Mettiamo le due mosse una accanto all'altra e lasciamo che parlino da sole: una sospensione unilaterale di Schengen annunciata senza notifica formale e una lettera che invoca il coordinamento e una risposta europea unitaria, nello stesso ciclo di notizie. Uno dei due gesti contraddice l'altro; spetta al lettore decidere quale fosse destinato a Bruxelles e quale al telegiornale serale nazionale." },
  { h: "Fatto numero due: la regolarizzazione non ha nulla a che vedere con la recinzione" },
  { p: "Una seconda affermazione ha collegato la crisi alla regolarizzazione da parte della Spagna di circa 500.000 migranti, presentata come un invito aperto ad attraversare il confine. I meccanismi dicono il contrario: il processo spagnolo richiede una residenza precedente documentata in Spagna, una fedina penale pulita e un contratto di lavoro o la prova di mezzi sufficienti. Chiunque scavalchi una recinzione nel luglio 2026 è, per definizione, escluso da tale processo. Le autorità spagnole hanno inoltre documentato una campagna di disinformazione condotta da reti di trafficanti, che ha travisato una sentenza della Corte Suprema sui rimpatri alla frontiera per convincere le persone che raggiungere Ceuta garantisse la permanenza. Non è così; la sentenza ha modificato la procedura, non i diritti di soggiorno." },
  { p: "Per la cronaca, i dati Frontex citati dal governo spagnolo sugli ingressi irregolari tra il 2021 e il 2026 classificano le rotte come segue: Italia a circa 478.600; i Balcani occidentali a 340.600; la Grecia a 259.800; la Spagna a 234.760. Il paese che ha sospeso l'accordo di Schengen con la Spagna ha registrato circa il doppio degli ingressi irregolari rispetto alla Spagna nello stesso periodo." },
  { p: "Vale la pena notare come sia stata formulata questa replica. Mentre altre capitali hanno inasprito la situazione — invocando vertici, chiudendo frontiere, convocando ambasciatori — la risposta del primo ministro spagnolo ha assunto la forma di un post sui social media che elencava quelle cifre di Frontex, introdotte da un'unica osservazione: la solidarietà e l'empatia sono facoltative; il rispetto dei trattati europei e dei dati non lo è. Da una parte si è risposto con una tabella, dall'altra con un'escalation diplomatica. Il lettore può decidere quale delle due parti temesse la verifica." },
  { h: "Fatto numero tre: il modello spagnolo, imperfetto ma misurabile" },
  { p: "La Spagna è attualmente la grande economia in più rapida crescita dell'eurozona, con un'espansione di circa il 3% all'anno per due anni consecutivi, mentre Germania e Italia si aggirano intorno allo zero. I fattori trainanti sono ben documentati: turismo da record, efficace assorbimento dei fondi del Next Generation EU, energia rinnovabile a basso costo e — ironia dell'attuale polemica — l'immigrazione stessa, che ha sostenuto l'occupazione e i consumi in un continente che invecchia. Il modello presenta reali punti deboli: una grave crisi abitativa, una bassa produttività per ora lavorata, una precarietà lavorativa residua. Ma «imperfetto e in crescita del 3%» è una frase ben diversa da quella che si sta scrivendo sulla Spagna questa settimana." },
  { h: "Fatto numero quattro: il Marocco non è un Eldorado — 60.000 persone lo hanno appena confermato" },
  { p: "Qui la crisi diventa davvero istruttiva, perché smonta non una, ma ben due narrazioni." },
  { p: "Il Marocco ha trascorso anni a promuoversi come la storia di successo dell'Africa: crescita del PIL superiore al 3% all'anno, espansione cumulativa del 22% dal 2019, un settore delle esportazioni che si avvicina alla produzione automobilistica italiana, la linea ferroviaria ad alta velocità da Kenitra a Marrakech e i Mondiali del 2030 — organizzati insieme a Spagna e Portogallo — con quello che sarà lo stadio più grande del mondo." },
  { p: "L'altro quadro: circa due terzi dell'occupazione marocchina è informale — il 67,6% secondo il conto satellite dell'HCP elaborato con l'OIT, oltre il 67% secondo l'OCSE, fino al 77% in altre stime. La disoccupazione dei giovani tra i 15 e i 24 anni ha superato il 36% nel 2024-2025 secondo i dati HCP; con la nuova metodologia «in senso stretto» adottata nel 2026 il tasso scende al 29%, ma l'indicatore complessivo di sottoutilizzazione della forza lavoro giovanile tocca il 45%. La partecipazione femminile al mercato del lavoro è scesa dal 28% circa del 2000 al 19% — uno dei divari più ampi a livello globale. La crescita è concentrata in settori ad alta intensità di capitale, controllati in gran parte da multinazionali straniere, che assorbono investimenti ma danno lavoro a pochi e ridistribuiscono ancora meno. Il movimento di protesta GenZ 212 ha sintetizzato questo squilibrio in uno slogan: vogliamo ospedali, non stadi. L'OCSE colloca il Marocco ai primi posti della classifica mondiale dei paesi per numero di lavoratori in fuga." },
  { p: "È questo il contesto in cui decine di migliaia di marocchini — non migranti di transito provenienti dal Sahel, ma marocchini — hanno preso d'assalto una recinzione nel giorno della Festa del Trono del loro re. Il bilancio è documentato: almeno 67 corpi recuperati dai sommozzatori, dalla Guardia Civil e dal soccorso marittimo spagnolo tra coloro che hanno tentato di aggirare a nuoto il frangiflutti del Tarajal, ora sbarrato da una barriera galleggiante lunga 500 metri. Nessuna relazione di consulenza, nessuna campagna di marketing sovrano, nessun taglio del nastro per un'infrastruttura può superare il peso di quel dato. Quando le persone rischiano la vita tra il filo spinato e il mare aperto, stanno assegnando a un Paese un rating più onesto di qualsiasi cosa pubblichi un'agenzia di rating." },
  { p: "Hanno votato con i piedi. È l'unico voto che non può essere manipolato." },
  { h: "Fatto numero cinque: il bilancio degli stessi accusatori" },
  { p: "I governi più accesi nel denunciare Madrid meritano la stessa verifica fattuale che esigono dagli altri." },
  { p: "L'Italia, nel 2025, ha limitato la cittadinanza iure sanguinis — con un decreto firmato dallo stesso ministro degli Esteri che ora attacca la regolarizzazione spagnola — escludendo la maggior parte dei discendenti sudamericani degli emigranti italiani, ad eccezione dei figli e dei nipoti di coloro che sono nati in Italia. Lo stesso schieramento politico assiste ora all'arrivo in Parlamento di un'iniziativa legislativa popolare denominata «Remigrazione e Riconquista», con 150.000 firme: un testo che definisce la remigrazione come il rimpatrio assistito degli stranieri legalmente residenti in Italia e che — in una svolta degna di nota — propone contemporaneamente il sostegno statale per il ritorno dei discendenti italiani all'estero." },
  { p: "Leggiamo le due politiche insieme. I discendenti che hanno trascorso anni in coda ai consolati per rivendicare la cittadinanza italiana stavano votando con i piedi verso l'Italia — e la porta è stata chiusa loro in faccia, liquidati come un costo consolare. Gli stranieri che hanno votato con i piedi verso l'Italia e vi hanno costruito una vita regolare sono ora, nella proposta più radicale sul tavolo, invitati ad andarsene. Una diaspora liquidata come un onere; una popolazione residente ridefinita come un surplus. Qualunque sia la propria posizione politica, la contabilità non è coerente — e una contabilità incoerente è un pessimo pulpito da cui dare lezioni a Madrid." },
  { h: "Il metodo dietro il clamore" },
  { p: "Nella newsletter #CustoBrasil su LinkedIn si è già scritto delle aziende brasiliane che attraversavano il Ponte da Amizade per trasferirsi in Paraguay, votando con i piedi contro il Custo Brasil. La crisi di Ceuta è lo stesso fenomeno su scala umana, con tre flussi che esprimono tre verdetti: le aziende brasiliane contro la loro struttura dei costi, i cittadini marocchini contro il loro «miracolo a due velocità», i discendenti italiani verso una patria che ha smesso di rispondere." },
  { p: "In ogni caso, il potere ha risposto ai «piedi» con la retorica invece che con le riforme." },
  { h: "Aggiornamento — 5 agosto 2026: cosa ha aggiunto il fascicolo in tre giorni" },
  { p: "Questo pezzo è stato pubblicato il 2 agosto. Lasciamo intatti i cinque fatti qui sopra — nessuno ha richiesto correzioni — e registriamo, con la data, ciò che il dossier pubblico ha aggiunto da allora." },
  { p: "I numeri sono convergenti. Il principale quotidiano economico italiano, Il Sole 24 Ore, ha pubblicato un reportage da Tangeri che legge gli stessi strumenti usati da questa analisi: disoccupazione giovanile ufficiale sopra il 30% tra gli under 24, economia informale che vale circa un terzo del PIL e oltre il 60% della forza lavoro, e il dualismo tra il boom di Tanger Med e le piazze della Gen Z — quello che un analista dell’Atlantic Council citato dal giornale chiama «due Marocchi», e che il fatto numero quattro qui sopra chiamava miracolo a due velocità. La stessa edizione aggiunge un numero che vale come sesto fatto, di fonte ISTAT: gli arrivi dal Marocco in Italia sono cresciuti di quasi il 50% nel 2025 — 36.000 persone, seconda nazionalità per ingressi — conteggiati dalle statistiche ufficiali. Il governo più rumoroso sull’«invasione» di Ceuta presiede un paese in cui i marocchini sono la terza comunità nazionale (412.000 residenti), con 115.569 studenti nelle scuole italiane e 27.000 acquisizioni di cittadinanza nel solo 2024. Le stime locali aggiornate, intanto, dimensionano l’ondata originaria in quasi 80.000 tentativi d’ingresso secondo il presidente della stessa Ceuta, con 3.000–5.000 persone ancora in città a quattro giorni di distanza — e il resto rientrato." },
  { p: "La miccia ora ha un fascicolo. L’Audiencia Nacional spagnola ha aperto un’inchiesta per stabilire se dietro la campagna social che ha preceduto l’assalto — gli account che dicevano a decine di migliaia di persone che il confine era aperto e chi attraversava restava — vi siano reti criminali, trafficanti o una strategia coordinata con finalità politiche. Rabat ha accusato le «mafie della disinformazione»; al 5 agosto risultano incriminate 25 persone per l’organizzazione degli attraversamenti e dei trasporti. Circola già una nuova convocazione di massa per il 15 agosto («quel giorno tutto avrà un senso»), finora senza conferme da Madrid né da Rabat. L’analista Nathalie Tocci (IAI / Johns Hopkins SAIS), ospite di Sky TG24, ha proposto una lettura a tre attori che registriamo con la sua firma: gli Stati terzi che militarizzano la migrazione per ottenere leve, come Tunisia, milizie libiche e Turchia prima del Marocco; gli attori globali — le provenienze di molta della disinformazione circolata riconducevano, nella sua valutazione, in parte a Mosca, in parte al mondo MAGA statunitense, in parte a Israele — con l’obiettivo di dividere l’Europa a partire dalla Spagna di Sánchez; e le destre interne che cavalcano quella che lei definisce una «finta crisi», perché 70.000 persone che entrano un giorno ed escono il giorno dopo non sono una crisi migratoria. Il suo punto più affilato è una bomba logica che questo pezzo adotta volentieri: raggiungere la Spagna continentale da Ceuta è più difficile del viaggio diretto dal Marocco, perché i controlli in uscita dall’enclave sono più stringenti. Chi grida all’invasione via Ceuta sta descrivendo la rotta che nessun migrante razionale sceglierebbe." },
  { p: "La piazza ha risposto in spagnolo. Nella stessa Ceuta, centinaia di residenti hanno manifestato contro il raduno del movimento di estrema destra spagnolo Núcleo Nacional; il giorno dopo una protesta nata dalle associazioni di quartiere si è spaccata all’arrivo dell’agitatore Vito Quiles con Save Europe Act — co-fondato dall’austriaco Martin Sellner, con attivisti di Generation Identity arrivati apposta dalla Germania. Il loro striscione recitava «Sánchez must go, Spain needs remigration». Era in inglese. I ceutini che lo contestavano rispondevano in spagnolo. Il destinatario di un cartello si deduce dalla lingua: chi scrive in inglese in una città spagnola parla alla telecamera e all’algoritmo, non alla città — che, essendo per circa metà di origine marocchina e musulmana, ha respinto i suoi «salvatori» nella propria lingua. Gli attori esterni, stavolta, sono venuti di persona; restano gli unici, in tutta questa storia, ad aver attraversato più frontiere dei migranti." },
  { p: "A tre giorni di distanza, lo schema del pezzo originale si è solo affilato: i flussi continuano a dire la verità, e le voci più forti continuano a evitare il fascicolo. L’unica «invasione» documentata agli atti, a Ceuta, è stata quella dei post." },
  { p: "I fatti e le cifre sono tratti da fonti pubbliche: il Codice delle frontiere Schengen e l’Atto di adesione della Spagna del 1991, le statistiche Frontex sugli ingressi 2021–2026 come citate dal governo spagnolo, le dichiarazioni della Commissione europea e del governo spagnolo (luglio–agosto 2026), i dati OCSE, HCP e Banca mondiale sul Marocco, il testo dell’iniziativa popolare italiana depositata alla Camera dei Deputati il 30 giugno 2026, i rapporti di Fondazione ISMU e Ministero del Lavoro sulla comunità marocchina in Italia, i dati ISTAT 2025 sulle migrazioni, gli atti e le cronache sull’inchiesta dell’Audiencia Nacional e sulle manifestazioni di Ceuta (agosto 2026), e l’intervista a Nathalie Tocci, Sky TG24 «Timeline», 5 agosto 2026." },
  { p: "Business Matching Global — analisi di mercato e coordinamento commerciale sul corridoio Europa–Brasile. Il nostro lavoro si fonda su un rigoroso controllo di fatti e dati, perché — come recita la massima attribuita a W. Edwards Deming, lo statistico che insegnò la qualità all'industria giapponese — senza dati sei solo un'altra persona con un'opinione. Noi preferiamo essere un'altra persona con i dati." },
];

export default function CeutaIT() {
  const { lang, setLang } = useT();
  const article = getArticleBySlug("ceuta_it");
  const desc =
    "Cosa dice davvero la crisi di Ceuta: lo status speciale fuori Schengen, i dati Frontex, il Marocco a due velocità e i flussi che verificano ciò che i comunicati negano.";
  useCanonical("/ceuta", {
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
          <LangSwitcher to="/ceuta" />
        </div>
        <article className="prose-invert">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4">{TITLE}</h1>
          <p className="text-xs text-foreground/70 mb-2">Business Matching Global</p>
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
