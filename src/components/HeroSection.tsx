import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-consulting.jpg";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

export const HeroSection = ({ title, subtitle, ctaPrimary, ctaSecondary }: HeroSectionProps) => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background gradient overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{ background: 'var(--gradient-hero)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
        <img 
          src={heroImage} 
          alt="Brazil business consulting - Expert team helping foreign companies invest in Brazilian market"
          className="w-full h-full object-cover mix-blend-overlay opacity-20"
        />
      </div>
      
      {/* Content */}
      <div className="container relative z-10 mx-auto px-6 py-20">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6 leading-tight animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 leading-relaxed max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
            {subtitle}
          </p>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};
