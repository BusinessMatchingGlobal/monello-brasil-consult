import { useState } from "react";
import { z } from "zod";
import { Mail, Loader2, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import type { Language } from "@/components/LanguageSwitcher";

interface NewsletterSectionProps {
  language?: Language;
}

const copy = {
  en: {
    title: "Stay up to date",
    subtitle: "Get our latest insights on Brazil, EU–Mercosur and the Custo Brasil — directly in your inbox.",
    placeholder: "your@email.com",
    cta: "Subscribe",
    consent: "I agree to receive the newsletter and accept the privacy policy.",
    success: "Thanks for subscribing! We'll be in touch soon.",
    duplicate: "This email is already subscribed.",
    invalid: "Please enter a valid email address.",
    consentError: "Please accept the consent to continue.",
    error: "Something went wrong. Please try again.",
  },
  it: {
    title: "Rimani aggiornato",
    subtitle: "Ricevi i nostri ultimi insights su Brasile, UE–Mercosur e Custo Brasil — direttamente nella tua casella.",
    placeholder: "tua@email.com",
    cta: "Iscriviti",
    consent: "Acconsento a ricevere la newsletter e accetto l'informativa privacy.",
    success: "Grazie per l'iscrizione! Ti contatteremo presto.",
    duplicate: "Questa email è già iscritta.",
    invalid: "Inserisci un indirizzo email valido.",
    consentError: "Accetta il consenso per continuare.",
    error: "Qualcosa è andato storto. Riprova.",
  },
  pt: {
    title: "Fique por dentro das novidades",
    subtitle: "Receba nossos últimos insights sobre Brasil, UE–Mercosul e Custo Brasil — diretamente no seu e-mail.",
    placeholder: "seu@email.com",
    cta: "Inscrever-se",
    consent: "Concordo em receber a newsletter e aceito a política de privacidade.",
    success: "Obrigado pela inscrição! Entraremos em contato em breve.",
    duplicate: "Este e-mail já está inscrito.",
    invalid: "Insira um endereço de e-mail válido.",
    consentError: "Aceite o consentimento para continuar.",
    error: "Algo deu errado. Tente novamente.",
  },
};

const emailSchema = z.string().trim().email().max(320);

export const NewsletterSection = ({ language = "en" }: NewsletterSectionProps) => {
  const t = copy[language];
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      toast.error(t.invalid);
      return;
    }
    if (!consent) {
      toast.error(t.consentError);
      return;
    }

    setLoading(true);
    const { error } = await supabase.from("newsletter_subscribers").insert({
      email: parsed.data.toLowerCase(),
      language,
      source: "website",
      consent: true,
    });
    setLoading(false);

    if (error) {
      if (error.code === "23505") {
        toast.error(t.duplicate);
        return;
      }
      console.error("Newsletter signup error:", error.message);
      toast.error(t.error);
      return;
    }

    toast.success(t.success);
    setDone(true);
    setEmail("");
    setConsent(false);
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
            <Mail className="h-6 w-6" />
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-3">{t.title}</h2>
          <p className="text-muted-foreground mb-8">{t.subtitle}</p>

          {done ? (
            <div className="flex items-center justify-center gap-2 text-primary font-medium">
              <CheckCircle2 className="h-5 w-5" />
              <span>{t.success}</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.placeholder}
                  maxLength={320}
                  disabled={loading}
                  className="flex-1"
                  aria-label="Email"
                />
                <Button type="submit" disabled={loading}>
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : t.cta}
                </Button>
              </div>
              <label className="flex items-start gap-2 max-w-md mx-auto text-left text-sm text-muted-foreground cursor-pointer">
                <Checkbox
                  checked={consent}
                  onCheckedChange={(v) => setConsent(v === true)}
                  disabled={loading}
                  className="mt-0.5"
                />
                <span>{t.consent}</span>
              </label>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
