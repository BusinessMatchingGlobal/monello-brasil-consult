import { Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowRight, ArrowUpRight, Banknote, FileSearch, MapPin, ShieldCheck } from "lucide-react";
import { useT } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { SiteContactForm } from "@/components/SiteContactForm";
import { HomeNewsletter, FooterInner } from "@/components/SiteFooter";
import { useCanonical } from "@/lib/useCanonical";
import { homepageCopy } from "@/data/homepage";
import { homepageSeo } from "@/data/homepageSeo";
import { hasSituations, situationContent, STARTING_POINT } from "@/data/situations";
import { Nav } from "./AboutUs";
export { FooterInner };

function Hero() {
  const { lang } = useT();
  const c = homepageCopy[lang].hero;
  return (
    <section id="top" className="pt-32 md:pt-40 pb-14 md:pb-20">
      <div className="container max-w-6xl">
        <p className="font-display text-xl md:text-2xl mb-6">Business Matching <span className="text-primary">Global</span></p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl leading-[1.1] max-w-4xl tracking-normal">{c.title}</h1>
        <p className="mt-6 text-xl md:text-2xl text-foreground/85 max-w-3xl">{c.subtitle}</p>
        <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl">{c.intro}</p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-center">
          <Button asChild size="lg" className="rounded-full min-h-12 h-auto py-3 px-6 whitespace-normal"><a href="#contact">{c.contact}<ArrowRight className="ml-2 h-4 w-4 shrink-0" /></a></Button>
          <Button asChild size="lg" variant="outline" className="rounded-full min-h-12 h-auto py-3 px-6"><Link to="/How_we_work">{c.method}</Link></Button>
        </div>
        <p className="mt-6 text-sm text-muted-foreground leading-relaxed max-w-3xl">{c.note.split("\n").map((line, i) => (i === 0 ? <em key={i} className="italic">{line}</em> : <span key={i}>{line}</span>)).reduce<React.ReactNode[]>((acc, el, i) => (i === 0 ? [el] : [...acc, <br key={`br-${i}`} />, el]), []).map((el, i) => el)}</p>
      </div>
    </section>
  );
}

function Commitments() {
  const { lang } = useT();
  const icons = [Banknote, FileSearch, MapPin, ShieldCheck];
  const destinations = ["/ethics", "/How_we_work", "/Our_Services", "/ethics"];
  return (
    <section className="border-y border-border/60 bg-muted/30 py-12 md:py-16">
      <div className="container max-w-6xl grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-7">
        {homepageCopy[lang].commitments.map((item, i) => {
          const Icon = icons[i];
          return <Link key={item.title} to={destinations[i]} className="group block focus-visible:outline-primary">
            <Icon className="h-6 w-6 text-primary mb-5" aria-hidden="true" />
            <h2 className="text-xl leading-snug mb-3 tracking-normal group-hover:text-primary transition-colors">{item.title}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
            <ArrowUpRight className="h-4 w-4 text-primary mt-4" aria-hidden="true" />
          </Link>;
        })}
      </div>
    </section>
  );
}

function PreliminaryChecks() {
  const { lang } = useT();
  const c = homepageCopy[lang].checks;
  return (
    <section className="py-16 md:py-24">
      <div className="container max-w-6xl grid lg:grid-cols-2 gap-10 lg:gap-16">
        <div>
          <h2 className="text-3xl md:text-4xl leading-tight max-w-xl tracking-normal">{c.title}</h2>
          <p className="mt-6 text-muted-foreground leading-relaxed max-w-xl">{c.territory}</p>
          <p className="mt-5 text-sm text-muted-foreground leading-relaxed max-w-xl">{c.closing}</p>
        </div>
        <ul className="divide-y divide-border">
          {c.questions.map((question) => <li key={question} className="py-6 first:pt-0 flex items-start gap-4"><FileSearch className="text-primary h-5 w-5 shrink-0 mt-1" aria-hidden="true" /><h3 className="text-xl leading-relaxed tracking-normal">{question}</h3></li>)}
        </ul>
      </div>
    </section>
  );
}

function Services() {
  const { lang } = useT();
  const c = homepageCopy[lang].services;
  return (
    <section id="services" className="py-16 md:py-24 bg-foreground text-background">
      <div className="container max-w-6xl">
        <h2 className="text-3xl md:text-4xl text-background tracking-normal">{c.title}</h2>
        <p className="mt-5 mb-10 text-lg text-background/75 leading-relaxed max-w-3xl">{c.intro}</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {c.items.map((item, i) => <article key={item.title} className={`p-6 md:p-7 rounded-lg border ${i === 5 ? "border-amber bg-background/10" : "border-background/15 bg-background/[0.04]"}`}>
            <h3 className="text-xl text-background leading-snug mb-4 tracking-normal">{item.title}</h3>
            <p className="text-background/75 leading-relaxed text-sm">{item.text}</p>
          </article>)}
        </div>
        <p className="mt-8 text-background/85 leading-relaxed">{c.experience}</p>
        <a href="https://www.brazilbeautydesk.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-3 text-sm text-background/75 underline underline-offset-4 hover:text-background">{c.beauty}<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
        <div className="mt-9 flex flex-col sm:flex-row sm:items-center gap-6">
          <Button asChild size="lg" variant="secondary" className="rounded-full bg-background text-foreground hover:bg-background/90"><Link to="/Our_Services">{c.cta}<ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
          <Link to="/sample-report" className="inline-flex items-center gap-2 text-sm text-background/75 underline underline-offset-4 hover:text-background">{c.sample}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
}

function StartingPoint() {
  const { lang } = useT();
  const copy = STARTING_POINT[lang] ?? STARTING_POINT.en;
  if (!hasSituations(lang) && lang !== "pt") return null;
  const already = situationContent("already-in-brazil", lang);
  const back = situationContent("back-to-brazil", lang);
  const cards = [
    { to: "/Our_Services", title: copy.notYet.title, text: copy.notYet.text },
    ...(hasSituations(lang) ? [
      { to: already.slug, title: already.cardTitle, text: already.cardText },
      { to: back.slug, title: back.cardTitle, text: back.cardText },
    ] : []),
  ];
  return (
    <section className="py-12 md:py-16 border-b border-border/60">
      <div className="container max-w-6xl">
        <h2 className="text-2xl md:text-3xl mb-7 tracking-normal">{copy.title}</h2>
        <div className={`grid gap-5 ${cards.length > 1 ? "md:grid-cols-3" : "max-w-xl"}`}>
          {cards.map((card) => <Link key={card.to} to={card.to} className="group p-6 rounded-lg border border-border bg-card hover:border-primary/60 transition-colors block">
            <h3 className="text-xl mb-3 tracking-normal">{card.title}</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">{card.text}</p>
            <ArrowRight className="h-4 w-4 text-primary mt-4" aria-hidden="true" />
          </Link>)}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const { lang } = useT();
  const c = homepageCopy[lang].method;
  return (
    <section id="how" className="py-16 md:py-24">
      <div className="container max-w-6xl">
        <h2 className="text-3xl md:text-4xl mb-10 tracking-normal">{c.title}</h2>
        <div className="grid md:grid-cols-3 gap-9 md:gap-12">
          {c.steps.map((step, i) => <div key={step.title}>
            <p className="text-amber font-display text-4xl mb-4">0{i + 1}</p>
            <h3 className="text-xl mb-3 tracking-normal">{step.title}</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">{step.text}</p>
          </div>)}
        </div>
        <div className="mt-12 border-l-2 border-amber pl-6 max-w-3xl">
          <p className="font-display text-xl italic">Verba volant, scripta manent.</p>
          <p className="mt-3 text-muted-foreground leading-relaxed">{c.closing}</p>
        </div>
        <Button asChild variant="link" className="mt-6 px-0"><Link to="/How_we_work">{c.title}<ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
      </div>
    </section>
  );
}

export default function Index() {
  const { lang } = useT();
  const c = homepageCopy[lang];
  useCanonical("/", { ...homepageSeo[lang], image: "https://businessmatching.global/og-image.jpg" });
  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : lang;
    const faq = document.getElementById("ld-faq-sitewide");
    const parent = faq?.parentNode;
    faq?.remove();
    return () => {
      if (faq && parent && !document.getElementById("ld-faq-sitewide")) parent.appendChild(faq);
    };
  }, [lang]);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <Commitments />
        <PreliminaryChecks />
        <Services />
        <StartingPoint />
        <HowItWorks />
        <SiteContactForm copy={c.contact} />
        <HomeNewsletter />
      </main>
      <FooterInner />
    </div>
  );
}
