import { createContext, useContext, useState, useEffect, ReactNode, createElement } from "react";

export type Lang = "en" | "it" | "pt";

type Dict = typeof translations.en;

export const translations = {
  en: {
    nav: { home: "Home", servicesLink: "How can we help you?", services: "Services", how: "How it works", method: "Our method", about: "Who we are", travel: "Business Travel", news: "Ebook", analysis: "Analysis", analysisAll: "All articles →", contact: "Contact" },
    hero: {
      title: "Reliable business intelligence on Brazil — without the guesswork.",
      sub: "We help companies and investors make sound and informed decisions when doing business in Brazil, including exporting, investing, and forming commercial partnerships.\n\nOur services include business intelligence, due diligence on potential suppliers and customers, and analysis of key regulatory, tax, and operational information, such as import/export and customs procedures, local requirements and permits, regional incentives, and market access conditions.\n\nThrough tailored services, we produce clear, practical, and ready-to-use reports designed to support commercial, strategic, and operational decisions.",
      cta1: "Request a report",
      cta2: "See services",
      linkedin: "Follow Business Matching Global on LinkedIn for insights, reports and updates on Brazil.",
    },
    problem: {
      title: "Doing business with Brazil shouldn't be a leap in the dark.",
      body: "Entering the Brazilian market often means dealing with a familiar set of challenges: unreliable or outdated information, fragmented data, sources that are difficult to verify, and regulations that can be complex to interpret.\n\nBut the issue is not simply a matter of language. To operate effectively in Brazil, companies need to understand not only what the rules state, but how they are actually applied in practice within a distinct administrative, tax and business culture.\n\nThis complexity can generate blind spots, encourage wrong assumptions and expose businesses to avoidable risks. In a competitive market, even one misjudgement can result in lost time, unnecessary costs and missed opportunities.\n\nWe help transform uncertainty into a clear, verifiable and actionable picture, supporting informed decisions based on context, evidence and practical insight.",
      items: [
        ["Unreliable Information", "Information is often fragmented, difficult to access and hard to verify, both in terms of reliability and timeliness.\n\nSources may contradict one another, making it difficult to determine which data can truly be trusted and used as a basis for informed decision-making."],
        ["Wrong Interpretations", "Reliable information is only the starting point. To make sound business decisions, companies must be able to interpret that information correctly, place it in context and understand how it is applied in practice.\n\nLanguage skills alone are not enough. What matters is understanding how local professionals, authorities and market operators read, interpret and apply that information in everyday administrative, tax and commercial contexts.\n\nThe challenge is often made harder by fragmented information, difficult access and sources that are not always easy to verify. Data may be incomplete, outdated or contradictory, making it difficult to determine what can genuinely be trusted as a basis for informed decision-making."],
        ["Costly Mistakes", "When decisions are based on inaccurate or misinterpreted data, businesses risk making poor strategic choices that can result in significant costs, wasted time and missed opportunities."],
      ],
    },
    services: {
      title: "How can we support you?",
      from: "from",
      request: "Request this",
      custom: "Need a tailored information service?\n\nContact us and tell us what you need. Together, we will identify the solution that best fits your requirements.\n\nDepending on the country in which you operate and on the programs available, the cost of our information services may, in some cases, be supported partially or even fully through European, national or regional funding schemes dedicated to internationalisation, innovation and business development.\n\nIf required, we will be pleased to help you identify these opportunities and assess whether our services may qualify as eligible expenses under the applicable programs.\n\nOur goal is to provide you with the greatest possible value by turning reliable and verifiable information into more informed decisions and new opportunities for growth.",
      cards: [
        {
          name: "Brazil Counterparty Check",
          promise: "Know who you are dealing with before making a commitment.",
          items: [
            "Company existence and registration status",
            "Ownership, directors and basic company information",
            "Reputation and publicly available risk indicators",
            "Checks on clients, suppliers, partners, distributors or agents",
            "Final summary with a clear indication of the risk level",
          ],
          price: "€150",
        },
        {
          name: "Brazil Market Analysis",
          promise: "Understand the market before entering it.",
          items: [
            "Market size and key characteristics for your product or sector",
            "Potential demand, sales channels and positioning",
            "Most promising geographic areas and suitable location options",
            "Analysis of competitors and main market players",
            "Relevant regulations, standards and requirements",
            "Duties, non-tariff barriers and key import issues in summary",
          ],
          price: "€500",
        },
        {
          name: "Brazil Import/Export Briefing",
          promise: "Clarify requirements, procedures and risks before starting the operation.",
          items: [
            "Required procedures and documentation",
            "Product classification and applicable rules",
            "Main customs, tax and regulatory requirements",
            "Common mistakes and critical issues to avoid",
            "Sources, references and practical guidance",
          ],
          price: "starting from €600",
        },
      ],
    },
    how: {
      title: "Simple, fast, clear.",
      steps: [
        ["Get in touch with us and tell us what you need and what your goals are.", "We will contact you to clarify any questions, better understand your needs, and optimize our work so we can help you get straight to the point: achieving your objective in the clearest, most efficient, and most focused way possible."],
        ["Research and dossier preparation", "After understanding your objectives and needs, we begin the research and preparation of the dossier, selecting the information relevant to your case.\n\nEach piece of content is verified, organized and integrated with the necessary clarifications, with care, attention and maximum efficiency."],
        ["Report delivery", "You receive a clear, written and structured report, ready to use.\n\nThe information is organized in a simple, orderly and practical way, helping you understand the overall picture and make informed, confident decisions."],
        ["Final consultation", "If you wish, we can review the report together in a dedicated call.\n\nWe go through the results, clarify any questions and help you turn the information collected into practical insights for your decisions."],
      ],
    },
    about: {
      title: "A bridge between the European Union and Brazil for reliable, clear and practical information.",
      body: "We work between Europe and Brazil, and we understand both the needs of European and international companies, professionals and clients, and the complex regulatory, administrative, tax and cultural reality of the Brazilian market.\n\nOur expertise comes from an international background combining law, international trade, EU project management, entrepreneurship and practical knowledge of the European and Brazilian markets.\n\nOur goal is to help you better understand the context in which you want to operate, reducing the impact of the so-called Custo Brasil: bureaucracy, regulatory complexity, information asymmetries, interpretative difficulties and operational risks that may slow down or complicate decision-making.\n\nOur work is independent, confidential and focused on providing reliable, selected and truly useful information, so you can make informed decisions.\n\nNo noise, no fillers: only the answers you need, at the right time.",
    },
    testimonials: {
      title: "What clients say",
      placeholder: "[Client testimonial coming soon]",
    },
    faq: {
      title: "Frequently asked questions",
      items: [
        ["How long does a report take?", "Typically a few business days, depending on scope."],
        ["What languages do you work in?", "Reports are delivered in English; I also work in Italian and Portuguese."],
        ["Is my request confidential?", "Yes, always."],
        ["Can you do custom research?", "Yes — just describe what you need and I'll scope it."],
        ["How much does it cost?", "Each package has a starting price; custom work is quoted per request."],
      ],
    },
    contact: {
      title: "Tell me what you need to know about Brazil.",
      sub: "Send a short description of your request and I'll get back to you with next steps.",
      name: "Name",
      email: "Email",
      company: "Company (optional)",
      message: "What do you need?",
      send: "Send request",
      book: "Book a 15-min call",
      or: "or email",
    },
    consent: {
      label: "I have read the",
      link: "privacy notice",
      suffix: "and I consent to the processing of my personal data to receive a reply.",
      required: "You must accept the privacy notice to send your request.",
    },
    footer: {
      tag: "Business intelligence & research on Brazil.",
      rights: "© 2026 Business Matching Global.",
      legalName: "Registered name",
      address: "Address",
      privacy: "Privacy & Data Protection",
      memberOf: "Member of:",
      cookies: "Cookie preferences",
      newsletter: "Newsletter #CustoBrasil",
    },
    newsletter: {
      title: "Newsletter #CustoBrasil",
      body: "Subscribe for updates on Brazil, the Custo Brasil and business opportunities.",
      cta: "Subscribe",
      emailPlaceholder: "Your email address",
      consent: "I agree to receive the newsletter and accept the privacy policy.",
      success: "Almost there! Complete the security check in the Iubenda box to receive the confirmation email.",
      error: "Something went wrong. Please try again.",
      invalid: "Please enter a valid email address.",
      consentRequired: "Please accept the privacy policy to continue.",
    },
    fly: {
      back: "Back to home",
      eyebrow: "Quick contact",
      title: "Request information",
      sub: "Leave your details and we will get back to you as soon as possible.",
      organization: "Organization / Contact Person",
      email: "Email",
      phone: "Mobile phone",
      whatsapp: "WhatsApp",
      prefix: "Prefix",
      number: "Number",
      consentLabel: "I have read the ",
      consentLink: "privacy notice",
      consentSuffix: "and I consent to the processing of my data to be contacted.",
      consentRequired: "You must accept the privacy notice to send the request.",
      submit: "Send request",
      invalid: "Please check the fields: all are required and the email must be valid.",
      required: "All fields are required.",
      successTitle: "Thank you! Your request has been sent.",
      successBody: "We will get back to you soon. If you do not hear from us, please check your SPAM folder.",
      passengerTitle: "Passengers",
      passengerSub: "Enter passenger details for the flight request.",
      passengerAttention: "Please pay maximum attention when entering FIRST and LAST NAME: they must match exactly what is shown on the passport used for the trip.",
      passenger: "Passenger",
      addPassenger: "Add passenger",
      removePassenger: "Remove",
      lastName: "Last name",
      firstName: "First name",
      birthDate: "Date of birth",
      class: "Class",
      classEconomy: "Economy",
      classPremium: "Premium",
      classBusiness: "Business",
      bags: "Checked bags",
      weight: "Bag weight",
      passengerIncomplete: "Please complete all passenger details: last name, first name, date of birth and citizenship/passport are required.",
    },
  },
  it: {
    nav: { home: "Home", servicesLink: "Come possiamo aiutarti?", services: "Servizi", how: "Come funziona", method: "Il nostro metodo", about: "Chi siamo", travel: "Business Travel", news: "Ebook", analysis: "Analisi", analysisAll: "Tutti gli articoli →", contact: "Contatti" },
    hero: {
      title: "Business intelligence affidabile sul Brasile — senza tirare a indovinare.",
      sub: "Aiutiamo le aziende e gli investitori a prendere decisioni sicure e informate per operare in Brasile, esportare, investire o creare partnership commerciali.\n\nOffriamo servizi di business intelligence, verifica dei potenziali fornitori e clienti e analisi delle principali informazioni normative, fiscali e operative, quali import/export, procedure doganali, requisiti locali, autorizzazioni, incentivi territoriali e condizioni di accesso al mercato.\n\nAttraverso servizi su misura, realizziamo report chiari, pratici e pronti all'uso, pensati per supportare decisioni commerciali, strategiche e operative.",
      cta1: "Richiedi un report",
      cta2: "Scopri i servizi",
      linkedin: "Seguici su LinkedIn per approfondimenti e aggiornamenti sul Brasile →",
    },
    problem: {
      title: "Fare affari in Brasile non dovrebbe essere un salto nel buio.",
      body: "Chi si avvicina al mercato brasiliano si trova spesso ad affrontare gli stessi ostacoli: difficoltà di accesso a informazioni affidabili e aggiornate, dati frammentati, fonti difficili da verificare e norme non sempre semplici da interpretare.\n\nIl problema non è solo linguistico. Per operare in Brasile, infatti, non basta comprendere cosa prevedono le regole: è necessario anche capire come vengono applicate nella pratica, all’interno di un sistema amministrativo, fiscale e culturale diverso.\n\nQuesta complessità può creare punti ciechi e portare a supposizioni errate. Nel business, una singola valutazione sbagliata può costare tempo, denaro e opportunità.\n\nNoi trasformiamo questa incertezza in un quadro chiaro, verificabile e operativo, che consente di prendere decisioni con piena consapevolezza.",
      items: [
        ["Informazioni errate", "Il problema non riguarda soltanto la difficoltà di reperire informazioni, ma anche la complessità di verificarne l’attendibilità e il grado di aggiornamento.\n\nLe fonti disponibili possono essere frammentate, incomplete o persino contraddittorie, rendendo difficile stabilire quali dati siano realmente affidabili e su quali elementi sia possibile basare una decisione informata."],
        ["Interpretazioni errate", "Disporre di informazioni affidabili è solo il primo passo. Per prendere decisioni realmente consapevoli, è necessario saperle leggere, interpretare e contestualizzare correttamente.\n\nLa conoscenza della lingua, da sola, non è sufficiente. Occorre comprendere come quelle informazioni vengono interpretate dagli operatori locali e come trovano concreta applicazione nella pratica amministrativa, fiscale e commerciale."],
        ["Errori Costosi", "Quando le decisioni si basano su dati non corretti o interpretati in modo errato, il rischio è quello di compiere scelte strategiche sbagliate, con costi significativi in termini di tempo, denaro e opportunità perse."],
      ],
    },
    services: {
      title: "Come possiamo aiutarti?",
      from: "a partire da",
      request: "Richiedi",
      custom: "Hai bisogno di un servizio informativo su misura?\n\nContattaci e raccontaci di cosa hai bisogno. Studieremo insieme la soluzione più adatta alle tue esigenze.\n\nA seconda del Paese in cui operi e dei programmi disponibili, il costo dei nostri servizi informativi potrebbe, in alcuni casi, essere sostenuto in parte o anche interamente da programmi europei, nazionali o regionali dedicati all’internazionalizzazione, all’innovazione e allo sviluppo delle imprese.\n\nSe necessario, saremo lieti di aiutarti a individuare queste opportunità e a valutare se i nostri servizi possano rientrare tra le spese ammissibili previste dai programmi applicabili.\n\nIl nostro obiettivo è offrirti il massimo valore possibile, trasformando informazioni affidabili e verificabili in decisioni più consapevoli e nuove opportunità di crescita.",
      cards: [
        {
          name: "Verifica Controparte Brasile",
          promise: "Sai con chi stai trattando, prima di impegnarti.",
          items: [
            "Esistenza e stato di registrazione dell'azienda",
            "Proprietà, amministratori e informazioni di base",
            "Reputazione e segnali di rischio pubblici",
            "Verifica di clienti, fornitori, partner, distributori o agenti",
            "Sintesi finale con indicazione chiara del livello di rischio",
          ],
          price: "150 €",
        },
        {
          name: "Analisi di Mercato Brasile",
          promise: "Comprendi il mercato prima di entrarci.",
          items: [
            "Dimensione e caratteristiche del mercato per il tuo prodotto o settore",
            "Domanda potenziale, canali di vendita e posizionamento",
            "Aree geografiche più promettenti e localizzazione più adatta",
            "Analisi della concorrenza e dei principali operatori",
            "Normative, standard e requisiti rilevanti",
            "Dazi, barriere non tariffarie e criticità all'importazione in sintesi",
          ],
          price: "500 €",
        },
        {
          name: "Briefing Import/Export Brasile",
          promise: "Chiarisci requisiti, procedure e rischi prima di avviare l'operazione.",
          items: [
            "Procedure e documentazione necessaria",
            "Classificazione del prodotto e regole applicabili",
            "Requisiti doganali, fiscali e regolatori principali",
            "Errori tipici e criticità da evitare",
            "Fonti, riferimenti e indicazioni operative",
          ],
          price: "600 €",
        },
      ],
    },
    how: {
      title: "Semplice, veloce, chiaro.",
      steps: [
        ["Entra in contatto con noi e spiegaci di cosa hai bisogno e quali sono i tuoi obiettivi.", "Ti ricontatteremo per chiarire ogni eventuale dubbio, comprendere meglio le tue esigenze e ottimizzare il nostro lavoro, così da aiutarti ad andare direttamente al punto: raggiungere il tuo obiettivo nel modo più chiaro, efficiente e mirato possibile."],
        ["Ricerca e redazione del dossier", "Dopo aver compreso obiettivi ed esigenze, avviamo la ricerca e la redazione del dossier, selezionando le informazioni rilevanti per il tuo caso.\n\nOgni contenuto viene verificato, organizzato e integrato con i chiarimenti necessari, con cura, attenzione e massima efficienza."],
        ["Consegna del report", "Ricevi un report chiaro, scritto e strutturato, pronto all'uso.\n\nLe informazioni vengono organizzate in modo semplice, ordinato e operativo, per aiutarti a comprendere il quadro e prendere decisioni consapevoli e sicure."],
        ["Confronto finale", "Se lo desideri, possiamo analizzare insieme il report in una call dedicata.\n\nApprofondiamo i risultati, chiariamo eventuali dubbi e ti aiutiamo a trasformare le informazioni raccolte in indicazioni pratiche per le tue decisioni."],
      ],
    },
    about: {
      title: "Un ponte tra Unione Europea e Brasile per informazioni affidabili, chiare e operative.",
      body: "Lavoriamo tra l'Europa e il Brasile e comprendiamo sia le esigenze di imprese, professionisti e clienti europei e internazionali, sia la complessa realtà normativa, amministrativa, fiscale e culturale del mercato brasiliano.\n\nLa nostra competenza nasce da un percorso internazionale che unisce diritto, commercio internazionale, europrogettazione, attività imprenditoriale e conoscenza pratica dei mercati europei e brasiliani.\n\nIl nostro obiettivo è aiutarti a comprendere meglio il contesto in cui vuoi operare, riducendo l'impatto del cosiddetto Custo Brasil: burocrazia, complessità regolatoria, asimmetrie informative, difficoltà interpretative e rischi operativi che possono rallentare o complicare le decisioni.\n\nIl nostro lavoro è indipendente, riservato e orientato a fornirti informazioni affidabili, selezionate e realmente utili per decidere in modo informato.\n\nNiente rumore, niente riempitivi: solo le risposte che ti servono, nei tempi giusti.",
    },
    testimonials: {
      title: "Cosa dicono i clienti",
      placeholder: "[Testimonianza in arrivo]",
    },
    faq: {
      title: "Domande frequenti",
      items: [
        ["Quanto tempo richiede un report?", "Di solito pochi giorni lavorativi, a seconda della complessità."],
        ["In che lingue lavori?", "Consegno i report in inglese, italiano e portoghese."],
        ["La mia richiesta è riservata?", "Sì, sempre."],
        ["Puoi fare ricerche su misura?", "Sì — descrivimi cosa ti serve e la definiamo insieme."],
        ["Quanto costa?", "Ogni pacchetto ha un prezzo di partenza; i lavori su misura sono quotati su richiesta."],
      ],
    },
    contact: {
      title: "Dimmi cosa hai bisogno di sapere sul Brasile.",
      sub: "Inviami una breve descrizione della tua richiesta e ti risponderò con i prossimi passi.",
      name: "Nome",
      email: "Email",
      company: "Azienda (facoltativo)",
      message: "Di cosa hai bisogno?",
      send: "Invia richiesta",
      book: "Prenota una call di 15 minuti",
      or: "oppure scrivi a",
    },
    consent: {
      label: "Ho letto l'",
      link: "informativa privacy",
      suffix: "e acconsento al trattamento dei miei dati personali per ricevere una risposta.",
      required: "Devi accettare l'informativa privacy per inviare la richiesta.",
    },
    footer: {
      tag: "Ricerca e business intelligence sul Brasile.",
      rights: "© 2026 Business Matching Global.",
      legalName: "Ragione sociale",
      address: "Sede legale",
      privacy: "Privacy e Protezione Dati",
      memberOf: "Membro di:",
      cookies: "Preferenze cookie",
      newsletter: "Newsletter #CustoBrasil",
    },
    newsletter: {
      title: "Newsletter #CustoBrasil",
      body: "Iscriviti per ricevere aggiornamenti sul Brasile, il Custo Brasil e le opportunità di business.",
      cta: "Iscriviti",
      emailPlaceholder: "La tua email",
      consent: "Accetto di ricevere la newsletter e l'informativa sulla privacy.",
      success: "Ci siamo quasi! Completa la verifica nel riquadro Iubenda per ricevere l'email di conferma.",
      error: "Qualcosa è andato storto. Riprova.",
      invalid: "Inserisci un indirizzo email valido.",
      consentRequired: "Devi accettare l'informativa sulla privacy per continuare.",
    },
    fly: {
      back: "Torna alla home",
      eyebrow: "Contatto rapido",
      title: "Richiesta informazioni",
      sub: "Lascia i tuoi recapiti e ti ricontatteremo al più presto.",
      organization: "Organizzazione/Persona di Riferimento",
      email: "Email",
      phone: "Cellulare",
      whatsapp: "WhatsApp",
      prefix: "Prefisso",
      number: "Numero",
      consentLabel: "Ho letto l'",
      consentLink: "informativa privacy",
      consentSuffix: "e acconsento al trattamento dei miei dati per essere ricontattato.",
      consentRequired: "Devi accettare l'informativa privacy per inviare la richiesta.",
      submit: "Invia richiesta",
      invalid: "Controlla i campi: tutti sono obbligatori e l'email deve essere valida.",
      required: "Tutti i campi sono obbligatori.",
      successTitle: "Grazie! La richiesta è stata inviata.",
      successBody: "Ti ricontatteremo al più presto. Se non ricevi risposta, controlla anche la cartella SPAM.",
      passengerTitle: "Passeggeri",
      passengerSub: "Inserisci i dati dei passeggeri per la richiesta di volo.",
      passengerAttention: "Prestare massima attenzione nella compilazione di NOME e COGNOME: devono corrispondere esattamente a quanto riportato sul passaporto utilizzato per il viaggio.",
      passenger: "Passeggero",
      addPassenger: "Aggiungi passeggero",
      removePassenger: "Rimuovi",
      lastName: "Cognome",
      firstName: "Nome",
      birthDate: "Data di nascita",
      class: "Classe",
      classEconomy: "Economy",
      classPremium: "Premium",
      classBusiness: "Business",
      bags: "Bagagli in stiva",
      weight: "Peso bagaglio",
      passengerIncomplete: "Completa i dati di tutti i passeggeri: cognome, nome, data di nascita e cittadinanza/passaporto sono obbligatori.",
    },
  },
  pt: {
    nav: { home: "Home", servicesLink: "Como podemos ajudar?", services: "Serviços", how: "Como funciona", method: "Nosso método", about: "Quem somos", travel: "Business Travel", news: "Ebook", analysis: "Análises", analysisAll: "Todos os artigos →", contact: "Contato" },
    hero: {
      title: "Inteligência de negócios confiável sobre o Brasil — sem achismos.",
      sub: "Ajudamos empresas e investidores a tomar decisões sólidas e bem fundamentadas ao fazer negócios no Brasil, incluindo exportação, investimento e desenvolvimento de parcerias comerciais.\n\nNossos serviços incluem inteligência de negócios, due diligence de potenciais fornecedores e clientes, e análise de informações regulatórias, tributárias e operacionais essenciais, tais como procedimentos de importação, exportação e desembaraço aduaneiro, requisitos e licenças locais, incentivos regionais e condições de acesso ao mercado.\n\nPor meio de serviços personalizados, elaboramos relatórios claros, práticos e prontos para uso, desenvolvidos para apoiar decisões comerciais, estratégicas e operacionais.",
      cta1: "Solicite um relatório",
      cta2: "Ver serviços",
      linkedin: "Acompanhe a Business Matching Global no LinkedIn para acessar análises, relatórios e atualizações sobre o Brasil.",
    },
    problem: {
      title: "Fazer negócios no Brasil não precisa ser um salto no escuro.",
      body: "Quem se aproxima do mercado brasileiro costuma encontrar obstáculos semelhantes: dificuldade de acesso a informações confiáveis e atualizadas, dados fragmentados, fontes difíceis de verificar e normas nem sempre simples de interpretar.\n\nO desafio, porém, não é apenas linguístico. Para atuar no Brasil, não basta compreender o que as regras dizem. É essencial entender como elas são aplicadas na prática, dentro de um sistema administrativo, tributário e cultural próprio, muitas vezes bastante diferente daquele de outros mercados.\n\nEssa complexidade pode gerar pontos cegos, levar a interpretações equivocadas e comprometer decisões estratégicas. No ambiente empresarial, uma única avaliação incorreta pode custar tempo, dinheiro e oportunidades.\n\nNós transformamos essa incerteza em um panorama claro, verificável e operacional, permitindo que empresas e profissionais tomem decisões com segurança, critério e plena consciência.",
      items: [
        ["Informações não confiáveis", "O desafio muitas vezes está em lidar com informações fragmentadas, de difícil acesso e nem sempre fáceis de verificar, seja quanto à sua confiabilidade, seja quanto ao seu grado de atualização.\n\nAs fontes disponíveis podem ser incompletas, desatualizadas ou até contraditórias, tornando complexo entender quais dados podem de fato ser considerados confiáveis e utilizados como base para decisões bem fundamentadas."],
        ["Interpretações equivocadas", "Ter acesso a informações confiáveis é apenas o primeiro passo. Para tomar decisões verdadeiramente bem fundamentadas, é preciso saber interpretá-las, contextualizá-las e compreender como elas são aplicadas na prática.\n\nO domínio do idioma, isoladamente, não basta. É necessário entender como profissionais e operadores locais interpretam essas informações e de que forma elas se traduzem no dia a dia administrativo, tributário e comercial.\n\nEsse desafio se torna ainda maior quando as informações disponíveis são fragmentadas, difíceis de acessar e nem sempre fáceis de verificar. As fontes podem ser incompletas, desatualizadas ou contraditórias, tornando complexa a identificação de dados realmente confiáveis para embasar decisões informadas."],
        ["Erros custosos", "Quando as decisões são baseadas em dados imprecisos, incompletos ou mal interpretados, as empresas correm o risco de fazer escolhas estratégicas equivocadas, com custos significativos em termos de tempo, dinheiro e oportunidades perdidas."],
      ],
    },
    services: {
      title: "Como podemos te ajudar?",
      from: "a partir de",
      request: "Solicitar",
      custom: "Precisa de um serviço de informação sob medida?\n\nEntre em contato conosco e conte-nos do que você precisa. Juntos, estudaremos a solução mais adequada às suas necessidades.\n\nDependendo do país em que você atua e dos programas disponíveis, o custo dos nossos serviços de informação poderá, em alguns casos, ser financiado parcial ou até integralmente por programas europeus, nacionais ou regionais voltados para a internacionalização, a inovação e o desenvolvimento das empresas.\n\nSe necessário, teremos prazer em ajudá-lo a identificar essas oportunidades e a avaliar se os nossos serviços podem ser considerados despesas elegíveis no âmbito dos programas aplicáveis.\n\nNosso objetivo é oferecer o máximo valor possível, transformando informações confiáveis e verificáveis em decisões mais conscientes e em novas oportunidades de crescimento.",
      cards: [
        {
          name: "Verificação de Contraparte no Brasil",
          promise: "Saiba com quem você está negociando antes de assumir qualquer compromisso.",
          items: [
            "Existência e situação cadastral da empresa",
            "Quadro societário, administradores e informações básicas",
            "Reputação e sinais públicos de risco",
            "Verificação de clientes, fornecedores, parceiros, distribuidores ou agentes",
            "Síntese final com indicação clara do nível de risco",
          ],
          price: "€150",
        },
        {
          name: "Análise de Mercado Brasil",
          promise: "Compreenda o mercado antes de entrar nele.",
          items: [
            "Dimensão e principais características do mercado para seu produto ou setor",
            "Demanda potencial, canais de venda e posicionamento",
            "Áreas geográficas mais promissoras e localização mais adequada",
            "Análise da concorrência e dos principais operadores do mercado",
            "Normas, padrões e requisitos relevantes",
            "Tarifas, barreiras não tarifárias e principais questões de importação em síntese",
          ],
          price: "€500",
        },
        {
          name: "Briefing de Importação/Exportação Brasil",
          promise: "Esclareça requisitos, procedimentos e riscos antes de iniciar a operação.",
          items: [
            "Procedimentos e documentação necessários",
            "Classificação do produto e regras aplicáveis",
            "Principais requisitos aduaneiros, tributários e regulatórios",
            "Erros comuns e pontos críticos a evitar",
            "Fontes, referências e orientações práticas",
          ],
          price: "€600",
        },
      ],
    },
    how: {
      title: "Simples, rápido, claro.",
      steps: [
        ["Entre em contato conosco e explique o que você precisa e quais são os seus objetivos.", "Nós entraremos em contato para esclarecer eventuais dúvidas, entender melhor as suas necessidades e otimizar nosso trabalho, ajudando você a ir direto ao ponto: alcançar o seu objetivo da forma mais clara, eficiente e direcionada possível."],
        ["Pesquisa e elaboração do dossiê", "Após compreender seus objetivos e necessidades, iniciamos a pesquisa e a elaboração do dossiê, selecionando as informações relevantes para o seu caso.\n\nCada conteúdo é verificado, organizado e integrado com os esclarecimentos necessários, com cuidado, atenção e máxima eficiência."],
        ["Entrega do relatório", "Você recebe um relatório claro, escrito e estruturado, pronto para uso.\n\nAs informações são organizadas de forma simples, ordenada e prática, ajudando você a compreender o cenário e tomar decisões conscientes e seguras."],
        ["Conversa final", "Se desejar, podemos analisar o relatório juntos em uma call dedicada.\n\nAprofundamos os resultados, esclarecemos eventuais dúvidas e ajudamos você a transformar as informações coletadas em orientações práticas para suas decisões."],
      ],
    },
    about: {
      title: "Uma ponte entre a União Europeia e o Brasil para informações confiáveis, claras e operacionais.",
      body: "Atuamos entre a Europa e o Brasil e compreendemos tanto as necessidades de empresas, profissionais e clientes europeus e internacionais quanto a complexa realidade normativa, administrativa, fiscal e cultural do mercado brasileiro.\n\nNossa competência nasce de uma trajetória internacional que une direito, comércio internacional, projetos europeus, atividade empreendedora e conhecimento prático dos mercados europeu e brasileiro.\n\nNosso objetivo é ajudar você a compreender melhor o contexto em que deseja atuar, reduzindo o impacto do chamado Custo Brasil: burocracia, complexidade regulatória, assimetrias de informação, dificuldades de interpretação e riscos operacionais que podem atrasar ou complicar a tomada de decisões.\n\nNosso trabalho é independente, confidencial e orientado a fornecer informações confiáveis, selecionadas e realmente úteis para que você possa decidir de forma informada.\n\nSem ruído, sem conteúdo desnecessário: apenas as respostas de que você precisa, no momento certo.",
    },
    testimonials: {
      title: "O que dizem os clientes",
      placeholder: "[Depoimento em breve]",
    },
    faq: {
      title: "Perguntas frequentes",
      items: [
        ["Quanto tempo leva um relatório?", "Em geral, poucos dias úteis, dependendo do escopo."],
        ["Em quais idiomas você trabalha?", "Entrego relatórios em inglês, italiano e português."],
        ["Minha solicitação é sigilosa?", "Sim, sempre."],
        ["Você faz pesquisas sob medida?", "Sim — descreva o que você precisa e definimos juntos."],
        ["Quanto custa?", "Cada pacote tem um preço inicial; trabalhos sob medida são orçados conforme a solicitação."],
      ],
    },
    contact: {
      title: "Me diga o que você precisa saber sobre o Brasil.",
      sub: "Envie uma breve descrição da sua solicitação e eu retorno com os próximos passos.",
      name: "Nome",
      email: "E-mail",
      company: "Empresa (opcional)",
      message: "Do que você precisa?",
      send: "Enviar solicitação",
      book: "Agende uma call de 15 min",
      or: "ou envie um e-mail para",
    },
    consent: {
      label: "Li o",
      link: "aviso de privacidade",
      suffix: "e concordo com o tratamento dos meus dados pessoais para receber uma resposta.",
      required: "Você precisa aceitar o aviso de privacidade para enviar a solicitação.",
    },
    footer: {
      tag: "Pesquisa e inteligência de negócios sobre o Brasil.",
      rights: "© 2026 Business Matching Global.",
      legalName: "Razão social",
      address: "Endereço",
      privacy: "Privacidade e Proteção de Dados",
      memberOf: "Membro de:",
      cookies: "Preferências de cookies",
      newsletter: "Newsletter #CustoBrasil",
    },
    newsletter: {
      title: "Newsletter #CustoBrasil",
      body: "Inscreva-se para receber atualizações sobre o Brasil, o Custo Brasil e oportunidades de negócios.",
      cta: "Inscreva-se",
      emailPlaceholder: "Seu e-mail",
      consent: "Aceito receber a newsletter e a política de privacidade.",
      success: "Quase lá! Complete a verificação no quadro da Iubenda para receber o e-mail de confirmação.",
      error: "Algo deu errado. Tente novamente.",
      invalid: "Digite um endereço de e-mail válido.",
      consentRequired: "Você precisa aceitar a política de privacidade para continuar.",
    },
    fly: {
      back: "Voltar para a home",
      eyebrow: "Contato rápido",
      title: "Solicite informações",
      sub: "Deixe seus dados e entraremos em contato o mais breve possível.",
      organization: "Organização / Pessoa de Contato",
      email: "E-mail",
      phone: "Telemóvel",
      whatsapp: "WhatsApp",
      prefix: "Prefixo",
      number: "Número",
      consentLabel: "Li o ",
      consentLink: "aviso de privacidade",
      consentSuffix: "e concordo com o tratamento dos meus dados para ser contatado.",
      consentRequired: "Você precisa aceitar o aviso de privacidade para enviar a solicitação.",
      submit: "Enviar solicitação",
      invalid: "Verifique os campos: todos são obrigatórios e o e-mail deve ser válido.",
      required: "Todos os campos são obrigatórios.",
      successTitle: "Obrigado! Sua solicitação foi enviada.",
      successBody: "Entraremos em contato em breve. Se não receber resposta, verifique a pasta de SPAM.",
      passengerTitle: "Passageiros",
      passengerSub: "Insira os dados dos passageiros para a solicitação de voo.",
      passengerAttention: "Prestar máxima atenção ao preencher NOME e SOBRENOME: devem corresponder exatamente ao que consta no passaporte utilizado para a viagem.",
      passenger: "Passageiro",
      addPassenger: "Adicionar passageiro",
      removePassenger: "Remover",
      lastName: "Sobrenome",
      firstName: "Nome",
      birthDate: "Data de nascimento",
      class: "Classe",
      classEconomy: "Econômica",
      classPremium: "Premium",
      classBusiness: "Executiva",
      bags: "Bagagem despachada",
      weight: "Peso da bagagem",
      passengerIncomplete: "Complete os dados de todos os passageiros: sobrenome, nome, data de nascimento e cidadania/passaporte são obrigatórios.",
    },
  },
} as const;

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Dict };
const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "en";
    const saved = localStorage.getItem("bmg-lang") as Lang | null;
    if (saved && ["en", "it", "pt"].includes(saved)) return saved;
    const browser = navigator.language.toLowerCase();
    if (browser.startsWith("it")) return "it";
    if (browser.startsWith("pt")) return "pt";
    return "en";
  });

  useEffect(() => {
    localStorage.setItem("bmg-lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  return createElement(
    LanguageContext.Provider,
    { value: { lang, setLang: setLangState, t: translations[lang] as Dict } },
    children
  );
}

export function useT() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useT must be used within LanguageProvider");
  return ctx;
}