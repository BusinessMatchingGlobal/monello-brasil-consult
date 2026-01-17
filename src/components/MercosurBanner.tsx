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
    quote: "Finally, a light in a dark time.",
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
    <section className="relative bg-gradient-to-r from-primary via-primary/95 to-primary/90 py-6 shadow-xl overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img 
          src={mercosurImage} 
          alt="EU-Mercosur signing ceremony" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/80" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <Link to={t.link} className="block group">
          <div className="flex flex-col items-center text-center gap-4">
            {/* Quote - prominent */}
            <p className="text-xl sm:text-2xl md:text-3xl font-light italic text-white/95 max-w-2xl">
              "{t.quote}"
            </p>
            
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
              className="mt-2 bg-white text-primary hover:bg-white/90 font-bold shadow-lg px-8"
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
