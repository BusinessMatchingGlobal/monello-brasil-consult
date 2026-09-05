import { FormEvent, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export function ServiceRequestDialog({
  service,
  onOpenChange,
}: {
  service: string | null;
  onOpenChange: (open: boolean) => void;
}) {
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
    if (!name || !email) {
      toast.error("Inserisci nome ed email.");
      return;
    }
    if (d.get("consent") !== "on") {
      toast.error("È necessario accettare l'informativa privacy.");
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
            message: `Servizio richiesto: ${service}\nTelefono: ${phone || "—"}\n\n${message || "—"}`,
            source: `Richiesta servizio — ${service}`,
            submittedAt: new Date().toISOString(),
          },
        },
      });
      if (error) throw error;
      toast.success("Richiesta inviata. Ti risponderemo al più presto.");
      form.reset();
      onOpenChange(false);
    } catch (err) {
      console.error("Service request failed", err);
      toast.error("Invio non riuscito. Riprova o scrivici via email.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={!!service} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Richiedi: {service}</DialogTitle>
          <DialogDescription>
            Lasciaci i tuoi dati: ti ricontattiamo con un breve briefing gratuito sul tuo caso.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Label htmlFor="sr-name">Nome e cognome *</Label>
            <Input id="sr-name" name="name" required maxLength={100} className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="sr-email">Email *</Label>
            <Input id="sr-email" name="email" type="email" required maxLength={255} className="mt-1.5" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="sr-company">Azienda</Label>
              <Input id="sr-company" name="company" maxLength={150} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="sr-phone">Telefono</Label>
              <Input id="sr-phone" name="phone" maxLength={40} className="mt-1.5" />
            </div>
          </div>
          <div>
            <Label htmlFor="sr-message">Descrivi brevemente la tua esigenza</Label>
            <Textarea id="sr-message" name="message" rows={4} maxLength={2000} className="mt-1.5 resize-none" />
          </div>
          <label className="flex items-start gap-3 text-xs text-muted-foreground leading-relaxed cursor-pointer">
            <input type="checkbox" name="consent" required className="mt-0.5 h-4 w-4 accent-primary" />
            <span>
              Acconsento al trattamento dei dati secondo la{" "}
              <Link to="/privacy" className="underline hover:text-foreground">privacy policy</Link>.
            </span>
          </label>
          <Button type="submit" disabled={submitting} className="w-full rounded-full h-11">
            {submitting ? "…" : "Invia richiesta"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
