// useOverflowFit — measure-then-shrink helper for the printed Canvas.
//
// Why this exists
// ───────────────
// The PrintCanvas grid is sized for the *empty* case. When a participant types
// long answers (the Hanover Coastal worked example tops 580 chars in a single
// Channels block), one or two cells will overflow their printed footprint.
// We saw this concretely in the Webinar 3 worked-example PDFs:
//
//   • Empty canvas → 1 perfect landscape page
//   • Cane Valley (concise) → fits at 7.5pt
//   • Hanover Coastal (verbose) → would clip Channels + KA-impact at 7.5pt
//   • East Bay (long Adoption prose) → would clip Value Prop + Cost Structure
//
// Strategy
// ────────
// Just before window.print() is called, walk every .pc-layer-content node,
// compare scrollHeight to clientHeight, and step the font-size down (7.5 →
// 7 → 6.5 → 6pt) on overflowing nodes only. Each step is applied inline so
// it survives Chrome's print snapshot. Nothing is changed on screen — the
// shrink runs in the off-screen print render only, and is cleaned up after.
//
// This is intentionally a *content-only* shrink. We don't touch block padding,
// borders, or grid track sizes — those are calibrated to look right empty,
// and they still look right with smaller content text.

const FONT_STEPS_PT = [7.5, 7, 6.5, 6] as const;
const PAGE2_FONT_STEPS_PT = [8.5, 8, 7.5, 7, 6.5] as const;
const PAGE2_CONTAINER_SELECTOR = ".pc-grid.pc-bottom";

type Snapshot = { el: HTMLElement; fontSize: string };

function isOverflowing(el: HTMLElement): boolean {
  // 1pt slack absorbs sub-pixel rounding without triggering a needless shrink
  return el.scrollHeight > el.clientHeight + 1;
}

function shrinkLayer(el: HTMLElement, steps: readonly number[]): void {
  for (const step of steps) {
    el.style.fontSize = `${step}pt`;
    el.style.lineHeight = step >= 8 ? "1.35" : step >= 7 ? "1.3" : "1.25";
    // Force a reflow so scrollHeight reflects the new size before we test
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    el.offsetHeight;
    if (!isOverflowing(el)) return;
  }
  // If we exhausted all steps and it still overflows, leave it at the
  // smallest tested size — the print snapshot will clip the tail rather
  // than spill onto an extra page (page-break-inside: avoid is set on
  // the parent block, and .pc-layer has overflow: hidden).
}

/**
 * Walks every .pc-layer-content inside `root`, shrinks any overflowing node,
 * and returns a snapshot you can pass to {@link restoreOverflowFit} after
 * the print dialog closes.
 *
 * Safe to call multiple times — each invocation re-reads computed font sizes.
 */
export function applyOverflowFit(root: HTMLElement | Document = document): Snapshot[] {
  const snapshots: Snapshot[] = [];

  // Find all printable Canvas roots (live + print artefact)
  const layers = root.querySelectorAll<HTMLElement>(".pc-layer-content");
  layers.forEach((el) => {
    snapshots.push({ el, fontSize: el.style.fontSize });

    // Page 2 (Cost + Revenue) gets the larger starting font budget — it has a
    // whole page to itself and only 2 blocks, so we begin at 8.5pt.
    const onPage2 = !!el.closest(PAGE2_CONTAINER_SELECTOR);
    const steps = onPage2 ? PAGE2_FONT_STEPS_PT : FONT_STEPS_PT;

    // Seed the starting size deterministically — the stylesheet might have
    // already inlined a previous shrink from an earlier print
    el.style.fontSize = `${steps[0]}pt`;
    el.style.lineHeight = steps[0] >= 8 ? "1.35" : "1.3";
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    el.offsetHeight;

    if (isOverflowing(el)) shrinkLayer(el, steps);
  });

  return snapshots;
}

/** Restore the inline font-size values captured by {@link applyOverflowFit}. */
export function restoreOverflowFit(snapshots: Snapshot[]): void {
  snapshots.forEach(({ el, fontSize }) => {
    el.style.fontSize = fontSize;
    el.style.lineHeight = "";
  });
}

/**
 * Quick overflow audit — returns block ids whose layer content is currently
 * overflowing the printed cell. Used by the Stage-7 review panel to warn the
 * applicant *before* they hit Download.
 */
export function findOverflowingBlocks(
  root: HTMLElement | Document = document,
): { blockId: string; layer: "topLayer" | "impact"; chars: number }[] {
  const out: { blockId: string; layer: "topLayer" | "impact"; chars: number }[] = [];
  const layers = root.querySelectorAll<HTMLElement>(".pc-layer-content");
  layers.forEach((el) => {
    if (!isOverflowing(el)) return;
    const block = el.closest<HTMLElement>("[data-block-id]");
    if (!block) return;
    const layerKind = el.closest(".pc-impact") ? "impact" : "topLayer";
    out.push({
      blockId: block.dataset.blockId || "",
      layer: layerKind,
      chars: (el.textContent || "").length,
    });
  });
  return out;
}
