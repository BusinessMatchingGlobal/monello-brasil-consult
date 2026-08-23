import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useT } from "@/lib/i18n";
import { getArticleBySlug } from "@/lib/analysis";
import { AnalysisFooter } from "@/components/AnalysisFooter";
import { useCanonical } from "@/lib/useCanonical";
import { ShareBlock } from "@/components/ShareBlock";
import { useEffect } from "react";
import { LangSwitcher } from "@/components/LangSwitcher";

type Block = { h: string } | { p: string };

const body: Block[] = [
  { h: "Antes do tapete vermelho, havia uma casa de palha" },
  { p: "Rolim Adolfo Amaro nasceu em 1942 em Pereira Barreto, no interior profundo do estado de São Paulo, numa casa de sapé sem eletricidade nem banheiro, o mais velho de cinco irmãos. Deixou a escola por volta da sétima série para ajudar nas contas da família — ajudante de mecânico, aprendiz de contabilidade, office boy de banco. Aos dezessete anos tirou o brevê; aos vinte e um pilotava Cessnas de dois lugares para uma empresa de táxi aéreo. Carregou cargas pela Amazônia sem estradas, montou e vendeu sua primeira pequena companhia aérea e, em 1968, entrou como sócio minoritário numa modesta empresa de táxi aéreo de Marília: a Táxi Aéreo Marília. Quatro anos depois, ele a controlava. O mundo a conheceria pelas iniciais — TAM — e a ele, simplesmente, como o Comandante Rolim." },
  { p: "O que ele construiu a partir daquela sigla é história do empresariado brasileiro: os Cessnas com radar que profissionalizaram a aviação regional nos anos 1970, os Fokker F-27 ligando os aeroportos centrais de São Paulo e do Rio nos anos 1980, os jatos Fokker 100 de 1990 que levaram aviação de alto padrão a rotas que ninguém achava merecedoras — e, por fim, a companhia que ultrapassaria os gigantes. Morreu como os pilotos temem e como as lendas ganham sua forma definitiva: um acidente de helicóptero, em 8 de julho de 2001, aos 58 anos. O velório foi no hangar da TAM em Congonhas, no mesmo pátio onde se estendia o tapete vermelho. Um quarto de século depois, as escolas de negócios brasileiras ainda o ensinam, um aeroporto leva seu nome e uma honraria estadual criada em 2025 carrega seu título. Esta publicação o estuda por uma razão mais específica: ninguém, na história deste corredor, entendeu melhor os custos que nunca aparecem em fatura nenhuma." },
  { h: "A primeira intuição: o tapete" },
  { p: "A história já foi contada muitas vezes, inclusive por nós: um humilde capacho ao pé da escada de embarque, colocado para que os passageiros limpassem os sapatos, e um dono que olhou para ele e enxergou outra coisa completamente diferente. A partir de 1989, o tapete vermelho na porta da aeronave — muitas vezes com o próprio Rolim ao lado, apertando mãos e distribuindo balas — tornou-se o símbolo comercial mais reconhecível da aviação brasileira." },
  { p: "O que importa é a intuição por baixo. No Brasil daquela época — uma economia fechada em que, como escreveu um de seus biógrafos, o consumidor era tratado como um incômodo inevitável — Rolim decidiu que o passageiro era o ponto. Seu credo declarado era de uma simplicidade desarmante: trate o cliente como você gostaria de ser tratado. O tapete não era decoração: era a ponta visível de um sistema operacional. Dizia ao passageiro você é recebido, não processado — e, com a mesma deliberação, dizia a cada funcionário da TAM que observava qual era o padrão que o chefe esperava. Um símbolo que disciplina o lado de dentro enquanto seduz o lado de fora não é despesa de marketing. É cultura, comprada pelo preço de um tapete." },
  { h: "A segunda intuição: o boca a boca" },
  { p: "A segunda intuição de Rolim era sobre mídia. Publicidade se compra; recomendação se conquista — e, num negócio de relacionamento, a segunda se capitaliza enquanto a primeira se deprecia. Ele desenhou a companhia para que o próprio passageiro fizesse a propaganda: o tapete, as balas, o padrão de serviço e, acima de tudo, a acessibilidade radical do topo. Em 1991 criou um serviço cujo nome dispensa explicação — Fale com o Presidente: uma linha direta pela qual qualquer passageiro podia alcançá-lo. Ficou famoso por repetir que o cliente nunca interrompe o trabalho, porque o cliente é o trabalho." },
  { p: "Lida como estratégia, e não como sentimento, é economia de precisão: cada reclamação resolvida transformava um detrator em um contador de histórias, e cada história vendia assentos que nenhuma verba de mídia alcançaria. A TAM cresceu até se tornar a líder do Brasil competindo contra rivais maiores, mais antigas e mais bem relacionadas. O boca a boca era a rede de distribuição." },
  { h: "Os sete mandamentos" },
  { p: "Em 1997, ele destilou sua doutrina nos Sete Mandamentos — que guiaram a gestão da TAM e são citados nas salas de reunião brasileiras até hoje. Listados secos, metade deles soa como o oposto do que queriam dizer. Merecem explicação um a um — porque a tensão entre eles é a própria doutrina." },
  { p: "1. Nada substitui o lucro. O mais mal lido dos sete: colocado em primeiro lugar pelo homem do tapete vermelho, soa como cinismo — e é o oposto. Sem lucro, nada mais existe: nem o serviço, nem a segurança, nem os salários, nem o próprio tapete. O lucro não é a meta oposta ao cliente; é a condição que permite servi-lo amanhã. Uma companhia deficitária que mima seus passageiros está apenas escolhendo a data do próprio funeral." },
  { p: "2. Em busca do ótimo não se faz o bom. O perfeccionismo como forma de paralisia. Quem espera a solução impecável nunca entrega a boa que era necessária hoje — e, enquanto isso, um concorrente com algo medíocre porém existente já tomou o mercado. Execute o bom agora; melhore depois." },
  { p: "3. Mais importante que o cliente é a segurança. O único limite ao \"cliente é rei\". O passageiro tem razão sobre tudo — horários, serviço, cortesia — menos sobre uma coisa: quando a segurança diz não, é não, por mais alto que ele proteste e custe o que custar. É também uma hierarquia moral: a vida dele vale mais que a satisfação dele." },
  { p: "4. A maneira mais fácil de ganhar dinheiro é parar de perder. Antes de correr atrás de receita nova, tampe os vazamentos — desperdício, ineficiência, erros repetidos. Mas a leitura mais profunda, a que faz de Rolim, Rolim, é que as maiores perdas são as invisíveis: o passageiro perdido para sempre depois de um cancelamento mal conduzido não aparece em balanço nenhum — e é a linha de perda mais cara que uma companhia aérea tem. \"Parar de perder\" vale para os dois livros contábeis: o que o contador vê e o que ele não vê." },
  { p: "5. Pense muito antes de agir. O contrapeso do mandamento 2: execute rápido, decida devagar. As decisões estruturais — uma frota, uma rota, uma aquisição — se pesam longamente, porque na aviação um erro estratégico se paga por uma década. Juntos, o 2 e o 5 formam o par: deliberação lenta, execução rápida. Nunca o contrário." },
  { p: "6. A humildade é fundamental. Vinda de um homem que começou numa casa de sapé, não era retórica. Significava três coisas operacionais: ouvir a linha de frente (um presidente que atende o telefone dos passageiros é a humildade institucionalizada); nunca se achar chegado — a arrogância é a antessala do declínio, e o cemitério da aviação está cheio de gigantes que morreram de orgulho; e admitir erros rápido, que é a pré-condição do mandamento 4." },
  { p: "7. Quem não tem inteligência para criar tem que ter coragem para copiar. O mais contracultural: uma demolição do ego criativo. Se alguém, em qualquer lugar, já resolveu o seu problema melhor que você, copiar não é vergonha — é dever para com a empresa. Coragem é a palavra operativa: copiar exige admitir que o outro foi melhor, coisa a que o orgulho gerencial raramente sobrevive. O próprio tapete vermelho, afinal, começou como o gesto humilde de outra pessoa, copiado para cima. Os leitores destas notas reconhecerão a tese: é a transferência de método, enunciada trinta anos antes — o melhor método existente se adota e se adapta, nunca se reinventa por vaidade." },
  { p: "Lidos em sequência, os sete formam um sistema com uma tensão deliberada: os quatro primeiros são dureza econômica; os três últimos, disciplina de caráter. E repare no que a lista não é: o manifesto de um romântico do serviço. O homem do tapete vermelho colocava o lucro em primeiro lugar, a segurança acima do cliente e a cópia pragmática acima da vaidade criativa. É exatamente por isso que o tapete funcionava — nunca foi caridade. Era a linha de maior retorno do orçamento, administrada por alguém que sabia fazer conta. O tapete fica exatamente no ponto onde as duas metades da lista se tocam." },
  { h: "Custos visíveis, custos invisíveis — e os dias em que as coisas quebram" },
  { p: "E aqui está a lição de que este corredor mais precisa. Todo gestor de companhia aérea sabe ler os custos visíveis: combustível, leasing, manutenção, tripulação. O dom mais raro de Rolim era precificar os invisíveis — a impressão dos primeiros três segundos, o passageiro perdido para sempre depois de um cancelamento mal conduzido, a reputação que decide se um atraso é perdoado ou fatal. Seu quarto mandamento — parar de perder — se aplica aos dois livros, e ele sabia que era pelo invisível que as fortunas de fato vazavam. Por isso, os momentos que as outras companhias tratavam como falhas operacionais, ele tratava como a cena mais importante do produto: uma disrupção é o único momento em que o passageiro descobre o que a empresa realmente vende. Conduzida com a lógica do tapete, cria a lealdade mais feroz que existe; conduzida com a lógica da fila, cria as histórias que esvaziam aviões." },
  { p: "Vinte e cinco anos depois de Congonhas silenciar para o seu velório, o setor otimizou quase tudo o que a era de Rolim deixou por otimizar — menos a única coisa que ele otimizou primeiro. Os custos visíveis nunca foram tão bem administrados. Os invisíveis nunca foram tão abandonados." },
  { p: "E talvez seja essa a característica mais contemporânea de um homem nascido numa casa de sapé: ele entendeu que, na aviação — como em todo negócio de relacionamento —, o mandamento do lucro e o tapete não são rivais. Um financia o outro. Ele os escreveu na mesma lista." },
  { h: "Onde a memória vive" },
  { p: "A memória de Rolim tem seus guardiões. O Museu Asas de um Sonho, nascido da sua própria paixão pela história da aviação, segue como referência nacional na preservação do patrimônio aeronáutico brasileiro — e, em 2025, o estado de São Paulo instituiu uma honraria com o seu nome, a Asas de Um Sonho – Mérito Comandante Rolim Adolfo Amaro, concedida a quem leva adiante os valores que ele representava. A Fundação Eductam, criada por ele em vida, canalizou sua outra convicção: bolsas de estudo e trabalho humanitário para quem, como o menino de Pereira Barreto, começou do nada. Um aeroporto em Jundiaí leva seu nome; uma cadeira da Academia Brasileira de Eventos e Turismo leva seu patronato." },
  { p: "As instituições guardam a memória. O método, porém, se guarda do único jeito que métodos sempre se guardaram: praticando. Vinte e cinco anos depois, essa segunda forma de guarda continua aberta a qualquer um, neste setor, que se candidate a ela." },
];

const BACK = {
  it: "Torna alle analisi",
  en: "Back to analysis",
  pt: "Voltar às análises",
} as const;

export default function AmaroBR() {
  const { lang } = useT();
  const article = getArticleBySlug("amaro_br");
  const desc =
    "Rolim Adolfo Amaro, fundador da TAM, o tapete vermelho e os sete mandamentos: como um comandante nascido numa casa de palha precificou os custos que os contadores nunca enxergam.";
  useCanonical("/Amaro_BR", {
    title: `${article?.title[lang] ?? "Amaro"} | Business Matching Global`,
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
          <LangSwitcher to="/amaro" />
        </div>
        <article className="prose-invert">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4">
            {article?.title[lang]}
          </h1>
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
          <ShareBlock title={article?.title[lang] ?? "Amaro"} />
        </article>
        <AnalysisFooter />
      </div>
    </main>
  );
}
