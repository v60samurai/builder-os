# Skills

Claude Code skills (`SKILL.md` + frontmatter). Each one is plain markdown — read it yourself, or drop the folder into a project's `.claude/skills/` to have Claude Code invoke it automatically.

## Install as a plugin

This repo root is a valid Claude Code plugin (`.claude-plugin/plugin.json`) — see the root [`README.md`](../README.md#install-as-a-claude-code-plugin-optional) for the install command and the full slash-command table. `name:` in each skill's frontmatter matches its folder exactly, so once loaded, each is invokable directly by that name (`/prd-writer`, `/prd-updater`, `/prd-gate`, `/prd-journeys`, `/brand-guide-visualizer`, `/stitch-prompt`, `/blueprint-writer`, `/blueprint-gate`, `/blueprint-runner`) as well as auto-triggering on matching context.

The nine skills, in flow order:

| Skill | Slash command | Drives | Use when |
|---|---|---|---|
| [`prd-writer/`](./prd-writer) | `/prd-writer` | `prd/*.md` | Writing or reviewing a PRD. Originally written by Rohan Shah. |
| [`prd-updater/`](./prd-updater) | `/prd-updater` | `prd/*.md` | Updating an existing PRD with new information without bolting on an "update note." Originally written by Rohan Shah. |
| [`prd-gate/`](./prd-gate) | `/prd-gate` | `prd/prd.md` | Checking whether a PRD is actually DEFINE-exit-ready — placeholders, confidence tags, non-goals, guardrail metric. |
| [`prd-journeys/`](./prd-journeys) | `/prd-journeys` | `journeys.md` | Turning the PRD into journeys: personas, a Mermaid flow per journey, and a screen inventory with per-screen state matrix. |
| [`brand-guide-visualizer/`](./brand-guide-visualizer) | `/brand-guide-visualizer` | `brand/*.md` | Turning a filled-out brand guide into a single-file HTML reference. |
| [`stitch-prompt/`](./stitch-prompt) | `/stitch-prompt` | `design.md` | Turning the brand guide + journeys + prototype into a Google Stitch prompt; the iterated design comes back as `design.md` via the Stitch MCP. |
| [`blueprint-writer/`](./blueprint-writer) | `/blueprint-writer` | `blueprint/blueprint-template.md` | Filling the Blueprint from a PRD — the merged spec, technical reference, and build plan (Parts 1-3). Two modes: greenfield / extends-existing. |
| [`blueprint-gate/`](./blueprint-gate) | `/blueprint-gate` | `blueprint/blueprint-template.md` | Checking the Blueprint is safe to build — ⭐ structural decision resolved, no load-bearing hypothesis, boundary contracts complete. |
| [`blueprint-runner/`](./blueprint-runner) | `/blueprint-runner` | `blueprint/blueprint-template.md` Part 3 | Driving the mode-aware Part 3 build sessions with done-checks and checkpoints enforced, not self-policed. |

None of these require Claude Code to be useful — they're written clearly enough to follow by hand. See [`../pro/README.md`](../pro/README.md) for how they map onto the 5-mode pipeline.
