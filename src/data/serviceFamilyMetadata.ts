import type { Lang } from "../lib/lang";

export const SERVICE_FAMILIES = [
  {
    "key": "decide",
    "paths": {
      "en": "/services/is-brazil-worth-it",
      "it": "/servizi/il-brasile-conviene",
      "pt": "/servicos/a-europa-vale-a-pena"
    },
    "titles": {
      "en": "Is Brazil worth it?",
      "it": "Il Brasile conviene?",
      "pt": "A Europa vale a pena?"
    },
    "intros": {
      "en": "Before investing in Brazil, find out whether your product has room there, where, and at what price. Two ways to get a written answer, with sources.",
      "it": "Prima di investire in Brasile, scoprite se il vostro prodotto ha spazio, dove e a quale prezzo. Due modi per avere una risposta scritta, con le fonti.",
      "pt": "Antes de investir na Europa, descubram se o seu produto tem espaço, em quais países e a que preço. Duas formas de obter uma resposta por escrito, com fontes."
    }
  },
  {
    "key": "verify",
    "paths": {
      "en": "/services/verify",
      "it": "/servizi/verificare",
      "pt": "/servicos/verificar"
    },
    "titles": {
      "en": "Verify",
      "it": "Verificare",
      "pt": "Verificar"
    },
    "intros": {
      "en": "Who is the company in front of you? Four levels of verification, from the lightest to the deepest: start from the first one that answers your question.",
      "it": "Chi è l'azienda che avete davanti? Quattro livelli di verifica, dal più leggero al più approfondito: partite dal primo che risponde alla vostra domanda.",
      "pt": "Quem é a empresa à sua frente? Quatro níveis de verificação, do mais leve ao mais profundo: comecem pelo primeiro que responde à sua pergunta."
    }
  },
  {
    "key": "prepare",
    "paths": {
      "en": "/services/prepare-your-entry",
      "it": "/servizi/preparare-ingresso",
      "pt": "/servicos/preparar-a-entrada"
    },
    "titles": {
      "en": "Prepare your entry",
      "it": "Preparare l'ingresso",
      "pt": "Preparar a entrada"
    },
    "intros": {
      "en": "You have decided to look at Brazil seriously. Here you build the plan: competitors, market, rules, the real landed cost and the entry project.",
      "it": "Avete deciso di guardare al Brasile sul serio. Qui si costruisce il piano: concorrenti, mercato, regole, costo reale di arrivo e progetto di ingresso.",
      "pt": "Vocês decidiram olhar para a Europa com seriedade. Aqui se constrói o plano: concorrentes, mercado, regras, custo real de chegada e projeto de entrada."
    }
  },
  {
    "key": "find",
    "paths": {
      "en": "/services/find-and-connect",
      "it": "/servizi/trovare-e-contattare",
      "pt": "/servicos/encontrar-e-contatar"
    },
    "titles": {
      "en": "Find and connect",
      "it": "Trovare e contattare",
      "pt": "Encontrar e contatar"
    },
    "intros": {
      "en": "The right buyers, distributors and partners, selected, verified and approached in the local language on your behalf. We don't sell lists: we open conversations.",
      "it": "I compratori, i distributori e i partner giusti, selezionati, verificati e contattati per voi nella lingua locale. Non vendiamo liste: apriamo conversazioni.",
      "pt": "Os compradores, distribuidores e parceiros certos, selecionados, verificados e abordados em seu nome no idioma local. Não vendemos listas: abrimos conversas."
    }
  },
  {
    "key": "stay",
    "paths": {
      "en": "/services/stay-on-the-market",
      "it": "/servizi/presidiare-il-mercato",
      "pt": "/servicos/estar-presente"
    },
    "titles": {
      "en": "Stay on the market",
      "it": "Presidiare il mercato",
      "pt": "Estar presente no mercado"
    },
    "intros": {
      "en": "Already active in Brazil? A desk on the Brazilian side, at the level you need: from monitoring to a full export desk.",
      "it": "Siete già attivi in Brasile? Un desk dal lato brasiliano, al livello che vi serve: dal monitoraggio a un ufficio export completo.",
      "pt": "Já atuam na Europa? Uma base do outro lado do corredor, no nível de que vocês precisam: do monitoramento a um departamento de exportação completo."
    }
  },
  {
    "key": "training",
    "paths": {
      "en": "/services/training",
      "it": "/servizi/formazione",
      "pt": "/servicos/treinamento"
    },
    "titles": {
      "en": "Training for companies, chambers and associations",
      "it": "Formazione per aziende, camere di commercio e associazioni",
      "pt": "Treinamento para empresas, câmaras de comércio e associações"
    },
    "intros": {
      "en": "Webinars and workshops built on real cases, for teams, members and events.",
      "it": "Webinar e workshop costruiti su casi reali, per team, associati ed eventi.",
      "pt": "Webinars e workshops construídos sobre casos reais, para equipes, associados e eventos."
    }
  }
] as const;
export type ServiceFamilyKey = (typeof SERVICE_FAMILIES)[number]["key"];
export function familyPath(key: ServiceFamilyKey, lang: Lang): string {
  const family = SERVICE_FAMILIES.find(f => f.key === key);
  if (!family) throw new Error(`Unknown service family: ${key}`);
  return family.paths[lang];
}
export function localizeFamilyPath(path: string, lang: Lang): string {
  const [pathname, hash] = path.split("#");
  const family = SERVICE_FAMILIES.find(f => Object.values(f.paths).some(p => p === pathname));
  return (family?.paths[lang] ?? pathname) + (hash ? `#${hash}` : "");
}
