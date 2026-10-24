import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Nav } from "@/pages/AboutUs";
import { FooterInner } from "@/components/SiteFooter";
import { LanguageProvider, useT, type Lang } from "@/lib/i18n";
import { pathForLang } from "@/lib/langPath";
import { useCanonical, SITE } from "@/lib/useCanonical";

const TALLY_URL =
  "https://tally.so/embed/kbdPvM?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1";
const TALLY_SCRIPT = "https://tally.so/widgets/embed.js";

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

type Content = {
  seoTitle: string;
  seoDescription: string;
  iframeTitle: string;
  altText: string;
  title: string;
  dateLine: string;
  cta: string;
  intro: string;
  coverTitle: string;
  bullets: string[];
  forTitle: string;
  forText: string;
  howTitle: string;
  howText: string;
  speakerTitle: string;
  speakerText: string;
  speakerLinkLabel: string;
  regTitle: string;
  regText: string;
  formNote?: string;
  privacyLabel: string;
  tagline: string;
};

const CONTENT: Record<Lang, Content> = {
  it: {
    seoTitle: "Il vostro marchio è già in Brasile a vostra insaputa? · Webinar 3 dicembre 2026",
    seoDescription:
      "Webinar online di Business Matching Global, giovedì 3 dicembre 2026 alle 17: come capire se il vostro marchio è già in vendita in Brasile e come vendere direttamente al consumatore brasiliano dall’Europa.",
    iframeTitle: "Iscrizione al webinar",
    altText:
      "Copertina del webinar “Il vostro marchio è già in Brasile a vostra insaputa?”, 3 dicembre 2026, ore 17, Business Matching Global",
    title: "Il vostro marchio è già in Brasile a vostra insaputa?",
    dateLine: "Webinar online · giovedì 3 dicembre 2026 · ore 17 (Italia) · 45 minuti · in italiano",
    cta: "Iscriviti",
    intro:
      "Molti marchi europei sono già in vendita in Brasile senza saperlo: comprati altrove, spediti da altri paesi, venduti a un prezzo che nessuno ha deciso, a volte accanto ai falsi. Intanto il canale che permetterebbe al marchio di vendere direttamente al consumatore brasiliano, dall’Europa e a condizioni fiscali agevolate, resta quasi inutilizzato.",
    coverTitle: "In 45 minuti vediamo",
    bullets: [
      "come capire se il vostro marchio è già in Brasile, e attraverso chi;",
      "le strade per vendere direttamente al consumatore brasiliano partendo dall’Europa, e cosa richiede ciascuna;",
      "perché questo canale, prima di qualsiasi investimento, è anche il modo più economico per misurare la domanda e far conoscere il marchio;",
      "come finanziare il progetto con gli strumenti agevolati per l’e-commerce, se la vostra impresa ha sede in Italia.",
    ],
    forTitle: "Per chi",
    forText:
      "Responsabili export, e-commerce e direzione di marchi europei che vendono già online e all’estero, in particolare nella cosmetica, nell’alimentare confezionato e nella moda.",
    howTitle: "Come funziona",
    howText:
      "Le domande si raccolgono per iscritto in chat; a ciascuna rispondiamo per iscritto dopo l’incontro. Il link per partecipare arriva per email agli iscritti nei giorni precedenti l’incontro.",
    speakerTitle: "Relatore",
    speakerText:
      "Enzo Aldo Stobbione, Business Matching Global, market intelligence and business orchestration for the Europe–Brazil corridor.",
    speakerLinkLabel: "Chi siamo",
    regTitle: "Iscrizione",
    regText: "Iscrizione gratuita.",
    privacyLabel: "Informativa privacy",
    tagline: "Market intelligence e business orchestration per il corridoio Europa–Brasile",
  },
  en: {
    seoTitle: "Is your brand already in Brazil without your knowing? · Webinar 3 December 2026",
    seoDescription:
      "Online webinar by Business Matching Global, Thursday 3 December 2026, 5 pm Italy time: how to find out whether your brand is already sold in Brazil, and how to sell directly to Brazilian consumers from Europe. Held in Italian.",
    iframeTitle: "Webinar registration",
    altText:
      "Cover of the webinar “Is your brand already in Brazil without your knowing?”, 3 December 2026, 5 pm Italy time, Business Matching Global",
    title: "Is your brand already in Brazil without your knowing?",
    dateLine: "Online webinar · Thursday 3 December 2026 · 5 pm (Italy) · 45 minutes · held in Italian",
    cta: "Register",
    intro:
      "Many European brands are already on sale in Brazil without knowing it: bought elsewhere, shipped from other countries, sold at a price nobody chose, sometimes next to counterfeits. Meanwhile, the channel that would let a brand sell directly to Brazilian consumers, from Europe and with a simplified tax treatment, remains almost unused.",
    coverTitle: "In 45 minutes we cover",
    bullets: [
      "how to find out whether your brand is already in Brazil, and through whom;",
      "the routes for selling directly to Brazilian consumers from Europe, and what each one requires;",
      "why this channel, before any investment, is also the cheapest way to measure demand and build brand awareness;",
      "how to finance the project with subsidised e-commerce instruments, if your company is based in Italy.",
    ],
    forTitle: "Who it is for",
    forText:
      "Export, e-commerce and senior managers of European brands that already sell online and abroad, especially in cosmetics, packaged food and fashion.",
    howTitle: "How it works",
    howText:
      "Questions are collected in writing in the chat, and each one receives a written answer after the session. The link to join is sent by email to registered participants in the days before the session.",
    speakerTitle: "Speaker",
    speakerText:
      "Enzo Aldo Stobbione, Business Matching Global, market intelligence and business orchestration for the Europe–Brazil corridor.",
    speakerLinkLabel: "About us",
    regTitle: "Registration",
    regText: "Registration is free.",
    formNote: "The form is in Italian, with an English translation under each question.",
    privacyLabel: "Privacy policy",
    tagline: "Market intelligence and business orchestration for the Europe–Brazil corridor",
  },
  pt: {
    seoTitle: "Sua marca já está no Brasil sem que você saiba? · Webinar 3 de dezembro de 2026",
    seoDescription:
      "Webinar online da Business Matching Global, quinta-feira, 3 de dezembro de 2026, às 13h de Brasília: como descobrir se a sua marca já é vendida no Brasil e como vender diretamente ao consumidor brasileiro a partir da Europa. Em italiano.",
    iframeTitle: "Inscrição no webinar",
    altText:
      "Capa do webinar “Sua marca já está no Brasil sem que você saiba?”, 3 de dezembro de 2026, 17h na Itália, Business Matching Global",
    title: "Sua marca já está no Brasil sem que você saiba?",
    dateLine:
      "Webinar online · quinta-feira, 3 de dezembro de 2026 · 17h (Itália), 13h (Brasília) · 45 minutos · em italiano",
    cta: "Inscreva-se",
    intro:
      "Muitas marcas europeias já estão à venda no Brasil sem saber: compradas em outros lugares, enviadas de outros países, vendidas a um preço que ninguém definiu, às vezes ao lado de falsificações. Enquanto isso, o canal que permitiria à marca vender diretamente ao consumidor brasileiro, a partir da Europa e com tributação simplificada, continua quase sem uso.",
    coverTitle: "Em 45 minutos, vamos ver",
    bullets: [
      "como descobrir se a sua marca já está no Brasil, e por meio de quem;",
      "os caminhos para vender diretamente ao consumidor brasileiro a partir da Europa, e o que cada um exige;",
      "por que esse canal, antes de qualquer investimento, é também a forma mais econômica de medir a demanda e tornar a marca conhecida;",
      "como financiar o projeto com os instrumentos de crédito subsidiado para e-commerce, se a sua empresa tem sede na Itália.",
    ],
    forTitle: "Para quem",
    forText:
      "Responsáveis de exportação, e-commerce e diretoria de marcas europeias que já vendem online e no exterior, em especial nos setores de cosméticos, alimentos embalados e moda.",
    howTitle: "Como funciona",
    howText:
      "As perguntas são recebidas por escrito no chat; cada uma recebe uma resposta por escrito depois do encontro. O link para participar é enviado por e-mail aos inscritos nos dias anteriores ao encontro.",
    speakerTitle: "Palestrante",
    speakerText:
      "Enzo Aldo Stobbione, Business Matching Global, market intelligence and business orchestration for the Europe–Brazil corridor.",
    speakerLinkLabel: "Quem somos",
    regTitle: "Inscrição",
    regText: "Inscrição gratuita.",
    formNote: "O formulário está em italiano, com tradução em inglês abaixo de cada pergunta.",
    privacyLabel: "Política de privacidade",
    tagline: "Inteligência de mercado e orquestração de negócios no corredor Europa–Brasil",
  },
};

const WebinarInner = ({ lang }: { lang: Lang }) => {
  const c = CONTENT[lang];
  const canonical = SITE + CANONICAL_PATH[lang];

  useCanonical(PAGE_PATH[lang], {
    title: c.seoTitle,
    description: c.seoDescription,
    url: canonical,
    alternates: [
      { hreflang: "en", href: SITE + CANONICAL_PATH.en },
      { hreflang: "it", href: SITE + CANONICAL_PATH.it },
      { hreflang: "pt-BR", href: SITE + CANONICAL_PATH.pt },
      { hreflang: "x-default", href: SITE + CANONICAL_PATH.en },
    ],
  });

  useEffect(() => {
    if (document.querySelector(`script[src="${TALLY_SCRIPT}"]`)) return;
    const script = document.createElement("script");
    script.src = TALLY_SCRIPT;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const scrollToRegistration = () => {
    document.getElementById("iscrizione")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <div className="h-16 md:h-20" aria-hidden="true" />

      <main className="container max-w-3xl py-10 md:py-14">
        {/* Hero */}
        <section>
          <div className="overflow-hidden rounded-lg border border-border bg-muted">
            <div className="aspect-video w-full flex flex-col items-center justify-center gap-2 px-6 text-center">
              <p className="font-display text-lg md:text-2xl text-foreground/80 max-w-xl leading-snug">
                {c.title}
              </p>
              <p className="text-xs md:text-sm text-muted-foreground">{c.dateLine}</p>
            </div>
          </div>
          <h1 className="mt-6 font-display text-2xl md:text-4xl font-semibold tracking-tight leading-tight">
            {c.title}
          </h1>
          <p className="mt-3 text-sm md:text-base text-muted-foreground">{c.dateLine}</p>
          <div className="mt-6">
            <button
              type="button"
              onClick={scrollToRegistration}
              className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              {c.cta}
            </button>
          </div>
        </section>

        {/* Intro */}
        <section className="mt-10 md:mt-12">
          <p className="text-[15px] md:text-base leading-relaxed">{c.intro}</p>
        </section>

        {/* What we cover */}
        <section className="mt-10 md:mt-12">
          <h2 className="font-display text-xl md:text-2xl font-semibold tracking-tight">{c.coverTitle}</h2>
          <ul className="mt-4 space-y-3 list-disc pl-5 text-[15px] md:text-base leading-relaxed marker:text-muted-foreground">
            {c.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </section>

        {/* Who it is for */}
        <section className="mt-10 md:mt-12">
          <h2 className="font-display text-xl md:text-2xl font-semibold tracking-tight">{c.forTitle}</h2>
          <p className="mt-4 text-[15px] md:text-base leading-relaxed">{c.forText}</p>
        </section>

        {/* How it works */}
        <section className="mt-10 md:mt-12">
          <h2 className="font-display text-xl md:text-2xl font-semibold tracking-tight">{c.howTitle}</h2>
          <p className="mt-4 text-[15px] md:text-base leading-relaxed">{c.howText}</p>
        </section>

        {/* Speaker */}
        <section className="mt-10 md:mt-12">
          <h2 className="font-display text-xl md:text-2xl font-semibold tracking-tight">{c.speakerTitle}</h2>
          <p className="mt-4 text-[15px] md:text-base leading-relaxed">
            {c.speakerText}{" "}
            <Link
              to={pathForLang(lang, "/About_us")}
              className="text-primary underline underline-offset-2 hover:text-primary/80"
            >
              {c.speakerLinkLabel}
            </Link>
          </p>
        </section>

        {/* Registration */}
        <section id="iscrizione" className="mt-12 md:mt-16 scroll-mt-24">
          <h2 className="font-display text-xl md:text-2xl font-semibold tracking-tight">{c.regTitle}</h2>
          <p className="mt-4 text-[15px] md:text-base leading-relaxed">{c.regText}</p>
          {c.formNote && <p className="mt-2 text-sm text-muted-foreground">{c.formNote}</p>}
          <div className="mt-6">
            <iframe
              data-tally-src={TALLY_URL}
              loading="lazy"
              width="100%"
              height="600"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              title={c.iframeTitle}
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
