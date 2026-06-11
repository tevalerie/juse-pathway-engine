// buildDocx — generate an editable Word (.docx) version of the populated Canvas.
//
// Why this exists
// ───────────────
// The Canvas PDF is a deliverable snapshot. The .docx is for *adaptation* —
// applicants copy block content into their Full Technical Proposal sections,
// or trim and re-paste for a different audience. So this output is
// intentionally *sequential* (one block per section, top-to-bottom Osterwalder
// canvas order), NOT a 5-column landscape grid. Tables in Word are painful
// to edit; sections are easy.
//
// The `docx` package builds an Office Open XML document client-side. Bundle
// size ~200 kB — loaded lazily from PathwayEngine.tsx so the initial page
// doesn't pay the cost.

import {
  AlignmentType,
  Document,
  HeadingLevel,
  Packer,
  PageOrientation,
  Paragraph,
  TextRun,
} from "docx";
import { CANVAS_BLOCKS } from "@/data/canvas";
import { findPathway } from "@/data/pathways";
import type { EngineState } from "@/data/types";

// Canvas display order (Osterwalder right-side-first reading order)
const BLOCK_ORDER = [
  "customer-beneficiary",
  "value-proposition",
  "channels",
  "customer-stewardship",
  "revenue-inflows",
  "key-resources",
  "key-activities",
  "key-partners",
  "cost-structure",
];

// J-USE brand colours, hex without leading #
const C_GREEN = "009144";
const C_BLUE = "017FD5";
const C_CHARCOAL = "181616";
const C_MUTED = "666666";

function h1(text: string) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 0, after: 80 },
    children: [
      new TextRun({ text, bold: true, size: 32, color: C_GREEN }),
    ],
  });
}

function h2(text: string, rubric?: string) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 200, after: 60 },
    children: [
      new TextRun({ text, bold: true, size: 26, color: C_CHARCOAL }),
      ...(rubric
        ? [new TextRun({ text: `   ${rubric}`, size: 18, color: C_BLUE, italics: true })]
        : []),
    ],
  });
}

function layerLabel(text: string, color: string) {
  return new Paragraph({
    spacing: { before: 80, after: 20 },
    children: [
      new TextRun({ text: text.toUpperCase(), bold: true, size: 18, color, characterSpacing: 20 }),
    ],
  });
}

function body(text: string, italic = false) {
  return new Paragraph({
    spacing: { after: 60 },
    children: [
      new TextRun({
        text: text || "—",
        size: 22,
        color: text ? C_CHARCOAL : C_MUTED,
        italics: italic || !text,
      }),
    ],
  });
}

function blank() {
  return new Paragraph({ children: [], spacing: { after: 40 } });
}

export async function buildCanvasDocx(state: EngineState): Promise<Blob> {
  const pw = findPathway(state.pathway);
  if (!pw) throw new Error("No pathway selected — cannot build Canvas .docx.");

  const blockMap = Object.fromEntries(CANVAS_BLOCKS.map((b) => [b.id, b]));
  const orderedBlocks = BLOCK_ORDER.map((id) => blockMap[id]).filter(Boolean);

  const children: Paragraph[] = [];

  // ───── Title block ─────
  children.push(h1("J-USE Pathway Engine — NbCS Dual-Layer Business Model Canvas"));
  children.push(
    new Paragraph({
      spacing: { after: 60 },
      children: [
        new TextRun({ text: `${pw.emoji} ${pw.fullName}`, bold: true, size: 24, color: C_BLUE }),
      ],
    }),
  );
  if (state.orgName) {
    children.push(
      new Paragraph({
        spacing: { after: 40 },
        children: [
          new TextRun({ text: "Organisation: ", bold: true, size: 22 }),
          new TextRun({ text: state.orgName, size: 22 }),
        ],
      }),
    );
  }
  if (state.refNumber) {
    children.push(
      new Paragraph({
        spacing: { after: 80 },
        children: [
          new TextRun({ text: "Reference: ", bold: true, size: 22 }),
          new TextRun({ text: state.refNumber, size: 22, font: "Courier New" }),
        ],
      }),
    );
  }
  children.push(
    new Paragraph({
      spacing: { after: 160 },
      children: [
        new TextRun({
          text:
            `Adapted by the T. Valerie Onu, member of the J-USE SFM Team for NbCS from Burkett's ` +
            `Knode Social Enterprise Business Model Canvas — ${pw.topLayerName} (${pw.topLayerCode}) ` +
            `+ Impact Value Proposition (${pw.impactLayerCode})`,
          italics: true,
          size: 18,
          color: C_BLUE,
        }),
      ],
    }),
  );

  // ───── 9 blocks, sequential ─────
  for (const b of orderedBlocks) {
    const data = state.canvas[b.id] || { topLayer: "", impact: "" };

    children.push(h2(b.label, b.rubricRef));
    children.push(layerLabel(`${pw.topLayerName} (${pw.topLayerCode})`, C_BLUE));
    children.push(body(data.topLayer));
    children.push(layerLabel(`Impact Value Proposition (${pw.impactLayerCode})`, C_GREEN));
    children.push(body(data.impact));
    children.push(blank());
  }

  // ───── Footer credit ─────
  children.push(blank());
  children.push(
    new Paragraph({
      alignment: AlignmentType.LEFT,
      spacing: { before: 200 },
      border: { top: { color: "CCCCCC", size: 4, style: "single", space: 4 } },
      children: [
        new TextRun({
          text:
            `Adapted by T. Valerie Onu's Sustainable Financing Mechanism for Nature-based Climate Solutions (NbCS), ` +
            `from Alex Osterwalder & Yves Pigneur's Business Model Canvas, Ingrid Burkett's Knode Social Enterprise ` +
            `Canvas (2010), and Wilson et al. (2009). Prepared for EFJ-J-USE, in partnership with funding support ` +
            `from Canada under the by the SFM Specialist Engagement led by Audrey Richards (Edge Catalyst Finance).`,
          size: 16,
          color: C_MUTED,
          italics: true,
        }),
      ],
    }),
  );

  const doc = new Document({
    creator: "J-USE Pathway Engine",
    title: `${state.orgName || "Canvas"} — ${pw.shortLabel} Pathway`,
    description: "Knode-adapted dual-layer Business Model Canvas for the J-USE NbCS programme.",
    styles: {
      default: {
        document: {
          run: { font: "Calibri", size: 22 },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            size: { orientation: PageOrientation.PORTRAIT },
            margin: { top: 720, right: 720, bottom: 720, left: 720 },
          },
        },
        children,
      },
    ],
  });

  return Packer.toBlob(doc);
}

export async function downloadCanvasDocx(state: EngineState): Promise<void> {
  const blob = await buildCanvasDocx(state);
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const safeName = (state.orgName || "Canvas").replace(/[^a-z0-9-_]+/gi, "-").replace(/^-+|-+$/g, "");
  const safeRef = (state.refNumber || "no-ref").replace(/[^a-z0-9-_]+/gi, "-").replace(/^-+|-+$/g, "");
  a.href = url;
  a.download = `JUSE-Canvas-${safeName}-${safeRef}.docx`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
