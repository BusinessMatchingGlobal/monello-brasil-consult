import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useT } from "@/lib/i18n";
import { getArticleBySlug } from "@/lib/analysis";
import { AnalysisComments } from "@/components/AnalysisComments";
import { AnalysisFooter } from "@/components/AnalysisFooter";

const content = {
  it: {
    back: "Torna alle analisi",
    body: [
      "PIX è il sistema di pagamenti istantanei creato dal Banco Central do Brasil, operativo dal novembre 2020. Consente trasferimenti tra conti in pochi secondi, 24/7, con costi molto ridotti o nulli per le persone fisiche.",
      "Per le imprese europee che operano o vendono in Brasile, PIX è ormai un canale di incasso imprescindibile: adottato da centinaia di milioni di utenti, è utilizzato in commercio elettronico, punti vendita fisici, fatturazione B2B e pagamenti di servizi pubblici.",
      "Punti chiave per un'azienda estera: identificazione tramite chiave (CPF, CNPJ, email, telefono o chiave casuale), riconciliazione automatica tramite QR Code statico o dinamico, integrazione via API bancarie o gateway di pagamento, e compliance con la normativa brasiliana su antiriciclaggio e protezione dei dati (LGPD).",
    ],
  },
  en: {
    back: "Back to analysis",
    body: [
      "PIX is Brazil's instant payment system, launched by the Central Bank of Brazil in November 2020. It allows account-to-account transfers to settle in seconds, 24/7, at very low or zero cost for individuals.",
      "For European companies operating or selling in Brazil, PIX has become an essential collection channel: adopted by hundreds of millions of users, it is used in e-commerce, physical retail, B2B invoicing and public service payments.",
      "Key points for a foreign company: identification via a key (CPF, CNPJ, email, phone or random key), automatic reconciliation using static or dynamic QR codes, integration through banking APIs or payment gateways, and compliance with Brazilian AML rules and data protection law (LGPD).",
    ],
  },
  pt: {
    back: "Voltar às análises",
    body: [
      "O PIX é o sistema de pagamentos instantâneos criado pelo Banco Central do Brasil, em operação desde novembro de 2020. Permite transferências entre contas em poucos segundos, 24/7, com custo muito baixo ou nulo para pessoas físicas.",
      "Para empresas europeias que operam ou vendem no Brasil, o PIX tornou-se um canal de recebimento indispensável: adotado por centenas de milhões de usuários, é utilizado em e-commerce, varejo físico, faturamento B2B e pagamento de serviços públicos.",
      "Pontos-chave para uma empresa estrangeira: identificação por chave (CPF, CNPJ, e-mail, telefone ou chave aleatória), conciliação automática via QR Code estático ou dinâmico, integração por APIs bancárias ou gateways de pagamento, e conformidade com as normas brasileiras de PLD/FT e a LGPD.",
    ],
  },
} as const;

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
            {c.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </article>
        <AnalysisComments slug="pix" />
        <AnalysisFooter />
      </div>
    </main>
  );
}