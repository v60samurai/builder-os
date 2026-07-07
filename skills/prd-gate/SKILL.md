---
name: prd-gate
description: Run a pass/fail gate check against a BuilderOS PRD (prd/prd.md) before it moves from DEFINE to DELIVER. Use when the user asks to "check if this PRD is ready", "gate this PRD", "is this PRD done", "audit the PRD", or before starting `sessions/SESSION_PLAYBOOK.md` against a PRD that hasn't been checked yet. Does not write or rewrite PRD content — that's `prd-writer`'s job. This skill only reports pass/fail per check, with the exact location of every failure. (The PRD gate proves *what* is worth building; `erd-gate` proves *how* is safe to start.)
---

# PRD Gate

BuilderOS's whole pitch is that confidence tags and explicit non-goals force rigor that other templates only gesture at. That pitch is worthless if nothing actually checks for them. This skill is that check — it systematizes `prd-writer`'s own "Reviewing Existing PRDs" section into a pass/fail gate instead of leaving it as guidance someone can skim past.

This skill does not improve prose, suggest rewrites, or fill gaps. It reports what's missing and where. Handing fixes back to the user (or to `prd-writer`) keeps the PRD in the author's voice, not the gate's.

## When to run this

- Before the "PRD review finished by all stakeholders" milestone, or before writing the ERD / starting Session 1.
- After any `prd-updater` edit — an update can silently break tag consistency if the new claim doesn't carry a tag with it.
- Any time someone asks "is this PRD actually done, or does it just look done."

## Checks

Run every check below against the full document. Report each as PASS / FAIL, and for every FAIL, quote the exact line or section — "fix your confidence tags" is useless, "line 47, Success Criteria row 2, has no confidence tag" is actionable.

### 1. Unresolved placeholders

Scan for bracket placeholders that were never filled in: a `[Bracketed Phrase]` that is not a markdown link (i.e. not immediately followed by `(url)`), and is not part of a table header row. `[Product Name]`, `[X%]`, `[link]` left untouched are all FAILs. This is the literal check the README tells every user to run by hand ("search for `[` / `{{` and fill every placeholder") — this skill just runs it for them and doesn't miss one from fatigue.

### 2. Confidence tag coverage

Every row in a Success Criteria / Evidence / Key Assumptions table, and every claim inside "The Problem" / Problem Alignment prose, needs a 🟢🟡🔵🔴 tag. FAIL any claim of fact or projection with no tag attached. A PRD where *every* tag is 🔵 is a separate FAIL — that means no primary or secondary research was ever done, which is a discovery gap, not a documentation gap. Flag it as: "0 of N tags are 🟢/🟡 — has discovery actually happened, or did this skip straight to DEFINE?"

### 3. Non-goals present and non-empty

FAIL if the Non-Goals section is missing, or present but empty/placeholder-only. A PRD with no stated non-goals hasn't actually drawn a scope boundary — it just has a list of things it hopes to do.

### 4. Vague-metric antipattern

Scan Success Criteria and Goals & Success for hope-language with no attached number: "improve," "enhance," "optimize," "increase" (unqualified), "better," "more." FAIL each instance and quote it. Per `prd-writer`'s own antipattern list: "Improve engagement" is a hope, "P50 engagement time increases ≥15%" is a target.

### 5. Guardrail metric present

FAIL if the Success Criteria table has zero rows tagged "Guardrail." Every PRD ships something that could regress something else; if nothing's being watched for that, the metrics table is incomplete.

### 6. Open Questions hygiene

FAIL if an Open Question has been present, unresolved, across two or more `prd-updater` edits (check the Changelog for repeated mentions of the same topic without a corresponding resolution). This is a tripwire per `pro/MANIFESTO.md` — a question that won't die on its own needs to be escalated, not left to age quietly.

### 7. Decision density (spot check, not a hard FAIL)

Count explicit decisions per major section — a decision is a sentence with a "will," a number, or a named owner. Flag any section that is pure description with zero decisions ("we will explore options" is not a decision). This one is advisory: report it, don't block on it alone.

### 8. ICP defined — structural, not demographic (gate)

FAIL if there is no target-user / ICP section, or if the user is defined by firmographics/demographics alone (role, company size, age, geography) with no **structural condition** — the behaviour or constraint that makes them a distinct segment. Per the manifesto ICP gate: "a persona with demographics and a stock photo is not an ICP." Quote the section. Then check the five ICP fields are each identifiable — **Job** (JTBD), **Trigger**, **Context**, **Current workaround**, **Switching cost** — and FAIL, naming every field that is absent or left as a placeholder. This is a gate failure, not a hygiene failure: a missing ICP means the PRD should not have been written yet.

### 9. North Star defined (gate)

FAIL if the doc names no North Star metric — a single user behaviour that equals real value delivered, distinct from a vanity count. A Success Criteria table with five KPIs but no designated North Star is a FAIL: the author must name which row is the North Star, or state it separately, with what "good" looks like and how it is measured. "Improve engagement" is not a North Star; "the user completes [value action] each week" is.

### 10. Aha Moment defined (gate)

FAIL if there is no named, measurable, time-bound activation event in the form "[User type] [specific action] within [timeframe]" (manifesto examples: Slack — team sends 2,000 messages; Facebook — 7 friends in 10 days). "Users find value quickly" is a FAIL. If the event and its timeframe cannot be quoted from the doc, it fails — per the manifesto, that means it belongs back in DISCOVER, not in a PRD.

## Output format

Report as a table: Check | Result | Location | Fix owner (author / prd-writer / needs a discovery step back).

End with one line: **READY** (all hard checks pass) or **NOT READY** (N hard failures — list them in priority order). Gate failures come first: a missing **ICP, North Star, or Aha Moment** (checks 8–10) outranks even placeholders, because they mean DEFINE was never legitimately entered — the manifesto gate refuses generation without them. Then placeholders and missing non-goals, then the rest.

Do not soften a NOT READY into "mostly ready" — the milestone this gates ("PRD review finished by all stakeholders," "Development starts") either has a real green light or it doesn't.
