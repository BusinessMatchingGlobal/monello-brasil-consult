import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";
import { LANGS, SITE, localizedPath, publicRoutes } from "./routes";

/**
 * Build-time prerenderer: renders every public route in every language inside a
 * JSDOM window and writes a static HTML file, so crawlers (and anyone without
 * JavaScript) receive the real text of the page.
 */
export function prerenderPlugin(): Plugin {
  return {
    name: "bmg-prerender",
    apply: "build",
    async closeBundle() {
      if (process.env.BMG_SKIP_PRERENDER) return;
      const outDir = path.resolve(process.cwd(), "dist");
      const templatePath = path.join(outDir, "index.html");
      if (!fs.existsSync(templatePath)) return;
      const template = fs.readFileSync(templatePath, "utf8");

      const { JSDOM } = await import("jsdom");
      const { createServer } = await import("vite");

      const dom = new JSDOM(template, { url: SITE + "/", pretendToBeVisual: true });
      installGlobals(dom);

      const server = await createServer({
        server: { middlewareMode: true, hmr: false },
        appType: "custom",
        logLevel: "error",
        plugins: [],
      });

      const targets: Array<{ url: string; file: string }> = [];
      for (const route of publicRoutes()) {
        for (const lang of LANGS) {
          const url = localizedPath(lang, route.loc);
          const file =
            url === "/" ? path.join(outDir, "index.html") : path.join(outDir, url.replace(/^\//, ""), "index.html");
          targets.push({ url, file });
        }
      }

      let rendered = 0;
      try {
        const mod = (await server.ssrLoadModule("/src/prerender.tsx")) as {
          renderPage: () => Promise<{ html: string; head: string; title: string }>;
        };

        for (const target of targets) {
          try {
            dom.reconfigure({ url: SITE + target.url });
            dom.window.document.getElementById("root")!.innerHTML = "";
            const result = await mod.renderPage();
            const html = composeHtml(template, result, JSDOM);
            fs.mkdirSync(path.dirname(target.file), { recursive: true });
            fs.writeFileSync(target.file, html);
            rendered += 1;
          } catch (error) {
            console.warn(`[prerender] skipped ${target.url}:`, (error as Error).message);
          }
        }
      } finally {
        await server.close();
        dom.window.close();
      }
      console.log(`[prerender] wrote ${rendered}/${targets.length} pages`);
    },
  };
}

const HEAD_SELECTORS = [
  'meta[name="description"]',
  'meta[property^="og:"]',
  'meta[name^="twitter:"]',
  'link[rel="canonical"]',
  'link[rel="alternate"]',
  'script#article-jsonld',
];

function composeHtml(
  template: string,
  result: { html: string; head: string; title: string },
  JSDOM: typeof import("jsdom").JSDOM,
): string {
  const out = new JSDOM(template);
  const doc = out.window.document;
  const src = new JSDOM(`<head>${result.head}</head>`).window.document;

  if (result.title) {
    let titleEl = doc.querySelector("title");
    if (!titleEl) {
      titleEl = doc.createElement("title");
      doc.head.appendChild(titleEl);
    }
    titleEl.textContent = result.title;
  }

  for (const selector of HEAD_SELECTORS) {
    doc.head.querySelectorAll(selector).forEach((el) => el.remove());
    src.head.querySelectorAll(selector).forEach((el) => doc.head.appendChild(doc.importNode(el, true)));
  }

  const html = doc.querySelector("html");
  const lang = src.head.querySelector('meta[property="og:locale"]')?.getAttribute("content");
  if (html && lang) html.setAttribute("lang", lang.split("_")[0]);

  const root = doc.getElementById("root");
  if (root) root.innerHTML = result.html;

  return `<!doctype html>\n${doc.documentElement.outerHTML}`;
}

function installGlobals(dom: import("jsdom").JSDOM) {
  const win = dom.window as unknown as Record<string, unknown> & { document: Document };
  const g = globalThis as unknown as Record<string, unknown>;
  const define = (key: string, value: unknown) => {
    try {
      g[key] = value;
    } catch {
      Object.defineProperty(g, key, { value, configurable: true, writable: true });
    }
  };
  define("window", win);
  define("document", win.document);
  define("navigator", win.navigator);
  define("location", win.location);
  define("history", win.history);
  define("localStorage", win.localStorage);
  define("sessionStorage", win.sessionStorage);
  g.requestAnimationFrame = (cb: FrameRequestCallback) => setTimeout(() => cb(Date.now()), 0) as unknown as number;
  g.cancelAnimationFrame = (id: number) => clearTimeout(id);
  for (const key of [
    "HTMLElement",
    "Element",
    "Node",
    "Event",
    "CustomEvent",
    "MutationObserver",
    "getComputedStyle",
    "DOMParser",
    "SVGElement",
    "Image",
    "CSS",
  ]) {
    if (g[key] === undefined) g[key] = (win as Record<string, unknown>)[key];
  }
  if (g.matchMedia === undefined) {
    g.matchMedia = (query: string) => ({
      matches: false,
      media: query,
      addEventListener() {},
      removeEventListener() {},
      addListener() {},
      removeListener() {},
      onchange: null,
      dispatchEvent: () => false,
    });
  }
  (win as Record<string, unknown>).matchMedia = g.matchMedia;
  if ((win as Record<string, unknown>).IntersectionObserver === undefined) {
    class IO {
      observe() {}
      unobserve() {}
      disconnect() {}
      takeRecords() {
        return [];
      }
    }
    (win as Record<string, unknown>).IntersectionObserver = IO;
    g.IntersectionObserver = IO;
  }
  if ((win as Record<string, unknown>).ResizeObserver === undefined) {
    class RO {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
    (win as Record<string, unknown>).ResizeObserver = RO;
    g.ResizeObserver = RO;
  }
  win.document.body.scrollTo = () => {};
  (win as unknown as { scrollTo: () => void }).scrollTo = () => {};
}
