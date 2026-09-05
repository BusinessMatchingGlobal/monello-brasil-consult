import type { ServiceGroup } from "./servicesCatalog";

export const servicesIntroEN = {
  title: "Our Services",
  intro:
    "From checking a single company to a full market entry project. Every service has a clear scope, a starting price, and indicative delivery times. Start wherever you need.",
  markets: "Main markets: Brazil · Italy · European Union · Latin America",
  more: "Learn more",
  request: "Request",
  forWhom: "Who it's for:",
};

export const serviceGroupsEN: ServiceGroup[] = [
  {
    num: "01",
    label: "Get an answer",
    items: [
      {
        name: "Ask Brazil / Ask Europe",
        tagline: "One business question about a foreign market, one documented answer.",
        bullets: [
          "Written answer, 1–2 pages, with sources",
          "Market, competitors, distribution, import/export, or any other business information",
          "Delivery normally within 48–72 hours",
          "One question per engagement, clearly defined scope",
        ],
        audience: [
          "Companies exploring a market but not yet ready for a full analysis",
          "Export managers who need a precise answer for leadership",
          "Anyone who received a proposal from abroad and wants context before replying",
          "Professionals — accountants, attorneys, consultants — with a client active between Europe and Brazil",
        ],
        examples:
          'Sample questions: "Who are the main importers of my product in Brazil?" · "What duties and taxes does my product pay at entry?" · "Does this industry require registrations or licenses?" · "How is this product typically sold in that market?"',
        price: "starting at €79",
      },
    ],
  },
  {
    num: "02",
    label: "Verify",
    items: [
      {
        name: "Company Check",
        tagline: "Who is this company?",
        bullets: [
          "Existence and registration status",
          "Ownership, officers, and basic information",
          "Reputation and public risk signals",
          "Final summary with a clear risk-level indication",
        ],
        audience: [
          "Anyone who received an order or inquiry from a company they don't know",
          "Anyone about to send a first quote, price list, or samples",
          "Anyone who met a counterpart at a trade show or online and wants to know if they're real",
          "Anyone deciding whether a negotiation deserves their time",
        ],
        price: "starting at €150 — delivery normally in 2–3 business days",
      },
      {
        name: "Supplier Check",
        tagline: "Know your supplier before you trust them with your order.",
        bullets: [
          "Everything included in the Company Check",
          "Products and publicly available certifications",
          "Available information on structure and production capacity",
          "Commercial footprint and main points of attention",
        ],
        audience: [
          "Anyone about to place a first order or wire a deposit to an untested supplier",
          "Anyone who found the supplier online or at a trade show and has never visited them",
          "Anyone choosing among several candidate suppliers",
          "Importers who can't afford the wrong container",
        ],
        price: "starting at €190 — delivery normally in 3–4 business days",
      },
      {
        name: "Business Due Diligence",
        tagline: "What risks should I know before committing?",
        bullets: [
          "Corporate structure, ownership, and officers",
          "Business activity, commercial footprint, and reputation",
          "Publicly available litigation and red flags",
          "Consistency check of the information provided",
          "Executive summary with key red flags",
        ],
        audience: [
          "Anyone about to sign a supply, distribution, or agency agreement",
          "Anyone considering territorial exclusivity or deferred payment terms",
          "Anyone who noticed inconsistencies and wants clarity before moving forward",
          "Anyone who must present the counterpart to partners, banks, or the board",
        ],
        price: "starting at €350 — delivery normally in 5–7 business days",
      },
      {
        name: "Enhanced Due Diligence",
        tagline: "The deal matters: let's go deeper.",
        bullets: [
          "Everything included in the Business Due Diligence",
          "Targeted deep dives on the specific transaction",
          "Local professionals engaged when legal, tax, or documentary verification is required",
          "Extended report and debrief session",
        ],
        audience: [
          "Anyone preparing a joint venture, equity partnership, or investment",
          "Anyone about to close a multi-year or high-value contract",
          "Anyone entering a transaction that will require local legal, tax, or documentary checks",
          "Anyone who must satisfy internal compliance requirements before signing",
        ],
        price: "starting at €750 — delivery normally in 2–3 weeks",
      },
    ],
  },
  {
    num: "03",
    label: "Assess the market",
    items: [
      {
        name: "Competitor Snapshot",
        sampleReport: "/sample-report",
        tagline: "Who's already in the market you want to reach.",
        bullets: [
          "Main competitors in the target market",
          "Products, positioning, and sales channels",
          "Indicative prices where available",
          "Comparative summary",
        ],
        audience: [
          "Anyone who must set positioning and pricing before making a move",
          'Anyone who\'s been told "someone\'s already doing it" and wants to know how true that is',
          "Anyone preparing for a trade show or mission who wants to arrive knowing the players",
          "Anyone looking for the space competitors have left uncovered",
        ],
        price: "starting at €199 — delivery normally in 1 week",
      },
      {
        name: "Opportunity Scan",
        sampleReport: "/sample-report",
        tagline: "Does your product have room in that market?",
        bullets: [
          "Market, imports, and competitors",
          "Distribution channels and potential buyers",
          "Main barriers to entry",
          "Final recommendation: GO / INVESTIGATE / LOW PRIORITY, with reasoning",
        ],
        audience: [
          'Anyone wondering "would my product work there?" and wanting an honest answer',
          "Anyone choosing between two or more markets to focus their energy on",
          "Anyone deciding whether a trade show, mission, or full analysis is worth the investment",
          "Anyone who'd rather spend €290 on a no today than €29,000 on a no a year from now",
        ],
        price: "starting at €290 — delivery normally in 1 week",
      },
      {
        name: "Market Analysis",
        sampleReport: "/sample-report",
        tagline: "Understand the market before you enter it.",
        bullets: [
          "Market size and characteristics for your product or industry",
          "Potential demand, sales channels, and positioning",
          "Most promising geographic areas",
          "Competition and key players",
          "Regulations, duties, and barriers at a glance",
        ],
        audience: [
          "Anyone who has decided to enter and needs to build the plan: where, how, with whom",
          "Anyone choosing geography, channel, and positioning",
          "Anyone presenting the project to partners, banks, or the board",
          "Anyone applying for internationalization grants that require a market analysis",
        ],
        price: "starting at €500 — delivery normally in 2 weeks",
      },
      {
        name: "Import/Export Briefing",
        tagline: "Get requirements, procedures, and risks clear before the operation starts.",
        bullets: [
          "Procedures and required documentation",
          "Product classification and applicable rules",
          "Key customs, tax, and regulatory requirements",
          "Typical mistakes and pitfalls to avoid",
          "Sources, references, and practical guidance",
        ],
        audience: [
          "Anyone with a first shipment or first order on the horizon",
          "Anyone who must quote and calculate the true landed cost of their product",
          "Anyone who wants to keep their container from sitting in customs over a missing document",
          "Anyone who already has a counterpart and needs to make the deal operational",
        ],
        price: "starting at €600 — delivery normally in 1–2 weeks",
      },
    ],
  },
  {
    num: "04",
    label: "Find",
    note: "We select. We don't pad lists.",
    items: [
      {
        name: "Buyer Finder — Starter",
        tagline: "A shortlist of potential buyers selected for your product.",
        bullets: [
          "Shortlist of compatible buyers, importers, or distributors (normally 10–20, depending on the industry)",
          "Company contact details",
          "A brief note on why each one is relevant",
        ],
        audience: [
          "Anyone with a product ready who wants the right first names to contact",
          "Anyone who wants to test market response before investing more",
          "Anyone with their own sales structure who just needs the raw material: the contacts",
        ],
        price: "starting at €199 — delivery normally in 1 week",
      },
      {
        name: "Buyer Finder — Pro",
        tagline: "The extended market map, ranked by priority.",
        bullets: [
          "Extended market analysis (normally 30–50 companies considered)",
          "Selection of the most promising, with contacts and profiles",
          "Segmentation and commercial priority",
        ],
        audience: [
          "Anyone who wants the full picture of demand, not just the first names",
          "Anyone choosing the right distributor and wanting to compare options",
          "Export managers building the year's commercial pipeline",
          "Anyone preparing a structured outreach campaign who wants to start from the map",
        ],
        price: "starting at €490 — delivery normally in 2 weeks",
      },
      {
        name: "Supplier Finder",
        tagline: "Find who can produce or supply for you.",
        bullets: [
          "Search for producers/suppliers in the target market",
          "Pre-selection and company information",
          "Preliminary comparison of candidates",
        ],
        audience: [
          "Anyone who wants to import and doesn't know where to start finding producers",
          "Anyone dependent on a single supplier who wants concrete alternatives",
          "Anyone looking for a producer for their private label",
          "Anyone who received an offer and wants to benchmark it against the market",
        ],
        price: "starting at €290 — delivery normally in 1–2 weeks",
      },
    ],
  },
  {
    num: "05",
    label: "Make contact",
    items: [
      {
        name: "Buyer Search + Outreach",
        tagline: "Not just the list: we make the first contact.",
        bullets: [
          "Buyer search and identification of the relevant contacts",
          "Message crafted in the local language",
          "First contact and follow-up",
          "Report of the responses received",
        ],
        audience: [
          "Anyone without the time, language, or structure to approach the market alone",
          "Anyone who's already bought contact lists that ended up in a drawer",
          "Anyone who wants qualified responses on their desk, not names to work through",
          "Anyone who knows a poorly written first message burns the contact forever",
        ],
        price: "starting at €1,200 — normally 4–6 weeks",
      },
      {
        name: "B2B Agenda for Missions & Trade Shows",
        tagline: "Arrive in the market with your meetings already set.",
        bullets: [
          "Agenda of qualified meetings, built on your profile",
          "Counterpart selection and groundwork before you arrive",
          "Appointment logistics",
          "Optional accompaniment",
          "Direct service where BMG has local presence and network (Belo Horizonte, São Paulo, others on request)",
        ],
        audience: [
          "Anyone traveling for a trade show or mission with only a few days on the ground",
          "Anyone who wants the cost of the trip to turn into real meetings, not courtesy visits",
          "Companies on a collective mission that want their own agenda beyond the official program",
          "Anyone who wants someone local preparing the ground before they land",
        ],
        price: "starting at €800 per company — preparation normally 3–4 weeks",
      },
      {
        name: "Business Matching Campaign",
        tagline: "From search to meeting, we manage the whole journey.",
        bullets: [
          "Search and qualification of potential partners",
          "Contact and response management",
          "Meetings arranged with interested companies",
          "Final campaign report",
        ],
        audience: [
          "Anyone seeking a partner — distributor, agent, strategic supplier — who wants the process professionally managed",
          "Anyone without an export office who has no intention of building one for a single market",
          "Anyone who's tried alone and learned they need someone on the ground",
        ],
        price: "starting at €2,000 — normally 6–8 weeks",
      },
    ],
  },
  {
    num: "06",
    label: "Enter the market",
    items: [
      {
        name: "Market Entry Project",
        tagline: "The complete market entry project.",
        bullets: [
          "Entry analysis and strategy",
          "Partner search and contacts",
          "Negotiation support",
          "Local coordination",
        ],
        audience: [
          "Anyone who has decided to enter the market and wants a single point of contact orchestrating the whole journey",
          "Anyone negotiating with local counterparts who wants someone at their side who knows the codes, the language, and the practices",
          "Companies considering a stable presence — importer, subsidiary, partnership — who want to get there step by step",
        ],
        price: "from €2,500 per project — quote based on scope — normally 2–3 months",
      },
    ],
  },
  {
    num: "07",
    label: "Stay on the market",
    items: [
      {
        name: "BMG Intelligence Desk",
        tagline: "Your intelligence desk, every month.",
        bullets: [
          "Research and checks on demand",
          "Monitoring of competitors, customers, and suppliers",
          "Actionable information for commercial decisions",
        ],
        audience: [
          "Companies already active in the market with new questions every month: a price, a competitor, a counterpart",
          "Anyone who wants to notice market moves before reading about them in the news",
          'Anyone who\'s needed "urgent" research more than once and prefers a desk already engaged',
        ],
        price: "starting at €290/month",
      },
      {
        name: "Local Business Support",
        tagline: "An operational presence in the market, without opening an office.",
        bullets: [
          "Verification of counterparts",
          "Information gathering and contacts",
          "Appointments and support in relationships with local partners",
        ],
        audience: [
          "Anyone with customers, suppliers, or partners in the market and no one local to follow them",
          "Anyone who wants orders, deliveries, and issues handled in the right time zone and the right language",
          "Companies not (yet) ready to open an office, but no longer able to manage everything remotely",
        ],
        price: "starting at €500/month",
      },
      {
        name: "Commercial Representation — Light",
        tagline: "Your contacts in the market, kept warm.",
        bullets: [
          "Market presence and contact management",
          "Follow-up on leads and opportunities",
          "Periodic reporting",
        ],
        audience: [
          "Anyone who has entered the market and has contacts to keep warm, but not enough to justify a dedicated hire",
          "Anyone who closed a campaign or a mission and doesn't want the leads to go cold",
          "Anyone who wants an ongoing commercial presence at a subscription cost",
        ],
        price: "starting at €300/month + variable terms defined by agreement",
      },
      {
        name: "Commercial Representation — Full",
        tagline: "Your commercial representation in the market.",
        bullets: [
          "Active business development",
          "Participation in meetings and trade shows",
          "Negotiation support",
          "Periodic reporting",
        ],
        audience: [
          "Anyone with concrete sales targets who wants someone actively developing, not just maintaining",
          "Anyone who wants to be represented at trade shows, meetings, and negotiations by someone who knows the market from the inside",
        ],
        price: "starting at €700/month + variable terms defined by agreement",
      },
      {
        name: "Fractional Export Desk",
        tagline: "Your export desk in the market, without building an internal structure.",
        bullets: [
          "Ongoing business development and prospecting",
          "Lead management, meetings, and trade shows",
          "Follow-up and reporting",
          "Coordination with your company's sales leadership",
        ],
        audience: [
          "Companies that want an export office in the market without hiring one",
          "Anyone whose volume and ambitions have outgrown a light representation",
          "Anyone who wants a single person reporting to their sales leadership the way an in-house export manager would",
        ],
        price: "from €1,500/month + variable terms defined by agreement",
      },
    ],
  },
  {
    num: "08",
    label: "Training",
    items: [
      {
        name: "Custom Webinar",
        tagline: "The topic your team or your members need.",
        bullets: [
          "60–90 minutes including Q&A",
          "Topics: the Brazilian market, EUDR, supplier credit, corridor compliance, market entry",
          "Materials included",
        ],
        audience: [
          "Chambers of commerce and associations that want to offer their members concrete content",
          "Companies that need to align the team on a market or a regulation",
          "Event organizers looking for a speaker who talks operations, not theory",
        ],
        price: "starting at €300 (chambers and associations) / €500 (corporate)",
      },
      {
        name: "Workshop / Training",
        tagline: "Half day or full day, online or in person.",
        bullets: [
          "Half day (3–4 hours): from €600",
          "Full day (6–7 hours): from €1,000",
          "Program built on the company's own case",
          "In person: + out-of-pocket expenses",
        ],
        audience: [
          "Companies preparing market entry that want the team ready, on their own real case",
          "Anyone heading to a trade show or mission who wants to arrive prepared on market, counterparts, and negotiation",
          "Anyone who wants to bring the method in-house, not just the report",
        ],
        price: "",
      },
    ],
  },
];

export const servicesNotesEN = {
  title: "NOTES",
  items: [
    'Pricing. Prices shown are minimum starting amounts ("starting at"). The final quote is provided in a specific, no-obligation proposal, which the client is free to accept or decline.',
    "Timelines. Delivery times shown are indicative. Actual turnaround and delivery deadlines are set out in the detailed proposal and, like the price, become binding only upon acceptance.",
    'Performance-based services. Terms — including exactly what counts as a "result" — are defined in detail at the proposal stage and formalized in writing before work begins.',
    "Quality over quantity. The number of counterparts identified depends on the market: in niche industries there may be few, but all relevant. We select and assess real matching potential: that's why we never promise a minimum number of contacts — only the selected contacts with the highest likelihood of success.",
    "No generic databases. Companies are selected based on your product, target market, and commercial profile. Our research combines public sources, databases, and business intelligence tools, always subject to human verification.",
    "Nature of verification and due diligence services. They are informational and business-intelligence in nature, based on the sources accessible for each specific case. They are conducted rigorously on reliable, verified data; however, they cannot cover circumstances that are not foreseeable or knowable through ordinary diligence, and they do not constitute professional legal, tax, accounting, or financial due diligence.",
    "Professional network. Where needed, BMG can coordinate deeper reviews with trusted, qualified professionals from its network.",
    "Currencies and payments. All prices are in EUR. Payment can be made fee-free via SEPA or, also at no extra cost, in BRL (Pix/TED) at the Banco Central do Brasil PTAX selling rate, or in USD (ACH), GBP (Faster Payments), AUD, NZD, and CAD (domestic transfer) at the ECB reference rate — in all cases, at the rate of the business day before the invoice date.",
  ],
};
