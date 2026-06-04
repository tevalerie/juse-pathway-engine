import { ClipboardList, X } from "lucide-react";
import { RUBRIC, ELIGIBILITY_GATES, TIER_TABLE, RUBRIC_TOTAL, RUBRIC_BONUS } from "@/data/rubric";

export function RubricButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-4 left-36 z-30 inline-flex items-center gap-2 rounded-full bg-[color:var(--juse-orange)] text-white px-4 py-2.5 text-sm font-semibold shadow-lg hover:opacity-90 transition-opacity print-hide"
      title="Open FTP Rubric"
    >
      <ClipboardList className="size-4" />
      <span>FTP Rubric</span>
    </button>
  );
}

export function RubricModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 print-hide"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div>
            <div className="flex items-center gap-2">
              <ClipboardList className="size-5 text-[color:var(--juse-orange)]" />
              <h2 className="text-xl font-bold">Full Technical Proposal (FTP) Rubric</h2>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              J-USE Sustainable Financing Mechanism Reviewer Rubric · {RUBRIC_TOTAL} points + {RUBRIC_BONUS} bonus
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 hover:bg-secondary/60"
            aria-label="Close rubric"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 p-5 space-y-6">
          {/* Eligibility gates */}
          <section>
            <h3 className="font-bold text-[color:var(--juse-green)] uppercase tracking-wider text-sm mb-3">
              Stage 1 — Eligibility Gatekeeper (Binary, pass/fail)
            </h3>
            <p className="text-xs text-muted-foreground mb-3">
              All three gates must be CLEARED before the application advances to scoring. Failure on any gate = automatic rejection.
            </p>
            <div className="space-y-2">
              {ELIGIBILITY_GATES.map((g) => (
                <div key={g.code} className="rounded-md border border-border bg-[color:var(--juse-blue-soft)]/50 p-3">
                  <div className="flex items-baseline gap-2">
                    <span className="rubric-ref">{g.code}</span>
                    <span className="font-semibold text-sm">{g.label}</span>
                  </div>
                  <p className="text-xs text-foreground/80 mt-1.5 leading-relaxed">{g.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Scoring categories */}
          <section>
            <h3 className="font-bold text-[color:var(--juse-green)] uppercase tracking-wider text-sm mb-3">
              Stage 2 — Technical Merit Scoring ({RUBRIC_TOTAL} points + {RUBRIC_BONUS} bonus)
            </h3>
            {RUBRIC.map((cat) => (
              <div key={cat.code} className="mb-5 last:mb-0">
                <div className="flex items-baseline gap-3 mb-2 border-b-2 border-[color:var(--juse-green)]/30 pb-1.5">
                  <span className="font-bold text-[color:var(--juse-green)] text-base">
                    Category {cat.code}
                  </span>
                  <span className="font-semibold">{cat.label}</span>
                  <span className="text-xs text-muted-foreground ml-auto font-mono">
                    {cat.weight} pts ({cat.weight}%)
                  </span>
                </div>
                <div className="space-y-2">
                  {cat.subCriteria.map((sub) => (
                    <div key={sub.code} className="pl-3 border-l-2 border-[color:var(--juse-blue)]/30">
                      <div className="flex items-baseline gap-2">
                        <span className="rubric-ref">{sub.code}</span>
                        <span className="font-semibold text-sm">{sub.label}</span>
                        <span className="text-xs text-muted-foreground ml-auto font-mono">
                          {sub.code === "E5" ? "+" : ""}{sub.points} pts
                        </span>
                      </div>
                      <p className="text-xs text-foreground/80 mt-1 leading-relaxed">{sub.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>

          {/* Tier table */}
          <section>
            <h3 className="font-bold text-[color:var(--juse-green)] uppercase tracking-wider text-sm mb-3">
              Advancement Tiers
            </h3>
            <div className="overflow-hidden rounded-md border border-border">
              <table className="w-full text-xs">
                <thead className="bg-[color:var(--juse-green)] text-white">
                  <tr>
                    <th className="text-left p-2.5">Tier</th>
                    <th className="text-left p-2.5">Score</th>
                    <th className="text-left p-2.5">Classification</th>
                    <th className="text-left p-2.5">Decision</th>
                  </tr>
                </thead>
                <tbody>
                  {TIER_TABLE.map((t, i) => (
                    <tr key={t.tier} className={i % 2 ? "bg-[color:var(--juse-beige)]/40" : ""}>
                      <td className="p-2.5 font-mono font-bold">{t.tier}</td>
                      <td className="p-2.5 font-mono">{t.range}</td>
                      <td className="p-2.5 font-semibold">{t.label}</td>
                      <td className="p-2.5">{t.decision}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-border bg-[color:var(--juse-beige)]/60 text-xs text-muted-foreground text-center">
          Prepared by Sustainable Financing Mechanism Team led by Audrey Richards (Edge Catalyst Finance LLP) for the Environmental Foundation of Jamaica
        </div>
      </div>
    </div>
  );
}
