import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Download, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCanonical, SITE } from "@/lib/useCanonical";
import { Nav, InfoBar } from "@/pages/OurServices";

const PATH = "/servicos/business-matching";

const ALTERNATES = [
  { hreflang: "it", href: "/servizi/business-matching" },
  { hreflang: "en", href: "/services/business-matching" },
  { hreflang: "pt", href: "/servicos/business-matching" },
  { hreflang: "x-default", href: "/services/business-matching" },
];

const steps: Array<[string, string]> = [
  [
    "Definimos o perfil",
    "Antes de buscar, definimos juntos quem estamos procurando: setor, porte, país ou região, canal, volumes, capacidade técnica. Um perfil preciso vale mais do que uma busca ampla.",
  ],
  [
    "Mapeamos o mercado",
    "Construímos o universo de empresas que correspondem ao perfil, cruzando registros públicos, bases profissionais, juntas comerciais europeias, associações setoriais e conhecimento direto do mercado.",
  ],
  [
    "Selecionamos e verificamos",
    "Reduzimos o mapeamento a uma lista curta. De cada empresa verificamos existência e regularidade, atuação efetiva, porte, posicionamento e — quando possível — quem realmente decide.",
  ],
  [
    "Abordamos",
    "Com seu mandato, entramos em contato no idioma local, apresentamos sua proposta e qualificamos o interesse real. Quem não responde ou não tem interesse não é entregue a você como «lead».",
  ],
  [
    "Apresentamos",
    "Colocamos você em contato direto com quem manifestou interesse concreto, e preparamos a conversa: quem está do outro lado, como opera, o que esperar.",
  ],
];

const deliverables = [
  "A lista selecionada, com ficha de cada empresa: atuação, porte, posicionamento, o que foi verificado e por que se encaixa no perfil.",
  "O resultado de cada abordagem, empresa por empresa: quem respondeu, quem demonstrou interesse, quem recusou e por qual motivo. Recusa também é informação — diz algo sobre o mercado.",
  "As apresentações, com o contexto necessário para você chegar preparado à primeira conversa.",
];

const notDoing = [
  "Não vendemos bases de dados nem listas prontas.",
  "Não apresentamos como «contato qualificado» uma empresa que nunca respondeu.",
  "Não prometemos um número de reuniões antes de ter visto o mercado.",
  "Não trabalhamos para dois clientes concorrentes no mesmo perfil e no mesmo período.",
];

const formats: Array<[string, string]> = [
  ["Mapeamento e seleção", "quando você já tem estrutura comercial e precisa apenas saber com quem falar."],
  ["Mapeamento, seleção e abordagem", "o percurso completo, da pesquisa à apresentação."],
  ["Acompanhamento contínuo", "quando o mercado precisa ser acompanhado ao longo do tempo, e não explorado uma única vez."],
];

const faqs: Array<[string, string]> = [
  [
    "Em quanto tempo?",
    "Depende da amplitude do perfil e do setor. O mapeamento com seleção costuma levar algumas semanas; a fase de abordagem depende do tempo de resposta do mercado — e na Europa agosto é praticamente parado, com o sul do continente fechando por semanas inteiras.",
  ],
  [
    "Em que idioma vocês abordam as empresas?",
    "No idioma local de cada país. A correspondência é reportada a você traduzida.",
  ],
  [
    "Vocês trabalham no sentido inverso também?",
    "Sim. Buscamos parceiros brasileiros para empresas europeias com o mesmo método.",
  ],
  [
    "E se o mercado não responder?",
    "Dizemos, com os dados na mão. Um mercado que não responde vale o custo da pesquisa: evita que você construa uma estratégia em cima dele.",
  ],
  [
    "Minha consulta é confidencial?",
    "Sim. Seu nome chega às contrapartes apenas quando você autoriza, e a fase inicial pode ser conduzida sem revelar quem é o cliente.",
  ],
];

function useStructuredData() {
  useEffect(() => {
    const graph = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          name: "Business Matching Brasil–Europa",
          serviceType: "Business matching e busca de parceiros comerciais",
          url: SITE + PATH,
          provider: { "@id": SITE + "/#organization" },
          areaServed: [
            { "@type": "Country", name: "Brasil" },
            { "@type": "Country", name: "Itália" },
            { "@type": "AdministrativeArea", name: "União Europeia" },
          ],
          description:
            "Identificamos, verificamos e abordamos compradores, distribuidores, fornecedores e parceiros industriais na Europa.",
        },
        {
          "@type": "FAQPage",
          mainEntity: faqs.map(([q, a]) => ({
            "@type": "Question",
            name: q,
            acceptedAnswer: { "@type": "Answer", text: a },
          })),
        },
      ],
    };
    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = "ld-business-matching-br";
    el.textContent = JSON.stringify(graph);
    document.head.appendChild(el);
    return () => {
      el.remove();
    };
  }, []);
}

export default function BusinessMatchingBR() {
  useCanonical(PATH, {
    title: "Business Matching Brasil–Europa | Busca e qualificação de parceiros europeus",
    description:
      "Identificamos, verificamos e abordamos compradores, distribuidores, fornecedores e parceiros industriais na Europa. Não vendemos listas — abrimos conversas.",
    alternates: ALTERNATES,
  });
  useStructuredData();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <section className="pt-32 md:pt-44 pb-12 md:pb-16">
          <div className="container max-w-4xl">
            <span className="text-xs tracking-wider uppercase text-primary mb-4 inline-block">
              Business Matching
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight">
              Um contato não é uma lista. É uma conversa que começa.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed text-justify">
              Identificamos, verificamos e abordamos — em seu nome — os compradores, distribuidores,
              importadores, fornecedores ou parceiros industriais certos na Europa.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full">
                <a href="/#contact">
                  Vamos conversar <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full">
                <Link to="/sample-report">
                  <Download className="mr-1 h-4 w-4" /> Baixe um exemplo de relatório (PDF)
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-20 border-t border-border/60">
          <div className="container max-w-3xl">
            <h2 className="font-display text-2xl md:text-3xl mb-6">O problema das listas</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-justify">
              <p>
                Qualquer um compra uma lista de empresas. As bases existem, custam pouco e devolvem centenas de
                nomes em minutos.
              </p>
              <p>
                Aí começam os problemas. Metade daquelas empresas já não atua no setor em que está cadastrada. Um
                terço não tem porte ou estrutura para trabalhar com você. Algumas são concorrentes do seu futuro
                parceiro. E nenhuma sabe quem você é, porque ninguém as procurou ainda.
              </p>
              <p>
                Uma lista não é uma oportunidade comercial. É matéria-prima que alguém ainda precisa trabalhar — e
                esse alguém costuma ser você, num idioma que não domina e num mercado que não conhece.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-foreground text-background">
          <div className="container max-w-5xl">
            <h2 className="font-display text-2xl md:text-3xl text-background mb-10">Como trabalhamos</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {steps.map(([title, body], i) => (
                <div
                  key={title}
                  className="p-6 md:p-7 rounded-2xl bg-background/[0.04] border border-background/10"
                >
                  <span className="text-xs tracking-wider uppercase text-primary">0{i + 1} —</span>
                  <h3 className="font-display text-xl md:text-2xl text-background mt-1 mb-3">{title}</h3>
                  <p className="text-background/70 leading-relaxed text-justify">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 md:py-20">
          <div className="container max-w-3xl">
            <h2 className="font-display text-2xl md:text-3xl mb-6">O que você recebe</h2>
            <ul className="space-y-4">
              {deliverables.map((d) => (
                <li key={d} className="flex gap-3 text-muted-foreground leading-relaxed text-justify">
                  <Check className="h-5 w-5 mt-0.5 text-primary shrink-0" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-14 md:py-20 border-t border-border/60">
          <div className="container max-w-3xl">
            <h2 className="font-display text-2xl md:text-3xl mb-6">
              O que a Europa vai perguntar antes de responder
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-justify">
              <p>Este é o ponto em que a maioria das abordagens brasileiras trava, e vale antecipar.</p>
              <p>
                Um distribuidor europeu, antes de discutir preço, quer saber se o produto pode entrar: certificação
                aplicável, conformidade com as regras do bloco, rastreabilidade da cadeia, capacidade de
                fornecimento constante e documentação em ordem. Não é burocracia por gosto — é o que ele precisa
                ter para não responder pessoalmente pelo que coloca no mercado.
              </p>
              <p>
                Uma abordagem que chega sem essas respostas prontas não é recusada: é adiada. E adiada, na prática,
                quer dizer perdida.
              </p>
              <p>Mapeamos essas exigências junto com as empresas, para que a conversa comece no ponto certo.</p>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-20 border-t border-border/60">
          <div className="container max-w-3xl">
            <h2 className="font-display text-2xl md:text-3xl mb-6">Como medimos o trabalho</h2>
            <p className="text-lg text-foreground/90 mb-5">
              Não contamos nomes entregues. Contamos conversas abertas.
            </p>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-justify">
              <p>
                Um mapeamento pode devolver quarenta empresas e produzir quatro com quem vale a pena falar. Outro
                devolve doze e produz seis. O número não é o resultado: o resultado é quantas dessas portas
                realmente se abrem.
              </p>
              <p>
                Por isso não prometemos quantidade antecipadamente. Dizemos quantas empresas consideramos, quantas
                passaram na verificação e quantas responderam.
              </p>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-20 border-t border-border/60">
          <div className="container max-w-3xl">
            <h2 className="font-display text-2xl md:text-3xl mb-6">O que não fazemos</h2>
            <ul className="space-y-4">
              {notDoing.map((n) => (
                <li key={n} className="flex gap-3 text-muted-foreground leading-relaxed">
                  <X className="h-5 w-5 mt-0.5 text-amber shrink-0" />
                  <span>{n}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-14 md:py-20 border-t border-border/60">
          <div className="container max-w-4xl">
            <h2 className="font-display text-2xl md:text-3xl mb-8">Formatos</h2>
            <div className="grid md:grid-cols-3 gap-5">
              {formats.map(([title, desc]) => (
                <div key={title} className="p-6 rounded-2xl border border-border/70">
                  <h3 className="font-display text-lg mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-sm text-muted-foreground leading-relaxed text-justify">
              Cada projeto é orçado sobre o escopo acordado. São possíveis formatos com componente vinculado a
              resultado, definidos caso a caso.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="rounded-full">
                <a href="/#contact">
                  Solicite um orçamento <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-20 border-t border-border/60">
          <div className="container max-w-3xl">
            <h2 className="font-display text-2xl md:text-3xl mb-8">Perguntas frequentes</h2>
            <dl className="space-y-6">
              {faqs.map(([q, a]) => (
                <div key={q}>
                  <dt className="font-display text-lg mb-2">{q}</dt>
                  <dd className="text-muted-foreground leading-relaxed text-justify">{a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="py-12 border-t border-border/60">
          <div className="container max-w-3xl text-sm text-muted-foreground leading-relaxed">
            <p>
              Ainda precisa entender se o mercado existe? Comece pela{" "}
              <Link to="/Our_Services" className="underline hover:text-foreground">
                Business Intelligence
              </Link>
              . Já encontrou o parceiro e precisa saber como fazer a mercadoria chegar? Veja{" "}
              <Link to="/Our_Services" className="underline hover:text-foreground">
                Import/Export Intelligence
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-foreground text-background">
          <div className="container max-w-3xl text-center">
            <h2 className="font-display text-3xl md:text-4xl text-background mb-5">
              Mercado nenhum se abre sozinho.
            </h2>
            <p className="text-background/70 leading-relaxed mb-8">
              Conte o que você está procurando e diremos com franqueza se conseguimos encontrar.
            </p>
            <Button asChild size="lg" className="rounded-full">
              <a href="/#contact">
                Vamos conversar <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
          </div>
        </section>
      </main>
      <InfoBar />
    </div>
  );
}
