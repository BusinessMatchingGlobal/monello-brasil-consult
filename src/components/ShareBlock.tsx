import { useState } from "react";
import { Link2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useT } from "@/lib/i18n";

const COPY = {
  it: { invite: "Utile per un collega? Condividilo.", copy: "Copia link", copied: "Link copiato" },
  en: { invite: "Is this helpful to a colleague? Share it.", copy: "Copy link", copied: "Link copied" },
  pt: { invite: "Útil para um colega? Compartilhe.", copy: "Copiar link", copied: "Link copiado" },
} as const;

type Props = { title: string };

export function ShareBlock({ title }: Props) {
  const { lang } = useT();
  const c = COPY[lang];
  const [copied, setCopied] = useState(false);

  const CANONICAL_HOST = "https://businessmatching.global";
  const url =
    typeof window !== "undefined"
      ? `${CANONICAL_HOST}${window.location.pathname}${window.location.search}${window.location.hash}`
      : CANONICAL_HOST;
  const encodedUrl = encodeURIComponent(url);
  const waText = encodeURIComponent(`${title} — ${url}`);
  const linkedin = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const whatsapp = `https://wa.me/?text=${waText}`;

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); } catch { /* noop */ }
      ta.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section aria-label={c.invite} className="not-prose mt-12 mb-4">
      <p className="text-sm text-foreground/75 mb-3">{c.invite}</p>
      <div className="flex flex-wrap items-center gap-2">
        <Button asChild variant="outline" size="sm">
          <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true" className="mr-2">
              <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.26 2.36 4.26 5.43v6.31zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.44c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/>
            </svg>
            LinkedIn
          </a>
        </Button>
        <Button asChild variant="outline" size="sm">
          <a href={whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true" className="mr-2">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.031-.967-.273-.099-.471-.148-.67.15-.198.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.511-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
            </svg>
            WhatsApp
          </a>
        </Button>
        <Button variant="outline" size="sm" onClick={onCopy} aria-label={c.copy}>
          {copied ? <Check className="mr-2 h-4 w-4" /> : <Link2 className="mr-2 h-4 w-4" />}
          {copied ? c.copied : c.copy}
        </Button>
      </div>
    </section>
  );
}

export default ShareBlock;