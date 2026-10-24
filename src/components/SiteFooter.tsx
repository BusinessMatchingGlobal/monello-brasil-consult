import { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Linkedin, Instagram, Facebook, Youtube, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { useT } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { openConsentBanner } from "@/lib/consent";
import { pathForLang } from "@/lib/langPath";
import { getFooterNavigation } from "@/lib/siteNavigation";
import italcamLogo from "@/assets/italcam-associado-2026.png.asset.json";
import italiabrasilLogo from "@/assets/italcam-minas-gerais.png.asset.json";
import exportStrategistLogo from "@/assets/exportstrategist.png.asset.json";

const EMAIL = "info@businessmatching.global";

export function HomeNewsletter() {
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
      sub: "Aggiornamenti, analisi e approfondimenti sul Brasile e oltre. Niente spam. Puoi annullare l'iscrizione in qualsiasi momento con un solo clic.",
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
      sub: "Updates and insights on Brazil and beyond. No spam, unsubscribe anytime with one click.",
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
      sub: "Atualizações e insights sobre o Brasil e outros mercados. Sem spam e com cancelamento da inscrição em apenas um clique.",
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
            <p className="text-sm text-background/80 mt-1">{c.sub}</p>
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
                className="bg-background/[0.04] border-background/15 text-background placeholder:text-background/70 h-11"
              />
              <Input
                required
                maxLength={80}
                placeholder={c.last}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="bg-background/[0.04] border-background/15 text-background placeholder:text-background/70 h-11"
              />
              <Input
                required
                type="email"
                maxLength={255}
                placeholder={c.email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background/[0.04] border-background/15 text-background placeholder:text-background/70 h-11"
              />
              <Button type="submit" disabled={submitting} className="rounded-full h-11 px-6 whitespace-nowrap">
                {submitting ? "…" : c.cta} <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            <label className="flex items-start gap-2 text-xs text-background/80 leading-relaxed cursor-pointer">
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

export function FooterInner({ tagline }: { tagline?: string } = {}) {
  const { t, lang } = useT();
  return (
    <footer className="py-12 border-t border-border/60">
      <div className="container flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
        <div>
          <div className="font-display text-base font-medium">
            Business Matching <span className="text-primary">Global</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{tagline ?? t.footer.tag}</p>
        </div>
      </div>
      <div className="container mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 text-sm">
        {getFooterNavigation(lang).map(group => (
          <div key={group.href}>
            <h3 className="font-medium text-foreground mb-3">{group.label}</h3>
            <div className="flex flex-col items-start gap-2">
              {group.children?.map(link => link.internal ? (
                <Link key={link.href} to={link.href} className="text-muted-foreground hover:text-foreground transition-colors">{link.label}</Link>
              ) : (
                <a key={link.href} href={link.href} target={link.external ? "_blank" : undefined} rel={link.external ? "noopener noreferrer" : undefined} className="text-muted-foreground hover:text-foreground transition-colors">
                  {link.label}{link.externalIcon && <ExternalLink className="inline-block ml-1 h-3.5 w-3.5" aria-hidden="true" />}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="container mt-6">
        <div className="flex flex-wrap items-center gap-5 text-sm">
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
            href="https://www.linkedin.com/company/businessmatchingglobal"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href="https://www.instagram.com/business_matching_global/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Instagram className="h-4 w-4" />
          </a>
          <a
            href="https://www.facebook.com/businessmatchingglobal"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Facebook className="h-4 w-4" />
          </a>
          <a
            href="https://www.youtube.com/@Business_Matching_Global"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Youtube className="h-4 w-4" />
          </a>
        </div>
      </div>
        <div className="container mt-8 pt-6 border-t border-border/40 text-xs text-muted-foreground">
          <p className="text-center text-sm font-medium text-foreground mb-4">{t.footer.memberOf}</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 mb-6">
            <a href="https://italcam.com.br" target="_blank" rel="noopener noreferrer">
              <img loading="lazy" decoding="async" src={italcamLogo.url} alt="Câmara de Comércio Italiana - Italcam Associado 2026" className="h-12 md:h-14 w-auto max-w-[260px] md:max-w-[320px] object-contain" />
            </a>
            <a href="https://www.italiabrasil.com.br" target="_blank" rel="noopener noreferrer">
              <img loading="lazy" decoding="async" src={italiabrasilLogo.url} alt="Câmara de Comércio Italiana de Minas Gerais" className="h-12 md:h-14 w-auto max-w-[260px] md:max-w-[320px] object-contain" />
            </a>
            <a href="https://www.exportstrategist.it" target="_blank" rel="noopener noreferrer">
              <img loading="lazy" decoding="async" src={exportStrategistLogo.url} alt="Associazione Export Strategist" className="h-10 md:h-12 w-auto object-contain" />
            </a>
          </div>
        <p>{t.footer.rights}</p>
        <p className="mt-2 text-muted-foreground/70 leading-relaxed">
          {t.footer.legalName}: ENZO ALDO STOBBIONE LTDA · CNPJ: 67.589.228/0001-30 · {t.footer.address}: Avenida Getúlio Vargas, 671, Sala 500, CEP 30.112-021, Savassi, Belo Horizonte/MG, {lang === "it" ? "Brasile" : lang === "pt" ? "Brasil" : "Brazil"}
        </p>
        <p className="mt-4 text-xs italic text-muted-foreground/60">Verba volant, scripta manent</p>
      </div>
    </footer>
  );
}


/** Full site footer: newsletter signup + links, memberships and registered company details. */
export function SiteFooter() {
  return (
    <>
      <HomeNewsletter />
      <FooterInner />
    </>
  );
}
