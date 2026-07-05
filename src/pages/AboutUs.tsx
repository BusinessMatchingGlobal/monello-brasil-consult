import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

type Block =
  | { type: "h2"; text: string }
  | { type: "p"; text: string };

const blocks: Block[] = [
  { type: "h2", text: "Scientia potentia est — “Sapere è potere”" },
  { type: "p", text: "L'intuizione attribuita a Francis Bacon oltre quattro secoli fa resta, oggi più che mai, attuale: sapere è potere. Ma nel mondo dell'internazionalizzazione non basta avere accesso alle informazioni. Occorre saperle cercare, selezionare, aggiornare e interpretare correttamente." },
  { type: "p", text: "Noi crediamo che l'accesso a informazioni affidabili — comprese quelle di cui non sapevate di aver bisogno — e la capacità di trasformarle in decisioni operative possano fare la differenza tra una strategia solida e un errore costoso." },
  { type: "p", text: "Questo è il cuore del nostro lavoro: fornire informazioni affidabili, contestualizzarle e aiutarvi a interpretarle nel modo corretto, prima che una scelta sbagliata diventi un costo." },

  { type: "h2", text: "Il Custo Brasil: da costo occulto a variabile strategica" },
  { type: "p", text: "Operare in Brasile significa confrontarsi con un sistema complesso, spesso difficile da leggere dall'esterno. Uno degli elementi più importanti da comprendere è il cosiddetto Custo Brasil: l'insieme di inefficienze burocratiche, fiscali, logistiche, infrastrutturali e amministrative che possono incidere in modo significativo sui costi reali di ingresso e sviluppo nel mercato brasiliano." },
  { type: "p", text: "Molte aziende lo scoprono troppo tardi, quando ha già iniziato a erodere i margini. Altre, al contrario, lo sovrastimano e rinunciano a opportunità reali per paura di un mercato percepito come troppo difficile." },
  { type: "p", text: "La verità è che il Custo Brasil non va né ignorato né temuto in modo generico: va misurato, compreso e gestito. In alcuni casi, se correttamente interpretato, può perfino trasformarsi in un vantaggio competitivo. Chi conosce meglio le complessità del sistema può infatti individuare soluzioni, territori, partner e percorsi che altri non vedono." },

  { type: "h2", text: "L'arcipelago Brasile" },
  { type: "p", text: "Il secondo errore, ancora più comune, è trattare il Brasile come un unico mercato. Non lo è." },
  { type: "p", text: "Il Brasile è un continente economico composto da una pluralità di mercati locali, settoriali e territoriali. È un arcipelago di mini-mercati, ciascuno con caratteristiche, costi, incentivi, abitudini di consumo, reti logistiche e interlocutori differenti." },
  { type: "p", text: "Incentivi e agevolazioni fiscali possono variare da Stato a Stato, e in alcuni casi perfino da Comune a Comune. La scelta del territorio in cui entrare, produrre, distribuire o cercare partner può fare la differenza tra un progetto sostenibile e un progetto destinato a fallire." },
  { type: "p", text: "Per questo non basta chiedersi se un prodotto possa funzionare \"in Brasile\". La domanda corretta è: dove, con chi, a quali condizioni, con quale struttura di costi e con quali vantaggi competitivi?" },
  { type: "p", text: "Il nostro lavoro consiste proprio nell'aiutarvi a leggere questo arcipelago: individuare i territori più adatti, i partner più affidabili, le opportunità meno visibili e i rischi da anticipare." },

  { type: "h2", text: "In entrambe le direzioni" },
  { type: "p", text: "Operiamo tra Europa, Brasile e Mercosur in entrambe le direzioni." },
  { type: "p", text: "Accompagniamo le aziende europee che vogliono entrare o crescere in Brasile e in Sud America. Allo stesso tempo, supportiamo aziende brasiliane e sudamericane che intendono approdare, strutturarsi e svilupparsi in Europa." },
  { type: "p", text: "Perché conoscere due mondi significa saper fare da ponte, non limitarsi a fare da guida." },
  { type: "p", text: "Il nostro lavoro si gioca su due fronti: da un lato, identificare le opportunità che i dati aggregati spesso non mostrano — il mini-mercato giusto, il partner affidabile, la finestra aperta da un cambiamento normativo o commerciale; dall'altro, anticipare i problemi prima che diventino costi." },
  { type: "p", text: "Vedere le opportunità prima dei concorrenti. Vedere i problemi prima che costino." },

  { type: "h2", text: "Perché ora: il nuovo scenario UE-Mercosur" },
  { type: "p", text: "Il quadro delle relazioni commerciali tra Unione Europea e Mercosur sta entrando in una fase di profonda trasformazione. Dazi, barriere, regole di accesso, standard tecnici e opportunità di scambio sono destinati a cambiare il modo in cui molte imprese europee e sudamericane guardano ai rispettivi mercati." },
  { type: "p", text: "In questo scenario, muoversi con le informazioni giuste può significare costruire un vantaggio competitivo difficile da recuperare per chi arriverà dopo." },
  { type: "p", text: "Le opportunità non riguardano solo le grandi imprese. Possono interessare anche PMI, produttori specializzati, filiere agroalimentari, aziende industriali, servizi professionali, tecnologia, logistica, sostenibilità e progetti di partnership tra operatori europei e brasiliani." },
  { type: "p", text: "Ma ogni opportunità va letta dentro il suo contesto. Un accordo commerciale può aprire porte, ma non sostituisce la conoscenza del territorio, delle regole, delle prassi locali e degli interlocutori giusti." },

  { type: "h2", text: "Chi c'è dietro: metodo, non improvvisazione" },
  { type: "p", text: "Il fondatore, Enzo Aldo Stobbione, è laureato in Scienze Politiche, indirizzo politico-internazionale, all'Università degli Studi di Torino. Ha inoltre conseguito un Master in Economia e Relazioni Internazionali presso ASERI — Alta Scuola di Economia e Relazioni Internazionali dell'Università Cattolica del Sacro Cuore di Milano — e un Master in Strategie Integrate per la Sostenibilità e la Transizione Ecologica presso l'Università del Piemonte Orientale." },
  { type: "p", text: "Da diversi anni risiede a Belo Horizonte, capitale del Minas Gerais, nel cuore del Sud-Est brasiliano: l'area che, insieme a San Paolo e Rio de Janeiro, concentra una parte rilevante del PIL, dell'industria, della finanza e dell'innovazione del Paese." },
  { type: "p", text: "Belo Horizonte non è soltanto una grande capitale economica regionale. È anche la casa della San Pedro Valley, uno degli ecosistemi startup più dinamici del Brasile: un segnale importante di un tessuto produttivo che non è fatto solo di industria, finanza e commercio, ma anche di tecnologia, innovazione e nuova imprenditorialità." },
  { type: "p", text: "Non un osservatorio a distanza, quindi, ma una presenza diretta nel cuore economico del Brasile." },
  { type: "p", text: "Siamo soci della Camera di Commercio Italiana di Minas Gerais e dell'Associazione Export Strategist." },

  { type: "h2", text: "Finanza agevolata: le risorse per partire" },
  { type: "p", text: "Una strategia di internazionalizzazione richiede visione, informazioni corrette e partner affidabili. Ma richiede anche risorse." },
  { type: "p", text: "In qualità di EU Project Management Specialist formato presso CEIPIEMONTE — Centro Estero per l'Internazionalizzazione del Piemonte — siamo in grado di individuare le misure di finanza agevolata più adatte a sostenere progetti di internazionalizzazione, sviluppo commerciale, partnership e ingresso in nuovi mercati." },
  { type: "p", text: "Questo vale sia per la singola impresa, sia per progetti costruiti in partenariato con altre aziende italiane ed europee." },
  { type: "p", text: "L'operatività in Italia e in altri Paesi dell'Unione Europea, con particolare attenzione anche alla Repubblica di Croazia, consente inoltre di ragionare su strategie più ampie, capaci di collegare competenze, territori, fondi e opportunità in una logica europea." },

  { type: "h2", text: "Un metodo, una rete" },
  { type: "p", text: "Nessun consulente, da solo, può sostituire una rete di specialisti." },
  { type: "p", text: "Per questo lavoriamo con un network selezionato di professionisti in Europa e in Brasile: legali d'impresa, tributaristi, specialisti doganali, esperti di logistica, fiscalità, contrattualistica, incentivi e operazioni internazionali." },
  { type: "p", text: "Per ogni progetto attiviamo le competenze giuste al momento giusto. Il nostro ruolo è coordinare il processo, porre le domande corrette, selezionare le informazioni rilevanti e costruire una risposta completa, aggiornata e operativa." },
  { type: "p", text: "Per voi, un solo interlocutore che coordina il lavoro e risponde del risultato. Dietro, una rete di specialisti che consente di affrontare ogni progetto con metodo, competenza e profondità." },

  { type: "h2", text: "Parliamone" },
  { type: "p", text: "Ogni progetto di internazionalizzazione di successo — che si tratti di import-export, soft landing, ricerca partner, analisi di mercato o sviluppo commerciale — inizia con le domande giuste." },
  { type: "p", text: "Sottoponeteci i vostri quesiti, i vostri dubbi e le vostre esigenze. Vi aiuteremo a trasformarli in un percorso concreto, basato su informazioni affidabili, risposte chiare e decisioni ben ponderate." },
  { type: "p", text: "E per restare aggiornati su costi occulti, incentivi, rischi e opportunità del mercato brasiliano, consultate e iscrivetevi alla nostra newsletter \"Custo Brasil\" sulla nostra pagina LinkedIn: analisi pratiche, senza giri di parole, direttamente dal cuore del Brasile." },
  { type: "p", text: "Perché sapere è potere. Ma saper interpretare correttamente ciò che si sa è il vero vantaggio competitivo." },
];

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container max-w-3xl py-16 md:py-24">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-10"
        >
          <ArrowLeft className="h-4 w-4" /> Torna alla home
        </Link>
        <h1 className="font-display text-4xl md:text-5xl leading-tight mb-4">
          Chi siamo
        </h1>
        <p className="text-muted-foreground text-lg mb-12">
          Un ponte tra Unione Europea e Brasile.
        </p>
        <article className="space-y-6">
          {blocks.map((b, i) =>
            b.type === "h2" ? (
              <h2
                key={i}
                className="font-display text-2xl md:text-3xl mt-10 mb-2 text-foreground"
              >
                {b.text}
              </h2>
            ) : (
              <p
                key={i}
                className="text-base md:text-lg leading-relaxed text-muted-foreground text-justify"
              >
                {b.text}
              </p>
            )
          )}
        </article>
      </div>
    </div>
  );
}