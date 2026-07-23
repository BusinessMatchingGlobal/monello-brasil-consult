import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useT } from "@/lib/i18n";
import { getSortedArticles } from "@/lib/analysis";
import { AnalysisFooter } from "@/components/AnalysisFooter";
import { useCanonical } from "@/lib/useCanonical";

export default function Analysis() {
  const { t, lang } = useT();
  const articles = getSortedArticles();
  const heading =
    lang === "it" ? "Analisi" : lang === "pt" ? "Análises" : "Analysis";
  const intro =
    lang === "it"
      ? "Approfondimenti e analisi sul Brasile: regolamentazione, mercato, opportunità."
      : lang === "pt"
      ? "Análises e insights sobre o Brasil: regulação, mercado e oportunidades."
      : "Insights and analysis on Brazil: regulation, market, opportunities.";
  useCanonical("/analysis", {
    title: `${heading} — Business Matching Global`,
    description: intro,
  });
  const back =
    lang === "it" ? "Torna alla home" : lang === "pt" ? "Voltar ao início" : "Back to home";

  return (
    <main className="min-h-screen bg-background">
      <div className="container max-w-3xl py-16 md:py-24">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          {back}
        </Link>
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4">{heading}</h1>
        <p className="text-foreground/70 mb-10">{intro}</p>

        <ul className="divide-y divide-border/60 border-y border-border/60">
          {articles.map((a) => (
            <li key={a.slug}>
              <Link
                to={`/${a.slug}`}
                className="flex items-baseline justify-between gap-4 py-5 group"
              >
                <span className="text-lg md:text-xl text-foreground group-hover:underline">
                  {a.title[lang]}
                </span>
                <time className="shrink-0 text-xs text-foreground/70 tabular-nums">
                  {a.date}
                </time>
              </Link>
            </li>
          ))}
        </ul>
        <AnalysisFooter />
      </div>
    </main>
  );
}