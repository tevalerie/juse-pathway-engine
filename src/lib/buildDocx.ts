// buildDocx — two .docx exports of the populated Canvas, for different uses.
//
// EDITABLE  (portrait, sequential) — for adaptation. One section per block in
//   Osterwalder reading order; applicants copy text into Full Technical
//   Proposal sections without fighting Word's table layout.
//
// VISUAL    (landscape, 5-column Knode grid) — visually mirrors the printed
//   PDF Canvas. Editable but more rigid: long text in one cell pushes the
//   whole row taller. Use when "looks like the printed Canvas" matters.
//
// The `docx` package builds Office Open XML client-side. Bundle ~200 kB,
// lazy-loaded from PathwayEngine.tsx so the initial page doesn't pay the cost.

import {
  AlignmentType,
  BorderStyle,
  Document,
  HeadingLevel,
  Packer,
  PageOrientation,
  Paragraph,
  ShadingType,
  Table,
  TableCell,
  TableRow,
  TextRun,
  VerticalAlign,
  WidthType,
} from "docx";
import { CANVAS_BLOCKS } from "@/data/canvas";
import { findPathway } from "@/data/pathways";
import type { EngineState } from "@/data/types";

// J-USE brand colours, hex without leading #
const C_GREEN = "009144";
const C_BLUE = "017FD5";
const C_CHARCOAL = "181616";
const C_MUTED = "666666";
const C_BLUE_SOFT = "EAF3FB";
const C_GREEN_SOFT = "E6F3EC";
const C_BORDER = "888888";
const C_HIGHLIGHT_BG = "F2FAF5";

// ═══ EDITABLE (portrait, sequential) ═══════════════════════════════════════

const SEQUENTIAL_ORDER = [
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

function h1(text: string) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 0, after: 80 },
    children: [new TextRun({ text, bold: true, size: 32, color: C_GREEN })],
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
    children: [new TextRun({ text: text.toUpperCase(), bold: true, size: 18, color, characterSpacing: 20 })],
  });
}

function body(text: string) {
  return new Paragraph({
    spacing: { after: 60 },
    children: [
      new TextRun({
        text: text || "—",
        size: 22,
        color: text ? C_CHARCOAL : C_MUTED,
        italics: !text,
      }),
    ],
  });
}

function blank() {
  return new Paragraph({ children: [], spacing: { after: 40 } });
}

export async function buildCanvasDocxEditable(state: EngineState): Promise<Blob> {
  const pw = findPathway(state.pathway);
  if (!pw) throw new Error("No pathway selected — cannot build Canvas .docx.");

  const blockMap = Object.fromEntries(CANVAS_BLOCKS.map((b) => [b.id, b]));
  const orderedBlocks = SEQUENTIAL_ORDER.map((id) => blockMap[id]).filter(Boolean);

  const children: Paragraph[] = [];

  children.push(h1("J-USE Pathway Engine — NbCS Dual-Layer Business Model Canvas"));
  children.push(
    new Paragraph({
      spacing: { after: 60 },
      children: [new TextRun({ text: `${pw.emoji} ${pw.fullName}`, bold: true, size: 24, color: C_BLUE })],
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

  for (const b of orderedBlocks) {
    const data = state.canvas[b.id] || { topLayer: "", impact: "" };
    children.push(h2(b.label, b.rubricRef));
    children.push(layerLabel(`${pw.topLayerName} (${pw.topLayerCode})`, C_BLUE));
    children.push(body(data.topLayer));
    children.push(layerLabel(`Impact Value Proposition (${pw.impactLayerCode})`, C_GREEN));
    children.push(body(data.impact));
    children.push(blank());
  }

  children.push(blank());
  children.push(footerParagraph());

  const doc = new Document({
    creator: "J-USE Pathway Engine",
    title: `${state.orgName || "Canvas"} — ${pw.shortLabel} Pathway (Editable)`,
    description: "Knode-adapted dual-layer Business Model Canvas — editable sequential format.",
    styles: { default: { document: { run: { font: "Calibri", size: 22 } } } },
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

// ═══ VISUAL (landscape, 5-column Knode grid) ═══════════════════════════════
//
// Layout — matches PrintCanvas.tsx + the static worked-example PDFs:
//
//   ┌──────────┬──────────┬──────────┬──────────┬──────────┐
//   │  KEY     │  KEY     │  VALUE   │ CUSTOMER │ CUSTOMER │
//   │ PARTNERS │ ACTIVITIES│  PROP   │  REL.    │  SEGMENT │
//   │ (rowSpan ├──────────┤ (rowSpan ├──────────┤ (rowSpan │
//   │   2)     │ KEY      │   2,     │ CHANNELS │   2)     │
//   │          │ RESOURCES│ highlight)│          │          │
//   └──────────┴──────────┴──────────┴──────────┴──────────┘
//   ┌────────────────────┬───────────────────────────────┐
//   │ COST STRUCTURE     │ REVENUE STREAMS / INFLOWS     │
//   │  (40%)             │  (60%)                        │
//   └────────────────────┴───────────────────────────────┘

function blockCell(opts: {
  label: string;
  rubric?: string;
  topLabel: string;
  topContent: string;
  impactLabel: string;
  impactContent: string;
  highlight?: boolean;
  rowSpan?: number;
}): TableCell {
  const { label, rubric, topLabel, topContent, impactLabel, impactContent, highlight, rowSpan } = opts;
  const borderColor = highlight ? C_GREEN : C_BORDER;
  const borderSize = highlight ? 12 : 6;
  const border = { style: BorderStyle.SINGLE, size: borderSize, color: borderColor };

  return new TableCell({
    rowSpan,
    margins: { top: 100, bottom: 100, left: 120, right: 120 },
    verticalAlign: VerticalAlign.TOP,
    shading: highlight
      ? { type: ShadingType.CLEAR, color: "auto", fill: C_HIGHLIGHT_BG }
      : undefined,
    borders: { top: border, bottom: border, left: border, right: border },
    children: [
      // Block header — label + rubric pill
      new Paragraph({
        spacing: { after: 80 },
        children: [
          new TextRun({ text: label.toUpperCase(), bold: true, size: 14, color: C_CHARCOAL, characterSpacing: 10 }),
          ...(rubric
            ? [new TextRun({ text: `  ${rubric}`, size: 10, color: C_BLUE, italics: true })]
            : []),
        ],
      }),
      // Top layer label
      new Paragraph({
        spacing: { after: 30 },
        shading: { type: ShadingType.CLEAR, color: "auto", fill: C_BLUE_SOFT },
        children: [
          new TextRun({ text: topLabel.toUpperCase(), bold: true, size: 11, color: C_BLUE, characterSpacing: 10 }),
        ],
      }),
      // Top layer content
      new Paragraph({
        spacing: { after: 120 },
        shading: { type: ShadingType.CLEAR, color: "auto", fill: C_BLUE_SOFT },
        children: [
          new TextRun({
            text: topContent || "—",
            size: 14,
            color: topContent ? C_CHARCOAL : C_MUTED,
            italics: !topContent,
          }),
        ],
      }),
      // Impact layer label
      new Paragraph({
        spacing: { after: 30 },
        shading: { type: ShadingType.CLEAR, color: "auto", fill: C_GREEN_SOFT },
        children: [
          new TextRun({ text: impactLabel.toUpperCase(), bold: true, size: 11, color: C_GREEN, characterSpacing: 10 }),
        ],
      }),
      // Impact layer content
      new Paragraph({
        shading: { type: ShadingType.CLEAR, color: "auto", fill: C_GREEN_SOFT },
        children: [
          new TextRun({
            text: impactContent || "—",
            size: 14,
            color: impactContent ? C_CHARCOAL : C_MUTED,
            italics: !impactContent,
          }),
        ],
      }),
    ],
  });
}

export async function buildCanvasDocxVisual(state: EngineState): Promise<Blob> {
  const pw = findPathway(state.pathway);
  if (!pw) throw new Error("No pathway selected — cannot build Canvas .docx.");

  const blockMap = Object.fromEntries(CANVAS_BLOCKS.map((b) => [b.id, b]));
  const get = (id: string) => state.canvas[id] || { topLayer: "", impact: "" };
  const TOP = `${pw.topLayerName} (${pw.topLayerCode})`;
  const IMPACT = `Impact Value Proposition (${pw.impactLayerCode})`;

  const make = (id: string, opts: { highlight?: boolean; rowSpan?: number } = {}) => {
    const b = blockMap[id];
    const d = get(id);
    return blockCell({
      label: b.label,
      rubric: b.rubricRef,
      topLabel: TOP,
      topContent: d.topLayer,
      impactLabel: IMPACT,
      impactContent: d.impact,
      ...opts,
    });
  };

  // Top table — 5 cols × 2 rows with row-spanned full-height columns
  const topTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    columnWidths: [3220, 3220, 3220, 3220, 3220], // equal landscape A4 5-col
    rows: [
      new TableRow({
        cantSplit: true,
        children: [
          make("key-partners", { rowSpan: 2 }),
          make("key-activities"),
          make("value-proposition", { rowSpan: 2, highlight: true }),
          make("customer-stewardship"),
          make("customer-beneficiary", { rowSpan: 2 }),
        ],
      }),
      new TableRow({
        cantSplit: true,
        children: [
          // KP rowSpan from row 1 — no cell here
          make("key-resources"),
          // VP rowSpan from row 1
          make("channels"),
          // CB rowSpan from row 1
        ],
      }),
    ],
  });

  // Bottom table — Cost (40%) + Revenue (60%)
  const bottomTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    columnWidths: [6440, 9660],
    rows: [
      new TableRow({
        cantSplit: true,
        children: [make("cost-structure"), make("revenue-inflows")],
      }),
    ],
  });

  const children: (Paragraph | Table)[] = [];

  // Header bar
  children.push(
    new Paragraph({
      spacing: { after: 60 },
      children: [
        new TextRun({
          text: "J-USE Pathway Engine — NbCS Dual-Layer Business Model Canvas",
          bold: true,
          size: 24,
          color: C_GREEN,
        }),
      ],
    }),
  );
  const headerRight = state.orgName ? `${state.orgName}${state.refNumber ? ` · ${state.refNumber}` : ""}` : "";
  children.push(
    new Paragraph({
      spacing: { after: 100 },
      children: [
        new TextRun({ text: `${pw.emoji} ${pw.fullName}`, bold: true, size: 18, color: C_BLUE }),
        ...(headerRight
          ? [new TextRun({ text: `   ·   ${headerRight}`, size: 16, color: C_CHARCOAL })]
          : []),
      ],
    }),
  );
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
          size: 14,
          color: C_BLUE,
        }),
      ],
    }),
  );

  children.push(topTable);
  children.push(new Paragraph({ spacing: { after: 80 }, children: [] }));
  children.push(bottomTable);
  children.push(new Paragraph({ spacing: { after: 80 }, children: [] }));
  children.push(footerParagraph(14));

  const doc = new Document({
    creator: "J-USE Pathway Engine",
    title: `${state.orgName || "Canvas"} — ${pw.shortLabel} Pathway (Visual)`,
    description: "Knode-adapted dual-layer Business Model Canvas — landscape visual format.",
    styles: { default: { document: { run: { font: "Calibri", size: 14 } } } },
    sections: [
      {
        properties: {
          page: {
            size: { orientation: PageOrientation.LANDSCAPE },
            margin: { top: 360, right: 360, bottom: 360, left: 360 },
          },
        },
        children,
      },
    ],
  });

  return Packer.toBlob(doc);
}

// ═══ Shared footer credit ══════════════════════════════════════════════════

function footerParagraph(size = 16) {
  return new Paragraph({
    alignment: AlignmentType.LEFT,
    spacing: { before: 200 },
    border: { top: { color: "CCCCCC", size: 4, style: BorderStyle.SINGLE, space: 4 } },
    children: [
      new TextRun({
        text:
          `Adapted by T. Valerie Onu's Sustainable Financing Mechanism for Nature-based Climate Solutions (NbCS), ` +
          `from Alex Osterwalder & Yves Pigneur's Business Model Canvas, Ingrid Burkett's Knode Social Enterprise ` +
          `Canvas (2010), and Wilson et al. (2009). Prepared for EFJ-J-USE, in partnership with funding support ` +
          `from Canada under the by the SFM Specialist Engagement led by Audrey Richards (Edge Catalyst Finance).`,
        size,
        color: C_MUTED,
        italics: true,
      }),
    ],
  });
}

// ═══ Download helpers ══════════════════════════════════════════════════════

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function safeFilenamePart(s: string, fallback: string): string {
  const cleaned = s.replace(/[^a-z0-9-_]+/gi, "-").replace(/^-+|-+$/g, "");
  return cleaned || fallback;
}

export async function downloadCanvasDocxEditable(state: EngineState): Promise<void> {
  const blob = await buildCanvasDocxEditable(state);
  const name = safeFilenamePart(state.orgName, "Canvas");
  const ref = safeFilenamePart(state.refNumber, "no-ref");
  triggerDownload(blob, `JUSE-Canvas-${name}-${ref}-Editable.docx`);
}

export async function downloadCanvasDocxVisual(state: EngineState): Promise<void> {
  const blob = await buildCanvasDocxVisual(state);
  const name = safeFilenamePart(state.orgName, "Canvas");
  const ref = safeFilenamePart(state.refNumber, "no-ref");
  triggerDownload(blob, `JUSE-Canvas-${name}-${ref}-Visual.docx`);
}
