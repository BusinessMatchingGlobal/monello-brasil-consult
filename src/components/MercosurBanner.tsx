import { ArrowRight, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Language } from "@/components/LanguageSwitcher";

interface MercosurBannerProps {
  language: Language;
}

const translations = {
  en: {
    label: "Featured Article",
    title: "EU–Mercosur Agreement: A historic shift",
    subtitle: "What does it mean for European and Brazilian companies? Read the full analysis.",
    cta: "Read article",
    link: "/eu-mercosur-en"
  },
  it: {
    label: "Approfondimento",
    title: "Accordo UE–Mercosur: un cambio di fase storico",
    subtitle: "Cosa significa per le imprese europee e brasiliane? Scopri l'analisi completa.",
    cta: "Leggi l'articolo",
    link: "/eu-mercosur"
  },
  pt: {
    label: "Artigo em Destaque",
    title: "Acordo UE–Mercosul: uma mudança histórica",
    subtitle: "O que significa para as empresas europeias e brasileiras? Leia a análise completa.",
    cta: "Ler artigo",
    link: "/eu-mercosur-pt"
  }
};

export const MercosurBanner = ({ language }: MercosurBannerProps) => {
  const t = translations[language];
  
  return (
    <section className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 py-4 shadow-lg">
      <div className="container mx-auto px-6">
        <Link to={t.link} className="block group">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2.5 rounded-full animate-pulse">
                <Globe className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                <span className="text-xs font-bold text-white/90 uppercase tracking-wider bg-white/10 px-2 py-0.5 rounded">
                  {t.label}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-white/90 transition-colors">
                  {t.title}
                </h3>
              </div>
            </div>
            <Button 
              variant="secondary" 
              size="sm"
              className="shrink-0 bg-white text-primary hover:bg-white/90 font-semibold shadow-md"
            >
              {t.cta}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </Link>
      </div>
    </section>
  );
};
