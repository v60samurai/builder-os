---
name: stitch-prompt
description: Turn the journeys.md screen inventory (grounded in the PRD) into a ready-to-paste Google Stitch prompt, so Stitch generates on-flow UI screens and establishes the product's visual direction. Use when the user is at the design step — right after journeys, before brand + prototype + the Blueprint — and asks to "design the screens", "write the Stitch prompt", "generate the UI", "prep Stitch", or "make the design.md". Outputs a Stitch prompt (global design-system block + per-screen prompts); the user iterates in Google Stitch and brings the result back into Claude Code via the Stitch MCP as design.md. Not a visual-design generator itself — it writes the prompt Stitch runs.
---

# Stitch Prompt

The design step. It does not design the UI — it writes the prompt Google Stitch runs, grounded in the journeys so Stitch covers every screen and sets a coherent visual direction. This is where the look is first explored; the brand guide comes next and locks in what the design settles on.

**Where this sits in the flow:** journeys → **Stitch prompt** → (iterate in [labs.google/stitch](https://labs.google/stitch)) → design.md via the Stitch MCP → brand → prototype → Blueprint. Design lands right after journeys, so the only upstream artifacts are the PRD and journeys.md — brand and prototype come after. The design.md that comes back is what the brand guide formalises and what the Blueprint's frontend change-list (§7) and token section (§10/§14) read — so the prompt has to cover every screen in the inventory, or both inherit the gap.

## Inputs (read both before writing the prompt)

1. **journeys.md screen inventory** — the exact list of screens + their per-screen state matrix. Every screen here becomes a screen in the prompt; every state (empty/loading/error) becomes a variant to request.
2. **PRD** — value prop, product personality/mood, target platform (web / mobile / responsive), density expectations. There is no brand guide yet, so the visual direction is a design decision made here, derived from the PRD's positioning and mood — the brand guide downstream then documents and locks it.

If either input is missing, say so and stop — a Stitch prompt built on an incomplete screen list, or with no read on the product's positioning, produces designs you throw away.

## Output: the Stitch prompt

Stitch reads **natural-language "Visual Descriptions" backed by concrete values**. Produce two parts:

### 1. Global design-system block (paste once, sets the house style)
- **Atmosphere** — 1-line mood drawn from the PRD's positioning and product personality; density (airy / balanced / dense); motion (restrained / fluid / cinematic).
- **Palette** — each color as *descriptive name + hex + role*, chosen here as the product's first visual decision. One accent, saturation < 80%. Absolute-neutral base (zinc/slate). Never pure `#000000`.
- **Typography** — a font stack + scale hierarchy with weights, chosen to match the atmosphere.
- **Component behavior** — buttons, cards, inputs, and their interaction states, in Stitch's descriptive style.
- **Layout + motion** — grid/spacing philosophy; motion specs if the atmosphere calls for it.
- **Anti-slop bans** — no AI-purple/neon glow, no generic gradient hero, no pure black, no default-Bootstrap look. State them explicitly; Stitch honors bans.

### 2. Per-screen prompts (one block per screen in the inventory)
For each screen: name · purpose (one line from the inventory) · contents (elements/data, from the inventory — not visual guesses) · the states to generate (from the state matrix) · platform. Let structure follow the screen's contents and purpose, not a visual guess.

## Handoff (state this to the user at the end)

1. Paste the global block, then each screen block, into Google Stitch. Iterate there until the screens feel right.
2. Bring the result back into Claude Code via the **Stitch MCP** (or export), captured as **design.md** — the design reference the brand guide and the Blueprint read.
3. Next steps read design.md: the **brand guide** formalises the palette, type, and voice the design settled on; the **claude.ai prototype** builds these screens with real fixtures; then `blueprint-writer` maps design.md onto §7 (frontend changes) and the token section, and greenfield sessions build against it.

For a deeper, standalone design-system pass, the `stitch-design-taste` skill (taste-skill plugin) goes further on atmosphere calibration and anti-generic rules — this skill is the pipeline-native wiring that keeps Stitch tied to *this* product's journeys and positioning.
