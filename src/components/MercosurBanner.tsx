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
    link: "/eu-mercosur"
  }
};

export const MercosurBanner = ({ language }: MercosurBannerProps) => {
  const t = translations[language];
  
  return (
    <section className="bg-gradient-to-r from-accent to-accent/80 py-6">
      <div className="container mx-auto px-6">
        <Link to={t.link} className="block group">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <div>
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">{t.label}</span>
                <h3 className="text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {t.title}
                </h3>
                <p className="text-sm text-muted-foreground hidden md:block">
                  {t.subtitle}
                </p>
              </div>
            </div>
            <Button variant="default" className="shrink-0 group-hover:bg-primary/90">
              {t.cta}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </Link>
      </div>
    </section>
  );
};
