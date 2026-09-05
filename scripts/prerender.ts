import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawn, spawnSync } from "node:child_process";
import type { Plugin } from "vite";
import { LANGS, localizedPath, publicRoutes } from "./routes";
import { renderTargets } from "./prerender-render";
import type { RenderTarget } from "./prerender-shared";

/**
 * Build-time prerenderer (orchestrator). Splits all public routes × languages
 * into shards rendered by parallel worker processes (scripts/prerender-worker.ts),
 * so the whole static site is written within the build's time budget.
 *
 * Workers need a runtime that executes TypeScript directly (bun). Deployment
 * builds may run on plain Node, where spawning bun fails — in that case we
 * render in-process instead of silently shipping an empty SPA shell.
 * Failures degrade gracefully: unrouted pages keep the SPA template.
 */
export function prerenderPlugin(): Plugin {
  return {
    name: "bmg-prerender",
    apply: "build",
    async closeBundle() {
      try {
        if (process.env.BMG_SKIP_PRERENDER) return;
        const outDir = path.resolve(process.cwd(), "dist");
        const templatePath = path.join(outDir, "index.html");
        if (!fs.existsSync(templatePath)) return;

        const targets: RenderTarget[] = [];
        for (const route of publicRoutes()) {
          for (const lang of LANGS) {
            const url = localizedPath(lang, route.loc);
            const file =
              url === "/" ? path.join(outDir, "index.html") : path.join(outDir, url.replace(/^\//, ""), "index.html");
            targets.push({ url, file });
          }
        }

        // Default path: render in-process. Worker processes need bun, which the
        // publish environment may not provide; only use them when explicitly
        // enabled and bun is confirmed present.
        if (!(process.env.BMG_PRERENDER_WORKERS === "1" && hasBun())) {
          const rendered = await renderTargets(targets);
          console.log(`[prerender] wrote ${rendered}/${targets.length} pages (in-process)`);
          return;
        }

        const workers = Math.min(4, os.cpus().length || 2, targets.length);
        const shards: RenderTarget[][] = Array.from({ length: workers }, () => []);
        targets.forEach((t, i) => shards[i % workers].push(t));

        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "bmg-prerender-"));
        const jobs = shards.map((shard, i) => {
          const shardFile = path.join(tmpDir, `shard-${i}.json`);
          fs.writeFileSync(shardFile, JSON.stringify(shard));
          return runWorker(shardFile);
        });

        const results = await Promise.all(jobs);
        const failed = results.filter((ok) => !ok).length;
        console.log(
          `[prerender] ${targets.length} pages across ${workers} workers` +
            (failed ? ` — ${failed} worker(s) reported skips (SPA fallback for those URLs)` : ""),
        );
        fs.rmSync(tmpDir, { recursive: true, force: true });

        if (failed === results.length) {
          console.warn("[prerender] all workers failed — retrying in-process");
          const rendered = await renderTargets(targets);
          console.log(`[prerender] wrote ${rendered}/${targets.length} pages (in-process fallback)`);
        }
      } catch (error) {
        // Prerendering is an enhancement: never fail the build over it.
        console.warn("[prerender] skipped —", (error as Error)?.message ?? error);
      }
    },

  };
}

function hasBun(): boolean {
  try {
    return spawnSync("bun", ["--version"], { stdio: "ignore" }).status === 0;
  } catch {
    return false;
  }
}

function runWorker(shardFile: string): Promise<boolean> {
  return new Promise((resolve) => {
    const child = spawn("bun", ["scripts/prerender-worker.ts"], {
      env: { ...process.env, BMG_SHARD_FILE: shardFile },
      stdio: ["ignore", "inherit", "inherit"],
    });
    // Hard cap per worker: never let prerendering blow the build deadline.
    const killer = setTimeout(() => {
      child.kill("SIGKILL");
      console.warn(`[prerender] worker for ${path.basename(shardFile)} timed out, killed`);
      resolve(false);
    }, 240_000);
    child.on("close", (code) => {
      clearTimeout(killer);
      resolve(code === 0);
    });
    child.on("error", () => {
      clearTimeout(killer);
      resolve(false);
    });
  });
}

