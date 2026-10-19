import { useState, FormEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Mail } from "lucide-react";
import { toast } from "sonner";
import { useT } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { trackContactForm } from "@/lib/analytics";
import { pathForLang } from "@/lib/langPath";

const EMAIL = "info@businessmatching.global";

/** Shared contact block ("Tell us what you need to know"), used at the bottom of every content page. */
export function SiteContactForm({ subject: subjectProp }: { subject?: string } = {}) {
  const { t, lang } = useT();
  const [submitting, setSubmitting] = useState(false);
  const { pathname } = useLocation();
  const page = pathForLang(lang, pathname);
  const subject =
    subjectProp ??
    (typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("subject") ?? ""
      : "");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = (data.get("name") as string) || "";
    const email = (data.get("email") as string) || "";
    const company = (data.get("company") as string) || "";
    const message = (data.get("message") as string) || "";
    const consent = data.get("consent") === "on";
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in name, email and message.");
      return;
    }
    if (!consent) {
      trackContactForm("validation_error", `Contact form — ${page}`, { reason: "consent" });
      toast.error(t.consent.required);
      return;
    }
    setSubmitting(true);
    trackContactForm("submit", `Contact form — ${page}`);
    try {
      const { error } = await supabase.functions.invoke("send-contact-notification", {
        body: {
          idempotencyKey: `contact-${email}-${Date.now()}`,
          templateData: {
            name,
            email,
            company: company || "—",
            message,
            source: `Contact form — ${page}`.slice(0, 120),
            page,
            submittedAt: new Date().toISOString(),
          },
        },
      });
      if (error) throw error;
      trackContactForm("success", `Contact form — ${page}`);
      toast.success("Thanks — your message has been sent.");
      form.reset();
    } catch (err) {
      trackContactForm("error", `Contact form — ${page}`);
      console.error("Contact form send failed", err);
      toast.error("Sending failed. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-foreground text-background">
      <div className="container max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl leading-tight mb-6 text-background">
              {t.contact.title}
            </h2>
            <p className="text-background/70 text-lg leading-relaxed mb-10">{t.contact.sub}</p>
            <div className="space-y-4 text-background/85">
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-3 hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" /> {EMAIL}
              </a>
            </div>
          </div>
          <div>
            <p className="text-sm italic text-background/70 leading-relaxed mb-5">
              {lang === "it"
                ? "Quello che ci dite resta tra noi. Non facciamo i nomi dei nostri clienti, e non faremo il vostro."
                : lang === "pt"
                  ? "O que você nos conta fica conosco. Não citamos nossos clientes, e não citaremos você."
                  : "Whatever you tell us stays with us. We don’t name our clients, and we won’t name you."}
            </p>
            <form onSubmit={onSubmit} className="space-y-5">
            <input type="hidden" name="page" value={page} />
            <div>
              <Label htmlFor="name" className="text-background/70 text-xs tracking-wider uppercase">
                {t.contact.name}
              </Label>
              <Input
                id="name"
                name="name"
                required
                maxLength={100}
                className="mt-2 bg-background/[0.04] border-background/15 text-background placeholder:text-background/30 focus-visible:ring-primary"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-background/70 text-xs tracking-wider uppercase">
                {t.contact.email}
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                maxLength={255}
                className="mt-2 bg-background/[0.04] border-background/15 text-background placeholder:text-background/30 focus-visible:ring-primary"
              />
            </div>
            <div>
              <Label htmlFor="company" className="text-background/70 text-xs tracking-wider uppercase">
                {t.contact.company}
              </Label>
              <Input
                id="company"
                name="company"
                maxLength={150}
                className="mt-2 bg-background/[0.04] border-background/15 text-background placeholder:text-background/30 focus-visible:ring-primary"
              />
            </div>
            <div>
              <Label
                htmlFor="message"
                className="text-background/70 text-xs tracking-wider uppercase"
              >
                {t.contact.message}
              </Label>
              <Textarea
                id="message"
                name="message"
                required
                defaultValue={subject ? `${subject}\n\n` : undefined}
                rows={5}
                maxLength={2000}
                className="mt-2 bg-background/[0.04] border-background/15 text-background placeholder:text-background/30 focus-visible:ring-primary resize-none"
              />
            </div>
            <Button type="submit" size="lg" disabled={submitting} className="rounded-full w-full h-12">
              {submitting ? "…" : t.contact.send} <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
            <label className="flex items-start gap-3 text-xs text-background/70 leading-relaxed cursor-pointer">
              <input
                type="checkbox"
                name="consent"
                required
                className="mt-0.5 h-4 w-4 rounded border-background/30 bg-background/[0.04] accent-primary"
              />
              <span>
                {t.consent.label}{" "}
                <Link to="/privacy" className="underline hover:text-background">
                  {t.consent.link}
                </Link>{" "}
                {t.consent.suffix}
              </span>
            </label>
          </form>
          </div>
        </div>
      </div>
    </section>
  );
}

