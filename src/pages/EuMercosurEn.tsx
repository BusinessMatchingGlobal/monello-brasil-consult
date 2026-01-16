import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const EuMercosurEn = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container mx-auto px-6">
          <Link to="/">
            <Button variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10 mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight max-w-4xl">
            EU–Mercosur: Not just a trade agreement, but a historic shift
          </h1>
          <p className="text-primary-foreground/80 mt-4 text-lg">17 January 2026</p>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-6 py-12 md:py-16">
        <article className="max-w-3xl mx-auto prose prose-lg prose-slate dark:prose-invert">
          <p className="lead text-xl text-muted-foreground leading-relaxed">
            17 January 2026 is a significant date. The signing of the Association Agreement between the European Union and Mercosur in Asunción will mark the end of one of the longest and most complex negotiations in modern trade history. More importantly, a new phase begins: that of real, concrete, operational implementation.
          </p>

          <p>
            After more than twenty-five years of negotiations, mutual vetoes, political standstills and diplomatic relaunches, the agreement finally moves beyond the realm of official statements. It becomes a strategic variable that companies, investors and institutions must address immediately.
          </p>

          <p className="font-semibold text-foreground">
            For those operating along the Europe–Brazil axis, this moment marks the end of ambiguity and the beginning of a new normal.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Why this agreement comes now</h2>
          
          <p>
            The timing is anything but accidental. Europe is navigating an environment defined by global fragmentation, selective deglobalisation, and increasing supply chain insecurity. The war in Ukraine has highlighted the risks of over-dependence on a limited number of suppliers, while US–China competition has made it clear that commercial neutrality is no longer a viable option.
          </p>

          <p>
            In this context, Mercosur offers Europe a rare combination: food security, an abundant supply of critical raw materials, a growing market and the potential for regulatory convergence. For Mercosur, and Brazil in particular, the EU is a partner that can export standards, technology, capital and industrial know-how.
          </p>

          <p>
            This is therefore not 'free trade' in the traditional sense. Rather, it is a reciprocal geopolitical choice to diversify, rebalance and reduce systemic risk.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">The Least Discussed Aspect: Legal Architecture</h2>

          <p>
            One of the most innovative — and least understood — elements of the agreement is its 'two-pillar' structure. The trade pillar comes under the EU's exclusive jurisdiction and can be provisionally applied without ratification by all 27 national parliaments.
          </p>

          <p>
            The practical implication is clear: companies do not need to wait years to see the effects on tariffs, rules of origin, and market access.
          </p>

          <p>
            This reflects a lesson learned from previous agreements — CETA being a prime example — and sends a strong political signal. Brussels has decided that strategic trade can no longer be held hostage by the domestic politics of individual member states.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Agriculture: Less Ideology, More Numbers</h2>

          <p>
            Much of the European opposition to the agreement has focused on agriculture, often in alarmist terms. Yet the data tell a different story. There is no indiscriminate liberalisation. Sensitive products are subject to precise, limited and closely monitored quotas.
          </p>

          <p>
            Beef, for instance, is granted access under a quota representing only a tiny fraction of total EU consumption. This is an agreement based on value, not volume. It favours premium, traceable products that comply with EU sanitary standards. Everything else remains outside.
          </p>

          <p>
            This fundamentally reshapes the export strategy for South American companies: fewer commodities, stronger positioning, lower volumes and higher margins.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Industry and Machinery: Where the Real Game Is Played</h2>

          <p>
            While agriculture is the most visible sector, industry is the most significant in structural terms. For Mercosur — and Brazil in particular — gradually opening up to European industrial goods represents a competitive shock, but also a historic opportunity for modernisation.
          </p>

          <p>
            Tariff reductions on machinery, chemicals, pharmaceuticals and components lower the cost of productive capital and accelerate technological upgrading. The 10–15 year transition periods granted to certain sectors are not a reason to become complacent, but rather an opportunity to adapt. Those who waste it are unlikely to get a second chance.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Public Procurement and Services: The Underestimated Chapter</h2>

          <p>
            Another chapter that has received little public attention is reciprocal access to public procurement markets, despite its enormous value. For the first time, European and Brazilian companies will be able to compete on equal terms for federal public tenders in each other's countries.
          </p>

          <p>
            In Europe, this means access to a market worth trillions. In Brazil, it will mean transparency, standardisation, and the gradual removal of many informal barriers. This silent revolution favours companies that are well organised, compliant and ready to operate on an international scale.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Sustainability: Not a slogan, but a binding clause</h2>

          <p>
            Rather than being addressed through declarations of principle, the environmental dimension is addressed through a binding legal mechanism. The Paris Agreement is an 'essential element' of the deal, and serious violations may result in the entire trade agreement being suspended.
          </p>

          <p>
            This sets a powerful precedent. It also operates alongside autonomous EU regulations, such as the EUDR on deforestation, which will remain fully applicable. In other words, the agreement opens doors — but only to those who can demonstrate traceability, compliance, and responsibility.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Conclusion: A Bridge in a World of Walls</h2>

          <p>
            The EU–Mercosur agreement is not perfect. It is asymmetric, politically fragile and technically complex. Yet, in a world increasingly defined by barriers, it is the largest economic bridge to be built between two continents in recent decades.
          </p>

          <p className="font-semibold text-foreground">
            The message for companies is clear: the question is no longer whether the agreement will enter into force, but how they can position themselves to take advantage of it. Those who wait risk arriving too late, whereas those who plan now can turn the treaty into a real competitive advantage.
          </p>

          <div className="mt-16 pt-8 border-t border-border">
            <Link to="/#contact">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Contact us for a consultation
              </Button>
            </Link>
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="bg-muted py-8 mt-16">
        <div className="container mx-auto px-6 text-center text-muted-foreground">
          <p>© 2026 Monello Brasil Consult. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default EuMercosurEn;
