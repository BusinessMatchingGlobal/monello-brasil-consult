import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Linkedin, Instagram, Facebook, Youtube, ExternalLink } from "lucide-react";
import { useT } from "@/lib/i18n";
import { openConsentBanner } from "@/lib/consent";
import { pathForLang } from "@/lib/langPath";
import { getFooterNavigation } from "@/lib/siteNavigation";
import italcamLogo from "@/assets/italcam-associado-2026.png.asset.json";
import italiabrasilLogo from "@/assets/italcam-minas-gerais.png.asset.json";
import exportStrategistLogo from "@/assets/exportstrategist.png.asset.json";

const EMAIL = "info@businessmatching.global";

const BEEHIIV_FORM_ID = "4459c616-037a-4d0f-9216-fcaf9671ea08";

export function HomeNewsletter() {
  const { lang } = useT();
  const c = {
    it: {
      title: "Iscriviti alla newsletter #CustoBrasil",
      sub: "Aggiornamenti, analisi e approfondimenti sul Brasile e oltre. Niente spam. Puoi annullare l'iscrizione in qualsiasi momento con un solo clic.",
    },
    en: {
      title: "Subscribe to the #CustoBrasil newsletter",
      sub: "Updates and insights on Brazil and beyond. No spam, unsubscribe anytime with one click.",
    },
    pt: {
      title: "Inscreva-se na newsletter #CustoBrasil",
      sub: "Atualizações e insights sobre o Brasil e outros mercados. Sem spam e com cancelamento da inscrição em apenas um clique.",
    },
  }[lang];

  const embedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = embedRef.current;
    if (!el) return;
    const script = document.createElement("script");
    script.src = "https://subscribe-forms.beehiiv.com/v3/loader.js";
    script.async = true;
    script.setAttribute("data-beehiiv-form", BEEHIIV_FORM_ID);
    el.appendChild(script);
    return () => {
      script.remove();
    };
  }, []);

  return (
    <section id="home-newsletter" className="py-12 md:py-16 bg-background text-foreground border-t border-border/60">
      <div className="container max-w-5xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div>
            <h3 className="font-display text-xl md:text-2xl text-foreground">{c.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{c.sub}</p>
          </div>
        </div>
        {/* beehiiv subscribe form, centered, max 560px */}
        <div ref={embedRef} className="mx-auto w-full max-w-[560px]" />
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
