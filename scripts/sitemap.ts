import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";
import { DISPLAY_LANGS, LANGS, SITE, displayBrPath, displayEuPath, localizedPath, publicRoutes, routePath } from "./routes";

const HREFLANG: Record<string, string> = { en: "en", it: "it", pt: "pt-BR", de: "de", es: "es", fr: "fr" };

export function buildSitemap(): string {
  const entries: string[] = [];

  const pushCluster = (cluster: Array<{ lang: string; href: string }>, meta: { lastmod?: string; changefreq: string; priority: string }, xDefault: string | null) => {
    const alternates = cluster
      .map(({ lang, href }) => `    <xhtml:link rel="alternate" hreflang="${HREFLANG[lang]}" href="${SITE}${href}" />`)
      .join("\n");
    for (const { href } of cluster) {
      entries.push(
        [
          `  <url>`,
          `    <loc>${SITE}${href}</loc>`,
          meta.lastmod ? `    <lastmod>${meta.lastmod}</lastmod>` : null,
          `    <changefreq>${meta.changefreq}</changefreq>`,
          `    <priority>${meta.priority}</priority>`,
          alternates,
          xDefault ? `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}${xDefault}" />` : null,
          `  </url>`,
        ]
          .filter(Boolean)
          .join("\n"),
      );
    }
  };

  for (const route of publicRoutes()) {
    const main = LANGS.map((lang) => ({ lang, href: routePath(lang, route) }))
      .filter((e): e is { lang: (typeof LANGS)[number]; href: string } => Boolean(e.href));
    const eu = DISPLAY_LANGS.map((lang) => ({ lang, href: displayEuPath(lang, route) }))
      .filter((e): e is { lang: (typeof DISPLAY_LANGS)[number]; href: string } => Boolean(e.href));
    if (main.length) pushCluster([...main, ...eu], route, routePath("en", route) ?? localizedPath("en", route.loc));
    // Brazil → Europe pages in DE/ES/FR address another audience: they form their own cluster.
    const br = DISPLAY_LANGS.map((lang) => ({ lang, href: displayBrPath(lang, route) }))
      .filter((e): e is { lang: (typeof DISPLAY_LANGS)[number]; href: string } => Boolean(e.href));
    if (br.length) pushCluster(br, route, null);
  }

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries.join("\n")}\n</urlset>\n`;
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
