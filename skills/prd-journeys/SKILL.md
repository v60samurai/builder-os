---
name: prd-journeys
description: Generate complete user journey/flow documentation from a locked Builder OS PRD (prd/prd.md). Reads the PRD, interviews the user on gaps (personas, entry points, auth, failures, empty states), then writes a journeys.md next to the PRD with Mermaid flow diagrams per journey, a user-story traceability table, and a screen inventory with per-screen state matrix. Use whenever the user wants to map journeys, generate user flows, design flows from a PRD, or asks "what are the flows/screens" for a product — even if they just point at a PRD file. Also use to update an existing journeys.md after a PRD change. Not for visual design — the prototype (claude.ai JSX artifact) and stitch-prompt steps handle that downstream.
---

# PRD → User Journeys

Turn a PRD into a complete user journey/flow doc: real end-to-end journeys (not per-story fragments), every edge case placed where its consumer will find it, and a screen inventory the downstream steps pick up.

**Where this sits in the flow:** it's the step after the PRD and before the brand guide — `prd/prd.md` → **journeys.md** → brand → prototype → design → Blueprint. The screen inventory it produces is load-bearing downstream: the claude.ai JSX prototype builds those screens, the `stitch-prompt` step designs them, and the Blueprint's frontend change-list + chunk map (§7/§8) trace back to them. A missing or vague screen here surfaces as a hole three steps later.

Interview-first: PRDs always have holes. A wrong guess about who the user is or what happens on failure poisons every downstream artifact, so resolve gaps with the user *before* drafting — never draft on silent assumptions.

## Phase 0: Locate inputs

1. Find the PRD (`prd/prd.md`, or wherever the user points).
2. Read the PRD fully, plus any notes/docs it references or that sit alongside it and are clearly related.
3. Check for an existing journeys doc next to the PRD (`journeys.md` or `<prd-basename>.journeys.md`). If found → **update mode** (see below). If not → fresh generation.

Output path: same directory as the PRD. Name it `journeys.md`; if the directory holds multiple PRDs, use `<prd-basename>.journeys.md` so pairing stays self-evident.

## Phase 1: Gap interview

Walk this checklist against the PRD. For each item the PRD **already answers, skip it** — a thorough PRD means a short interview. For each gap, ask the user.

1. **Personas + goals** — who uses this, and what is each trying to accomplish. *Hard-blocking: do not draft anything until this is resolved.*
2. **Entry points** — how users arrive at each journey (nav, deep link, notification, cold open).
3. **Auth/permissions** — what's gated; what an unauthenticated/unauthorized user hits at a gated step.
4. **Failure handling** — payment/network/validation failures: retry policy, fallback destination.
5. **Empty & first-run states** — zero-data experience per major screen.
6. **Concurrency/staleness** — two tabs, expired session, data changed underneath (only if the PRD implies it).
7. **Exit & interruption** — abandonment mid-flow: what's saved, what's lost, resume behavior.
8. **Notifications/async re-entry** — anything that pulls the user back into a flow later.
9. **Platform constraints** — mobile/desktop divergence, offline (only if the PRD implies it).

Interview rules:

- **One question at a time.** Multiple questions at once are bewildering; wait for each answer.
- **Always include a recommended answer** with the one tradeoff that matters. The user should be able to reply "yes" to move fast.
- If the user says "you decide" or defers, choose, and log it as a decision marked *(deferred to skill)*.
- Record every Q&A — it becomes the `## Decisions` section of the doc.

## Phase 2: Draft the doc

### Decomposition

Journeys = **persona × top-level goal** (job-to-be-done), e.g. "New user: first booking", "Returning user: manage booking". Each journey is an end-to-end session slice, not a user-story fragment — real sessions cross many stories, and per-story flows duplicate shared segments like onboarding.

Coverage guarantee comes from the **story traceability table**: every user story in the PRD maps to the journey(s) that cover it. A story with no journey is a caught gap — go back to Phase 1 and resolve it before finishing.

### Edge cases: two-tier rule

Test: **does the edge case navigate the user somewhere else?**

- **Yes → inline.** It's a branch in that journey's Mermaid diagram + prose (payment fails → retry loop → fallback screen). These get reviewed by humans reading the flow.
- **No → state matrix.** Per-screen states (loading, empty, error+retry, permission denied) live in the screen inventory's state matrix. These get consumed by whoever builds the screens.

Never bury a flow-changing case in the appendix, and never bloat a diagram with 30 per-screen state nodes.

### Doc template

Use this structure exactly:

```markdown
# <Product> — User Journeys

Source PRD: <relative path> (<date generated/updated>)

## Personas
One short paragraph each: who they are, what they want.

## Journeys

### J1 — <Persona>: <Goal>
**Entry points:** <how they arrive>

​```mermaid
flowchart TD
    <screens as nodes, decisions as diamonds, edge-case branches labeled>
​```

**Steps:** numbered prose walkthrough. Inline edge-case branches called out
where they occur, with the condition and destination.

**Exit states:** success exit(s) + abandonment/interruption behavior.

### J2 — ...

## Story Traceability

| Story | Journey(s) | Notes |
|-------|------------|-------|

Every PRD story appears here. No orphans.

## Screen Inventory

One entry per screen the journeys imply. This is the handoff surface for the
prototype + design steps and the Blueprint's frontend section — loose format, no rigid schema.

### S1 — <Screen name>
**Purpose:** one line. **Appears in:** J1, J3.
**Contents:** what's on it (elements/data, not visual design).

| State | Behavior |
|-------|----------|
| Loading | |
| Empty | |
| Error | + retry path |
| <permission/other as relevant> | |

## Decisions

| # | Question | Answer | Date |
|---|----------|--------|------|

Interview Q&A log. Doubles as design rationale and powers update mode.
```

Mermaid conventions: `flowchart TD`, one diagram per journey, screens as rectangles, decision points as diamonds, edge-case branches with labeled arrows (`-->|payment fails|`). Keep each diagram readable — if a journey needs more than ~20 nodes, it's probably two journeys.

### Quality check before finishing

- Every PRD user story appears in the traceability table.
- Every screen referenced in any diagram exists in the screen inventory.
- Every screen has its state matrix filled (or a stated reason a state doesn't apply).
- Every interview answer is in `## Decisions`.
- No silent assumptions anywhere — anything not from the PRD or the interview doesn't belong in the doc.

## Update mode

When a journeys doc already exists and the PRD changed:

1. Read the existing doc, especially `## Decisions`.
2. Re-walk the Phase 1 checklist against the *new* PRD. Skip anything a logged decision already answers.
3. **Flag contradicted decisions** — if a logged answer now conflicts with the PRD, ask the user which wins. Never silently keep a stale decision, never silently overwrite one.
4. Interview only on genuinely new gaps.
5. Patch the doc surgically: touch only journeys/screens/rows the PRD change affects. Preserve the user's manual edits everywhere else.
6. Append new Q&A to `## Decisions`; update the source-PRD date line.
