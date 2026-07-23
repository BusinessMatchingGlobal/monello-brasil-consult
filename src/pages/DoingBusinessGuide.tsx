import { Link } from "react-router-dom";
import { ArrowLeft, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useT } from "@/lib/i18n";
import { useCanonical } from "@/lib/useCanonical";
import logoBMG from "@/assets/logo-business-matching-global-transparent.png.asset.json";
import { useEffect } from "react";

export default function DoingBusinessGuide() {
  useCanonical("/guides/doing-business-in-brazil", {
    title: "Doing Business in Brazil: A Practical Guide for European Companies | Business Matching Global",
    description: "A practical guide to doing business in Brazil for European companies: EU-Mercosur, Custo Brasil, import models, and market entry — plus a free ebook.",
  });

  useEffect(() => {
    // og:type = article
    let ogType = document.head.querySelector<HTMLMetaElement>('meta[property="og:type"]');
    const prevType = ogType?.getAttribute("content") ?? null;
    if (!ogType) {
      ogType = document.createElement("meta");
      ogType.setAttribute("property", "og:type");
      document.head.appendChild(ogType);
    }
    ogType.setAttribute("content", "article");

    // JSON-LD Article
    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.setAttribute("data-page", "doing-business-guide");
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Doing Business in Brazil: A Practical Guide for European Companies",
      description:
        "A practical guide to doing business in Brazil for European companies: EU-Mercosur, Custo Brasil, import models, and market entry — plus a free ebook.",
      inLanguage: "en",
      mainEntityOfPage: "https://businessmatching.global/guides/doing-business-in-brazil",
      url: "https://businessmatching.global/guides/doing-business-in-brazil",
      author: { "@type": "Organization", name: "Business Matching Global" },
      publisher: {
        "@type": "Organization",
        name: "Business Matching Global",
        url: "https://businessmatching.global",
      },
    });
    document.head.appendChild(ld);

    return () => {
      if (prevType !== null) ogType?.setAttribute("content", prevType);
      ld.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-5 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
          <Link to="/" aria-label="Business Matching Global">
            <img src={logoBMG.url} alt="Business Matching Global" className="h-8 md:h-10 w-auto" />
          </Link>
        </div>
      </header>

      <main className="container mx-auto max-w-3xl px-4 py-12 md:py-16">
        <article className="prose prose-lg max-w-none dark:prose-invert">
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-6">
            Doing Business in Brazil: A Practical Guide for European Companies
          </h1>

          <p className="lead text-xl text-muted-foreground mb-8">
            Brazil is the largest economy in Latin America, a market of over 210 million consumers, and — since the provisional application of the EU-Mercosur agreement in May 2026 — closer to European exporters than it has been in decades. It is also one of the most misunderstood markets in the world.
          </p>

          <p className="mb-6">
            Most guides to doing business in Brazil tell you what Brazil is. This one tells you how Brazil works — and why the companies that succeed there are rarely the ones with the best product, but the ones with the best method.
          </p>

          <h2 className="text-2xl md:text-3xl font-semibold mt-10 mb-4">Why Brazil, and why now</h2>

          <p className="mb-6">Three things have changed the calculus for European companies looking at Brazil:</p>

          <p className="mb-6">
            <strong>The EU-Mercosur agreement is no longer hypothetical.</strong> After twenty-five years of negotiation, the trade pillar entered provisional application on 1 May 2026. Tariffs on a wide range of European industrial goods, machinery, wines, and food products will phase down over the coming years. For categories that previously carried import duties of 20–35%, this is not an incremental improvement — it redraws the map.
          </p>

          <p className="mb-6">
            <strong>Brazil is diversifying its trade relationships.</strong> Recent trade tensions with other major partners have pushed Brazilian buyers, distributors, and institutions to look more actively toward Europe. Doors that were closed to European suppliers five years ago are now being opened from the inside.
          </p>

          <p className="mb-6">
            <strong>The internal market is maturing.</strong> Brazilian consumers and businesses increasingly pay for quality, traceability, and specialization — categories where European companies have structural advantages. From specialty food and wine to industrial machinery, from pharmaceutical technology to agritech, the demand exists. The question is how to reach it.
          </p>

          <h2 className="text-2xl md:text-3xl font-semibold mt-10 mb-4">The real barrier is not the tariff</h2>

          <p className="mb-6">
            Here is what most newcomers get wrong: they assume the main obstacle to doing business in Brazil is the import duty. It never was.
          </p>

          <p className="mb-6">
            Brazil's true entry barrier is what Brazilians themselves call the <strong>Custo Brasil</strong> — the accumulated cost of complexity. It includes:
          </p>

          <p className="mb-6">
            <strong>A layered tax system.</strong> Brazil levies taxes at federal, state, and municipal level, and several of them cascade through the import chain. A landmark tax reform is consolidating consumption taxes into a dual VAT system, but the transition runs through 2033 — meaning importers must navigate the old and new regimes simultaneously.
          </p>

          <p className="mb-6">
            <strong>Regulatory approvals with their own clock.</strong> Depending on your product, you may need registration with ANVISA (health products, cosmetics, food), MAPA (agricultural and animal products), INMETRO (technical certification), or other bodies. These processes are manageable — but only if they are planned before, not after, the first shipment.
          </p>

          <p className="mb-6">
            <strong>A logistics geography unlike Europe's.</strong> Brazil is a continent. The distance from a port of entry to your actual customer can exceed the distance from Lisbon to Warsaw. Choosing the wrong state of entry can cost you more in internal logistics and state-level tax than the import duty ever did.
          </p>

          <p className="mb-6">
            <strong>A business culture built on relationships.</strong> Contracts matter, but in Brazil they follow trust rather than precede it. Deals are built through presence, patience, and intermediaries who are known to both sides. Cold outreach from Europe, in English, rarely converts.
          </p>

          <p className="mb-6">
            None of these barriers is insurmountable. But none of them is solved by a lower tariff.
          </p>

          <h2 className="text-2xl md:text-3xl font-semibold mt-10 mb-4">What actually works: method over product</h2>

          <p className="mb-6">
            At Business Matching Global, we work on a simple premise: Brazil does not reward companies that export products. It rewards companies that transfer a <strong>method</strong>.
          </p>

          <p className="mb-6">
            The difference is concrete:
          </p>

          <p className="mb-6">
            <strong>Exporting a product</strong> means shipping goods, quoting a price, and hoping the market absorbs the complexity. This is where most first attempts fail — stranded inventory, unexpected tax exposure, distributors who go silent.
          </p>

          <p className="mb-6">
            <strong>Transferring a method</strong> means adapting how you sell to how Brazil buys: choosing the right import model (direct import, importação por conta e ordem, encomenda, or a build-to-order flow), the right state of entry, the right fiscal regime, and the right local counterpart — before the first container moves.
          </p>

          <p className="mb-6">
            The knowledge behind these choices is public. The tax tables, the regulatory pathways, the import models — all of it can be studied. What cannot be downloaded is the operating structure that turns that knowledge into a functioning trade corridor: the vetted counterparts, the sequencing, the person on the ground who knows which door to knock on and in which order.
          </p>

          <p className="mb-6">
            Or, as we put it to our clients: <strong>a solution on paper is not a corridor.</strong>
          </p>

          <h2 className="text-2xl md:text-3xl font-semibold mt-10 mb-4">Five questions to answer before you enter</h2>

          <p className="mb-6">
            If you are a European company evaluating Brazil, these are the questions that determine whether your entry is an investment or an expense:
          </p>

          <ol className="list-decimal list-outside space-y-4 mb-8 ml-5">
            <li>
              <strong>Which import model fits your product and volume?</strong> Direct import is not the default answer — for many mid-sized exporters, intermediated models reduce fiscal exposure and working capital requirements dramatically.
            </li>
            <li>
              <strong>Which state should your goods enter through?</strong> State-level tax incentives and port efficiency vary enormously. The obvious port is often the expensive one.
            </li>
            <li>
              <strong>What does your product need before it can legally be sold?</strong> Registration timelines range from weeks to more than a year. This must be on the critical path from day one.
            </li>
            <li>
              <strong>Who is your counterpart, and who vouches for them?</strong> Distributor due diligence in Brazil is not a formality. The right partner is found through networks, not marketplaces.
            </li>
            <li>
              <strong>What does the EU-Mercosur phase-down schedule mean for your specific tariff line?</strong> Some products benefit immediately; others phase down over up to fifteen years. Your pricing strategy should be built on your actual schedule, not the headline.
            </li>
          </ol>

          <h2 className="text-2xl md:text-3xl font-semibold mt-10 mb-4">Where to go deeper</h2>

          <p className="mb-6">
            We have condensed the full framework — the EU-Mercosur agreement explained from both the European and the Brazilian perspective, the operational layer beyond tariffs, and the alternative import models that make market entry viable for mid-sized companies — into a free ebook: <strong>Exporting to Brazil</strong>.
          </p>

          <div className="not-prose my-8">
            <Link to="/news">
              <Button size="lg" className="gap-2">
                Download the free ebook
                <Download className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <p className="mb-6">
            It is the same material we use as the starting point for our own corridor projects. The knowledge is public by design. If you then want to turn it into an operating structure, that is what we do.
          </p>

          <p className="mb-6">
            Business Matching Global is a market intelligence and business orchestration firm focused on the Italy–Brazil corridor, based in Belo Horizonte, Minas Gerais. We don't consult from a distance — we build corridors on the ground.
          </p>

          <p className="text-sm text-muted-foreground mt-10">
            Reproduction, in whole or in part, is authorized only with attribution to Business Matching Global.
          </p>
        </article>
      </main>
    </div>
  );
}
