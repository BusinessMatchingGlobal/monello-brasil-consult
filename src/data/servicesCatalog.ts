export type ServiceItem = {
  name: string;
  tagline: string;
  bullets: string[];
  audience: string[];
  examples?: string;
  price: string;
};

export type ServiceGroup = {
  num: string;
  label: string;
  note?: string;
  items: ServiceItem[];
};

export const servicesIntro = {
  title: "I nostri servizi",
  intro:
    "Dal controllo di una singola azienda al progetto completo di ingresso nel mercato. Ogni servizio ha un perimetro chiaro, un prezzo di partenza e tempi di consegna indicativi. Inizia da dove ti serve.",
  markets: "Mercati principali: Brasile · Italia · Unione Europea · America Latina",
  more: "Scopri di più",
  request: "Richiedi",
  forWhom: "A chi serve:",
};

export const serviceGroups: ServiceGroup[] = [
  {
    num: "01",
    label: "Rispondi a una domanda",
    items: [
      {
        name: "Ask Brazil / Ask Europe",
        tagline: "Una domanda commerciale su un mercato estero, una risposta documentata.",
        bullets: [
          "Risposta scritta di 1–2 pagine con fonti",
          "Mercato, concorrenti, distribuzione, import/export o altra informazione business",
          "Consegna normalmente in 48–72 ore",
          "Una domanda per incarico, perimetro definito",
        ],
        audience: [
          "All'azienda che valuta un mercato ma non è ancora pronta per un'analisi completa",
          "All'export manager che deve dare una risposta puntuale alla direzione",
          "A chi ha ricevuto una proposta dall'estero e vuole inquadrarla prima di rispondere",
          "Al professionista — commercialista, avvocato, consulente — con un cliente attivo tra Europa e Brasile",
        ],
        examples:
          'Esempi di domande: "Chi sono i principali importatori del mio prodotto in Brasile?" · "Che dazi e imposte paga il mio prodotto all\'ingresso?" · "Questo settore richiede registrazioni o licenze?" · "Come si vende, di solito, questo prodotto in quel mercato?"',
        price: "a partire da 79 €",
      },
    ],
  },
  {
    num: "02",
    label: "Verifica",
    items: [
      {
        name: "Company Check",
        tagline: "Chi è questa azienda?",
        bullets: [
          "Esistenza e stato di registrazione dell'azienda",
          "Proprietà, amministratori e informazioni di base",
          "Reputazione e segnali di rischio pubblici",
          "Sintesi finale con indicazione chiara del livello di rischio",
        ],
        audience: [
          "A chi ha ricevuto un ordine o una richiesta da un'azienda che non conosce",
          "A chi sta per inviare il primo preventivo, listino o campionario",
          "A chi ha conosciuto l'interlocutore in fiera o online e vuole sapere se è reale",
          "A chi deve decidere se una trattativa merita il suo tempo",
        ],
        price: "a partire da 150 € — consegna normalmente in 2–3 giorni",
      },
      {
        name: "Supplier Check",
        tagline: "Conosci meglio il fornitore prima di affidargli il tuo ordine.",
        bullets: [
          "Tutto quanto incluso nel Company Check",
          "Prodotti e certificazioni reperibili",
          "Informazioni disponibili su struttura e capacità produttiva",
          "Presenza commerciale e principali elementi di attenzione",
        ],
        audience: [
          "A chi sta per fare il primo ordine o versare un anticipo a un fornitore mai testato",
          "A chi ha trovato il fornitore online o in fiera e non lo ha mai visitato",
          "A chi deve scegliere tra più fornitori candidati",
          "All'importatore che non può permettersi il container sbagliato",
        ],
        price: "a partire da 190 € — consegna normalmente in 3–4 giorni",
      },
      {
        name: "Business Due Diligence",
        tagline: "Quali rischi devo conoscere prima di impegnarmi?",
        bullets: [
          "Struttura societaria, proprietà e amministratori",
          "Attività, presenza commerciale e reputazione",
          "Contenziosi e criticità pubblicamente reperibili",
          "Verifica della coerenza delle informazioni dichiarate",
          "Executive summary con principali red flags",
        ],
        audience: [
          "A chi sta per firmare un contratto di fornitura, distribuzione o agenzia",
          "A chi valuta di concedere esclusiva territoriale o pagamento dilazionato",
          "A chi ha notato incongruenze nelle informazioni ricevute e vuole vederci chiaro",
          "A chi deve presentare la controparte a soci, banca o consiglio di amministrazione",
        ],
        price: "a partire da 350 € — consegna normalmente in 5–7 giorni",
      },
      {
        name: "Enhanced Due Diligence",
        tagline: "L'operazione è importante: approfondiamo.",
        bullets: [
          "Tutto quanto incluso nella Business Due Diligence",
          "Approfondimenti mirati sull'operazione specifica",
          "Coinvolgimento di professionisti locali quando servono verifiche legali, fiscali o documentali",
          "Report esteso e sessione di restituzione",
        ],
        audience: [
          "A chi prepara una joint venture, una partnership societaria o un investimento",
          "A chi sta per chiudere un contratto pluriennale o di importo rilevante",
          "A chi entra in un'operazione che richiederà verifiche legali, fiscali o documentali locali",
          "A chi deve soddisfare obblighi interni di compliance prima di firmare",
        ],
        price: "a partire da 750 € — consegna normalmente in 2–3 settimane",
      },
    ],
  },
  {
    num: "03",
    label: "Valuta il mercato",
    items: [
      {
        name: "Competitor Snapshot",
        tagline: "Chi c'è già nel mercato che vuoi raggiungere.",
        bullets: [
          "Principali concorrenti nel mercato target",
          "Prodotti, posizionamento e canali commerciali",
          "Prezzi indicativi dove reperibili",
          "Sintesi comparativa",
        ],
        audience: [
          "A chi deve decidere posizionamento e prezzo prima di proporsi",
          'A chi si è sentito dire "c\'è già chi lo fa" e vuole capire quanto è vero',
          "A chi prepara una fiera o una missione e vuole arrivare conoscendo i player",
          "A chi vuole individuare lo spazio lasciato scoperto dai concorrenti",
        ],
        price: "a partire da 199 € — consegna normalmente in 1 settimana",
      },
      {
        name: "Opportunity Scan",
        tagline: "Il tuo prodotto ha spazio in quel mercato?",
        bullets: [
          "Mercato, importazioni e concorrenti",
          "Canali distributivi e possibili buyer",
          "Barriere principali all'ingresso",
          "Raccomandazione conclusiva: GO / INVESTIGATE / LOW PRIORITY, con motivazione",
        ],
        audience: [
          'A chi si chiede "il mio prodotto funzionerebbe lì?" e vuole una risposta onesta',
          "A chi deve scegliere tra due o più mercati dove concentrare le energie",
          "A chi valuta se vale la pena investire in una fiera, una missione o un'analisi completa",
          "A chi preferisce spendere 290 € per un no adesso, che 29.000 € per un no tra un anno",
        ],
        price: "a partire da 290 € — consegna normalmente in 1 settimana",
      },
      {
        name: "Analisi di Mercato",
        tagline: "Comprendi il mercato prima di entrarci.",
        bullets: [
          "Dimensione e caratteristiche del mercato per il tuo prodotto o settore",
          "Domanda potenziale, canali di vendita e posizionamento",
          "Aree geografiche più promettenti",
          "Concorrenza e principali operatori",
          "Normative, dazi e barriere in sintesi",
        ],
        audience: [
          "A chi ha già deciso di entrare e deve costruire il piano: dove, come, con chi",
          "A chi deve scegliere area geografica, canale e posizionamento",
          "A chi deve presentare il progetto a soci, banca o consiglio di amministrazione",
          "A chi partecipa a bandi per l'internazionalizzazione e deve allegare un'analisi di mercato",
        ],
        price: "a partire da 500 € — consegna normalmente in 2 settimane",
      },
      {
        name: "Briefing Import/Export",
        tagline: "Chiarisci requisiti, procedure e rischi prima di avviare l'operazione.",
        bullets: [
          "Procedure e documentazione necessaria",
          "Classificazione del prodotto e regole applicabili",
          "Requisiti doganali, fiscali e regolatori principali",
          "Errori tipici e criticità da evitare",
          "Fonti, riferimenti e indicazioni operative",
        ],
        audience: [
          "A chi ha la prima spedizione o il primo ordine all'orizzonte",
          "A chi deve fare un preventivo e calcolare il costo reale del prodotto a destinazione",
          "A chi vuole evitare che il container si fermi in dogana per un documento mancante",
          "A chi ha già una controparte e deve capire come rendere operativo l'accordo",
        ],
        price: "a partire da 600 € — consegna normalmente in 1–2 settimane",
      },
    ],
  },
  {
    num: "04",
    label: "Trova",
    note: "Selezioniamo, non riempiamo liste.",
    items: [
      {
        name: "Buyer Finder — Starter",
        tagline: "Una shortlist di potenziali compratori selezionati per il tuo prodotto.",
        bullets: [
          "Shortlist di buyer, importatori o distributori compatibili (normalmente 10–20, secondo il settore)",
          "Contatti aziendali",
          "Breve indicazione del perché ciascuno è rilevante",
        ],
        audience: [
          "A chi ha il prodotto pronto e vuole i primi nomi giusti da contattare",
          "A chi vuole testare la risposta del mercato prima di investire di più",
          "A chi ha una struttura commerciale propria e vuole solo la materia prima: i contatti",
        ],
        price: "a partire da 199 € — consegna normalmente in 1 settimana",
      },
      {
        name: "Buyer Finder — Pro",
        tagline: "La mappatura estesa del mercato, ordinata per priorità.",
        bullets: [
          "Analisi estesa del mercato (normalmente 30–50 aziende considerate)",
          "Selezione delle più interessanti, con contatti e profilo",
          "Segmentazione e priorità commerciale",
        ],
        audience: [
          "A chi vuole la fotografia completa della domanda, non solo i primi nomi",
          "A chi deve scegliere il distributore giusto e vuole farlo confrontando le opzioni",
          "All'export manager che costruisce la pipeline commerciale dell'anno",
          "A chi prepara una campagna di contatto strutturata e vuole partire dalla mappa",
        ],
        price: "a partire da 490 € — consegna normalmente in 2 settimane",
      },
      {
        name: "Supplier Finder",
        tagline: "Trova chi può produrre o fornire per te.",
        bullets: [
          "Ricerca di produttori/fornitori nel mercato target",
          "Preselezione e informazioni aziendali",
          "Confronto preliminare tra i candidati",
        ],
        audience: [
          "A chi vuole importare e non sa da dove partire per trovare chi produce",
          "A chi dipende da un solo fornitore e vuole alternative concrete",
          "A chi cerca un produttore per il proprio private label",
          "A chi ha ricevuto un'offerta e vuole confrontarla con il resto del mercato",
        ],
        price: "a partire da 290 € — consegna normalmente in 1–2 settimane",
      },
    ],
  },
  {
    num: "05",
    label: "Entra in contatto",
    items: [
      {
        name: "Buyer Search + Outreach",
        tagline: "Non solo la lista: il primo contatto lo facciamo noi.",
        bullets: [
          "Ricerca buyer e identificazione dei contatti rilevanti",
          "Messaggio preparato nella lingua locale",
          "Primo contatto e follow-up",
          "Report delle risposte ricevute",
        ],
        audience: [
          "A chi non ha tempo, lingua o struttura per contattare il mercato da solo",
          "A chi ha già comprato liste di contatti rimaste in un cassetto",
          "A chi vuole risposte qualificate sulla scrivania, non nomi da lavorare",
          "A chi sa che il primo messaggio, scritto male, brucia il contatto per sempre",
        ],
        price: "a partire da 1.200 € — durata normalmente 4–6 settimane",
      },
      {
        name: "Agenda B2B per missioni e fiere",
        tagline: "Arriva sul mercato con gli incontri già organizzati.",
        bullets: [
          "Agenda di incontri qualificati, costruita sul tuo profilo",
          "Selezione delle controparti e preparazione del terreno prima dell'arrivo",
          "Logistica degli appuntamenti",
          "Accompagnamento opzionale",
          "Servizio diretto nelle piazze dove BMG dispone di presenza e rete locale (Belo Horizonte, San Paolo e altre su richiesta)",
        ],
        audience: [
          "A chi parte per una fiera o una missione e ha pochi giorni sul posto",
          "A chi vuole che il costo del viaggio si trasformi in incontri veri, non in visite di cortesia",
          "All'azienda in missione collettiva che vuole un'agenda propria, oltre al programma ufficiale",
          "A chi vuole qualcuno del posto che prepari il terreno prima dell'arrivo",
        ],
        price: "a partire da 800 € per azienda — preparazione normalmente 3–4 settimane",
      },
      {
        name: "Business Matching Campaign",
        tagline: "Dalla ricerca all'incontro, gestiamo tutto il percorso.",
        bullets: [
          "Ricerca e qualificazione dei potenziali partner",
          "Contatto e gestione delle risposte",
          "Organizzazione degli incontri con le aziende interessate",
          "Report finale della campagna",
        ],
        audience: [
          "A chi cerca un partner — distributore, agente, fornitore strategico — e vuole il percorso gestito da un professionista",
          "A chi non ha un ufficio export e non intende crearne uno per un solo mercato",
          "A chi ha già provato da solo e ha capito che serve qualcuno sul posto",
        ],
        price: "a partire da 2.000 € — durata normalmente 6–8 settimane",
      },
    ],
  },
  {
    num: "06",
    label: "Entra nel mercato",
    items: [
      {
        name: "Market Entry Project",
        tagline: "Il progetto completo di ingresso nel mercato.",
        bullets: [
          "Analisi e strategia d'ingresso",
          "Ricerca partner e contatti",
          "Supporto negoziale",
          "Coordinamento locale",
        ],
        audience: [
          "A chi ha deciso di entrare nel mercato e vuole un unico interlocutore che orchestri tutto il percorso",
          "A chi deve trattare con controparti locali e vuole al fianco chi conosce codici, lingua e prassi",
          "All'azienda che valuta una presenza stabile — importatore, filiale, partnership — e vuole arrivarci per gradi",
        ],
        price: "da 2.500 € per progetto — preventivo su perimetro — durata normalmente 2–3 mesi",
      },
    ],
  },
  {
    num: "07",
    label: "Presidia il mercato",
    items: [
      {
        name: "BMG Intelligence Desk",
        tagline: "Il tuo desk di intelligence, ogni mese.",
        bullets: [
          "Ricerche e verifiche su richiesta",
          "Monitoraggio di concorrenti, clienti e fornitori",
          "Informazioni operative per le decisioni commerciali",
        ],
        audience: [
          "All'azienda già attiva nel mercato che ogni mese ha domande nuove: un prezzo, un concorrente, una controparte",
          "A chi vuole accorgersi dei movimenti di mercato prima di leggerli sui giornali",
          'A chi si è trovato più volte a chiedere una ricerca "urgente" e preferisce avere un desk già ingaggiato',
        ],
        price: "a partire da 290 €/mese",
      },
      {
        name: "Local Business Support",
        tagline: "Una presenza operativa sul mercato, senza aprire una sede.",
        bullets: [
          "Verifica degli interlocutori",
          "Raccolta informazioni e contatti",
          "Appuntamenti e assistenza nelle relazioni con i partner locali",
        ],
        audience: [
          "A chi ha già clienti, fornitori o partner nel mercato e nessuno sul posto che li segua",
          "A chi vuole che ordini, consegne e problemi vengano seguiti nel fuso e nella lingua giusti",
          "All'azienda che non vuole (ancora) aprire una sede, ma non può più gestire tutto a distanza",
        ],
        price: "a partire da 500 €/mese",
      },
      {
        name: "Commercial Representation — Light",
        tagline: "I tuoi contatti nel mercato, tenuti vivi.",
        bullets: [
          "Presidio del mercato e gestione contatti",
          "Follow-up su lead e opportunità",
          "Reporting periodico",
        ],
        audience: [
          "A chi è entrato nel mercato e ha contatti da tenere vivi, ma non abbastanza da giustificare una persona dedicata",
          "A chi ha chiuso una campagna o una missione e non vuole che i lead si raffreddino",
          "A chi vuole una presenza commerciale continuativa a costo di abbonamento",
        ],
        price: "a partire da 300 €/mese + condizioni variabili definite in accordo",
      },
      {
        name: "Commercial Representation — Full",
        tagline: "La tua rappresentanza commerciale nel mercato.",
        bullets: [
          "Sviluppo commerciale attivo",
          "Partecipazione a incontri e fiere",
          "Supporto negoziale",
          "Reporting periodico",
        ],
        audience: [
          "A chi ha obiettivi di vendita concreti e vuole qualcuno che sviluppi attivamente, non solo mantenga",
          "A chi vuole essere rappresentato a fiere, incontri e trattative da chi conosce il mercato dall'interno",
        ],
        price: "a partire da 700 €/mese + condizioni variabili definite in accordo",
      },
      {
        name: "Fractional Export Desk",
        tagline: "Il tuo export desk sul mercato, senza creare una struttura interna.",
        bullets: [
          "Sviluppo commerciale e prospecting continuativo",
          "Gestione lead, incontri e fiere",
          "Follow-up e reporting",
          "Coordinamento con la direzione commerciale dell'azienda",
        ],
        audience: [
          "All'azienda che vuole un ufficio export nel mercato senza assumerlo",
          "A chi ha volumi e ambizioni che una rappresentanza leggera non basta più a servire",
          "A chi vuole un'unica figura che risponda alla propria direzione commerciale come farebbe un export manager interno",
        ],
        price: "da 1.500 €/mese + condizioni variabili definite in accordo",
      },
    ],
  },
  {
    num: "08",
    label: "Formazione",
    items: [
      {
        name: "Webinar su misura",
        tagline: "Il tema che serve al tuo team o ai tuoi associati.",
        bullets: [
          "60–90 minuti incluso Q&A",
          "Temi: mercato brasiliano, EUDR, credito fornitore, compliance del corridoio, market entry",
          "Materiali inclusi",
        ],
        audience: [
          "A Camere di commercio e associazioni che vogliono offrire contenuto concreto ai propri associati",
          "All'azienda che deve allineare il team su un mercato o una normativa",
          "A chi organizza eventi e cerca un relatore che parli di operatività, non di teoria",
        ],
        price: "a partire da 300 € (Camere e associazioni) / 500 € (aziendale)",
      },
      {
        name: "Workshop / Training",
        tagline: "Mezza giornata o giornata intera, online o in presenza.",
        bullets: [
          "Mezza giornata (3–4 ore): da 600 €",
          "Giornata intera (6–7 ore): da 1.000 €",
          "Programma costruito sul caso dell'azienda",
          "In presenza: + spese vive",
        ],
        audience: [
          "All'azienda che prepara l'ingresso nel mercato e vuole il team pronto, sul proprio caso concreto",
          "A chi parte per una fiera o una missione e vuole arrivare preparato su mercato, interlocutori e trattativa",
          "A chi vuole portare in casa il metodo, non solo il report",
        ],
        price: "",
      },
    ],
  },
];

export const servicesNotes = {
  title: "Note",
  items: [
    'I prezzi indicati sono "a partire da" e indicativi: la quotazione definitiva viene confermata dopo un breve briefing gratuito sul caso specifico.',
    "Per i servizi con componente a risultato, le condizioni sono definite per iscritto prima dell'avvio dell'attività.",
    "Il numero di controparti individuate dipende dal mercato: in settori di nicchia possono essere poche, ma tutte rilevanti. Selezioniamo, non riempiamo liste.",
    "Non vendiamo database generici: le aziende vengono selezionate in funzione del prodotto, del mercato target e del profilo commerciale del cliente. Le ricerche combinano fonti pubbliche, database, strumenti di business intelligence e verifica umana.",
    "I servizi di verifica e due diligence hanno natura informativa e di business intelligence e si basano sulle fonti accessibili per il caso specifico. Non costituiscono due diligence legale, fiscale, contabile o finanziaria professionale. Quando necessario, BMG può coordinare approfondimenti con professionisti qualificati locali.",
    "Prezzi espressi in EUR. Pagamento senza spese via SEPA. In alternativa: BRL (Pix/TED) al PTAX de venda del Banco Central do Brasil; USD (ACH), GBP (Faster Payments), AUD, NZD e CAD (trasferimento domestico) al tasso di riferimento BCE — in tutti i casi, tasso del giorno lavorativo precedente l'emissione della fattura.",
  ],
};

import { servicesIntroPT, serviceGroupsPT, servicesNotesPT } from "./servicesCatalog.pt";
import { servicesIntroEN, serviceGroupsEN, servicesNotesEN } from "./servicesCatalog.en";

export function getServicesCatalog(lang: string) {
  if (lang === "pt") {
    return { intro: servicesIntroPT, groups: serviceGroupsPT, notes: servicesNotesPT };
  }
  if (lang === "en") {
    return { intro: servicesIntroEN, groups: serviceGroupsEN, notes: servicesNotesEN };
  }
  return { intro: servicesIntro, groups: serviceGroups, notes: servicesNotes };
}
