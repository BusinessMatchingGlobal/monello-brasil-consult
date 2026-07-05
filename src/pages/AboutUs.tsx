import { useState, useEffect, FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Menu, X, Mail } from "lucide-react";
import { useT, Lang } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const EMAIL = "info@businessmatching.global";

type Block =
  | { type: "h2"; text: string }
  | { type: "p"; text: string; italic?: boolean; linkText?: string; linkHref?: string }
  | { type: "link"; text: string; href: string };

function LangSwitcher() {
  const { lang, setLang } = useT();
  const langs: Lang[] = ["en", "it", "pt"];
  return (
    <div className="inline-flex items-center gap-1 text-xs font-medium tracking-wider uppercase">
      {langs.map((l, i) => (
        <div key={l} className="flex items-center">
          <button
            onClick={() => setLang(l)}
            className={`px-1.5 py-1 transition-colors ${
              lang === l ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {l === "pt" ? "PT-BR" : l.toUpperCase()}
          </button>
          {i < langs.length - 1 && <span className="text-border">/</span>}
        </div>
      ))}
    </div>
  );
}

function Nav() {
  const { t } = useT();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links: Array<{ href: string; label: string; internal?: boolean }> = [
    { href: "/", label: t.nav.home, internal: true },
    { href: "/#services", label: t.nav.services },
    { href: "/#how", label: t.nav.how },
    { href: "/#about", label: t.nav.method },
    { href: "/About_us", label: t.nav.about, internal: true },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/85 backdrop-blur-md border-b border-border/60" : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 md:h-20 items-center justify-between">
        <Link to="/" className="font-display text-lg md:text-xl font-medium tracking-tight">
          Business Matching <span className="text-primary">Global</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) =>
            l.internal ? (
              <Link
                key={l.href}
                to={l.href}
                className="text-sm text-foreground/75 hover:text-foreground transition-colors"
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-foreground/75 hover:text-foreground transition-colors"
              >
                {l.label}
              </a>
            )
          )}
          <LangSwitcher />
          <Button asChild size="sm" className="rounded-full">
            <a href="/#contact">{t.nav.contact}</a>
          </Button>
        </nav>
        <button
          className="md:hidden p-2 -mr-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border/60 bg-background">
          <div className="container py-4 flex flex-col gap-4">
            {links.map((l) =>
              l.internal ? (
                <Link
                  key={l.href}
                  to={l.href}
                  onClick={() => setOpen(false)}
                  className="text-base py-2"
                >
                  {l.label}
                </Link>
              ) : (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-base py-2"
                >
                  {l.label}
                </a>
              )
            )}
            <div className="flex items-center justify-between pt-2 border-t border-border/60">
              <LangSwitcher />
              <Button asChild size="sm" className="rounded-full" onClick={() => setOpen(false)}>
                <a href="/#contact">{t.nav.contact}</a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function ContactForm() {
  const { t } = useT();
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = (data.get("name") as string) || "";
    const email = (data.get("email") as string) || "";
    const company = (data.get("company") as string) || "";
    const message = (data.get("message") as string) || "";
    const consent = data.get("consent") === "on";
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in name, email and message.");
      return;
    }
    if (!consent) {
      toast.error(t.consent.required);
      return;
    }
    setSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "contact-notification",
          idempotencyKey: `contact-${email}-${Date.now()}`,
          templateData: {
            name,
            email,
            company: company || "—",
            message,
            source: "Contact form",
            submittedAt: new Date().toISOString(),
          },
        },
      });
      if (error) throw error;
      toast.success("Thanks — your message has been sent.");
      form.reset();
    } catch (err) {
      console.error("Contact form send failed", err);
      toast.error("Sending failed. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl leading-tight mb-8">
          {t.contact.title}
        </h2>
        <div className="grid md:grid-cols-2 gap-12 md:gap-20">
          <div>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
              {t.contact.sub}
            </p>
            <div className="space-y-4 text-foreground/85">
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-3 hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" /> {EMAIL}
              </a>
            </div>
          </div>
          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <Label htmlFor="name" className="text-xs tracking-wider uppercase text-muted-foreground">
                {t.contact.name}
              </Label>
              <Input id="name" name="name" required maxLength={100} className="mt-2" />
            </div>
            <div>
              <Label htmlFor="email" className="text-xs tracking-wider uppercase text-muted-foreground">
                {t.contact.email}
              </Label>
              <Input id="email" name="email" type="email" required maxLength={255} className="mt-2" />
            </div>
            <div>
              <Label htmlFor="company" className="text-xs tracking-wider uppercase text-muted-foreground">
                {t.contact.company}
              </Label>
              <Input id="company" name="company" maxLength={150} className="mt-2" />
            </div>
            <div>
              <Label htmlFor="message" className="text-xs tracking-wider uppercase text-muted-foreground">
                {t.contact.message}
              </Label>
              <Textarea id="message" name="message" required rows={5} maxLength={2000} className="mt-2 resize-none" />
            </div>
            <Button type="submit" size="lg" disabled={submitting} className="rounded-full w-full h-12">
              {submitting ? "…" : t.contact.send} <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
            <label className="flex items-start gap-3 text-xs text-muted-foreground leading-relaxed cursor-pointer">
              <input
                type="checkbox"
                name="consent"
                required
                className="mt-0.5 h-4 w-4 rounded border-border bg-background accent-primary"
              />
              <span>
                {t.consent.label}{" "}
                <Link to="/privacy" className="underline hover:text-foreground">
                  {t.consent.link}
                </Link>{" "}
                {t.consent.suffix}
              </span>
            </label>
          </form>
        </div>
      </div>
    </section>
  );
}

const blocks: Block[] = [
  { type: "h2", text: "Scientia potentia est — \"Sapere è potere\"" },
  { type: "p", text: "L'intuizione attribuita a Francis Bacon oltre quattro secoli fa resta, oggi più che mai, attuale: sapere è potere. Ma nel mondo dell'internazionalizzazione non basta avere accesso alle informazioni. Occorre saperle cercare, selezionare, aggiornare e interpretare correttamente." },
  { type: "p", text: "Noi crediamo che l'accesso a informazioni affidabili — comprese quelle di cui non sapevate di aver bisogno — e la capacità di trasformarle in decisioni operative possano fare la differenza tra una strategia solida e un errore costoso." },
  { type: "p", text: "Questo è il cuore del nostro lavoro: fornire informazioni affidabili, contestualizzarle e aiutarvi a interpretarle nel modo corretto, prima che una scelta sbagliata diventi un costo." },

  { type: "h2", text: "Il Custo Brasil: da costo occulto a variabile strategica" },
  { type: "p", text: "Operare in Brasile significa confrontarsi con un sistema complesso, spesso difficile da leggere dall'esterno. Uno degli elementi più importanti da comprendere è il cosiddetto Custo Brasil: l'insieme di inefficienze burocratiche, fiscali, logistiche, infrastrutturali e amministrative che possono incidere in modo significativo sui costi reali di ingresso e sviluppo nel mercato brasiliano." },
  { type: "p", text: "Molte aziende lo scoprono troppo tardi, quando ha già iniziato a erodere i margini. Altre, al contrario, lo sovrastimano e rinunciano a opportunità reali per paura di un mercato percepito come troppo difficile." },
  { type: "p", text: "La verità è che il Custo Brasil non va né ignorato né temuto in modo generico: va misurato, compreso e gestito. In alcuni casi, se correttamente interpretato, può perfino trasformarsi in un vantaggio competitivo. Chi conosce meglio le complessità del sistema può infatti individuare soluzioni, territori, partner e percorsi che altri non vedono." },

  { type: "h2", text: "L'arcipelago Brasile" },
  { type: "p", text: "Il secondo errore, ancora più comune, è trattare il Brasile come un unico mercato. Non lo è." },
  { type: "p", text: "Il Brasile è un continente economico composto da una pluralità di mercati locali, settoriali e territoriali. È un arcipelago di mini-mercati, ciascuno con caratteristiche, costi, incentivi, abitudini di consumo, reti logistiche e interlocutori differenti." },
  { type: "p", text: "Incentivi e agevolazioni fiscali possono variare da Stato a Stato, e in alcuni casi perfino da Comune a Comune. La scelta del territorio in cui entrare, produrre, distribuire o cercare partner può fare la differenza tra un progetto sostenibile e un progetto destinato a fallire." },
  { type: "p", text: "Per questo non basta chiedersi se un prodotto possa funzionare \"in Brasile\". La domanda corretta è: dove, con chi, a quali condizioni, con quale struttura di costi e con quali vantaggi competitivi?" },
  { type: "p", text: "Il nostro lavoro consiste proprio nell'aiutarvi a leggere questo arcipelago: individuare i territori più adatti, i partner più affidabili, le opportunità meno visibili e i rischi da anticipare." },

  { type: "h2", text: "In entrambe le direzioni" },
  { type: "p", text: "Operiamo tra Europa, Brasile e Mercosur in entrambe le direzioni." },
  { type: "p", text: "Accompagniamo le aziende europee che vogliono entrare o crescere in Brasile e in Sud America. Allo stesso tempo, supportiamo aziende brasiliane e sudamericane che intendono approdare, strutturarsi e svilupparsi in Europa." },
  { type: "p", text: "Perché conoscere due mondi significa saper fare da ponte, non limitarsi a fare da guida." },
  { type: "p", text: "Il nostro lavoro si gioca su due fronti: da un lato, identificare le opportunità che i dati aggregati spesso non mostrano — il mini-mercato giusto, il partner affidabile, la finestra aperta da un cambiamento normativo o commerciale; dall'altro, anticipare i problemi prima che diventino costi." },
  { type: "p", text: "Vedere le opportunità prima dei concorrenti. Vedere i problemi prima che costino." },

  { type: "h2", text: "Perché ora: il nuovo scenario UE-Mercosur" },
  { type: "p", text: "Il quadro delle relazioni commerciali tra Unione Europea e Mercosur sta entrando in una fase di profonda trasformazione. Dazi, barriere, regole di accesso, standard tecnici e opportunità di scambio sono destinati a cambiare il modo in cui molte imprese europee e sudamericane guardano ai rispettivi mercati." },
  { type: "p", text: "In questo scenario, muoversi con le informazioni giuste può significare costruire un vantaggio competitivo difficile da recuperare per chi arriverà dopo." },
  { type: "p", text: "Le opportunità non riguardano solo le grandi imprese. Possono interessare anche PMI, produttori specializzati, filiere agroalimentari, aziende industriali, servizi professionali, tecnologia, logistica, sostenibilità e progetti di partnership tra operatori europei e brasiliani." },
  { type: "p", text: "Ma ogni opportunità va letta dentro il suo contesto. Un accordo commerciale può aprire porte, ma non sostituisce la conoscenza del territorio, delle regole, delle prassi locali e degli interlocutori giusti." },

  { type: "h2", text: "Chi c'è dietro: metodo, non improvvisazione" },
  { type: "p", text: "Il fondatore, Enzo Aldo Stobbione, è laureato in Scienze Politiche, indirizzo politico-internazionale, all'Università degli Studi di Torino. Ha inoltre conseguito un Master in Economia e Relazioni Internazionali presso ASERI — Alta Scuola di Economia e Relazioni Internazionali dell'Università Cattolica del Sacro Cuore di Milano — e un Master in Strategie Integrate per la Sostenibilità e la Transizione Ecologica presso l'Università del Piemonte Orientale." },
  { type: "p", text: "Da diversi anni risiede a Belo Horizonte, capitale del Minas Gerais, nel cuore del Sud-Est brasiliano: l'area che, insieme a San Paolo e Rio de Janeiro, concentra una parte rilevante del PIL, dell'industria, della finanza e dell'innovazione del Paese." },
  { type: "p", text: "Belo Horizonte non è soltanto una grande capitale economica regionale. È anche la casa della San Pedro Valley, uno degli ecosistemi startup più dinamici del Brasile: un segnale importante di un tessuto produttivo che non è fatto solo di industria, finanza e commercio, ma anche di tecnologia, innovazione e nuova imprenditorialità." },
  { type: "p", text: "Non un osservatorio a distanza, quindi, ma una presenza diretta nel cuore economico del Brasile." },
  { type: "p", text: "Siamo soci della Câmara de Comércio Italiana e dell'Associazione Export Strategist.", linkText: "Câmara de Comércio Italiana", linkHref: "https://www.italiabrasil.com.br" },
  { type: "link", text: "www.exportstrategist.it", href: "https://www.exportstrategist.it" },

  { type: "h2", text: "Finanza agevolata: le risorse per partire" },
  { type: "p", text: "Una strategia di internazionalizzazione richiede visione, informazioni corrette e partner affidabili. Ma richiede anche risorse." },
  { type: "p", text: "In qualità di EU Project Management Specialist formato presso CEIPIEMONTE — Centro Estero per l'Internazionalizzazione del Piemonte — siamo in grado di individuare le misure di finanza agevolata più adatte a sostenere progetti di internazionalizzazione, sviluppo commerciale, partnership e ingresso in nuovi mercati." },
  { type: "p", text: "Questo vale sia per la singola impresa, sia per progetti costruiti in partenariato con altre aziende italiane ed europee." },
  { type: "p", text: "L'operatività in Italia e in altri Paesi dell'Unione Europea, con particolare attenzione anche alla Repubblica di Croazia, consente inoltre di ragionare su strategie più ampie, capaci di collegare competenze, territori, fondi e opportunità in una logica europea." },

  { type: "h2", text: "Un metodo, una rete" },
  { type: "p", text: "Nessun consulente, da solo, può sostituire una rete di specialisti." },
  { type: "p", text: "Per questo lavoriamo con un network selezionato di professionisti in Europa e in Brasile: legali d'impresa, tributaristi, specialisti doganali, esperti di logistica, fiscalità, contrattualistica, incentivi e operazioni internazionali." },
  { type: "p", text: "Per ogni progetto attiviamo le competenze giuste al momento giusto. Il nostro ruolo è coordinare il processo, porre le domande corrette, selezionare le informazioni rilevanti e costruire una risposta completa, aggiornata e operativa." },
  { type: "p", text: "Per voi, un solo interlocutore che coordina il lavoro e risponde del risultato. Dietro, una rete di specialisti che consente di affrontare ogni progetto con metodo, competenza e profondità." },

  { type: "h2", text: "Parliamone" },
  { type: "p", text: "Ogni progetto di internazionalizzazione di successo — che si tratti di import-export, soft landing, ricerca partner, analisi di mercato o sviluppo commerciale — inizia con le domande giuste." },
  { type: "p", text: "Sottoponeteci i vostri quesiti, i vostri dubbi e le vostre esigenze. Vi aiuteremo a trasformarli in un percorso concreto, basato su informazioni affidabili, risposte chiare e decisioni ben ponderate." },
  { type: "p", text: "E per restare aggiornati su costi occulti, incentivi, rischi e opportunità del mercato brasiliano, consultate e iscrivetevi alla nostra newsletter \"Custo Brasil\" sulla nostra pagina LinkedIn: analisi pratiche, senza giri di parole, direttamente dal cuore del Brasile." },
  { type: "p", text: "Perché sapere è potere. Ma saper interpretare correttamente ciò che si sa è il vero vantaggio competitivo.", italic: true },
];

export default function AboutUs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <div className="container max-w-3xl pt-32 md:pt-40 pb-16 md:pb-24">
        <h1 className="font-display text-4xl md:text-5xl leading-tight mb-4">
          Chi siamo
        </h1>
        <article className="space-y-6">
          {blocks.map((b, i) =>
            b.type === "h2" ? (
              <h2
                key={i}
                className="font-display text-2xl md:text-3xl mt-10 mb-2 text-foreground"
              >
                {b.text}
              </h2>
            ) : b.type === "link" ? (
              <p key={i} className="text-base md:text-lg leading-relaxed text-muted-foreground text-justify">
                <a
                  href={b.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline hover:text-primary/80 transition-colors"
                >
                  {b.text}
                </a>
              </p>
            ) : (
              <p
                key={i}
                className={`text-base md:text-lg leading-relaxed text-muted-foreground text-justify${b.italic ? " italic" : ""}`}
              >
                {b.linkText && b.linkHref ? (
                  (() => {
                    const idx = b.text.indexOf(b.linkText);
                    if (idx === -1) return b.text;
                    const before = b.text.slice(0, idx);
                    const after = b.text.slice(idx + b.linkText.length);
                    return (
                      <>
                        {before}
                        <a
                          href={b.linkHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary underline hover:text-primary/80 transition-colors"
                        >
                          {b.linkText}
                        </a>
                        {after}
                      </>
                    );
                  })()
                ) : (
                  b.text
                )}
              </p>
            )
          )}
        </article>
        <p className="text-base md:text-lg leading-relaxed text-muted-foreground text-justify mt-6">
          <a
            href="https://www.linkedin.com/company/businessmatchingglobal"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline hover:text-primary/80 transition-colors"
          >
            Business Matching Global su LinkedIn
          </a>
        </p>
        <ContactForm />
      </div>
    </div>
  );
}
