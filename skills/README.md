# Skills

Claude Code skills (`SKILL.md` + frontmatter). Each one is plain markdown — read it yourself, or drop the folder into a project's `.claude/skills/` to have Claude Code invoke it automatically.

## Install as a plugin

This repo root is a valid Claude Code plugin (`.claude-plugin/plugin.json`) — the skills above auto-discover, none of the template folders are affected. To use it:

```bash
git clone https://github.com/v60samurai/builder-os.git
cc --plugin-dir /path/to/builder-os
```

That loads all five skills for the current Claude Code session. There's no marketplace listing yet — that would need a separate `marketplace.json`, not something this repo ships today.

| Skill | Drives | Use when |
|---|---|---|
| [`prd-writer/`](./prd-writer) | `prd/*.md` | Writing or reviewing a PRD. Originally written by Rohan Shah. |
| [`prd-updater/`](./prd-updater) | `prd/*.md` | Updating an existing PRD with new information without bolting on an "update note." Originally written by Rohan Shah. |
| [`prd-gate/`](./prd-gate) | `prd/*.md` | Checking whether a PRD is actually DEFINE-exit-ready — placeholders, confidence tags, non-goals, guardrail metric. |
| [`session-runner/`](./session-runner) | `sessions/SESSION_PLAYBOOK.md` | Running the 14-session build playbook with done-checks and checkpoints enforced, not self-policed. |
| [`brand-guide-visualizer/`](./brand-guide-visualizer) | `brand/*.md` | Turning a filled-out brand guide into a single-file HTML reference. |

None of these require Claude Code to be useful — they're written clearly enough to follow by hand. See [`../pro/README.md`](../pro/README.md) for how they map onto the 5-mode pipeline.
