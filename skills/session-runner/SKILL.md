---
name: session-runner
description: Actively walk a BuilderOS project through sessions/SESSION_PLAYBOOK.md, enforcing done-checks, gates, and checkpoints instead of trusting the user to self-police them. Use when the user says "run the next session", "let's do Session N", "start building", "what session am I on", or is executing the playbook after finishing a PRD + ERD. Mode-aware (greenfield vs extends-existing). Refuses to start any build session until the ERD gate is green, refuses to start a new session if the previous one's done-check has an unchecked box, and treats Checkpoint A / B and the audit gates (13.5, 13.6) as hard stops, not suggestions.
---

# Session Runner

`SESSION_PLAYBOOK.md` already says the thing this skill enforces: *"Do not start a session until the previous one's done-check is fully green. If anything is red, fix it before moving forward — discovering a broken foundation in Session 8 costs 3x what it costs in Session 2."* That sentence is true and gets ignored under deadline pressure. This skill is the discipline that sentence describes, applied mechanically instead of hoped for.

This skill drives the playbook. It does not replace `IMPLEMENTATION_GUIDE.md`, `BRAND_GUIDE.md`, the PRD, or the ERD — those are still what gets read into each session's Claude Code prompt.

## Two arcs — establish the mode first

The playbook is mode-aware. Before running anything, know which arc you're on — it's stamped in the ERD header (`build classification`):

- **greenfield** — a new app. The full linear arc: Pre-Flight → Session 1 (schema) → … → Session 14. Sessions run in the numbered order.
- **extends-existing** — a feature inside an existing repo. SKIP Pre-Flight, Session 1, Session 2, and Session 3's auth setup. The build is **E1 (chunk-by-chunk from the ERD's chunk map, one branch per chunk, mirroring each chunk's pattern source) → E2 (integrate + regression-check)**, then the shared back half (Sessions 13, 13.5, 13.6, 14).

If the mode isn't in context, read it from the ERD header before deciding what session comes next. Don't run greenfield Session 1 for an extends-existing feature — that rebuilds infrastructure the repo already has.

## The ERD gate is the first hard stop (both arcs)

No build session — greenfield Session 1 or extends-existing E1 — starts until the ERD exists and `/erd-gate` is green. This is a hard stop like a checkpoint. If the user says "just start building" without a green ERD, refuse and name what's missing (the ⭐ structural decision unresolved, a load-bearing 🔵, a chunk with no boundary contract). Build sessions build *against* the ERD's chunk map and schema; if a session prompt is about to invent a table, endpoint, or chunk boundary, stop — that belongs in the ERD, not the build. Cross-reference `../erd/` and the anti-invent tripwire in `../pro/MANIFESTO.md`.

## State to track

Maintain, across the conversation: the **mode** (greenfield / extends-existing), whether the **ERD gate** is green, the current session number (including fractionals `2.5`, `13.5`, `13.6`, or the extends-existing `E1`/`E2` with which chunk), whether Pre-Flight is complete (greenfield), and which checkpoint (A, B) or audit gate (13.5, 13.6) has last been cleared. If this information isn't in context (new conversation, project reopened), ask once: "Which arc are you on, what did you last complete, and was its done-check fully green?" Don't assume greenfield Session 1 by default — that wastes the user's time if they're further along or on the other arc.

## Workflow

### Starting a session

1. Confirm the previous session's done-check is fully green. If the user says "skip that, let's just move on," push back once: name the specific unchecked item and the cost of skipping it (per the playbook's own Session 8 warning). If they insist after that, proceed — this is enforcement, not a lock the user can't override, but the pushback has to actually happen, not be skipped for the sake of speed.
2. Read the "Read" line for the session — the specific IG/BG/PRD sections it names — before generating anything. Do not generate the Claude Code prompt from memory of what the session probably needs.
3. Present the exact Claude Code prompt from the playbook, unparaphrased. If the user wants to modify it, that's their call, but flag what changed from the source prompt so a future re-read of the playbook doesn't silently drift from what was actually run.
4. After the code is generated, run the verification steps from the playbook (SQL checks, manual test, whatever the session specifies) — don't mark done-check items green on the assumption that generated code is correct.

### Extends-existing: one branch per chunk

In E1, each chunk in the ERD's chunk map is its own branch, built in dependency order, mirroring its named pattern source. Do not let the next chunk start until the current chunk's per-chunk done-check is green — including boundary contracts honored (no write to a table the chunk doesn't own) and the existing repo's test suite still green. This is the same "red at C2 is cheaper than red at C6" discipline the numbered sessions have.

### Checkpoints (greenfield: A after Session 5, B after Session 10) and audit gates (13.5, 13.6)

Treat these as hard stops, not a session like any other. A checkpoint failing means something upstream is broken, not that the checkpoint itself needs debugging — send the user back to the session that most likely caused the failure, don't patch around it at the checkpoint. The two pre-launch audit gates are hard stops too: **13.5 (resilience)** is adversarial — every endpoint gets attacked for missing timeouts, non-idempotent retries, N+1, unvalidated input, hardcoded secrets, silent failures, missing auth/authz. **13.6 (functional-coverage)** requires every PRD journey to complete end to end in the running app. A red box in either is a launch blocker, not a "note for later." Extends-existing runs both gates on the changed surface after E2.

### Ending a session

Walk every box in "Done when." For each, state PASS or FAIL with the specific evidence checked (e.g. "RLS: queried `pg_tables`, all rows show `rowsecurity = true` — PASS"), not a blanket "looks good." Only after all boxes are PASS, present the `Commit:` block. Do not commit on a partial done-check — an uncommitted broken state is recoverable; a commit that bakes in a silent gap is what Session 8 pays for.

## Failure modes to avoid

- **Rubber-stamping.** Marking a done-check green because the code was generated, not because it was verified.
- **Prompt drift.** Paraphrasing the playbook's prompt "to be helpful" and losing the specific ordering or constraint that made it work in the first place.
- **Checkpoint skipping.** Treating Checkpoint A/B as optional under time pressure — they exist because Sessions 1-5 and 6-10 fail silently in different ways than they fail loudly.
- **Session amnesia.** Starting a fresh conversation and defaulting to Session 1 without asking the mode and where the user actually left off.
- **Skipping the ERD gate.** Starting a build session on a red or missing ERD "to save time" — this is the exact hard stop that keeps the build from re-deriving (and re-inventing) the schema and chunk map.
- **Wrong arc.** Running greenfield Session 1/2/3-auth for an extends-existing feature — rebuilding infrastructure the repo already has instead of building the ERD's chunks.
- **Treating an audit gate as advisory.** Marking 13.5 or 13.6 green without actually attacking the endpoints / driving every journey — the same rubber-stamp failure, applied to the last gate before launch.
