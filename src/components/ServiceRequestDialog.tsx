import { FormEvent, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useT } from "@/lib/i18n";
import { pathForLang } from "@/lib/langPath";

const COPY = {
  it: {
    missing: "Inserisci nome ed email.", consent: "È necessario accettare l'informativa privacy.",
    ok: "Richiesta inviata. Ti risponderemo al più presto.", fail: "Invio non riuscito. Riprova o scrivici via email.",
    title: "Richiedi", desc: "Lasciaci i tuoi dati: ti ricontattiamo con un breve briefing gratuito sul tuo caso.",
    name: "Nome e cognome *", company: "Azienda", message: "Descrivi brevemente la tua esigenza",
    agree: "Acconsento al trattamento dei dati secondo la", send: "Invia richiesta",
  },
  en: {
    missing: "Please enter your name and email.", consent: "You must accept the privacy policy.",
    ok: "Request sent. We will get back to you shortly.", fail: "Sending failed. Please try again or email us.",
    title: "Request", desc: "Leave your details: we will get back to you with a short free briefing on your case.",
    name: "Full name *", company: "Company", message: "Briefly describe what you need",
    agree: "I agree to the processing of my data according to the", send: "Send request",
  },
  pt: {
    missing: "Informe nome e e-mail.", consent: "É necessário aceitar a política de privacidade.",
    ok: "Solicitação enviada. Responderemos em breve.", fail: "Falha no envio. Tente novamente ou escreva-nos por e-mail.",
    title: "Solicitar", desc: "Deixe seus dados: entraremos em contato com um breve briefing gratuito sobre o seu caso.",
    name: "Nome completo *", company: "Empresa", message: "Descreva brevemente a sua necessidade",
    agree: "Concordo com o tratamento dos dados conforme a", send: "Enviar solicitação",
  },
} as const;

export function ServiceRequestDialog({
  service,
  onOpenChange,
}: {
  service: string | null;
  onOpenChange: (open: boolean) => void;
}) {
  const { lang } = useT();
  const c = COPY[lang];
  const { pathname } = useLocation();
  const page = pathForLang(lang, pathname);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const d = new FormData(form);
    const name = String(d.get("name") || "").trim();
    const email = String(d.get("email") || "").trim();
    const company = String(d.get("company") || "").trim();
    const message = String(d.get("message") || "").trim();
    if (!name || !email) {
      toast.error(c.missing);
      return;
    }
    if (d.get("consent") !== "on") {
      toast.error(c.consent);
      return;
    }
    setSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("send-contact-notification", {
        body: {
          idempotencyKey: `service-${email}-${Date.now()}`,
          templateData: {
            name,
            email,
            company: company || "—",
            message: `Service: ${service}\nPage: ${page}\n\n${message || "—"}`,
            source: `Service request — ${service} — ${page}`.slice(0, 120),
            submittedAt: new Date().toISOString(),
          },
        },
      });
      if (error) throw error;
      toast.success(c.ok);
      form.reset();
      onOpenChange(false);
    } catch (err) {
      console.error("Service request failed", err);
      toast.error(c.fail);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={!!service} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">{c.title}: {service}</DialogTitle>
          <DialogDescription>{c.desc}</DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <input type="hidden" name="page" value={page} />
          <div>
            <Label htmlFor="sr-name">{c.name}</Label>
            <Input id="sr-name" name="name" required maxLength={100} className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="sr-email">Email *</Label>
            <Input id="sr-email" name="email" type="email" required maxLength={255} className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="sr-company">{c.company}</Label>
            <Input id="sr-company" name="company" maxLength={150} className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="sr-message">{c.message}</Label>
            <Textarea id="sr-message" name="message" rows={4} maxLength={2000} className="mt-1.5 resize-none" />
          </div>
          <label className="flex items-start gap-3 text-xs text-muted-foreground leading-relaxed cursor-pointer">
            <input type="checkbox" name="consent" required className="mt-0.5 h-4 w-4 accent-primary" />
            <span>
              {c.agree}{" "}
              <Link to="/privacy" className="underline hover:text-foreground">privacy policy</Link>.
            </span>
          </label>
          <Button type="submit" disabled={submitting} className="w-full rounded-full h-11">
            {submitting ? "…" : c.send}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
