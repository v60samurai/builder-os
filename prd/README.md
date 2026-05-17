# PRD Templates

Two templates. Pick one based on stakes and time, not vibes.

| File | Length | Use when |
|------|--------|----------|
| [`lean-prd.md`](./lean-prd.md) | 15KB, ~500 lines | Cohort submission, 1-2 week sprint, internal alignment, MVP scoping |
| [`full-prd.md`](./full-prd.md) | 48KB, ~1100 lines | Shipping to real users, fundraising context, multi-month build, hiring decisions ride on it |

## Both templates share

- **Confidence tags**: 🟢 (primary research), 🟡 (secondary), 🔵 (hypothesis), 🔴 (disproven). Force yourself to mark every claim.
- **Discovery before solution**: problem tension, evidence, "say-do gap," competitive landscape come *before* features.
- **"What we left out and why"**: a section that explicitly names rejected scope. Prevents post-launch "why wasn't X in v1?" regret.
- **The chain**: P1 → P2 → P3 → failure mode. Forces root-cause thinking, not feature lists.

## Lean vs Full

The lean template compresses every section to its smallest defensible form (1-2 tables, 1-2 paragraphs). Use it when the decision-maker reading it has 20 minutes.

The full template gives you space for primary research quotes, multiple personas, full competitive matrices, and a roadmap to phase 4+. Use it when you're committing months of build time and the document needs to survive scrutiny.

When in doubt: start with lean. Promote to full only if a section needs more room.

## See it filled out

`examples/` (coming in v0.2.0): the Founders CRM PRD, written in both lean and full forms, so you can read a worked example end-to-end before filling your own.
