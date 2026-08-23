import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";
import { useT } from "@/lib/i18n";
import { getLocalizedArticles, formatArticleDate } from "@/lib/analysis";
import { AnalysisFooter } from "@/components/AnalysisFooter";
import { useCanonical } from "@/lib/useCanonical";
import { LangSwitcher } from "@/components/LangSwitcher";

export default function Analysis() {
  const { t, lang } = useT();
  const allArticles = getLocalizedArticles(lang);
  const [query, setQuery] = useState("");
  const norm = (s: string) =>
    s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const articles = useMemo(() => {
    const q = norm(query.trim());
    if (!q) return allArticles;
    const terms = q.split(/\s+/);
    return allArticles.filter((a) => {
      const hay = norm(
        [a.slug, a.title.it, a.title.en, a.title.pt].join(" ")
      );
      return terms.every((term) => hay.includes(term));
    });
  }, [allArticles, query]);
  const heading =
    lang === "it" ? "Analisi" : lang === "pt" ? "Análises" : "Analysis";
  const intro =
    lang === "it"
      ? "Approfondimenti e analisi sul Brasile: regolamentazione, mercato, opportunità."
      : lang === "pt"
      ? "Análises e insights sobre o Brasil: regulação, mercado e oportunidades."
      : "Insights and analysis on Brazil: regulation, market, opportunities.";
  useCanonical("/analysis", {
    title: `${heading} | Business Matching Global`,
    description: intro,
  });
  const back =
    lang === "it" ? "Torna alla home" : lang === "pt" ? "Voltar ao início" : "Back to home";
  const searchLabel =
    lang === "it"
      ? "Cerca tra le analisi"
      : lang === "pt"
      ? "Buscar nas análises"
      : "Search the analyses";
  const noResults =
    lang === "it"
      ? "Nessun risultato per la tua ricerca."
      : lang === "pt"
      ? "Nenhum resultado para sua busca."
      : "No results for your search.";

  return (
    <main className="min-h-screen bg-background">
      <div className="container max-w-3xl py-16 md:py-24">
        <div className="flex items-center justify-between gap-4 mb-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {back}
        </Link>
          <LangSwitcher />
        </div>
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4">{heading}</h1>
        <p className="text-foreground/70 mb-10">{intro}</p>

        <div className="relative mb-8">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/50"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={searchLabel}
            aria-label={searchLabel}
            className="w-full rounded-md border border-border bg-background py-2.5 pl-10 pr-3 text-sm text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

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
                  {formatArticleDate(a, lang)}
                </time>
              </Link>
            </li>
          ))}
        </ul>
        {articles.length === 0 && (
          <p className="py-6 text-sm text-foreground/70">{noResults}</p>
        )}
        <AnalysisFooter />
      </div>
    </main>
  );
}