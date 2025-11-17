import { useState } from "react";
import { Language } from "@/components/LanguageSwitcher";
import { getTranslation } from "@/lib/translations";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { TourismSection } from "@/components/TourismSection";

const Tourism = () => {
  const [language, setLanguage] = useState<Language>("it");
  const t = getTranslation(language);

  // Redirect to home if not Italian
  if (language !== "it") {
    window.location.href = "/";
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        currentLanguage={language} 
        onLanguageChange={setLanguage}
        translations={t.nav}
      />
      
      <main className="pt-20">
        {(t as any).tourism && (
          <TourismSection
            title={(t as any).tourism.title}
            intro={(t as any).tourism.intro}
            email={(t as any).tourism.email}
            placesTitle={(t as any).tourism.placesTitle}
            places={(t as any).tourism.places}
          />
        )}
      </main>
      
      <Footer 
        copyright={t.footer.copyright}
        privacy={t.footer.privacy}
        terms={t.footer.terms}
      />
    </div>
  );
};

export default Tourism;
