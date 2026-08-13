import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { useT } from "@/lib/i18n";
import { AnalysisFooter } from "@/components/AnalysisFooter";
import { useCanonical } from "@/lib/useCanonical";
import { ShareBlock } from "@/components/ShareBlock";
import { LangSwitcher } from "@/components/LangSwitcher";

type Block = { h: string } | { p: string };

const TITLE = "L'isola che non è un'isola";

const BACK = {
  it: "Torna alle analisi",
  en: "Back to analysis",
  pt: "Voltar às análises",
} as const;

const body: Block[] = [
  { p: `L'unico confine terrestre del Brasile con l'Unione Europea passa per il suo stato più isolato. Due date di quest'estate hanno appena cambiato il significato di questa frase.` },
  { p: `C'è uno stato in Brasile che ha costruito un ponte verso un altro paese prima di riuscire a costruire una strada verso il proprio.` },
  { p: `Delle 27 unità federative del Brasile, l'Amapá è l'unica senza collegamento terrestre con il resto del territorio nazionale. Non l'Acre, la battuta di rito — l'Amapá. Incastrato tra la foce del Rio delle Amazzoni e la Guiana Francese, è, come dicono i brasiliani, un'isola che non è un'isola. Tutto ciò che entra o esce lo fa per via aerea, su chiatta attraverso il Rio delle Amazzoni dal porto di Santana, o in traghetto attraverso il fiume Jari verso il Pará — una traversata di 400 metri servita da imbarcazioni con orari limitati, interruzioni meteo e code che decidono quando si muovono medicine, cibo e persone.` },
  { p: `Due ponti raccontano tutta la storia.` },
  { h: `Il ponte che ha funzionato troppo bene, troppo presto` },
  { p: `Il primo si trova a Oiapoque, all'estremo nord del Brasile: un ponte binazionale strallato di 378 metri sul fiume Oiapoque, che collega il Brasile alla Guiana Francese — vale a dire alla Francia, vale a dire all'Unione Europea. Fu completato nell'agosto 2011, al costo di circa 30 milioni di euro divisi tra i due paesi.` },
  { p: `Poi rimase chiuso per sei anni.` },
  { p: `I posti doganali non erano pronti. La Francia esigeva il visto per i brasiliani in ingresso via terra — i visti Schengen non valevano, perché la Guiana Francese è fuori dall'area Schengen. Il ponte aprì finalmente al traffico nel marzo 2017, e anche allora sbucava sulla BR-156, una strada il cui tratto nord restava sterrato e la cui costruzione era iniziata — non è un refuso — nel 1932: l'opera incompiuta più antica dello stato.` },
  { p: `Il Brasile si era collegato all'Europa prima di collegare l'Amapá al Brasile. E poi nemmeno il collegamento con l'Europa funzionava.` },
  { h: `Il ponte che non ha mai funzionato` },
  { p: `Il secondo ponte è a Laranjal do Jari, al confine con il Pará. Questo sì metterebbe fine all'isolamento dell'Amapá: 406 metri sul fiume Jari fino al distretto di Monte Dourado. I lavori iniziarono nel 2001. Venticinque anni e circa 21 milioni di reais dopo, la struttura consiste in piloni piantati nel letto del fiume — tre dei quali danneggiati dall'urto di un'imbarcazione.` },
  { p: `Il progetto è passato attraverso gestioni municipali, un accordo in sede di giustizia federale nel 2019, l'inserimento nel Novo PAC e un posto nella "Rota de Integração 01" — un pacchetto infrastrutturale da 28,6 miliardi di reais per l'Amapá che copre il porto di Santana, il ponte del Jari e 110 km di asfaltatura della BR-156, con completamento promesso entro fine 2026. A inizio 2026, le cronache locali non registravano alcun avanzamento concreto sul ponte.` },
  { p: `Fin qui, il racconto appartiene a un genere noto: il Custo Brasil come monumento, il pilone incompiuto come simbolo nazionale. Ma questa cornice si perde ciò che è successo quest'estate.` },
  { h: `Due date che riprezzano uno stato` },
  { p: `31 luglio 2026. È caduto l'obbligo di visto francese per i brasiliani diretti in Guiana Francese, in base a un accordo firmato all'Itamaraty il 1° luglio dai ministri degli esteri Mauro Vieira e Jean-Noël Barrot, dentro un più ampio pacchetto di cooperazione sulla sicurezza di frontiera. Per la prima volta, il ponte binazionale fa ciò che un ponte dovrebbe fare: chiunque può attraversarlo. Il governatore dell'Amapá è stato esplicito sulla posta in gioco — la Guiana Francese, con il suo reddito medio elevato, è il mercato immediato; l'Unione Europea, via accordo UE-Mercosur, è quello vero. Quella frontiera, ha detto, è una porta.` },
  { p: `Inizio settembre 2026. Petrobras prevede di concludere la perforazione del pozzo Morpho — il primo in assoluto nella bacia della Foz do Amazonas, a circa 500 chilometri dalla costa dell'Amapá, nella Margine Equatoriale brasiliana. La compagnia ha messo a budget 3 miliardi di dollari per l'esplorazione della regione fino al 2029, e il caso geologico si scrive da solo: la bacia confina con Guyana e Suriname, dove sono già stati scoperti oltre 11 miliardi di barili. Se Morpho conferma petrolio commerciale, Macapá e Oiapoque diventano geografia di supply chain petrolifera dall'oggi al domani — servizi, logistica, personale — in uno stato che oggi non ha quasi nulla di quell'infrastruttura.` },
  { p: `Uno stato isolato con 900.000 abitanti non è un mercato. Uno stato isolato seduto su una possibile frontiera petrolifera e su un confine terrestre UE appena aperto è un'opzione — e l'opzione viene prezzata a settembre.` },
  { h: `Cosa decide davvero settembre` },
  { p: `Una parola di disciplina prima dell'entusiasmo: i singoli pozzi di frontiera deludono più spesso di quanto mantengano. I wildcat in bacini deep-water mai testati riescono forse una volta su tre o su quattro, e la Margine Equatoriale ha già prodotto un precedente ammonitore proprio su questa analogia. Nel 2011, Total perforò il pozzo Zaedyus nelle acque della Guiana Francese — la stessa logica del "prossimo caso Guyana" — trovò idrocarburi incoraggianti, generò un ciclo di titoli, e poi vide fallire i pozzi successivi fino all'abbandono del play. La stessa ExxonMobil perforò per decenni nella regione prima che Liza trasformasse la Guyana nella Guyana.` },
  { p: `L'esito più probabile a settembre non è né il trionfo né il buco secco, ma l'ambiguità: indizi di idrocarburi, volumi da valutare, pozzi di delimitazione necessari. E qui il timing conta due volte. Il risultato arriva a poche settimane dalle elezioni brasiliane di ottobre, il che rende l'annuncio un atto politico quanto geologico — il governo ha ogni incentivo a leggere in positivo qualunque cosa esca dal fondale, l'opposizione a leggere nella direzione opposta. Gli osservatori attrezzati impareranno più da come il risultato verrà comunicato che dal risultato stesso.` },
  { p: `Per chi valuta l'Amapá, però, il pozzo non è la scommessa. Si corrano i tre scenari. Scoperta commerciale: lo stato si riprezza immediatamente e parte la corsa alla supply chain. Risultato ambiguo: 3 miliardi di dollari di budget esplorativo e pozzi contingenti tengono viva l'opzione fino al 2029. Pozzo vuoto: il confine terrestre con l'UE resta esattamente dov'era, e la geologia non ha diritto di voto sul territorio doganale. Solo uno dei tre scenari uccide la tesi di questo articolo, e non è in lista.` },
  { h: `L'arbitraggio, in tre strati` },
  { p: `Cosa offre concretamente un confine con l'Unione Europea? Tre cose distinte, e solo una è nuova.` },
  { p: `Lo strato dei prezzi esiste da decenni, informalmente. La Guiana Francese vive di stipendi e welfare francesi importando quasi tutto da una metropoli a 7.000 km; il suo costo della vita è tra i più alti di Francia. Dall'altra parte del fiume: prezzi brasiliani. I guianesi attraversano da sempre per spesa, carburante, dentisti, servizi. L'esenzione dal visto rende ora il flusso simmetrico — i brasiliani possono accedere legalmente a un mercato denominato in euro con alto potere d'acquisto. C'è anche uno strato nero (oro dei garimpos illegali, contrabbando di carburante) che ogni analisi onesta nomina e nessun operatore serio tocca.` },
  { p: `Lo strato doganale è la finestra che conta. La Guiana Francese è territorio doganale UE. Oggi un camion di cemento, alimentari o materiali da costruzione brasiliani che attraversa il ponte paga dazi UE come se fosse sbarcato a Rotterdam — uno dei motivi per cui il ponte è rimasto vuoto e la Guiana continua a comprare da Le Havre a costi finali assurdi. La ratifica dell'accordo UE-Mercosur cambia l'aritmetica: il fornitore naturale della Guiana Francese diventa il Brasile, a 400 metri, non la Francia, a tre settimane di nave. Ma i dazi sono solo metà del muro. L'altra metà è la conformità — certificazione sanitaria, tracciabilità EUDR per legno e açaí, etichettatura UE. Sul lato brasiliano il prodotto ce l'hanno tutti. La conformità quasi nessuno. Chi costruisce la filiera conforme prima della ratifica si prende il mercato al minuto zero.` },
  { p: `Lo strato degli appalti. In quanto regione ultraperiferica UE, la Guiana Francese riceve fondi strutturali europei, oltre alla gravità di spesa dello spazioporto di Kourou. I cantieri girano a strutture di costo francesi accanto a manodopera e materiali brasiliani. Le imprese capaci di operare su entrambi i lati del fiume detengono un vantaggio strutturale che non ha nulla a che fare con la fortuna.` },
  { h: `Le finestre restano aperte finché non si chiudono` },
  { p: `Niente di tutto questo è una storia morale. I piloni del Jari resteranno nel fiume a prescindere da ciò che se ne scrive, e le code ai traghetti dureranno fino al giorno in cui non dureranno più. Il punto analitico è più stretto: le finestre di arbitraggio come lo strato doganale esistono proprio perché sono temporanee. Si aprono tra la ratifica di un trattato e il momento in cui i grandi player se ne accorgono; si chiudono quando il mercato si riprezza o le regole cambiano. Il mestiere non è celebrarle né condannarle — è vederle finché sono aperte.` },
  { p: `L'Amapá ha passato un secolo come barzelletta logistica del Brasile. Tra il 31 luglio e l'inizio di settembre 2026 è diventato silenziosamente qualcos'altro: l'unico punto in cui il Brasile tocca l'Europa via terra, accanto all'unica bacia che potrebbe estendere la frontiera petrolifera brasiliana, nell'unico stato che tutti avevano smesso di guardare.` },
  { p: `Il paese che ha costruito un ponte verso un'altra nazione prima di collegarsi a se stesso potrebbe star per scoprire che il primo ponte era quello giusto.` },
  { p: `Business Matching Global — market intelligence e orchestrazione d'impresa sul corridoio UE-Brasile.` },
];

export default function AmapaIT() {
  const { lang, setLang } = useT();
  const desc =
    "L'Amapá è l'unico confine terrestre del Brasile con l'Unione Europea. La caduta del visto francese e il pozzo Morpho stanno per riprezzare lo stato più isolato del paese.";
  useCanonical("/amapa_it", {
    title: "L'isola che non è un'isola: Amapá, il confine terrestre UE del Brasile",
    description: desc,
    type: "article",
  });

  useEffect(() => {
    setLang("it");
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
          <LangSwitcher to="/amapa_it" />
        </div>
        <article className="prose-invert">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4">
            {TITLE}
          </h1>
          <p className="text-xs text-foreground/70 mb-2">#CustoBrasil — Business Matching Global</p>
          <p className="text-xs text-foreground/70 mb-10 tabular-nums">pubblicato il 13-08-2026</p>
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
