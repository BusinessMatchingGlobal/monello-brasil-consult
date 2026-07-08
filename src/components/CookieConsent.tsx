import { useEffect, useState } from "react";
import { useT } from "@/lib/i18n";
import { getConsent, setConsent } from "@/lib/consent";

const copy = {
  en: {
    text: "We use cookies to analyze site traffic and improve your experience. Analytics cookies are optional.",
    accept: "Accept",
    decline: "Decline",
  },
  it: {
    text: "Utilizziamo cookie per analizzare il traffico del sito e migliorare la tua esperienza. I cookie analitici sono facoltativi.",
    accept: "Accetta",
    decline: "Rifiuta",
  },
  pt: {
    text: "Utilizamos cookies para analisar o tráfego do site e melhorar sua experiência. Os cookies analíticos são opcionais.",
    accept: "Aceitar",
    decline: "Recusar",
  },
};

export function CookieConsent() {
  const { lang } = useT();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (getConsent() === null) setOpen(true);
    const onOpen = () => setOpen(true);
    window.addEventListener("bmg-open-consent", onOpen);
    return () => window.removeEventListener("bmg-open-consent", onOpen);
  }, []);

  if (!open) return null;
  const c = copy[lang];

  const choose = (v: "accepted" | "declined") => {
    setConsent(v);
    setOpen(false);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border shadow-elegant"
      style={{ backgroundColor: "#F9F8F5" }}
    >
      <div className="container py-4 flex flex-col md:flex-row md:items-center gap-4 justify-between">
        <p className="text-sm text-foreground max-w-3xl leading-relaxed">{c.text}</p>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => choose("declined")}
            className="px-4 py-2 text-sm font-medium border border-border rounded-md text-foreground hover:bg-muted transition-colors"
          >
            {c.decline}
          </button>
          <button
            onClick={() => choose("accepted")}
            className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity"
          >
            {c.accept}
          </button>
        </div>
      </div>
    </div>
  );
}