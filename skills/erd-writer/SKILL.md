---
name: erd-writer
description: Draft or fill an ERD (Engineering Requirement Document) from a locked PRD, before feature code. Use when the user asks to "write the ERD", "engineering requirements", "design the schema", "cut the chunks", "spec the backend/frontend changes", or when a build playbook has no engineering spec to read. Two modes — greenfield (schema derived from fixtures) and extends-existing (mirror a pattern-source feature in an existing repo). Fills erd/erd-template.md. Does not gate — that's erd-gate. Not for the product PRD (prd-writer) or user flows.
---

# ERD Writer

The ERD is the engineering spec that bridges a locked PRD (what + why) to code (how it connects, scales, stays reliable), and splits the work into buildable chunks. It sits between `prd/` and `sessions/`. Fill `erd/erd-template.md`; read it for the full section-by-section structure and the gate.

## Core philosophy

**The ERD makes the ad-hoc mid-build decisions once, up front, reviewable.** Which tables, which endpoints, where a feature slots into existing code, what's the one risky architectural call — decided before the first commit, not discovered at integration. Like the PRD: **decisions, not description.** Every load-bearing claim carries a confidence tag; a 🔵 architectural hypothesis on the critical path blocks DELIVER.

## Step 0 — pick the mode

- **greenfield** — a new app. The frontend prototype + mock fixtures already exist. **Derive the schema from the fixtures** — the prototype already discovered the real data shape. Fixtures-first, don't invent.
- **extends-existing** — a feature inside an existing repo. There is a **pattern source**: a known-good sibling feature you mirror 1:1. **Read the existing codebase**, trace the sibling's layers end to end, cite exact paths, reuse infra/domain, spec only the deltas. Mirror the pattern, don't invent new infrastructure.

If the mode is unclear, ask — it changes the whole generation path.

## Steps

1. **Gather inputs.** Read the PRD (Phase-1 scope — the ERD details Phase 1; later phases noted high-level only) and the user flows. greenfield: read the fixtures. extends-existing: read the pattern-source feature's full stack and note every file + the domain/placement convention it follows.
2. **⭐ Name the ONE structural decision first** (§3). The single call that forces a rewrite if wrong. Evidence + confidence tag. If you can only justify it by reasoning, it's 🔵 — flag it for a test, don't bury it.
3. **Schema** (§4). greenfield: derive from fixtures (dispatch heavy schema reasoning to your strongest model). extends-existing: spec the delta vs the live schema + migration safety. Both: design around access patterns, index the frequent-query columns, cursor pagination, no N+1.
4. **Architecture + change list** (§2, §5, §7). Layered flow; backend files (`new | mirrors <path> | reuse`); frontend files + the design-system rule; API contract with `{ data, error }` envelope, pagination, auth per endpoint.
5. **Net-new logic contract** (§6). The only genuinely new logic; spec it precisely, ✅ mark what already exists in the source.
6. **Chunk map + boundary contracts** (§8). One flow per chunk, dependency-ordered, each with its scope + the contracts it shares with adjacent chunks. This is what the build playbook consumes.
7. **Open decisions** (§9). Remaining 🔵, riskiest flagged — none may be load-bearing on the DELIVER path.

Then run `/erd-gate` before any code.

## Antipatterns (each is a gate failure)

- **No ⭐ decision, or it's 🔵.** The riskiest call must be named and resolved.
- **extends-existing invents new infra** when the pattern source already ships it. Reuse the domain/table/lifecycle; spec deltas only.
- **greenfield invents the schema** instead of deriving it from the fixtures.
- **Clean entities, slow queries** — design around access patterns, not a tidy diagram.
- **Chunks with no boundary contracts** — they drift and break at integration. Contracts are the point.
- **Untagged claims / a second competing engineering doc.** One canonical ERD, every load-bearing claim tagged.
