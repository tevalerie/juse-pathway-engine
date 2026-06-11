export type PathwayId = "revenue" | "blended" | "public";

export type Pathway = {
  id: PathwayId;
  shortLabel: string;
  fullName: string;
  tagline: string;
  paragraph: string;
  topLayerName: string; // "Commercial" or "Stewardship & Adoption"
  topLayerCode: string; // "CVP" or "AVP"
  impactLayerCode: string; // "IVP"
  emoji: string;
};

export type CanvasBlockPrompt = {
  question: string;
  bullets: string[];
  placeholder: string;
};

// Per-block character budgets — calibrated so each layer comfortably fits its
// rendered cell on the printed Canvas without forcing a font shrink. Used by:
//   (a) live char counter shown beneath each Stage-2 textarea (amber at 80%,
//       red at 100%)
//   (b) useOverflowFit hook as a hint for which blocks to measure first
// Numbers are LOWER for half-height blocks (KA/KR/CR/Ch) and HIGHER for full-
// height columns (KP/VP/CS) and the page-2 financial blocks.
export type CharBudget = { topLayer: number; impact: number };

export type CanvasBlock = {
  id: string;
  label: string; // formal Osterwalder block label
  rubricRef: string; // e.g. "Rubric D3 (4 pts)"
  rubricNote: string; // longer description shown on hover
  charBudget: CharBudget; // soft target for each layer (see CharBudget comment)
  prompts: Record<PathwayId, { topLayer: CanvasBlockPrompt; impact: CanvasBlockPrompt }>;
};

export type Applicability = "mandatory" | "optional" | "hidden";

export type RevenueStream = {
  id: string;
  label: string;
  hint: string;
  type: "cash" | "in-kind" | "either";
  applicability: Record<PathwayId, Applicability>;
};

export type KnodeTrap = {
  id: string;
  pathways: PathwayId[];
  title: string;
  body: string;
};

export type CommitmentSuggestion = {
  pathway: PathwayId;
  trigger: "always" | "t1-amber" | "t2-amber" | "t3-amber" | "t1-red" | "t2-red" | "t3-red";
  text: string;
  firstAction: string;
};

// State stored in localStorage
export type EngineState = {
  orgName: string;
  refNumber: string;
  pathway: PathwayId | null;
  diagnostic: { q1?: boolean; q2?: boolean; q3?: boolean };
  canvas: Record<string, { topLayer: string; impact: string }>;
  revenue: Record<string, { source: string; cash: string; inKind: string; freq: "annual" | "monthly" | "one-off"; confidence: "high" | "med" | "low" }>;
  omAnnualCost: string;
  reflection: string;
  commitments: { i: number; will: string; by: string; firstAction: string }[];
  stage: number;
  // Word-count guidance mode (Stage 3 toggle).
  //   true  = Print-ready: budgets are enforced (amber at 80%, red at 100%);
  //           PrintCanvas fits cleanly on 2 pages; auto-shrinks any overflow.
  //   false = Unrestricted: pill counts shown but no warning tone; applicants
  //           can type freely with the understanding that the PDF may need
  //           additional pages or that auto-shrink will reduce legibility.
  printReadyMode: boolean;
};

export const EMPTY_STATE: EngineState = {
  orgName: "",
  refNumber: "",
  pathway: null,
  diagnostic: {},
  canvas: {},
  revenue: {},
  omAnnualCost: "",
  reflection: "",
  commitments: [
    { i: 1, will: "", by: "", firstAction: "" },
    { i: 2, will: "", by: "", firstAction: "" },
    { i: 3, will: "", by: "", firstAction: "" },
  ],
  stage: 1,
  printReadyMode: true,
};
