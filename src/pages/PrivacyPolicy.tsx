import { Helmet } from "react-helmet";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useState } from "react";
import { Language } from "@/components/LanguageSwitcher";
import { getTranslation } from "@/lib/translations";

const PrivacyPolicy = () => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("preferredLanguage");
    return (saved as Language) || "en";
  });

  const t = getTranslation(language);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Privacy Policy - GDPR & LGPD | Consul Brasil</title>
        <meta name="description" content="Privacy Policy of Consul Brasil. Information about data processing in compliance with GDPR (EU) and LGPD (Brazil)." />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://consulbrasil.com/privacy" />
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
              <h1 className="text-4xl font-bold text-foreground mb-8">Privacy Policy</h1>
              <p className="text-muted-foreground mb-4"><strong>Last updated:</strong> December 2024</p>
              
              <p className="text-muted-foreground mb-6">
                Consul Brasil ("we", "us", or "our") is committed to protecting your privacy in accordance with the 
                <strong> General Data Protection Regulation (GDPR)</strong> of the European Union and the 
                <strong> Lei Geral de Proteção de Dados (LGPD)</strong> of Brazil.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">1. Data Controller</h2>
              <p className="text-muted-foreground">
                <strong>Consul Brasil</strong><br />
                Email: <a href="mailto:privacy@consulbrasil.com" className="text-primary hover:underline">privacy@consulbrasil.com</a>
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">2. Data We Collect</h2>
              <p className="text-muted-foreground mb-4">We may collect the following categories of personal data:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Contact Information:</strong> Name, email address, phone number when you contact us</li>
                <li><strong>Usage Data:</strong> IP address, browser type, pages visited (through analytics)</li>
                <li><strong>Communication Data:</strong> Content of messages you send us</li>
              </ul>

              <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">3. Legal Basis for Processing (GDPR Art. 6 / LGPD Art. 7)</h2>
              <p className="text-muted-foreground mb-4">We process your data based on:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Consent:</strong> When you voluntarily provide information or accept cookies</li>
                <li><strong>Legitimate Interest:</strong> To respond to inquiries and improve our services</li>
                <li><strong>Contract Performance:</strong> To provide requested services</li>
              </ul>

              <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">4. Your Rights</h2>
              <p className="text-muted-foreground mb-4">Under GDPR and LGPD, you have the right to:</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-card rounded-lg border border-border">
                  <h4 className="font-semibold text-foreground">Access</h4>
                  <p className="text-sm text-muted-foreground">Request a copy of your personal data</p>
                </div>
                <div className="p-4 bg-card rounded-lg border border-border">
                  <h4 className="font-semibold text-foreground">Rectification</h4>
                  <p className="text-sm text-muted-foreground">Correct inaccurate or incomplete data</p>
                </div>
                <div className="p-4 bg-card rounded-lg border border-border">
                  <h4 className="font-semibold text-foreground">Erasure</h4>
                  <p className="text-sm text-muted-foreground">Request deletion of your data ("right to be forgotten")</p>
                </div>
                <div className="p-4 bg-card rounded-lg border border-border">
                  <h4 className="font-semibold text-foreground">Portability</h4>
                  <p className="text-sm text-muted-foreground">Receive your data in a structured format</p>
                </div>
                <div className="p-4 bg-card rounded-lg border border-border">
                  <h4 className="font-semibold text-foreground">Objection</h4>
                  <p className="text-sm text-muted-foreground">Object to processing based on legitimate interest</p>
                </div>
                <div className="p-4 bg-card rounded-lg border border-border">
                  <h4 className="font-semibold text-foreground">Withdraw Consent</h4>
                  <p className="text-sm text-muted-foreground">Withdraw consent at any time</p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">5. Data Retention</h2>
              <p className="text-muted-foreground">
                We retain personal data only for as long as necessary to fulfill the purposes for which it was collected, 
                or as required by law. Contact data is typically retained for 3 years after last interaction.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">6. International Transfers</h2>
              <p className="text-muted-foreground">
                Your data may be transferred between the European Union and Brazil. We ensure appropriate safeguards 
                are in place, including Standard Contractual Clauses (SCCs) approved by the European Commission.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">7. Data Security</h2>
              <p className="text-muted-foreground">
                We implement appropriate technical and organizational measures to protect your personal data against 
                unauthorized access, alteration, disclosure, or destruction.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">8. Cookies</h2>
              <p className="text-muted-foreground">
                This website uses essential cookies for functionality. We do not use tracking cookies without your consent. 
                You can manage cookie preferences in your browser settings.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">9. Contact & Complaints</h2>
              <p className="text-muted-foreground mb-4">
                To exercise your rights or for any privacy-related inquiries:
              </p>
              <p className="text-muted-foreground">
                <strong>Email:</strong> <a href="mailto:privacy@consulbrasil.com" className="text-primary hover:underline">privacy@consulbrasil.com</a>
              </p>
              <p className="text-muted-foreground mt-4">
                <strong>Supervisory Authorities:</strong><br />
                EU: Your local Data Protection Authority<br />
                Brazil: Autoridade Nacional de Proteção de Dados (ANPD)
              </p>

              <div className="mt-12 p-6 bg-primary/10 rounded-lg border-l-4 border-primary">
                <p className="text-foreground font-semibold">
                  This policy is available in multiple languages. In case of discrepancy, the English version prevails.
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

export default PrivacyPolicy;
