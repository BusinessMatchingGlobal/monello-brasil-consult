import { useState } from "react";
import { Language } from "@/components/LanguageSwitcher";
import { getTranslation } from "@/lib/translations";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { MercosurBanner } from "@/components/MercosurBanner";
import { ServicesSection } from "@/components/ServicesSection";
import { InsightsSection } from "@/components/InsightsSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { NewsletterSection } from "@/components/NewsletterSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  const [language, setLanguage] = useState<Language>("en");
  const t = getTranslation(language);

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        currentLanguage={language} 
        onLanguageChange={setLanguage}
        translations={t.nav}
      />
      
      <main id="home" className="pt-20">
        <MercosurBanner language={language} />
        
        <HeroSection 
          title={t.hero.title}
          subtitle={t.hero.subtitle}
          ctaPrimary={t.hero.cta}
          ctaSecondary={t.hero.learn}
        />
        
        <ServicesSection
          title={t.services.title}
          subtitle={t.services.subtitle}
          services={t.services}
        />
        
        <InsightsSection 
          title={t.insights.title}
          subtitle={t.insights.subtitle}
          readMore={t.insights.readMore}
          language={language}
          articles={t.insights}
        />
        
        <AboutSection 
          title={t.about.title}
          description={t.about.description}
          stats={t.about.stats}
        />
        
        <NewsletterSection />
        
        <ContactSection 
          title={t.contact.title}
          subtitle={t.contact.subtitle}
          cta={t.contact.cta}
          emailSubject={t.contact.emailSubject}
        />
      </main>
      
      <Footer 
        copyright={t.footer.copyright}
        privacy={t.footer.privacy}
        terms={t.footer.terms}
      />
    </div>
  );
};

export default Index;
