---
name: session-runner
description: Actively walk a BuilderOS project through sessions/SESSION_PLAYBOOK.md, enforcing done-checks and checkpoints instead of trusting the user to self-police them. Use when the user says "run the next session", "let's do Session N", "start building", "what session am I on", or is executing the playbook after finishing a PRD. Refuses to start a new session if the previous one's done-check has an unchecked box, and treats Checkpoint A / Checkpoint B as hard stops, not suggestions.
---

# Session Runner

`SESSION_PLAYBOOK.md` already says the thing this skill enforces: *"Do not start a session until the previous one's done-check is fully green. If anything is red, fix it before moving forward — discovering a broken foundation in Session 8 costs 3x what it costs in Session 2."* That sentence is true and gets ignored under deadline pressure. This skill is the discipline that sentence describes, applied mechanically instead of hoped for.

This skill drives the playbook. It does not replace `IMPLEMENTATION_GUIDE.md`, `BRAND_GUIDE.md`, or the PRD — those are still what gets read into each session's Claude Code prompt.

## State to track

Maintain, across the conversation: current session number (including the fractional `Session 2.5`), whether Pre-Flight is complete, and which checkpoint (A, B) has last been cleared. If this information isn't in context (new conversation, project reopened), ask once: "What session did you last complete, and was its done-check fully green?" Don't assume Session 1 by default — that wastes the user's time if they're further along.

## Workflow

### Starting a session

1. Confirm the previous session's done-check is fully green. If the user says "skip that, let's just move on," push back once: name the specific unchecked item and the cost of skipping it (per the playbook's own Session 8 warning). If they insist after that, proceed — this is enforcement, not a lock the user can't override, but the pushback has to actually happen, not be skipped for the sake of speed.
2. Read the "Read" line for the session — the specific IG/BG/PRD sections it names — before generating anything. Do not generate the Claude Code prompt from memory of what the session probably needs.
3. Present the exact Claude Code prompt from the playbook, unparaphrased. If the user wants to modify it, that's their call, but flag what changed from the source prompt so a future re-read of the playbook doesn't silently drift from what was actually run.
4. After the code is generated, run the verification steps from the playbook (SQL checks, manual test, whatever the session specifies) — don't mark done-check items green on the assumption that generated code is correct.

### Checkpoints (A after Session 5, B after Session 10)

Treat these as hard stops, not a session like any other. A checkpoint failing means something upstream is broken, not that the checkpoint itself needs debugging — send the user back to the session that most likely caused the failure, don't patch around it at the checkpoint.

### Ending a session

Walk every box in "Done when." For each, state PASS or FAIL with the specific evidence checked (e.g. "RLS: queried `pg_tables`, all rows show `rowsecurity = true` — PASS"), not a blanket "looks good." Only after all boxes are PASS, present the `Commit:` block. Do not commit on a partial done-check — an uncommitted broken state is recoverable; a commit that bakes in a silent gap is what Session 8 pays for.

## Failure modes to avoid

- **Rubber-stamping.** Marking a done-check green because the code was generated, not because it was verified.
- **Prompt drift.** Paraphrasing the playbook's prompt "to be helpful" and losing the specific ordering or constraint that made it work in the first place.
- **Checkpoint skipping.** Treating Checkpoint A/B as optional under time pressure — they exist because Sessions 1-5 and 6-10 fail silently in different ways than they fail loudly.
- **Session amnesia.** Starting a fresh conversation and defaulting to Session 1 without asking where the user actually left off.
