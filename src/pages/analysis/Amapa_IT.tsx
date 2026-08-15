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

const TITLE = "L'isola che non è un'isola";

const BACK = {
  it: "Torna alle analisi",
  en: "Back to analysis",
  pt: "Voltar às análises",
} as const;

const body: Block[] = [
  { p: "L'unico confine terrestre del Brasile con l'Unione Europea passa per il suo stato più isolato. Due date di quest'estate hanno appena cambiato il significato di questa frase." },
  { tag: "#CustoBrasil" },
  { p: "C'è uno stato in Brasile che ha costruito un ponte verso un altro paese prima di riuscire a costruire una strada verso il proprio." },
  { p: "Delle 27 unità federative del Brasile, l'Amapá è l'unica senza collegamento terrestre con il resto del territorio nazionale. Non l'Acre, come risponderebbe d'istinto qualunque brasiliano: nella cultura pop del paese l'Acre è lo stato-barzelletta per definizione, così remoto che un meme che gira da quindici anni sostiene che non esista affatto (\"o Acre não existe\"). No: l'Amapá. Incastrato tra la foce del Rio delle Amazzoni e la Guiana Francese, è quello che la stampa brasiliana chiama estado-ilha — stato-isola: un'isola che non è un'isola. Tutto ciò che entra o esce lo fa per via aerea, su chiatta attraverso il Rio delle Amazzoni dal porto di Santana, o in traghetto attraverso il fiume Jari verso il Pará — una traversata di 400 metri servita da imbarcazioni con orari limitati, interruzioni meteo e code che decidono quando si muovono medicine, cibo e persone." },
  { p: "Due ponti raccontano tutta la storia." },
  { h: "Il ponte che ha funzionato troppo bene, troppo presto" },
  { p: "Il primo si trova a Oiapoque, all'estremo nord del Brasile: un ponte binazionale strallato di 378 metri sul fiume Oiapoque, che collega il Brasile alla Guiana Francese — vale a dire alla Francia, vale a dire all'Unione Europea. Fu completato nell'agosto 2011, al costo di circa 30 milioni di euro divisi tra i due paesi." },
  { p: "Poi rimase chiuso per sei anni." },
  { p: "I posti doganali non erano pronti. La Francia esigeva il visto per i brasiliani in ingresso via terra — i visti Schengen non valevano, perché la Guiana Francese è fuori dall'area Schengen. Il ponte aprì finalmente al traffico nel marzo 2017, e anche allora sbucava sulla BR-156, una strada il cui tratto nord restava sterrato e la cui costruzione era iniziata — non è un refuso — nel 1932: l'opera incompiuta più antica dello stato." },
  { p: "Il Brasile si era collegato all'Europa prima di collegare l'Amapá al Brasile. E poi nemmeno il collegamento con l'Europa funzionava." },
  { h: "Il ponte che non ha mai funzionato" },
  { p: "Il secondo ponte dovrebbe trovarsi a Laranjal do Jari, al confine con il Pará — ma non è mai stato completato. Questo sì metterebbe fine all'isolamento dell'Amapá: 406 metri sul fiume Jari fino al distretto di Monte Dourado. I lavori iniziarono nel 2001. Venticinque anni e circa 21 milioni di reais dopo, la struttura consiste in piloni piantati nel letto del fiume — tre dei quali danneggiati dall'urto di un'imbarcazione." },
  { p: "Il progetto è passato attraverso gestioni municipali, un accordo in sede di giustizia federale nel 2019, l'inserimento nel Novo PAC — la nuova edizione del Programa de Aceleração do Crescimento, il grande piano federale di opere pubbliche creato da Lula nel 2007 e rilanciato nel 2023, l'equivalente brasiliano di un PNRR permanente — e un posto nella \"Rota de Integração 01\" — un pacchetto infrastrutturale da 28,6 miliardi di reais per l'Amapá che copre il porto di Santana, il ponte del Jari e 110 km di asfaltatura della BR-156, con completamento promesso entro fine 2026. A inizio 2026, le cronache locali non registravano alcun avanzamento concreto sul ponte." },
  { p: "Fin qui, il racconto appartiene a un genere noto: il Custo Brasil come monumento, il pilone incompiuto come simbolo nazionale. Ma questa cornice si perde ciò che è successo quest'estate." },
  { h: "Due date che riprezzano uno stato" },
  { p: "31 luglio 2026. È caduto l'obbligo di visto francese per i brasiliani diretti in Guiana Francese, in base a un accordo firmato all'Itamaraty il 1° luglio dai ministri degli esteri Mauro Vieira e Jean-Noël Barrot, dentro un più ampio pacchetto di cooperazione sulla sicurezza di frontiera. Per la prima volta, il ponte binazionale fa ciò che un ponte dovrebbe fare: chiunque può attraversarlo. Il governatore dell'Amapá è stato esplicito sulla posta in gioco — la Guiana Francese, con il suo reddito medio elevato, è il mercato immediato; l'Unione Europea, via accordo UE-Mercosur, è quello vero. Quella frontiera, ha detto, è una porta." },
  { p: "14 agosto 2026. Petrobras ha annunciato la presenza di idrocarburi nel pozzo Morpho — il primo mai perforato nel bacino della Foz do Amazonas — in acque ultraprofonde a circa 175 km dalla costa dell'Amapá, sotto 2.886 metri d'acqua. Il ritrovamento, identificato tramite profili elettrici e indicatori nella roccia, è nel blocco FZA-M-59, dove Petrobras detiene il 100% con una concessione acquisita nel 2013 all'11ª Rodada dell'ANP, l'agenzia federale che regola il settore petrolifero brasiliano e mette all'asta i blocchi esplorativi — tredici anni dall'asta al primo annuncio, un metro di Custo Brasil già di per sé. Nelle prime ore la compagnia non aveva nemmeno precisato se si trattasse di petrolio o gas naturale; in serata l'Estadão già titolava la conferma: petrolio. La perforazione prosegue comunque in fase di valutazione. E assaporate un dettaglio: Morpho è lo stesso pozzo il cui \"abbandono permanente\" a luglio era stato letto da molti come un fallimento silenzioso. L'abbandono, insisteva allora Petrobras, è una procedura tecnica standard senza alcun legame col risultato — e il risultato adesso ha parlato. Altri tre pozzi, PAD-Morpho, Manga e Crotalus, sono in coda per le licenze." },
  { p: "Il caso geologico è sempre stato alla porta accanto — e per capirlo non serve essere geologi. Più di cento milioni di anni fa, Sudamerica e Africa erano un unico blocco che si strappò in due come un foglio di carta, aprendo in mezzo l'Atlantico. Il \"margine\" è il bordo di quello strappo: la fascia di continente che oggi sta sott'acqua, davanti alla costa. Lungo quel bordo l'oceano appena nato seppellì per milioni di anni enormi quantità di materia organica che, compressa e cotta lentamente, diventò petrolio. Il punto è che quel bordo è uno solo e continuo: parte dalle Guiane e arriva alla foce del Rio delle Amazzoni senza interruzioni, come l'orlo di uno strappo non cambia natura da un centimetro all'altro. Guyana, Suriname e la costa dell'Amapá sono tratti dello stesso orlo — stesse rocce, stessa storia. Di là del confine marittimo sono già stati scoperti oltre 11 miliardi di barili; la geologia non legge le frontiere, ed è per questo che Petrobras scommette che qualcosa debba esserci anche di qua." },
  { p: "Uno stato isolato con 900.000 abitanti non è un mercato. Uno stato isolato seduto su un ritrovamento di idrocarburi e su un confine terrestre UE appena aperto è un'opzione — e il prezzamento di quell'opzione è già cominciato." },
  { h: "Cosa ha deciso davvero il 14 agosto — e cosa no" },
  { p: "Una parola di disciplina prima dell'entusiasmo. Nel gergo petrolifero, un pozzo come Morpho si chiama wildcat: il primo pozzo perforato in una zona dove nessuno ha mai prodotto nulla, con soltanto la sismica e i modelli geologici a suggerire che là sotto ci sia qualcosa. La statistica di categoria è ingrata: nei bacini d'acqua profonda mai testati funziona forse un tentativo su tre o quattro — e \"funzionare\" al primo colpo significa solo trovare idrocarburi, non trovarne abbastanza, abbastanza concentrati e abbastanza raggiungibili da giustificare i miliardi dello sviluppo. Tra \"c'è petrolio\" e \"c'è un giacimento commerciale\" corre la stessa distanza che passa tra setacciare pepite in un torrente e aprire una miniera." },
  { p: "E il Margine Equatoriale questa lezione l'ha già impartita una volta — esattamente dove si svolge questa storia. Nel 2011 Total perforò Zaedyus, nelle acque della Guiana Francese, vendendolo al mercato con lo stesso identico argomento di oggi: la geologia è quella della Guyana, dunque il petrolio deve esserci. Il primo pozzo trovò davvero idrocarburi incoraggianti; i titoli annunciarono una nuova frontiera. Poi i pozzi successivi uscirono vuoti o deludenti, e nel giro di pochi anni il play — l'intera scommessa geologica su quella zona — fu abbandonato. La stessa ExxonMobil perforò per decenni nella regione collezionando delusioni, finché il pozzo Liza, nel 2015, non trasformò la Guyana nella \"Guyana\": da piccolo paese dimenticato a nome che l'industria petrolifera pronuncia come sinonimo di jackpot — oggi è tra i maggiori produttori di petrolio pro capite del pianeta, e ogni nuova frontiera viene venduta come \"la prossima Guyana\". Quel pozzo arrivò quando quasi tutti gli altri se n'erano già andati." },
  { p: "La morale non è che Morpho finirà come Zaedyus. È che un primo pozzo, da solo, non decide nulla: sposta le probabilità." },
  { p: "Contro quella statistica di base, l'esito più probabile è sempre stato né il trionfo né il buco secco, ma l'ambiguità. Ed è esattamente ciò che è arrivato. \"Indizi di idrocarburi\". \"Fase di valutazione.\" Non ancora commerciale — come la stessa presidente di Petrobras, Magda Chambriard, ha detto a Reuters — mentre la nota ufficiale dichiarava che l'ottimismo della compagnia sul Margine Equatoriale \"si conferma oggi\". Entrambe le frasi sono vere; solo una è stata scritta con le elezioni di ottobre davanti agli occhi. E non è più un'inferenza: Lula apre la campagna per la rielezione questo weekend a São Bernardo do Campo con lo slogan \"O Brasil pronto pra mais\" — il Brasile pronto a dare di più — e il ritrovamento già impacchettato come lascito del suo governo. L'annuncio è arrivato inoltre in coppia con un trimestre record — 52,4 miliardi di reais di utile netto, quasi il doppio anno su anno grazie ai prezzi del petrolio spinti dalla guerra, e 17,4 miliardi di dividendi, di cui 6,2 al socio di controllo federale. Leggete la coreografia insieme alla geologia." },
  { p: "La geologia, però, dice qualcosa di reale. I veterani del settore fissano la regola empirica in otto pozzi falliti ogni dieci perforati — falliti in due modi: secchi, quando sotto non c'è nulla, oppure antieconomici, quando l'idrocarburo c'è ma è troppo poco, troppo disperso o troppo costoso da estrarre perché valga i miliardi dello sviluppo. Trovare idrocarburi alla prima campagna di un bacino riduce materialmente il rischio dell'intero margine — ed è per questo che analisti e lobby petrolifera hanno trattato la notizia come conferma della tesi regionale, più che di un giacimento specifico. Il passo successivo si chiama commercialità: stabilire se il giacimento vale i soldi — se il volume recuperabile e i costi di estrazione giustificano lo sviluppo. Lo decideranno i pozzi di delimitazione, altre perforazioni attorno alla scoperta per misurare quanto è grande, spesso e ricco il serbatoio." },
  { p: "Petrobras, intanto, inquadra il bacino come la sua risposta a un problema che ha una data: il pré-sal — la gigantesca provincia petrolifera scoperta nel 2006 al largo tra Rio e Santos, dove il petrolio giace sotto un materasso di sale spesso fino a due chilometri, e che oggi fornisce la gran parte della produzione brasiliana — raggiungerà il picco attorno al 2034-35 e poi comincerà a declinare. Le riserve vanno ricomposte prima di allora, o il paese torna importatore. La scala dell'opzione non è piccola: l'ANP stima che il bacino della Foz do Amazonas possa contenere fino a 30 miliardi di barili — potenziali, attenzione, non provati: una stima di ciò che la geologia potrebbe custodire, non un inventario di ciò che è stato trovato. Per dare la misura: sarebbe circa il doppio di tutte le riserve provate del Brasile di oggi. E non è piccola nemmeno la pressione: ai ritmi attuali di estrazione, le riserve provate di Petrobras si esauriscono in poco più di un decennio." },
  { p: "Messe insieme, le due cifre spiegano l'ostinazione: per Petrobras questa frontiera non è un'avventura da pionieri, è sopravvivenza — senza nuove scoperte, la Petrobras di metà anni Trenta sarebbe una compagnia petrolifera rimasta senza petrolio. Ed è la stessa urgenza a spiegare un dettaglio su cui la celebrazione sorvola: TotalEnergies, BP ed Ecopetrol hanno mollato la regione strada facendo — BP era in origine co-titolare proprio di questo blocco — lasciando l'operatore di stato solo al tavolo col 100%." },
  { p: "Alla vigilia dell'annuncio, gli esiti possibili erano tre. Il trionfo: scoperta dichiarata commerciale, e l'Amapá si riprezza all'istante. Il fallimento: pozzo secco, e resta comunque in piedi la frontiera terrestre con l'UE, che della geologia non ha mai avuto bisogno. E il sentiero di mezzo: idrocarburi trovati, valore ancora da stabilire. È arrivato il terzo: la scommessa resta viva, finanziata da 3 miliardi di dollari di budget esplorativo, con anni di delimitazione davanti a tenere l'Amapá sotto i riflettori. E le opzioni — le scommesse comprate oggi su un valore che si conoscerà solo domani — muovono i prezzi prima ancora di essere esercitate: Oiapoque assorbe flussi migratori dal 2024 sulla sola aspettativa. Il riprezzamento dell'Amapá non ha aspettato la punta del trapano, e non aspetterà la commercialità. Né guasta che il presidente del Senato brasiliano, Davi Alcolumbre, sia un senatore dell'Amapá — \"avevamo ragione\", ha salutato l'annuncio — il che significa che lo stato più isolato del paese impugna in questo momento il martelletto più pesante di Brasília." },
  { h: "L'arbitraggio, in tre strati" },
  { p: "Cosa offre concretamente un confine con l'Unione Europea? Tre cose distinte, e solo una è nuova." },
  { p: "Lo strato dei prezzi esiste da decenni, informalmente. La Guiana Francese vive di stipendi e welfare francesi importando quasi tutto da una metropoli a 7.000 km; il suo costo della vita è tra i più alti di Francia. Dall'altra parte del fiume: prezzi brasiliani. I guianesi attraversano da sempre per spesa, carburante, dentisti, servizi. L'esenzione dal visto rende ora il flusso simmetrico — i brasiliani possono accedere legalmente a un mercato denominato in euro con alto potere d'acquisto. C'è anche uno strato nero (oro dei garimpos illegali, contrabbando di carburante) che ogni analisi onesta nomina e nessun operatore serio tocca." },
  { p: "Lo strato doganale è la finestra che conta. La Guiana Francese è territorio doganale UE. Oggi un camion di cemento, alimentari o materiali da costruzione brasiliani che attraversa il ponte paga dazi UE come se fosse sbarcato a Rotterdam — uno dei motivi per cui il ponte è rimasto vuoto e la Guiana continua a comprare da Le Havre a costi finali assurdi. La ratifica dell'accordo UE-Mercosur cambia l'aritmetica: il fornitore naturale della Guiana Francese diventa il Brasile, a 400 metri, non la Francia, a tre settimane di nave. Ma i dazi sono solo metà del muro. L'altra metà è la conformità — certificazione sanitaria, tracciabilità EUDR per legno e açaí, etichettatura UE. Sul lato brasiliano il prodotto ce l'hanno tutti. La conformità quasi nessuno. Chi costruisce la filiera conforme prima della ratifica si prende il mercato al minuto zero." },
  { p: "Lo strato degli appalti. In quanto regione ultraperiferica UE, la Guiana Francese riceve fondi strutturali europei, oltre alla gravità di spesa dello spazioporto di Kourou. I cantieri girano a strutture di costo francesi accanto a manodopera e materiali brasiliani. Le imprese capaci di operare su entrambi i lati del fiume detengono un vantaggio strutturale che non ha nulla a che fare con la fortuna. E se la delimitazione confermerà ciò che il blocco 59 lascia intravedere, un quarto strato si monta da solo: la logistica di supporto petrolifero in uno stato che oggi non ha quasi nulla di quell'infrastruttura." },
  { h: "Le finestre restano aperte finché non si chiudono" },
  { p: "Niente di tutto questo è una storia morale. I piloni del Jari resteranno nel fiume a prescindere da ciò che se ne scrive, e le code ai traghetti spariranno solo il giorno in cui su quei piloni verrà finalmente varato un impalcato — un giorno che il cronoprogramma ufficiale promette per fine 2026 e che venticinque anni di storia suggeriscono di non segnare in agenda. Il punto analitico è più stretto: le finestre di arbitraggio come lo strato doganale esistono proprio perché sono temporanee. Si aprono tra la ratifica di un trattato e il momento in cui i grandi player se ne accorgono; si chiudono quando il mercato si riprezza o le regole cambiano. Il mestiere non è celebrarle né condannarle — è vederle finché sono aperte." },
  { p: "L'Amapá ha passato un secolo come barzelletta logistica del Brasile. Tra il 31 luglio e il 14 agosto 2026 — quindici giorni — è diventato silenziosamente qualcos'altro: l'unico punto in cui il Brasile tocca l'Europa via terra, accanto al primo ritrovamento di idrocarburi nel bacino che potrebbe estendere la frontiera petrolifera brasiliana, nell'unico stato che tutti avevano smesso di guardare." },
  { p: "Il paese che ha costruito un ponte verso un'altra nazione prima di collegarsi a se stesso potrebbe star per scoprire che il primo ponte era quello giusto." },
  { p: "Business Matching Global — market intelligence e orchestrazione d'impresa sul corridoio UE-Brasile." },
];

export default function AmapaIT() {
  const { lang } = useT();
  const article = getArticleBySlug("amapa");
  useCanonical(`/amapa-it`);

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
            {BACK[lang === "br" ? "pt" : (lang as keyof typeof BACK)] ?? BACK.en}
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
                    aggiornato al{" "}
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
