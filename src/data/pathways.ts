import type { Pathway } from "./types";

export const PATHWAYS: Pathway[] = [
  {
    id: "revenue",
    shortLabel: "Revenue Generating",
    fullName: "Revenue-Generating Pathway",
    tagline: "My NbCS sells something.",
    paragraph:
      "Customers pay for what your project produces. Their money sustains the NbCS beyond the grant. Climate adaptation is delivered as a side-effect of commercial viability.",
    topLayerName: "Commercial",
    topLayerCode: "CVP",
    impactLayerCode: "IVP",
    emoji: "🌿",
  },
  {
    id: "blended",
    shortLabel: "Blended",
    fullName: "Blended Pathway",
    tagline: "My NbCS has two channels — paying and public.",
    paragraph:
      "Some customers pay. Other beneficiaries don't. An anchor partner — public agency, foundation, or corporate sponsor — stabilises the public-good portion.",
    topLayerName: "Commercial + Anchor",
    topLayerCode: "CVP",
    impactLayerCode: "IVP",
    emoji: "🪴",
  },
  {
    id: "public",
    shortLabel: "Community / Public Good",
    fullName: "Community Benefits / Public Good Pathway",
    tagline: "My NbCS delivers a public benefit.",
    paragraph:
      "No customer pays. A named public agency adopts it into a budget line, and a named community body stewards it day-to-day. In-kind contribution, carbon/PES credits, and follow-on grants close the gap.",
    topLayerName: "Stewardship & Adoption",
    topLayerCode: "AVP",
    impactLayerCode: "IVP",
    emoji: "🌳",
  },
];

export const findPathway = (id: string | null) => PATHWAYS.find((p) => p.id === id);
