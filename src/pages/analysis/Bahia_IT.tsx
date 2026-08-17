import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { useT } from "@/lib/i18n";
import { getArticleBySlug } from "@/lib/analysis";
import { AnalysisFooter } from "@/components/AnalysisFooter";
import { useCanonical } from "@/lib/useCanonical";
import { ShareBlock } from "@/components/ShareBlock";
import { LangSwitcher } from "@/components/LangSwitcher";
import { NewsletterSignup } from "@/components/NewsletterSignup";

type Block = { h: string } | { p: string } | { tag: string };

const TITLE = "Lo sconto che era un bilancio";

const BACK = {
  it: "Torna alle analisi",
  en: "Back to analysis",
  pt: "Voltar às análises",
} as const;

const body: Block[] = [
  { p: `Lunedì 17 agosto 2026, con la domanda di recuperação judicial già pubblica e il titolo giù di oltre il 30%, il più grande rivenditore di elettrodomestici del Brasile ha inviato un'email promozionale che prorogava la sua campagna sconti. Non era una svista. Era il piano.` },
  { tag: "#CustoBrasil" },
  { p: `Nel fine settimana del 16-17 agosto 2026 il Grupo Casas Bahia ha depositato la domanda di recuperação judicial presso il Foro Central Cível di San Paolo. Per il lettore europeo: la recuperação judicial è la procedura brasiliana di ristrutturazione sotto controllo del tribunale, cugina funzionale del Chapter 11 statunitense e, in Italia, del concordato preventivo o della composizione negoziata. Congela le azioni esecutive dei creditori mentre l'azienda negozia un piano. La domanda è stata approvata all'unanimità dal consiglio e dall'azionista di controllo, e comunicata domenica sera alla CVM, la Consob brasiliana. Nel perimetro rientrano anche diverse controllate logistiche.` },
  { p: `I numeri della petizione: R$17,3 miliardi di passività (circa 2,7 miliardi di euro), di cui approssimativamente R$16,4 miliardi verso creditori quirografários — i chirografari, quelli senza garanzie reali a tutela del proprio credito, in fondo alla fila — più R$754 milioni di debiti di lavoro e R$154 milioni verso micro e piccole imprese. All'apertura di lunedì il titolo BHIA3 è sceso fino a R$0,45, quasi -32% alle 10:28 di Brasília e intorno a -36% nel punto peggiore, sopra un calo di quasi l'80% da inizio anno. I revisori avevano già segnalato una incertezza rilevante sulla continuità aziendale — il modo più formale che la professione contabile conosca per dire che l'azienda potrebbe non arrivare a fine anno.` },
  { p: `C'è un dettaglio tecnico nella petizione che spiega il tempismo meglio di qualunque cifra. I contratti del gruppo contengono clausole di cross-default e di decadenza dal beneficio del termine — il vencimento antecipado — per cui la notizia di una riorganizzazione avrebbe potuto rendere tutto esigibile in una volta sola, insieme all'escussione delle garanzie e alle richieste di pagamento anticipato. La domanda al tribunale esiste per congelare quella cascata prima che parta. Il che riquadra l'intero evento: l'azienda non ha depositato perché aveva smesso di generare cassa — il flusso di cassa libero degli ultimi dodici mesi arriva a circa R$4 miliardi. Ha depositato perché la struttura del passivo era diventata una molla caricata, dove il primo creditore a muoversi avrebbe fatto scattare tutti gli altri.` },
  { p: `Alle 11:49 di Brasília, mentre tutto questo accadeva, un'email di marketing partiva verso la mailing list dell'azienda. Oggetto: A Invasão ainda não acabou — "L'Invasione non è ancora finita". L'Invasão de Ofertas, la campagna sconti, era stata prorogata. Fino a R$2.000 di sconto pagando con Pix — il sistema brasiliano di bonifico istantaneo, gestito dalla banca centrale, che regola in pochi secondi e costa al commerciante quasi zero. Fino al 50% di sconto col codice INVASAO. Validità: fino alle 23:59 di quello stesso giorno. Un banner in testa: Compre pelo WhatsApp.` },
  { p: `La lettura facile è che il marketing non avesse letto le notizie. Ma la notizia era vecchia di dodici ore, su tutte le prime pagine del paese, e la campagna è stata prorogata lo stesso. Il ricorso in tribunale e il coupon non sono una contraddizione da spiegare. Sono le due metà di un'unica operazione di liquidità — e la seconda è quella da cui i soldi arrivano davvero.` },
  { h: `Chi è Casas Bahia, per chi non ne ha mai vista una` },
  { p: `Quasi nessuno fuori dal Brasile conosce il nome, e quasi nessuno dentro il Brasile non lo conosce. La scala è grosso modo quella di MediaWorld in Italia o di Darty in Francia, ma la storia non è paragonabile a nessuna delle due.` },
  { p: `L'azienda nasce nel 1952 a São Caetano do Sul, nella cintura industriale di San Paolo, fondata da Samuel Klein, immigrato polacco che cominciò vendendo biancheria da letto porta a porta, facendo pagare a rate annotate su un quaderno. I compratori erano in gran parte migranti del Nordest — molti dello stato di Bahia — venuti al sud per il lavoro in fabbrica, e ai quali nessuna banca prestava. Il negozio prese il nome da loro.` },
  { p: `Vale la pena fermarsi un attimo. I grandi retailer europei prendono il nome dal fondatore, dalla città o dalla merceologia. Questo prende il nome dai clienti che nessuna istituzione voleva finanziare. Il credito non era un servizio appiccicato al negozio: il credito era la ragione per cui il negozio esisteva, e la mascotte che sta alla sua porta dal 1979 — il Baianinho, un bambino col cappello da cangaceiro nordestino — è il ritratto del debitore, non della merce.` },
  { p: `Il gruppo com'è oggi si forma nel 2010, quando la Casas Bahia della famiglia Klein si fonde con la catena Ponto Frio del Grupo Pão de Açúcar. Per un decennio si chiama Via Varejo, poi estende il nome Casas Bahia a tutto il gruppo; è quotato alla B3 di San Paolo con il ticker BHIA3. A fine 2025 operava 1.042 negozi. Nove mesi dopo è in tribunale.` },
  { h: `Cos'è davvero la promozione` },
  { p: `Casas Bahia ha registrato una perdita netta di R$10,1 miliardi nel secondo trimestre 2026. In gran parte è contabilità: svalutazioni di imposte differite attive, avviamento, revisioni di contratti, costi di ristrutturazione. L'operatività è meno drammatica — i ricavi netti sono addirittura cresciuti dell'1,6% a R$6,98 miliardi, e il margine lordo è salito al 32,9%.` },
  { p: `La riga che conta è altrove. Il flusso di cassa libero del trimestre è stato positivo per R$798 milioni — e gli analisti di XP hanno fatto notare che il risultato viene soprattutto da una riduzione degli stock di R$1,2 miliardi.` },
  { p: `Rileggetelo con calma. La cassa che ha tenuto in piedi l'azienda nel trimestre non è stata guadagnata da un'attività migliorata. È stata estratta dal magazzino. Merce già sullo scaffale — in buona parte finanziata dai fornitori — convertita in denaro.` },
  { p: `L'Invasão de Ofertas non è un commento alla crisi. È il meccanismo. Il coupon nella casella di posta e i R$798 milioni nel rendiconto finanziario sono lo stesso evento, visto dalle due estremità.` },
  { p: `Ed è per questo che lo sconto è ancorato al Pix e non al crediário.` },
  { h: `L'azienda che vendeva credito, non elettrodomestici` },
  { p: `Casas Bahia è costruita, dal 1952 in poi, sul crediário: credito rateale interno, venduto in negozio, a clienti che le banche non toccavano. Il frigorifero era il pretesto. Il prodotto era il finanziamento, e il margine viveva nel tasso di interesse e nell'assicurazione sul credito che ci stava attaccata.` },
  { p: `Una vendita a crediário genera un credito commerciale — denaro che l'azienda incasserà nell'arco di mesi. Nel frattempo quel credito va finanziato, e in Brasile oggi si finanzia contro un tasso di riferimento Selic al 15%. (La Selic è il tasso di politica monetaria della banca centrale: pensate al tasso BCE, moltiplicato per cinque.) Una vendita con Pix genera cassa nello stesso secondo, senza costo di provvista, senza rischio di insolvenza, senza apparato di recupero.` },
  { p: `Quindi un'azienda che ha passato settant'anni a insegnare al Brasile a comprare a rate adesso paga i clienti R$2.000 perché le rate non le usino. Non è una promozione. È un modello di business che viene spento, pubblicamente, dentro un banner.` },
  { p: `Lo dice l'azienda stessa. Nella petizione descrive la peggior crisi finanziaria dalla fondazione, e sostiene che la salita della Selic dal 2021 in avanti ha prodotto effetti particolarmente severi perché la sua operatività è strutturalmente dipendente dal crediário. Il carnê — il libretto cartaceo delle rate che il cliente porta a casa e paga mese per mese in cassa — vale ancora circa il 16% delle vendite. Il sedici per cento dei ricavi, e abbastanza dell'equazione economica da affondare l'intero bilancio quando il costo della provvista triplica. È la frase che il fornitore europeo dovrebbe leggere due volte: un retailer che spiega a un giudice di essere stato distrutto non dai clienti, non dai concorrenti, ma dal tasso della banca centrale che agisce sul suo modello di finanziamento.` },
  { p: `E non è nemmeno la prima volta che il magazzino viene usato come bancomat. Nel 2023 il gruppo aveva eseguito un piano di ristrutturazione che chiuse 55 negozi, tagliò 8.600 posti e ridusse gli stock di R$1 miliardo. Comprò un anno. A giugno 2024 arrivò la ristrutturazione stragiudiziale. Ad agosto 2026, il tribunale.` },
  { h: `La trappola dall'altro lato` },
  { p: `Il piano di ristrutturazione annunciato ad agosto — la "Fase 2" — prevede la riduzione graduale dell'esposizione al fornecedor convênio, detto anche risco sacado: il reverse factoring, l'accordo in cui una banca paga il fornitore in anticipo e il retailer salda la banca più avanti. In pratica è il fornitore che finanzia lo scaffale del retailer attraverso un intermediario bancario. Ed è anche, in una ristrutturazione, una delle prime cose a sparire, perché le banche smettono di concederlo esattamente quando servirebbe di più.` },
  { p: `La preoccupazione di XP era proprio questa — il broker ha messo rating e prezzo obiettivo in revisione, citando il rischio che i fornitori stringano ulteriormente le condizioni ora che la riorganizzazione è pubblica, comprimendo la disponibilità di prodotto verso il quarto trimestre: Black Friday e Natale, i due mesi che reggono l'anno del retail brasiliano. E nello stesso momento si apriva un secondo fronte, con i sindacati che preparano un'azione collettiva sui licenziamenti di agosto.` },
  { p: `Mettete insieme le due metà e la forma della trappola è chiara. Svuoti il magazzino per generare cassa. Il ricorso ti protegge dai creditori. Ma lo stesso ricorso è la ragione per cui nessuno ti riempirà il magazzino in tempo per l'unica stagione che paga.` },
  { p: `L'azienda lo sa. Nella relazione del secondo trimestre riconosce che certe merci già mancano in certi canali di vendita — lo scaffale si sta visibilmente assottigliando. E a poche ore dalla pubblicità del ricorso è emerso che Casas Bahia ha cominciato a strutturare un prestito di circa R$1 miliardo, presso fondi e banche, con lo scopo specifico di rifornire lo stock.` },
  { p: `La forma di quel prestito conta più dell'importo. Viene montato come finanziamento DIP — debtor-in-possession, preso dalla prassi statunitense e scritto nella legge brasiliana con la riforma fallimentare del 2020. Il denaro nuovo prestato a un'azienda già sotto protezione del tribunale ottiene natura extraconcursal — in termini italiani, prededucibile: viene rimborsato prima dei creditori che c'erano già, e mantiene quella priorità anche se la recuperação fallisce e si va in liquidazione. È lo strumento che tiene in vita una ristrutturazione, e funziona precisamente perché salta la fila.` },
  { p: `Ora tenete insieme tre fatti. R$1,2 miliardi di magazzino sono stati convertiti in cassa nel trimestre, ed è ciò che ha tenuto l'azienda in respiro. R$16,4 miliardi di crediti chirografari sono congelati nella procedura. E circa R$1 miliardo di denaro nuovo viene raccolto per rimettere dentro il magazzino — denaro che passerà davanti a tutti loro.` },
  { p: `La campagna sconti non ha risolto niente. Ha spostato il problema dal magazzino al passivo finanziario, ha fatto pagare al cliente un coupon del 50% per il trasferimento, e ogni passaggio della cura spinge il fornitore preesistente un gradino più giù nella fila.` },
  { p: `I tagli di agosto hanno chiuso 298 dei 1.042 negozi che il gruppo aveva a fine 2025, con licenziamenti riportati intorno a 1.900 dalla stampa e stimati in circa 3.000 dall'azienda stessa. A giugno 2024 aveva già completato una ristrutturazione stragiudiziale che riprofilò circa R$4,1 miliardi e allungò la scadenza media del debito da 22 a 72 mesi. Quell'accordo raggiunse banche e obbligazionisti. Non raggiunse locatori, dipendenti e fornitori — che è esattamente l'insieme di creditori che le chiusure di massa producono. Da qui il tribunale.` },
  { h: `Il gruppo di controllo` },
  { p: `Prima di concludere che il credito al consumo nel retail brasiliano sia semplicemente impraticabile a questi tassi, guardate il controesempio.` },
  { p: `C'è un altro grande retailer brasiliano, fondato negli anni Ottanta in Santa Catarina, ancora del suo fondatore e non quotato in alcuna borsa. Vende grosso modo allo stesso cliente: famiglie dell'interno, in città di media taglia, che comprano elettrodomestici e articoli per la casa. Gestisce una propria carta e un proprio finanziamento diretto alla clientela, e quel finanziamento ha prodotto circa R$800 milioni di ricavi finanziari l'anno scorso. Stesso paese, stessa Selic, stesso profilo di debitore, stessa logica delle rate.` },
  { p: `I suoi risultati 2025: ricavi netti per R$13,7 miliardi, in crescita di circa il 16%, e utile netto di R$3,45 miliardi — +28%, il miglior anno della sua storia. Ha chiuso l'esercizio in cassa netta positiva, dopo aver estinto le debenture in circolazione, con un rapporto debito netto/EBITDA a meno 0,2. Il piano di espansione 2026 — quindici nuove megastore, oltre un miliardo di reais di investimento — è finanziato dal flusso di cassa operativo, e una review creditizia di questa primavera ha concluso che potrebbe assorbire un calo del 20% nella generazione di cassa ed eseguire comunque il piano. Il margine netto viaggia sopra il 22%, contro le cifre a una sola cifra di gran parte del settore quotato.` },
  { p: `Due aziende, un solo contesto di tassi, una sola base clienti, una sola idea di fondo sul vendere a rate. Una ha finanziato lo scaffale coi soldi degli altri — banche, obbligazionisti e fornitori attraverso il reverse factoring — e oggi è in tribunale a chiedere il permesso di prendere un miliardo in prededuzione per rimettere merce su quello scaffale. L'altra ha finanziato lo scaffale con i propri utili non distribuiti e quest'anno ne spende uno per costruirne quindici in più.` },
  { p: `Il caveat onesto: non sono aziende identiche. Quella in utile è una megastore despecializzata più che una catena di elettrodomestici, vende il 95% nel fisico, ha stretto deliberatamente i criteri di credito dopo la pandemia, e non deve niente a un mercato pubblico che premia la crescita trimestre per trimestre. Il suo credito è un centro di profitto vero, ma una quota più piccola del totale.` },
  { p: `E il caveat è la tesi, non una copertura. Il crediário brasiliano non ha ucciso nessuno. La leva sì. In un paese dove il denaro costa il 15%, il retailer che presta ai propri clienti dev'essere finanziato con capitale proprio, non a debito — perché sta gestendo una banca, e una banca finanziata con denaro preso a prestito a quei tassi è un conto alla rovescia. Un'impresa ha letto quel vincolo e ha rallentato. L'altra ha tenuto il ritmo di crescita e ha esternalizzato la provvista: prima agli obbligazionisti, poi ai fornitori, e alla fine a un giudice.` },
  { h: `Cosa deve portarsi a casa il fornitore europeo` },
  { p: `L'istinto, a Milano come a Monaco, è archiviare la vicenda sotto un grande retailer è saltato, succede ovunque. Succede. Ma il meccanismo non è lo stesso, e la differenza è operativa, non culturale.` },
  { p: `In un mercato europeo, un retailer in difficoltà che liquida vende sottocosto per fare cassa. Il suo modello di business — compra, ricarica, vendi — è intatto; è rotto solo il bilancio. In Brasile, il retailer che sconta per il pagamento istantaneo sta smontando la cosa che lo rendeva profittevole, perché il profitto non è mai stato nel ricarico. Era nel credito. Nel retail di massa brasiliano, lo scaffale è un canale di acquisizione clienti per un'attività di prestito.` },
  { p: `Per chi vende dentro quel canale dall'Europa — elettrodomestici, piccolo elettrodomestico, mobili — seguono immediatamente quattro conseguenze, e nessuna è visibile nel forecast di vendita:` },
  { p: `La solvibilità del vostro distributore è una variabile di politica monetaria, non commerciale. Con la Selic al 15%, un retailer il cui margine vive nel credito rateale è strangolato dalla banca centrale, non dal vostro listino.` },
  { p: `Se la vostra merce passa per il reverse factoring, siete un finanziatore. Verificate se il vostro credito brasiliano è commerciale o intermediato da banca, e cosa gli succede in una recuperação judicial. Chirografario è la posizione di default, e R$16,4 miliardi di azienda stanno in quella fila senza nessuno davanti — mentre il denaro DIP raccolto domani passerà davanti a tutti.` },
  { p: `Uno sconto profondo sul vostro prodotto è un segnale sulla cassa del vostro compratore, non sul vostro marchio. Quando lo sconto è costruito attorno al pagamento istantaneo, è un evento di liquidità con sopra un titolo di marketing.` },
  { p: `Guardate chi finisce per finanziare il riassortimento. Un retailer in recuperação che ha bisogno di un miliardo di reais per riempire gli scaffali lo cercherà in tre posti: fondi, banche e voi. I primi due pretenderanno la prededuzione e la otterranno. Al terzo vengono chiesti gli stessi soldi in fondo alla fila — e la richiesta non arriverà etichettata come credito: arriverà come dilazione di pagamento su un grosso ordine stagionale.` },
  { p: `L'email è arrivata alle 11:49, col ricorso già pubblico e il titolo giù di un terzo. Nessuno era cinico, e nessuno aveva mancato di leggere le notizie. Qualcuno stava facendo l'unica cosa rimasta che trasforma uno scaffale in denaro.` },
  { p: `Nota sull'orario: l'email in questione è stata letta in una casella italiana, che la mostrava come 16:49 ora locale. Le ore commerciali brasiliane corrono cinque ore indietro rispetto all'ora legale dell'Europa centrale. Ricostruire una cronologia brasiliana da uno screenshot europeo è una piccola trappola, e vale la pena nominarla: è la stessa categoria di errore che si commette leggendo un bilancio brasiliano con le assunzioni europee su dove stia il profitto.` },
  { p: `Business Matching Global — market intelligence and business orchestration on the EU–Brazil corridor.` },
];

export default function BahiaIT() {
  const { lang } = useT();
  const article = getArticleBySlug("bahia_it");
  useCanonical(`/bahia_it`);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <article className="min-h-screen bg-background text-foreground">
      <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/analysis"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {BACK[lang as keyof typeof BACK] ?? BACK.en}
          </Link>
          <LangSwitcher />
        </div>

        <header className="mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            {TITLE}
          </h1>
          {article && (
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <time dateTime={article.date}>
                {new Date(article.date).toLocaleDateString("it-IT", { day: "2-digit", month: "long", year: "numeric" })}
              </time>
              {article.updated && article.updated !== article.date && (
                <>
                  <span>—</span>
                  <span>
                    aggiornato{" "}
                    {new Date(article.updated).toLocaleDateString("it-IT", { day: "2-digit", month: "long", year: "numeric" })}
                  </span>
                </>
              )}
            </div>
          )}
        </header>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          {body.map((block, i) =>
            "h" in block ? (
              <h2 key={i} className="text-2xl sm:text-3xl font-semibold mt-12 mb-4">
                {block.h}
              </h2>
            ) : "tag" in block ? (
              <p key={i} className="text-sm font-semibold tracking-wide text-muted-foreground mt-2 mb-6">
                {block.tag}
              </p>
            ) : (
              <p key={i} className="leading-relaxed mb-6 text-justify">
                {block.p}
              </p>
            )
          )}
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <ShareBlock title={TITLE} />
        </div>

        <div className="mt-12">
          <NewsletterSignup />
        </div>
      </div>

      <AnalysisFooter />
    </article>
  );
}
