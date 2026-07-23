import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useCanonical } from "@/lib/useCanonical";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

type State = "checking" | "ready" | "already" | "invalid" | "done" | "error";

export default function Unsubscribe() {
  useCanonical("/unsubscribe", {
    title: "Unsubscribe — Business Matching Global",
    description: "Manage your subscription preferences.",
  });
  const [params] = useSearchParams();
  const token = params.get("token") ?? "";
  const [state, setState] = useState<State>("checking");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!token) {
      setState("invalid");
      return;
    }
    (async () => {
      try {
        const res = await fetch(
          `${SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`,
          { headers: { apikey: SUPABASE_ANON_KEY } }
        );
        const json = await res.json().catch(() => ({}));
        if (!res.ok) {
          setState("invalid");
          return;
        }
        if (json.valid === false && json.reason === "already_unsubscribed") {
          setState("already");
        } else if (json.valid === true) {
          setState("ready");
        } else {
          setState("invalid");
        }
      } catch {
        setState("error");
      }
    })();
  }, [token]);

  async function confirm() {
    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("handle-email-unsubscribe", {
        body: { token },
      });
      if (error) throw error;
      if ((data as any)?.success || (data as any)?.reason === "already_unsubscribed") {
        setState("done");
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-5 border border-border rounded-xl p-8 bg-card shadow-sm">
        <h1 className="text-2xl font-semibold">Unsubscribe</h1>
        {state === "checking" && <p className="text-muted-foreground">Verifying your link…</p>}
        {state === "ready" && (
          <>
            <p className="text-muted-foreground">
              Confirm you no longer want to receive emails from Business Matching Global.
            </p>
            <Button onClick={confirm} disabled={submitting} className="w-full">
              {submitting ? "Processing…" : "Confirm unsubscribe"}
            </Button>
          </>
        )}
        {state === "already" && (
          <p className="text-muted-foreground">This address is already unsubscribed.</p>
        )}
        {state === "done" && (
          <p className="text-muted-foreground">You have been unsubscribed. We're sorry to see you go.</p>
        )}
        {state === "invalid" && (
          <p className="text-muted-foreground">This unsubscribe link is invalid or has expired.</p>
        )}
        {state === "error" && (
          <p className="text-muted-foreground">Something went wrong. Please try again later.</p>
        )}
        <Link to="/" className="inline-block text-sm text-primary hover:underline">
          Back to website
        </Link>
      </div>
    </main>
  );
}