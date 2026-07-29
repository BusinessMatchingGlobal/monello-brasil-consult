import { useNavigate } from "react-router-dom";
import { useT, type Lang } from "@/lib/i18n";

const LANGS: Lang[] = ["en", "it", "pt"];

/**
 * Language switcher for inner pages.
 * `to` (optional): route to navigate to after switching — useful for pages
 * that exist as separate language variants sharing one localized URL.
 */
export function LangSwitcher({ to, className = "" }: { to?: string; className?: string }) {
  const { lang, setLang } = useT();
  const navigate = useNavigate();

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
            aria-label={l === "pt" ? "PT-BR" : l.toUpperCase()}
            className={`px-1.5 py-1 transition-colors ${
              lang === l ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {l === "pt" ? "PT-BR" : l.toUpperCase()}
          </button>
          {i < LANGS.length - 1 && <span className="text-border">/</span>}
        </div>
      ))}
    </div>
  );
}
