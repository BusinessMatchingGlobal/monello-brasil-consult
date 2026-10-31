import type { Lang } from "@/lib/lang";

type HomepageCopy = {
  hero: { title: string; subtitle: string; intro: string; contact: string; method: string; note: string };
  commitments: Array<{ title: string; text: string }>;
  checks: { title: string; questions: string[]; territory: string; closing: string };
  services: { title: string; intro: string; items: Array<{ title: string; text: string }>; experience: string; beauty: string; cta: string; sample: string };
  method: { title: string; steps: Array<{ title: string; text: string }>; closing: string };
  contact: { title: string; intro: string; confidentiality: string };
};

export const homepageCopy: Record<Lang, HomepageCopy> = {
  it: {
    hero: {
      title: "Il vostro progetto tra Europa e Brasile. Seguito sul posto.",
      subtitle: "Market intelligence e coordinamento operativo",
      intro: "Business Matching Global, con sede a Belo Horizonte, affianca le imprese europee in Brasile e quelle brasiliane in Europa. Uniamo analisi di mercato, verifiche documentali e coordinamento operativo per valutare opportunità, scegliere interlocutori e sviluppare progetti su basi documentate.",
      contact: "Scrivici del tuo progetto", method: "Come lavoriamo",
      note: "Comunicazione scritta. Fonti verificabili. Compensi esclusivamente dal cliente.",
    },
    commitments: [
      { title: "Remunerati solo da voi. Al lavoro solo nel vostro interesse.", text: "Condizioni concordate prima dell’incarico. Nessuna commissione da partner, studi o controparti." },
      { title: "Verifichiamo prima di mettere in contatto.", text: "Prima delle presentazioni affrontiamo le verifiche previste dall’incarico. Le informazioni rilevanti sono documentate, con fonti verificabili." },
      { title: "Sul posto per il vostro export manager.", text: "Il vostro export manager resta in azienda. Noi seguiamo per lui il lavoro sul posto, in Brasile o in Europa." },
      { title: "Clienti e progetti restano riservati.", text: "Non condividiamo nomi, incarichi o dettagli che permettano di identificare indirettamente i nostri clienti. Nei contenuti pubblici illustriamo il metodo con casi di pubblico dominio." },
    ],
    checks: {
      title: "Le domande da chiarire prima di investire.",
      questions: ["Il vostro marchio è già stato registrato da altri?", "Il potenziale partner ha debiti fiscali o contenziosi da approfondire?", "Qualcuno vende già i vostri prodotti a vostra insaputa? Attraverso quali canali?"],
      territory: "In Brasile regole, incentivi, tassazione e distribuzione cambiano da uno Stato all’altro, spesso da un comune all’altro. Valutiamo il territorio e i canali in cui intendete operare. Per i progetti verso l’Europa, l’analisi parte dal Paese di destinazione.",
      closing: "Definiamo le verifiche pertinenti al vostro progetto e coinvolgiamo, quando necessario, i professionisti competenti.",
    },
    services: {
      title: "Cosa facciamo", intro: "Dalla valutazione iniziale al coordinamento delle attività concordate, il lavoro segue le esigenze del vostro progetto.",
      items: [
        { title: "Analisi di mercato e localizzazione", text: "Domanda, concorrenti, prezzi, canali e territori. In Brasile, un’analisi specifica Stato per Stato per valutare dove operare o insediarsi." },
        { title: "Due diligence documentale", text: "Verifiche su partner, distributori e importatori, basate sulle fonti disponibili. Approfondimenti specialistici coordinati con i professionisti competenti quando necessari." },
        { title: "Marchi e presenza commerciale", text: "Verifiche su registrazioni, vendite non autorizzate e usi impropri del marchio, considerando anche i possibili effetti sulla reputazione." },
        { title: "Vendita diretta al consumatore brasiliano", text: "Valutiamo e coordiniamo progetti dall’Europa al consumatore brasiliano per testare il mercato dalla vostra sede europea, con una struttura agile e requisiti verificati." },
        { title: "Coordinamento di studi boutique", text: "Coordiniamo professionisti europei e brasiliani in ambito fiscale, legale, regolatorio e doganale, in funzione delle esigenze dell’incarico." },
        { title: "Supporto sul posto per l’export manager", text: "Ricerca e qualificazione di interlocutori, primi contatti, seguito delle conversazioni e coordinamento operativo in Brasile o in Europa, nel perimetro concordato." },
      ],
      experience: "Operiamo in tutti i settori, con una particolare esperienza nella cosmetica.", beauty: "Scopri Brazil Beauty Desk", cta: "Esplora i servizi", sample: "Scarica un esempio di report (PDF)",
    },
    method: {
      title: "Come lavoriamo",
      steps: [
        { title: "Definiamo", text: "Ci scrivete obiettivi e domande. Concordiamo per iscritto il perimetro dell’incarico, le attività e i documenti da consegnare, i tempi e i compensi." },
        { title: "Verifichiamo", text: "Raccogliamo e confrontiamo le fonti pertinenti. Restituiamo informazioni documentate, indicando ciò che è verificato e ciò che richiede approfondimento." },
        { title: "Coordiniamo", text: "Quando previsto dall’incarico, contattiamo gli interlocutori selezionati e coordiniamo le attività sul posto e il contributo dei professionisti necessari." },
      ],
      closing: "Privilegiamo la comunicazione scritta, perché informazioni, decisioni e responsabilità possano essere condivise e verificate.",
    },
    contact: { title: "Scriveteci del vostro progetto.", intro: "Indicate il Paese o il territorio interessato, il punto da chiarire e la fase in cui vi trovate. Vi risponderemo per iscritto con le domande utili a definire i prossimi passi.", confidentiality: "Le informazioni che ci affidate restano riservate." },
  },
  en: {
    hero: {
      title: "Your Europe–Brazil project. Supported on the ground.", subtitle: "Market intelligence and operational coordination",
      intro: "Based in Belo Horizonte, Business Matching Global supports European companies in Brazil and Brazilian companies in Europe. We combine market analysis, documentary checks and operational coordination to assess opportunities, select counterparts and develop projects using documented information.",
      contact: "Tell us about your project", method: "How we work", note: "Written communication. Verifiable sources. Paid exclusively by the client.",
    },
    commitments: [
      { title: "Paid only by you. Working only in your interest.", text: "Terms agreed before the assignment. No commissions from partners, professional firms or counterparties." },
      { title: "We check before we connect.", text: "Before introductions, we carry out the checks agreed for the assignment. Relevant information is documented, with verifiable sources." },
      { title: "On the ground for your export manager.", text: "Your export manager stays at your company. We handle the work on the ground on their behalf, in Brazil or Europe." },
      { title: "We keep clients and projects confidential.", text: "We do not share names, assignments or details that could indirectly identify our clients. In public content, we illustrate our method using cases in the public domain." },
    ],
    checks: {
      title: "Questions to clarify before investing.",
      questions: ["Has someone else already registered your trademark?", "Does the potential partner have tax debts or litigation that require closer examination?", "Is someone already selling your products without your knowledge? Through which channels?"],
      territory: "In Brazil, rules, incentives, taxation and distribution vary from state to state, often from municipality to municipality. We assess the territory and channels in which you intend to operate. For projects towards Europe, the analysis starts with the destination country.",
      closing: "We define the checks relevant to your project and involve qualified professionals when necessary.",
    },
    services: {
      title: "What we do", intro: "From the initial assessment to coordinating the agreed activities, our work follows the needs of your project.",
      items: [
        { title: "Market analysis and location assessment", text: "Demand, competitors, prices, channels and territories. In Brazil, a state-by-state analysis to assess where to operate or establish a presence." },
        { title: "Documentary due diligence", text: "Checks on partners, distributors and importers, based on available sources. Specialist investigations coordinated with qualified professionals when necessary." },
        { title: "Trademarks and commercial presence", text: "Checks on registrations, unauthorised sales and misuse of your trademark, also considering potential effects on reputation." },
        { title: "Direct sales to Brazilian consumers", text: "We assess and coordinate projects from Europe to Brazilian consumers to test the market from your European base, with a lean structure and verified requirements." },
        { title: "Coordination of boutique professional firms", text: "We coordinate European and Brazilian professionals in tax, legal, regulatory and customs matters according to the needs of the assignment." },
        { title: "On-the-ground support for your export manager", text: "Finding and qualifying counterparts, initial contacts, following up conversations and operational coordination in Brazil or Europe, within the agreed scope." },
      ],
      experience: "We work across all sectors, with particular experience in cosmetics.", beauty: "Discover Brazil Beauty Desk", cta: "Explore our services", sample: "Download a sample report (PDF)",
    },
    method: {
      title: "How we work",
      steps: [
        { title: "Define", text: "You write to us with your objectives and questions. We agree in writing on the scope of the assignment, activities and documents to be delivered, timing and fees." },
        { title: "Verify", text: "We collect and compare relevant sources. We provide documented information, indicating what has been verified and what requires further investigation." },
        { title: "Coordinate", text: "When included in the assignment, we contact selected counterparts and coordinate activities on the ground and the contribution of the professionals required." },
      ],
      closing: "We favour written communication so that information, decisions and responsibilities can be shared and verified.",
    },
    contact: { title: "Tell us about your project.", intro: "Tell us the country or territory concerned, the issue you need to clarify and your current stage. We will reply in writing with questions to help define the next steps.", confidentiality: "The information you entrust to us remains confidential." },
  },
  pt: {
    hero: {
      title: "Seu projeto na Europa. Com apoio no mercado de destino.", subtitle: "Inteligência de mercado e coordenação operacional",
      intro: "Com sede em Belo Horizonte, a Business Matching Global apoia empresas brasileiras na Europa e empresas europeias no Brasil. Combinamos análise de mercado, verificações documentais e coordenação operacional para avaliar oportunidades, selecionar interlocutores e desenvolver projetos com base em informações documentadas.",
      contact: "Conte sobre o seu projeto", method: "Como trabalhamos", note: "Comunicação por escrito. Fontes verificáveis. Remuneração exclusivamente pelo cliente.",
    },
    commitments: [
      { title: "Remunerados apenas por você. Atuamos exclusivamente no seu interesse.", text: "Condições acordadas antes do trabalho. Nenhuma comissão de parceiros, escritórios ou contrapartes." },
      { title: "Primeiro verificamos. Depois aproximamos as partes.", text: "Antes das apresentações, realizamos as verificações previstas no trabalho contratado. As informações relevantes são documentadas, com fontes verificáveis." },
      { title: "Apoio local ao seu gestor de exportação.", text: "Seu gestor de exportação permanece na empresa. Nós acompanhamos o trabalho local em seu nome, na Europa ou no Brasil." },
      { title: "Preservamos a confidencialidade de clientes e projetos.", text: "Não compartilhamos nomes, trabalhos ou detalhes que permitam identificar indiretamente nossos clientes. Nos conteúdos públicos, ilustramos o método com casos de domínio público." },
    ],
    checks: {
      title: "As perguntas a esclarecer antes de investir.",
      questions: ["Sua marca já foi registrada por outra pessoa?", "O potencial parceiro tem dívidas fiscais ou processos judiciais que precisam ser aprofundados?", "Alguém já vende seus produtos sem o seu conhecimento? Por quais canais?"],
      territory: "Para um projeto na Europa, a análise começa pelo país de destino e pelos canais de entrada. No Brasil, regras, incentivos, tributação e distribuição variam entre estados e, muitas vezes, entre municípios. Cada projeto exige uma avaliação do território em que a empresa pretende atuar.",
      closing: "Definimos as verificações pertinentes ao seu projeto e envolvemos, quando necessário, os profissionais competentes.",
    },
    services: {
      title: "O que fazemos", intro: "Da avaliação inicial à coordenação das atividades acordadas, o trabalho acompanha as necessidades do seu projeto.",
      items: [
        { title: "Análise de mercado e localização", text: "Demanda, concorrentes, preços, canais e territórios. No Brasil, uma análise específica por estado para avaliar onde atuar ou se estabelecer." },
        { title: "Due diligence documental", text: "Verificações sobre parceiros, distribuidores e importadores, com base nas fontes disponíveis. Aprofundamentos especializados coordenados com os profissionais competentes quando necessários." },
        { title: "Marcas e presença comercial", text: "Verificações sobre registros, vendas não autorizadas e uso indevido da marca, considerando também os possíveis efeitos sobre a reputação." },
        { title: "Venda direta ao consumidor brasileiro", text: "Avaliamos e coordenamos projetos da Europa ao consumidor brasileiro para testar o mercado a partir da sede europeia, com uma estrutura enxuta e requisitos verificados." },
        { title: "Coordenação de escritórios boutique", text: "Coordenamos profissionais brasileiros e europeus nas áreas tributária, jurídica, regulatória e aduaneira, conforme as necessidades do trabalho contratado." },
        { title: "Apoio local ao gestor de exportação", text: "Pesquisa e qualificação de interlocutores, primeiros contatos, acompanhamento das conversas e coordenação operacional na Europa ou no Brasil, dentro do escopo acordado." },
      ],
      experience: "Atuamos em todos os setores, com experiência particular em cosméticos.", beauty: "Conheça o Brazil Beauty Desk", cta: "Explore os serviços", sample: "Baixe um exemplo de relatório (PDF)",
    },
    method: {
      title: "Como trabalhamos",
      steps: [
        { title: "Definimos", text: "Você nos escreve seus objetivos e perguntas. Acordamos por escrito o escopo do trabalho, as atividades e os documentos a entregar, os prazos e a remuneração." },
        { title: "Verificamos", text: "Reunimos e comparamos as fontes pertinentes. Entregamos informações documentadas, indicando o que foi verificado e o que exige aprofundamento." },
        { title: "Coordenamos", text: "Quando previsto no trabalho contratado, contatamos os interlocutores selecionados e coordenamos as atividades locais e a contribuição dos profissionais necessários." },
      ],
      closing: "Priorizamos a comunicação por escrito para que informações, decisões e responsabilidades possam ser compartilhadas e verificadas.",
    },
    contact: { title: "Conte sobre o seu projeto.", intro: "Indique o país ou território de interesse, o ponto a esclarecer e a fase em que você se encontra. Responderemos por escrito com perguntas úteis para definir os próximos passos.", confidentiality: "As informações que você nos confia permanecem confidenciais." },
  },
};