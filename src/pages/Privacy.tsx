import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useT } from "@/lib/i18n";
import { useCanonical } from "@/lib/useCanonical";
import { openConsentBanner } from "@/lib/consent";

const CONTROLLER_EMAIL = "info@businessmatching.global";
const COMPANY = "ENZO ALDO STOBBIONE LTDA (Business Matching Global)";
const ADDRESS = "Avenida Getúlio Vargas, 671, Sala 500, CEP 30.112-021, Savassi, Belo Horizonte/MG, Brasil";
const CNPJ = "67.589.228/0001-30";

type Section = { h: string; p: (string | JSX.Element)[] };
type Content = { title: string; updated: string; intro: string; sections: Section[]; back: string };

const content: Record<"en" | "it" | "pt", Content> = {
  it: {
    title: "Informativa Privacy",
    updated: "Ultimo aggiornamento: 19 giugno 2026",
    back: "Torna alla home",
    intro:
      "La presente informativa descrive come Business Matching Global tratta i tuoi dati personali in conformità al Regolamento (UE) 2016/679 (GDPR) e alla Lei Geral de Proteção de Dados brasiliana — Lei n. 13.709/2018 (LGPD).",
    sections: [
      {
        h: "1. Titolare del trattamento",
        p: [
          `${COMPANY}, con sede in ${ADDRESS}, CNPJ ${CNPJ}. Contatto per ogni questione relativa alla privacy: `,
          <a key="e" href={`mailto:${CONTROLLER_EMAIL}`} className="text-primary underline">{CONTROLLER_EMAIL}</a>,
          ". Al momento non è stato nominato un Responsabile della Protezione dei Dati (DPO / Encarregado): le richieste vanno indirizzate direttamente al titolare.",
        ],
      },
      {
        h: "2. Dati raccolti",
        p: [
          "Tramite il modulo di contatto e le email che ci invii raccogliamo: nome, indirizzo email, nome dell'azienda (facoltativo) e il contenuto del messaggio. Non utilizziamo cookie di profilazione né strumenti di tracciamento pubblicitario. Non raccogliamo categorie particolari di dati (art. 9 GDPR / art. 11 LGPD).",
        ],
      },
      {
        h: "3. Finalità e base giuridica",
        p: [
          "I dati sono trattati esclusivamente per: (a) rispondere alla tua richiesta di informazioni o di servizi; (b) inviarti eventuali preventivi o documenti collegati al contatto. Basi giuridiche: consenso esplicito dell'interessato (art. 6.1.a GDPR / art. 7, I LGPD) ed esecuzione di misure precontrattuali su tua richiesta (art. 6.1.b GDPR / art. 7, V LGPD).",
        ],
      },
      {
        h: "4. Modalità e luogo del trattamento",
        p: [
          "I dati vengono conservati nelle caselle email del titolare. Il trattamento avviene in Italia e in Brasile. Eventuali trasferimenti UE↔Brasile sono coperti dalle basi di trasferimento previste dal Capo V GDPR e dal Capo V LGPD; ti chiediamo il consenso al trasferimento internazionale quando applicabile.",
        ],
      },
      {
        h: "5. Periodo di conservazione",
        p: [
          "I messaggi e i dati di contatto sono conservati per il tempo necessario a gestire la tua richiesta e per un massimo di 24 mesi successivi all'ultima comunicazione, salvo obblighi di legge che impongano periodi più lunghi. Trascorso tale periodo i dati vengono cancellati o resi anonimi.",
        ],
      },
      {
        h: "6. Condivisione con terzi",
        p: [
          "I tuoi dati non sono ceduti né venduti. Possono essere trattati dal provider della casella email del titolare in qualità di responsabile del trattamento. Potranno essere comunicati ad autorità pubbliche solo se richiesto dalla legge.",
        ],
      },
      {
        h: "7. I tuoi diritti",
        p: [
          "Hai diritto a: accesso, rettifica, cancellazione, limitazione, portabilità, opposizione e revoca del consenso (artt. 15–22 GDPR; art. 18 LGPD). Puoi esercitare i tuoi diritti scrivendo a ",
          <a key="e" href={`mailto:${CONTROLLER_EMAIL}`} className="text-primary underline">{CONTROLLER_EMAIL}</a>,
          ". Hai inoltre diritto di proporre reclamo al Garante Privacy (Italia / UE) o all'ANPD (Brasile).",
        ],
      },
      {
        h: "8. Riferimento al consenso",
        p: [
          "L'invio del modulo di contatto richiede la spunta esplicita della casella di consenso al trattamento. Il consenso è libero, specifico, informato e revocabile in qualsiasi momento scrivendo all'indirizzo email del titolare, senza pregiudicare la liceità dei trattamenti effettuati prima della revoca.",
        ],
      },
      {
        h: "9. Modifiche all'informativa",
        p: [
          "Questa informativa può essere aggiornata. La versione vigente è sempre quella pubblicata su questa pagina con la data di ultimo aggiornamento riportata in alto.",
        ],
      },
      {
        h: "10. Cookie, Google Analytics 4 e LinkedIn Insight Tag",
        p: [
          "Il sito utilizza Google Analytics 4 (fornito da Google LLC) e il LinkedIn Insight Tag (fornito da LinkedIn Corporation) per l'analisi del traffico e la misurazione delle campagne pubblicitarie. Questi strumenti installano cookie sul tuo dispositivo e trasferiscono dati ai rispettivi fornitori, con sede negli Stati Uniti. Vengono caricati esclusivamente dopo che hai prestato consenso esplicito tramite il banner cookie; se rifiuti, nessuno script di tracciamento viene eseguito e nessun cookie viene installato. Puoi modificare o revocare il consenso in qualsiasi momento cliccando su ",
          <button key="c" type="button" onClick={() => openConsentBanner()} className="text-primary underline">Preferenze cookie</button>,
          " nel footer del sito.",
        ],
      },
    ],
  },
  en: {
    title: "Privacy Notice",
    updated: "Last updated: 19 June 2026",
    back: "Back to home",
    intro:
      "This notice describes how Business Matching Global processes your personal data in accordance with the EU General Data Protection Regulation (Regulation (EU) 2016/679 — GDPR) and the Brazilian Lei Geral de Proteção de Dados — Law no. 13.709/2018 (LGPD).",
    sections: [
      {
        h: "1. Data controller",
        p: [
          `${COMPANY}, registered at ${ADDRESS}, CNPJ ${CNPJ}. Contact for any privacy-related matter: `,
          <a key="e" href={`mailto:${CONTROLLER_EMAIL}`} className="text-primary underline">{CONTROLLER_EMAIL}</a>,
          ". No Data Protection Officer (DPO / Encarregado) has been appointed at this time — please contact the controller directly.",
        ],
      },
      {
        h: "2. Data we collect",
        p: [
          "Through the contact form and emails you send us, we collect: name, email address, company name (optional) and the content of your message. We do not use profiling cookies or advertising trackers. We do not collect special categories of data (Art. 9 GDPR / Art. 11 LGPD).",
        ],
      },
      {
        h: "3. Purposes and legal basis",
        p: [
          "Data is processed exclusively to: (a) reply to your request for information or services; (b) send you proposals or documents related to your enquiry. Legal bases: the data subject's explicit consent (Art. 6(1)(a) GDPR / Art. 7, I LGPD) and the performance of pre-contractual steps at your request (Art. 6(1)(b) GDPR / Art. 7, V LGPD).",
        ],
      },
      {
        h: "4. How and where we process data",
        p: [
          "Data is kept in the controller's email inboxes. Processing takes place in Italy and Brazil. Any EU↔Brazil transfers are covered by the safeguards set out in Chapter V GDPR and Chapter V LGPD; where applicable we ask for your consent to international transfer.",
        ],
      },
      {
        h: "5. Retention",
        p: [
          "Messages and contact data are kept for as long as needed to handle your request and for up to 24 months after our last exchange, unless longer retention is required by law. After that period data is deleted or anonymised.",
        ],
      },
      {
        h: "6. Sharing with third parties",
        p: [
          "Your data is never sold or transferred for commercial purposes. It may be processed by the email provider of the controller acting as a data processor. Disclosure to public authorities only occurs when required by law.",
        ],
      },
      {
        h: "7. Your rights",
        p: [
          "You have the right to: access, rectification, erasure, restriction, portability, objection and withdrawal of consent (Arts. 15–22 GDPR; Art. 18 LGPD). To exercise your rights, write to ",
          <a key="e" href={`mailto:${CONTROLLER_EMAIL}`} className="text-primary underline">{CONTROLLER_EMAIL}</a>,
          ". You may also lodge a complaint with your EU supervisory authority or with the Brazilian ANPD.",
        ],
      },
      {
        h: "8. Reference to consent",
        p: [
          "Submitting the contact form requires explicit ticking of the consent box. Consent is freely given, specific, informed and may be withdrawn at any time by writing to the controller's email — without affecting the lawfulness of processing carried out before withdrawal.",
        ],
      },
      {
        h: "9. Changes to this notice",
        p: [
          "This notice may be updated. The version in force is always the one published on this page, with the last-updated date shown at the top.",
        ],
      },
      {
        h: "10. Cookies, Google Analytics 4 and LinkedIn Insight Tag",
        p: [
          "This site uses Google Analytics 4 (provided by Google LLC) and the LinkedIn Insight Tag (provided by LinkedIn Corporation) for traffic analysis and advertising measurement. These tools set cookies on your device and transfer data to their respective providers, which are based in the United States. They are loaded only after you have given explicit consent through the cookie banner; if you decline, no tracking script is executed and no cookie is set. You can change or withdraw your consent at any time by clicking ",
          <button key="c" type="button" onClick={() => openConsentBanner()} className="text-primary underline">Cookie preferences</button>,
          " in the site footer.",
        ],
      },
    ],
  },
  pt: {
    title: "Aviso de Privacidade",
    updated: "Última atualização: 19 de junho de 2026",
    back: "Voltar para a home",
    intro:
      "Este aviso descreve como a Business Matching Global trata seus dados pessoais em conformidade com a Lei Geral de Proteção de Dados — Lei nº 13.709/2018 (LGPD) e com o Regulamento (UE) 2016/679 (GDPR).",
    sections: [
      {
        h: "1. Controlador dos dados",
        p: [
          `${COMPANY}, com sede em ${ADDRESS}, CNPJ ${CNPJ}. Contato para assuntos de privacidade: `,
          <a key="e" href={`mailto:${CONTROLLER_EMAIL}`} className="text-primary underline">{CONTROLLER_EMAIL}</a>,
          ". No momento não há Encarregado pelo Tratamento de Dados (DPO) nomeado — as solicitações devem ser enviadas diretamente ao controlador.",
        ],
      },
      {
        h: "2. Dados coletados",
        p: [
          "Pelo formulário de contato e pelos e-mails que você nos envia coletamos: nome, e-mail, nome da empresa (opcional) e o conteúdo da mensagem. Não usamos cookies de perfilamento nem rastreadores publicitários. Não coletamos dados sensíveis (art. 11 LGPD / art. 9 GDPR).",
        ],
      },
      {
        h: "3. Finalidades e base legal",
        p: [
          "Os dados são tratados exclusivamente para: (a) responder à sua solicitação de informações ou serviços; (b) enviar propostas ou documentos relacionados ao contato. Bases legais: consentimento do titular (art. 7, I LGPD / art. 6.1.a GDPR) e execução de procedimentos preliminares a contrato a pedido do titular (art. 7, V LGPD / art. 6.1.b GDPR).",
        ],
      },
      {
        h: "4. Como e onde tratamos os dados",
        p: [
          "Os dados ficam nas caixas de e-mail do controlador. O tratamento ocorre na Itália e no Brasil. Eventuais transferências UE↔Brasil seguem as salvaguardas previstas no Capítulo V da LGPD e do GDPR; quando aplicável, solicitamos seu consentimento para transferência internacional.",
        ],
      },
      {
        h: "5. Prazo de conservação",
        p: [
          "As mensagens e dados de contato são mantidos pelo tempo necessário para atender à sua solicitação e por até 24 meses após a última troca, salvo obrigação legal de retenção mais longa. Depois desse prazo os dados são excluídos ou anonimizados.",
        ],
      },
      {
        h: "6. Compartilhamento",
        p: [
          "Seus dados não são vendidos nem cedidos. Podem ser tratados pelo provedor de e-mail do controlador na qualidade de operador. Eventual comunicação a autoridades públicas ocorre apenas por exigência legal.",
        ],
      },
      {
        h: "7. Seus direitos",
        p: [
          "Você tem direito a: confirmação, acesso, correção, anonimização, eliminação, portabilidade, oposição e revogação do consentimento (art. 18 LGPD; arts. 15–22 GDPR). Para exercer seus direitos escreva para ",
          <a key="e" href={`mailto:${CONTROLLER_EMAIL}`} className="text-primary underline">{CONTROLLER_EMAIL}</a>,
          ". Você também pode apresentar reclamação à ANPD ou à autoridade europeia competente.",
        ],
      },
      {
        h: "8. Referência ao consentimento",
        p: [
          "O envio do formulário exige a marcação explícita da caixa de consentimento. O consentimento é livre, específico, informado e pode ser revogado a qualquer momento por e-mail ao controlador, sem prejuízo da licitude dos tratamentos realizados antes da revogação.",
        ],
      },
      {
        h: "9. Alterações deste aviso",
        p: [
          "Este aviso pode ser atualizado. A versão em vigor é sempre a publicada nesta página, com a data de última atualização indicada no topo.",
        ],
      },
      {
        h: "10. Cookies, Google Analytics 4 e LinkedIn Insight Tag",
        p: [
          "Este site utiliza o Google Analytics 4 (fornecido pela Google LLC) e o LinkedIn Insight Tag (fornecido pela LinkedIn Corporation) para análise de tráfego e mensuração de campanhas publicitárias. Essas ferramentas instalam cookies no seu dispositivo e transferem dados aos respectivos fornecedores, sediados nos Estados Unidos. São carregadas somente após o seu consentimento explícito por meio do banner de cookies; se você recusar, nenhum script de rastreamento é executado e nenhum cookie é instalado. Você pode alterar ou revogar seu consentimento a qualquer momento clicando em ",
          <button key="c" type="button" onClick={() => openConsentBanner()} className="text-primary underline">Preferências de cookies</button>,
          " no rodapé do site.",
        ],
      },
    ],
  },
};

export default function Privacy() {
  const { lang } = useT();
  useCanonical("/privacy", {
    title: lang === "it" ? "Privacy — Business Matching Global" : lang === "pt" ? "Privacidade — Business Matching Global" : "Privacy — Business Matching Global",
    description: "GDPR / LGPD privacy notice.",
  });
  const c = content[lang];
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container max-w-3xl py-16 md:py-24">
        <div className="flex items-center justify-between gap-4 mb-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> {c.back}
        </Link>
          <LangSwitcher />
        </div>
        <h1 className="font-display text-4xl md:text-5xl tracking-tight mb-3">{c.title}</h1>
        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-8">{c.updated}</p>
        <p className="text-base md:text-lg text-foreground/80 leading-relaxed mb-12">{c.intro}</p>
        <div className="space-y-10">
          {c.sections.map((s) => (
            <section key={s.h}>
              <h2 className="font-display text-xl md:text-2xl mb-3">{s.h}</h2>
              <p className="text-foreground/75 leading-relaxed">{s.p}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}