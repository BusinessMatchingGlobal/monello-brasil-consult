import { useEffect, useState, FormEvent } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useT } from "@/lib/i18n";

type Comment = {
  id: string;
  author_name: string;
  content: string;
  created_at: string;
};

const schema = z.object({
  author_name: z.string().trim().min(1).max(100),
  author_email: z.string().trim().email().max(255).optional().or(z.literal("")),
  content: z.string().trim().min(1).max(2000),
});

const L = {
  it: {
    heading: "Commenti",
    empty: "Ancora nessun commento. Lascia il tuo qui sotto.",
    formTitle: "Lascia un commento",
    note: "I commenti sono sottoposti a moderazione e vengono pubblicati solo dopo la mia approvazione.",
    name: "Nome",
    email: "Email (facoltativa, non pubblicata)",
    message: "Commento",
    submit: "Invia commento",
    submitting: "Invio in corso…",
    success: "Grazie! Il tuo commento è in attesa di approvazione.",
    error: "Non è stato possibile inviare il commento. Riprova.",
    invalid: "Controlla i campi e riprova.",
  },
  en: {
    heading: "Comments",
    empty: "No comments yet. Leave yours below.",
    formTitle: "Leave a comment",
    note: "Comments are moderated and appear only after my approval.",
    name: "Name",
    email: "Email (optional, not published)",
    message: "Comment",
    submit: "Submit comment",
    submitting: "Submitting…",
    success: "Thanks! Your comment is awaiting approval.",
    error: "Could not submit your comment. Please try again.",
    invalid: "Please check the fields and try again.",
  },
  pt: {
    heading: "Comentários",
    empty: "Ainda não há comentários. Deixe o seu abaixo.",
    formTitle: "Deixe um comentário",
    note: "Os comentários são moderados e aparecem somente após a minha aprovação.",
    name: "Nome",
    email: "E-mail (opcional, não publicado)",
    message: "Comentário",
    submit: "Enviar comentário",
    submitting: "Enviando…",
    success: "Obrigado! Seu comentário aguarda aprovação.",
    error: "Não foi possível enviar o comentário. Tente novamente.",
    invalid: "Verifique os campos e tente novamente.",
  },
} as const;

export function AnalysisComments({ slug }: { slug: string }) {
  const { lang } = useT();
  const l = L[lang];
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    supabase
      .from("analysis_comments_public" as any)
      .select("id,author_name,content,created_at")
      .eq("article_slug", slug)
      .order("created_at", { ascending: false })
      .then(({ data }) => setComments((data as Comment[]) || []));
  }, [slug]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const parsed = schema.safeParse({ author_name: name, author_email: email, content });
    if (!parsed.success) {
      toast.error(l.invalid);
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("analysis_comments").insert({
      article_slug: slug,
      author_name: parsed.data.author_name,
      author_email: parsed.data.author_email || null,
      content: parsed.data.content,
      approved: false,
    });
    setSubmitting(false);
    if (error) {
      toast.error(l.error);
      return;
    }
    toast.success(l.success);
    setName("");
    setEmail("");
    setContent("");
  };

  return (
    <section className="mt-16 border-t border-border/60 pt-10">
      <h2 className="text-2xl font-semibold mb-6">{l.heading}</h2>

      {comments.length === 0 ? (
        <p className="text-sm text-foreground/75 mb-8">{l.empty}</p>
      ) : (
        <ul className="space-y-5 mb-10">
          {comments.map((c) => (
            <li key={c.id} className="rounded-lg border border-border/60 bg-card/40 p-4">
              <div className="flex items-baseline justify-between gap-3 mb-1">
                <span className="font-medium text-foreground">{c.author_name}</span>
                <time className="text-xs text-foreground/70 tabular-nums">
                  {new Date(c.created_at).toLocaleDateString()}
                </time>
              </div>
              <p className="text-sm text-foreground/85 whitespace-pre-wrap">{c.content}</p>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={onSubmit} className="rounded-lg border border-border/60 bg-card/40 p-5 space-y-4">
        <div>
          <h3 className="text-lg font-semibold">{l.formTitle}</h3>
          <p className="text-xs text-foreground/75 mt-1">{l.note}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="ac-name">{l.name}</Label>
            <Input id="ac-name" value={name} onChange={(e) => setName(e.target.value)} maxLength={100} required />
          </div>
          <div>
            <Label htmlFor="ac-email">{l.email}</Label>
            <Input id="ac-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={255} />
          </div>
        </div>
        <div>
          <Label htmlFor="ac-content">{l.message}</Label>
          <Textarea id="ac-content" value={content} onChange={(e) => setContent(e.target.value)} rows={5} maxLength={2000} required />
        </div>
        <Button type="submit" disabled={submitting}>{submitting ? l.submitting : l.submit}</Button>
      </form>
    </section>
  );
}