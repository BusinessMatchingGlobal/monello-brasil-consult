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
        ["Fragmented information", "Information is often fragmented, difficult to access and hard to verify, both in terms of reliability and timeliness.\n\nSources may contradict one another, making it difficult to determine which data can truly be trusted and used as a basis for informed decision-making."],
        ["Language & bureaucracy", "Local rules and documents that are easy to misread."],
        ["Costly mistakes", "Decisions made on incomplete or outdated data."],
      ],
    },
    services: {
      title: "What I can find out for you",
      from: "from",
      request: "Request this",
      custom: "Need something different or ongoing? Custom and retainer research available — just describe what you need.",
      cards: [
        {
          name: "Brazil Supplier Check",
          promise: "Know who you're dealing with before you commit.",
          items: [
            "Company existence and registration status",
            "Ownership and basic background",
            "Reputation and public red flags",
            "Summary with a clear risk indication",
          ],
          price: "€150",
        },
        {
          name: "Brazil Market Snapshot",
          promise: "Understand a market before you enter it.",
          items: [
            "Demand and market overview for your product or sector",
            "Key competitors and price ranges",
            "Relevant regulations and standards",
            "Import duties and barriers at a glance",
          ],
          price: "€500",
        },
        {
          name: "Import/Export Briefing",
          promise: "Know exactly what your operation requires.",
          items: [
            "Procedures and required documentation",
            "Product classification and applicable rules",
            "Key requirements and typical pitfalls",
            "Sources and references",
          ],
          price: "€600",
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
        ["Informazioni difficili da reperire", "Spesso complesse da verificare, sia in termini di attendibilità sia di aggiornamento.\n\nFonti che talvolta si contraddicono tra loro, rendendo difficile capire quali dati siano realmente affidabili e su quali elementi sia possibile fondare una decisione."],
        ["Lingua e burocrazia", "Regole e documenti locali facili da fraintendere."],
        ["Errori costosi", "Decisioni prese su dati incompleti o superati."],
      ],
    },
    services: {
      title: "Cosa posso scoprire per te",
      from: "a partire da",
      request: "Richiedi",
      custom: "Ti serve qualcosa di diverso o continuativo? Ricerche su misura e a contratto disponibili — descrivimi cosa ti serve.",
      cards: [
        {
          name: "Verifica Fornitore Brasile",
          promise: "Sai con chi tratti, prima di impegnarti.",
          items: [
            "Esistenza e stato di registrazione dell'azienda",
            "Proprietà e informazioni di base",
            "Reputazione e segnali di rischio pubblici",
            "Sintesi con un'indicazione chiara del rischio",
          ],
          price: "150 €",
        },
        {
          name: "Analisi di Mercato Brasile",
          promise: "Capisci un mercato prima di entrarci.",
          items: [
            "Panoramica di domanda e mercato per il tuo prodotto o settore",
            "Principali concorrenti e fasce di prezzo",
            "Normative e standard rilevanti",
            "Dazi e barriere all'importazione in sintesi",
          ],
          price: "500 €",
        },
        {
          name: "Briefing Import/Export",
          promise: "Sai esattamente cosa richiede la tua operazione.",
          items: [
            "Procedure e documentazione necessaria",
            "Classificazione del prodotto e regole applicabili",
            "Requisiti chiave ed errori tipici",
            "Fonti e riferimenti",
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
        ["Informações fragmentadas", "O desafio muitas vezes está em lidar com informações fragmentadas, de difícil acesso e nem sempre fáceis de verificar, seja quanto à sua confiabilidade, seja quanto ao seu grado de atualização.\n\nAs fontes disponíveis podem ser incompletas, desatualizadas ou até contraditórias, tornando complexo entender quais dados podem de fato ser considerados confiáveis e utilizados como base para decisões bem fundamentadas."],
        ["Idioma e burocracia", "Regras e documentos locais fáceis de interpretar errado."],
        ["Erros caros", "Decisões tomadas com dados incompletos ou desatualizados."],
      ],
    },
    services: {
      title: "O que posso descobrir para você",
      from: "a partir de",
      request: "Solicitar",
      custom: "Precisa de algo diferente ou recorrente? Pesquisas sob medida e por contrato disponíveis — é só descrever o que você precisa.",
      cards: [
        {
          name: "Verificação de Fornecedor (Brasil)",
          promise: "Saiba com quem você está lidando antes de se comprometer.",
          items: [
            "Existência e situação cadastral da empresa",
            "Sócios e informações básicas",
            "Reputação e sinais de alerta públicos",
            "Resumo com uma indicação clara de risco",
          ],
          price: "€150",
        },
        {
          name: "Panorama de Mercado (Brasil)",
          promise: "Entenda um mercado antes de entrar nele.",
          items: [
            "Panorama de demanda e mercado para seu produto ou setor",
            "Principais concorrentes e faixas de preço",
            "Normas e regulamentações relevantes",
            "Impostos e barreiras de importação em resumo",
          ],
          price: "€500",
        },
        {
          name: "Briefing de Importação/Exportação",
          promise: "Saiba exatamente o que sua operação exige.",
          items: [
            "Procedimentos e documentação necessária",
            "Classificação do produto e regras aplicáveis",
            "Requisitos principais e erros comuns",
            "Fontes e referências",
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