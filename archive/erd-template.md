# ERD: [Feature / Product Name]

**Status:** Draft / Ready for kickoff
**Mode:** greenfield | extends-existing
**Pattern source:** [the sibling feature this mirrors 1:1  |  "greenfield — no prior art"]
**Authoring inputs:** [PRD path] · [user-flows / journeys] · [any script / pattern refs]
**DRI:** [Name] | **Last updated:** YYYY-MM-DD

> The ERD is the engineering spec — the bridge from a locked PRD (what + why) to code (how it connects, scales, stays reliable). It is a **DEFINE→DELIVER gate artifact**: no feature code ships until §3's ONE structural decision is resolved and no 🔵 architectural assumption sits load-bearing. One canonical doc per feature; do not fork a second engineering doc.

## Confidence tag legend

🟢 primary (you read the code / ran the query / verified it) · 🟡 secondary (docs, a teammate, an analyst) · 🔵 hypothesis (untested belief) · 🔴 disproven (kept visible). Tag every load-bearing claim. A 🔵 on the critical path blocks DELIVER.

## Two modes — pick one in the header

- **greenfield** — a new app. The frontend prototype + mock fixtures already exist; the **schema is derived from the fixtures** (the prototype discovered the real data shape). Fixtures-first. Principle: *derive, don't invent.*
- **extends-existing** — a feature inside an existing repo. There is a **pattern source**: a known-good sibling feature you mirror 1:1. You *read the existing codebase*, cite exact paths, reuse infra/domain, spec only the deltas. Principle: *mirror the pattern, don't invent new infrastructure.*

---

## 1. Summary & Guiding Principle

One paragraph: what this does, for whom, and the core outcome. Then the ONE guiding principle in a sentence (e.g. "structural clone of [sibling feature] — reuse the domain/table/lifecycle; the only new logic is X" or "greenfield MVP — smallest thing that puts the core loop in front of users").

### Confirmed scope decisions

| Decision | Resolution |
|----------|------------|
| [decision] | [what was chosen] |
| [thing deliberately excluded] | **Out of scope** — [why / which future phase] |

Out-of-scope rows are not optional. An unstated exclusion is how "while we're at it" creep re-enters at build time.

## 2. Architecture Overview

The layered flow, top to bottom: `Frontend → BFF/API → Backend (routes → controller → service → data) → Datastore(s) / external services`. State module/domain placement and any cross-module reads. greenfield: the intended structure. extends-existing: where it slots into the current layers, per the repo's existing conventions — name the sibling files.

## 3. ⭐ The ONE structural decision (review this first)

The single highest-risk architectural call — the one that forces a rewrite if wrong. State it before anything else, back it with evidence, tag confidence. Examples: the identity key for a record; the aggregate/table boundary; a sync-vs-async choice on the hot path; the one place you deviate from the pattern source. If you can only justify it by reasoning (not evidence), it's 🔵 — test it or cut the dependency before DELIVER.

## 4. Data Model & Schema

- **greenfield:** the schema derived from the fixtures — tables, columns, keys, relationships, indexes. Every column traces to a fixture field a screen consumes.
- **extends-existing:** the schema **delta** vs the live schema — enum values / columns / tables added, what's reused unchanged, and the **migration safety** (additive → backfill → cutover → drop; never a destructive one-step on a live table).
- Both: exact types / interfaces for any stored payload, and the **API request/response shapes**. Standard envelope `{ data, error }`. Design tables around **access patterns** (write the frequent queries first); index every WHERE/JOIN/ORDER column of a frequent query (composite → most-selective first; don't over-index high-write tables); **cursor pagination** on every list; no N+1.

## 5. Backend Changes

File-by-file. extends-existing tags each entry `new | mirrors <path> | reuse`; greenfield lists files to create. Give exact method/function signatures, the recommendation/state machine if any, and **explicit DROPs** (what you are deliberately NOT porting/building, e.g. "no LLM layer — out of scope §1"). Parameterized queries only; validate every input at the boundary; timeout on every outbound call.

## 6. Net-New Logic Contract

The only genuinely new business logic (extends-existing: the one thing NOT inherited from the pattern source). Spec it precisely enough to verify a port — rule-by-rule / code-by-code, each claim sourced, ✅ marking what already exists in the source. This is the part reviewers scrutinize hardest.

## 7. Frontend Changes

File-by-file (extends-existing mirrors siblings). Routing / tab registration, shared constants, and the **design-system rule**: which design system / tokens / components this surface uses. Never mix a hand-rolled section next to real components. State loading / empty / error states per screen.

## 8. Chunk Map & Boundary Contracts

Split the work into chunks (one flow/unit each), ordered by dependency (a chunk that reads another's tables comes after it). This is what an implementation loop consumes.

### C1 — [name]
- **Owns tables:** … **Reads (contract, not owned):** … **Endpoints:** …
- **Acceptance criteria:** what "done" looks like.
- **Boundary contracts:** schemas it reads but doesn't own · APIs it calls · shapes exchanged. This is what lets the chunk build in isolation without breaking consistency.

### C2 — …

## 9. Open Decisions

Remaining 🔵 / unresolved calls, riskiest flagged. Nothing here may be load-bearing on the DELIVER critical path — resolve or cut before the gate.

---

## Gate (run `/erd-gate` before DELIVER)

- [ ] §3 ⭐ decision is resolved — not 🔵.
- [ ] No 🔵 hypothesis sits load-bearing on the critical path.
- [ ] Every screen/story maps to a table + an endpoint; every Phase-1 story is covered by a chunk.
- [ ] Every chunk has explicit boundary contracts (no chunk reads a table with no named owner).
- [ ] greenfield: schema covers every fixture field, no invented columns · extends-existing: every new artifact maps to a pattern-source counterpart or is flagged net-new in §6.
- [ ] Out-of-scope stated (§1); auth/authz declared per endpoint (§4/§5).
- [ ] Every load-bearing claim carries a confidence tag.
