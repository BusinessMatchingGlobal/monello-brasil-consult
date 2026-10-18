import { Link } from "react-router-dom";
import { Nav } from "@/pages/AboutUs";
import { InfoBar } from "@/pages/OurServices";
import { useCanonical, SITE } from "@/lib/useCanonical";
import { BEFORE_YOU_CHOOSE_PT as copy, EXPORTPLANNING_URL } from "@/data/beforeYouChoose.pt";

function Paragraph({ text }: { text: string }) {
  const label = "uma análise publicada com a ExportPlanning";
  const index = text.indexOf(label);
  return (
    <p className="text-base md:text-lg leading-relaxed text-muted-foreground text-justify">
      {index < 0 ? text : <>{text.slice(0, index)}<a href={EXPORTPLANNING_URL} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">{label}</a>{text.slice(index + label.length)}</>}
    </p>
  );
}

export default function BeforeYouChoose() {
  useCanonical("/before-you-choose", {
    title: copy.title,
    description: copy.description,
    alternates: [{ hreflang: "pt-BR", href: `${SITE}/pt/before-you-choose` }],
  });
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main className="container max-w-3xl pt-32 md:pt-40 pb-16 md:pb-24">
        <h1 className="font-display text-4xl md:text-5xl leading-tight mb-8">{copy.title}</h1>
        <Paragraph text={copy.intro} />
        {copy.sections.map((section) => (
          <section key={section.anchor} id={section.anchor} className="mt-14 md:mt-16 scroll-mt-28">
            <h2 className="font-display text-2xl md:text-3xl mb-6">{section.title}</h2>
            <div className="space-y-6">
              {section.blocks.map((block, i) => "paragraph" in block
                ? <Paragraph key={i} text={block.paragraph} />
                : <ul key={i} className="list-disc pl-6 space-y-3 text-base md:text-lg leading-relaxed text-muted-foreground">{block.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>)}
            </div>
          </section>
        ))}
        <p className="mt-16 border-t border-border pt-8 text-sm"><Link to="/" className="text-primary underline underline-offset-4">Business Matching Global</Link></p>
      </main>
      <InfoBar />
    </div>
  );
}