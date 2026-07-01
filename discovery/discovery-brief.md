# Discovery Brief: [Idea Name]

**Promoted from Idea Log:** [date] | **Owner:** [Name] | **Status:** Active / Disproven / Promoted to PRD

> DISCOVER mode. The job here is to find the real problem and grade the evidence for it — not to propose a solution. If you catch yourself designing a feature in this document, stop and move that thought to a PRD draft; it doesn't belong here yet.

---

## Confidence Tags

Use these on every claim below. A brief with everything tagged 🔵 hasn't done discovery — it's done brainstorming with extra steps.

🟢 Primary — you ran the interview, pulled the query, watched the session recording yourself
🟡 Secondary — someone else's data: a dashboard you didn't build, a support-ticket tag, an analyst report
🔵 Hypothesis — a belief, stated honestly as unproven
🔴 Disproven — evidence has since contradicted this; keep it, struck through, with the reason

---

## The Problem, As Best We Understand It

[One paragraph. Who has this problem, what does it cost them, how do you know it's real and not assumed.]

## ICP (Ideal Customer Profile)

A complete ICP is a structural condition, not a demographic. "25-34, urban, tech-savvy" is not an ICP — it's an audience. The structural condition is the thing that's *true regardless of who the person is* that makes them need this.

- **Structural condition:** [The behavior/constraint/situation that defines who needs this, independent of demographics]
- **Who's explicitly excluded, and why:** [If everyone qualifies, you don't have an ICP yet]

## Riskiest Assumption

Every plan rests on assumptions. Most are safe to leave untested. Exactly one is the assumption that, if wrong, invalidates everything downstream — name it.

- **The assumption:** [Stated as a falsifiable claim, not a hope]
- **Why this one, not the others:** [What makes it the load-bearing one — usually: hardest to reverse, most expensive to build around, or least tested so far]
- **Cheapest test that would falsify it:** [The smallest, fastest thing that could prove this wrong. If you can't think of one, you haven't understood the assumption yet.]
- **Test result:** [🟢/🟡/🔵/🔴 — fill in once run]

## Evidence

| Claim | Evidence | Source | Confidence |
|---|---|---|---|
| [Core problem exists] | [What you observed] | [Interview n=X / dashboard / report] | 🟢/🟡/🔵 |
| [Frequency / magnitude] | [Number] | [Source] | |
| [Current workaround fails] | [Observed behavior] | [Source] | |

## Steelman: The Strongest Case Against Doing This

[Before promoting this to a PRD, argue the other side properly — not a strawman. What would someone who thinks this isn't worth building say, and is their case actually wrong?]

## What Would Have to Be True

[For this to be worth a PRD, what must hold? List 2-4 conditions. If any is still 🔵 hypothesis with no test planned, that's the thing to resolve before promoting, not after.]

---

## Exit Criteria for This Stage

- [ ] Riskiest assumption named and evidence graded (not left at 🔵 with no plan to test it)
- [ ] ICP has a structural condition, not just a demographic
- [ ] Steelman argued honestly, not as a formality
- [ ] Decision made: promote to PRD (`prd/lean-prd.md`, `prd/full-prd.md`, or `prd/org-prd.md`), keep testing, or kill and log why

Promoting before these are checked is how teams end up two months into a build discovering the riskiest assumption was never actually tested — just assumed confident because it was written down.
