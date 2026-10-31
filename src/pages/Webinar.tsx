import { useEffect } from "react";
import { Linkedin } from "lucide-react";
import { Nav } from "@/pages/AboutUs";
import { FooterInner } from "@/components/SiteFooter";
import { LanguageProvider, type Lang } from "@/lib/i18n";
import { useCanonical, SITE } from "@/lib/useCanonical";
import coverAsset from "@/assets/copertina-webinar-bmg-16x9.png.asset.json";

const TALLY_EMBED =
  "https://tally.so/embed/kbdPvM?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1";

/** One URL per language, exactly as published. */
const PAGE_PATH: Record<Lang, string> = {
  it: "/webinar-brasile",
  en: "/webinar-brazil",
  pt: "/webinar-brasil",
};
const CANONICAL_PATH: Record<Lang, string> = {
  it: "/webinar-brasile",
  en: "/en/webinar-brazil",
  pt: "/pt/webinar-brasil",
};

type Speaker = { name: string; role: string; text: string; linkedin: string };
type Card = { num: string; title: string; text: string };
type Content = {
  seoTitle: string;
  seoDescription: string;
  altText: string;
  heroTitle: string;
  heroSubtitle: string[];
  cta: string;
  eventInfo: string;
  problemTitle: string;
  problem: string[];
  reasonsTitle: string;
  cards: Card[];
  advantageTitle: string;
  advantageIntro: string;
  advantageBullets: string[];
  advantageOutro: string;
  advantageNote: string;
  speakersTitle: string;
  speakers: Speaker[];
  attendTitle: string;
  attendIntro: string;
  attendBullets: string[];
  detailsTitle: string;
  details: string[];
  questionsTitle: string;
  questions: string[];
  registerTitle: string;
  registerSupporting: string;
  formTitle: string;
  finalTitle: string;
  finalText: string;
  privacyLabel: string;
  tagline: string;
};

const MOCCIA = "https://www.linkedin.com/in/marzia-moccia/";
const STOBBIONE = "https://www.linkedin.com/in/enzoaldostobbione/";

const CONTENT: Record<Lang, Content> = {
  en: {
    seoTitle:
      "Brazil Market Entry: Is Your European Brand Already There? | Business Matching Global",
    seoDescription:
      "Discover how European brands can identify unauthorised sales in Brazil, protect their market positioning and start selling directly to Brazilian consumers through cross-border e-commerce.",
    altText:
      "Cover of the webinar “Is your brand already in Brazil without your knowledge?”, 3 December 2026, 5 pm Italy time, Business Matching Global",
    heroTitle: "Is your brand already in Brazil without your knowledge?",
    heroSubtitle: [
      "Your products may already be reaching Brazilian consumers through independent importers and resellers. But you may have no control over prices, distribution channels or how your brand is represented.",
      "Discover how to turn this situation into a competitive advantage by selling directly to Brazilian consumers from Europe.",
    ],
    cta: "Register for the webinar",
    eventInfo:
      "3 December 2026 | 5:00 PM Italy – 1:00 PM Belo Horizonte | 45 minutes | In Italian",
    problemTitle: "Your brand may already be in Brazil",
    problem: [
      "Many European brands are already present in Brazil without knowing it.",
      "Their products are purchased in other countries, shipped to Brazil by independent operators and resold at prices and under commercial conditions that the brand owner has never decided or authorised.",
      "Where demand is strong, these parallel commercial flows can also create opportunities for counterfeit products to enter the market.",
      "The consequences can be significant. When a company eventually decides to export to Brazil or establish local production, it may discover that its products are already being sold, with prices, distribution channels and market positioning determined by others.",
      "In some cases, its brand reputation may already have been compromised through practices over which the company had no control.",
      "But this situation can be addressed. More importantly, it can be turned into a competitive advantage.",
    ],
    reasonsTitle: "Three reasons to take a closer look at Brazil",
    cards: [
      {
        num: "01",
        title: "Your market may already be in Brazil",
        text: "Find out whether your products are already being sold in Brazil, through which operators and at what prices. Understand the market before others define your brand's positioning for you.",
      },
      {
        num: "02",
        title:
          "Start selling in Brazil without immediately investing in a local structure",
        text: "For several product categories, cross-border e-commerce makes it possible to reach Brazilian consumers directly, shipping from Europe. Start testing the market, build brand awareness and develop direct sales with a gradual investment approach.",
      },
      {
        num: "03",
        title: "Turn direct sales into commercial intelligence",
        text: "Direct sales are not just about generating revenue. They allow you to collect real market data, understand consumer demand, identify the most promising Brazilian states and evaluate whether, when and how to establish a permanent local presence.",
      },
    ],
    advantageTitle: "From a market problem to a competitive advantage",
    advantageIntro:
      "For several product categories, it is possible to sell legally to Brazilian consumers through cross-border e-commerce, shipping directly from Europe. This approach can help companies:",
    advantageBullets: [
      "Regain control over pricing and commercial positioning.",
      "Build and protect their brand reputation.",
      "Reach Brazilian consumers without immediately establishing a local company.",
      "Collect valuable data on demand and consumer behaviour.",
      "Assess the market before committing to larger investments.",
    ],
    advantageOutro:
      "Business Matching Global has identified and qualified potential partners capable of supporting European companies with the operational requirements of cross-border sales, including logistics and payment services.",
    advantageNote:
      "Eligibility, tax treatment and operational requirements are assessed individually for each product category.",
    speakersTitle: "Meet the speakers",
    speakers: [
      {
        name: "Marzia Moccia",
        role: "Head of ExportPlanning Service",
        text: "She will explain why reliable market data are essential, but why their correct interpretation is even more important for strategic decision-making. Her contribution will focus particularly on analysing Brazil at the level of individual federal states, helping companies identify the geographical areas with the greatest potential for their products.",
        linkedin: MOCCIA,
      },
      {
        name: "Enzo Aldo Stobbione",
        role: "Business Matching Global – Belo Horizonte, Brazil",
        text: "He will present the commercial and operational opportunities for European companies interested in developing direct sales in Brazil through cross-border e-commerce, including the practical requirements and the role of qualified local partners.",
        linkedin: STOBBIONE,
      },
    ],
    attendTitle: "Who should attend?",
    attendIntro:
      "Entrepreneurs, export directors, e-commerce managers and commercial executives of European brands already selling online and internationally. Particularly relevant for companies operating in:",
    attendBullets: [
      "Cosmetics and beauty.",
      "Packaged food.",
      "Fashion and apparel.",
    ],
    detailsTitle: "Webinar details",
    details: [
      "Thursday, 3 December 2026",
      "5:00 PM – Italy",
      "1:00 PM – Belo Horizonte, Brazil",
      "Duration: 45 minutes.",
      "Language: Italian.",
    ],
    questionsTitle: "Your questions matter",
    questions: [
      "You can submit your questions directly in the registration form.",
      "Questions received in advance will help us prepare the session and address the topics that matter most to participants.",
      "Where participants explicitly authorise subsequent contact through the optional consent checkbox in the registration form, we will also provide personalised written follow-up.",
    ],
    registerTitle: "Secure your place",
    registerSupporting:
      "Discover whether your brand is already in Brazil – and how to take control of the opportunity.",
    formTitle: "Webinar registration form",
    finalTitle: "Ready to take a closer look at Brazil?",
    finalText:
      "Discover how to identify existing market opportunities, regain control of your brand positioning and start developing direct sales in Brazil.",
    privacyLabel: "Privacy policy",
    tagline:
      "Market intelligence and business orchestration for the Europe–Brazil corridor",
  },
  it: {
    seoTitle:
      "Ingresso nel mercato brasiliano: il vostro marchio europeo è già presente? | Business Matching Global",
    seoDescription:
      "Scoprite come i marchi europei possono individuare le vendite non autorizzate in Brasile, proteggere il proprio posizionamento di mercato e iniziare a vendere direttamente ai consumatori brasiliani con l'e-commerce transfrontaliero.",
    altText:
      "Copertina del webinar “Il vostro marchio è già in Brasile a vostra insaputa?”, 3 dicembre 2026, ore 17, Business Matching Global",
    heroTitle: "Il vostro marchio è già in Brasile a vostra insaputa?",
    heroSubtitle: [
      "I vostri prodotti potrebbero già raggiungere i consumatori brasiliani attraverso importatori e rivenditori indipendenti. Ma potreste non avere alcun controllo su prezzi, canali di distribuzione o sul modo in cui il vostro marchio viene rappresentato.",
      "Scoprite come trasformare questa situazione in un vantaggio competitivo vendendo direttamente ai consumatori brasiliani dall'Europa.",
    ],
    cta: "Iscriviti al webinar",
    eventInfo:
      "3 dicembre 2026 | ore 17:00 in Italia – 13:00 a Belo Horizonte | 45 minuti | In italiano",
    problemTitle: "Il vostro marchio potrebbe essere già in Brasile",
    problem: [
      "Molti marchi europei sono già presenti in Brasile senza saperlo.",
      "I loro prodotti vengono acquistati in altri paesi, spediti in Brasile da operatori indipendenti e rivenduti a prezzi e a condizioni commerciali che il titolare del marchio non ha mai deciso né autorizzato.",
      "Dove la domanda è forte, questi flussi commerciali paralleli possono anche creare opportunità per l'ingresso di prodotti contraffatti sul mercato.",
      "Le conseguenze possono essere rilevanti. Quando un'azienda decide infine di esportare in Brasile o di avviare una produzione locale, può scoprire che i suoi prodotti sono già in vendita, con prezzi, canali di distribuzione e posizionamento di mercato decisi da altri.",
      "In alcuni casi, la reputazione del marchio può essere già stata compromessa da pratiche sulle quali l'azienda non aveva alcun controllo.",
      "Ma questa situazione può essere affrontata. E, soprattutto, può essere trasformata in un vantaggio competitivo.",
    ],
    reasonsTitle: "Tre motivi per guardare il Brasile più da vicino",
    cards: [
      {
        num: "01",
        title: "Il vostro mercato potrebbe essere già in Brasile",
        text: "Scoprite se i vostri prodotti sono già in vendita in Brasile, attraverso quali operatori e a quali prezzi. Comprendete il mercato prima che siano altri a definire il posizionamento del vostro marchio.",
      },
      {
        num: "02",
        title:
          "Iniziare a vendere in Brasile senza investire subito in una struttura locale",
        text: "Per diverse categorie di prodotti, l'e-commerce transfrontaliero permette di raggiungere direttamente i consumatori brasiliani, spedendo dall'Europa. Iniziate a testare il mercato, costruite la notorietà del marchio e sviluppate le vendite dirette con un approccio di investimento graduale.",
      },
      {
        num: "03",
        title: "Trasformare le vendite dirette in intelligenza commerciale",
        text: "Le vendite dirette non servono solo a generare fatturato. Permettono di raccogliere dati reali di mercato, comprendere la domanda dei consumatori, individuare gli Stati brasiliani più promettenti e valutare se, quando e come stabilire una presenza locale permanente.",
      },
    ],
    advantageTitle: "Da un problema di mercato a un vantaggio competitivo",
    advantageIntro:
      "Per diverse categorie di prodotti è possibile vendere legalmente ai consumatori brasiliani attraverso l'e-commerce transfrontaliero, spedendo direttamente dall'Europa. Questo approccio può aiutare le aziende a:",
    advantageBullets: [
      "Riprendere il controllo su prezzi e posizionamento commerciale.",
      "Costruire e proteggere la reputazione del proprio marchio.",
      "Raggiungere i consumatori brasiliani senza costituire subito una società locale.",
      "Raccogliere dati preziosi su domanda e comportamento dei consumatori.",
      "Valutare il mercato prima di impegnarsi in investimenti più consistenti.",
    ],
    advantageOutro:
      "Business Matching Global ha individuato e qualificato potenziali partner in grado di supportare le aziende europee nei requisiti operativi delle vendite transfrontaliere, inclusi logistica e servizi di pagamento.",
    advantageNote:
      "L'idoneità, il trattamento fiscale e i requisiti operativi vanno valutati singolarmente per ciascuna categoria di prodotto.",
    speakersTitle: "I relatori",
    speakers: [
      {
        name: "Marzia Moccia",
        role: "Responsabile del servizio ExportPlanning",
        text: "Spiegherà perché i dati di mercato affidabili sono essenziali, ma perché la loro corretta interpretazione è ancora più importante per le decisioni strategiche. Il suo intervento si concentrerà in particolare sull'analisi del Brasile a livello dei singoli Stati federali, per aiutare le aziende a individuare le aree geografiche con il maggiore potenziale per i loro prodotti.",
        linkedin: MOCCIA,
      },
      {
        name: "Enzo Aldo Stobbione",
        role: "Business Matching Global – Belo Horizonte, Brasile",
        text: "Presenterà le opportunità commerciali e operative per le aziende europee interessate a sviluppare vendite dirette in Brasile attraverso l'e-commerce transfrontaliero, inclusi i requisiti pratici e il ruolo dei partner locali qualificati.",
        linkedin: STOBBIONE,
      },
    ],
    attendTitle: "A chi è rivolto?",
    attendIntro:
      "Imprenditori, direttori export, responsabili e-commerce e figure commerciali di marchi europei che vendono già online e a livello internazionale. Particolarmente rilevante per le aziende che operano in:",
    attendBullets: [
      "Cosmetica e bellezza.",
      "Alimentare confezionato.",
      "Moda e abbigliamento.",
    ],
    detailsTitle: "Dettagli del webinar",
    details: [
      "Giovedì 3 dicembre 2026",
      "Ore 17:00 – Italia",
      "Ore 13:00 – Belo Horizonte, Brasile",
      "Durata: 45 minuti.",
      "Lingua: italiano.",
    ],
    questionsTitle: "Le vostre domande contano",
    questions: [
      "Potete inviare le vostre domande direttamente nel modulo di iscrizione.",
      "Le domande ricevute in anticipo ci aiuteranno a preparare la sessione e ad affrontare gli argomenti che contano di più per i partecipanti.",
      "Se i partecipanti autorizzano esplicitamente un contatto successivo tramite l'apposita casella di consenso nel modulo di iscrizione, forniremo anche un riscontro personalizzato per iscritto.",
    ],
    registerTitle: "Assicuratevi il vostro posto",
    registerSupporting:
      "Scoprite se il vostro marchio è già in Brasile – e come prendere il controllo dell'opportunità.",
    formTitle: "Modulo di iscrizione al webinar",
    finalTitle: "Pronti a guardare il Brasile più da vicino?",
    finalText:
      "Scoprite come individuare le opportunità di mercato esistenti, riprendere il controllo del posizionamento del vostro marchio e iniziare a sviluppare le vendite dirette in Brasile.",
    privacyLabel: "Informativa privacy",
    tagline:
      "Market intelligence e business orchestration per il corridoio Europa–Brasile",
  },
  pt: {
    seoTitle:
      "Entrada no mercado brasileiro: a sua marca europeia já está lá? | Business Matching Global",
    seoDescription:
      "Descubra como as marcas europeias podem identificar vendas não autorizadas no Brasil, proteger o seu posicionamento de mercado e começar a vender diretamente aos consumidores brasileiros por meio do comércio eletrônico transfronteiriço.",
    altText:
      "Capa do webinar “A sua marca já está no Brasil sem que vocês saibam?”, 3 de dezembro de 2026, 17h na Itália, Business Matching Global",
    heroTitle: "A sua marca já está no Brasil sem que vocês saibam?",
    heroSubtitle: [
      "Os seus produtos podem já estar chegando aos consumidores brasileiros por meio de importadores e revendedores independentes. Mas vocês podem não ter nenhum controle sobre preços, canais de distribuição ou sobre a forma como a sua marca é representada.",
      "Descubra como transformar essa situação em uma vantagem competitiva vendendo diretamente aos consumidores brasileiros a partir da Europa.",
    ],
    cta: "Inscreva-se no webinar",
    eventInfo:
      "3 de dezembro de 2026 | 17h na Itália – 13h em Belo Horizonte | 45 minutos | Em italiano",
    problemTitle: "A sua marca pode já estar no Brasil",
    problem: [
      "Muitas marcas europeias já estão presentes no Brasil sem saber.",
      "Os seus produtos são comprados em outros países, enviados ao Brasil por operadores independentes e revendidos a preços e em condições comerciais que o titular da marca nunca decidiu nem autorizou.",
      "Onde a demanda é forte, esses fluxos comerciais paralelos também podem criar oportunidades para a entrada de produtos falsificados no mercado.",
      "As consequências podem ser significativas. Quando uma empresa finalmente decide exportar para o Brasil ou estabelecer uma produção local, pode descobrir que os seus produtos já estão sendo vendidos, com preços, canais de distribuição e posicionamento de mercado determinados por outros.",
      "Em alguns casos, a reputação da sua marca pode já ter sido comprometida por práticas sobre as quais a empresa não tinha nenhum controle.",
      "Mas essa situação pode ser enfrentada. Mais importante ainda, pode ser transformada em uma vantagem competitiva.",
    ],
    reasonsTitle: "Três motivos para olhar o Brasil mais de perto",
    cards: [
      {
        num: "01",
        title: "O seu mercado pode já estar no Brasil",
        text: "Descubra se os seus produtos já estão sendo vendidos no Brasil, por meio de quais operadores e a quais preços. Compreenda o mercado antes que outros definam o posicionamento da sua marca por você.",
      },
      {
        num: "02",
        title:
          "Comece a vender no Brasil sem investir imediatamente em uma estrutura local",
        text: "Para várias categorias de produtos, o comércio eletrônico transfronteiriço permite alcançar diretamente os consumidores brasileiros, com envio a partir da Europa. Comece a testar o mercado, construa o reconhecimento da marca e desenvolva as vendas diretas com um investimento gradual.",
      },
      {
        num: "03",
        title: "Transforme as vendas diretas em inteligência comercial",
        text: "As vendas diretas não servem apenas para gerar receita. Elas permitem coletar dados reais de mercado, entender a demanda dos consumidores, identificar os estados brasileiros mais promissores e avaliar se, quando e como estabelecer uma presença local permanente.",
      },
    ],
    advantageTitle: "De um problema de mercado a uma vantagem competitiva",
    advantageIntro:
      "Para várias categorias de produtos, é possível vender legalmente aos consumidores brasileiros por meio do comércio eletrônico transfronteiriço, com envio direto a partir da Europa. Essa abordagem pode ajudar as empresas a:",
    advantageBullets: [
      "Retomar o controle sobre preços e posicionamento comercial.",
      "Construir e proteger a reputação da sua marca.",
      "Alcançar os consumidores brasileiros sem constituir imediatamente uma empresa local.",
      "Coletar dados valiosos sobre a demanda e o comportamento dos consumidores.",
      "Avaliar o mercado antes de se comprometer com investimentos maiores.",
    ],
    advantageOutro:
      "A Business Matching Global identificou e qualificou potenciais parceiros capazes de apoiar as empresas europeias nos requisitos operacionais das vendas transfronteiriças, incluindo logística e serviços de pagamento.",
    advantageNote:
      "A elegibilidade, o tratamento tributário e os requisitos operacionais devem ser avaliados individualmente para cada categoria de produto.",
    speakersTitle: "Conheça os palestrantes",
    speakers: [
      {
        name: "Marzia Moccia",
        role: "Responsável pelo serviço ExportPlanning",
        text: "Ela explicará por que dados de mercado confiáveis são essenciais, mas por que a sua correta interpretação é ainda mais importante para a tomada de decisões estratégicas. Sua contribuição se concentrará especialmente na análise do Brasil no nível dos estados federados, ajudando as empresas a identificar as áreas geográficas com maior potencial para os seus produtos.",
        linkedin: MOCCIA,
      },
      {
        name: "Enzo Aldo Stobbione",
        role: "Business Matching Global – Belo Horizonte, Brasil",
        text: "Ele apresentará as oportunidades comerciais e operacionais para as empresas europeias interessadas em desenvolver vendas diretas no Brasil por meio do comércio eletrônico transfronteiriço, incluindo os requisitos práticos e o papel dos parceiros locais qualificados.",
        linkedin: STOBBIONE,
      },
    ],
    attendTitle: "Quem deve participar?",
    attendIntro:
      "Empreendedores, diretores de exportação, gerentes de e-commerce e executivos comerciais de marcas europeias que já vendem online e internacionalmente. Particularmente relevante para empresas que atuam em:",
    attendBullets: [
      "Cosméticos e beleza.",
      "Alimentos embalados.",
      "Moda e vestuário.",
    ],
    detailsTitle: "Detalhes do webinar",
    details: [
      "Quinta-feira, 3 de dezembro de 2026",
      "17h – Itália",
      "13h – Belo Horizonte, Brasil",
      "Duração: 45 minutos.",
      "Idioma: italiano.",
    ],
    questionsTitle: "As suas perguntas são importantes",
    questions: [
      "Você pode enviar as suas perguntas diretamente no formulário de inscrição.",
      "As perguntas recebidas com antecedência nos ajudarão a preparar a sessão e a abordar os temas mais importantes para os participantes.",
      "Quando os participantes autorizarem explicitamente o contato posterior por meio da caixa de consentimento opcional no formulário de inscrição, também forneceremos um acompanhamento personalizado por escrito.",
    ],
    registerTitle: "Garanta o seu lugar",
    registerSupporting:
      "Descubra se a sua marca já está no Brasil – e como assumir o controle da oportunidade.",
    formTitle: "Formulário de inscrição no webinar",
    finalTitle: "Pronto para olhar o Brasil mais de perto?",
    finalText:
      "Descubra como identificar as oportunidades de mercado existentes, retomar o controle do posicionamento da sua marca e começar a desenvolver vendas diretas no Brasil.",
    privacyLabel: "Política de privacidade",
    tagline:
      "Inteligência de mercado e orquestração de negócios no corredor Europa–Brasil",
  },
};

/** Loads the Tally embed script once, so the form iframe gets its dynamic height. */
const useTallyEmbed = () => {
  useEffect(() => {
    const w = window as unknown as { Tally?: { loadEmbeds: () => void } };
    if (w.Tally) {
      w.Tally.loadEmbeds();
      return;
    }
    const script = document.createElement("script");
    script.src = "https://tally.so/widgets/embed.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);
};

const WebinarInner = ({ lang }: { lang: Lang }) => {
  const c = CONTENT[lang];
  const canonical = SITE + CANONICAL_PATH[lang];
  useTallyEmbed();

  useCanonical(PAGE_PATH[lang], {
    title: c.seoTitle,
    description: c.seoDescription,
    image: SITE + coverAsset.url,
    url: canonical,
    alternates: [
      { hreflang: "en", href: SITE + CANONICAL_PATH.en },
      { hreflang: "it", href: SITE + CANONICAL_PATH.it },
      { hreflang: "pt-BR", href: SITE + CANONICAL_PATH.pt },
      { hreflang: "x-default", href: SITE + CANONICAL_PATH.en },
    ],
  });

  const cta = (
    <a
      href="#register"
      className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
    >
      {c.cta}
    </a>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <div className="h-16 md:h-20" aria-hidden="true" />

      <main className="container max-w-4xl py-10 md:py-14">
        {/* Hero */}
        <section>
          <div className="overflow-hidden rounded-lg border border-border bg-muted">
            <img
              src={coverAsset.url}
              alt={c.altText}
              width={1920}
              height={1080}
              className="aspect-video w-full object-cover"
            />
          </div>
          <h1 className="mt-6 font-display text-2xl md:text-4xl font-semibold tracking-tight leading-tight">
            {c.heroTitle}
          </h1>
          <div className="mt-4 space-y-3 text-[15px] md:text-base leading-relaxed text-muted-foreground">
            {c.heroSubtitle.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <p className="mt-4 text-sm md:text-[15px] font-medium">{c.eventInfo}</p>
          <div className="mt-6">{cta}</div>
        </section>

        {/* The problem */}
        <section className="mt-12 md:mt-16">
          <h2 className="font-display text-xl md:text-2xl font-semibold tracking-tight">
            {c.problemTitle}
          </h2>
          <div className="mt-4 space-y-4 text-[15px] md:text-base leading-relaxed">
            {c.problem.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </section>

        {/* The three opportunities */}
        <section className="mt-12 md:mt-16">
          <h2 className="font-display text-xl md:text-2xl font-semibold tracking-tight">
            {c.reasonsTitle}
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3 md:gap-5">
            {c.cards.map((card) => (
              <div
                key={card.num}
                className="rounded-lg border border-border bg-card p-5 md:p-6"
              >
                <p className="font-display text-2xl font-semibold text-primary">
                  {card.num}
                </p>
                <h3 className="mt-2 font-semibold leading-snug">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {card.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Cross-border e-commerce */}
        <section className="mt-12 md:mt-16">
          <h2 className="font-display text-xl md:text-2xl font-semibold tracking-tight">
            {c.advantageTitle}
          </h2>
          <div className="mt-4 space-y-4 text-[15px] md:text-base leading-relaxed">
            <p>{c.advantageIntro}</p>
            <ul className="space-y-2 list-disc pl-5 marker:text-muted-foreground">
              {c.advantageBullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <p>{c.advantageOutro}</p>
            <p className="text-sm text-muted-foreground">{c.advantageNote}</p>
          </div>
        </section>

        {/* Speakers */}
        <section className="mt-12 md:mt-16">
          <h2 className="font-display text-xl md:text-2xl font-semibold tracking-tight">
            {c.speakersTitle}
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {c.speakers.map((sp) => (
              <div
                key={sp.name}
                className="rounded-lg border border-border bg-card p-5 md:p-6"
              >
                <p className="font-semibold">{sp.name}</p>
                <p className="text-sm text-muted-foreground">{sp.role}</p>
                <p className="mt-3 text-sm leading-relaxed">{sp.text}</p>
                <a
                  href={sp.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`LinkedIn – ${sp.name}`}
                  title="LinkedIn"
                  className="mt-3 inline-flex h-8 w-8 items-center justify-center rounded bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  <Linkedin size={18} aria-hidden="true" />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Who should attend */}
        <section className="mt-12 md:mt-16">
          <h2 className="font-display text-xl md:text-2xl font-semibold tracking-tight">
            {c.attendTitle}
          </h2>
          <div className="mt-4 space-y-4 text-[15px] md:text-base leading-relaxed">
            <p>{c.attendIntro}</p>
            <ul className="space-y-2 list-disc pl-5 marker:text-muted-foreground">
              {c.attendBullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Event details */}
        <section className="mt-12 md:mt-16">
          <h2 className="font-display text-xl md:text-2xl font-semibold tracking-tight">
            {c.detailsTitle}
          </h2>
          <div className="mt-4 space-y-1 text-[15px] md:text-base leading-relaxed">
            {c.details.map((d) => (
              <p key={d}>{d}</p>
            ))}
          </div>
        </section>

        {/* Questions */}
        <section className="mt-12 md:mt-16">
          <h2 className="font-display text-xl md:text-2xl font-semibold tracking-tight">
            {c.questionsTitle}
          </h2>
          <div className="mt-4 space-y-4 text-[15px] md:text-base leading-relaxed">
            {c.questions.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </section>

        {/* Registration — official Tally form, embedded */}
        <section id="register" className="mt-12 md:mt-16 scroll-mt-24">
          <h2 className="font-display text-xl md:text-2xl font-semibold tracking-tight">
            {c.registerTitle}
          </h2>
          <p className="mt-3 text-[15px] md:text-base leading-relaxed">
            {c.registerSupporting}
          </p>
          <div className="mt-6 overflow-hidden rounded-lg border border-border bg-card p-2 md:p-4">
            <iframe
              data-tally-src={TALLY_EMBED}
              loading="lazy"
              width="100%"
              height={500}
              frameBorder={0}
              marginHeight={0}
              marginWidth={0}
              title={c.formTitle}
              className="w-full"
            />
          </div>
          <p className="mt-4 text-sm">
            <a
              href="https://www.iubenda.com/privacy-policy/16979386"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-2 hover:text-primary/80"
            >
              {c.privacyLabel}
            </a>
          </p>
        </section>

      </main>

      <FooterInner tagline={c.tagline} />
    </div>
  );
};

/** Webinar landing page — one language per URL, forced by the route. */
const Webinar = ({ lang }: { lang: Lang }) => (
  <LanguageProvider lang={lang}>
    <WebinarInner lang={lang} />
  </LanguageProvider>
);

export default Webinar;
