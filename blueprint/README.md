# Blueprint

> You've locked the PRD (what + why). The Blueprint is how you build it — and the step-by-step to v0.

One document, three parts. It replaces the old ERD + Implementation Guide + Session Playbook split (those are in [`../archive/`](../archive)) with a single source of truth so the build never reads from two docs that disagree.

| Part | Was | What it holds |
|------|-----|---------------|
| **1 — The Spec** | the ERD | the ⭐ ONE structural decision, schema, API contracts, backend/frontend changes, chunk map + boundary contracts, open decisions |
| **2 — Technical Reference** | the Implementation Guide | tech stack, file structure, complete env-var list, system design, integrations (auth/email/payments/AI/analytics), security checklist, performance targets, CI/CD + deploy topology, V1 limitations |
| **3 — Build Plan to v0** | the Session Playbook | pre-flight, session-by-session build with done-checks, deploy checkpoints, resilience + functional-coverage audit gates, the numbered ship sequence, week-1 tracking |

## Two modes — pick one in the header

- **greenfield** — a new app. Derive the schema from the prototype's fixtures; run the full linear session arc.
- **extends-existing** — a feature inside an existing repo. Mirror a known-good pattern-source feature 1:1, spec only the deltas, build chunk-by-chunk (E1 → E2).

## The gate

Every load-bearing claim carries a confidence tag. The ⭐ structural decision must be resolved (not a 🔵 hypothesis), boundary contracts and the env list must be complete, and every build session must have a verifiable done-check. Run `/blueprint-gate` before the first line of code, and again before ship. A red gate means no green light — the decision to start building either exists or it doesn't.

## Skills

- `/blueprint-writer` — fill this template from a locked PRD.
- `/blueprint-gate` — pass/fail check before build and before ship.
- `/blueprint-runner` — drive the Part 3 build sessions with done-checks and checkpoints enforced.

Start from [`blueprint-template.md`](./blueprint-template.md).
