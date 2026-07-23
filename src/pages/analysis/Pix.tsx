import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useT } from "@/lib/i18n";
import { getArticleBySlug } from "@/lib/analysis";
import { AnalysisComments } from "@/components/AnalysisComments";
import { AnalysisFooter } from "@/components/AnalysisFooter";

type BodyBlock = { h: string } | { p: string };

const content: Record<"it" | "en" | "pt", { back: string; body: BodyBlock[] }> = {
  it: {
    back: "Torna alle analisi",
    body: [
      { p: "PIX è il sistema di pagamenti istantanei creato dal Banco Central do Brasil, operativo dal novembre 2020. Consente trasferimenti tra conti in pochi secondi, 24/7, con costi molto ridotti o nulli per le persone fisiche." },
      { p: "Per le imprese europee che operano o vendono in Brasile, PIX è ormai un canale di incasso imprescindibile: adottato da centinaia di milioni di utenti, è utilizzato in commercio elettronico, punti vendita fisici, fatturazione B2B e pagamenti di servizi pubblici." },
      { p: "Punti chiave per un'azienda estera: identificazione tramite chiave (CPF, CNPJ, email, telefono o chiave casuale), riconciliazione automatica tramite QR Code statico o dinamico, integrazione via API bancarie o gateway di pagamento, e compliance con la normativa brasiliana su antiriciclaggio e protezione dei dati (LGPD)." },
    ],
  },
  en: {
    back: "Back to analysis",
    body: [
      { p: "Since yesterday, July 22, importing Brazilian goods into the United States costs 25% more. The tariff, built on a Section 301 investigation that took a full year, hits over US$11 billion in trade while sparing roughly 2,100 products — beef, coffee, orange juice among them. Every trade war produces tariffs. This one produced something without precedent: the first tariff in history levied not against a product, but against a method. The USTR's report names its target explicitly. It is called Pix." },
      { h: "The most expensive compliment ever paid" },
      { p: "Read the investigation's conclusions and the charge sheet is long — digital trade, preferential tariff agreements, ethanol market access, intellectual property, anti-corruption enforcement, illegal deforestation. But the item that gives this tariff its historic character is the finding that Brazil's public policies favor Pix and place American electronic-payment companies at an \"unfair disadvantage.\"" },
      { p: "Consider what is being sanctioned. Pix is not a company. It has no shareholders, no revenue line, no export invoice. It is a piece of public financial plumbing built by the Banco Central do Brasil in under two years and switched on in November 2020. By 2024 it was processing 64 billion transactions annually — more than Visa and Mastercard combined in the country — and reaching 93% of Brazilian adults, with over 170 million registered users, more than Brazil's economically active population. It brought tens of millions of unbanked citizens into the financial system, free of charge." },
      { p: "None of that crosses a border. No container carries it, no customs officer can hold it at the port. And yet it now anchors a 25% duty on physical goods that have nothing to do with payments. Washington could not tariff the method, so it tariffed everything around it. There is no more expensive compliment." },
      { h: "What Washington actually objects to" },
      { p: "The procedural record is worth pausing on. The USTR proposed the tariff on June 1, 2026, after concluding its investigation. Public hearings were held on July 6 and 7; the Lula government chose not to send anyone to speak — only observers from the embassy in Washington attended, an empty chair as a statement of principle. Confirmation came on July 15; entry into force, one week later." },
      { p: "After the announcement, a senior US administration official was at pains to clarify that Washington does not want to end Pix, recognizes its importance to Brazilians, and merely wants American companies to compete on equal terms. Look at the specific objections, though, and a pattern emerges. The USTR faults the Banco Central's dual role as regulator and operator of the scheme. It faults the mandate that makes Pix free for individuals. It faults the caps on merchant fees and the requirement that banks give the system visual prominence in their apps." },
      { p: "Strip the legal language and each objection targets the same thing: not the technology, but the governance decisions that made the technology universal. The complaint, in other words, is with the method itself — a central bank willing to act as scheme owner, to mandate participation, and to price a payment rail as public infrastructure rather than as a toll booth. The irony writes itself: while the tariff was being finalized, Brazilians were moving an estimated US$8 billion a month through dollar-denominated stablecoins, a channel Washington has no objection to at all." },
      { h: "The wall in Brasília" },
      { p: "If the tariff was meant to divide Brazil, it achieved the opposite. President Lula's response came as a social-media card: \"É público, é de graça e vai continuar assim\" — public, free, and staying that way — under the caption that sovereignty is not for negotiation. More telling was the reaction across the aisle. Flávio Bolsonaro, no ally of the government, declined to put Pix on the table, floating instead a compromise in which Brazil would commit never to link Pix to an international payments infrastructure rivaling America's." },
      { p: "That proposed concession is the most revealing sentence in the entire dispute. It concedes that the domestic system is untouchable — and identifies what the fight is actually about: interoperability. Not whether Brazilians pay each other with a tax ID and a QR code, but whether the method connects outward, to other countries' systems, forming corridors that route around the American rails." },
      { p: "The Itamaraty's formal response, filed on July 1, added the argument Washington finds hardest to answer: the United States runs a goods surplus with Brazil. A Section 301 case, designed to remedy practices that burden American commerce, is being deployed against a country that buys more from America than it sells. Even Paul Krugman, no reflexive defender of Brasília, dismissed the \"unfair practice\" framing with a question that lingers: since when is it unfair for a country to offer its own citizens a better way to pay — or for a company to lose market share to a competitor with a better, cheaper product?" },
      { h: "The calculus of not retaliating" },
      { p: "Brasília's official posture is deliberate de-escalation. Vice-President Alckmin, after meeting the affected sectors — machinery (US$3.3 billion exposed), wood (81% of its US exports hit), rubber, food, textiles — ruled out retaliation explicitly: reciprocity is not the idea, he said; the instruments exist and can be used at the opportune moment, in the adequate form. The Lei de Reciprocidade stays in the drawer, the WTO route in reserve. The sectors themselves asked for more credit under the Brasil Soberano program, barriers against Chinese import diversion, and continued diplomacy — not counter-tariffs." },
      { p: "Behind the restraint sits arithmetic: the American share of Brazilian exports has fallen to 9.4% in 2026, from 13.7% at its recent peak. Painful, not existential. And the calendar counsels patience for another reason: this Friday, July 24, Washington decides on a possible second tariff — 12.5%, under Section 122, grounded in forced-labor allegations, replacing the 10% surcharges that expire at month's end. That case carries its own paradox, one we have written about before: the evidence base leans on Brazil's lista suja, the public registry of employers caught using slave-like labor. An instrument of transparency that most countries lack, turned into ammunition against the one country honest enough to publish it." },
      { h: "The world Washington is reading correctly" },
      { p: "To dismiss the tariff as mere protectionism for Visa and Mastercard is to miss what the US Treasury actually sees. Secretary Scott Bessent has described the new posture as the economic diplomacy of the 21st century, in which access to the dollar and to American financial infrastructure is no longer unconditional. From that vantage point, the global payments map is genuinely alarming: Russia, cut off from Western rails, now runs on its own messaging system (SFPS) and card network (Mir). China's CIPS, the cross-border rival to Swift, posted a record daily average of 920 billion yuan in March — roughly US$130 billion, 20% above a year earlier — with a single-day record of 1.2 trillion yuan in April. India's UPI operates in nine countries, and the NPCI markets it abroad in the language of sovereignty: helping countries meet their own domestic commitments and conduct their own national agenda." },
      { p: "Every one of these is a method propagating. The tariff on Pix is best understood as an attempt to raise the price of joining that propagation — a signal aimed less at Brasília than at every capital studying the Brazilian playbook." },
      { h: "Europe already owns the hardware" },
      { p: "The standard reading of the European chapter of this story is that Europe is waiting — waiting for the digital euro before it can answer the question Aurore Lalucq put to the European Parliament: what happens if a hostile United States cuts access to payment infrastructure? \"You will not be able to say you were not warned,\" she told colleagues, urging Europe to build its own alternatives, a call echoed by British bank executives discussing a homegrown rival to the card networks and by Christine Lagarde herself." },
      { p: "That reading is wrong, and it matters that it is wrong. Europe does not lack the rail. SEPA Instant credit transfers reach 41 countries; under the Instant Payments Regulation they must cost no more than an ordinary transfer since January 2025, and since October 2025 every euro-area bank must verify the beneficiary's name against the IBAN, free of charge, before the money moves. Fast, cheap, verified: the plumbing Brazil built in 2020, Europe has largely built too." },
      { p: "What Europe lacks is everything Pix layered on top of the plumbing — and this is where the comparison becomes a diagnosis. First, the directory: Pix replaced the account number with an alias — a tax ID, a phone number, an email — resolved through a single national registry operated by the central bank. Europe's answer to the alias exists, but in fragments: Wero, the wallet built by the European Payments Initiative's French, German and Benelux banks (which absorbed the Netherlands' iDeal), uses a phone number; so do Bizum in Spain, MB Way in Portugal, Blik in Poland, Swish in Sweden. Five directories, five brands, and cross-border interoperability still a construction site. Second, the mandate: the Banco Central do Brasil obliged every institution to join one scheme, free for individuals, on day one. No European authority has imposed a single scheme on its banks; the regulation mandates the rail, not the network on top of it. Third, the till: Pix displaced cards at the point of sale through a QR code. SEPA Instant, for all its speed, remains largely a person-to-person tool; at the European checkout, the American duopoly still collects the toll." },
      { p: "The incumbents have noticed. Mastercard's president for Europe has taken to arguing that a European payments network already exists — and that it is Mastercard — backing the claim with €500 million in European infrastructure, a technology center in Poland due in 2027, and three data centers in France costing €250 million, alongside a real-time payments partnership with China's UnionPay. Visa and Mastercard, with operating margins above 50%, now list the \"preferential\" treatment of domestic payment systems as a business risk in their annual reports. When a duopoly starts writing your method into its risk disclosures, the method is working." },
      { h: "Italy, meanwhile, has quietly run the control experiment" },
      { p: "Satispay is the closest thing Europe has to a privately built Pix: an alias instead of an IBAN, free person-to-person transfers, a proprietary network deliberately routed around the card circuits. For a decade, and with roughly half a billion euros of venture capital, it has been buying one user at a time what the Banco Central do Brasil obtained by decree. The scoreboard tells the story: 6.5 million users and 450,000 merchants — about a tenth of Italian adults, against Pix's 93% of Brazilians — network revenues of €46 million in 2024 against a net loss of €47 million, with an auditors' going-concern emphasis note along the way. And when the company finally priced its network in April 2025, introducing a 1% merchant fee, some merchants simply walked: part of the value proposition, it turned out, was the subsidy itself." },
      { p: "This July the experiment reached its logical destination. Satispay launched debit cards — on the Mastercard network. Unable to buy universality and unable to decree it, the anti-card challenger is now renting acceptance from the very duopoly it set out to bypass, monetizing through subscription tiers in the Revolut mold while its proprietary circuit serves the domestic niche. Its founder speaks, without irony, of one day becoming a bank that owns a payment circuit. The theorem could not be demonstrated more cleanly: without a scheme owner holding mandate power, universality is not for sale — only for rent, and there are only two landlords." },
      { h: "Which leads to the uncomfortable conclusion" },
      { p: "None of the three missing layers requires the digital euro, promised for 2029. A directory is governance. A mandate is regulation. Merchant acceptance is scheme design. Brazil needed no central bank digital currency to build Pix — it needed a central bank willing to act as scheme owner, and Satispay's decade proves that no amount of private capital substitutes for one. What separates the European payments landscape from sovereignty is not a technology gap of three years but an act of institutional will." },
      { h: "The price of sovereignty, honestly stated" },
      { p: "Fragmentation is not free, and the case for caution deserves a fair hearing. A report sponsored by Swift estimates that if current patterns hold, financial fragmentation could shave 2.6% off global GDP by 2030. The Financial Stability Board warns that the proliferation of national systems will likely prevent the G20 from meeting the cheaper-faster remittance targets it set in 2020. And as the Atlantic Council's Josh Lipsky observes, a world of incompatible regional systems is a world with more fraud and easier sanctions evasion. Countries may discover, as the original Economist analysis concluded, that the price of payment sovereignty is higher than they imagine — and the same may prove true for the United States." },
      { p: "But note what that warning implies for this tariff. If fragmentation is the danger, the rational American policy would be to keep the world's payment systems interoperable with its own. A punitive tariff on the most successful public payment method ever deployed does the opposite: it certifies that the method threatens the incumbents, raises the perceived value of independence, and hands every finance ministry a 25% argument for building its own rails. The tariff does not slow the fragmentation it fears. It advertises it." },
      { h: "The method is already on the table" },
      { p: "Strip away the trade-war vocabulary and what remains is a strange transaction. The United States has attached a 25% price tag to a method — and in doing so, has advertised it to every jurisdiction watching. Brazil's answer to the tariff will be negotiated in Brasília and Washington. Europe's answer, if it wants one, requires no negotiation at all: the rails are laid, the transfers are instant and free, the beneficiary checks are live. Every component of the method that Washington just declared a threat already sits, unassembled, inside the European payments system. Assembling it is not a technology project with a delivery date. It is a decision." },
      { p: "That is what makes this tariff historic beyond its 25%. Tariffs on products can be absorbed, rerouted, waited out. A tariff on a method does something no tariff has done before: it certifies that the method works, names it publicly, and dares everyone else to adopt it. Brazil built Pix in under two years with a central bank willing to act as scheme owner. The question the tariff leaves on the table is not whether the method can cross the Atlantic — it is which side of the Atlantic decides to want it first." },
      { p: "At BMG, we read trade policy for what it reveals rather than what it declares. This one reveals more than most: the most heavily sanctioned Brazilian export of 2026 is not a commodity, and it cannot be held at customs. What does your organization's map of Brazil look like when the most valuable thing crossing the border is a method?" },
      { h: "Sources" },
      { p: "USTR Section 301 report and Federal Register notices; Banco Central do Brasil; The Economist (via O Estado de S. Paulo); Folha de S.Paulo; O Tempo; Poder360; Itamaraty note of July 1, 2026; Satispay company statements and FY2024 filings as reported by Milano Finanza and Sky TG24." },
    ],
  },
  pt: {
    back: "Voltar às análises",
    body: [
      { p: "O PIX é o sistema de pagamentos instantâneos criado pelo Banco Central do Brasil, em operação desde novembro de 2020. Permite transferências entre contas em poucos segundos, 24/7, com custo muito baixo ou nulo para pessoas físicas." },
      { p: "Para empresas europeias que operam ou vendem no Brasil, o PIX tornou-se um canal de recebimento indispensável: adotado por centenas de milhões de usuários, é utilizado em e-commerce, varejo físico, faturamento B2B e pagamento de serviços públicos." },
      { p: "Pontos-chave para uma empresa estrangeira: identificação por chave (CPF, CNPJ, e-mail, telefone ou chave aleatória), conciliação automática via QR Code estático ou dinâmico, integração por APIs bancárias ou gateways de pagamento, e conformidade com as normas brasileiras de PLD/FT e a LGPD." },
    ],
  },
};

export default function Pix() {
  const { lang } = useT();
  const article = getArticleBySlug("pix");
  const c = content[lang];

  return (
    <main className="min-h-screen bg-background">
      <div className="container max-w-3xl py-16 md:py-24">
        <Link
          to="/analysis"
          className="inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          {c.back}
        </Link>
        <article className="prose-invert">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4">
            {article?.title[lang]}
          </h1>
          <p className="text-xs text-foreground/50 mb-10 tabular-nums">{article?.date}</p>
          <div className="space-y-5 text-foreground/85 text-justify leading-relaxed">
            {c.body.map((block, i) =>
              "h" in block ? (
                <h2 key={i} className="text-xl md:text-2xl font-semibold text-foreground text-left mt-8 mb-2">
                  {block.h}
                </h2>
              ) : (
                <p key={i}>{block.p}</p>
              )
            )}
          </div>
        </article>
        <AnalysisComments slug="pix" />
        <AnalysisFooter />
      </div>
    </main>
  );
}