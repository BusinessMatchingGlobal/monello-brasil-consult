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

const TITLE = "A ilha que não é ilha";

const BACK = {
  it: "Torna alle analisi",
  en: "Back to analysis",
  pt: "Voltar às análises",
} as const;

const body: Block[] = [
  { p: "A única fronteira terrestre do Brasil com a União Europeia passa pelo seu estado mais isolado. Duas datas deste ano acabaram de mudar o que isso significa." },
  { p: "Existe um estado no Brasil que construiu uma ponte para outro país antes de conseguir construir uma estrada para o seu próprio." },
  { p: "Das 27 unidades federativas do Brasil, o Amapá é a única sem ligação terrestre com o resto do território nacional. Não o Acre, a piada de sempre — o Amapá. Encravado entre a foz do Amazonas e a Guiana Francesa, é, como se diz, uma ilha que não é ilha. Tudo o que entra ou sai o faz por via aérea, de balsa pelo Amazonas a partir do porto de Santana, ou de balsa pelo rio Jari rumo ao Pará — uma travessia de 400 metros servida por embarcações com horários limitados, interrupções pelo tempo e filas que decidem quando remédio, comida e gente se movem." },
  { p: "Duas pontes contam a história inteira." },
  { h: "A ponte que funcionou bem demais, cedo demais" },
  { p: "A primeira fica no Oiapoque, no extremo norte do Brasil: uma ponte binacional estaiada de 378 metros sobre o rio Oiapoque, ligando o Brasil à Guiana Francesa — ou seja, à França, ou seja, à União Europeia. Ficou pronta em agosto de 2011, ao custo de cerca de 30 milhões de euros divididos entre os dois países." },
  { p: "Depois ficou fechada por seis anos." },
  { p: "Os postos aduaneiros não estavam prontos. A França exigia visto dos brasileiros que entrassem por terra — vistos Schengen não valiam, porque a Guiana Francesa fica fora do espaço Schengen. A ponte só abriu ao tráfego em março de 2017, e mesmo assim desembocava na BR-156, rodovia cujo trecho norte seguia sem asfalto e cuja construção começou — não é erro de digitação — em 1932: a obra inacabada mais antiga do estado." },
  { p: "O Brasil se conectou à Europa antes de conectar o Amapá ao Brasil. E depois nem a conexão com a Europa funcionava." },
  { h: "A ponte que nunca funcionou" },
  { p: "A segunda ponte fica em Laranjal do Jari, na divisa com o Pará. Essa sim acabaria com o isolamento do Amapá: 406 metros sobre o rio Jari até o distrito de Monte Dourado. A obra começou em 2001. Vinte e cinco anos e cerca de R$ 21 milhões depois, a estrutura se resume a pilares fincados no leito do rio — três deles danificados pelo choque de uma embarcação." },
  { p: "O projeto já passou por gestões municipais, um acordo na Justiça Federal em 2019, a incorporação ao Novo PAC e uma vaga na \"Rota de Integração 01\" — pacote de infraestrutura de R$ 28,6 bilhões para o Amapá que inclui o porto de Santana, a ponte do Jari e 110 km de asfaltamento da BR-156, com conclusão prometida para o fim de 2026. No início de 2026, o noticiário local não registrava nenhum avanço concreto na ponte." },
  { p: "Até aqui, o relato pertence a um gênero conhecido: o Custo Brasil como monumento, o pilar inacabado como símbolo nacional. Mas essa moldura perde o que aconteceu neste ano." },
  { h: "Duas datas que reprecificam um estado" },
  { p: "31 de julho de 2026. Caiu a exigência de visto francês para brasileiros na Guiana Francesa, por acordo assinado no Itamaraty em 1º de julho pelos chanceleres Mauro Vieira e Jean-Noël Barrot, dentro de um pacote mais amplo de cooperação em segurança de fronteira. Pela primeira vez, a ponte binacional faz o que uma ponte deveria fazer: qualquer um pode atravessá-la. O governador do Amapá foi explícito sobre o que está em jogo — a Guiana Francesa, com sua renda média alta, é o mercado imediato; a União Europeia, via acordo Mercosul-UE, é o mercado de verdade. Aquela fronteira, disse ele, é uma porta." },
  { p: "Início de setembro de 2026. A Petrobras prevê concluir a perfuração do poço Morpho — o primeiro da história da bacia da Foz do Amazonas, a cerca de 500 quilômetros da costa do Amapá, na Margem Equatorial brasileira. A companhia orçou US$ 3 bilhões para a exploração da região até 2029, e o caso geológico se escreve sozinho: a bacia é vizinha de Guiana e Suriname, onde já foram descobertos mais de 11 bilhões de barris. Se o Morpho confirmar petróleo comercial, Macapá e Oiapoque viram geografia de cadeia de suprimentos de óleo e gás da noite para o dia — serviços, logística, pessoal — num estado que hoje não tem quase nada dessa infraestrutura." },
  { p: "Um estado isolado com 900 mil habitantes não é um mercado. Um estado isolado sentado sobre uma possível fronteira petrolífera e uma fronteira terrestre com a UE recém-aberta é uma opção — e a opção será precificada em setembro." },
  { h: "O que setembro decide de verdade" },
  { p: "Uma palavra de disciplina antes do entusiasmo: poços pioneiros de fronteira decepcionam mais do que entregam. Wildcats em bacias de águas profundas nunca testadas dão certo talvez uma vez em cada três ou quatro, e a Margem Equatorial já produziu um precedente de advertência exatamente sobre essa analogia. Em 2011, a Total perfurou o poço Zaedyus nas águas da Guiana Francesa — a mesma lógica da \"próxima Guiana\" — encontrou hidrocarbonetos animadores, gerou um ciclo de manchetes, e depois viu os poços seguintes fracassarem até o abandono do play. A própria ExxonMobil perfurou por décadas na região antes de Liza transformar a Guiana na Guiana." },
  { p: "O desfecho mais provável em setembro não é nem o triunfo nem o poço seco, mas a ambiguidade: indícios de hidrocarbonetos, volumes a avaliar, poços de delimitação necessários. E aqui o timing conta duas vezes. O resultado chega a poucas semanas das eleições de outubro, o que torna o anúncio um ato tão político quanto geológico — o governo tem todo incentivo para ler positivamente o que quer que saia do fundo do mar, a oposição para ler na direção contrária. Observadores atentos aprenderão mais com a forma como o resultado for comunicado do que com o resultado em si." },
  { p: "Para quem avalia o Amapá, porém, o poço não é a aposta. Rode os três cenários. Descoberta comercial: o estado se reprecifica imediatamente e começa a corrida pela cadeia de suprimentos. Resultado ambíguo: US$ 3 bilhões de orçamento exploratório e poços contingentes mantêm a opção viva até 2029. Poço seco: a fronteira terrestre com a UE continua exatamente onde estava, e a geologia não tem direito a voto sobre território aduaneiro. Só um dos três cenários mata a tese deste artigo — e ele não está na lista." },
  { h: "A arbitragem, em três camadas" },
  { p: "O que uma fronteira com a União Europeia oferece, concretamente? Três coisas distintas, e só uma é nova." },
  { p: "A camada de preços existe há décadas, informalmente. A Guiana Francesa vive de salários e welfare franceses importando quase tudo de uma metrópole a 7.000 km; seu custo de vida está entre os mais altos da França. Do outro lado do rio: preços brasileiros. Os guianenses atravessam há muito tempo para compras, combustível, dentista, serviços. A isenção de visto agora torna o fluxo simétrico — brasileiros podem acessar legalmente um mercado denominado em euros com alto poder de compra. Há também uma camada negra aqui (ouro de garimpos ilegais, contrabando de combustível) que toda análise honesta nomeia e nenhum operador sério toca." },
  { p: "A camada aduaneira é a janela que importa. A Guiana Francesa é território aduaneiro da UE. Hoje, um caminhão de cimento, alimentos ou materiais de construção brasileiros que cruza a ponte paga tarifas europeias como se tivesse atracado em Roterdã — uma das razões pelas quais a ponte ficou vazia e a Guiana segue comprando de Le Havre a custos finais absurdos. A ratificação do acordo Mercosul-UE muda a aritmética: o fornecedor natural da Guiana Francesa passa a ser o Brasil, a 400 metros, não a França, a três semanas de navio. Mas as tarifas são só metade do muro. A outra metade é a conformidade — certificação sanitária, rastreabilidade EUDR para madeira e açaí, rotulagem europeia. Do lado brasileiro, todo mundo tem o produto. Quase ninguém tem a conformidade. Quem montar a cadeia conforme antes da ratificação leva o mercado no minuto zero." },
  { p: "A camada de compras públicas. Como região ultraperiférica da UE, a Guiana Francesa recebe fundos estruturais europeus, além da gravidade de gastos do centro espacial de Kourou. As obras rodam com estruturas de custo francesas ao lado de mão de obra e materiais brasileiros. Empresas capazes de operar dos dois lados do rio têm uma vantagem estrutural que não tem nada a ver com sorte." },
  { h: "Janelas ficam abertas até fecharem" },
  { p: "Nada disso é uma história moral. Os pilares do Jari vão continuar no rio independentemente do que se escreva sobre eles, e as filas de balsa vão durar até o dia em que não durarem mais. O ponto analítico é mais estreito: janelas de arbitragem como a camada aduaneira existem justamente porque são temporárias. Abrem entre a ratificação de um tratado e o momento em que os grandes players percebem; fecham quando o mercado se reprecifica ou as regras mudam. O ofício não é celebrá-las nem condená-las — é enxergá-las enquanto estão abertas." },
  { p: "O Amapá passou um século como piada logística do Brasil. Entre 31 de julho e o início de setembro de 2026, virou silenciosamente outra coisa: o único ponto em que o Brasil toca a Europa por terra, ao lado da única bacia que pode estender a fronteira petrolífera brasileira, no único estado que todo mundo tinha parado de olhar." },
  { p: "O país que construiu uma ponte para outra nação antes de se conectar a si mesmo pode estar prestes a descobrir que a primeira ponte era a certa." },
  { p: "Business Matching Global — inteligência de mercado e orquestração de negócios no corredor UE-Brasil." },
];

export default function AmapaBR() {
  const { lang } = useT();
  const article = getArticleBySlug("amapa_br");
  const desc =
    "Amapá é a única fronteira terrestre do Brasil com a União Europeia. A queda do visto francês e o poço Morpho estão prestes a reprecificar o estado mais isolado do país.";
  useCanonical("/amapa_br", {
    title: "A ilha que não é ilha: Amapá, a fronteira terrestre do Brasil com a UE",
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
          <LangSwitcher to="/amapa_br" />
        </div>
        <article className="prose-invert">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4">
            {TITLE}
          </h1>
          <p className="text-xs text-foreground/70 mb-2">#CustoBrasil — Business Matching Global</p>
          <p className="text-xs text-foreground/70 mb-10 tabular-nums">publicado em 13-08-2026</p>
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
