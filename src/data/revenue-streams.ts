import type { RevenueStream, CommitmentSuggestion } from "./types";

export const REVENUE_STREAMS: RevenueStream[] = [
  {
    id: "customer-sales",
    label: "Customer / product sales",
    hint: "What paying customers buy.",
    type: "cash",
    applicability: { revenue: "mandatory", blended: "mandatory", public: "hidden" },
  },
  {
    id: "anchor-cross-subsidy",
    label: "Anchor partner cross-subsidy / sponsorship",
    hint: "Named anchor partner contribution. Document the MoU.",
    type: "cash",
    applicability: { revenue: "hidden", blended: "mandatory", public: "hidden" },
  },
  {
    id: "public-agency-budget",
    label: "Public agency budget allocation post-grant",
    hint: "Named agency budget commitment. Document the MoU + line item.",
    type: "cash",
    applicability: { revenue: "hidden", blended: "optional", public: "mandatory" },
  },
  {
    id: "in-kind",
    label: "In-kind community contribution",
    hint: "Volunteer labour, land use, materials — valued at replacement cost.",
    type: "in-kind",
    applicability: { revenue: "optional", blended: "mandatory", public: "mandatory" },
  },
  {
    id: "carbon-pes",
    label: "Carbon credits / PES / biodiversity credits",
    hint: "Verra, Plan Vivo, Caribbean Blue Carbon Hub, etc.",
    type: "cash",
    applicability: { revenue: "optional", blended: "optional", public: "optional" },
  },
  {
    id: "grants-followon",
    label: "Programmed grants follow-on",
    hint: "GCF, GAC, IDB, EFJ next-cycle, etc.",
    type: "cash",
    applicability: { revenue: "optional", blended: "optional", public: "optional" },
  },
  {
    id: "fiscal-saving",
    label: "Reduced public-service cost (implicit fiscal saving)",
    hint: "Cost the public sector avoids because of the NbCS, captured as in-kind credit.",
    type: "in-kind",
    applicability: { revenue: "hidden", blended: "optional", public: "optional" },
  },
  {
    id: "parametric",
    label: "Parametric / insurance payouts",
    hint: "If the NbCS reduces an insured loss (e.g. flood, hurricane).",
    type: "cash",
    applicability: { revenue: "optional", blended: "optional", public: "optional" },
  },
];

export const COMMITMENT_SUGGESTIONS: CommitmentSuggestion[] = [
  // Public pathway, T2 amber/red — adopting agency not yet secured
  {
    pathway: "public",
    trigger: "t2-amber",
    text: "Secure a written adoption commitment (MoU or LoI) from the named public agency",
    firstAction: "Email the agency lead requesting an MoU template + a 30-min meeting in the next 2 weeks.",
  },
  {
    pathway: "public",
    trigger: "t2-red",
    text: "Identify and approach a second candidate adopting agency as a fallback",
    firstAction: "List 3 candidate agencies (parish council, NEPA, RADA, ministry) and request introductory meetings.",
  },
  // Blended pathway, T2 amber/red — anchor partner not yet secured
  {
    pathway: "blended",
    trigger: "t2-amber",
    text: "Secure a written commitment (MoU or LoI) from the named anchor partner",
    firstAction: "Email the anchor partner contact with the proposed cross-subsidy ratio + reporting cadence.",
  },
  {
    pathway: "blended",
    trigger: "t2-red",
    text: "Re-evaluate the blended pathway — without an anchor, you may need to switch to Public Good",
    firstAction: "Re-take the pathway diagnostic with honest answers + book a mentor call.",
  },
  // Revenue pathway, T2 amber — single-channel concentration risk
  {
    pathway: "revenue",
    trigger: "t2-amber",
    text: "Diversify your customer base — identify ≥2 named offtakers, not just one",
    firstAction: "List 5 candidate B2B offtakers + cold-outreach this week.",
  },
  // All pathways, T1 amber — O&M coverage gap
  {
    pathway: "revenue",
    trigger: "t1-amber",
    text: "Close the O&M gap — add a programmed grant follow-on or scale up the cash component",
    firstAction: "Review GCF / GAC / EFJ next-cycle calendar and identify the next eligible application window.",
  },
  {
    pathway: "blended",
    trigger: "t1-amber",
    text: "Quantify in-kind community contribution in JMD using replacement-cost methodology",
    firstAction: "List all in-kind contributions in a spreadsheet (volunteer hrs × hourly rate, land × annual lease value, etc).",
  },
  {
    pathway: "public",
    trigger: "t1-amber",
    text: "Quantify in-kind community contribution in JMD using replacement-cost methodology",
    firstAction: "List all in-kind contributions in a spreadsheet (volunteer hrs × hourly rate, land × annual lease value, etc).",
  },
  // T3 amber — cumulative cashflow risk
  {
    pathway: "revenue",
    trigger: "t3-amber",
    text: "Build a 3-year cashflow projection and stress-test against a one-bad-year scenario",
    firstAction: "Use the J-USE FTP Budget Template and add a worst-case row showing -25% revenue.",
  },
  {
    pathway: "blended",
    trigger: "t3-amber",
    text: "Build a 3-year cashflow projection and stress-test against a one-bad-year scenario",
    firstAction: "Use the J-USE FTP Budget Template and add a worst-case row showing -25% revenue + delayed anchor.",
  },
  {
    pathway: "public",
    trigger: "t3-amber",
    text: "Confirm multi-year agency budget commitment in writing (3-year minimum)",
    firstAction: "Request the agency MoU to specify Y1, Y2, Y3 budget lines explicitly.",
  },
  // Always-on suggestions per pathway
  {
    pathway: "revenue",
    trigger: "always",
    text: "Add IUCN NbS self-assessment to your Y1 activity plan",
    firstAction: "Download the 5 EFJ-adopted IUCN criteria and complete the self-assessment by Month 3.",
  },
  {
    pathway: "blended",
    trigger: "always",
    text: "Add IUCN NbS self-assessment to your Y1 activity plan",
    firstAction: "Download the 5 EFJ-adopted IUCN criteria and complete the self-assessment by Month 3.",
  },
  {
    pathway: "public",
    trigger: "always",
    text: "Add IUCN NbS self-assessment to your Y1 activity plan",
    firstAction: "Download the 5 EFJ-adopted IUCN criteria and complete the self-assessment by Month 3.",
  },
];
