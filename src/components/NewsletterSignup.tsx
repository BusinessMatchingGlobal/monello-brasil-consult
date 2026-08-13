import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useT } from "@/lib/i18n";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export const NEWSLETTER_COPY = {
  it: {
    title: "Iscriviti alla newsletter #CustoBrasil",
    sub: "Aggiornamenti, analisi e approfondimenti sul Brasile e oltre. Niente spam. Puoi annullare l'iscrizione in qualsiasi momento con un solo clic.",
    first: "Nome",
    last: "Cognome",
    email: "La tua email",
    cta: "Iscriviti",
    consent: "Accetto di ricevere la newsletter e ho letto l'",
    privacy: "informativa privacy",
    success: "Controlla la tua email per confermare l'iscrizione (guarda anche in SPAM/Promozioni).",
    invalid: "Inserisci nome, cognome e un'email valida.",
    consentRequired: "Devi accettare per iscriverti.",
    error: "Invio non riuscito. Riprova.",
  },
  en: {
    title: "Subscribe to the #CustoBrasil newsletter",
    sub: "Updates and insights on Brazil and beyond. No spam, unsubscribe anytime with one click.",
    first: "First name",
    last: "Last name",
    email: "Your email",
    cta: "Subscribe",
    consent: "I agree to receive the newsletter and have read the ",
    privacy: "privacy notice",
    success: "Check your inbox to confirm your subscription (check SPAM/Promotions too).",
    invalid: "Please enter first name, last name and a valid email.",
    consentRequired: "You must accept to subscribe.",
    error: "Sending failed. Please try again.",
  },
  pt: {
    title: "Inscreva-se na newsletter #CustoBrasil",
    sub: "Atualizações e insights sobre o Brasil e outros mercados. Sem spam e com cancelamento da inscrição em apenas um clique.",
    first: "Nome",
    last: "Sobrenome",
    email: "Seu e-mail",
    cta: "Inscrever-se",
    consent: "Aceito receber a newsletter e li o ",
    privacy: "aviso de privacidade",
    success: "Verifique seu e-mail para confirmar a inscrição (confira também SPAM/Promoções).",
    invalid: "Insira nome, sobrenome e um e-mail válido.",
    consentRequired: "Você precisa aceitar para se inscrever.",
    error: "Falha no envio. Tente novamente.",
  },
} as const;

type Props = { source?: string };

export function NewsletterSignup({ source = "Article footer newsletter" }: Props) {
  const { lang } = useT();
  const c = NEWSLETTER_COPY[lang];
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fn = firstName.trim();
    const ln = lastName.trim();
    const em = email.trim();
    if (!fn || !ln || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) {
      toast.error(c.invalid);
      return;
    }
    if (!consent) {
      toast.error(c.consentRequired);
      return;
    }
    setSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("newsletter-subscribe", {
        body: { firstName: fn, lastName: ln, email: em, language: lang, source, consent: true },
      });
      if (error) throw error;
      setSent(true);
      setFirstName("");
      setLastName("");
      setEmail("");
      toast.success(c.success);
    } catch (err) {
      console.error("Newsletter subscribe failed", err);
      toast.error(c.error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mt-12 rounded-2xl bg-foreground text-background p-6 md:p-8">
      <h3 className="font-display text-xl md:text-2xl text-background">{c.title}</h3>
      <p className="text-sm text-background/80 mt-1 mb-5">{c.sub}</p>
      {sent ? (
        <p className="text-background/85 text-sm">{c.success}</p>
      ) : (
        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1.4fr_auto] gap-3">
            <Input
              required
              maxLength={80}
              placeholder={c.first}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-background/[0.06] border-background/15 text-background placeholder:text-background/70 h-11"
            />
            <Input
              required
              maxLength={80}
              placeholder={c.last}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="bg-background/[0.06] border-background/15 text-background placeholder:text-background/70 h-11"
            />
            <Input
              required
              type="email"
              maxLength={255}
              placeholder={c.email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-background/[0.06] border-background/15 text-background placeholder:text-background/70 h-11"
            />
            <Button type="submit" disabled={submitting} className="rounded-full h-11 px-6 whitespace-nowrap">
              {submitting ? "…" : c.cta} <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          <label className="flex items-start gap-2 text-xs text-background/80 leading-relaxed cursor-pointer">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5 h-3.5 w-3.5 rounded border-background/30 bg-background/[0.06] accent-primary"
            />
            <span>
              {c.consent}
              <Link to="/privacy" className="underline hover:text-background">{c.privacy}</Link>.
            </span>
          </label>
        </form>
      )}
    </section>
  );
}
