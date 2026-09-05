import fs from "node:fs";
import path from "node:path";
import { renderTargets } from "./prerender-render";
import type { RenderTarget } from "./prerender-shared";

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
  const rendered = await renderTargets(targets);
  console.log(`[prerender:${path.basename(shardFile)}] wrote ${rendered}/${targets.length}`);
  // Force exit: lingering timers from the rendered app would keep bun alive.
  process.exit(rendered === targets.length ? 0 : 1);
}

main().catch((error) => {
  console.error("[prerender worker failed]", error);
  process.exit(1);
});
