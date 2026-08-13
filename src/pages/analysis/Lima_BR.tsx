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

const TITLE = "A rota que já existe";

const BACK = {
  it: "Torna alle analisi",
  en: "Back to analysis",
  pt: "Voltar às análises",
} as const;

const body: Block[] = [
  { p: "Todo ano, 150 mil pessoas voam entre Milão e Lima. Nenhuma companhia voa entre Milão e Lima. A Emirates percebeu." },
  { p: "Segundo Leonard Berberi, correspondente de aviação do Corriere della Sera (12 de agosto), a Emirates está perto de obter a aprovação para operar a ligação direta Milão Malpensa–Lima com base em um apêndice dos acordos bilaterais entre Itália e Emirados Árabes Unidos. Faltaria apenas a última assinatura, informam as fontes do Corriere, mas a extensão do chamado regime de \"quinta liberdade\" poderia ser autorizada já na próxima temporada de inverno — a janela que no setor começa no fim de outubro e termina nos últimos dias de março." },
  { p: "Duas ressalvas antes da análise, porque na BMG atribuímos e usamos o condicional enquanto a tinta não seca. Primeira: autorização não é operação. A própria Emirates, procurada pelo Corriere, não desmentiu ter solicitado os direitos, mas declarou não ter planos imediatos para Lima e avaliar continuamente as rotas conforme demanda, condições de mercado e disponibilidade de aeronaves. Segunda: hoje a Emirates não atende Lima de forma alguma — nem mesmo a partir de seu próprio hub em Dubai. O que está sendo assegurado é uma opção, não um horário." },
  { p: "Há inclusive precedente de opção nunca exercida. Como lembra o veículo especializado Italiavola, a Emirates já havia obtido no passado quatro frequências semanais para outra rota em quinta liberdade a partir de Malpensa — falou-se por muito tempo na Cidade do México — e nunca a abriu. A mesma fonte indica 25 de outubro, início da malha de inverno, como provável data de vigência da nova autorização. A Emirates atende hoje Malpensa com três voos diários desde Dubai, o terceiro restabelecido em 1º de agosto com o A350-900, além da continuação diária em quinta liberdade para Nova York." },
  { p: "E é exatamente isso que torna o caso digno de leitura." },
  { h: "A renda em disputa" },
  { p: "Considere o número escondido no meio da reportagem do Corriere: cerca de 150 mil passageiros por ano voam entre Milão e a capital peruana, todos fazendo conexão em outro lugar. Lima é o maior destino não atendido por voos diretos desde Milão — um mercado com três camadas distintas de demanda (a comunidade peruana na Itália, o turismo e os negócios), além da carga nos dois sentidos." },
  { p: "Hoje esse tráfego é colhido pelos hubs dos grandes grupos europeus. Os passageiros da Lombardia são \"pescados\" — o verbo é do próprio Corriere — e levados a Roma, Frankfurt, Paris, Madri ou Londres, para então cruzarem o Atlântico. Não é uma rota: é uma renda. A demanda existe independentemente da decisão de produto de qualquer companhia. Os hubs apenas se colocam entre a demanda e a geografia, e cobram o pedágio." },
  { p: "E as praças de pedágio são menos numerosas do que o mapa sugere. Segundo o site brasileiro Aeroin, as únicas ligações diretas de Lima com a Europa são hoje Amsterdã, Barcelona, Paris e Madri: os sistemas Air France-KLM e IAG. A renda, em outras palavras, é arrecadada por dois grupos; todos os demais, a Itália inclusive, os alimentam." },
  { p: "A quinta liberdade é o instrumento jurídico que permite a um operador de um terceiro país disputar essa renda. A Emirates já aplica o modelo no sentido inverso: o voo EK205 Dubai–Milão–Nova York vende passagens apenas no trecho Milão–Nova York, embora a companhia não seja italiana nem norte-americana. Essa rota foi testada de todas as formas que importam: superou o recurso apresentado pela associação das companhias italianas, a Assaereo, com a Justiça administrativa italiana dando ganho de causa à Emirates, e seu êxito levou — segundo o próprio presidente Tim Clark à época — cerca de dez cidades europeias a pedirem à companhia um serviço transatlântico semelhante. Malpensa–Lima seria a mesma arquitetura, já testada nos tribunais, apontada para o sul." },
  { p: "Uma ressalva honesta sobre essa arquitetura. Um trecho em quinta liberdade é desatrelado de Dubai comercialmente, não operacionalmente: a aeronave continua saindo do hub. Quando a guerra com o Irã fechou o espaço aéreo do Golfo em março, toda a rede em quinta liberdade da Emirates — incluindo Malpensa–Nova York, além de Atenas–Newark, Barcelona–Cidade do México e Miami–Bogotá — parou por dias. Um Milão–Lima operado pela Emirates carregaria uma exposição geopolítica que uma conexão via Madri ou Paris não tem. A arquitetura disputa a renda; não abole o risco." },
  { h: "A vaga em aberto" },
  { p: "Há uma camada mais profunda nessa história, e ela é italiana, não emiradense. O mercado em que a Emirates está entrando não foi tomado de ninguém. Foi desocupado — deliberadamente." },
  { p: "Malpensa foi construída para ser exatamente aquilo de que trata este dossiê: o projeto \"Malpensa 2000\" foi inaugurado em 1998 como hub intercontinental do Norte da Itália. Dez anos depois, a Alitalia o desmontou — decisão anunciada no plano de 2007, executada em 2008 e consolidada pelo resgate da CAI, que concentrou a malha em Roma Fiumicino. A lógica de manter um único hub era econômica; a escolha de qual hub manter foi política. Porque a demanda nunca se mudou. A área de influência de Malpensa — a Lombardia e as regiões vizinhas — é a mais rica do país, e o desequilíbrio aparece na malha: como observa o próprio Corriere, hoje há mais voos diretos para a Ásia saindo de Malpensa do que de Roma Fiumicino. A companhia de bandeira italiana recuou do mercado aéreo mais rico da Itália e o deixou estruturalmente descoberto no longo curso." },
  { p: "O que veio depois foi mecânico. A Lufthansa tentou preencher a lacuna por conta própria com a Lufthansa Italia (2009-2011) e desistiu. As low cost ficaram com o curto curso. A Emirates abriu o Nova York em quinta liberdade em 2013. E agora Lima. Nenhum desses operadores está arrancando uma renda: está ocupando uma vaga que está anunciada desde 2008." },
  { p: "Vista assim, a queixa da ITA se inverte. A companhia que a antecedeu abandonou Malpensa para proteger o hub de Roma — e sua sucessora agora reclama porque outro atende, a partir de Malpensa, mercados que Roma nunca atendeu. Os 150 mil passageiros roteados a cada ano via Madri e Paris não são uma ameaça criada pela Emirates. São a fatura anual, ainda em aberto, de uma decisão tomada há dezoito anos." },
  { h: "A outra metade do continente" },
  { p: "Quem nos acompanha conhece nossa tese recorrente: o Brasil concentra cerca de metade do PIB sul-americano, e a outra metade não é uma nota de rodapé — é um mercado com estrutura diferente. É significativo que o primeiro novo nó Europa–América do Sul em discussão a partir de Milão não seja brasileiro. De Malpensa, o único voo direto ao continente hoje é o São Paulo da LATAM. A lista de outras rotas em quinta liberdade em estudo pela Emirates, segundo as fontes do Corriere, inclui São Paulo — mas também Santiago do Chile, Cidade do México e Los Angeles." },
  { p: "Os analistas citados na reportagem observam que a América Latina é neste momento o mercado que apresenta os melhores rendimentos econômicos. Quando uma companhia com a disciplina de malha da Emirates começa a colecionar opções em quinta liberdade através do Atlântico, não é sentimento. É uma aposta calculada de que o corredor Europa–América Latina está subatendido em relação ao que rende." },
  { h: "Para quem a vida complica" },
  { p: "A ITA Airways — hoje com 41% da Lufthansa, participação que subirá a 90% no início de 2027 — vem construindo sua própria expansão latino-americana a partir de Roma Fiumicino, com Santiago entre as adições planejadas. Um Malpensa–Lima operado por uma companhia do Golfo drenaria justamente a alimentação do Norte da Itália que torna viáveis as rotas de longo curso marginais saindo de Roma. O presidente da SEA, Armando Brunini, já havia dito ao Corriere que o foco de Malpensa seria agora a América do Sul. O operador aeroportuário de Milão e a companhia de bandeira estão, nesse dossiê, em lados opostos." },
  { p: "Há aqui um paradoxo que vale sublinhar. Segundo a Aeroin, nenhuma companhia do grupo Lufthansa atende Lima: nem de Frankfurt, nem de Munique, nem de Zurique. O grupo que em breve terá 90% da companhia de bandeira italiana não tem produto algum no mercado que estaria defendendo. A objeção à Emirates no Milão–Lima não é \"atendemos melhor esse mercado\"; é \"preferimos que esse mercado continue conectando pelo hub de alguém\" — e hoje nem sequer pelo da própria Lufthansa." },
  { h: "O que isso significa para os atores do corredor" },
  { p: "Para as empresas com que trabalhamos, três leituras práticas." },
  { p: "Conectividade é regulatória antes de ser comercial. A restrição decisiva no Milão–Lima nunca foi a demanda: os 150 mil passageiros anuais provam isso. Era uma assinatura em um apêndice bilateral. Janelas como essa se abrem por ato administrativo e podem se fechar do mesmo modo; quem se beneficia são os operadores que acompanham os trâmites, não os que esperam o comunicado à imprensa." },
  { p: "Porões são infraestrutura. A autorização em discussão cobre passageiros e carga. Um widebody direto entre a Lombardia e o Peru é capacidade de exportação para perecíveis, componentes de máquinas e farmacêuticos nos dois sentidos — capacidade que hoje passa por hubs de terceiros, com os custos de tempo e de handling que isso implica." },
  { p: "Olhem a lista, não só a manchete. Se Santiago, Cidade do México e São Paulo a partir de Malpensa estão realmente em estudo, o mapa da conectividade Europa–América Latina está sendo redesenhado por uma companhia que não pertence a nenhum dos dois continentes. Para quem planeja uma entrada de mercado em qualquer das duas margens, o pressuposto de que \"se conecta por um hub europeu\" tem prazo de validade." },
  { p: "A rota já existe. A pergunta que os reguladores estão prestes a responder é apenas quem será pago por ela." },
  { p: "Fontes: Corriere della Sera (Leonard Berberi, 12 de agosto de 2026), com dados de rota atribuídos pelo Corriere à Cirium; Italiavola (12 de agosto de 2026); Aeroin (12 de agosto de 2026); arquivo do Gulf News sobre o caso Assaereo e as declarações de Tim Clark." },
];


export default function LimaBR() {
  const { lang } = useT();
  const article = getArticleBySlug("lima_br");
  const desc =
    "Todo ano 150 mil pessoas voam entre Milão e Lima, e nenhuma companhia serve a rota. Por que a opção fifth-freedom da Emirates é uma disputa por uma renda que a Itália deixou vaga em 2008.";
  useCanonical("/lima_br", {
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
          <LangSwitcher to="/lima" />
        </div>
        <article className="prose-invert">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4">
            {article?.title.pt ?? TITLE}
          </h1>
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
          <ShareBlock title={article?.title.pt ?? TITLE} />
        </article>
        <AnalysisFooter />
      </div>
    </main>
  );
}
