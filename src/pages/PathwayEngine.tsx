import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Download,
  FileText,
  PencilLine,
  Share2,
  Sparkles,
  Leaf,
  AlertTriangle,
  RefreshCcw,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { cn, parseNum, fmtJMD, fmtPct } from "@/lib/utils";

import { PATHWAYS, findPathway } from "@/data/pathways";
import { CANVAS_BLOCKS, KNODE_TRAPS } from "@/data/canvas";
import { REVENUE_STREAMS, COMMITMENT_SUGGESTIONS } from "@/data/revenue-streams";
import { EMPTY_STATE, type EngineState, type PathwayId } from "@/data/types";

const STORAGE_KEY = "juse-pathway-engine-v1";

const STAGES = [
  { id: 1, label: "Welcome" },
  { id: 2, label: "Pathway" },
  { id: 3, label: "Canvas" },
  { id: 4, label: "Inflows" },
  { id: 5, label: "Sustainability" },
  { id: 6, label: "Commitments" },
  { id: 7, label: "Complete" },
];

// ─── Persistence ──────────────────────────────────────────────────────────────
function loadState(): EngineState {
  if (typeof window === "undefined") return EMPTY_STATE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_STATE;
    return { ...EMPTY_STATE, ...JSON.parse(raw) };
  } catch {
    return EMPTY_STATE;
  }
}
function saveState(s: EngineState) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  } catch {
    /* quota exceeded — silent fail */
  }
}

// ─── Sustainability test computation ──────────────────────────────────────────
type Light = "green" | "amber" | "red";
function evalTests(s: EngineState): { t1: Light; t2: Light; t3: Light; totalInflows: number; cash: number; inKind: number; omCoverage: number } {
  const omAnnual = parseNum(s.omAnnualCost);
  const streams = Object.values(s.revenue);
  let cash = 0;
  let inKind = 0;
  streams.forEach((r) => {
    const c = parseNum(r.cash);
    const k = parseNum(r.inKind);
    // normalise to annual
    let mult = 1;
    if (r.freq === "monthly") mult = 12;
    else if (r.freq === "one-off") mult = 1 / 3; // amortise over 3 years
    cash += c * mult;
    inKind += k * mult;
  });
  const totalInflows = cash + inKind;
  const omCoverage = omAnnual > 0 ? (totalInflows / omAnnual) * 100 : 0;

  // T1: O&M coverage
  let t1: Light = "red";
  if (omCoverage >= 100) t1 = "green";
  else if (omCoverage >= 80) t1 = "amber";

  // T2: Pathway-specific anchor presence — look for keywords in canvas
  let t2: Light = "red";
  if (s.pathway) {
    const partners = (s.canvas["key-partners"]?.topLayer || "").toLowerCase();
    if (s.pathway === "revenue") {
      // Need ≥2 named offtakers — heuristic: at least one comma or two "+"
      const namedCount = partners.split(/[,;+]/).filter((p) => p.trim().length > 4).length;
      t2 = namedCount >= 2 ? "green" : namedCount >= 1 ? "amber" : "red";
    }
    if (s.pathway === "blended") {
      const hasStar = partners.includes("★") || partners.includes("anchor");
      const hasMou = /mou|loi|signed|commitment letter/i.test(partners);
      t2 = hasStar && hasMou ? "green" : hasStar ? "amber" : "red";
    }
    if (s.pathway === "public") {
      const hasAdopting = /adopting|kasamc|parish council|nepa|nwa|rada|ministry|municipal|agency/i.test(partners);
      const hasStewarding = /steward|community trust|cbo|cooperative|association|community body/i.test(partners);
      const hasMou = /mou|loi|signed|commitment letter/i.test(partners);
      const has2 = hasAdopting && hasStewarding;
      t2 = has2 && hasMou ? "green" : has2 ? "amber" : "red";
    }
  }

  // T3: Cumulative 3-yr cashflow positive
  const cumulativeNet = totalInflows * 3 - omAnnual * 3;
  let t3: Light = "red";
  if (cumulativeNet > 0 && totalInflows >= omAnnual) t3 = "green";
  else if (cumulativeNet > -omAnnual) t3 = "amber";

  return { t1, t2, t3, totalInflows, cash, inKind, omCoverage };
}

// ─── Top progress stepper ─────────────────────────────────────────────────────
function ProgressStepper({ stage, onJump }: { stage: number; onJump: (n: number) => void }) {
  return (
    <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-3">
        <div className="flex items-center justify-between gap-1 overflow-x-auto">
          {STAGES.map((s, idx) => {
            const status = stage === s.id ? "active" : stage > s.id ? "completed" : "idle";
            return (
              <div key={s.id} className="flex items-center gap-1 whitespace-nowrap">
                <button
                  onClick={() => stage > s.id && onJump(s.id)}
                  className={cn(
                    "step-dot flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
                    status,
                  )}
                  disabled={stage <= s.id}
                  aria-label={`Jump to ${s.label}`}
                >
                  {status === "completed" ? (
                    <CheckCircle2 className="size-3.5" />
                  ) : (
                    <span className="inline-flex size-4 items-center justify-center rounded-full bg-white/30 text-[10px] font-bold">
                      {s.id}
                    </span>
                  )}
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
                {idx < STAGES.length - 1 && <span className="text-muted-foreground">—</span>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SavedPill() {
  return (
    <div className="fixed bottom-4 right-4 z-30 flex items-center gap-1.5 rounded-full bg-white/95 border border-border px-3 py-1.5 text-xs text-muted-foreground shadow-sm">
      <CheckCircle2 className="size-3.5 text-[color:var(--juse-green)]" />
      <span>Saved</span>
    </div>
  );
}

// ─── Knode trap callout ───────────────────────────────────────────────────────
function KnodeTrapCallout({ title, body }: { title: string; body: string }) {
  return (
    <div className="knode-trap fade-up flex gap-3">
      <AlertTriangle className="size-5 shrink-0 text-[color:var(--juse-orange)] mt-0.5" />
      <div>
        <div className="font-semibold text-sm">{title}</div>
        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{body}</p>
      </div>
    </div>
  );
}

// ─── Rubric ref pill ──────────────────────────────────────────────────────────
function RubricRef({ refTxt, note }: { refTxt: string; note: string }) {
  return (
    <span className="rubric-ref" title={note}>
      {refTxt}
    </span>
  );
}

// ─── Stage 1: Welcome ─────────────────────────────────────────────────────────
function Stage1Welcome({ state, set, next }: { state: EngineState; set: (u: Partial<EngineState>) => void; next: () => void }) {
  const ready = state.orgName.trim().length >= 2;
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 fade-up">
      <div className="juse-hero rounded-2xl p-8 md:p-12 shadow-xl">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider opacity-80">
          <Leaf className="size-4" /> J-USE Pathway Engine
        </div>
        <h1 className="text-3xl md:text-5xl font-bold mt-3 leading-tight">
          Design your sustainable financing pathway for Nature-Based Climate Solutions.
        </h1>
        <p className="mt-4 text-base md:text-lg opacity-90 leading-relaxed">
          In the next 30 minutes you'll pick your pathway, build a dual-layer canvas (commercial value + impact value),
          map your revenue and sustainability inflows, and pass a 3-test sustainability check. There are no wrong
          answers — only blind spots.
        </p>
      </div>

      <Card className="mt-6">
        <CardContent className="space-y-4 pt-6">
          <div>
            <Label htmlFor="orgName">Your organisation name</Label>
            <Input
              id="orgName"
              value={state.orgName}
              onChange={(e) => set({ orgName: e.target.value })}
              placeholder="e.g. Eggpress Farms Ltd"
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="refNumber">EOI reference number (if you have one)</Label>
            <Input
              id="refNumber"
              value={state.refNumber}
              onChange={(e) => set({ refNumber: e.target.value })}
              placeholder="e.g. JUSE-2026-000049"
              className="mt-2 font-mono"
            />
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 rounded-xl border border-border bg-white p-5 text-sm text-muted-foreground leading-relaxed">
        <strong className="text-foreground">About this canvas:</strong> This module adapts the Knode Social Enterprise
        Business Model Canvas (Burkett, 2010) — itself an adaptation of Osterwalder &amp; Pigneur — refined for NbCS
        with reference to Wilson et al. (2009) on business models for sustainable development. Every block tracks both
        commercial and impact value.
      </div>

      <div className="mt-8 flex justify-end">
        <Button size="lg" variant="accent" disabled={!ready} onClick={next}>
          Start Pathway Engine <ArrowRight />
        </Button>
      </div>
    </div>
  );
}

// ─── Stage 2: Pathway Choice ──────────────────────────────────────────────────
function Stage2Pathway({ state, set, next, back }: { state: EngineState; set: (u: Partial<EngineState>) => void; next: () => void; back: () => void }) {
  const { q1, q2, q3 } = state.diagnostic;
  const recommendation = useMemo<PathwayId | "not-ready" | null>(() => {
    if (q1 === true && q2 === false) return "revenue";
    if (q1 === true && q2 === true) return "blended";
    if (q1 === false && q3 === true) return "public";
    if (q1 === false && q3 === false) return "not-ready";
    return null;
  }, [q1, q2, q3]);

  const pick = (p: PathwayId) => set({ pathway: p });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 fade-up">
      <header className="mb-6">
        <button onClick={back} className="text-sm text-[color:var(--juse-orange)] hover:underline inline-flex items-center gap-1 mb-2">
          <ArrowLeft className="size-4" /> Back
        </button>
        <p className="text-xs uppercase tracking-wider text-[color:var(--juse-teal)] font-semibold">Stage 2 of 7</p>
        <h2 className="text-3xl md:text-4xl font-bold mt-1">Choose your pathway</h2>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          Three Value Proposition pathways. Pick the one that matches the financial reality of your NbCS — or take the
          3-question diagnostic if you're not sure.
        </p>
      </header>

      {/* Diagnostic */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="size-5 text-[color:var(--juse-orange)]" />
            <h3 className="font-semibold">3-question pathway diagnostic</h3>
          </div>
          <div className="space-y-3 text-sm">
            <DiagnosticQ
              q="Will paying customers buy what your NbCS produces?"
              v={q1}
              onChange={(v) => set({ diagnostic: { ...state.diagnostic, q1: v } })}
            />
            <DiagnosticQ
              q="Do you have (or can you secure) an Anchor Partner — public agency / corporate / foundation — to co-fund the public-good portion?"
              v={q2}
              onChange={(v) => set({ diagnostic: { ...state.diagnostic, q2: v } })}
            />
            <DiagnosticQ
              q="Do you have (or can you secure) a written commitment from a public agency to adopt the NbCS into their budget line post-grant?"
              v={q3}
              onChange={(v) => set({ diagnostic: { ...state.diagnostic, q3: v } })}
            />
          </div>
          {recommendation && recommendation !== "not-ready" && (
            <div className="mt-5 rounded-md bg-[color:var(--juse-teal)]/10 border border-[color:var(--juse-teal)]/30 p-3 text-sm">
              <strong>Recommended pathway: </strong>
              <span className="font-semibold text-[color:var(--juse-navy)]">{findPathway(recommendation)?.fullName}</span>{" "}
              — but you can override below if your context differs.
            </div>
          )}
          {recommendation === "not-ready" && (
            <KnodeTrapCallout
              title="⚠ Pathway not ready"
              body="Without paying customers OR an anchor partner OR an adopting agency, your post-grant sustainability has no path. Revisit your sustainability plan or talk to a mentor before continuing."
            />
          )}
        </CardContent>
      </Card>

      {/* Pathway cards */}
      <div className="grid md:grid-cols-3 gap-4">
        {PATHWAYS.map((p) => {
          const selected = state.pathway === p.id;
          return (
            <div
              key={p.id}
              onClick={() => pick(p.id)}
              className={cn("pathway-card p-6", selected && "selected")}
              role="button"
            >
              <div className="text-4xl mb-3">{p.emoji}</div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[color:var(--juse-teal)]">{p.shortLabel}</div>
              <div className="text-xl font-bold mt-1 leading-snug">"{p.tagline}"</div>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{p.paragraph}</p>
              {selected && (
                <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[color:var(--juse-navy)]">
                  <CheckCircle2 className="size-4" /> Selected
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex justify-between">
        <Button variant="ghost" onClick={back}><ArrowLeft /> Back</Button>
        <Button size="lg" variant="accent" disabled={!state.pathway} onClick={next}>
          Continue to Canvas <ArrowRight />
        </Button>
      </div>
    </div>
  );
}

function DiagnosticQ({ q, v, onChange }: { q: string; v: boolean | undefined; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-start gap-4">
      <p className="flex-1">{q}</p>
      <div className="flex gap-1 shrink-0">
        <Button size="sm" variant={v === true ? "default" : "outline"} onClick={() => onChange(true)}>Yes</Button>
        <Button size="sm" variant={v === false ? "default" : "outline"} onClick={() => onChange(false)}>No</Button>
      </div>
    </div>
  );
}

// ─── Stage 3: Canvas ──────────────────────────────────────────────────────────
function Stage3Canvas({ state, set, next, back }: { state: EngineState; set: (u: Partial<EngineState>) => void; next: () => void; back: () => void }) {
  const pw = findPathway(state.pathway)!;
  const filledCount = CANVAS_BLOCKS.filter(
    (b) => (state.canvas[b.id]?.topLayer || "").trim().length > 5 && (state.canvas[b.id]?.impact || "").trim().length > 5,
  ).length;
  const progress = (filledCount / CANVAS_BLOCKS.length) * 100;

  const traps = useMemo(
    () => KNODE_TRAPS.filter((t) => t.pathways.includes(pw.id)).slice(0, 3),
    [pw.id],
  );

  const updateBlock = (id: string, layer: "topLayer" | "impact", val: string) => {
    set({ canvas: { ...state.canvas, [id]: { ...(state.canvas[id] || { topLayer: "", impact: "" }), [layer]: val } } });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 fade-up">
      <header className="mb-6">
        <button onClick={back} className="text-sm text-[color:var(--juse-orange)] hover:underline inline-flex items-center gap-1 mb-2">
          <ArrowLeft className="size-4" /> Back
        </button>
        <p className="text-xs uppercase tracking-wider text-[color:var(--juse-teal)] font-semibold">Stage 3 of 7 — Pathway: {pw.fullName}</p>
        <h2 className="text-3xl md:text-4xl font-bold mt-1">
          {state.orgName || "Your"} {pw.shortLabel} Canvas
        </h2>
        <p className="text-muted-foreground mt-2 max-w-3xl">
          9 blocks, two layers each — the {pw.topLayerName} layer ({pw.topLayerCode}) and the Impact layer ({pw.impactLayerCode}).
          Every block tracks both the financial reality and the climate + community value. Adapted from Burkett's Knode
          canvas + Wilson et al. (2009).
        </p>
        <div className="mt-5 flex items-center gap-4">
          <Progress value={progress} className="flex-1 max-w-md" />
          <span className="text-sm font-semibold whitespace-nowrap">{filledCount}/{CANVAS_BLOCKS.length} blocks filled</span>
        </div>
      </header>

      {/* Knode traps for this pathway */}
      {traps.length > 0 && (
        <div className="mb-6 grid md:grid-cols-3 gap-3">
          {traps.map((t) => (
            <KnodeTrapCallout key={t.id} title={t.title} body={t.body} />
          ))}
        </div>
      )}

      {/* 9 canvas blocks */}
      <div className="space-y-5">
        {CANVAS_BLOCKS.map((b, idx) => {
          const data = state.canvas[b.id] || { topLayer: "", impact: "" };
          const prompts = b.prompts[pw.id];
          const filled = data.topLayer.length > 5 && data.impact.length > 5;
          return (
            <Card key={b.id} className={cn("canvas-block", filled && "complete")}>
              <CardContent className="pt-5 pb-5">
                <div className="flex items-start gap-3 mb-4">
                  <div className="inline-flex size-8 items-center justify-center rounded-full bg-[color:var(--juse-green)] text-white text-sm font-bold">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-bold">{b.label}</h3>
                      <RubricRef refTxt={b.rubricRef} note={b.rubricNote} />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* Top layer */}
                  <div className="rounded-lg border-2 border-[color:var(--juse-navy)]/20 bg-[color:var(--juse-navy)]/[0.03] p-4">
                    <Label className="text-[color:var(--juse-navy)]">{pw.topLayerName} ({pw.topLayerCode})</Label>
                    <p className="text-sm font-medium mt-1.5">{prompts.topLayer.question}</p>
                    <ul className="text-xs text-muted-foreground mt-2 space-y-0.5">
                      {prompts.topLayer.bullets.map((bl, i) => (
                        <li key={i} className="flex gap-1.5">
                          <span className="text-[color:var(--juse-orange)] font-bold">▸</span>
                          <span>{bl}</span>
                        </li>
                      ))}
                    </ul>
                    <Textarea
                      value={data.topLayer}
                      onChange={(e) => updateBlock(b.id, "topLayer", e.target.value)}
                      placeholder={prompts.topLayer.placeholder}
                      className="mt-3 min-h-[100px]"
                    />
                  </div>

                  {/* Impact layer */}
                  <div className="rounded-lg border-2 border-[color:var(--juse-green)]/30 bg-[color:var(--juse-green)]/[0.03] p-4">
                    <Label className="text-[color:var(--juse-green)]">Impact ({pw.impactLayerCode})</Label>
                    <p className="text-sm font-medium mt-1.5">{prompts.impact.question}</p>
                    <ul className="text-xs text-muted-foreground mt-2 space-y-0.5">
                      {prompts.impact.bullets.map((bl, i) => (
                        <li key={i} className="flex gap-1.5">
                          <span className="text-[color:var(--juse-orange)] font-bold">▸</span>
                          <span>{bl}</span>
                        </li>
                      ))}
                    </ul>
                    <Textarea
                      value={data.impact}
                      onChange={(e) => updateBlock(b.id, "impact", e.target.value)}
                      placeholder={prompts.impact.placeholder}
                      className="mt-3 min-h-[100px]"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-8 flex justify-between">
        <Button variant="ghost" onClick={back}><ArrowLeft /> Back</Button>
        <Button size="lg" variant="accent" onClick={next}>Continue to Inflows <ArrowRight /></Button>
      </div>
    </div>
  );
}

// ─── Stage 4: Revenue / Inflows ───────────────────────────────────────────────
function Stage4Inflows({ state, set, next, back }: { state: EngineState; set: (u: Partial<EngineState>) => void; next: () => void; back: () => void }) {
  const pw = findPathway(state.pathway)!;
  const tests = evalTests(state);

  const updateStream = (id: string, patch: Partial<EngineState["revenue"][string]>) => {
    const cur = state.revenue[id] || { source: "", cash: "", inKind: "", freq: "annual" as const, confidence: "med" as const };
    set({ revenue: { ...state.revenue, [id]: { ...cur, ...patch } } });
  };

  const visibleStreams = REVENUE_STREAMS.filter((s) => s.applicability[pw.id] !== "hidden");

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 fade-up">
      <header className="mb-6">
        <button onClick={back} className="text-sm text-[color:var(--juse-orange)] hover:underline inline-flex items-center gap-1 mb-2">
          <ArrowLeft className="size-4" /> Back
        </button>
        <p className="text-xs uppercase tracking-wider text-[color:var(--juse-teal)] font-semibold">Stage 4 of 7 — {pw.fullName}</p>
        <h2 className="text-3xl md:text-4xl font-bold mt-1">
          {pw.id === "public" ? "Sustainability Inflows" : "Revenue / Inflows Model"}
        </h2>
        <p className="text-muted-foreground mt-2 max-w-3xl">
          List every inflow that funds your NbCS — both cash and in-kind. Mandatory rows are required to pass the
          sustainability test in Stage 5.
        </p>
      </header>

      {/* Live KPI tiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <KpiTile label={pw.id === "public" ? "Annual Inflows" : "Annual Revenue"} value={fmtJMD(tests.totalInflows)} />
        <KpiTile label="Cash" value={fmtJMD(tests.cash)} />
        <KpiTile label="In-Kind" value={fmtJMD(tests.inKind)} />
        <KpiTile label="O&M Coverage" value={fmtPct(tests.omCoverage)} accent={tests.omCoverage >= 100 ? "green" : tests.omCoverage >= 80 ? "amber" : "red"} />
      </div>

      {/* Formula callout */}
      <div className="knode-trap mb-6">
        <div className="text-xs uppercase tracking-wider text-[color:var(--juse-teal)] font-semibold">How O&M Coverage % is calculated</div>
        <p className="text-sm mt-1 font-mono">
          O&M Coverage = (Total Annual Inflows ÷ Total Annual O&amp;M Cost) × 100
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Target: ≥100% by month 12 of operations. Below 80% = grant-exit risk.
        </p>
      </div>

      {/* O&M cost input */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <Label htmlFor="omCost">Total annual O&amp;M cost (JMD)</Label>
          <p className="text-xs text-muted-foreground mt-1">From your Canvas Block 8 — Cost Structure. Sum of all annual operating + maintenance costs.</p>
          <Input
            id="omCost"
            type="text"
            inputMode="numeric"
            value={state.omAnnualCost}
            onChange={(e) => set({ omAnnualCost: e.target.value })}
            placeholder="e.g. 4,200,000"
            className="mt-2 max-w-xs font-mono text-lg"
          />
        </CardContent>
      </Card>

      {/* Streams */}
      <div className="space-y-3">
        {visibleStreams.map((s) => {
          const app = s.applicability[pw.id];
          const cur = state.revenue[s.id] || { source: "", cash: "", inKind: "", freq: "annual" as const, confidence: "med" as const };
          return (
            <Card key={s.id} className={cn(app === "mandatory" && "border-[color:var(--juse-orange)]/40")}>
              <CardContent className="pt-5">
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="font-semibold text-sm">{s.label}</h3>
                  {app === "mandatory" && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[color:var(--juse-orange)] text-white">Mandatory</span>
                  )}
                  {app === "optional" && (
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">Optional</span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mb-3">{s.hint}</p>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  <div className="col-span-2 md:col-span-2">
                    <Label className="text-[10px]">Source name</Label>
                    <Input value={cur.source} onChange={(e) => updateStream(s.id, { source: e.target.value })} placeholder="Named source" className="mt-1" />
                  </div>
                  {s.type !== "in-kind" && (
                    <div>
                      <Label className="text-[10px]">Cash (JMD)</Label>
                      <Input
                        value={cur.cash}
                        onChange={(e) => updateStream(s.id, { cash: e.target.value })}
                        placeholder="0"
                        className="mt-1 font-mono"
                        inputMode="numeric"
                      />
                    </div>
                  )}
                  {s.type !== "cash" && (
                    <div>
                      <Label className="text-[10px]">In-Kind (JMD)</Label>
                      <Input
                        value={cur.inKind}
                        onChange={(e) => updateStream(s.id, { inKind: e.target.value })}
                        placeholder="0"
                        className="mt-1 font-mono"
                        inputMode="numeric"
                      />
                    </div>
                  )}
                  <div>
                    <Label className="text-[10px]">Frequency</Label>
                    <select
                      value={cur.freq}
                      onChange={(e) => updateStream(s.id, { freq: e.target.value as "annual" | "monthly" | "one-off" })}
                      className="mt-1 h-10 w-full rounded-md border border-input bg-white px-2 text-sm"
                    >
                      <option value="annual">Annual</option>
                      <option value="monthly">Monthly</option>
                      <option value="one-off">One-off</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-8 flex justify-between">
        <Button variant="ghost" onClick={back}><ArrowLeft /> Back</Button>
        <Button size="lg" variant="accent" onClick={next}>Run Sustainability Test <ArrowRight /></Button>
      </div>
    </div>
  );
}

function KpiTile({ label, value, accent }: { label: string; value: string; accent?: "green" | "amber" | "red" }) {
  const colour =
    accent === "green" ? "text-[color:var(--juse-green)]"
    : accent === "amber" ? "text-[#D9A227]"
    : accent === "red" ? "text-destructive"
    : "";
  return (
    <div className="kpi-tile">
      <div className="kpi-tile-label">{label}</div>
      <div className={cn("kpi-tile-value", colour)}>{value}</div>
    </div>
  );
}

// ─── Stage 5: Sustainability Test ─────────────────────────────────────────────
function Stage5Sustainability({ state, next, back }: { state: EngineState; next: () => void; back: () => void }) {
  const tests = evalTests(state);
  const pw = findPathway(state.pathway)!;
  const allGreen = tests.t1 === "green" && tests.t2 === "green" && tests.t3 === "green";
  const anyRed = tests.t1 === "red" || tests.t2 === "red" || tests.t3 === "red";

  const overall: "PASS" | "FIXABLE" | "RETHINK" = allGreen ? "PASS" : anyRed ? "RETHINK" : "FIXABLE";
  const overallColour =
    overall === "PASS" ? "bg-[color:var(--juse-green)]"
    : overall === "FIXABLE" ? "bg-[#D9A227]"
    : "bg-destructive";

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 fade-up">
      <header className="mb-6">
        <button onClick={back} className="text-sm text-[color:var(--juse-orange)] hover:underline inline-flex items-center gap-1 mb-2">
          <ArrowLeft className="size-4" /> Back
        </button>
        <p className="text-xs uppercase tracking-wider text-[color:var(--juse-teal)] font-semibold">Stage 5 of 7</p>
        <h2 className="text-3xl md:text-4xl font-bold mt-1">Sustainability Test</h2>
        <p className="text-muted-foreground mt-2">
          Three independent tests. All-green is a PASS. Any amber is FIXABLE. Any red means RETHINK.
        </p>
      </header>

      <div className={cn("rounded-2xl text-white p-6 mb-6 shadow-lg", overallColour)}>
        <div className="text-xs uppercase tracking-widest opacity-90">Overall result</div>
        <div className="text-4xl font-bold mt-1">{overall}</div>
      </div>

      <div className="space-y-4">
        <TestCard
          name="T1 — O&M covered by month 12"
          light={tests.t1}
          detail={`Total annual inflows ${fmtJMD(tests.totalInflows)} ÷ annual O&M ${fmtJMD(parseNum(state.omAnnualCost))} = ${fmtPct(tests.omCoverage)}`}
          fix="Add a programmed grant follow-on, scale up the in-kind contribution, or revisit Block 8 (Cost Structure) to reduce O&M."
        />
        <TestCard
          name={`T2 — Pathway anchor present (${pw.shortLabel})`}
          light={tests.t2}
          detail={
            pw.id === "revenue"
              ? "Need ≥2 named offtakers in Canvas Block 1 (Key Partners)."
              : pw.id === "blended"
              ? "Need named anchor partner + signed MoU evidenced in Canvas Block 1."
              : "Need named adopting agency + named stewarding community + MoU evidence in Canvas Block 1."
          }
          fix="Return to Stage 3 Canvas Block 1 — Key Partners. Add the specific name + MoU status."
        />
        <TestCard
          name="T3 — Cumulative 3-year cashflow positive"
          light={tests.t3}
          detail={`3-year sum: inflows ${fmtJMD(tests.totalInflows * 3)} vs O&M ${fmtJMD(parseNum(state.omAnnualCost) * 3)}.`}
          fix="Either grow the inflows or reduce O&M. Most rapid lever: confirm a multi-year agency / anchor / grant commitment in writing."
        />
      </div>

      <div className="mt-8 flex justify-between">
        <Button variant="ghost" onClick={back}><ArrowLeft /> Back</Button>
        <Button size="lg" variant="accent" onClick={next}>Continue to Commitments <ArrowRight /></Button>
      </div>
    </div>
  );
}

function TestCard({ name, light, detail, fix }: { name: string; light: Light; detail: string; fix: string }) {
  return (
    <Card>
      <CardContent className="pt-5">
        <div className="flex items-start gap-3">
          <span className={cn("traffic-light mt-1", light)} />
          <div className="flex-1">
            <h3 className="font-bold">{name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{detail}</p>
            {light !== "green" && (
              <p className="text-sm mt-3 rounded-md bg-[color:var(--juse-orange)]/10 border border-[color:var(--juse-orange)]/30 p-2.5">
                <strong>Fix:</strong> {fix}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Stage 6: Commitments ─────────────────────────────────────────────────────
function Stage6Commitments({ state, set, next, back }: { state: EngineState; set: (u: Partial<EngineState>) => void; next: () => void; back: () => void }) {
  const pw = findPathway(state.pathway)!;
  const tests = evalTests(state);
  const triggers = [
    tests.t1 === "amber" && "t1-amber",
    tests.t1 === "red" && "t1-red",
    tests.t2 === "amber" && "t2-amber",
    tests.t2 === "red" && "t2-red",
    tests.t3 === "amber" && "t3-amber",
    tests.t3 === "red" && "t3-red",
    "always",
  ].filter(Boolean) as string[];

  const suggestions = COMMITMENT_SUGGESTIONS.filter(
    (s) => s.pathway === pw.id && triggers.includes(s.trigger),
  ).slice(0, 5);

  const updateCommitment = (i: number, patch: Partial<EngineState["commitments"][number]>) => {
    set({
      commitments: state.commitments.map((c) => (c.i === i ? { ...c, ...patch } : c)),
    });
  };

  const applySuggestion = (text: string, firstAction: string) => {
    const empty = state.commitments.find((c) => !c.will.trim());
    if (empty) updateCommitment(empty.i, { will: text, firstAction });
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 fade-up">
      <header className="mb-6">
        <button onClick={back} className="text-sm text-[color:var(--juse-orange)] hover:underline inline-flex items-center gap-1 mb-2">
          <ArrowLeft className="size-4" /> Back
        </button>
        <p className="text-xs uppercase tracking-wider text-[color:var(--juse-teal)] font-semibold">Stage 6 of 7</p>
        <h2 className="text-3xl md:text-4xl font-bold mt-1">{state.orgName || "Your"} commitments</h2>
        <p className="text-muted-foreground mt-2">
          Knowledge without action is just information. Make three specific commitments — with deadlines and first
          steps. Suggestions tailored to your pathway and sustainability test result are below.
        </p>
      </header>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <Card className="mb-6">
          <CardContent className="pt-5">
            <div className="text-xs uppercase tracking-wider text-[color:var(--juse-teal)] font-semibold mb-3">
              Suggested commitments — click to apply
            </div>
            <div className="space-y-2">
              {suggestions.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => applySuggestion(s.text, s.firstAction)}
                  className="w-full text-left rounded-md border border-border bg-white hover:border-[color:var(--juse-orange)] p-3 transition-colors"
                >
                  <div className="text-sm font-semibold">{s.text}</div>
                  <div className="text-xs text-muted-foreground mt-1">First action: {s.firstAction}</div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Three commitment cards */}
      <div className="space-y-4">
        {state.commitments.map((c) => (
          <Card key={c.i}>
            <CardContent className="pt-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="inline-flex size-7 items-center justify-center rounded-full bg-[color:var(--juse-green)] text-white text-xs font-bold">{c.i}</div>
                <h3 className="font-semibold text-sm uppercase tracking-wider">Commitment {c.i}</h3>
              </div>
              <div className="grid md:grid-cols-3 gap-3">
                <div className="md:col-span-2">
                  <Label>I will…</Label>
                  <Input value={c.will} onChange={(e) => updateCommitment(c.i, { will: e.target.value })} placeholder="e.g. Secure a written MoU from the adopting agency" className="mt-1" />
                </div>
                <div>
                  <Label>By when</Label>
                  <Input type="date" value={c.by} onChange={(e) => updateCommitment(c.i, { by: e.target.value })} className="mt-1" />
                </div>
                <div className="md:col-span-3">
                  <Label>First action step</Label>
                  <Input value={c.firstAction} onChange={(e) => updateCommitment(c.i, { firstAction: e.target.value })} placeholder="e.g. Email the agency lead requesting MoU template tomorrow" className="mt-1" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Reflection */}
      <Card className="mt-6">
        <CardContent className="pt-5">
          <Label>Final reflection — what did this Pathway Canvas reveal about your project's sustainability that you didn't know before?</Label>
          <Textarea
            value={state.reflection}
            onChange={(e) => set({ reflection: e.target.value })}
            placeholder="One paragraph. The deeper the insight, the better the FTP."
            className="mt-2"
          />
        </CardContent>
      </Card>

      <div className="mt-8 flex justify-between">
        <Button variant="ghost" onClick={back}><ArrowLeft /> Back</Button>
        <Button size="lg" variant="accent" onClick={next}>Complete Pathway Engine <ArrowRight /></Button>
      </div>
    </div>
  );
}

// ─── Stage 7: Complete ────────────────────────────────────────────────────────
function Stage7Complete({ state, set, back, restart }: { state: EngineState; set: (u: Partial<EngineState>) => void; back: () => void; restart: () => void }) {
  const pw = findPathway(state.pathway)!;
  const tests = evalTests(state);
  const allGreen = tests.t1 === "green" && tests.t2 === "green" && tests.t3 === "green";
  const overall: "PASS" | "FIXABLE" | "RETHINK" = allGreen ? "PASS" : (tests.t1 === "red" || tests.t2 === "red" || tests.t3 === "red") ? "RETHINK" : "FIXABLE";

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(state.refNumber || "pathway").replace(/\W/g, "-")}-canvas.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportCsv = () => {
    const rows = [
      ["Stream", "Source", "Cash (JMD)", "In-Kind (JMD)", "Frequency"],
      ...Object.entries(state.revenue).map(([id, r]) => [id, r.source, r.cash, r.inKind, r.freq]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(state.refNumber || "pathway").replace(/\W/g, "-")}-revenue-model.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const printPdf = () => window.print();

  const shareWhatsApp = () => {
    const text = `J-USE Pathway Engine — ${state.orgName}\n` +
      `Ref: ${state.refNumber}\n` +
      `Pathway: ${pw.fullName}\n` +
      `Sustainability Test: ${overall}\n` +
      `Annual inflows: ${fmtJMD(tests.totalInflows)}\n` +
      `O&M coverage: ${fmtPct(tests.omCoverage)}\n\n` +
      `Top commitment: ${state.commitments.find((c) => c.will)?.will || "—"}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 fade-up">
      <button onClick={back} className="text-sm text-[color:var(--juse-orange)] hover:underline inline-flex items-center gap-1 mb-2">
        <ArrowLeft className="size-4" /> Back to Commitments
      </button>

      <div className="text-center mt-4">
        <div className="text-6xl">{pw.emoji}</div>
        <p className="text-xs uppercase tracking-widest text-[color:var(--juse-orange)] font-bold mt-3">Pathway Engine Complete</p>
        <h1 className="text-3xl md:text-5xl font-bold mt-2">
          {state.orgName || "You"}, you've mapped your pathway.
        </h1>
        <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
          You've built a Knode-adapted dual-layer canvas, sized your revenue / sustainability inflows, and made
          commitments. That is more financial clarity than most applicants have at FTP submission.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
        <KpiTile label="Pathway" value={pw.shortLabel} />
        <KpiTile label="Annual Inflows" value={fmtJMD(tests.totalInflows)} />
        <KpiTile label="O&M Coverage" value={fmtPct(tests.omCoverage)} accent={tests.omCoverage >= 100 ? "green" : tests.omCoverage >= 80 ? "amber" : "red"} />
        <KpiTile label="Sustainability" value={overall} accent={overall === "PASS" ? "green" : overall === "FIXABLE" ? "amber" : "red"} />
      </div>

      <div className="mt-8 rounded-xl border border-border bg-white p-6">
        <div className="text-xs uppercase tracking-wider text-[color:var(--juse-teal)] font-semibold mb-3">Before your FTP submission</div>
        <ul className="space-y-2 text-sm">
          {[
            "Validate your anchor partner / adopting agency commitment in writing",
            "Complete your Risk Register draft (Annex A of the FTP Schedule)",
            "Re-read your Pathway Canvas — flag any block with one-word answers",
            "Quantify your in-kind contributions before next session",
            "Identify one peer project on the J-USE 48 list with a similar pathway and compare",
          ].map((item, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-[color:var(--juse-orange)] font-bold">▸</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-2">
        <Button variant="outline" onClick={() => set({ stage: 2 })}><PencilLine /> Re-pick Pathway</Button>
        <Button variant="outline" onClick={() => set({ stage: 3 })}><PencilLine /> Edit Canvas</Button>
        <Button variant="outline" onClick={() => set({ stage: 4 })}><PencilLine /> Edit Inflows</Button>
        <Button variant="outline" onClick={() => set({ stage: 6 })}><PencilLine /> Edit Commitments</Button>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-2">
        <Button variant="accent" onClick={printPdf}><Download /> Download Canvas (PDF)</Button>
        <Button variant="outline" onClick={exportCsv}><FileText /> Export Revenue Model (CSV)</Button>
        <Button variant="success" onClick={shareWhatsApp}><Share2 /> Share via WhatsApp</Button>
      </div>

      <div className="mt-4">
        <Button variant="ghost" size="sm" onClick={exportJson}>Export full state as JSON</Button>
      </div>

      <div className="mt-12 pt-6 border-t border-border text-center">
        <button onClick={restart} className="text-xs text-muted-foreground hover:underline inline-flex items-center gap-1">
          <RefreshCcw className="size-3" /> Clear saved data &amp; start fresh
        </button>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function PathwayEngine() {
  const [state, setState] = useState<EngineState>(() => loadState());

  // autosave
  useEffect(() => {
    saveState(state);
  }, [state]);

  const set = (u: Partial<EngineState>) => setState((s) => ({ ...s, ...u }));
  const next = () => set({ stage: Math.min(7, state.stage + 1) });
  const back = () => set({ stage: Math.max(1, state.stage - 1) });
  const jump = (n: number) => set({ stage: n });
  const restart = () => {
    if (confirm("Clear all saved data and start fresh?")) {
      window.localStorage.removeItem(STORAGE_KEY);
      setState(EMPTY_STATE);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <ProgressStepper stage={state.stage} onJump={jump} />
      {state.stage === 1 && <Stage1Welcome state={state} set={set} next={next} />}
      {state.stage === 2 && <Stage2Pathway state={state} set={set} next={next} back={back} />}
      {state.stage === 3 && <Stage3Canvas state={state} set={set} next={next} back={back} />}
      {state.stage === 4 && <Stage4Inflows state={state} set={set} next={next} back={back} />}
      {state.stage === 5 && <Stage5Sustainability state={state} next={next} back={back} />}
      {state.stage === 6 && <Stage6Commitments state={state} set={set} next={next} back={back} />}
      {state.stage === 7 && <Stage7Complete state={state} set={set} back={back} restart={restart} />}
      <SavedPill />
    </div>
  );
}
