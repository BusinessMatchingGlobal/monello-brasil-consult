import type { ServiceGroup } from "./servicesCatalog";

export const servicesIntroPT = {
  title: "Nossos Serviços",
  intro:
    "Da verificação de uma única empresa ao projeto completo de entrada no mercado. Cada serviço tem escopo claro, preço inicial e prazos de entrega indicativos. Comece por onde você precisa.",
  markets: "Principais mercados: Brasil · Itália · União Europeia · América Latina",
  more: "Saiba mais",
  request: "Solicitar",
  forWhom: "Para quem é:",
};

export const serviceGroupsPT: ServiceGroup[] = [
  {
    num: "01",
    label: "Responda a uma pergunta",
    items: [
      {
        name: "Ask Brazil / Ask Europe",
        tagline: "Uma pergunta comercial sobre um mercado estrangeiro, uma resposta documentada.",
        bullets: [
          "Resposta escrita de 1–2 páginas, com fontes",
          "Mercado, concorrentes, distribuição, importação/exportação ou outra informação de negócios",
          "Entrega normalmente em 48–72 horas",
          "Uma pergunta por contratação, escopo definido",
        ],
        audience: [
          "Para a empresa que avalia um mercado, mas ainda não está pronta para uma análise completa",
          "Para o gerente de exportação que precisa dar uma resposta precisa à diretoria",
          "Para quem recebeu uma proposta do exterior e quer entendê-la antes de responder",
          "Para o profissional — contador, advogado, consultor — com cliente ativo entre a Europa e o Brasil",
        ],
        examples:
          'Exemplos de perguntas: "Quem são os principais importadores do meu produto na Europa?" · "Quais impostos e taxas meu produto paga na entrada?" · "Esse setor exige registros ou licenças?" · "Como esse produto costuma ser vendido naquele mercado?"',
        price: "a partir de €79",
      },
    ],
  },
  {
    num: "02",
    label: "Verifique",
    items: [
      {
        name: "Company Check",
        tagline: "Quem é essa empresa?",
        bullets: [
          "Existência e situação cadastral da empresa",
          "Sócios, administradores e informações básicas",
          "Reputação e sinais públicos de risco",
          "Síntese final com indicação clara do nível de risco",
        ],
        audience: [
          "Para quem recebeu um pedido ou uma consulta de uma empresa que não conhece",
          "Para quem está prestes a enviar a primeira cotação, tabela de preços ou amostras",
          "Para quem conheceu o interlocutor em feira ou online e quer saber se ele é real",
          "Para quem precisa decidir se uma negociação merece seu tempo",
        ],
        price: "a partir de €150 — entrega normalmente em 2–3 dias úteis",
      },
      {
        name: "Supplier Check",
        tagline: "Conheça melhor o fornecedor antes de confiar a ele o seu pedido.",
        bullets: [
          "Tudo o que está incluído no Company Check",
          "Produtos e certificações disponíveis",
          "Informações disponíveis sobre estrutura e capacidade produtiva",
          "Presença comercial e principais pontos de atenção",
        ],
        audience: [
          "Para quem vai fazer o primeiro pedido ou adiantar pagamento a um fornecedor nunca testado",
          "Para quem encontrou o fornecedor online ou em feira e nunca o visitou",
          "Para quem precisa escolher entre vários fornecedores candidatos",
          "Para o importador que não pode se dar ao luxo de receber o contêiner errado",
        ],
        price: "a partir de €190 — entrega normalmente em 3–4 dias úteis",
      },
      {
        name: "Business Due Diligence",
        tagline: "Quais riscos preciso conhecer antes de me comprometer?",
        bullets: [
          "Estrutura societária, sócios e administradores",
          "Atividade, presença comercial e reputação",
          "Processos judiciais e pontos críticos publicamente disponíveis",
          "Verificação da consistência das informações declaradas",
          "Sumário executivo com os principais red flags",
        ],
        audience: [
          "Para quem vai assinar um contrato de fornecimento, distribuição ou agência",
          "Para quem avalia conceder exclusividade territorial ou prazo de pagamento",
          "Para quem notou inconsistências nas informações recebidas e quer enxergar com clareza",
          "Para quem precisa apresentar a contraparte a sócios, banco ou conselho",
        ],
        price: "a partir de €350 — entrega normalmente em 5–7 dias úteis",
      },
      {
        name: "Enhanced Due Diligence",
        tagline: "A operação é importante: vamos a fundo.",
        bullets: [
          "Tudo o que está incluído na Business Due Diligence",
          "Aprofundamentos direcionados à operação específica",
          "Envolvimento de profissionais locais quando são necessárias verificações jurídicas, fiscais ou documentais",
          "Relatório estendido e sessão de apresentação dos resultados",
        ],
        audience: [
          "Para quem prepara uma joint venture, uma sociedade ou um investimento",
          "Para quem vai fechar um contrato plurianual ou de valor relevante",
          "Para quem entra em uma operação que exigirá verificações jurídicas, fiscais ou documentais locais",
          "Para quem precisa atender a exigências internas de compliance antes de assinar",
        ],
        price: "a partir de €750 — entrega normalmente em 2–3 semanas",
      },
    ],
  },
  {
    num: "03",
    label: "Avalie o mercado",
    items: [
      {
        name: "Competitor Snapshot",
        tagline: "Quem já está no mercado que você quer alcançar.",
        bullets: [
          "Principais concorrentes no mercado-alvo",
          "Produtos, posicionamento e canais comerciais",
          "Preços indicativos, quando disponíveis",
          "Síntese comparativa",
        ],
        audience: [
          "Para quem precisa definir posicionamento e preço antes de se apresentar",
          'Para quem já ouviu "isso já existe lá" e quer saber o quanto é verdade',
          "Para quem se prepara para uma feira ou missão e quer chegar conhecendo os players",
          "Para quem quer identificar o espaço que os concorrentes deixaram descoberto",
        ],
        price: "a partir de €199 — entrega normalmente em 1 semana",
      },
      {
        name: "Opportunity Scan",
        tagline: "Seu produto tem espaço naquele mercado?",
        bullets: [
          "Mercado, importações e concorrentes",
          "Canais de distribuição e possíveis compradores",
          "Principais barreiras de entrada",
          "Recomendação final: GO / INVESTIGATE / LOW PRIORITY, com justificativa",
        ],
        audience: [
          'Para quem se pergunta "meu produto funcionaria lá?" e quer uma resposta honesta',
          "Para quem precisa escolher entre dois ou mais mercados onde concentrar energia",
          "Para quem avalia se vale a pena investir em uma feira, uma missão ou uma análise completa",
          'Para quem prefere gastar €290 em um "não" agora a €29.000 em um "não" daqui a um ano',
        ],
        price: "a partir de €290 — entrega normalmente em 1 semana",
      },
      {
        name: "Análise de Mercado",
        tagline: "Entenda o mercado antes de entrar nele.",
        bullets: [
          "Tamanho e características do mercado para o seu produto ou setor",
          "Demanda potencial, canais de venda e posicionamento",
          "Áreas geográficas mais promissoras",
          "Concorrência e principais operadores",
          "Normas, tarifas e barreiras em síntese",
        ],
        audience: [
          "Para quem já decidiu entrar e precisa construir o plano: onde, como, com quem",
          "Para quem precisa escolher região, canal e posicionamento",
          "Para quem precisa apresentar o projeto a sócios, banco ou conselho",
          "Para quem participa de editais e programas de apoio à internacionalização que exigem uma análise de mercado",
        ],
        price: "a partir de €500 — entrega normalmente em 2 semanas",
      },
      {
        name: "Briefing de Importação/Exportação",
        tagline: "Esclareça requisitos, procedimentos e riscos antes de iniciar a operação.",
        bullets: [
          "Procedimentos e documentação necessária",
          "Classificação do produto e regras aplicáveis",
          "Principais requisitos aduaneiros, fiscais e regulatórios",
          "Erros típicos e armadilhas a evitar",
          "Fontes, referências e orientações operacionais",
        ],
        audience: [
          "Para quem tem o primeiro embarque ou o primeiro pedido no horizonte",
          "Para quem precisa cotar e calcular o custo real do produto no destino",
          "Para quem quer evitar que o contêiner fique parado na alfândega por falta de um documento",
          "Para quem já tem uma contraparte e precisa tornar o acordo operacional",
        ],
        price: "a partir de €600 — entrega normalmente em 1–2 semanas",
      },
    ],
  },
  {
    num: "04",
    label: "Encontre",
    note: "Selecionamos. Não enchemos listas.",
    items: [
      {
        name: "Buyer Finder — Starter",
        tagline: "Uma shortlist de potenciais compradores selecionados para o seu produto.",
        bullets: [
          "Shortlist de compradores, importadores ou distribuidores compatíveis (normalmente 10–20, conforme o setor)",
          "Contatos das empresas",
          "Breve indicação do porquê de cada uma ser relevante",
        ],
        audience: [
          "Para quem tem o produto pronto e quer os primeiros nomes certos para contatar",
          "Para quem quer testar a resposta do mercado antes de investir mais",
          "Para quem tem estrutura comercial própria e só precisa da matéria-prima: os contatos",
        ],
        price: "a partir de €199 — entrega normalmente em 1 semana",
      },
      {
        name: "Buyer Finder — Pro",
        tagline: "O mapeamento estendido do mercado, ordenado por prioridade.",
        bullets: [
          "Análise estendida do mercado (normalmente 30–50 empresas consideradas)",
          "Seleção das mais interessantes, com contatos e perfil",
          "Segmentação e prioridade comercial",
        ],
        audience: [
          "Para quem quer a fotografia completa da demanda, não só os primeiros nomes",
          "Para quem precisa escolher o distribuidor certo comparando as opções",
          "Para o gerente de exportação que constrói o pipeline comercial do ano",
          "Para quem prepara uma campanha de contato estruturada e quer partir do mapa",
        ],
        price: "a partir de €490 — entrega normalmente em 2 semanas",
      },
      {
        name: "Supplier Finder",
        tagline: "Encontre quem pode produzir ou fornecer para você.",
        bullets: [
          "Busca de produtores/fornecedores no mercado-alvo",
          "Pré-seleção e informações das empresas",
          "Comparação preliminar entre os candidatos",
        ],
        audience: [
          "Para quem quer importar e não sabe por onde começar a encontrar quem produz",
          "Para quem depende de um único fornecedor e quer alternativas concretas",
          "Para quem busca um produtor para sua marca própria",
          "Para quem recebeu uma oferta e quer compará-la com o restante do mercado",
        ],
        price: "a partir de €290 — entrega normalmente em 1–2 semanas",
      },
    ],
  },
  {
    num: "05",
    label: "Entre em contato",
    items: [
      {
        name: "Buyer Search + Outreach",
        tagline: "Não é só a lista: o primeiro contato fazemos nós.",
        bullets: [
          "Busca de compradores e identificação dos contatos relevantes",
          "Mensagem preparada no idioma local",
          "Primeiro contato e follow-up",
          "Relatório das respostas recebidas",
        ],
        audience: [
          "Para quem não tem tempo, idioma ou estrutura para abordar o mercado sozinho",
          "Para quem já comprou listas de contatos que ficaram na gaveta",
          "Para quem quer respostas qualificadas na mesa, não nomes para trabalhar",
          "Para quem sabe que a primeira mensagem, mal escrita, queima o contato para sempre",
        ],
        price: "a partir de €1.200 — duração normalmente de 4–6 semanas",
      },
      {
        name: "Agenda B2B para Missões e Feiras",
        tagline: "Chegue ao mercado com as reuniões já marcadas.",
        bullets: [
          "Agenda de reuniões qualificadas, construída sobre o seu perfil",
          "Seleção das contrapartes e preparação do terreno antes da chegada",
          "Logística dos compromissos",
          "Acompanhamento opcional",
          "Serviço direto nas praças onde a BMG dispõe de presença e rede local (Belo Horizonte, São Paulo e outras sob consulta)",
        ],
        audience: [
          "Para quem viaja para uma feira ou missão e tem poucos dias no destino",
          "Para quem quer que o custo da viagem se transforme em reuniões de verdade, não em visitas de cortesia",
          "Para a empresa em missão coletiva que quer uma agenda própria, além do programa oficial",
          "Para quem quer alguém local preparando o terreno antes da chegada",
        ],
        price: "a partir de €800 por empresa — preparação normalmente de 3–4 semanas",
      },
      {
        name: "Business Matching Campaign",
        tagline: "Da busca à reunião, gerenciamos todo o percurso.",
        bullets: [
          "Busca e qualificação de potenciais parceiros",
          "Contato e gestão das respostas",
          "Organização das reuniões com as empresas interessadas",
          "Relatório final da campanha",
        ],
        audience: [
          "Para quem busca um parceiro — distribuidor, agente, fornecedor estratégico — e quer o processo conduzido por um profissional",
          "Para quem não tem departamento de exportação e não pretende criar um para um único mercado",
          "Para quem já tentou sozinho e entendeu que precisa de alguém no local",
        ],
        price: "a partir de €2.000 — duração normalmente de 6–8 semanas",
      },
    ],
  },
  {
    num: "06",
    label: "Entre no mercado",
    items: [
      {
        name: "Market Entry Project",
        tagline: "O projeto completo de entrada no mercado.",
        bullets: [
          "Análise e estratégia de entrada",
          "Busca de parceiros e contatos",
          "Suporte na negociação",
          "Coordenação local",
        ],
        audience: [
          "Para quem decidiu entrar no mercado e quer um único interlocutor orquestrando todo o percurso",
          "Para quem vai negociar com contrapartes locais e quer ao lado alguém que conhece os códigos, o idioma e as práticas",
          "Para a empresa que avalia uma presença estável — importador, filial, parceria — e quer chegar lá por etapas",
        ],
        price: "a partir de €2.500 por projeto — orçamento conforme o escopo — duração normalmente de 2–3 meses",
      },
    ],
  },
  {
    num: "07",
    label: "Mantenha presença no mercado",
    items: [
      {
        name: "BMG Intelligence Desk",
        tagline: "Seu desk de inteligência, todo mês.",
        bullets: [
          "Pesquisas e verificações sob demanda",
          "Monitoramento de concorrentes, clientes e fornecedores",
          "Informações operacionais para as decisões comerciais",
        ],
        audience: [
          "Para a empresa já ativa no mercado que todo mês tem perguntas novas: um preço, um concorrente, uma contraparte",
          "Para quem quer perceber os movimentos do mercado antes de lê-los no noticiário",
          'Para quem já precisou de pesquisa "urgente" mais de uma vez e prefere ter um desk já contratado',
        ],
        price: "a partir de €290/mês",
      },
      {
        name: "Local Business Support",
        tagline: "Uma presença operacional no mercado, sem abrir escritório.",
        bullets: [
          "Verificação dos interlocutores",
          "Levantamento de informações e contatos",
          "Agendamentos e apoio no relacionamento com os parceiros locais",
        ],
        audience: [
          "Para quem já tem clientes, fornecedores ou parceiros no mercado e ninguém no local para acompanhá-los",
          "Para quem quer que pedidos, entregas e problemas sejam acompanhados no fuso e no idioma certos",
          "Para a empresa que (ainda) não quer abrir escritório, mas já não consegue administrar tudo a distância",
        ],
        price: "a partir de €500/mês",
      },
      {
        name: "Commercial Representation — Light",
        tagline: "Seus contatos no mercado, mantidos aquecidos.",
        bullets: [
          "Presença no mercado e gestão de contatos",
          "Follow-up de leads e oportunidades",
          "Relatórios periódicos",
        ],
        audience: [
          "Para quem entrou no mercado e tem contatos a manter aquecidos, mas não o suficiente para justificar uma pessoa dedicada",
          "Para quem encerrou uma campanha ou uma missão e não quer que os leads esfriem",
          "Para quem quer presença comercial contínua a custo de assinatura",
        ],
        price: "a partir de €300/mês + condições variáveis definidas em acordo",
      },
      {
        name: "Commercial Representation — Full",
        tagline: "Sua representação comercial no mercado.",
        bullets: [
          "Desenvolvimento comercial ativo",
          "Participação em reuniões e feiras",
          "Suporte na negociação",
          "Relatórios periódicos",
        ],
        audience: [
          "Para quem tem metas de venda concretas e quer alguém desenvolvendo ativamente, não apenas mantendo",
          "Para quem quer ser representado em feiras, reuniões e negociações por quem conhece o mercado por dentro",
        ],
        price: "a partir de €700/mês + condições variáveis definidas em acordo",
      },
      {
        name: "Fractional Export Desk",
        tagline: "Seu departamento de exportação no mercado, sem criar estrutura interna.",
        bullets: [
          "Desenvolvimento comercial e prospecção contínua",
          "Gestão de leads, reuniões e feiras",
          "Follow-up e relatórios",
          "Coordenação com a diretoria comercial da empresa",
        ],
        audience: [
          "Para a empresa que quer um departamento de exportação no mercado sem contratá-lo",
          "Para quem tem volumes e ambições que uma representação leve já não atende",
          "Para quem quer uma única figura respondendo à sua diretoria comercial como faria um gerente de exportação interno",
        ],
        price: "a partir de €1.500/mês + condições variáveis definidas em acordo",
      },
    ],
  },
  {
    num: "08",
    label: "Capacitação",
    items: [
      {
        name: "Webinar sob medida",
        tagline: "O tema de que a sua equipe ou os seus associados precisam.",
        bullets: [
          "60–90 minutos, incluindo Q&A",
          "Temas: mercado europeu, EUDR, crédito fornecedor, compliance do corredor, entrada em novos mercados",
          "Materiais incluídos",
        ],
        audience: [
          "Para câmaras de comércio e associações que querem oferecer conteúdo concreto aos associados",
          "Para a empresa que precisa alinhar a equipe sobre um mercado ou uma norma",
          "Para quem organiza eventos e busca um palestrante que fale de operação, não de teoria",
        ],
        price: "a partir de €300 (câmaras e associações) / €500 (empresarial)",
      },
      {
        name: "Workshop / Treinamento",
        tagline: "Meio período ou dia inteiro, online ou presencial.",
        bullets: [
          "Meio período (3–4 horas): a partir de €600",
          "Dia inteiro (6–7 horas): a partir de €1.000",
          "Programa construído sobre o caso da empresa",
          "Presencial: + despesas de deslocamento",
        ],
        audience: [
          "Para a empresa que prepara a entrada no mercado e quer a equipe pronta, sobre o próprio caso concreto",
          "Para quem parte para uma feira ou missão e quer chegar preparado sobre mercado, interlocutores e negociação",
          "Para quem quer levar o método para dentro de casa, não só o relatório",
        ],
        price: "",
      },
    ],
  },
];

export const servicesNotesPT = {
  title: "Observações",
  items: [
    'Os preços indicados são "a partir de" e indicativos: a cotação definitiva é confirmada após um breve briefing gratuito sobre o caso específico.',
    "Para os serviços com componente por resultado, as condições são definidas por escrito antes do início da atividade.",
    "O número de contrapartes identificadas depende do mercado: em setores de nicho podem ser poucas, mas todas relevantes. Selecionamos. Não enchemos listas.",
    "Não vendemos bancos de dados genéricos: as empresas são selecionadas em função do produto, do mercado-alvo e do perfil comercial do cliente. As pesquisas combinam fontes públicas, bancos de dados, ferramentas de business intelligence e verificação humana.",
    "Os serviços de verificação e due diligence têm natureza informativa e de business intelligence e se baseiam nas fontes acessíveis para cada caso específico. Não constituem due diligence jurídica, fiscal, contábil ou financeira profissional. Quando necessário, a BMG pode coordenar aprofundamentos com profissionais locais qualificados.",
    "Preços em EUR. Pagamento sem taxas via SEPA. Alternativamente: BRL (Pix/TED) pela PTAX de venda do Banco Central do Brasil; USD (ACH), GBP (Faster Payments), AUD, NZD e CAD (transferência doméstica) pela taxa de referência do BCE — em todos os casos, taxa do dia útil anterior à emissão da fatura.",
  ],
};
