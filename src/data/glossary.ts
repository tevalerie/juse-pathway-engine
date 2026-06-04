export type GlossaryEntry = {
  term: string;
  short?: string; // common acronym
  body: string;
  altNames?: string[]; // alternative names
  category: "concept" | "acronym" | "programme" | "framework" | "organisation";
};

// Comprehensive glossary for the J-USE Pathway Engine. Accessible from the
// floating "Glossary" button on every stage.
export const GLOSSARY: GlossaryEntry[] = [
  // ── Core pathway concepts ────────────────────────────────────────────────
  {
    term: "Anchor Partner",
    body:
      "An Anchor Partner is a powerful, credible third-party organisation that provides the core financial backing or institutional support needed to make a public-good project viable. In a dual-stream business model, your commercial sales might not cover the full cost of helping a vulnerable community or restoring an ecosystem — the Anchor Partner steps in to fill that financial gap by committing cash, grants, or resources to subsidise those non-profit, high-impact activities. For the J-USE Sustainable Financing Mechanism rubric, the Anchor Partner cannot be generic. They must be a named entity (a specific company, foundation, or government ministry) that has signed a Memorandum of Understanding (MoU) or Letter of Intent (LoI), proving they are strategically committed to co-funding your project.",
    altNames: [
      "Anchor Funder / Anchor Investor — used heavily in non-profit, impact-investing, and venture spaces when their primary role is providing the foundational capital",
      "Corporate Sponsor / Strategic Sponsor — used when a major company funds the project to meet its Corporate Social Responsibility (CSR) or Environmental, Social and Governance (ESG) goals",
      "Institutional Backer — used when the partner is a large, established entity like a government agency, university, or global foundation (e.g. Inter-American Development Bank, Global Affairs Canada)",
      "Lead Underwriter — used in financial contexts to denote the primary entity absorbing the initial financial risk of the project",
      "Fiscal Sponsor — used specifically when a larger organisation provides legal and financial oversight to a smaller project",
    ],
    category: "concept",
  },
  {
    term: "Adopting Agency",
    body:
      "Under the Public Good (Community Benefits) pathway, the public-sector body that commits to adopt the Nature-based Climate Solution (NbCS) into its post-grant operational budget. The Adopting Agency is the structural equivalent of an Anchor Partner — it makes the model sustainable beyond grant funding. Examples in Jamaica include parish councils, the National Environment and Planning Agency (NEPA), the Rural Agricultural Development Authority (RADA), and the National Water Commission (NWC). The adoption commitment must be evidenced via a signed Memorandum of Understanding (MoU) with a multi-year budget line confirmed in the agency's fiscal plan.",
    category: "concept",
  },
  {
    term: "Stewarding Community Body",
    body:
      "Under the Public Good pathway, the named community organisation — typically a Community-Based Organisation (CBO), school, cooperative, or faith-based group — that takes on day-to-day stewardship of the NbCS after construction. The Stewarding Community Body is paired with the Adopting Agency: the agency provides the budget, the community provides the labour, monitoring, and grievance mechanism. The community body should be legally constituted with an appointed board.",
    category: "concept",
  },
  {
    term: "Commercial Value Proposition",
    short: "CVP",
    body:
      "In the Knode Social Enterprise Business Model Canvas, the Commercial Value Proposition is the saleable benefit the business offers paying customers — the reason customers part with money. In NbCS context, this is usually a product or service (food, eco-tourism experience, carbon credit, etc.) that customers will buy regardless of the impact value.",
    category: "concept",
  },
  {
    term: "Impact Value Proposition",
    short: "IVP",
    body:
      "In the Knode Social Enterprise Business Model Canvas, the Impact Value Proposition is the climate or community benefit the project delivers in addition to (or instead of) the commercial benefit. For NbCS projects, the IVP captures the adaptation outcome — reduced flooding, urban heat reduced, biodiversity restored, livelihoods created — that may not be monetisable directly but is what makes the project NbCS-eligible.",
    category: "concept",
  },
  {
    term: "Adoption Value Proposition",
    short: "AVP",
    body:
      "An NbCS-specific extension of the Knode canvas, used only under the Public Good pathway. The Adoption Value Proposition is the argument made TO the Adopting Agency: why should they adopt this into their budget line? It typically rests on (a) an implicit fiscal saving (the NbCS is cheaper than the status-quo solution the agency currently funds), (b) policy alignment (parish development order, sector plan, Nationally Determined Contribution), or (c) co-benefit delivery (one budget allocation produces climate, biodiversity, and community outcomes together).",
    category: "concept",
  },
  {
    term: "Cross-Subsidy",
    body:
      "Under the Blended pathway, the mechanism by which revenue from paying customers (and the Anchor Partner) is used to fund the public-good portion of the project. In plain language: the people who can pay subsidise the access of those who cannot. The cross-subsidy ratio (e.g. 60% commercial / 40% public good) must be declared up front, governed by a board or cooperative, and reported transparently to both customers and the Anchor Partner.",
    category: "concept",
  },
  {
    term: "Dual-Layer Canvas",
    body:
      "A Business Model Canvas variant in which every one of the 9 standard blocks (Customer Segment, Value Proposition, Channels, Customer Relationship, Revenue Streams, Key Resources, Key Activities, Key Partners, Cost Structure) is split into two stacked layers: a Commercial / Adoption layer and an Impact layer. Adapted from Ingrid Burkett's Knode Social Enterprise Canvas (2010) and Wilson et al. (2009).",
    category: "framework",
  },
  {
    term: "Walk-Away Floor",
    body:
      "The minimum level of inflows the project must generate to cover its annual Operations and Maintenance (O&M). If projected inflows fall below the walk-away floor, the project is structurally unsustainable beyond grant funding and should be re-designed (or the pathway changed).",
    category: "concept",
  },

  // ── Programme-specific terms ─────────────────────────────────────────────
  {
    term: "Jamaica Urban Solutions for the Environment",
    short: "J-USE",
    body:
      "An Environmental Foundation of Jamaica (EFJ) grant programme funded in partnership with Global Affairs Canada (GAC). Supports Nature-based Climate Solutions in 7 eligible parishes (Kingston & St. Andrew, St. Catherine, Clarendon, St. Mary, St. Thomas, Westmoreland, Hanover). Tagline: Building Climate Resilient Cities…Naturally.",
    category: "programme",
  },
  {
    term: "Expression of Interest",
    short: "EOI",
    body:
      "Stage 1 of the J-USE 2026 grant cycle. A short-form application capturing project concept, eligibility evidence, beneficiary estimates, and supporting documents. 48 EOIs were received in the 2026 cycle.",
    category: "programme",
  },
  {
    term: "Request for Expressions of Interest",
    short: "REOI",
    body:
      "The formal call published by EFJ inviting applicants to submit Expressions of Interest. The J-USE REOI 2026 ran April-May 2026.",
    category: "programme",
  },
  {
    term: "Full Technical Proposal",
    short: "FTP",
    body:
      "Stage 2 of the J-USE 2026 grant cycle. Shortlisted applicants submit a full proposal package including detailed budget, Risk Register, Memoranda of Understanding (MoUs), monitoring and evaluation framework, gender analysis, and supporting documents. The Pathway Engine is a capability-building module that prepares applicants for the FTP stage.",
    category: "programme",
  },
  {
    term: "Environmental Foundation of Jamaica",
    short: "EFJ",
    body:
      "Independent Jamaican non-profit foundation that administers the J-USE programme. Funded in partnership with Global Affairs Canada under the J-USE Contribution Agreement.",
    category: "organisation",
  },
  {
    term: "Global Affairs Canada",
    short: "GAC",
    body:
      "The Canadian federal government department responsible for international development cooperation. Provides the bilateral contribution funding the J-USE programme.",
    category: "organisation",
  },
  {
    term: "Sustainable Financing Mechanism",
    short: "SFM",
    body:
      "A Sustainable Financing Mechanism is a predictable, long-term system that generates continuous financial inflows to keep a project running permanently without depending solely on unpredictable, one-time charity or short-term grants. In nature-based climate solutions, an SFM ensures that when the initial seed funding runs out, the environmental and community work can fund itself indefinitely.",
    category: "concept",
  },

  // ── NbCS / framework acronyms ────────────────────────────────────────────
  {
    term: "Nature-based Climate Solutions",
    short: "NbCS",
    body:
      "NbCS sit at the Climate–Nature–Gender nexus: they are interventions that work with natural systems (vegetation, soils, water, biodiversity) to deliver climate adaptation outcomes for human communities, while being explicitly designed to benefit women, youth, persons with disabilities, and other groups disproportionately exposed to climate risk. Distinct from generic Nature-based Solutions (NbS), NbCS centre three things at once — (1) the climate system being adapted to (heat, flooding, drought, sea-level rise), (2) the natural system being used to do the adaptation (urban canopy, mangroves, wetlands, agroforestry), and (3) the gendered and inclusion dimension of who bears the climate risk and who benefits. NbCS is the core focus of the J-USE programme.",
    category: "framework",
  },
  {
    term: "Nature-based Solutions",
    short: "NbS",
    body:
      "The broader category of which Nature-based Climate Solutions (NbCS) is a subset. NbS includes any solution that draws on natural processes — for water, food, biodiversity, urban heat, or climate outcomes. The International Union for Conservation of Nature (IUCN) publishes the canonical Global Standard for NbS, which J-USE references.",
    category: "framework",
  },
  {
    term: "International Union for Conservation of Nature",
    short: "IUCN",
    body:
      "International organisation that publishes the Global Standard for Nature-based Solutions — the canonical reference for what qualifies as authentic NbS. The full Global Standard has 8 criteria; EFJ has adopted 5 for the J-USE 2026 cycle (see 'IUCN 5 EFJ-adopted criteria').",
    category: "organisation",
  },
  {
    term: "IUCN 5 EFJ-adopted criteria",
    body:
      "The 5 criteria from the IUCN NbS Global Standard that EFJ requires applicants to self-assess against for J-USE 2026: (1) Mitigation — does the project reduce carbon or support carbon sequestration? (2) Biodiversity — does it conserve or enhance native species and ecosystems? (3) Governance — is there transparent, accountable management with community participation? (4) Trade-offs — are unintended negative consequences identified and managed? (5) Grant compliance — does it meet EFJ's specific grant-management rules. Scored under Rubric A5 (3 points). Reviewers do NOT deduct for absence of the other 3 IUCN Global Standard criteria.",
    category: "framework",
  },
  {
    term: "Memorandum of Understanding",
    short: "MoU",
    body:
      "A formal written agreement between two or more parties documenting a shared intent — for example, between a project and its Anchor Partner, or between a project and an Adopting Agency. MoUs are not always legally binding but signal serious commitment. EFJ reviewers treat signed MoUs as primary evidence of partnership.",
    category: "acronym",
  },
  {
    term: "Letter of Intent",
    short: "LoI",
    body:
      "A pre-MoU document expressing intention to enter into a formal agreement. Often used during the proposal stage when the final MoU is still in drafting. EFJ reviewers accept LoIs as preliminary evidence of partnership but require MoUs by Full Technical Proposal submission.",
    category: "acronym",
  },
  {
    term: "Monitoring, Reporting and Verification",
    short: "MRV",
    body:
      "The framework for measuring whether a project's outcomes are being delivered, reporting on them transparently, and verifying the reports via independent or community oversight. For NbCS projects, MRV typically covers both biophysical outcomes (canopy area, water quality, biodiversity) and beneficiary outcomes (number of households served, gender breakdown, vulnerability reduction).",
    category: "acronym",
  },
  {
    term: "Monitoring and Evaluation",
    short: "M&E",
    body:
      "The internal project function of tracking outputs and outcomes against the project plan. M&E is what produces the data that MRV reports and verifies.",
    category: "acronym",
  },
  {
    term: "Operations and Maintenance",
    short: "O&M",
    body:
      "The ongoing costs of running an asset after it has been built. For NbCS, O&M includes watering, replacement planting, monitoring, community engagement, and reporting. A common sustainability test is whether projected inflows cover annual O&M by month 12 of operations.",
    category: "acronym",
  },
  {
    term: "Gender-Based Violence",
    short: "GBV",
    body:
      "Violence directed at a person on the basis of their gender. GBV safeguards include a code of conduct, complaint mechanism, referral pathway to local services, training for project staff, and sensitive-data handling. EFJ + GAC require GBV safeguards for all funded projects.",
    category: "acronym",
  },
  {
    term: "Payments for Ecosystem Services",
    short: "PES",
    body:
      "Financial schemes that compensate landholders or communities for managing land to maintain or enhance ecosystem services (clean water, biodiversity, carbon storage, etc.). For NbCS projects, Payments for Ecosystem Services (PES) can be a long-term inflow stream complementing grant funding.",
    category: "acronym",
  },
  {
    term: "Environmental, Social and Governance",
    short: "ESG",
    body:
      "A framework used by investors, corporations, and donors to evaluate non-financial performance. NbCS projects often appeal to ESG-conscious commercial customers (hotels, retailers) who use the project's impact narrative in their own ESG reporting.",
    category: "acronym",
  },
  {
    term: "Corporate Social Responsibility",
    short: "CSR",
    body:
      "A management concept whereby companies integrate social and environmental concerns into their business operations. Often the budget line under which a corporate sponsor funds an Anchor Partner role in a Blended pathway project.",
    category: "acronym",
  },
  {
    term: "Nationally Determined Contribution",
    short: "NDC",
    body:
      "Each country's voluntary commitment under the Paris Agreement, setting out its climate adaptation and mitigation targets. Jamaica's NDC includes specific targets on urban resilience, ecosystem restoration, and gender-responsive adaptation — all directly relevant to J-USE NbCS projects.",
    category: "acronym",
  },
  {
    term: "Community-Based Organisation",
    short: "CBO",
    body:
      "A legally constituted group operating at the community level — often a community trust, residents' association, cooperative, or development committee. CBOs are typical Stewarding Community Bodies under the Public Good pathway.",
    category: "acronym",
  },
  {
    term: "Persons with Disabilities",
    short: "PWD",
    body:
      "An inclusion category EFJ and IDB track in beneficiary disaggregation. Projects should report PWD beneficiaries separately and document accessibility provisions.",
    category: "acronym",
  },
  {
    term: "Business-to-Business",
    short: "B2B",
    body:
      "A commercial relationship where the customer is another business (e.g. a hotel buying produce from a farm), distinct from Business-to-Consumer (B2C) where the customer is an individual.",
    category: "acronym",
  },
  {
    term: "Training Needs Assessment",
    short: "TNA",
    body:
      "A structured assessment of an organisation's current capability vs. the capability required to deliver its project plan. EFJ uses a 16-competency TNA in the EOI form; applicants update and respond to it at the Full Technical Proposal stage via a Capacity Strengthening Plan.",
    category: "acronym",
  },

  // ── Funders + technical organisations ────────────────────────────────────
  {
    term: "Inter-American Development Bank",
    short: "IDB",
    body:
      "Multilateral development bank for Latin America and the Caribbean. A potential follow-on funder for NbCS projects after grant completion.",
    category: "organisation",
  },
  {
    term: "Green Climate Fund",
    short: "GCF",
    body:
      "Largest climate finance fund globally. Funds adaptation and mitigation projects in developing countries, including via the Simplified Approval Process (SAP) for smaller projects (under USD 25 million).",
    category: "organisation",
  },
  {
    term: "Adaptation Fund",
    short: "AF",
    body:
      "A multilateral fund established under the Kyoto Protocol and Paris Agreement to finance concrete adaptation projects in developing countries. Notable for its Direct Access modality — accredited national entities can apply directly without going through an international intermediary. A strong candidate follow-on funder for J-USE NbCS projects.",
    category: "organisation",
  },
  {
    term: "Rural Agricultural Development Authority",
    short: "RADA",
    body:
      "Jamaican government agency providing agricultural extension services to farmers. Commonly partners with NbCS projects involving agroforestry, urban agriculture, or rural livelihoods.",
    category: "organisation",
  },
  {
    term: "National Environment and Planning Agency",
    short: "NEPA",
    body:
      "Jamaican government regulatory agency for environmental protection and land-use planning. NEPA permits are often required for NbCS interventions involving land use or coastal works.",
    category: "organisation",
  },
  {
    term: "National Water Commission",
    short: "NWC",
    body:
      "Jamaican state-owned utility responsible for water supply and wastewater. A potential Adopting Agency for water-related NbCS (rainwater harvesting, constructed wetlands, etc.).",
    category: "organisation",
  },
  {
    term: "SFM Reviewer Rubric",
    body:
      "The Sustainable Financing Mechanism (SFM) Reviewer Rubric is a 100-point weighted scoring framework used by EFJ to evaluate Full Technical Proposals. Five categories: NbCS Alignment (25 pts), Climate Dimension (15 pts), Inclusion Commitment (25 pts), Risk Management and Sustainability (20 pts), and Feasibility (15 pts), plus a 5-point bonus for confirmed co-financing. Open the Rubric callout (button next to Glossary) to see the full structure.",
    category: "framework",
  },
  {
    term: "Knode Social Enterprise Canvas",
    body:
      "An adaptation of Osterwalder and Pigneur's Business Model Canvas by Ingrid Burkett for her social-enterprise consultancy Knode (Brisbane, 2010). Each of the 9 standard Business Model Canvas blocks is split into a Commercial layer and an Impact layer to make explicit that social enterprises create two kinds of value simultaneously. The J-USE Pathway Engine adapts the Knode framework for NbCS, replacing the Commercial layer with Stewardship & Adoption for the Public Good pathway.",
    category: "framework",
  },
];

export const GLOSSARY_CATEGORIES: { key: GlossaryEntry["category"]; label: string }[] = [
  { key: "concept", label: "Pathway Concepts" },
  { key: "framework", label: "Frameworks" },
  { key: "programme", label: "Programme Terms" },
  { key: "acronym", label: "Acronyms" },
  { key: "organisation", label: "Organisations" },
];
