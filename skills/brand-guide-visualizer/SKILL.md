---
name: brand-guide-visualizer
description: Generate a single-file HTML brand guide visualizer from an uploaded brand-guide.md. Use this skill when the user has a brand-guide.md file and asks to "visualize the brand guide", "create a brand visualizer", "render the brand guide", or similar phrasing. Output is a self-contained .html file that opens directly in a browser with no build step — vanilla JS, no framework, no tooling. The visualizer's chrome, layout, and visual rhythm are designed from the brand's personality, not inherited from prior skill runs.
---

# Brand Guide Visualizer

This skill turns a brand-guide.md into a single-file HTML artifact that renders the brand guide as an interactive reference document. The artifact is the visual checkpoint before product development starts — the user uses it to see their brand system before shipping anything.

Output is a single `.html` file. Vanilla HTML/CSS/JS. No React, no build tooling, no framework. Opens directly in a browser by double-clicking. This is what makes it work in Claude Code: the file hits disk and the user sees it immediately.

## Core principle

**The visualizer is born from the brand, not from a template.** Every brand guide has a personality. The chrome around the content — navigation pattern, section order, cover treatment, typographic rhythm, whether there's animation, decorative elements — must be designed FROM that personality. Do not default to conventions that happen to have worked for other brands.

Component atoms (button, input, badge, etc.) must be auto-generated from tokens so they reflect the brand's actual design system — but how those atoms are presented, grouped, and contextualized is a creative decision that should suit the brand.

## Workflow

1. **Find the brand-guide.md.** Check the current working directory first, then `/mnt/user-data/uploads/`. If multiple candidates, ask which one.
2. **Parse the content.** Map each section of the md to the rendering plan below. Note what's present, what's missing, what's ambiguous.
3. **Design decisions.** Before writing code, make these calls based on the brand:
   - What's the brand's emotional register? (calm/loud/playful/serious/brutal/refined/warm/cold)
   - What layout pattern serves that register? (not: default sticky top nav + single column)
   - What should the cover feel like? (not: default radial gradient behind wordmark)
   - What section order tells this brand's story best? (not: default "Cover → Philosophy → Identity" sequence)
   - Where does motion earn its place, if anywhere?
4. **Write the .html file** following the structural contract below.
5. **Write the omission report** as an HTML comment at the very top of the file (before `<!DOCTYPE html>` or immediately after).
6. **Save in the current working directory** with a name like `brand-visualizer-{brand-name}.html`. Tell the user the file is ready to open.

## Structural contract (non-negotiable)

These are hard constraints. Violating them breaks the user's workflow.

### File structure

- Single `.html` file. Self-contained.
- `<!DOCTYPE html>` declaration, `<html lang="en">`, proper `<head>` with meta charset and viewport.
- All CSS in a single `<style>` tag in `<head>`.
- All JS in a single `<script>` tag just before `</body>`.
- `const brand = { ... }` at the top of the script tag holds all brand-specific data.
- The rest of the script reads from `brand` and populates the DOM. Swapping the config renders a different brand without code changes.
- No external JS dependencies. No CDN libraries. No build step.
- Google Fonts and Fontshare CSS links allowed in `<head>` for typography.
- No `localStorage`, `sessionStorage`, or any browser storage APIs. State lives in JS variables only.

### Required sections (render if data exists, omit cleanly if not)

Cover · Visual Idea/Philosophy · Identity (name + tagline) · Personality · Voice & Tone · Language Rules · Typography · Colors · Logo · Spacing · Shape/Radius · Icons · Motion · Visual Texture · Breakpoints · Components (atom showcase) · Pages/Page Direction · Accessibility · What This Brand is NOT

The order is flexible — choose what suits the brand's narrative. But every one of these that has data in the md must appear somewhere in the output.

### Component atoms (auto-generated from tokens)

Every brand visualizer must include live, working versions of these atoms using the brand's tokens. They must actually work — buttons show hover states, inputs show focus states, checkboxes toggle, tabs switch, etc.

Button (primary, secondary, ghost, danger × sm/md/lg sizes) · Input · Textarea · Select · Checkbox · Radio · Toggle · Badge (neutral, accent, success, warning, error, info) · Alert (info, success, warning, error) · Toast · Tooltip · Tabs · Breadcrumb · Pagination · Progress bar · Spinner · Avatar · Table · Modal

How these are presented (grouped, sectioned, labeled) is a design choice. That they exist and work is not.

### Dynamic behavior (must work)

- **Theme toggle.** If every surface in the config has both `colors.light` and `colors.dark` defined, show a toggle. Clicking it swaps CSS custom properties via a `data-theme` attribute on `<html>` or `<body>` so colors switch instantly. If any surface lacks one of the themes, hide the toggle and render only what's available.
- **Surface tabs.** If the config has multiple surfaces (marketing vs app, etc.), render tabs. Clicking a tab updates the active surface and re-renders surface-scoped sections. If only one surface, hide the tab UI.
- **Active section indicator.** Whatever navigation pattern is used, the current section should be indicated as the user scrolls. Use `IntersectionObserver` to track which section is in view.
- **Contrast checker.** Color swatches show their WCAG contrast grade against primary text (AAA/AA/AA Large/Fail). At minimum one live contrast check appears in the Accessibility section.
- **prefers-reduced-motion.** All animations respect this via CSS media query. Hard rule, no exceptions.

### CSS architecture

- Use CSS custom properties (`--bg`, `--t1`, `--accent`, etc.) defined on `:root`, `[data-theme="light"]`, or `[data-theme="dark"]`. The theme toggle flips the `data-theme` attribute.
- For multi-surface, scope surface-specific variables using `[data-surface="marketing"]` or similar, or re-write the custom properties via JS when surface changes.
- Use CSS `@media (prefers-reduced-motion: reduce)` to disable transitions and animations globally.
- Focus states must be visible. Use `:focus-visible` with the brand's accent color.

### Typography

- Auto-build the Google Fonts URL from the config's typography definitions. Inject via `<link>` in `<head>`.
- For Fontshare fonts (General Sans, Satoshi, Clash Display, etc.), build the Fontshare URL separately and inject that too.
- Every text element uses the font defined in the config for that surface and role. No hardcoded font families in CSS — use CSS custom properties that the JS populates from the config.

### Quality bar

- Must be valid HTML5 (no unclosed tags, no duplicate IDs).
- Must render without JS errors on first load. Check the browser console.
- All 6-character hex colors or valid rgba() strings. The contrast checker only parses 6-char hex, so avoid 8-char hex with alpha in color tokens.
- Page must be navigable by keyboard. Tab through interactive elements in logical order.
- All interactive elements have visible focus states.

## Anti-convergence rules (what NOT to default to)

Prior runs of brand visualizer work have produced certain patterns. Some of those patterns are good *for some brands* but become slop when applied universally. Do NOT default to any of these. Use them only if the brand actively calls for them.

**Layout defaults to avoid:**
- Sticky top navigation with horizontal anchor-link buttons
- Single centered 880px content column
- Max-width wrapper with equal left/right padding
- Section-per-scroll with `padding-top: 72px`

**Cover defaults to avoid:**
- Radial gradient behind wordmark
- Giant watermark-style wordmark in background at 2-3% opacity
- Three-line meta ribbon (version · date · confidence) at bottom
- Thin horizontal rules flanking an italic pull quote

**Typographic defaults to avoid:**
- Italic serif display font used for "pulls" and emphasis throughout
- Crimson Pro, Fraunces, or any serif used as an editorial accent over a sans UI font unless the brand is explicitly editorial
- JetBrains Mono or IBM Plex Mono for "data" styling unless the brand has a reason to feel technical
- Uppercase 10-11px tracked-out eyebrow labels above every section

**Component presentation defaults to avoid:**
- Card with `border-radius: 12px` + subtle border + hover-lift `translateY(-1px)`
- Two-column "do this / don't do this" grids
- "Appears here / Never appears here" two-column for taglines
- Numbered section tags like "01 — IDENTITY"
- Component atoms displayed in a vertical list labeled "Buttons / Inputs / Badges"

**Motion defaults to avoid:**
- `floatIn` keyframe with `translateY(20px)` opacity fade on load
- Staggered entrance with `0.15s` delay increments
- `cubic-bezier(0.16, 1, 0.3, 1)` as the reflexive "nice" easing curve

**Color defaults to avoid:**
- Semantic palette with emerald success, amber warning, blue info, red error when the brand hasn't requested those hues
- Dark mode that's just the light palette with inverted text and darker surface (a real dark mode rebalances saturation and often shifts hue)

### How to avoid convergence

When you catch yourself reaching for one of the above, ask: **does this brand's personality actually call for this, or am I pattern-matching from prior work?** If the answer isn't "the brand calls for this," make a different choice.

The goal isn't contrarianism. If the brand is genuinely quiet and refined and editorial, a serif pull and a centered column might be right. But that should be a decision, not a default.

## Reading the brand for layout cues

Before writing code, read the brand guide and answer:

- **What's the register?** Brutal, refined, playful, serious, warm, cold, loud, quiet, technical, human, editorial, utilitarian, maximalist, minimalist.
- **What's the emotional weight?** Does this brand want to feel heavy and confident, or light and approachable?
- **What's the pacing?** Dense info-rich scanning, or breathing room with one idea per screen?
- **What's the personality as a layout metaphor?** A magazine spread? A terminal? A gallery wall? A form? A dashboard? A zine? A spec sheet? An index?

Let these answers drive the chrome. Examples (not prescriptions):

- A brutal, raw brand → maybe monospace everywhere, sharp corners, grid lines visible, hard color blocks, no animation
- A warm, human brand → maybe rounded shapes, generous whitespace, serif headlines, gentle transitions, softer palette
- A technical, data-dense brand → maybe tight grids, high information density, mono for data, hoverable everything, keyboard shortcuts visible
- A playful consumer brand → maybe asymmetric layouts, color-as-hero, unexpected interactions, more illustration/texture

None of these are "right." The brand tells you which direction to go.

## The omission report

At the very top of the generated HTML file, include an HTML comment (`<!-- -->`) before `<!DOCTYPE html>` that lists:

1. **Omitted sections:** sections from the standard list that had no data in the md
2. **Inferred content:** places where the md was ambiguous and you made a reasonable inference (state what and why briefly)
3. **Fallback tokens:** any colors, fonts, or values that weren't in the md but were needed for the artifact to render
4. **Validation warnings:** any places where the md's values would fail a quality check (contrast failures, missing font weights, etc.)

Format:

```html
<!--
═══════════════════════════════════════════════════════════════════
BRAND VISUALIZER — GENERATION REPORT
═══════════════════════════════════════════════════════════════════

Omitted sections (no data in brand-guide.md):
— Visual Texture
— Breakpoints

Inferred content:
— Semantic colors (ok/warn/info/err) not defined in md. Used sensible
  neutrals that work with the brand's accent hue.
— Tagline "appears/never appears" contexts not specified. Omitted
  that subsection; rendered tagline + note only.

Fallback tokens:
— No mono font defined. Data displays use the body font.

Validation warnings:
— Text muted (#A3A3A3) on surface (#FFFFFF) fails WCAG AA at 2.85:1.
  Flagged in Accessibility section.

═══════════════════════════════════════════════════════════════════
-->
<!DOCTYPE html>
```

Keep it concise. Only report things that matter. If the md is complete:

```html
<!-- Brand visualizer generated from brand-guide.md — no omissions, no inferences. -->
<!DOCTYPE html>
```

## Output delivery

1. Write the .html file to the current working directory with a name like `brand-visualizer-{brand-name}.html`. Use lowercase kebab-case for the brand name.
2. Tell the user the file has been created and how to open it:
   - macOS: `open brand-visualizer-{name}.html`
   - Linux: `xdg-open brand-visualizer-{name}.html`
   - Windows: `start brand-visualizer-{name}.html`
   - Or double-click the file.
3. Brief response (1-3 sentences) summarizing: what layout direction you chose, any notable omissions, what the user should check.

Do NOT explain the full artifact. The user will look at it. Your job is to point out the decisions they need to review and the gaps they need to fill in the md.

## What "done" looks like

- User runs the skill in Claude Code with a brand-guide.md in the working directory
- Skill generates an .html file in the same directory
- User opens it in a browser, sees their brand system rendered
- Omission report at the top of the file (view source or devtools) makes gaps in the md visible
- User reviews the artifact, sees what works, sees what's missing, iterates on the md
- Next run generates a fresh .html reflecting the updated brand

The skill succeeds when the user stops noticing the skill and starts arguing with their brand guide.
