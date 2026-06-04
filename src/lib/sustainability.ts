// Shared sustainability-test evaluator. Used by both the live UI (Stage 5)
// and the portrait completion summary PDF (PrintSummary).
//
// Three tests with traffic-light outcomes:
//   T1 — Operations and Maintenance (O&M) coverage ≥100% by month 12
//   T2 — Pathway-specific anchor presence (offtakers / Anchor Partner / Adopting Agency)
//   T3 — Cumulative 3-year cashflow positive

import type { EngineState } from "@/data/types";
import { parseNum } from "./utils";

export type Light = "green" | "amber" | "red";

export type TestEvaluation = {
  t1: Light;
  t2: Light;
  t3: Light;
  totalInflows: number;
  cash: number;
  inKind: number;
  omCoverage: number;
};

export function evalTestsForState(s: EngineState): TestEvaluation {
  const omAnnual = parseNum(s.omAnnualCost);
  const streams = Object.values(s.revenue);
  let cash = 0;
  let inKind = 0;
  streams.forEach((r) => {
    const c = parseNum(r.cash);
    const k = parseNum(r.inKind);
    let mult = 1;
    if (r.freq === "monthly") mult = 12;
    else if (r.freq === "one-off") mult = 1 / 3; // amortise over 3 years
    cash += c * mult;
    inKind += k * mult;
  });
  const totalInflows = cash + inKind;
  const omCoverage = omAnnual > 0 ? (totalInflows / omAnnual) * 100 : 0;

  // T1: O&M coverage
  let t1: Light = "red";
  if (omCoverage >= 100) t1 = "green";
  else if (omCoverage >= 80) t1 = "amber";

  // T2: Pathway-specific anchor presence
  let t2: Light = "red";
  if (s.pathway) {
    const partners = (s.canvas["key-partners"]?.topLayer || "").toLowerCase();
    if (s.pathway === "revenue") {
      const namedCount = partners.split(/[,;+]/).filter((p) => p.trim().length > 4).length;
      t2 = namedCount >= 2 ? "green" : namedCount >= 1 ? "amber" : "red";
    }
    if (s.pathway === "blended") {
      const hasStar = partners.includes("★") || partners.includes("anchor");
      const hasMou = /mou|loi|signed|commitment letter|memorandum/i.test(partners);
      t2 = hasStar && hasMou ? "green" : hasStar ? "amber" : "red";
    }
    if (s.pathway === "public") {
      const hasAdopting = /adopting|parish council|nepa|nwa|nwc|rada|ministry|municipal|agency|foundation|philanthrop|corporate sponsor|csr|trust fund|endowment/i.test(partners);
      const hasStewarding = /steward|community trust|cbo|cooperative|association|community body/i.test(partners);
      const hasMou = /mou|loi|signed|commitment letter|memorandum/i.test(partners);
      const has2 = hasAdopting && hasStewarding;
      t2 = has2 && hasMou ? "green" : has2 ? "amber" : "red";
    }
  }

  // T3: Cumulative 3-yr cashflow positive
  const cumulativeNet = totalInflows * 3 - omAnnual * 3;
  let t3: Light = "red";
  if (cumulativeNet > 0 && totalInflows >= omAnnual) t3 = "green";
  else if (cumulativeNet > -omAnnual) t3 = "amber";

  return { t1, t2, t3, totalInflows, cash, inKind, omCoverage };
}
