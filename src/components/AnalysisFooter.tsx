import { useT } from "@/lib/i18n";

const L = {
  it: "© 2026 Business Matching Global — ENZO ALDO STOBBIONE LTDA. Tutti i diritti riservati. È autorizzata la riproduzione parziale citando la fonte con link a businessmatching.global. Per la riproduzione integrale: info@businessmatching.global",
  en: "© 2026 Business Matching Global — ENZO ALDO STOBBIONE LTDA. All rights reserved. Partial reproduction is permitted with attribution and a link to businessmatching.global. For full reproduction: info@businessmatching.global",
  pt: "© 2026 Business Matching Global — ENZO ALDO STOBBIONE LTDA. Todos os direitos reservados. É autorizada a reprodução parcial com citação da fonte e link para businessmatching.global. Para reprodução integral: info@businessmatching.global",
} as const;

export function AnalysisFooter() {
  const { lang } = useT();
  return (
    <footer className="mt-16 border-t border-border/60 pt-6 pb-4 text-xs text-foreground/55 leading-relaxed">
      {L[lang]}
    </footer>
  );
}