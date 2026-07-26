import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { useT } from "@/lib/i18n";
import { getLocalizedArticles } from "@/lib/analysis";

type Props = {
  variant?: "desktop" | "mobile";
  onNavigate?: () => void;
};

export function AnalysisNavMenu({ variant = "desktop", onNavigate }: Props) {
  const { t, lang } = useT();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const articles = getLocalizedArticles(lang, 6);

  useEffect(() => {
    if (variant !== "desktop") return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [variant]);

  if (variant === "mobile") {
    return (
      <div className="flex flex-col">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex items-center justify-between text-base py-2"
          aria-expanded={open}
        >
          <span>{t.nav.analysis}</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
        {open && (
          <div className="flex flex-col gap-2 pl-3 pb-2 border-l border-border/60">
            {articles.map((a) => (
              <Link
                key={a.slug}
                to={`/${a.slug}`}
                onClick={onNavigate}
                className="text-sm py-1 text-foreground/80"
              >
                {a.title[lang]}
              </Link>
            ))}
            <Link
              to="/analysis"
              onClick={onNavigate}
              className="text-sm py-1 font-medium text-foreground"
            >
              {t.nav.analysisAll}
            </Link>
          </div>
        )}
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setOpen(true)}
        className="flex items-center gap-1 text-sm text-foreground/75 hover:text-foreground transition-colors"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {t.nav.analysis}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div
          onMouseLeave={() => setOpen(false)}
          className="absolute right-0 top-full mt-2 w-80 rounded-xl border border-border/60 bg-background/95 backdrop-blur-md shadow-lg p-2 z-50"
          role="menu"
        >
          {articles.map((a) => (
            <Link
              key={a.slug}
              to={`/${a.slug}`}
              onClick={() => setOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm text-foreground/85 hover:bg-foreground/5 hover:text-foreground"
              role="menuitem"
            >
              {a.title[lang]}
            </Link>
          ))}
          <div className="my-1 border-t border-border/60" />
          <Link
            to="/analysis"
            onClick={() => setOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-foreground/5"
            role="menuitem"
          >
            {t.nav.analysisAll}
          </Link>
        </div>
      )}
    </div>
  );
}