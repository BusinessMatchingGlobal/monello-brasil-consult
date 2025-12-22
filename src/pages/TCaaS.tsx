import { Helmet } from "react-helmet";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useState } from "react";
import { Language } from "@/components/LanguageSwitcher";
import { getTranslation } from "@/lib/translations";

const TCaaS = () => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("preferredLanguage");
    return (saved as Language) || "en";
  });

  const t = getTranslation(language);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>TCaaS - Travel Concierge as a Service | Consul Brasil</title>
        <meta
          name="description"
          content="The TCaaS Manifesto: Re-Humanizing Travel. An invitation to architect the missing link between OTAs and Agents."
        />
      </Helmet>

      <Navigation
        currentLanguage={language}
        onLanguageChange={setLanguage}
        translations={t.nav}
      />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-accent/10">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                The TCaaS Manifesto
              </h1>
              <p className="text-2xl md:text-3xl text-primary font-semibold mb-4">
                Re-Humanizing Travel
              </p>
              <p className="text-lg md:text-xl text-muted-foreground">
                An Invitation to Architect the "Missing Link" Between OTAs and Agents
              </p>
            </div>
          </div>
        </section>

        {/* The Industry Paradox */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-8">The Industry Paradox</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Let's be honest: the Travel Industry is currently polarized.
              </p>
              <div className="space-y-6">
                <div className="p-6 bg-card rounded-lg border border-border">
                  <h3 className="text-xl font-semibold text-foreground mb-3">On one side, the Giant OTAs:</h3>
                  <p className="text-muted-foreground">
                    They offer total automation and transaction efficiency, but zero resilience. When the unexpected happens (strikes, weather, geopolitical shifts), the chatbot fails. The passenger is left alone.
                  </p>
                </div>
                <div className="p-6 bg-card rounded-lg border border-border">
                  <h3 className="text-xl font-semibold text-foreground mb-3">On the other, Traditional Agencies:</h3>
                  <p className="text-muted-foreground">
                    They offer high-touch empathy and deep service, but are often suffocated by operational friction, legacy GDS complexity, and manual processes.
                  </p>
                </div>
              </div>
              <div className="mt-8 p-6 bg-primary/10 rounded-lg border-l-4 border-primary">
                <p className="text-lg font-semibold text-foreground">
                  <strong>The Insight:</strong> The market is obsessing over Artificial Intelligence, but the premium corporate client is starving for <em>Augmented Intelligence</em>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The Project */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-4">The Project: Travel Concierge as a Service (TCaaS)</h2>
              <p className="text-lg text-muted-foreground mb-8">
                We are drafting a White Paper to define the operational and economic backbone of a new B2B ecosystem. We are not building another booking engine; we are building a <strong>"Peace of Mind"</strong> infrastructure.
              </p>

              <h3 className="text-2xl font-bold text-foreground mb-6">Our Core Theses:</h3>
              <div className="space-y-6">
                <div className="p-6 bg-card rounded-lg border border-border">
                  <h4 className="text-xl font-semibold text-primary mb-3">Human-in-the-Loop (The "Augmented" Approach)</h4>
                  <p className="text-muted-foreground">
                    We reject the "100% Automated" fallacy. Our model uses AI to handle the 90% of volume that is routine, freeing up human experts to manage the critical 10%—the complex, high-empathy exceptions.
                  </p>
                </div>
                <div className="p-6 bg-card rounded-lg border border-border">
                  <h4 className="text-xl font-semibold text-primary mb-3">Sovereignty & Security</h4>
                  <p className="text-muted-foreground">
                    We move beyond insecure emails to a sovereign Matrix-protocol App. This ensures data privacy and premium corporate security standards.
                  </p>
                </div>
                <div className="p-6 bg-card rounded-lg border border-border">
                  <h4 className="text-xl font-semibold text-primary mb-3">Proactive "Butterfly Effect" Management</h4>
                  <p className="text-muted-foreground">
                    We don't wait for the client to panic. We detect upstream delays and intervene to rebook the passenger before they even know there is a problem.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Philosophy */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-4">The Philosophy: Behavior Over Words</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Why do most travel startups fail? Because they ask customers what they want. Inspired by David Ogilvy and modern Behavioral Science, we operate on a harder truth:
              </p>
              <blockquote className="my-8 p-6 bg-primary/10 rounded-lg border-l-4 border-primary italic text-lg text-foreground">
                "People don't think what they feel, don't say what they think, and don't do what they say."
              </blockquote>
              <p className="text-muted-foreground mb-6">
                Traditional market research relies on the customer's rational post-rationalization. We believe in designing for the subconscious (System 1).
              </p>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-2 bg-primary rounded-full"></div>
                  <div>
                    <h4 className="font-semibold text-foreground">Observation {">"} Interrogation</h4>
                    <p className="text-muted-foreground">We don't ask customers to design the product. We observe their friction points and solve them before they are articulated.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-2 bg-primary rounded-full"></div>
                  <div>
                    <h4 className="font-semibold text-foreground">Tech is the Tool, Not the Master</h4>
                    <p className="text-muted-foreground">Technology is a commodity. The true differentiator is the human creativity applied to that tool to create "Immersive Commerce" and genuine psychological attachment.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Economic Model */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-4">The Economic Model: Shared Value</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Current models are flawed because the shareholder's interest (profit) often conflicts with the traveler's interest (service). We propose a <strong>Distributed Ownership Model</strong> where travelers and agents are shareholders.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-card rounded-lg border border-border">
                  <h4 className="text-xl font-semibold text-primary mb-3">Aligned Interests</h4>
                  <p className="text-muted-foreground">
                    When the customer owns the platform, value extraction is replaced by value generation.
                  </p>
                </div>
                <div className="p-6 bg-card rounded-lg border border-border">
                  <h4 className="text-xl font-semibold text-primary mb-3">The "Sun Never Sets" Operations</h4>
                  <p className="text-muted-foreground">
                    A global network of remote ticketing experts. We prioritize Domain Expertise (GDS/NDC) over language fluency. Technology bridges the language gap; nothing bridges the incompetence gap. This allows for sustainable 24/7 coverage that respects work-life balance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Invitation */}
        <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-accent/10">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-foreground mb-6">The Invitation</h2>
              <p className="text-lg text-muted-foreground mb-4">
                I am not hiring employees. I am not seeking a Co-Founder. I am assembling a <strong>Brain Trust</strong>.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                I am looking for visionaries—experts in GDS architecture, NDC protocols, Behavioral Economics, and Airline Retailing—to challenge these assumptions and contribute to this White Paper.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                We are building the blueprint for a system that aligns with IATA's retailing vision but adds the necessary human layer they often overlook.
              </p>
              <div className="p-6 bg-primary/20 rounded-lg border border-primary/30">
                <p className="text-xl font-semibold text-foreground">
                  If you believe the future of travel is not "Cheaper" but "Better," help us write the rules.
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

export default TCaaS;
