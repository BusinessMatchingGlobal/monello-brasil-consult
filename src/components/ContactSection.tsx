import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";

interface ContactSectionProps {
  title: string;
  subtitle: string;
  cta: string;
  emailSubject: string;
}

export const ContactSection = ({ title, subtitle, cta, emailSubject }: ContactSectionProps) => {
  const mailtoLink = `mailto:info@consulbrasil.com?subject=${encodeURIComponent(emailSubject)}`;
  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div 
          className="rounded-3xl p-12 md:p-16 text-center relative overflow-hidden"
          style={{ background: 'var(--gradient-hero)' }}
        >
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">{title}</h2>
            <p className="text-xl text-primary-foreground/90 mb-10 max-w-2xl mx-auto">
              {subtitle}
            </p>
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-6 text-lg shadow-xl"
              asChild
            >
              <a href={mailtoLink}>
                <Mail className="mr-2 h-5 w-5" />
                {cta}
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
          
          {/* Decorative gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 pointer-events-none" />
        </div>
      </div>
    </section>
  );
};
