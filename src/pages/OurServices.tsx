import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Check, Menu, X } from "lucide-react";
import { AnalysisNavMenu } from "@/components/AnalysisNavMenu";
import { useT, Lang } from "@/lib/i18n";
import { useCanonical } from "@/lib/useCanonical";
import { Button } from "@/components/ui/button";
import logoBMG from "@/assets/logo-business-matching-global-transparent.png.asset.json";

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

function Nav() {
  const { t } = useT();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links: Array<{ href: string; label: string; internal?: boolean; external?: boolean }> = [
    { href: "/", label: t.nav.home, internal: true },
    { href: "/Our_Services", label: t.nav.servicesLink, internal: true },
    { href: "/#how", label: t.nav.how },
    { href: "/#about", label: t.nav.method },
    { href: "/About_us", label: t.nav.about, internal: true },
    { href: "/BT", label: t.nav.travel, internal: true },
    { href: "/news", label: t.nav.news, internal: true },
    { href: "__analysis__", label: t.nav.analysis, analysis: true } as any,
    { href: "https://www.linkedin.com/company/109746306/admin/page-posts/published/", label: "#Custo Brasil", external: true },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/85 backdrop-blur-md border-b border-border/60" : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 md:h-20 items-center justify-between">
        <Link to="/" className="flex items-center" aria-label="Business Matching Global">
          <img
            src={logoBMG.url}
            alt="Business Matching Global"
            className="h-11 md:h-13 w-auto"
          />
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l: any) =>
            l.analysis ? (
              <AnalysisNavMenu key="analysis-desktop" variant="desktop" />
            ) : l.internal ? (
              <Link
                key={l.href}
                to={l.href}
                className="text-sm text-foreground/75 hover:text-foreground transition-colors"
              >
                {l.label}
              </Link>
            ) : l.external ? (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener"
                className="text-sm text-foreground/75 hover:text-foreground transition-colors"
              >
                {l.label}
              </a>
            ) : (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-foreground/75 hover:text-foreground transition-colors"
              >
                {l.label}
              </a>
            )
          )}
          <LangSwitcher />
          <Button asChild size="sm" className="rounded-full">
            <a href="/#contact">{t.nav.contact}</a>
          </Button>
        </nav>
        <button
          className="md:hidden p-2 -mr-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border/60 bg-background">
          <div className="container py-4 flex flex-col gap-4">
            {links.map((l: any) =>
              l.analysis ? (
                <AnalysisNavMenu
                  key="analysis-mobile"
                  variant="mobile"
                  onNavigate={() => setOpen(false)}
                />
              ) : l.internal ? (
                <Link
                  key={l.href}
                  to={l.href}
                  onClick={() => setOpen(false)}
                  className="text-base py-2"
                >
                  {l.label}
                </Link>
              ) : l.external ? (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener"
                  onClick={() => setOpen(false)}
                  className="text-base py-2"
                >
                  {l.label}
                </a>
              ) : (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-base py-2"
                >
                  {l.label}
                </a>
              )
            )}
            <div className="flex items-center justify-between pt-2 border-t border-border/60">
              <LangSwitcher />
              <Button asChild size="sm" className="rounded-full" onClick={() => setOpen(false)}>
                <a href="/#contact">{t.nav.contact}</a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function Services() {
  const { t } = useT();
  return (
    <section className="py-20 md:py-28 bg-foreground text-background">
      <div className="container max-w-6xl">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
          <h2 className="text-3xl md:text-4xl lg:text-5xl leading-tight max-w-2xl text-background">
            {t.services.title}
          </h2>
          <span className="text-xs tracking-wider uppercase text-background/75">
            01 — 03
          </span>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {t.services.cards.map((card, i) => (
            <div
              key={card.name}
              className="group p-7 rounded-2xl bg-background/[0.04] border border-background/10 hover:border-primary/60 transition-colors flex flex-col"
            >
              <span className="text-xs tracking-wider uppercase text-background/70 mb-6">
                0{i + 1}
              </span>
              <h3 className="font-display text-2xl mb-3 text-background">{card.name}</h3>
              <p className="text-background/70 mb-6 leading-relaxed">{card.promise}</p>
              <ul className="space-y-2.5 mb-8 flex-1">
                {card.items.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm text-background/85">
                    <Check className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-5 border-t border-background/10 flex items-center justify-between">
                <span className="text-sm text-background/80">
                  {t.services.from} <span className="text-background font-medium">{card.price}</span>
                </span>
                <a
                  href="/#contact"
                  className="inline-flex items-center gap-1 text-sm text-primary hover:text-amber transition-colors"
                >
                  {t.services.request} <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-14">
          {(() => {
            const parts = t.services.custom.split("\n\n");
            const title = parts[0];
            const body = parts.slice(1);
            return (
              <>
                <h3 className="text-2xl md:text-3xl font-display text-background text-left mb-6">
                  {title}
                </h3>
                <div className="text-background/65 italic space-y-4 text-justify">
                  {body.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </>
            );
          })()}
        </div>
      </div>
    </section>
  );
}

function Cta() {
  const { t, lang } = useT();
  const ctaText =
    lang === "it"
      ? "Hai un progetto in Brasile? Parliamone."
      : lang === "pt"
      ? "Tem um projeto no Brasil? Vamos conversar."
      : "Do you have a project in Brazil? Let's talk.";
  return (
    <section className="py-16 md:py-24 border-t border-border/60">
      <div className="container max-w-4xl text-center">
        <h2 className="font-display text-3xl md:text-4xl mb-6">{ctaText}</h2>
        <Button asChild size="lg" className="rounded-full">
          <a href="/#contact">{t.nav.contact}</a>
        </Button>
      </div>
    </section>
  );
}

export default function OurServices() {
  const { t, lang } = useT();
  useCanonical("/Our_Services", {
    title:
      lang === "it"
        ? "Come possiamo aiutarti? — Servizi Business Matching Global"
        : lang === "pt"
        ? "Como podemos ajudar? — Serviços Business Matching Global"
        : "How can we help you? — Business Matching Global Services",
    description:
      lang === "it"
        ? "Verifica controparte, analisi di mercato e briefing import/export per operare in Brasile con informazioni affidabili."
        : lang === "pt"
        ? "Verificação de contraparte, análise de mercado e briefing de importação/exportação para fazer negócios no Brasil."
        : "Counterparty checks, market analysis and import/export briefings for doing business in Brazil.",
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <section className="pt-32 md:pt-44 pb-12 md:pb-16">
          <div className="container max-w-4xl">
            <span className="text-xs tracking-wider uppercase text-primary mb-4 inline-block">
              Business Matching Global
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight">
              {t.nav.servicesLink}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              {t.hero.sub.split("\n\n")[0]}
            </p>
          </div>
        </section>
        <Services />
        <Cta />
      </main>
    </div>
  );
}
