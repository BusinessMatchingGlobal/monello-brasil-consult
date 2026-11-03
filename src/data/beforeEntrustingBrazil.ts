export type EditorialBlock = { type: "h2" | "h3" | "p"; text: string } | { type: "ul"; items: string[] };
export type EntrustingCopy = { title: string; subtitle: string; blocks: EditorialBlock[]; referencesTitle: string; references: { text: string; url: string }[] };

export const BEFORE_ENTRUSTING_BRAZIL: Record<"en" | "it", EntrustingCopy> = {
  "en": {
    "title": "Before entrusting Brazil to anyone",
    "subtitle": "What to clarify before engaging support to enter the Brazilian market.",
    "blocks": [
      {
        "type": "p",
        "text": "Entering Brazil can mean entrusting someone with an important part of your project: the search for partners, the first contacts and the coordination of activities on the ground."
      },
      {
        "type": "p",
        "text": "Before doing so, it is worth clarifying who will do what, how they will be paid and what obligations will arise from the relationship. Not out of distrust towards any professional category, but in order to choose knowing what you are signing, and in whose interest."
      },
      {
        "type": "h2",
        "text": "Who pays the person proposing you a partner?"
      },
      {
        "type": "p",
        "text": "A commission agreed with your company can be an appropriate way to remunerate sales development. In itself, it is not a sign of unreliability."
      },
      {
        "type": "p",
        "text": "Three things, however, need to be kept apart: the fee for an analysis, the reward tied to closing a deal, and any remuneration received from the counterparty being introduced."
      },
      {
        "type": "p",
        "text": "Someone paid only when the deal closes has a different interest from someone also paid to check whether that deal is worth doing. If they also receive something from the importer or distributor they propose, there is one more interest to be aware of."
      },
      {
        "type": "p",
        "text": "This does not prove the proposal is wrong. Nor does a fixed fee, by itself, guarantee independence. What counts is the role assumed, the interests disclosed, the selection method and the quality of the checks."
      },
      {
        "type": "p",
        "text": "The partner willing to place an immediate order is not necessarily the one best suited to your project. Even a negative conclusion, “under current conditions it is better not to proceed”, is a useful result."
      },
      {
        "type": "h2",
        "text": "The questions to ask"
      },
      {
        "type": "ul",
        "items": [
          "From whom do you receive remuneration for this work? Do you have economic or professional ties with the companies you propose?",
          "What is your role: analysis, search and contact of partners, commercial representation or something else? Which activities are included and which are excluded?",
          "How do you select and compare candidates? Which checks do you carry out, with which sources and with which limits?",
          "In whose name will the trademark application and any registration at the INPI be held? For products subject to health regulations, which company will take on the obligations and responsibilities provided for in Brazil?",
          "Who will keep the project documentation, and what access rights will we have if we change partner?",
          "Which fees, expenses and third-party costs are foreseen? How are additional activities authorised? Which obligations remain at the end of the relationship?",
          "If the alternatives found are not suitable, would you say so clearly and in writing?"
        ]
      },
      {
        "type": "h2",
        "text": "If you choose a representative in Brazil"
      },
      {
        "type": "p",
        "text": "A commission-based commercial representative can be the right choice. In Brazil, however, autonomous commercial representation is governed by a specific law, Law 4.886/1965, which covers that activity and not every service of searching for contacts. It is worth knowing it before signing. [1]"
      },
      {
        "type": "h3",
        "text": "Check the representative’s registration"
      },
      {
        "type": "p",
        "text": "Article 2 of the law requires anyone exercising autonomous commercial representation to be registered with the Regional Council of Commercial Representatives, the CORE. The obligation concerns that activity: it does not automatically extend to every consulting or partner-search service. The classification of the activities actually carried out needs to be checked. [1]"
      },
      {
        "type": "h3",
        "text": "The commission does not remove the cost: it may move it to the end of the relationship"
      },
      {
        "type": "p",
        "text": "In open-ended contracts, if the company ends the relationship outside the cases of just cause listed in Article 35, the law provides for compensation of no less than one twelfth of the total remuneration received during the whole relationship. Fixed-term contracts have their own rule. [1]"
      },
      {
        "type": "p",
        "text": "In open-ended contracts that have been in force for more than six months, termination without just cause also requires, unless the contract provides a greater guarantee, at least 30 days’ notice or the payment of an amount equal to one third of the commissions earned in the previous three months. Notice served and substitute payment are alternatives, not two costs to be added automatically. [1]"
      },
      {
        "type": "h3",
        "text": "Exclusivity must be regulated with the utmost clarity"
      },
      {
        "type": "p",
        "text": "If the contract provides for territorial exclusivity, the representative may be entitled to commissions also on business concluded directly by the company or by third parties. Even the contract’s silence can give rise to that right: leaving out a clause is not enough to exclude it. Assigned territory, clauses and evidence of the relationship must be examined together. Territorial exclusivity is not the same as the representative’s obligation to work for a single company. [1][2]"
      },
      {
        "type": "h3",
        "text": "The competent court should not be taken for granted"
      },
      {
        "type": "p",
        "text": "Where the requirements of autonomous commercial representation are met, the reference is the ordinary civil courts, under Theme 550 of the Federal Supreme Court. The law points to the courts of the representative’s domicile; any choice-of-forum clauses and international aspects must be assessed case by case. [1][3][4]"
      },
      {
        "type": "p",
        "text": "Where the genuineness of the autonomous relationship is disputed and recognition of an employment relationship is sought, the competent court and the applicable procedural rules must also be checked. These aspects fall under Theme 1.389 of the Federal Supreme Court, whose status should be verified at the time of the assessment. [5]"
      },
      {
        "type": "h3",
        "text": "How you manage the relationship matters, not only how you sign it"
      },
      {
        "type": "p",
        "text": "Requiring reports and setting targets do not, by themselves, constitute an employment relationship. Control over working hours and working methods, and the exercise of disciplinary power, may instead be indications of subordination, to be assessed together with the other legal requirements. They do not automatically lead to reclassification. What counts is the whole set of circumstances and the applicable rules, not just the title of the contract. [1][5][6]"
      },
      {
        "type": "p",
        "text": "This is why the choice between representation, distribution and direct sales must be made beforehand. Contract and operating rules should be drafted with practitioners of Brazilian law, both civil and labour."
      },
      {
        "type": "h2",
        "text": "How Business Matching Global works"
      },
      {
        "type": "h3",
        "text": "We are paid exclusively by you"
      },
      {
        "type": "p",
        "text": "We receive no commissions or referral fees from the companies we propose, nor from the professional firms we involve. We do not act for opposing parties in the same transaction."
      },
      {
        "type": "h3",
        "text": "The firms in our network are independent"
      },
      {
        "type": "p",
        "text": "When legal, tax, regulatory or technical expertise is needed, we involve firms with specific competence and the required qualifications. Each firm covers a single area, and the opinion is signed by, and the responsibility of, the senior professional. The client agrees scope and fees directly with them and receives their invoice. BMG retains no commission on those fees. Specialist opinions are given by the firms engaged, not replaced by our analyses."
      },
      {
        "type": "h3",
        "text": "Scope and fees are agreed beforehand"
      },
      {
        "type": "p",
        "text": "The proposal distinguishes activities included, documents to be delivered, timelines, BMG fees and external costs. In fixed-price work, fees do not increase simply because time passes. Extensions of scope and the related costs require prior written agreement. For ongoing services, frequency, duration and termination conditions are defined."
      },
      {
        "type": "h3",
        "text": "Any success fee is transparent and additional"
      },
      {
        "type": "p",
        "text": "At the client’s choice and by written agreement, a variable component tied to defined results may be provided for, with explicit calculation criteria and payment conditions. It does not replace the fee for the analysis and the preliminary checks, and it is owed exclusively by the client."
      },
      {
        "type": "p",
        "text": "Independence from counterparties does not mean the absence of economic incentives: that is why we separate the fee for the analysis from any result-based reward. A negative assessment remains a valid, paid result of the analysis work."
      },
      {
        "type": "h3",
        "text": "Our role is defined in the contract"
      },
      {
        "type": "p",
        "text": "We carry out market analysis, search and assessment of counterparts, and coordination of the agreed activities. We do not act as intermediaries between the parties: we work in the interest of the client who engages us, not on behalf of both. The search for and contact with potential buyers or partners on the client’s behalf begin after the contract is signed."
      },
      {
        "type": "p",
        "text": "Commercial decisions and the assumption of commitments remain with the client. Additional powers require specific authorisation."
      },
      {
        "type": "h3",
        "text": "We document the checks and their limits"
      },
      {
        "type": "p",
        "text": "We state the sources consulted, the date of the checks, what was found and what requires further work. The existence of a dispute does not, by itself, prove improper conduct; the absence of findings in the sources consulted guarantees neither the solvency nor the future conduct of a counterparty."
      },
      {
        "type": "p",
        "text": "Our checks do not replace legal, tax, accounting or regulatory due diligence. When it is needed, we say so. We also disclose ties and interests relevant to the work; if a conflict cannot be managed in a way compatible with our commitments, we abstain or discontinue the affected activity."
      },
      {
        "type": "h3",
        "text": "The first step can be a paid check-up"
      },
      {
        "type": "p",
        "text": "It serves to assess the conditions for entry, the main critical points and the further work required. It can lead to proceeding, changing the project or stopping. It does not presuppose any subsequent partner-search work. We do not want to sell you Brazil at any cost."
      },
      {
        "type": "h2",
        "text": "Write to us"
      },
      {
        "type": "p",
        "text": "Describe your project in writing. We reply in writing, to clarify the request and assess a possible engagement. Information, decisions and responsibilities are thus documented."
      },
      {
        "type": "h2",
        "text": "Information notice"
      },
      {
        "type": "p",
        "text": "This page is for general information and does not replace legal advice on a specific relationship. The application of the rules depends on the activities actually carried out, on the contract and on the circumstances. The terms of our services are set out in the contract."
      },
      {
        "type": "p",
        "text": "Last review of references: 3 November 2026."
      }
    ],
    "referencesTitle": "References",
    "references": [
      {
        "text": "[1] Law 4.886/1965, updated text from the Chamber of Deputies. In particular Articles 1 and 2, 27, 28, 31, 33, 34, 35, 36 and 39.",
        "url": "https://www2.camara.leg.br/legin/fed/lei/1960-1969/lei-4886-9-dezembro-1965-368416-normaatualizada-pl.html"
      },
      {
        "text": "[2] Superior Court of Justice, Informativo 601, REsp 1.634.077/SC, judged on 9 March 2017, published on 21 March 2017. Territorial exclusivity and contractual silence.",
        "url": "https://processo.stj.jus.br/jurisprudencia/externo/informativo/?acao=pesquisarumaedicao&livre=%270601%27.cod."
      },
      {
        "text": "[3] Superior Court of Justice, EREsp 579.324/SC, judged on 12 March 2008, published on 2 April 2008. Relative territorial jurisdiction and conditions for choice of forum.",
        "url": "https://scon.stj.jus.br/SCON/pesquisar.jsp?b=ACOR&livre=579324"
      },
      {
        "text": "[4] Federal Supreme Court, Theme 550, RE 606.003. Jurisdiction of the ordinary civil courts where the requirements of autonomous commercial representation are met.",
        "url": "https://portal.stf.jus.br/jurisprudenciaRepercussao/verAndamentoProcesso.asp?classeProcesso=RE&incidente=3797518&numeroProcesso=606003&numeroTema=550"
      },
      {
        "text": "[5] Federal Supreme Court, Theme 1.389, ARE 1.532.603. Jurisdiction, burden of proof and lawfulness of engagement as self-employed or through a legal entity. On 2 November 2026, no final ruling on the merits appeared on the portal. The procedural status must be checked case by case.",
        "url": "https://portal.stf.jus.br/jurisprudenciarepercussao/verAndamentoProcesso.asp?classeProcesso=ARE&incidente=7138684&numeroProcesso=1532603&numeroTema=1389"
      },
      {
        "text": "[6] Consolidation of Labour Laws (CLT), consolidated text consulted on the Federal Senate portal, in particular Articles 2, 3, 9 and 442-B, to be read together with the applicable case law.",
        "url": "https://legis.senado.gov.br/norma/530547/publicacao/37353698"
      }
    ]
  },
  "it": {
    "title": "Prima di affidare il Brasile a qualcuno",
    "subtitle": "Che cosa chiarire prima di incaricare qualcuno per entrare nel mercato brasiliano.",
    "blocks": [
      {
        "type": "p",
        "text": "Entrare in Brasile può significare affidare a qualcuno una parte importante del proprio progetto: la ricerca dei partner, i primi contatti e il coordinamento delle attività sul posto."
      },
      {
        "type": "p",
        "text": "Prima di farlo, conviene chiarire chi farà che cosa, come sarà remunerato e quali obblighi nasceranno dal rapporto. Non per diffidare di una categoria professionale, ma per scegliere sapendo che cosa si firma e nell’interesse di chi."
      },
      {
        "type": "h2",
        "text": "Chi paga chi vi propone un partner?"
      },
      {
        "type": "p",
        "text": "Una provvigione concordata con la vostra azienda può essere una formula adeguata per remunerare lo sviluppo delle vendite. Non è, di per sé, un indizio di scarsa affidabilità."
      },
      {
        "type": "p",
        "text": "Bisogna però distinguere tre cose: il compenso per un’analisi, il premio legato alla conclusione di un affare e l’eventuale remunerazione ricevuta dalla controparte presentata."
      },
      {
        "type": "p",
        "text": "Chi è pagato soltanto quando l’affare si conclude ha un interesse diverso da chi è pagato anche per verificare se quell’affare conviene. Se riceve qualcosa anche dall’importatore o dal distributore che propone, c’è un interesse in più da conoscere."
      },
      {
        "type": "p",
        "text": "Questo non dimostra che la proposta sia sbagliata. E nemmeno un compenso fisso garantisce, da solo, l’indipendenza. Contano il ruolo assunto, gli interessi dichiarati, il metodo di selezione e la qualità delle verifiche."
      },
      {
        "type": "p",
        "text": "Il partner disposto a fare un ordine immediato non è necessariamente il più adatto al vostro progetto. Anche una conclusione negativa, “nelle condizioni attuali è meglio non procedere”, è un risultato utile."
      },
      {
        "type": "h2",
        "text": "Le domande da fare"
      },
      {
        "type": "ul",
        "items": [
          "Da chi ricevete un compenso per questo lavoro? Avete rapporti economici o professionali con le aziende che proponete?",
          "Qual è il vostro ruolo: analisi, ricerca e contatto di partner, rappresentanza commerciale o altro? Quali attività sono comprese e quali escluse?",
          "Come selezionate e confrontate i candidati? Quali verifiche fate, con quali fonti e con quali limiti?",
          "A nome di chi resteranno la domanda e l’eventuale registrazione del marchio all’INPI? Per i prodotti soggetti a norme sanitarie, quale azienda assumerà gli obblighi e le responsabilità previsti in Brasile?",
          "Chi conserverà la documentazione del progetto e quali diritti di accesso avremo se cambiamo partner?",
          "Quali onorari, spese e costi di terzi sono previsti? Come vengono autorizzate le attività aggiuntive? Quali obblighi restano al termine del rapporto?",
          "Se le alternative trovate non fossero adeguate, lo direste con chiarezza e per iscritto?"
        ]
      },
      {
        "type": "h2",
        "text": "Se scegliete un rappresentante in Brasile"
      },
      {
        "type": "p",
        "text": "Un rappresentante commerciale a provvigione può essere la scelta giusta. In Brasile, però, la rappresentanza commerciale autonoma è regolata da una legge specifica, la Lei 4.886/1965, che riguarda quell’attività e non qualsiasi servizio di ricerca di contatti. Conviene conoscerla prima di firmare. [1]"
      },
      {
        "type": "h3",
        "text": "Verificate l’iscrizione del rappresentante"
      },
      {
        "type": "p",
        "text": "L’articolo 2 della legge impone l’iscrizione al Consiglio regionale dei rappresentanti commerciali, il CORE, a chi esercita la rappresentanza commerciale autonoma. L’obbligo riguarda quell’attività: non si estende automaticamente a ogni servizio di consulenza o di ricerca di partner. Va verificato l’inquadramento delle attività effettivamente svolte. [1]"
      },
      {
        "type": "h3",
        "text": "La provvigione non elimina il costo: può spostarlo alla fine del rapporto"
      },
      {
        "type": "p",
        "text": "Nei contratti a tempo indeterminato, se l’azienda chiude il rapporto fuori dai casi di giusta causa previsti dall’articolo 35, la legge prevede un’indennità non inferiore a un dodicesimo della retribuzione totale percepita durante l’intero rapporto. I contratti a tempo determinato hanno una regola propria. [1]"
      },
      {
        "type": "p",
        "text": "Nei contratti a tempo indeterminato in vigore da più di sei mesi, il recesso senza giusta causa richiede inoltre, salvo maggiore garanzia contrattuale, un preavviso di almeno 30 giorni oppure il pagamento di un importo pari a un terzo delle provvigioni maturate nei tre mesi precedenti. Preavviso rispettato e pagamento sostitutivo sono alternativi, non due costi da sommare automaticamente. [1]"
      },
      {
        "type": "h3",
        "text": "L’esclusiva va regolata con la massima chiarezza"
      },
      {
        "type": "p",
        "text": "Se il contratto prevede l’esclusiva di zona, il rappresentante può avere diritto alle provvigioni anche sugli affari conclusi direttamente dall’azienda o da terzi. Anche il silenzio del contratto può far nascere quel diritto: non basta omettere una clausola per escluderlo. Zona assegnata, clausole e prove del rapporto vanno esaminate insieme. L’esclusiva territoriale non va confusa con l’obbligo del rappresentante di lavorare per una sola azienda. [1][2]"
      },
      {
        "type": "h3",
        "text": "Il giudice competente non va dato per scontato"
      },
      {
        "type": "p",
        "text": "Quando ricorrono i requisiti della rappresentanza commerciale autonoma, il riferimento è la giustizia ordinaria, secondo il Tema 550 del Supremo Tribunale Federale. La legge indica il foro del domicilio del rappresentante; eventuali clausole di scelta del foro e aspetti internazionali vanno valutati caso per caso. [1][3][4]"
      },
      {
        "type": "p",
        "text": "Quando si contesta la genuinità del rapporto autonomo e si chiede il riconoscimento di un rapporto di lavoro subordinato, vanno verificati anche il giudice competente e le regole processuali applicabili. Su questi aspetti incide il Tema 1.389 del Supremo Tribunale Federale, il cui stato va controllato al momento della valutazione. [5]"
      },
      {
        "type": "h3",
        "text": "Conta come gestite il rapporto, non solo come lo firmate"
      },
      {
        "type": "p",
        "text": "La richiesta di report e la definizione di obiettivi non configurano, da sole, un rapporto di lavoro subordinato. Il controllo degli orari e delle modalità di lavoro e l’esercizio del potere disciplinare possono invece costituire indizi di subordinazione, da valutare insieme agli altri requisiti di legge. Non determinano automaticamente la riqualificazione. Contano l’insieme delle circostanze e la disciplina applicabile, non solo il titolo del contratto. [1][5][6]"
      },
      {
        "type": "p",
        "text": "Per questo la scelta tra rappresentanza, distribuzione e vendita diretta va fatta prima. Contratto e regole operative vanno redatti con chi pratica il diritto brasiliano, sia civile sia del lavoro."
      },
      {
        "type": "h2",
        "text": "Come lavora Business Matching Global"
      },
      {
        "type": "h3",
        "text": "Siamo pagati esclusivamente da voi"
      },
      {
        "type": "p",
        "text": "Non riceviamo provvigioni o compensi di segnalazione dalle aziende che proponiamo, né dagli studi professionali che coinvolgiamo. Non operiamo per parti contrapposte nella stessa operazione."
      },
      {
        "type": "h3",
        "text": "Gli studi della nostra rete sono indipendenti"
      },
      {
        "type": "p",
        "text": "Quando servono competenze legali, fiscali, regolatorie o tecniche, coinvolgiamo studi con competenza specifica e le abilitazioni richieste. Ogni studio si occupa di una sola area, e il parere è firmato dal professionista senior, sotto la sua responsabilità. Il cliente concorda direttamente con loro perimetro e onorari e riceve la loro fattura. BMG non trattiene alcuna commissione su quegli onorari. I pareri specialistici sono resi dagli studi incaricati, non sostituiti dalle nostre analisi."
      },
      {
        "type": "h3",
        "text": "Perimetro e onorari si concordano prima"
      },
      {
        "type": "p",
        "text": "La proposta distingue attività comprese, documenti da consegnare, tempi, onorari BMG e costi esterni. Nei lavori a prezzo fisso, gli onorari non aumentano per il semplice passare del tempo. Ampliamenti del perimetro e relativi costi richiedono un accordo scritto preventivo. Per i servizi continuativi si definiscono periodicità, durata e condizioni di chiusura."
      },
      {
        "type": "h3",
        "text": "L’eventuale success fee è trasparente e aggiuntiva"
      },
      {
        "type": "p",
        "text": "Su scelta del cliente e con accordo scritto, può essere prevista una componente variabile legata a risultati definiti, con criteri di calcolo e condizioni di esigibilità espliciti. Non sostituisce il compenso per l’analisi e per le verifiche preliminari ed è dovuta esclusivamente dal cliente."
      },
      {
        "type": "p",
        "text": "Indipendenza dalle controparti non significa assenza di incentivi economici: per questo distinguiamo il compenso per l’analisi dall’eventuale premio di risultato. Una valutazione negativa resta un risultato valido e remunerato del lavoro di analisi."
      },
      {
        "type": "h3",
        "text": "Il nostro ruolo è definito nel contratto"
      },
      {
        "type": "p",
        "text": "Facciamo analisi di mercato, ricerca e valutazione di interlocutori e coordinamento delle attività concordate. Non operiamo come intermediari tra le parti: lavoriamo nell’interesse del cliente che ci incarica, non per conto di entrambe. La ricerca e il contatto di potenziali acquirenti o partner per conto del cliente iniziano dopo la firma del contratto."
      },
      {
        "type": "p",
        "text": "Le decisioni commerciali e l’assunzione di impegni restano al cliente. Poteri aggiuntivi richiedono un’autorizzazione specifica."
      },
      {
        "type": "h3",
        "text": "Documentiamo le verifiche e i loro limiti"
      },
      {
        "type": "p",
        "text": "Indichiamo le fonti consultate, la data delle verifiche, che cosa è stato riscontrato e che cosa richiede approfondimento. L’esistenza di un contenzioso non dimostra, da sola, una condotta scorretta; l’assenza di segnalazioni nelle fonti consultate non garantisce né la solvibilità né il comportamento futuro di una controparte."
      },
      {
        "type": "p",
        "text": "Le nostre verifiche non sostituiscono una due diligence legale, fiscale, contabile o regolatoria. Quando è necessaria, lo diciamo. Dichiariamo anche i legami e gli interessi rilevanti per il lavoro; se un conflitto non può essere gestito in modo compatibile con i nostri impegni, ci asteniamo o interrompiamo l’attività interessata."
      },
      {
        "type": "h3",
        "text": "Il primo passo può essere un check-up a pagamento"
      },
      {
        "type": "p",
        "text": "Serve a valutare le condizioni di ingresso, le principali criticità e gli approfondimenti necessari. Può portare a procedere, a modificare il progetto o a fermarsi. Non presuppone un successivo lavoro di ricerca di partner. Non vogliamo vendervi il Brasile a tutti i costi."
      },
      {
        "type": "h2",
        "text": "Scriveteci"
      },
      {
        "type": "p",
        "text": "Descrivete il vostro progetto per iscritto. Rispondiamo per iscritto, per chiarire la richiesta e valutare un eventuale incarico. Informazioni, decisioni e responsabilità restano così documentate."
      },
      {
        "type": "h2",
        "text": "Nota informativa"
      },
      {
        "type": "p",
        "text": "Questa pagina ha finalità informativa generale e non sostituisce un parere legale sul rapporto concreto. L’applicazione delle norme dipende dalle attività effettivamente svolte, dal contratto e dalle circostanze. Le condizioni dei servizi sono definite nel contratto."
      },
      {
        "type": "p",
        "text": "Ultima revisione dei riferimenti: 3 novembre 2026."
      }
    ],
    "referencesTitle": "Riferimenti",
    "references": [
      {
        "text": "[1] Lei 4.886/1965, testo aggiornato della Câmara dos Deputados. In particolare gli articoli 1 e 2, 27, 28, 31, 33, 34, 35, 36 e 39.",
        "url": "https://www2.camara.leg.br/legin/fed/lei/1960-1969/lei-4886-9-dezembro-1965-368416-normaatualizada-pl.html"
      },
      {
        "text": "[2] Superior Tribunal de Justiça, Informativo 601, REsp 1.634.077/SC, deciso il 9 marzo 2017, pubblicato il 21 marzo 2017. Esclusiva territoriale e silenzio del contratto.",
        "url": "https://processo.stj.jus.br/jurisprudencia/externo/informativo/?acao=pesquisarumaedicao&livre=%270601%27.cod."
      },
      {
        "text": "[3] Superior Tribunal de Justiça, EREsp 579.324/SC, deciso il 12 marzo 2008, pubblicato il 2 aprile 2008. Competenza territoriale relativa e condizioni per la scelta del foro.",
        "url": "https://scon.stj.jus.br/SCON/pesquisar.jsp?b=ACOR&livre=579324"
      },
      {
        "text": "[4] Supremo Tribunal Federal, Tema 550, RE 606.003. Competenza della giustizia ordinaria quando ricorrono i requisiti della rappresentanza commerciale autonoma.",
        "url": "https://portal.stf.jus.br/jurisprudenciaRepercussao/verAndamentoProcesso.asp?classeProcesso=RE&incidente=3797518&numeroProcesso=606003&numeroTema=550"
      },
      {
        "text": "[5] Supremo Tribunal Federal, Tema 1.389, ARE 1.532.603. Competenza, onere della prova e liceità del rapporto autonomo o tramite persona giuridica. Alla consultazione del 2 novembre 2026 non risultava sul portale una tesi definitiva di merito. Lo stato del procedimento va verificato caso per caso.",
        "url": "https://portal.stf.jus.br/jurisprudenciarepercussao/verAndamentoProcesso.asp?classeProcesso=ARE&incidente=7138684&numeroProcesso=1532603&numeroTema=1389"
      },
      {
        "text": "[6] Consolidação das Leis do Trabalho (CLT), testo consolidato consultato sul portale del Senado Federal, in particolare gli articoli 2, 3, 9 e 442-B, da leggere insieme alla giurisprudenza applicabile.",
        "url": "https://legis.senado.gov.br/norma/530547/publicacao/37353698"
      }
    ]
  }
};
