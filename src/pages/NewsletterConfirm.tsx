import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useT, type Lang } from "@/lib/i18n";

const copy: Record<Lang, {
  loading: string;
  successTitle: string;
  successBody: string;
  alreadyTitle: string;
  alreadyBody: string;
  errorTitle: string;
  errorBody: string;
  invalidTitle: string;
  invalidBody: string;
  backHome: string;
}> = {
  it: {
    loading: "Sto confermando la tua iscrizione…",
    successTitle: "Iscrizione confermata",
    successBody: "Grazie! La tua iscrizione alla newsletter #CustoBrasil è ora attiva.",
    alreadyTitle: "Iscrizione già attiva",
    alreadyBody: "Il tuo indirizzo email è già confermato. Non serve fare altro.",
    errorTitle: "Conferma non riuscita",
    errorBody: "Non è stato possibile confermare l'iscrizione. Riprova o richiedi un nuovo link dal sito.",
    invalidTitle: "Link non valido",
    invalidBody: "Il link di conferma è mancante o non valido. Torna alla home e richiedi una nuova iscrizione.",
    backHome: "Torna alla home",
  },
  en: {
    loading: "Confirming your subscription…",
    successTitle: "Subscription confirmed",
    successBody: "Thank you! Your #CustoBrasil newsletter subscription is now active.",
    alreadyTitle: "Subscription already active",
    alreadyBody: "Your email address is already confirmed. Nothing else to do.",
    errorTitle: "Confirmation failed",
    errorBody: "We could not confirm your subscription. Please try again or request a new link from the site.",
    invalidTitle: "Invalid link",
    invalidBody: "The confirmation link is missing or invalid. Go back to the home page and request a new subscription.",
    backHome: "Back to home",
  },
  pt: {
    loading: "Confirmando sua inscrição…",
    successTitle: "Inscrição confirmada",
    successBody: "Obrigado! Sua inscrição na newsletter #CustoBrasil está ativa.",
    alreadyTitle: "Inscrição já ativa",
    alreadyBody: "Seu endereço de e-mail já está confirmado. Nada mais a fazer.",
    errorTitle: "Falha na confirmação",
    errorBody: "Não foi possível confirmar sua inscrição. Tente novamente ou solicite um novo link no site.",
    invalidTitle: "Link inválido",
    invalidBody: "O link de confirmação está ausente ou é inválido. Volte à página inicial e solicite uma nova inscrição.",
    backHome: "Voltar à home",
  },
};

type State = "loading" | "success" | "already" | "invalid" | "error";

export default function NewsletterConfirm() {
  const { lang } = useT();
  const c = copy[lang];
  const [params] = useSearchParams();
  const [state, setState] = useState<State>("loading");

  useEffect(() => {
    const token = params.get("token")?.trim() ?? "";
    if (!token || token.length < 32) {
      setState("invalid");
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const { data, error } = await supabase.functions.invoke("newsletter-confirm", {
          body: { token },
        });
        if (cancelled) return;
        if (error) {
          setState("error");
          return;
        }
        if (data?.alreadyConfirmed) setState("already");
        else if (data?.ok) setState("success");
        else setState("error");
      } catch {
        if (!cancelled) setState("error");
      }
    })();
    return () => { cancelled = true; };
  }, [params]);

  const title =
    state === "success" ? c.successTitle :
    state === "already" ? c.alreadyTitle :
    state === "invalid" ? c.invalidTitle :
    state === "error" ? c.errorTitle : c.loading;
  const body =
    state === "success" ? c.successBody :
    state === "already" ? c.alreadyBody :
    state === "invalid" ? c.invalidBody :
    state === "error" ? c.errorBody : "";

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-6 py-16 bg-background">
      <div className="max-w-lg w-full text-center bg-card border rounded-2xl p-10 shadow-sm">
        <div className="mb-6 flex justify-center">
          {state === "loading" && <Loader2 className="h-12 w-12 text-primary animate-spin" />}
          {(state === "success" || state === "already") && <CheckCircle2 className="h-14 w-14 text-emerald-600" />}
          {(state === "invalid" || state === "error") && <XCircle className="h-14 w-14 text-destructive" />}
        </div>
        <h1 className="text-2xl font-semibold mb-3">{title}</h1>
        {body && <p className="text-muted-foreground mb-8">{body}</p>}
        <Button asChild>
          <Link to="/">{c.backHome}</Link>
        </Button>
      </div>
    </main>
  );
}