import type { UILang } from "@/pages/Fly";

const LANGS: { code: UILang; label: string; flag: string }[] = [
  { code: "it", label: "IT", flag: "🇮🇹" },
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "pt", label: "PT-BR", flag: "🇧🇷" },
  { code: "es", label: "ES", flag: "🇪🇸" },
];

/** 4-language switcher (IT / EN / PT-BR / ES) for Calliphora pages. */
export function UILangSwitcher({
  value,
  onChange,
  className = "",
}: {
  value: UILang;
  onChange: (l: UILang) => void;
  className?: string;
}) {
  return (
    <div className={`inline-flex items-center gap-1 text-xs font-medium tracking-wider uppercase ${className}`}>
      {LANGS.map((l, i) => (
        <div key={l.code} className="flex items-center">
          <button
            type="button"
            onClick={() => onChange(l.code)}
            aria-label={l.label}
            aria-current={value === l.code ? "true" : undefined}
            className={`px-1.5 py-1 transition-colors inline-flex items-center gap-1 ${
              value === l.code ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span aria-hidden="true" className="text-sm leading-none">{l.flag}</span>
            {l.label}
          </button>
          {i < LANGS.length - 1 && <span className="text-border">/</span>}
        </div>
      ))}
    </div>
  );
}