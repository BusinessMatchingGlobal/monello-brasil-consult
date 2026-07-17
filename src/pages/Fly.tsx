import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Send, CheckCircle2 } from "lucide-react";
import { z } from "zod";
import { useT, type Lang } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useCanonical } from "@/lib/useCanonical";

const schema = z.object({
  organization: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(5).max(40),
  whatsapp: z.string().trim().min(5).max(40),
  consent: z.literal(true),
});

type Copy = {
  back: string;
  eyebrow: string;
  title: string;
  sub: string;
  organization: string;
  email: string;
  phone: string;
  whatsapp: string;
  consentLabel: string;
  consentLink: string;
  consentSuffix: string;
  consentRequired: string;
  submit: string;
  invalid: string;
  required: string;
  successTitle: string;
  successBody: string;
};

const copy: Record<Lang, Copy> = {
  it: {
    back: "Torna alla home",
    eyebrow: "Contatto rapido",
    title: "Richiesta informazioni",
    sub: "Lascia i tuoi recapiti e ti ricontatteremo al più presto.",
    organization: "Organizzazione/Persona di Riferimento",
    email: "Email",
    phone: "Cellulare",
    whatsapp: "WhatsApp",
    consentLabel: "Ho letto l'",
    consentLink: "informativa privacy",
    consentSuffix: "e acconsento al trattamento dei miei dati per essere ricontattato.",
    consentRequired: "Devi accettare l'informativa privacy per inviare la richiesta.",
    submit: "Invia richiesta",
    invalid: "Controlla i campi: tutti sono obbligatori e l'email deve essere valida.",
    required: "Tutti i campi sono obbligatori.",
    successTitle: "Grazie! La richiesta è stata inviata.",
    successBody: "Ti ricontatteremo al più presto. Se non ricevi risposta, controlla anche la cartella SPAM.",
  },
  en: {
    back: "Back to home",
    eyebrow: "Quick contact",
    title: "Request information",
    sub: "Leave your details and we will get back to you as soon as possible.",
    organization: "Organization / Contact Person",
    email: "Email",
    phone: "Mobile phone",
    whatsapp: "WhatsApp",
    consentLabel: "I have read the ",
    consentLink: "privacy notice",
    consentSuffix: "and I consent to the processing of my data to be contacted.",
    consentRequired: "You must accept the privacy notice to send the request.",
    submit: "Send request",
    invalid: "Please check the fields: all are required and the email must be valid.",
    required: "All fields are required.",
    successTitle: "Thank you! Your request has been sent.",
    successBody: "We will get back to you soon. If you do not hear from us, please check your SPAM folder.",
  },
  pt: {
    back: "Voltar para a home",
    eyebrow: "Contato rápido",
    title: "Solicite informações",
    sub: "Deixe seus dados e entraremos em contato o mais breve possível.",
    organization: "Organização / Pessoa de Contato",
    email: "E-mail",
    phone: "Telemóvel",
    whatsapp: "WhatsApp",
    consentLabel: "Li o ",
    consentLink: "aviso de privacidade",
    consentSuffix: "e concordo com o tratamento dos meus dados para ser contatado.",
    consentRequired: "Você precisa aceitar o aviso de privacidade para enviar a solicitação.",
    submit: "Enviar solicitação",
    invalid: "Verifique os campos: todos são obrigatórios e o e-mail deve ser válido.",
    required: "Todos os campos são obrigatórios.",
    successTitle: "Obrigado! Sua solicitação foi enviada.",
    successBody: "Entraremos em contato em breve. Se não receber resposta, verifique a pasta de SPAM.",
  },
};

export default function Fly() {
  useCanonical("/fly");
  const { lang } = useT();
  const c = copy[lang];

  const [organization, setOrganization] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!consent) {
      toast({ title: c.consentRequired, variant: "destructive" });
      return;
    }
    const parsed = schema.safeParse({ organization, email, phone, whatsapp, consent });
    if (!parsed.success) {
      toast({ title: c.invalid, variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      await supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "contact-notification",
          idempotencyKey: `fly-${parsed.data.email}-${Date.now()}`,
          templateData: {
            name: parsed.data.organization,
            email: parsed.data.email,
            company: "—",
            message: `Phone: ${parsed.data.phone}\nWhatsApp: ${parsed.data.whatsapp}`,
            source: "Fly page",
            language: lang,
            submittedAt: new Date().toISOString(),
          },
        },
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Fly page notification failed", err);
      toast({ title: c.invalid, variant: "destructive" });
    } finally {
      setLoading(false);
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

      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-xl mx-auto rounded-xl border border-border bg-card p-6 md:p-10 shadow-sm">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="mb-2">
                <span className="inline-block text-xs uppercase tracking-widest text-primary font-semibold mb-2">
                  {c.eyebrow}
                </span>
                <h1 className="text-2xl md:text-3xl font-bold leading-tight">{c.title}</h1>
                <p className="text-muted-foreground mt-1">{c.sub}</p>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="organization">{c.organization} *</Label>
                <Input
                  id="organization"
                  required
                  maxLength={120}
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email">{c.email} *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  maxLength={255}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="phone">{c.phone} *</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  minLength={5}
                  maxLength={40}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="whatsapp">{c.whatsapp} *</Label>
                <Input
                  id="whatsapp"
                  type="tel"
                  required
                  minLength={5}
                  maxLength={40}
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                />
              </div>

              <label className="flex items-start gap-3 text-sm text-muted-foreground pt-1">
                <Checkbox checked={consent} onCheckedChange={(v) => setConsent(v === true)} className="mt-0.5" />
                <span>
                  {c.consentLabel}
                  <Link to="/privacy" className="text-primary underline">
                    {c.consentLink}
                  </Link>{" "}
                  {c.consentSuffix}
                </span>
              </label>

              <Button type="submit" size="lg" className="w-full" disabled={loading}>
                <Send className="mr-2 h-4 w-4" />
                {c.submit}
              </Button>
            </form>
          ) : (
            <div className="text-center py-8">
              <CheckCircle2 className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">{c.successTitle}</h2>
              <p className="text-muted-foreground">{c.successBody}</p>
              <Link to="/" className="inline-block mt-6 text-sm text-primary underline">
                {c.back}
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
