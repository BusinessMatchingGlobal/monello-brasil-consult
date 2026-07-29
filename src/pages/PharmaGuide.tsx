import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Download, CheckCircle2, MailCheck } from "lucide-react";
import { z } from "zod";
import { useT } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import guideAsset from "@/assets/brazil-health-market.pdf.asset.json";
import { useCanonical } from "@/lib/useCanonical";
import { LangSwitcher } from "@/components/LangSwitcher";
import { GuidesMenu } from "@/components/GuidesMenu";

const PDF_URL = guideAsset.url;
const PDF_FILENAME = "Brazil_Health_Market_BMG.pdf";
const SOURCE = "Pharma guide page (/pharma)";

const schema = z.object({
  firstName: z.string().trim().min(1).max(80),
  lastName: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(255),
  company: z.string().trim().max(120).optional(),
  consent: z.literal(true),
});

const c = {
  back: "Back to home",
  eyebrow: "Free guide",
  title: "Brazil's Health Market — an operational guide for European pharma, device and supply-chain companies",
  sub: "Not a market report: an architecture map. Who buys, under which rules, through which entity, at which price ceiling — and what the Brazilian state has decided to reward. Fill in the form to download the guide and, if you wish, subscribe to the #CustoBrasil newsletter.",
  bullets: [
    "The archipelago of mini-markets: public and private, federal and state, retail and hospital",
    "Law 15,471/2026: how the Brazilian state now buys health products",
    "EU–Mercosur interim agreement (in force since 1 May 2026) and what it changes",
    "The tariff door and the procurement door are not the same door — and why it matters",
    "Registration holder, price bands, distribution licence and route to channel",
  ],
  meta: [
    { label: "Format", value: "PDF" },
    { label: "Language", value: "English" },
    { label: "Edition", value: "1.0 · July 2026" },
  ],
  formTitle: "Fill in to download the guide",
  firstName: "First name",
  lastName: "Last name",
  email: "Work email",
  company: "Company (optional)",
  consentLabel: "I have read the",
  consentLink: "privacy notice",
  consentSuffix: "and I consent to the processing of my data to receive the guide and a possible follow-up.",
  consentRequired: "You must accept the privacy notice to download the guide.",
  newsletterLabel: "Also subscribe me to the #CustoBrasil newsletter",
  newsletterHint: "You'll receive a confirmation email to complete the subscription (double opt-in).",
  submit: "Download the guide",
  invalid: "Please check the fields: first name, last name and email are required.",
  successTitle: "Thanks! Your download is ready.",
  successBody: "If the download does not start automatically, use the button below.",
  newsletterSuccess:
    "We've sent you an email: to confirm your newsletter subscription, click the \"Confirm subscription\" link inside the message. If you don't see it, please check your SPAM folder.",
  newsletterError: "Your download is ready, but the newsletter email could not be sent. Please try again shortly.",
  download: "Download the PDF",
  again: "Download for another person",
  fileLabel: "Brazil's Health Market",
};

function triggerDownload() {
  const a = document.createElement("a");
  a.href = PDF_URL;
  a.download = PDF_FILENAME;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export default function PharmaGuide() {
  const { lang } = useT();
  useCanonical("/pharma", {
    title: "Brazil's Health Market — guide for European pharma & device firms | BMG",
    description:
      "Free English guide: how Brazil buys health products after Law 15,471/2026, EU–Mercosur tariffs, registration, price bands and market access.",
  });

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [consent, setConsent] = useState(false);
  const [wantsNewsletter, setWantsNewsletter] = useState(true);
  const [subscribedNewsletter, setSubscribedNewsletter] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!consent) {
      toast({ title: c.consentRequired, variant: "destructive" });
      return;
    }
    const parsed = schema.safeParse({ firstName, lastName, email, company: company || undefined, consent });
    if (!parsed.success) {
      toast({ title: c.invalid, variant: "destructive" });
      return;
    }
    if (wantsNewsletter) {
      try {
        const { error } = await supabase.functions.invoke("newsletter-subscribe", {
          body: {
            email: parsed.data.email,
            firstName: parsed.data.firstName,
            lastName: parsed.data.lastName,
            company: parsed.data.company ?? null,
            language: lang,
            source: SOURCE,
            consent: true,
          },
        });
        if (error) throw error;
        setSubscribedNewsletter(true);
      } catch (err) {
        console.error("Newsletter subscribe failed", err);
        toast({ title: c.newsletterError, variant: "destructive" });
      }
    }
    triggerDownload();
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-5 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            {c.back}
          </Link>
          <div className="flex items-center gap-3">
            <LangSwitcher />
            <span className="text-sm font-medium">Business Matching Global</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 md:py-16">
        <GuidesMenu />
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div>
            <span className="inline-block text-xs uppercase tracking-widest text-primary font-semibold mb-3">{c.eyebrow}</span>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">{c.title}</h1>
            <p className="text-muted-foreground text-lg mb-6">{c.sub}</p>

            <ul className="space-y-3 mb-8">
              {c.bullets.map((b) => (
                <li key={b} className="flex gap-3 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-6 p-4 rounded-lg border border-border bg-card">
              <BookOpen className="h-10 w-10 text-primary flex-shrink-0" />
              <div className="flex-1 min-w-[200px]">
                <p className="font-semibold mb-1">{c.fileLabel}</p>
                <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground">
                  {c.meta.map((m) => (
                    <span key={m.label}>
                      <strong className="text-foreground">{m.label}:</strong> {m.value}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 md:p-8 shadow-sm">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-xl font-semibold mb-2">{c.formTitle}</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="pharmaFirstName">{c.firstName} *</Label>
                    <Input id="pharmaFirstName" required maxLength={80} value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="pharmaLastName">{c.lastName} *</Label>
                    <Input id="pharmaLastName" required maxLength={80} value={lastName} onChange={(e) => setLastName(e.target.value)} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="pharmaEmail">{c.email} *</Label>
                  <Input id="pharmaEmail" type="email" required maxLength={255} value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="pharmaCompany">{c.company}</Label>
                  <Input id="pharmaCompany" maxLength={120} value={company} onChange={(e) => setCompany(e.target.value)} />
                </div>
                <label className="flex items-start gap-3 text-sm text-muted-foreground pt-2">
                  <Checkbox checked={consent} onCheckedChange={(v) => setConsent(v === true)} className="mt-0.5" />
                  <span>
                    {c.consentLabel}{" "}
                    <Link to="/privacy" className="text-primary underline">
                      {c.consentLink}
                    </Link>{" "}
                    {c.consentSuffix}
                  </span>
                </label>
                <label className="flex items-start gap-3 text-sm text-muted-foreground">
                  <Checkbox checked={wantsNewsletter} onCheckedChange={(v) => setWantsNewsletter(v === true)} className="mt-0.5" />
                  <span>
                    {c.newsletterLabel}
                    <span className="block text-xs opacity-80 mt-0.5">{c.newsletterHint}</span>
                  </span>
                </label>
                <Button type="submit" size="lg" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  {c.submit}
                </Button>
              </form>
            ) : (
              <div className="text-center py-6">
                <CheckCircle2 className="h-12 w-12 text-primary mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2">{c.successTitle}</h2>
                <p className="text-muted-foreground mb-6">{c.successBody}</p>
                {subscribedNewsletter && (
                  <div className="mb-4 rounded-lg border border-primary/30 bg-primary/5 p-4 text-left">
                    <div className="flex gap-3">
                      <MailCheck className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-foreground leading-relaxed">{c.newsletterSuccess}</p>
                    </div>
                  </div>
                )}
                <Button onClick={triggerDownload} size="lg" className="w-full mb-3">
                  <Download className="mr-2 h-4 w-4" />
                  {c.download}
                </Button>
                <button
                  type="button"
                  onClick={() => {
                    setFirstName(""); setLastName(""); setEmail(""); setCompany(""); setConsent(false); setSubmitted(false);
                  }}
                  className="text-sm text-muted-foreground hover:text-foreground underline"
                >
                  {c.again}
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
