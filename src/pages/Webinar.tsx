import { Linkedin } from "lucide-react";
import { Nav } from "@/pages/AboutUs";
import { FooterInner } from "@/components/SiteFooter";
import { LanguageProvider, useT, type Lang } from "@/lib/i18n";
import { useCanonical, SITE } from "@/lib/useCanonical";
import coverAsset from "@/assets/copertina-webinar-bmg-16x9.png.asset.json";

const REGISTER_URL = "https://tally.so/r/kbdPvM";

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

type Speaker = { name: string; text: string; linkedin: string };
type Content = {
  seoTitle: string;
  seoDescription: string;
  altText: string;
  title: string;
  cta: string;
  intro: string;
  coverTitle: string;
  bullets: string[];
  speakerTitle: string;
  speakers: Speaker[];
  forLabel: string;
  forText: string;
  when: string;
  questions: string;
  link: string;
  privacyLabel: string;
  tagline: string;
};

const MOCCIA = "https://www.linkedin.com/in/marzia-moccia/";
const STOBBIONE = "https://www.linkedin.com/in/enzoaldostobbione/";

const CONTENT: Record<Lang, Content> = {
  it: {
    seoTitle: "Il vostro marchio è già in Brasile a vostra insaputa? · Webinar 3 dicembre 2026",
    seoDescription:
      "Webinar online di Business Matching Global, giovedì 3 dicembre 2026 alle 17: come capire se il vostro marchio è già in vendita in Brasile e come vendere direttamente al consumatore brasiliano dall’Europa.",
    altText:
      "Copertina del webinar “Il vostro marchio è già in Brasile a vostra insaputa?”, 3 dicembre 2026, ore 17, Business Matching Global",
    title: "Il vostro marchio è già in Brasile a vostra insaputa?",
    cta: "Iscriviti",
    intro:
      "Molti marchi europei sono già in vendita in Brasile senza saperlo: comprati altrove, spediti da altri paesi, venduti a un prezzo che nessuno ha deciso, a volte accanto ai falsi. Intanto il canale che permetterebbe al marchio di vendere direttamente al consumatore brasiliano, dall'Europa e a condizioni fiscali agevolate, resta quasi inutilizzato.",
    coverTitle: "In 45 minuti vediamo:",
    bullets: [
      "come capire se il vostro marchio è già in Brasile, e attraverso chi;",
      "le strade per vendere direttamente al consumatore brasiliano partendo dall'Europa, e cosa richiede ciascuna;",
      "come individuare lo Stato brasiliano con il potenziale più alto per il vostro prodotto, perché regole, tassazione e canali cambiano da uno Stato all'altro;",
      "perché questo canale, prima di qualsiasi investimento, è anche il modo più economico per misurare la domanda e far conoscere il marchio;",
      "come finanziare il progetto con gli strumenti agevolati per l'e-commerce, se la vostra impresa ha sede in Italia.",
    ],
    speakerTitle: "Intervengono:",
    speakers: [
      { name: "Marzia Moccia", text: "responsabile del servizio ExportPlanning. Mostrerà perché servono dati affidabili, ma soprattutto la capacità di interpretarli correttamente per prendere decisioni, illustrando il metodo sulla scelta dello Stato brasiliano.", linkedin: MOCCIA },
      { name: "Enzo Aldo Stobbione", text: "Business Matching Global, Belo Horizonte.", linkedin: STOBBIONE },
    ],
    forLabel: "Per chi:",
    forText:
      "responsabili export, e-commerce e direzione di marchi europei che vendono già online e all'estero, in particolare nella cosmetica, nell'alimentare confezionato e nella moda.",
    when: "Giovedì 3 dicembre 2026, ore 17 italiane (13 a Belo Horizonte). In italiano.",
    questions:
      "Le domande si raccolgono per iscritto, al momento dell'iscrizione e in chat durante l'incontro. Quelle che arrivano prima ci aiutano a preparare l'incontro. A ciascuna rispondiamo per iscritto dopo.",
    link: "Il link per partecipare arriva per email agli iscritti nei giorni precedenti l'incontro.",
    privacyLabel: "Informativa privacy",
    tagline: "Market intelligence e business orchestration per il corridoio Europa–Brasile",
  },
  en: {
    seoTitle: "Is your brand already in Brazil without your knowledge? · Webinar 3 December 2026",
    seoDescription:
      "Online webinar by Business Matching Global, Thursday 3 December 2026, 5 pm Italy time: how to find out whether your brand is already sold in Brazil, and how to sell directly to Brazilian consumers from Europe. Held in Italian.",
    altText:
      "Cover of the webinar “Is your brand already in Brazil without your knowledge?”, 3 December 2026, 5 pm Italy time, Business Matching Global",
    title: "Is your brand already in Brazil without your knowledge?",
    cta: "Register",
    intro:
      "Many European brands are already on sale in Brazil without knowing it: bought elsewhere, shipped from other countries, sold at a price nobody decided, sometimes next to counterfeits. Meanwhile, the channel that would allow a brand to sell directly to Brazilian consumers, from Europe and under favourable tax conditions, remains almost unused.",
    coverTitle: "In 45 minutes we cover:",
    bullets: [
      "how to find out whether your brand is already in Brazil, and through whom;",
      "the ways to sell directly to Brazilian consumers from Europe, and what each one requires;",
      "how to identify the Brazilian state with the highest potential for your product, since rules, taxes and channels change from one state to the next;",
      "why this channel, before any investment, is also the cheapest way to measure demand and build brand awareness;",
      "how to finance the project with subsidised e-commerce instruments, if your company is based in Italy.",
    ],
    speakerTitle: "Speakers:",
    speakers: [
      { name: "Marzia Moccia", text: "head of the ExportPlanning service. She will show why reliable data matter, and above all the ability to interpret them correctly to make decisions, illustrating the method on the choice of the Brazilian state.", linkedin: MOCCIA },
      { name: "Enzo Aldo Stobbione", text: "Business Matching Global, Belo Horizonte.", linkedin: STOBBIONE },
    ],
    forLabel: "Who it is for:",
    forText:
      "export, e-commerce and management teams of European brands that already sell online and abroad, particularly in cosmetics, packaged food and fashion.",
    when: "Thursday 3 December 2026, 5 pm Italian time (1 pm in Belo Horizonte). The webinar is in Italian.",
    questions:
      "Questions are collected in writing, at registration and in the chat during the session. Those received in advance help us prepare. We answer each one in writing afterwards.",
    link: "Registered participants will receive the link to join by email in the days before the session.",
    privacyLabel: "Privacy policy",
    tagline: "Market intelligence and business orchestration for the Europe–Brazil corridor",
  },
  pt: {
    seoTitle: "A sua marca já está no Brasil sem que vocês saibam? · Webinar 3 de dezembro de 2026",
    seoDescription:
      "Webinar online da Business Matching Global, quinta-feira, 3 de dezembro de 2026, às 13h em Belo Horizonte: como descobrir se a sua marca já é vendida no Brasil e como vender diretamente ao consumidor brasileiro a partir da Europa. Em italiano.",
    altText:
      "Capa do webinar “A sua marca já está no Brasil sem que vocês saibam?”, 3 de dezembro de 2026, 17h na Itália, Business Matching Global",
    title: "A sua marca já está no Brasil sem que vocês saibam?",
    cta: "Inscreva-se",
    intro:
      "Muitas marcas europeias já estão à venda no Brasil sem saber: compradas em outros lugares, enviadas de outros países, vendidas a um preço que ninguém decidiu, às vezes ao lado de falsificações. Enquanto isso, o canal que permitiria à marca vender diretamente ao consumidor brasileiro, a partir da Europa e com condições fiscais favorecidas, continua quase sem uso.",
    coverTitle: "Em 45 minutos vemos:",
    bullets: [
      "como descobrir se a sua marca já está no Brasil, e por meio de quem;",
      "os caminhos para vender diretamente ao consumidor brasileiro a partir da Europa, e o que cada um exige;",
      "como identificar o estado brasileiro com o maior potencial para o seu produto, já que regras, tributação e canais mudam de um estado para outro;",
      "por que esse canal, antes de qualquer investimento, é também a forma mais econômica de medir a demanda e tornar a marca conhecida;",
      "como financiar o projeto com os instrumentos subsidiados para o e-commerce, se a sua empresa tem sede na Itália.",
    ],
    speakerTitle: "Palestrantes:",
    speakers: [
      { name: "Marzia Moccia", text: "responsável pelo serviço ExportPlanning. Vai mostrar por que são necessários dados confiáveis e, sobretudo, a capacidade de interpretá-los corretamente para tomar decisões, ilustrando o método com a escolha do estado brasileiro.", linkedin: MOCCIA },
      { name: "Enzo Aldo Stobbione", text: "Business Matching Global, Belo Horizonte.", linkedin: STOBBIONE },
    ],
    forLabel: "Para quem:",
    forText:
      "responsáveis de exportação, e-commerce e diretoria de marcas europeias que já vendem online e no exterior, em especial nos setores de cosméticos, alimentos embalados e moda.",
    when: "Quinta-feira, 3 de dezembro de 2026, às 17h na Itália (13h em Belo Horizonte). O webinar é em italiano.",
    questions:
      "As perguntas são recebidas por escrito, no momento da inscrição e no chat durante o encontro. As que chegam antes nos ajudam a preparar o encontro. Respondemos a cada uma por escrito depois.",
    link: "O link para participar é enviado por e-mail aos inscritos nos dias anteriores ao encontro.",
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
      href={REGISTER_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
    >
      {c.cta}
    </a>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <div className="h-16 md:h-20" aria-hidden="true" />

      <main className="container max-w-3xl py-10 md:py-14">
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
            {c.title}
          </h1>
          <div className="mt-6">{cta}</div>
        </section>

        <section className="mt-10 md:mt-12 space-y-6 text-[15px] md:text-base leading-relaxed">
          <p>{c.intro}</p>
          <div>
            <p className="font-semibold">{c.coverTitle}</p>
            <ul className="mt-3 space-y-3 list-disc pl-5 marker:text-muted-foreground">
              {c.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold">{c.speakerTitle}</p>
            <div className="mt-3 space-y-4">
              {c.speakers.map((sp) => (
                <div key={sp.name}>
                  <p>
                    <span className="font-semibold">{sp.name}</span>, {sp.text}
                  </p>
                  <a
                    href={sp.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`LinkedIn – ${sp.name}`}
                    title="LinkedIn"
                    className="mt-2 inline-flex h-8 w-8 items-center justify-center rounded bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    <Linkedin size={18} aria-hidden="true" />
                  </a>
                </div>
              ))}
            </div>
          </div>
          <p>
            <span className="font-semibold">{c.forLabel}</span> {c.forText}
          </p>
          <p className="font-semibold">{c.when}</p>
          <p>{c.questions}</p>
          <p>{c.link}</p>
        </section>

        <section className="mt-10 md:mt-12">
          {cta}
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
