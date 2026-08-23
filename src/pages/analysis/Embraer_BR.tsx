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
  { h: "I. O monopólio que ninguém observa" },
  { p: "No mundo da aviação, os pedidos são contados como sempre foram: Airbus versus Boeing. No entanto, a estatística mais reveladora do setor aeroespacial comercial não pertence a nenhuma das duas. No segmento de 70 a 150 assentos, um único fabricante detém cerca de 76% do mercado. Não é europeu. Não é norte-americano. É a Embraer — uma empresa de São José dos Campos, a uma hora de São Paulo, que opera, na prática, um quase-monopólio na única fatia da aviação comercial em que o duopólio nunca se deu ao trabalho de competir." },
  { p: "O comentário europeu sobre o Brasil escorrega automaticamente para a soja, o minério de ferro e o café. A Embraer é a refutação viva dessa visão: 23 mil funcionários, operações em 23 países, receita de 2025 acima de US$ 7 bilhões e — segundo os resultados do segundo trimestre, divulgados em 24 de julho — uma carteira de pedidos total recorde de US$ 34,5 bilhões, alta de 7% em um único trimestre. Esta análise explica como se chegou até aqui, por que tudo acelerou justamente neste julho e o que isso significa para a indústria europeia." },

  { h: "II. \"Onde está a tecnologia brasileira?\" — a objeção, e a resposta" },
  { p: "Quando publicamos a versão resumida desta análise, um leitor levantou a objeção que merece uma resposta completa, porque é o mal-entendido europeu mais comum sobre a Embraer: se o E2 voa com portas francesas, empenagens espanholas e controles de flap alemães, onde exatamente está a tecnologia brasileira? Nos parafusos e porcas?" },
  { p: "Por essa lógica, a Boeing também não seria americana — o 787 voa com asas fabricadas no Japão e seções de fuselagem italianas — e a Airbus, consórcio de quatro países desde o nascimento, não seria campeã nacional de ninguém. O sourcing global é a forma como todo avião comercial moderno é construído. A lista de fornecedores é a metade fácil do setor." },
  { p: "A tecnologia é tudo aquilo que a lista de fornecedores não mostra. É projetar a asa — a Embraer projeta e fabrica as suas, uma das poucas capacidades que os OEMs jamais terceirizam. É escrever as leis de controle fly-by-wire que decidem como a aeronave se comporta em cada condição de voo. É integrar milhões de peças de dezenas de países em uma única máquina, certificada simultaneamente junto à FAA, à EASA e à ANAC. É responder, comercial e legalmente, por cada célula ao longo de trinta anos de serviço. Milhares de empresas no mundo sabem fabricar portas e atuadores. Exatamente três sabem entregar um avião de linha certificado. Essa escassez — integração de sistemas, autoridade de certificação, responsabilidade pelo produto — é a tecnologia. E, na Embraer, ela fala português." },
  { p: "Guarde essa distinção, porque o restante da análise é a história de como um país adquiriu precisamente essa capacidade escassa." },

  { h: "III. O método antes do produto: 1962–2026" },
  { p: "A sequência importa mais do que as datas. O Brasil não construiu uma fábrica de aviões na esperança de que os engenheiros viessem depois. Construiu primeiro a escola: o ITA, o Instituto Tecnológico de Aeronáutica, fundado no pós-guerra sobre o modelo do MIT. Dos seus formados nasceu o projeto: em 1965, um engenheiro da Força Aérea chamado Ozires Silva liderou uma equipe de trezentas pessoas no centro técnico de São José dos Campos, desenvolvendo um pequeno bimotor turboélice para conectar as cidades que as estradas brasileiras não alcançavam. O protótipo — o Bandeirante — voou em 1968. Só então, em 1969, o Estado criou a Embraer para produzi-lo em série. Primeiro a escola, depois o projeto, por fim a empresa. O Brasil não construiu uma fábrica: construiu um sistema para produzir método aeronáutico — e a fábrica foi a consequência." },
  { p: "O método nunca parou de se capitalizar. Desde 2007, a Embraer opera suas fábricas sob a filosofia lean por meio do P3E, o Programa de Excelência Empresarial modelado no Sistema Toyota de Produção — e, em 2022, foi direto à fonte, assinando um acordo com a Toyota do Brasil para aplicar o TPS diretamente em suas linhas. Os resultados são mensuráveis: um ciclo de construção de 13 meses, com montagem final em cerca de 40 dias; a escassez de motores Pratt & Whitney, que antes deixava mais de um quinto das aeronaves em produção à espera dos propulsores, reduzida a cerca de 1%; os prazos de entrega dos jatos executivos caindo de 18 meses para um dígito; e uma rampa de entregas de 78 jatos comerciais em 2025 para 85 neste ano e mais de 110 no próximo — com a produção total da empresa já crescendo cerca de 20% no primeiro semestre de 2026." },

  { h: "IV. O habitat: por que o mercado de casa do segmento é o melhor do mundo" },
  { p: "A Embraer não é um fornecedor à caça de um mercado: ela está enraizada no mercado aéreo em mais rápida melhoria do planeta." },
  { p: "A geografia latino-americana faz o marketing sozinha. Bogotá e Medellín estão a apenas 250 quilômetros no mapa — mas a estrada é outra história: mais de 400 quilômetros de curvas andinas, oito a nove horas de viagem. O resultado é um dos corredores aéreos mais movimentados do mundo: mais de cem partidas diárias e 3,5 milhões de passageiros por ano, com tarifas de ida e volta em média na casa dos 45 euros. Em todo o continente, o trem de alta velocidade não existe e as rodovias não podem substituí-lo: para uma parcela enorme dos pares de cidades, voar é a única opção viável. Some-se a isso uma classe média em crescimento gerando passageiros de primeira viagem no Brasil, na Colômbia, no Peru e no Chile — a IATA projeta para este ano um crescimento do tráfego regional de 5%, atrás apenas da Ásia-Pacífico, com a demanda premium tendo crescido mais de 22% em 2025, o ritmo mais rápido do mundo." },
  { p: "A virada financeira é igualmente nítida. Um setor que os investidores trataram por uma década como uma classe de ativos em dificuldade usou as reestruturações de Chapter 11 da era pandêmica para zerar dívidas, frotas e contratos de leasing: o lucro operacional regional subiu de US$ 1,1 bilhão em 2019 para US$ 7,1 bilhões em 2025, e Copa, LATAM e Avianca apresentam hoje margens que constrangem muitas grandes companhias europeias e norte-americanas. A ressalva honesta — custos denominados em dólares contra receitas parcialmente em moeda local mantêm a margem líquida projetada perto de 2,1% — explica por que estruturas de baixo emprego de capital ainda importam na região. Para um fabricante cujo portfólio inteiro foi pensado para encher uma aeronave do tamanho certo em rotas densas, de média distância e sem alternativa ferroviária, isso não é um mercado. É um habitat." },

  { h: "V. O paradoxo doméstico — e a semana em que ele acabou" },
  { p: "Eis o fato mais estranho de toda a história: até este mês, o fabricante que detém 76% do segmento global estava quase ausente das frotas das companhias do próprio país. Por anos, apenas a Azul operou jatos Embraer nas rotas comerciais brasileiras; a Gol voa exclusivamente com Boeing 737 desde o início dos anos 2000, e os primeiros E2 da LATAM chegam apenas no fim deste ano." },
  { p: "Farnborough 2026 foi o lugar onde o paradoxo morreu. O Grupo Abra — a holding por trás de Gol, Avianca e da operadora espanhola de ACMI Wamos Air — assinou por 20 E195-E2 firmes, cerca de US$ 1,75 bilhão a preços de tabela, com opções e direitos de compra que elevam o total potencial a 45 aeronaves. As entregas são esperadas a partir do quarto trimestre de 2027; o grupo diz que os jatos poderão voar tanto pela Gol quanto pela Avianca, com os anúncios de rotas a caminho e a Colômbia explicitamente no radar para expansão. Quando o pedido for contabilizado no terceiro trimestre, todos os principais grupos aéreos brasileiros operarão o E2 — e o centro de gravidade do segmento terá completado o retorno para casa." },
  { p: "A Abra merece atenção além deste único pedido. O grupo prepara a listagem em Nova York, avançou sobre a chilena Sky Airline e, no passado, tentou a integração com a Azul. A aviação latino-americana está se consolidando em torno de um punhado de grupos com disciplina de preços — e um mercado em consolidação com uma narrativa de crescimento pré-IPO é exatamente o cliente que transforma a carteira de pedidos de um fabricante em relações de frota que duram décadas." },

  { h: "VI. Farnborough 2026: a carteira de pedidos" },
  { p: "O negócio com a Abra puxou uma colheita mais ampla. Ao longo da feira, a Embraer confirmou 30 pedidos firmes de quatro clientes — os 20 da Abra, cinco E195-E2 para a espanhola Binter, três E190-E2 para a Luxair, dois E175 para a japonesa Fuji Dream Airlines — com opções e direitos elevando o total potencial a 60, além da expansão de junho da lessor Azorra (de 39 para 54 E195-E2 firmes), que já havia levado o programa E2 a superar 500 pedidos acumulados. A Azorra somou um memorando para até 30 conversões E-Freighter, abrindo um segmento de carga entre os grandes turboélices e os cargueiros de corredor único. E, ao lado da carteira de pedidos, emergiu um eixo do Golfo: uma cooperação envolvendo Etihad e Abra, que traz capacidade widebody para o grupo enquanto a Wamos atende a Etihad em ACMI — o tipo de encaixe de frota que sinaliza planejamento de rede de longo prazo, não compras oportunistas." },

  { h: "VII. A escala: o segundo trimestre em quatro números" },
  { p: "O comunicado trimestral de sexta-feira, publicado com a feira recém-encerrada, deu a medida do momento. Carteira total de pedidos: US$ 34,5 bilhões, um recorde, +7% em três meses. Aviação comercial: US$ 15,1 bilhões (os pedidos de Farnborough serão contabilizados apenas no terceiro trimestre). Aviação executiva: US$ 7,8 bilhões, +3%. Serviços e suporte: US$ 5,5 bilhões, +8% — a renda recorrente que se acumula em silêncio por trás de cada entrega. E o motor do trimestre: a defesa, +39%, a US$ 6,1 bilhões, puxada pelo pedido da Força Aérea dos Emirados Árabes Unidos de até 20 transportes C-390 Millennium — o maior pedido internacional da história do modelo. Entre abril e junho foram entregues sessenta e cinco aeronaves. E a previsão de longo prazo da própria empresa, divulgada para a feira, vê demanda de 8.500 jatos comerciais até 2045: uma pista de duas décadas para um segmento que a Embraer já domina." },

  { h: "VIII. O teste das tarifas: três regimes, um só carve-out" },
  { p: "Se você quiser uma medição involuntária, feita por terceiros, do que valem aqueles 76%, não pergunte à Embraer. Pergunte ao Representante de Comércio dos Estados Unidos." },
  { p: "Nos últimos doze meses, Washington reconstruiu três vezes o seu muro tarifário contra o Brasil — e, nas três vezes, recortou nele a mesma porta. A ordem de emergência de julho de 2025, que elevou as tarifas sobre a maioria dos produtos brasileiros a 50%, isentou desde o primeiro dia as aeronaves civis, peças e componentes. O regime global da Seção 122, introduzido em fevereiro de 2026, isentou em bloco aeronaves comerciais, motores e peças aeroespaciais — um carve-out mais amplo do que os concedidos à União Europeia, ao Reino Unido ou ao Japão em seus acordos comerciais. E a tarifa de 25% da Seção 301, específica para o Brasil e em vigor desde 22 de julho de 2026, isenta novamente aeronaves e peças, com cerca de 430 posições tarifárias reservadas exclusivamente aos usos da aviação civil." },
  { p: "A razão é aritmética, não afetiva. A aviação regional americana voa no E175: só a SkyWest encomendou mais 60 no ano passado, com direitos sobre outros 50, para voar por American, Delta, United e Alaska. Uma tarifa sobre a Embraer é um imposto sobre a conectividade doméstica dos Estados Unidos — e assim, administração após revisão após reedição, o avião permanece isento enquanto o café e o aço pagam. A política comercial é o lugar onde a dependência deixa de ser uma tese e vira uma tabela aduaneira: Washington pode viver sem a carne brasileira ao preço antigo. Sem o avião, não." },

  { h: "IX. Defesa: o teste do caça" },
  { p: "A defesa merece uma análise própria — nós a publicamos — mas a versão de site desta história precisa dos seus três sinais de julho, porque eles completam a tese do método." },
  { p: "Velocidade: em 16 de julho, a Força Aérea Tcheca recebeu o seu primeiro C-390, vinte meses após a assinatura do contrato — um cronograma de aviação comercial aplicado a um produto militar, que é exatamente a razão de existir de um sistema de produção derivado da Toyota. A aeronave, batizada de \"Karel Toman-Mareš\" em Farnborough, faz da República Tcheca o quarto operador depois de Brasil, Portugal e Hungria, com Holanda, Áustria, Suécia e Eslováquia na fila; os acordos de dispositivos de treinamento para a Suécia (desenvolvidos com a alemã Rheinmetall) e para a Áustria, o memorando com a Anduril para integrar o míssil de cruzeiro Barracuda-500M e o de fevereiro com a Northrop Grumman, voltado à Força Aérea dos EUA, completam o quadro." },
  { p: "Confiança: a Saab e a Embraer assinaram um acordo para a potencial produção de 20 caças Gripen adicionais em Gavião Peixoto — com a Embraer responsável pela montagem, em complemento à linha da própria Saab em Linköping, para atender à demanda global. Quando o Brasil escolheu o Gripen, em 2014, a tecnologia fluía para o Brasil como obrigação de offset; doze anos e um programa de formação depois (engenheiros e técnicos qualificados na teoria e na prática, inclusive na Suécia), a planta do aluno virou a fábrica de transbordo para o mercado mundial. No setor aeroespacial, nenhuma capacidade é guardada com mais zelo do que a linha de produção de um caça. A Suécia acaba de entregar as chaves ao Brasil." },

  { h: "X. A leitura de corredor" },
  { p: "Para a indústria europeia — e em particular para a italiana — as implicações correm nas duas direções." },
  { p: "A montante, não é uma oportunidade hipotética: os fornecedores europeus já estão dentro da aeronave. A francesa Latecoere fabrica as portas de passageiros e de emergência do E2; a espanhola Aernnova produz a empenagem e a fuselagem dianteira e, em 2022, adquiriu as duas plantas de aeroestruturas da Embraer em Évora, Portugal, com um acordo de fornecimento de longo prazo; a alemã Liebherr entrega os sistemas de comando de flaps e slats. Uma Embraer a caminho de mais de 110 entregas comerciais por ano, com serviços crescendo 8% ao trimestre, é um motor de compras em expansão — e um terceiro OEM em escala diversifica a base de clientes para além do duopólio que hoje dita as condições aos fornecedores." },
  { p: "A jusante, as companhias de bandeira europeias já estão votando na tese da demanda com widebodies — a Iberia define a América Latina como um mercado ainda não maduro, a ITA Airways adiciona Caracas, Lima e Santiago, e o Atlântico Sul está entre as rotas mais rentáveis para as grandes companhias do continente — enquanto a extensão do alcance do E2 reescreve em silêncio a economia das rotas exatamente nos pares de cidades secundárias dos quais os corredores intercontinentais dependem para a alimentação. Um segmento nascido para conectar com lucro cidades pequenas e médias não é uma curiosidade brasileira: é a camada de infraestrutura que falta em todo dossiê de conectividade \"de segundo nível\", na Europa como na América do Sul." },
  { p: "E há um terceiro fluxo, mais recente que os outros dois: o método se movendo na direção contrária. As estratégias industriais europeias passaram uma década debatendo quanta tecnologia transferir para os mercados emergentes. O acordo com a Saab, a parceria com a Toyota, a entrega à OTAN em vinte meses — e um muro tarifário americano que não para de se reconstruir em torno da mesma porta em formato de Brasil — apontam todos para a pergunta melhor: o que a indústria europeia tem a ganhar com os métodos que agora fluem a partir desses mercados?" },

  { h: "XI. Cinquenta e sete anos, um método" },
  { p: "Ozires Silva completou 95 anos em janeiro. O engenheiro que liderou trezentas pessoas no Bandeirante, e para quem o Estado criou uma empresa em 1969, viveu para ver a semana em que o seu método montou um caça europeu para o mercado mundial, sustentou uma carteira de pedidos de US$ 34,5 bilhões e permaneceu isento — pela terceira vez em um ano — do ciclo comercial mais protecionista da história americana moderna. Em dezembro, a Associação Italiana de Aeronáutica e Astronáutica lhe concedeu em Turim a Medalha Giuseppe Gabrielli — o aeroespacial italiano homenageando o homem que provou a tese à qual esta série sempre retorna: os ativos que cruzam fronteiras com mais lucro não são produtos, são métodos. Os métodos amadurecem mais devagar do que as commodities. Mas se capitalizam." },
];

export default function EmbraerBR() {
  const { lang } = useT();
  const article = getArticleBySlug("Embraer");
  const desc =
    "Embraer 2026: como uma empresa brasileira conquistou 76% do segmento de 70–150 assentos, uma carteira de pedidos de US$ 34,5 bilhões e um método que continua superando os muros tarifários americanos.";
  useCanonical("/Embraer_BR", {
    title: `${article?.title.pt ?? "Embraer"} | Business Matching Global`,
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
          <LangSwitcher to="/Embraer" />
        </div>
        <article className="prose-invert">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4">
            {article?.title.pt}
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
          <ShareBlock title={article?.title.pt ?? "Embraer"} />
        </article>
        <AnalysisFooter />
      </div>
    </main>
  );
}