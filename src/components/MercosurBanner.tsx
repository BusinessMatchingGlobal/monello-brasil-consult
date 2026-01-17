import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Language } from "@/components/LanguageSwitcher";
import mercosurImage from "@/assets/mercosur-signing.jpg";

interface MercosurBannerProps {
  language: Language;
}

const translations = {
  en: {
    label: "Featured Article",
    title: "EU–Mercosur Agreement: A historic shift",
    quote: "A light in a dark time.",
    cta: "Read article",
    link: "/eu-mercosur-en"
  },
  it: {
    label: "Approfondimento",
    title: "Accordo UE–Mercosur: un cambio di fase storico",
    quote: "Finalmente una luce in un periodo buio.",
    cta: "Leggi l'articolo",
    link: "/eu-mercosur"
  },
  pt: {
    label: "Artigo em Destaque",
    title: "Acordo UE–Mercosul: uma mudança histórica",
    quote: "Finalmente, uma luz em tempos sombrios.",
    cta: "Ler artigo",
    link: "/eu-mercosur-pt"
  }
};

export const MercosurBanner = ({ language }: MercosurBannerProps) => {
  const t = translations[language];
  
  return (
    <section className="bg-primary py-8 shadow-xl">
      <div className="container mx-auto px-6">
        <Link to={t.link} className="block group">
          <div className="flex flex-col items-center text-center gap-6">
            {/* Quote - prominent */}
            <p className="text-xl sm:text-2xl md:text-3xl font-light italic text-white/95 max-w-2xl">
              "{t.quote}"
            </p>
            
            {/* Image below quote */}
            <div className="w-full max-w-3xl rounded-lg overflow-hidden shadow-2xl">
              <img 
                src={mercosurImage} 
                alt="EU-Mercosur signing ceremony" 
                className="w-full h-auto object-cover"
              />
            </div>
            
            {/* Title and label */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs font-bold text-white/80 uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full">
                {t.label}
              </span>
              <h3 className="text-base sm:text-lg font-semibold text-white group-hover:text-white/90 transition-colors">
                {t.title}
              </h3>
            </div>
            
            {/* CTA Button */}
            <Button 
              variant="secondary" 
              size="lg"
              className="bg-white text-primary hover:bg-white/90 font-bold shadow-lg px-8"
            >
              {t.cta}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </Link>
      </div>
    </section>
  );
};
