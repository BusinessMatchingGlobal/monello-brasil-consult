import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Nav } from "@/pages/AboutUs";
import { SiteFooter } from "@/components/SiteFooter";
import { BEFORE_ENTRUSTING_BRAZIL } from "@/data/beforeEntrustingBrazil";
import { useT } from "@/lib/i18n";
import { SITE, useCanonical } from "@/lib/useCanonical";

function Citations({ text }: { text: string }) {
  return <>{text.split(/(\[[1-6]\])/g).map((part, i) => /^\[[1-6]\]$/.test(part)
    ? <a key={i} href={`#reference-${part[1]}`} className="text-primary underline underline-offset-4">{part}</a>
    : part)}</>;
}

export default function BeforeEntrustingBrazil() {
  const { lang } = useT();
  const copy = BEFORE_ENTRUSTING_BRAZIL[lang === "it" ? "it" : "en"];
  const { hash } = useLocation();
  useCanonical("/before-entrusting-brazil", {
    title: `${copy.title} | Business Matching Global`,
    description: copy.subtitle,
    alternates: [
      { hreflang: "en", href: `${SITE}/before-entrusting-brazil` },
      { hreflang: "it", href: `${SITE}/it/before-entrusting-brazil` },
      { hreflang: "x-default", href: `${SITE}/before-entrusting-brazil` },
    ],
  });
  useEffect(() => {
    const target = hash ? document.getElementById(hash.slice(1)) : null;
    if (target) target.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [hash]);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main className="container max-w-3xl pt-32 md:pt-40 pb-16 md:pb-24">
        <h1 className="font-display text-4xl md:text-5xl leading-tight mb-6">{copy.title}</h1>
        <p className="text-base md:text-lg leading-relaxed text-muted-foreground mb-10">{copy.subtitle}</p>
        <article className="space-y-6">
          {copy.blocks.map((block, i) => block.type === "h2"
            ? <h2 key={i} className="font-display text-2xl md:text-3xl pt-8 text-foreground">{block.text}</h2>
            : block.type === "h3"
              ? <h3 key={i} className="font-display text-xl md:text-2xl pt-4 text-foreground">{block.text}</h3>
              : block.type === "ul"
                ? <ul key={i} className="list-disc pl-6 space-y-3 text-base md:text-lg leading-relaxed text-muted-foreground">{block.items.map(item => <li key={item}>{item}</li>)}</ul>
                : <p key={i} className="text-base md:text-lg leading-relaxed text-muted-foreground text-justify"><Citations text={block.text} /></p>)}
          <section aria-labelledby="references-heading" className="pt-8">
            <h2 id="references-heading" className="font-display text-2xl md:text-3xl mb-6">{copy.referencesTitle}</h2>
            <ol className="space-y-6 text-base leading-relaxed text-muted-foreground">
              {copy.references.map((reference, i) => <li key={reference.url} id={`reference-${i + 1}`} className="scroll-mt-28">
                <p>{reference.text}</p>
                <a href={reference.url} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4 break-words">{reference.url}</a>
              </li>)}
            </ol>
          </section>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}