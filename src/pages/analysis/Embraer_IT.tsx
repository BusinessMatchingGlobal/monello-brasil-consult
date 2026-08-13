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
  { h: "I. Il monopolio che nessuno guarda" },
  { p: "Nel mondo dell'aviazione gli ordini si contano come si è sempre fatto: Airbus contro Boeing. Eppure la statistica più rivelatrice dell'aerospazio commerciale non appartiene a nessuna delle due. Nel segmento da 70 a 150 posti, un unico produttore detiene circa il 76% del mercato. Non è europeo. Non è nordamericano. È Embraer — un'azienda di São José dos Campos, a un'ora da San Paolo, che gestisce di fatto un quasi-monopolio nell'unica fetta dell'aviazione commerciale in cui il duopolio non si è mai degnato di competere." },
  { p: "Quando si parla di Brasile, il commento europeo scivola in automatico su soia, minerale di ferro e caffè. Embraer è la smentita vivente di quella visione: 23.000 dipendenti, attività in 23 Paesi, ricavi 2025 oltre i 7 miliardi di dollari e — secondo i risultati del secondo trimestre pubblicati il 24 luglio — un portafoglio ordini record di 34,5 miliardi di dollari, cresciuto del 7% in un solo trimestre. Questa analisi spiega come ci si è arrivati, perché tutto ha accelerato proprio in questo luglio, e che cosa significa per l'industria europea." },

  { h: "II. «Dov'è la tecnologia brasiliana?» — l'obiezione, e la risposta" },
  { p: "Quando abbiamo pubblicato la versione breve di questa analisi, un lettore ha sollevato l'obiezione che merita una risposta completa, perché è il fraintendimento europeo più diffuso su Embraer: se l'E2 vola con porte francesi, impennaggi spagnoli e comandi dei flap tedeschi, dov'è esattamente la tecnologia brasiliana? Nei bulloni e nei dadi?" },
  { p: "Per la stessa logica, nemmeno Boeing sarebbe americana — il 787 vola con ali costruite in Giappone e sezioni di fusoliera italiane — e Airbus, consorzio di quattro Paesi per nascita, non sarebbe il campione nazionale di nessuno. L'approvvigionamento globale è il modo in cui si costruisce ogni aereo di linea moderno. La lista dei fornitori è la metà facile del settore." },
  { p: "La tecnologia è tutto ciò che la lista dei fornitori non mostra. È la progettazione dell'ala — Embraer progetta e produce le proprie, una delle poche competenze che gli OEM non esternalizzano mai. È la scrittura delle leggi di controllo fly-by-wire che decidono come l'aeromobile si comporta in ogni condizione di volo. È l'integrazione di milioni di componenti provenienti da decine di Paesi in un'unica macchina, certificata simultaneamente presso FAA, EASA e ANAC. È la responsabilità, commerciale e legale, su ogni cellula per trent'anni di servizio. Migliaia di aziende al mondo sanno produrre porte e attuatori. Esattamente tre sanno consegnare un aereo di linea certificato. Questa scarsità — integrazione di sistemi, autorità di certificazione, responsabilità di prodotto — è la tecnologia. E in Embraer parla portoghese." },
  { p: "Tenete a mente questa distinzione, perché il resto dell'analisi è la storia di come un Paese ha acquisito proprio questa capacità rara." },

  { h: "III. Il metodo prima del prodotto: 1962–2026" },
  { p: "La sequenza conta più delle date. Il Brasile non ha costruito una fabbrica di aerei sperando che gli ingegneri arrivassero dopo. Ha costruito prima la scuola: l'ITA, l'Instituto Tecnológico de Aeronáutica, fondato sul modello del MIT negli anni del dopoguerra. Dai suoi laureati è nato il progetto: nel 1965 un ingegnere dell'Aeronautica di nome Ozires Silva guidò un team di trecento persone al centro tecnico di São José dos Campos, sviluppando un piccolo bimotore turboelica per collegare le città che le strade brasiliane non riuscivano a raggiungere. Il prototipo — il Bandeirante — volò nel 1968. Solo allora, nel 1969, lo Stato creò Embraer per produrlo in serie. Prima la scuola, poi il progetto, infine l'azienda. Il Brasile non ha costruito una fabbrica: ha costruito un sistema per produrre metodo aeronautico, e la fabbrica ne è stata la conseguenza." },
  { p: "Il metodo non ha mai smesso di capitalizzarsi. Dal 2007 Embraer gestisce i propri stabilimenti secondo la filosofia lean attraverso il P3E, il Programma di Eccellenza Aziendale modellato sul Toyota Production System — e nel 2022 è andata alla fonte, firmando un accordo con Toyota do Brasil per applicare il TPS direttamente sulle proprie linee. I risultati sono misurabili: un ciclo di costruzione di 13 mesi con assemblaggio finale in circa 40 giorni; la carenza di motori Pratt & Whitney, che un tempo lasciava oltre un quinto degli aerei in produzione in attesa dei propulsori, ridotta all'1% circa; i tempi di consegna dei jet executive scesi da 18 mesi verso una sola cifra; e una rampa di consegne da 78 jet commerciali nel 2025 verso 85 quest'anno e oltre 110 il prossimo — con una produzione complessiva già in crescita di circa il 20% nel primo semestre 2026." },

  { h: "IV. L'habitat: perché il mercato di casa del segmento è il migliore al mondo" },
  { p: "Embraer non è un fornitore a caccia di un mercato: è radicata nel mercato aereo in più rapido miglioramento del pianeta." },
  { p: "La geografia latinoamericana fa il marketing da sola. Bogotá e Medellín distano appena 250 chilometri sulla mappa — ma la strada è un'altra storia: oltre 400 chilometri di tornanti andini, otto-nove ore di guida. Il risultato è uno dei corridoi aerei più trafficati al mondo: più di cento partenze al giorno e 3,5 milioni di passeggeri l'anno, con tariffe andata e ritorno in media attorno ai 45 euro. In tutto il continente l'alta velocità ferroviaria non esiste e le autostrade non possono sostituirla: per una quota enorme di coppie di città, volare è l'unica opzione praticabile. Aggiungete una classe media in crescita che genera passeggeri alla prima esperienza di volo in Brasile, Colombia, Perù e Cile — la IATA prevede per quest'anno una crescita del traffico regionale del 5%, seconda solo all'Asia-Pacifico, con la domanda premium cresciuta di oltre il 22% nel 2025, la più rapida al mondo." },
  { p: "La svolta finanziaria è altrettanto netta. Un settore che per un decennio gli investitori hanno trattato come una classe di attivi in sofferenza ha usato le ristrutturazioni Chapter 11 dell'era pandemica per azzerare debito, flotte e contratti di leasing: l'utile operativo regionale è passato da 1,1 miliardi di dollari nel 2019 a 7,1 miliardi nel 2025, e Copa, LATAM e Avianca registrano oggi margini che mettono in imbarazzo molte major europee e nordamericane. L'avvertenza onesta — costi denominati in dollari contro ricavi in parte in valuta locale tengono il margine netto previsto attorno al 2,1% — spiega perché le strutture a basso assorbimento di capitale contino ancora nella regione. Per un costruttore il cui intero portafoglio è pensato per riempire un aereo della taglia giusta su rotte dense, a media distanza e senza alternativa ferroviaria, questo non è un mercato. È un habitat." },

  { h: "V. Il paradosso domestico — e la settimana in cui è finito" },
  { p: "Ecco il fatto più strano di tutta la storia: fino a questo mese, il costruttore che detiene il 76% del segmento globale era quasi assente dalle flotte del proprio Paese. Per anni solo Azul ha operato jet Embraer sulle rotte commerciali brasiliane; Gol vola esclusivamente con Boeing 737 dai primi anni Duemila, e i primi E2 di LATAM arriveranno solo a fine anno." },
  { p: "Farnborough 2026 è il luogo dove il paradosso è morto. Abra Group — la holding dietro Gol, Avianca e l'operatore ACMI spagnolo Wamos Air — ha firmato per 20 E195-E2 fermi, circa 1,75 miliardi di dollari a prezzi di listino, con opzioni e diritti d'acquisto che portano il totale potenziale a 45 aeromobili. Le consegne sono attese dal quarto trimestre 2027; il gruppo dice che i jet potranno volare sia per Gol sia per Avianca, con gli annunci sulle rotte in arrivo e la Colombia esplicitamente nel radar per l'espansione. Quando l'ordine verrà contabilizzato nel terzo trimestre, tutti i principali gruppi aerei brasiliani opereranno l'E2 — e il baricentro del segmento avrà completato il ritorno a casa." },
  { p: "Abra merita attenzione oltre il singolo ordine. Il gruppo prepara la quotazione a New York, si è mosso sulla cilena Sky Airline e in passato ha tentato l'integrazione con Azul. L'aviazione latinoamericana si sta consolidando attorno a una manciata di gruppi con disciplina di prezzo — e un mercato in consolidamento con una narrativa di crescita pre-IPO è esattamente il cliente che trasforma il portafoglio ordini di un costruttore in relazioni di flotta decennali." },

  { h: "VI. Farnborough 2026: il portafoglio ordini" },
  { p: "L'accordo Abra ha guidato un raccolto più ampio. Nel corso della fiera Embraer ha confermato 30 ordini fermi da quattro clienti — i 20 di Abra, cinque E195-E2 per la spagnola Binter, tre E190-E2 per Luxair, due E175 per la giapponese Fuji Dream Airlines — con opzioni e diritti che portano il totale potenziale a 60, sopra l'espansione di giugno del lessor Azorra (da 39 a 54 E195-E2 fermi) che aveva già spinto il programma E2 oltre i 500 ordini cumulativi. Azorra ha aggiunto un memorandum per fino a 30 conversioni E-Freighter, aprendo un segmento cargo tra i grandi turboelica e i freighter a corridoio singolo. E accanto al portafoglio ordini è emerso un asse del Golfo: una cooperazione che coinvolge Etihad e Abra, che porta capacità widebody nel gruppo mentre Wamos serve Etihad in ACMI — il tipo di incastro di flotta che segnala pianificazione di rete a lungo termine, non acquisti opportunistici." },

  { h: "VII. La scala: il secondo trimestre in quattro numeri" },
  { p: "Il comunicato trimestrale di venerdì, pubblicato a fiera appena chiusa, ha dato la misura del momento. Portafoglio ordini totale: 34,5 miliardi di dollari, un record, +7% in tre mesi. Aviazione commerciale: 15,1 miliardi (gli ordini di Farnborough saranno contabilizzati solo nel terzo trimestre). Aviazione executive: 7,8 miliardi, +3%. Servizi e assistenza: 5,5 miliardi, +8% — la rendita che si accumula in silenzio dietro ogni consegna. E il motore del trimestre: la difesa, +39% a 6,1 miliardi, trainata dall'ordine dell'Aeronautica degli Emirati Arabi Uniti per fino a 20 trasporti C-390 Millennium — il più grande ordine internazionale nella storia del modello. Tra aprile e giugno sono stati consegnati sessantacinque aeromobili. E la previsione di lungo periodo dell'azienda, diffusa per la fiera, vede una domanda di 8.500 jet commerciali fino al 2045: una pista lunga vent'anni per un segmento che Embraer già domina." },

  { h: "VIII. Il test dei dazi: tre regimi, un solo carve-out" },
  { p: "Se volete una misurazione involontaria, fatta da terzi, di quanto vale quel 76%, non chiedetelo a Embraer. Chiedetelo al Rappresentante per il Commercio degli Stati Uniti." },
  { p: "Negli ultimi dodici mesi Washington ha ricostruito tre volte il proprio muro tariffario contro il Brasile — e tutte e tre le volte vi ha ritagliato la stessa porta. L'ordine d'emergenza del luglio 2025, che alzò i dazi sulla maggior parte dei beni brasiliani al 50%, esentò dal primo giorno aeromobili civili, parti e componenti. Il regime globale della Sezione 122, introdotto a febbraio 2026, ha esentato in blocco aeromobili commerciali, motori e parti aerospaziali — un carve-out più ampio di quelli concessi a Unione Europea, Regno Unito o Giappone nei rispettivi accordi commerciali. E il dazio del 25% della Sezione 301, specifico per il Brasile e in vigore dal 22 luglio 2026, esenta di nuovo aeromobili e parti, con circa 430 voci doganali riservate ai soli usi dell'aviazione civile." },
  { p: "La ragione è aritmetica, non affettiva. L'aviazione regionale statunitense vola sull'E175: la sola SkyWest ne ha ordinati altri 60 l'anno scorso, con diritti su ulteriori 50, per volare per conto di American, Delta, United e Alaska. Un dazio su Embraer è una tassa sulla connettività interna degli Stati Uniti — e così, amministrazione dopo revisione dopo riemissione, l'aereo resta esente mentre caffè e acciaio pagano. La politica commerciale è il luogo dove la dipendenza smette di essere una tesi e diventa una tabella doganale: Washington può vivere senza la carne brasiliana al vecchio prezzo. Senza l'aereo, no." },

  { h: "IX. Difesa: il test del caccia" },
  { p: "La difesa merita un'analisi a sé — l'abbiamo pubblicata — ma la versione da sito di questa storia ha bisogno dei suoi tre segnali di luglio, perché completano la tesi del metodo." },
  { p: "Velocità: il 16 luglio l'Aeronautica ceca ha ricevuto il suo primo C-390, venti mesi dopo la firma del contratto — una tempistica da aviazione commerciale applicata a un prodotto militare, che è esattamente ciò per cui esiste un sistema di produzione derivato da Toyota. L'aeromobile, battezzato \"Karel Toman-Mareš\" a Farnborough, fa della Repubblica Ceca il quarto operatore dopo Brasile, Portogallo e Ungheria, con Paesi Bassi, Austria, Svezia e Slovacchia in coda; gli accordi sui dispositivi di addestramento per la Svezia (sviluppati con la tedesca Rheinmetall) e per l'Austria, il memorandum con Anduril per integrare il missile da crociera Barracuda-500M e quello di febbraio con Northrop Grumman rivolto all'US Air Force completano il quadro." },
  { p: "Fiducia: Saab ed Embraer hanno firmato un accordo per la potenziale produzione di 20 caccia Gripen aggiuntivi a Gavião Peixoto — con Embraer responsabile dell'assemblaggio, a complemento della linea Saab di Linköping, per servire la domanda globale. Quando il Brasile scelse il Gripen nel 2014, la tecnologia fluiva verso il Brasile come obbligo di offset; dodici anni e un programma di formazione dopo (ingegneri e tecnici qualificati in teoria e pratica, anche in Svezia), lo stabilimento dell'allievo è diventato la fabbrica di sfogo per il mercato mondiale. Nell'aerospazio nessuna capacità è custodita più gelosamente della linea di produzione di un caccia. La Svezia ha appena consegnato le chiavi al Brasile." },

  { h: "X. La lettura di corridoio" },
  { p: "Per l'industria europea — e in particolare per quella italiana — le implicazioni corrono in entrambe le direzioni." },
  { p: "A monte, non è un'opportunità ipotetica: i fornitori europei sono già dentro l'aereo. La francese Latecoere costruisce le porte passeggeri e di emergenza dell'E2; la spagnola Aernnova produce impennaggi e fusoliera anteriore, e nel 2022 ha acquisito i due stabilimenti aerostrutturali di Embraer a Évora, in Portogallo, con un accordo di fornitura di lungo periodo; la tedesca Liebherr fornisce i sistemi di comando di flap e slat. Un'Embraer che punta a oltre 110 consegne commerciali l'anno, con i servizi in crescita dell'8% a trimestre, è un motore di approvvigionamento in espansione — e un terzo OEM su scala diversifica la base clienti oltre il duopolio che oggi detta le condizioni ai fornitori." },
  { p: "A valle, le compagnie di bandiera europee stanno già votando la tesi della domanda con i widebody — Iberia definisce l'America Latina un mercato non ancora maturo, ITA Airways aggiunge Caracas, Lima e Santiago, e l'Atlantico del Sud è tra le rotte più redditizie per le major del continente — mentre l'estensione dell'autonomia dell'E2 riscrive in silenzio l'economia delle rotte proprio sulle coppie di città secondarie da cui i corridoi intercontinentali dipendono per il feed. Un segmento nato per collegare con profitto città piccole e medie non è una curiosità brasiliana: è lo strato infrastrutturale mancante di ogni dossier di connettività \"di secondo livello\", in Europa come in Sudamerica." },
  { p: "E c'è un terzo flusso, più recente degli altri due: il metodo che si muove in senso inverso. Le strategie industriali europee hanno passato un decennio a discutere quanta tecnologia trasferire verso i mercati emergenti. L'accordo Saab, la partnership Toyota, la consegna NATO in venti mesi — e un muro tariffario americano che continua a ricostruirsi attorno alla stessa porta a forma di Brasile — puntano tutti alla domanda migliore: che cosa ha da guadagnare l'industria europea dai metodi che ora fluiscono da quei mercati?" },

  { h: "XI. Cinquantasette anni, un metodo" },
  { p: "Ozires Silva ha compiuto 95 anni a gennaio. L'ingegnere che guidò trecento persone sul Bandeirante, e per il quale lo Stato creò un'azienda nel 1969, ha vissuto abbastanza da vedere la settimana in cui il suo metodo ha assemblato un caccia europeo per il mercato mondiale, ha retto un portafoglio ordini di 34,5 miliardi di dollari ed è rimasto esente — per la terza volta in un anno — dal ciclo commerciale più protezionista della storia americana moderna. A dicembre l'Associazione Italiana di Aeronautica e Astronautica gli ha conferito a Torino la Medaglia Giuseppe Gabrielli — l'aerospazio italiano che onora l'uomo che ha dimostrato la tesi su cui questa serie continua a tornare: gli asset che attraversano i confini con più profitto non sono i prodotti, ma i metodi. I metodi maturano più lentamente delle commodity. Ma capitalizzano." },
];

export default function EmbraerIT() {
  const { lang } = useT();
  const article = getArticleBySlug("Embraer");
  const desc =
    "Embraer 2026: come un'azienda brasiliana ha conquistato il 76% del segmento 70–150 posti, un portafoglio ordini di 34,5 miliardi di dollari e un metodo che continua a superare i muri tariffari americani.";
  useCanonical("/Embraer_IT", {
    title: `${article?.title.it ?? "Embraer"} — Business Matching Global`,
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
          <LangSwitcher to="/Embraer" />
        </div>
        <article className="prose-invert">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4">
            {article?.title.it}
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
          <ShareBlock title={article?.title.it ?? "Embraer"} />
        </article>
        <AnalysisFooter />
      </div>
    </main>
  );
}
