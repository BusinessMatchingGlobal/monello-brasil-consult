import { useEffect, useState } from "react";
import { useT } from "@/lib/i18n";

const TARGET = "https://www.linkedin.com/company/109746306/admin/page-posts/published/";

export default function CustoBrasil() {
  const { t } = useT();
  const [isNewsletter, setIsNewsletter] = useState(false);

  useEffect(() => {
    if (window.location.hash === "#newsletter") {
      setIsNewsletter(true);
    } else {
      window.location.replace(TARGET);
    }
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
          onClick={() => {
            const w = window as any;
            const newsletter = w._iub?.cs?.api?.emailMarketing?.();
            if (newsletter && typeof newsletter.init === "function") {
              try {
                const original = newsletter.configuration?.showFromPageView;
                if (newsletter.configuration && typeof newsletter.configuration === "object") {
                  newsletter.configuration.showFromPageView = 0;
                }
                newsletter.init();
                if (original !== undefined) newsletter.configuration.showFromPageView = original;
              } catch {
                window.location.href = TARGET;
              }
            } else {
              window.location.href = TARGET;
            }
          }}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          {t.newsletter.cta}
        </button>
      </section>
    </main>
  );
}
