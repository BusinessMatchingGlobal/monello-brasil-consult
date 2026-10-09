import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useT } from "@/lib/i18n";
import { pathForLang } from "@/lib/langPath";
import { useCanonical, SITE } from "@/lib/useCanonical";
import { Nav } from "./AboutUs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getPartnerProgramme, field, parseLink, type PPLang, type PPLink } from "@/lib/partnerProgramme";

const MAILTO = "mailto:info@businessmatching.global";

function SmartLink({ link, lang, className, children }: { link: PPLink; lang: PPLang; className?: string; children: React.ReactNode }) {
  const m = link.href.match(/^https:\/\/businessmatching\.global(\/.*)$/);
  if (m) {
    let path = m[1];
    if (path === "/services/business-matching") {
      path = lang === "it" ? "/servizi/business-matching" : lang === "pt" ? "/servicos/business-matching" : path;
    }
    return <Link to={path} className={className}>{children}</Link>;
  }
  return <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>{children}</a>;
}

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-display text-2xl md:text-3xl mt-16 mb-4">{children}</h2>
);
const P = ({ children }: { children: React.ReactNode }) => (
  <p className="text-base md:text-lg leading-relaxed text-muted-foreground mb-4">{children}</p>
);
const linkCls = "text-primary underline hover:text-primary/80 transition-colors";
const btnCls = "inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:opacity-90 transition-opacity";

export default function PartnerProgram() {
  const { lang: l } = useT();
  const lang: PPLang = l === "it" ? "it" : l === "pt" ? "pt" : "en";
  const c = getPartnerProgramme(lang);
  const s = c.sections;
  useCanonical("/Partner_Program", { title: c.title, description: c.description });

  // FAQ parsing
  const faqs: Array<[string, string]> = [];
  for (const line of s[15].lines) {
    if (line.startsWith("Q:")) faqs.push([line.slice(2).trim(), ""]);
    else if (line.startsWith("A:") && faqs.length) faqs[faqs.length - 1][1] = line.slice(2).trim();
  }

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const sitewide = document.getElementById("ld-faq-sitewide");
    sitewide?.remove();
    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = "ld-partner-program-faq";
    el.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      url: SITE + "/Partner_Program",
      mainEntity: faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
    });
    document.head.appendChild(el);
    return () => { el.remove(); if (sitewide) document.head.appendChild(sitewide); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  const plain = (n: number) => s[n].lines.filter((x) => !/^(Link text|Link):/.test(x));

  // Section 2
  const d = s[2].lines;
  // Section 4 cards
  const cards: Array<{ level?: string; service?: string; text?: string; link?: PPLink }> = [];
  let buf: string[] = [];
  const flush = () => { if (buf.length) cards.push({ level: field(buf, "Level"), service: field(buf, "Service"), text: field(buf, "Text"), link: parseLink(buf) }); buf = []; };
  for (const line of s[4].lines) { if (/^Card \d+$/.test(line)) flush(); else buf.push(line); }
  flush();
  // Section 7
  const s7items = s[7].lines.filter((x) => /^\d+\.\s/.test(x)).map((x) => x.replace(/^\d+\.\s+/, ""));
  // Section 10
  const s10items = s[10].lines.filter((x) => x.startsWith("- ")).map((x) => x.slice(2));
  // Section 12
  const s12 = s[12].lines;
  const hIdx = s12.findIndex((x) => x.startsWith("Headline:"));
  const tIdx = s12.findIndex((x) => x === "Text:");
  const epi = s12.slice(s12.indexOf("Epigraph:") + 1, hIdx);
  const attribution = epi.find((x) => x.startsWith("—"));
  const epiQuote = epi.filter((x) => !x.startsWith("—"));
  const s12text = s12.slice(tIdx + 1);
  // Section 14
  const s14items = s[14].lines.filter((x) => x.startsWith("- ")).map((x) => x.slice(2));

  const linkPara = (n: number) => {
    const lk = parseLink(s[n].lines);
    return lk ? <p className="mt-2"><SmartLink link={lk} lang={lang} className={linkCls}>{lk.text}</SmartLink></p> : null;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <div className="container max-w-4xl pt-32 md:pt-40 pb-16 md:pb-24">
        {/* 1. Hero */}
        <h1 className="font-display text-4xl md:text-5xl leading-tight mb-6">{field(s[1].lines, "Headline")}</h1>
        <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">{field(s[1].lines, "Text")}</p>
        <a href={MAILTO} className={`mt-8 ${btnCls}`}>{field(s[1].lines, "Button")}</a>

        {/* 2. Roles diagram */}
        <div className="mt-14">
          <div className="grid gap-4 md:grid-cols-2">
            {[1, 2].map((i) => (
              <div key={i} className={`rounded-2xl border p-5 md:p-6 ${i === 2 ? "border-primary/40 bg-primary/5" : "border-border bg-secondary/50"}`}>
                <p className="font-display text-lg mb-2 text-foreground">{field(d, `Box ${i} title`)}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{field(d, `Box ${i} items`)}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center py-2" aria-hidden="true">
            <svg width="20" height="34" viewBox="0 0 20 34" className="text-primary">
              <path d="M10 0 V26" stroke="currentColor" strokeWidth="2" />
              <path d="M4 24 L10 33 L16 24" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
          <div className="rounded-2xl border border-border bg-secondary/50 p-5 text-center">
            <p className="font-display text-lg text-foreground">{field(d, "Third element")}</p>
          </div>
          <p className="mt-3 text-center text-sm text-muted-foreground">{field(d, "Label under the diagram")}</p>
        </div>

        {/* 3 */}
        <H2>{s[3].title}</H2>
        {plain(3).map((x, i) => <P key={i}>{x}</P>)}

        {/* 4 cards */}
        <H2>{s[4].title}</H2>
        <div className="grid gap-5 md:grid-cols-3">
          {cards.map((card, i) => (
            <div key={i} className="rounded-2xl border border-border bg-secondary/40 p-6 flex flex-col">
              <h3 className="font-display text-xl mb-1 text-foreground">{card.level}</h3>
              {card.service && <p className="text-sm font-medium text-primary mb-3">{card.service}</p>}
              <p className="text-sm leading-relaxed text-muted-foreground">{card.text}</p>
              {card.link && (
                <SmartLink link={card.link} lang={lang} className={`mt-4 text-sm ${linkCls}`}>{card.service ?? card.level}</SmartLink>
              )}
            </div>
          ))}
        </div>

        {/* 6 (shown before 5) */}
        <H2>{s[6].title}</H2>
        {plain(6).map((x, i) => <P key={i}>{x}</P>)}

        {/* 5 */}
        <H2>{s[5].title}</H2>
        {plain(5).map((x, i) => <P key={i}>{x}</P>)}
        {linkPara(5)}

        {/* 7 */}
        <H2>{s[7].title}</H2>
        <P>{field(s[7].lines, "Intro")}</P>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {s7items.map((x, i) => (
            <div key={i} className="rounded-2xl border border-border bg-secondary/40 p-5">
              <span className="font-display text-2xl text-primary">{i + 1}</span>
              <p className="mt-2 text-sm leading-relaxed text-foreground">{x}</p>
            </div>
          ))}
        </div>

        {/* 8 highlighted */}
        <div className="mt-16 rounded-2xl border border-primary/40 bg-primary/5 p-6 md:p-10">
          <h2 className="font-display text-2xl md:text-3xl mb-4">{s[8].title}</h2>
          {plain(8).map((x, i) => <p key={i} className="text-base md:text-lg leading-relaxed text-foreground mb-4 last:mb-0">{x}</p>)}
        </div>

        {/* 9 */}
        <H2>{s[9].title}</H2>
        {plain(9).map((x, i) => {
          const label = lang === "it" ? "Chi siamo" : lang === "pt" ? "Quem somos" : "About us";
          const idx = x.indexOf(label);
          if (idx < 0) return <P key={i}>{x}</P>;
          return <P key={i}>{x.slice(0, idx)}<a href={pathForLang(lang, "/About_us")} className={linkCls}>{label}</a>{x.slice(idx + label.length)}</P>;
        })}

        {/* 10 */}
        <H2>{s[10].title}</H2>
        <P>{field(s[10].lines, "Intro")}</P>
        <ul className="space-y-3 mb-4">
          {s10items.map((x, i) => {
            const [label, ...rest] = x.split(" — ");
            return (
              <li key={i} className="text-base md:text-lg leading-relaxed text-muted-foreground">
                <strong className="text-foreground">{label}</strong>{rest.length ? ` — ${rest.join(" — ")}` : ""}
              </li>
            );
          })}
        </ul>
        <P>{field(s[10].lines, "Closing line")}</P>

        {/* 11 */}
        <H2>{s[11].title}</H2>
        {plain(11).map((x, i) => <P key={i}>{x}</P>)}

        {/* 12 */}
        <figure className="mt-20 text-center">
          <blockquote className="font-display italic text-2xl md:text-4xl leading-snug text-foreground">
            {epiQuote.map((x, i) => <p key={i} className={i > 0 ? "mt-2 text-lg md:text-xl text-muted-foreground" : ""}>{x}</p>)}
          </blockquote>
          {attribution && <figcaption className="mt-4 text-sm text-muted-foreground">{attribution}</figcaption>}
        </figure>
        <p className="font-display text-3xl md:text-4xl leading-tight mt-12 mb-6">{field(s12, "Headline")}</p>
        {s12text.map((x, i) => <P key={i}>{x}</P>)}

        {/* 13 */}
        <H2>{s[13].title}</H2>
        {plain(13).map((x, i) => <P key={i}>{x}</P>)}
        {linkPara(13)}

        {/* 14 */}
        <H2>{s[14].title}</H2>
        <ul className="list-disc pl-6 space-y-2 text-base md:text-lg leading-relaxed text-muted-foreground mb-4">
          {s14items.map((x, i) => <li key={i}>{x}</li>)}
        </ul>
        <P>{field(s[14].lines, "Closing line")}</P>

        {/* 15 FAQ */}
        <H2>{s[15].title}</H2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map(([q, a], i) => (
            <AccordionItem key={i} value={`q${i}`} className="border-border">
              <AccordionTrigger className="text-left font-display text-lg">{q}</AccordionTrigger>
              <AccordionContent className="text-base leading-relaxed text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* 16 CTA */}
        <div className="mt-16 rounded-2xl border border-border bg-secondary/50 p-6 md:p-8">
          <h2 className="font-display text-2xl md:text-3xl mb-3">{s[16].title}</h2>
          <p className="text-base md:text-lg leading-relaxed text-muted-foreground">{field(s[16].lines, "Text")}</p>
          <a href={MAILTO} className={`mt-6 ${btnCls}`}>{field(s[16].lines, "Button")}</a>
        </div>
      </div>
    </div>
  );
}
