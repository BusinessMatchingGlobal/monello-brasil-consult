import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const EuMercosurPt = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container mx-auto px-6">
          <Link to="/">
            <Button variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10 mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para Home
            </Button>
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight max-w-4xl">
            UE-Mercosul: não se trata apenas de um acordo comercial. É uma mudança histórica de fase.
          </h1>
          <p className="text-primary-foreground/80 mt-4 text-lg">17 de Janeiro de 2026</p>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-6 py-12 md:py-16">
        <article className="max-w-3xl mx-auto prose prose-lg prose-slate dark:prose-invert">
          <p className="lead text-xl text-muted-foreground leading-relaxed">
            17 de janeiro de 2026 não é uma data qualquer. Com a assinatura, em Assunção, do Acordo de Associação entre a União Europeia e o Mercosul, encerra-se uma das negociações mais longas e complexas da história do comércio internacional contemporâneo. Mais do que isso, inicia-se uma nova etapa: a da implementação real, concreta e operacional.
          </p>

          <p>
            Após mais de 25 anos de negociações, vetos cruzados, impasses políticos e relançamentos diplomáticos, o acordo finalmente deixa o plano abstrato dos comunicados oficiais e se transforma em uma variável estratégica com a qual empresas, investidores e instituições deverão lidar a partir de agora.
          </p>

          <p className="font-semibold text-foreground">
            Para quem atua no eixo Europa-Brasil, esse momento marca o fim da ambiguidade e o início de uma nova normalidade.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Por que esse acordo chega agora?</h2>
          
          <p>
            O momento não é casual. A Europa se move em um contexto de fragmentação global, desglobalização seletiva e crescente insegurança das cadeias de suprimento. A guerra na Ucrânia evidenciou o risco da dependência excessiva de poucos fornecedores, e a competição entre Estados Unidos e China deixou claro que a neutralidade comercial já não é uma opção.
          </p>

          <p>
            Nesse cenário, o Mercosul representa para a Europa uma combinação rara de segurança alimentar, abundância de matérias-primas críticas, um mercado em crescimento e potencial convergência regulatória. Para o Mercosul, por sua vez, a União Europeia continua sendo o parceiro capaz de exportar padrões, tecnologia, capital e conhecimento industrial.
          </p>

          <p>
            Portanto, não se trata de "livre comércio" no sentido clássico, mas de uma escolha geopolítica mútua: diversificar, reequilibrar e reduzir riscos sistêmicos.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Um aspecto pouco comentado: a arquitetura jurídica</h2>

          <p>
            Um dos elementos mais inovadores — e menos compreendidos no debate público — é a estrutura de "dois pilares" do acordo. O pilar comercial é de competência exclusiva da União Europeia, podendo entrar em vigor de forma provisória, sem a necessidade de ratificação pelos 27 parlamentos nacionais.
          </p>

          <p>
            O efeito prático é claro: as empresas não precisarão esperar anos para sentir os impactos sobre tarifas, regras de origem e acesso a mercados.
          </p>

          <p>
            Essa é uma lição aprendida com acordos anteriores, como o CETA, e um sinal político inequívoco de que Bruxelas decidiu que o comércio estratégico não pode mais ficar refém das dinâmicas políticas internas de cada estado-membro.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Agricultura: menos ideologia, mais números</h2>

          <p>
            Grande parte da oposição europeia ao acordo concentrou-se na agricultura, muitas vezes com tons alarmistas. No entanto, os dados contam outra história. Não há liberalização indiscriminada: os produtos sensíveis estão sujeitos a cotas precisas, limitadas e rigorosamente monitoradas.
          </p>

          <p>
            A carne bovina, por exemplo, entra no mercado europeu por meio de uma cota que representa apenas uma fração mínima do consumo total da União Europeia (UE). Não se trata de um acordo de volume, mas de valor. Ele beneficia produtos premium, rastreáveis e em conformidade com os padrões sanitários europeus. Todo o restante permanece fora.
          </p>

          <p>
            Isso altera profundamente a estratégia dos exportadores sul-americanos: menos commodities e mais posicionamento, menos quantidade e mais margem.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Indústria e máquinas: onde o jogo realmente acontece</h2>

          <p>
            Se a agricultura é o capítulo mais midiático, a indústria é a mais relevante do ponto de vista estrutural. Para o Mercosul — e especialmente para o Brasil —, a abertura gradual aos bens industriais europeus representa um choque competitivo, mas também uma oportunidade histórica de modernização.
          </p>

          <p>
            Máquinas, produtos químicos, farmacêuticos e componentes: a redução de tarifas diminui o custo do capital produtivo e acelera a atualização tecnológica. Os períodos de transição de 10 a 15 anos concedidos a alguns setores não são um colchão para acomodação, mas uma janela de adaptação. Quem a desperdiçar dificilmente terá uma segunda chance.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Compras públicas e serviços: o capítulo subestimado</h2>

          <p>
            Ainda há um aspecto pouco explorado no debate público, mas de enorme valor estratégico: o acesso recíproco aos mercados de compras públicas. Pela primeira vez, empresas brasileiras e europeias poderão competir em igualdade de condições em licitações federais do outro lado do Atlântico.
          </p>

          <p>
            Na Europa, isso significa acesso a um mercado de trilhões de euros. No Brasil, significa mais transparência, padronização e o enfraquecimento gradual de muitas barreiras informais. Trata-se de uma revolução silenciosa que favorece empresas estruturadas, em conformidade regulatória e preparadas para operar em escala internacional.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Sustentabilidade: não é um slogan, mas uma cláusula vinculante</h2>

          <p>
            A questão ambiental não foi resolvida por meio de declarações genéricas, mas por um instrumento jurídico vinculante. O Acordo de Paris passa a ser considerado um "elemento essencial" do tratado, de modo que violações graves podem levar à suspensão de todo o acordo comercial.
          </p>

          <p>
            Esse é um precedente poderoso. Ele se soma a normas autônomas da União Europeia, como o regulamento EUDR sobre desmatamento, que continuará plenamente aplicável. Em outras palavras, o acordo abre portas, mas apenas para quem comprovar rastreabilidade, conformidade e responsabilidade.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Conclusão: uma ponte em um mundo de muros</h2>

          <p>
            O acordo UE-Mercosul não é perfeito. Ele é assimétrico, politicamente frágil e tecnicamente complexo. Ainda assim, em um mundo que ergue barreiras, ele representa a maior ponte econômica construída entre dois continentes nas últimas décadas.
          </p>

          <p className="font-semibold text-foreground">
            Para as empresas, a mensagem é clara: não se trata mais de perguntar se o acordo entrará em vigor, mas de como se posicionar para aproveitá-lo. Quem espera corre o risco de chegar tarde; quem planeja agora, porém, pode transformar um tratado em vantagem competitiva real.
          </p>

          <div className="mt-16 pt-8 border-t border-border">
            <Link to="/#contact">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Entre em contato para uma consultoria
              </Button>
            </Link>
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="bg-muted py-8 mt-16">
        <div className="container mx-auto px-6 text-center text-muted-foreground">
          <p>© 2026 Monello Brasil Consult. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default EuMercosurPt;
