# [Title]

**DRI (Directly Responsible Individual):** [Name] | **Pod:** [Team / Pod name]
**Status:** Discovery / Define / In Build / Launched / Postmortem | **Created:** [YYYY-MM-DD] | **Last Updated:** [YYYY-MM-DD]
**Figma:** [link] | **ERD / Engineering Docs:** [link] | **Mixpanel / Looker:** [link]

---

## A Note to the Team Reading This

I wrote this to make your job easier, not to document mine. Every section tells you what I found, why I made the choices I made, and what I need from you. If something is unclear, that is a gap in this document and I want to fix it. Please ask.

---

> **Confidence Tags** — use these on every claim in Problem Alignment and Success Criteria. A PRD with no 🔵 is either trivial or dishonest.
> 🟢 Confirmed by primary research (interviews, session recordings, direct data pulls you ran yourself)
> 🟡 Confirmed by secondary research (Mixpanel/Looker dashboards someone else built, analyst reports, support tickets)
> 🔵 A direction you believe in but have not yet proven. Treat it as a hypothesis, not a fact.
> 🔴 Evidence has since contradicted this. Keep it visible — don't delete disproven claims, strike them through and say why.

---

## 😇 Problem Alignment

### The Problem

[Describe the problem or opportunity. Why does it matter to users and to the business? What insight are you operating on? State what you are explicitly *not* trying to solve here — the rest of the doc will assume this boundary.]

**Bad:** "Users are dropping off during onboarding."
**Good:** "38% of users abandon onboarding at the payment-method step (🟢 Mixpanel funnel, last 30d). Exit interviews (n=12, 🟢) show they don't trust the app with card details before seeing any value. We are not solving general onboarding friction — only the trust gap at this one step."

### High-Level Approach

[One or two sentences. Enough for the reader to picture the solution space and roughly gauge scope. Not a feature list — that's the Solution section.]

### Goals & Success

[What does the world look like when this is solved? Write it as a mini press release. Non-tangible outcomes belong here — the Success Criteria table below is where you make them measurable.]

### Success Criteria

Every goal above becomes a number here. No metric ships without a baseline — "we'll see" is not a target.

| Metric | Baseline | Target | Type | Confidence | Result | Comments |
|---|---|---|---|---|---|---|
| [Metric 1] | [A] | [X% increase] | Primary | 🟢/🟡/🔵 | | |
| [Metric 2] | [B] | [Y% increase] | Secondary | | | |
| [Metric 3] | [C] | [Z% drop] | Secondary | | | |
| [Metric 4] | [D] | [No more than T% drop] | Guardrail | | | |

**Guardrail rule:** at least one guardrail metric is mandatory. If nothing can go wrong from shipping this, you haven't thought about it hard enough.

### Non-Goals

[List what you are explicitly not addressing, and why. "Out of scope for V1, revisit in Q3" is a reason. "Didn't think about it" is not — if you haven't thought about it, it's an open question, not a non-goal.]

---

## 🤝 Solution

### Key Features

[Ordered list of what you're building, with priority (P0/P1/P2) if relevant. Say what you're deliberately not building alongside what you are — draw the perimeter, don't just fill the middle.]

### Future Considerations [optional]

[Features saved for later that inform how you build now — e.g. a P2 you're leaving a hook for in the schema today.]

### Key Flows

[Mocks, embeds, clickthroughs, organized by user journey. A reader should be able to walk away understanding how the product works end to end — not just see disconnected screens.]

### Key Logic

[Rules that guide design and engineering. Write out edge cases explicitly rather than trusting design to show every permutation. If a rule has an exception, state the exception here, not in a Slack thread later.]

---

## 🚀 Execution Plan

Milestones aren't limited to engineering. A plan/doc/decision that's critical path (e.g. "final PRD by [date]") is a milestone — track it with the same visibility and accountability as a deploy.

### Key Milestones

| Milestone | Owner | Planned Date | Actual Date | Comments |
|---|---|---|---|---|
| Product solution finalized | | | | |
| Tech solution finalized | | | | |
| Design finalized | | | | |
| Ops workflows finalized | | | | |
| PRD completed | | | | |
| PRD and designs handed over | | | | |
| PRD review finished by all stakeholders | | | | |
| Changes made to PRD + requirements locked | | | | |
| Premortem | | | | See `/pro/README.md` — this milestone is a real working session, not a formality. Run it before Development starts, not after. |
| Development starts | | | | |
| Engg milestone 1 | | | | |
| Engg milestone 2 | | | | |
| Development ends | | | | |
| Go-ahead from QA | | | | |
| Go-ahead from Data QA | | | | |
| Go-ahead from Design QA | | | | |
| Go-ahead from Product QA | | | | |
| Go-ahead from Tech QA | | | | |
| Public Launch | | | | |
| Postmortem | | | | Use `/postmortem/postmortem-template.md`. Schedule this now, not after launch — it's the milestone teams skip most. |

### Operational Checklist

| Team | Prompt | Y/N | Action (if yes) | Done? |
|---|---|---|---|---|
| Analytics | Do you need additional tracking? | | | |
| Localisation | Does this need to be translated and launched in multiple countries? | | | |
| Internal Ops | Do we need to train internal teams and create documentation/training materials? | | | |
| Partners | Will this impact any external partners? | | | |
| Legal | Are there potential legal ramifications? | | | |
| Risk | Does this expose risk vectors? | | | |

### Marketing / GTM

[Tactics and strategy for distributing this to the intended audience — typically a press release plus a marketing plan. If there's no GTM motion, say so explicitly rather than leaving it blank; a blank section reads as "forgot," not "not applicable."]

---

## 🛠️ Working Section

### Meeting Notes

MoMs from every meeting related to this project. Keep them here, not scattered across Slack threads someone will have to reconstruct later.

**MoMs: [Date]**
[notes]

### Changelog

Key decisions or updates, for future reference — include who was involved and link to the notes doc. Once this PRD is approved, move this section above Problem Alignment so changes are visible without scrolling.

| Change | Date | People | Comments |
|---|---|---|---|
| | | | |

### Open Questions

[Anything you don't know yet. An open question that's been sitting unresolved for two sprints is a tripwire — see `/pro/MANIFESTO.md`. Don't let this list go stale; either resolve it or escalate it.]
