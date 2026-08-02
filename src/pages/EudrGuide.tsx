import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Download, CheckCircle2, MailCheck } from "lucide-react";
import { z } from "zod";
import { useT, type Lang } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import guideAsset from "@/assets/eudr-guia-pequeno-produtor.pdf.asset.json";
import { useCanonical } from "@/lib/useCanonical";
import { LangSwitcher } from "@/components/LangSwitcher";
import { GuidesMenu } from "@/components/GuidesMenu";

const PDF_URL = guideAsset.url;
const PDF_FILENAME = "EUDR_Guia_Pequeno_Produtor_BMG.pdf";
const SOURCE = "EUDR guide (/eudr) — #CustoEuropa";

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
  newsletterError: string;
  download: string;
  again: string;
  fileLabel: string;
};

const copy: Record<Lang, Copy> = {
  it: {
    back: "Torna alla home",
    eyebrow: "Guida gratuita",
    title: "EUDR — Guida per il piccolo produttore",
    sub: "Il regolamento europeo anti-deforestazione (EUDR) spiegato al piccolo produttore brasiliano: cosa serve, come si documenta l'origine e come restare nella filiera che esporta verso l'Unione Europea. Compila il form per scaricare la guida e, se vuoi, iscriviti alla newsletter #CustoEuropa.",
    bullets: [
      "Cosa chiede davvero l'EUDR al piccolo produttore",
      "Geolocalizzazione e tracciabilità dell'appezzamento",
      "Due diligence: documenti, dichiarazioni e responsabilità lungo la filiera",
      "Scadenze e passi pratici per non uscire dal mercato UE",
    ],
    meta: [
      { label: "Formato", value: "PDF" },
      { label: "Lingua", value: "Portoghese (BR)" },
      { label: "Edizione", value: "1.0 · 2026" },
    ],
    formTitle: "Compila per scaricare la guida",
    firstName: "Nome",
    lastName: "Cognome",
    email: "Email professionale",
    company: "Azienda (facoltativo)",
    consentLabel: "Ho letto l'",
    consentLink: "informativa privacy",
    consentSuffix: "e acconsento al trattamento dei miei dati per ricevere la guida e un eventuale follow-up.",
    consentRequired: "Devi accettare l'informativa privacy per scaricare la guida.",
    newsletterLabel: "Iscrivimi anche alla newsletter #CustoEuropa",
    newsletterHint: "Riceverai un'email di conferma per completare l'iscrizione (double opt-in).",
    submit: "Scarica la guida",
    invalid: "Controlla i campi: nome, cognome ed email sono obbligatori.",
    successTitle: "Grazie! Il download è pronto.",
    successBody: "Se il download non parte automaticamente, usa il pulsante qui sotto.",
    newsletterSuccess: "Ti abbiamo inviato un'email: per confermare l'iscrizione alla newsletter clicca sul link \"Conferma iscrizione\". Se non la trovi, controlla anche SPAM o Posta indesiderata.",
    newsletterError: "Il download è pronto, ma l'invio dell'email newsletter non è riuscito. Riprova tra poco.",
    download: "Scarica il PDF",
    again: "Scarica per un'altra persona",
    fileLabel: "EUDR — Guia do Pequeno Produtor",
  },
  en: {
    back: "Back to home",
    eyebrow: "Free guide",
    title: "EUDR — A guide for the smallholder producer",
    sub: "The EU Deforestation Regulation (EUDR) explained for the Brazilian smallholder: what is required, how to document origin, and how to stay in the supply chain that exports to the European Union. Fill in the form to download the guide and, if you wish, subscribe to the #CustoEuropa newsletter. (The guide is written in Brazilian Portuguese.)",
    bullets: [
      "What the EUDR actually requires from a smallholder",
      "Plot geolocation and traceability",
      "Due diligence: documents, declarations and chain responsibility",
      "Deadlines and practical steps to stay in the EU market",
    ],
    meta: [
      { label: "Format", value: "PDF" },
      { label: "Language", value: "Portuguese (BR)" },
      { label: "Edition", value: "1.0 · 2026" },
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
    newsletterLabel: "Also subscribe me to the #CustoEuropa newsletter",
    newsletterHint: "You'll receive a confirmation email to complete the subscription (double opt-in).",
    submit: "Download the guide",
    invalid: "Please check the fields: first name, last name and email are required.",
    successTitle: "Thanks! Your download is ready.",
    successBody: "If the download does not start automatically, use the button below.",
    newsletterSuccess: "We've sent you an email: to confirm your newsletter subscription, click the \"Confirm subscription\" link inside the message. If you don't see it, please check your SPAM folder.",
    newsletterError: "Your download is ready, but the newsletter email could not be sent. Please try again shortly.",
    download: "Download the PDF",
    again: "Download for another person",
    fileLabel: "EUDR — Guia do Pequeno Produtor",
  },
  pt: {
    back: "Voltar para a home",
    eyebrow: "Guia gratuito",
    title: "EUDR — Guia do Pequeno Produtor",
    sub: "O regulamento europeu antidesmatamento (EUDR) explicado para o pequeno produtor brasileiro: o que é exigido, como comprovar a origem e como permanecer na cadeia que exporta para a União Europeia. Preencha o formulário para baixar o guia e, se quiser, assine a newsletter #CustoEuropa.",
    bullets: [
      "O que a EUDR realmente exige do pequeno produtor",
      "Geolocalização e rastreabilidade do talhão",
      "Due diligence: documentos, declarações e responsabilidade na cadeia",
      "Prazos e passos práticos para não perder o mercado da UE",
    ],
    meta: [
      { label: "Formato", value: "PDF" },
      { label: "Idioma", value: "Português (BR)" },
      { label: "Edição", value: "1.0 · 2026" },
    ],
    formTitle: "Preencha para baixar o guia",
    firstName: "Nome",
    lastName: "Sobrenome",
    email: "E-mail profissional",
    company: "Empresa (opcional)",
    consentLabel: "Li o",
    consentLink: "aviso de privacidade",
    consentSuffix: "e concordo com o tratamento dos meus dados para receber o guia e um possível follow-up.",
    consentRequired: "Você precisa aceitar o aviso de privacidade para baixar o guia.",
    newsletterLabel: "Inscreva-me também na newsletter #CustoEuropa",
    newsletterHint: "Você receberá um e-mail de confirmação para concluir a inscrição (double opt-in).",
    submit: "Baixar o guia",
    invalid: "Verifique os campos: nome, sobrenome e e-mail são obrigatórios.",
    successTitle: "Obrigado! Seu download está pronto.",
    successBody: "Se o download não começar automaticamente, use o botão abaixo.",
    newsletterSuccess: "Enviamos um e-mail: para confirmar sua inscrição na newsletter, clique no link \"Confirmar inscrição\". Se não encontrar, verifique também a pasta de SPAM.",
    newsletterError: "O download está pronto, mas não foi possível enviar o e-mail da newsletter. Tente novamente em instantes.",
    download: "Baixar o PDF",
    again: "Baixar para outra pessoa",
    fileLabel: "EUDR — Guia do Pequeno Produtor",
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

export default function EudrGuide() {
  const { lang } = useT();
  const seo =
    lang === "it"
      ? { title: "EUDR — Guida per il piccolo produttore | BMG", description: "Guida gratuita all'EUDR: tracciabilità, geolocalizzazione e due diligence per restare nella filiera che esporta in UE." }
      : lang === "pt"
      ? { title: "EUDR — Guia do Pequeno Produtor | BMG", description: "Guia gratuito sobre a EUDR: rastreabilidade, geolocalização e due diligence para continuar exportando para a UE." }
      : { title: "EUDR — Guide for smallholder producers | BMG", description: "Free EUDR guide: traceability, plot geolocation and due diligence to stay in the EU supply chain." };
  useCanonical("/eudr", seo);
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
            newsletterName: "#CustoEuropa",
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
                    <Label htmlFor="eudrFirstName">{c.firstName} *</Label>
                    <Input id="eudrFirstName" required maxLength={80} value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="eudrLastName">{c.lastName} *</Label>
                    <Input id="eudrLastName" required maxLength={80} value={lastName} onChange={(e) => setLastName(e.target.value)} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="eudrEmail">{c.email} *</Label>
                  <Input id="eudrEmail" type="email" required maxLength={255} value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="eudrCompany">{c.company}</Label>
                  <Input id="eudrCompany" maxLength={120} value={company} onChange={(e) => setCompany(e.target.value)} />
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