import { createClient } from "npm:@supabase/supabase-js@2";
import {
  citation,
  classifyCoverage,
  loadDocuments,
  scoreArticle,
  type ArticleContent,
} from "../_shared/bmg-content.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const MAX_QUESTION = 500;
const DOC_CHARS = 6000;

const SYSTEM_PROMPT = `You are Ask BMG, the assistant of Business Matching Global (businessmatching.global), an independent business-intelligence firm covering Brazil–Europe trade. Answer ONLY from the provided BMG content. The BMG service catalogue (Our_Services) is part of that content: when the user asks what BMG does, which service fits their need, or about prices, describe the relevant services with their starting price and link https://businessmatching.global/Our_Services. Reply in the language the user writes in (any language). Cite the title and URL of every document you use. If the provided content does not cover the question, say clearly that BMG has not published on that point, do NOT answer from general knowledge, and point the user to the bespoke Ask Brazil / Ask Europe service at https://businessmatching.global/Our_Services. Never invent facts, numbers or services. Keep answers under 250 words.`;

const TEMPORARY_LIMIT_MSG: Record<string, string> = {
  it: "Il servizio AI è temporaneamente occupato. Riprova tra qualche istante.",
  en: "The AI service is temporarily busy. Please try again in a moment.",
  pt: "O serviço de IA está temporariamente ocupado. Tente novamente em instantes.",
};

const TOO_LONG: Record<string, string> = {
  it: "La domanda è troppo lunga (massimo 500 caratteri).",
  en: "Your question is too long (500 characters maximum).",
  pt: "A pergunta é longa demais (máximo de 500 caracteres).",
};

function json(status: number, body: unknown) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function detectLanguage(text: string): string {
  const t = ` ${text.toLowerCase()} `;
  const it = [" il ", " che ", " sono ", " quali ", " come ", " perché ", " della ", " gli ", " cosa "];
  const pt = [" que ", " como ", " são ", " para ", " não ", " quais ", " porque ", " uma ", " dos "];
  const en = [" the ", " what ", " how ", " does ", " are ", " which ", " why ", " of ", " is "];
  const count = (arr: string[]) => arr.filter((w) => t.includes(w)).length;
  const scores: Array<[string, number]> = [["it", count(it)], ["pt", count(pt)], ["en", count(en)]];
  scores.sort((a, b) => b[1] - a[1]);
  return scores[0][1] > 0 ? scores[0][0] : "en";
}

function docBlock(article: ArticleContent): string {
  const text = article.text.length > DOC_CHARS
    ? `${article.text.slice(0, DOC_CHARS)}…`
    : article.text;
  return `### ${article.title}\nURL: ${article.url}\nCITE AS: ${citation(article)}\n\n${text}`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json(405, { error: "method_not_allowed" });

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const aiKey = Deno.env.get("LOVABLE_API_KEY");
  if (!supabaseUrl || !serviceKey || !aiKey) return json(500, { error: "server_config" });

  let payload: Record<string, unknown>;
  try {
    payload = await req.json();
  } catch {
    return json(400, { error: "invalid_json" });
  }

  const question = String(payload?.question ?? "").trim();
  const uiLanguage = ["it", "en", "pt"].includes(String(payload?.uiLanguage))
    ? String(payload.uiLanguage)
    : "en";
  const rawHistory = Array.isArray(payload?.history) ? payload.history : [];
  const history = rawHistory
    .filter((h: unknown) => h && typeof h === "object")
    .slice(-8)
    .map((h: { role?: string; content?: string }) => ({
      role: h.role === "assistant" ? "assistant" : "user",
      content: String(h.content ?? "").slice(0, 2000),
    }))
    .filter((h) => h.content);

  if (!question) return json(400, { error: "empty_question" });
  if (question.length > MAX_QUESTION) {
    return json(400, { error: "too_long", message: TOO_LONG[uiLanguage] ?? TOO_LONG.en });
  }

  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const language = detectLanguage(question);

  let documents: ArticleContent[] = [];
  try {
    documents = await loadDocuments();
  } catch {
    documents = [];
  }

  const ranked = documents
    .map((article) => ({ article, score: scoreArticle(article, question) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      const pref = (l: string) => (l === language ? 0 : l === uiLanguage ? 1 : 2);
      return pref(a.article.lang) - pref(b.article.lang);
    });

  // Prefer one document per slug so the top 2 are distinct sources.
  const picked: typeof ranked = [];
  const seen = new Set<string>();
  for (const r of ranked) {
    if (seen.has(r.article.slug)) continue;
    seen.add(r.article.slug);
    picked.push(r);
    if (picked.length === 2) break;
  }

  const coverage = classifyCoverage(picked[0]?.article, question, picked[0]?.score ?? 0);
  const covered = coverage !== "not_covered";

  const context = picked.length
    ? picked.map(({ article }) => docBlock(article)).join("\n\n---\n\n")
    : "(No Business Matching Global document matches this question.)";

  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...history,
    {
      role: "user",
      content: `BMG CONTENT (coverage: ${coverage}):\n\n${context}\n\n---\n\nQUESTION: ${question}`,
    },
  ];

  let answer = "";
  try {
    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${aiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ model: "google/gemini-3.7-flash", messages }),
    });
    if (res.status === 429) {
      return json(429, {
        error: "temporarily_unavailable",
        message: TEMPORARY_LIMIT_MSG[uiLanguage] ?? TEMPORARY_LIMIT_MSG.en,
      });
    }
    if (res.status === 402) {
      return json(402, { error: "payment_required" });
    }
    if (!res.ok) {
      console.error("AI gateway error", res.status, await res.text());
      return json(502, { error: "ai_error" });
    }
    const data = await res.json();
    answer = String(data?.choices?.[0]?.message?.content ?? "").trim();
  } catch (err) {
    console.error("AI request failed", err);
    return json(502, { error: "ai_error" });
  }

  if (!answer) return json(502, { error: "ai_error" });

  try {
    await supabase.from("assistant_questions").insert({
      question: question.slice(0, 500),
      language,
      slugs: picked.map((p) => p.article.slug),
      covered,
    });
  } catch (err) {
    console.error("Logging failed", err);
  }

  return json(200, {
    answer,
    coverage,
    covered,
    language,
    sources: picked.map(({ article }) => ({
      slug: article.slug,
      title: article.title,
      url: article.url,
      kind: article.kind ?? "analysis",
    })),
  });
});
