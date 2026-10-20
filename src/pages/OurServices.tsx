import { SiteContactForm } from "@/components/SiteContactForm";
import { SiteFooter } from "@/components/SiteFooter";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, ArrowRight, Check, ChevronDown } from "lucide-react";
import { useT } from "@/lib/i18n";
import { useCanonical } from "@/lib/useCanonical";
import { Button } from "@/components/ui/button";
import { SampleReportBlock } from "@/components/SampleReportBlock";
import { getServicesCatalog, type ServiceItem } from "@/data/servicesCatalog";
import { getServiceFamilies, familyCopy, serviceCardId } from "@/data/serviceFamilies";
import { SERVICE_ANCHORS, SERVICE_GROUP_FAMILIES } from "@/lib/siteNavigation";
import { Nav } from "./AboutUs";
export { Nav };

export function ServiceCard({ item, onRequest, framed = true }: { item: ServiceItem; onRequest: (n: string) => void; framed?: boolean }) {
  const [open, setOpen] = useState(false);
  const { lang } = useT();
  const { intro: servicesIntro } = getServicesCatalog(lang);
  return (
    <div id={framed ? serviceCardId(item) : undefined} data-service-card={framed ? item.name : undefined} className={framed ? "scroll-mt-28 p-6 md:p-7 rounded-2xl bg-background/[0.04] border border-background/10 hover:border-primary/60 transition-colors flex flex-col" : "flex flex-col"}>
      <h3 className="font-display text-xl md:text-2xl text-background">{item.name}</h3>
      {item.name.includes("Check-up") && <p className="text-background/85 mt-2 leading-relaxed">{familyCopy[lang].checkup}</p>}
      <p className="text-background/70 mt-2 mb-5 leading-relaxed">{item.tagline}</p>
      <ul className="space-y-2.5 mb-5">
        {item.bullets.map((b) => (
          <li key={b} className="flex gap-2.5 text-sm text-background/85">
            <Check className="h-4 w-4 mt-0.5 text-primary shrink-0" />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <div className={`${open ? "block" : "hidden"} md:block`}>
        <p className="text-xs tracking-wider uppercase text-background/60 mb-2">{servicesIntro.forWhom}</p>
        <ul className="space-y-2 mb-4 list-disc pl-5 text-sm text-background/75">
          {item.audience.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
        {item.examples && <p className="text-sm italic text-background/60 mb-4">{item.examples}</p>}
      </div>

      <Button variant="link"
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="md:hidden self-start h-auto p-0 mb-4 inline-flex items-center gap-1 text-sm text-primary"
      >
        {servicesIntro.more} <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </Button>

      <SampleReportBlock url={item.sampleReport} className="mb-5" />

      <div className="mt-auto pt-5 border-t border-background/10 flex items-center justify-between gap-4 flex-wrap">
        <span className="text-sm text-background/80">{item.price}</span>
        <Button variant="link"
          type="button"
          onClick={() => onRequest(item.name)}
          className="h-auto p-0 inline-flex items-center gap-1 text-sm text-primary hover:text-amber transition-colors"
        >
          {servicesIntro.request} <ArrowUpRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function Notes() {
  const { lang } = useT();
  const { notes: servicesNotes } = getServicesCatalog(lang);
  return (
    <section className="py-14 md:py-20 border-t border-border/60">
      <div className="container max-w-4xl">
        <h2 className="text-xs tracking-wider uppercase text-muted-foreground mb-5">{servicesNotes.title}</h2>
        <ul className="space-y-3 text-sm text-muted-foreground text-justify">
          {servicesNotes.items.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function OurServices() {
  const { lang } = useT();
  const { hash, key } = useLocation();
  const families = getServiceFamilies(lang);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const section = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
      if (section) section.scrollIntoView();
      else window.scrollTo(0, 0);
    });
    return () => cancelAnimationFrame(frame);
  }, [hash, key]);
  const { intro } = getServicesCatalog(lang);
  useCanonical("/Our_Services", { title: `${intro.title} — Business Matching Global`, description: intro.intro });
  return <div className="min-h-screen bg-background text-foreground">
    <Nav />
    <main>
      <section className="pt-32 md:pt-44 pb-12 md:pb-16">
        <div className="container max-w-4xl">
          <span className="text-xs tracking-wider uppercase text-primary mb-4 inline-block">Business Matching Global</span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight">{intro.title}</h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed text-justify">{intro.intro}</p>
          <p className="mt-4 text-sm tracking-wide text-foreground/80">{intro.markets}</p>
          <p className="mt-6 text-lg text-muted-foreground">{familyCopy[lang].overview}</p>
        </div>
      </section>
      <section className="py-16 md:py-24 bg-foreground text-background">
        <div className="container max-w-6xl">
          {families.map((family, i) => <div key={family.key} className="py-10 first:pt-0 border-b border-background/10 last:border-0">
            {SERVICE_ANCHORS.filter((_, idx) => SERVICE_GROUP_FAMILIES[idx] === family.key).map(anchor => <span key={anchor} id={anchor} className="block scroll-mt-28" />)}
            <span className="text-xs tracking-wider uppercase text-primary">0{i + 1} —</span>
            <h2 className="font-display text-2xl md:text-3xl mt-1">{family.title}</h2>
            <p className="text-background/70 mt-4 max-w-3xl leading-relaxed">{family.intro}</p>
            <ul className="mt-5 space-y-2 text-background/85">
              {family.items.map(item => <li key={item.name}>{item.name}</li>)}
              {family.levels.length > 0 && <li>Export Desk</li>}
            </ul>
            <Button asChild variant="link" className="text-primary h-auto p-0 mt-6 whitespace-normal text-left">
              <Link to={family.path}>{family.title} <ArrowRight className="h-4 w-4 shrink-0 ml-2" /></Link>
            </Button>
          </div>)}
        </div>
      </section>
      <Notes />
      <SiteContactForm />
    </main>
    <SiteFooter />
  </div>;
}
