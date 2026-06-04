import { findPathway } from "@/data/pathways";
import { evalTestsForState } from "@/lib/sustainability";
import { fmtJMD, fmtPct, parseNum } from "@/lib/utils";
import type { EngineState } from "@/data/types";

// Portrait completion summary — the second PDF artefact.
// Mirrors the on-screen Stage 7 completion page in a printable format.
// Hidden on screen + when print-mode=canvas; visible only when
// document.body.classList contains 'print-mode-summary'.

export function PrintSummary({ state }: { state: EngineState }) {
  const pw = findPathway(state.pathway);
  if (!pw) return null;

  const tests = evalTestsForState(state);
  const allGreen = tests.t1 === "green" && tests.t2 === "green" && tests.t3 === "green";
  const overall: "PASS" | "FIXABLE" | "RETHINK" = allGreen
    ? "PASS"
    : tests.t1 === "red" || tests.t2 === "red" || tests.t3 === "red"
      ? "RETHINK"
      : "FIXABLE";

  const commitments = state.commitments.filter((c) => c.will.trim());

  return (
    <div className="print-summary">
      {/* Logo lockup */}
      <div className="ps-logo-band">
        <img src={`${import.meta.env.BASE_URL}logo-lockup.png`} alt="J-USE in partnership with Canada and EFJ" className="ps-logo-img" />
      </div>

      {/* Title */}
      <header className="ps-header">
        <div className="ps-eyebrow">Pathway Engine — Completion Summary</div>
        <h1 className="ps-title">{state.orgName || "Pathway Canvas"}</h1>
        {state.refNumber && <div className="ps-ref">Reference: {state.refNumber}</div>}
        <div className="ps-pathway">
          <span className="ps-emoji">{pw.emoji}</span>
          <span>{pw.fullName}</span>
        </div>
      </header>

      {/* Proof tiles */}
      <section className="ps-tiles">
        <div className="ps-tile">
          <div className="ps-tile-label">Pathway</div>
          <div className="ps-tile-value">{pw.shortLabel}</div>
        </div>
        <div className="ps-tile">
          <div className="ps-tile-label">Annual Inflows</div>
          <div className="ps-tile-value">{fmtJMD(tests.totalInflows)}</div>
        </div>
        <div className="ps-tile">
          <div className="ps-tile-label">Operations & Maintenance Coverage</div>
          <div className={`ps-tile-value ps-${tests.omCoverage >= 100 ? "green" : tests.omCoverage >= 80 ? "amber" : "red"}`}>
            {fmtPct(tests.omCoverage)}
          </div>
        </div>
        <div className="ps-tile">
          <div className="ps-tile-label">Sustainability Result</div>
          <div className={`ps-tile-value ps-${overall === "PASS" ? "green" : overall === "FIXABLE" ? "amber" : "red"}`}>
            {overall}
          </div>
        </div>
      </section>

      {/* Sustainability test detail */}
      <section className="ps-section">
        <h2 className="ps-h2">Sustainability Test Results</h2>
        <ul className="ps-tests">
          <li>
            <span className={`ps-light ps-${tests.t1}`} />
            <div>
              <strong>T1 — Operations and Maintenance (O&amp;M) covered by Month 12.</strong>{" "}
              Total annual inflows {fmtJMD(tests.totalInflows)} ÷ annual O&amp;M{" "}
              {fmtJMD(parseNum(state.omAnnualCost))} = {fmtPct(tests.omCoverage)}.
            </div>
          </li>
          <li>
            <span className={`ps-light ps-${tests.t2}`} />
            <div>
              <strong>T2 — Pathway anchor present ({pw.shortLabel}).</strong>{" "}
              {pw.id === "revenue"
                ? "Need ≥2 named offtakers in Key Partners."
                : pw.id === "blended"
                  ? "Need named Anchor Partner + signed Memorandum of Understanding (MoU) evidenced in Key Partners."
                  : "Need named Adopting Agency + named Stewarding Community body + MoU evidence in Key Partners."}
            </div>
          </li>
          <li>
            <span className={`ps-light ps-${tests.t3}`} />
            <div>
              <strong>T3 — Cumulative 3-year cashflow positive.</strong>{" "}
              3-year inflows {fmtJMD(tests.totalInflows * 3)} vs 3-year O&amp;M{" "}
              {fmtJMD(parseNum(state.omAnnualCost) * 3)}.
            </div>
          </li>
        </ul>
      </section>

      {/* Commitments */}
      <section className="ps-section">
        <h2 className="ps-h2">Commitments</h2>
        {commitments.length === 0 ? (
          <p className="ps-empty-section">No commitments recorded.</p>
        ) : (
          <ol className="ps-commitments">
            {commitments.map((c) => (
              <li key={c.i}>
                <div className="ps-commitment-will">
                  <strong>I will:</strong> {c.will}
                </div>
                {c.by && (
                  <div className="ps-commitment-by">
                    <strong>By:</strong> {c.by}
                  </div>
                )}
                {c.firstAction && (
                  <div className="ps-commitment-action">
                    <strong>First action:</strong> {c.firstAction}
                  </div>
                )}
              </li>
            ))}
          </ol>
        )}
      </section>

      {/* Reflection */}
      {state.reflection && state.reflection.trim() && (
        <section className="ps-section">
          <h2 className="ps-h2">Final Reflection</h2>
          <p className="ps-reflection">"{state.reflection}"</p>
        </section>
      )}

      {/* Before FTP submission */}
      <section className="ps-section">
        <h2 className="ps-h2">Before Full Technical Proposal Submission</h2>
        <ul className="ps-checklist">
          <li>
            ▸ Validate your Anchor Partner / Adopting Agency commitment in writing
            (Memorandum of Understanding or Letter of Intent)
          </li>
          <li>▸ Complete your Risk Register draft (Annex A of the Full Technical Proposal Schedule)</li>
          <li>▸ Re-read your Pathway Canvas — flag any block with one-word answers</li>
          <li>▸ Quantify your in-kind contributions at replacement cost</li>
          <li>▸ Revisit the worked example for your pathway and identify what makes it score-positive</li>
        </ul>
      </section>

      {/* Footer */}
      <footer className="ps-footer">
        Prepared by the Sustainable Financing Mechanism Team led by Audrey Richards (Edge Catalyst Finance LLP) for the Environmental Foundation of Jamaica
        · Generated {new Date().toLocaleDateString("en-JM")}
      </footer>
    </div>
  );
}
