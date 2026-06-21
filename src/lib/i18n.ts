import { createContext, useContext, useState, useEffect, ReactNode, createElement } from "react";

export type Lang = "en" | "it" | "pt";

type Dict = typeof translations.en;

export const translations = {
  en: {
    nav: { services: "Services", how: "How it works", about: "About", contact: "Contact" },
    hero: {
      title: "Reliable business intelligence on Brazil — without the guesswork.",
      sub: "We help companies and investors make sound and informed decisions when doing business in Brazil, including exporting, investing, and forming commercial partnerships.\n\nOur services include business intelligence, due diligence on potential suppliers and customers, and analysis of key regulatory, tax, and operational information, such as import/export and customs procedures, local requirements and permits, regional incentives, and market access conditions.\n\nThrough tailored services, we produce clear, practical, and ready-to-use reports designed to support commercial, strategic, and operational decisions.",
      cta1: "Request a report",
      cta2: "See services",
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
      custom: "Do you need a tailored analysis?\nWe can carry out customized research based on your sector, product or objective. Tell us about your needs and we will assess the most suitable solution together.",
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
        ["Tell me what you need", "A short brief or a quick call."],
        ["I research it", "Using local knowledge and official Brazilian sources."],
        ["You get a clear report", "Written, structured, in English, ready to use."],
        ["We review it together", "An optional call to walk through the findings."],
      ],
    },
    about: {
      title: "An EU–Brazil bridge for reliable information.",
      body: "I work between Italy and Brazil, so I understand both the international client's needs and the realities of the Brazilian market. My work is independent, confidential and focused on one thing: giving you information you can actually decide on. No noise, no filler — just the answers you need, on time.",
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
      cnae: "Main activity",
      capital: "Share capital",
      privacy: "Privacy & Data Protection",
    },
  },
  it: {
    nav: { services: "Servizi", how: "Come funziona", about: "Chi sono", contact: "Contatti" },
    hero: {
      title: "Business intelligence affidabile sul Brasile — senza tirare a indovinare.",
      sub: "Aiutiamo le aziende e gli investitori a prendere decisioni sicure e informate per operare in Brasile, esportare, investire o creare partnership commerciali.\n\nOffriamo servizi di business intelligence, verifica dei potenziali fornitori e clienti e analisi delle principali informazioni normative, fiscali e operative, quali import/export, procedure doganali, requisiti locali, autorizzazioni, incentivi territoriali e condizioni di accesso al mercato.\n\nAttraverso servizi su misura, realizziamo report chiari, pratici e pronti all'uso, pensati per supportare decisioni commerciali, strategiche e operative.",
      cta1: "Richiedi un report",
      cta2: "Scopri i servizi",
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
      custom: "Hai bisogno di un'analisi su misura?\nPossiamo realizzare ricerche personalizzate in base al tuo settore, prodotto o obiettivo. Raccontaci le tue esigenze e valuteremo insieme la soluzione più adatta.",
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
        ["Dimmi cosa ti serve", "Un breve briefing o una rapida call."],
        ["Faccio la ricerca", "Con conoscenza locale e fonti ufficiali brasiliane."],
        ["Ricevi un report chiaro", "Scritto, strutturato, pronto all'uso."],
        ["Lo rivediamo insieme", "Una call facoltativa per analizzare i risultati."],
      ],
    },
    about: {
      title: "Un ponte UE–Brasile per informazioni affidabili.",
      body: "Lavoro tra l'Italia e il Brasile: capisco sia le esigenze del cliente internazionale sia la realtà del mercato brasiliano. Il mio lavoro è indipendente, riservato e con un solo obiettivo: darti informazioni su cui puoi davvero decidere. Niente rumore, niente riempitivi — solo le risposte che ti servono, nei tempi giusti.",
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
      cnae: "CNAE principale",
      capital: "Capitale sociale",
      privacy: "Privacy e Protezione Dati",
    },
  },
  pt: {
    nav: { services: "Serviços", how: "Como funciona", about: "Sobre", contact: "Contato" },
    hero: {
      title: "Inteligência de negócios confiável sobre o Brasil — sem achismos.",
      sub: "Ajudamos empresas e investidores a tomar decisões sólidas e bem fundamentadas ao fazer negócios no Brasil, incluindo exportação, investimento e desenvolvimento de parcerias comerciais.\n\nNossos serviços incluem inteligência de negócios, due diligence de potenciais fornecedores e clientes, e análise de informações regulatórias, tributárias e operacionais essenciais, tais como procedimentos de importação, exportação e desembaraço aduaneiro, requisitos e licenças locais, incentivos regionais e condições de acesso ao mercado.\n\nPor meio de serviços personalizados, elaboramos relatórios claros, práticos e prontos para uso, desenvolvidos para apoiar decisões comerciais, estratégicas e operacionais.",
      cta1: "Solicite um relatório",
      cta2: "Ver serviços",
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
      custom: "Você precisa de uma análise sob medida?\nPodemos realizar pesquisas personalizadas com base no seu setor, produto ou objetivo. Conte-nos quais são as suas necessidades e avaliaremos juntos a solução mais adequada.",
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
        ["Diga o que você precisa", "Um briefing rápido ou uma call."],
        ["Eu pesquiso", "Com conhecimento local e fontes oficiais brasileiras."],
        ["Você recebe um relatório claro", "Escrito, estruturado, pronto para usar."],
        ["Revisamos juntos", "Uma call opcional para analisar os resultados."],
      ],
    },
    about: {
      title: "Uma ponte UE–Brasil para informações confiáveis.",
      body: "Atuo entre a Itália e o Brasil, então entendo tanto as necessidades do cliente internacional quanto a realidade do mercado brasileiro. Meu trabalho é independente, sigiloso e focado em uma coisa: te dar informações sobre as quais você possa realmente decidir. Sem ruído, sem enrolação — só as respostas que você precisa, no prazo.",
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
      cnae: "CNAE principal",
      capital: "Capital social",
      privacy: "Privacidade e Proteção de Dados",
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