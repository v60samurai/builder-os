# [Title — product or initiative name]

**DRI (Directly Responsible Individual):** [Name] | **Pod:** [Team / Pod name]
**Status:** Discovery / Define / In Build / Launched / Postmortem | **Created:** [YYYY-MM-DD] | **Last Updated:** [YYYY-MM-DD]
**Figma:** [link, or "none — code-first"] | **ERD / Engineering Docs:** [link to `erd/erd-template.md` once written] | **Analytics (your tool — Mixpanel / Amplitude / PostHog / …):** [link, or "not wired — wiring is a P0 milestone, see §14"]

**Document lineage:** [Every related doc, one line each: operational spec, discovery/evidence records, decision log, prior PRD versions. State which doc wins on what — e.g. "evidence lives in the knowledge base and is *referenced*, not restated; this doc is the execution layer." Facts stated in two places WILL drift. One home per fact.]

---

## A Note to the Team Reading This

I wrote this to make your job easier, not to document mine. Every section tells you what I found, why I made the choices I made, and what I need from you. If something is unclear, that is a gap in this document and I want to fix it. Please ask.

If you read one thing: **Success Criteria** (your numbers), **Key Logic** (the edge cases that will otherwise land in Slack), and **Key Milestones** (your dates).

---

> **Confidence Tags** — use on every claim in Parts A and the Success Criteria. A PRD with no 🔵 is either trivial or dishonest.
> 🟢 Confirmed by primary research (interviews you ran, experiments, direct data pulls, repo audits)
> 🟡 Confirmed by secondary research (dashboards someone else built, analyst reports, competitor pricing, support tickets)
> 🔵 A direction you believe in but have not yet proven. Treat it as a hypothesis, not a fact.
> 🔴 Evidence has since contradicted this. Don't delete disproven claims — strike them through, keep them visible, and say what corrected them.

> **Honesty rules** (non-negotiable, learned the hard way):
> 1. **No fabricated numbers.** No interview sample you didn't run, no market size you didn't source, no annualised dollar impact derived from a voided assumption. "Not formally sized 🔵 — deliberate, because [reason]" beats an invented figure a sharp reviewer will torch.
> 2. **Baselines are honest zeros** where the product has never been deployed. "We'll see" is not a target; a missing baseline is a named gap.
> 3. **Name the research gaps explicitly** ("no formal user interviews have run yet — that is a named gap, not a hidden one; the planned study is [ref]").
> 4. **Prioritisation is Impact vs Effort, shown, not asserted.** Every scoping call names both sides in the table where the call is made.

---

## Changelog

Key decisions and updates. Lives at the top so changes are visible without scrolling. Link each row to the decision-log entry or MoM, don't restate it.

| Change | Date | People | Comments / link |
|---|---|---|---|
| | | | |

---

# PART A — WHY (Problem Alignment)

---

## 1. The Problem

[The problem or opportunity. Why it matters to users AND to the business. The insight you are operating on. Then state what you are explicitly **not** trying to solve — the rest of the doc assumes this boundary.]

**Bad:** "Users are dropping off during onboarding."
**Good:** "38% of users abandon onboarding at the payment-method step (🟢 Mixpanel funnel, last 30d). Exit interviews (n=12, 🟢) show they don't trust the app with card details before seeing any value. We are not solving general onboarding friction — only the trust gap at this one step."

### 1.1 Real User Scenario

[2-3 paragraphs. Who the user is, their concrete context (numbers: how many things they manage, across which channels, with which tools), the workflow path that breaks, and the structural reason it breaks — not a motivational one.]

### 1.2 Observable Breakdown

[The predictable failure cycle when the user attempts today's best available fix: setup enthusiasm → effort demanded at the wrong moment → fatigue → partial usage → abandonment by week X. Then one sentence on why this is structural: the tool demands effort exactly when the user has none to give.]

### 1.3 Evidence

| Evidence | Magnitude | Source | Confidence |
|----------|-----------|--------|-----------|
| [Core failure frequency] | [X%] | [Source] | 🟢/🟡 |
| [User cost] | [Amount/time] | [Source] | |
| [Disproven prior claim — keep it visible] | ~~[old number]~~ → [corrected] | [What corrected it] | 🔴→🟢 |

### 1.4 Why Now

[What changed — market, technology, org capability, user behaviour — that makes this urgent AND newly solvable. If nothing changed, say why the timing is still right.]

> **Key Insight**
>
> [The sharpest version of the truth — the sentence the reader could not have written before this section. Not a summary.]

---

## 2. Target User

**Segment:** [Stage, size band, geography, the structural condition that defines them — the behaviour/constraint, not the demographic.]

| Behaviour | Description | Product implication |
|-----------|-------------|---------------------|
| [Trait 1] | [What this looks like] | [What it forces the product to be] |
| [Trait 2] | | |

[One sentence: these traits are not fixable with better onboarding — they define a different product requirement.]

**Explicit exclusions:** [Who is out of scope, one-line reason each.]

**Say-Do Gap** (skip only if you truly have no behavioural data):

| What Users Say | Reality (observed) | Source |
|---------------|--------------------|--------|
| "[Statement]" | [Measured behaviour] | 🟢/🟡 |

---

## 3. Existing Ecosystem & Why It Fails

**Baseline tools users actually use:** [The real benchmark is usually an informal workaround (spreadsheet, screenshots, pinned comments) — zero setup, zero value — not the category leader. Name it and what it costs.]

| Tool / Tier | What Works | What Fails | Why It Cannot Be Fixed (architectural ceiling) |
|-------------|-----------|------------|----------------------|
| [Incumbent] | | | [Structural: business model / content model / platform constraint] |
| [Category tools] | | | |
| [Workaround] | | | |

**Architectural ceilings:** [2-3 named constraints no competitor can escape — these are where your wedge lives.]

---

## 4. Business Impact

| Problem | Operational Effect | Estimated Impact | Confidence |
|---------|-------------------|-----------------|------------|
| | | | |

**Total impact:** [Quantify only what survives the honesty rules. If the honest answer is "the pilot exists to size this," say that.]

---

## 5. Problem Prioritisation (Impact vs Effort)

| Problem | Description | Impact | Effort to attack | Priority |
|---------|-------------|--------|------------------|----------|
| P1 | | HIGH/MED/LOW (against the binding constraint + metrics) | HIGH/MED/LOW (against THIS team's size and window) | Attack now / Instrument now / Defer |
| P2 | | | | |

**Selected chain:** P[x] → P[y] → P[z] → [the failure mode it ends]. [Why this chain: impact-to-effort ratio + chain position — nothing downstream is measurable until the first link resolves.]

**What we are not solving and why:**

| Problem | Reason excluded (structural, not "later") |
|---------|----------------|
| | |

---

## 6. Narrowed Problem Statement & Key Assumptions

[One paragraph: target user + context + structural failure + consequence + why existing solutions can't + what kind of approach is needed. Then one editorial sentence — e.g. "Every existing tool requires the user to adapt to the tool; the solution must adapt to the user."]

| Assumption | Evidence | Confidence |
|-----------|----------|------------|
| [Load-bearing belief 1] | [Basis] | 🟢/🟡/🔵 |
| | | |

---

## 7. High-Level Approach

[One or two sentences. Enough to picture the solution space and gauge scope. Not a feature list — that's §10.]

## 8. Goals & Success

[The world when this is solved, written as a mini press release. Non-tangible outcomes live here; the table below makes them measurable.]

## 9. Success Criteria

Every goal above becomes a number here. No metric ships without a baseline. Every Primary metric carries a **kill signal** — the number at which you stop and diagnose rather than keep building.

| Metric | Baseline | Target (window) | Kill Signal | Type | Confidence | Hypothesis | Result | Comments |
|---|---|---|---|---|---|---|---|---|
| [Metric 1] | | | < [Y] | Primary | 🔵 | H1 | | |
| [Metric 2] | | | | Primary | | H2 | | |
| [Leading indicator / Aha moment] | | | | Secondary | | | | |
| [North Star, if instrumented not gating] | | | [kill-switch n] / [real-read n — don't trust the rate below this sample] | Secondary | | | | |
| [Guardrail 1] | | [no worse than T] | | Guardrail | | | | |

**Guardrail rule:** at least one guardrail metric is mandatory. If nothing can go wrong from shipping this, you haven't thought about it hard enough.
**Sample-size rule:** any rate metric names two n's — an early kill-switch (obviously dead) and a real-read floor (trustworthy). A rate at n=50 with a 20-point confidence interval is a vibe, not a read.

## 10. Hypotheses

The bets under the metrics, stated as falsifiable sentences. This table is what the postmortem grades.

| H# | Hypothesis | Kill Signal | Gate For |
|----|-----------|-------------|----------|
| H1 | [Core adoption/behaviour bet] | [Specific number] | [What dies with it — "the entire GTM," not "we iterate"] |
| H2 | | | |

## 11. Non-Goals

[What you are explicitly not addressing, and why. "Out of scope for V1, revisit trigger: [signal]" is a reason. "Didn't think about it" is not — that's an open question (§21). Include the *never-in-this-form* items with their review gate (e.g. "open self-serve intake — legal review is the gate to any change").]

---

# PART B — WHAT (Solution)

---

## 12. Product Concept

### The Inversion

[What makes this a different product, not a better version of the category. One table:]

| Every [category] tool today | [This product] |
|------------------------|----------------|
| [Current paradigm] | [New paradigm] |
| | |

### Architecture in One Sentence

[Component A] does [X] passively. [Component B] makes it visible. [What the user does NOT have to do.]

### Non-Negotiables

| Constraint | What It Means | Research Basis |
|-----------|--------------|---------------|
| [Constraint 1] | [Design implication] | [Evidence ref + tag] |
| | | |

### Design Rationale — [The Key Choice]

[Why this architecture and not the two obvious alternatives. 3-5 bullets: technical constraint, friction comparison, workflow alignment, compliance/risk boundary.]

## 13. Key Features (Impact vs Effort)

**P0 — the release cannot ship without these:**

| # | Feature | Description | Impact | Effort | Owner |
|---|---------|-------------|--------|--------|-------|
| 1 | | | | | |

**P1 — strengthens it, doesn't gate it:** [same table]

**P2 — staged behind [named review/trigger]:** [same table — nothing here is committed until the trigger fires]

**Deliberately not building** (draw the perimeter, don't just fill the middle): [list, one-line reason each — mirrors §11.]

### Future Considerations [optional]

[Features saved for later that shape how you build NOW — e.g. a P2 you're leaving a schema hook for today; plumbing shared by three candidate features that should be built as one system if any lands.]

## 14. Instrumentation & Event Spec

First-class, not a fast-follow — an uninstrumented launch burns the cohort/window for nothing. Wiring this is a P0 milestone in §18.

| Event | Properties | Fires when | Answers which metric/hypothesis |
|-------|-----------|-----------|--------------------------------|
| | | | |

[Attribution rules that make the data readable — e.g. per-channel link tagging. If a metric in §9 has no event here, one of the two tables is wrong.]

## 15. Key Flows

[Per journey, numbered steps a reader can walk end to end — not disconnected screens. Mocks/clickthroughs if they exist; if design is code-first, say where visual truth lives. One flow block per actor: primary user, secondary user, internal/ops.]

## 16. Key Logic

Rules and edge cases, stated here so they don't get decided in a Slack thread later. If a rule has an exception, the exception lives in this table.

| # | Rule | Edge case / exception |
|---|------|----------------------|
| 1 | | |

## 17. User Stories

Organised by job-to-be-done, not by feature. IDs stable across docs.

### Job 1: [Name]

| # | Story | Acceptance Criteria (testable) | Pain point it traces to |
|---|-------|-------------------|------------|
| U1 | As a [user], I want [action] so that [outcome]. | (1)… (2)… (3)… | [§1/§2 ref] |

[Repeat per job.]

## 18. Trade-offs, Limitations, Dependency Risks

**What this product does not solve:**

| Area | Why out of scope (honest) |
|------|-----------------|
| | |

**Known trade-offs:**

| Trade-off | What We Gave Up | Why |
|-----------|----------------|-----|
| | | |

**Dependency risks:** [Platform policy, third-party APIs, team capacity, partner responsiveness — each with the impact if it bites and the early-warning signal.]

## 19. The Moonshot [optional — cut for small features]

[One paragraph: what this moves the product from and to. A How-It-Works table (background / on-demand / intelligence tracks). **Why not now** (the data/surface/validation dependencies). **If validated:** the flywheel and the moat — why a general-purpose tool can't replicate it.]

---

# PART C — HOW (Execution)

---

## 20. Key Milestones

Milestones aren't limited to engineering — a critical-path doc, decision, or review is a milestone with the same visibility. Blank dates are the first sync's job, not a permanent state.

| Milestone | Owner | Planned Date | Actual Date | Comments |
|---|---|---|---|---|
| Requirements locked (this PRD reviewed + changes folded) | DRI | | | |
| Product / tech / design / ops solutions finalized | | | | |
| **Premortem** | All | | | A real working session, not a formality. Run BEFORE development starts. |
| Instrumentation live + attribution verified | | | | Gate for launch, per §14 |
| Development milestones 1..n | | | | |
| QA go-aheads: functional / data / design / product | | | | Data QA = events verified end-to-end, not "code merged" |
| Launch / pilot wave 1 | | | | |
| Kill-switch checkpoint (early read on Primary metrics) | DRI | | | §9 kill signals |
| Full read at [window] | DRI | | | Decides next phase |
| **Postmortem** | All | | | Schedule NOW — the milestone teams skip most. Grades §10 hypotheses. |

## 21. Operational Checklist

| Team | Prompt | Y/N | Action (if yes) | Done? |
|---|---|---|---|---|
| Analytics | Additional tracking needed? | | | |
| Localisation | Multiple languages/countries? | | | |
| Internal Ops | Training / documentation for internal teams? | | | |
| Partners | External partners impacted? | | | |
| Legal | Legal ramifications? Name the *trigger* that upgrades a deferred review into a required one | | | |
| Risk | New risk vectors (platform policy, abuse, brand)? | | | |

[A "N" needs one line of reasoning. A blank reads as "forgot," not "not applicable."]

## 22. Marketing / GTM

[The motion, the owner, the pitch artifact, the channels — or the explicit sentence "no GTM motion because [reason]." If launch is a pilot, the pilot IS the GTM: say who converts whom, with what, and what the pitch script decides on the spot.]

## 23. Rollout & Phasing

**[Phase 1 / V1]** *(now)*: [scope, in one tight list — everything here maps to a P0/P1 row in §13]
**[V-next]** *(after [named trigger] validates)*: [what unlocks and what evidence unlocks it]
**[Later — parked bets]**: [with the signal that would un-park each]

---

# PART D — WORKING SECTION

---

## 24. Meeting Notes

MoMs from every meeting on this project — here, not scattered across Slack threads someone will reconstruct later. Link transcripts.

**MoMs: [Date]** — [attendees; outcomes in 2-3 lines; link to full record]

## 25. Open Questions

An open question sitting unresolved for two sprints is a tripwire — resolve it or escalate it. Don't list things you can answer from context.

| Question | Owner | Deadline / Trigger |
|----------|-------|--------------------|
| | | |

## 26. Decision Log Linkage

[Pointer to the standing decision log (one row per decision that cost >30 min or is hard to reverse). Don't restate decisions here — link them. If the project has no decision log, start one; the "reopen if" field is what stops relitigating.]

---

*Evidence sources: [links to the research/knowledge-base docs this PRD references — the facts live there, this doc borrows them.]*
