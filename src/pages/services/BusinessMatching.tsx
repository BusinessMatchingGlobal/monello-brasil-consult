import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Download, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCanonical, SITE } from "@/lib/useCanonical";
import { Nav, InfoBar } from "@/pages/OurServices";

const PATH = "/services/business-matching";

const ALTERNATES = [
  { hreflang: "it", href: "/servizi/business-matching" },
  { hreflang: "en", href: "/services/business-matching" },
  { hreflang: "pt", href: "/servicos/business-matching" },
  { hreflang: "x-default", href: "/services/business-matching" },
];

const steps: Array<[string, string]> = [
  [
    "We define the profile",
    "Before searching, we agree on who we're looking for: sector, size, region, channel, volumes, technical capability. A precise profile is worth more than a wide search.",
  ],
  [
    "We map the market",
    "We build the universe of companies matching that profile, combining public records, professional databases, company registries, trade associations and direct market knowledge.",
  ],
  [
    "We select and verify",
    "We narrow the map down to a shortlist. For each company we check that it exists and is in good standing, that it actually trades in the sector, its size and positioning, and — where possible — who really decides.",
  ],
  [
    "We approach",
    "On your mandate we make contact in the local language, present your proposition and qualify genuine interest. Companies that don't reply, or aren't interested, are not handed to you as \"leads\".",
  ],
  [
    "We introduce",
    "We put you directly in touch with those who have shown concrete interest, and prepare you for the conversation: who you're dealing with, how they operate, what to expect.",
  ],
];

const deliverables = [
  "The shortlist, with a profile for each company: activity, size, positioning, what we verified, and why it fits.",
  "The outcome of every approach, company by company: who replied, who showed interest, who declined and on what grounds. Refusals are information too — they tell you something about the market.",
  "The introductions, with the context you need to walk into the first conversation prepared.",
];

const notDoing = [
  "We don't sell databases or off-the-shelf lists.",
  "We don't present a company that never replied as a \"qualified contact\".",
  "We don't promise a number of meetings before we've seen the market.",
  "We don't work for two competing clients on the same profile in the same period.",
];

const formats: Array<[string, string]> = [
  ["Mapping and selection", "when you already have a sales structure and simply need to know who to talk to."],
  ["Mapping, selection and approach", "the full path, from research to introduction."],
  ["Ongoing market presence", "when the market needs following over time rather than exploring once."],
];

const faqs: Array<[string, string]> = [
  [
    "How long does it take?",
    "It depends on the breadth of the profile and the sector. Mapping and selection typically takes a few weeks; the approach phase depends on how fast the market replies — in Brazil, January and July to August are noticeably slower.",
  ],
  [
    "What language do you approach companies in?",
    "Portuguese in Brazil, the local language in Europe. Correspondence is reported back to you translated.",
  ],
  [
    "Do you work in the other direction too?",
    "Yes. We find European partners for Brazilian companies using the same method.",
  ],
  [
    "What if the market doesn't respond?",
    "We tell you, with the evidence. A market that doesn't respond is worth the cost of the research: it stops you building a strategy on top of it.",
  ],
  [
    "Is my enquiry confidential?",
    "Yes. Your name reaches counterparts only when you authorise it, and the early stage can be run without disclosing who the client is.",
  ],
];

function useStructuredData() {
  useEffect(() => {
    const graph = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          name: "Business Matching Brazil–Europe",
          serviceType: "Business matching and commercial partner search",
          url: SITE + PATH,
          provider: { "@id": SITE + "/#organization" },
          areaServed: [
            { "@type": "Country", name: "Brazil" },
            { "@type": "Country", name: "Italy" },
            { "@type": "AdministrativeArea", name: "European Union" },
          ],
          description:
            "We identify, verify and approach potential buyers, distributors, suppliers and industrial partners between Europe and Brazil.",
        },
        {
          "@type": "FAQPage",
          mainEntity: faqs.map(([q, a]) => ({
            "@type": "Question",
            name: q,
            acceptedAnswer: { "@type": "Answer", text: a },
          })),
        },
      ],
    };
    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = "ld-business-matching-en";
    el.textContent = JSON.stringify(graph);
    document.head.appendChild(el);
    return () => {
      el.remove();
    };
  }, []);
}

export default function BusinessMatchingEN() {
  useCanonical(PATH, {
    title: "Business Matching Brazil–Europe | Partner Search & Qualified Introductions",
    description:
      "We identify, verify and approach potential buyers, distributors, suppliers and industrial partners between Europe and Brazil. We don't sell lists — we open conversations.",
    alternates: ALTERNATES,
  });
  useStructuredData();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        {/* Hero */}
        <section className="pt-32 md:pt-44 pb-12 md:pb-16">
          <div className="container max-w-4xl">
            <span className="text-xs tracking-wider uppercase text-primary mb-4 inline-block">
              Business Matching
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight">
              A contact isn't a list. It's a conversation that starts.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed text-justify">
              Whether you need to find a business partner in Brazil or reach buyers in Europe,
              we identify, verify and approach — on your behalf — the right buyers, distributors,
              importers, suppliers or industrial partners.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full">
                <a href="/#contact">
                  Let's talk <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full">
                <Link to="/sample-report">
                  <Download className="mr-1 h-4 w-4" /> Download a sample report (PDF)
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* The trouble with lists */}
        <section className="py-14 md:py-20 border-t border-border/60">
          <div className="container max-w-3xl">
            <h2 className="font-display text-2xl md:text-3xl mb-6">The trouble with lists</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-justify">
              <p>
                Anyone can buy a list of companies. The databases are there, they cost very little, and they
                return hundreds of names in minutes.
              </p>
              <p>
                Then the trouble starts. Half of those companies no longer operate in the sector they're filed
                under. A third lack the size or the structure to work with you. Some are competitors of your
                future partner. And none of them knows who you are, because nobody has approached them yet.
              </p>
              <p>
                A list isn't a commercial opportunity. It's raw material that somebody still has to work through
                — and that somebody usually ends up being you, in a language you don't speak, on a market you
                don't know.
              </p>
            </div>
          </div>
        </section>

        {/* How we work */}
        <section className="py-16 md:py-24 bg-foreground text-background">
          <div className="container max-w-5xl">
            <h2 className="font-display text-2xl md:text-3xl text-background mb-10">How we work</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Link
                to="/How_we_work"
                className="p-6 md:p-7 rounded-2xl bg-background/[0.04] border border-background/10 hover:bg-background/[0.08] transition-colors block"
              >
                <span className="text-xs tracking-wider uppercase text-primary">00 —</span>
                <h3 className="font-display text-xl md:text-2xl text-background mt-1 mb-3">Phase zero</h3>
                <p className="text-background/70 leading-relaxed text-justify">
                  Before we look for counterparts, we establish who owns what and align the paperwork with the real
                  agreements. An agreement that does not hold in both legal systems is not an agreement.
                </p>
              </Link>
              {steps.map(([title, body], i) => (
                <div
                  key={title}
                  className="p-6 md:p-7 rounded-2xl bg-background/[0.04] border border-background/10"
                >
                  <span className="text-xs tracking-wider uppercase text-primary">0{i + 1} —</span>
                  <h3 className="font-display text-xl md:text-2xl text-background mt-1 mb-3">{title}</h3>
                  <p className="text-background/70 leading-relaxed text-justify">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What you receive */}
        <section className="py-14 md:py-20">
          <div className="container max-w-3xl">
            <h2 className="font-display text-2xl md:text-3xl mb-6">What you receive</h2>
            <ul className="space-y-4">
              {deliverables.map((d) => (
                <li key={d} className="flex gap-3 text-muted-foreground leading-relaxed text-justify">
                  <Check className="h-5 w-5 mt-0.5 text-primary shrink-0" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* How we measure the work */}
        <section className="py-14 md:py-20 border-t border-border/60">
          <div className="container max-w-3xl">
            <h2 className="font-display text-2xl md:text-3xl mb-6">How we measure the work</h2>
            <p className="text-lg text-foreground/90 mb-5">
              We don't count names delivered. We count conversations opened.
            </p>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-justify">
              <p>
                One mapping exercise may return forty companies and produce four worth talking to. Another
                returns twelve and produces six. The number isn't the result — the result is how many of those
                doors actually open.
              </p>
              <p>
                That's why we don't promise volumes upfront. We tell you how many companies we considered, how
                many passed verification, and how many responded.
              </p>
            </div>
          </div>
        </section>

        {/* What we don't do */}
        <section className="py-14 md:py-20 border-t border-border/60">
          <div className="container max-w-3xl">
            <h2 className="font-display text-2xl md:text-3xl mb-6">What we don't do</h2>
            <ul className="space-y-4">
              {notDoing.map((n) => (
                <li key={n} className="flex gap-3 text-muted-foreground leading-relaxed">
                  <X className="h-5 w-5 mt-0.5 text-amber shrink-0" />
                  <span>{n}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Engagement formats */}
        <section className="py-14 md:py-20 border-t border-border/60">
          <div className="container max-w-4xl">
            <h2 className="font-display text-2xl md:text-3xl mb-8">Engagement formats</h2>
            <div className="grid md:grid-cols-3 gap-5">
              {formats.map(([title, desc]) => (
                <div key={title} className="p-6 rounded-2xl border border-border/70">
                  <h3 className="font-display text-lg mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-sm text-muted-foreground leading-relaxed text-justify">
              Every project is quoted on the agreed scope. Arrangements with a performance-linked component are
              possible, defined case by case.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="rounded-full">
                <a href="/#contact">
                  Request a quote <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-14 md:py-20 border-t border-border/60">
          <div className="container max-w-3xl">
            <h2 className="font-display text-2xl md:text-3xl mb-8">Frequently asked questions</h2>
            <dl className="space-y-6">
              {faqs.map(([q, a]) => (
                <div key={q}>
                  <dt className="font-display text-lg mb-2">{q}</dt>
                  <dd className="text-muted-foreground leading-relaxed text-justify">{a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Internal links */}
        <section className="py-12 border-t border-border/60">
          <div className="container max-w-3xl text-sm text-muted-foreground leading-relaxed">
            <p>
              Still working out whether the market exists? Start with{" "}
              <Link to="/Our_Services" className="underline hover:text-foreground">
                Business Intelligence
              </Link>
              . Already found the partner and need to move the goods? See{" "}
              <Link to="/Our_Services" className="underline hover:text-foreground">
                Import/Export Intelligence
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Closing */}
        <section className="py-16 md:py-24 bg-foreground text-background">
          <div className="container max-w-3xl text-center">
            <h2 className="font-display text-3xl md:text-4xl text-background mb-5">
              Markets don't open on their own.
            </h2>
            <p className="text-background/70 leading-relaxed mb-8">
              Tell us what you're looking for, and we'll tell you frankly whether we can find it.
            </p>
            <Button asChild size="lg" className="rounded-full">
              <a href="/#contact">
                Let's talk <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
          </div>
        </section>
      </main>
      <InfoBar />
    </div>
  );
}
