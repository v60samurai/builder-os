# Builder OS Pro

> The full pipeline. If you just want to grab a template and ship, the [main README](../README.md) quickstart is still all you need — this is one layer down, for when you want the templates wired together instead of used as three separate folders.

The base BuilderOS is templates: PRD, brand guide, session playbook, used independently. Pro is the operating layer connecting them — five modes, each with one artifact and one gate, so you can't accidentally start building before scope is locked, or ship without writing down what you learned.

Read [`MANIFESTO.md`](./MANIFESTO.md) first. Everything below just maps its five modes to files that already exist in this repo.

## The pipeline

| Mode | What you're doing | Artifact | Driven by |
|---|---|---|---|
| **BRAINSTORM** | Generate options, no commitment | [`discovery/idea-log.md`](../discovery/idea-log.md) | — |
| **DISCOVER** | Find the real problem, grade the evidence | [`discovery/discovery-brief.md`](../discovery/discovery-brief.md) | — |
| **DEFINE** | Commit to what + why (PRD), then how (ERD); lock scope | [`prd/prd.md`](../prd/prd.md) → [`erd/erd-template.md`](../erd/erd-template.md) | [`prd-writer`](../skills/prd-writer), [`prd-updater`](../skills/prd-updater), [`prd-gate`](../skills/prd-gate), [`erd-writer`](../skills/erd-writer), [`erd-gate`](../skills/erd-gate) |
| **DELIVER** | Build to spec (against the ERD chunk map), ship | [`sessions/SESSION_PLAYBOOK.md`](../sessions/SESSION_PLAYBOOK.md), [`brand/`](../brand/) | [`skills/session-runner`](../skills/session-runner), [`skills/brand-guide-visualizer`](../skills/brand-guide-visualizer) |
| **LEARN** | Measure against the North Star, extract the lesson | [`postmortem/postmortem-template.md`](../postmortem/postmortem-template.md) | — |

Move down the table in order. The manifesto's tripwires are what stop you from skipping a row under deadline pressure — read those before you decide a row doesn't apply to you this time.

## One PRD, one ERD, two build modes

There's now one PRD template (`prd/prd.md` — scale it down for a small bet by cutting optional sections) and one ERD template. What changes shape is the **build classification**, stamped in the ERD header and carried into DELIVER:

```
greenfield  (new app)                 → scaffold → schema-from-fixtures → full session arc → ship
extends-existing (feature in a repo)  → mirror a pattern source → build chunks in place → shared back half → ship
```

Orthogonally, **customer-facing** surfaces carry more polish + design-system rigor than **internal** tools. Both modes share the same DISCOVER brief, the same PRD + `prd-gate`, the same ERD + `erd-gate`, and the same session playbook — the playbook branches on the mode at its top (see `sessions/`).

## Skills, if you're using Claude Code

Every skill under `skills/` is plain markdown (`SKILL.md`) — read it yourself, or drop it into a Claude Code project's `.claude/skills/` if you want it invoked automatically. None of them require Claude Code; they're written to be followed by a person just as easily.

One thing this repo does **not** ship: skills that set the mode itself (a `/brainstorm`, `/discover`, `/define`, `/deliver`, `/learn` command that enters each mode and enforces its rules automatically). That's personal Claude Code tooling, not a template — if you build one, it should read `MANIFESTO.md` as its source of truth rather than duplicating the rules, so this file stays the one place they're defined.

## What Pro is not

- Not a replacement for the base templates — `prd/prd.md` alone (skip the ERD/sessions) is still the fastest path for a solo build. The older `lean-prd`/`full-prd`/`org-prd` live in `prd/archive/` if you want the earlier shapes.
- Not mandatory. Nothing in the main README quickstart requires reading this folder.
- Not a guarantee. A gate can be gamed by someone determined to game it. What it buys you is that skipping a step takes a deliberate decision, not an accident.
