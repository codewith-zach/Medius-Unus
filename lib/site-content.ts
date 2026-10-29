export const site = {
  name: "Medius Unus Nigeria Limited",
  shortName: "Medius Unus",
  tagline: "Connecting expertise, opportunity and execution.",
  phone: "+234 807 308 8868",
  email: "info@mediusunus.com",
  bookUrl: "https://cal.com/medius-unus/consultation",
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/sectors", label: "Sectors" },
  { href: "/partners", label: "Partners & Affiliations" },
  { href: "/contact", label: "Contact" },
];

export type Service = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  bullets: string[];
};

export const services: Service[] = [
  {
    slug: "strategic-management-advisory",
    title: "Strategic & Management Advisory",
    summary:
      "Supporting organisations as they assess priorities, define strategic direction and translate plans into coordinated action.",
    description:
      "Medius Unus supports organisations as they assess priorities, define strategic direction and translate plans into coordinated action. Work may include strategic reviews, operating-model considerations, organisational planning, stakeholder alignment and implementation roadmaps.",
    bullets: [
      "Strategic planning and business reviews",
      "Operating-model and organisational considerations",
      "Decision support and implementation roadmaps",
      "Stakeholder alignment and change planning",
    ],
  },
  {
    slug: "corporate-finance",
    title: "Corporate Finance & Financial Advisory",
    summary:
      "Supporting organisations as they evaluate financing needs, consider funding options and prepare for financial and commercial decisions.",
    description:
      "Medius Unus can support corporations, government entities and private organisations as they evaluate financing needs, consider funding options and prepare for financial and commercial decisions. Depending on the engagement, work may include financial analysis, budget planning, capital-structure considerations and coordination with relevant finance providers or advisers.",
    bullets: [
      "Funding-needs assessment and financing-option analysis",
      "Budget planning and financial analysis",
      "Commercial and investment appraisal support",
      "Coordination with relevant lenders, investors or professional advisers",
    ],
  },
  {
    slug: "ma-divestments",
    title: "Mergers, Acquisitions & Divestments",
    summary:
      "Helping structure transactions, identify potential counterparties and coordinate discussions among relevant parties.",
    description:
      "Medius Unus supports organisations exploring acquisitions, divestments and strategic transactions by helping structure the process, identify potential counterparties and coordinate discussions among relevant parties. The scope of each engagement is defined clearly and may involve external legal, financial, tax or technical specialists.",
    bullets: [
      "Buyer, seller or strategic-counterparty identification",
      "Transaction preparation and coordination",
      "Commercial discussions and process management",
      "Stakeholder coordination and next-step planning",
    ],
  },
  {
    slug: "programme-project-management",
    title: "Programme & Project Management",
    summary:
      "Identifying, planning, executing, managing and monitoring major transformation programmes and multiple projects simultaneously.",
    description:
      "Medius Unus prides itself on the ability to identify, plan, execute, manage and monitor major transformation programmes and multiple projects simultaneously. This service covers multiple sectors, particularly investment banking and oil and gas.",
    bullets: [
      "Programme planning and governance",
      "Project coordination and delivery oversight",
      "Milestone, dependency and risk tracking",
      "Stakeholder communication and reporting",
      "Change implementation and transition planning",
    ],
  },
  {
    slug: "process-improvement",
    title: "Process Improvement & Organisational Transformation",
    summary:
      "Advocating continuous process improvement to support cost efficiency and better ways of working, in and out of the office.",
    description:
      "The vast experience of Medius Unus's senior management enables the firm to advocate continuous process improvement to support cost efficiency and offer staff in organisations an improved work-life balance, both in and out of the office, by improving the way they work.",
    bullets: [
      "Process reviews and process mapping",
      "Standard operating procedures and operational manuals",
      "Governance and control improvements",
      "Organisational redesign and change support",
      "Efficiency and workflow improvement",
    ],
  },
  {
    slug: "market-entry",
    title: "Market Entry, Partnerships & Local Representation",
    summary:
      "Local market orientation, stakeholder engagement and representative support for organisations exploring opportunities in Nigeria.",
    description:
      "For organisations exploring opportunities in Nigeria, Medius Unus can provide local market orientation, stakeholder engagement and representative support where covered by an agreed mandate. The firm's international perspective and understanding of the Nigerian business environment can help organisations understand the context and plan their next steps.",
    bullets: [
      "Market-entry orientation and opportunity assessment",
      "Stakeholder mapping and engagement support",
      "Local representation where covered by an agreed mandate",
      "Partner identification and relationship coordination",
      "Cross-border business facilitation",
    ],
  },
  {
    slug: "regulatory-governance",
    title: "Regulatory Change, Governance & Compliance Implementation",
    summary:
      "Translating requirements and policy objectives into coordinated implementation activity, governance arrangements and practical processes.",
    description:
      "Drawing on leadership experience in financial services and regulatory change, Medius Unus can support organisations in translating requirements and policy objectives into coordinated implementation activity, governance arrangements, controls and practical processes.",
    bullets: [
      "Regulatory implementation planning",
      "Governance and control frameworks",
      "Implementation roadmaps and stakeholder coordination",
      "Operational documentation and reporting processes",
    ],
  },
  {
    slug: "institutional-development",
    title: "Institutional Development & Capacity Building",
    summary:
      "Strengthening institutional capability through structured training, programme design and coordination with subject-matter experts.",
    description:
      "Medius Unus may support institutions seeking to strengthen capability through structured training, programme design and coordination with relevant subject-matter experts. International training programmes can be shaped around an institution's objectives, participants and desired outcomes.",
    bullets: [
      "Training-needs and objective definition",
      "Programme and provider coordination",
      "International training logistics and stakeholder liaison",
      "Post-training recommendations and follow-up, where commissioned",
    ],
  },
];

export type Sector = {
  slug: string;
  title: string;
  summary: string;
  description: string;
};

export const sectors: Sector[] = [
  {
    slug: "oil-gas",
    title: "Oil & Gas",
    summary: "Cross-border business facilitation and technology-related opportunities.",
    description:
      "Medius Unus engages with opportunities in the oil-and-gas sector, including cross-border business facilitation and technology-related opportunities. Any public description of a specific technology or provider is based only on approved materials and distinguishes supplier claims from independently validated results.",
  },
  {
    slug: "solid-minerals",
    title: "Solid Minerals & Mining",
    summary:
      "A confirmed government mandate to facilitate engagement with potential investors in solid-mineral resources.",
    description:
      "Medius Unus has a confirmed government mandate to facilitate engagement with potential investors in solid-mineral resources. Further details are shared only through an authorised enquiry process.",
  },
  {
    slug: "banking-financial-services",
    title: "Banking & Financial Services",
    summary:
      "Leadership experience across regulatory implementation, restructuring, remediation and data migration.",
    description:
      "Leadership experience includes financial-services regulatory implementation, branch-opening processes, organisational reorganisation and restructuring, remediation of futures and options trading tools, and data migration to cloud environments.",
  },
  {
    slug: "manufacturing",
    title: "Manufacturing & Industrial Development",
    summary:
      "Commercial connections, industrial opportunities and relevant business discussions under an agreed mandate.",
    description:
      "Medius Unus can support commercial connections, industrial opportunities and relevant business discussions where supported by an agreed mandate and appropriate permissions.",
  },
  {
    slug: "public-sector",
    title: "Public Sector & Institutional Development",
    summary:
      "Leadership background informing policy implementation, capacity building, governance and investment facilitation.",
    description:
      "The firm's leadership background in public-sector roles and institutional engagement may inform work related to policy implementation, capacity building, governance and investment facilitation.",
  },
];

export const partnerCategories: { title: string; orgs: string[] }[] = [
  {
    title: "Strategic & Technology Partners",
    orgs: [
      "POWELTEC",
      "Greenville",
      "VLISCO",
      "NERC",
      "Johan Consults",
      "Advisory Key",
      "Champion Construction",
      "Rotech Construction",
      "Miracool",
    ],
  },
  {
    title: "International Business Relationships",
    orgs: [
      "Kensington and Chelsea Chamber of Commerce",
      "Chamber of Commerce Bruxelles",
    ],
  },
  {
    title: "Local Corporate & Institutional Partners",
    orgs: ["Plateau State Government", "Bauchi State Government"],
  },
  {
    title: "Representation Mandates",
    orgs: ["POWELTEC — France", "Plateau State Government", "Bauchi State Government"],
  },
];

export const values = [
  {
    title: "Integrity",
    text: "Build relationships on trust, discretion and responsible conduct.",
  },
  {
    title: "Collaboration",
    text: "Bring complementary expertise and stakeholders together around shared objectives.",
  },
  {
    title: "Practical delivery",
    text: "Translate strategy into clear actions, accountable plans and implementable solutions.",
  },
  {
    title: "Context and insight",
    text: "Recognise the importance of local realities, institutional environments and international perspectives.",
  },
  {
    title: "Long-term value",
    text: "Prioritise solutions intended to create durable organisational and commercial benefits.",
  },
];

export const howWeWork = [
  "Understand the client's objectives, constraints and operating environment.",
  "Identify relevant expertise, stakeholders and potential routes forward.",
  "Develop a structured approach with roles, milestones and expected deliverables.",
  "Support coordination and implementation where this is within the agreed engagement.",
  "Review progress and help translate lessons into practical improvements.",
];
