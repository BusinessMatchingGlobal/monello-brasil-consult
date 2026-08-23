import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { useT } from "@/lib/i18n";
import { getArticleBySlug } from "@/lib/analysis";
import { AnalysisFooter } from "@/components/AnalysisFooter";
import { useCanonical } from "@/lib/useCanonical";
import { ShareBlock } from "@/components/ShareBlock";
import { LangSwitcher } from "@/components/LangSwitcher";
import { NewsletterSignup } from "@/components/NewsletterSignup";

type Block = { h: string } | { p: string } | { tag: string };

const TITLE = "A ilha que não é ilha";

const BACK = {
  it: "Torna alle analisi",
  en: "Back to analysis",
  pt: "Voltar às análises",
} as const;

const body: Block[] = [
  { p: "A única fronteira terrestre do Brasil com a União Europeia passa pelo seu estado mais isolado. Duas datas deste ano acabaram de mudar o que isso significa." },
  { tag: "#CustoBrasil" },
  { p: "Existe um estado no Brasil que construiu uma ponte para outro país antes de conseguir construir uma estrada para o seu próprio." },
  { p: "Das 27 unidades federativas do Brasil, o Amapá é a única sem ligação terrestre com o resto do território nacional. Não o Acre, como responderia por instinto meio país — o eterno estado do meme \"o Acre não existe\" — mas o Amapá. Encravado entre a foz do Amazonas e a Guiana Francesa, é o que a imprensa brasileira chama de estado-ilha: uma ilha que não é ilha. Tudo o que entra ou sai o faz por via aérea, de balsa pelo Amazonas a partir do porto de Santana, ou de balsa pelo rio Jari rumo ao Pará — uma travessia de 400 metros servida por embarcações com horários limitados, interrupções pelo tempo e filas que decidem quando remédio, comida e gente se movem." },
  { p: "Duas pontes contam a história inteira." },
  { h: "A ponte que funcionou bem demais, cedo demais" },
  { p: "A primeira fica no Oiapoque, no extremo norte do Brasil: uma ponte binacional estaiada de 378 metros sobre o rio Oiapoque, ligando o Brasil à Guiana Francesa — ou seja, à França, ou seja, à União Europeia. Ficou pronta em agosto de 2011, ao custo de cerca de 30 milhões de euros divididos entre os dois países." },
  { p: "Depois ficou fechada por seis anos." },
  { p: "Os postos aduaneiros não estavam prontos. A França exigia visto dos brasileiros que entrassem por terra — vistos Schengen não valiam, porque a Guiana Francesa fica fora do espaço Schengen. A ponte só abriu ao tráfego em março de 2017, e mesmo assim desembocava na BR-156, rodovia cujo trecho norte seguia sem asfalto e cuja construção começou — não é erro de digitação — em 1932: a obra inacabada mais antiga do estado." },
  { p: "O Brasil se conectou à Europa antes de conectar o Amapá ao Brasil. E depois nem a conexão com a Europa funcionava." },
  { h: "A ponte que nunca funcionou" },
  { p: "A segunda ponte deveria estar em Laranjal do Jari, na divisa com o Pará — mas nunca foi concluída. Essa sim acabaria com o isolamento do Amapá: 406 metros sobre o rio Jari até o distrito de Monte Dourado. A obra começou em 2001. Vinte e cinco anos e cerca de R$ 21 milhões depois, a estrutura se resume a pilares fincados no leito do rio — três deles danificados pelo choque de uma embarcação." },
  { p: "O projeto já passou por gestões municipais, um acordo na Justiça Federal em 2019, a incorporação ao Novo PAC e uma vaga na \"Rota de Integração 01\" — pacote de infraestrutura de R$ 28,6 bilhões para o Amapá que inclui o porto de Santana, a ponte do Jari e 110 km de asfaltamento da BR-156, com conclusão prometida para o fim de 2026. No início de 2026, o noticiário local não registrava nenhum avanço concreto na ponte." },
  { p: "Até aqui, o relato pertence a um gênero conhecido: o Custo Brasil como monumento, o pilar inacabado como símbolo nacional. Mas essa moldura perde o que aconteceu neste ano." },
  { h: "Duas datas que reprecificam um estado" },
  { p: "31 de julho de 2026. Caiu a exigência de visto francês para brasileiros na Guiana Francesa, por acordo assinado no Itamaraty em 1º de julho pelos chanceleres Mauro Vieira e Jean-Noël Barrot, dentro de um pacote mais amplo de cooperação em segurança de fronteira. Pela primeira vez, a ponte binacional faz o que uma ponte deveria fazer: qualquer um pode atravessá-la. O governador do Amapá foi explícito sobre o que está em jogo — a Guiana Francesa, com sua renda média alta, é o mercado imediato; a União Europeia, via acordo Mercosul-UE, é o mercado de verdade. Aquela fronteira, disse ele, é uma porta." },
  { p: "14 de agosto de 2026. A Petrobras anunciou a presença de hidrocarbonetos no poço Morpho — o primeiro já perfurado na bacia da Foz do Amazonas — em águas ultraprofundas a cerca de 175 km da costa amapaense, sob 2.886 metros de lâmina d'água. O achado, constatado por meio de perfis elétricos e indicativos nas rochas, fica no bloco FZA-M-59, onde a Petrobras detém 100% sob concessão adquirida na 11ª Rodada da ANP, em 2013 — treze anos entre o leilão e o primeiro anúncio, uma métrica de Custo Brasil por si só. Nas primeiras horas, a companhia não dizia sequer se havia encontrado petróleo ou gás natural; na mesma noite, o Estadão já estampava a confirmação: petróleo. A perfuração segue, de todo modo, em fase de avaliação." },
  { p: "E saboreie um detalhe: o Morpho é o mesmo poço cujo \"abandono permanente\", em julho, foi amplamente lido como um fracasso silencioso. O abandono, insistia a Petrobras na época, é procedimento técnico padrão, sem relação com o resultado — e o resultado agora falou. Mais três poços, PAD-Morpho, Manga e Crotalus, estão na fila do licenciamento. O caso geológico sempre esteve na porta ao lado — e não é preciso ser geólogo para entendê-lo. Há mais de cem milhões de anos, América do Sul e África eram um único bloco que se rasgou em dois como uma folha de papel, abrindo o Atlântico no meio. A \"margem\" é a borda desse rasgo: a faixa de continente que hoje fica debaixo d'água, diante da costa. Ao longo dessa borda, o oceano recém-nascido passou milhões de anos enterrando quantidades enormes de matéria orgânica que, comprimida e cozida lentamente, virou petróleo. O ponto é que essa borda é uma só e contínua: vai das Guianas à foz do Amazonas sem interrupção, assim como a beirada de um rasgo não muda de natureza de um centímetro para o outro. Guiana, Suriname e a costa do Amapá são trechos da mesma beirada — mesmas rochas, mesma história. Do outro lado da fronteira marítima já foram descobertos mais de 11 bilhões de barris; a geologia não lê fronteiras, e é por isso que a Petrobras aposta que algo deve existir também deste lado." },
  { p: "Um estado isolado com 900 mil habitantes não é um mercado. Um estado isolado sentado sobre um achado de hidrocarbonetos e uma fronteira terrestre com a UE recém-aberta é uma opção — e a precificação dessa opção já começou." },
  { h: "O que o 14 de agosto decidiu de verdade — e o que não decidiu" },
  { p: "Uma palavra de disciplina antes do entusiasmo. No jargão do setor, um poço como o Morpho é um wildcat: o primeiro poço perfurado numa área onde ninguém nunca produziu nada, com apenas a sísmica e os modelos geológicos sugerindo que há algo lá embaixo. A estatística da categoria é ingrata: em bacias de águas profundas nunca testadas, funciona talvez uma tentativa em cada três ou quatro — e \"funcionar\" na primeira perfuração significa apenas encontrar hidrocarbonetos, não encontrá-los em volume suficiente, concentrados o bastante e acessíveis o bastante para justificar os bilhões do desenvolvimento. Entre \"há petróleo\" e \"há um campo comercial\" existe a mesma distância que entre garimpar pepitas num rio e abrir uma mina." },
  { p: "E a Margem Equatorial já deu essa lição uma vez — exatamente onde esta história se passa. Em 2011, a Total perfurou o Zaedyus, nas águas da Guiana Francesa, vendendo-o ao mercado com o mesmíssimo argumento de hoje: a geologia é a da Guiana, logo o petróleo tem de estar lá. O primeiro poço encontrou de fato hidrocarbonetos animadores; as manchetes anunciaram uma nova fronteira. Depois, os poços seguintes vieram vazios ou decepcionantes, e em poucos anos o play — a aposta geológica inteira naquela zona — foi abandonado. A própria ExxonMobil perfurou a região por décadas colecionando decepções, até que o poço Liza, em 2015, transformou a Guiana na \"Guiana\": de país pequeno e esquecido a nome que a indústria do petróleo pronuncia como sinônimo de jackpot — hoje um dos maiores produtores de petróleo per capita do planeta, com cada nova fronteira vendida como \"a próxima Guiana\". Aquele poço chegou quando quase todo mundo já tinha ido embora." },
  { p: "A moral não é que o Morpho vá acabar como o Zaedyus. É que um primeiro poço, sozinho, não decide nada: move as probabilidades." },
  { p: "Contra essa estatística de base, o desfecho mais provável sempre foi nem o triunfo nem o poço seco, mas a ambiguidade. E foi exatamente o que chegou. \"Indícios de hidrocarbonetos\". \"Fase de avaliação.\" Ainda não comercial — como a própria presidente da Petrobras, Magda Chambriard, disse à Reuters — enquanto a nota oficial declarava que o otimismo da companhia em relação à Margem Equatorial \"se confirma hoje\". As duas frases são verdadeiras; só uma foi escrita com as eleições de outubro no horizonte. E isso já não é inferência: Lula abre a campanha à reeleição neste fim de semana, em São Bernardo do Campo, sob o slogan \"O Brasil pronto pra mais\" — com o achado já embalado como legado do seu governo. O anúncio ainda veio embalado num trimestre recorde — R$ 52,4 bilhões de lucro líquido, quase o dobro na comparação anual com os preços do petróleo puxados pela guerra, e R$ 17,4 bilhões em dividendos, dos quais R$ 6,2 bilhões para o acionista controlador federal. Leia a coreografia junto com a geologia." },
  { p: "A geologia, porém, diz algo real. Veteranos do setor fixam a regra de bolso em oito poços fracassados a cada dez perfurados — fracassados de dois jeitos: secos, quando não há nada lá embaixo, ou antieconômicos, quando o hidrocarboneto existe mas é escasso demais, disperso demais ou caro demais de extrair para valer os bilhões do desenvolvimento. Encontrar hidrocarbonetos na primeira campanha de uma bacia reduz materialmente o risco da margem inteira — e é por isso que analistas e o lobby do petróleo trataram a notícia como confirmação da tese regional, mais do que de um campo específico. O passo seguinte tem nome: comercialidade — estabelecer se o campo vale o dinheiro, ou seja, se o volume recuperável e os custos de extração justificam o desenvolvimento. Quem vai decidir são os poços de delimitação, novas perfurações ao redor da descoberta para medir o tamanho, a espessura e a riqueza do reservatório." },
  { p: "A Petrobras, enquanto isso, enquadra a bacia como sua resposta a um problema com data marcada: o pré-sal, que hoje responde pela maior parte da produção brasileira, atinge o pico por volta de 2034-35 e depois começa a declinar. As reservas precisam ser recompostas antes disso, ou o país volta a importar. A escala da opção não é pequena: a ANP estima que a bacia da Foz do Amazonas possa conter até 30 bilhões de barris — potenciais, atenção, não provados: uma estimativa do que a geologia pode guardar, não um inventário do que foi encontrado. Para dar a medida: seria aproximadamente o dobro de todas as reservas provadas do Brasil hoje. E a pressão tampouco é pequena: no ritmo atual de extração, as reservas provadas da Petrobras se esgotam em pouco mais de uma década." },
  { p: "Somados, os dois números explicam a teimosia: para a Petrobras, esta fronteira não é aventura de pioneiro, é sobrevivência — sem novas descobertas, a Petrobras de meados dos anos 2030 seria uma petroleira que ficou sem petróleo. E é a mesma urgência que explica um detalhe que a celebração atropela: TotalEnergies, BP e Ecopetrol desistiram da região pelo caminho — a BP era originalmente cotitular justamente deste bloco — deixando a operadora estatal sozinha à mesa, com 100%." },
  { p: "Na véspera do anúncio, os desfechos possíveis eram três. O triunfo: descoberta declarada comercial, e o Amapá se reprecifica na hora. O fracasso: poço seco, e ainda assim a fronteira terrestre com a UE continua de pé — ela nunca precisou da geologia. E o caminho do meio: hidrocarbonetos encontrados, valor ainda por estabelecer. Chegou o terceiro: a aposta segue viva, financiada por US$ 3 bilhões de orçamento exploratório, com anos de delimitação pela frente para manter o Amapá sob os holofotes. E opções — apostas compradas hoje sobre um valor que só se conhecerá amanhã — movem preços antes mesmo de serem exercidas: o Oiapoque absorve fluxos migratórios desde 2024 com base apenas na expectativa. A reprecificação do Amapá não esperou a broca, e não vai esperar a comercialidade. Tampouco atrapalha que o presidente do Senado, Davi Alcolumbre, seja senador pelo Amapá — \"estávamos certos\", saudou ele o anúncio — o que significa que o estado mais isolado do país segura, neste momento, o martelo mais pesado de Brasília." },
  { h: "A arbitragem, em três camadas" },
  { p: "O que uma fronteira com a União Europeia oferece, concretamente? Três coisas distintas, e só uma é nova." },
  { p: "A camada de preços existe há décadas, informalmente. A Guiana Francesa vive de salários e welfare franceses importando quase tudo de uma metrópole a 7.000 km; seu custo de vida está entre os mais altos da França. Do outro lado do rio: preços brasileiros. Os guianenses atravessam há muito tempo para compras, combustível, dentista, serviços. A isenção de visto agora torna o fluxo simétrico — brasileiros podem acessar legalmente um mercado denominado em euros com alto poder de compra. Há também uma camada negra aqui (ouro de garimpos ilegais, contrabando de combustível) que toda análise honesta nomeia e nenhum operador sério toca." },
  { p: "A camada aduaneira é a janela que importa. A Guiana Francesa é território aduaneiro da UE. Hoje, um caminhão de cimento, alimentos ou materiais de construção brasileiros que cruza a ponte paga tarifas europeias como se tivesse atracado em Roterdã — uma das razões pelas quais a ponte ficou vazia e a Guiana segue comprando de Le Havre a custos finais absurdos. A ratificação do acordo Mercosul-UE muda a aritmética: o fornecedor natural da Guiana Francesa passa a ser o Brasil, a 400 metros, não a França, a três semanas de navio. Mas as tarifas são só metade do muro. A outra metade é a conformidade — certificação sanitária, rastreabilidade EUDR para madeira e açaí, rotulagem europeia. Do lado brasileiro, todo mundo tem o produto. Quase ninguém tem a conformidade. Quem montar a cadeia conforme antes da ratificação leva o mercado no minuto zero." },
  { p: "A camada de compras públicas. Como região ultraperiférica da UE, a Guiana Francesa recebe fundos estruturais europeus, além da gravidade de gastos do centro espacial de Kourou. As obras rodam com estruturas de custo francesas ao lado de mão de obra e materiais brasileiros. Empresas capazes de operar dos dois lados do rio têm uma vantagem estrutural que não tem nada a ver com sorte. E se a delimitação confirmar o que o bloco 59 deixa entrever, uma quarta camada se monta sozinha: a logística de apoio petrolífero num estado que hoje não tem quase nada dessa infraestrutura." },
  { h: "Janelas ficam abertas até fecharem" },
  { p: "Nada disso é uma história moral. Os pilares do Jari vão continuar no rio independentemente do que se escreva sobre eles, e as filas de balsa só vão sumir no dia em que um tabuleiro for finalmente lançado sobre aqueles pilares — um dia que o cronograma oficial promete para o fim de 2026, e que vinte e cinco anos de história sugerem não marcar na agenda. O ponto analítico é mais estreito: janelas de arbitragem como a camada aduaneira existem justamente porque são temporárias. Abrem entre a ratificação de um tratado e o momento em que os grandes players percebem; fecham quando o mercado se reprecifica ou as regras mudam. O ofício não é celebrá-las nem condená-las — é enxergá-las enquanto estão abertas." },
  { p: "O Amapá passou um século como piada logística do Brasil. Entre 31 de julho e 14 de agosto de 2026 — quinze dias — virou silenciosamente outra coisa: o único ponto em que o Brasil toca a Europa por terra, ao lado do primeiro achado de hidrocarbonetos na bacia que pode estender a fronteira petrolífera brasileira, no único estado que todo mundo tinha parado de olhar." },
  { p: "O país que construiu uma ponte para outra nação antes de se conectar a si mesmo pode estar prestes a descobrir que a primeira ponte era a certa." },
  { p: "Business Matching Global — inteligência de mercado e orquestração de negócios no corredor UE-Brasil." },
];

export default function AmapaBR() {
  const { lang } = useT();
  const article = getArticleBySlug("amapa");
  useCanonical("/amapa", {
    title: `${TITLE} | Business Matching Global`,
    description: "A única fronteira terrestre do Brasil com a União Europeia passa pelo seu estado mais isolado. Duas datas deste ano acabaram de mudar o que isso significa.",
    type: "article",
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <article className="min-h-screen bg-background text-foreground">
      <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/analysis"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {BACK[lang as keyof typeof BACK] ?? BACK.en}
          </Link>
          <LangSwitcher />
        </div>

        <header className="mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            {TITLE}
          </h1>
          {article && (
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <time dateTime={article.date}>
                {new Date(article.date).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}
              </time>
              {article.updated && article.updated !== article.date && (
                <>
                  <span>—</span>
                  <span>
                    atualizado em{" "}
                    {new Date(article.updated).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}
                  </span>
                </>
              )}
            </div>
          )}
        </header>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          {body.map((block, i) =>
            "h" in block ? (
              <h2 key={i} className="text-2xl sm:text-3xl font-semibold mt-12 mb-4">
                {block.h}
              </h2>
            ) : "tag" in block ? (
              <p key={i} className="text-sm font-semibold tracking-wide text-muted-foreground mt-2 mb-6">
                {block.tag}
              </p>
            ) : (
              <p key={i} className="leading-relaxed mb-6 text-justify">
                {block.p}
              </p>
            )
          )}
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <ShareBlock title={TITLE} />
        </div>

        <div className="mt-12">
          <NewsletterSignup />
        </div>
      </div>

      <AnalysisFooter />
    </article>
  );
}
