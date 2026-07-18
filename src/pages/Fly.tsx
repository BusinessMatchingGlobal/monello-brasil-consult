import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Send, CheckCircle2, CalendarIcon, Plus, Trash2, Upload, FileText, X, HelpCircle } from "lucide-react";
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
import { CountryCombobox } from "@/components/CountryCombobox";
import { COUNTRIES } from "@/lib/countries";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import rneExample from "@/assets/rne-example.png.asset.json";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/jpg", "application/pdf"];

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
  citizenship1: string;
  citizenship2: string;
  residencePermit: "none" | "yes" | "no";
  travelClass: TravelClass;
  bags: number;
  weight: "15" | "23" | "32";
  passportFile: File | null;
  residenceFiles: File[];
  responsibilityAck: boolean;
};

function newPassenger(): Passenger {
  return {
    id: Math.random().toString(36).slice(2),
    lastName: "",
    firstName: "",
    birthDate: undefined,
    citizenship1: "",
    citizenship2: "",
    residencePermit: "none",
    travelClass: "Economy",
    bags: 0,
    weight: "23",
    passportFile: null,
    residenceFiles: [],
    responsibilityAck: false,
  };
}

function countryLabel(code: string) {
  const c = COUNTRIES.find((x) => x.code === code);
  return c ? `${c.code} — ${c.name}` : "—";
}

function passengerToText(p: Passenger, c: Copy) {
  const dob = p.birthDate ? format(p.birthDate, "yyyy-MM-dd") : "—";
  const cls =
    p.travelClass === "Economy" ? c.classEconomy :
    p.travelClass === "Premium" ? c.classPremium : c.classBusiness;
  const cit1 = p.citizenship1 ? countryLabel(p.citizenship1) : "—";
  const cit2 = p.citizenship2 ? countryLabel(p.citizenship2) : "—";
  const permit =
    p.residencePermit === "yes" ? c.permitYes :
    p.residencePermit === "no" ? c.permitNo : c.permitNone;
  return `${p.lastName} ${p.firstName} | ${c.birthDate}: ${dob} | ${c.citizenship1}: ${cit1} | ${c.citizenship2}: ${cit2} | ${c.residencePermit}: ${permit} | ${c.class}: ${cls} | ${c.bags}: ${p.bags} | ${c.weight}: ${p.weight}kg`;
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
  passengerAttention: string;
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
  citizenship1: string;
  citizenship2: string;
  citizenshipPlaceholder: string;
  citizenshipSearch: string;
  citizenshipEmpty: string;
  citizenshipNone: string;
  residencePermit: string;
  permitNone: string;
  permitYes: string;
  permitNo: string;
  notesTitle: string;
  notesPlaceholder: string;
  // Documents upload
  passengerAttentionLead: string;
  passengerAttentionMid1: string;
  passengerAttentionEmph: string;
  passengerAttentionMid2: string;
  passengerAttentionTail: string;
  docsTitle: string;
  docsIntro: string;
  passportLabel: string;
  passportHelp: string;
  residenceLabel: string;
  residenceHelp: string;
  docsWarning: string;
  chooseFile: string;
  chooseFiles: string;
  remove: string;
  seeExample: string;
  exampleCaption: string;
  fileTooLarge: string;
  fileTypeInvalid: string;
  tooManyFiles: string;
  uploadFailed: string;
  responsibilityAck: string;
  responsibilityRequired: string;
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
    passengerAttention: "Prestare massima attenzione nella compilazione di NOME e COGNOME: devono corrispondere esattamente a quanto riportato sul passaporto utilizzato per il viaggio.",
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
    passengerIncomplete: "Completa i dati di tutti i passeggeri: cognome, nome, data di nascita e cittadinanza/passaporto sono obbligatori.",
    citizenship1: "Cittadinanza / Passaporto",
    citizenship2: "Seconda cittadinanza / Passaporto",
    citizenshipPlaceholder: "Seleziona paese",
    citizenshipSearch: "Cerca paese…",
    citizenshipEmpty: "Nessun risultato",
    citizenshipNone: "— Nessuna —",
    residencePermit: "Permesso di soggiorno paese di destinazione",
    permitNone: "Nessuno",
    permitYes: "Sì",
    permitNo: "No",
    notesTitle: "Altre informazioni",
    notesPlaceholder: "Si prega di inserire tutte le altre informazioni aggiuntive che ritenete utili (esigenze particolari, preferenze di orario, richieste speciali, ecc.).",
    passengerAttentionLead: "Prestare massima attenzione nella compilazione di NOME e COGNOME: devono corrispondere ",
    passengerAttentionMid1: "",
    passengerAttentionEmph: "esattamente",
    passengerAttentionMid2: " a quanto riportato sul passaporto che verrà utilizzato per il viaggio. La tariffa viene emessa con questi dati — un errore anche di una sola lettera può richiedere la riemissione del biglietto, e la tariffa originale potrebbe non essere più disponibile.",
    passengerAttentionTail: "",
    docsTitle: "Allegare copia dei documenti (facoltativo, ma fortemente consigliato)",
    docsIntro: "Non è obbligatorio — ma è il modo più semplice per proteggere la tua tariffa: il nostro team verifica nome, numero e validità prima dell'emissione.",
    passportLabel: "Passaporto — pagina identificativa",
    passportHelp: "Foto o scansione in cui siano chiaramente visibili nome e cognome, numero del documento, data di emissione e data di scadenza. L'immagine deve essere nitida, completa e senza riflessi.",
    residenceLabel: "Documento di residenza (es. CRNM/RNE, permesso di soggiorno) — fronte e retro",
    residenceHelp: "Entrambi i lati, leggibili.",
    docsWarning: "⚠️ Documenti illeggibili, tagliati o incompleti equivalgono a documenti non inviati: in tal caso la verifica non è possibile e l'esattezza dei dati inseriti rimane di esclusiva responsabilità del passeggero.",
    chooseFile: "Scegli file",
    chooseFiles: "Scegli file (max 2)",
    remove: "Rimuovi",
    seeExample: "Vedi esempio",
    exampleCaption: "Esempio di documento leggibile",
    fileTooLarge: "File troppo grande (max 10 MB).",
    fileTypeInvalid: "Formato non valido. Ammessi: jpg, png, pdf.",
    tooManyFiles: "Massimo 2 file per il documento di residenza.",
    uploadFailed: "Caricamento file non riuscito. Riprova.",
    responsibilityAck: "Ho scelto di non inviare i documenti. Confermo che i dati inseriti corrispondono esattamente ai documenti che verranno utilizzati per il viaggio e sono consapevole che eventuali costi di riemissione o impedimenti all'imbarco derivanti da divergenze saranno di mia esclusiva responsabilità.",
    responsibilityRequired: "Per ogni passeggero senza copia del passaporto caricata, devi confermare la presa di responsabilità.",
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
    passengerAttention: "Please pay maximum attention when entering FIRST and LAST NAME: they must match exactly what is shown on the passport used for the trip.",
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
    passengerIncomplete: "Please complete all passenger details: last name, first name, date of birth and citizenship/passport are required.",
    citizenship1: "Citizenship / Passport",
    citizenship2: "Second citizenship / Passport",
    citizenshipPlaceholder: "Select country",
    citizenshipSearch: "Search country…",
    citizenshipEmpty: "No results",
    citizenshipNone: "— None —",
    residencePermit: "Residence permit in destination country",
    permitNone: "None",
    permitYes: "Yes",
    permitNo: "No",
    notesTitle: "Additional information",
    notesPlaceholder: "Please provide any additional information you consider useful (special needs, time preferences, special requests, etc.).",
    passengerAttentionLead: "Please pay maximum attention when entering FIRST and LAST NAME: they must match ",
    passengerAttentionMid1: "",
    passengerAttentionEmph: "exactly",
    passengerAttentionMid2: " what is shown on the passport that will be used for the trip. The fare is issued with this data — even a single-letter error may require ticket reissue, and the original fare may no longer be available.",
    passengerAttentionTail: "",
    docsTitle: "Attach a copy of the documents (optional, but strongly recommended)",
    docsIntro: "Not mandatory — but it is the simplest way to protect your fare: our team verifies name, number and validity before issuing.",
    passportLabel: "Passport — ID page",
    passportHelp: "Photo or scan clearly showing first and last name, document number, issue date and expiry date. The image must be sharp, complete and free of glare.",
    residenceLabel: "Residence document (e.g. CRNM/RNE, residence permit) — front and back",
    residenceHelp: "Both sides, legible.",
    docsWarning: "⚠️ Illegible, cropped or incomplete documents are equivalent to no documents at all: in that case verification is not possible and the accuracy of the data provided remains the sole responsibility of the passenger.",
    chooseFile: "Choose file",
    chooseFiles: "Choose files (max 2)",
    remove: "Remove",
    seeExample: "See example",
    exampleCaption: "Example of a legible document",
    fileTooLarge: "File too large (max 10 MB).",
    fileTypeInvalid: "Invalid format. Accepted: jpg, png, pdf.",
    tooManyFiles: "Maximum 2 files for the residence document.",
    uploadFailed: "File upload failed. Please try again.",
    responsibilityAck: "I chose not to send the documents. I confirm that the data provided matches exactly the documents that will be used for the trip, and I acknowledge that any reissue costs or boarding denials caused by discrepancies will be my sole responsibility.",
    responsibilityRequired: "For every passenger without a passport copy uploaded, you must confirm the responsibility acknowledgement.",
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
    passengerAttention: "Prestar máxima atenção ao preencher NOME e SOBRENOME: devem corresponder exatamente ao que consta no passaporte utilizado para a viagem.",
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
    passengerIncomplete: "Complete os dados de todos os passageiros: sobrenome, nome, data de nascimento e cidadania/passaporte são obrigatórios.",
    citizenship1: "Cidadania / Passaporte",
    citizenship2: "Segunda cidadania / Passaporte",
    citizenshipPlaceholder: "Selecione o país",
    citizenshipSearch: "Buscar país…",
    citizenshipEmpty: "Sem resultados",
    citizenshipNone: "— Nenhuma —",
    residencePermit: "Autorização de residência no país de destino",
    permitNone: "Nenhuma",
    permitYes: "Sim",
    permitNo: "Não",
    notesTitle: "Informações adicionais",
    notesPlaceholder: "Por favor, inclua todas as informações adicionais que considerar úteis (necessidades especiais, preferências de horário, pedidos especiais, etc.).",
    passengerAttentionLead: "Preste máxima atenção ao preencher NOME e SOBRENOME: devem corresponder ",
    passengerAttentionMid1: "",
    passengerAttentionEmph: "exatamente",
    passengerAttentionMid2: " ao que consta no passaporte que será utilizado na viagem. A tarifa é emitida com esses dados — um erro de uma única letra pode exigir a reemissão do bilhete, e a tarifa original pode não estar mais disponível.",
    passengerAttentionTail: "",
    docsTitle: "Anexar cópia dos documentos (opcional, mas fortemente recomendado)",
    docsIntro: "Não é obrigatório — mas é a forma mais simples de proteger a sua tarifa: nossa equipe confere nome, número e validade antes da emissão.",
    passportLabel: "Passaporte — página de identificação",
    passportHelp: "Foto ou digitalização onde estejam claramente visíveis nome e sobrenome, número do documento, data de emissão e data de validade. A imagem deve estar nítida, completa e sem reflexos.",
    residenceLabel: "Documento de residência (ex.: CRNM/RNE, autorização de residência) — frente e verso",
    residenceHelp: "Ambos os lados, legíveis.",
    docsWarning: "⚠️ Documentos ilegíveis, cortados ou incompletos equivalem a documentos não enviados: nesse caso, a conferência não é possível e a exatidão dos dados informados permanece de responsabilidade exclusiva do passageiro.",
    chooseFile: "Escolher arquivo",
    chooseFiles: "Escolher arquivos (máx. 2)",
    remove: "Remover",
    seeExample: "Ver exemplo",
    exampleCaption: "Exemplo de documento legível",
    fileTooLarge: "Arquivo muito grande (máx. 10 MB).",
    fileTypeInvalid: "Formato inválido. Aceitos: jpg, png, pdf.",
    tooManyFiles: "Máximo de 2 arquivos para o documento de residência.",
    uploadFailed: "Falha no envio do arquivo. Tente novamente.",
    responsibilityAck: "Optei por não enviar os documentos. Confirmo que os dados informados correspondem exatamente aos documentos que serão utilizados na viagem e estou ciente de que eventuais custos de reemissão ou impedimentos de embarque decorrentes de divergências serão de minha exclusiva responsabilidade.",
    responsibilityRequired: "Para cada passageiro sem cópia do passaporte enviada, é necessário confirmar a declaração de responsabilidade.",
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
  tripType,
}: {
  passenger: Passenger;
  onChange: (patch: Partial<Passenger>) => void;
  c: Copy;
  tripType: TripType;
}) {
  const showResidenceUpload = tripType === "oneway" || passenger.residencePermit !== "none";
  const showResponsibilityAck = !passenger.passportFile;
  return (
    <div className="space-y-5">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
        <Label>{c.citizenship1} *</Label>
        <CountryCombobox
          value={passenger.citizenship1}
          onChange={(v) => onChange({ citizenship1: v })}
          placeholder={c.citizenshipPlaceholder}
          searchLabel={c.citizenshipSearch}
          emptyLabel={c.citizenshipEmpty}
          ariaLabel={c.citizenship1}
        />
      </div>
      <div className="space-y-1.5">
        <Label>{c.citizenship2}</Label>
        <CountryCombobox
          value={passenger.citizenship2}
          onChange={(v) => onChange({ citizenship2: v })}
          placeholder={c.citizenshipPlaceholder}
          searchLabel={c.citizenshipSearch}
          emptyLabel={c.citizenshipEmpty}
          ariaLabel={c.citizenship2}
          allowClear
          clearLabel={c.citizenshipNone}
        />
      </div>
      <div className="space-y-1.5">
        <Label>{c.residencePermit}</Label>
        <Select
          value={passenger.residencePermit}
          onValueChange={(v) => onChange({ residencePermit: v as "none" | "yes" | "no" })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">{c.permitNone}</SelectItem>
            <SelectItem value="yes">{c.permitYes}</SelectItem>
            <SelectItem value="no">{c.permitNo}</SelectItem>
          </SelectContent>
        </Select>
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

      <div className="rounded-md border border-dashed border-border p-4 bg-muted/30 space-y-4">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <h4 className="text-sm font-semibold">{c.docsTitle}</h4>
          <Popover>
            <PopoverTrigger asChild>
              <Button type="button" size="sm" variant="ghost" className="text-primary">
                <HelpCircle className="h-4 w-4 mr-1" />
                {c.seeExample}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[320px] p-2" align="end">
              <img
                src={rneExample.url}
                alt={c.exampleCaption}
                className="w-full h-auto rounded"
                loading="lazy"
              />
              <p className="text-xs text-muted-foreground mt-2">{c.exampleCaption}</p>
            </PopoverContent>
          </Popover>
        </div>
        <p className="text-xs text-muted-foreground">{c.docsIntro}</p>

        <DocumentUploader
          label={c.passportLabel}
          help={c.passportHelp}
          files={passenger.passportFile ? [passenger.passportFile] : []}
          multiple={false}
          onFilesChange={(files) => onChange({ passportFile: files[0] ?? null })}
          c={c}
        />

        {showResidenceUpload && (
          <DocumentUploader
            label={c.residenceLabel}
            help={c.residenceHelp}
            files={passenger.residenceFiles}
            multiple
            maxFiles={2}
            onFilesChange={(files) => onChange({ residenceFiles: files })}
            c={c}
          />
        )}

        <p className="text-xs text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded px-2 py-1.5">
          {c.docsWarning}
        </p>

        {showResponsibilityAck && (
          <label className="flex items-start gap-2 text-xs text-foreground pt-1">
            <Checkbox
              checked={passenger.responsibilityAck}
              onCheckedChange={(v) => onChange({ responsibilityAck: v === true })}
              className="mt-0.5"
            />
            <span>{c.responsibilityAck}</span>
          </label>
        )}
      </div>
    </div>
  );
}

function DocumentUploader({
  label,
  help,
  files,
  multiple,
  maxFiles,
  onFilesChange,
  c,
}: {
  label: string;
  help?: string;
  files: File[];
  multiple: boolean;
  maxFiles?: number;
  onFilesChange: (files: File[]) => void;
  c: Copy;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFiles(list: FileList | null) {
    if (!list) return;
    const incoming = Array.from(list);
    for (const f of incoming) {
      if (!ACCEPTED_TYPES.includes(f.type)) {
        toast({ title: c.fileTypeInvalid, variant: "destructive" });
        return;
      }
      if (f.size > MAX_FILE_SIZE) {
        toast({ title: c.fileTooLarge, variant: "destructive" });
        return;
      }
    }
    if (multiple) {
      const combined = [...files, ...incoming];
      const limit = maxFiles ?? combined.length;
      if (combined.length > limit) {
        toast({ title: c.tooManyFiles, variant: "destructive" });
        onFilesChange(combined.slice(0, limit));
      } else {
        onFilesChange(combined);
      }
    } else {
      onFilesChange([incoming[0]]);
    }
    if (inputRef.current) inputRef.current.value = "";
  }

  function removeAt(idx: number) {
    const next = files.slice();
    next.splice(idx, 1);
    onFilesChange(next);
  }

  return (
    <div className="space-y-2">
      <div>
        <div className="text-sm font-medium">{label}</div>
        {help && <p className="text-xs text-muted-foreground mt-0.5">{help}</p>}
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => inputRef.current?.click()}
        >
          <Upload className="h-4 w-4 mr-1" />
          {multiple ? c.chooseFiles : c.chooseFile}
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/jpg,application/pdf"
          capture="environment"
          multiple={multiple}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>
      {files.length > 0 && (
        <ul className="space-y-1">
          {files.map((f, idx) => (
            <li
              key={`${f.name}-${idx}`}
              className="flex items-center justify-between gap-2 rounded border border-border bg-background px-2 py-1 text-xs"
            >
              <span className="flex items-center gap-2 truncate">
                <FileText className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                <span className="truncate">{f.name}</span>
                <span className="text-muted-foreground shrink-0">
                  ({(f.size / 1024).toFixed(0)} KB)
                </span>
              </span>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                className="h-6 px-2 text-destructive"
                onClick={() => removeAt(idx)}
                aria-label={c.remove}
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </li>
          ))}
        </ul>
      )}
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
  const [notes, setNotes] = useState("");

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
  function passengerComplete(p: Passenger) {
    return !!(p.lastName.trim() && p.firstName.trim() && p.birthDate && p.citizenship1.trim());
  }
  function passengersComplete(): boolean {
    return passengers.every(passengerComplete);
  }
  function passengersToText(): string {
    const lines: string[] = [c.passengerTitle];
    passengers.forEach((p, i) => {
      lines.push(`  ${c.passenger} ${i + 1}: ${passengerToText(p, c)}`);
    });
    return lines.join("\n");
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
    if (!passengersComplete()) {
      toast({ title: c.passengerIncomplete, variant: "destructive" });
      return;
    }
    setLoading(true);
    const fullPhone = `${phonePrefix} ${phoneNumber}`;
    const fullWhatsapp = `${whatsappPrefix} ${whatsappNumber}`;
    const itineraryText = itineraryToText();
    const passengersText = passengersToText();
    const notesText = notes.trim() ? `\n\n${c.notesTitle}:\n${notes.trim()}` : "";
    try {
      await supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "contact-notification",
          idempotencyKey: `fly-${parsed.data.email}-${Date.now()}`,
          templateData: {
            name: parsed.data.organization,
            email: parsed.data.email,
            company: "—",
            message: `Phone: ${fullPhone}\nWhatsApp: ${fullWhatsapp}\n\n${itineraryText}\n\n${passengersText}${notesText}`,
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
        <div className="max-w-3xl mx-auto rounded-xl border border-border bg-card p-6 md:p-10 shadow-sm">
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

              <div className="pt-2 border-t border-border">
                <div className="mb-3">
                  <h2 className="text-lg font-semibold">{c.passengerTitle}</h2>
                  <p className="text-sm text-muted-foreground">{c.passengerSub}</p>
                  <p className="mt-2 text-sm font-medium text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-md px-3 py-2">
                    {c.passengerAttentionLead}
                    <strong className="font-bold">{c.passengerAttentionEmph}</strong>
                    {c.passengerAttentionMid2}
                  </p>
                </div>
                <div className="space-y-6">
                  {passengers.map((p, i) => (
                    <div key={p.id} className="rounded-md border border-border p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm font-semibold">
                          {c.passenger} {i + 1}
                        </div>
                        {passengers.length > 1 && (
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => removePassenger(p.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            {c.removePassenger}
                          </Button>
                        )}
                      </div>
                      <PassengerEditor
                        passenger={p}
                        onChange={(patch) => patchPassenger(p.id, patch)}
                        c={c}
                        tripType={tripType}
                      />
                    </div>
                  ))}
                  <Button type="button" variant="outline" onClick={addPassenger} className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    {c.addPassenger}
                  </Button>
                </div>
              </div>

              <div className="pt-2 border-t border-border space-y-1.5">
                <Label htmlFor="notes" className="text-lg font-semibold">
                  {c.notesTitle}
                </Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={c.notesPlaceholder}
                  maxLength={2000}
                  rows={5}
                />
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
