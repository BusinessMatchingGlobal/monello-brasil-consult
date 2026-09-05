import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useT } from "@/lib/i18n";
import { useCanonical } from "@/lib/useCanonical";
import { Nav } from "./AboutUs";

const EMAIL = "info@businessmatching.global";

type Content = {
  pageTitle: string;
  heroSub: string;
  layers: { top: string; mid: string; bottom: string };
  whiteLabel: string;
  cardsTitle: string;
  cards: { title: string; text: string; href: string; cta: string }[];
  phaseTitle: string;
  phaseText: string;
  phaseLink: string;
  audienceTitle: string;
  audience: string[];
  closingTitle: string;
  closingText: string;
  closingCta: string;
  seo: { title: string; description: string };
};

const en: Content = {
  pageTitle: "Your client. Your strategy. Our local execution in Brazil.",
  heroSub:
    "You don't need to build a Brazilian operation to offer Brazil to your clients. When they need to find a business partner in Brazil, Business Matching Global works as your local research, intelligence and business development desk, while you keep the client relationship and lead the export strategy.",
  layers: {
    top: "Export manager / adviser — Client relationship · Export strategy · Commercial direction",
    mid: "Business Matching Global — Brazil — Phase zero · Market intelligence · Buyer and distributor search · Verification · Portuguese outreach · Meetings · Local follow-up",
    bottom: "Brazilian market",
  },
  whiteLabel:
    "White-label collaboration available. We can work behind your brand and report directly to you. Your client relationship remains yours.",
  cardsTitle: "Three levels of collaboration",
  cards: [
    {
      title: "Intelligence on demand",
      text: "You send a question: duties, importers, competitors, certifications, distribution structure, price levels. We return a documented, written answer.",
      href: "/Our_Services",
      cta: "Ask Brazil",
    },
    {
      title: "Local execution",
      text: "You set the strategy; we search, verify and contact buyers, importers and distributors, in Portuguese, and qualify real interest before any introduction.",
      href: "/services/business-matching",
      cta: "Buyer Search + Outreach / Business Matching",
    },
    {
      title: "Local export desk",
      text: "When your client starts working Brazil for real, we become the continuous local desk, under your direction.",
      href: "/Our_Services",
      cta: "Fractional Export Desk",
    },
  ],
  phaseTitle: "Why phase zero matters to you",
  phaseText:
    "Every level starts with the same step: phase zero. Before we present a single counterpart, we establish who owns what, align the paperwork with the real agreements and check that every clause holds in both legal systems. It is the part of the work an export manager cannot do from Europe, because it requires knowing what a Brazilian court will strike down and what it will defend. It is offered at a fixed fee, separate from any success fee.",
  phaseLink: "How we work",
  audienceTitle: "Who it is for",
  audience: [
    "External and fractional export managers",
    "Business lawyers and accountants with clients active between Europe and Brazil",
    "Customs and trade advisers",
    "Business associations and chambers",
    "Internationalisation boutiques",
  ],
  closingTitle: "Get in touch",
  closingText:
    "Write to us describing the project and the client's stage. You will receive a written, documented reply.",
  closingCta: "Write to us",
  seo: {
    title: "Partner Program — Business Matching Global",
    description:
      "You don't need to build a Brazilian operation to offer Brazil to your clients. Business Matching Global works as your local research, intelligence and business development desk, while you keep the client relationship and lead the export strategy.",
  },
};

const it: Content = {
  pageTitle: "Il tuo cliente. La tua strategia. La nostra esecuzione locale in Brasile.",
  heroSub:
    "Non devi costruire una struttura in Brasile per offrire il Brasile ai tuoi clienti. Quando devono trovare un partner commerciale in Brasile, Business Matching Global lavora come tuo desk locale di ricerca, intelligence e sviluppo commerciale, mentre tu mantieni il rapporto con il cliente e guidi la strategia export.",
  layers: {
    top: "Export manager / professionista — Rapporto con il cliente · Strategia export · Direzione commerciale",
    mid: "Business Matching Global — Brasile — Fase zero · Market intelligence · Ricerca buyer e distributori · Verifica · Contatto in portoghese · Incontri · Follow-up locale",
    bottom: "Mercato brasiliano",
  },
  whiteLabel:
    "Collaborazione in white label disponibile. Possiamo lavorare dietro il tuo marchio e riferire direttamente a te. Il rapporto con il cliente resta tuo.",
  cardsTitle: "Tre livelli di collaborazione",
  cards: [
    {
      title: "Intelligence on demand",
      text: "Ci mandi una domanda: dazi, importatori, concorrenti, certificazioni, struttura distributiva, livelli di prezzo. Ti restituiamo una risposta scritta e documentata.",
      href: "/Our_Services",
      cta: "Ask Brazil",
    },
    {
      title: "Esecuzione locale",
      text: "Tu definisci la strategia; noi cerchiamo, verifichiamo e contattiamo buyer, importatori e distributori, in portoghese, e qualifichiamo l'interesse reale prima di ogni presentazione.",
      href: "/servizi/business-matching",
      cta: "Buyer Search + Outreach / Business Matching",
    },
    {
      title: "Desk export locale",
      text: "Quando il tuo cliente comincia davvero a lavorare sul Brasile, diventiamo il desk locale continuativo, sotto la tua direzione.",
      href: "/Our_Services",
      cta: "Fractional Export Desk",
    },
  ],
  phaseTitle: "Perché la fase zero conta per te",
  phaseText:
    "Ogni livello parte dallo stesso passo: la fase zero. Prima di presentare una sola controparte, verifichiamo chi possiede cosa, allineiamo la carta agli accordi reali e controlliamo che ogni clausola regga in entrambi gli ordinamenti. È la parte del lavoro che un export manager non può fare dall'Europa, perché richiede di sapere cosa un giudice brasiliano annulla e cosa difende. È offerta a compenso fisso, separato da qualsiasi success fee.",
  phaseLink: "Come lavoriamo",
  audienceTitle: "A chi si rivolge",
  audience: [
    "Export manager esterni e fractional",
    "Avvocati d'affari e commercialisti con clienti attivi tra Europa e Brasile",
    "Consulenti doganali",
    "Associazioni imprenditoriali e camere di commercio",
    "Boutique di internazionalizzazione",
  ],
  closingTitle: "Scrivici",
  closingText:
    "Scrivici descrivendo il progetto e lo stadio in cui si trova il cliente. Riceverai una risposta scritta e documentata.",
  closingCta: "Scrivici",
  seo: {
    title: "Partner Program — Business Matching Global",
    description:
      "Non devi costruire una struttura in Brasile per offrire il Brasile ai tuoi clienti. Business Matching Global lavora come tuo desk locale di ricerca, intelligence e sviluppo commerciale, mentre tu mantieni il rapporto con il cliente e guidi la strategia export.",
  },
};

const pt: Content = {
  pageTitle: "O seu cliente. A sua estratégia. A nossa execução local no Brasil.",
  heroSub:
    "Você não precisa montar uma estrutura no Brasil para oferecer o Brasil aos seus clientes. Quando eles precisam encontrar um parceiro de negócios na Europa ou no Brasil, a Business Matching Global trabalha como o seu desk local de pesquisa, inteligência e desenvolvimento comercial, enquanto você mantém a relação com o cliente e conduz a estratégia de exportação.",
  layers: {
    top: "Export manager / assessor — Relação com o cliente · Estratégia de exportação · Direção comercial",
    mid: "Business Matching Global — Brasil — Fase zero · Inteligência de mercado · Busca de compradores e distribuidores · Verificação · Abordagem em português · Reuniões · Acompanhamento local",
    bottom: "Mercado brasileiro",
  },
  whiteLabel:
    "Colaboração em white label disponível. Podemos trabalhar por trás da sua marca e reportar diretamente a você. A relação com o cliente continua sendo sua.",
  cardsTitle: "Três níveis de colaboração",
  cards: [
    {
      title: "Inteligência sob demanda",
      text: "Você nos envia uma pergunta: tarifas, importadores, concorrentes, certificações, estrutura de distribuição, níveis de preço. Devolvemos uma resposta escrita e documentada.",
      href: "/Our_Services",
      cta: "Ask Brazil",
    },
    {
      title: "Execução local",
      text: "Você define a estratégia; nós pesquisamos, verificamos e contatamos compradores, importadores e distribuidores, em português, e qualificamos o interesse real antes de qualquer apresentação.",
      href: "/servicos/business-matching",
      cta: "Buyer Search + Outreach / Business Matching",
    },
    {
      title: "Desk local de exportação",
      text: "Quando o seu cliente começa a trabalhar o Brasil de verdade, nos tornamos o desk local contínuo, sob a sua direção.",
      href: "/Our_Services",
      cta: "Fractional Export Desk",
    },
  ],
  phaseTitle: "Por que a fase zero importa para você",
  phaseText:
    "Todos os níveis começam com o mesmo passo: a fase zero. Antes de apresentar uma única contraparte, verificamos quem é dono do quê, alinhamos o papel aos acordos reais e conferimos se cada cláusula se sustenta nos dois ordenamentos. É a parte do trabalho que um export manager não consegue fazer da Europa, porque exige saber o que um juiz brasileiro anula e o que defende. É oferecida a honorário fixo, separado de qualquer success fee.",
  phaseLink: "Como trabalhamos",
  audienceTitle: "Para quem é",
  audience: [
    "Export managers externos e fractional",
    "Advogados empresariais e contadores com clientes ativos entre Europa e Brasil",
    "Assessores aduaneiros",
    "Associações empresariais e câmaras de comércio",
    "Boutiques de internacionalização",
  ],
  closingTitle: "Escreva para nós",
  closingText:
    "Escreva para nós descrevendo o projeto e o estágio em que o cliente está. Você receberá uma resposta escrita e documentada.",
  closingCta: "Escreva para nós",
  seo: {
    title: "Partner Program — Business Matching Global",
    description:
      "Você não precisa montar uma estrutura no Brasil para oferecer o Brasil aos seus clientes. A Business Matching Global trabalha como o seu desk local de pesquisa, inteligência e desenvolvimento comercial, enquanto você mantém a relação com o cliente e conduz a estratégia de exportação.",
  },
};

function Arrow() {
  return (
    <div className="flex justify-center py-2" aria-hidden="true">
      <svg width="20" height="34" viewBox="0 0 20 34" className="text-primary">
        <path d="M10 0 V26" stroke="currentColor" strokeWidth="2" />
        <path d="M4 24 L10 33 L16 24" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
    </div>
  );
}

export default function PartnerProgram() {
  const { lang } = useT();
  const c = lang === "it" ? it : lang === "pt" ? pt : en;
  useCanonical("/Partner_Program", c.seo);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <div className="container max-w-3xl pt-32 md:pt-40 pb-16 md:pb-24">
        <h1 className="font-display text-4xl md:text-5xl leading-tight mb-6">{c.pageTitle}</h1>
        <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">{c.heroSub}</p>

        {/* Three-layer diagram */}
        <div className="mt-14">
          <div className="rounded-2xl border border-border bg-secondary/50 p-5 md:p-6 text-center">
            <p className="text-base md:text-lg text-foreground">{c.layers.top}</p>
          </div>
          <Arrow />
          <div className="rounded-2xl border border-primary/40 bg-primary/5 p-5 md:p-6 text-center">
            <p className="text-base md:text-lg text-foreground">{c.layers.mid}</p>
          </div>
          <Arrow />
          <div className="rounded-2xl border border-border bg-secondary/50 p-5 md:p-6 text-center">
            <p className="text-base md:text-lg text-foreground">{c.layers.bottom}</p>
          </div>
        </div>

        {/* White label */}
        <div className="mt-14 rounded-2xl border border-primary/40 bg-primary/5 p-6 md:p-8">
          <p className="text-base md:text-lg leading-relaxed text-foreground">{c.whiteLabel}</p>
        </div>

        {/* Levels */}
        <h2 className="font-display text-2xl md:text-3xl mt-16 mb-6">{c.cardsTitle}</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {c.cards.map((card, i) => (
            <Link
              key={i}
              to={card.href}
              className="block rounded-2xl border border-border bg-secondary/40 p-6 hover:bg-secondary/70 transition-colors"
            >
              <h3 className="font-display text-xl mb-3 text-foreground">{card.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{card.text}</p>
              <span className="mt-4 inline-block text-sm text-primary underline">{card.cta}</span>
            </Link>
          ))}
        </div>

        {/* Phase zero */}
        <h2 className="font-display text-2xl md:text-3xl mt-16 mb-4">{c.phaseTitle}</h2>
        <p className="text-base md:text-lg leading-relaxed text-muted-foreground text-justify">{c.phaseText}</p>
        <p className="mt-4">
          <Link to="/How_we_work" className="text-primary underline hover:text-primary/80 transition-colors">
            {c.phaseLink}
          </Link>
        </p>

        {/* Audience */}
        <h2 className="font-display text-2xl md:text-3xl mt-16 mb-4">{c.audienceTitle}</h2>
        <ul className="list-disc pl-6 space-y-2 text-base md:text-lg leading-relaxed text-muted-foreground">
          {c.audience.map((a, i) => (
            <li key={i}>{a}</li>
          ))}
        </ul>

        {/* Closing */}
        <div className="mt-16 rounded-2xl border border-border bg-secondary/50 p-6 md:p-8">
          <h2 className="font-display text-2xl md:text-3xl mb-3">{c.closingTitle}</h2>
          <p className="text-base md:text-lg leading-relaxed text-muted-foreground">{c.closingText}</p>
          <a
            href={`mailto:${EMAIL}`}
            className="mt-6 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            {c.closingCta}
          </a>
        </div>
      </div>
    </div>
  );
}
