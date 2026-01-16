import { ArrowRight, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const MercosurBanner = () => {
  return (
    <section className="bg-gradient-to-r from-accent to-accent/80 py-6">
      <div className="container mx-auto px-6">
        <Link to="/eu-mercosur" className="block group">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <div>
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">Approfondimento</span>
                <h3 className="text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  Accordo UE–Mercosur: un cambio di fase storico
                </h3>
                <p className="text-sm text-muted-foreground hidden md:block">
                  Cosa significa per le imprese europee e brasiliane? Scopri l'analisi completa.
                </p>
              </div>
            </div>
            <Button variant="default" className="shrink-0 group-hover:bg-primary/90">
              Leggi l'articolo
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </Link>
      </div>
    </section>
  );
};
