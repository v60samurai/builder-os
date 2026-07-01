# Builder OS Pro

> The full pipeline. If you just want to grab a template and ship, the [main README](../README.md) quickstart is still all you need — this is one layer down, for when you want the templates wired together instead of used as three separate folders.

The base BuilderOS is templates: PRD, brand guide, session playbook, used independently. Pro is the operating layer connecting them — five modes, each with one artifact and one gate, so you can't accidentally start building before scope is locked, or ship without writing down what you learned.

Read [`MANIFESTO.md`](./MANIFESTO.md) first. Everything below just maps its five modes to files that already exist in this repo.

## The pipeline

| Mode | What you're doing | Artifact | Driven by |
|---|---|---|---|
| **BRAINSTORM** | Generate options, no commitment | [`discovery/idea-log.md`](../discovery/idea-log.md) | — |
| **DISCOVER** | Find the real problem, grade the evidence | [`discovery/discovery-brief.md`](../discovery/discovery-brief.md) | — |
| **DEFINE** | Commit to what and why, lock scope | [`prd/lean-prd.md`](../prd/lean-prd.md) · [`full-prd.md`](../prd/full-prd.md) · [`org-prd.md`](../prd/org-prd.md) | [`skills/prd-writer`](../skills/prd-writer), [`skills/prd-updater`](../skills/prd-updater), [`skills/prd-gate`](../skills/prd-gate) |
| **DELIVER** | Build to spec, ship | [`sessions/SESSION_PLAYBOOK.md`](../sessions/SESSION_PLAYBOOK.md), [`brand/`](../brand/) | [`skills/session-runner`](../skills/session-runner), [`skills/brand-guide-visualizer`](../skills/brand-guide-visualizer) |
| **LEARN** | Measure against the North Star, extract the lesson | [`postmortem/postmortem-template.md`](../postmortem/postmortem-template.md) | — |

Move down the table in order. The manifesto's tripwires are what stop you from skipping a row under deadline pressure — read those before you decide a row doesn't apply to you this time.

## Which template, which track

The base repo has one track (solo builder, ship in 12-16 hours). Pro adds a second at the DEFINE step, for when you're a PM inside a team rather than shipping alone:

```
Solo, shipping alone            → prd/lean-prd.md or full-prd.md → brand/quick or full → sessions/
PM inside a pod/team            → prd/org-prd.md (DRI, milestones, ops checklist, GTM) → sessions/
```

Both tracks share the same DISCOVER brief, the same `prd-gate` check, and the same session playbook — the only thing that changes shape is the DEFINE artifact, because a solo builder and a pod both need to lock scope, they just answer to different stakeholders while doing it.

## Skills, if you're using Claude Code

Every skill under `skills/` is plain markdown (`SKILL.md`) — read it yourself, or drop it into a Claude Code project's `.claude/skills/` if you want it invoked automatically. None of them require Claude Code; they're written to be followed by a person just as easily.

One thing this repo does **not** ship: skills that set the mode itself (a `/brainstorm`, `/discover`, `/define`, `/deliver`, `/learn` command that enters each mode and enforces its rules automatically). That's personal Claude Code tooling, not a template — if you build one, it should read `MANIFESTO.md` as its source of truth rather than duplicating the rules, so this file stays the one place they're defined.

## What Pro is not

- Not a replacement for the base templates — `lean-prd.md` and `full-prd.md` are untouched, still the fastest path for a solo build.
- Not mandatory. Nothing in the main README quickstart requires reading this folder.
- Not a guarantee. A gate can be gamed by someone determined to game it. What it buys you is that skipping a step takes a deliberate decision, not an accident.
