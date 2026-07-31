import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useT, type Lang } from "@/lib/i18n";
import { useCanonical } from "@/lib/useCanonical";
import { LangSwitcher } from "@/components/LangSwitcher";
import { BeforeYouProceed } from "@/components/BeforeYouProceed";
import logoBMG from "@/assets/logo-business-matching-global-transparent.png.asset.json";

type Block = { type: "h2"; text: string } | { type: "p"; text: string; italic?: boolean };

export const blocks: Block[] = [
  { type: "h2", text: "Não existe o preço de um voo entre o Brasil e a Europa" },
  { type: "p", text: "Existem pelo menos quatro. Mesma poltrona, mesmo avião, mesmo dia. O que muda é a porta pela qual você entra." },
  { type: "p", text: "Existe a tarifa pública, aquela que você vê no site da companhia. Existem as tarifas negociadas e confidenciais, que por definição não são publicadas em lugar nenhum. Existem os contratos corporativos, reservados a quem tem grande volume. E existem os programas que as companhias dedicam às pequenas e médias empresas — sem volume mínimo, e quase nenhuma PME sabe que existem." },
  { type: "p", text: "No corredor Brasil–Europa, quem paga menos raramente é quem pesquisou melhor. É quem teve acesso.", italic: true },

  { type: "h2", text: "De onde vem esse acesso" },
  { type: "p", text: "O serviço de viagens da Business Matching Global nasce da parceria com a CAVALLINODIECI S.r.l., empresa do nosso grupo que atua na organização e intermediação de viagens e na emissão de passagens aéreas desde 2004 — com a razão social atual desde 2008 — com todas as autorizações previstas em lei." },
  { type: "p", text: "Um único interlocutor, do primeiro contato até a sua volta para casa: passagens aéreas, hospedagem, locação de veículos, transfers e seguro viagem." },

  { type: "h2", text: "Tarifas negociadas e confidenciais" },
  { type: "p", text: "Vinte anos de relacionamento com as companhias aéreas se traduzem em algo concreto: acesso a tarifas negociadas e confidenciais. O nome já diz tudo — por definição, elas não podem ser publicadas. Você não as encontra nas OTAs, as agências de viagem online onde se comparam preços. Não as encontra nos IBTs, as ferramentas de reserva que muitas empresas usam para emitir por conta própria. E não as encontra nem no site das próprias companhias." },
  { type: "p", text: "O preço é a vantagem mais evidente, mas não é a única. As tarifas VFR (visiting friends and relatives), por exemplo, costumam vir com franquia de bagagem maior e regras de remarcação mais flexíveis do que as tarifas públicas — o que faz diferença real para quem vai visitar a família na Itália e não viaja com uma mala só." },

  { type: "h2", text: "Documentação: onde a viagem trava antes de começar" },
  { type: "p", text: "É aqui que a maior parte dos problemas nasce, e quase sempre longe do balcão." },
  { type: "p", text: "Passaporte com validade insuficiente para o destino. Dupla cidadania usada pela metade — quem tem passaporte italiano e embarca com o brasileiro, ou o contrário, muitas vezes está pagando mais caro e viajando com menos direitos do que poderia. Bilhetes de ida sem comprovação de residência ou de status migratório. Conexões em países que exigem visto de trânsito." },
  { type: "p", text: "Nós verificamos isso antes de emitir, não no check-in. E é por isso que o formulário pergunta sobre cidadania, residência e documentos: não é burocracia nossa, é o que determina qual solução podemos efetivamente colocar na sua mão." },

  { type: "h2", text: "Não vendemos uma passagem. Construímos uma viagem sem atrito." },
  { type: "p", text: "Nosso trabalho não termina na emissão: começa antes e se encerra quando você chegou em casa." },
  { type: "p", text: "Antes do embarque, antecipamos o que pode comprometer a viagem: documentos e exigências de entrada, tempo mínimo de conexão, conexões frágeis, regras de bagagem, cobertura de seguro compatível com o roteiro." },
  { type: "p", text: "Durante a viagem, gerenciamos os imprevistos de forma ativa — cancelamentos, preterição de embarque, reacomodação: o que o setor chama de IROPS, irregular operations — para reduzir ao mínimo o transtorno. Não esperamos você ligar do aeroporto." },

  { type: "h2", text: "Nem todo avião trata você do mesmo jeito" },
  { type: "p", text: "Você pode voar na executiva, na poltrona mais confortável do mercado, e desembarcar acabado. Muitas vezes não é a poltrona. É a fuselagem." },
  { type: "p", text: "Uma fuselagem de alumínio só pode ser pressurizada até certo ponto: a cabine fica a uma altitude equivalente de cerca de 2.400 metros, com umidade que nos voos longos cai abaixo de 10% — mais seca que muito deserto. Menos oxigênio no sangue, desidratação, dor de cabeça, jet lag mais longo." },
  { type: "p", text: "Uma fuselagem de material composto — caso do Boeing 787 e do Airbus A350 — suporta pressões maiores e não corrói. Resultado: cabine equivalente a cerca de 1.800 metros, umidade chegando a 15–20%, menos ruído, filtragem de ar melhor e sistemas que amortecem a turbulência antes de você sentir. Dez horas depois, a diferença você sente no corpo." },
  { type: "p", text: "Essa variável não aparece em nenhum buscador nem em nenhuma comparação de preço. Na mesma rota, no mesmo dia, na mesma classe e pela mesma tarifa, o avião pode ser completamente diferente dependendo do número do voo." },
  { type: "p", text: "Orientamos você também sobre isso: qual aeronave está de fato operando, configuração da cabine, posição da poltrona, horário de partida e desenho das conexões em relação ao seu fuso e ao que você precisa fazer ao chegar." },
  { type: "p", text: "Porque a viagem não termina quando o avião pousa. Termina quando você consegue fazer aquilo pelo que viajou.", italic: true },

  { type: "h2", text: "O valor do dinheiro que você gasta" },
  { type: "p", text: "Desde já. Acesso a tarifas competitivas com muitas companhias e para muitos destinos." },
  { type: "p", text: "Se você voa muito. Quando certas companhias e rotas se repetem no seu padrão de viagem, negociamos acordos dedicados com base nos seus fluxos reais." },
  { type: "p", text: "Se você é uma PME sem volume. Cuidamos da sua inscrição nos programas corporativos das companhias: programas que acumulam crédito a cada voo, utilizável na compra de novas passagens. A participação não impede o acúmulo de pontos no seu programa de fidelidade individual — os dois correm em paralelo." },
  { type: "p", text: "Sobre milhas. Também ajudamos aqui: acumular mais rápido onde é possível, e transformar pontos em passagens prêmio efetivamente emitíveis — a etapa em que a maioria desiste." },

  { type: "h2", text: "Vale também para viagens a lazer" },
  { type: "p", text: "O mesmo empenho se aplica às viagens de férias. E não só no ar: temos tarifas negociadas e confidenciais também com hotéis e locadoras, e sabemos indicar a cobertura de seguro com a melhor relação entre custo e proteção real." },

  { type: "h2", text: "A pessoa continua no centro" },
  { type: "p", text: "Sempre há alguém cuidando do seu caso." },
  { type: "p", text: "Estamos equipando nossos consultores com a IVA — Intelligent Vacation Assistant: não um substituto, mas um exoesqueleto que amplia a capacidade de quem trabalha na sua solicitação. Human in the loop: a tecnologia trabalha nos bastidores, o critério e a relação ficam com quem responde a você." },

  { type: "h2", text: "Teste, sem compromisso" },
  { type: "p", text: "Preencha o formulário abaixo para colocar o serviço à prova. Nada vincula você." },
  { type: "p", text: "As informações pedidas podem parecer muitas. São exatamente as que precisamos — e nada além disso — para colocar a melhor solução na sua mão já na primeira proposta: o que você deseja, mas também o que você pode ter, conforme cidadania, residência e documentos." },
];

export default function BusinessTravelBR({ force }: { force?: Lang } = {}) {
  const { lang, setLang } = useT();
  useCanonical("/BT_br", {
    title: "Business Travel & Travel Management — Business Matching Global",
    description: "Desk de viagens dedicado: passagens aéreas com tarifas negociadas e confidenciais, hotéis, locação de veículos, transfers e seguro viagem.",
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (force && lang !== force) setLang(force);
  }, [force, lang, setLang]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed top-0 inset-x-0 z-50 bg-background/90 backdrop-blur border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="flex items-center" aria-label="Business Matching Global">
            <img src={logoBMG.url} alt="Business Matching Global" className="h-10 w-auto" />
          </Link>
          <div className="flex items-center gap-3">
            <LangSwitcher to="/BT" />
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" /> Home
            </Link>
          </div>
        </div>
      </header>

      <main className="container max-w-3xl pt-28 md:pt-36 pb-16 md:pb-24">
        <h1 className="font-display text-4xl md:text-5xl leading-tight mb-6">
          Business Travel &amp; Travel Management
        </h1>
        <article className="space-y-6">
          {blocks.map((b, i) =>
            b.type === "h2" ? (
              <h2 key={i} className="font-display text-2xl md:text-3xl mt-10 mb-2 text-foreground">
                {b.text}
              </h2>
            ) : (
              <p
                key={i}
                className={`text-base md:text-lg leading-relaxed text-muted-foreground text-justify${b.italic ? " italic" : ""}`}
              >
                {b.text}
              </p>
            )
          )}
        </article>

        <div className="mt-12 text-center">
          <Button asChild size="lg" className="rounded-full">
            <Link to="/fly">
              Solicitar cotação
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <BeforeYouProceed lang="pt" className="mt-10" />
      </main>
    </div>
  );
}
