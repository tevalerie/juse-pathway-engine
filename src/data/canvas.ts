import type { CanvasBlock, KnodeTrap } from "./types";

// Knode-adapted dual-layer Business Model Canvas (9 blocks × 2 layers)
//
// Block ORDER follows the Osterwalder right-side-first logical sequence:
//   1. Customer / Beneficiary Segment   ← WHO we serve
//   2. Value Proposition                ← WHAT we offer
//   3. Channels                         ← HOW we reach them
//   4. Customer / Stewardship Relationship ← HOW we sustain trust
//   5. Revenue / Sustainability Inflows ← WHAT comes back in
//   6. Key Resources                    ← WHAT we need to deliver
//   7. Key Activities                   ← WHAT we do
//   8. Key Partners                     ← WHO helps us
//   9. Cost Structure                   ← WHAT it costs
//
// Pedagogical rationale: you cannot design a solution until you have explicitly
// defined who you are serving and what you are offering them. The cost
// structure comes last because it is derived from everything above it.
//
// IMPORTANT: All organisation / place names in placeholders are FICTIONAL.
// Jamaica-realistic but invented for pedagogical purposes. Worked examples
// in /worked-examples/ use the same fictional organisations consistently.
//
// Acronyms are spelt out on first mention in each block; common acronyms
// (NbCS, MoU, LoI, MRV, GBV, etc.) are defined in glossary.ts and accessible
// via the floating Glossary button in any stage.

export const CANVAS_BLOCKS: CanvasBlock[] = [
  // ─── 1 ── Customer / Beneficiary Segment ─────────────────────────────────
  {
    id: "customer-beneficiary",
    label: "Customer / Beneficiary Segment",
    rubricRef: "Rubric C1 + C2 (9 pts)",
    rubricNote:
      "Vulnerability Dimensions plus Beneficiary Disaggregation — multiple groups identified plus disaggregated numbers. Establish baseline demographics + initial cross-subsidy target here.",
    prompts: {
      revenue: {
        topLayer: {
          question: "Who are your PAYING customers?",
          bullets: [
            "Customer segments (business-to-consumer, business-to-business, institutional)",
            "Number of customers expected",
            "Geographic spread",
          ],
          placeholder:
            "Business-to-business: 3 hotels in the Cane Valley corridor (40% of revenue). Business-to-consumer: 200 weekend market shoppers (60%). All within a 30-kilometre radius…",
        },
        impact: {
          question:
            "Who BENEFITS from the climate and community impact?",
          bullets: [
            "Catchment community",
            "Vulnerable groups (women, youth, low-income, Persons with Disabilities [PWD], housing-vulnerable)",
            "Biodiversity and downstream beneficiaries",
          ],
          placeholder:
            "1,400 catchment residents benefit indirectly; 60% women-headed households; 200 children under 5 in heat-vulnerable homes; downstream coral reef ecosystem…",
        },
      },
      blended: {
        topLayer: {
          question:
            "Who PAYS + who is the ANCHOR PARTNER?",
          bullets: [
            "Commercial paying customers",
            "Anchor Partner (named, with their strategic interest documented). An Anchor Partner is a credible third party that commits cash or in-kind support to subsidise the public-good portion of your project.",
            "Cross-subsidy ratio (% paying / % public good) — declared up front",
          ],
          placeholder:
            "Commercial: Blue Mountain Inn + 2 other hotels (60% of revenue). Anchor Partner: Coastal Resilience Foundation (40% co-funding, 3-year commitment). Cross-subsidy ratio: 60% commercial / 40% public good…",
        },
        impact: {
          question:
            "Who BENEFITS from the public-good stream?",
          bullets: [
            "Public-good beneficiaries (vulnerable groups)",
            "Catchment community",
            "Disaggregated numbers (by gender, age, ability, income)",
          ],
          placeholder:
            "300 children at Riverside Primary School (school-feeding programme); 50 elderly residents in the catchment; 70% women-headed households; 12 Persons with Disabilities…",
        },
      },
      public: {
        topLayer: {
          question:
            "Who ADOPTS and who STEWARDS?",
          bullets: [
            "★ Adopting Agency (named, with their decision-maker contact)",
            "★ Stewarding Community body (named, legally constituted)",
            "Roles and responsibilities for each",
          ],
          placeholder:
            "★ ADOPTING AGENCY: Clarendon Parish Council Climate Office (budget allocation and monitoring). ★ STEWARDING COMMUNITY: East Bay Community Trust (day-to-day management and grievance handling)…",
        },
        impact: {
          question: "Who BENEFITS?",
          bullets: [
            "Entire catchment community",
            "Vulnerable groups disaggregated",
            "Biodiversity and ecosystem-service users",
          ],
          placeholder:
            "1,800 catchment residents; 70% women-headed households; 200 children under 5; 80 elderly residents; 12 Persons with Disabilities; 1 perennial stream restored…",
        },
      },
    },
  },

  // ─── 2 ── Value Proposition ──────────────────────────────────────────────
  {
    id: "value-proposition",
    label: "Value Proposition",
    rubricRef: "Rubric A1 + A4 (9 pts)",
    rubricNote:
      "NbCS Intervention Selection + Concept Note Quality. Align commercial saleable benefit + Anchor Partner strategic interest + climate / co-benefits given to the community.",
    prompts: {
      revenue: {
        topLayer: {
          question:
            "COMMERCIAL VALUE PROPOSITION — why do customers PAY for this?",
          bullets: [
            "What product or service customers buy",
            "Price point or premium logic",
            "Brand or certification differentiator",
          ],
          placeholder:
            "Same-morning-harvested pesticide-free leafy greens at JMD $400/bag — 15% cheaper than imported alternatives, traceable to one farm, certified organic, carbon-neutral storyline…",
        },
        impact: {
          question:
            "IMPACT VALUE PROPOSITION — what climate and community impact is delivered?",
          bullets: [
            "Climate adaptation benefit (cooler streets, reduced flooding, food security, etc.)",
            "Co-benefits (biodiversity, livelihoods, gender, inclusion)",
            "Contribution to Jamaica's Nationally Determined Contribution (NDC)",
          ],
          placeholder:
            "Urban heat reduced by approximately 2°C across 5 hectares; 200 native plants restored; 6 women trained in climate-smart hydroponics; contribution to Jamaica's NDC adaptation target on urban food security…",
        },
      },
      blended: {
        topLayer: {
          question:
            "COMMERCIAL VALUE PROPOSITION — why does the COMMERCIAL channel buy + the ANCHOR PARTNER co-fund?",
          bullets: [
            "Why commercial customers buy (the saleable benefit)",
            "Why the Anchor Partner sponsors (their strategic interest — Corporate Social Responsibility [CSR], Environmental Social Governance [ESG], or institutional mandate)",
            "Brand uplift for both",
          ],
          placeholder:
            "Hotel buyer: premium local provenance and ESG storyline they tell guests. Anchor Partner: their charter requires investing in parish-level climate resilience and they are scored on it by their board…",
        },
        impact: {
          question:
            "IMPACT VALUE PROPOSITION — what does the COMMUNITY get for free or subsidised?",
          bullets: [
            "Free or subsidised access for a vulnerable group",
            "Climate adaptation benefit at catchment scale",
            "Co-benefits (biodiversity, livelihoods, inclusion)",
          ],
          placeholder:
            "Riverside Primary School-feeding programme receives 40% of yield free of charge; 300 children with improved nutrition; flood buffer for the low-lying East Bay community…",
        },
      },
      public: {
        topLayer: {
          question:
            "ADOPTION VALUE PROPOSITION — why will the AGENCY adopt this into their budget line?",
          bullets: [
            "What problem does the agency currently spend money on that this NbCS solves more cheaply?",
            "Implicit fiscal saving (replacement cost of status-quo solution)",
            "Alignment with national or parish policy (NDC, parish development order, sector plan)",
          ],
          placeholder:
            "Clarendon Parish currently spends approximately JMD $4 million per year on stormwater drainage clearance in East Bay. This NbCS reduces that recurring cost by an estimated JMD $2.4 million per year while delivering urban canopy — aligned with the parish development order on green infrastructure…",
        },
        impact: {
          question: "IMPACT VALUE PROPOSITION — what does the COMMUNITY experience?",
          bullets: [
            "Free or permanent ecosystem service",
            "Climate adaptation at neighbourhood scale",
            "Co-benefits (biodiversity, livelihoods, gender-safe public space)",
          ],
          placeholder:
            "Permanent shade across 1.2 hectares of public space; 70% reduction in flood depth during heavy rain; safer walking corridor for women and children; biodiversity-rich micro-habitat for native pollinators…",
        },
      },
    },
  },

  // ─── 3 ── Channels ───────────────────────────────────────────────────────
  {
    id: "channels",
    label: "Channels",
    rubricRef: "Rubric C3 (6 pts)",
    rubricNote:
      "Gender Analysis — channels reach gender-differentiated participants and barriers are addressed. Map separate commercial sales funnels + community distribution pathways.",
    prompts: {
      revenue: {
        topLayer: {
          question: "How do COMMERCIAL channels reach customers?",
          bullets: [
            "Direct sales (farm gate, market, online)",
            "Business-to-business contracts",
            "Agritourism or eco-experience",
          ],
          placeholder:
            "Farm gate sale Saturday 7-11 am; messaging-app business-to-business orders Tuesday + Thursday; social-media marketing for business-to-consumer; one monthly farm tour for visitors…",
        },
        impact: {
          question: "How do IMPACT channels reach the community?",
          bullets: [
            "Community delivery channels",
            "Transparency reports",
            "Public knowledge products",
          ],
          placeholder:
            "Community-meeting talks monthly; parish radio station feature quarterly; project social-media page in patois and English; printed annual report for elders…",
        },
      },
      blended: {
        topLayer: {
          question: "How do your TWO PARALLEL channels work?",
          bullets: [
            "Commercial sales channel",
            "Community distribution channel (free or subsidised)",
            "Anchor Partner reporting channel",
          ],
          placeholder:
            "(i) Commercial: hotel deliveries Tuesday + Friday. (ii) Community: school-feeding hand-overs Wednesday. (iii) Anchor: quarterly dashboard report by email + annual in-person meeting…",
        },
        impact: {
          question: "How do you communicate IMPACT to community?",
          bullets: [
            "Community engagement events",
            "Anchor Partner reporting",
            "Public impact narrative",
          ],
          placeholder:
            "Quarterly community meeting; Anchor Partner dashboard published online; school assembly talks twice a year; annual impact storytelling event…",
        },
      },
      public: {
        topLayer: {
          question:
            "How do AGENCY and STEWARDSHIP channels work?",
          bullets: [
            "Public agency communications (formal)",
            "Co-design events",
            "Community-meeting outreach",
          ],
          placeholder:
            "Monthly report-in to the Parish Council climate committee; quarterly co-design workshop; signage at the NbCS site with grievance hotline number…",
        },
        impact: {
          question: "How do you reach the COMMUNITY directly?",
          bullets: [
            "Community delivery (no commercial intermediary)",
            "Schools, faith-based, or health co-delivery",
            "Public knowledge products",
          ],
          placeholder:
            "Site open 24/7 with community signage; school partnership for outdoor classroom; monthly walk-and-talk for elders; quarterly newsletter distributed by community volunteers…",
        },
      },
    },
  },

  // ─── 4 ── Customer / Stewardship Relationship ────────────────────────────
  {
    id: "customer-stewardship",
    label: "Customer / Stewardship Relationship",
    rubricRef: "Rubric C4 (5 pts)",
    rubricNote:
      "Vulnerability-to-Benefits Link — clear mechanism for how benefits reach the vulnerable. Define your reporting cadence for the Anchor Partner and your co-management framework with the community.",
    prompts: {
      revenue: {
        topLayer: {
          question: "How do you build COMMERCIAL relationships?",
          bullets: [
            "Repeat-purchase loyalty",
            "Business-to-business contracts (offtake agreements)",
            "Environmental, Social and Governance (ESG) storytelling for buyers",
          ],
          placeholder:
            "Weekly produce list shared by messaging app; 12-month offtake contract with the hotel buyer; quarterly impact stories shared with the hotel's marketing team…",
        },
        impact: {
          question: "How do you steward the COMMUNITY relationship?",
          bullets: [
            "Co-management and community board",
            "Transparency reporting",
            "Grievance and accountability mechanism",
          ],
          placeholder:
            "Quarterly community meeting with signed minutes; public annual report with community signatures; grievance hotline with a 14-day response standard…",
        },
      },
      blended: {
        topLayer: {
          question:
            "How do you maintain the COMMERCIAL and ANCHOR PARTNER relationships?",
          bullets: [
            "Commercial repeat-buyer loyalty plus ESG narrative",
            "Anchor Partner Memorandum of Understanding (MoU) plus reporting cadence",
            "Cross-subsidy transparency",
          ],
          placeholder:
            "Quarterly Anchor Partner report showing the percentage cross-subsidy actually delivered; monthly hotel buyer ESG newsletter; signed MoU reviewed annually with the Anchor Partner board…",
        },
        impact: {
          question: "How do you steward the COMMUNITY beneficiaries?",
          bullets: [
            "Named delivery commitments to the community",
            "Transparency reporting on the cross-subsidy ratio",
            "Co-management",
          ],
          placeholder:
            "Annual community report-back showing the 40% public-good delivery actually achieved; school principal sits on the project board; grievance pathway operated via the parish council…",
        },
      },
      public: {
        topLayer: {
          question:
            "How do you maintain the AGENCY ADOPTION relationship?",
          bullets: [
            "Signed Memorandum of Understanding (MoU) with multi-year budget commitment",
            "Budget line confirmed in the agency fiscal plan",
            "Reporting cadence to the agency",
          ],
          placeholder:
            "MoU signed August 2026 with a 3-year budget line in the Clarendon Parish Council Fiscal Year 2027 plan; quarterly NbCS performance report submitted to the Clarendon Parish Council climate committee…",
        },
        impact: {
          question: "How do you steward the COMMUNITY?",
          bullets: [
            "Community co-design and co-management",
            "Public consultation",
            "Community ownership transfer at hand-over",
            "Grievance and accountability",
          ],
          placeholder:
            "East Bay Community Trust co-manages from Day 1; ownership transferred at Month 24; grievance hotline with publicly-posted service-level agreement (response within 14 days)…",
        },
      },
    },
  },

  // ─── 5 ── Revenue Streams / Sustainability Inflows ───────────────────────
  {
    id: "revenue-inflows",
    label: "Revenue Streams / Sustainability Inflows",
    rubricRef: "Rubric E4 + E5 (8 pts)",
    rubricNote:
      "Co-Financing and sustainability inflows — disclosed sources, named amounts, confidence rating. Lock in commercial sales, anchor sponsorships, and mandatory community in-kind contributions.",
    prompts: {
      revenue: {
        topLayer: {
          question: "What COMMERCIAL revenue streams sustain the model?",
          bullets: [
            "Product sales (primary)",
            "Service fees",
            "Premium or certification price uplift",
            "Agritourism revenue",
          ],
          placeholder:
            "Product sales: 60% of inflows = JMD $3 million per year. Service fees (farm tours): $400,000. Certification premium: $300,000. Agritourism: $300,000…",
        },
        impact: {
          question:
            "What IMPACT-LINKED inflows do you anticipate?",
          bullets: [
            "Carbon credits / Payments for Ecosystem Services (PES) / biodiversity credits",
            "In-kind community contribution",
            "Grant follow-on (programmed)",
          ],
          placeholder:
            "Carbon credits Year 3 onwards: $500,000 per year. In-kind community labour valued at $200,000 per year. Year 3 follow-on EFJ cycle expected: $1 million…",
        },
      },
      blended: {
        topLayer: {
          question:
            "What COMMERCIAL and ANCHOR PARTNER inflows sustain the model?",
          bullets: [
            "Commercial sales (primary)",
            "Anchor Partner contribution — cash sponsorship or in-kind backing that covers the public-good portion. Without it, the Blended pathway has no structural source of funds for the non-commercial half.",
            "Optional: carbon credits or Payments for Ecosystem Services (PES)",
          ],
          placeholder:
            "Commercial sales: $2.4 million per year. Anchor Partner contribution: $1.6 million per year for 3 years (Memorandum of Understanding signed). Optional carbon credits Year 4+: $300,000 per year…",
        },
        impact: {
          question:
            "What COMMUNITY and IMPACT inflows do you anticipate?",
          bullets: [
            "In-kind community contribution (mandatory — community volunteer labour and time, valued at replacement cost)",
            "Carbon credits / Payments for Ecosystem Services (PES) / biodiversity credits",
            "Reduced public-service cost (implicit fiscal saving)",
            "Optional follow-on grants",
          ],
          placeholder:
            "Community in-kind: $400,000 per year (24 volunteers × replacement cost). Carbon credits Year 4: $300,000 per year. Implicit fiscal saving to Parish Council: $1.2 million per year (counted as in-kind credit)…",
        },
      },
      public: {
        topLayer: {
          question:
            "What ADOPTION and STEWARDSHIP inflows sustain the model post-grant?",
          bullets: [
            "★ Public agency budget allocation post-grant (primary)",
            "★ In-kind community contribution (mandatory — community volunteer labour valued at replacement cost)",
            "Reduced public-service cost (implicit fiscal saving)",
          ],
          placeholder:
            "★ Clarendon Parish Council Year 2-4 budget line: $1.2 million per year (Memorandum of Understanding signed). ★ Community in-kind: $400,000 per year (24 volunteers × replacement cost). Implicit stormwater-management saving: $2.4 million per year…",
        },
        impact: {
          question:
            "What IMPACT-LINKED inflows do you anticipate?",
          bullets: [
            "Carbon credits / Payments for Ecosystem Services (PES) / biodiversity credits",
            "Parametric or insurance payouts (where relevant)",
            "Ongoing grant flows (Green Climate Fund [GCF], Inter-American Development Bank [IDB], Adaptation Fund, follow-on EFJ cycle)",
          ],
          placeholder:
            "Blue carbon credits Year 3+: $400,000 per year. Parametric insurance payout potential (flood reduction): $200,000 average per event. Green Climate Fund Simplified Approval Project application Year 2: $2 million…",
        },
      },
    },
  },

  // ─── 6 ── Key Resources ──────────────────────────────────────────────────
  {
    id: "key-resources",
    label: "Key Resources",
    rubricRef: "Rubric D1 (6 pts)",
    rubricNote:
      "Sustainability Model — land tenure, technical resources, brand, Monitoring and Evaluation (M&E) systems. Inventory your physical assets, technical NbCS expertise, and signed legal MoUs.",
    prompts: {
      revenue: {
        topLayer: {
          question: "What COMMERCIAL resources do you need?",
          bullets: [
            "Land and water rights",
            "Production infrastructure (greenhouse, equipment)",
            "Inventory, brand, certifications, staff",
          ],
          placeholder:
            "1-acre leased greenhouse site, hydroponic Nutrient Film Technique (NFT) system, 5,000-litre rainwater tank, registered farm brand, 2 part-time staff…",
        },
        impact: {
          question:
            "What NbCS and impact resources do you need?",
          bullets: [
            "Native species inventory",
            "NbCS technical expertise",
            "Community trust and relationships",
            "Monitoring and Evaluation (M&E) systems",
          ],
          placeholder:
            "300 native seedling inventory (Jamaican guango, lignum vitae, ironwood); IUCN-aligned technical advisor on retainer; community trust built via prior projects in the parish; M&E spreadsheet linked to outcome indicators…",
        },
      },
      blended: {
        topLayer: {
          question:
            "What COMMERCIAL and ANCHOR PARTNER resources?",
          bullets: [
            "Production assets",
            "Brand",
            "Dual-stream accounting capability",
            "Signed Anchor Partner Memorandum of Understanding (MoU)",
          ],
          placeholder:
            "Production: as above. Brand: 'Coastal Resilience-Supported Farm' co-branding agreement. Signed Anchor Partner MoU with a named contact + a reporting template…",
        },
        impact: {
          question: "What NbCS and community resources?",
          bullets: [
            "Native species inventory",
            "NbCS technical expertise",
            "Community trust + named Community-Based Organisation (CBO) partnership",
            "Monitoring and Evaluation (M&E) systems",
          ],
          placeholder:
            "Native seedling inventory; technical advisor; named CBO partnership (East Bay Community Trust); M&E system with monthly reporting to Anchor Partner…",
        },
      },
      public: {
        topLayer: {
          question:
            "What STEWARDSHIP and ADOPTION resources?",
          bullets: [
            "Land tenure or right-of-use (multi-year)",
            "Agency budget commitment",
            "Named community stewardship body",
            "Signed Memorandum of Understanding (MoU)",
          ],
          placeholder:
            "30-year right-of-use granted by the Clarendon Parish Council for 1.2 hectares; draft Memorandum of Understanding (MoU) with a 3-year budget commitment; East Bay Community Trust (legally registered) as steward…",
        },
        impact: {
          question: "What NbCS and impact resources?",
          bullets: [
            "Native species inventory",
            "NbCS technical expertise",
            "Community labour and co-design capacity",
            "Monitoring and Evaluation (M&E) systems with reporting",
          ],
          placeholder:
            "500 native seedling inventory; IUCN advisor on retainer; 24 community volunteers (signed commitment letters); M&E + quarterly reporting template…",
        },
      },
    },
  },

  // ─── 7 ── Key Activities ─────────────────────────────────────────────────
  {
    id: "key-activities",
    label: "Key Activities",
    rubricRef: "Rubric A2 (8 pts)",
    rubricNote:
      "Adaptation Logic Chain — both the biophysical pathway (how ecosystem services change) and the beneficiary pathway (how communities experience reduced climate risk) clearly explained. Detail dual-channel operations, cross-subsidy accounting, MRV protocols, and GBV safeguards.",
    prompts: {
      revenue: {
        topLayer: {
          question: "What COMMERCIAL activities make the money?",
          bullets: [
            "Production (nursery, harvest, processing)",
            "Sales, marketing, customer service",
            "Brand and certification management",
          ],
          placeholder:
            "Hydroponic vegetable production year-round, twice-weekly deliveries to two hotel buyers, Saturday farmers' market stall, social-media marketing, monthly farm tour…",
        },
        impact: {
          question:
            "What NbCS activities deliver the climate and community impact?",
          bullets: [
            "NbCS implementation (planting, restoration, infrastructure build)",
            "Monitoring, Reporting and Verification (MRV) of biophysical and beneficiary outcomes",
            "Community co-design and engagement",
            "IUCN NbS self-assessment against the 5 EFJ-adopted criteria: (1) mitigation, (2) biodiversity, (3) governance, (4) trade-offs, (5) grant compliance",
            "Gender-Based Violence (GBV) safeguards",
          ],
          placeholder:
            "Plant 300 native trees in Year 1; monitor canopy cover quarterly; run 4 community co-design workshops; complete the 5 EFJ-adopted IUCN NbS criteria by Month 6; deliver GBV-safe site protocol…",
        },
      },
      blended: {
        topLayer: {
          question:
            "What COMMERCIAL plus CROSS-SUBSIDY activities run the model?",
          bullets: [
            "Commercial production for the paying channel",
            "Cross-subsidy accounting (tagging which costs serve which channel)",
            "Anchor Partner stewardship and quarterly reporting",
            "Transparent percentage-split reporting (commercial vs. public good)",
          ],
          placeholder:
            "Produce 60% of yield for sale to hotel buyer, 40% donated to school-feeding programme; quarterly cross-subsidy report to the Anchor Partner showing both flows; monthly hotel buyer invoice…",
        },
        impact: {
          question:
            "What NbCS and community-stream activities deliver impact?",
          bullets: [
            "NbCS implementation plus dual-channel operations",
            "Monitoring, Reporting and Verification (MRV) and IUCN NbS self-assessment (5 EFJ-adopted criteria)",
            "Community engagement",
            "Gender-Based Violence (GBV) safeguards",
          ],
          placeholder:
            "Plant 2 hectares of climate-smart agroforestry; MRV monthly; train 12 community stewards; monthly community report-back; GBV-safe site protocol…",
        },
      },
      public: {
        topLayer: {
          question:
            "What STEWARDSHIP plus ADOPTION TRANSITION activities run the model?",
          bullets: [
            "NbCS implementation plus agency transition planning",
            "Memorandum of Understanding (MoU) drafting and stewardship hand-over",
            "Community steward capacity building",
          ],
          placeholder:
            "Year 1: build the NbCS asset with community labour; Year 2: train 6 Parish Council technicians + community stewards; Year 3: hand over to Parish Council budget line and Community Trust day-to-day management…",
        },
        impact: {
          question:
            "What NbCS and impact-delivery activities run alongside?",
          bullets: [
            "Monitoring, Reporting and Verification (MRV) of biophysical and beneficiary outcomes",
            "Community co-design and engagement",
            "IUCN NbS self-assessment against the 5 EFJ-adopted criteria: (1) mitigation, (2) biodiversity, (3) governance, (4) trade-offs, (5) grant compliance",
            "Gender-Based Violence (GBV) safeguards",
          ],
          placeholder:
            "Quarterly canopy and temperature measurements; 4 community co-design events per year; complete the 5 EFJ-adopted IUCN NbS criteria; document GBV referral pathway with local services…",
        },
      },
    },
  },

  // ─── 8 ── Key Partners ───────────────────────────────────────────────────
  {
    id: "key-partners",
    label: "Key Partners",
    rubricRef: "Rubric D3 (4 pts)",
    rubricNote:
      "Partnership and Scaling — named partners with defined roles plus a realistic scaling pathway. Name your specific Anchor Partner, CBOs, technical advisors, and institutional funders.",
    prompts: {
      revenue: {
        topLayer: {
          question: "Who do you BUY FROM or SELL TO commercially?",
          bullets: [
            "Customer / buyer organisations (offtakers)",
            "Seedling, input, and equipment suppliers",
            "Certification bodies (organic, fair trade, blue carbon, etc.)",
            "Agricultural technology or financial-services partners",
          ],
          placeholder:
            "Blue Mountain Inn (hotel offtaker — Letter of Intent signed), Coral Bay Restaurant Group (B2B customer), Island Seedling Cooperative (supplier), Jamaica Organic Agriculture Movement (certifier)…",
        },
        impact: {
          question: "Who do you PARTNER WITH for the climate and community impact?",
          bullets: [
            "Community-Based Organisation (CBO) or cooperative",
            "Government technical providers (Rural Agricultural Development Authority [RADA], National Environment and Planning Agency [NEPA])",
            "Non-Governmental Organisations (NGOs) and IUCN-aligned technical advisors",
          ],
          placeholder:
            "Cane Valley Community Association (lead community partner), RADA extension officer, Coastal Conservation Alliance (NGO advisor), parish council climate office…",
        },
      },
      blended: {
        topLayer: {
          question:
            "Who is your COMMERCIAL channel + your ANCHOR PARTNER?",
          bullets: [
            "★ Anchor Partner — the named third party (public agency, foundation, or corporate sponsor) that commits cash and/or in-kind support to subsidise the public-good portion of your project. Also called: Anchor Funder, Corporate Sponsor, Institutional Backer, Lead Underwriter.",
            "Commercial offtakers and suppliers",
            "Memorandum of Understanding (MoU) or Letter of Intent (LoI) status with the anchor",
          ],
          placeholder:
            "★ ANCHOR PARTNER: Coastal Resilience Foundation (LoI signed April 2026, MoU in drafting). Commercial: Blue Mountain Inn (offtake contract), Coral Bay Restaurants, Island Seedling Cooperative…",
        },
        impact: {
          question: "Who PARTNERS with you to deliver the impact stream?",
          bullets: [
            "Community-Based Organisation (CBO) receiving the public-good portion",
            "Technical providers (NGOs, RADA, IUCN advisors)",
            "Funders: Environmental Foundation of Jamaica (EFJ), Inter-American Development Bank (IDB), Adaptation Fund",
          ],
          placeholder:
            "East Bay Community Trust (recipient of public-good portion), Coastal Conservation Alliance, parish council, RADA, EFJ Programme Officer…",
        },
      },
      public: {
        topLayer: {
          question:
            "Name your ADOPTING AGENCY and STEWARDING COMMUNITY",
          bullets: [
            "★ Adopting Agency — the public-sector body that will adopt the NbCS into their post-grant operational budget",
            "★ Stewarding Community body — Community-Based Organisation (CBO), school, faith group, or cooperative providing day-to-day management",
            "Memorandum of Understanding (MoU) or Letter of Intent (LoI) status with each",
          ],
          placeholder:
            "★ ADOPTING AGENCY: Clarendon Parish Council Climate Office (MoU in drafting, target signing September 2026). ★ STEWARDING COMMUNITY: East Bay Community Trust (legally registered, board appointed)…",
        },
        impact: {
          question: "Who else PARTNERS with you to deliver the impact?",
          bullets: [
            "Government technical providers (RADA, NEPA, National Water Commission [NWC])",
            "Schools, faith-based groups, health centres for co-delivery",
            "Funders (EFJ, Inter-American Development Bank [IDB], Green Climate Fund [GCF], Adaptation Fund)",
          ],
          placeholder:
            "NEPA, RADA, Riverside Primary School, East Bay Methodist Church, Clarendon Health Department, EFJ Programme Officer…",
        },
      },
    },
  },

  // ─── 9 ── Cost Structure ─────────────────────────────────────────────────
  {
    id: "cost-structure",
    label: "Cost Structure",
    rubricRef: "Rubric E2 + E3 (7 pts)",
    rubricNote:
      "Budget Realism and Administrative Costs ≤10% — line-item budget plus admin tagged separately. Finalise tagged percentage cost split and verify administrative costs remain ≤10%.",
    prompts: {
      revenue: {
        topLayer: {
          question: "What COMMERCIAL costs do you incur?",
          bullets: [
            "Capital expenditure: site preparation, planting, equipment",
            "Operating expenditure: staff, inputs, maintenance, marketing",
            "Administrative costs ≤10% per the EFJ rule",
          ],
          placeholder:
            "Capital Year 1: JMD $1.2 million greenhouse build. Operating per year: $1.5 million staff, $400,000 inputs, $200,000 marketing. Administrative: $250,000 (8% of total)…",
        },
        impact: {
          question: "What NbCS-SPECIFIC costs do you incur?",
          bullets: [
            "Monitoring, Reporting and Verification (MRV) and biodiversity monitoring",
            "IUCN NbS self-assessment (5 EFJ-adopted criteria)",
            "Community engagement and Gender-Based Violence (GBV) safeguards",
            "Knowledge products",
          ],
          placeholder:
            "MRV: $180,000 per year. IUCN: $80,000 (Year 1 only). Community engagement: $200,000. GBV safeguards: $50,000. Knowledge products: $40,000…",
        },
      },
      blended: {
        topLayer: {
          question:
            "How are COMMERCIAL + PUBLIC-GOOD costs SPLIT?",
          bullets: [
            "Commercial-stream capital and operating (tagged percentage)",
            "Public-good-stream capital and operating (tagged percentage)",
            "Cross-subsidy ratio documented",
            "Administrative costs ≤10%",
          ],
          placeholder:
            "Commercial-tagged: 60% of $4 million = $2.4 million. Public-good-tagged: 40% = $1.6 million. Administrative: 7%. Cross-subsidy ratio reviewed annually with the Anchor Partner…",
        },
        impact: {
          question: "What NbCS-SPECIFIC costs do you incur?",
          bullets: [
            "Monitoring, Reporting and Verification (MRV) and biodiversity monitoring",
            "IUCN NbS self-assessment (5 EFJ-adopted criteria)",
            "Community engagement and Gender-Based Violence (GBV) safeguards",
          ],
          placeholder:
            "MRV: $220,000 per year. IUCN: $90,000. Community engagement: $280,000. GBV safeguards: $60,000…",
        },
      },
      public: {
        topLayer: {
          question:
            "How are STEWARDSHIP and ADOPTION costs structured?",
          bullets: [
            "Capital expenditure during grant period",
            "Operating expenditure post-grant via agency budget adoption",
            "Community stewardship cost (in-kind valued at replacement cost)",
            "Administrative costs ≤10%",
          ],
          placeholder:
            "Grant capital Year 1: $8 million. Post-grant operating (Year 2 onwards) from Clarendon Parish Council budget: $1.2 million per year. Community in-kind: $400,000 per year (volunteer labour valued at replacement cost)…",
        },
        impact: {
          question: "What NbCS-SPECIFIC costs do you incur?",
          bullets: [
            "Monitoring, Reporting and Verification (MRV)",
            "IUCN NbS self-assessment (5 EFJ-adopted criteria)",
            "Community engagement",
            "Gender-Based Violence (GBV) safeguards",
            "Knowledge products",
          ],
          placeholder:
            "MRV: $280,000 per year. IUCN: $100,000 (Year 1 only). Community engagement: $340,000. GBV safeguards: $80,000. Knowledge products: $50,000…",
        },
      },
    },
  },
];

// Knode-style honest warnings — surface contextually based on pathway
export const KNODE_TRAPS: KnodeTrap[] = [
  {
    id: "anchor-mirage",
    pathways: ["blended"],
    title: "⚠ The Anchor Partner Mirage",
    body:
      "If you named an Anchor Partner but don't have a written Memorandum of Understanding (MoU) or Letter of Intent (LoI) yet, you're at score-down risk for Rubric D3. Add 'secure Anchor Partner MoU' to your Stage 6 commitments before the Full Technical Proposal (FTP) deadline.",
  },
  {
    id: "adopting-agency-mirage",
    pathways: ["public"],
    title: "⚠ The Adopting Agency Mirage",
    body:
      "Without a signed adoption commitment from the public agency, your post-grant sustainability is unverified. Rubric D1 (6 points) scores this directly. Add 'secure agency MoU with multi-year budget line' to Stage 6.",
  },
  {
    id: "single-channel-trap",
    pathways: ["revenue"],
    title: "⚠ The Single-Channel Trap",
    body:
      "If all your revenue depends on one buyer or offtaker, your sustainability fails the concentration-risk test under Rubric D2 (Full Technical Proposal stage). Diversify to at least two named buyers, or document a credible fallback buyer.",
  },
  {
    id: "in-kind-undervalued",
    pathways: ["blended", "public"],
    title: "⚠ The In-Kind Mirage",
    body:
      "Community volunteer labour is not free. The J-USE Budget Template requires in-kind contribution to be valued at replacement cost. Estimate: average hourly rate × hours per volunteer × number of volunteers. Don't enter 'volunteers will help' without a number.",
  },
  {
    id: "iucn-skipped",
    pathways: ["revenue", "blended", "public"],
    title: "⚠ The IUCN Skipped Trap",
    body:
      "If your Key Activities block doesn't mention IUCN NbS self-assessment, Rubric A5 (3 points) is at risk. The 5 EFJ-adopted IUCN criteria (mitigation, biodiversity, governance, trade-offs, grant compliance) must appear in your activities.",
  },
];
