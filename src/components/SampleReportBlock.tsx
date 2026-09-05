import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useT } from "@/lib/i18n";

/** Renders the "see the deliverable" block only when the service defines a sampleReport URL. */
export function SampleReportBlock({ url, className = "" }: { url?: string; className?: string }) {
  const { t } = useT();
  if (!url) return null;
  const external = url.startsWith("http");
  const label = (
    <>
      {t.sampleBlock.cta} <ArrowUpRight className="h-4 w-4" />
    </>
  );
  return (
    <div className={`mt-5 rounded-xl border border-background/15 bg-background/[0.03] p-4 ${className}`}>
      <p className="text-sm text-background/85">{t.sampleBlock.title}</p>
      {external ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-amber transition-colors"
        >
          {label}
        </a>
      ) : (
        <Link
          to={url}
          className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-amber transition-colors"
        >
          {label}
        </Link>
      )}
    </div>
  );
}
