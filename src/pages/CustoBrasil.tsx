import { useEffect, useState } from "react";
import { useT } from "@/lib/i18n";
import { NEWSLETTER_FALLBACK_KEY, openIubendaNewsletter } from "@/lib/consent";

const TARGET = "https://www.linkedin.com/company/109746306/admin/page-posts/published/";

export default function CustoBrasil() {
  const { t } = useT();
  const [isNewsletter, setIsNewsletter] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fallbackRequested = (() => {
      try {
        return sessionStorage.getItem(NEWSLETTER_FALLBACK_KEY) === "1";
      } catch {
        return false;
      }
    })();
    const showNewsletter =
      window.location.hash === "#newsletter" || params.get("newsletter") === "1" || fallbackRequested;

    if (showNewsletter) {
      setIsNewsletter(true);
      try {
        sessionStorage.removeItem(NEWSLETTER_FALLBACK_KEY);
      } catch {}
    } else {
      window.location.replace(TARGET);
    }

    const onFallback = () => setIsNewsletter(true);
    window.addEventListener("bmg-show-newsletter-fallback", onFallback);
    return () => window.removeEventListener("bmg-show-newsletter-fallback", onFallback);
  }, []);

  if (!isNewsletter) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center gap-4">
        <h1 className="text-2xl md:text-3xl">Custo Brasil — Insights on LinkedIn</h1>
        <p className="text-sm text-foreground/70">
          Redirecting you to our Custo Brasil page on LinkedIn…{" "}
          <a href={TARGET} target="_blank" rel="noopener" className="underline">
            Open the Custo Brasil LinkedIn page
          </a>
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center gap-6">
      <section id="newsletter" className="max-w-2xl">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">{t.newsletter.title}</h1>
        <p className="text-foreground/80 mb-6">{t.newsletter.body}</p>
        <button
          type="button"
          onClick={() => openIubendaNewsletter()}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          {t.newsletter.cta}
        </button>
      </section>
    </main>
  );
}
