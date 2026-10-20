import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Nav } from "./AboutUs";
import { ServiceCard } from "./OurServices";
import { SiteContactForm } from "@/components/SiteContactForm";
import { SiteFooter } from "@/components/SiteFooter";
import { ServiceRequestDialog } from "@/components/ServiceRequestDialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useT } from "@/lib/i18n";
import { SITE, useCanonical } from "@/lib/useCanonical";
import { HREFLANG, pathForLang } from "@/lib/langPath";
import { familyCopy, familyPath, getServiceFamilies, type ServiceFamilyKey } from "@/data/serviceFamilies";

export default function ServiceFamily({ familyKey }: { familyKey: ServiceFamilyKey }) {
  const { lang } = useT();
  const { hash, key } = useLocation();
  const [requested, setRequested] = useState<string | null>(null);
  const family = getServiceFamilies(lang).find(f => f.key === familyKey);
  const path = familyPath(familyKey, lang);
  useCanonical(path, {
    title: `${family?.title} — Business Matching Global`,
    description: family?.intro,
    alternates: [
      ...(["en", "it", "pt"] as const).map(l => ({ hreflang: HREFLANG[l], href: SITE + pathForLang(l, familyPath(familyKey, l)) })),
      { hreflang: "x-default", href: SITE + familyPath(familyKey, "en") },
    ],
  });
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
      if (target) target.scrollIntoView();
      else window.scrollTo(0, 0);
    });
    return () => cancelAnimationFrame(frame);
  }, [hash, key]);
  useEffect(() => { setRequested(null); }, [familyKey]);
  if (!family) return null;
  const matching = lang === "it" ? "/servizi/business-matching" : lang === "pt" ? "/servicos/business-matching" : "/services/business-matching";
  return <div className="min-h-screen bg-background text-foreground">
    <Nav />
    <main>
      <section className="pt-32 md:pt-44 pb-12 md:pb-16">
        <div className="container max-w-4xl">
          <span className="text-xs tracking-wider uppercase text-primary mb-4 inline-block">Business Matching Global</span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight">{family.title}</h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed text-justify">{family.intro}</p>
          {familyKey === "find" && <Link to={matching} className="mt-4 inline-block text-primary underline">{familyCopy[lang].matching}</Link>}
        </div>
      </section>
      <section className="py-16 md:py-24 bg-foreground text-background">
        <div className="container max-w-6xl grid gap-5 md:grid-cols-2">
          {family.items.map(item => <ServiceCard key={item.name} item={item} onRequest={setRequested} />)}
          {family.levels.length > 0 && <div data-service-card="Export Desk" className="p-6 md:p-7 rounded-2xl bg-background/[0.04] border border-background/10">
            <h3 className="font-display text-xl md:text-2xl">Export Desk</h3>
            <p className="text-background/70 mt-2 mb-5 leading-relaxed">{familyCopy[lang].desk}</p>
            <Tabs defaultValue="0">
              <TabsList className="h-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-1 bg-background/10">
                {family.levels.map((item, i) => <TabsTrigger key={item.name} value={String(i)} className="whitespace-normal text-left justify-start text-background/80 data-[state=active]:bg-background data-[state=active]:text-foreground">{familyCopy[lang].levels[i]}</TabsTrigger>)}
              </TabsList>
              {family.levels.map((item, i) => <TabsContent key={item.name} value={String(i)} className="pt-4">
                <ServiceCard item={item} onRequest={setRequested} framed={false} />
              </TabsContent>)}
            </Tabs>
          </div>}
        </div>
      </section>
      {familyKey !== "decide" && <div className="container max-w-4xl pt-12">
        <Link to={familyPath("decide", lang) + "#check-up"} className="text-primary underline leading-relaxed">{familyCopy[lang].start}</Link>
      </div>}
      <SiteContactForm />
    </main>
    <SiteFooter />
    <ServiceRequestDialog service={requested} onOpenChange={open => { if (!open) setRequested(null); }} />
  </div>;
}