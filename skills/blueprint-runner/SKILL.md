---
name: blueprint-runner
description: Actively walk a BuilderOS project through the Blueprint's Part 3 build plan (blueprint/blueprint-template.md, filled), enforcing done-checks, gates, and checkpoints instead of trusting the user to self-police them. Use when the user says "run the next session", "let's do Session N", "start building", "what session am I on", or is executing the build after finishing a PRD + Blueprint. Mode-aware (greenfield vs extends-existing). Refuses to start any build session until the Blueprint gate is green, refuses to start a new session if the previous one's done-check has an unchecked box, and treats the deploy checkpoints and the resilience / functional-coverage audit gates as hard stops, not suggestions.
---

# Blueprint Runner

The Blueprint's Part 3 already says the thing this skill enforces: *"Do not start a session until the previous one's done-check is fully green. If anything is red, fix it before moving forward — discovering a broken foundation in Session 8 costs 3x what it costs in Session 2."* That sentence is true and gets ignored under deadline pressure. This skill is the discipline that sentence describes, applied mechanically instead of hoped for.

This skill drives the build plan. It does not replace the Blueprint's Part 2 (technical reference), `BRAND_GUIDE.md`, the PRD, or the Blueprint's Part 1 (the spec) — those are still what gets read into each session's Claude Code prompt.

## Two arcs — establish the mode first

Part 3 is mode-aware. Before running anything, know which arc you're on — it's stamped in the Blueprint header:

- **greenfield** — a new app. The full linear arc: Pre-Flight → Session 1 (schema) → … → launch. Sessions run in the numbered order.
- **extends-existing** — a feature inside an existing repo. SKIP Pre-Flight and the infrastructure sessions (schema/landing/auth setup). The build is **E1 (chunk-by-chunk from Part 1's chunk map, one branch per chunk, mirroring each chunk's pattern source) → E2 (integrate + regression-check)**, then the shared back half (analytics verify, the audit gates, launch prep).

If the mode isn't in context, read it from the Blueprint header before deciding what session comes next. Don't run greenfield Session 1 for an extends-existing feature — that rebuilds infrastructure the repo already has.

## The Blueprint gate is the first hard stop (both arcs)

No build session — greenfield Session 1 or extends-existing E1 — starts until the Blueprint exists and `/blueprint-gate` is green. This is a hard stop like a checkpoint. If the user says "just start building" without a green Blueprint, refuse and name what's missing (the ⭐ structural decision unresolved, a load-bearing 🔵, a chunk with no boundary contract, an incomplete env list). Build sessions build *against* Part 1's chunk map and schema; if a session prompt is about to invent a table, endpoint, or chunk boundary, stop — that belongs in the Blueprint, not the build. Cross-reference the anti-invent tripwire in `../pro/MANIFESTO.md`.

## State to track

Maintain, across the conversation: the **mode** (greenfield / extends-existing), whether the **Blueprint gate** is green, the current session (including fractionals and the extends-existing `E1`/`E2` with which chunk), whether Pre-Flight is complete (greenfield), and which checkpoint or audit gate was last cleared. If this isn't in context (new conversation, project reopened), ask once: "Which arc are you on, what did you last complete, and was its done-check fully green?" Don't default to Session 1 — that wastes time if the user is further along or on the other arc.

## Workflow

### Starting a session

1. Confirm the previous session's done-check is fully green. If the user says "skip that, let's just move on," push back once: name the specific unchecked item and the cost of skipping it. If they insist after that, proceed — this is enforcement, not a lock the user can't override, but the pushback has to actually happen.
2. Read the "Read" line for the session — the specific Blueprint Part 1 / Part 2 / PRD sections it names — before generating anything. Do not generate the Claude Code prompt from memory of what the session probably needs.
3. Present the exact Claude Code prompt from Part 3, unparaphrased. If the user modifies it, that's their call, but flag what changed so a future re-read doesn't silently drift.
4. After the code is generated, run the verification steps from the session (SQL checks, manual test, whatever it specifies) — don't mark done-check items green on the assumption that generated code is correct.

### Extends-existing: one branch per chunk

In E1, each chunk in Part 1's chunk map is its own branch, built in dependency order, mirroring its named pattern source. Do not let the next chunk start until the current chunk's per-chunk done-check is green — including boundary contracts honored (no write to a table the chunk doesn't own) and the existing repo's test suite still green. Same "red at C2 is cheaper than red at C6" discipline as the numbered sessions.

### Checkpoints and audit gates

Treat the deploy checkpoints (Part 3 §21) as hard stops, not a session like any other. A checkpoint failing means something upstream is broken, not that the checkpoint needs debugging — send the user back to the session that most likely caused the failure, don't patch around it. The two pre-launch audit gates (§22) are hard stops too: **resilience** is adversarial — every endpoint gets attacked for missing timeouts, non-idempotent retries, N+1, unvalidated input, hardcoded secrets, silent failures, missing auth/authz. **functional-coverage** requires every PRD journey to complete end to end in the running app. A red box in either is a launch blocker, not a "note for later." Extends-existing runs both gates on the changed surface after E2.

### Ending a session

Walk every box in the done-check. For each, state PASS or FAIL with the specific evidence checked (e.g. "RLS: queried `pg_tables`, all rows show `rowsecurity = true` — PASS"), not a blanket "looks good." Only after all boxes are PASS, present the `Commit:` block. Do not commit on a partial done-check — an uncommitted broken state is recoverable; a commit that bakes in a silent gap is what Session 8 pays for.

## Failure modes to avoid

- **Rubber-stamping.** Marking a done-check green because the code was generated, not because it was verified.
- **Prompt drift.** Paraphrasing Part 3's prompt "to be helpful" and losing the specific ordering or constraint that made it work.
- **Checkpoint skipping.** Treating the deploy checkpoints as optional under time pressure — they exist because the first and second halves of the build fail silently in different ways than they fail loudly.
- **Session amnesia.** Starting a fresh conversation and defaulting to Session 1 without asking the mode and where the user left off.
- **Skipping the Blueprint gate.** Starting a build session on a red or missing Blueprint "to save time" — the exact hard stop that keeps the build from re-deriving (and re-inventing) the schema and chunk map.
- **Wrong arc.** Running greenfield infrastructure sessions for an extends-existing feature — rebuilding what the repo already has instead of building the Blueprint's chunks.
- **Treating an audit gate as advisory.** Marking resilience or functional-coverage green without actually attacking the endpoints / driving every journey.
