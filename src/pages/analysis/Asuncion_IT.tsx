import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useT } from "@/lib/i18n";
import { getArticleBySlug } from "@/lib/analysis";
import { AnalysisFooter } from "@/components/AnalysisFooter";
import { useCanonical } from "@/lib/useCanonical";
import { ShareBlock } from "@/components/ShareBlock";
import { LangSwitcher } from "@/components/LangSwitcher";

type Block = { h: string } | { p: string };

const TITLE = "La backdoor del Brasile";

const BACK = {
  it: "Torna alle analisi",
  en: "Back to analysis",
  pt: "Voltar às análises",
} as const;

const body: Block[] = [
  { p: "Calze, capsule softgel e cablaggi per Stellantis: cosa dice davvero il traffico sul Paraná — e perché chi lo urla su Instagram è la guida meno affidabile per capirlo." },
  { p: "A febbraio un post è diventato virale sui social brasiliani: Lupo, il produttore di calze e intimo fondato nel 1921, \"lasciava il Brasile dopo 104 anni\" per portare la produzione in Paraguay. L'azienda ha dovuto smentire pubblicamente. Non se ne andava affatto. Quello che aveva fatto davvero era aprire uno stabilimento a Ciudad del Este — trenta milioni di reais, circa centodieci posti di lavoro, capacità per venti milioni di paia di calze basiche l'anno in regime di maquila — investendone nel frattempo più del doppio, settanta milioni, nella base storica di Araraquara, su tessile tecnico e sulle linee ad alto valore Lupo Sport." },
  { p: "Questo non è un esodo. È una divisione del lavoro: produzione commodity su una riva del fiume, ingegneria e marchio sull'altra. E il dettaglio che il post virale non menzionava è il più istruttivo. Interrogata sul perché, l'amministratrice delegata di Lupo, Liliana Aufiero — nipote di Henrique Lupo, l'immigrato italiano che fondò l'azienda — non ha parlato di fuga dal Brasile. Ha parlato dei concorrenti che doveva raggiungere: produttori cinesi già installati in Paraguay, che già vendevano calze basiche sul mercato brasiliano a costi irraggiungibili dallo stato di San Paolo. La traversata del fiume non era una fuga. Era un inseguimento." },
  { p: "Tenete a mente questa inversione, perché riscrive tutto il resto della storia. Il Paraguay viene di solito descritto come il rifugio a basso costo del Brasile. È più esatto descriverlo come la sua backdoor — e in coda alla porta non ci sono solo brasiliani." },
  { h: "Una porta con la firma del proprietario" },
  { p: "Prima i numeri. Il regime maquila paraguaiano ospita oggi circa 320 imprese; grosso modo sette su dieci sono brasiliane. Nel primo semestre del 2026 le maquiladoras hanno esportato oltre settecento milioni di dollari, un quarto in più dell'anno prima, e il regime sostiene più di trentacinquemila posti di lavoro, in crescita di circa il dieci per cento annuo. Una nuova legge maquila, in vigore da fine 2025, ha sostituito l'originale del 1997 estendendo il regime a servizi e tecnologia. Il tributo è uno solo: l'uno per cento sul valore aggiunto. E gli ultimi arrivati stanno risalendo la catena del valore: in agosto il fornitore farmaceutico brasiliano HLCAPS ha inaugurato a Ciudad del Este un impianto da otto milioni di dollari per produrre cinque miliardi e mezzo di capsule softgel l'anno — dichiarando, senza enfasi, che l'unità servirà il Sud America e gli Stati Uniti." },
  { p: "Ed ecco la parte che si perde nell'indignazione: questa backdoor l'ha scritta il Brasile stesso. La libera circolazione che permette all'output delle maquilas di tornare a casa è diritto Mercosur, firmato ad Asunción con la penna del Brasile. E la porta resta aperta perché serve soprattutto agli insider: circa due terzi di tutto ciò che le maquiladoras producono torna dritto in Brasile. Non è capitale straniero che saccheggia il mercato brasiliano. Sono, in schiacciante maggioranza, aziende brasiliane che escono dalla porta sul retro per rientrare da quella principale a costi più bassi." },
  { p: "Se tutta la faccenda ha un santo patrono comico, è la Banda Bassotti — i Beagle Boys dell'originale, gli Irmãos Metralha per i lettori brasiliani. Sessant'anni di colpi falliti, perché si ostinavano a scassinare il fronte di un deposito il cui ingresso posteriore era pubblicato in gazzetta ufficiale con la tariffa dell'uno per cento stampata sul cartello. Non gli è mai mancata l'audacia. Gli mancava l'abbonamento alla Gaceta Oficial." },
  { h: "L'europeo che è già dentro" },
  { p: "Il fenomeno viene raccontato come un affare brasiliano, ma la legge maquila non chiede il passaporto. A San Lorenzo, uno stabilimento produce da anni, in silenzio, cablaggi automotive per Stellantis e General Motors. Appartiene a Leoni — un'azienda tedesca. Il proof of concept europeo non è un'ipotesi: è in officina, semplicemente non ha mai assunto un ufficio stampa." },
  { p: "Per un produttore europeo l'arbitraggio ha tre facce. La prima è la porta laterale del Mercosur: la tariffa esterna comune e il Custo Brasil che fermano una media impresa europea al portone del Brasile si possono aggirare producendo in Paraguay ed entrando in Brasile come merce Mercosur — con un tecnicismo decisivo. Le regole di origine. Il semplice assemblaggio leggero di insumi europei non conferisce origine Mercosur, e il prodotto paga comunque la tariffa esterna; il modello funziona solo dove il valore aggiunto locale — lavoro, energia a prezzo Itaipú, componentistica regionale — supera le soglie. È un'analisi caso per caso, ed è esattamente lì che sta il lavoro vero." },
  { p: "La seconda faccia guarda a nord. Nella tornata tariffaria entrata in vigore a luglio, Washington ha applicato un minimo del dieci per cento a una sessantina di paesi e fino al dodici e mezzo — con ricarichi che arrivano al venticinque su alcuni prodotti — a Cina, India, Unione Europea e Brasile. Il Paraguay è rimasto fuori dalla lista; il suo ministro dell'Industria lo rivendica apertamente, osservando che ogni punto di dazio pagato da un vicino è competitività guadagnata ad Asunción. Dietro non c'è alcun accordo di libero scambio — la tariffa comune del Mercosur lo vieta — solo un accordo quadro, un consiglio bilaterale e una vistosa buona condotta geopolitica. Il piano di HLCAPS di servire gli Stati Uniti da Ciudad del Este è questa asimmetria convertita in cemento e acciaio inox." },
  { p: "La terza faccia è quella che in Europa quasi nessuno ha ancora prezzato: l'accordo UE-Mercosur, che il Paraguay è stato tra i primi a ratificare. Quando entrerà in vigore, gli insumi europei entreranno in Paraguay a dazi ridotti — e la combinazione di input preferenziali in entrata con trattamento maquila in uscita è una configurazione che oggi esiste soprattutto su carte che nessuno si è preso la briga di leggere una accanto all'altra." },
  { h: "Gettare cemento sotto i flussi" },
  { p: "Quando il capitale privato apre un corridoio, prima o poi i governi arrivano a gettarci il cemento sotto. In agosto il governatore di Santa Catarina è volato ad Asunción — con il presidente della federazione industriale dello stato — per proporre, tra sette temi, un nuovo ponte. Guardate la mappa e sorridete: Santa Catarina non confina col Paraguay. Il collegamento proposto, da Mayor Otaño a El Dorado, attraversa la provincia argentina di Misiones, che non contribuisce né con la domanda né con l'offerta: solo con la geografia, e coi pedaggi. Lo scambio dichiarato è transazionale — una rotta più corta per il mais paraguaiano verso il complesso delle proteine animali catarinense, e i porti di Santa Catarina aggiunti alla breve lista che il Paraguay usa oggi per il suo commercio marittimo. Il contesto non dichiarato è che i produttori catarinensi, nomi del tessile inclusi, già producono oltre il fiume. Lo stato che non è riuscito a trattenere ogni fabbrica ha deciso di possederne la logistica: se non puoi essere lo stabilimento, sii il varco. Sarebbe il quarto ponte su questa frontiera, e il primo concepito non per collegare vicini ma per accorciare un arbitraggio." },
  { h: "Quelli che vendono pale e setacci" },
  { p: "Un ultimo dato, forse il più eloquente. Ogni giorno cresce il numero di influencer brasiliani che vivono promuovendo il Paraguay — l'uno per cento, il \"triplo dieci\", il pacchetto apri-la-tua-azienda-ad-Asunción. È diventata una professione. In ogni corsa all'oro il mestiere più sicuro non è mai stato scavare: era vendere pale — l'accesso — e setacci, la lusinghiera illusione del discernimento, il corso e la mentoria che dovrebbero aiutarti a distinguere la pepita dal fango. Vale la pena ricordare come finì quella storia: i cercatori morirono per lo più poveri, e l'uomo che vendeva pantaloni robusti si chiamava Levi Strauss." },
  { p: "La professionalizzazione della promozione dice due cose insieme. Certifica la scala — nessuno costruisce un'industria attorno alla pubblicità di un fenomeno marginale. E fa partire un orologio: una backdoor urlata ogni giorno in un milione di feed è una backdoor avviata a diventare questione politica a Brasília, e le questioni politiche sono l'anticamera delle patch. L'episodio Lupo mostra il meccanismo in miniatura — una decisione industriale sfumata, per metà fatta di un investimento maggiore dentro il Brasile, compressa dall'economia dell'engagement in \"azienda abbandona il Brasile dopo 104 anni\": un'affermazione così sbagliata che l'azienda ha dovuto smentirla per iscritto." },
  { p: "Il che suggerisce una regola di applicazione generale, offerta qui gratuitamente: le decisioni importanti della vita — e trasferire una linea di produzione lo è — non si prendono seguendo un influencer. La porta è reale, il cartello dell'uno per cento è reale, lo stabilimento tedesco che cabla le auto Stellantis è reale, e altrettanto reali sono le clausole sulle regole di origine e la penna, a Washington come a Brasília, che può chiudere tutto. Ogni backdoor vive esattamente quanto il proprietario del sistema decide di non patcharla. La posizione sensata non è precipitarsi dentro la porta né moraleggiare a distanza. È stare sulla soglia, a guardare i cardini." },
  { p: "Business Matching Global analizza i corridoi — e le porte laterali — tra Europa e Sud America, finché restano aperti." },
];

export default function AsuncionIT() {
  const { lang } = useT();
  const article = getArticleBySlug("asuncion_it");
  const desc =
    "Il Paraguay non è il rifugio a basso costo del Brasile; è la sua backdoor. Perché Lupo, HLCAPS e Leoni stanno attraversando il Paraná, cosa permette davvero la legge del Mercosur e perché l'economia degli influencer è la guida peggiore per capirlo.";
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
