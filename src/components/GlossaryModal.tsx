import { useState, useMemo } from "react";
import { BookOpen, X, Search } from "lucide-react";
import { GLOSSARY, GLOSSARY_CATEGORIES, type GlossaryEntry } from "@/data/glossary";
import { cn } from "@/lib/utils";

export function GlossaryButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-4 left-4 z-30 inline-flex items-center gap-2 rounded-full bg-[color:var(--juse-blue)] text-white px-4 py-2.5 text-sm font-semibold shadow-lg hover:opacity-90 transition-opacity print-hide"
      title="Open glossary"
    >
      <BookOpen className="size-4" />
      <span>Glossary</span>
    </button>
  );
}

export function GlossaryModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<GlossaryEntry["category"] | "all">("all");

  const filtered = useMemo(() => {
    const ql = q.trim().toLowerCase();
    return GLOSSARY.filter((g) => {
      if (cat !== "all" && g.category !== cat) return false;
      if (!ql) return true;
      return (
        g.term.toLowerCase().includes(ql) ||
        (g.short || "").toLowerCase().includes(ql) ||
        g.body.toLowerCase().includes(ql)
      );
    }).sort((a, b) => a.term.localeCompare(b.term));
  }, [q, cat]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 print-hide"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div className="flex items-center gap-2">
            <BookOpen className="size-5 text-[color:var(--juse-green)]" />
            <h2 className="text-xl font-bold">J-USE Pathway Engine — Glossary</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 hover:bg-secondary/60"
            aria-label="Close glossary"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Search + category filter */}
        <div className="p-5 border-b border-border space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search terms, acronyms, or definitions…"
              className="w-full pl-9 pr-3 py-2 rounded-md border border-input bg-white text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              autoFocus
            />
          </div>
          <div className="flex gap-1 flex-wrap">
            <CategoryChip label="All" active={cat === "all"} onClick={() => setCat("all")} />
            {GLOSSARY_CATEGORIES.map((c) => (
              <CategoryChip
                key={c.key}
                label={c.label}
                active={cat === c.key}
                onClick={() => setCat(c.key)}
              />
            ))}
          </div>
        </div>

        {/* Entries */}
        <div className="overflow-y-auto flex-1 p-5 space-y-4">
          {filtered.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-8">
              No entries match — try a different search term.
            </p>
          )}
          {filtered.map((g, i) => (
            <div key={i} className="border-b border-border/60 pb-4 last:border-0">
              <div className="flex items-baseline gap-2 flex-wrap">
                <h3 className="font-bold text-[color:var(--juse-green)]">{g.term}</h3>
                {g.short && (
                  <span className="rubric-ref">{g.short}</span>
                )}
                <span className="text-xs text-muted-foreground ml-auto">
                  {GLOSSARY_CATEGORIES.find((c) => c.key === g.category)?.label}
                </span>
              </div>
              <p className="text-sm text-foreground/85 mt-1.5 leading-relaxed">{g.body}</p>
              {g.altNames && g.altNames.length > 0 && (
                <div className="mt-3 rounded-md bg-[color:var(--juse-gold-soft)] border-l-4 border-[color:var(--juse-orange)] p-3">
                  <div className="text-xs font-semibold uppercase tracking-wide text-[color:var(--juse-charcoal)] mb-1.5">
                    Also called
                  </div>
                  <ul className="text-xs text-foreground/85 space-y-1">
                    {g.altNames.map((a, j) => (
                      <li key={j} className="flex gap-1.5">
                        <span className="text-[color:var(--juse-orange)] font-bold">▸</span>
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-border bg-[color:var(--juse-beige)]/60 text-xs text-muted-foreground text-center">
          {GLOSSARY.length} entries · Adapted from Burkett (Knode, 2010), Wilson et al. (2009), Osterwalder & Pigneur, and the J-USE SFM Reviewer Rubric
        </div>
      </div>
    </div>
  );
}

function CategoryChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "text-xs px-3 py-1.5 rounded-full font-medium transition-colors",
        active
          ? "bg-[color:var(--juse-green)] text-white"
          : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      )}
    >
      {label}
    </button>
  );
}
