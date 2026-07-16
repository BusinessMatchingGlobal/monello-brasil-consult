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

export default function Admin() {
  const [session, setSession] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [subs, setSubs] = useState<Sub[]>([]);

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
  }, [isAdmin]);

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    setLoading(false);
  };

  const signOut = () => supabase.auth.signOut();

  const exportCsv = () => {
    const rows = [["email","first_name","last_name","language","status","created_at","confirmed_at"]];
    subs.forEach(s => rows.push([s.email, s.first_name||"", s.last_name||"", s.language||"", s.status, s.created_at, s.confirmed_at||""]));
    const csv = rows.map(r => r.map(v => `"${String(v).replace(/"/g,'""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `newsletter_subscribers_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
  };

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <form onSubmit={signIn} className="w-full max-w-sm space-y-4 bg-card p-6 rounded-lg border">
          <h1 className="text-xl font-semibold">Admin Login</h1>
          <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" disabled={loading} className="w-full">{loading ? "..." : "Login"}</Button>
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

  const confirmed = subs.filter(s => s.status === "confirmed").length;
  const pending = subs.filter(s => s.status === "pending").length;

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
              </tr>
            </thead>
            <tbody>
              {subs.map(s => (
                <tr key={s.id} className="border-t">
                  <td className="p-3">{s.email}</td>
                  <td className="p-3">{[s.first_name, s.last_name].filter(Boolean).join(" ") || "—"}</td>
                  <td className="p-3 uppercase">{s.language || "—"}</td>
                  <td className="p-3">
                    <span className={s.status === "confirmed" ? "text-green-600" : "text-amber-600"}>{s.status}</span>
                  </td>
                  <td className="p-3">{new Date(s.created_at).toLocaleString()}</td>
                  <td className="p-3">{s.confirmed_at ? new Date(s.confirmed_at).toLocaleString() : "—"}</td>
                </tr>
              ))}
              {subs.length === 0 && <tr><td colSpan={6} className="p-6 text-center text-muted-foreground">Nessun iscritto</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}