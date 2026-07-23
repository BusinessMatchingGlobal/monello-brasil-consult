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
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { openConsentBanner } from "@/lib/consent";
import { useCanonical } from "@/lib/useCanonical";
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

function Nav() {
  const { t, lang } = useT();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links: Array<{ href: string; label: string; internal?: boolean; external?: boolean }> = [
    { href: "#top", label: t.nav.home },
    { href: "#services", label: t.nav.services },
    { href: "#how", label: t.nav.how },
    { href: "#about", label: t.nav.method },
    { href: "/About_us", label: t.nav.about, internal: true },
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
        <a href="#top" className="flex items-center" aria-label="Business Matching Global">
          <img
            src={logoBMG.url}
            alt="Business Matching Global"
            className="h-11 md:h-13 w-auto"
          />
        </a>
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
            <a href="#contact">{t.nav.contact}</a>
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
                <a href="#contact">{t.nav.contact}</a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

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
        <div className="mt-10 flex flex-wrap gap-4">
          <Button asChild size="lg" className="rounded-full h-12 px-6">
            <a href="#contact">
              {t.hero.cta1} <ArrowRight className="ml-1 h-4 w-4" />
            </a>
          </Button>
          <Button asChild size="lg" variant="ghost" className="rounded-full h-12 px-6">
            <a href="#services">{t.hero.cta2}</a>
          </Button>
        </div>
        <div className="mt-6">
          <a
            href="/sample-report"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground underline underline-offset-4"
          >
            {lang === "it" ? "Scarica un esempio di report (PDF)" : lang === "pt" ? "Baixe um exemplo de relatório (PDF)" : "Download a sample report (PDF)"}
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
        <div className="mt-3">
          <a
            href="https://www.linkedin.com/company/109746306/admin/dashboard/"
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
  const { t } = useT();
  return (
    <section id="services" className="py-20 md:py-28 bg-foreground text-background">
      <div className="container max-w-6xl">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
          <h2 className="text-3xl md:text-4xl lg:text-5xl leading-tight max-w-2xl text-background">
            {t.services.title}
          </h2>
          <span className="text-xs tracking-wider uppercase text-background/50">
            01 — 03
          </span>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {t.services.cards.map((card, i) => (
            <div
              key={card.name}
              className="group p-7 rounded-2xl bg-background/[0.04] border border-background/10 hover:border-primary/60 transition-colors flex flex-col"
            >
              <span className="text-xs tracking-wider uppercase text-background/40 mb-6">
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
                <span className="text-sm text-background/60">
                  {t.services.from} <span className="text-background font-medium">{card.price}</span>
                </span>
                <a
                  href="#contact"
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

function HowItWorks() {
  const { t } = useT();
  return (
    <section id="how" className="py-20 md:py-28">
      <div className="container max-w-6xl">
        <h2 className="text-3xl md:text-4xl lg:text-5xl mb-14 max-w-2xl">{t.how.title}</h2>
        <div className="grid md:grid-cols-4 gap-8 md:gap-6">
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

function Contact() {
  const { t } = useT();
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = (data.get("name") as string) || "";
    const email = (data.get("email") as string) || "";
    const company = (data.get("company") as string) || "";
    const message = (data.get("message") as string) || "";
    const consent = data.get("consent") === "on";
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in name, email and message.");
      return;
    }
    if (!consent) {
      toast.error(t.consent.required);
      return;
    }
    setSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "contact-notification",
          idempotencyKey: `contact-${email}-${Date.now()}`,
          templateData: {
            name,
            email,
            company: company || "—",
            message,
            source: "Contact form",
            submittedAt: new Date().toISOString(),
          },
        },
      });
      if (error) throw error;
      toast.success("Thanks — your message has been sent.");
      form.reset();
    } catch (err) {
      console.error("Contact form send failed", err);
      toast.error("Sending failed. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-foreground text-background">
      <div className="container max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl leading-tight mb-6 text-background">
              {t.contact.title}
            </h2>
            <p className="text-background/70 text-lg leading-relaxed mb-10">{t.contact.sub}</p>
            <div className="space-y-4 text-background/85">
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-3 hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" /> {EMAIL}
              </a>
            </div>
          </div>
          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <Label htmlFor="name" className="text-background/70 text-xs tracking-wider uppercase">
                {t.contact.name}
              </Label>
              <Input
                id="name"
                name="name"
                required
                maxLength={100}
                className="mt-2 bg-background/[0.04] border-background/15 text-background placeholder:text-background/30 focus-visible:ring-primary"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-background/70 text-xs tracking-wider uppercase">
                {t.contact.email}
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                maxLength={255}
                className="mt-2 bg-background/[0.04] border-background/15 text-background placeholder:text-background/30 focus-visible:ring-primary"
              />
            </div>
            <div>
              <Label htmlFor="company" className="text-background/70 text-xs tracking-wider uppercase">
                {t.contact.company}
              </Label>
              <Input
                id="company"
                name="company"
                maxLength={150}
                className="mt-2 bg-background/[0.04] border-background/15 text-background placeholder:text-background/30 focus-visible:ring-primary"
              />
            </div>
            <div>
              <Label
                htmlFor="message"
                className="text-background/70 text-xs tracking-wider uppercase"
              >
                {t.contact.message}
              </Label>
              <Textarea
                id="message"
                name="message"
                required
                rows={5}
                maxLength={2000}
                className="mt-2 bg-background/[0.04] border-background/15 text-background placeholder:text-background/30 focus-visible:ring-primary resize-none"
              />
            </div>
            <Button type="submit" size="lg" disabled={submitting} className="rounded-full w-full h-12">
              {submitting ? "…" : t.contact.send} <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
            <label className="flex items-start gap-3 text-xs text-background/70 leading-relaxed cursor-pointer">
              <input
                type="checkbox"
                name="consent"
                required
                className="mt-0.5 h-4 w-4 rounded border-background/30 bg-background/[0.04] accent-primary"
              />
              <span>
                {t.consent.label}{" "}
                <Link to="/privacy" className="underline hover:text-background">
                  {t.consent.link}
                </Link>{" "}
                {t.consent.suffix}
              </span>
            </label>
          </form>
        </div>
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

function HomeNewsletter() {
  const { lang } = useT();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const c = {
    it: {
      title: "Iscriviti alla newsletter #CustoBrasil",
      sub: "Aggiornamenti e approfondimenti sul Brasile. Nessuno spam, cancellazione in un clic.",
      first: "Nome",
      last: "Cognome",
      email: "La tua email",
      cta: "Iscriviti",
      consent: "Accetto di ricevere la newsletter e ho letto l'",
      privacy: "informativa privacy",
      success: "Controlla la tua email per confermare l'iscrizione (guarda anche in SPAM/Promozioni).",
      invalid: "Inserisci nome, cognome e un'email valida.",
      consentRequired: "Devi accettare per iscriverti.",
      error: "Invio non riuscito. Riprova.",
    },
    en: {
      title: "Subscribe to the #CustoBrasil newsletter",
      sub: "Updates and insights on Brazil. No spam, one-click unsubscribe.",
      first: "First name",
      last: "Last name",
      email: "Your email",
      cta: "Subscribe",
      consent: "I agree to receive the newsletter and have read the ",
      privacy: "privacy notice",
      success: "Check your inbox to confirm your subscription (check SPAM/Promotions too).",
      invalid: "Please enter first name, last name and a valid email.",
      consentRequired: "You must accept to subscribe.",
      error: "Sending failed. Please try again.",
    },
    pt: {
      title: "Inscreva-se na newsletter #CustoBrasil",
      sub: "Atualizações e análises sobre o Brasil. Sem spam, cancelamento em um clique.",
      first: "Nome",
      last: "Sobrenome",
      email: "Seu e-mail",
      cta: "Inscrever-se",
      consent: "Aceito receber a newsletter e li o ",
      privacy: "aviso de privacidade",
      success: "Verifique seu e-mail para confirmar a inscrição (confira também SPAM/Promoções).",
      invalid: "Insira nome, sobrenome e um e-mail válido.",
      consentRequired: "Você precisa aceitar para se inscrever.",
      error: "Falha no envio. Tente novamente.",
    },
  }[lang];

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fn = firstName.trim();
    const ln = lastName.trim();
    const em = email.trim();
    if (!fn || !ln || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) {
      toast.error(c.invalid);
      return;
    }
    if (!consent) {
      toast.error(c.consentRequired);
      return;
    }
    setSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("newsletter-subscribe", {
        body: {
          firstName: fn,
          lastName: ln,
          email: em,
          language: lang,
          source: "Homepage inline newsletter",
          consent: true,
        },
      });
      if (error) throw error;
      setSent(true);
      setFirstName("");
      setLastName("");
      setEmail("");
      toast.success(c.success);
    } catch (err) {
      console.error("Homepage newsletter failed", err);
      toast.error(c.error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="home-newsletter" className="py-12 md:py-16 bg-foreground text-background border-t border-background/10">
      <div className="container max-w-5xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div>
            <h3 className="font-display text-xl md:text-2xl text-background">{c.title}</h3>
            <p className="text-sm text-background/60 mt-1">{c.sub}</p>
          </div>
        </div>
        {sent ? (
          <p className="text-background/85 text-sm">{c.success}</p>
        ) : (
          <form onSubmit={onSubmit} className="flex flex-col gap-3">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1.4fr_auto] gap-3">
              <Input
                required
                maxLength={80}
                placeholder={c.first}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="bg-background/[0.04] border-background/15 text-background placeholder:text-background/40 h-11"
              />
              <Input
                required
                maxLength={80}
                placeholder={c.last}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="bg-background/[0.04] border-background/15 text-background placeholder:text-background/40 h-11"
              />
              <Input
                required
                type="email"
                maxLength={255}
                placeholder={c.email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background/[0.04] border-background/15 text-background placeholder:text-background/40 h-11"
              />
              <Button type="submit" disabled={submitting} className="rounded-full h-11 px-6 whitespace-nowrap">
                {submitting ? "…" : c.cta} <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            <label className="flex items-start gap-2 text-xs text-background/60 leading-relaxed cursor-pointer">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 h-3.5 w-3.5 rounded border-background/30 bg-background/[0.04] accent-primary"
              />
              <span>
                {c.consent}
                <Link to="/privacy" className="underline hover:text-background">{c.privacy}</Link>.
              </span>
            </label>
          </form>
        )}
      </div>
    </section>
  );
}

function FooterInner() {
  const { t, lang } = useT();
  return (
    <footer className="py-12 border-t border-border/60">
      <div className="container flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
        <div>
          <div className="font-display text-base font-medium">
            Business Matching <span className="text-primary">Global</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{t.footer.tag}</p>
        </div>
        <div className="flex items-center gap-5 text-sm">
          <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
            {t.footer.privacy}
          </Link>
          {lang === "en" && (
            <a
              href="https://www.iubenda.com/privacy-policy/22477622"
              className="text-muted-foreground hover:text-foreground transition-colors"
              title="Privacy Policy"
            >
              Privacy Policy
            </a>
          )}
          {lang === "en" && (
            <a
              href="https://www.iubenda.com/privacy-policy/22477622/cookie-policy"
              className="text-muted-foreground hover:text-foreground transition-colors"
              title="Cookie Policy"
            >
              Cookie Policy
            </a>
          )}
          {lang === "en" && (
            <a
              href="https://www.iubenda.com/terms-and-conditions/22477622"
              className="text-muted-foreground hover:text-foreground transition-colors"
              title="Terms and Conditions"
            >
              Terms and Conditions
            </a>
          )}
          {lang === "it" && (
            <a
              href="https://www.iubenda.com/privacy-policy/32646575"
              className="text-muted-foreground hover:text-foreground transition-colors"
              title="Privacy Policy"
            >
              Privacy Policy
            </a>
          )}
          {lang === "it" && (
            <a
              href="https://www.iubenda.com/privacy-policy/32646575/cookie-policy"
              className="text-muted-foreground hover:text-foreground transition-colors"
              title="Cookie Policy"
            >
              Cookie Policy
            </a>
          )}
          {lang === "it" && (
            <a
              href="https://www.iubenda.com/termini-e-condizioni/32646575"
              className="text-muted-foreground hover:text-foreground transition-colors"
              title="Termini e Condizioni"
            >
              Termini e Condizioni
            </a>
          )}
          {lang === "pt" && (
            <a
              href="https://www.iubenda.com/privacy-policy/16979386"
              className="text-muted-foreground hover:text-foreground transition-colors"
              title="Política de Privacidade"
            >
              Política de Privacidade
            </a>
          )}
          {lang === "pt" && (
            <a
              href="https://www.iubenda.com/privacy-policy/16979386/cookie-policy"
              className="text-muted-foreground hover:text-foreground transition-colors"
              title="Política de Cookies"
            >
              Política de Cookies
            </a>
          )}
          {lang === "pt" && (
            <a
              href="https://www.iubenda.com/termos-e-condicoes/16979386"
              className="text-muted-foreground hover:text-foreground transition-colors"
              title="Termos e Condições"
            >
              Termos e Condições
            </a>
          )}
          <button
            type="button"
            onClick={() => openConsentBanner()}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {t.footer.cookies}
          </button>
          <a href={`mailto:${EMAIL}`} className="text-muted-foreground hover:text-foreground transition-colors">
            {EMAIL}
          </a>
          <a
            href="https://www.linkedin.com/company/109746306/admin/dashboard/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Linkedin className="h-4 w-4" />
          </a>
        </div>
      </div>
        <div className="container mt-8 pt-6 border-t border-border/40 text-xs text-muted-foreground">
          <p className="text-center text-sm font-medium text-foreground mb-4">{t.footer.memberOf}</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 mb-6">
            <a href="https://www.italiabrasil.com.br" target="_blank" rel="noopener noreferrer">
              <img src={italcamLogo.url} alt="Câmara de Comércio Italiana - Italcam Associado 2026" className="h-12 md:h-14 w-auto max-w-[260px] md:max-w-[320px] object-contain" />
            </a>
            <a href="https://www.italiabrasil.com.br" target="_blank" rel="noopener noreferrer">
              <img src={italiabrasilLogo.url} alt="Câmara de Comércio Italiana de Minas Gerais" className="h-12 md:h-14 w-auto max-w-[260px] md:max-w-[320px] object-contain" />
            </a>
            <a href="https://www.exportstrategist.it" target="_blank" rel="noopener noreferrer">
              <img src={exportStrategistLogo.url} alt="Associazione Export Strategist" className="h-10 md:h-12 w-auto object-contain" />
            </a>
          </div>
        <p>{t.footer.rights}</p>
        <p className="mt-2 text-muted-foreground/70 leading-relaxed">
          {t.footer.legalName}: ENZO ALDO STOBBIONE LTDA · CNPJ: 67.589.228/0001-30 · {t.footer.address}: Avenida Getúlio Vargas, 671, Sala 500, CEP 30.112-021, Savassi, Belo Horizonte/MG · CNAE 6399-2/00 · {t.footer.capital}: R$ 1.000,00
        </p>
      </div>
    </footer>
  );
}

export default function Index() {
  useCanonical("/");
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Services />
        <HowItWorks />
        <About />
        <FAQ />
        <Contact />
        <HomeNewsletter />
      </main>
      <Footer />
    </div>
  );
}