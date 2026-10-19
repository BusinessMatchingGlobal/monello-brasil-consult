import { useState, useEffect, FormEvent } from "react";
import { Link } from "react-router-dom";
import { useT, Lang } from "@/lib/i18n";
import italcamLogo from "@/assets/italcam-associado-2026.png.asset.json";
import italiabrasilLogo from "@/assets/italcam-minas-gerais.png.asset.json";
import exportStrategistLogo from "@/assets/exportstrategist.png.asset.json";
import logoBMG from "@/assets/logo-business-matching-global-transparent.png.asset.json";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  FileSearch,
  Layers,
  AlertTriangle,
  Menu,
  X,
  Mail,
  Linkedin,
  Instagram,
  Facebook,
  Youtube,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { trackContactForm } from "@/lib/analytics";
import { openConsentBanner } from "@/lib/consent";
import { useCanonical } from "@/lib/useCanonical";
import { pathForLang } from "@/lib/langPath";
import { hasSituations, situationContent, STARTING_POINT } from "@/data/situations";
import { SiteContactForm } from "@/components/SiteContactForm";
import { HomeNewsletter, FooterInner } from "@/components/SiteFooter";
export { FooterInner };
import { AnalysisNavMenu } from "@/components/AnalysisNavMenu";

const EMAIL = "info@businessmatching.global";

function LangSwitcher() {
  const { lang, setLang } = useT();
  const langs: Lang[] = ["en", "it", "pt"];
  return (
    <div className="inline-flex items-center gap-1 text-xs font-medium tracking-wider uppercase">
      {langs.map((l, i) => (
        <div key={l} className="flex items-center">
          <button
            onClick={() => setLang(l)}
            className={`px-1.5 py-1 transition-colors ${
              lang === l ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {l === "pt" ? "PT-BR" : l.toUpperCase()}
          </button>
          {i < langs.length - 1 && <span className="text-border">/</span>}
        </div>
      ))}
    </div>
  );
}

import { Nav } from "./AboutUs";

function Hero() {
  const { t, lang } = useT();
  return (
    <section id="top" className="relative pt-32 md:pt-44 pb-20 md:pb-32 overflow-hidden">
      {/* faint world-map texture */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="container relative max-w-5xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card/60 mb-8 text-xs tracking-wider uppercase text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          EU <span className="text-border">·</span> Brazil
        </div>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight max-w-4xl">
          {t.hero.title}
        </h1>
        <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed text-justify">
          {t.hero.sub}
        </p>
        <p className="mt-4 text-sm md:text-base text-foreground/80 max-w-3xl">
          {t.hero.areas}
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button asChild size="lg" className="rounded-full h-12 px-6">
            <a href="#contact">
              {t.hero.cta1} <ArrowRight className="ml-1 h-4 w-4" />
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full h-12 px-6">
            <Link to="/Our_Services">{t.hero.ctaAsk}</Link>
          </Button>
          <Button asChild size="lg" variant="ghost" className="rounded-full h-12 px-6">
            <a href="#services">{t.hero.cta2}</a>
          </Button>
        </div>
        <div className="mt-6">
          <a
            href={pathForLang(lang, "/sample-report")}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground underline underline-offset-4"
          >
            {lang === "it" ? "Scarica un esempio di report (PDF)" : lang === "pt" ? "Baixe um exemplo de relatório (PDF)" : "Download a sample report (PDF)"}
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
        <div className="mt-3">
          <a
            href="https://www.linkedin.com/company/businessmatchingglobal"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground underline underline-offset-4"
          >
            <Linkedin className="h-3.5 w-3.5" />
            {t.hero.linkedin}
          </a>
        </div>
      </div>
    </section>
  );
}

function CredibilityStrip() {
  const { t } = useT();
  return (
    <section className="border-y border-border/60 bg-muted/30">
      <div className="container max-w-5xl py-5">
        <Link to="/About_us" className="block group">
          <p className="text-sm text-foreground/80 group-hover:text-foreground transition-colors">
            {t.credibility.line}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {t.credibility.badges.map((b) => (
              <span
                key={b}
                className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground"
              >
                {b}
              </span>
            ))}
          </div>
        </Link>
      </div>
    </section>
  );
}

function StartingPoint() {
  const { lang } = useT();
  const copy = STARTING_POINT[lang] ?? STARTING_POINT.en;
  if (!hasSituations(lang) && lang !== "pt") return null;
  const already = situationContent("already-in-brazil", lang);
  const back = situationContent("back-to-brazil", lang);
  const cards = [
    { to: "/Our_Services", title: copy.notYet.title, text: copy.notYet.text },
    ...(hasSituations(lang) ? [
      { to: already.slug, title: already.cardTitle, text: already.cardText },
      { to: back.slug, title: back.cardTitle, text: back.cardText },
    ] : []),
  ];
  return (
    <section className="py-16 md:py-20 border-b border-border/60">
      <div className="container max-w-6xl">
        <h2 className="text-2xl md:text-3xl mb-8">{copy.title}</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {cards.map((card) => (
            <div
              key={card.to}
              className="group p-7 rounded-2xl border border-border bg-card hover:border-primary/60 transition-colors block"
            >
              <Link to={card.to} className="block">
              <h3 className="font-display text-xl mb-3">{card.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{card.text}</p>
              </Link>
              {lang === "pt" && card.to === "/Our_Services" && <Link to="/before-you-choose#who-gets-paid" className="mt-4 block text-sm text-primary underline underline-offset-4">Primeira pergunta: o Brasil vale a pena para o seu setor? →</Link>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Problem() {
  const { t } = useT();
  const icons = [Layers, FileSearch, AlertTriangle];
  return (
    <section className="py-20 md:py-28 border-t border-border/60">
      <div className="container max-w-5xl">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-5">
            <h2 className="text-3xl md:text-4xl lg:text-5xl leading-tight">{t.problem.title}</h2>
          </div>
          <div className="md:col-span-7">
            <p className="text-lg text-muted-foreground leading-relaxed text-justify">{t.problem.body}</p>
          </div>
        </div>
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr_auto_1fr] gap-6 items-center">
          {t.problem.items.flatMap(([title, body], i) => {
            const Icon = icons[i];
            const card = (
              <div key={title || i} className="p-6 rounded-2xl border border-border bg-card">
                <Icon className="h-5 w-5 text-primary mb-4" />
                {title && <h3 className="font-display text-lg font-medium mb-2">{title}</h3>}
                <p className="text-sm text-muted-foreground leading-relaxed text-justify">{body}</p>
              </div>
            );
            if (i < 2) {
              return [
                card,
                <div key={`op-${i}`} className="hidden sm:flex items-center justify-center text-2xl font-medium text-muted-foreground px-2">
                  {i === 0 ? "+" : "="}
                </div>,
              ];
            }
            return [card];
          })}
        </div>
      </div>
    </section>
  );
}

function Services() {
  const { t, lang } = useT();
  const matchingPath =
    lang === "it" ? "/servizi/business-matching" : lang === "pt" ? "/servicos/business-matching" : "/services/business-matching";
  return (
    <section id="services" className="py-20 md:py-28 bg-foreground text-background">
      <div className="container max-w-6xl">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl leading-tight max-w-2xl text-background">
            {t.homeServices.title}
          </h2>
        </div>
        <p className="text-lg md:text-xl text-background/80 mb-2 leading-relaxed">
          {t.homeServices.subtitle}
        </p>
        <p className="text-base text-background/70 mb-14 leading-relaxed max-w-3xl">
          {t.homeServices.intro}
        </p>
        <div className="grid md:grid-cols-2 gap-5">
          {t.homeServices.items.map((item) => {
            const cardClass =
              "group p-7 rounded-2xl bg-background/[0.04] border border-background/10 hover:border-primary/60 transition-colors";
            const inner = (
              <>
                <h3 className="font-display text-2xl mb-3 text-background">{item.name}</h3>
                <p className="text-background/70 leading-relaxed">{item.desc}</p>
              </>
            );
            return item.name === "Business Matching" ? (
              <Link key={item.name} to={matchingPath} className={`${cardClass} block`}>
                {inner}
              </Link>
            ) : (
              <div key={item.name} className={cardClass}>
                {inner}
              </div>
            );
          })}
        </div>
        <div className="mt-14 flex justify-center">
          <Button asChild size="lg" className="rounded-full bg-background text-foreground hover:bg-background/90">
            <Link to="/Our_Services">
              {t.homeServices.cta} <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const { t } = useT();
  return (
    <section id="how" className="py-20 md:py-28">
      <div className="container max-w-6xl">
        <h2 className="text-3xl md:text-4xl lg:text-5xl mb-14 max-w-2xl">{t.how.title}</h2>
        <div className="grid md:grid-cols-5 gap-8 md:gap-6">
          {t.how.steps.map(([title, body], i) => (
            <div key={title} className="relative">
              <div className="text-amber font-display text-5xl mb-4">
                0{i + 1}
              </div>
              <h3 className="font-display text-xl mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
              {i < t.how.steps.length - 1 && (
                <div className="hidden md:block absolute top-7 right-0 w-8 h-px bg-border" />
              )}
            </div>
          ))}
        </div>
        <p className="mt-14 border-l-2 border-amber pl-6 font-display text-xl md:text-2xl max-w-3xl">
          {t.how.note}
        </p>
      </div>
    </section>
  );
}

function About() {
  const { t, lang } = useT();
  const moreLabel =
    lang === "it"
      ? "Scopri il nostro metodo"
      : lang === "pt"
      ? "Saiba mais sobre o nosso método"
      : "Learn more about our method";
  return (
    <section id="about" className="py-20 md:py-28 border-t border-border/60">
      <div className="container max-w-4xl text-center">
        <span className="text-xs tracking-wider uppercase text-primary mb-6 inline-block">
          {t.nav.method}
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl leading-tight mb-8">{t.about.title}</h2>
        <div className="space-y-5 text-left md:text-center">
          {t.about.body.split("\n\n").map((para, i) => (
            <p key={i} className="text-lg text-muted-foreground leading-relaxed">{para}</p>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Link
            to="/About_us"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-amber transition-colors underline underline-offset-4"
          >
            {moreLabel} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const { t } = useT();
  return (
    <section className="py-20 md:py-28 bg-muted/50">
      <div className="container max-w-6xl">
        <h2 className="text-3xl md:text-4xl mb-12 text-center">{t.testimonials.title}</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="p-8 rounded-2xl bg-background border border-border min-h-[200px] flex items-center justify-center"
            >
              <p className="text-muted-foreground italic text-center">{t.testimonials.placeholder}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const { t } = useT();
  return (
    <section className="py-20 md:py-28">
      <div className="container max-w-3xl">
        <h2 className="text-3xl md:text-4xl lg:text-5xl mb-10 text-center">{t.faq.title}</h2>
        <Accordion type="single" collapsible className="w-full">
          {t.faq.items.map(([q, a], i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-border">
              <AccordionTrigger className="text-left text-base md:text-lg font-display font-medium hover:no-underline">
                {q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function Footer() {
  const { t, lang } = useT();
  return (
    <FooterInner />
  );
}

function PartnerProgramBanner() {
  const { lang } = useT();
  const c =
    lang === "it"
      ? {
          title: "Sei un export manager o un professionista con clienti che guardano al Brasile?",
          text: "Tieni il tuo cliente. Allunga il tuo raggio. Usa BMG come desk operativo locale per il Brasile.",
          cta: "Scopri il Partner Program",
        }
      : lang === "pt"
      ? {
          title: "Você é export manager ou assessor com clientes de olho no Brasil?",
          text: "Mantenha o seu cliente. Amplie o seu alcance. Use a BMG como desk operacional local para o Brasil.",
          cta: "Conheça o Partner Program",
        }
      : {
          title: "Are you an export manager or an adviser with clients looking at Brazil?",
          text: "Keep your client. Extend your reach. Use BMG as your local operating desk for Brazil.",
          cta: "Explore the Partner Program",
        };
  return (
    <section className="py-12 md:py-16">
      <div className="container">
        <div className="rounded-2xl bg-secondary/60 border border-border p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-5 md:gap-8">
          <div className="flex-1">
            <h2 className="font-display text-xl md:text-2xl leading-snug text-foreground">{c.title}</h2>
            <p className="mt-2 text-muted-foreground">{c.text}</p>
          </div>
          <Link
            to="/Partner_Program"
            className="shrink-0 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            {c.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}

function PullQuote() {
  const { lang } = useT();
  const text =
    lang === "it"
      ? "L'ordine è il primo prodotto da esportare."
      : lang === "pt"
      ? "A ordem é o primeiro produto a exportar."
      : "Order is the first thing you export.";
  return (
    <section className="py-20 md:py-28 border-t border-border/60">
      <div className="container max-w-4xl text-center">
        <Link to="/How_we_work" className="group inline-block">
          <blockquote className="font-display text-3xl md:text-5xl leading-tight text-foreground group-hover:text-primary transition-colors">
            {text}
          </blockquote>
        </Link>
      </div>
    </section>
  );
}

export default function Index() {
  const { lang } = useT();
  const homeSeo =
    lang === "it"
      ? {
          title: "Business Matching Global — Market intelligence e orchestrazione d'affari UE–Brasile",
          description:
            "Market intelligence, verifica delle controparti ed esecuzione locale tra Europa e Brasile, nei due sensi. Risposte chiare e documentate per aziende, export manager e professionisti.",
        }
      : lang === "pt"
      ? {
          title: "Business Matching Global — Inteligência de mercado e orquestração de negócios UE–Brasil",
          description:
            "Inteligência de mercado, verificação de contrapartes e execução local entre Europa e Brasil, nos dois sentidos. Respostas claras e documentadas para empresas, export managers e assessores.",
        }
      : {
          title: "Business Matching Global — EU–Brazil Market Intelligence and Business Orchestration",
          description:
            "Market intelligence, counterpart verification and local execution between Europe and Brazil, in both directions. Clear, documented answers for companies, export managers and advisers.",
        };
  useCanonical("/", homeSeo);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
      <CredibilityStrip />
      <StartingPoint />
        <Problem />
        {lang === "pt" && (
          <section className="py-16 md:py-20 border-t border-border/60">
            <div className="container max-w-5xl">
              <h2 className="font-display text-3xl md:text-4xl mb-6">Perguntamos antes</h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">O seu produto pode já estar à venda no Brasil por canais dos quais vocês não sabem nada. Alguém pode já estar usando o seu nome ou a sua marca. Normalmente, isso só é percebido quando as consequências precisam ser pagas. Nós procuramos antes.</p>
              <Link to="/before-you-choose#ask-first" className="mt-6 inline-block text-primary underline underline-offset-4">Antes de confiar o Brasil a alguém →</Link>
            </div>
          </section>
        )}
        <Services />
        <PartnerProgramBanner />
        <HowItWorks />
        <SiteContactForm />
        <HomeNewsletter />
        <PullQuote />
      </main>
      <Footer />
    </div>
  );
}