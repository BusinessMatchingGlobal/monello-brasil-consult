import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Send, CheckCircle2, CalendarIcon, Plus, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { z } from "zod";
import { useT, type Lang } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useCanonical } from "@/lib/useCanonical";
import { AirportCombobox } from "@/components/AirportCombobox";
import { AIRPORTS } from "@/lib/airports";
import { cn } from "@/lib/utils";

const PREFIXES = [
  { value: "+39", label: "+39 Italia" },
  { value: "+55", label: "+55 Brasil" },
  { value: "+351", label: "+351 Portugal" },
  { value: "+44", label: "+44 United Kingdom" },
  { value: "+49", label: "+49 Germany" },
  { value: "+33", label: "+33 France" },
  { value: "+34", label: "+34 Spain" },
  { value: "+41", label: "+41 Switzerland" },
  { value: "+31", label: "+31 Netherlands" },
  { value: "+1", label: "+1 USA / Canada" },
  { value: "+61", label: "+61 Australia" },
  { value: "+86", label: "+86 China" },
];

const numberSchema = z.string().trim().min(5).max(20);

const schema = z.object({
  organization: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  phoneNumber: numberSchema,
  whatsappNumber: numberSchema,
  consent: z.literal(true),
});

type TripType = "roundtrip" | "oneway" | "complex";
type Flex = "fixed" | "flexible";

type Leg = {
  id: string;
  origin: string;
  destination: string;
  date: Date | undefined;
  flex: Flex;
  daysBefore: number;
  daysAfter: number;
};

function newLeg(): Leg {
  return {
    id: Math.random().toString(36).slice(2),
    origin: "",
    destination: "",
    date: undefined,
    flex: "fixed",
    daysBefore: 0,
    daysAfter: 0,
  };
}

function airportLabel(code: string) {
  const a = AIRPORTS.find((x) => x.code === code);
  return a ? `${a.code} — ${a.name}` : code || "—";
}

function legToText(leg: Leg, dateFmtLabel: string, fixedLabel: string, flexLabel: string) {
  const dateStr = leg.date ? format(leg.date, "yyyy-MM-dd") : "—";
  const flexStr =
    leg.flex === "flexible"
      ? `${flexLabel} (−${leg.daysBefore}/+${leg.daysAfter} ${dateFmtLabel})`
      : fixedLabel;
  return `${airportLabel(leg.origin)} → ${airportLabel(leg.destination)} | ${dateStr} | ${flexStr}`;
}

type TravelClass = "Economy" | "Premium" | "Business";

type Passenger = {
  id: string;
  lastName: string;
  firstName: string;
  birthDate: Date | undefined;
  travelClass: TravelClass;
  bags: number;
  weight: "15" | "23" | "32";
};

function newPassenger(): Passenger {
  return {
    id: Math.random().toString(36).slice(2),
    lastName: "",
    firstName: "",
    birthDate: undefined,
    travelClass: "Economy",
    bags: 0,
    weight: "23",
  };
}

function passengerToText(p: Passenger, c: Copy) {
  const dob = p.birthDate ? format(p.birthDate, "yyyy-MM-dd") : "—";
  const cls =
    p.travelClass === "Economy" ? c.classEconomy :
    p.travelClass === "Premium" ? c.classPremium : c.classBusiness;
  return `${p.lastName} ${p.firstName} | ${c.birthDate}: ${dob} | ${c.class}: ${cls} | ${c.bags}: ${p.bags} | ${c.weight}: ${p.weight}kg`;
}

type Copy = {
  back: string;
  eyebrow: string;
  title: string;
  sub: string;
  organization: string;
  email: string;
  phone: string;
  whatsapp: string;
  prefix: string;
  number: string;
  consentLabel: string;
  consentLink: string;
  consentSuffix: string;
  consentRequired: string;
  submit: string;
  invalid: string;
  required: string;
  successTitle: string;
  successBody: string;
  itineraryTitle: string;
  itinerarySub: string;
  tripRoundtrip: string;
  tripOneway: string;
  tripComplex: string;
  outbound: string;
  return: string;
  leg: string;
  addLeg: string;
  removeLeg: string;
  origin: string;
  destination: string;
  date: string;
  pickDate: string;
  flexibility: string;
  fixedDate: string;
  flexibleDate: string;
  daysBefore: string;
  daysAfter: string;
  days: string;
  itineraryIncomplete: string;
  passengerTitle: string;
  passengerSub: string;
  passenger: string;
  addPassenger: string;
  removePassenger: string;
  lastName: string;
  firstName: string;
  birthDate: string;
  class: string;
  classEconomy: string;
  classPremium: string;
  classBusiness: string;
  bags: string;
  weight: string;
  passengerIncomplete: string;
};

const copy: Record<Lang, Copy> = {
  it: {
    back: "Torna alla home",
    eyebrow: "Contatto rapido",
    title: "Richiesta informazioni",
    sub: "Lascia i tuoi recapiti e ti ricontatteremo al più presto.",
    organization: "Organizzazione/Persona di Riferimento",
    email: "Email",
    phone: "Cellulare",
    whatsapp: "WhatsApp",
    prefix: "Prefisso",
    number: "Numero",
    consentLabel: "Ho letto l'",
    consentLink: "informativa privacy",
    consentSuffix: "e acconsento al trattamento dei miei dati per essere ricontattato.",
    consentRequired: "Devi accettare l'informativa privacy per inviare la richiesta.",
    submit: "Invia richiesta",
    invalid: "Controlla i campi: tutti sono obbligatori e l'email deve essere valida.",
    required: "Tutti i campi sono obbligatori.",
    successTitle: "Grazie! La richiesta è stata inviata.",
    successBody: "Ti ricontatteremo al più presto. Se non ricevi risposta, controlla anche la cartella SPAM.",
    itineraryTitle: "Itinerario voli",
    itinerarySub: "Seleziona il tipo di viaggio e compila le tratte richieste.",
    tripRoundtrip: "Andata e Ritorno",
    tripOneway: "Solo Andata",
    tripComplex: "Itinerario complesso",
    outbound: "Andata",
    return: "Ritorno",
    leg: "Tratta",
    addLeg: "Aggiungi tratta",
    removeLeg: "Rimuovi",
    origin: "APT Partenza",
    destination: "APT Destinazione",
    date: "Data",
    pickDate: "Scegli una data",
    flexibility: "Flessibilità",
    fixedDate: "Data fissa",
    flexibleDate: "Flessibile",
    daysBefore: "Giorni prima",
    daysAfter: "Giorni dopo",
    days: "giorni",
    itineraryIncomplete: "Completa l'itinerario voli: aeroporti e date sono obbligatori.",
    passengerTitle: "Passeggeri",
    passengerSub: "Inserisci i dati dei passeggeri per la richiesta di volo.",
    passenger: "Passeggero",
    addPassenger: "Aggiungi passeggero",
    removePassenger: "Rimuovi",
    lastName: "Cognome",
    firstName: "Nome",
    birthDate: "Data di nascita",
    class: "Classe",
    classEconomy: "Economy",
    classPremium: "Premium",
    classBusiness: "Business",
    bags: "Bagagli in stiva",
    weight: "Peso bagaglio",
    passengerIncomplete: "Completa i dati di tutti i passeggeri: cognome, nome e data di nascita sono obbligatori.",
  },
  en: {
    back: "Back to home",
    eyebrow: "Quick contact",
    title: "Request information",
    sub: "Leave your details and we will get back to you as soon as possible.",
    organization: "Organization / Contact Person",
    email: "Email",
    phone: "Mobile phone",
    whatsapp: "WhatsApp",
    prefix: "Prefix",
    number: "Number",
    consentLabel: "I have read the ",
    consentLink: "privacy notice",
    consentSuffix: "and I consent to the processing of my data to be contacted.",
    consentRequired: "You must accept the privacy notice to send the request.",
    submit: "Send request",
    invalid: "Please check the fields: all are required and the email must be valid.",
    required: "All fields are required.",
    successTitle: "Thank you! Your request has been sent.",
    successBody: "We will get back to you soon. If you do not hear from us, please check your SPAM folder.",
    itineraryTitle: "Flight itinerary",
    itinerarySub: "Select trip type and fill in the required legs.",
    tripRoundtrip: "Round trip",
    tripOneway: "One way",
    tripComplex: "Complex itinerary",
    outbound: "Outbound",
    return: "Return",
    leg: "Leg",
    addLeg: "Add leg",
    removeLeg: "Remove",
    origin: "Departure APT",
    destination: "Arrival APT",
    date: "Date",
    pickDate: "Pick a date",
    flexibility: "Flexibility",
    fixedDate: "Fixed date",
    flexibleDate: "Flexible",
    daysBefore: "Days before",
    daysAfter: "Days after",
    days: "days",
    itineraryIncomplete: "Please complete the flight itinerary: airports and dates are required.",
    passengerTitle: "Passengers",
    passengerSub: "Enter passenger details for the flight request.",
    passenger: "Passenger",
    addPassenger: "Add passenger",
    removePassenger: "Remove",
    lastName: "Last name",
    firstName: "First name",
    birthDate: "Date of birth",
    class: "Class",
    classEconomy: "Economy",
    classPremium: "Premium",
    classBusiness: "Business",
    bags: "Checked bags",
    weight: "Bag weight",
    passengerIncomplete: "Please complete all passenger details: last name, first name and date of birth are required.",
  },
  pt: {
    back: "Voltar para a home",
    eyebrow: "Contato rápido",
    title: "Solicite informações",
    sub: "Deixe seus dados e entraremos em contato o mais breve possível.",
    organization: "Organização / Pessoa de Contato",
    email: "E-mail",
    phone: "Telemóvel",
    whatsapp: "WhatsApp",
    prefix: "Prefixo",
    number: "Número",
    consentLabel: "Li o ",
    consentLink: "aviso de privacidade",
    consentSuffix: "e concordo com o tratamento dos meus dados para ser contatado.",
    consentRequired: "Você precisa aceitar o aviso de privacidade para enviar a solicitação.",
    submit: "Enviar solicitação",
    invalid: "Verifique os campos: todos são obrigatórios e o e-mail deve ser válido.",
    required: "Todos os campos são obrigatórios.",
    successTitle: "Obrigado! Sua solicitação foi enviada.",
    successBody: "Entraremos em contato em breve. Se não receber resposta, verifique a pasta de SPAM.",
    itineraryTitle: "Itinerário de voos",
    itinerarySub: "Selecione o tipo de viagem e preencha os trechos solicitados.",
    tripRoundtrip: "Ida e Volta",
    tripOneway: "Somente Ida",
    tripComplex: "Itinerário complexo",
    outbound: "Ida",
    return: "Volta",
    leg: "Trecho",
    addLeg: "Adicionar trecho",
    removeLeg: "Remover",
    origin: "APT Partida",
    destination: "APT Destino",
    date: "Data",
    pickDate: "Escolha uma data",
    flexibility: "Flexibilidade",
    fixedDate: "Data fixa",
    flexibleDate: "Flexível",
    daysBefore: "Dias antes",
    daysAfter: "Dias depois",
    days: "dias",
    itineraryIncomplete: "Complete o itinerário de voos: aeroportos e datas são obrigatórios.",
    passengerTitle: "Passageiros",
    passengerSub: "Insira os dados dos passageiros para a solicitação de voo.",
    passenger: "Passageiro",
    addPassenger: "Adicionar passageiro",
    removePassenger: "Remover",
    lastName: "Sobrenome",
    firstName: "Nome",
    birthDate: "Data de nascimento",
    class: "Classe",
    classEconomy: "Econômica",
    classPremium: "Premium",
    classBusiness: "Executiva",
    bags: "Bagagem despachada",
    weight: "Peso da bagagem",
    passengerIncomplete: "Complete os dados de todos os passageiros: sobrenome, nome e data de nascimento são obrigatórios.",
  },
};

function LegEditor({
  leg,
  onChange,
  c,
}: {
  leg: Leg;
  onChange: (patch: Partial<Leg>) => void;
  c: Copy;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div className="space-y-1.5">
        <Label>{c.origin} *</Label>
        <AirportCombobox
          value={leg.origin}
          onChange={(v) => onChange({ origin: v })}
          placeholder={c.origin}
          ariaLabel={c.origin}
        />
      </div>
      <div className="space-y-1.5">
        <Label>{c.destination} *</Label>
        <AirportCombobox
          value={leg.destination}
          onChange={(v) => onChange({ destination: v })}
          placeholder={c.destination}
          ariaLabel={c.destination}
        />
      </div>
      <div className="space-y-1.5">
        <Label>{c.date} *</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="outline"
              className={cn("w-full justify-start text-left font-normal", !leg.date && "text-muted-foreground")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {leg.date ? format(leg.date, "PPP") : <span>{c.pickDate}</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
            <Calendar
              mode="single"
              selected={leg.date}
              onSelect={(d) => onChange({ date: d ?? undefined })}
              initialFocus
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="space-y-1.5">
        <Label>{c.flexibility}</Label>
        <RadioGroup
          value={leg.flex}
          onValueChange={(v) => onChange({ flex: v as Flex })}
          className="flex gap-4 pt-2"
        >
          <label className="flex items-center gap-2 text-sm">
            <RadioGroupItem value="fixed" />
            {c.fixedDate}
          </label>
          <label className="flex items-center gap-2 text-sm">
            <RadioGroupItem value="flexible" />
            {c.flexibleDate}
          </label>
        </RadioGroup>
      </div>
      {leg.flex === "flexible" && (
        <div className="md:col-span-2 grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label>{c.daysBefore}</Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                min={0}
                max={30}
                value={leg.daysBefore}
                onChange={(e) => onChange({ daysBefore: Math.max(0, Number(e.target.value) || 0) })}
              />
              <span className="text-sm text-muted-foreground">{c.days}</span>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>{c.daysAfter}</Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                min={0}
                max={30}
                value={leg.daysAfter}
                onChange={(e) => onChange({ daysAfter: Math.max(0, Number(e.target.value) || 0) })}
              />
              <span className="text-sm text-muted-foreground">{c.days}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PassengerEditor({
  passenger,
  onChange,
  c,
}: {
  passenger: Passenger;
  onChange: (patch: Partial<Passenger>) => void;
  c: Copy;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
      <div className="space-y-1.5">
        <Label>{c.lastName} *</Label>
        <Input
          value={passenger.lastName}
          onChange={(e) => onChange({ lastName: e.target.value })}
          maxLength={80}
          required
        />
      </div>
      <div className="space-y-1.5">
        <Label>{c.firstName} *</Label>
        <Input
          value={passenger.firstName}
          onChange={(e) => onChange({ firstName: e.target.value })}
          maxLength={80}
          required
        />
      </div>
      <div className="space-y-1.5">
        <Label>{c.birthDate} *</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="outline"
              className={cn("w-full justify-start text-left font-normal", !passenger.birthDate && "text-muted-foreground")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {passenger.birthDate ? format(passenger.birthDate, "PPP") : <span>{c.pickDate}</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
            <Calendar
              mode="single"
              selected={passenger.birthDate}
              onSelect={(d) => onChange({ birthDate: d ?? undefined })}
              initialFocus
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="space-y-1.5">
        <Label>{c.class}</Label>
        <Select value={passenger.travelClass} onValueChange={(v) => onChange({ travelClass: v as TravelClass })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Economy">{c.classEconomy}</SelectItem>
            <SelectItem value="Premium">{c.classPremium}</SelectItem>
            <SelectItem value="Business">{c.classBusiness}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1.5">
        <Label>{c.bags}</Label>
        <Select value={String(passenger.bags)} onValueChange={(v) => onChange({ bags: Number(v) })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[0, 1, 2, 3, 4, 5].map((n) => (
              <SelectItem key={n} value={String(n)}>
                {n}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1.5">
        <Label>{c.weight}</Label>
        <Select value={passenger.weight} onValueChange={(v) => onChange({ weight: v as "15" | "23" | "32" })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="15">15 kg</SelectItem>
            <SelectItem value="23">23 kg</SelectItem>
            <SelectItem value="32">32 kg</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default function Fly() {
  useCanonical("/fly");
  const { lang } = useT();
  const c = copy[lang];

  const [organization, setOrganization] = useState("");
  const [email, setEmail] = useState("");
  const [phonePrefix, setPhonePrefix] = useState("+39");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [whatsappPrefix, setWhatsappPrefix] = useState("+39");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [tripType, setTripType] = useState<TripType>("roundtrip");
  const [outbound, setOutbound] = useState<Leg>(newLeg());
  const [returnLeg, setReturnLeg] = useState<Leg>(newLeg());
  const [complexLegs, setComplexLegs] = useState<Leg[]>([newLeg()]);
  const [passengers, setPassengers] = useState<Passenger[]>([newPassenger()]);

  function patchOutbound(patch: Partial<Leg>) {
    setOutbound((prev) => ({ ...prev, ...patch }));
  }
  function patchReturn(patch: Partial<Leg>) {
    setReturnLeg((prev) => ({ ...prev, ...patch }));
  }
  function patchComplex(id: string, patch: Partial<Leg>) {
    setComplexLegs((prev) => prev.map((l) => (l.id === id ? { ...l, ...patch } : l)));
  }
  function addComplexLeg() {
    setComplexLegs((prev) => [...prev, newLeg()]);
  }
  function removeComplexLeg(id: string) {
    setComplexLegs((prev) => (prev.length <= 1 ? prev : prev.filter((l) => l.id !== id)));
  }
  function patchPassenger(id: string, patch: Partial<Passenger>) {
    setPassengers((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  }
  function addPassenger() {
    setPassengers((prev) => [...prev, newPassenger()]);
  }
  function removePassenger(id: string) {
    setPassengers((prev) => (prev.length <= 1 ? prev : prev.filter((p) => p.id !== id)));
  }

  function legComplete(l: Leg) {
    return !!(l.origin && l.destination && l.date);
  }
  function itineraryComplete(): boolean {
    if (tripType === "oneway") return legComplete(outbound);
    if (tripType === "roundtrip") return legComplete(outbound) && legComplete(returnLeg);
    return complexLegs.every(legComplete);
  }
  function itineraryToText(): string {
    const tripLabel =
      tripType === "roundtrip" ? c.tripRoundtrip : tripType === "oneway" ? c.tripOneway : c.tripComplex;
    const lines: string[] = [`${c.itineraryTitle}: ${tripLabel}`];
    if (tripType === "roundtrip") {
      lines.push(`  ${c.outbound}: ${legToText(outbound, c.days, c.fixedDate, c.flexibleDate)}`);
      lines.push(`  ${c.return}: ${legToText(returnLeg, c.days, c.fixedDate, c.flexibleDate)}`);
    } else if (tripType === "oneway") {
      lines.push(`  ${c.outbound}: ${legToText(outbound, c.days, c.fixedDate, c.flexibleDate)}`);
    } else {
      complexLegs.forEach((l, i) => {
        lines.push(`  ${c.leg} ${i + 1}: ${legToText(l, c.days, c.fixedDate, c.flexibleDate)}`);
      });
    }
    return lines.join("\n");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!consent) {
      toast({ title: c.consentRequired, variant: "destructive" });
      return;
    }
    const parsed = schema.safeParse({
      organization,
      email,
      phoneNumber,
      whatsappNumber,
      consent,
    });
    if (!parsed.success) {
      toast({ title: c.invalid, variant: "destructive" });
      return;
    }
    if (!itineraryComplete()) {
      toast({ title: c.itineraryIncomplete, variant: "destructive" });
      return;
    }
    setLoading(true);
    const fullPhone = `${phonePrefix} ${phoneNumber}`;
    const fullWhatsapp = `${whatsappPrefix} ${whatsappNumber}`;
    const itineraryText = itineraryToText();
    try {
      await supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "contact-notification",
          idempotencyKey: `fly-${parsed.data.email}-${Date.now()}`,
          templateData: {
            name: parsed.data.organization,
            email: parsed.data.email,
            company: "—",
            message: `Phone: ${fullPhone}\nWhatsApp: ${fullWhatsapp}\n\n${itineraryText}`,
            source: "Fly page",
            language: lang,
            submittedAt: new Date().toISOString(),
          },
        },
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Fly page notification failed", err);
      toast({ title: c.invalid, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-5 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            {c.back}
          </Link>
          <span className="text-sm font-medium">Business Matching Global</span>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-xl mx-auto rounded-xl border border-border bg-card p-6 md:p-10 shadow-sm">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="mb-2">
                <span className="inline-block text-xs uppercase tracking-widest text-primary font-semibold mb-2">
                  {c.eyebrow}
                </span>
                <h1 className="text-2xl md:text-3xl font-bold leading-tight">{c.title}</h1>
                <p className="text-muted-foreground mt-1">{c.sub}</p>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="organization">{c.organization} *</Label>
                <Input
                  id="organization"
                  required
                  maxLength={120}
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email">{c.email} *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  maxLength={255}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label>{c.phone} *</Label>
                <div className="flex gap-3">
                  <div className="w-[140px] shrink-0">
                    <Select value={phonePrefix} onValueChange={setPhonePrefix}>
                      <SelectTrigger aria-label={c.prefix}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {PREFIXES.map((p) => (
                          <SelectItem key={p.value} value={p.value}>
                            {p.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    minLength={5}
                    maxLength={20}
                    placeholder={c.number}
                    aria-label={c.number}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label>{c.whatsapp} *</Label>
                <div className="flex gap-3">
                  <div className="w-[140px] shrink-0">
                    <Select value={whatsappPrefix} onValueChange={setWhatsappPrefix}>
                      <SelectTrigger aria-label={c.prefix}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {PREFIXES.map((p) => (
                          <SelectItem key={p.value} value={p.value}>
                            {p.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Input
                    id="whatsapp"
                    type="tel"
                    required
                    minLength={5}
                    maxLength={20}
                    placeholder={c.number}
                    aria-label={c.number}
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>

              <label className="flex items-start gap-3 text-sm text-muted-foreground pt-1">
                <Checkbox checked={consent} onCheckedChange={(v) => setConsent(v === true)} className="mt-0.5" />
                <span>
                  {c.consentLabel}
                  <Link to="/privacy" className="text-primary underline">
                    {c.consentLink}
                  </Link>{" "}
                  {c.consentSuffix}
                </span>
              </label>

              <div className="pt-2 border-t border-border">
                <div className="mb-3">
                  <h2 className="text-lg font-semibold">{c.itineraryTitle}</h2>
                  <p className="text-sm text-muted-foreground">{c.itinerarySub}</p>
                </div>

                <RadioGroup
                  value={tripType}
                  onValueChange={(v) => setTripType(v as TripType)}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-5"
                >
                  {(
                    [
                      ["roundtrip", c.tripRoundtrip],
                      ["oneway", c.tripOneway],
                      ["complex", c.tripComplex],
                    ] as const
                  ).map(([val, label]) => (
                    <label
                      key={val}
                      className={cn(
                        "flex items-center gap-2 rounded-md border border-border px-3 py-2 cursor-pointer text-sm",
                        tripType === val && "border-primary bg-primary/5",
                      )}
                    >
                      <RadioGroupItem value={val} />
                      {label}
                    </label>
                  ))}
                </RadioGroup>

                {tripType === "roundtrip" && (
                  <div className="space-y-6">
                    <div>
                      <div className="text-sm font-semibold mb-2">{c.outbound}</div>
                      <LegEditor leg={outbound} onChange={patchOutbound} c={c} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold mb-2">{c.return}</div>
                      <LegEditor leg={returnLeg} onChange={patchReturn} c={c} />
                    </div>
                  </div>
                )}

                {tripType === "oneway" && (
                  <div>
                    <div className="text-sm font-semibold mb-2">{c.outbound}</div>
                    <LegEditor leg={outbound} onChange={patchOutbound} c={c} />
                  </div>
                )}

                {tripType === "complex" && (
                  <div className="space-y-6">
                    {complexLegs.map((l, i) => (
                      <div key={l.id} className="rounded-md border border-border p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-sm font-semibold">
                            {c.leg} {i + 1}
                          </div>
                          {complexLegs.length > 1 && (
                            <Button
                              type="button"
                              size="sm"
                              variant="ghost"
                              onClick={() => removeComplexLeg(l.id)}
                              className="text-destructive"
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              {c.removeLeg}
                            </Button>
                          )}
                        </div>
                        <LegEditor leg={l} onChange={(p) => patchComplex(l.id, p)} c={c} />
                      </div>
                    ))}
                    <Button type="button" variant="outline" onClick={addComplexLeg} className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      {c.addLeg}
                    </Button>
                  </div>
                )}
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={loading}>
                <Send className="mr-2 h-4 w-4" />
                {c.submit}
              </Button>
            </form>
          ) : (
            <div className="text-center py-8">
              <CheckCircle2 className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">{c.successTitle}</h2>
              <p className="text-muted-foreground">{c.successBody}</p>
              <Link to="/" className="inline-block mt-6 text-sm text-primary underline">
                {c.back}
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
