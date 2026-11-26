import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FooterInner } from "@/components/SiteFooter";
import { EXPORT_SERVICES_PATH } from "@/lib/langPath";
import { SITE, useCanonical } from "@/lib/useCanonical";
import { Nav } from "./AboutUs";

const pageTitle = "Serviços para exportação de empresas brasileiras";
const subtitle = "Cuidamos desde já de detalhes que à primeira vista parecem irrelevantes, mas que com o tempo podem virar problemas.";

const services = [
  {
    title: "Mercado-alvo",
    text: "Análise de mercado por país e por produto, com base em fontes verificadas: regras de acesso, concorrência, canais de venda e preços praticados.",
  },
  {
    title: "Apoio no exterior",
    text: "Trabalhamos na Europa por conta da empresa: verificação independente de importadores, distribuidores e parceiros antes da assinatura de qualquer contrato.",
  },
  {
    title: "Regulamentações, acordos e barreiras",
    text: "Antecipamos as questões regulatórias, contratuais e de proteção de marca no país de destino, com escritórios especializados, cada um em um único âmbito, que faturam diretamente ao cliente.",
  },
  {
    title: "Oportunidades de negócios",
    text: "Identificação de importadores e compradores na Europa, com lista verificada, mediante contrato. Não atuamos como intermediários e não trabalhamos por comissão.",
  },
  {
    title: "Feiras e eventos",
    text: "Preparação da participação em feiras e missões na Europa, para que cada encontro chegue com objetivos definidos e interlocutores verificados.",
  },
  {
    title: "E-commerce",
    text: "Venda direta ao consumidor europeu a partir do e-commerce próprio: regras de importação, tributação e proteção de marca no país de destino.",
  },
];

const workingTerms = [
  {
    title: "Como trabalhamos",
    text: "Primeiro as perguntas, depois as respostas. Ao final, a empresa recebe as alternativas possíveis com prós e contras e a nossa recomendação. Entre as alternativas está sempre também a de não fazer nada, com os seus custos. A decisão fica com a empresa. Todo o trabalho é feito por escrito, para que cada passo fique documentado.",
  },
  {
    title: "Como somos remunerados",
    text: "Somos remunerados exclusivamente pelo cliente, com honorários declarados antes do início do trabalho, que não mudam no meio do caminho. Não recebemos comissões de importadores, distribuidores ou fornecedores, nem pagamos comissões a terceiros. Os escritórios parceiros apresentam orçamentos fechados e faturam diretamente ao cliente; qualquer trabalho adicional é orçado por escrito e aprovado antes de começar. Por isso trabalhamos somente no interesse de quem nos contrata, inclusive quando a resposta é não entrar em um mercado ou não fechar com um parceiro.",
  },
  {
    title: "Confidencialidade",
    text: "Não falamos de clientes nem de casos que os envolvem: a confidencialidade é a nossa regra padrão, com ou sem acordo de sigilo. Nas nossas análises usamos apenas casos públicos e documentados. É a mesma garantia que oferecemos a quem nos contrata.",
  },
];

export default function ServicosExportacaoBrasil() {
  useCanonical(EXPORT_SERVICES_PATH, {
    title: pageTitle,
    description: subtitle,
    url: SITE + EXPORT_SERVICES_PATH,
    alternates: [{ hreflang: "pt-BR", href: SITE + EXPORT_SERVICES_PATH }],
  });

  return (
    <div lang="pt-BR" className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <header className="container pt-32 md:pt-44 pb-12 md:pb-16">
          <div className="mx-auto flex max-w-[64rem] flex-col items-start gap-[1.4rem] min-[701px]:flex-row min-[701px]:items-center min-[701px]:gap-[3.25rem]">
            <div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight">{pageTitle}</h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{subtitle}</p>
            </div>
            <img
              src="/images/brasil-ponte-exportacao.webp"
              alt="Ponte em forma de seta liga o centro do Brasil ao mundo."
              width={1448}
              height={1086}
              className="h-auto w-[8rem] shrink-0 min-[701px]:w-[15.5rem]"
            />
          </div>
        </header>

        <section className="border-t border-border/60 py-12 md:py-16">
          <div className="container max-w-4xl">
            <h2 className="font-display text-2xl md:text-3xl mb-5">A outra ponta do corredor</h2>
            <p className="max-w-3xl text-base md:text-lg leading-relaxed text-muted-foreground">
              A Business Matching Global (BMG) atua no corredor entre a União Europeia e o Brasil, com inteligência de mercado e orquestração de negócios. Para a empresa brasileira que quer exportar para a Europa, somos a outra ponta do corredor: trabalhamos no mercado de destino por conta dela, enquanto as decisões continuam dentro da empresa.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-foreground text-background">
          <div className="container max-w-6xl">
            <h2 className="font-display text-3xl md:text-4xl mb-10">O que fazemos</h2>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {services.map(({ title, text }) => (
                <article key={title} className="p-6 md:p-7 rounded-2xl border border-background/10 bg-background/[0.04]">
                  <h3 className="font-display text-xl md:text-2xl mb-3">{title}</h3>
                  <p className="text-background/80 leading-relaxed">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <div className="container max-w-4xl py-12 md:py-20">
          <div className="divide-y divide-border/60">
            {workingTerms.map(({ title, text }) => (
              <section key={title} className="py-8 md:py-10 first:pt-0">
                <h2 className="font-display text-2xl md:text-3xl mb-5">{title}</h2>
                <p className="max-w-3xl text-base md:text-lg leading-relaxed text-muted-foreground">{text}</p>
              </section>
            ))}
            <section className="py-8 md:py-10">
              <h2 className="font-display text-2xl md:text-3xl mb-5">Nossas análises</h2>
              <p className="max-w-3xl text-base md:text-lg leading-relaxed text-muted-foreground">
                Publicamos regularmente análises sobre o corredor entre a Europa e o Brasil, baseadas apenas em casos públicos e fontes verificadas.
              </p>
              <Button asChild size="lg" className="mt-6 rounded-full">
                <a href="https://bmg.businessmatching.global/">
                  Ler as análises <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
            </section>
            <section id="contact" className="scroll-mt-24 py-8 md:py-10">
              <h2 className="font-display text-2xl md:text-3xl mb-5">Contato</h2>
              <p className="max-w-3xl text-base md:text-lg leading-relaxed text-muted-foreground">
                Escreva para <a href="mailto:info@businessmatching.global" className="text-primary underline underline-offset-4">info@businessmatching.global</a> contando o seu produto e o mercado europeu que interessa. Respondemos por escrito.
              </p>
            </section>
          </div>
          <p className="mt-6 md:mt-10 border-l-2 border-amber pl-5 font-display text-2xl md:text-3xl leading-snug">
            Respondemos às perguntas que o cliente fez. E àquelas que não fez, mas que teria valido a pena fazer.
          </p>
        </div>
      </main>
      <FooterInner />
    </div>
  );
}
