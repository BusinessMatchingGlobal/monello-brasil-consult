import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Sub = {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  language: string | null;
  status: string;
  created_at: string;
  confirmed_at: string | null;
};

type AComment = {
  id: string;
  article_slug: string;
  author_name: string;
  author_email: string | null;
  content: string;
  approved: boolean;
  created_at: string;
  approved_at: string | null;
};

type Lead = {
  id: string;
  company_name: string | null;
  contact_name: string | null;
  email: string | null;
  country: string | null;
  sector: string | null;
  goal: string | null;
  service: string | null;
  message: string | null;
  language: string | null;
  source: string;
  status: string;
  created_at: string;
};

type AQuestion = {
  id: string;
  question: string;
  language: string | null;
  slugs: string[];
  covered: boolean;
  created_at: string;
};

type TopicReq = {
  id: string;
  question: string;
  email: string;
  language: string | null;
  consent: boolean;
  newsletter_subscribed: boolean;
  created_at: string;
};

const STOP = new Set([
  "the","and","for","are","que","com","como","para","nao","dos","das","uma","por","mais","che",
  "con","per","del","della","dei","delle","sono","gli","alla","alle","degli","nel","nella","una",
  "what","how","does","which","why","who","when","from","with","this","that","have","has","was",
  "about","into","cosa","quali","quale","quando","perche","porque","quais","sobre","posso","can",
]);

export default function Admin() {
  const [session, setSession] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [info, setInfo] = useState<string | null>(null);
  const [subs, setSubs] = useState<Sub[]>([]);
  const [comments, setComments] = useState<AComment[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [questions, setQuestions] = useState<AQuestion[]>([]);
  const [topics, setTopics] = useState<TopicReq[]>([]);
  const [qFilter, setQFilter] = useState<"all" | "covered" | "uncovered" | "email">("all");
  const [qSort, setQSort] = useState<"date" | "language">("date");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) { setIsAdmin(null); return; }
    supabase.from("user_roles").select("role").eq("user_id", session.user.id).eq("role", "admin").maybeSingle()
      .then(({ data }) => setIsAdmin(!!data));
  }, [session]);

  useEffect(() => {
    if (!isAdmin) return;
    supabase.from("newsletter_subscribers")
      .select("id,email,first_name,last_name,language,status,created_at,confirmed_at")
      .order("created_at", { ascending: false })
      .then(({ data }) => setSubs((data as Sub[]) || []));
    supabase.from("analysis_comments")
      .select("id,article_slug,author_name,author_email,content,approved,created_at,approved_at")
      .order("created_at", { ascending: false })
      .then(({ data }) => setComments((data as AComment[]) || []));
    supabase.from("consultation_requests")
      .select("id,company_name,contact_name,email,country,sector,goal,service,message,language,source,status,created_at")
      .order("created_at", { ascending: false })
      .then(({ data }) => setLeads((data as Lead[]) || []));
    supabase.from("assistant_questions")
      .select("id,question,language,slugs,covered,created_at")
      .order("created_at", { ascending: false })
      .then(({ data }) => setQuestions((data as AQuestion[]) || []));
    supabase.from("topic_requests")
      .select("id,question,email,language,consent,newsletter_subscribed,created_at")
      .order("created_at", { ascending: false })
      .then(({ data }) => setTopics((data as TopicReq[]) || []));
  }, [isAdmin]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(null); setInfo(null);
    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email, password,
        options: { emailRedirectTo: `${window.location.origin}/admin` }
      });
      if (error) setError(error.message);
      else setInfo("Account creato. Contatta il proprietario per abilitare l'accesso admin.");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
    }
    setLoading(false);
  };

  const signOut = () => supabase.auth.signOut();

  const exportCsv = () => {
    const rows = [["email","first_name","last_name","language","status","created_at","confirmed_at"]];
    subs
      .filter(s => s.status !== "opted_out")
      .forEach(s => rows.push([s.email, s.first_name||"", s.last_name||"", s.language||"", s.status, s.created_at, s.confirmed_at||""]));
    const csv = rows.map(r => r.map(v => `"${String(v).replace(/"/g,'""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `newsletter_subscribers_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
  };

  const toggleOptOut = async (s: Sub) => {
    const next = s.status === "opted_out" ? (s.confirmed_at ? "confirmed" : "pending") : "opted_out";
    const label = next === "opted_out" ? `Escludere ${s.email} dall'export CSV?` : `Riattivare ${s.email}?`;
    if (!confirm(label)) return;
    const { error } = await supabase.from("newsletter_subscribers").update({ status: next }).eq("id", s.id);
    if (error) { alert(error.message); return; }
    setSubs(prev => prev.map(x => x.id === s.id ? { ...x, status: next } : x));
  };

  const approveComment = async (c: AComment) => {
    const { error } = await supabase.from("analysis_comments")
      .update({ approved: true, approved_at: new Date().toISOString() })
      .eq("id", c.id);
    if (error) { alert(error.message); return; }
    setComments(prev => prev.map(x => x.id === c.id ? { ...x, approved: true, approved_at: new Date().toISOString() } : x));
  };

  const unapproveComment = async (c: AComment) => {
    const { error } = await supabase.from("analysis_comments")
      .update({ approved: false, approved_at: null })
      .eq("id", c.id);
    if (error) { alert(error.message); return; }
    setComments(prev => prev.map(x => x.id === c.id ? { ...x, approved: false, approved_at: null } : x));
  };

  const deleteComment = async (c: AComment) => {
    if (!confirm(`Eliminare il commento di ${c.author_name}?`)) return;
    const { error } = await supabase.from("analysis_comments").delete().eq("id", c.id);
    if (error) { alert(error.message); return; }
    setComments(prev => prev.filter(x => x.id !== c.id));
  };

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <form onSubmit={submit} className="w-full max-w-sm space-y-4 bg-card p-6 rounded-lg border">
          <h1 className="text-xl font-semibold">{mode === "login" ? "Admin Login" : "Crea account admin"}</h1>
          <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <Input type="password" placeholder="Password (min 6)" value={password} onChange={e => setPassword(e.target.value)} minLength={6} required />
          {error && <p className="text-sm text-destructive">{error}</p>}
          {info && <p className="text-sm text-green-600">{info}</p>}
          <Button type="submit" disabled={loading} className="w-full">{loading ? "..." : mode === "login" ? "Login" : "Registrati"}</Button>
          <button type="button" onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(null); setInfo(null); }} className="text-xs text-muted-foreground hover:underline w-full">
            {mode === "login" ? "Prima volta? Crea account" : "Hai già un account? Login"}
          </button>
        </form>
      </div>
    );
  }

  if (isAdmin === null) return <div className="min-h-screen flex items-center justify-center">Verifica accesso...</div>;

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-4">
        <p>Accesso non autorizzato ({session.user.email}).</p>
        <Button variant="outline" onClick={signOut}>Logout</Button>
      </div>
    );
  }

  const emailByQuestion = new Map(topics.map(t => [t.question.trim().toLowerCase(), t.email]));
  const visibleQuestions = questions
    .filter(q =>
      qFilter === "all" ? true
      : qFilter === "covered" ? q.covered
      : qFilter === "uncovered" ? !q.covered
      : emailByQuestion.has(q.question.trim().toLowerCase()))
    .sort((a, b) =>
      qSort === "language"
        ? (a.language || "").localeCompare(b.language || "")
        : a.created_at < b.created_at ? 1 : -1);

  const since30 = Date.now() - 30 * 24 * 60 * 60 * 1000;
  const keywordCounts = new Map<string, number>();
  questions
    .filter(q => !q.covered && new Date(q.created_at).getTime() >= since30)
    .forEach(q => {
      new Set(
        q.question.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-z0-9\s]/g, " ").split(/\s+/)
          .filter(w => w.length > 3 && !STOP.has(w)),
      ).forEach(w => keywordCounts.set(w, (keywordCounts.get(w) || 0) + 1));
    });
  const topKeywords = Array.from(keywordCounts.entries()).sort((a, b) => b[1] - a[1]).slice(0, 12);

  const confirmed = subs.filter(s => s.status === "confirmed").length;
  const pending = subs.filter(s => s.status === "pending").length;
  const optedOut = subs.filter(s => s.status === "opted_out").length;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h1 className="text-2xl font-semibold">Newsletter — Iscritti</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={exportCsv}>Export CSV</Button>
            <Button variant="outline" onClick={signOut}>Logout</Button>
          </div>
        </div>
        <div className="flex gap-4 text-sm">
          <span>Totali: <strong>{subs.length}</strong></span>
          <span>Confermati: <strong>{confirmed}</strong></span>
          <span>In attesa: <strong>{pending}</strong></span>
          <span>Esclusi: <strong>{optedOut}</strong></span>
        </div>
        <div className="overflow-x-auto border rounded-lg">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-3">Email</th>
                <th className="text-left p-3">Nome</th>
                <th className="text-left p-3">Lingua</th>
                <th className="text-left p-3">Stato</th>
                <th className="text-left p-3">Iscritto</th>
                <th className="text-left p-3">Confermato</th>
                <th className="text-left p-3">Azioni</th>
              </tr>
            </thead>
            <tbody>
              {subs.map(s => (
                <tr key={s.id} className="border-t">
                  <td className="p-3">{s.email}</td>
                  <td className="p-3">{[s.first_name, s.last_name].filter(Boolean).join(" ") || "—"}</td>
                  <td className="p-3 uppercase">{s.language || "—"}</td>
                  <td className="p-3">
                    <span className={s.status === "confirmed" ? "text-green-600" : s.status === "opted_out" ? "text-destructive" : "text-amber-600"}>{s.status}</span>
                  </td>
                  <td className="p-3">{new Date(s.created_at).toLocaleString()}</td>
                  <td className="p-3">{s.confirmed_at ? new Date(s.confirmed_at).toLocaleString() : "—"}</td>
                  <td className="p-3">
                    <button onClick={() => toggleOptOut(s)} className="text-xs underline hover:no-underline">
                      {s.status === "opted_out" ? "Riattiva" : "Escludi"}
                    </button>
                  </td>
                </tr>
              ))}
              {subs.length === 0 && <tr><td colSpan={7} className="p-6 text-center text-muted-foreground">Nessun iscritto</td></tr>}
            </tbody>
          </table>
        </div>

        <div className="pt-6">
          <h2 className="text-2xl font-semibold mb-2">Commenti /analysis</h2>
          <div className="flex gap-4 text-sm mb-3">
            <span>Totali: <strong>{comments.length}</strong></span>
            <span>In attesa: <strong>{comments.filter(c => !c.approved).length}</strong></span>
            <span>Approvati: <strong>{comments.filter(c => c.approved).length}</strong></span>
          </div>
          <div className="overflow-x-auto border rounded-lg">
            <table className="w-full text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-3">Articolo</th>
                  <th className="text-left p-3">Autore</th>
                  <th className="text-left p-3">Commento</th>
                  <th className="text-left p-3">Stato</th>
                  <th className="text-left p-3">Data</th>
                  <th className="text-left p-3">Azioni</th>
                </tr>
              </thead>
              <tbody>
                {comments.map(c => (
                  <tr key={c.id} className="border-t align-top">
                    <td className="p-3 font-mono text-xs">/{c.article_slug}</td>
                    <td className="p-3">
                      <div>{c.author_name}</div>
                      {c.author_email && <div className="text-xs text-muted-foreground">{c.author_email}</div>}
                    </td>
                    <td className="p-3 max-w-md whitespace-pre-wrap">{c.content}</td>
                    <td className="p-3">
                      <span className={c.approved ? "text-green-600" : "text-amber-600"}>
                        {c.approved ? "approvato" : "in attesa"}
                      </span>
                    </td>
                    <td className="p-3 text-xs">{new Date(c.created_at).toLocaleString()}</td>
                    <td className="p-3 space-x-3">
                      {c.approved ? (
                        <button onClick={() => unapproveComment(c)} className="text-xs underline hover:no-underline">Nascondi</button>
                      ) : (
                        <button onClick={() => approveComment(c)} className="text-xs underline hover:no-underline text-green-700">Approva</button>
                      )}
                      <button onClick={() => deleteComment(c)} className="text-xs underline hover:no-underline text-destructive">Elimina</button>
                    </td>
                  </tr>
                ))}
                {comments.length === 0 && <tr><td colSpan={6} className="p-6 text-center text-muted-foreground">Nessun commento</td></tr>}
              </tbody>
            </table>
          </div>
        </div>

        <div className="pt-6">
          <h2 className="text-2xl font-semibold mb-2">Richieste di consulenza (MCP / ChatGPT)</h2>
          <div className="flex gap-4 text-sm mb-3">
            <span>Totali: <strong>{leads.length}</strong></span>
            <span>Nuove: <strong>{leads.filter(l => l.status === "new").length}</strong></span>
          </div>
          <div className="overflow-x-auto border rounded-lg">
            <table className="w-full text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-3">Contatto</th>
                  <th className="text-left p-3">Azienda</th>
                  <th className="text-left p-3">Paese / Settore</th>
                  <th className="text-left p-3">Obiettivo / Servizio</th>
                  <th className="text-left p-3">Messaggio</th>
                  <th className="text-left p-3">Origine</th>
                  <th className="text-left p-3">Data</th>
                </tr>
              </thead>
              <tbody>
                {leads.map(l => (
                  <tr key={l.id} className="border-t align-top">
                    <td className="p-3">
                      <div>{l.contact_name || "—"}</div>
                      {l.email && <div className="text-xs text-muted-foreground">{l.email}</div>}
                    </td>
                    <td className="p-3">{l.company_name || "—"}</td>
                    <td className="p-3">{[l.country, l.sector].filter(Boolean).join(" · ") || "—"}</td>
                    <td className="p-3">{[l.goal, l.service].filter(Boolean).join(" · ") || "—"}</td>
                    <td className="p-3 max-w-md whitespace-pre-wrap">{l.message || "—"}</td>
                    <td className="p-3 text-xs uppercase">{l.source}{l.language ? ` · ${l.language}` : ""}</td>
                    <td className="p-3 text-xs">{new Date(l.created_at).toLocaleString()}</td>
                  </tr>
                ))}
                {leads.length === 0 && <tr><td colSpan={7} className="p-6 text-center text-muted-foreground">Nessuna richiesta</td></tr>}
              </tbody>
            </table>
          </div>
        </div>



        <div className="pt-6">
          <h2 className="text-2xl font-semibold mb-2">Domande — Ask BMG</h2>
          <div className="flex flex-wrap gap-4 text-sm mb-3">
            <span>Totali: <strong>{questions.length}</strong></span>
            <span>Coperte: <strong>{questions.filter(q => q.covered).length}</strong></span>
            <span>Non coperte: <strong>{questions.filter(q => !q.covered).length}</strong></span>
            <span>Richieste tema con email: <strong>{topics.length}</strong></span>
          </div>
          <div className="flex flex-wrap gap-2 text-xs mb-3">
            {(["all","covered","uncovered","email"] as const).map(f => (
              <button key={f} onClick={() => setQFilter(f)}
                className={`px-3 py-1 rounded-full border ${qFilter === f ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>
                {f === "all" ? "Tutte" : f === "covered" ? "Coperte" : f === "uncovered" ? "Non coperte" : "Con email"}
              </button>
            ))}
            <button onClick={() => setQSort(qSort === "date" ? "language" : "date")} className="px-3 py-1 rounded-full border hover:bg-muted">
              Ordina: {qSort === "date" ? "data" : "lingua"}
            </button>
          </div>
          {topKeywords.length > 0 && (
            <div className="mb-3 text-xs text-muted-foreground">
              Parole chiave più frequenti (non coperte, ultimi 30 giorni):{" "}
              {topKeywords.map(([w, n]) => `${w} (${n})`).join(" · ")}
            </div>
          )}
          <div className="overflow-x-auto border rounded-lg">
            <table className="w-full text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-3">Domanda</th>
                  <th className="text-left p-3">Lingua</th>
                  <th className="text-left p-3">Copertura</th>
                  <th className="text-left p-3">Fonti</th>
                  <th className="text-left p-3">Email</th>
                  <th className="text-left p-3">Data</th>
                </tr>
              </thead>
              <tbody>
                {visibleQuestions.map(q => (
                  <tr key={q.id} className="border-t align-top">
                    <td className="p-3 max-w-md">{q.question}</td>
                    <td className="p-3 uppercase text-xs">{q.language || "—"}</td>
                    <td className="p-3">
                      <span className={q.covered ? "text-green-600" : "text-amber-600"}>
                        {q.covered ? "coperta" : "non coperta"}
                      </span>
                    </td>
                    <td className="p-3 font-mono text-xs">{(q.slugs || []).join(", ") || "—"}</td>
                    <td className="p-3 text-xs">{emailByQuestion.get(q.question.trim().toLowerCase()) || "—"}</td>
                    <td className="p-3 text-xs">{new Date(q.created_at).toLocaleString()}</td>
                  </tr>
                ))}
                {visibleQuestions.length === 0 && <tr><td colSpan={6} className="p-6 text-center text-muted-foreground">Nessuna domanda</td></tr>}
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold mt-6 mb-2">Richieste di nuovi temi</h3>
          <div className="overflow-x-auto border rounded-lg">
            <table className="w-full text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-3">Tema richiesto</th>
                  <th className="text-left p-3">Email</th>
                  <th className="text-left p-3">Lingua</th>
                  <th className="text-left p-3">Newsletter</th>
                  <th className="text-left p-3">Data</th>
                </tr>
              </thead>
              <tbody>
                {topics.map(t => (
                  <tr key={t.id} className="border-t align-top">
                    <td className="p-3 max-w-md">{t.question}</td>
                    <td className="p-3 text-xs">{t.email}</td>
                    <td className="p-3 uppercase text-xs">{t.language || "—"}</td>
                    <td className="p-3 text-xs">{t.newsletter_subscribed ? "sì" : "no"}</td>
                    <td className="p-3 text-xs">{new Date(t.created_at).toLocaleString()}</td>
                  </tr>
                ))}
                {topics.length === 0 && <tr><td colSpan={5} className="p-6 text-center text-muted-foreground">Nessuna richiesta</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
