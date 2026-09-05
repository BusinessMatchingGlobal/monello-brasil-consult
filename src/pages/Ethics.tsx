import { useEffect } from "react";
import { useT } from "@/lib/i18n";
import { useCanonical } from "@/lib/useCanonical";
import { Nav } from "./AboutUs";

type Block =
  | { type: "h2"; text: string }
  | { type: "p"; text: string; italic?: boolean }
  | { type: "ul"; items: string[] };

const EMAIL = "info@businessmatching.global";

const blocksIt: Block[] = [
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
  { type: "p", text: "Business Matching Global — Dal primo insight alla prima conversazione commerciale.", italic: true },
];

const blocksEn: Block[] = [
  { type: "h2", text: "Trust as a working principle" },
  { type: "p", text: "Business Matching Global (hereinafter \"BMG\") connects companies, investors, institutions and professionals across different markets and cultures." },
  { type: "p", text: "Trust is the precondition of every relationship we help to build. For this reason we work according to the principles of legality, independence, competence, confidentiality and transparency." },
  { type: "p", text: "This Code is more than a statement of values. It is a working instrument: it guides our decisions, it sets out what clients and partners can expect from BMG, and it establishes the criteria by which we assess assignments, contacts and opportunities." },
  { type: "p", text: "The Code draws on international best practice in professional consulting, responsible trade, anti-corruption and business conduct." },

  { type: "h2", text: "The voluntary nature of this Code" },
  { type: "p", text: "BMG adopts this Code voluntarily. No regulation requires us to do so. It is a deliberate choice, consistent with the nature of our work, in which the quality of a professional relationship rests on trust rather than on formal obligation." },
  { type: "p", text: "Adoption is voluntary; application is not. Once adopted, these principles govern how we work and become the standard against which we accept to be judged." },

  { type: "h2", text: "1. Scope" },
  { type: "p", text: "This Code applies to anyone acting in the name of or on behalf of BMG, including directors, employees, consultants, representatives and partners involved in carrying out an assignment." },
  { type: "p", text: "When we select suppliers, consultants or local partners, we also assess their professional reliability and whether their conduct is compatible with the principles set out here. Work subcontracted as part of an assignment is agreed with the client in advance, and those who carry it out on our behalf are bound by the same principles." },
  { type: "p", text: "No commercial opportunity justifies departing from the principles of legality, integrity and respect for people." },

  { type: "h2", text: "2. Competence and professional responsibility" },
  { type: "p", text: "We accept only those assignments for which we have the necessary competence and resources. We are open and truthful about our qualifications, our experience and the limits of what we can offer." },
  { type: "p", text: "Where a project calls for specialist legal, tax, customs, financial, regulatory or technical knowledge, we say so and, where appropriate, help bring in qualified professionals." },
  { type: "p", text: "We keep our knowledge of markets, regulations and international trade practice up to date." },
  { type: "p", text: "We are accountable for the work we do. Where we identify a material error in the information or assessments we have provided, we undertake to disclose and correct it promptly." },

  { type: "h2", text: "3. Clarity of assignments and realistic expectations" },
  { type: "p", text: "Before beginning any work, we agree with the client:" },
  { type: "ul", items: [
    "the objectives of the assignment;",
    "what the work includes and excludes;",
    "the results that can reasonably be expected;",
    "timelines and the responsibilities of each party;",
    "fees, commissions and any success fees.",
  ]},
  { type: "p", text: "We keep the client informed as the assignment progresses, including about difficulties and about anything that may change its prospects." },
  { type: "p", text: "We do not promise outcomes that depend on third-party decisions, public authorisations, market conditions or negotiations between independent parties. We refrain from encouraging unrealistic expectations, even where doing so would make an assignment easier to win." },
  { type: "p", text: "What we commit to is competence, information, method and professional relationships. We do not guarantee that a contract will be signed or that a transaction will succeed commercially." },

  { type: "h2", text: "4. Quality of information" },
  { type: "p", text: "We rely on sources we consider trustworthy and apply a level of verification proportionate to the nature of the assignment." },
  { type: "p", text: "We distinguish clearly between:" },
  { type: "ul", items: [
    "confirmed information;",
    "data from public sources or third parties;",
    "professional assessments;",
    "assumptions and projections;",
    "information requiring further verification.",
  ]},
  { type: "p", text: "We do not adjust data, credentials, references or commercial prospects to make an opportunity look more attractive." },
  { type: "p", text: "We present information in context, flagging any limitations, uncertainties or factors that could change the client's assessment." },

  { type: "h2", text: "5. Responsible business matching" },
  { type: "p", text: "An introduction is worth something only when it is relevant, placed in context and presented transparently." },
  { type: "p", text: "BMG undertakes to:" },
  { type: "ul", items: [
    "identify counterparties consistent with the objectives of the assignment;",
    "verify, as far as reasonably possible, the identity, role and relevance of the contacts we introduce;",
    "always state on whose behalf we are acting and under what mandate, without claiming an assignment we do not hold;",
    "never present an interest as confirmed when it has not actually been expressed;",
    "avoid creating false expectations about a counterparty's intentions or decision-making authority;",
    "respect the wishes and the confidentiality of the people involved;",
    "avoid deceptive or intrusive approaches, and any method of contact contrary to applicable law.",
  ]},
  { type: "p", text: "When we present an opportunity to third parties, we do not disclose the identity of the party we represent without their authorisation: the preliminary presentation is made anonymously, and the identity is disclosed only against a commitment to confidentiality." },
  { type: "p", text: "We do not use personal or institutional relationships to apply undue pressure. Our role is to enable knowledge, dialogue and mutual assessment, leaving the parties entirely free in their decisions." },

  { type: "h2", text: "6. Due diligence and selection of counterparties" },
  { type: "p", text: "Before introducing a counterparty we may carry out preliminary, proportionate checks on identity, activity, reputation and the internal consistency of the opportunity presented." },
  { type: "p", text: "Such checks do not replace full legal, tax, financial, technical, regulatory or reputational due diligence." },
  { type: "p", text: "Each party remains responsible for the verifications required before signing contracts, making investments, transferring funds or entering into any other binding commitment." },
  { type: "p", text: "We do not knowingly facilitate relationships with parties involved in fraud, corruption, money laundering, human rights abuses, evasion of international sanctions or other unlawful activity." },
  { type: "p", text: "Where material factors emerge that could compromise the legality or the soundness of a transaction, we reserve the right to suspend our work, request further verification or withdraw from the assignment." },

  { type: "h2", text: "7. Independence and conflicts of interest" },
  { type: "p", text: "We act with objectivity and independence of judgement." },
  { type: "p", text: "We disclose any personal, professional or financial interest that could influence — or could reasonably appear to influence — our impartiality." },
  { type: "p", text: "We do not act for opposing parties in the same transaction." },
  { type: "p", text: "We do not accept undisclosed compensation, hidden commissions or personal benefits from counterparties, intermediaries or suppliers." },
  { type: "p", text: "Where BMG is to be remunerated by more than one party involved in the same transaction, this must be disclosed in advance and accepted by the parties concerned." },
  { type: "p", text: "Where a conflict arises during an assignment, we either remove its cause, or disclose it and obtain the parties' written agreement to continue, or withdraw from the assignment." },
  { type: "p", text: "We do not take personal advantage of privileged information obtained in the course of an assignment, nor do we allow others to do so. We do not approach a client's staff with other professional opportunities without the client's consent." },

  { type: "h2", text: "8. Anti-corruption" },
  { type: "p", text: "BMG does not tolerate corruption, unlawful payments, bribery, extortion or the improper exchange of favours in any form. We are guided by the principles established in international conventions and OECD recommendations on the subject." },
  { type: "p", text: "Offering, promising, requesting or accepting money, gifts, commissions, benefits or other advantages in order to improperly influence a commercial, professional or institutional decision is prohibited." },
  { type: "p", text: "This applies equally to dealings with public bodies and to relationships between private companies." },
  { type: "p", text: "Gifts and courtesies are acceptable only where they are lawful, occasional, transparent, of modest value and incapable of creating any obligation or influence." },
  { type: "p", text: "The same principles must be observed by agents, consultants and partners acting on our behalf. A breach may lead to immediate suspension or termination of the relationship." },

  { type: "h2", text: "9. Confidentiality, data and intellectual property" },
  { type: "p", text: "We protect confidential information received from clients, partners and counterparties, and use it solely for the purposes agreed." },
  { type: "p", text: "Confidentiality applies from the very first contact, even in the absence of a formal agreement and even where the contact does not lead to an assignment. It applies to information from any source and continues after the professional relationship has ended." },
  { type: "p", text: "We do not disclose, without authorisation:" },
  { type: "ul", items: [
    "corporate strategies and documents;",
    "financial or commercial information;",
    "non-public names and contact details;",
    "contractual terms;",
    "analyses, research and confidential materials;",
    "personal or professional information obtained in the course of an assignment.",
  ]},
  { type: "p", text: "We do not use information received in confidence for editorial, publishing or public analysis purposes." },
  { type: "p", text: "Personal data is processed according to principles of lawfulness, necessity, proportionality and security." },
  { type: "p", text: "We respect copyright, trademarks, patents, know-how and every other form of intellectual property. We do not use third-party content, or present it as BMG's own, without holding the rights to do so or without properly attributing its source." },
  { type: "p", text: "We regard industrial know-how — processes, formulations, parameters, technical solutions — as a company's most exposed asset. We neither describe it nor make it available to third parties in the preliminary stages of a transaction, and we recommend that any transfer of technical expertise take place only once the contractual and corporate structure has been defined and signed." },

  { type: "h2", text: "10. Responsible use of artificial intelligence" },
  { type: "p", text: "BMG may use digital tools and artificial intelligence systems to support research, organisation, analysis and content production." },
  { type: "p", text: "Their use must respect the principles of confidentiality, data protection, accuracy and human oversight." },
  { type: "p", text: "We do not treat content generated by an artificial intelligence system as reliable by default. Material information is subject to professional judgement and, where necessary, verified against independent sources." },
  { type: "p", text: "We do not enter clients' confidential information into unauthorised tools or tools lacking adequate safeguards." },
  { type: "p", text: "Artificial intelligence can support our work. It does not replace professional judgement, personal responsibility or human verification." },

  { type: "h2", text: "11. Respect for people and responsible trade" },
  { type: "p", text: "We foster relationships based on dignity, on listening and on respect for cultural differences." },
  { type: "p", text: "We do not tolerate discrimination on grounds of nationality, ethnic origin, gender, personal identity, sexual orientation, religion, age, disability, social condition or political opinion." },
  { type: "p", text: "We do not support activities involving forced labour, child labour, exploitation, unsafe working conditions or breaches of fundamental rights." },
  { type: "p", text: "Where relevant, we take into account the environmental and social effects of the opportunities we help to develop. We favour projects capable of generating lasting economic value, transfer of skills, innovation, qualified employment and responsible development of the territories concerned." },
  { type: "p", text: "We make no unsubstantiated environmental or social claims and reject greenwashing in every form." },

  { type: "h2", text: "12. Accurate and transparent communication" },
  { type: "p", text: "BMG's communications must be accurate, clearly identifiable as ours, and respectful." },
  { type: "p", text: "We do not circulate misleading information, inauthentic testimonials or statements liable to damage unfairly the reputation of individuals or organisations." },
  { type: "p", text: "Public use of names, trademarks, logos, case studies or references to clients and partners requires their prior authorisation." },
  { type: "p", text: "Our editorial output and market analysis must clearly separate informational content from promotional or commercial activity. Our analytical work is technical and independent: we do not carry out advocacy before public bodies and we do not take partisan positions in the political debate of the countries where we operate." },

  { type: "h2", text: "13. Questions and reports" },
  { type: "p", text: "Clients, partners, collaborators and other interested parties may seek clarification on this Code, or report conduct they consider incompatible with its principles, by writing to:" },
  { type: "p", text: EMAIL },
  { type: "p", text: "Reports made in good faith are examined seriously, impartially and in confidence." },
  { type: "p", text: "BMG does not tolerate retaliation against anyone who, in good faith, reports a possible breach." },

  { type: "h2", text: "14. Application and review" },
  { type: "p", text: "Compliance with this Code is an essential part of how BMG works." },
  { type: "p", text: "In the event of a breach, we may take measures proportionate to its seriousness, including requiring corrective action, suspending the work or terminating the professional relationship." },
  { type: "p", text: "This Code is a voluntary commitment. It complements, but does not replace, the obligations arising from contracts, mandates, confidentiality agreements and applicable law, which prevail in all cases." },
  { type: "p", text: "The Code is reviewed periodically to keep it consistent with the evolution of our activities, the technologies we use and the applicable regulations." },
  { type: "p", text: "Version effective from August 2026.", italic: true },
  { type: "p", text: "Business Matching Global — From the first insight to the first business conversation.", italic: true },
];

const blocksPt: Block[] = [
  { type: "h2", text: "A confiança como princípio de trabalho" },
  { type: "p", text: "A Business Matching Global (doravante \"BMG\") conecta empresas, investidores, instituições e profissionais de mercados e culturas diferentes." },
  { type: "p", text: "A confiança é o pressuposto de toda relação que ajudamos a construir. Por isso, atuamos segundo os princípios de legalidade, independência, competência, confidencialidade e transparência." },
  { type: "p", text: "Este Código não é apenas uma declaração de valores. É um instrumento de trabalho: orienta nossas decisões, define o comportamento que clientes e parceiros podem esperar da BMG e estabelece os critérios pelos quais avaliamos mandatos, contatos e oportunidades." },
  { type: "p", text: "O Código inspira-se nas melhores práticas internacionais em consultoria profissional, comércio responsável, prevenção da corrupção e conduta empresarial." },

  { type: "h2", text: "Natureza voluntária deste Código" },
  { type: "p", text: "A BMG adota este Código de forma voluntária. Nenhuma norma nos obriga a isso: trata-se de uma escolha autônoma, coerente com a natureza do nosso trabalho, no qual a qualidade de uma relação profissional depende mais da confiança do que de uma obrigação formal." },
  { type: "p", text: "Voluntária é a adoção, não a aplicação. Uma vez assumidos, esses princípios regem a nossa atuação e constituem o critério pelo qual aceitamos ser avaliados." },

  { type: "h2", text: "1. Âmbito de aplicação" },
  { type: "p", text: "Este Código aplica-se a todos que atuem em nome ou por conta da BMG, incluindo administradores, colaboradores, consultores, representantes e parceiros envolvidos na execução de um mandato." },
  { type: "p", text: "Ao selecionar fornecedores, consultores ou parceiros locais, avaliamos também sua confiabilidade profissional e a compatibilidade de sua conduta com os princípios aqui estabelecidos. As atividades delegadas a terceiros no âmbito de um mandato são previamente acordadas com o cliente, e quem as executa em nosso nome está sujeito aos mesmos princípios." },
  { type: "p", text: "Nenhuma oportunidade comercial justifica exceção aos princípios de legalidade, integridade e respeito às pessoas." },

  { type: "h2", text: "2. Competência e responsabilidade profissional" },
  { type: "p", text: "Aceitamos exclusivamente mandatos para os quais dispomos da competência e dos recursos necessários. Somos francos quanto às nossas qualificações, à nossa experiência e aos limites do que podemos oferecer." },
  { type: "p", text: "Quando um projeto exige conhecimentos jurídicos, tributários, aduaneiros, financeiros, regulatórios ou técnicos especializados, informamos o cliente e, se necessário, favorecemos o envolvimento de profissionais qualificados." },
  { type: "p", text: "Mantemos atualizado nosso conhecimento sobre mercados, regulamentação e práticas do comércio internacional." },
  { type: "p", text: "Somos responsáveis pelo trabalho que realizamos. Se identificarmos um erro relevante nas informações ou avaliações fornecidas, comprometemo-nos a comunicá-lo e corrigi-lo tempestivamente." },

  { type: "h2", text: "3. Clareza dos mandatos e expectativas realistas" },
  { type: "p", text: "Antes de iniciar qualquer atividade, definimos com o cliente:" },
  { type: "ul", items: [
    "os objetivos do mandato;",
    "as atividades incluídas e excluídas;",
    "os resultados razoavelmente esperados;",
    "os prazos e as responsabilidades das partes;",
    "os honorários, as comissões e eventuais taxas de êxito.",
  ]},
  { type: "p", text: "Mantemos o cliente informado sobre o andamento do mandato, inclusive sobre dificuldades e sobre elementos que possam alterar suas perspectivas." },
  { type: "p", text: "Não prometemos resultados que dependam de decisões de terceiros, de autorizações públicas, de condições de mercado ou de negociações entre partes independentes. Abstemo-nos de alimentar expectativas irreais, mesmo quando isso facilitaria a obtenção de um mandato." },
  { type: "p", text: "Nosso compromisso consiste em disponibilizar competência, informação, método e relacionamentos profissionais. Não garantimos a celebração de um contrato nem o êxito comercial de uma operação." },

  { type: "h2", text: "4. Qualidade das informações" },
  { type: "p", text: "Utilizamos fontes que consideramos confiáveis e adotamos um nível de verificação proporcional à natureza do mandato." },
  { type: "p", text: "Distinguimos claramente entre:" },
  { type: "ul", items: [
    "informações confirmadas;",
    "dados provenientes de fontes públicas ou de terceiros;",
    "avaliações profissionais;",
    "hipóteses e projeções;",
    "informações que exigem verificação adicional.",
  ]},
  { type: "p", text: "Não alteramos dados, qualificações, referências ou perspectivas comerciais para tornar uma oportunidade mais atraente." },
  { type: "p", text: "As informações são apresentadas em seu contexto, com indicação de eventuais limites, incertezas ou elementos capazes de alterar a avaliação do cliente." },

  { type: "h2", text: "5. Business matching responsável" },
  { type: "p", text: "Um contato profissional só tem valor quando é pertinente, contextualizado e apresentado com transparência." },
  { type: "p", text: "A BMG compromete-se a:" },
  { type: "ul", items: [
    "identificar interlocutores coerentes com os objetivos do mandato;",
    "verificar, na medida do razoavelmente possível, a identidade, a função e a pertinência dos contatos;",
    "declarar sempre em nome de quem estamos atuando e com qual mandato, sem nos atribuirmos incumbências que não recebemos;",
    "não apresentar como confirmado um interesse que não tenha sido efetivamente manifestado;",
    "não criar falsas expectativas sobre as intenções ou a capacidade decisória de uma contraparte;",
    "respeitar a vontade e a confidencialidade das pessoas envolvidas;",
    "evitar formas de contato enganosas, invasivas ou contrárias à legislação aplicável.",
  ]},
  { type: "p", text: "Ao apresentar uma oportunidade a terceiros, não revelamos a identidade da parte representada sem sua autorização: a apresentação preliminar é feita de forma anônima, e a identidade só é revelada mediante compromisso de confidencialidade." },
  { type: "p", text: "Não utilizamos relações pessoais ou institucionais para exercer pressão indevida. Nosso papel é facilitar o conhecimento, o diálogo e a avaliação recíproca, deixando às partes plena autonomia em suas decisões." },

  { type: "h2", text: "6. Due diligence e seleção das contrapartes" },
  { type: "p", text: "Antes de apresentar uma contraparte, podemos realizar verificações preliminares e proporcionais sobre identidade, atividade, reputação e coerência da oportunidade proposta." },
  { type: "p", text: "Essas verificações não substituem uma due diligence jurídica, tributária, financeira, técnica, regulatória ou reputacional completa." },
  { type: "p", text: "Cada parte permanece responsável pelas verificações necessárias antes de assinar contratos, realizar investimentos, transferir valores ou assumir outros compromissos vinculantes." },
  { type: "p", text: "Não favorecemos conscientemente relações com pessoas ou empresas envolvidas em fraude, corrupção, lavagem de dinheiro, violação de direitos humanos, evasão de sanções internacionais ou outras atividades ilícitas." },
  { type: "p", text: "Quando surgirem elementos relevantes capazes de comprometer a legalidade ou a confiabilidade de uma operação, reservamo-nos o direito de suspender as atividades, solicitar verificações adicionais ou renunciar ao mandato." },

  { type: "h2", text: "7. Independência e conflitos de interesse" },
  { type: "p", text: "Atuamos com objetividade e independência de julgamento." },
  { type: "p", text: "Comunicamos qualquer interesse pessoal, profissional ou econômico que possa influenciar — ou aparentar influenciar — nossa imparcialidade." },
  { type: "p", text: "Não representamos simultaneamente partes opostas na mesma operação." },
  { type: "p", text: "Não aceitamos remunerações ocultas, comissões não declaradas ou vantagens pessoais de contrapartes, intermediários ou fornecedores." },
  { type: "p", text: "Eventual remuneração da BMG por mais de uma parte envolvida na mesma operação deve ser previamente comunicada e aceita pelos interessados." },
  { type: "p", text: "Quando um conflito surge no curso de um mandato, conforme as circunstâncias, removemos sua causa, ou o declaramos às partes obtendo por escrito a concordância em prosseguir, ou renunciamos ao mandato." },
  { type: "p", text: "Não obtemos vantagem pessoal de informações privilegiadas adquiridas no curso de um mandato, nem permitimos que terceiros o façam. Não oferecemos aos colaboradores de um cliente outras oportunidades profissionais sem o consentimento dele." },

  { type: "h2", text: "8. Prevenção da corrupção" },
  { type: "p", text: "A BMG não tolera qualquer forma de corrupção, pagamento ilícito, concussão, extorsão ou troca indevida de favores. Inspiramo-nos nos princípios estabelecidos na matéria pelas convenções internacionais e pelas recomendações da OCDE." },
  { type: "p", text: "É vedado oferecer, prometer, solicitar ou aceitar dinheiro, presentes, comissões, benefícios ou outras vantagens com a finalidade de influenciar indevidamente uma decisão comercial, profissional ou institucional." },
  { type: "p", text: "Este princípio aplica-se tanto às relações com entes públicos quanto às relações entre empresas privadas." },
  { type: "p", text: "Brindes e gestos de cortesia são admitidos exclusivamente quando lícitos, ocasionais, transparentes, de valor modesto e incapazes de gerar obrigações ou condicionamentos." },
  { type: "p", text: "Os mesmos princípios devem ser observados por agentes, consultores e parceiros que atuem em nosso nome. A violação pode acarretar a suspensão ou o encerramento imediato da colaboração." },

  { type: "h2", text: "9. Confidencialidade, dados e propriedade intelectual" },
  { type: "p", text: "Protegemos as informações confidenciais recebidas de clientes, parceiros e contrapartes e as utilizamos exclusivamente para as finalidades acordadas." },
  { type: "p", text: "A confidencialidade aplica-se desde o primeiro contato, mesmo na ausência de acordo formal e mesmo quando o contato não resulta em mandato. Vale em relação a qualquer fonte e permanece após o encerramento da relação profissional." },
  { type: "p", text: "Não divulgamos, sem autorização:" },
  { type: "ul", items: [
    "estratégias e documentos empresariais;",
    "informações econômicas ou comerciais;",
    "nomes e dados de contato não públicos;",
    "condições contratuais;",
    "análises, pesquisas e materiais confidenciais;",
    "informações pessoais ou profissionais obtidas durante um mandato.",
  ]},
  { type: "p", text: "Não utilizamos informações recebidas em caráter confidencial para fins editoriais, de divulgação ou de análise pública." },
  { type: "p", text: "O tratamento de dados pessoais observa os critérios de legalidade, necessidade, proporcionalidade e segurança, em conformidade com a legislação aplicável, incluindo a Lei Geral de Proteção de Dados (LGPD) e o Regulamento Geral sobre a Proteção de Dados (GDPR), conforme o caso." },
  { type: "p", text: "Respeitamos direitos autorais, marcas, patentes, know-how e qualquer outra forma de propriedade intelectual. Não utilizamos nem atribuímos à BMG conteúdos de terceiros sem deter o respectivo direito ou sem indicar corretamente sua origem." },
  { type: "p", text: "Consideramos o know-how industrial — processos, formulações, parâmetros, soluções técnicas — o bem mais exposto de uma empresa. Não o descrevemos nem o disponibilizamos a terceiros nas fases preliminares de uma operação, e recomendamos que toda transferência de competências técnicas ocorra somente após a definição e a assinatura da estrutura contratual e societária." },

  { type: "h2", text: "10. Uso responsável da inteligência artificial" },
  { type: "p", text: "A BMG pode utilizar ferramentas digitais e sistemas de inteligência artificial para apoiar atividades de pesquisa, organização, análise e produção de conteúdo." },
  { type: "p", text: "Seu uso deve respeitar os princípios de confidencialidade, proteção de dados, precisão e controle humano." },
  { type: "p", text: "Não consideramos automaticamente confiável um conteúdo gerado por sistema de inteligência artificial. As informações relevantes são submetidas a avaliação profissional e, quando necessário, verificadas por fontes independentes." },
  { type: "p", text: "Não inserimos informações confidenciais de clientes em ferramentas não autorizadas ou desprovidas de garantias adequadas." },
  { type: "p", text: "A inteligência artificial pode apoiar nosso trabalho, mas não substitui o julgamento profissional, a responsabilidade pessoal ou a verificação humana." },

  { type: "h2", text: "11. Respeito às pessoas e comércio responsável" },
  { type: "p", text: "Promovemos relações fundadas na dignidade, na escuta e no respeito às diferenças culturais." },
  { type: "p", text: "Não toleramos discriminação por nacionalidade, origem étnica, gênero, identidade pessoal, orientação sexual, religião, idade, deficiência, condição social ou opinião política." },
  { type: "p", text: "Não apoiamos atividades que envolvam trabalho forçado, trabalho infantil, exploração, condições de trabalho perigosas ou violação de direitos fundamentais." },
  { type: "p", text: "Consideramos, quando pertinentes, os efeitos ambientais e sociais das oportunidades que ajudamos a desenvolver. Favorecemos projetos capazes de gerar valor econômico duradouro, transferência de competências, inovação, emprego qualificado e desenvolvimento responsável dos territórios." },
  { type: "p", text: "Não utilizamos afirmações ambientais ou sociais não comprovadas e rejeitamos toda forma de greenwashing." },

  { type: "h2", text: "12. Comunicação correta e transparente" },
  { type: "p", text: "As comunicações da BMG devem ser precisas, identificáveis e respeitosas." },
  { type: "p", text: "Não divulgamos informações enganosas, depoimentos não autênticos ou declarações capazes de prejudicar injustamente a reputação de pessoas ou organizações." },
  { type: "p", text: "O uso público de nomes, marcas, logotipos, casos empresariais ou referências a clientes e parceiros exige autorização prévia dos interessados." },
  { type: "p", text: "As comunicações editoriais e as análises de mercado devem distinguir claramente o conteúdo informativo das atividades promocionais ou comerciais. Nossa atividade de análise é técnica e independente: não exercemos representação de interesses perante entes públicos e não assumimos posições partidárias no debate político dos países em que atuamos." },

  { type: "h2", text: "13. Comunicações e pedidos de esclarecimento" },
  { type: "p", text: "Clientes, parceiros, colaboradores e demais interessados podem solicitar esclarecimentos sobre este Código ou relatar condutas consideradas incompatíveis com seus princípios escrevendo para:" },
  { type: "p", text: EMAIL },
  { type: "p", text: "As comunicações feitas de boa-fé são examinadas com seriedade, imparcialidade e confidencialidade." },
  { type: "p", text: "A BMG não admite retaliação contra quem, de boa-fé, relate uma possível violação." },

  { type: "h2", text: "14. Aplicação e atualização" },
  { type: "p", text: "O cumprimento deste Código constitui parte essencial do modo de atuar da BMG." },
  { type: "p", text: "Em caso de violação, podemos adotar medidas proporcionais à gravidade da conduta, incluindo a solicitação de correção, a suspensão da atividade ou o encerramento da relação profissional." },
  { type: "p", text: "Este Código tem natureza de compromisso voluntário e complementa, sem substituí-las, as obrigações decorrentes de contratos, mandatos, acordos de confidencialidade e da legislação aplicável, que prevalecem em qualquer caso." },
  { type: "p", text: "O Código é revisado periodicamente para mantê-lo coerente com a evolução de nossas atividades, das tecnologias utilizadas e da legislação aplicável." },
  { type: "p", text: "Versão em vigor desde agosto de 2026.", italic: true },
  { type: "p", text: "Business Matching Global — Do primeiro insight à primeira conversa de negócios.", italic: true },
];

export default function Ethics() {
  const { lang } = useT();
  const seo =
    lang === "en"
      ? { title: "Code of Ethics | Business Matching Global", description: "BMG's voluntary Code of Ethics and Professional Conduct: legality, independence, confidentiality and transparency (Italian text)." }
      : lang === "pt"
      ? { title: "Código de Ética | Business Matching Global", description: "Código de Ética e Conduta Profissional da BMG: legalidade, independência, confidencialidade e transparência ." }
      : { title: "Codice Etico | Business Matching Global", description: "Codice Etico e di Condotta Professionale di BMG: legalità, indipendenza, competenza, riservatezza e trasparenza." };
  useCanonical("/ethics", seo);
  const blocks = lang === "en" ? blocksEn : lang === "pt" ? blocksPt : blocksIt;
  const pageTitle = lang === "en" ? "Code of Ethics and Professional Conduct" : lang === "pt" ? "Código de Ética e Conduta Profissional" : "Codice Etico e di Condotta Professionale";
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <div className="container max-w-3xl pt-32 md:pt-40 pb-16 md:pb-24">
        <h1 className="font-display text-4xl md:text-5xl leading-tight mb-6">
          {pageTitle}
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
