import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { MailCheck } from "lucide-react";
import { useT, type Lang } from "@/lib/i18n";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

type NewsletterPopupProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  prefill?: {
    firstName?: string;
    lastName?: string;
    email?: string;
  };
  source?: string;
};

const copy: Record<Lang, {
  title: string;
  description: string;
  firstName: string;
  lastName: string;
  email: string;
  consent: string;
  privacy: string;
  submit: string;
  successTitle: string;
  successBody: string;
  invalid: string;
  consentRequired: string;
  error: string;
}> = {
  it: {
    title: "Iscriviti alla newsletter #CustoBrasil",
    description: "Lascia i tuoi dati per ricevere aggiornamenti e approfondimenti sul Brasile.",
    firstName: "Nome",
    lastName: "Cognome",
    email: "Email professionale",
    consent: "Accetto di ricevere comunicazioni informative e newsletter da Business Matching Global e confermo di aver letto l’",
    privacy: "informativa privacy",
    submit: "Invia iscrizione",
    successTitle: "Controlla la tua email",
    successBody: "Ti abbiamo inviato un messaggio con un link per confermare l'iscrizione. Clicca sul link per attivarla (controlla anche spam/promozioni).",
    invalid: "Inserisci almeno nome, cognome e un’email valida.",
    consentRequired: "Devi accettare il consenso newsletter per continuare.",
    error: "Non è stato possibile inviare la richiesta. Riprova tra poco.",
  },
  en: {
    title: "Subscribe to the #CustoBrasil newsletter",
    description: "Leave your details to receive updates and insights on Brazil.",
    firstName: "First name",
    lastName: "Last name",
    email: "Work email",
    consent: "I agree to receive informational communications and newsletters from Business Matching Global and confirm that I have read the ",
    privacy: "privacy notice",
    submit: "Send subscription",
    successTitle: "Check your inbox",
    successBody: "We just sent you an email with a link to confirm your subscription. Click the link to activate it (check spam/promotions too).",
    invalid: "Please enter at least first name, last name and a valid email.",
    consentRequired: "You must accept the newsletter consent to continue.",
    error: "We could not send the request. Please try again shortly.",
  },
  pt: {
    title: "Inscreva-se na newsletter #CustoBrasil",
    description: "Deixe seus dados para receber atualizações e análises sobre o Brasil.",
    firstName: "Nome",
    lastName: "Sobrenome",
    email: "E-mail profissional",
    consent: "Aceito receber comunicações informativas e newsletters da Business Matching Global e confirmo que li o ",
    privacy: "aviso de privacidade",
    submit: "Enviar inscrição",
    successTitle: "Verifique seu e-mail",
    successBody: "Enviamos uma mensagem com um link para confirmar sua inscrição. Clique no link para ativá-la (verifique também spam/promoções).",
    invalid: "Insira pelo menos nome, sobrenome e um e-mail válido.",
    consentRequired: "Você precisa aceitar o consentimento da newsletter para continuar.",
    error: "Não foi possível enviar a solicitação. Tente novamente em instantes.",
  },
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function NewsletterPopup({ open, onOpenChange, prefill, source = "Newsletter popup" }: NewsletterPopupProps) {
  const { lang } = useT();
  const c = copy[lang];
  const [firstName, setFirstName] = useState(prefill?.firstName ?? "");
  const [lastName, setLastName] = useState(prefill?.lastName ?? "");
  const [email, setEmail] = useState(prefill?.email ?? "");
  const [consent, setConsent] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!open) return;
    setFirstName(prefill?.firstName ?? "");
    setLastName(prefill?.lastName ?? "");
    setEmail(prefill?.email ?? "");
    setConsent(true);
    setSent(false);
  }, [open, prefill?.email, prefill?.firstName, prefill?.lastName]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanEmail = email.trim();
    const cleanFirstName = firstName.trim();
    const cleanLastName = lastName.trim();

    if (!cleanFirstName || !cleanLastName || !isValidEmail(cleanEmail)) {
      toast({ title: c.invalid, variant: "destructive" });
      return;
    }
    if (!consent) {
      toast({ title: c.consentRequired, variant: "destructive" });
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("newsletter-subscribe", {
        body: {
          firstName: cleanFirstName,
          lastName: cleanLastName,
          email: cleanEmail,
          language: lang,
          source,
          consent: true,
        },
      });
      if (error) throw error;
      setSent(true);
    } catch (error) {
      console.error("Newsletter popup submission failed", error);
      toast({ title: c.error, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        {sent ? (
          <div className="py-6 text-center">
            <MailCheck className="mx-auto mb-4 h-12 w-12 text-primary" />
            <DialogTitle className="mb-2 text-xl">{c.successTitle}</DialogTitle>
            <DialogDescription className="mb-6">{c.successBody}</DialogDescription>
            <Button type="button" onClick={() => onOpenChange(false)} className="w-full">
              OK
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>{c.title}</DialogTitle>
              <DialogDescription>{c.description}</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="newsletterFirstName">{c.firstName} *</Label>
                  <Input id="newsletterFirstName" required maxLength={80} value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="newsletterLastName">{c.lastName} *</Label>
                  <Input id="newsletterLastName" required maxLength={80} value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="newsletterEmail">{c.email} *</Label>
                <Input id="newsletterEmail" type="email" required maxLength={255} value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <label className="flex items-start gap-3 text-sm text-muted-foreground">
                <Checkbox checked={consent} onCheckedChange={(value) => setConsent(value === true)} className="mt-0.5" />
                <span>
                  {c.consent}
                  <Link to="/privacy" className="text-primary underline underline-offset-4">
                    {c.privacy}
                  </Link>
                  .
                </span>
              </label>
              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? "…" : c.submit}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}