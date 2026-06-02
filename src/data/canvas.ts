import type { CanvasBlock, KnodeTrap } from "./types";

// 9-block dual-layer Knode canvas — every block has a top layer (Commercial / Adoption)
// and an Impact layer. Prompts adapt to pathway.
export const CANVAS_BLOCKS: CanvasBlock[] = [
  {
    id: "key-partners",
    label: "Key Partners",
    rubricRef: "Rubric D3 (4 pts)",
    rubricNote: "Partnership & Scaling — named partners with defined roles + realistic scaling pathway.",
    prompts: {
      revenue: {
        topLayer: {
          question: "Who do you BUY from or SELL to commercially?",
          bullets: ["Offtaker hotels / agribusiness", "Seedling + input suppliers", "Certification bodies", "Agtech / agri-finance"],
          placeholder: "Sandals Ocho Rios (offtaker), Caribbean Seed Co. (supplier), Jamaica Organic Agriculture Movement (certifier)…",
        },
        impact: {
          question: "Who do you PARTNER with for the climate + community impact?",
          bullets: ["Community CBO / cooperative", "NEPA / RADA / NWA technical providers", "NGOs and IUCN-aligned advisors"],
          placeholder: "RADA extension officer, Friends of the Sea Caribbean (NGO), parish council climate office…",
        },
      },
      blended: {
        topLayer: {
          question: "Who is your COMMERCIAL channel + your ★ ANCHOR PARTNER?",
          bullets: ["★ Anchor partner name (public agency / foundation / corporate)", "Commercial offtakers + suppliers", "MoU or LoI status"],
          placeholder: "★ ANCHOR: Tourism Enhancement Fund (LoI signed Apr 2026). Commercial: Couples Resorts, Caribbean Seed Co…",
        },
        impact: {
          question: "Who PARTNERS with you to deliver the impact stream?",
          bullets: ["Community CBO receiving the public-good portion", "Technical providers (NGOs, RADA)", "EFJ + GAC + IDB"],
          placeholder: "Annotto Bay CBO, Friends of the Sea Caribbean, parish council, RADA…",
        },
      },
      public: {
        topLayer: {
          question: "Name your ★ ADOPTING AGENCY and ★ STEWARDING COMMUNITY",
          bullets: ["★ Public agency that will adopt this into a budget line", "★ Community body that will steward day-to-day", "MoU / Letter of Intent status"],
          placeholder: "★ ADOPTING: Kingston & St Andrew Municipal Corporation (MoU drafting). ★ STEWARDING: Trench Town Community Trust…",
        },
        impact: {
          question: "Who else PARTNERS with you to deliver the impact?",
          bullets: ["NGOs and technical providers", "Schools / faith-based / health centres", "Funders (EFJ, GAC, IDB)"],
          placeholder: "NEPA, RADA, St Aloysius Primary School, Trench Town Methodist Church…",
        },
      },
    },
  },
  {
    id: "key-activities",
    label: "Key Activities",
    rubricRef: "Rubric A2 (8 pts)",
    rubricNote: "Adaptation Logic Chain — biophysical pathway + beneficiary pathway both clearly explained.",
    prompts: {
      revenue: {
        topLayer: {
          question: "What COMMERCIAL activities make the money?",
          bullets: ["Production (nursery, harvest, processing)", "Sales + marketing + customer service", "Brand + certification management"],
          placeholder: "Hydroponic lettuce production, twice-weekly hotel deliveries, weekly farmers' market, Instagram marketing…",
        },
        impact: {
          question: "What NbCS activities deliver the climate + community impact?",
          bullets: ["NbCS implementation (planting, restoration, infrastructure)", "MRV — biophysical + beneficiary monitoring", "Community co-design + engagement", "IUCN self-assessment"],
          placeholder: "Plant 300 native trees Y1, monitor canopy cover quarterly, run 4 community co-design workshops, complete IUCN NbS self-assessment…",
        },
      },
      blended: {
        topLayer: {
          question: "What COMMERCIAL + CROSS-SUBSIDY activities run the model?",
          bullets: ["Commercial production for paying channel", "Cross-subsidy accounting", "Anchor-partner stewardship + reporting", "Transparent % split"],
          placeholder: "Produce 60% for sale to commercial, 40% donated to school feeding programme; quarterly cross-subsidy report to TEF anchor partner…",
        },
        impact: {
          question: "What NbCS + community-stream activities deliver impact?",
          bullets: ["NbCS implementation + dual-channel ops", "MRV + IUCN", "Community engagement", "Gender + GBV safeguards"],
          placeholder: "Plant 2 ha agroforestry, MRV monthly, train 12 community stewards, monthly community report-back…",
        },
      },
      public: {
        topLayer: {
          question: "What STEWARDSHIP + ADOPTION TRANSITION activities run the model?",
          bullets: ["NbCS implementation + agency transition planning", "MoU drafting + stewardship hand-over", "Steward capacity building"],
          placeholder: "Year 1: build the NbCS asset with community; Year 2: train 6 KSAMC technicians; Year 3: hand over to KSAMC budget line…",
        },
        impact: {
          question: "What NbCS + impact-delivery activities run alongside?",
          bullets: ["MRV — biophysical + beneficiary monitoring", "Community co-design + engagement", "IUCN self-assessment", "Gender + GBV safeguards"],
          placeholder: "Quarterly canopy + temperature measurements, 4 community co-design events, complete 5 IUCN criteria, GBV referral pathway…",
        },
      },
    },
  },
  {
    id: "value-proposition",
    label: "Value Proposition",
    rubricRef: "Rubric A1+A4 (9 pts)",
    rubricNote: "NbCS Intervention Selection + Concept Note Quality — recognized NbCS category + coherent narrative.",
    prompts: {
      revenue: {
        topLayer: {
          question: "COMMERCIAL VALUE PROPOSITION (CVP) — why do customers PAY for this?",
          bullets: ["What product or service customers buy", "Price point or premium logic", "Brand / certification differentiator"],
          placeholder: "Same-morning-harvested pesticide-free lettuce at $5/head, 15% cheaper than imports, carbon-neutral certified…",
        },
        impact: {
          question: "IMPACT VALUE PROPOSITION (IVP) — what climate + community impact is delivered?",
          bullets: ["Climate adaptation benefit (cooler air, reduced flooding, food security)", "Co-benefits (biodiversity, livelihoods, gender)", "NDC contribution"],
          placeholder: "Urban heat reduced 2°C across 5 ha; 200 native plants restored; 6 women trained in climate-smart hydroponics…",
        },
      },
      blended: {
        topLayer: {
          question: "CVP — why does the COMMERCIAL channel buy + the ANCHOR co-fund?",
          bullets: ["Commercial-customer pitch", "Why the anchor partner sponsors", "ESG / brand uplift for both"],
          placeholder: "Couples Resorts: premium local provenance + ESG storyline. TEF anchor: NbCS tourism resilience for parish, ESG-aligned investment…",
        },
        impact: {
          question: "IVP — what does the COMMUNITY get for free / subsidised?",
          bullets: ["Free / subsidised access for vulnerable group", "Climate adaptation benefit at catchment scale", "Co-benefits"],
          placeholder: "School-feeding programme gets 40% of yield free; 300 children with improved nutrition; flood buffer for low-lying community…",
        },
      },
      public: {
        topLayer: {
          question: "ADOPTION VALUE PROPOSITION (AVP) — why will the AGENCY adopt this?",
          bullets: ["What problem does it solve for the agency", "Implicit fiscal saving (cheaper than status quo)", "Aligned with NDC / sector plan / parish development order"],
          placeholder: "KSAMC currently spends JMD $4M/yr on storm drain clearance in Trench Town; this NbCS reduces that cost by ~JMD $2.4M/yr while delivering urban canopy…",
        },
        impact: {
          question: "IVP — what does the COMMUNITY experience?",
          bullets: ["Free / permanent ecosystem service", "Climate adaptation at neighbourhood scale", "Co-benefits (biodiversity, livelihoods, gender, GBV-safe public space)"],
          placeholder: "Permanent shade across 1.2 ha public space, 70% flood depth reduction in heavy rain, safer walking corridor for women + children…",
        },
      },
    },
  },
  {
    id: "customer-stewardship",
    label: "Customer / Stewardship Relationship",
    rubricRef: "Rubric C4 (5 pts)",
    rubricNote: "Vulnerability-to-Benefits Link — clear mechanism for how benefits reach the vulnerable.",
    prompts: {
      revenue: {
        topLayer: {
          question: "How do you build COMMERCIAL relationships?",
          bullets: ["Repeat-purchase loyalty", "B2B contracts / offtake agreements", "ESG storytelling for buyers"],
          placeholder: "Weekly WhatsApp produce list, 12-month offtake contract with Couples, ESG impact stories shared with hotel marketing team…",
        },
        impact: {
          question: "How do you steward the COMMUNITY relationship?",
          bullets: ["Co-management + community board", "Transparency reporting", "Grievance + accountability mechanism"],
          placeholder: "Quarterly community meeting + signed minutes, public annual report with community signatures, grievance hotline with 14-day response standard…",
        },
      },
      blended: {
        topLayer: {
          question: "How do you maintain the COMMERCIAL + ANCHOR relationships?",
          bullets: ["Commercial repeat-buyer loyalty + ESG narrative", "Anchor partner MoU + reporting cadence", "Cross-subsidy transparency"],
          placeholder: "Quarterly anchor partner report showing % cross-subsidy delivered, monthly hotel buyer ESG newsletter, signed MoU reviewed annually…",
        },
        impact: {
          question: "How do you steward the COMMUNITY beneficiaries?",
          bullets: ["Named delivery commitments to community", "Transparency reporting on cross-subsidy ratio", "Co-management"],
          placeholder: "Annual community report-back showing the 40% public-good delivery, school principal sits on board, grievance pathway via parish council…",
        },
      },
      public: {
        topLayer: {
          question: "How do you maintain the AGENCY ADOPTION relationship?",
          bullets: ["Signed MoU with budget commitment", "Multi-year budget line confirmed in agency fiscal plan", "Reporting cadence to agency"],
          placeholder: "MoU signed Aug 2026 with 3-year budget line in KSAMC FY2027 plan, quarterly NbCS performance report to KSAMC committee…",
        },
        impact: {
          question: "How do you steward the COMMUNITY?",
          bullets: ["Community co-design + co-management", "Public consultation", "Community ownership transfer at handover", "Grievance + accountability"],
          placeholder: "Trench Town Community Trust co-manages from Day 1, ownership transferred Month 24, grievance hotline with publicly-posted SLA…",
        },
      },
    },
  },
  {
    id: "customer-beneficiary",
    label: "Customer / Beneficiary Segment",
    rubricRef: "Rubric C1+C2 (9 pts)",
    rubricNote: "Vulnerability Dimensions + Beneficiary Disaggregation — multiple groups identified + disaggregated numbers.",
    prompts: {
      revenue: {
        topLayer: {
          question: "Who are your PAYING customers?",
          bullets: ["Customer segments (B2C / B2B / institutional)", "Number of customers expected", "Geographic spread"],
          placeholder: "B2B: 6 hotels in Ocho Rios (40% of revenue). B2C: 200 weekend market shoppers (60%). All within 30km radius…",
        },
        impact: {
          question: "Who BENEFITS from the climate + community impact?",
          bullets: ["Catchment community", "Vulnerable groups (women, youth, low-income, PWD, housing-vulnerable)", "Biodiversity + downstream beneficiaries"],
          placeholder: "1,400 catchment residents indirectly benefit; 60% women-headed households; 200 children under 5 in heat-vulnerable homes; downstream coral reef…",
        },
      },
      blended: {
        topLayer: {
          question: "Who PAYS + who is the ANCHOR PARTNER?",
          bullets: ["Commercial paying customers", "Anchor partner (named)", "Cross-subsidy ratio (% paying / % public-good)"],
          placeholder: "Commercial: Couples Resorts + 2 other hotels (60% of revenue). Anchor: Tourism Enhancement Fund (40% co-fund). Cross-subsidy: 60/40…",
        },
        impact: {
          question: "Who BENEFITS from the public-good stream?",
          bullets: ["Public-good beneficiaries (vulnerable groups)", "Catchment community", "Disaggregated numbers"],
          placeholder: "300 children at St Aloysius School (school-feeding programme), 50 elderly residents in the catchment, 70% women-headed households…",
        },
      },
      public: {
        topLayer: {
          question: "Who ADOPTS and who STEWARDS?",
          bullets: ["★ Adopting Agency (named)", "★ Stewarding Community body (named)", "Roles and responsibilities for each"],
          placeholder: "★ ADOPTING: KSAMC Climate Office (budget allocation + monitoring). ★ STEWARDING: Trench Town Community Trust (day-to-day management + grievance)…",
        },
        impact: {
          question: "Who BENEFITS?",
          bullets: ["Entire catchment community", "Vulnerable groups disaggregated", "Biodiversity + ecosystem service users"],
          placeholder: "1,800 catchment residents, 70% women-headed households, 200 children under 5, 80 elderly residents, 1 perennial stream restored…",
        },
      },
    },
  },
  {
    id: "key-resources",
    label: "Key Resources",
    rubricRef: "Rubric D1 (6 pts)",
    rubricNote: "Sustainability Model — land tenure, technical resources, brand, M&E systems.",
    prompts: {
      revenue: {
        topLayer: {
          question: "What COMMERCIAL resources do you need?",
          bullets: ["Land + water rights", "Production infrastructure (greenhouse, equipment)", "Inventory, brand, certifications, staff"],
          placeholder: "1 acre leased greenhouse site, NFT system, 5,000L rainwater tank, 'St Mary Smart Farm' brand registered, 2 part-time staff…",
        },
        impact: {
          question: "What NbCS + impact resources do you need?",
          bullets: ["Native species inventory", "NbCS technical expertise", "Community trust + relationships", "M&E systems"],
          placeholder: "300 native seedling inventory (Jamaican guango, lignum vitae), IUCN technical advisor, community trust built via Helen's Daughters network, M&E spreadsheet…",
        },
      },
      blended: {
        topLayer: {
          question: "What COMMERCIAL + ANCHOR-PARTNER resources?",
          bullets: ["Production assets", "Brand", "Dual-stream accounting capability", "Signed anchor MoU"],
          placeholder: "Production: as above. Brand: 'TEF-Supported Climate-Smart Farm'. Anchor MoU signed Apr 2026 with named TEF officer + reporting template…",
        },
        impact: {
          question: "What NbCS + community resources?",
          bullets: ["Native species inventory", "NbCS technical expertise", "Community trust + named CBO partnership", "M&E systems"],
          placeholder: "Native seedling inventory, technical advisor, named CBO partnership (Annotto Bay CBO), M&E systems…",
        },
      },
      public: {
        topLayer: {
          question: "What STEWARDSHIP + ADOPTION resources?",
          bullets: ["Land tenure / right-of-use (multi-year)", "Agency budget commitment", "Named community stewardship body", "Signed MoU"],
          placeholder: "30-year right-of-use granted by KSAMC for 1.2 ha, draft MoU with 3-yr budget commitment, Trench Town Community Trust (legally registered)…",
        },
        impact: {
          question: "What NbCS + impact resources?",
          bullets: ["Native species inventory", "NbCS technical expertise", "Community labour + co-design capacity", "M&E systems + reporting"],
          placeholder: "500 native seedling inventory, IUCN advisor, 24 community volunteers (commitment letters), M&E + quarterly reporting template…",
        },
      },
    },
  },
  {
    id: "channels",
    label: "Channels",
    rubricRef: "Rubric C3 (6 pts)",
    rubricNote: "Gender Analysis — channels reach gender-differentiated participants + barriers addressed.",
    prompts: {
      revenue: {
        topLayer: {
          question: "How do COMMERCIAL channels reach customers?",
          bullets: ["Direct sales (farm gate, market, online)", "B2B contracts", "Agritourism / eco-experience"],
          placeholder: "Farm gate sale Sat 7-11am, WhatsApp B2B orders Tue + Thu, Instagram for B2C marketing, 1 monthly farm tour…",
        },
        impact: {
          question: "How do IMPACT channels reach the community?",
          bullets: ["Community delivery channels", "Transparency reports", "Public knowledge products"],
          placeholder: "Community-meeting talks (monthly), parish radio station feature (quarterly), Facebook page in patois + English…",
        },
      },
      blended: {
        topLayer: {
          question: "How do your TWO PARALLEL channels work?",
          bullets: ["Commercial sales channel", "Community distribution channel (free / subsidised)", "Anchor reporting channel"],
          placeholder: "(i) Commercial: hotel deliveries Tue+Fri. (ii) Community: school-feeding handovers Wed. (iii) Anchor: quarterly TEF dashboard report…",
        },
        impact: {
          question: "How do you communicate IMPACT to community?",
          bullets: ["Community engagement events", "Anchor-partner reporting", "Public impact narrative"],
          placeholder: "Quarterly community meeting, anchor partner dashboard published quarterly, school assembly talks…",
        },
      },
      public: {
        topLayer: {
          question: "How do AGENCY + STEWARDSHIP channels work?",
          bullets: ["Public agency communications (formal)", "Co-design events", "Community-meeting outreach"],
          placeholder: "Monthly KSAMC report-in, quarterly co-design workshop, signage with grievance hotline at NbCS site…",
        },
        impact: {
          question: "How do you reach the COMMUNITY directly?",
          bullets: ["Community delivery (no commercial intermediary)", "Schools / health / faith-based co-delivery", "Public knowledge products"],
          placeholder: "Site is open 24/7 with community signage, school partnership for outdoor classroom, monthly walk-and-talk for elders…",
        },
      },
    },
  },
  {
    id: "cost-structure",
    label: "Cost Structure",
    rubricRef: "Rubric E2+E3 (7 pts)",
    rubricNote: "Budget Realism + Admin Costs ≤10% — line-item budget + admin tagged separately.",
    prompts: {
      revenue: {
        topLayer: {
          question: "What COMMERCIAL costs do you incur?",
          bullets: ["Capex: site prep, planting, equipment", "Opex: staff, inputs, maintenance, marketing", "Admin ≤10% per EFJ rule"],
          placeholder: "Capex Y1: JMD $1.2M greenhouse build. Opex/yr: $1.5M staff, $400K inputs, $200K marketing. Admin: $250K (8%)…",
        },
        impact: {
          question: "What NbCS-SPECIFIC costs do you incur?",
          bullets: ["MRV + biodiversity monitoring", "IUCN self-assessment", "Community engagement + safeguards", "Knowledge products"],
          placeholder: "MRV: $180K/yr for monitoring. IUCN: $80K. Community engagement: $200K. GBV safeguards: $50K. Knowledge products: $40K…",
        },
      },
      blended: {
        topLayer: {
          question: "How are COMMERCIAL + PUBLIC-GOOD costs SPLIT?",
          bullets: ["Commercial-stream capex + opex (tagged %)", "Public-good-stream capex + opex (tagged %)", "Cross-subsidy ratio documented", "Admin ≤10%"],
          placeholder: "Commercial-tagged: 60% of $4M = $2.4M. Public-good-tagged: 40% = $1.6M. Admin: 7%. Cross-subsidy ratio reviewed annually with anchor partner…",
        },
        impact: {
          question: "What NbCS-SPECIFIC costs do you incur?",
          bullets: ["MRV + biodiversity monitoring", "IUCN self-assessment", "Community engagement + GBV safeguards"],
          placeholder: "MRV: $220K/yr. IUCN: $90K. Community engagement: $280K. Safeguards: $60K…",
        },
      },
      public: {
        topLayer: {
          question: "How are STEWARDSHIP + ADOPTION costs structured?",
          bullets: ["Capex during grant period", "Opex post-grant via agency budget adoption", "Community stewardship cost (in-kind valued)", "Admin ≤10%"],
          placeholder: "Grant capex Y1: $8M. Post-grant opex (Y2 onward) from KSAMC: $1.2M/yr. Community in-kind: $400K/yr (volunteer labour valued at replacement cost)…",
        },
        impact: {
          question: "What NbCS-SPECIFIC costs do you incur?",
          bullets: ["MRV", "IUCN self-assessment", "Community engagement", "Gender + GBV safeguards", "Knowledge products"],
          placeholder: "MRV: $280K/yr. IUCN: $100K (Y1 only). Community engagement: $340K. Safeguards: $80K. Knowledge products: $50K…",
        },
      },
    },
  },
  {
    id: "revenue-inflows",
    label: "Revenue Streams / Sustainability Inflows",
    rubricRef: "Rubric E4+E5 (8 pts)",
    rubricNote: "Co-Financing + sustainability inflows — disclosed sources, named amounts, confidence rating.",
    prompts: {
      revenue: {
        topLayer: {
          question: "What COMMERCIAL revenue streams sustain the model?",
          bullets: ["Product sales (primary)", "Service fees", "Premium / certification price uplift", "Agritourism revenue"],
          placeholder: "Product sales: 60% of inflows = JMD $3M/yr. Service fees (farm tours): $400K. Certification premium: $300K. Agritourism: $300K…",
        },
        impact: {
          question: "What IMPACT-LINKED inflows do you anticipate?",
          bullets: ["Carbon credits / PES / biodiversity credits", "In-kind community contribution", "Grant follow-on (programmed)"],
          placeholder: "Verra carbon credits Y3 onward: $500K/yr. In-kind community labour valued at $200K/yr. Y3 follow-on EFJ cycle expected: $1M…",
        },
      },
      blended: {
        topLayer: {
          question: "What COMMERCIAL + ANCHOR inflows sustain the model?",
          bullets: ["Commercial sales (primary)", "Anchor partner cross-subsidy or sponsorship", "Optional: carbon / PES"],
          placeholder: "Commercial sales: $2.4M/yr. Anchor (TEF): $1.6M/yr for 3 yrs. Optional carbon credits Y4+: $300K/yr…",
        },
        impact: {
          question: "What COMMUNITY + IMPACT inflows do you anticipate?",
          bullets: ["In-kind community contribution (mandatory)", "Carbon / PES / biodiversity credits", "Reduced public-service cost (implicit)", "Optional follow-on grants"],
          placeholder: "Community in-kind: $400K/yr. Verra carbon Y4: $300K/yr. Implicit fiscal saving to KSAMC: $1.2M/yr (in-kind credit)…",
        },
      },
      public: {
        topLayer: {
          question: "What ADOPTION + STEWARDSHIP inflows sustain the model post-grant?",
          bullets: ["★ Public agency budget allocation post-grant (primary)", "★ In-kind community contribution (mandatory)", "Reduced public-service cost (implicit)"],
          placeholder: "★ KSAMC Y2-Y4 budget line: $1.2M/yr (MoU). ★ Community in-kind: $400K/yr (24 volunteers × replacement cost). Implicit storm-drain saving: $2.4M/yr…",
        },
        impact: {
          question: "What IMPACT-LINKED inflows do you anticipate?",
          bullets: ["Carbon credits / PES / biodiversity credits", "Parametric / insurance payouts (if relevant)", "Ongoing grant flows (GCF, IDB, GAC, follow-on EFJ)"],
          placeholder: "Verra blue carbon Y3+: $400K/yr. Parametric payout potential (flood reduction): $200K avg event. GCF SAP application Y2: $2M…",
        },
      },
    },
  },
];

// Knode-style honest warnings — surface contextually based on pathway + canvas state
export const KNODE_TRAPS: KnodeTrap[] = [
  {
    id: "anchor-mirage",
    pathways: ["blended"],
    title: "⚠ The Anchor Partner Mirage",
    body:
      "If you named an anchor partner but don't have a written MoU yet, you're at score-down risk for Rubric D3. Add 'secure anchor MoU' to your Stage 6 commitments before the FTP submission deadline.",
  },
  {
    id: "adopting-agency-mirage",
    pathways: ["public"],
    title: "⚠ The Adopting Agency Mirage",
    body:
      "Without a signed adoption commitment, your post-grant sustainability is unverified. Rubric D1 (6 pts) scores this directly. Add 'secure agency MoU with budget line' to Stage 6.",
  },
  {
    id: "single-channel-trap",
    pathways: ["revenue"],
    title: "⚠ The Single-Channel Trap",
    body:
      "If all revenue depends on one offtaker, your sustainability fails concentration-risk under Rubric D2 (FTP stage). Diversify or document a fallback buyer.",
  },
  {
    id: "in-kind-undervalued",
    pathways: ["blended", "public"],
    title: "⚠ The In-Kind Mirage",
    body:
      "Community volunteer labour is not free. The J-USE budget template requires in-kind valued at replacement cost. Estimate: avg hourly rate × hours × number of volunteers. Don't enter 'volunteers will help' without a number.",
  },
  {
    id: "iucn-skipped",
    pathways: ["revenue", "blended", "public"],
    title: "⚠ The IUCN Skipped Trap",
    body:
      "If your Canvas Key Activities block doesn't mention IUCN self-assessment, Rubric A5 (3 pts) is at risk. The 5 EFJ-adopted IUCN criteria (mitigation, biodiversity, governance, trade-offs, grant compliance) must appear in your activities.",
  },
];
