import { useNavigate } from "react-router-dom";
import { useT } from "@/lib/i18n";
import { SITE_LANG_LABEL } from "@/lib/displayLang";
import { availablePageLanguages } from "@/lib/langPath";

/**
 * Language switcher for inner pages.
 * `to` (optional): route to navigate to after switching — useful for pages
 * that exist as separate language variants sharing one localized URL.
 */
export function LangSwitcher({ to, className = "" }: { to?: string; className?: string }) {
  const { siteLang, setLang } = useT();
  const navigate = useNavigate();
  const LANGS = availablePageLanguages(typeof window === "undefined" ? "/" : window.location.pathname);

  return (
    <div className={`inline-flex items-center gap-1 text-xs font-medium tracking-wider uppercase ${className}`}>
      {LANGS.map((l, i) => (
        <div key={l} className="flex items-center">
          <button
            type="button"
            onClick={() => {
              setLang(l);
              if (to) navigate(to);
            }}
            aria-label={SITE_LANG_LABEL[l]}
            className={`px-1.5 py-1 transition-colors ${
              siteLang === l ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {SITE_LANG_LABEL[l]}
          </button>
          {i < LANGS.length - 1 && <span className="text-border">/</span>}
        </div>
      ))}
    </div>
  );
}
