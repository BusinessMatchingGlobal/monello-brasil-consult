import { useEffect } from "react";
import { useT } from "@/lib/i18n";
import { useCanonical } from "@/lib/useCanonical";
import { Nav } from "./AboutUs";

type Block =
  | { type: "h2"; text: string }
  | { type: "p"; text: string; italic?: boolean }
  | { type: "ul"; items: string[] };

const EMAIL = "info@businessmatching.global";

const blocks: Block[] = [
  { type: "h2", text: "La fiducia come principio di lavoro" },
  { type: "p", text: "Business Matching Global (di seguito \"BMG\") mette in relazione imprese, investitori, istituzioni e professionisti appartenenti a mercati e culture differenti." },
  { type: "p", text: "La fiducia è il presupposto di ogni relazione che contribuiamo a creare. Per questo operiamo secondo principi di legalità, indipendenza, competenza, riservatezza e trasparenza." },
  { type: "p", text: "Il presente Codice non è soltanto una dichiarazione di valori. È uno strumento che orienta le nostre decisioni, definisce il comportamento che clienti e partner possono attendersi da BMG e stabilisce i criteri con cui valutiamo incarichi, contatti e opportunità." },
  { type: "p", text: "Il Codice si ispira alle migliori pratiche internazionali in materia di consulenza professionale, commercio responsabile, prevenzione della corruzione e condotta d'impresa." },

  { type: "h2", text: "Natura volontaria del Codice" },
  { type: "p", text: "BMG adotta questo Codice su base volontaria. Nessuna norma ci obbliga a farlo: è una scelta autonoma, coerente con la natura del nostro lavoro, dove la qualità di una relazione professionale dipende dalla fiducia più che da un obbligo formale." },
  { type: "p", text: "Volontaria è l'adozione, non l'applicazione. Una volta assunti, questi principi vincolano il nostro operato e costituiscono il criterio con cui accettiamo di essere valutati." },

  { type: "h2", text: "1. Ambito di applicazione" },
  { type: "p", text: "Il Codice si applica a chiunque operi in nome o per conto di BMG, inclusi amministratori, collaboratori, consulenti, rappresentanti e partner coinvolti nello svolgimento di un incarico." },
  { type: "p", text: "Quando selezioniamo fornitori, consulenti o partner locali, valutiamo anche la loro affidabilità professionale e la compatibilità del loro comportamento con i principi qui indicati. Le attività affidate a terzi nell'ambito di un incarico sono concordate preventivamente con il cliente, e chi le svolge per nostro conto è tenuto al rispetto dei medesimi principi." },
  { type: "p", text: "Nessuna opportunità commerciale può giustificare una deroga ai principi di legalità, integrità e rispetto delle persone." },

  { type: "h2", text: "2. Competenza e responsabilità professionale" },
  { type: "p", text: "Accettiamo esclusivamente incarichi per i quali disponiamo delle competenze e delle risorse necessarie. Siamo aperti e veritieri riguardo alle nostre qualifiche, alla nostra esperienza e ai limiti di ciò che possiamo offrire." },
  { type: "p", text: "Quando un progetto richiede conoscenze legali, fiscali, doganali, finanziarie, regolatorie o tecniche specialistiche, ne informiamo il cliente e, se necessario, favoriamo il coinvolgimento di professionisti qualificati." },
  { type: "p", text: "Manteniamo aggiornate le nostre conoscenze sui mercati, sulle normative e sulle pratiche del commercio internazionale." },
  { type: "p", text: "Siamo responsabili del lavoro che svolgiamo. Se individuiamo un errore rilevante nelle informazioni o nelle valutazioni fornite, ci impegniamo a comunicarlo e correggerlo tempestivamente." },

  { type: "h2", text: "3. Chiarezza degli incarichi e aspettative realistiche" },
  { type: "p", text: "Prima di iniziare un'attività definiamo con il cliente:" },
  { type: "ul", items: [
    "gli obiettivi dell'incarico;",
    "le attività comprese ed escluse;",
    "i risultati ragionevolmente attesi;",
    "i tempi e le responsabilità delle parti;",
    "i compensi, le commissioni e le eventuali success fee.",
  ]},
  { type: "p", text: "Manteniamo il cliente informato sull'andamento dell'incarico, comprese le difficoltà e gli elementi che possano modificarne le prospettive." },
  { type: "p", text: "Non promettiamo risultati che dipendono da decisioni di terzi, autorizzazioni pubbliche, condizioni di mercato o trattative tra soggetti indipendenti. Ci asteniamo dall'alimentare aspettative irrealistiche, anche quando ciò renderebbe più agevole ottenere un incarico." },
  { type: "p", text: "Il nostro impegno consiste nel mettere a disposizione competenze, informazioni, metodo e relazioni professionali. Non garantiamo la conclusione di un contratto o il successo commerciale di un'operazione." },

  { type: "h2", text: "4. Qualità delle informazioni" },
  { type: "p", text: "Utilizziamo fonti che riteniamo attendibili e adottiamo un livello di verifica proporzionato alla natura dell'incarico." },
  { type: "p", text: "Distinguiamo chiaramente tra:" },
  { type: "ul", items: [
    "informazioni confermate;",
    "dati provenienti da fonti pubbliche o da terzi;",
    "valutazioni professionali;",
    "ipotesi e proiezioni;",
    "informazioni che richiedono ulteriori verifiche.",
  ]},
  { type: "p", text: "Non alteriamo dati, qualifiche, referenze o prospettive commerciali per rendere un'opportunità più attraente." },
  { type: "p", text: "Le informazioni vengono presentate nel loro contesto, segnalando eventuali limiti, incertezze o elementi che potrebbero modificare la valutazione del cliente." },

  { type: "h2", text: "5. Business matching responsabile" },
  { type: "p", text: "Un contatto professionale ha valore soltanto quando è pertinente, contestualizzato e presentato con trasparenza." },
  { type: "p", text: "BMG si impegna a:" },
  { type: "ul", items: [
    "individuare interlocutori coerenti con gli obiettivi dell'incarico;",
    "verificare, per quanto ragionevolmente possibile, l'identità, il ruolo e la pertinenza dei contatti;",
    "dichiarare sempre per conto di chi stiamo operando e con quale mandato, senza attribuirci incarichi che non abbiamo ricevuto;",
    "non rappresentare come confermato un interesse che non sia stato effettivamente manifestato;",
    "non creare false aspettative sulle intenzioni o sulla capacità decisionale di una controparte;",
    "rispettare la volontà e la riservatezza delle persone coinvolte;",
    "evitare modalità di contatto ingannevoli, invasive o contrarie alla normativa applicabile.",
  ]},
  { type: "p", text: "Quando presentiamo un'opportunità a terzi, non riveliamo l'identità del soggetto rappresentato senza la sua autorizzazione: la presentazione preliminare avviene in forma anonima, e l'identità viene comunicata soltanto a fronte di un impegno di riservatezza." },
  { type: "p", text: "Non utilizziamo relazioni personali o istituzionali per esercitare pressioni improprie. Il nostro ruolo è facilitare conoscenza, dialogo e valutazione reciproca, lasciando alle parti piena autonomia nelle decisioni." },

  { type: "h2", text: "6. Due diligence e selezione delle controparti" },
  { type: "p", text: "Prima di presentare una controparte possiamo effettuare controlli preliminari e proporzionati sull'identità, sull'attività, sulla reputazione e sulla coerenza dell'opportunità proposta." },
  { type: "p", text: "Queste verifiche non sostituiscono una due diligence legale, fiscale, finanziaria, tecnica, regolatoria o reputazionale completa." },
  { type: "p", text: "Ciascuna parte rimane responsabile delle verifiche necessarie prima di sottoscrivere contratti, effettuare investimenti, trasferire somme o assumere altri impegni vincolanti." },
  { type: "p", text: "Non favoriamo consapevolmente relazioni con soggetti coinvolti in frodi, corruzione, riciclaggio, violazioni dei diritti umani, evasione delle sanzioni internazionali o altre attività illecite." },
  { type: "p", text: "Quando emergono elementi rilevanti che potrebbero compromettere la legalità o l'affidabilità di un'operazione, ci riserviamo di sospendere le attività, chiedere ulteriori verifiche o rinunciare all'incarico." },

  { type: "h2", text: "7. Indipendenza e conflitti d'interesse" },
  { type: "p", text: "Agiamo con obiettività e indipendenza di giudizio." },
  { type: "p", text: "Comunichiamo qualsiasi interesse personale, professionale o economico che possa influenzare, o apparire in grado di influenzare, la nostra imparzialità." },
  { type: "p", text: "Non rappresentiamo simultaneamente parti contrapposte nella medesima operazione." },
  { type: "p", text: "Non accettiamo compensi occulti, commissioni non dichiarate o vantaggi personali da controparti, intermediari o fornitori." },
  { type: "p", text: "L'eventuale remunerazione di BMG da parte di più soggetti coinvolti nella stessa operazione deve essere preventivamente comunicata e accettata dalle parti interessate." },
  { type: "p", text: "Quando un conflitto emerge nel corso di un incarico, a seconda delle circostanze provvediamo a rimuoverne la causa, oppure lo dichiariamo alle parti ottenendone per iscritto l'accordo a proseguire, oppure rinunciamo all'incarico." },
  { type: "p", text: "Non traiamo vantaggio personale da informazioni privilegiate acquisite nel corso di un incarico, né consentiamo che altri lo facciano. Non proponiamo ai collaboratori di un cliente altre opportunità professionali senza il suo consenso." },

  { type: "h2", text: "8. Prevenzione della corruzione" },
  { type: "p", text: "BMG non tollera alcuna forma di corruzione, pagamento illecito, concussione, estorsione o scambio improprio di favori. Ci ispiriamo ai principi affermati in materia dalle convenzioni internazionali e dalle raccomandazioni OCSE." },
  { type: "p", text: "È vietato offrire, promettere, richiedere o accettare denaro, regali, commissioni, benefici o altre utilità con lo scopo di influenzare impropriamente una decisione commerciale, professionale o istituzionale." },
  { type: "p", text: "Questo principio si applica sia nei rapporti con soggetti pubblici sia nelle relazioni tra imprese private." },
  { type: "p", text: "Omaggi e forme di cortesia sono ammessi esclusivamente quando risultano leciti, occasionali, trasparenti, di valore contenuto e non idonei a creare obblighi o condizionamenti." },
  { type: "p", text: "Gli stessi principi devono essere rispettati da agenti, consulenti e partner che operano per nostro conto. Una violazione può comportare la sospensione o l'interruzione immediata della collaborazione." },

  { type: "h2", text: "9. Riservatezza, dati e proprietà intellettuale" },
  { type: "p", text: "Proteggiamo le informazioni riservate ricevute da clienti, partner e controparti e le utilizziamo esclusivamente per gli scopi concordati." },
  { type: "p", text: "La riservatezza si applica dal primo contatto, anche in assenza di un accordo formale e anche quando il contatto non si traduce in un incarico. Vale nei confronti di qualunque fonte e prosegue oltre la conclusione del rapporto professionale." },
  { type: "p", text: "Non divulghiamo senza autorizzazione:" },
  { type: "ul", items: [
    "strategie e documenti aziendali;",
    "informazioni economiche o commerciali;",
    "nominativi e dati di contatto non pubblici;",
    "condizioni contrattuali;",
    "analisi, ricerche e materiali riservati;",
    "informazioni personali o professionali ottenute durante un incarico.",
  ]},
  { type: "p", text: "Non utilizziamo per finalità editoriali, divulgative o di analisi pubblica informazioni ricevute in via confidenziale." },
  { type: "p", text: "Il trattamento dei dati personali avviene secondo criteri di legalità, necessità, proporzionalità e sicurezza." },
  { type: "p", text: "Rispettiamo i diritti d'autore, i marchi, i brevetti, il know-how e ogni altra forma di proprietà intellettuale. Non utilizziamo o attribuiamo a BMG contenuti di terzi senza averne titolo o senza indicarne correttamente la provenienza." },
  { type: "p", text: "Consideriamo il know-how industriale — processi, formulazioni, parametri, soluzioni tecniche — il bene più esposto di un'impresa. Non lo descriviamo né lo mettiamo a disposizione di terzi nelle fasi preliminari di un'operazione, e raccomandiamo che ogni trasferimento di competenze tecniche avvenga soltanto dopo la definizione e la sottoscrizione della struttura contrattuale." },

  { type: "h2", text: "10. Uso responsabile dell'intelligenza artificiale" },
  { type: "p", text: "BMG può utilizzare strumenti digitali e sistemi di intelligenza artificiale per supportare attività di ricerca, organizzazione, analisi e produzione di contenuti." },
  { type: "p", text: "Il loro utilizzo deve rispettare i principi di riservatezza, protezione dei dati, accuratezza e controllo umano." },
  { type: "p", text: "Non consideriamo automaticamente attendibile un contenuto generato da un sistema di intelligenza artificiale. Le informazioni rilevanti vengono sottoposte a valutazione professionale e, quando necessario, verificate attraverso fonti indipendenti." },
  { type: "p", text: "Non inseriamo informazioni riservate dei clienti in strumenti non autorizzati o privi di adeguate garanzie." },
  { type: "p", text: "L'intelligenza artificiale può supportare il nostro lavoro, ma non sostituisce il giudizio professionale, la responsabilità personale o la verifica umana." },

  { type: "h2", text: "11. Rispetto delle persone e commercio responsabile" },
  { type: "p", text: "Promuoviamo rapporti fondati sulla dignità, sull'ascolto e sul rispetto delle differenze culturali." },
  { type: "p", text: "Non tolleriamo discriminazioni basate su nazionalità, origine etnica, genere, identità personale, orientamento sessuale, religione, età, disabilità, condizione sociale o opinioni politiche." },
  { type: "p", text: "Non sosteniamo attività che comportino lavoro forzato, lavoro minorile, sfruttamento, condizioni di lavoro pericolose o violazioni dei diritti fondamentali." },
  { type: "p", text: "Consideriamo, quando pertinenti, gli effetti ambientali e sociali delle opportunità che contribuiamo a sviluppare. Favoriamo progetti capaci di generare valore economico duraturo, trasferimento di competenze, innovazione, occupazione qualificata e sviluppo responsabile dei territori." },
  { type: "p", text: "Non utilizziamo affermazioni ambientali o sociali non dimostrate e rifiutiamo ogni forma di greenwashing." },

  { type: "h2", text: "12. Comunicazione corretta e trasparente" },
  { type: "p", text: "Le comunicazioni di BMG devono essere accurate, riconoscibili e rispettose." },
  { type: "p", text: "Non diffondiamo informazioni ingannevoli, testimonianze non autentiche o dichiarazioni suscettibili di danneggiare ingiustamente la reputazione di persone e organizzazioni." },
  { type: "p", text: "L'utilizzo pubblico di nomi, marchi, loghi, casi aziendali o riferimenti a clienti e partner richiede la preventiva autorizzazione degli interessati." },
  { type: "p", text: "Le comunicazioni editoriali e le analisi di mercato devono distinguere chiaramente i contenuti informativi dalle attività promozionali o commerciali. La nostra attività di analisi è tecnica e indipendente: non svolgiamo attività di rappresentanza di interessi presso soggetti pubblici e non assumiamo posizioni di parte nel dibattito politico dei Paesi in cui operiamo." },

  { type: "h2", text: "13. Segnalazioni e richieste di chiarimento" },
  { type: "p", text: "Clienti, partner, collaboratori e altre parti interessate possono chiedere chiarimenti sul presente Codice o segnalare comportamenti ritenuti incompatibili con i suoi principi scrivendo a:" },
  { type: "p", text: EMAIL },
  { type: "p", text: "Le segnalazioni effettuate in buona fede vengono esaminate con serietà, imparzialità e riservatezza." },
  { type: "p", text: "BMG non ammette ritorsioni nei confronti di chi segnala, in buona fede, una possibile violazione." },

  { type: "h2", text: "14. Applicazione e aggiornamento" },
  { type: "p", text: "Il rispetto del presente Codice costituisce parte essenziale del modo di operare di BMG." },
  { type: "p", text: "In caso di violazione possiamo adottare misure proporzionate alla gravità del comportamento, inclusa la richiesta di correzione, la sospensione dell'attività o l'interruzione del rapporto professionale." },
  { type: "p", text: "Il presente Codice ha natura di impegno volontario e si affianca, senza sostituirli, agli obblighi derivanti da contratti, mandati, accordi di riservatezza e dalla normativa applicabile, che restano in ogni caso prevalenti." },
  { type: "p", text: "Il Codice viene riesaminato periodicamente per mantenerlo coerente con l'evoluzione delle nostre attività, delle tecnologie utilizzate e delle normative applicabili." },
  { type: "p", text: "Versione in vigore dal 1º agosto 2026." },
  { type: "p", text: "Business Matching Global — Dal primo insight al primo affare.", italic: true },
];

export default function Ethics() {
  const { lang } = useT();
  const seo =
    lang === "en"
      ? { title: "Code of Ethics | Business Matching Global", description: "BMG's voluntary Code of Ethics and Professional Conduct: legality, independence, confidentiality and transparency (Italian text)." }
      : lang === "pt"
      ? { title: "Código de Ética | Business Matching Global", description: "Código de Ética e Conduta Profissional da BMG: legalidade, independência, confidencialidade e transparência (texto em italiano)." }
      : { title: "Codice Etico | Business Matching Global", description: "Codice Etico e di Condotta Professionale di BMG: legalità, indipendenza, competenza, riservatezza e trasparenza." };
  useCanonical("/ethics", seo);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <div className="container max-w-3xl pt-32 md:pt-40 pb-16 md:pb-24">
        <h1 className="font-display text-4xl md:text-5xl leading-tight mb-6">
          Codice Etico e di Condotta Professionale
        </h1>
        <article className="space-y-6">
          {blocks.map((b, i) =>
            b.type === "h2" ? (
              <h2 key={i} className="font-display text-2xl md:text-3xl mt-10 mb-2 text-foreground">
                {b.text}
              </h2>
            ) : b.type === "ul" ? (
              <ul key={i} className="list-disc pl-6 space-y-2 text-base md:text-lg leading-relaxed text-muted-foreground">
                {b.items.map((it, j) => (
                  <li key={j}>{it}</li>
                ))}
              </ul>
            ) : b.text === EMAIL ? (
              <p key={i} className="text-base md:text-lg leading-relaxed">
                <a href={`mailto:${EMAIL}`} className="text-primary underline hover:text-primary/80 transition-colors">
                  {EMAIL}
                </a>
              </p>
            ) : (
              <p
                key={i}
                className={`text-base md:text-lg leading-relaxed text-muted-foreground text-justify${b.italic ? " italic" : ""}`}
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
