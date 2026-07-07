# PRD Template

One template. Scale it down for small bets by cutting optional sections — don't switch to a different template.

| File | What it is |
|------|-----------|
| [`prd.md`](./prd.md) | The BuilderOS PRD. Discovery discipline (evidence, say-do gap, Impact-vs-Effort) up front; kill signals + sample-size rules + guardrails on every metric; a hypotheses table the postmortem grades; non-goals, instrumentation, key-logic edge cases, phasing, and decision-log linkage. Phase-split — Phase 1 = min usable, later phases noted, not spec'd. |
| [`archive/`](./archive) | Earlier templates (`lean-prd`, `full-prd`, `org-prd`), kept for reference. Superseded by `prd.md` — don't start new work from these. |

**Why one:** three templates was a menu you had to arbitrate before writing a line. `prd.md` (formerly `org-prd-v2`) folds the discovery rigor of the old lean/full into the org PRD's operational spine, so a single template covers solo bets and pod work — a small feature just cuts the optional sections (the Moonshot, secondary GTM) rather than reaching for a lighter file.

## What the template enforces

- **Confidence tags** — 🟢 primary / 🟡 secondary / 🔵 hypothesis / 🔴 disproven, on every claim. `prd-gate` fails an untagged claim.
- **Discovery before solution** — problem tension, evidence, say-do gap, why the ecosystem fails, come *before* features.
- **Non-goals** — explicit rejected scope. Prevents post-launch "why wasn't X in v1?"
- **Guardrail metric + kill signals** — every metric has a threshold and a response owner, not just a target.
- **Phase-split** — Phase 1 is the minimum usable set; later phases are named at a high level so the schema/architecture don't block them, not detailed.

## The chain to build

PRD (this) → [`../erd/`](../erd) (the engineering spec — schema, API, chunk map) → [`../sessions/`](../sessions) (the build playbook). The PRD's phase-split and the ERD's chunk map are what the session playbook builds against.

## Skills

- [`/prd-writer`](../skills/prd-writer) — write or review the PRD.
- [`/prd-updater`](../skills/prd-updater) — fold new information into an existing PRD without an "update note."
- [`/prd-gate`](../skills/prd-gate) — check the PRD is DEFINE-exit-ready before build.

See [`../pro/README.md`](../pro/README.md) for the full 5-mode pipeline.
