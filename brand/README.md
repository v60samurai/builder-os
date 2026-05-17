# Brand Guide Templates

Two templates. Both exist to keep AI coders (Claude Code, Cursor, Lovable, v0) from defaulting to Tailwind blue, `rounded-2xl`, and "Get started" buttons.

| File | Length | Use when |
|------|--------|----------|
| [`quick-brand-guide.md`](./quick-brand-guide.md) | 8KB, ~200 lines | First-pass alignment, MVP, internal tools, you have a day |
| [`full-brand-guide.md`](./full-brand-guide.md) | 42KB, ~1255 lines | Real product, multiple surfaces (landing, app, docs, email), design will be defended in code review |

## The rule both enforce

If an AI coder asks "what font / what color / what spacing / what copy," the answer is in this file. If it isn't, the answer is "stop and ask." Never let the AI default to Tailwind or shadcn values.

## What's in the full version that's not in the quick

- Per-surface type and color scales (landing vs app vs docs vs email rarely use the same system).
- Motion tokens (duration, easing, when to animate, when not to).
- Accessibility integrated into every section, not bolted on at the end.
- Component recipes (button, card, modal, form) with the exact tokens applied.
- A "Global anti-patterns" section ("No `rounded-2xl shadow-lg bg-gradient-to-br` by reflex").
- A "What this brand is NOT" section as guardrail against drift.
- Copy-paste-ready CSS variables + TypeScript constants at the end.

## How to use with Claude Code or Cursor

1. Fill the template (don't leave `{Font Name}` blanks; the AI will guess).
2. Add a `CLAUDE.md` (or `.cursorrules`) at project root that says: *"Brand guide is in `brand/full-brand-guide.md`. Read it before any UI work. Do not default to Tailwind values."*
3. When the AI proposes a design, paste the proposal back and ask: "What in the brand guide justifies this?"
