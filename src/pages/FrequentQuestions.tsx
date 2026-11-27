import { useEffect, useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Nav } from "@/pages/AboutUs";
import { SiteFooter } from "@/components/SiteFooter";
import { FREQUENT_QUESTIONS } from "@/data/frequentQuestions";
import { ITALIAN_FAQ_PATH } from "@/lib/langPath";
import { SITE, useCanonical } from "@/lib/useCanonical";

const EMAIL = "info@businessmatching.global";
const FAQ_JSONLD_ID = "ld-frequent-questions";

type Question = { q: string; a: string };

function QuestionAccordion({ question }: { question: Question }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const buttonId = `question-${id}`;
  const answerId = `answer-${id}`;

  return (
    <div className="border-b border-border/60">
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={answerId}
          onClick={() => setOpen(value => !value)}
          className="flex w-full items-center justify-between gap-6 py-5 text-left text-base md:text-lg font-medium text-foreground hover:text-primary transition-colors"
        >
          <span>{question.q}</span>
          <ChevronDown aria-hidden="true" className={`h-5 w-5 shrink-0 text-muted-foreground ${open ? "rotate-180" : ""}`} />
        </button>
      </h3>
      <div id={answerId} role="region" aria-labelledby={buttonId} hidden={!open}>
        <p className="pb-6 pr-8 text-base leading-relaxed text-muted-foreground">{question.a}</p>
      </div>
    </div>
  );
}

function ContactLine() {
  const [before, after] = FREQUENT_QUESTIONS.contact.split(EMAIL);
  return (
    <p id="contact" className="scroll-mt-28 text-base leading-relaxed text-muted-foreground">
      {before}<a href={`mailto:${EMAIL}`} className="text-primary underline underline-offset-4">{EMAIL}</a>{after}
    </p>
  );
}

export default function FrequentQuestions() {
  const canonical = SITE + ITALIAN_FAQ_PATH;
  useCanonical(ITALIAN_FAQ_PATH, {
    title: `${FREQUENT_QUESTIONS.title} | Business Matching Global`,
    description: FREQUENT_QUESTIONS.subtitle,
    url: canonical,
    noAlternates: true,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const sitewideFaq = document.getElementById("ld-faq-sitewide");
    sitewideFaq?.remove();
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = FAQ_JSONLD_ID;
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      url: canonical,
      mainEntity: FREQUENT_QUESTIONS.sections.flatMap(section => section.items.map(item => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      }))),
    });
    document.head.appendChild(script);
    return () => {
      script.remove();
      if (sitewideFaq) document.head.appendChild(sitewideFaq);
    };
  }, [canonical]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main className="container max-w-3xl pt-32 md:pt-40 pb-16 md:pb-24">
        <header className="mb-14 md:mb-20">
          <h1 className="font-display text-4xl md:text-5xl leading-tight mb-6">{FREQUENT_QUESTIONS.title}</h1>
          <p className="text-base md:text-lg leading-relaxed text-muted-foreground">{FREQUENT_QUESTIONS.subtitle}</p>
        </header>

        {FREQUENT_QUESTIONS.sections.map((section, sectionIndex) => (
          <section key={section.title} aria-labelledby={`faq-section-${sectionIndex}`} className="mb-14 md:mb-16">
            <h2 id={`faq-section-${sectionIndex}`} className="font-display text-2xl md:text-3xl mb-5">{section.title}</h2>
            {"intro" in section && <p className="text-base md:text-lg leading-relaxed text-muted-foreground mb-6">{section.intro}</p>}
            <div className="border-t border-border/60">
              {section.items.map(item => <QuestionAccordion key={item.q} question={item} />)}
            </div>
          </section>
        ))}

        <ContactLine />
        <p className="mt-12 border-l-2 border-primary pl-6 font-display text-2xl md:text-3xl leading-snug text-foreground">
          {FREQUENT_QUESTIONS.closing}
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
