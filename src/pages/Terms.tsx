import { Helmet } from "react-helmet";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useState } from "react";
import { Language } from "@/components/LanguageSwitcher";
import { getTranslation } from "@/lib/translations";

const Terms = () => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("preferredLanguage");
    return (saved as Language) || "en";
  });

  const t = getTranslation(language);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Terms of Service | Consul Brasil</title>
        <meta name="description" content="Terms of Service for Consul Brasil website and consulting services." />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://consulbrasil.com/terms" />
      </Helmet>

      <Navigation
        currentLanguage={language}
        onLanguageChange={setLanguage}
        translations={t.nav}
      />

      <main className="pt-20">
        <section className="py-16 bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
              <h1 className="text-4xl font-bold text-foreground mb-8">Terms of Service</h1>
              <p className="text-muted-foreground mb-4"><strong>Last updated:</strong> December 2024</p>

              <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By accessing and using the Consul Brasil website (consulbrasil.com), you accept and agree to be bound 
                by these Terms of Service. If you do not agree to these terms, please do not use our website.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">2. Services Description</h2>
              <p className="text-muted-foreground">
                Consul Brasil provides business consulting services specializing in Brazil-Europe business relations, 
                including market entry strategy, regulatory compliance, and business development support. 
                Information on this website is for general informational purposes only.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">3. Intellectual Property</h2>
              <p className="text-muted-foreground">
                All content on this website, including text, graphics, logos, and images, is the property of 
                Consul Brasil or its content suppliers and is protected by international copyright laws. 
                Unauthorized use or reproduction is prohibited.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">4. Disclaimer</h2>
              <p className="text-muted-foreground">
                The information provided on this website does not constitute legal, financial, or professional advice. 
                While we strive for accuracy, we make no warranties about the completeness, reliability, or suitability 
                of the information. Any reliance you place on such information is at your own risk.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">5. Limitation of Liability</h2>
              <p className="text-muted-foreground">
                To the fullest extent permitted by law, Consul Brasil shall not be liable for any indirect, incidental, 
                special, consequential, or punitive damages arising from your use of this website or our services.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">6. External Links</h2>
              <p className="text-muted-foreground">
                Our website may contain links to external websites. We have no control over the content and practices 
                of these sites and cannot accept responsibility for their content or privacy policies.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">7. Governing Law</h2>
              <p className="text-muted-foreground">
                These Terms shall be governed by and construed in accordance with the laws of Brazil and the European Union, 
                as applicable. Any disputes shall be resolved in the competent courts of the jurisdiction where the 
                service was contracted.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">8. Changes to Terms</h2>
              <p className="text-muted-foreground">
                We reserve the right to modify these Terms at any time. Changes will be effective immediately upon 
                posting on this website. Your continued use of the website constitutes acceptance of the modified terms.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">9. Contact</h2>
              <p className="text-muted-foreground">
                For questions about these Terms of Service, please contact us at:{" "}
                <a href="mailto:info@consulbrasil.com" className="text-primary hover:underline">info@consulbrasil.com</a>
              </p>

              <div className="mt-12 p-6 bg-primary/10 rounded-lg border-l-4 border-primary">
                <p className="text-foreground font-semibold">
                  This document is available in multiple languages. In case of discrepancy, the English version prevails.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer copyright={t.footer.copyright} privacy={t.footer.privacy} terms={t.footer.terms} />
    </div>
  );
};

export default Terms;
