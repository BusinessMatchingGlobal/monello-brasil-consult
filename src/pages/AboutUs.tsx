import { useState, useEffect, FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Menu, X, Mail } from "lucide-react";
import { useT, Lang } from "@/lib/i18n";
import { useCanonical } from "@/lib/useCanonical";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const EMAIL = "info@businessmatching.global";

type Block =
  | { type: "h2"; text: string }
  | { type: "p"; text: string; italic?: boolean; linkText?: string; linkHref?: string; links?: Array<{ text: string; href: string }> }
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

const blocksIt: Block[] = [
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
  { type: "p", text: "Siamo membri di ITALCAM – Camera Italo-Brasiliana di Commercio, Industria e Agricoltura di San Paolo, della Camera di Commercio Italiana di Minas Gerais e dell'Associazione Export Strategist.", links: [
    { text: "ITALCAM – Camera Italo-Brasiliana di Commercio, Industria e Agricoltura di San Paolo", href: "https://italcam.com.br/" },
    { text: "Camera di Commercio Italiana di Minas Gerais", href: "https://italiabrasil.com.br/" },
    { text: "Associazione Export Strategist", href: "https://www.exportstrategist.it/" },
  ]},

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
  { type: "p", text: "E per restare aggiornati su costi occulti, incentivi, rischi e opportunità del mercato brasiliano, consultate e iscrivetevi alla nostra newsletter \"Custo Brasil\" sulla nostra pagina LinkedIn: analisi pratiche, senza giri di parole, direttamente dal cuore del Brasile.", links: [{ text: "Custo Brasil", href: "https://www.linkedin.com/company/businessmatchingglobal" }] },
  { type: "p", text: "Perché sapere è potere. Ma saper interpretare correttamente ciò che si sa è il vero vantaggio competitivo.", italic: true },
];

const blocksEn: Block[] = [
  { type: "h2", text: "Scientia potentia est — \"Knowledge is power\"" },
  { type: "p", text: "The insight attributed to Francis Bacon more than four centuries ago remains as relevant as ever: knowledge is power. Yet in international business, access to information alone is not enough. Information must be searched for, selected, verified, updated and interpreted correctly." },
  { type: "p", text: "We believe that access to reliable information — including information you did not even know you needed — and the ability to turn it into operational decisions can make the difference between a sound strategy and a costly mistake." },
  { type: "p", text: "This is at the heart of our work: providing reliable information, placing it in the right context and helping you interpret it correctly before a wrong decision becomes an expensive one." },

  { type: "h2", text: "Custo Brasil: from hidden cost to strategic variable" },
  { type: "p", text: "Operating in Brazil means navigating a complex system that is often difficult to understand from the outside." },
  { type: "p", text: "One of the key concepts to understand is Custo Brasil: the combined effect of bureaucratic, tax, logistical, infrastructural and administrative inefficiencies that can significantly affect the real cost of entering and developing within the Brazilian market." },
  { type: "p", text: "Many companies discover this too late, once it has already started to erode their margins. Others, on the contrary, overestimate it and miss real opportunities because they perceive the market as too difficult." },
  { type: "p", text: "The truth is that Custo Brasil should neither be ignored nor feared in generic terms. It must be measured, understood and managed. In some cases, when correctly interpreted, it can even become a competitive advantage. Those who understand the system's complexities better can identify solutions, regions, partners and pathways that others overlook." },

  { type: "h2", text: "The Brazilian archipelago" },
  { type: "p", text: "The second, even more common mistake is treating Brazil as a single market. It is not." },
  { type: "p", text: "Brazil is an economic continent made up of many local, sector-specific and regional markets. It is an archipelago of mini-markets, each with its own characteristics, costs, incentives, consumer habits, logistics networks and key stakeholders." },
  { type: "p", text: "Tax incentives and benefits can vary from state to state and, in some cases, even from municipality to municipality. The choice of where to enter the market, produce, distribute or seek partners can make the difference between a sustainable project and one destined to struggle." },
  { type: "p", text: "That is why it is not enough to ask whether a product can work \"in Brazil\". The right questions are: where, with whom, under what conditions, with what cost structure and with what competitive advantages?" },
  { type: "p", text: "Our job is to help you navigate this archipelago: identifying the most suitable regions, reliable partners, hidden opportunities and risks to anticipate." },

  { type: "h2", text: "In both directions" },
  { type: "p", text: "We operate between Europe, Brazil and Mercosur in both directions." },
  { type: "p", text: "We assist European companies seeking to enter or expand in Brazil and South America. At the same time, we support Brazilian and South American companies looking to establish a presence, structure their operations and grow in Europe." },
  { type: "p", text: "Understanding two worlds means knowing how to build bridges, not merely act as a guide." },
  { type: "p", text: "Our work operates on two fronts. On the one hand, we identify opportunities that aggregated data often fails to reveal: the right niche market, a reliable partner, or an opening created by regulatory or commercial change. On the other hand, we anticipate problems before they become costs." },
  { type: "p", text: "We spot opportunities before competitors do. We identify problems before they become expensive." },

  { type: "h2", text: "Why now: the new EU-Mercosur landscape" },
  { type: "p", text: "The framework of trade relations between the European Union and Mercosur is entering a phase of profound transformation. Tariffs, barriers, market access rules, technical standards and trade opportunities are changing the way many European and South American companies look at their respective markets." },
  { type: "p", text: "In this scenario, acting with the right information can help build a competitive advantage that will be difficult for others to recover later." },
  { type: "p", text: "The opportunities are not limited to large companies. They may also benefit SMEs, specialised manufacturers, agri-food supply chains, industrial firms, professional services, technology, logistics, sustainability and partnership projects between European and Brazilian operators." },
  { type: "p", text: "However, every opportunity must be understood in context. A trade agreement can open doors, but it does not replace knowledge of the local landscape, regulations, business practices and the right contacts." },

  { type: "h2", text: "Who is behind it: method, not improvisation" },
  { type: "p", text: "The founder, Enzo Aldo Stobbione, holds a degree in Political Science, with a focus on international politics, from the University of Turin. He also earned a Master's degree in Economics and International Relations from ASERI — the Graduate School of Economics and International Relations of the Catholic University of the Sacred Heart in Milan — and a Master's degree in Integrated Strategies for Sustainability and Ecological Transition from the University of Eastern Piedmont." },
  { type: "p", text: "He has lived for several years in Belo Horizonte, the capital of Minas Gerais, in the heart of South-East Brazil. This region, together with São Paulo and Rio de Janeiro, accounts for a significant share of the country's GDP, industry, finance and innovation." },
  { type: "p", text: "Belo Horizonte is not only a major regional economic hub. It is also home to San Pedro Valley, one of Brazil's most dynamic startup ecosystems — a clear sign of a productive fabric that is not limited to industry, finance and commerce, but also includes technology, innovation and new entrepreneurship." },
  { type: "p", text: "This is not a remote observation point. It is a direct presence in one of Brazil's most important economic regions." },
  { type: "p", text: "We are members of ITALCAM – Italian-Brazilian Chamber of Commerce, Industry and Agriculture of São Paulo, of the Italian Chamber of Commerce of Minas Gerais and of the Associazione Export Strategist.", links: [
    { text: "ITALCAM – Italian-Brazilian Chamber of Commerce, Industry and Agriculture of São Paulo", href: "https://italcam.com.br/" },
    { text: "Italian Chamber of Commerce of Minas Gerais", href: "https://italiabrasil.com.br/" },
    { text: "Associazione Export Strategist", href: "https://www.exportstrategist.it/" },
  ]},

  { type: "h2", text: "Subsidised finance: resources to get started" },
  { type: "p", text: "An internationalisation strategy requires vision, accurate information and reliable partners. It also requires resources." },
  { type: "p", text: "As EU Project Management Specialists trained at CEIPIEMONTE — the Piedmont Centre for Internationalisation — we are able to identify the most suitable subsidised finance measures to support internationalisation projects, business development, partnerships and entry into new markets." },
  { type: "p", text: "This applies both to individual companies and to projects developed in partnership with other Italian and European firms." },
  { type: "p", text: "Our operations in Italy and other European Union countries — with a particular focus on the Republic of Croatia — also allow us to develop broader strategies that connect expertise, territories, funding and opportunities within a European framework." },

  { type: "h2", text: "One approach, one network" },
  { type: "p", text: "No single consultant can replace a network of specialists." },
  { type: "p", text: "That is why we work with a selected network of professionals in Europe and Brazil: corporate lawyers, tax advisors, customs specialists and experts in logistics, taxation, contracts, incentives and international operations." },
  { type: "p", text: "For each project, we bring in the right expertise at the right time. Our role is to coordinate the process, ask the right questions, select the relevant information and develop comprehensive, up-to-date and actionable solutions." },
  { type: "p", text: "For you, this means having a single point of contact who coordinates the work and takes responsibility for the outcome. Behind the scenes, a network of specialists enables us to approach every project with method, expertise and depth." },

  { type: "h2", text: "Let's talk" },
  { type: "p", text: "Every successful internationalisation project — whether it involves import-export, soft landing, partner search, market analysis or business development — starts with the right questions." },
  { type: "p", text: "Share your questions, concerns and needs with us. We will help you turn them into a concrete path based on reliable information, clear answers and well-considered decisions." },
  { type: "p", text: "To stay up to date on hidden costs, incentives, risks and opportunities in the Brazilian market, visit and subscribe to our \"Custo Brasil\" newsletter on LinkedIn: practical analysis, without unnecessary noise, straight from the heart of Brazil.", links: [{ text: "Custo Brasil", href: "https://www.linkedin.com/company/businessmatchingglobal" }] },
  { type: "p", text: "Because knowledge is power. But knowing how to interpret it is the real competitive advantage.", italic: true },
];

const blocksPt: Block[] = [
  { type: "h2", text: 'Scientia potentia est — "Saber é poder"' },
  { type: "p", text: "A máxima atribuída a Francis Bacon há mais de quatro séculos continua, hoje mais do que nunca, atual: saber é poder. No entanto, no mundo da internacionalização, não basta ter acesso à informação. É preciso saber buscá-la, selecioná-la, atualizá-la e interpretá-la corretamente." },
  { type: "p", text: "Acreditamos que o acesso a informações confiáveis — incluindo aquelas de que sua empresa nem sabia que precisava — e a capacidade de transformá-las em decisões operacionais podem fazer a diferença entre uma estratégia sólida e um erro custoso." },
  { type: "p", text: "Esse é o centro do nosso trabalho: fornecer informações confiáveis, contextualizá-las e ajudar você a interpretá-las corretamente, antes que uma escolha equivocada se transforme em custo." },

  { type: "h2", text: "O Custo Brasil: de custo oculto a variável estratégica" },
  { type: "p", text: "Atuar no Brasil significa lidar com um sistema complexo, muitas vezes difícil de compreender para quem está de fora. Um dos elementos mais importantes a considerar é o chamado Custo Brasil: o conjunto de ineficiências burocráticas, tributárias, logísticas, de infraestrutura e administrativas que podem impactar de forma significativa os custos reais de entrada e desenvolvimento no mercado brasileiro." },
  { type: "p", text: "Muitas empresas percebem isso tarde demais, quando o Custo Brasil já começou a corroer suas margens. Outras, ao contrário, superestimam esse fator e acabam abrindo mão de oportunidades reais por enxergarem o mercado como excessivamente difícil." },
  { type: "p", text: "A verdade é que o Custo Brasil não deve ser ignorado nem temido de forma genérica. Ele precisa ser medido, compreendido e gerido. Em alguns casos, quando corretamente interpretado, pode até se transformar em vantagem competitiva. Quem compreende melhor as complexidades do sistema consegue identificar soluções, regiões, parceiros e caminhos que outros não enxergam." },

  { type: "h2", text: "O arquipélago Brasil" },
  { type: "p", text: "O segundo erro, ainda mais comum, é tratar o Brasil como um único mercado. Ele não é." },
  { type: "p", text: "O Brasil é um continente econômico composto por uma pluralidade de mercados locais, setoriais e regionais. É um arquipélago de minimercados, cada um com características, custos, incentivos, hábitos de consumo, redes logísticas e interlocutores próprios." },
  { type: "p", text: "Incentivos e benefícios fiscais podem variar de estado para estado e, em alguns casos, até de município para município. A escolha do território onde entrar, produzir, distribuir ou buscar parceiros pode fazer a diferença entre um projeto sustentável e um projeto destinado a enfrentar dificuldades." },
  { type: "p", text: "Por isso, não basta perguntar se um produto pode funcionar \"no Brasil\". As perguntas certas são: onde, com quem, em quais condições, com qual estrutura de custos e com quais vantagens competitivas?" },
  { type: "p", text: "Nosso trabalho consiste justamente em ajudar sua empresa a compreender esse arquipélago: identificar os territórios mais adequados, os parceiros mais confiáveis, as oportunidades menos visíveis e os riscos que precisam ser antecipados." },

  { type: "h2", text: "Em ambas as direções" },
  { type: "p", text: "Atuamos entre Europa, Brasil e Mercosul em ambas as direções." },
  { type: "p", text: "Apoiamos empresas europeias que desejam entrar ou crescer no Brasil e na América do Sul. Ao mesmo tempo, apoiamos empresas brasileiras e sul-americanas que pretendem se estabelecer, se estruturar e crescer na Europa." },
  { type: "p", text: "Conhecer dois mundos significa saber construir pontes, não apenas servir de guia." },
  { type: "p", text: "Nosso trabalho se desenvolve em duas frentes: de um lado, identificamos oportunidades que os dados agregados muitas vezes não revelam — o nicho de mercado certo, o parceiro confiável, a janela de oportunidade aberta por uma mudança regulatória ou comercial; de outro, antecipamos problemas antes que eles se transformem em custos." },
  { type: "p", text: "Enxergar oportunidades antes dos concorrentes. Antecipar problemas antes que eles gerem custos." },

  { type: "h2", text: "Por que agora: o novo cenário UE-Mercosul" },
  { type: "p", text: "O cenário das relações comerciais entre a União Europeia e o Mercosul está entrando em uma fase de profunda transformação. Tarifas, barreiras, regras de acesso ao mercado, normas técnicas e oportunidades de comércio tendem a alterar a forma como muitas empresas europeias e sul-americanas enxergam seus respectivos mercados." },
  { type: "p", text: "Nesse contexto, agir com as informações certas pode significar construir uma vantagem competitiva difícil de recuperar para quem chegar depois." },
  { type: "p", text: "As oportunidades não se limitam às grandes empresas. Elas também podem interessar a pequenas e médias empresas, produtores especializados, cadeias agroalimentares, empresas industriais, serviços profissionais, tecnologia, logística, sustentabilidade e projetos de parceria entre operadores europeus e brasileiros." },
  { type: "p", text: "No entanto, toda oportunidade precisa ser analisada dentro do seu contexto. Um acordo comercial pode abrir portas, mas não substitui o conhecimento do território, das regras, das práticas locais e dos interlocutores certos." },

  { type: "h2", text: "Por trás de tudo: método, não improvisação" },
  { type: "p", text: "O fundador, Enzo Aldo Stobbione, é formado em Ciências Políticas, com foco político-internacional, pela Universidade de Turim. Também possui mestrado em Economia e Relações Internacionais pela ASERI — Alta Escola de Economia e Relações Internacionais da Universidade Católica do Sagrado Coração de Milão — e mestrado em Estratégias Integradas para a Sustentabilidade e a Transição Ecológica pela Universidade do Piemonte Oriental." },
  { type: "p", text: "Há vários anos reside em Belo Horizonte, capital de Minas Gerais, no coração da região Sudeste do Brasil: uma área que, junto com São Paulo e Rio de Janeiro, concentra uma parte significativa do PIB, da indústria, das finanças e da inovação do país." },
  { type: "p", text: "Belo Horizonte não é apenas uma importante capital econômica regional. É também sede da San Pedro Valley, um dos ecossistemas de startups mais dinâmicos do Brasil — sinal de um tecido produtivo que não é composto apenas por indústria, finanças e comércio, mas também por tecnologia, inovação e novo empreendedorismo." },
  { type: "p", text: "Não se trata, portanto, de um observatório à distância, mas de uma presença direta no coração econômico do Brasil." },
  { type: "p", text: "Somos membros da ITALCAM – Câmara Ítalo-Brasileira de Comércio, Indústria e Agricultura de São Paulo, da Câmara de Comércio Italiana de Minas Gerais e da Associazione Export Strategist.", links: [
    { text: "ITALCAM – Câmara Ítalo-Brasileira de Comércio, Indústria e Agricultura de São Paulo", href: "https://italcam.com.br/" },
    { text: "Câmara de Comércio Italiana de Minas Gerais", href: "https://italiabrasil.com.br/" },
    { text: "Associazione Export Strategist", href: "https://www.exportstrategist.it/" },
  ]},

  { type: "h2", text: "Financiamento subsidiado: recursos para começar" },
  { type: "p", text: "Uma estratégia de internacionalização exige visão, informações precisas e parceiros confiáveis. Mas também exige recursos." },
  { type: "p", text: "Como EU Project Management Specialist, com formação pelo CEIPIEMONTE — Centro para a Internacionalização do Piemonte —, somos capazes de identificar as medidas de financiamento subsidiado mais adequadas para apoiar projetos de internacionalização, desenvolvimento comercial, parcerias e entrada em novos mercados." },
  { type: "p", text: "Isso se aplica tanto a empresas individuais quanto a projetos desenvolvidos em parceria com outras empresas italianas e europeias." },
  { type: "p", text: "Nossa atuação na Itália e em outros países da União Europeia — com atenção especial também à República da Croácia — permite ainda desenvolver estratégias mais amplas, capazes de conectar competências, territórios, fundos e oportunidades dentro de uma lógica europeia." },

  { type: "h2", text: "Um método, uma rede" },
  { type: "p", text: "Nenhum consultor, sozinho, substitui uma rede de especialistas." },
  { type: "p", text: "Por isso, trabalhamos com uma rede selecionada de profissionais na Europa e no Brasil: advogados empresariais, tributaristas, especialistas aduaneiros, especialistas em logística, contratos, incentivos e operações internacionais." },
  { type: "p", text: "Para cada projeto, mobilizamos as competências certas no momento certo. Nosso papel é coordenar o processo, fazer as perguntas certas, selecionar as informações relevantes e construir uma resposta completa, atualizada e operacional." },
  { type: "p", text: "Para você, um único interlocutor que coordena o trabalho e responde pelo resultado. Por trás, uma rede de especialistas que permite abordar cada projeto com método, competência e profundidade." },

  { type: "h2", text: "Vamos conversar?" },
  { type: "p", text: "Todo projeto de internacionalização bem-sucedido — seja de importação e exportação, soft landing, busca de parceiros, análise de mercado ou desenvolvimento comercial — começa com as perguntas certas." },
  { type: "p", text: "Envie-nos suas dúvidas, questões e necessidades. Ajudaremos você a transformá-las em um plano concreto, baseado em informações confiáveis, respostas claras e decisões bem fundamentadas." },
  { type: "p", text: 'Para se manter atualizado sobre custos ocultos, incentivos, riscos e oportunidades do mercado brasileiro, consulte e assine nossa newsletter "Custo Brasil" em nossa página no LinkedIn: análises práticas, sem rodeios, diretamente do coração do Brasil.', links: [{ text: "Custo Brasil", href: "https://www.linkedin.com/company/businessmatchingglobal" }] },
  { type: "p", text: "Porque saber é poder. Mas saber interpretar corretamente o que se sabe é a verdadeira vantagem competitiva.", italic: true },
];

export default function AboutUs() {
  useCanonical("/About_us");
  const { lang } = useT();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const blocks = lang === "en" ? blocksEn : lang === "pt" ? blocksPt : blocksIt;
  const pageTitle = lang === "en" ? "About us" : lang === "pt" ? "Quem somos" : "Chi siamo";
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <div className="container max-w-3xl pt-32 md:pt-40 pb-16 md:pb-24">
        <h1 className="font-display text-4xl md:text-5xl leading-tight mb-4">
          {pageTitle}
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
                  rel="noopener"
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
                {b.links && b.links.length > 0 ? (
                  (() => {
                    type Match = { start: number; end: number; text: string; href: string };
                    const matches: Match[] = b.links
                      .map((l) => {
                        const idx = b.text.indexOf(l.text);
                        return idx !== -1 ? { start: idx, end: idx + l.text.length, ...l } : null;
                      })
                      .filter((m): m is Match => m !== null);
                    matches.sort((a, b) => a.start - b.start);
                    const nodes: React.ReactNode[] = [];
                    let pos = 0;
                    for (const m of matches) {
                      if (m.start < pos) continue;
                      nodes.push(b.text.slice(pos, m.start));
                      nodes.push(
                        <a
                          key={m.start}
                          href={m.href}
                          target="_blank"
                          rel="noopener"
                          className="text-primary underline hover:text-primary/80 transition-colors"
                        >
                          {m.text}
                        </a>
                      );
                      pos = m.end;
                    }
                    nodes.push(b.text.slice(pos));
                    return <>{nodes}</>;
                  })()
                ) : b.linkText && b.linkHref ? (
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
                          rel="noopener"
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
            rel="noopener"
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
