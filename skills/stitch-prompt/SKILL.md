---
name: stitch-prompt
description: Turn a filled Builder OS brand guide + journeys.md screen inventory + the claude.ai JSX prototype into a ready-to-paste Google Stitch prompt, so Stitch generates on-brand, on-flow UI screens. Use when the user is at the design step — after the brand guide and prototype, before the Blueprint — and asks to "design the screens", "write the Stitch prompt", "generate the UI", "prep Stitch", or "make the design.md". Outputs a Stitch prompt (global design-system block + per-screen prompts); the user iterates in Google Stitch and brings the result back into Claude Code via the Stitch MCP as design.md. Not a visual-design generator itself — it writes the prompt Stitch runs.
---

# Stitch Prompt

The design step. It does not design the UI — it writes the prompt Google Stitch runs, grounded in what the earlier steps already decided so Stitch doesn't invent a look that contradicts the brand or misses a screen.

**Where this sits in the flow:** brand guide + journeys + prototype → **Stitch prompt** → (iterate in [labs.google/stitch](https://labs.google/stitch)) → design.md via the Stitch MCP → Blueprint. The design.md that comes back is what the Blueprint's frontend change-list (§7) and token section (§10/§14) read — so the prompt has to cover every screen in the inventory, or the Blueprint inherits the gap.

## Inputs (read all four before writing the prompt)

1. **Brand guide** (`brand/quick-brand-guide.md` or `brand/full-brand-guide.md`) — palette with hex, type stack + scale, voice, mood/adjectives. This is the design system's source of truth; the Stitch prompt encodes it, never overrides it.
2. **journeys.md screen inventory** — the exact list of screens + their per-screen state matrix. Every screen here becomes a screen in the prompt; every state (empty/loading/error) becomes a variant to request.
3. **The claude.ai JSX prototype** — layout, hierarchy, and interaction reality already discovered. Stitch should match the prototype's structure, not reinvent it.
4. **PRD** — value prop, target platform (web / mobile / responsive), density expectations.

If any input is missing, say so and stop — a Stitch prompt built on a guessed palette or an incomplete screen list produces designs you throw away.

## Output: the Stitch prompt

Stitch reads **natural-language "Visual Descriptions" backed by concrete values**. Produce two parts:

### 1. Global design-system block (paste once, sets the house style)
- **Atmosphere** — 1-line mood from the brand adjectives; density (airy / balanced / dense); motion (restrained / fluid / cinematic).
- **Palette** — each color as *descriptive name + hex + role*. One accent, saturation < 80%. Absolute-neutral base (zinc/slate). Never pure `#000000`.
- **Typography** — font stack + scale hierarchy from the brand guide, with weights.
- **Component behavior** — buttons, cards, inputs, and their interaction states, in Stitch's descriptive style.
- **Layout + motion** — grid/spacing philosophy; motion specs if the brand calls for it.
- **Anti-slop bans** — no AI-purple/neon glow, no generic gradient hero, no pure black, no default-Bootstrap look. State them explicitly; Stitch honors bans.

### 2. Per-screen prompts (one block per screen in the inventory)
For each screen: name · purpose (one line from the inventory) · contents (elements/data, from the inventory — not visual guesses) · the states to generate (from the state matrix) · platform. Reference the prototype for structure.

## Handoff (state this to the user at the end)

1. Paste the global block, then each screen block, into Google Stitch. Iterate there until the screens feel right.
2. Bring the result back into Claude Code via the **Stitch MCP** (or export), captured as **design.md** — the design reference the Blueprint reads.
3. The Blueprint's `blueprint-writer` then maps design.md onto §7 (frontend changes) and the token section, and greenfield sessions build those screens against it.

For a deeper, standalone design-system pass, the `stitch-design-taste` skill (taste-skill plugin) goes further on atmosphere calibration and anti-generic rules — this skill is the pipeline-native wiring that keeps Stitch tied to *this* product's brand, journeys, and prototype.
