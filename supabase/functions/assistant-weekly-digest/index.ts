import { createClient } from "npm:@supabase/supabase-js@2";
import { sendTemplateEmailLogged } from "../_shared/transactional-email-templates/log-send.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const OWNER_EMAIL = "enstobbi@enstobbi.it";

// Only the scheduler, which calls with the service-role credential, may run
// the digest. The gateway (verify_jwt = true) has already checked the token
// signature; here we reject any token that is not a service-role token.
function isSchedulerCall(req: Request, serviceKey: string): boolean {
  const token = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "").trim() ?? "";
  if (!token) return false;
  if (token === serviceKey) return true;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  try {
    const b64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(atob(b64 + "=".repeat((4 - (b64.length % 4)) % 4)));
    return payload?.role === "service_role";
  } catch {
    return false;
  }
}

function json(status: number, body: unknown) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json(405, { error: "method_not_allowed" });

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceKey) return json(500, { error: "server_config" });
  if (!isSchedulerCall(req, serviceKey)) return json(403, { error: "forbidden" });

  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const end = new Date();
  const start = new Date(end.getTime() - 7 * 24 * 60 * 60 * 1000);

  const { data: questions, error: qError } = await supabase
    .from("assistant_questions")
    .select("question,language,covered,created_at")
    .gte("created_at", start.toISOString());
  if (qError) {
    console.error("Digest query failed", qError);
    return json(500, { error: "query_failed" });
  }

  const { count: topicCount } = await supabase
    .from("topic_requests")
    .select("id", { count: "exact", head: true })
    .gte("created_at", start.toISOString());

  const rows = questions ?? [];
  const uncovered = rows.filter((r) => !r.covered);

  // Group identical uncovered questions so repeats surface first.
  const grouped = new Map<string, { question: string; language?: string; count: number }>();
  for (const r of uncovered) {
    const key = r.question.trim().toLowerCase();
    const existing = grouped.get(key);
    if (existing) existing.count += 1;
    else grouped.set(key, { question: r.question, language: r.language ?? undefined, count: 1 });
  }
  const topUncovered = Array.from(grouped.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const templateData = {
    periodStart: start.toISOString().slice(0, 10),
    periodEnd: end.toISOString().slice(0, 10),
    totalQuestions: rows.length,
    uncoveredCount: uncovered.length,
    topicRequests: topicCount ?? 0,
    topUncovered,
  };

  try {
    await sendTemplateEmailLogged("assistant-weekly-digest", OWNER_EMAIL, {
      idempotencyKey: `ask-bmg-digest-${templateData.periodEnd}`,
      templateData,
    });
  } catch (sendError) {
    console.error("Digest send failed", sendError);
    return json(502, { error: "send_failed" });
  }

  return json(200, { ok: true });
});
