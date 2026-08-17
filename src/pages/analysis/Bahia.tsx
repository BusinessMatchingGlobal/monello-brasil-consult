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

const TITLE = "The Discount That Was a Balance Sheet";

const BACK = {
  it: "Torna alle analisi",
  en: "Back to analysis",
  pt: "Voltar às análises",
} as const;

const body: Block[] = [
  { p: "On Monday 17 August 2026, with a judicial recovery filing already public and its shares down more than 30%, Brazil's largest appliance retailer sent out a promotional email extending its discount campaign. This was not an oversight. It was the plan." },
  { tag: "#CustoBrasil" },
  { p: "Over the weekend of 16–17 August 2026, Grupo Casas Bahia filed for recuperação judicial at the Foro Central Cível in São Paulo. For European readers: recuperação judicial is Brazil's court-supervised restructuring procedure, the functional cousin of Chapter 11 in the United States or of the composizione negoziata and concordato preventivo in Italy. It freezes enforcement actions by creditors while the company negotiates a plan. The filing was approved unanimously by the board and by the controlling shareholder, and disclosed to the CVM, Brazil's securities regulator, on Sunday night. Several logistics subsidiaries were included in the perimeter." },
  { p: "The numbers in the petition: R$17.3 billion in liabilities, of which roughly R$16.4 billion is owed to quirografário creditors — unsecured creditors, those with no collateral behind their claim, who sit at the back of the queue — plus R$754 million in labour debts and R$154 million owed to micro and small enterprises. When the market opened on Monday, BHIA3 fell as far as R$0.45, down almost 32% by 10:28 Brasília time and roughly 36% at its worst, on top of a near-80% decline over the year. The auditors had already flagged a material uncertainty about the company's ability to continue as a going concern, which is the accounting profession's most formal way of saying it may not survive the year." },
  { p: "There is a technical detail in the petition that explains its timing better than any of those figures. The group's contracts carry cross-default and acceleration clauses — vencimento antecipado — under which news of a reorganisation could make everything come due at once, alongside enforcement of guarantees and demands for early payment. The filing exists to freeze that cascade before it starts. Which reframes the whole event: the company was not filing because it had stopped generating cash — free cash flow over twelve months ran to some R$4 billion. It filed because the structure of its liabilities had become a loaded spring, where the first creditor to move would trigger all the others." },
  { p: "At 11:49 Brasília time, while that was happening, a marketing email went out to the company's mailing list. Subject line: A Invasão ainda não acabou — "The Invasion isn't over yet." The Invasão de Ofertas, the discount campaign, had been extended. Up to R$2,000 off when paying by Pix — Brazil's instant bank-transfer system, operated by the central bank, which settles in seconds and costs the merchant almost nothing. Up to 50% off with the coupon code INVASAO. Valid until 23:59 that same day. A banner across the top: Compre pelo WhatsApp." },
  { p: "The easy reading is that marketing hadn't read the news. But the news was already twelve hours old, on every front page in the country, and the campaign was extended anyway. The court filing and the coupon are not a contradiction to be explained away. They are two halves of one liquidity operation, and the second one is where the money actually comes from." },
  { h: "Who Casas Bahia is, for those who have never seen one" },
  { p: "Almost nobody outside Brazil knows the name, and almost nobody inside Brazil doesn't. The scale is roughly that of Darty in France or MediaWorld in Italy, but the history is not comparable to either." },
  { p: "The company was founded in 1952 in São Caetano do Sul, in the industrial belt of São Paulo, by Samuel Klein, a Polish immigrant who started out selling bed linen door to door, letting customers pay in instalments recorded in a notebook. The buyers were largely migrants from the Northeast — many from the state of Bahia — who had come south for factory work and whom no bank would lend to. The shop was named after them." },
  { p: "That is worth pausing on. Europe's large retailers are named after their founders, their cities, or their categories. This one is named after the customers no institution would finance. The lending was not a service bolted onto the shop; the lending was the reason the shop existed, and the mascot that has stood at its door since 1979 — the Baianinho, a small boy in a Northeastern cangaceiro hat — is a picture of the borrower, not of the goods." },
  { p: "The group as it exists today was assembled in 2010, when the Klein family's Casas Bahia merged with the Ponto Frio chain owned by Grupo Pão de Açúcar. It traded for a decade as Via Varejo before taking the Casas Bahia name for the whole group, and it is listed on the B3 exchange in São Paulo under BHIA3. At the end of 2025 it operated 1,042 stores. Nine months later it is in court." },
  { h: "What the promotion actually is" },
  { p: "Casas Bahia posted a net loss of R$10.1 billion in the second quarter of 2026. Most of that is accounting: write-downs of deferred tax assets, goodwill, contract revisions, restructuring costs. The operating business is less dramatic — net revenue actually rose 1.6% to R$6.98 billion, and gross margin improved to 32.9%." },
  { p: "The line that matters is elsewhere. Free cash flow in the quarter was positive by R$798 million — and analysts at XP pointed out that this came mainly from a R$1.2 billion reduction in inventories." },
  { p: "Read that slowly. The cash that kept the company standing during the quarter was not earned from a better business. It was extracted from the warehouse. Merchandise already on the shelf — much of it financed by suppliers — was converted into money." },
  { p: "The Invasão de Ofertas is not a comment on the crisis. It is the mechanism. The coupon in your inbox and the R$798 million on the cash flow statement are the same event, seen from two ends." },
  { p: "And this is why the discount is anchored to Pix rather than to the crediário." },
  { h: "The company that sold credit, not appliances" },
  { p: "Casas Bahia was built, from 1952 onwards, on the crediário: in-house instalment credit, sold in the store, to customers the banks would not touch. The refrigerator was the pretext. The product was the financing, and the margin lived in the interest rate and in the credit insurance attached to it." },
  { p: "A crediário sale generates a receivable — money the company will collect over months. A receivable has to be funded in the meantime, and in Brazil today it is funded against a Selic benchmark rate of 15%. (Selic is the central bank's policy rate; think ECB refi rate, at roughly five times the level.) A Pix sale generates cash in the same second, with no funding cost, no default risk, no collection apparatus." },
  { p: "So a company that spent seventy years teaching Brazil to buy on instalments is now paying customers R$2,000 not to use instalments. That is not a promotion. That is a business model being switched off, publicly, in a banner ad." },
  { p: "The company says so itself. In the petition it describes facing the worst financial crisis since its foundation, and argues that the rise in the Selic rate from 2021 onwards produced especially severe effects because its operation is structurally dependent on the crediário. The carnê — the paper payment booklet the customer takes home and pays off month by month at the counter — still accounts for about 16% of sales. Sixteen percent of revenue, and enough of the economics to sink the whole balance sheet when the funding cost triples. That is the sentence European suppliers should read twice: a retailer explaining to a judge that it was destroyed not by its customers, not by its competitors, but by the central bank's policy rate acting on its financing model." },
  { p: "This is also not the first time the warehouse has been used as an ATM. In 2023 the group ran a restructuring plan that closed 55 stores, cut 8,600 jobs and reduced inventories by R$1 billion. That bought a year. In June 2024 came the out-of-court restructuring. In August 2026, the courthouse." },
  { h: "The trap on the other side" },
  { p: "The restructuring plan announced in August — the company's "Phase 2" — includes gradually reducing exposure to fornecedor convênio, also called risco sacado: reverse factoring, the arrangement in which a bank pays the supplier early and the retailer settles with the bank later. In practice it is the supplier financing the retailer's shelf through a bank intermediary. It is also, in a restructuring, one of the first things to disappear, because banks stop extending it precisely when it is most needed." },
  { p: "XP's concern was exactly this — the broker put its rating and target price under review, citing the risk that suppliers would tighten terms further once the reorganisation became public, squeezing product availability going into the fourth quarter: Black Friday and Christmas, the two months that carry the Brazilian retail year. A second front was opening at the same time, with unions preparing collective action over the August dismissals." },
  { p: "Put the halves together and the shape of the trap is clear. You empty the warehouse to generate cash. The court filing protects you from creditors. But the same filing is the reason nobody will fill the warehouse back up in time for the only season that pays." },
  { p: "The company knows it. In the second-quarter report it acknowledges that certain goods are already missing from certain sales channels — the shelf is visibly thinning. And within hours of the filing becoming public, it emerged that Casas Bahia had begun structuring a loan of around R$1 billion, from funds and banks, for the specific purpose of restocking." },
  { p: "The form of that loan matters more than the amount. It is being assembled as DIP financing — debtor-in-possession, borrowed from US practice and written into Brazilian law by the 2020 reform of the bankruptcy statute. New money lent to a company already in court protection is granted extraconcursal status: it is repaid ahead of the creditors who were there before, and it keeps that priority even if the recovery fails and the company is liquidated. It is the instrument that keeps a restructuring alive, and it works precisely because it jumps the queue." },
  { p: "Now hold three facts together. R$1.2 billion of inventory was converted into cash over the quarter, which is what kept the company breathing. R$16.4 billion of unsecured claims are frozen in the recovery. And roughly R$1 billion of new money is being raised to put the inventory back — money that will stand ahead of all of them." },
  { p: "The discount campaign did not solve anything. It moved the problem from the warehouse to the loan book, charged the customer a 50% coupon for the transfer, and every step of the fix pushes the existing supplier one rung further down the queue." },
  { p: "The August cuts closed 298 of the 1,042 stores the group had at the end of 2025, with dismissals reported at around 1,900 and put by the company itself at roughly 3,000. In June 2024 it had already completed an out-of-court restructuring that reprofiled about R$4.1 billion and stretched the average maturity of its debt from 22 to 72 months. That deal reached banks and bondholders. It did not reach landlords, employees, or suppliers — which is precisely the set of creditors that mass store closures create. Hence the courthouse." },
  { h: "The control group" },
  { p: "Before concluding that Brazilian retail credit is simply unworkable at these rates, look at the counter-example." },
  { p: "There is another large Brazilian retailer, founded in the 1980s in Santa Catarina, still owned by its founder and not listed on any exchange. It sells to broadly the same customer: households in the interior, in mid-sized cities, buying appliances and home goods. It runs its own store card and its own direct customer financing, and that financing produced around R$800 million of financial revenue last year. Same country, same Selic, same borrower profile, same instalment logic." },
  { p: "Its 2025 results: net revenue of R$13.7 billion, up around 16%, and net profit of R$3.45 billion — up 28%, the best year in its history. It closed the year in net cash, having paid off its outstanding debentures, with net-debt-to-EBITDA at minus 0.2. Its 2026 expansion plan — fifteen new megastores, over a billion reais of investment — is being funded out of operating cash flow, and a credit review this spring concluded it could absorb a 20% fall in cash generation and still execute the plan. Its net margin has been running above 22%, against single digits for much of the listed sector." },
  { p: "Two companies, one rate environment, one customer base, one basic idea about selling on instalments. One financed the shelf with other people's money — banks, bondholders, and suppliers through reverse factoring — and is now in court, asking permission to borrow a billion at super-priority to put stock back on that shelf. The other financed the shelf with its own retained earnings and is spending a billion this year to build fifteen more." },
  { p: "The honest caveat: they are not identical businesses. The profitable one is a variety megastore rather than a specialist appliance chain, sells 95% in physical stores, tightened its credit criteria deliberately after the pandemic, and carries no obligation to a public market that rewards growth quarter by quarter. Its credit is a real profit centre but a smaller share of the whole." },
  { p: "That caveat is the point rather than a hedge. The Brazilian crediário did not kill anybody. Leverage did. In a country where money costs 15%, the retailer that lends to its customers has to be funded by equity, not by debt — because it is running a bank, and a bank funded with borrowed money at those rates is a countdown. One firm read that constraint and slowed down. The other kept the growth rate and outsourced the funding, first to bondholders, then to suppliers, and finally to a judge." },
  { h: "What the European supplier should take from this" },
  { p: "The instinct in Milan or Munich is to file this under a big retailer went bust, it happens everywhere. It does. But the mechanism is not the same, and the difference is operational, not cultural." },
  { p: "In a European market, a distressed retailer in liquidation mode is selling stock below cost to raise cash. Its business model — buy, mark up, sell — is intact; only its balance sheet is broken. In Brazil, the retailer that discounts for instant payment is dismantling the thing that made it profitable in the first place, because the profit was never in the mark-up. It was in the credit. In Brazilian mass retail, the shelf is a customer-acquisition channel for a lending business." },
  { p: "For anyone selling into that channel from Europe — appliances, small domestic electricals, furniture — three consequences follow immediately, and none of them are visible in the sales forecast:" },
  { p: "Your distributor's solvency is a monetary-policy variable, not a commercial one. At Selic 15%, a retailer whose margin lives in instalment credit is squeezed by the central bank, not by your pricing." },
  { p: "If your goods are being moved through reverse factoring, you are a lender. Check whether your Brazilian receivable is a trade credit or a bank-intermediated one, and what happens to it in a recuperação judicial. Unsecured is the default position, and R$16.4 billion of company is standing in that queue ahead of nobody — while DIP money raised tomorrow will stand ahead of all of it." },
  { p: "A deep discount on your product is a signal about your buyer's cash position, not about your brand. When the discount is structured around instant payment, it is a liquidity event with a marketing headline on top." },
  { p: "Watch who ends up financing the restock. A retailer in recovery that needs a billion reais to refill its shelves will look for it in three places: funds, banks, and you. The first two will demand super-priority and get it. The third is asked for the same money at the back of the queue, and the request will not arrive labelled as credit — it will arrive as an extended payment term on a large seasonal order." },
  { p: "The email arrived at 11:49, with the filing already public and the share price down a third. Nobody was being cynical, and nobody had failed to read the news. Somebody was doing the only thing left that turns a shelf into money." },
  { p: "Note on the timestamp: the email in question was read in an Italian inbox, which displayed it as 16:49 local time. Brazil's commercial hours run five hours behind Central European Summer Time. Reconstructing a Brazilian chronology from a European screenshot is a small trap, and it is worth naming — it is the same category of error as reading a Brazilian balance sheet with European assumptions about where the profit sits." },
  { p: "Business Matching Global — market intelligence and business orchestration on the EU–Brazil corridor." },
];

export default function Bahia() {
  const { lang } = useT();
  const article = getArticleBySlug("bahia");
  useCanonical(`/bahia`);

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
                {new Date(article.date).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })}
              </time>
              {article.updated && article.updated !== article.date && (
                <>
                  <span>—</span>
                  <span>
                    updated{" "}
                    {new Date(article.updated).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })}
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
