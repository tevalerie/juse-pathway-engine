import { CANVAS_BLOCKS } from "@/data/canvas";
import { findPathway } from "@/data/pathways";
import type { EngineState } from "@/data/types";

// Landscape one-page Business Model Canvas formatter.
// Hidden on screen, visible only on print (controlled by @media print rules
// in index.css). Renders the dual-layer canvas in a formal Osterwalder
// 9-block grid layout, populated from EngineState.
//
// Layout (landscape A4):
//   ┌──────────┬──────────┬──────────┬──────────┬──────────┐
//   │  KEY     │  KEY     │  VALUE   │ CUSTOMER │ CUSTOMER │
//   │ PARTNERS │ACTIVITIES│PROPOSITION│ RELATION │ SEGMENT  │
//   │          ├──────────┤          ├──────────┤          │
//   │          │   KEY    │          │ CHANNELS │          │
//   │          │RESOURCES │          │          │          │
//   ├──────────┴──────────┼──────────┴──────────┴──────────┤
//   │  COST STRUCTURE     │  REVENUE / INFLOWS             │
//   └─────────────────────┴────────────────────────────────┘

export function PrintCanvas({ state }: { state: EngineState }) {
  const pw = findPathway(state.pathway);
  if (!pw) return null;

  const blockMap = Object.fromEntries(CANVAS_BLOCKS.map((b) => [b.id, b]));
  const get = (id: string) =>
    state.canvas[id] || { topLayer: "", impact: "" };

  return (
    <div className="print-canvas">
      {/* Logo lockup banner */}
      <div className="pc-logo-band">
        <img src={`${import.meta.env.BASE_URL}logo-lockup.png`} alt="J-USE in partnership with Canada and EFJ" className="pc-logo-img" />
      </div>

      {/* Header */}
      <div className="pc-header">
        <div className="pc-header-left">
          <div className="pc-brand">J-USE Pathway Engine — Dual-Layer Business Model Canvas</div>
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
        Knode-adapted dual-layer Business Model Canvas — {pw.topLayerName} ({pw.topLayerCode}) + Impact ({pw.impactLayerCode})
      </div>

      {/* Top row: 5 columns with internal splits */}
      <div className="pc-grid">
        {/* Column 1: Key Partners (full height) */}
        <Block
          label={blockMap["key-partners"].label}
          rubricRef={blockMap["key-partners"].rubricRef}
          topLayer={pw.topLayerName}
          topLayerCode={pw.topLayerCode}
          topContent={get("key-partners").topLayer}
          impactContent={get("key-partners").impact}
          colSpan={1}
          rowSpan={2}
        />

        {/* Column 2: Key Activities (top half) + Key Resources (bottom half) */}
        <div className="pc-col-stack">
          <Block
            label={blockMap["key-activities"].label}
            rubricRef={blockMap["key-activities"].rubricRef}
            topLayer={pw.topLayerName}
            topLayerCode={pw.topLayerCode}
            topContent={get("key-activities").topLayer}
            impactContent={get("key-activities").impact}
            half
          />
          <Block
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
          label={blockMap["value-proposition"].label}
          rubricRef={blockMap["value-proposition"].rubricRef}
          topLayer={pw.topLayerName}
          topLayerCode={pw.topLayerCode}
          topContent={get("value-proposition").topLayer}
          impactContent={get("value-proposition").impact}
          colSpan={1}
          rowSpan={2}
          highlight
        />

        {/* Column 4: Customer Relationship (top) + Channels (bottom) */}
        <div className="pc-col-stack">
          <Block
            label="Customer / Stewardship Relationship"
            rubricRef={blockMap["customer-stewardship"].rubricRef}
            topLayer={pw.topLayerName}
            topLayerCode={pw.topLayerCode}
            topContent={get("customer-stewardship").topLayer}
            impactContent={get("customer-stewardship").impact}
            half
          />
          <Block
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
          label="Customer / Beneficiary Segment"
          rubricRef={blockMap["customer-beneficiary"].rubricRef}
          topLayer={pw.topLayerName}
          topLayerCode={pw.topLayerCode}
          topContent={get("customer-beneficiary").topLayer}
          impactContent={get("customer-beneficiary").impact}
          colSpan={1}
          rowSpan={2}
        />
      </div>

      {/* Bottom row: Cost Structure | Revenue Streams */}
      <div className="pc-grid pc-bottom">
        <Block
          label={blockMap["cost-structure"].label}
          rubricRef={blockMap["cost-structure"].rubricRef}
          topLayer={pw.topLayerName}
          topLayerCode={pw.topLayerCode}
          topContent={get("cost-structure").topLayer}
          impactContent={get("cost-structure").impact}
          wide
        />
        <Block
          label={blockMap["revenue-inflows"].label}
          rubricRef={blockMap["revenue-inflows"].rubricRef}
          topLayer={pw.topLayerName}
          topLayerCode={pw.topLayerCode}
          topContent={get("revenue-inflows").topLayer}
          impactContent={get("revenue-inflows").impact}
          wide
        />
      </div>

      {/* Footer */}
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
  label: string;
  rubricRef: string;
  topLayer: string;
  topLayerCode: string;
  topContent: string;
  impactContent: string;
  colSpan?: number;
  rowSpan?: number;
  half?: boolean;
  wide?: boolean;
  highlight?: boolean;
}) {
  return (
    <div
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
        <div className="pc-layer-label">Impact (IVP)</div>
        <div className="pc-layer-content">{impactContent || <span className="pc-empty">—</span>}</div>
      </div>
    </div>
  );
}
