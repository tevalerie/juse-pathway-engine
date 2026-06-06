import { CANVAS_BLOCKS } from "@/data/canvas";
import { findPathway } from "@/data/pathways";
import type { EngineState } from "@/data/types";

// Landscape TWO-PAGE Business Model Canvas formatter.
// Hidden on screen, visible only on print (controlled by @media print rules
// in index.css). Renders the dual-layer canvas across two pages:
//
//   ┌───────────────── PAGE 1 ─────────────────┐
//   │ Logo · Header · Subtitle                  │
//   │ ┌──────┬──────┬──────┬──────┬──────┐     │
//   │ │ KEY  │ KEY  │VALUE │CUST. │CUST. │     │
//   │ │PART. │ACTS  │PROP  │REL.  │SEGM. │     │
//   │ │      ├──────┤      ├──────┤      │     │
//   │ │      │ KEY  │      │CHANN.│      │     │
//   │ │      │RES.  │      │      │      │     │
//   │ └──────┴──────┴──────┴──────┴──────┘     │
//   └───────────────────────────────────────────┘
//
//   ┌───────────────── PAGE 2 ─────────────────┐
//   │ Small logo · "Financial Model" header     │
//   │ ┌──────────────┬─────────────────────┐    │
//   │ │ COST STRUC.  │ REVENUE / INFLOWS   │    │
//   │ │              │                     │    │
//   │ │              │                     │    │
//   │ └──────────────┴─────────────────────┘    │
//   │ Footer (credit + pathway · date)          │
//   └───────────────────────────────────────────┘
//
// Why two pages
// ─────────────
// Empty, the single-page layout looks great. Populated, the cell-level char
// counts vary 3× across worked examples (Cane Valley ~270, Hanover ~480, East
// Bay ~580 per cell). Page 2 gives Cost + Revenue a full landscape page each
// so the dollar figures + sustainability test verdict are properly legible.
// See useOverflowFit.ts for the auto-shrink that runs before print().

export function PrintCanvas({ state }: { state: EngineState }) {
  const pw = findPathway(state.pathway);
  if (!pw) return null;

  const blockMap = Object.fromEntries(CANVAS_BLOCKS.map((b) => [b.id, b]));
  const get = (id: string) =>
    state.canvas[id] || { topLayer: "", impact: "" };

  return (
    <div className="print-canvas">
      {/* ════════════════════════ PAGE 1 ════════════════════════ */}
      {/* Logo lockup banner */}
      <div className="pc-logo-band">
        <img src={`${import.meta.env.BASE_URL}logo-lockup.png`} alt="J-USE in partnership with Canada and EFJ" className="pc-logo-img" />
      </div>

      {/* Header */}
      <div className="pc-header">
        <div className="pc-header-left">
          <div className="pc-brand">J-USE Pathway Engine — NbCS Dual-Layer Business Model Canvas</div>
          <div className="pc-pathway">{pw.fullName}</div>
        </div>
        <div className="pc-header-right">
          {state.orgName && <div className="pc-org">{state.orgName}</div>}
          {state.refNumber && (
            <div className="pc-ref">Reference: {state.refNumber}</div>
          )}
        </div>
      </div>

      {/* Subtitle */}
      <div className="pc-subtitle">
        Adapted by the SFM Team for NbCS from Burkett's Knode Social Enterprise Business Model Canvas — {pw.topLayerName} ({pw.topLayerCode}) + Impact Value Proposition ({pw.impactLayerCode})
      </div>

      {/* Top row: 5 columns with internal splits */}
      <div className="pc-grid">
        {/* Column 1: Key Partners (full height) */}
        <Block
          id="key-partners"
          label={blockMap["key-partners"].label}
          rubricRef={blockMap["key-partners"].rubricRef}
          topLayer={pw.topLayerName}
          topLayerCode={pw.topLayerCode}
          topContent={get("key-partners").topLayer}
          impactContent={get("key-partners").impact}
        />

        {/* Column 2: Key Activities (top half) + Key Resources (bottom half) */}
        <div className="pc-col-stack">
          <Block
            id="key-activities"
            label={blockMap["key-activities"].label}
            rubricRef={blockMap["key-activities"].rubricRef}
            topLayer={pw.topLayerName}
            topLayerCode={pw.topLayerCode}
            topContent={get("key-activities").topLayer}
            impactContent={get("key-activities").impact}
            half
          />
          <Block
            id="key-resources"
            label={blockMap["key-resources"].label}
            rubricRef={blockMap["key-resources"].rubricRef}
            topLayer={pw.topLayerName}
            topLayerCode={pw.topLayerCode}
            topContent={get("key-resources").topLayer}
            impactContent={get("key-resources").impact}
            half
          />
        </div>

        {/* Column 3: Value Proposition (full height) */}
        <Block
          id="value-proposition"
          label={blockMap["value-proposition"].label}
          rubricRef={blockMap["value-proposition"].rubricRef}
          topLayer={pw.topLayerName}
          topLayerCode={pw.topLayerCode}
          topContent={get("value-proposition").topLayer}
          impactContent={get("value-proposition").impact}
          highlight
        />

        {/* Column 4: Customer Relationship (top) + Channels (bottom) */}
        <div className="pc-col-stack">
          <Block
            id="customer-stewardship"
            label="Customer / Stewardship Relationship"
            rubricRef={blockMap["customer-stewardship"].rubricRef}
            topLayer={pw.topLayerName}
            topLayerCode={pw.topLayerCode}
            topContent={get("customer-stewardship").topLayer}
            impactContent={get("customer-stewardship").impact}
            half
          />
          <Block
            id="channels"
            label={blockMap["channels"].label}
            rubricRef={blockMap["channels"].rubricRef}
            topLayer={pw.topLayerName}
            topLayerCode={pw.topLayerCode}
            topContent={get("channels").topLayer}
            impactContent={get("channels").impact}
            half
          />
        </div>

        {/* Column 5: Customer / Beneficiary Segment (full height) */}
        <Block
          id="customer-beneficiary"
          label="Customer / Beneficiary Segment"
          rubricRef={blockMap["customer-beneficiary"].rubricRef}
          topLayer={pw.topLayerName}
          topLayerCode={pw.topLayerCode}
          topContent={get("customer-beneficiary").topLayer}
          impactContent={get("customer-beneficiary").impact}
        />
      </div>

      {/* ════════════════════════ PAGE 2 ════════════════════════ */}
      {/* page-break triggered by .pc-page2-header (CSS rule) */}
      <div className="pc-page2-header">
        <div className="pc-logo-band pc-logo-band-compact">
          <img src={`${import.meta.env.BASE_URL}logo-lockup.png`} alt="J-USE in partnership with Canada and EFJ" className="pc-logo-img pc-logo-img-compact" />
        </div>
        <div className="pc-page2-title">Financial Model — Cost Structure &amp; Revenue Streams</div>
        <div className="pc-page2-subtitle">
          {state.orgName ? `${state.orgName} · ` : ""}
          {pw.fullName}
          {state.refNumber ? ` · Reference ${state.refNumber}` : ""}
          {" · Detail companion to the 9-block Canvas on page 1"}
        </div>
      </div>

      {/* Bottom row: Cost Structure | Revenue Streams */}
      <div className="pc-grid pc-bottom">
        <Block
          id="cost-structure"
          label={blockMap["cost-structure"].label}
          rubricRef={blockMap["cost-structure"].rubricRef}
          topLayer={pw.topLayerName}
          topLayerCode={pw.topLayerCode}
          topContent={get("cost-structure").topLayer}
          impactContent={get("cost-structure").impact}
          wide
        />
        <Block
          id="revenue-inflows"
          label={blockMap["revenue-inflows"].label}
          rubricRef={blockMap["revenue-inflows"].rubricRef}
          topLayer={pw.topLayerName}
          topLayerCode={pw.topLayerCode}
          topContent={get("revenue-inflows").topLayer}
          impactContent={get("revenue-inflows").impact}
          wide
        />
      </div>

      {/* Footer (sits at the bottom of page 2) */}
      <div className="pc-footer">
        <div>
          Adapted from Alex Osterwalder & Yves Pigneur's Business Model Canvas, Ingrid Burkett's
          Knode Social Enterprise Canvas (2010), and Wilson et al. (2009). Prepared by the
          Sustainable Financing Mechanism Team led by Audrey Richards (Edge Catalyst Finance LLP)
          for the Environmental Foundation of Jamaica.
        </div>
        <div className="pc-footer-right">
          {pw.shortLabel} pathway · Generated {new Date().toLocaleDateString("en-JM")}
        </div>
      </div>
    </div>
  );
}

function Block({
  id,
  label,
  rubricRef,
  topLayer,
  topLayerCode,
  topContent,
  impactContent,
  half,
  wide,
  highlight,
}: {
  id: string;
  label: string;
  rubricRef: string;
  topLayer: string;
  topLayerCode: string;
  topContent: string;
  impactContent: string;
  half?: boolean;
  wide?: boolean;
  highlight?: boolean;
}) {
  return (
    <div
      data-block-id={id}
      className={`pc-block ${half ? "pc-half" : ""} ${wide ? "pc-wide" : ""} ${highlight ? "pc-highlight" : ""}`}
    >
      <div className="pc-block-header">
        <div className="pc-block-label">{label}</div>
        <div className="pc-block-rubric">{rubricRef}</div>
      </div>
      <div className="pc-layer pc-top">
        <div className="pc-layer-label">{topLayer} ({topLayerCode})</div>
        <div className="pc-layer-content">{topContent || <span className="pc-empty">—</span>}</div>
      </div>
      <div className="pc-layer pc-impact">
        <div className="pc-layer-label">Impact Value Proposition (IVP)</div>
        <div className="pc-layer-content">{impactContent || <span className="pc-empty">—</span>}</div>
      </div>
    </div>
  );
}
