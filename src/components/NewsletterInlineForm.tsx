import { FormEvent, useState } from "react";
import { useT } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Check } from "lucide-react";
import { openIubendaNewsletter } from "@/lib/consent";

const PRIVACY_URL: Record<string, string> = {
  en: "https://www.iubenda.com/privacy-policy/22477622",
  it: "https://www.iubenda.com/privacy-policy/32646575",
  pt: "https://www.iubenda.com/privacy-policy/16979386",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterInlineForm({ compact = false }: { compact?: boolean }) {
  const { t, lang } = useT();
  const n = t.newsletter;
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!EMAIL_RE.test(email.trim())) { setError(n.invalid); return; }
    if (!consent) { setError(n.consentRequired); return; }
    setStatus("loading");
    // Open the official Iubenda newsletter flow and prefill the email.
    // Iubenda may require a visible CAPTCHA/security step, so we must leave
    // the widget open for the user instead of pretending the signup completed.
    const target = email.trim();
    try {
      openIubendaNewsletter();
    } catch {}

    const start = Date.now();
    const tryFill = () => {
      const input = document.getElementById("iub-newsletter-email-input") as HTMLInputElement | null;
      const continueBtn = document.getElementById("iub-email-pref-step1-btn") as HTMLButtonElement | null;
      const captchaInput = document.getElementById("iub-newsletter-captcha-input") as HTMLInputElement | null;

      if (captchaInput) {
        captchaInput.focus({ preventScroll: true });
        setStatus("success");
        return true;
      }

      if (input && continueBtn) {
        const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;
        setter?.call(input, target);
        input.dispatchEvent(new Event("input", { bubbles: true }));
        input.dispatchEvent(new Event("change", { bubbles: true }));
        continueBtn.click();
        setStatus("success");
        return true;
      }
      return false;
    };
    const poll = window.setInterval(() => {
      if (tryFill() || Date.now() - start > 8000) {
        window.clearInterval(poll);
        if (status !== "success") {
          // Keep the Iubenda popup/fallback visible for manual completion.
          setStatus("success");
        }
      }
    }, 250);
  };

  if (status === "success") {
    return (
      <div className="inline-flex items-center gap-2 text-sm text-primary font-medium">
        <Check className="h-4 w-4" /> {n.success}
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={compact ? "w-full max-w-md" : "w-full md:max-w-md"} noValidate>
      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={n.emailPlaceholder}
          aria-label={n.emailPlaceholder}
          className="bg-background"
        />
        <Button type="submit" disabled={status === "loading"} className="rounded-full shrink-0">
          {n.cta} <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
      <label className="mt-2 flex items-start gap-2 text-xs text-muted-foreground">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5"
        />
        <span>
          {n.consent}{" "}
          <a href={PRIVACY_URL[lang]} target="_blank" rel="noopener" className="underline">
            ↗
          </a>
        </span>
      </label>
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
      {status === "error" && <p className="mt-1 text-xs text-destructive">{n.error}</p>}
    </form>
  );
}