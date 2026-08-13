---
name: blueprint-writer
description: Draft or fill a Blueprint (the merged engineering spec + technical reference + step-by-step build plan) from a locked PRD, before feature code. Use when the user asks to "write the blueprint", "engineering spec", "design the schema", "cut the chunks", "spec the backend/frontend changes", "plan the build sessions", or when a build has no single source of truth for how it gets built. Two modes — greenfield (schema derived from fixtures) and extends-existing (mirror a pattern-source feature in an existing repo). Fills blueprint/blueprint-template.md (Parts 1-3). Does not gate — that's blueprint-gate. Not for the product PRD (prd-writer) or user flows.
---

# Blueprint Writer

The Blueprint is the single build document that bridges a locked PRD (what + why) to a shipped v0 (how it connects, stays reliable, and gets built session by session). It replaces the old three-doc split (ERD + Implementation Guide + Session Playbook) with one source of truth. It sits between `prd/` and the running app. Fill `blueprint/blueprint-template.md`; read it for the full section-by-section structure and the gate.

## Core philosophy

**The Blueprint makes the ad-hoc mid-build decisions once, up front, reviewable — and then hands you the exact order to build them in.** Which tables, which endpoints, where a feature slots into existing code, what's the one risky architectural call, which env vars, which session builds what — decided before the first commit, not discovered at integration. Like the PRD: **decisions, not description.** Every load-bearing claim carries a confidence tag; a 🔵 architectural hypothesis on the critical path blocks the build.

Three parts, one doc:
- **Part 1 — The Spec:** the ⭐ ONE structural decision, schema, API contracts, chunk map + boundary contracts (the ERD's job).
- **Part 2 — Technical Reference:** tech stack, env vars, integrations, security, performance, deploy topology (how it stays reliable).
- **Part 3 — Build Plan to v0:** pre-flight + session-by-session with done-checks, checkpoints, audits, ship sequence (the step-by-step).

## Step 0 — pick the mode

- **greenfield** — a new app. The frontend prototype + mock fixtures already exist. **Derive the schema from the fixtures** — the prototype already discovered the real data shape. Fixtures-first, don't invent. Part 3 runs the full linear session arc.
- **extends-existing** — a feature inside an existing repo. There is a **pattern source**: a known-good sibling feature you mirror 1:1. **Read the existing codebase**, trace the sibling's layers end to end, cite exact paths, reuse infra/domain, spec only the deltas. Part 3 is chunk-by-chunk (E1/E2), skipping the infrastructure sessions.

If the mode is unclear, ask — it changes the whole generation path. Stamp the mode in the Blueprint header.

## Steps

### Part 1 — The Spec
1. **Gather inputs.** Read the PRD (Phase-1 scope — the Blueprint details Phase 1; later phases noted high-level only) and the user flows. greenfield: read the fixtures. extends-existing: read the pattern-source feature's full stack and note every file + the domain/placement convention it follows.
2. **⭐ Name the ONE structural decision first** (§2). The single call that forces a rewrite if wrong. Evidence + confidence tag. If you can only justify it by reasoning, it's 🔵 — flag it for a test, don't bury it.
3. **Schema** (§4). greenfield: derive from fixtures (dispatch heavy schema reasoning to your strongest model). extends-existing: spec the delta vs the live schema + migration safety. Both: design around access patterns, index the frequent-query columns, cursor pagination, no N+1.
4. **Architecture + change list** (§3, §5, §6, §7). Layered flow; backend files (`new | mirrors <path> | reuse`); frontend files + the design-system rule; API contract with `{ data, error }` envelope, pagination, auth per endpoint.
5. **Chunk map + boundary contracts** (§8). One flow per chunk, dependency-ordered, each with its scope + the contracts it shares with adjacent chunks. This is what Part 3's sessions consume.
6. **Open decisions** (§9). Remaining 🔵, riskiest flagged — none may be load-bearing on the build path.

### Part 2 — Technical Reference
7. **Stack, file structure, env vars** (§10-§12). The complete env-var list is load-bearing — a missing key surfaces as a runtime failure three sessions in. List every one, public vs secret.
8. **System design + integrations** (§13-§14). Key flows; auth, email, payments, AI, analytics/monitoring — each only if the product uses it. For extends-existing, cite what the repo already provides and reuse it.
9. **Security, performance, deploy** (§15-§18). Security checklist, performance targets, CI/CD + deploy topology, and the honest V1 limitations.

### Part 3 — Build Plan to v0
10. **Sequence the chunk map into sessions** (§19-§24). Each session: goal, the Blueprint sections it reads, steps, a **done-check** (every box verifiable), and any gate. greenfield: the full linear arc (schema → landing → backend+auth → core pipeline → auth UI → dashboard → settings/billing → jobs/emails → polish → edge cases → analytics verify → launch). extends-existing: E1 (one branch per chunk, dependency-ordered) → E2 (integrate + regression), then the shared back-half audits + launch. Place the two checkpoints and the two audit gates. End with the numbered deploy order.

Then run `/blueprint-gate` before any code.

## Antipatterns (each is a gate failure)

- **No ⭐ decision, or it's 🔵.** The riskiest call must be named and resolved.
- **extends-existing invents new infra** when the pattern source already ships it. Reuse the domain/table/lifecycle; spec deltas only.
- **greenfield invents the schema** instead of deriving it from the fixtures.
- **Clean entities, slow queries** — design around access patterns, not a tidy diagram.
- **Chunks with no boundary contracts** — they drift and break at integration. Contracts are the point.
- **Incomplete env-var list** — a runtime failure the gate should have caught at spec time.
- **A session with no done-check** — an unverifiable session is a rubber-stamp waiting to happen.
- **Untagged claims / a second competing build doc.** One canonical Blueprint, every load-bearing claim tagged.
