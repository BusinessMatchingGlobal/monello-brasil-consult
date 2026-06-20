import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText, Download, CheckCircle2 } from "lucide-react";
import { z } from "zod";
import { useT, type Lang } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";
import dossierAsset from "@/assets/sample-dossier.pdf.asset.json";

const OWNER_EMAIL = "info@businessmatching.global";
const PDF_URL = dossierAsset.url;
const PDF_FILENAME = "Ajvar_Brazil_Dossier_SAMPLE_BusinessMatchingGlobal.pdf";

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
  submit: string;
  invalid: string;
  successTitle: string;
  successBody: string;
  download: string;
  again: string;
  fileLabel: string;
};

const copy: Record<Lang, Copy> = {
  it: {
    back: "Torna alla home",
    eyebrow: "Esempio gratuito",
    title: "Dossier Brasile — Esempio gratuito",
    sub: "Un estratto reale del tipo di report che consegno: panoramica di mercato, fornitori, requisiti di import e indicatori di rischio per un caso pratico (Ajvar in Brasile).",
    bullets: [
      "Panoramica del mercato brasiliano per il prodotto",
      "Profilo sintetico di potenziali fornitori e distributori",
      "Classificazione doganale, dazi e requisiti sanitari",
      "Indicatori di rischio e prossimi passi consigliati",
    ],
    meta: [
      { label: "Formato", value: "PDF" },
      { label: "Lingua", value: "Inglese" },
      { label: "Pagine", value: "Estratto campione" },
    ],
    formTitle: "Compila per scaricare",
    firstName: "Nome",
    lastName: "Cognome",
    email: "Email professionale",
    company: "Azienda (facoltativo)",
    consentLabel: "Ho letto l'",
    consentLink: "informativa privacy",
    consentSuffix: "e acconsento al trattamento dei miei dati per ricevere il documento e un eventuale follow-up.",
    consentRequired: "Devi accettare l'informativa privacy per scaricare il documento.",
    submit: "Scarica il dossier",
    invalid: "Controlla i campi: nome, cognome ed email sono obbligatori.",
    successTitle: "Grazie! Il download è pronto.",
    successBody: "Se il download non parte automaticamente, usa il pulsante qui sotto.",
    download: "Scarica il PDF",
    again: "Scarica per un'altra persona",
    fileLabel: "Dossier Ajvar — Brasile (campione)",
  },
  en: {
    back: "Back to home",
    eyebrow: "Free sample",
    title: "Brazil Dossier — Free Sample",
    sub: "A real excerpt of the kind of report I deliver: market overview, suppliers, import requirements and risk indicators for a practical case (Ajvar in Brazil).",
    bullets: [
      "Brazilian market overview for the product",
      "Snapshot of potential suppliers and distributors",
      "Tariff classification, duties and sanitary requirements",
      "Risk indicators and recommended next steps",
    ],
    meta: [
      { label: "Format", value: "PDF" },
      { label: "Language", value: "English" },
      { label: "Pages", value: "Sample excerpt" },
    ],
    formTitle: "Fill in to download",
    firstName: "First name",
    lastName: "Last name",
    email: "Work email",
    company: "Company (optional)",
    consentLabel: "I have read the",
    consentLink: "privacy notice",
    consentSuffix: "and I consent to the processing of my data to receive the document and a possible follow-up.",
    consentRequired: "You must accept the privacy notice to download the document.",
    submit: "Download the dossier",
    invalid: "Please check the fields: first name, last name and email are required.",
    successTitle: "Thanks! Your download is ready.",
    successBody: "If the download does not start automatically, use the button below.",
    download: "Download the PDF",
    again: "Download for another person",
    fileLabel: "Ajvar Dossier — Brazil (sample)",
  },
  pt: {
    back: "Voltar para a home",
    eyebrow: "Amostra gratuita",
    title: "Dossiê Brasil — Amostra Gratuita",
    sub: "Um trecho real do tipo de relatório que entrego: panorama de mercado, fornecedores, requisitos de importação e indicadores de risco para um caso prático (Ajvar no Brasil).",
    bullets: [
      "Panorama do mercado brasileiro para o produto",
      "Perfil resumido de potenciais fornecedores e distribuidores",
      "Classificação tarifária, impostos e requisitos sanitários",
      "Indicadores de risco e próximos passos recomendados",
    ],
    meta: [
      { label: "Formato", value: "PDF" },
      { label: "Idioma", value: "Inglês" },
      { label: "Páginas", value: "Trecho de amostra" },
    ],
    formTitle: "Preencha para baixar",
    firstName: "Nome",
    lastName: "Sobrenome",
    email: "E-mail profissional",
    company: "Empresa (opcional)",
    consentLabel: "Li o",
    consentLink: "aviso de privacidade",
    consentSuffix: "e concordo com o tratamento dos meus dados para receber o documento e um possível follow-up.",
    consentRequired: "Você precisa aceitar o aviso de privacidade para baixar o documento.",
    submit: "Baixar o dossiê",
    invalid: "Verifique os campos: nome, sobrenome e e-mail são obrigatórios.",
    successTitle: "Obrigado! Seu download está pronto.",
    successBody: "Se o download não começar automaticamente, use o botão abaixo.",
    download: "Baixar o PDF",
    again: "Baixar para outra pessoa",
    fileLabel: "Dossiê Ajvar — Brasil (amostra)",
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

export default function SampleReport() {
  const { lang } = useT();
  const c = copy[lang];

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
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
    const subject = encodeURIComponent(`[Sample Dossier] ${parsed.data.firstName} ${parsed.data.lastName}`);
    const body = encodeURIComponent(
      `Name: ${parsed.data.firstName} ${parsed.data.lastName}\nEmail: ${parsed.data.email}\nCompany: ${parsed.data.company ?? "-"}\nLanguage: ${lang}\nConsent: yes\n`
    );
    // Notify owner via mailto (opens user's mail client in background tab)
    window.open(`mailto:${OWNER_EMAIL}?subject=${subject}&body=${body}`, "_blank", "noopener");
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
              <FileText className="h-10 w-10 text-primary flex-shrink-0" />
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