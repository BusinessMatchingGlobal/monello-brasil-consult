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

const TITLE = "O chuveiro que decide como o Brasil se lava";

const body: Block[] = [
  { p: "Peça a um engenheiro europeu para inspecionar um banheiro brasileiro e observe a sequência de reações. Primeiro, o alarme: um chuveiro de plástico com uma resistência nua de 7.500 watts, fios aparentes no teto, a água sendo aquecida no exato instante em que toca o corpo. Nos fóruns de expatriados, o apelido é ducha da morte. Depois, a perplexidade: não existe um único cano de água quente em todo o apartamento. Por fim, se o engenheiro ficar tempo suficiente, algo parecido com respeito." },
  { p: "Porque o objeto que ele tem diante de si não é uma improvisação. É um dos casos mais bem-sucedidos de engenharia da restrição na história dos bens de consumo — e foi projetado, patenteado e industrializado por uma família de imigrantes italianos vinda de Gênova." },
  { h: "Uma invenção italiana que o Brasil fez sua" },
  { p: "Em 1923, o engenheiro civil Alessandro Lorenzetti — que havia chegado de Gênova décadas antes para trabalhar nas obras do Porto de Vitória e na ferrovia Santos–Jundiaí — fundou com o conterrâneo Carlo Tonanni uma pequena fábrica de parafusos de precisão na Mooca, o bairro industrial italiano de São Paulo. Quatro funcionários, quatro tornos automáticos." },
  { p: "A virada veio com a geração seguinte. Em 1952, enquanto o Brasil se urbanizava e a rede elétrica avançava pelas cidades, o filho de Alessandro, Lorenzo — metido a inventor, como diziam na família — patenteou o chuveiro elétrico automático: um aparelho que ligava sozinho com a própria pressão da água. Sem alavanca, sem chama-piloto, sem reservatório. Abriu a torneira, saiu água quente." },
  { p: "Setenta anos depois, a Lorenzetti S.A. opera cinco fábricas entre São Paulo e Minas Gerais, registrou receita recorde acima de R$ 2 bilhões e exporta para mais de 45 países — sobretudo na América Latina e na África, mercados que replicam as condições exatas do Brasil dos anos 1950: eletrificação em expansão, ausência de rede de gás, famílias com pouco capital. O reconhecimento definitivo veio numa feira na China, onde funcionários da Lorenzetti se depararam com um estande inteiramente falsificado da própria marca. Ninguém falsifica um acaso." },
  { h: "A navalha e a resistência" },
  { p: "Aos olhos europeus, a conta parece absurda. Um líder de mercado construído sobre um produto que custa R$ 60–150 no varejo — o preço de um rodízio de pizza — numa categoria em que o equivalente europeu, uma caldeira a gás ou um boiler de acumulação, custa cinquenta vezes mais? Onde está a margem?" },
  { p: "A resposta é que o aparelho barato é a porta, não o negócio. O CapEx próximo de zero coloca um Lorenzetti em praticamente todos os banheiros do país — uma base instalada que nenhum fabricante de caldeiras jamais alcançará no Brasil. E dentro de cada um desses chuveiros mora um consumível: a resistência queima, regularmente, desgastada pela água dura e pelos ciclos térmicos. A família brasileira não compra um chuveiro novo. Compra uma resistência — poucos reais, disponível em qualquer loja de material de construção ou supermercado do país — e muitas vezes troca em casa. A Lorenzetti vende o aparelho uma vez e a peça de reposição para sempre, em dezenas de milhões de banheiros. É o modelo navalha-e-lâmina aplicado à água quente; a resistência chata patenteada Loren Ultra, lançada em 2015, fecha ainda mais o circuito ao tornar o consumível proprietário." },
  { p: "A terceira camada é a marca como padrão. Quando o sobrenome da família vira o substantivo genérico da categoria — o brasileiro compra um lorenzetti como quem tira uma xerox — e todo eletricista do país sabe instalar e consertar o produto de olhos fechados, desbancar o incumbente custa quase tudo ao desafiante e quase nada ao incumbente. O estande falsificado na China foi apenas o mercado certificando esse status." },
  { p: "Lida como fórmula: CapEx mínimo para maximizar a base instalada, um consumível recorrente para monetizá-la, uma marca-padrão para defendê-la. Setenta anos de renda construídos sobre um objeto de sessenta reais — a inversão exata do modelo europeu, que concentra a margem num produto de alto CapEx vendido uma única vez. Nenhuma das duas lógicas é ingênua. Cada uma é a resposta racional à sua própria infraestrutura." },
  { h: "A lógica da restrição" },
  { p: "Para entender por que o chuveiro elétrico conquistou o Brasil — e por que jamais conquistará a Europa — é preciso ler a infraestrutura, não o produto." },
  { p: "A casa não tem sistema de água quente. O chuveiro aquece a água no ponto de uso, no momento do uso. Zero perdas de armazenamento, zero encanamento de água quente, rendimento de conversão próximo de 100% no aparelho. Custo de instalação: o preço do próprio dispositivo, cerca de R$ 60–150 nos modelos de entrada, mais um circuito dedicado. Numa economia em que a restrição determinante da família é o capital inicial, isso não é um meio-termo. É o ótimo." },
  { p: "Quem paga a conta é a rede. Milhões de chuveiros ligando entre 18h e 21h — o banho depois do trabalho — criaram o famoso pico residencial noturno brasileiro. Por décadas, as distribuidoras dimensionaram capacidade em torno de uma carga que existe três horas por dia. Os experimentos de tarifa horária, a tarifa branca, as campanhas para deslocar o consumo: boa parte disso remonta a esse único eletrodoméstico." },
  { p: "O modelo tarifário permite. Eis a divergência estrutural que escapa aos europeus. Uma família italiana contrata potência — tipicamente 3 kW — e o medidor desliga fisicamente acima disso. Um chuveiro de 7,5 kW nem conseguiria ligar. O fornecimento residencial brasileiro não tem teto equivalente de potência contratada: o cliente paga pela energia consumida, e a carga é livre para disparar. A Itália disciplina a demanda a montante, no contrato; o Brasil a absorve a jusante, na rede." },
  { p: "O regime de segurança tolera. Uma resistência nua num fluxo de água tem fuga de corrente por construção. A NBR 5410 exige desde 1997 dispositivos DR de 30 mA nas áreas molhadas — o mesmo limiar das normas europeias — mas todo eletricista brasileiro conhece a frase \"o chuveiro desarma o DR\". A solução popular raramente é um chuveiro novo. É remover o DR — e levantamentos do Procobre e da Abracopel estimam que apenas cerca de um quarto dos lares brasileiros tem um DR instalado. O sistema se sustenta sobre um compromisso normativo que nenhum regulador europeu assinaria, e uma geração de brasileiros cresceu conhecendo o leve formigamento de um chuveiro aterrado no cano d'água — ou em lugar nenhum. Os projetos modernos com resistência encapsulada praticamente eliminaram o risco por engenharia; o parque instalado é outra história." },
  { h: "A lavadora que nunca aquece" },
  { p: "Entendido o chuveiro, a segunda peculiaridade brasileira se explica sozinha: a lavadora de roupas brasileira padrão não tem resistência. Lava frio. Sempre." },
  { p: "As razões se encaixam com precisão. O orçamento elétrico da casa — fiação, quadro, a própria ligação com a rua — já foi gasto no banheiro; não há espaço para uma segunda carga resistiva de 2 kW na área de serviço. O clima torna a lavagem a frio aceitável para a sujeira do dia a dia. E a indústria de detergentes coevoluiu: as formulações brasileiras são sistemas enzimáticos otimizados para 20–30°C, a imagem espelhada de um mercado europeu calibrado por décadas em ciclos de 40–60°C." },
  { p: "Entre hoje numa loja de eletrodomésticos em São Paulo ou Belo Horizonte e o mercado se lê em três faixas. O padrão de massa: as máquinas de abertura superior com agitador da Brastemp, da Consul e da onipresente Electrolux — burros de carga de 15 a 17 quilos, água fria, ciclos abaixo de quarenta minutos, quase indestrutíveis, presentes em quase todo lar brasileiro. A faixa premium: as Lava e Seca de abertura frontal, segmento em plena expansão nos apartamentos de classe média e média-alta, dominado por LG e Samsung — máquinas que funcionam exatamente como as primas europeias, aquecendo a água internamente e tratando as roupas com delicadeza, posicionadas e precificadas como artigos de luxo. No meio, um compromisso recente: as top load de impulsor (um disco plano giratório no lugar do poste central), mais suaves com o tecido, mais fracas contra a sujeira difícil." },
  { p: "Por que o mercado de massa precisa daquele agitador central tão agressivo? A teoria da limpeza industrial responde com o Círculo de Sinner — formulado por volta de 1959 por Herbert Sinner, químico da Henkel, a casa alemã do Persil, e até hoje o modelo fundamental ensinado na lavanderia profissional: toda lavagem é a soma de quatro forças — temperatura, química, ação mecânica e tempo — desenhadas como fatias de um círculo que precisa estar sempre cheio. Encolha uma fatia, e as outras precisam crescer para compensar. A máquina brasileira elimina quase toda a temperatura e se recusa a compensar com tempo (o ciclo dura um terço do europeu), então a carga inteira recai sobre a mecânica: o agitador agarra, torce e esfrega a roupa em golpes secos e alternados, uma simulação motorizada de uma lavagem à mão vigorosa. A roupa sai limpa, rápido, e mensuravelmente mais velha. O algodão afina, as bordas desfiam, aparecem as bolinhas, o elástico cede antes da hora." },
  { p: "Repare no que aconteceu com o custo. Ele não desapareceu — migrou. A família economizou no eletrodoméstico e na conta de luz, e paga em vez disso com uma vida útil mais curta do guarda-roupa: uma despesa recorrente que não aparece em nenhum selo de eficiência, nenhuma etiqueta de preço, nenhuma tabela comparativa. Custos que sobrevivem migrando para linhas que ninguém precifica — essa é a gramática do Custo Brasil, aplicada a uma área de serviço." },
  { p: "A arquitetura desce ainda mais uma faixa. Abaixo da automática está o tanquinho — a lavadora semiautomática, e vale a pena ser preciso sobre quão pouca máquina ele de fato é. Um tanque de plástico com agitador e timer: lava e enxágua, mas o resto é com o humano — encher com a mangueira, dosar o sabão, escoar a água, transferir a roupa e torcer à mão ou passar para a centrífuga, o aparelho independente que sobrevive no Brasil como categoria autônoma de produto meio século depois de sumir das prateleiras europeias. As capacidades vão de 8 a 16 quilos — as famílias os usam sobretudo para as cargas pesadas, cobertores, tapetes — e o custo de operação é quase um erro de arredondamento: sem aquecimento e sem motor de centrifugação, um modelo típico de 10 quilos declara cerca de 0,10 kWh por ciclo. O preço de compra, uma fração do de uma automática, compra meia lavadora; a outra metade é fornecida pela família, em trabalho. É a mesma migração vista com o agitador e o guarda-roupa: o custo que a etiqueta não mostra não sumiu — mudou-se para uma linha que ninguém precifica, neste caso a tarde de alguém." },
  { p: "A líder nacional em semiautomáticas é a Suggar, de Belo Horizonte — uma empresa fundada em 1978 em torno de um produto completamente diferente, o depurador de ar de cozinha, que o brasileiro até hoje chama de \"um suggar\", seja qual for o fabricante. Duas empresas numa mesma história cujo sobrenome virou o substantivo genérico de uma categoria de produto: neste mercado, o prêmio por ler a restrição primeiro é tornar-se a própria língua. E os milhões de tanquinhos vendidos por ano dizem que a família considera a troca inteiramente racional." },
  { p: "E quando um lar brasileiro tem água quente — um aquecedor de passagem a gás, um sistema solar no telhado, típicos do estoque residencial de padrão mais alto — a lavadora ainda assim se recusa a aquecê-la. Alguns modelos apenas aceitam água pré-aquecida na entrada, em geral com limite em torno de 40°C para proteger o tanque de plástico e as válvulas. A divisão de trabalho é explícita: aquecer a água é tarefa da casa, não do eletrodoméstico. A Europa internalizou o calor dentro da máquina porque a máquina, historicamente, tinha uma única conexão: a fria. O Brasil o externalizou porque a casa, historicamente, tinha um único aquecedor: o chuveiro." },
  { h: "Nenhum dos dois produtos cruza o oceano" },
  { p: "Esta é a parte que importa para quem planeja uma entrada de mercado, em qualquer das duas direções." },
  { p: "O chuveiro elétrico não pode ser exportado para a Europa — não por custo, mas por incompatibilidade sistêmica: DRs de 30 mA obrigatórios que a sua física faria desarmar, tetos de potência contratada que a sua wattagem estouraria, e uma cultura de conformidade elétrica sem nenhum apetite pelo compromisso brasileiro. Na direção oposta, o ecossistema europeu da água quente — caldeiras a gás, lavadoras que aquecem, radiadores — não pode ser exportado para o Brasil, porque a infraestrutura a jusante do produto não existe: o gás encanado alcança uma fatia estreita de São Paulo e do Rio, e a fiação da casa média não comporta cargas resistivas além da única que já tem." },
  { p: "Dois mercados industriais sofisticados. Duas indústrias de eletrodomésticos maduras. Fluxo de produto próximo de zero entre elas nessas categorias — e o gosto do consumidor não tem nada a ver com isso. A assimetria é infraestrutural, regulatória e tarifária. O produto é um fóssil do sistema que o gerou." },
  { p: "O que traz a história de volta à Lorenzetti, e à razão pela qual uma fábrica de parafusos da Mooca de 1923 virou líder de mercado centenária enquanto gerações de importadores fracassavam. Alessandro Lorenzetti não despachou a solução italiana através do Atlântico. Seu filho leu a restrição brasileira real — hidroeletricidade abundante, sem gás, sem capital, casas sem encanamento para o calor — e projetou a resposta nativa. O produto nasceu no Brasil porque o método foi aplicado no Brasil." },
  { p: "Um século depois, a lição continua a mesma. Antes de perguntar quanto custa embarcar o seu produto, faça uma pergunta mais difícil: quanto do sistema do qual o seu produto depende existe do outro lado do oceano — e, se a resposta for \"pouco\", a sua verdadeira exportação é mesmo o produto, ou o método que projetaria o seu gêmeo brasileiro?" },
  { p: "A Business Matching Global mapeia a infraestrutura por trás do mercado — antes de o contêiner embarcar." },
];

export default function LorenzettiBR() {
  const { lang } = useT();
  const article = getArticleBySlug("lorenzetti_br");
  const desc =
    "Como uma família de imigrantes italianos projetou o chuveiro elétrico brasileiro — e por que o aparelho, a lavadora que lava frio e o tanquinho revelam a lógica infraestrutural do Custo Brasil.";
  useCanonical("/lorenzetti", {
    title: `${TITLE} — Business Matching Global`,
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
            Voltar às análises
          </Link>
          <LangSwitcher to="/lorenzetti" />
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
