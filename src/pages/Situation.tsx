import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useT } from "@/lib/i18n";
import { useCanonical, SITE } from "@/lib/useCanonical";
import { Nav } from "@/pages/AboutUs";
import { InfoBar } from "@/pages/OurServices";
import { pathForLang } from "@/lib/langPath";
import { HREFLANG } from "@/lib/langPath";
import { getSituation, situationContent, type SituationKey } from "@/data/situations";

function alternatesFor(key: SituationKey) {
  const s = getSituation(key);
  const alts = (Object.entries(s.content) as Array<[keyof typeof s.content, { slug: string }]>).map(
    ([lang, c]) => ({ hreflang: HREFLANG[lang], href: SITE + pathForLang(lang, c.slug) }),
  );
  const en = s.content.en;
  if (en) alts.push({ hreflang: "x-default", href: SITE + en.slug });
  return alts;
}

export function SituationPage({ pageKey }: { pageKey: SituationKey }) {
  const { lang } = useT();
  const c = situationContent(pageKey, lang);
  const contactHref = `${pathForLang(lang, "/")}?subject=${encodeURIComponent(c.cta.subject)}#contact`;

  useCanonical(c.slug, {
    title: c.title,
    description: c.description,
    alternates: alternatesFor(pageKey),
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <section className="pt-32 md:pt-44 pb-12 md:pb-16">
          <div className="container max-w-4xl">
            <span className="text-xs tracking-wider uppercase text-primary mb-4 inline-block">
              {c.kicker}
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight">
              {c.heroTitle}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed text-justify">
              {c.heroBody}
            </p>
          </div>
        </section>

        {c.sections.map((section) => (
          <section key={section.title} className="py-14 md:py-20 border-t border-border/60">
            <div className="container max-w-3xl">
              <span className="text-xs tracking-wider uppercase text-primary mb-3 inline-block">
                {section.kicker}
              </span>
              <h2 className="font-display text-2xl md:text-3xl mb-6">{section.title}</h2>
              {section.body?.map((p) => (
                <p key={p.slice(0, 40)} className="text-muted-foreground leading-relaxed text-justify mb-4">
                  {p}
                </p>
              ))}
              {section.bullets && (
                <ol className="space-y-4 text-muted-foreground leading-relaxed">
                  {section.bullets.map((b, i) => (
                    <li key={b.text.slice(0, 40)} className="flex gap-3">
                      <span className="text-primary font-display shrink-0">
                        {section.ordered ? `0${i + 1}` : "—"}
                      </span>
                      <span className="text-justify">
                        {b.text}
                        {b.service && (
                          <>
                            {" "}
                            <Link to="/Our_Services" className="underline hover:text-foreground">
                              {b.service}
                            </Link>
                          </>
                        )}
                      </span>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </section>
        ))}

        <section className="py-14 md:py-20 border-t border-border/60">
          <div className="container max-w-3xl">
            <span className="text-xs tracking-wider uppercase text-primary mb-3 inline-block">
              {c.start.kicker}
            </span>
            <h2 className="font-display text-2xl md:text-3xl mb-6">{c.start.title}</h2>
            <p className="text-muted-foreground leading-relaxed text-justify">{c.start.body}</p>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-foreground text-background">
          <div className="container max-w-3xl text-center">
            <p className="text-background/80 text-lg leading-relaxed mb-8">{c.cta.text}</p>
            <Button asChild size="lg" className="rounded-full">
              <a href={contactHref}>
                {c.cta.button} <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
          </div>
        </section>
      </main>
      <InfoBar />
    </div>
  );
}

export function AlreadyInBrazil() {
  return <SituationPage pageKey="already-in-brazil" />;
}

export function BackToBrazil() {
  return <SituationPage pageKey="back-to-brazil" />;
}
