<div align="center">
  <img src="./assets/cover.svg" alt="Builder OS" width="100%"/>
</div>

# Builder OS

> An operating system for shipping products solo with AI.

PRD → Brand Guide → Session Playbook. The three documents I use to take a product from idea to live URL, working alone with Claude Code.

These templates have shipped real products. They are opinionated. They tell you what to do, not what you *could* do.

---

## What's inside

| Folder | What it is | Use when |
|--------|------------|----------|
| [`prd/`](./prd) | Three PRD templates: lean, full, and org (DRI/pod/milestones, for PMs inside a team) | You're choosing *what* to build |
| [`discovery/`](./discovery) | Idea log + discovery brief | You're figuring out *if* it's worth building, before you write the PRD |
| [`brand/`](./brand) | Two brand-guide templates: quick and full | You're choosing *how it looks* |
| [`sessions/`](./sessions) | A 14-session implementation playbook | You're *building it* |
| [`postmortem/`](./postmortem) | Postmortem template | You've shipped and need to close the loop |
| [`skills/`](./skills) | Claude Code skills: writing/updating/gating PRDs, running sessions, visualizing brand guides. This repo root is a Claude Code plugin — `cc --plugin-dir` loads all five. | You're using Claude Code and want these enforced, not just suggested |
| [`pro/`](./pro) | The full 5-mode pipeline connecting everything above | You want the templates wired together, not used as separate folders |
| [`examples/`](./examples) | Real filled-out examples from shipped products | You want to see one done |

---

## Which template, when

```
Cohort submission in 2 weeks ─────→ prd/lean-prd.md + brand/quick-brand-guide.md
Shipping in 1-3 months ───────────→ prd/full-prd.md + brand/full-brand-guide.md
PM inside a team/pod, not solo ───→ prd/org-prd.md (see pro/README.md for the full pipeline)
Not sure this is worth building ──→ discovery/idea-log.md → discovery/discovery-brief.md
Already have a PRD, want to build → start at sessions/SESSION_PLAYBOOK.md
Just need design rules ───────────→ brand/ standalone
Need a worked example to copy ───→ examples/
```

---

## Quickstart

Copy the templates into your project:

```bash
npx degit v60samurai/builder-os my-product
cd my-product
```

Then:

1. Open `prd/lean-prd.md` (or `full-prd.md` for serious projects, `org-prd.md` if you're a PM inside a team). PRD templates use `[bracket]` placeholders, the session playbook uses `{{double-brace}}` ones — search for whichever the file uses and fill every one. Use the confidence tags (🟢🟡🔵🔴) honestly.
2. Open `brand/quick-brand-guide.md`. Decide your colors, type, voice. Write down *why* you chose each one.
3. Open `sessions/SESSION_PLAYBOOK.md`. Follow the sessions in order. Do not skip checkpoints.

A solo builder using this end-to-end ships in roughly 12-16 hours of focused work.

Want the templates wired together instead of used as three separate folders — gates between stages, a discovery step before the PRD, a postmortem after launch? See [`pro/README.md`](./pro/README.md) for the full pipeline.

---

## Philosophy

Most templates are slop.

They give you sections without telling you what a good answer looks like. They use placeholder text that an AI happily fills with confident nonsense. They optimise for the writer feeling done, not for the reader making decisions.

Builder OS does the opposite:

- Every section tells you *why* it exists, what *good* looks like, and what *bad* looks like.
- Confidence tags (🟢 primary research, 🟡 secondary, 🔵 hypothesis, 🔴 disproven) force you to own how solid each claim is.
- Brand decisions get defended in writing. If you can't write *why*, the choice isn't made yet.
- The session playbook has checkpoints. Discovering a broken foundation in session 8 costs 3x what it costs in session 2.

The result: when you hand these docs to Claude Code (or a teammate), they make the decisions *you* would have made. No defaults. No drift. No slop.

---

## What this is NOT

- A framework. There's nothing to install.
- A SaaS. No login, no pricing, no roadmap dictated by a Stripe dashboard.
- A starter kit. No code. Bring your own stack.
- Beginner-friendly. Assumes you've shipped at least once and know what a PRD is for.
- Stack-agnostic. The session playbook assumes Next.js + Supabase + FastAPI. Adapt as needed.

---

## Roadmap

Templates I'll add next (PRs welcome):

- `voice/` — brand voice corpus + microcopy patterns
- `adr/` — architecture decision records
- `eval/` — MVP completeness rubric
- `growth/` — post-launch experiment template
- `.cursorrules` — equivalent guard for Cursor users

`discovery/`, `postmortem/`, and Claude Code skills (`skills/`) shipped in 0.3.0 — see [`pro/README.md`](./pro/README.md) for how they connect. See [CHANGELOG.md](./CHANGELOG.md) for the full history.

---

## Contributing

Issues, PRs, and new template ideas are welcome. Read [CONTRIBUTING.md](./CONTRIBUTING.md) first. The voice is opinionated, and PRs that dilute it won't merge.

---

## Credits

`skills/prd-writer/` and `skills/prd-updater/` were originally written by Rohan Shah.

---

## License

MIT. Harshit Badiger ([@v60samurai](https://github.com/v60samurai)).

Use these in any project. Fork them. Sell them. Rip them apart. If they ship something for you, a star (and a tag on the post you ship from them) is the thanks I'd love.
