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

const TITLE = "Votando com os pés";

const body: Block[] = [
  { p: "#CustoBrasil — Business Matching Global · 02-08-2026, atualizado em 05-08-2026" },
  { p: "O que os fatos de fim de julho em Ceuta nos dizem — depois de filtrado o barulho" },
  { p: "Alguns textos são escritos para persuadir. Este foi escrito com base em uma verificação atenta dos fatos. Nos dias que se seguiram aos acontecimentos de Ceuta, circulou nas capitais europeias e nas redes sociais um volume incomum de afirmações categóricas — muitas delas verificáveis, e muitas outras absolutamente sem fundamento. O que segue não é uma defesa de governo algum. É um exercício de reconstrução do quadro dos fatos, porque na inteligência de mercado, como na política, só os fatos verificados e verificáveis revelam o que realmente aconteceu e está acontecendo." },
  { h: "Fato número um: Ceuta não faz parte do Espaço Schengen — e nunca fez" },
  { p: "A afirmação mais estrondosa da semana passada — segundo a qual os migrantes que entraram em Ceuta teriam «violado o Espaço Schengen» e poderiam chegar livremente a Milão ou Helsinque — desmorona na primeira consulta à normativa vigente." },
  { p: "Quando a Espanha aderiu ao Acordo de Schengen, em 1991, foi anexada ao seu Ato de Adesão uma declaração específica sobre Ceuta e Melilla, excluindo as duas cidades norte-africanas do regime de livre circulação. Esse status especial continua em vigor hoje, no artigo 41 do Código de Fronteiras Schengen. Na prática: entrar em Ceuta não confere o direito de permanecer na Espanha, de alcançar a Península Ibérica ou de circular pela Europa. Os controles de saída entre Ceuta e o continente existem desde 1991." },
  { p: "Os números confirmam que o sistema funcionou como projetado. Das cerca de 50.000–60.000 pessoas que cruzaram a fronteira em menos de 24 horas, as autoridades espanholas informam que mais de 48.000 foram devolvidas ao Marrocos em 48 horas. No dia 1º de agosto, a presidente da Comissão Europeia, Ursula von der Leyen — após uma videochamada com os comissários Brunner e Šuica — declarou publicamente que a grande maioria dos que haviam entrado já retornara ao Marrocos graças à atuação das forças espanholas e marroquinas, e que nenhuma pessoa havia chegado à Espanha continental ou ao restante da UE." },
  { p: "Um governo, ainda assim, suspendeu o Acordo de Schengen com a Espanha por um mês, restabelecendo controles seletivos nas fronteiras marítimas e aéreas. Dois detalhes processuais completam o quadro: Bruxelas observou que a suspensão foi anunciada antes de qualquer notificação formal chegar à Comissão, e um porta-voz da UE pediu publicamente a Roma que explicasse de que maneira a crise de Ceuta constituiria uma ameaça à segurança — o pressuposto jurídico para o restabelecimento de controles internos. Bruxelas também frisou que o enclave, assim como Melilla, é uma fronteira externa onde os controles necessários estavam em vigor, e que dele não haviam sido detectados fluxos migratórios." },
  { p: "O mesmo governo promoveu em seguida, junto com a Dinamarca, uma carta assinada por 22 chefes de Estado e de governo europeus — dirigida aos presidentes do Conselho Europeu e da Comissão e à presidência rotativa irlandesa — pedindo uma videoconferência urgente dos ministros do Interior e uma resposta europeia coordenada em matéria de fronteiras externas, repatriações e tráfico de pessoas. Coloquemos os dois movimentos lado a lado e deixemos que falem por si: uma suspensão unilateral de Schengen anunciada sem notificação formal e uma carta que invoca coordenação e uma resposta europeia unida, no mesmo ciclo de notícias. Um dos dois gestos contradiz o outro; cabe ao leitor decidir qual era destinado a Bruxelas e qual ao telejornal noturno doméstico." },
  { h: "Fato número dois: a regularização não tem nada a ver com a cerca" },
  { p: "Uma segunda afirmação ligou a crise à regularização, pela Espanha, de cerca de 500.000 migrantes, apresentada como um convite aberto a cruzar a fronteira. A mecânica diz o contrário: o processo espanhol exige residência prévia documentada na Espanha, ficha criminal limpa e contrato de trabalho ou comprovação de meios suficientes. Quem pula uma cerca em julho de 2026 está, por definição, excluído desse processo. As autoridades espanholas documentaram, além disso, uma campanha de desinformação conduzida por redes de traficantes, que distorceu uma decisão do Supremo Tribunal sobre devoluções na fronteira para convencer as pessoas de que chegar a Ceuta garantiria a permanência. Não garante; a decisão alterou o procedimento, não os direitos de permanência." },
  { p: "Para registro, os dados da Frontex citados pelo governo espanhol sobre entradas irregulares entre 2021 e 2026 classificam as rotas da seguinte forma: Itália, cerca de 478.600; Bálcãs Ocidentais, 340.600; Grécia, 259.800; Espanha, 234.760. O país que suspendeu o Acordo de Schengen com a Espanha registrou aproximadamente o dobro das entradas irregulares da Espanha no mesmo período." },
  { p: "Vale notar como essa réplica foi formulada. Enquanto outras capitais escalavam o confronto — convocando cúpulas, fechando fronteiras, chamando embaixadores —, a resposta do primeiro-ministro espanhol tomou a forma de um post nas redes sociais listando aqueles números da Frontex, introduzidos por uma única observação: a solidariedade e a empatia são opcionais; o respeito aos tratados europeus e aos dados, não. De um lado respondeu-se com uma tabela, do outro com uma escalada diplomática. O leitor pode decidir qual dos dois lados temia a verificação." },
  { h: "Fato número três: o modelo espanhol, imperfeito mas mensurável" },
  { p: "A Espanha é atualmente a grande economia de crescimento mais rápido da zona do euro, expandindo-se cerca de 3% ao ano por dois anos consecutivos, enquanto Alemanha e Itália patinam perto de zero. Os motores estão bem documentados: turismo recorde, absorção eficaz dos fundos do Next Generation EU, energia renovável de baixo custo e — ironia da polêmica atual — a própria imigração, que sustentou emprego e consumo em um continente que envelhece. O modelo tem fragilidades reais: uma grave crise habitacional, baixa produtividade por hora trabalhada, precariedade residual no mercado de trabalho. Mas «imperfeito e crescendo 3%» é uma frase bem diferente da que se está escrevendo sobre a Espanha nesta semana." },
  { h: "Fato número quatro: o Marrocos não é um Eldorado — 60.000 pessoas acabaram de confirmá-lo" },
  { p: "Aqui a crise se torna verdadeiramente instrutiva, porque desmonta não uma, mas duas narrativas." },
  { p: "O Marrocos passou anos se promovendo como a história de sucesso da África: crescimento do PIB acima de 3% ao ano, expansão acumulada de 22% desde 2019, um setor exportador que se aproxima da produção automobilística italiana, a linha ferroviária de alta velocidade de Kenitra a Marrakech e a Copa do Mundo de 2030 — organizada em conjunto com Espanha e Portugal — com aquele que será o maior estádio do mundo." },
  { p: "O outro lado do balanço: cerca de dois terços do emprego marroquino é informal — 67,6% segundo a conta satélite do emprego elaborada pelo HCP com a OIT, mais de 67% segundo a OCDE, até 77% em outras estimativas. O desemprego entre os jovens de 15 a 24 anos superou 36% em 2024–2025 nos dados do HCP; com a nova metodologia «em sentido estrito» adotada em 2026, a taxa oficial cai para 29%, mas o indicador composto de subutilização da força de trabalho juvenil chega a 45%. A participação feminina no mercado de trabalho caiu de cerca de 28% em 2000 para 19% — uma das maiores disparidades do mundo. O crescimento se concentra em setores intensivos em capital, controlados em grande parte por multinacionais estrangeiras, que absorvem investimento, empregam poucos e redistribuem menos ainda. O movimento de protesto GenZ 212 sintetizou o desequilíbrio em um slogan: queremos hospitais, não estádios. A OCDE coloca o Marrocos entre os primeiros lugares do ranking mundial de países por número de trabalhadores que emigram." },
  { p: "É nesse contexto que dezenas de milhares de marroquinos — não migrantes em trânsito vindos do Sahel, mas marroquinos — tomaram de assalto uma cerca no dia da Festa do Trono do seu rei. O balanço está documentado: pelo menos 67 corpos recuperados por mergulhadores, pela Guarda Civil e pelo resgate marítimo espanhol entre os que tentaram contornar a nado o quebra-mar do Tarajal, agora fechado por uma barreira flutuante de 500 metros. Nenhum relatório de consultoria, nenhuma campanha de marketing soberano, nenhuma inauguração de infraestrutura supera o peso desse dado. Quando pessoas arriscam a vida entre o arame farpado e o mar aberto, estão atribuindo a um país um rating mais honesto do que qualquer coisa que uma agência de classificação publique." },
  { p: "Votaram com os pés. É o único voto que não pode ser manipulado." },
  { h: "Fato número cinco: o balanço dos próprios acusadores" },
  { p: "Os governos mais estridentes em denunciar Madri merecem a mesma verificação factual que exigem dos outros." },
  { p: "A Itália, em 2025, restringiu a cidadania iure sanguinis — por decreto assinado pelo mesmo ministro das Relações Exteriores que agora ataca a regularização espanhola — excluindo a maior parte dos descendentes sul-americanos dos emigrantes italianos, com exceção dos filhos e netos de quem nasceu na Itália. O mesmo campo político assiste agora à chegada ao Parlamento de uma iniciativa legislativa popular chamada «Remigração e Reconquista», com 150.000 assinaturas: um texto que define a remigração como o retorno assistido dos estrangeiros legalmente residentes na Itália e que — em uma reviravolta digna de nota — propõe, ao mesmo tempo, apoio estatal ao retorno dos descendentes de italianos no exterior." },
  { p: "Leiamos as duas políticas juntas. Os descendentes que passaram anos nas filas dos consulados para reivindicar a cidadania italiana estavam votando com os pés em direção à Itália — e a porta foi fechada na cara deles, contabilizados como custo consular. Os estrangeiros que votaram com os pés em direção à Itália e ali construíram uma vida regular são agora, na proposta mais radical sobre a mesa, convidados a ir embora. Uma diáspora lançada como passivo; uma população residente redefinida como excedente. Seja qual for a posição política de cada um, a contabilidade não é coerente — e uma contabilidade incoerente é um péssimo púlpito de onde dar lições a Madri." },
  { h: "O método por trás do barulho" },
  { p: "Na newsletter #CustoBrasil no LinkedIn já se escreveu sobre as empresas brasileiras que cruzavam a Ponte da Amizade rumo ao Paraguai, votando com os pés contra o Custo Brasil. A crise de Ceuta é o mesmo fenômeno em escala humana, com três fluxos emitindo três veredictos: as empresas brasileiras contra a sua estrutura de custos, os cidadãos marroquinos contra o seu «milagre de duas velocidades», os descendentes de italianos rumo a uma pátria que parou de responder." },
  { p: "Em todos os casos, o poder respondeu aos «pés» com retórica em vez de reformas." },
  { h: "Atualização — 5 de agosto de 2026: o que o dossiê acrescentou em três dias" },
  { p: "Este texto foi publicado em 2 de agosto. Deixamos intactos os cinco fatos acima — nenhum precisou de correção — e registramos aqui, com data, o que o registro público acrescentou desde então." },
  { p: "Os números convergiram. O principal jornal econômico da Itália, Il Sole 24 Ore, publicou uma reportagem de campo de Tânger lendo os mesmos instrumentos usados por esta análise: desemprego juvenil oficial acima de 30% entre os menores de 24 anos, economia informal valendo cerca de um terço do PIB e mais de 60% da força de trabalho, e o dualismo entre o boom de Tanger Med e as praças da Gen Z — o que um analista do Atlantic Council citado pelo jornal chama de «dois Marrocos», e o que o fato número quatro acima chamava de milagre de duas velocidades. A mesma edição acrescenta um número que vale como sexto fato, de fonte ISTAT: as chegadas do Marrocos à Itália cresceram quase 50% em 2025 — 36.000 pessoas, segunda nacionalidade por entradas — contadas pelas estatísticas oficiais. O governo mais barulhento sobre a «invasão» de Ceuta preside um país onde os marroquinos são a terceira comunidade nacional (412.000 residentes), com 115.569 estudantes nas escolas italianas e 27.000 aquisições de cidadania só em 2024. As estimativas locais atualizadas, entretanto, dimensionam a onda original em quase 80.000 tentativas de entrada segundo o presidente da própria Ceuta, com 3.000–5.000 pessoas ainda na cidade quatro dias depois — e o restante devolvido." },
  { p: "O estopim agora tem um processo. A Audiencia Nacional espanhola abriu uma investigação para estabelecer se por trás da campanha nas redes que precedeu o assalto — as contas que diziam a dezenas de milhares de pessoas que a fronteira estava aberta e quem cruzasse ficaria — há redes criminosas, traficantes ou uma estratégia coordenada com fins políticos. Rabat acusou as «máfias da desinformação»; em 5 de agosto, 25 pessoas estavam indiciadas pela organização das travessias e dos transportes. Já circula uma nova convocação de entrada em massa para 15 de agosto («naquele dia tudo fará sentido»), até agora sem confirmações de Madri nem de Rabat. A analista Nathalie Tocci (IAI / Johns Hopkins SAIS), em entrevista à Sky TG24, propôs uma leitura de três atores que registramos com a assinatura dela: os Estados terceiros que militarizam a migração para obter alavancas, como Tunísia, milícias líbias e Turquia antes do Marrocos; os atores globais — as origens de boa parte da desinformação em circulação remontavam, na avaliação dela, em parte a Moscou, em parte ao mundo MAGA americano, em parte a Israel — com o objetivo de dividir a Europa a partir da Espanha de Sánchez; e as direitas internas que cavalgam o que ela chama de «falsa crise», porque 70.000 pessoas que entram num dia e saem no dia seguinte não são uma crise migratória. Seu ponto mais afiado é uma bomba lógica que este texto adota de bom grado: chegar à Espanha continental a partir de Ceuta é mais difícil do que a travessia direta do Marrocos, porque os controles de saída do enclave são mais rigorosos. Quem grita invasão-via-Ceuta está descrevendo a rota que nenhum migrante racional escolheria." },
  { p: "A praça respondeu em espanhol. Na própria Ceuta, centenas de moradores se manifestaram contra o ato do movimento de extrema direita espanhol Núcleo Nacional; no dia seguinte, um protesto nascido das associações de bairro rachou com a chegada do agitador Vito Quiles com o grupo Save Europe Act — cofundado pelo austríaco Martin Sellner, com ativistas da Generation Identity vindos da Alemanha para a ocasião. A faixa deles dizia «Sánchez must go, Spain needs remigration». Estava em inglês. Os ceutis que a contestavam respondiam em espanhol. O destinatário de uma faixa se deduz da língua: quem escreve em inglês numa cidade espanhola fala para a câmera e para o algoritmo, não para a cidade — que, sendo cerca de metade de origem marroquina e muçulmana, rejeitou seus «salvadores» na própria língua. Os atores externos, desta vez, vieram pessoalmente; continuam sendo os únicos, em toda esta história, a terem cruzado mais fronteiras do que os migrantes." },
  { p: "Três dias depois, o padrão do texto original só se afiou: os fluxos continuam dizendo a verdade, e as vozes mais altas continuam evitando o dossiê. A única «invasão» documentada nos autos, em Ceuta, foi a invasão dos posts." },
  { p: "Os fatos e números vêm de fontes públicas: o Código de Fronteiras Schengen e o Ato de Adesão da Espanha de 1991, os dados da Frontex sobre entradas 2021–2026 citados pelo governo espanhol, as declarações da Comissão Europeia e do governo espanhol (julho–agosto de 2026), os dados da OCDE, do HCP e do Banco Mundial sobre o Marrocos, o texto da iniciativa popular italiana protocolada na Câmara dos Deputados em 30 de junho de 2026, os relatórios da Fundação ISMU e do Ministério do Trabalho italiano sobre a comunidade marroquina na Itália, os dados ISTAT 2025 sobre migrações, os autos e as coberturas sobre a investigação da Audiencia Nacional e as manifestações de Ceuta (agosto de 2026), e a entrevista de Nathalie Tocci à Sky TG24 «Timeline», 5 de agosto de 2026." },
  { p: "Business Matching Global — inteligência de mercado e orquestração de negócios no corredor Europa–Brasil. Nosso trabalho se apoia em rigorosa checagem de fatos e dados, porque — como diz a máxima atribuída a W. Edwards Deming, o estatístico que ensinou qualidade à indústria japonesa — sem dados, você é apenas mais uma pessoa com uma opinião. Nós preferimos ser apenas mais uma pessoa com os dados." },
];

export default function CeutaBR() {
  const { lang, setLang } = useT();
  const article = getArticleBySlug("ceuta_br");
  const desc =
    "O que a crise de Ceuta realmente diz: o status especial fora de Schengen, os dados da Frontex, o Marrocos de duas velocidades e os fluxos que verificam o que os comunicados negam.";
  useCanonical("/ceuta", {
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
          <LangSwitcher to="/ceuta" />
        </div>
        <article className="prose-invert">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4">{TITLE}</h1>
          <p className="text-xs text-foreground/70 mb-2">Business Matching Global</p>
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