# Postmortem: [Product / Feature Name]

**PRD:** [link] | **Shipped:** [date] | **Postmortem run:** [date] | **Owner:** [Name]

> LEARN mode. The job is to measure against what you said would happen, extract one lesson worth remembering, and write it down before the team's memory of the decision goes soft. Forbidden here: shipping the next thing before this is written. If you're already mid-way into planning what's next, finish this first.

---

## Schedule This Now, Not After

The most common failure of this template isn't writing it badly — it's never writing it, because by launch day everyone's already moved to the next fire. Put a date on the calendar for this at the same time you set the launch date, not after.

---

## Results Against Success Criteria

Pull the Success Criteria table straight from the PRD. Don't reword the targets after the fact to make them look closer to what happened.

| Metric | Baseline | Target | Actual | Hit / Miss | Confidence |
|---|---|---|---|---|---|
| [Metric 1] | | | | | 🟢/🟡 |
| [Metric 2] | | | | | |
| [Guardrail] | | | | | |

**If a metric missed:** say by how much and your best-evidenced reason why — not a guess dressed as an explanation. "We don't know" is an acceptable answer here. "It probably was X" without evidence is not.

## What Surprised Us

[The findings that weren't in the PRD's assumptions. This is usually the most valuable section — if nothing surprised you, either the discovery work was unusually good or nobody's being honest.]

## What We'd Change

[If you started this project today with what you know now, what's different? Be specific: a different metric, a different scope cut, a different rollout plan — not "we'd move faster."]

## The One Lesson

Not five lessons. One. The thing you want a teammate to internalize even if they read nothing else in this document.

> [State it as a rule, not an anecdote. "We should" is weaker than "Do X when Y." Example: "Don't ship a guardrail metric without a pre-agreed kill threshold — we found out the acceptable drop was 'whatever we can explain away' only after it dropped."]

## Decision Record

- **Iterate:** [What's the next bet on this surface, if any]
- **Scale:** [If this worked, what does scaling it require]
- **Retire:** [If this didn't work, what gets rolled back, and by when]

## Annex: New Examples From Real Traffic

[If this fed an AI/behavior-contract PRD, add real good/bad/reject examples surfaced in production here. This is how the next PRD's examples section starts from real data instead of imagined cases.]

---

## Exit Criteria for This Stage

- [ ] Every Success Criteria metric has an Actual value, not blank
- [ ] The One Lesson is written as a rule, not a story
- [ ] Decision Record has an explicit Iterate/Scale/Retire call — "TBD" on all three means this postmortem isn't done
- [ ] If this abstracts into a cross-project rule, it's been added to the team's shared lessons doc, not just this file
