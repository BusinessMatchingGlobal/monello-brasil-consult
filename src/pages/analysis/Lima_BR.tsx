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
  { p: "Todo ano, 150 mil pessoas voam entre Milão e Lima. Nenhuma companhia aérea voa entre Milão e Lima. A Emirates percebeu." },
  { p: "Segundo o correspondente de aviação do Corriere della Sera, Leonard Berberi (12 de agosto), a Emirates está próxima de obter aprovação para operar um serviço direto Milão Malpensa–Lima por meio de um anexo aos acordos bilaterais Itália–Emirados Árabes. A assinatura regulatória final ainda estaria pendente, dizem as fontes do Corriere, mas a extensão do chamado regime de \"quinta liberdade\" poderia ser autorizada já na próxima temporada de inverno — a janela da indústria que vai de fins de outubro a fins de março." },
  { p: "Duas ressalvas antes da análise, porque na BMG atribuímos as fontes e usamos o condicional até que a tinta esteja seca. Primeiro: autorização não é operação. A própria Emirates, contatada pelo Corriere, não negou ter solicitado os direitos, mas declarou que não tem \"planos imediatos\" para Lima e avalia continuamente rotas considerando a demanda, as condições de mercado e a disponibilidade de aeronaves. Segundo: a Emirates hoje não serve Lima de forma alguma — nem mesmo de seu próprio hub em Dubai. O que está sendo assegurado é uma opção, não uma programação." },
  { p: "Há até precedente de opção não utilizada. Como lembra o site especializado Italiavola, a Emirates já havia obtido no passado quatro frequências semanais para outra rota de quinta liberdade de Malpensa — há muito especulada como Cidade do México — e nunca a inaugurou. O mesmo site indica 25 de outubro, início da programação de inverno, como a provável data efetiva da nova autorização. A Emirates serve Malpensa atualmente três vezes ao dia a partir de Dubai, com a terceira frequência restaurada em 1º de agosto com o A350-900, além da continuidade diária de quinta liberdade para Nova York." },
  { p: "É precisamente isso que torna a história digna de leitura." },
  { h: "A renda em disputa" },
  { p: "Considere o número enterrado no meio da matéria do Corriere: cerca de 150 mil passageiros por ano voam entre Milão e a capital peruana, todos eles se conectando em algum outro lugar. Lima é o maior destino não servido de forma direta a partir de Milão — um mercado com três camadas distintas de demanda (a comunidade peruana na Itália, turismo, negócios) mais carga em ambas as direções." },
  { p: "Hoje esse tráfego é colhido pelos hubs das grandes companhias europeias. Passageiros da Lombardia são \"pescados\" — o verbo é do Corriere — e levados a Roma, Frankfurt, Paris, Madrid ou Londres, para depois cruzar o Atlântico. Isso não é uma rota; é uma renda. A demanda existe independentemente de qualquer decisão de produto de uma companhia aérea. Os hubs simplesmente se sentam entre a demanda e a geografia e cobram o pedágio." },
  { p: "E as praças de pedágio são menos do que o mapa sugere. Segundo o site brasileiro Aeroin, os únicos links diretos de Lima com a Europa hoje são Amsterdam, Barcelona, Paris e Madrid — os sistemas Air France-KLM e IAG. A renda, em outras palavras, é arrecadada por dois grupos aéreos; todos os outros, Itália incluída, os alimentam." },
  { p: "A quinta liberdade é o instrumento jurídico que permite a uma companhia de terceiro país contestar essa renda. A Emirates já opera o modelo na direção oposta: o voo EK205 Dubai–Milão–Nova York vende assentos apenas na perna Milão–Nova York, apesar de a Emirates não ser italiana nem americana. Aquela rota foi testada de todas as formas relevantes: sobreviveu a um desafio legal movido pela associação de companhias aéreas italianas Assaereo, com um tribunal administrativo italiano decidindo a favor da Emirates, e seu sucesso motivou — pelo relato do próprio presidente da Emirates, Tim Clark, na época — cerca de dez cidades europeias a pedirem à companhia serviços transatlânticos similares. Malpensa–Lima seria a mesma arquitetura, à prova de litígio, apontada para o sul." },
  { p: "Uma ressalva honesta sobre essa arquitetura. Uma perna de quinta liberdade está desvinculada de Dubai comercialmente, não operacionalmente: a aeronave ainda parte do hub. Quando a guerra com o Irã fechou o espaço aéreo do Golfo em março, toda a rede de quinta liberdade da Emirates — Malpensa–Nova York incluída, junto com Atenas–Newark, Barcelona–Cidade do México e Miami–Bogotá — parou por dias. Um Malpensa–Lima direto operado pela Emirates carregaria uma exposição geopolítica que uma conexão em Madrid ou Paris não tem. Arquitetura contesta renda; não abole risco." },
  { h: "A vaga" },
  { p: "Há uma camada mais profunda nesta história, e é italiana, não emiratina. O mercado em que a Emirates está entrando não foi tirado de ninguém. Foi deixado vazio — deliberadamente." },
  { p: "Malpensa foi construída para ser exatamente o que este dossiê descreve: o projeto \"Malpensa 2000\" inaugurado em 1998 como hub intercontinental para o Norte da Itália. Dez anos depois, a Alitalia a desfez como hub — uma decisão anunciada no plano de 2007, executada em 2008 e consolidada pelo resgate da CAI, que concentrou a rede em Roma Fiumicino. A lógica de manter um único hub era econômica; a escolha de qual hub manter era política. Porque a demanda nunca se mudou. A catchment de Malpensa — Lombardia e regiões vizinhas — é a mais rica do país, e o desequilíbrio se mostra nos horários: como o próprio Corriere observa, hoje há mais voos diretos para a Ásia de Malpensa do que de Fiumicino. A companhia de bandeira italiana recuou do mercado aéreo mais rico da Itália e o deixou estruturalmente não atendido para longas distâncias." },
  { p: "O que se seguiu foi mecânico. A Lufthansa tentou preencher a lacuna com a Lufthansa Italia (2009–2011) e desistiu. As companhias de baixo custo ficaram com o curto alcance. A Emirates abriu o serviço de quinta liberdade para Nova York em 2013. E agora Lima. Cada um desses operadores não está tomando uma renda; está ocupando uma vaga que é anunciada desde 2008." },
  { p: "Vista assim, a queixa da ITA se inverte. A companhia predecessora abandonou Malpensa para proteger o hub de Roma — e sua sucessora agora se opõe porque outra empresa serve, de Malpensa, mercados que Roma nunca serviu. Os 150 mil passageiros roteados anualmente por Madrid e Paris não são uma ameaça criada pela Emirates. São a fatura anual ainda em aberto por uma decisão tomada dezoito anos atrás." },
  { h: "A outra metade do continente" },
  { p: "Os leitores desta página conhecem nossa tese recorrente: o Brasil concentra cerca de metade do PIB da América do Sul, e a outra metade não é uma nota de rodapé — é um mercado estruturado de forma diferente. É revelador que o primeiro novo nó Europa–América do Sul em discussão a partir de Milão não seja brasileiro. De Malpensa, o único voo direto para o continente hoje é o serviço LATAM para São Paulo. A lista de opções da Emirates para futuras rotas de quinta liberdade, segundo as fontes do Corriere, inclui São Paulo — mas também Santiago, Cidade do México e Los Angeles." },
  { p: "Analistas citados na matéria notam que a América Latina é atualmente o mercado que mostra os melhores yields econômicos. Quando uma companhia com a disciplina de rede da Emirates começa a acumular opções de quinta liberdade através do Atlântico, não é sentimentalismo. É uma aposta calculada de que o corredor Europa–América Latina está subatendido em relação ao que rende." },
  { h: "Quem se complica" },
  { p: "A ITA Airways — hoje 41% da Lufthansa, caminhando para 90% no início de 2027 — vem construindo sua própria expansão latino-americana a partir de Roma Fiumicino, com Santiago entre as adições planejadas. Um Malpensa–Lima direto operado por uma companhia do Golfo drenaria exatamente o feed do norte da Itália que torna marginalmente viáveis as rotas de longo curso de Roma. O diretor executivo da SEA, Armando Brunini, já havia dito ao Corriere que o foco de Malpensa agora seria a América do Sul. Sobre este dossiê, o operador aeroportuário de Milão e a companhia de bandeira quase-milanesa estão em lados opostos." },
  { p: "Há um paradoxo que vale sublinhar. Segundo a Aeroin, nenhuma companhia do Grupo Lufthansa serve Lima — nem de Frankfurt, nem de Munique, nem de Zurique. O grupo que em breve deterá 90% da companhia de bandeira italiana não tem produto no mercado que gostaria de defender. A objeção à Emirates em Milão–Lima não é \"nós servimos este mercado melhor\"; é \"preferiríamos que este mercado continuasse se conectando pelo hub de outro alguém\" — e nem mesmo, hoje, pelo próprio da Lufthansa." },
  { h: "O que isso significa para os agentes do corredor" },
  { p: "Para as empresas com as quais trabalhamos, três leituras práticas." },
  { p: "Conectividade é regulatória antes de ser comercial. A restrição vinculante em Milão–Lima nunca foi a demanda — 150 mil passageiros anuais provam isso. Era uma assinatura em um anexo bilateral. Janelas como esta se abrem por ato administrativo e podem se fechar da mesma forma; os operadores que se beneficiam são os que observam a papelada, não os que esperam o comunicado à imprensa." },
  { p: "As porões são infraestrutura. A autorização em discussão cobre passageiros e carga. Um widebody direto entre Lombardia e Peru é capacidade de exportação para perecíveis, peças de maquinaria e farmacêuticos em ambas as direções — capacidade que hoje se roteia por hubs de terceiros com os custos de tempo e movimentação que isso implica." },
  { p: "Observem a lista de opções, não apenas a manchete. Se Santiago, Cidade do México e São Paulo de Malpensa estiverem realmente em estudo, o mapa da conectividade Europa–América Latina está sendo redesenhado por uma companhia de nenhum dos dois continentes. Para quem estiver planejando entrada em mercado em qualquer lado do Atlântico, a suposição de que \"você se conecta por um hub europeu\" tem prazo de validade." },
  { p: "A rota já existe. A questão que os reguladores estão prestes a responder é apenas quem será pago por ela." },
  { p: "Fontes: Corriere della Sera (Leonard Berberi, 12 de agosto de 2026), com dados de rota atribuídos pelo Corriere à Cirium; Italiavola (12 de agosto de 2026); Aeroin (12 de agosto de 2026); arquivo do Gulf News sobre o caso Assaereo e as declarações de Tim Clark." },
];

export default function LimaBR() {
  const { lang, setLang } = useT();
  const article = getArticleBySlug("lima_br");
  const desc =
    "Todo ano 150 mil pessoas voam entre Milão e Lima, e nenhuma companhia serve a rota. Por que a opção fifth-freedom da Emirates é uma disputa por uma renda que a Itália deixou vaga em 2008.";
  useCanonical("/lima_br", {
    title: `${TITLE} — Business Matching Global`,
    description: desc,
    type: "article",
  });

  useEffect(() => {
    const previous = lang;
    if (lang !== "pt") setLang("pt");
    return () => {
      if (previous !== "pt") setLang(previous);
    };
  }, [lang, setLang]);

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
