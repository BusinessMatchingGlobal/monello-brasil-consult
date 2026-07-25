import italcamLogo from "@/assets/italcam-associado-2026.png.asset.json";
import italiabrasilLogo from "@/assets/italcam-minas-gerais.png.asset.json";
import exportStrategistLogo from "@/assets/exportstrategist.png.asset.json";
import { useT } from "@/lib/i18n";

const COPY = {
  it: "© 2026 Business Matching Global — ENZO ALDO STOBBIONE LTDA. Tutti i diritti riservati. È autorizzata la riproduzione parziale citando la fonte con link a businessmatching.global. Per la riproduzione integrale: info@businessmatching.global",
  en: "© 2026 Business Matching Global — ENZO ALDO STOBBIONE LTDA. All rights reserved. Partial reproduction is permitted with attribution and a link to businessmatching.global. For full reproduction: info@businessmatching.global",
  pt: "© 2026 Business Matching Global — ENZO ALDO STOBBIONE LTDA. Todos os direitos reservados. É autorizada a reprodução parcial com citação da fonte e link para businessmatching.global. Para reprodução integral: info@businessmatching.global",
} as const;

export function AnalysisFooter() {
  const { t, lang } = useT();
  return (
    <footer className="mt-16 border-t border-border/60 pt-8 pb-4 text-xs text-foreground/75 leading-relaxed">
      <p className="text-foreground/70 leading-relaxed mb-8">{COPY[lang]}</p>
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
      <p className="text-foreground/55 leading-relaxed">
        {t.footer.legalName}: ENZO ALDO STOBBIONE LTDA · CNPJ: 67.589.228/0001-30 · {t.footer.address}: Avenida Getúlio Vargas, 671, Sala 500, CEP 30.112-021, Savassi, Belo Horizonte/MG
      </p>
    </footer>
  );
}