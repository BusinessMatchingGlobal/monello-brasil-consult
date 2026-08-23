import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { useT } from "@/lib/i18n";
import { getArticleBySlug } from "@/lib/analysis";
import { AnalysisFooter } from "@/components/AnalysisFooter";
import { useCanonical } from "@/lib/useCanonical";
import { ShareBlock } from "@/components/ShareBlock";
import { LangSwitcher } from "@/components/LangSwitcher";

type Block = { h: string } | { p: string };

const TITLE = "Dez vezes na bolsa, e ainda sem atacar: a lição da Embraer sobre o capital da restrição";

const BACK = {
  it: "Torna alle analisi",
  en: "Back to analysis",
  pt: "Voltar às análises",
} as const;

const body: Block[] = [
  { p: "Série #CustoBrasil — Inteligência estrutural sobre a equação de custos do Brasil" },
  { p: "A ação de uma empresa multiplica-se por cerca de dez em cinco anos. A carteira de pedidos atinge o recorde de US$ 34,5 bilhões. A The Economist dedica-lhe uma reportagem com um título que manda \"esquecer Airbus e Boeing\" — o tipo de cobertura que CEOs perseguem a carreira inteira." },
  { p: "E a coisa mais ousada que o seu presidente declara, quando perguntam se agora vai atacar o duopólio?" },
  { p: "Que está muito confortável com a situação atual." },
  { p: "Essa resposta — publicada pela Economist em 30 de julho — é a frase mais brasileira de toda a reportagem, e quase ninguém vai lê-la assim. Este artigo explica por que deveriam." },
  { h: "O que a The Economist documentou" },
  { p: "Reduzida aos seus fatos estruturais, a história é notável. A Embraer, terceira maior fabricante de jatos de passageiros do mundo, entregou 141 aeronaves em 2021 e pode chegar a 255 neste ano. Desde o início de 2021, a ação superou tanto a Airbus quanto a Boeing por uma ordem de grandeza. A demanda cresce simultaneamente nas três linhas: jatos comerciais, aviação executiva — onde o Phenom 300 lidera sua categoria há catorze anos consecutivos — e defesa, onde o rearmamento global segue impulsionando os pedidos do KC-390." },
  { p: "O motor do crescimento comercial é o tempo. Uma companhia aérea que encomenda hoje um narrow-body à Airbus ou à Boeing espera de oito a dez anos, contra um backlog combinado do duopólio de cerca de 16.000 aeronaves. O E2 da Embraer é entregue em menos de dois. Num mercado estrangulado pela oferta, a velocidade de entrega é o produto — e a Embraer projeta seu segmento em 8.500 aeronaves nas próximas duas décadas, tendo o A220 como único concorrente direto por porte. Como observa o CEO Francisco Gomes Neto, mesmo com metade desse mercado e metade dos pedidos, a demanda ocuparia a capacidade produtiva por vinte anos." },
  { p: "Enterrado na reportagem há um detalhe que, sozinho, vale a leitura para quem estuda arquitetura de mercados: o E175, ainda menor, é hoje a única aeronave em produção que as companhias regionais americanas podem operar, porque as scope clauses dos acordos coletivos dos pilotos limitam o porte dos aviões permitidos às regionais. Um artefato de relações trabalhistas funciona como fosso regulatório de bilhões. Os leitores desta série reconhecerão o padrão de imediato — é a mesma lição que seguimos extraindo do Brasil: o regulamento é o mercado, e quem o lê estruturalmente, em vez de reclamar dele, é dono do segmento." },
  { h: "O fantasma Bombardier" },
  { p: "Então por que não atacar? A The Economist expõe a tentação com honestidade: Airbus e Boeing não substituirão seus narrow-bodies principais antes do fim da década de 2030, e nenhuma das duas tem incentivo para investir pesado enquanto os modelos atuais vendem bem — uma abertura genuína. A própria Boeing estima o mercado total em 36.000 jatos em duas décadas. Um analista do Bank of America enquadra o salto como a passagem da Embraer ao próximo nível." },
  { p: "Mas o contraexemplo tem nome, e o nome é Bombardier. A investida da rival canadense contra o duopólio quase a levou à falência e terminou com a venda do programa à Airbus por valor simbólico em 2018 — tornando-se, com ironia brutal, exatamente o A220 que hoje compete com o E2. O chefe da Airbus, Guillaume Faury, já advertiu publicamente a Embraer a pensar duas vezes. Um novo jato de maior porte custaria algo em torno de US$ 10 bilhões, que — segundo análise do UBS citada na reportagem — a Embraer não conseguiria bancar sozinha: precisaria de fabricantes de motores, fornecedores, clientes e investidores externos como parceiros. Internamente, diz-se que a questão divide opiniões." },
  { h: "A leitura Custo Brasil" },
  { p: "Eis o que uma mesa de análise em São Paulo não vai lhe dizer, e o que esta série existe para dizer: a contenção de Gomes Neto não é timidez. É a mesma disciplina de capital que construiu a empresa — o Custo Brasil operando como instinto herdado." },
  { p: "A Bombardier podia apostar porque cresceu dentro de um sistema de apoio soberano paciente e mercados de capitais profundos, prontos para ampará-la em caso de queda. Caiu mesmo assim. A Embraer cresceu onde o capital é caro, o cliente soberano é magro, e um único programa fracassado significa morte, não reestruturação. Uma empresa forjada sob essa restrição não aposta a firma inteira num assalto frontal de US$ 10 bilhões — ela compõe: cerca de vinte novas aeronaves certificadas em aproximadamente vinte anos, cada programa fechado dentro de um risco sobrevivível. Essa cadência de certificação, que o CEO cita como prova de que a Embraer poderia construir o jato maior, lê-se melhor como prova de por que ela nunca precisou." },
  { p: "A ação multiplicada por dez é o mercado dando nota exatamente a esse comportamento. Os investidores não estão pagando pela promessa de uma guerra ao duopólio. Estão pagando pela única fabricante de aeronaves do mundo cuja história de crescimento não exige hipóteses heroicas — apenas slots de entrega que os gigantes não podem oferecer, um fosso escrito nos contratos de trabalho alheios, e uma cultura de gestão estruturalmente incapaz do erro da Bombardier." },
  { p: "Para os stakeholders europeus que esta mesa atende, a lição é prática. Quando você avaliar uma contraparte brasileira — um fornecedor, um alvo de aquisição, um parceiro — e a encontrar expandindo mais devagar do que a carteira de pedidos justificaria, não leia isso automaticamente como falta de ambição. Você pode estar diante da disciplina que o Custo Brasil cria em seus sobreviventes: os que continuam de pé são, por seleção, os que nunca apostaram o que não podiam perder." },
  { p: "A questão do duopólio ficará aberta por anos, e a Embraer tem o luxo de decidir tarde. A pergunta mais interessante é a nossa: quantas outras empresas brasileiras estão sendo subestimadas hoje justamente pelo traço que as torna duráveis?" },
  { p: "Fonte: The Economist, \"Forget Airbus and Boeing. Embraer is soaring\", 30 de julho de 2026; divulgações Embraer 2T 2026." },
];

export default function EconomistBR() {
  const { lang } = useT();
  const article = getArticleBySlug("economist_br");
  const desc =
    "A Embraer cresceu dez vezes na bolsa, com carteira de pedidos de US$ 34,5 bilhões, e a The Economist manda 'esquecer Airbus e Boeing'. Por que o CEO ainda se recusa a atacar o duopólio — e o que isso diz sobre a disciplina de capital brasileira.";
  useCanonical("/economist", {
    title: `${TITLE} | Business Matching Global`,
    description: desc,
    type: "article",
  });


  return (
    <main className="min-h-screen bg-background">
      <div className="container max-w-3xl py-16 md:py-24">
        <div className="flex items-center justify-between gap-4 mb-8">
          <Link
            to="/analysis"
            className="inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            {BACK["pt"]}
          </Link>
          <LangSwitcher to="/economist" />
        </div>
        <article className="prose-invert">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4">{TITLE}</h1>
          <p className="text-xs text-foreground/70 mb-2">#CustoBrasil — Business Matching Global</p>
          <p className="text-xs text-foreground/70 mb-10 tabular-nums">{article?.date}</p>
          <div className="space-y-5 text-foreground/85 text-justify leading-relaxed">
            {body.map((block, i) =>
              "h" in block ? (
                <h2 key={i} className="text-xl md:text-2xl font-semibold text-foreground text-left mt-8 mb-2">
                  {block.h}
                </h2>
              ) : (
                <p key={i}>{block.p}</p>
              )
            )}
          </div>
          <ShareBlock title={TITLE} />
        </article>
        <AnalysisFooter />
      </div>
    </main>
  );
}
