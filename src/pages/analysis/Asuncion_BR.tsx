import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useT } from "@/lib/i18n";
import { getArticleBySlug } from "@/lib/analysis";
import { AnalysisFooter } from "@/components/AnalysisFooter";
import { useCanonical } from "@/lib/useCanonical";
import { ShareBlock } from "@/components/ShareBlock";
import { LangSwitcher } from "@/components/LangSwitcher";

type Block = { h: string } | { p: string };

const TITLE = "A porta dos fundos do Brasil";

const BACK = {
  it: "Torna alle analisi",
  en: "Back to analysis",
  pt: "Voltar às análises",
} as const;

const body: Block[] = [
  { p: "Meias, cápsulas softgel e chicotes elétricos para a Stellantis: o que o tráfego sobre o Paraná realmente diz — e por que quem grita sobre isso no Instagram é o pior guia para entendê-lo." },
  { p: 'Em fevereiro, um post viralizou nas redes brasileiras: a Lupo, fabricante de meias e roupas íntimas fundada em 1921, estaria "deixando o Brasil depois de 104 anos" para levar a produção ao Paraguai. A empresa precisou desmentir publicamente. Não estava indo embora. O que ela de fato havia feito era abrir uma planta em Ciudad del Este — trinta milhões de reais, cerca de cento e dez empregos, capacidade para vinte milhões de pares de meias básicas por ano sob o regime de maquila — enquanto investia mais que o dobro, setenta milhões, na base histórica de Araraquara, em têxteis técnicos e nas linhas de maior valor da Lupo Sport.' },
  { p: "Isso não é êxodo. É divisão do trabalho: produção commodity numa margem do rio, engenharia e marca na outra. E o detalhe que o post viral nunca mencionou é o mais instrutivo. Perguntada sobre o porquê, a presidente da Lupo, Liliana Aufiero — neta de Henrique Lupo, o imigrante italiano que fundou a empresa — não falou em fugir do Brasil. Falou dos concorrentes que precisava alcançar: fabricantes chineses já instalados no Paraguai, já vendendo meias básicas no mercado brasileiro a custos inalcançáveis a partir do interior paulista. A travessia do rio não foi fuga. Foi perseguição." },
  { p: "Guarde essa inversão, porque ela reescreve todo o resto da história. O Paraguai costuma ser descrito como o refúgio barato do Brasil. É mais preciso descrevê-lo como a porta dos fundos do Brasil — e a fila diante da porta não é feita só de brasileiros." },
  { h: "Uma porta com a assinatura do dono" },
  { p: "Primeiro os números. O regime de maquila paraguaio abriga hoje cerca de 320 empresas; aproximadamente sete em cada dez são brasileiras. No primeiro semestre de 2026, as maquiladoras exportaram mais de setecentos milhões de dólares, um quarto a mais que no ano anterior, e o regime sustenta mais de trinta e cinco mil empregos, crescendo cerca de dez por cento ao ano. Uma nova lei de maquila, em vigor desde o fim de 2025, substituiu a original de 1997 e estendeu o regime a serviços e tecnologia. O tributo é um só: um por cento sobre o valor agregado. E os recém-chegados estão subindo na cadeia de valor: em agosto, a fornecedora farmacêutica brasileira HLCAPS inaugurou em Ciudad del Este uma planta de oito milhões de dólares para produzir cinco bilhões e meio de cápsulas softgel por ano — declarando, sem alarde, que a unidade atenderá a América do Sul e os Estados Unidos." },
  { p: "E aqui está a parte que se perde na indignação: essa porta dos fundos foi escrita pelo próprio Brasil. A livre circulação que permite à produção das maquilas voltar para casa é direito do Mercosul, assinado em Assunção com a caneta do Brasil. E a porta continua aberta porque serve sobretudo aos de dentro: cerca de dois terços de tudo o que as maquiladoras produzem volta direto para o Brasil. Não é capital estrangeiro saqueando o mercado brasileiro. São, esmagadoramente, empresas brasileiras saindo pela porta dos fundos para reentrar pela da frente a custo menor." },
  { p: "Se a história toda tem um santo padroeiro cômico, são os Irmãos Metralha — os Beagle Boys do original. Sessenta anos de assaltos fracassados, porque insistiam em arrombar a frente de um cofre cuja entrada dos fundos estava publicada em diário oficial, com a taxa de um por cento impressa na placa. Nunca lhes faltou audácia. Faltou-lhes assinatura da Gaceta Oficial." },
  { h: "O europeu que já está dentro" },
  { p: "O fenômeno é narrado como assunto brasileiro, mas a lei de maquila não pede passaporte. Em San Lorenzo, uma planta produz há anos, em silêncio, chicotes elétricos automotivos para Stellantis e General Motors. Ela pertence à Leoni — uma empresa alemã. A prova de conceito europeia não é hipótese: está no chão de fábrica, só nunca contratou uma assessoria de imprensa." },
  { p: "Para um fabricante europeu, a arbitragem tem três faces. A primeira é a porta lateral do Mercosul: a tarifa externa comum e o Custo Brasil que barram uma média empresa europeia no portão da frente do Brasil podem ser contornados produzindo no Paraguai e entrando no Brasil como mercadoria Mercosul — com um tecnicismo decisivo. As regras de origem. A simples montagem leve de insumos europeus não confere origem Mercosul, e o produto paga a tarifa externa mesmo assim; o modelo só funciona onde o valor agregado local — mão de obra, energia a preço de Itaipu, insumos regionais — supera os limiares. É análise caso a caso, e é exatamente aí que mora o trabalho de verdade." },
  { p: "A segunda face olha para o norte. Na rodada tarifária que entrou em vigor em julho, Washington aplicou um mínimo de dez por cento a cerca de sessenta países e até doze e meio por cento — com sobretaxas chegando a vinte e cinco em alguns produtos — a China, Índia, União Europeia e Brasil. O Paraguai ficou fora da lista; seu ministro da Indústria comemora abertamente, observando que cada ponto de tarifa pago por um vizinho é competitividade ganha em Assunção. Não há acordo de livre comércio por trás disso — a tarifa comum do Mercosul o proíbe — apenas um acordo-quadro, um conselho bilateral e um vistoso bom comportamento geopolítico. O plano da HLCAPS de atender os Estados Unidos a partir de Ciudad del Este é essa assimetria convertida em concreto e aço inox." },
  { p: "A terceira face é a que quase ninguém na Europa precificou ainda: o acordo UE-Mercosul, que o Paraguai foi um dos primeiros a ratificar. Quando entrar em vigor, os insumos europeus entrarão no Paraguai com tarifas reduzidas — e a combinação de insumos preferenciais na entrada com tratamento de maquila na saída é uma configuração que hoje existe sobretudo em papéis que ninguém se deu ao trabalho de ler lado a lado." },
  { h: "Concreto embaixo dos fluxos" },
  { p: "Quando o capital privado abre um corredor, os governos mais cedo ou mais tarde aparecem para despejar concreto embaixo dele. Em agosto, o governador de Santa Catarina voou a Assunção — com o presidente da federação das indústrias do estado — para propor, entre sete temas, uma nova ponte. Olhe o mapa e sorria: Santa Catarina não faz fronteira com o Paraguai. A ligação proposta, de Mayor Otaño a El Dorado, atravessa a província argentina de Misiones, que não contribui nem com a demanda nem com a oferta: apenas com a geografia, e com os pedágios. A troca declarada é transacional — uma rota mais curta para o milho paraguaio rumo ao complexo de proteína animal catarinense, e os portos de Santa Catarina somados à curta lista que o Paraguai usa hoje para seu comércio marítimo. O contexto não declarado é que os fabricantes catarinenses, nomes do têxtil incluídos, já produzem do outro lado do rio. O estado que não conseguiu segurar todas as fábricas decidiu ser dono da logística: se não pode ser a planta, seja o portal. Seria a quarta ponte nessa fronteira, e a primeira concebida não para ligar vizinhos, mas para encurtar uma arbitragem." },
  { h: "Os vendedores de pás e peneiras" },
  { p: 'Um último dado, talvez o mais eloquente. A cada dia cresce o número de influenciadores brasileiros que vivem de promover o Paraguai — o um por cento, o "triplo dez", o pacote abra-sua-empresa-em-Assunção. Virou profissão. Em toda corrida do ouro, o negócio mais seguro nunca foi cavar: era vender pás — o acesso — e peneiras, a lisonjeira ilusão do discernimento, o curso e a mentoria que supostamente ensinam a separar a pepita da lama. Vale lembrar como aquela história terminou: os garimpeiros, em sua maioria, morreram pobres, e o homem que vendia calças resistentes se chamava Levi Strauss.' },
  { p: 'A profissionalização da promoção diz duas coisas ao mesmo tempo. Certifica a escala — ninguém constrói uma indústria em torno da propaganda de um fenômeno marginal. E dispara um relógio: uma porta dos fundos gritada diariamente em um milhão de feeds é uma porta a caminho de virar questão política em Brasília, e questões políticas são a antessala das correções. O episódio Lupo mostra o mecanismo em miniatura — uma decisão industrial cheia de nuances, metade da qual era um investimento maior dentro do Brasil, comprimida pela economia do engajamento em "empresa abandona o Brasil depois de 104 anos": uma afirmação tão errada que a empresa precisou desmenti-la por escrito.' },
  { p: "O que sugere uma regra de aplicação geral, oferecida aqui gratuitamente: as decisões importantes da vida — e transferir uma linha de produção é uma delas — não se tomam seguindo influenciador. A porta é real, a placa do um por cento é real, a fábrica alemã que cabeia os carros da Stellantis é real, e igualmente reais são as cláusulas de regras de origem e a caneta, em Washington como em Brasília, que pode fechar tudo. Toda porta dos fundos vive exatamente enquanto o dono do sistema decide não trancá-la. A posição sensata não é correr porta adentro nem moralizar à distância. É ficar na soleira, de olho nas dobradiças." },
  { p: "A Business Matching Global analisa os corredores — e as portas laterais — entre a Europa e a América do Sul, enquanto permanecem abertos." },
];

export default function AsuncionBR() {
  const { lang } = useT();
  const article = getArticleBySlug("asuncion_br");
  const desc =
    "O Paraguai não é o refúgio barato do Brasil; é a porta dos fundos. Por que Lupo, HLCAPS e Leoni estão cruzando o Paraná, o que a lei do Mercosul realmente permite e por que a economia de influenciadores é o pior guia para entendê-lo.";
  useCanonical("/asuncion_br", {
    title: "A porta dos fundos do Brasil: Assunção e o corredor de maquila do Paraguai",
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
          <LangSwitcher to="/asuncion" />
        </div>
        <article className="prose-invert">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4">
            {TITLE}
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
          <ShareBlock title={TITLE} />
        </article>
        <AnalysisFooter />
      </div>
    </main>
  );
}
