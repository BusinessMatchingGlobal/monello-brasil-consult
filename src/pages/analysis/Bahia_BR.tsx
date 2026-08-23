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

const TITLE = "O desconto que era um balanço";

const BACK = {
  it: "Torna alle analisi",
  en: "Back to analysis",
  pt: "Voltar às análises",
} as const;

const body: Block[] = [
  { p: `Na segunda-feira, 17 de agosto de 2026, com o pedido de recuperação judicial já público e a ação caindo mais de 30%, a maior varejista de eletrodomésticos do Brasil disparou um e-mail promocional prorrogando sua campanha de descontos. Não foi um descuido. Era o plano.` },
  { tag: "#CustoBrasil" },
  { p: `No fim de semana de 16 e 17 de agosto de 2026, o Grupo Casas Bahia protocolou o pedido de recuperação judicial no Foro Central Cível de São Paulo. O pedido foi aprovado por unanimidade pelo conselho e pelo acionista controlador, e comunicado à CVM na noite de domingo. Entraram no perímetro também controladas de logística.` },
  { p: `Este texto, porém, não foi escrito para explicar a RJ ao leitor brasileiro — ele já leu tudo isso nas manchetes. Foi escrito para mostrar como um fornecedor europeu deveria ler o mesmo evento, e o que a leitura europeia costuma errar. Quem vende para o varejo brasileiro a partir de Milão ou Munique enxerga a notícia por um filtro que não funciona aqui — e o custo desse filtro acaba na mesa de negociação.` },
  { p: `Os números da petição: R$ 17,3 bilhões em passivos, dos quais cerca de R$ 16,4 bilhões com credores quirografários, além de R$ 754 milhões em dívidas trabalhistas e R$ 154 milhões com micro e pequenas empresas. Na abertura de segunda, BHIA3 chegou a R$ 0,42 no intradia e fechou a R$ 0,44, queda de 33% no dia, sobre um recuo de quase 80% no ano. A auditoria já havia apontado incerteza relevante sobre a continuidade operacional.` },
  { p: `Há um detalhe técnico na petição que explica o timing melhor do que qualquer um desses números. Os contratos do grupo carregam cláusulas de cross-default e vencimento antecipado — e a própria petição quantifica a exposição: mais de R$ 10 bilhões em contratos financeiros e comerciais poderiam vencer de uma vez. Pior: se os bancos credores retivessem as garantias que detêm sobre recebíveis de cartão e Pix, até 60% da entrada mensal de caixa seria drenada imediatamente, inviabilizando o negócio na hora. O pedido existe para congelar essa cascata antes que ela comece — pede a suspensão de execuções por 180 dias. E a cascata já não era hipotética: quando a petição entrou, notificações de vencimento antecipado já tinham chegado — dos braços brasileiros de Hisense Gorenje e Lenovo, de um fundo credor, do locador de um imóvel logístico. O que reenquadra o evento inteiro: a companhia não protocolou porque parou de gerar caixa — o fluxo de caixa livre de doze meses chega a uns R$ 4 bilhões. Protocolou porque a estrutura do passivo tinha virado uma mola armada, em que o primeiro credor a se mover dispararia todos os outros. E repare na ironia enterrada nesse 60%: a campanha de descontos empurra o cliente para o Pix — exatamente os recebíveis que os bancos seguram como garantia.` },
  { p: `Às 11h49 de Brasília, enquanto isso acontecia, um e-mail de marketing saía para a base da empresa. Assunto: A Invasão ainda não acabou! A Invasão de Ofertas tinha sido prorrogada. Até R$ 2.000 de desconto no Pix. Até 50% com o cupom INVASAO. Válido até as 23h59 daquele mesmo dia. No topo, um banner: Compre pelo WhatsApp.` },
  { p: `A leitura fácil é que o marketing não tinha lido o noticiário. Mas a notícia já tinha doze horas, estava em todas as capas do país, e a campanha foi prorrogada mesmo assim. O pedido na Justiça e o cupom não são uma contradição a ser explicada. São as duas metades de uma única operação de liquidez — e a segunda é de onde o dinheiro realmente vem.` },
  { h: `O que o leitor europeu não sabe sobre a Casas Bahia` },
  { p: `Quase ninguém fora do Brasil conhece o nome, e quase ninguém dentro do Brasil não conhece. Quando apresentamos a empresa a um interlocutor europeu, a régua de tamanho é a MediaWorld na Itália ou a Darty na França — mas a história não se compara a nenhuma das duas, e é a história que carrega a tese.` },
  { p: `A empresa nasceu em 1952 em São Caetano do Sul, fundada por Samuel Klein, imigrante polonês que começou vendendo roupa de cama de porta em porta, parcelando em prestações anotadas num caderno. Os compradores eram, em grande parte, migrantes nordestinos — muitos da Bahia — que tinham vindo para o ABC atrás de emprego na indústria, e a quem nenhum banco emprestava. A loja levou o nome deles.` },
  { p: `É nesse ponto que o interlocutor europeu precisa parar. As grandes varejistas da Europa levam o nome do fundador, da cidade ou da categoria. Esta leva o nome dos clientes que nenhuma instituição queria financiar. O crédito não era um serviço pendurado na loja; o crédito era a razão de a loja existir — e o Baianinho, na porta desde 1979, é o retrato do tomador, não da mercadoria.` },
  { p: `O grupo como existe hoje foi montado em 2010, na fusão da Casas Bahia da família Klein com o Ponto Frio do Grupo Pão de Açúcar. Operou uma década como Via Varejo antes de estender o nome Casas Bahia ao grupo inteiro, e está listado na B3 sob o ticker BHIA3. No fim de 2025 tinha 1.042 lojas. Nove meses depois, está no fórum.` },
  { h: `O que a promoção realmente é` },
  { p: `A Casas Bahia reportou prejuízo líquido de R$ 10,1 bilhões no segundo trimestre de 2026. A maior parte é contábil: baixa de créditos tributários diferidos, ágio, revisão de contratos, custos de reestruturação. A operação em si é menos dramática — a receita líquida até cresceu 1,6%, para R$ 6,98 bilhões, e a margem bruta subiu para 32,9%.` },
  { p: `A linha que importa está em outro lugar. O fluxo de caixa livre do trimestre foi positivo em R$ 798 milhões — e a XP apontou que o resultado veio principalmente de uma redução de R$ 1,2 bilhão nos estoques.` },
  { p: `Leia devagar. O caixa que segurou a empresa em pé no trimestre não foi ganho por um negócio melhor. Foi extraído do armazém. Mercadoria que já estava na prateleira — boa parte financiada por fornecedores — convertida em dinheiro.` },
  { p: `A Invasão de Ofertas não é um comentário sobre a crise. Ela é o mecanismo. O cupom na sua caixa de entrada e os R$ 798 milhões na demonstração de fluxo de caixa são o mesmo evento, visto pelas duas pontas.` },
  { p: `E é por isso que o desconto está ancorado no Pix, e não no crediário.` },
  { h: `A empresa que vendia crédito, não eletrodoméstico` },
  { p: `A Casas Bahia foi construída, desde 1952, sobre o crediário: crédito parcelado próprio, vendido na loja, para clientes que os bancos não atendiam. A geladeira era o pretexto. O produto era o financiamento, e a margem morava nos juros e no seguro de crédito embutido.` },
  { p: `Uma venda no crediário gera um recebível — dinheiro que a empresa vai cobrar ao longo de meses. Esse recebível precisa ser financiado no meio-tempo, e hoje ele é financiado contra uma Selic de 15%. Uma venda no Pix gera caixa no mesmo segundo, sem custo de captação, sem inadimplência, sem aparato de cobrança. Para o leitor europeu, este é o número que precisa ser traduzido: o custo do dinheiro aqui é cerca de cinco vezes a taxa de referência do Banco Central Europeu — e o modelo inteiro do varejo popular brasileiro foi construído em cima dessa variável.` },
  { p: `Ou seja: uma empresa que passou setenta anos ensinando o Brasil a comprar parcelado agora paga R$ 2.000 ao cliente para ele não parcelar. Isso não é promoção. É um modelo de negócio sendo desligado, publicamente, dentro de um banner.` },
  { p: `A própria companhia diz isso. Na petição, descreve a pior crise financeira desde a fundação e sustenta que a alta da Selic a partir de 2021 produziu efeitos especialmente severos porque sua operação é estruturalmente dependente do crediário — o carnê ainda responde por cerca de 16% das vendas. Dezesseis por cento da receita, e o suficiente da equação econômica para afundar o balanço inteiro quando o custo de captação triplica. É a frase que o fornecedor europeu deveria ler duas vezes: uma varejista explicando a um juiz que foi destruída não pelos clientes, não pelos concorrentes, mas pela taxa básica de juros agindo sobre seu modelo de financiamento.` },
  { p: `E nem é a primeira vez que o estoque vira caixa eletrônico. Em 2023, o grupo rodou um plano que fechou 55 lojas, cortou 8,6 mil postos e reduziu estoques em R$ 1 bilhão. Comprou um ano. Em junho de 2024 veio a recuperação extrajudicial. Em agosto de 2026, o fórum.` },
  { h: `A armadilha do outro lado` },
  { p: `O plano de reestruturação anunciado em agosto — a "Fase 2" — inclui reduzir gradualmente a exposição ao fornecedor convênio, o risco sacado: o banco antecipa o pagamento ao fornecedor e a varejista acerta com o banco depois. Na prática, é o fornecedor financiando a prateleira da varejista por meio de um intermediário bancário. E é também, numa reestruturação, uma das primeiras coisas a sumir — porque os bancos param de conceder exatamente quando mais faria falta.` },
  { p: `A preocupação da XP era essa — a corretora colocou rating e preço-alvo em revisão, citando o risco de os fornecedores apertarem ainda mais as condições agora que a reorganização é pública, espremendo a disponibilidade de produto rumo ao quarto trimestre: Black Friday e Natal, os dois meses que carregam o ano do varejo. Ao mesmo tempo, abria-se um segundo front, com sindicatos preparando ação coletiva sobre as demissões de agosto.` },
  { p: `Junte as duas metades e o desenho da armadilha aparece. Você esvazia o estoque para gerar caixa. O pedido na Justiça protege dos credores. Mas o mesmo pedido é a razão pela qual ninguém vai reabastecer a prateleira a tempo da única estação que paga.` },
  { p: `A empresa sabe. No release do segundo trimestre, reconhece que certas mercadorias já fazem falta em determinados canais de venda — e os números por trás dessa admissão agora são públicos: o valor de estoques disponíveis caiu mais de 20% no trimestre, e o prazo de estoque encolheu de 95 dias no fim de março para 75 no fim de junho. E, horas depois de o pedido se tornar público, veio à tona que a Casas Bahia começou a estruturar um empréstimo de cerca de R$ 1 bilhão, com fundos e bancos, com o objetivo específico de reforçar o estoque.` },
  { p: `Quem espera na fila de credores torna o ponto concreto. O maior credor individual listado é uma seguradora — a unidade brasileira da Zurich, com R$ 1,98 bilhão. Ao redor estão bancos e fundos, e entre os primeiros nomes sentam os fabricantes: Samsung com cerca de R$ 938 milhões, Whirlpool com R$ 801 milhões, Electrolux com R$ 700 milhões, LG com R$ 624 milhões, Motorola com R$ 619 milhões — descendo até a Apple, com R$ 183 milhões. Os dezenove maiores credores sozinhos respondem por 70% do passivo. E os R$ 17,3 bilhões dentro do processo nem são o quadro inteiro: quase R$ 11 bilhões a mais ficam fora, como créditos extraconcursais — sobretudo bancos com propriedade fiduciária sobre recebíveis de cartão, arrendamento e adiantamentos de câmbio, que a recuperação não alcança. O Banco Digio, maior credor bancário do grupo com R$ 3,28 bilhões, tem R$ 2,62 bilhões estacionados nessa camada protegida. A fila que se vê é longa; mas os créditos mais bem posicionados são os que nem precisam entrar nela.` },
  { p: `E aqui o e-mail promocional fecha o próprio ciclo: a geladeira em destaque era uma Brastemp — marca da Whirlpool. A geladeira com desconto à vista e o recebível de R$ 800 milhões congelado no fórum pertencem ao mesmo fornecedor. É a lição número dois deste artigo, fotografada.` },
  { p: `A forma desse empréstimo importa mais do que o valor. Ele está sendo montado como financiamento DIP — debtor-in-possession, importado da prática americana e escrito na lei brasileira pela reforma de 2020 da Lei de Falências. Dinheiro novo emprestado a uma empresa já sob proteção judicial ganha natureza extraconcursal: é pago antes dos credores que já estavam lá, e mantém essa prioridade mesmo se a recuperação fracassar e virar falência. É o instrumento que mantém uma reestruturação viva — e funciona precisamente porque fura a fila.` },
  { p: `É também a última porta que restou. Nos meses anteriores, a companhia tentou uma oferta de ações — a janela de mercado fechou em abril — e uma captação internacional com um grande banco global como âncora, que não andou. As conversas agora são com Bradesco e Banco do Brasil; a empresa estima a necessidade imediata em cerca de R$ 400 milhões de estoque adicional; e, em paralelo, está telefonando para os fabricantes chineses e, detalhe revelador, para as seguradoras de crédito que garantem as linhas dos fornecedores à indústria eletrônica. É a ligação que o exportador europeu deveria notar: se a prateleira volta a encher não depende só de quem empresta. Depende de uma seguradora continuar cobrindo a sua fatura.` },
  { p: `Agora segure três fatos juntos. R$ 1,2 bilhão de estoque virou caixa no trimestre, e foi isso que manteve a empresa respirando. R$ 16,4 bilhões de créditos quirografários estão congelados na recuperação. E cerca de R$ 1 bilhão de dinheiro novo está sendo levantado para repor o estoque — dinheiro que vai passar na frente de todos eles.` },
  { p: `A campanha de descontos não resolveu nada. Ela moveu o problema do armazém para o passivo financeiro, cobrou do cliente um cupom de 50% pela transferência, e cada etapa do remédio empurra o fornecedor preexistente um degrau para baixo na fila.` },
  { p: `Os cortes de agosto fecharam 298 das 1.042 lojas que o grupo tinha no fim de 2025, com demissões reportadas em torno de 1,9 mil pela imprensa e estimadas em cerca de 3 mil pela própria companhia, num quadro de pouco mais de 30 mil funcionários. Em abril de 2024, a recuperação extrajudicial homologada já havia reperfilado cerca de R$ 4,8 bilhões e esticado o prazo médio da dívida de 22 para 72 meses. Aquele acordo alcançou bancos e debenturistas. Não alcançou locadores, empregados e fornecedores — que é exatamente o conjunto de credores que o fechamento de lojas em massa produz. Daí o fórum.` },
  { p: `E nem é história de uma empresa só. Na mesma semana, a Marabraz também pediu recuperação judicial, e a conta do grande varejo brasileiro passa de R$ 68 bilhões em dívidas reestruturadas em dois anos e meio — da queda da Americanas em 2023, disparada por uma fraude de R$ 43 bilhões, passando por GPA, Tok&Stok, Casa & Vídeo, Dia e Polishop. O fio comum, com ou sem fraude: modelos construídos sobre crédito ao consumidor, capital de giro e financiamento de estoques, atingidos por uma taxa básica que foi de 2% a 15% em cinco anos. A Casas Bahia não é a exceção. É o maior ponto da amostra.` },
  { h: `O grupo de controle` },
  { p: `Antes de concluir que o crédito no varejo brasileiro é simplesmente inviável a essas taxas, olhe o contraexemplo.` },
  { p: `Existe outra grande varejista brasileira, fundada nos anos 1980 em Santa Catarina, ainda do fundador e sem ações em bolsa. Vende para um cliente parecido: famílias do interior, em cidades médias, comprando eletrodomésticos e artigos de casa. Opera cartão próprio e financiamento direto ao cliente, e esse financiamento gerou cerca de R$ 800 milhões de receita financeira no ano passado. Mesmo país, mesma Selic, mesmo perfil de tomador, mesma lógica de parcela.` },
  { p: `Os resultados de 2025: receita líquida de R$ 13,7 bilhões, alta de uns 16%, e lucro líquido de R$ 3,45 bilhões — alta de 28%, o melhor ano da sua história. Fechou o exercício com caixa líquido, tendo quitado as debêntures em circulação, com dívida líquida/EBITDA em menos 0,2. O plano de expansão de 2026 — quinze megalojas novas, mais de um bilhão de reais de investimento — está sendo bancado pelo caixa operacional, e uma análise de crédito nesta primavera concluiu que a empresa aguentaria uma queda de 20% na geração de caixa e ainda executaria o plano. A margem líquida roda acima de 22%, contra um dígito em boa parte do setor listado.` },
  { p: `Duas empresas, um mesmo ambiente de juros, uma mesma base de clientes, uma mesma ideia básica sobre vender parcelado. Uma financiou a prateleira com dinheiro dos outros — bancos, debenturistas e fornecedores via risco sacado — e hoje está no fórum, pedindo licença para tomar um bilhão extraconcursal e repor mercadoria naquela prateleira. A outra financiou a prateleira com lucro retido e este ano gasta um bilhão para construir mais quinze.` },
  { p: `A ressalva honesta: não são negócios idênticos. A lucrativa é uma megaloja de variedades, não uma rede especializada em eletro; vende 95% no físico, apertou deliberadamente os critérios de crédito depois da pandemia e não deve nada a um mercado de capitais que cobra crescimento trimestre a trimestre. Seu crédito é um centro de lucro de verdade, mas uma fatia menor do todo.` },
  { p: `E a ressalva é a tese, não uma proteção. O crediário brasileiro não matou ninguém. A alavancagem matou. Num país onde o dinheiro custa 15%, a varejista que empresta ao próprio cliente precisa ser financiada com capital próprio, não com dívida — porque ela está operando um banco, e um banco financiado com dinheiro emprestado a essas taxas é uma contagem regressiva. Uma empresa leu essa restrição e desacelerou. A outra manteve o ritmo de crescimento e terceirizou a captação: primeiro para debenturistas, depois para fornecedores, e por fim para um juiz.` },
  { h: `O que o fornecedor europeu deveria levar disso` },
  { p: `O instinto em Milão ou em Munique é arquivar o caso como uma grande varejista quebrou, acontece em todo lugar. Acontece. Mas o mecanismo não é o mesmo, e a diferença é operacional, não cultural.` },
  { p: `Num mercado europeu, uma varejista em dificuldade liquidando estoque está vendendo abaixo do custo para fazer caixa. O modelo dela — compra, remarca, vende — está intacto; só o balanço está quebrado. No Brasil, a varejista que desconta para pagamento à vista está desmontando aquilo que a tornava lucrativa, porque o lucro nunca esteve na remarcação. Estava no crédito. No varejo popular brasileiro, a prateleira é um canal de aquisição de clientes para um negócio de empréstimo.` },
  { p: `Para quem vende dentro desse canal a partir da Europa — linha branca, portáteis, móveis — quatro consequências seguem de imediato, e nenhuma aparece no forecast de vendas:` },
  { p: `A solvência do seu distribuidor é uma variável de política monetária, não comercial. Com Selic a 15%, uma varejista cuja margem mora no crédito parcelado é espremida pelo Banco Central, não pela sua tabela de preços.` },
  { p: `Se a sua mercadoria passa por risco sacado, você é um credor. Verifique se o seu recebível brasileiro é crédito comercial ou intermediado por banco, e o que acontece com ele numa recuperação judicial. Quirografário é a posição padrão, e R$ 16,4 bilhões de empresa estão nessa fila sem ninguém na frente — enquanto o dinheiro DIP levantado amanhã vai passar na frente de tudo.` },
  { p: `Um desconto profundo no seu produto é um sinal sobre o caixa do seu comprador, não sobre a sua marca. Quando o desconto é estruturado em torno do pagamento instantâneo, é um evento de liquidez com uma manchete de marketing por cima.` },
  { p: `Observe quem acaba financiando a reposição. Uma varejista em recuperação que precisa de um bilhão de reais para reabastecer as prateleiras vai procurar em três lugares: fundos, bancos e você. Os dois primeiros vão exigir prioridade extraconcursal — e conseguir. Ao terceiro pedem o mesmo dinheiro no fim da fila, e o pedido não vai chegar rotulado como crédito: vai chegar como prazo estendido num pedido grande de fim de ano.` },
  { p: `O e-mail chegou às 11h49, com o pedido já público e a ação caindo um terço. Ninguém estava sendo cínico, e ninguém deixou de ler o noticiário. Alguém estava fazendo a única coisa que resta e que transforma prateleira em dinheiro.` },
];

export default function BahiaBR() {
  const { lang } = useT();
  const article = getArticleBySlug("bahia_br");
  useCanonical("/bahia", {
    title: `${TITLE} | Business Matching Global`,
    description: "Com o pedido de recuperação judicial já público e a ação caindo mais de 30%, a maior varejista de eletrodomésticos do Brasil prorrogou sua campanha de descontos. Não foi descuido: era o plano.",
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
                    atualizado{" "}
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
