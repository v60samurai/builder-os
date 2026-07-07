# ERD — Engineering Requirement Document

One template. The engineering spec that bridges a locked PRD to code.

| File | What it is |
|------|-----------|
| [`erd-template.md`](./erd-template.md) | The ERD. Architecture, the ⭐ one structural decision, data model, backend/frontend changes, net-new logic contract, chunk map + boundary contracts. |

The PRD says *what* and *why*. The ERD says *how it connects, scales, and stays reliable* — and splits the work into buildable chunks with the contracts between them. It sits between `prd/` and `sessions/` (the build playbook reads the chunk map straight out of it).

## Why it exists

A PRD that's DEFINE-ready still doesn't tell an engineer (or an agent) which tables to create, which endpoints to build, or where a feature slots into an existing codebase. Skip the ERD and those calls get made ad hoc, mid-build, in isolation — and drift into inconsistency at integration. The ERD makes them once, up front, reviewable.

## The two disciplines that make it a gate, not a doc

- **The ⭐ ONE structural decision, reviewed first** — the single architectural call that forces a rewrite if wrong, surfaced before anything else. Riskiest-assumption thinking applied to engineering.
- **Confidence tags on every load-bearing claim** — a 🔵 architectural hypothesis sitting load-bearing on the path into build is a tripwire (see [`../pro/MANIFESTO.md`](../pro/MANIFESTO.md)). Test it or cut it.

Plus: explicit out-of-scope rows (creep defense), and boundary contracts per chunk (the thing that lets chunks build independently without drifting).

## Two modes

- **greenfield** — new app; schema derived from the frontend fixtures.
- **extends-existing** — feature inside an existing repo; mirror a known-good pattern source, spec only the deltas, cite exact paths.

Pick one in the header. The gate adapts to the mode.

## Skills

- [`/erd-writer`](../skills/erd-writer) — draft or fill the ERD from a PRD (+ pattern source, for extends-existing).
- [`/erd-gate`](../skills/erd-gate) — check the ERD is DELIVER-ready before any code.

See [`../pro/README.md`](../pro/README.md) for where this sits in the 5-mode pipeline.
