import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const EMAIL_RE = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

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

  let payload: Record<string, unknown>;
  try {
    payload = await req.json();
  } catch {
    return json(400, { error: "invalid_json" });
  }

  const question = String(payload?.question ?? "").trim().slice(0, 500);
  const email = String(payload?.email ?? "").trim().toLowerCase().slice(0, 255);
  const language = ["it", "en", "pt"].includes(String(payload?.language))
    ? String(payload.language)
    : "en";
  const consent = payload?.consent === true;

  if (!question) return json(400, { error: "empty_question" });
  if (!EMAIL_RE.test(email)) return json(400, { error: "invalid_email" });
  if (!consent) return json(400, { error: "consent_required" });

  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  // Subscribe through the existing double opt-in newsletter flow.
  let subscribed = false;
  try {
    const { data, error } = await supabase.functions.invoke("newsletter-subscribe", {
      body: {
        firstName: "Ask",
        lastName: "BMG",
        email,
        language,
        source: "Ask BMG — topic request",
        consent: true,
      },
    });
    if (error) console.error("Newsletter subscribe failed", error);
    else subscribed = Boolean((data as { ok?: boolean } | null)?.ok);
  } catch (err) {
    console.error("Newsletter subscribe threw", err);
  }

  const { error: insertError } = await supabase.from("topic_requests").insert({
    question,
    email,
    language,
    consent: true,
    newsletter_subscribed: subscribed,
  });
  if (insertError) {
    console.error("Failed to save topic request", insertError);
    return json(500, { error: "save_failed" });
  }

  return json(200, { ok: true, subscribed });
});
