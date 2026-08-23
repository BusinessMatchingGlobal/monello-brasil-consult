import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";
import { ANALYSIS_ARTICLES, getGroupSlug } from "../src/lib/analysis";

const SITE = "https://businessmatching.global";

// Non-article routes. Article URLs are derived automatically from the
// analysis registry, so publishing a new article needs no manual edit here.
const STATIC_ROUTES: Array<{ loc: string; changefreq: string; priority: string }> = [
  { loc: "/", changefreq: "weekly", priority: "1.0" },
  { loc: "/About_us", changefreq: "monthly", priority: "0.8" },
  { loc: "/Our_Services", changefreq: "monthly", priority: "0.9" },
  { loc: "/custo-brasil", changefreq: "weekly", priority: "0.8" },
  { loc: "/analysis", changefreq: "weekly", priority: "0.9" },
  { loc: "/news", changefreq: "monthly", priority: "0.8" },
  { loc: "/sace", changefreq: "monthly", priority: "0.7" },
  { loc: "/pharma", changefreq: "monthly", priority: "0.7" },
  { loc: "/eudr", changefreq: "monthly", priority: "0.7" },
  { loc: "/BT", changefreq: "monthly", priority: "0.8" },
  { loc: "/fly", changefreq: "monthly", priority: "0.5" },
  { loc: "/sample-report", changefreq: "monthly", priority: "0.7" },
  { loc: "/guides/doing-business-in-brazil", changefreq: "monthly", priority: "0.8" },
  { loc: "/servizi/business-matching", changefreq: "monthly", priority: "0.8" },
  { loc: "/servicos/business-matching", changefreq: "monthly", priority: "0.8" },
  { loc: "/services/business-matching", changefreq: "monthly", priority: "0.8" },
  { loc: "/privacy", changefreq: "yearly", priority: "0.3" },
  { loc: "/unsubscribe", changefreq: "yearly", priority: "0.2" },
];

export function buildSitemap(): string {
  const seen = new Set<string>();
  const entries: string[] = [];

  for (const r of STATIC_ROUTES) {
    seen.add(r.loc);
    entries.push(
      `  <url>\n    <loc>${SITE}${r.loc}</loc>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`,
    );
  }

  const articles = [...ANALYSIS_ARTICLES].sort((a, b) => (a.date < b.date ? 1 : -1));
  for (const article of articles) {
    const loc = `/${getGroupSlug(article)}`;
    if (seen.has(loc)) continue;
    seen.add(loc);
    entries.push(
      `  <url>\n    <loc>${SITE}${loc}</loc>\n    <lastmod>${article.updated ?? article.date}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>`,
    );
  }

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join("\n")}\n</urlset>\n`;
}

/** Regenerates public/sitemap.xml on dev start and on every build. */
export function sitemapPlugin(): Plugin {
  const write = () => {
    const target = path.resolve(process.cwd(), "public/sitemap.xml");
    const xml = buildSitemap();
    const current = fs.existsSync(target) ? fs.readFileSync(target, "utf8") : "";
    if (current !== xml) fs.writeFileSync(target, xml);
  };
  return {
    name: "bmg-sitemap",
    buildStart: write,
    configureServer: write,
  };
}
