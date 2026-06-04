// J-USE Sustainable Financing Mechanism (SFM) Reviewer Rubric
// Used by EFJ reviewers + the Government Approval Committee (GAC) to score
// Full Technical Proposals (FTPs) for the J-USE 2026 grant cycle.
//
// 100 points across 5 weighted categories + 5-point bonus for confirmed
// co-financing. Preceded by 3 binary eligibility gates that must all clear
// before scoring begins.

export type SubCriterion = {
  code: string;        // e.g. "A2"
  label: string;       // short name
  points: number;
  description: string; // what scorers look for
};

export type RubricCategory = {
  code: string;        // "A" through "E"
  label: string;
  weight: number;      // percentage / points (same here)
  subCriteria: SubCriterion[];
};

export const ELIGIBILITY_GATES: SubCriterion[] = [
  {
    code: "G1",
    label: "Legal Entity in Jamaica",
    points: 0,
    description:
      "Valid registration certificate confirming the entity is legally registered and in good standing — Companies Office, charity registration, or comparable legal documentation.",
  },
  {
    code: "G2",
    label: "Eligible Urban Location",
    points: 0,
    description:
      "Project located in one of the 7 eligible parishes: Kingston & St. Andrew, St. Catherine, Clarendon, St. Mary, St. Thomas, Westmoreland, Hanover.",
  },
  {
    code: "G3",
    label: "Documentation Complete",
    points: 0,
    description:
      "All 4 required documents uploaded: Letter of Intent, Budget Breakdown (Excel preferred), Registration Certificate, Organisational Capacity statement. Government / SOE applicants exempt from Registration Certificate (3 of 4 docs accepted).",
  },
];

export const RUBRIC: RubricCategory[] = [
  {
    code: "A",
    label: "NbCS Alignment",
    weight: 25,
    subCriteria: [
      {
        code: "A1",
        label: "NbCS Intervention Selection",
        points: 5,
        description:
          "Recognised NbCS category with clear link to climate challenge. Complementary secondary NbCS approaches identified.",
      },
      {
        code: "A2",
        label: "Adaptation Logic Chain",
        points: 8,
        description:
          "Clear biophysical pathway (ecosystem-service change) AND beneficiary pathway (reduced community vulnerability). Both pathways evidence-based and internally consistent. Largest single sub-criterion in the rubric.",
      },
      {
        code: "A3",
        label: "Outcome Metrics",
        points: 5,
        description:
          "≥3 specific, measurable, achievable, relevant, time-bound (SMART) metrics with baselines, targets, timeframes. Cover both ecological and community-level outcomes.",
      },
      {
        code: "A4",
        label: "Concept Note Quality",
        points: 4,
        description:
          "Coherent NbCS narrative, well-structured, evidence-informed. Problem, objectives, and approach clearly linked.",
      },
      {
        code: "A5",
        label: "IUCN Self-Assessment",
        points: 3,
        description:
          "5 EFJ-adopted IUCN NbS criteria addressed substantively: (1) mitigation, (2) biodiversity, (3) governance, (4) trade-offs, (5) grant compliance. Score against these 5 only — do not deduct for the other 3 IUCN Global Standard criteria.",
      },
    ],
  },
  {
    code: "B",
    label: "Climate Dimension",
    weight: 15,
    subCriteria: [
      {
        code: "B1",
        label: "Climate Dimensions Addressed",
        points: 5,
        description:
          "≥3 specific climate vulnerabilities relevant to the urban context (heat, flooding, drought, sea-level rise, storms) clearly linked to the target community.",
      },
      {
        code: "B2",
        label: "Intervention-Dimension Logic",
        points: 5,
        description:
          "Clear, evidence-based explanation of how the NbCS intervention addresses each identified climate dimension.",
      },
      {
        code: "B3",
        label: "Coping & System Transformation",
        points: 5,
        description:
          "Both short-term coping strategies AND long-term system transformation addressed. For projects under the Public pathway: includes policy alignment scored from the public-policy-adoption commitment.",
      },
    ],
  },
  {
    code: "C",
    label: "Inclusion Commitment",
    weight: 25,
    subCriteria: [
      {
        code: "C1",
        label: "Vulnerability Dimensions",
        points: 4,
        description:
          "Multiple vulnerability dimensions identified (socioeconomic, gender, age, disability, geographic) with evidence of how each affects target community's climate-risk exposure.",
      },
      {
        code: "C2",
        label: "Beneficiary Disaggregation",
        points: 5,
        description:
          "Beneficiary data disaggregated by gender, age, disability status, income level. Specific targets per group + methodology described.",
      },
      {
        code: "C3",
        label: "Gender Analysis",
        points: 6,
        description:
          "Comprehensive gender analysis: differential climate impacts, participation barriers, gender-responsive strategies. Project-specific, not generic.",
      },
      {
        code: "C4",
        label: "Vulnerability-to-Benefits Link",
        points: 5,
        description:
          "Clear, logical explanation of how the intervention's benefits reach the most vulnerable. Specific mechanisms (targeted outreach, accessible locations, subsidised participation) identified.",
      },
      {
        code: "C5",
        label: "GBV & Inclusion Approach",
        points: 3,
        description:
          "Explicit Gender-Based Violence (GBV) risk assessment + mitigation measures. Broader inclusion safeguards (disability, youth, elderly) with actionable commitments.",
      },
    ],
  },
  {
    code: "D",
    label: "Risk Management & Sustainability",
    weight: 20,
    subCriteria: [
      {
        code: "D1",
        label: "Sustainability Model",
        points: 6,
        description:
          "Realistic plan covering financial, institutional, and environmental dimensions. Post-grant funding strategy, community-ownership mechanisms, and maintenance plans for NbCS infrastructure.",
      },
      {
        code: "D2",
        label: "Risk Identification & Mitigation",
        points: 8,
        description:
          "At Full Technical Proposal stage: full Risk Register required — ≥5 risks across financial / operational / environmental / social / political with likelihood × impact ratings, specific mitigations, assigned responsibility, and monitoring frequency.",
      },
      {
        code: "D3",
        label: "Partnership & Scaling",
        points: 4,
        description:
          "Named partners with defined roles + realistic plan for scaling beyond the project period. For Blended pathway: signed Anchor Partner Memorandum of Understanding. For Public pathway: signed Adopting Agency Memorandum of Understanding.",
      },
      {
        code: "D4",
        label: "Institutional Capacity / Training Needs Assessment (TNA)",
        points: 2,
        description:
          "Honest self-assessment with identified capacity gaps. Updated TNA + Capacity Strengthening Plan from Final Technical Proposal stage onwards.",
      },
    ],
  },
  {
    code: "E",
    label: "Feasibility",
    weight: 15,
    subCriteria: [
      {
        code: "E1",
        label: "Project Timeline",
        points: 3,
        description:
          "≤12 months realistic timeline with key milestones, deliverables, dependencies mapped (Gantt chart or equivalent at FTP stage).",
      },
      {
        code: "E2",
        label: "Budget Realism",
        points: 5,
        description:
          "Detailed line-item budget with cost justification for major expenditures. Unit costs realistic and benchmarked (≥2 quotes for items >5% of total at FTP stage).",
      },
      {
        code: "E3",
        label: "Administrative Costs",
        points: 2,
        description:
          "Administrative costs identified separately and ≤10% of total budget per EFJ rule. Justified.",
      },
      {
        code: "E4",
        label: "Co-Financing",
        points: 3,
        description:
          "Disclosed co-financing sources with named amounts. Confidence rating provided. Cash + in-kind both eligible.",
      },
      {
        code: "E5",
        label: "Co-Financing Bonus",
        points: 5,
        description:
          "BONUS — capped at +5. Confirmed co-financing ≥25% of total project cost with signed commitment letters: full 5 pts. 10–25%: +3. Below 10% or undisclosed: 0.",
      },
    ],
  },
];

export const TIER_TABLE = [
  { tier: "Tier 1", range: "85–100", label: "Highly Recommended", decision: "Priority Screening Interview" },
  { tier: "Tier 2", range: "70–84", label: "Recommended", decision: "Advance to Screening Interview" },
  { tier: "Tier 3", range: "55–69", label: "Conditional Advance", decision: "Advance with required improvements documented" },
  { tier: "Tier 4", range: "40–54", label: "Do Not Advance", decision: "Application not advanced" },
  { tier: "Tier 5", range: "<40", label: "Not Aligned", decision: "Application not advanced" },
];

export const RUBRIC_TOTAL = 100;
export const RUBRIC_BONUS = 5;
