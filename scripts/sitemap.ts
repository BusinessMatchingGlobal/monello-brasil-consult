import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";
import { LANGS, SITE, localizedPath, publicRoutes } from "./routes";

const HREFLANG: Record<string, string> = { en: "en", it: "it", pt: "pt-BR" };

export function buildSitemap(): string {
  const entries: string[] = [];

  for (const route of publicRoutes()) {
    for (const lang of LANGS) {
      const alternates = LANGS.map(
        (l) =>
          `    <xhtml:link rel="alternate" hreflang="${HREFLANG[l]}" href="${SITE}${localizedPath(l, route.loc)}" />`,
      ).join("\n");
      entries.push(
        [
          `  <url>`,
          `    <loc>${SITE}${localizedPath(lang, route.loc)}</loc>`,
          route.lastmod ? `    <lastmod>${route.lastmod}</lastmod>` : null,
          `    <changefreq>${route.changefreq}</changefreq>`,
          `    <priority>${route.priority}</priority>`,
          alternates,
          `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}${localizedPath("en", route.loc)}" />`,
          `  </url>`,
        ]
          .filter(Boolean)
          .join("\n"),
      );
    }
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
