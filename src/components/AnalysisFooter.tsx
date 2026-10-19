import { useT } from "@/lib/i18n";
import { Link } from "react-router-dom";

const COPY = {
  it: "© 2026 Business Matching Global — ENZO ALDO STOBBIONE LTDA. Tutti i diritti riservati. È autorizzata la riproduzione parziale citando la fonte con link a businessmatching.global. Per la riproduzione integrale: info@businessmatching.global",
  en: "© 2026 Business Matching Global — ENZO ALDO STOBBIONE LTDA. All rights reserved. Partial reproduction is permitted with attribution and a link to businessmatching.global. For full reproduction: info@businessmatching.global",
  pt: "© 2026 Business Matching Global — ENZO ALDO STOBBIONE LTDA. Todos os direitos reservados. É autorizada a reprodução parcial com citação da fonte e link para businessmatching.global. Para reprodução integral: info@businessmatching.global",
} as const;

const SERVICES_CTA = {
  it: {
    title: "Ti serve questa analisi applicata al tuo caso?",
    text: "Business intelligence, due diligence e report su misura per operare in Brasile.",
    link: "Scopri come possiamo aiutarti",
    href: "/servizi/business-matching",
  },
  en: {
    title: "Need this analysis applied to your case?",
    text: "Business intelligence, due diligence and tailored reports for doing business in Brazil.",
    link: "See how we can help you",
    href: "/services/business-matching",
  },
  pt: {
    title: "Precisa desta análise aplicada ao seu caso?",
    text: "Inteligência de negócios, due diligence e relatórios sob medida para atuar no Brasil.",
    link: "Veja como podemos ajudar",
    href: "/servicos/business-matching",
  },
} as const;

export function AnalysisFooter() {
  const { lang } = useT();
  const cta = SERVICES_CTA[lang];
  return (
    <>
    <aside className="mt-14 rounded-lg border border-border/60 bg-muted/30 p-6">
      <h2 className="text-lg font-semibold text-foreground mb-2">{cta.title}</h2>
      <p className="text-sm text-foreground/75 mb-3">{cta.text}</p>
      <Link to={cta.href} className="text-sm font-medium text-primary underline underline-offset-4 hover:no-underline">
        {cta.link} →
      </Link>
    </aside>
    <p className="mt-12 border-t border-border/60 pt-8 pb-4 text-xs text-foreground/70 leading-relaxed">{COPY[lang]}</p>
    </>
  );
}