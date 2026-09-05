import fs from "node:fs";
import { buildMethodContent } from "./mcpContent";

const docs = buildMethodContent();
fs.writeFileSync(
  "public/mcp/method.json",
  JSON.stringify({ generatedAt: null, method: docs }) + "\n",
);
console.log("docs:", docs.map((d) => `${d.slug}:${d.lang}`).join(", "));

// --- Retrieval check: replicate the Ask BMG scoring on the local archive ---
import { scoreArticle, classifyCoverage } from "../supabase/functions/_shared/bmg-content";

const read = (p: string, key: string) =>
  (JSON.parse(fs.readFileSync(p, "utf8"))[key] ?? []).map((x: any) => ({ ...x }));
const all = [
  ...read("public/mcp/articles.json", "articles"),
  ...read("public/mcp/guides.json", "guides"),
  ...read("public/mcp/services.json", "services"),
  ...docs,
];

for (const q of ["cosa significa alétheia", "come verificate le fonti", "cos'è la fase zero"]) {
  const ranked = all
    .map((a: any) => ({ a, s: scoreArticle(a, q) }))
    .sort((x: any, y: any) => y.s - x.s)
    .slice(0, 3);
  const top = ranked[0];
  console.log(
    `\nQ: ${q}\n  coverage: ${classifyCoverage(top.a, q, top.s)}\n  top: ${top.a.slug}:${top.a.lang} (${top.s})`,
    ranked.map((r: any) => `${r.a.slug}:${r.a.lang}=${r.s}`).join(" | "),
  );
}
