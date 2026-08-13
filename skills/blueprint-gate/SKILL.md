---
name: blueprint-gate
description: Run a pass/fail gate check against a filled Blueprint (blueprint/blueprint-template.md) before it moves from DEFINE to DELIVER — before any feature code, and again before ship. Use when the user asks to "check if the blueprint is ready", "gate the blueprint", "is the build spec done", or before starting the build sessions against a Blueprint that hasn't been checked. Does not write or rewrite Blueprint content — that's blueprint-writer's job. Reports pass/fail per check with the exact location of every failure.
---

# Blueprint Gate

The Blueprint's whole value is that the risky engineering calls get made once, up front, reviewably — and that the build plan is complete before the build starts — instead of ad hoc at integration. That's worthless if nothing checks the calls were actually made. This skill is that check. It does not improve prose or fill gaps; it reports what's missing and where, and hands fixes back to the author or `blueprint-writer`.

## When to run this

- Before the first line of feature code (the DEFINE→DELIVER gate in `pro/MANIFESTO.md`).
- Before starting the Blueprint's Part 3 build sessions.
- After any significant Blueprint edit — a new chunk can silently introduce an un-owned table read, and a new integration can add an unlisted env var.

## Checks

Run every check against the full document. Report PASS / FAIL, and for every FAIL quote the exact section — "fix the contracts" is useless, "§8 chunk C3 reads `bookings` but no chunk owns it" is actionable.

### Part 1 — The Spec

**1. ⭐ The ONE structural decision (gate).** FAIL if §2 is missing, empty, or still tagged 🔵. Highest-priority check: an unresolved ⭐ decision means the riskiest architectural call is being carried untested into build — the exact failure the Blueprint exists to prevent. Quote §2 and its tag.

**2. No load-bearing 🔵 on the critical path (gate).** FAIL any 🔵 hypothesis that a chunk, the schema, or the ⭐ decision depends on. Per the manifesto: test it, get a DRI-signed risk acceptance, or cut the dependency before DELIVER. List each load-bearing 🔵 and what depends on it.

**3. Confidence-tag coverage.** Every claim of fact about the existing system (extends-existing) and every architectural assertion needs a 🟢🟡🔵🔴 tag. FAIL any untagged load-bearing claim, quoting it.

**4. Chunk boundary contracts complete.** FAIL if any chunk in §8 reads a table it doesn't own with no other chunk named as owner, or calls an API with no stated contract. This catches integration drift.

**5. Schema ↔ source coverage.** greenfield: FAIL if a fixture field has no column, or a column has no consuming fixture/screen (invented data). extends-existing: FAIL if a new backend/frontend artifact in §5/§6/§7 maps to neither a pattern-source counterpart (`mirrors <path>`) nor an explicit net-new entry.

**6. Migration safety (extends-existing / any live-schema change).** FAIL a destructive one-step schema change on a live table. Path must be additive → backfill → cutover → drop, stated in §4.

**7. Out-of-scope stated.** FAIL if §1's scope-decisions table has no out-of-scope rows for a feature that plausibly has adjacent scope (almost all do).

### Part 2 — Technical Reference

**8. Auth/authz per endpoint.** FAIL if the API contract (§5) has endpoints with no stated auth + who-may-call. "Internal tool" is not an exemption — state it anyway.

**9. Environment variables complete.** FAIL if §12 is empty, or an integration named in §14 (auth/email/payments/AI/analytics) has no corresponding key(s) in §12. A missing key is a runtime failure the gate should catch at spec time. Flag secrets marked as public.

**10. Security checklist present.** FAIL if §15 is a stub — a feature touching auth, user data, payments, or file upload with no security checklist is shipping blind.

**11. Access-pattern / index hygiene (spot check, advisory).** Flag any list endpoint with no pagination, obvious N+1, or a frequent-query column with no index. Advisory — report, don't hard-block on this alone.

### Part 3 — Build Plan to v0

**12. Every session has a done-check.** FAIL any session in §20 with no verifiable done-check, or with a done-check whose boxes can't be checked by inspection/test (a session you can't verify is a rubber-stamp).

**13. Checkpoints and audit gates present.** FAIL if the two checkpoints (§21) or the resilience + functional-coverage audit gates (§22) are missing. These are the hard stops that catch silent failure before launch.

**14. Chunk map ↔ sessions coverage.** FAIL if a chunk in §8 is built by no session, or a session builds something not in the spec (Parts 1-2). Every buildable unit traces both ways.

## Output format

Report as a table: Check | Result | Location | Fix owner (author / blueprint-writer / needs a spike).

End with one line: **READY** (all hard checks pass) or **NOT READY** (N hard failures — priority order). Gate failures come first: an unresolved **⭐ decision (check 1)** or a **load-bearing 🔵 (check 2)** outrank everything, because they mean the riskiest engineering call is untested going into build. Then boundary contracts, schema coverage, and env/auth completeness, then session-plan coverage, then the rest.

Do not soften NOT READY into "mostly ready" — the green light to start writing feature code either exists or it doesn't.
