# J-USE Pathway Engine

Standalone capability module for J-USE REOI 2026 Stage 2 (Full Technical Proposal). Applicants pick one of three NbCS Value Proposition pathways, build a **dual-layer Knode-adapted Business Model Canvas**, size their revenue / sustainability inflows, pass a 3-test sustainability check, and leave with three named commitments.

## Pedagogical lineage

- **Osterwalder & Pigneur (2010)** — original 9-block Business Model Canvas
- **Burkett — Knode (2010)** — Social Enterprise BMC: every block split into Commercial + Impact rows
- **Wilson et al. (2009)** — Business models for sustainable development: value distribution down the chain, communities as co-designers, M&E built in, sustainability via core activities
- **R.E.A.P. Ag-Academy 2026** (Edge Catalyst Finance / Helen's Daughters) — 7-stage gamified workbook architecture, autosave, KPI live-recompute, choice-card commit, reflection prompts, downloadable artefact at completion

## The three pathways

| Pathway | Top layer | Tagline | Test |
|---|---|---|---|
| 🌿 **Revenue Generating** | Commercial (CVP) | "My NbCS sells something" | Customer revenue covers O&M from year 1 |
| 🪴 **Blended** | Commercial + Anchor (CVP) | "My NbCS has two channels — paying and public" | Commercial covers commercial-stream O&M + anchor MoU formalised ≥3 years |
| 🌳 **Community / Public Good** | Stewardship & Adoption (AVP) | "My NbCS delivers a public benefit" | Agency budget commitment + community stewardship structure operational |

Every pathway uses the **Knode dual-layer canvas** — 9 blocks, two rows per block (top layer + Impact). For Public Good, the top layer is *Stewardship & Adoption* (Adoption Value Proposition, AVP) rather than Commercial, because there's no paying customer — but there IS an adopting agency whose budget-line adoption is the structural equivalent.

## 7-stage flow

```
Welcome ── Pathway Choice ── Dual-Layer Canvas ── Revenue / Inflows ── Sustainability Test ── Commitments ── Complete
   1            2                    3                    4                     5                  6           7
```

## Gamification mechanics

- **Sticky progress stepper** at the top of every stage — visible position-in-journey at all times
- **Progress bar** on the canvas stage — "0/9 blocks filled" with NAVY → ORANGE fill
- **3-question pathway diagnostic** with auto-recommendation
- **Pathway choice cards** with confetti-on-select micro-interaction
- **Knode trap callouts** — contextual honest warnings ("The Anchor Partner Mirage," "The Adopting Agency Mirage," "The Single-Channel Trap")
- **Inline rubric reference pills** — every canvas block tagged with the SFM Reviewer Rubric criterion + points it maps to
- **Live KPI dashboard** on Stage 4 — Total Annual Inflows, Cash, In-Kind, O&M Coverage % update as the applicant types
- **Sustainability test traffic lights** (Green / Amber / Red) on Stage 5 across 3 tests
- **Suggested commitments** auto-generated from pathway + test outcome
- **Autosave to localStorage** with visible "Saved" pill
- **Three exports** at completion: PDF (print), CSV (revenue model), WhatsApp share (accountability loop), plus JSON state dump

## Quickstart

```bash
cd juse-pathway-engine
npm install
npm run dev    # → http://localhost:3000
```

Production build:
```bash
npm run build
# outputs to ./dist (static SPA, ~290KB JS / 31KB CSS)
```

## Architecture

- **React 19 + Vite 6 + TypeScript** — fast HMR, type-safe
- **Tailwind v4** with custom J-USE palette (NAVY #1F4E79 / TEAL #2E75B6 / ORANGE #C57E1F / GREEN #548235)
- **Radix UI primitives** — accessible base components (progress, slot)
- **Lucide React** — icon set
- **localStorage** — single source of truth for autosave; no backend required
- **Static SPA** — deploys to Netlify, Vercel, GitHub Pages, S3, anywhere

## Project structure

```
juse-pathway-engine/
├── package.json
├── vite.config.ts
├── tsconfig.json
├── index.html
├── netlify.toml
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css                  ← J-USE palette + custom utility classes
│   ├── lib/utils.ts               ← cn() + JMD formatting
│   ├── components/ui/             ← Button, Card, Input, Label, Textarea, Progress
│   ├── data/
│   │   ├── types.ts               ← EngineState + Pathway + CanvasBlock types
│   │   ├── pathways.ts            ← 3 pathway definitions
│   │   ├── canvas.ts              ← 9 canvas blocks × 3 pathways × 2 layers + Knode traps
│   │   └── revenue-streams.ts     ← 8 revenue streams + commitment suggestions
│   └── pages/
│       └── PathwayEngine.tsx      ← Main multi-stage component (all 7 stages)
└── README.md
```

## How it maps to the J-USE FTP Schedule

Each canvas block carries an inline rubric reference pill (e.g., "Rubric A2 (8 pts)"). The mapping:

| Canvas Block | SFM Rubric Criterion | Points |
|---|---|---|
| 1. Key Partners | D3 Partnership & Scaling | 4 |
| 2. Key Activities | A2 Adaptation Logic Chain | 8 |
| 3. Value Proposition | A1 + A4 NbCS Intervention + Concept Note Quality | 9 |
| 4. Customer / Stewardship Relationship | C4 Vulnerability-to-Benefits | 5 |
| 5. Customer / Beneficiary Segment | C1 + C2 Vulnerability + Disaggregation **+ partial C3 (Gender Analysis — analytical core)** | 9 |
| 6. Key Resources | D1 Sustainability Model | 6 |
| 7. Channels | **C3 Gender Analysis (operational core — gender-responsive delivery)** | 6 |
| 8. Cost Structure | E2 + E3 Budget Realism + Admin ≤10% | 7 |
| 9. Revenue Streams / Inflows | E4 + E5 Co-Financing + Bonus | 8 |

### Note on C3 Gender Analysis (6 pts) — distributed across two blocks

C3 has three scoring pillars:

1. **Differential climate impacts** — scored from the Block 1 (Customer / Beneficiary Segment) disaggregation data, supported by the FTP Gender Analysis narrative document
2. **Participation barriers** — scored from Block 1's vulnerable-group identification, plus the FTP narrative
3. **Gender-responsive strategies** — scored from Block 3 Channels (operational design: when channels reach women, in what language, in what time-poverty context, with what safety assumptions)

Blocks 1 and 3 therefore carry C3 jointly. Reviewers reading the canvas + FTP narrative together score across both blocks.

A complete dual-layer canvas pre-populates ~62 of 100 rubric points before the applicant even drafts the formal FTP narrative.

## Deployment

### GitHub Pages (one-time setup)

A GitHub Actions workflow at `.github/workflows/deploy.yml` builds + deploys on every push to `main`.

1. Create a new public GitHub repo (e.g. `juse-pathway-engine`).
2. Push this directory:
   ```bash
   git init
   git add -A
   git commit -m "Initial commit: J-USE Pathway Engine"
   git branch -M main
   git remote add origin https://github.com/<your-user>/juse-pathway-engine.git
   git push -u origin main
   ```
3. In the repo settings → **Pages** → set **Source: GitHub Actions**.
4. In repo settings → **Secrets and variables → Actions → Variables** → add a Variable named `BASE_URL` with value `/juse-pathway-engine/` (replace with your actual repo name). This is required so Vite builds asset paths correctly for the subdirectory the site will be hosted at.
5. Push any change to `main` — the workflow builds and publishes to https://&lt;your-user&gt;.github.io/juse-pathway-engine/.

If you're hosting at a **custom domain** or at `user.github.io` root, omit the `BASE_URL` variable (it defaults to `/`).

### Netlify (alternative)

`netlify.toml` is included. Connect the repo at netlify.com, leave build defaults, deploy. Single-page routing fallback is already configured.

### Other static hosts (Vercel, Cloudflare Pages, S3, Surge)

Run `npm run build` and serve the resulting `dist/` directory. For SPA-style hosting, configure the host to fall back to `/index.html` on 404 (already set up in `netlify.toml` — translate to the equivalent on your host).

## Roadmap (deferred — not in this build)

- Multi-pathway switching mid-session (currently localStorage tied to one pathway at a time)
- PDF export rendered as Knode formal 9-block layout (currently uses `window.print()` of the rendered HTML)
- Cloud sync layer (Firebase / Supabase) for cross-device autosave
- Mentor-side dashboard for cohort review
- Integration with the J-USE FTP Budget Template (Sheet 5 Co-financing Tracker auto-import)
- Spanish + French localisation for CARIFORUM extension
- Companion sessions: The Lens (Session 1), Money Types for NbCS (Session 3), Translation to Reviewers (Session 4), The FTP Ask (Session 5), Reviewer Simulation (Session 5A), Sustainable Finance Plan (Session 6)

## Credits

Designed by T. Valerie Onu (Edge Catalyst Finance, SFM Specialist for J-USE REOI 2026) for the Environmental Foundation of Jamaica, funded by Global Affairs Canada. Pedagogical architecture adapted from R.E.A.P. Ag-Academy 2026 (Helen's Daughters / Edge Catalyst Finance). Canvas methodology adapted from Burkett's Knode Social Enterprise Business Model Canvas and Wilson et al. (2009).
