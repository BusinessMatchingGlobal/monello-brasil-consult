import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Download, CheckCircle2 } from "lucide-react";
import { z } from "zod";
import { useT, type Lang } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ebookAsset from "@/assets/ebook-exporting-to-brazil.pdf.asset.json";
import { useCanonical } from "@/lib/useCanonical";
import { openIubendaNewsletter } from "@/lib/consent";

const PDF_URL = ebookAsset.url;
const PDF_FILENAME = "Exporting_to_Brazil_EU_Manual_BMG.pdf";

const schema = z.object({
  firstName: z.string().trim().min(1).max(80),
  lastName: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(255),
  company: z.string().trim().max(120).optional(),
  consent: z.literal(true),
});

type Copy = {
  back: string;
  eyebrow: string;
  title: string;
  sub: string;
  bullets: string[];
  meta: { label: string; value: string }[];
  formTitle: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  consentLabel: string;
  consentLink: string;
  consentSuffix: string;
  consentRequired: string;
  newsletterLabel: string;
  newsletterHint: string;
  submit: string;
  invalid: string;
  successTitle: string;
  successBody: string;
  newsletterSuccess: string;
  download: string;
  again: string;
  fileLabel: string;
};

const copy: Record<Lang, Copy> = {
  it: {
    back: "Torna alla home",
    eyebrow: "Ebook gratuito",
    title: "Newsletter & Ebook — Esportare in Brasile",
    sub: "Scarica gratuitamente il nostro manuale \"Exporting to Brazil — EU Manual\": una guida pratica per le imprese europee che vogliono affacciarsi sul mercato brasiliano. Compila il form per ricevere l'ebook e, se vuoi, iscriviti anche alla nostra newsletter #CustoBrasil.",
    bullets: [
      "Panoramica del mercato brasiliano per le imprese UE",
      "Procedure di import/export e requisiti doganali",
      "Aspetti fiscali, normativi e logistici principali",
      "Errori comuni da evitare e consigli operativi",
    ],
    meta: [
      { label: "Formato", value: "PDF" },
      { label: "Lingua", value: "Inglese" },
      { label: "Contenuto", value: "Manuale operativo" },
    ],
    formTitle: "Compila per scaricare l'ebook",
    firstName: "Nome",
    lastName: "Cognome",
    email: "Email professionale",
    company: "Azienda (facoltativo)",
    consentLabel: "Ho letto l'",
    consentLink: "informativa privacy",
    consentSuffix: "e acconsento al trattamento dei miei dati per ricevere l'ebook e un eventuale follow-up.",
    consentRequired: "Devi accettare l'informativa privacy per scaricare l'ebook.",
    newsletterLabel: "Iscrivimi anche alla newsletter #CustoBrasil",
    newsletterHint: "Riceverai un'email di conferma per completare l'iscrizione (double opt-in).",
    submit: "Scarica l'ebook",
    invalid: "Controlla i campi: nome, cognome ed email sono obbligatori.",
    successTitle: "Grazie! Il download è pronto.",
    successBody: "Se il download non parte automaticamente, usa il pulsante qui sotto.",
    newsletterSuccess: "Completa il popup newsletter: dopo aver premuto Continua riceverai l'email di conferma.",
    download: "Scarica il PDF",
    again: "Scarica per un'altra persona",
    fileLabel: "Exporting to Brazil — EU Manual",
  },
  en: {
    back: "Back to home",
    eyebrow: "Free ebook",
    title: "Newsletter & Ebook — Exporting to Brazil",
    sub: "Download our free manual \"Exporting to Brazil — EU Manual\": a practical guide for European companies approaching the Brazilian market. Fill in the form to receive the ebook and, if you wish, also subscribe to our #CustoBrasil newsletter.",
    bullets: [
      "Overview of the Brazilian market for EU companies",
      "Import/export procedures and customs requirements",
      "Key tax, regulatory and logistics aspects",
      "Common mistakes to avoid and practical tips",
    ],
    meta: [
      { label: "Format", value: "PDF" },
      { label: "Language", value: "English" },
      { label: "Content", value: "Operational manual" },
    ],
    formTitle: "Fill in to download the ebook",
    firstName: "First name",
    lastName: "Last name",
    email: "Work email",
    company: "Company (optional)",
    consentLabel: "I have read the",
    consentLink: "privacy notice",
    consentSuffix: "and I consent to the processing of my data to receive the ebook and a possible follow-up.",
    consentRequired: "You must accept the privacy notice to download the ebook.",
    newsletterLabel: "Also subscribe me to the #CustoBrasil newsletter",
    newsletterHint: "You'll receive a confirmation email to complete the subscription (double opt-in).",
    submit: "Download the ebook",
    invalid: "Please check the fields: first name, last name and email are required.",
    successTitle: "Thanks! Your download is ready.",
    successBody: "If the download does not start automatically, use the button below.",
    newsletterSuccess: "Complete the newsletter popup: after pressing Continue, you'll receive the confirmation email.",
    download: "Download the PDF",
    again: "Download for another person",
    fileLabel: "Exporting to Brazil — EU Manual",
  },
  pt: {
    back: "Voltar para a home",
    eyebrow: "Ebook gratuito",
    title: "Newsletter & Ebook — Exportando para o Brasil",
    sub: "Baixe gratuitamente nosso manual \"Exporting to Brazil — EU Manual\": um guia prático para empresas europeias que desejam entrar no mercado brasileiro. Preencha o formulário para receber o ebook e, se quiser, inscreva-se também na nossa newsletter #CustoBrasil.",
    bullets: [
      "Panorama do mercado brasileiro para empresas da UE",
      "Procedimentos de importação/exportação e requisitos alfandegários",
      "Principais aspectos fiscais, regulatórios e logísticos",
      "Erros comuns a evitar e dicas práticas",
    ],
    meta: [
      { label: "Formato", value: "PDF" },
      { label: "Idioma", value: "Inglês" },
      { label: "Conteúdo", value: "Manual operacional" },
    ],
    formTitle: "Preencha para baixar o ebook",
    firstName: "Nome",
    lastName: "Sobrenome",
    email: "E-mail profissional",
    company: "Empresa (opcional)",
    consentLabel: "Li o",
    consentLink: "aviso de privacidade",
    consentSuffix: "e concordo com o tratamento dos meus dados para receber o ebook e um possível follow-up.",
    consentRequired: "Você precisa aceitar o aviso de privacidade para baixar o ebook.",
    newsletterLabel: "Inscreva-me também na newsletter #CustoBrasil",
    newsletterHint: "Você receberá um e-mail de confirmação para concluir a inscrição (double opt-in).",
    submit: "Baixar o ebook",
    invalid: "Verifique os campos: nome, sobrenome e e-mail são obrigatórios.",
    successTitle: "Obrigado! Seu download está pronto.",
    successBody: "Se o download não começar automaticamente, use o botão abaixo.",
    newsletterSuccess: "Conclua o popup da newsletter: depois de clicar em Continuar, você receberá o e-mail de confirmação.",
    download: "Baixar o PDF",
    again: "Baixar para outra pessoa",
    fileLabel: "Exporting to Brazil — EU Manual",
  },
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

export default function NewsEbook() {
  useCanonical("/news");
  const { lang } = useT();
  const c = copy[lang];

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
    try {
      await supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "contact-notification",
          idempotencyKey: `ebook-${parsed.data.email}-${Date.now()}`,
          templateData: {
            name: `${parsed.data.firstName} ${parsed.data.lastName}`,
            email: parsed.data.email,
            company: parsed.data.company ?? "—",
            message: "Requested the 'Exporting to Brazil — EU Manual' ebook download.",
            source: "Newsletter & Ebook page",
            language: lang,
            submittedAt: new Date().toISOString(),
          },
        },
      });
    } catch (err) {
      console.error("Ebook notification failed", err);
    }
    triggerDownload();
    setSubmitted(true);
    if (wantsNewsletter) {
      setSubscribedNewsletter(true);
      setTimeout(() => {
        openIubendaNewsletter({
          email: parsed.data.email,
          firstName: parsed.data.firstName,
          lastName: parsed.data.lastName,
        });
      }, 400);
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-5 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            {c.back}
          </Link>
          <span className="text-sm font-medium">Business Matching Global</span>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div>
            <span className="inline-block text-xs uppercase tracking-widest text-primary font-semibold mb-3">
              {c.eyebrow}
            </span>
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
                    <Label htmlFor="firstName">{c.firstName} *</Label>
                    <Input id="firstName" required maxLength={80} value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="lastName">{c.lastName} *</Label>
                    <Input id="lastName" required maxLength={80} value={lastName} onChange={(e) => setLastName(e.target.value)} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">{c.email} *</Label>
                  <Input id="email" type="email" required maxLength={255} value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="company">{c.company}</Label>
                  <Input id="company" maxLength={120} value={company} onChange={(e) => setCompany(e.target.value)} />
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
                  <p className="text-sm text-primary mb-4">{c.newsletterSuccess}</p>
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