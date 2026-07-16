import { FormEvent, useState } from "react";
import { useT } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Check } from "lucide-react";

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
    try {
      const w = window as unknown as {
        _iub?: { cons_instructions?: unknown[]; cs?: { newsletter?: { subscribe?: (e: string) => void } } };
      };
      w._iub = w._iub || {};
      w._iub.cons_instructions = w._iub.cons_instructions || [];
      w._iub.cons_instructions.push([
        "submit",
        {
          form: { elements: [{ name: "email", value: email.trim() }] },
          subject: { email: email.trim() },
          preferences: { newsletter: true, privacy_policy: true },
        },
      ]);
      try { w._iub?.cs?.newsletter?.subscribe?.(email.trim()); } catch {}
    } catch {}
    window.setTimeout(() => setStatus("success"), 600);
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