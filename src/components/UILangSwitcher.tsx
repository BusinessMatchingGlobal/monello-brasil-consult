import type { UILang } from "@/pages/Fly";

/** Inline SVG flags — emoji flags do not render on Windows. */
const FlagIT = (p: { className?: string }) => (
  <svg viewBox="0 0 3 2" className={p.className} aria-hidden="true">
    <rect width="1" height="2" x="0" fill="#009246" />
    <rect width="1" height="2" x="1" fill="#fff" />
    <rect width="1" height="2" x="2" fill="#ce2b37" />
  </svg>
);

const FlagGB = (p: { className?: string }) => (
  <svg viewBox="0 0 60 30" className={p.className} aria-hidden="true">
    <rect width="60" height="30" fill="#012169" />
    <path d="M0,0 60,30 M60,0 0,30" stroke="#fff" strokeWidth="6" />
    <path d="M0,0 60,30 M60,0 0,30" stroke="#c8102e" strokeWidth="4" />
    <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10" />
    <path d="M30,0 V30 M0,15 H60" stroke="#c8102e" strokeWidth="6" />
  </svg>
);

const FlagBR = (p: { className?: string }) => (
  <svg viewBox="0 0 30 21" className={p.className} aria-hidden="true">
    <rect width="30" height="21" fill="#009c3b" />
    <path d="M15 2.5 27.5 10.5 15 18.5 2.5 10.5Z" fill="#ffdf00" />
    <circle cx="15" cy="10.5" r="4.6" fill="#002776" />
  </svg>
);

const FlagES = (p: { className?: string }) => (
  <svg viewBox="0 0 3 2" className={p.className} aria-hidden="true">
    <rect width="3" height="2" fill="#aa151b" />
    <rect width="3" height="1" y="0.5" fill="#f1bf00" />
  </svg>
);

const LANGS: { code: UILang; label: string; Flag: (p: { className?: string }) => JSX.Element }[] = [
  { code: "it", label: "IT", Flag: FlagIT },
  { code: "en", label: "EN", Flag: FlagGB },
  { code: "pt", label: "PT-BR", Flag: FlagBR },
  { code: "es", label: "ES", Flag: FlagES },
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
            <l.Flag className="h-3 w-[18px] rounded-[1px] ring-1 ring-black/10 shrink-0" />
            {l.label}
          </button>
          {i < LANGS.length - 1 && <span className="text-border">/</span>}
        </div>
      ))}
    </div>
  );
}