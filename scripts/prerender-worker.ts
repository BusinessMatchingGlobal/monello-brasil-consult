import fs from "node:fs";
import path from "node:path";
import { installGlobals, composeHtml, type RenderTarget } from "./prerender-shared";

/**
 * Worker process: renders its shard of routes into static HTML files.
 * Invoked by scripts/prerender.ts with BMG_SHARD_FILE pointing at a JSON
 * array of { url, file } targets. Runs its own JSDOM + Vite server so
 * multiple shards render in parallel without sharing globals.
 */
async function main() {
  const shardFile = process.env.BMG_SHARD_FILE;
  if (!shardFile) throw new Error("BMG_SHARD_FILE not set");
  const targets = JSON.parse(fs.readFileSync(shardFile, "utf8")) as RenderTarget[];
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
    await server.close();
    dom.window.close();
  }
  console.log(`[prerender:${path.basename(shardFile)}] wrote ${rendered}/${targets.length}`);
  // Force exit: lingering timers from the rendered app would keep bun alive.
  process.exit(rendered === targets.length ? 0 : 1);
}

main().catch((error) => {
  console.error("[prerender worker failed]", error);
  process.exit(1);
});
