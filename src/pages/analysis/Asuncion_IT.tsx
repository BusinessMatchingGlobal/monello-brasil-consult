import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useT } from "@/lib/i18n";
import { getArticleBySlug } from "@/lib/analysis";
import { AnalysisFooter } from "@/components/AnalysisFooter";
import { useCanonical } from "@/lib/useCanonical";
import { ShareBlock } from "@/components/ShareBlock";
import { LangSwitcher } from "@/components/LangSwitcher";
import { NewsletterSignup } from "@/components/NewsletterSignup";

type Block = { h: string } | { p: string };

const TITLE = "La backdoor del Brasile";

const BACK = {
  it: "Torna alle analisi",
  en: "Back to analysis",
  pt: "Voltar às análises",
} as const;

const body: Block[] = [
  { p: "Calze, capsule softgel e cablaggi per Stellantis: cosa dice davvero il traffico sul Paraná — il fiume di frontiera che a Ciudad del Este separa il Paraguay dal Brasile — e perché chi lo urla su Instagram è la guida meno affidabile per capirlo." },
  { p: "A febbraio un post è diventato virale sui social brasiliani: Lupo, il produttore di calze e intimo fondato nel 1921, \"lasciava il Brasile dopo 104 anni\" per portare la produzione in Paraguay. L'azienda ha dovuto smentire pubblicamente. Non se ne andava affatto. Stava facendo due cose insieme, e conviene guardarle separatamente." },
  { p: "In Paraguay, a Ciudad del Este, ha aperto uno stabilimento da 30 milioni di reais in regime di maquila — il programma paraguaiano che consente di importare macchinari e materie prime in sospensione di dazi, produrre per l'esportazione e pagare un'unica imposta dell'1% sul valore aggiunto generato nel paese: circa 110 posti di lavoro e una capacità di 20 milioni di paia l'anno di calze basiche — il prodotto più semplice del catalogo, quello dove si compete solo sul prezzo. In Brasile, nella base storica di Araraquara — nell'interno dello stato di San Paolo, dove l'azienda è nata nel 1921 — ha investito nello stesso periodo più del doppio: 70 milioni di reais su tessile tecnico e linee sportive ad alto valore — la parte del catalogo dove si compete su ricerca, macchinari e marchio." },
  { p: "Questo non è un esodo: è una divisione del lavoro. Il prodotto povero va dove produrre costa meno; il prodotto ricco resta dove stanno il know-how e il marchio. E il dettaglio che il post virale non menzionava è il più istruttivo. Interrogata sul perché, l'amministratrice delegata Liliana Aufiero — nipote di Henrique Lupo, l'immigrato italiano che fondò l'azienda — non ha parlato di fuga dal Brasile. Ha parlato dei concorrenti con cui doveva competere: produttori cinesi già installati in Paraguay, che vendevano calze basiche sul mercato brasiliano a costi irraggiungibili da San Paolo. La traversata del fiume non era una fuga. Era un inseguimento." },
  { p: "Tenete a mente questa inversione, perché riscrive tutto il resto della storia. Il Paraguay viene di solito descritto come il rifugio a basso costo del Brasile. È più esatto descriverlo come la sua backdoor — e in coda alla porta non ci sono solo brasiliani." },
  { h: "Una porta con la firma del proprietario" },
  { p: "Prima i numeri, che sono semplici. In Paraguay operano oggi circa 320 imprese in regime di maquila; sette su dieci sono brasiliane. Il nome, per inciso, viene dal medioevo iberico: la maquila era la quota di farina che il mugnaio tratteneva come compenso per macinare il grano altrui. Il Paraguay si è fatto mugnaio del continente — macina il grano degli altri e trattiene la sua parte, l'uno per cento. Nel primo semestre 2026 hanno esportato oltre 700 milioni di dollari, il 25% in più dell'anno prima, e danno lavoro a più di 35.000 persone. Una nuova legge, in vigore da fine 2025, ha esteso il regime anche a servizi e tecnologia. E gli ultimi arrivati non fanno più solo calze: in agosto HLCAPS, terzista brasiliano di capsule per integratori, ha inaugurato a Ciudad del Este un impianto da 8 milioni di dollari — 5,5 miliardi di capsule softgel l'anno, destinate al Sud America e, testuale, agli Stati Uniti." },
  { p: "Ora la domanda giusta: dove finisce tutta questa produzione? Risposta: per due terzi, in Brasile. Ed è qui che il quadro si capovolge. Quella merce rientra senza pagare dazi, perché tra paesi Mercosur le merci circolano libere — una regola che il Brasile stesso ha firmato, ad Asunción, nel 1991. In altre parole: non è capitale straniero che aggira le difese brasiliane. Sono aziende brasiliane che spostano la produzione dieci chilometri oltre il fiume e rivendono ai propri connazionali, legalmente e a costi più bassi, usando una porta che Brasília ha costruito con le proprie mani. La backdoor non è un buco nel muro: è nel progetto originale dell'edificio." },
  { p: "E la coda alla porta si allunga a vista d'occhio. La Jussara, laticínio familiare paulista con settant'anni di storia e 1,2 milioni di litri lavorati al giorno, sta negoziando un'unità da 10 milioni di dollari per frazionare e confezionare latte in polvere a Ciudad del Este: destino dichiarato, il cento per cento di ritorno al mercato brasiliano — la media dei due terzi, in questo caso, diventa totalità. E una nota catena retail brasiliana a proprietà familiare, che ama come poche avvolgersi nella bandiera, fa già produrre lenzuola e asciugamani da maquiladoras paraguaiane: non lo insinua un concorrente, lo ha raccontato pubblicamente e con comprensibile soddisfazione il presidente del Paraguay in persona." },
  { p: "Se tutta la faccenda ha un santo patrono comico, è la Banda Bassotti — Irmãos Metralha per i lettori brasiliani. Sessant'anni di casseforti scassinate senza successo, quando l'ingresso sul retro del deposito era pubblicato in gazzetta ufficiale, con la tariffa dell'1% stampata sul cartello. Non gli è mai mancata l'audacia. Gli mancava l'abbonamento alla gazzetta." },
  { h: "L'europeo che è già dentro" },
  { p: "Il fenomeno viene raccontato come un affare brasiliano, ma la legge maquila non chiede il passaporto. A San Lorenzo, uno stabilimento produce da anni, in silenzio, cablaggi automotive per Stellantis e General Motors. Appartiene a Leoni — un'azienda tedesca. Il proof of concept europeo non è un'ipotesi: è in officina, semplicemente non ha mai assunto un ufficio stampa." },
  { p: "Per un produttore europeo l'arbitraggio ha tre facce. La prima è la porta laterale del Mercosur: la tariffa esterna comune e il Custo Brasil — l'espressione con cui in Brasile si riassume il sovraccosto sistemico di fare impresa nel paese: tasse, burocrazia, logistica, credito caro — che fermano una media impresa europea al portone del Brasile si possono aggirare producendo in Paraguay ed entrando in Brasile come merce Mercosur — con un tecnicismo decisivo. Le regole di origine. Il semplice assemblaggio leggero di componenti e semilavorati europei non conferisce origine Mercosur, e il prodotto paga comunque la tariffa esterna; il modello funziona solo dove il valore aggiunto locale — lavoro, elettricità, componentistica regionale — supera le soglie. È un'analisi caso per caso, ed è esattamente lì che sta il lavoro vero." },
  { p: "Sull'elettricità vale la pena aprire una parentesi, perché è l'ingranaggio meno raccontato di tutto il meccanismo. Itaipú, la diga binazionale sul Paraná, spetta per metà al Paraguay; ma il trattato del 1973 impone che l'energia non consumata in casa venga ceduta al Brasile a un prezzo amministrato — fissato dal trattato stesso, non dal mercato. Per mezzo secolo, quindi, il surplus paraguaiano è partito verso il Brasile a condizioni imposte. Ogni fabbrica che si installa in Paraguay rovescia il conto: l'energia che consuma smette di essere eccedenza da cedere a prezzo vincolato e diventa valore aggiunto paraguaiano, rivenduto a prezzo di mercato dentro le calze e le capsule. Il conto torna per entrambe le parti: lo Stato smette di svendere una fetta del surplus a tariffa di trattato, e la fabbrica paga comunque un'elettricità industriale sensibilmente più economica di quella brasiliana. È il raro arbitraggio in cui il padrone di casa guadagna quanto l'ospite — il che spiega perché la porta paraguaiana non è semplicemente tollerata: è pubblicizzata dal portiere. Attirare industria è il modo che Asunción ha trovato per rinegoziare Itaipú senza toccare il trattato: non contesta la clausola — riduce il surplus a cui la clausola si applica. La maquila, vista da qui, è anche un arbitraggio energetico travestito da regime fiscale." },
  { p: "La seconda faccia guarda a nord, e conviene essere precisi sul conto. Chiunque esporti negli Stati Uniti paga la tariffa doganale ordinaria, che dipende dal prodotto ed è spesso a una cifra. Il problema del 2026 non è quella base: sono gli strati che Washington ci ha impilati sopra. Nella tornata in vigore dal 24 luglio, una sessantina di paesi si è vista aggiungere un dazio supplementare tra il 10 e il 12,5% — Argentina e Unione Europea nella fascia bassa, Cina e altri in quella alta, il Brasile nella peggiore, con ricarichi che su alcuni prodotti arrivano al 25%. Il Paraguay non compare in nessuna lista: chi esporta da Asunción paga solo la tariffa base che vale per tutti, senza alcuno strato aggiuntivo. Il differenziale con il Brasile, dunque, non è un privilegio scritto in un trattato — un accordo di libero scambio non potrebbe nemmeno esistere, la tariffa esterna comune del Mercosur lo vieta. È un'esenzione di fatto, frutto di buona condotta geopolitica, revocabile con la stessa penna che l'ha concessa. Il piano di HLCAPS di servire gli Stati Uniti da Ciudad del Este è questa aritmetica convertita in cemento: stessa capsula, stessa base doganale, meno dieci-venticinque punti di strato punitivo." },
  { p: "La terza faccia è quella che in Europa quasi nessuno ha ancora prezzato: l'accordo UE-Mercosur, che il Paraguay è stato tra i primi a ratificare. Quando entrerà in vigore, componenti e materie prime europee entreranno in Paraguay a dazi ridotti — e la combinazione di input preferenziali in entrata con trattamento maquila in uscita è una configurazione che oggi esiste soprattutto su carte che nessuno si è preso la briga di leggere una accanto all'altra." },
  { h: "Gettare cemento sotto i flussi" },
  { p: "Quando il capitale privato apre un corridoio, prima o poi i governi arrivano a gettarci il cemento sotto. In agosto il governatore di Santa Catarina è volato ad Asunción — con il presidente della federazione industriale dello stato — per proporre, tra sette temi, un nuovo ponte. Guardate la mappa e sorridete: Santa Catarina non confina col Paraguay. Il collegamento proposto, da Mayor Otaño a El Dorado, attraversa la provincia argentina di Misiones, che non contribuisce né con la domanda né con l'offerta: solo con la geografia, e coi pedaggi. Lo scambio dichiarato è transazionale — una rotta più corta per il mais paraguaiano verso il complesso delle proteine animali catarinense, e i porti di Santa Catarina aggiunti alla breve lista che il Paraguay usa oggi per il suo commercio marittimo. Il contesto non dichiarato è che i produttori catarinensi, nomi del tessile inclusi, già producono oltre il fiume. Lo stato che non è riuscito a trattenere ogni fabbrica ha deciso di possederne la logistica: se non puoi essere lo stabilimento, sii il varco. Sarebbe il quarto ponte tra i due paesi — dopo la Ponte da Amizade del 1965 e la nuova Ponte da Integração, entrambe a Foz do Iguaçu, e quello della Rota Bioceânica a Porto Murtinho, più a nord — e il primo concepito non per collegare vicini ma per accorciare un arbitraggio." },
  { h: "Quelli che vendono pale e setacci" },
  { p: "Un ultimo dato, forse il più eloquente. Ogni giorno cresce il numero di influencer brasiliani che vivono promuovendo il Paraguay — l'uno per cento, il \"triplo dieci\", il pacchetto apri-la-tua-azienda-ad-Asunción. È diventata una professione. In ogni corsa all'oro il mestiere più sicuro non è mai stato scavare: era vendere pale — l'accesso — e setacci, la lusinghiera illusione del discernimento, il corso e la \"mentoria\" che dovrebbero aiutarti a distinguere la pepita dal fango. Vale la pena ricordare come finì quella storia: i cercatori morirono per lo più poveri, e l'uomo che vendeva pantaloni robusti si chiamava Levi Strauss." },
  { p: "E la vendita delle pale si sta perfino automatizzando. Un test pubblicato dalla Folha de S.Paulo in questi giorni ha messo quattro chatbot di intelligenza artificiale davanti a un profilo fittizio — 28 anni, 125 chili, prescrizione medica per la tirzepatida, budget insufficiente per il Mounjaro: due hanno raccomandato le \"canetas\" dimagranti paraguaiane — la tirzepatida è sotto brevetto in Brasile, ma i brevetti sono diritti territoriali: oltre il fiume cinque laboratori locali ne producono versioni con registro valido presso l'agenzia sanitaria di Asunción, e nessun registro presso l'Anvisa, il che le rende illegali in Brasile; uno le ha menzionate solo per sconsigliarle del tutto; uno si è rifiutato di rispondere. \"Una lotteria della sicurezza per chi chiede\", l'ha definita il ricercatore dell'InternetLab — centro studi indipendente di San Paolo su diritto e tecnologia — sentito dal giornale. E il paradosso è che non si tratta nemmeno di bancarelle di frontiera: un'analisi della Unicamp per lo stesso quotidiano ha confermato che le versioni paraguaiane contengono davvero tirzepatida — senza però poter dire nulla su impurezze, sterilità, efficacia o sicurezza — e i laboratori di Asunción arrivano a condurre trial clinici pubblici sui propri prodotti, mentre il titolare del brevetto li definisce falsificazioni. Un ecosistema farmaceutico parallelo che si autolegittima un registro alla volta. Ma attenzione alla differenza, perché è tutta la tesi di questo pezzo: le canetas non sono la backdoor — sono il suo doppio di contrabbando. Il regime maquila è una porta legale, pubblicata in gazzetta con la tariffa sul cartello; un farmaco senza registro è illegale da possedere in Brasile comunque scrupolosa sia stata la compra dall'altro lato della frontiera. Il canale promozionale — influencer ieri, algoritmi oggi — è lo stesso per entrambe le porte, ed è esattamente questo il problema: chi vende pale non distingue tra il filone legale e quello che finisce sequestrato in dogana. Distinguere è il lavoro di qualcun altro." },
  { p: "La professionalizzazione della promozione dice due cose insieme. Certifica la scala — nessuno costruisce un'industria attorno alla pubblicità di un fenomeno marginale. E fa partire un conto alla rovescia. In informatica, quando una backdoor viene scoperta e se ne parla troppo, il proprietario del sistema prima o poi la chiude con una patch — la correzione che sigilla la falla. Qui funziona allo stesso modo: una scorciatoia urlata ogni giorno in un milione di feed è una scorciatoia avviata a diventare questione politica a Brasília, e le questioni politiche sono l'anticamera della correzione. L'episodio Lupo mostra il meccanismo in miniatura — una decisione industriale sfumata, per metà fatta di un investimento maggiore dentro il Brasile, compressa dall'economia dell'engagement in \"azienda abbandona il Brasile dopo 104 anni\": un'affermazione così sbagliata che l'azienda ha dovuto smentirla per iscritto." },
  { p: "Il che suggerisce una regola di applicazione generale, offerta qui gratuitamente: le decisioni importanti della vita — e trasferire una linea di produzione lo è — non si prendono seguendo un influencer." },
  { p: "Considerate questa pagina, allora, il lavoro di un uninfluencer. Qui nessuno viene pagato quando attraversate il fiume, e nessuno viene pagato se restate a casa; gli unici abbonamenti dietro questa analisi sono alle gazzette doganali, ai registri delle maquilas e ai tariffari, letti uno accanto all'altro finché non ammettono qualcosa. È una struttura di incentivi diversa, e le strutture di incentivi sono un destino. Chi viene pagato ogni volta che qualcuno attraversa — a provvigione, a sponsorizzazione, a click — vi dirà sempre che attraversare conviene: il suo guadagno si ferma sulla soglia, quello che vi succede dopo non è affar suo. L'analisi, invece, campa solo se voi siete ancora in affari anni dopo aver attraversato. E chi ha questo incentivo è costretto a occuparsi delle cose noiose che decidono la vostra sopravvivenza: le regole di origine, le scadenze dei regimi, la penna — a Washington come a Brasília — che può chiudere tutto con una firma. Perché ogni backdoor resta aperta solo finché il proprietario del sistema decide di non chiuderla. La posizione sensata, allora, non è né precipitarsi dentro né fare la morale a distanza: è stare sulla soglia e tenere d'occhio i cardini, cioè i segnali che dicono se la porta sta per muoversi. Possibilmente accanto a qualcuno che li osserva da un po'." },
  { p: "Business Matching Global analizza i corridoi — e le porte laterali — tra Europa e Sud America, finché restano aperti." },
];

export default function AsuncionIT() {
  const { lang } = useT();
  const article = getArticleBySlug("asuncion_it");
  const desc =
    "Il Paraguay non è il rifugio a basso costo del Brasile; è la sua backdoor. Perché Lupo, HLCAPS, Jussara, Leoni e Stellantis attraversano il Paraná, cosa permette davvero la legge del Mercosur e perché l'economia degli influencer è la guida peggiore per capirlo.";
  useCanonical("/asuncion_it", {
    title: "La backdoor del Brasile: Assunción e il corridoio maquila del Paraguay",
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
            {BACK["it"]}
          </Link>
          <LangSwitcher to="/asuncion" />
        </div>
        <article className="prose-invert">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4">
            {TITLE}
          </h1>
          <p className="text-xs text-foreground/70 mb-2">#CustoBrasil — Business Matching Global</p>
          <p className="text-xs text-foreground/70 mb-10 tabular-nums">
            {article?.date && (
              <>
                {article.date}
                {article?.updated && (
                  <span className="ml-2 text-foreground/50">
                    (aggiornato al {article.updated})
                  </span>
                )}
              </>
            )}
          </p>
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
