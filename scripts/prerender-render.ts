import fs from "node:fs";
import path from "node:path";
import { installGlobals, composeHtml, type RenderTarget } from "./prerender-shared";

/**
 * Renders a list of routes into static HTML files inside dist/.
 * Used both by the parallel worker process (scripts/prerender-worker.ts) and,
 * when no separate runtime is available to spawn workers, directly inside the
 * Vite build process.
 */
export async function renderTargets(targets: RenderTarget[]): Promise<number> {
  const outDir = path.resolve(process.cwd(), "dist");
  const template = fs.readFileSync(path.join(outDir, "index.html"), "utf8");

  const { JSDOM } = await import("jsdom");
  const { createServer } = await import("vite");

  const dom = new JSDOM(template, { url: "https://businessmatching.global/", pretendToBeVisual: true });
  installGlobals(dom);

  const server = await createServer({
    mode: "production",
    configFile: false,
    root: process.cwd(),
    server: { middlewareMode: true, hmr: false },
    appType: "custom",
    logLevel: "error",
    // SSR markup doesn't need CSS transforms; skip PostCSS config loading
    // (it crashes with a stack overflow when loaded via a configless server).
    css: { postcss: { plugins: [] } },
    esbuild: { jsx: "automatic", jsxDev: false },
    resolve: { alias: { "@": path.resolve(process.cwd(), "src") } },
    plugins: [],
  });

  let rendered = 0;
  try {
    const mod = (await server.ssrLoadModule("/src/prerender.tsx")) as {
      renderPage: () => Promise<{ html: string; head: string; title: string }>;
    };
    for (const target of targets) {
      try {
        dom.reconfigure({ url: "https://businessmatching.global" + target.url });
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
    try {
      await server.close();
    } catch {
      // Closing the throwaway SSR server must never fail the build.
    }
    dom.window.close();
  }
  return rendered;
}
