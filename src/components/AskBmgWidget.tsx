import { FormEvent, useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { useT } from "@/lib/i18n";
import { supabase } from "@/integrations/supabase/client";
import { ServiceRequestDialog } from "@/components/ServiceRequestDialog";
import { cn } from "@/lib/utils";

type Source = { slug: string; title: string; url: string };
type Turn = {
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
  covered?: boolean;
};

const copy = {
  en: {
    launcher: "Ask BMG",
    title: "Ask BMG",
    subtitle: "AI assistant — answers based on our published analyses and guides",
    placeholder: "Ask about Brazil–Europe trade…",
    starters: [
      "What happened to Casas Bahia?",
      "How does the EUDR affect exporters?",
      "What services does BMG offer?",
    ],
    thinking: "Searching our published research…",
    error: "Something went wrong. Please try again in a moment.",
    rateLimit:
      "You have reached the limit of 10 questions per day. Please try again tomorrow.",
    tooLong: "Your question is too long (500 characters maximum).",
    sources: "Sources",
    cta: "Need this applied to your case? Contact us",
    close: "Close chat",
    send: "Send question",
    service: "Ask BMG — assistant follow-up",
  },
  it: {
    launcher: "Ask BMG",
    title: "Ask BMG",
    subtitle: "Assistente AI — risposte basate sulle nostre analisi e guide pubblicate",
    placeholder: "Chiedi sul commercio Brasile–Europa…",
    starters: [
      "Cosa è successo a Casas Bahia?",
      "Come impatta l'EUDR sugli esportatori?",
      "Quali servizi offre BMG?",
    ],
    thinking: "Sto cercando nelle nostre ricerche pubblicate…",
    error: "Qualcosa è andato storto. Riprova tra un momento.",
    rateLimit: "Hai raggiunto il limite di 10 domande al giorno. Riprova domani.",
    tooLong: "La domanda è troppo lunga (massimo 500 caratteri).",
    sources: "Fonti",
    cta: "Vuoi applicarlo al tuo caso? Contattaci",
    close: "Chiudi la chat",
    send: "Invia domanda",
    service: "Ask BMG — approfondimento assistente",
  },
  pt: {
    launcher: "Ask BMG",
    title: "Ask BMG",
    subtitle: "Assistente de IA — respostas baseadas nas nossas análises e guias publicados",
    placeholder: "Pergunte sobre comércio Brasil–Europa…",
    starters: [
      "O que aconteceu com as Casas Bahia?",
      "Como o EUDR afeta os exportadores?",
      "Quais serviços a BMG oferece?",
    ],
    thinking: "Buscando nas nossas pesquisas publicadas…",
    error: "Algo deu errado. Tente novamente em instantes.",
    rateLimit: "Você atingiu o limite de 10 perguntas por dia. Tente novamente amanhã.",
    tooLong: "A pergunta é longa demais (máximo de 500 caracteres).",
    sources: "Fontes",
    cta: "Quer aplicar isso ao seu caso? Fale conosco",
    close: "Fechar o chat",
    send: "Enviar pergunta",
    service: "Ask BMG — acompanhamento do assistente",
  },
} as const;

export function AskBmgWidget() {
  const { lang } = useT();
  const c = copy[lang] ?? copy.en;
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [turns, setTurns] = useState<Turn[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [service, setService] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [turns, loading]);

  const ask = async (question: string) => {
    const q = question.trim();
    if (!q || loading) return;
    if (q.length > 500) {
      setError(c.tooLong);
      return;
    }
    setError(null);
    setInput("");
    const history = turns.slice(-8).map((t) => ({ role: t.role, content: t.content }));
    setTurns((prev) => [...prev, { role: "user", content: q }]);
    setLoading(true);
    try {
      const { data, error: fnError } = await supabase.functions.invoke("ask-bmg", {
        body: { question: q, uiLanguage: lang, history },
      });
      if (fnError) throw fnError;
      if (data?.error) {
        setError(data.error === "rate_limited" ? c.rateLimit : data.message ?? c.error);
        return;
      }
      setTurns((prev) => [
        ...prev,
        {
          role: "assistant",
          content: String(data?.answer ?? ""),
          sources: Array.isArray(data?.sources) ? data.sources : [],
          covered: Boolean(data?.covered),
        },
      ]);
    } catch (err) {
      console.error("Ask BMG failed", err);
      const status = (err as { context?: { status?: number } })?.context?.status;
      setError(status === 429 ? c.rateLimit : c.error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void ask(input);
  };

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={c.launcher}
          className="fixed bottom-24 right-4 md:bottom-28 md:right-6 z-40 flex items-center gap-2 rounded-full bg-primary text-primary-foreground shadow-elegant px-4 py-3 hover:opacity-90 transition-opacity"
        >
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
          <span className="text-sm font-medium">{c.launcher}</span>
        </button>
      )}

      {open && (
        <div
          role="dialog"
          aria-label={c.title}
          className={cn(
            "fixed z-40 flex flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-elegant",
            "inset-x-3 bottom-24 max-h-[70vh]",
            "md:inset-x-auto md:right-6 md:bottom-28 md:w-[400px] md:max-h-[560px]",
          )}
        >
          <div className="flex items-start justify-between gap-3 border-b border-border px-4 py-3">
            <div>
              <p className="font-display text-base font-semibold text-foreground">{c.title}</p>
              <p className="text-xs text-muted-foreground leading-snug">{c.subtitle}</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={c.close}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {turns.length === 0 && (
              <div className="space-y-2">
                {c.starters.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => void ask(s)}
                    className="w-full text-left text-sm rounded-lg border border-border px-3 py-2 text-foreground hover:bg-muted transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {turns.map((t, i) => (
              <div
                key={i}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap",
                  t.role === "user"
                    ? "bg-primary text-primary-foreground ml-6"
                    : "bg-muted text-foreground mr-2",
                )}
              >
                {t.content}
                {t.role === "assistant" && !!t.sources?.length && (
                  <div className="mt-2 border-t border-border/60 pt-2 space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">{c.sources}</p>
                    {t.sources.map((s) => (
                      <a
                        key={`${s.slug}-${s.url}`}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-xs underline text-foreground/80 hover:text-foreground"
                      >
                        {s.title}
                      </a>
                    ))}
                  </div>
                )}
                {t.role === "assistant" && t.covered && (
                  <button
                    type="button"
                    onClick={() => setService(c.service)}
                    className="mt-2 text-xs underline text-primary hover:opacity-80"
                  >
                    {c.cta}
                  </button>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                {c.thinking}
              </div>
            )}

            {error && (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            )}
          </div>

          <form onSubmit={onSubmit} className="border-t border-border p-3 flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={500}
              placeholder={c.placeholder}
              aria-label={c.placeholder}
              className="flex-1 rounded-full border border-border bg-background px-4 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label={c.send}
              className="rounded-full bg-primary text-primary-foreground p-2.5 disabled:opacity-50 hover:opacity-90 transition-opacity"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
            </button>
          </form>
        </div>
      )}

      <ServiceRequestDialog service={service} onOpenChange={(o) => !o && setService(null)} />
    </>
  );
}
