import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Consul Brasil - Servizi Turistici Minas Gerais",
    "description": "Servizi turistici specializzati per il Minas Gerais, Brasile. Scopri Ouro Preto, Inhotim, Serra do Cipó e le città storiche dell'Estrada Real con guide esperte.",
    "url": "https://consulbrasil.com/turismo",
    "email": "enstobbi@enstobbi.it",
    "areaServed": {
      "@type": "State",
      "name": "Minas Gerais",
      "containedIn": {
        "@type": "Country",
        "name": "Brasil"
      }
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Destinazioni Turistiche Minas Gerais",
      "itemListElement": [
        {
          "@type": "TouristDestination",
          "name": "Ouro Preto",
          "description": "Patrimonio UNESCO, città coloniale barocca"
        },
        {
          "@type": "TouristDestination",
          "name": "Inhotim",
          "description": "Museo di arte contemporanea a cielo aperto"
        },
        {
          "@type": "TouristDestination",
          "name": "Serra do Cipó",
          "description": "Parco naturale con cascate e canyon"
        }
      ]
    }
  };

  return (
    <>
      <Helmet>
        <html lang="it" />
        <title>Servizi Turistici Minas Gerais | Consul Brasil - Ouro Preto, Inhotim, Estrada Real</title>
        <meta name="description" content="Scopri il Minas Gerais con i nostri servizi turistici specializzati. Ouro Preto UNESCO, Inhotim museo a cielo aperto, Serra do Cipó, Diamantina e le città storiche dell'Estrada Real. Pacchetti personalizzati per agenzie italiane." />
        <meta name="keywords" content="turismo minas gerais, ouro preto, inhotim brasile, estrada real, diamantina, tiradentes, serra do cipó, viaggi brasile, turismo brasile, agenzie viaggio italia brasile, belo horizonte turismo, città coloniali brasile, patrimonio unesco brasile" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://consulbrasil.com/turismo" />
        <meta property="og:title" content="Servizi Turistici Minas Gerais | Consul Brasil" />
        <meta property="og:description" content="Scopri il Minas Gerais con i nostri servizi turistici specializzati. Ouro Preto, Inhotim, Serra do Cipó e le città storiche dell'Estrada Real." />
        <meta property="og:locale" content="it_IT" />
        <meta property="og:site_name" content="Consul Brasil" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://consulbrasil.com/turismo" />
        <meta name="twitter:title" content="Servizi Turistici Minas Gerais | Consul Brasil" />
        <meta name="twitter:description" content="Scopri il Minas Gerais: Ouro Preto UNESCO, Inhotim, Serra do Cipó, città storiche dell'Estrada Real. Servizi per agenzie viaggio italiane." />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href="https://consulbrasil.com/turismo" />
        <meta name="geo.region" content="BR-MG" />
        <meta name="geo.placename" content="Minas Gerais, Brasil" />
        
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>
      
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
    </>
  );
};

export default Tourism;
