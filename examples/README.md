# Examples

Real filled-out templates from shipped products. The fastest way to understand what "good" looks like for each template is to read one end-to-end before you fill your own.

## What's here

### Founders CRM (PRD side)

A CRM built for early-stage founders who manage sales personally. Demonstrates the PRD discipline (confidence tags, say-do gap, "what we left out") end to end. These two examples were written in the earlier `lean-prd`/`full-prd` shapes (now in [`../prd/archive/`](../prd/archive)) — the *discipline* they show is identical to the current `prd/prd.md`; only the section layout differs.

| File | What it shows |
|------|---------------|
| [`founders-crm-lean-prd.md`](./founders-crm-lean-prd.md) | The PRD in the earlier lean shape (now `prd/archive/lean-prd.md`). ~576 lines. Shows the discipline compressed for a quick bet. |
| [`founders-crm-full-prd.md`](./founders-crm-full-prd.md) | Same product in the earlier full shape (now `prd/archive/full-prd.md`). ~1,145 lines. Shows the discipline at maximum depth. |
| [`founders-crm-prd.docx`](./founders-crm-prd.docx) | The original source PRD (DOCX), pre-template. |
| [`founders-crm-screenshot.png`](./founders-crm-screenshot.png) | Product screenshot from the same project. |

### Coach (build side)

A 35-minute live-build demo product whose kill shot is swapping a persona file (voice = file, not config). Demonstrates the full session playbook, end to end.

| File | What it shows |
|------|---------------|
| [`coach-implementation-guide.md`](./coach-implementation-guide.md) | Filled into `sessions/IMPLEMENTATION_GUIDE.md`. ~706 lines. The technical source of truth: architecture, file layout, env wiring, KV layout, auth gate, deploy order. |
| [`coach-session-playbook.md`](./coach-session-playbook.md) | Filled into `sessions/SESSION_PLAYBOOK.md`. ~566 lines. The timed, linear build script: 7 sessions, 30 minutes, each with a time budget and done-check. |
| [`coach-final-push.md`](./coach-final-push.md) | Filled into `sessions/FINAL_PUSH.md`. ~315 lines. The "Studio Swap" choreography and demo polish for the live audience moment. |

Coach's companion PRD and Brand Guide are not included in this bundle (they live in the Coach project repo). The docs reference them with `_italic placeholders_` where the links would go.

### Other reference material

| File | What it is |
|------|------------|
| [`cohort-case-study.docx`](./cohort-case-study.docx) | Cohort 7 case study reference. |

## How to read these

If you're new to Builder OS, read in this order:

1. `founders-crm-lean-prd.md` first. Get the feel for confidence tags, "say-do gap," and "what we left out."
2. `coach-session-playbook.md` next. See how a real session playbook stays timed and gate-checked.
3. `coach-implementation-guide.md` and `coach-final-push.md` for the depth.

Then open the actual templates in `prd/`, `brand/`, `sessions/` and fill your own.
