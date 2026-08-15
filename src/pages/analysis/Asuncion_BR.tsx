import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useT } from "@/lib/i18n";
import { getArticleBySlug } from "@/lib/analysis";
import { AnalysisFooter } from "@/components/AnalysisFooter";
import { useCanonical } from "@/lib/useCanonical";
import { ShareBlock } from "@/components/ShareBlock";
import { LangSwitcher } from "@/components/LangSwitcher";
import { NewsletterSignup } from "@/components/NewsletterSignup";

type Block = { h: string } | { p: string };

const TITLE = "A porta dos fundos do Brasil";

const BACK = {
  it: "Torna alle analisi",
  en: "Back to analysis",
  pt: "Voltar às análises",
} as const;

const body: Block[] = [
  { p: "Meias, cápsulas softgel e chicotes elétricos para a Stellantis: o que diz de verdade o tráfego sobre o Paraná — o rio de fronteira que separa o Paraguai do Brasil em Ciudad del Este — e por que quem grita sobre isso no Instagram é o pior guia para entendê-lo." },
  { p: "Em fevereiro, um post viralizou nas redes brasileiras: a Lupo, fabricante de meias e roupas íntimas fundada em 1921, estaria \"deixando o Brasil depois de 104 anos\" para levar a produção ao Paraguai. A empresa precisou desmentir publicamente. Não estava indo embora. Estava fazendo duas coisas ao mesmo tempo, e vale a pena olhá-las separadamente." },
  { p: "No Paraguai, em Ciudad del Este, abriu uma planta de R$ 30 milhões sob o regime de maquila — o programa paraguaio que permite importar máquinas e matérias-primas com suspensão de impostos, produzir para exportação e pagar um único tributo de 1% sobre o valor agregado gerado no país: cerca de 110 empregos e capacidade para 20 milhões de pares por ano de meias básicas, o produto mais simples do catálogo, aquele em que só se compete por preço. No Brasil, na base histórica de Araraquara — no interior paulista, onde a empresa nasceu em 1921 —, investiu no mesmo período mais que o dobro: R$ 70 milhões em têxteis técnicos e nas linhas esportivas de maior valor, a parte do catálogo em que se compete por pesquisa, maquinário e marca." },
  { p: "Isso não é êxodo: é divisão do trabalho. O produto pobre vai para onde produzir custa menos; o produto rico fica onde estão o know-how e a marca. E o detalhe que o post viral nunca mencionou é o mais instrutivo. Perguntada sobre o porquê, a presidente Liliana Aufiero — neta de Henrique Lupo, o imigrante italiano que fundou a empresa — não falou em fugir do Brasil. Falou dos concorrentes com quem precisava competir: fabricantes chineses já instalados no Paraguai, que vendiam meias básicas no mercado brasileiro a custos inalcançáveis a partir de São Paulo. A travessia do rio não foi fuga. Foi perseguição." },
  { p: "Guarde essa inversão, porque ela reescreve todo o resto da história. O Paraguai costuma ser descrito como o refúgio barato do Brasil. É mais preciso descrevê-lo como a porta dos fundos do Brasil — e a fila diante da porta não é feita só de brasileiros." },
  { h: "Uma porta com a assinatura do dono" },
  { p: "Primeiro os números, que são simples. No Paraguai operam hoje cerca de 320 empresas em regime de maquila; sete em cada dez são brasileiras. O nome, aliás, vem da Idade Média ibérica: a maquila era a porção de farinha que o moleiro retinha como pagamento por moer o grão alheio. O Paraguai virou o moleiro do continente — mói o grão dos outros e fica com a sua parte, o um por cento. No primeiro semestre de 2026, as maquiladoras exportaram mais de US$ 700 milhões, 25% a mais que no ano anterior, e empregam mais de 35 mil pessoas. Uma nova lei, em vigor desde o fim de 2025, estendeu o regime a serviços e tecnologia. E os recém-chegados já não fazem só meia: em agosto a HLCAPS, terceirista brasileira de cápsulas para suplementos, inaugurou em Ciudad del Este uma planta de US$ 8 milhões — 5,5 bilhões de cápsulas softgel por ano, destinadas à América do Sul e, textualmente, aos Estados Unidos." },
  { p: "Agora a pergunta certa: onde termina toda essa produção? Resposta: dois terços dela, no Brasil. E é aqui que o quadro vira de cabeça para baixo. Essa mercadoria volta sem pagar imposto de importação, porque entre países do Mercosul as mercadorias circulam livres — uma regra que o próprio Brasil assinou, em Assunção, em 1991. Em outras palavras: não é capital estrangeiro driblando as defesas brasileiras. São empresas brasileiras deslocando a produção dez quilômetros rio afora e revendendo aos próprios conterrâneos, legalmente e a custo menor, por uma porta que Brasília construiu com as próprias mãos. A porta dos fundos não é um buraco no muro: está na planta original do prédio." },
  { p: "E a fila diante da porta cresce a olhos vistos. A Jussara, laticínio familiar paulista com setenta anos de história e 1,2 milhão de litros processados por dia, negocia uma unidade de US$ 10 milhões para fracionar e embalar leite em pó em Ciudad del Este: destino declarado, cem por cento de retorno ao mercado brasileiro — a média dos dois terços, nesse caso, vira totalidade. E uma conhecida rede varejista brasileira de capital familiar, que gosta como poucas de se enrolar na bandeira, já manda produzir lençóis e toalhas em maquiladoras paraguaias: não é insinuação de concorrente — contou-o publicamente, e com compreensível satisfação, o próprio presidente do Paraguai." },
  { p: "Se a história toda tem um santo padroeiro cômico, são os Irmãos Metralha — Beagle Boys no original. Sessenta anos de cofres arrombados sem sucesso, quando a entrada dos fundos do depósito estava publicada em diário oficial, com a tarifa de um por cento impressa na placa. Nunca lhes faltou audácia. Faltou-lhes assinatura da Gaceta Oficial." },
  { h: "O europeu que já está dentro" },
  { p: "O fenômeno é narrado como assunto brasileiro, mas a lei de maquila não pede passaporte. Em San Lorenzo, uma planta produz há anos, em silêncio, chicotes elétricos automotivos para Stellantis e General Motors. Ela pertence à Leoni — uma empresa alemã. A prova de conceito europeia não é hipótese: está no chão de fábrica, só nunca contratou uma assessoria de imprensa." },
  { p: "Para um fabricante europeu, a arbitragem tem três faces. A primeira é a porta lateral do Mercosul: a tarifa externa comum e o Custo Brasil — o apelido do sobrecusto sistêmico de produzir no país: impostos, burocracia, logística, crédito caro — que barram uma média empresa europeia no portão da frente podem ser contornados produzindo no Paraguai e entrando no Brasil como mercadoria Mercosul. Com um tecnicismo decisivo: as regras de origem. A simples montagem leve de componentes e semiacabados europeus não confere origem Mercosul, e o produto paga a tarifa externa mesmo assim; o modelo só funciona onde o valor agregado local — mão de obra, eletricidade, insumos regionais — supera os limiares. É análise caso a caso, e é exatamente aí que mora o trabalho de verdade." },
  { p: "Sobre a eletricidade, vale abrir um parêntese, porque é a engrenagem menos contada de todo o mecanismo. Itaipu, a hidrelétrica binacional sobre o Paraná, pertence metade ao Paraguai; mas o tratado de 1973 impõe que a energia não consumida em casa seja cedida ao Brasil a um preço administrado — fixado pelo próprio tratado, não pelo mercado. Por meio século, portanto, o excedente paraguaio partiu para o Brasil em condições impostas. Cada fábrica que se instala no Paraguai inverte a conta: a energia que ela consome deixa de ser excedente cedido a preço tabelado e vira valor agregado paraguaio, revendido a preço de mercado dentro das meias e das cápsulas. A conta fecha para os dois lados: o Estado para de entregar barato uma fatia do excedente, e a fábrica ainda paga uma eletricidade industrial sensivelmente mais barata que a brasileira. É a rara arbitragem em que o dono da casa ganha tanto quanto o hóspede — o que explica por que a porta paraguaia não é apenas tolerada: é anunciada pelo porteiro. Atrair indústria é o jeito que Assunção encontrou de renegociar Itaipu sem tocar no tratado: não contesta a cláusula — reduz o excedente ao qual a cláusula se aplica. A maquila, vista daqui, é também uma arbitragem energética disfarçada de regime fiscal." },
  { p: "A segunda face olha para o norte, e convém ser preciso na conta. Quem exporta para os Estados Unidos paga a tarifa aduaneira ordinária, que depende do produto e costuma ser de um dígito. O problema de 2026 não é essa base: são as camadas que Washington empilhou por cima. Na rodada em vigor desde 24 de julho, uns sessenta países ganharam uma sobretaxa entre 10% e 12,5% — Argentina e União Europeia na faixa de baixo, China e outros na de cima, o Brasil na pior, com acréscimos que em alguns produtos chegam a 25%. O Paraguai não aparece em lista nenhuma: quem exporta de Assunção paga só a tarifa-base que vale para todos, sem camada adicional. O diferencial em relação ao Brasil, portanto, não é privilégio escrito em tratado — um acordo de livre comércio nem poderia existir, a tarifa externa comum do Mercosul o proíbe. É uma isenção de fato, fruto de bom comportamento geopolítico, revogável com a mesma caneta que a concedeu. O plano da HLCAPS de atender os Estados Unidos a partir de Ciudad del Este é essa aritmética convertida em concreto: a mesma cápsula, a mesma base aduaneira, menos dez a vinte e cinco pontos de camada punitiva." },
  { p: "A terceira face é a que quase ninguém na Europa precificou ainda: o acordo UE-Mercosul, que o Paraguai foi um dos primeiros a ratificar. Quando entrar em vigor, componentes e matérias-primas europeias entrarão no Paraguai com tarifas reduzidas — e a combinação de insumos preferenciais na entrada com tratamento de maquila na saída é uma configuração que hoje existe sobretudo em papéis que ninguém se deu ao trabalho de ler lado a lado." },
  { h: "Concreto embaixo dos fluxos" },
  { p: "Quando o capital privado abre um corredor, os governos mais cedo ou mais tarde aparecem para despejar concreto embaixo dele. Em agosto, o governador de Santa Catarina voou a Assunção — com o presidente da federação das indústrias do estado — para propor, entre sete temas, uma nova ponte. Olhe o mapa e sorria: Santa Catarina não faz fronteira com o Paraguai. A ligação proposta, de Mayor Otaño a El Dorado, atravessa a província argentina de Misiones, que não entra nem com a demanda nem com a oferta: só com a geografia, e com os pedágios. A troca declarada é transacional — uma rota mais curta para o milho paraguaio rumo ao complexo de proteína animal catarinense, e os portos de Santa Catarina somados à curta lista que o Paraguai usa hoje para seu comércio marítimo. O contexto não declarado é que os fabricantes catarinenses, nomes do têxtil incluídos, já produzem do outro lado do rio. O estado que não conseguiu segurar todas as fábricas decidiu ser dono da logística: se não pode ser a planta, seja o portal. Seria a quarta ponte entre os dois países — depois da Ponte da Amizade, de 1965, e da nova Ponte da Integração, ambas em Foz do Iguaçu, e da ponte da Rota Bioceânica em Porto Murtinho, mais ao norte — e a primeira concebida não para ligar vizinhos, mas para encurtar uma arbitragem." },
  { h: "Os vendedores de pás e peneiras" },
  { p: "Um último dado, talvez o mais eloquente. A cada dia cresce o número de influenciadores brasileiros que vivem de promover o Paraguai — o um por cento, o \"triplo de dez\", o pacote abra-sua-empresa-em-Assunção. Virou profissão. Em toda corrida do ouro, o negócio mais seguro nunca foi cavar: era vender pás — o acesso — e peneiras, a lisonjeira ilusão do discernimento, o curso e a \"mentoria\" que supostamente ensinam a separar a pepita da lama. Vale lembrar como aquela história terminou: os garimpeiros, em sua maioria, morreram pobres, e o homem que vendia calças resistentes se chamava Levi Strauss." },
  { p: "E a venda de pás está até se automatizando. Um teste publicado pela Folha de S.Paulo nestes dias colocou quatro chatbots de inteligência artificial diante de um perfil fictício — 28 anos, 125 quilos, prescrição médica de tirzepatida, orçamento insuficiente para o Mounjaro: dois recomendaram as canetas emagrecedoras paraguaias — a tirzepatida é patenteada no Brasil, mas patentes são direitos territoriais: do outro lado do rio, cinco laboratórios locais produzem versões com registro válido na Dinavisa, a agência sanitária de Assunção, e nenhum registro na Anvisa, o que as torna ilegais no Brasil; um chatbot as mencionou só para desaconselhá-las por completo; um se recusou a responder. \"Uma espécie de loteria de segurança para quem pergunta\", definiu o pesquisador do InternetLab — centro de estudos independente de São Paulo sobre direito e tecnologia — ouvido pelo jornal. E o paradoxo é que nem se trata de camelô de fronteira: uma análise da Unicamp para o mesmo jornal confirmou que as versões paraguaias contêm tirzepatida de verdade — sem poder dizer nada, porém, sobre impurezas, esterilidade, eficácia ou segurança — e os laboratórios de Assunção chegam a conduzir ensaios clínicos públicos sobre os próprios produtos, enquanto a dona da patente os chama de falsificações. Um ecossistema farmacêutico paralelo que se autolegitima um registro por vez. Mas atenção à diferença, porque ela é toda a tese deste texto: as canetas não são a porta dos fundos — são o seu duplo de contrabando. O regime de maquila é uma porta legal, publicada em diário oficial com a tarifa na placa; um medicamento sem registro é ilegal de possuir no Brasil por mais cuidadosa que tenha sido a compra do outro lado da fronteira. O canal de promoção — influenciador ontem, algoritmo hoje — é o mesmo para as duas portas, e é exatamente esse o problema: quem vende pá não distingue entre o filão legal e o que termina apreendido na alfândega. Distinguir é trabalho de outra pessoa." },
  { p: "A profissionalização da promoção diz duas coisas ao mesmo tempo. Certifica a escala — ninguém constrói uma indústria em torno da propaganda de um fenômeno marginal. E dispara uma contagem regressiva. Na informática, quando uma porta dos fundos é descoberta e comentada demais, o dono do sistema mais cedo ou mais tarde a fecha com um patch — a correção que sela a falha. Aqui funciona igual: um atalho gritado todo dia em um milhão de feeds é um atalho a caminho de virar questão política em Brasília, e questões políticas são a antessala da correção. O episódio Lupo mostra o mecanismo em miniatura — uma decisão industrial cheia de nuances, metade da qual era um investimento maior dentro do Brasil, comprimida pela economia do engajamento em \"empresa abandona o Brasil depois de 104 anos\": uma afirmação tão errada que a empresa precisou desmenti-la por escrito." },
  { p: "O que sugere uma regra de aplicação geral, oferecida aqui gratuitamente: as decisões importantes da vida — e transferir uma linha de produção é uma delas — não se tomam seguindo influenciador." },
  { p: "Considere esta página, então, o trabalho de um desinfluenciador. Aqui ninguém ganha quando você atravessa o rio, e ninguém ganha se você fica em casa; as únicas assinaturas por trás desta análise são as dos diários oficiais aduaneiros, dos registros das maquilas e das tabelas tarifárias, lidos lado a lado até admitirem alguma coisa. É uma estrutura de incentivos diferente, e estruturas de incentivo são um destino. Quem é pago cada vez que alguém atravessa — por comissão, por publicidade, por clique — sempre dirá que atravessar vale a pena: o ganho dele termina na soleira, e o que acontece com você depois não é problema dele. A análise, ao contrário, só come se você ainda estiver de pé anos depois da travessia. E quem tem esse incentivo é obrigado a cuidar das coisas chatas que decidem a sua sobrevivência: as regras de origem, os prazos dos regimes, a caneta — em Washington como em Brasília — que pode fechar tudo com uma assinatura. Porque toda porta dos fundos só fica aberta enquanto o dono do sistema decide não fechá-la. A posição sensata, então, não é nem correr porta adentro nem dar lição de moral à distância: é ficar na soleira e vigiar as dobradiças, isto é, os sinais que dizem se a porta está para se mover. De preferência ao lado de alguém que as observa há algum tempo." },
  { p: "A Business Matching Global analisa os corredores — e as portas laterais — entre a Europa e a América do Sul, enquanto permanecem abertos." },
];

export default function AsuncionBR() {
  const { lang } = useT();
  const article = getArticleBySlug("asuncion_br");
  const desc =
    "O Paraguai não é o refúgio barato do Brasil; é a porta dos fundos. Por que Lupo, HLCAPS, Jussara, Leoni e Stellantis estão cruzando o Paraná, o que a lei do Mercosul realmente permite e por que a economia de influenciadores é o pior guia para entendê-lo.";
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
          <p className="text-xs text-foreground/70 mb-10 tabular-nums">
            {article?.date && (
              <>
                {article.date}
                {article?.updated && (
                  <span className="ml-2 text-foreground/50">
                    (atualizado em {article.updated})
                  </span>
                )}
              </>
            )}
          </p>
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
        <NewsletterSignup />
        <AnalysisFooter />
      </div>
    </main>
  );
}
