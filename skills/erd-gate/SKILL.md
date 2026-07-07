---
name: erd-gate
description: Run a pass/fail gate check against a BuilderOS ERD (erd/erd-template.md, filled) before it moves from DEFINE to DELIVER — before any feature code. Use when the user asks to "check if the ERD is ready", "gate the ERD", "is the engineering spec done", or before starting the build playbook against an ERD that hasn't been checked. Does not write or rewrite ERD content — that's erd-writer's job. Reports pass/fail per check with the exact location of every failure.
---

# ERD Gate

The ERD's whole value is that the risky engineering calls get made once, up front, reviewably — instead of ad hoc at integration. That's worthless if nothing checks the calls were actually made. This skill is that check. It does not improve prose or fill gaps; it reports what's missing and where, and hands fixes back to the author or `erd-writer`.

## When to run this

- Before the first line of feature code (the DEFINE→DELIVER gate in `pro/MANIFESTO.md`).
- Before starting `sessions/SESSION_PLAYBOOK.md`'s build sessions against a feature.
- After any significant ERD edit — a new chunk can silently introduce an un-owned table read.

## Checks

Run every check against the full document. Report PASS / FAIL, and for every FAIL quote the exact section — "fix the contracts" is useless, "§8 chunk C3 reads `bookings` but no chunk owns it" is actionable.

### 1. ⭐ The ONE structural decision (gate)
FAIL if §3 is missing, empty, or still tagged 🔵. This is the highest-priority check: an unresolved ⭐ decision means the riskiest architectural call is being carried untested into build — the exact failure the ERD exists to prevent. Quote §3 and its tag.

### 2. No load-bearing 🔵 on the critical path (gate)
FAIL any 🔵 hypothesis that a chunk, the schema, or the ⭐ decision depends on. Per the manifesto: test it, get a DRI-signed risk acceptance, or cut the dependency before DELIVER. List each load-bearing 🔵 and what depends on it.

### 3. Confidence-tag coverage
Every claim of fact about the existing system (extends-existing: "the sibling keys by X", "table Y already has column Z") and every architectural assertion needs a 🟢🟡🔵🔴 tag. FAIL any untagged load-bearing claim, quoting it.

### 4. Chunk boundary contracts complete
FAIL if any chunk in §8 reads a table it doesn't own with no other chunk named as the owner, or calls an API with no stated contract. This is the check that catches integration drift — a chunk that builds against an assumed shape.

### 5. Schema ↔ source coverage
- **greenfield:** FAIL if a fixture field has no column, or a column has no consuming fixture/screen (invented data).
- **extends-existing:** FAIL if a new backend/frontend artifact in §5/§7 maps to neither a pattern-source counterpart (`mirrors <path>`) nor a §6 net-new entry. Every artifact is either mirrored or explicitly new.

### 6. Migration safety (extends-existing, or any live-schema change)
FAIL a destructive one-step schema change on a live table. The path must be additive → backfill → cutover → drop, stated in §4.

### 7. Out-of-scope stated
FAIL if §1's scope-decisions table has no out-of-scope rows for a feature that plausibly has adjacent scope (almost all do). An unstated exclusion is how creep re-enters at build time.

### 8. Auth/authz per endpoint
FAIL if the API contract (§4/§5) has endpoints with no stated auth + who-may-call. "Internal tool" is not an exemption — state it anyway.

### 9. Access-pattern / index hygiene (spot check, advisory)
Flag any list endpoint with no pagination, any obvious N+1, or a frequent-query column with no index. Advisory — report, don't hard-block on this alone.

## Output format

Report as a table: Check | Result | Location | Fix owner (author / erd-writer / needs a spike).

End with one line: **READY** (all hard checks pass) or **NOT READY** (N hard failures — priority order). Gate failures come first: an unresolved **⭐ decision (check 1)** or a **load-bearing 🔵 (check 2)** outrank everything, because they mean the riskiest engineering call is untested going into build. Then boundary contracts and schema coverage, then the rest.

Do not soften NOT READY into "mostly ready" — the green light to start writing feature code either exists or it doesn't.
