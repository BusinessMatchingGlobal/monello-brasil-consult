import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight, Check, ChevronDown, Mail, Menu, X } from "lucide-react";
import { AnalysisNavMenu } from "@/components/AnalysisNavMenu";
import { useT, Lang } from "@/lib/i18n";
import { useCanonical } from "@/lib/useCanonical";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { trackContactForm } from "@/lib/analytics";
import { ServiceRequestDialog } from "@/components/ServiceRequestDialog";
import { SampleReportBlock } from "@/components/SampleReportBlock";
import { getServicesCatalog, type ServiceItem } from "@/data/servicesCatalog";
import type { FormEvent } from "react";
import logoBMG from "@/assets/logo-business-matching-global-transparent.png.asset.json";

function LangSwitcher() {
  const { lang, setLang } = useT();
  const langs: Lang[] = ["en", "it", "pt"];
  return (
    <div className="inline-flex items-center gap-1 text-xs font-medium tracking-wider uppercase">
      {langs.map((l, i) => (
        <div key={l} className="flex items-center">
          <button
            onClick={() => setLang(l)}
            className={`px-1.5 py-1 transition-colors ${
              lang === l ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {l === "pt" ? "PT-BR" : l.toUpperCase()}
          </button>
          {i < langs.length - 1 && <span className="text-border">/</span>}
        </div>
      ))}
    </div>
  );
}

import { Nav } from "./AboutUs";
export { Nav };

function ServiceCard({ item, onRequest }: { item: ServiceItem; onRequest: (n: string) => void }) {
  const [open, setOpen] = useState(false);
  const { lang } = useT();
  const { intro: servicesIntro } = getServicesCatalog(lang);
  return (
    <div className="p-6 md:p-7 rounded-2xl bg-background/[0.04] border border-background/10 hover:border-primary/60 transition-colors flex flex-col">
      <h3 className="font-display text-xl md:text-2xl text-background">{item.name}</h3>
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

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="md:hidden self-start mb-4 inline-flex items-center gap-1 text-sm text-primary"
      >
        {servicesIntro.more} <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <SampleReportBlock url={item.sampleReport} className="mb-5" />

      <div className="mt-auto pt-5 border-t border-background/10 flex items-center justify-between gap-4 flex-wrap">
        <span className="text-sm text-background/80">{item.price}</span>
        <button
          type="button"
          onClick={() => onRequest(item.name)}
          className="inline-flex items-center gap-1 text-sm text-primary hover:text-amber transition-colors"
        >
          {servicesIntro.request} <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function Services({ onRequest }: { onRequest: (n: string) => void }) {
  const { lang } = useT();
  const { groups: serviceGroups } = getServicesCatalog(lang);
  return (
    <section className="py-16 md:py-24 bg-foreground text-background">
      <div className="container max-w-6xl space-y-16">
        {serviceGroups.map((g) => (
          <div key={g.num}>
            <div className="mb-8">
              <span className="text-xs tracking-wider uppercase text-primary">{g.num} —</span>
              <h2 className="font-display text-2xl md:text-3xl text-background mt-1 uppercase tracking-wide">
                {g.label}
              </h2>
              {g.note && <p className="text-background/70 mt-2 italic">{g.note}</p>}
            </div>
            <div className={`grid gap-5 ${g.items.length === 1 ? "md:grid-cols-1 max-w-3xl" : "md:grid-cols-2"}`}>
              {g.items.map((item) => (
                <ServiceCard key={item.name} item={item} onRequest={onRequest} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
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

function ContactSection() {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const d = new FormData(form);
    const name = String(d.get("name") || "").trim();
    const email = String(d.get("email") || "").trim();
    const company = String(d.get("company") || "").trim();
    const phone = String(d.get("phone") || "").trim();
    const message = String(d.get("message") || "").trim();
    if (!name || !email || !message) {
      toast.error("Compila nome, email e messaggio.");
      return;
    }
    if (d.get("consent") !== "on") {
      toast.error("È necessario accettare l'informativa privacy.");
      return;
    }
    setSubmitting(true);
    trackContactForm("submit", 'Our Services — contact form');
    try {
      const { error } = await supabase.functions.invoke("send-contact-notification", {
        body: {
          idempotencyKey: `services-contact-${email}-${Date.now()}`,
          templateData: {
            name,
            email,
            company: company || "—",
            message: `Telefono: ${phone || "—"}\n\n${message}`,
            source: "Our Services — contact form",
            submittedAt: new Date().toISOString(),
          },
        },
      });
      if (error) throw error;
      trackContactForm("success", 'Our Services — contact form');
      toast.success("Messaggio inviato. Grazie!");
      form.reset();
    } catch (err) {
      trackContactForm("error", 'Our Services — contact form');
      console.error("Contact send failed", err);
      toast.error("Invio non riuscito. Riprova o scrivici via email.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contatti" className="py-16 md:py-24 bg-foreground text-background">
      <div className="container max-w-5xl grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="font-display text-3xl md:text-4xl text-background mb-5">Parliamo del tuo caso</h2>
          <p className="text-background/70 leading-relaxed mb-8">
            Raccontaci brevemente cosa ti serve: rispondiamo con una proposta di perimetro, tempi e prezzo.
          </p>
          <a href="mailto:info@businessmatching.global" className="inline-flex items-center gap-3 text-background/85 hover:text-primary transition-colors">
            <Mail className="h-4 w-4" /> info@businessmatching.global
          </a>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="c-name" className="text-background/70 text-xs tracking-wider uppercase">Nome *</Label>
              <Input id="c-name" name="name" required maxLength={100} className="mt-2 bg-background/[0.04] border-background/15 text-background" />
            </div>
            <div>
              <Label htmlFor="c-email" className="text-background/70 text-xs tracking-wider uppercase">Email *</Label>
              <Input id="c-email" name="email" type="email" required maxLength={255} className="mt-2 bg-background/[0.04] border-background/15 text-background" />
            </div>
            <div>
              <Label htmlFor="c-company" className="text-background/70 text-xs tracking-wider uppercase">Azienda</Label>
              <Input id="c-company" name="company" maxLength={150} className="mt-2 bg-background/[0.04] border-background/15 text-background" />
            </div>
            <div>
              <Label htmlFor="c-phone" className="text-background/70 text-xs tracking-wider uppercase">Telefono</Label>
              <Input id="c-phone" name="phone" maxLength={40} className="mt-2 bg-background/[0.04] border-background/15 text-background" />
            </div>
          </div>
          <div>
            <Label htmlFor="c-message" className="text-background/70 text-xs tracking-wider uppercase">Messaggio *</Label>
            <Textarea id="c-message" name="message" required rows={5} maxLength={2000} className="mt-2 bg-background/[0.04] border-background/15 text-background resize-none" />
          </div>
          <label className="flex items-start gap-3 text-xs text-background/70 leading-relaxed cursor-pointer">
            <input type="checkbox" name="consent" required className="mt-0.5 h-4 w-4 accent-primary" />
            <span>
              Acconsento al trattamento dei dati secondo la{" "}
              <Link to="/privacy" className="underline hover:text-background">privacy policy</Link>.
            </span>
          </label>
          <Button type="submit" size="lg" disabled={submitting} className="rounded-full w-full h-12">
            {submitting ? "…" : "Invia"} <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </form>
      </div>
    </section>
  );
}

export function InfoBar() {
  return (
    <footer className="py-8 border-t border-border/60">
      <div className="container text-xs text-muted-foreground text-center leading-relaxed space-y-2">
        <p className="text-sm font-medium text-foreground">Business Matching Global</p>
        <p>
          ENZO ALDO STOBBIONE LTDA · CNPJ: 67.589.228/0001-30 · Avenida Getúlio Vargas, 671, Sala 500, CEP 30.112-021, Savassi, Belo Horizonte/MG — Brasile
        </p>
        <p>
          <a href="mailto:info@businessmatching.global" className="hover:text-foreground underline">info@businessmatching.global</a>
          {" · "}
          <a href="https://www.businessmatching.global" className="hover:text-foreground underline">www.businessmatching.global</a>
          {" · "}
          <Link to="/privacy" className="hover:text-foreground underline">Privacy</Link>
        </p>
      </div>
    </footer>
  );
}

export default function OurServices() {
  const { lang } = useT();
  const [requested, setRequested] = useState<string | null>(null);
  const { intro: servicesIntro } = getServicesCatalog(lang);
  useCanonical("/Our_Services", {
    title:
      lang === "it"
        ? "I nostri servizi — Business Matching Global"
        : lang === "pt"
        ? "Nossos serviços — Business Matching Global"
        : "Our services — Business Matching Global",
    description:
      lang === "it"
        ? "Dal controllo di una singola azienda al progetto completo di ingresso nel mercato: verifiche, analisi di mercato, ricerca buyer e business matching tra Europa, Brasile e America Latina."
        : lang === "pt"
        ? "Da verificação de uma única empresa ao projeto completo de entrada no mercado: checagens, análises de mercado, busca de buyers e business matching entre Europa, Brasil e América Latina."
        : "From checking a single company to a full market-entry project: counterparty checks, market analysis, buyer search and business matching between Europe, Brazil and Latin America.",
  });


  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <section className="pt-32 md:pt-44 pb-12 md:pb-16">
          <div className="container max-w-4xl">
            <span className="text-xs tracking-wider uppercase text-primary mb-4 inline-block">
              Business Matching Global
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight">
              {servicesIntro.title}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed text-justify">
              {servicesIntro.intro}
            </p>
            <p className="mt-4 text-sm tracking-wide text-foreground/80">{servicesIntro.markets}</p>
          </div>
        </section>
        <Services onRequest={setRequested} />
        <Notes />
        <ContactSection />
      </main>
      <InfoBar />
      <ServiceRequestDialog service={requested} onOpenChange={(o) => !o && setRequested(null)} />
    </div>
  );
}
