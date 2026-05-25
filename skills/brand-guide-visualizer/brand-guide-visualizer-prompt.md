# Brand Guide Visualizer — Generation Prompt

Use this prompt when you want to generate a brand visualizer HTML but don't have the skill loaded (cross-platform, or when iterating on the prompt itself).

Paste the prompt below into Claude along with the brand-guide.md as an uploaded file or inline content.

---

## THE PROMPT

You are generating a single-file HTML artifact that visualizes a product's brand guide as an interactive reference document. The input is a brand-guide.md file. The output is a self-contained .html file whose chrome, layout, and visual rhythm are designed from the brand's personality — not inherited from any template.

Output is vanilla HTML/CSS/JS. No React, no frameworks, no build tooling, no CDN libraries (except Google Fonts / Fontshare CSS for typography). The file opens directly in a browser by double-clicking.

### Core principle

The visualizer is born from the brand, not from a template. Every brand guide has a personality. The chrome around the content — navigation pattern, section order, cover treatment, typographic rhythm, whether there's animation, decorative elements — must be designed FROM that personality. Do not default to conventions that happen to have worked for other brands.

Component atoms (button, input, badge, etc.) must be auto-generated from tokens so they reflect the brand's actual design system. But how those atoms are presented, grouped, and contextualized is a creative decision that should suit the brand.

### Workflow

1. Read the brand-guide.md carefully.
2. Before writing code, make these design calls:
   - What's the brand's emotional register? (calm/loud/playful/serious/brutal/refined/warm/cold)
   - What layout pattern serves that register?
   - What should the cover feel like?
   - What section order tells this brand's story best?
   - Where does motion earn its place, if anywhere?
3. Write the HTML file following the structural contract below.
4. Write the omission report as an HTML comment at the very top of the file (before `<!DOCTYPE html>`).
5. Present the artifact.

### Structural contract (non-negotiable)

**File structure:**
- Single `.html` file. Self-contained.
- `<!DOCTYPE html>`, `<html lang="en">`, proper `<head>` with meta charset and viewport.
- All CSS in a single `<style>` tag in `<head>`.
- All JS in a single `<script>` tag just before `</body>`.
- `const brand = { ... }` at the top of the script tag holds all brand-specific data.
- The rest of the script reads from `brand` and populates the DOM. Swapping the config should render a different brand without code changes.
- No external JS dependencies. No CDN libraries. No build step.
- Google Fonts and Fontshare CSS links allowed in `<head>` for typography.
- No `localStorage`, `sessionStorage`, or any browser storage APIs. State in JS variables only.

**Required sections (render if data exists, omit cleanly if not):**

Cover · Visual Idea/Philosophy · Identity (name + tagline) · Personality · Voice & Tone · Language Rules · Typography · Colors · Logo · Spacing · Shape/Radius · Icons · Motion · Visual Texture · Breakpoints · Components (atom showcase) · Pages/Page Direction · Accessibility · What This Brand is NOT

Order is flexible — choose what suits the brand's narrative. Every section with data in the md must appear somewhere.

**Component atoms (auto-generated from tokens, must actually work):**

Button (primary, secondary, ghost, danger × sm/md/lg) · Input · Textarea · Select · Checkbox · Radio · Toggle · Badge (neutral, accent, success, warning, error, info) · Alert (info, success, warning, error) · Toast · Tooltip · Tabs · Breadcrumb · Pagination · Progress bar · Spinner · Avatar · Table · Modal

How these are presented (grouped, sectioned, labeled) is a design choice. That they exist and work is not.

**Dynamic behavior:**
- **Theme toggle.** Show if every surface has both `colors.light` and `colors.dark`. Hide otherwise. Implement via `data-theme` attribute on `<html>` or `<body>` flipping CSS custom properties.
- **Surface tabs.** Render if config has multiple surfaces. Hide if one surface. Click updates active surface, re-renders surface-scoped sections.
- **Active section indicator.** Use `IntersectionObserver` to track current section. Indicate in navigation.
- **Contrast checker.** Swatches show WCAG grade (AAA/AA/AA Large/Fail). At minimum one live contrast check in Accessibility section.
- **prefers-reduced-motion.** All animations respect this via CSS media query.

**CSS architecture:**
- CSS custom properties on `:root`, `[data-theme="light"]`, `[data-theme="dark"]`. Theme toggle flips `data-theme`.
- Multi-surface: scope variables via `[data-surface="..."]` or rewrite custom properties in JS on surface change.
- `@media (prefers-reduced-motion: reduce)` disables transitions/animations globally.
- `:focus-visible` uses the brand's accent color. Keyboard navigation must work.

**Typography:**
- Auto-build Google Fonts URL from config. Inject via `<link>` in `<head>`.
- Fontshare fonts (General Sans, Satoshi, Clash Display, etc.) need a separate Fontshare URL.
- Every text element uses the font defined in config for that surface and role. No hardcoded font families in CSS — use custom properties populated from the config.

**Quality bar:**
- Valid HTML5 (no unclosed tags, no duplicate IDs).
- No JS errors on first load.
- All 6-character hex colors or valid rgba() strings. Contrast checker only parses 6-char hex.
- Keyboard navigable. Visible focus states on all interactive elements.

### Anti-convergence rules (DO NOT default to these)

Prior brand visualizer work has produced certain patterns. Some are good for some brands but become slop when applied universally. Do NOT default to any of these. Use them only if the brand actively calls for them.

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
- Crimson Pro, Fraunces, or any serif used as editorial accent over sans UI font unless brand is explicitly editorial
- JetBrains Mono or IBM Plex Mono for "data" styling unless brand has reason to feel technical
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
- Dark mode that's just the light palette with inverted text (real dark mode rebalances saturation, often shifts hue)

**How to avoid convergence:** When you catch yourself reaching for one of the above, ask: *does this brand's personality actually call for this, or am I pattern-matching from prior work?* If not the former, make a different choice. The goal isn't contrarianism — if the brand is genuinely quiet, refined, and editorial, a serif pull and centered column might be right. But that should be a decision, not a default.

### Reading the brand for layout cues

Before writing code, read the brand guide and answer:

- **Register:** Brutal, refined, playful, serious, warm, cold, loud, quiet, technical, human, editorial, utilitarian, maximalist, minimalist.
- **Emotional weight:** Heavy and confident, or light and approachable?
- **Pacing:** Dense info-rich scanning, or breathing room with one idea per screen?
- **Personality as layout metaphor:** A magazine spread? A terminal? A gallery wall? A form? A dashboard? A zine? A spec sheet? An index?

Let these drive the chrome. Examples (not prescriptions):

- Brutal/raw → monospace everywhere, sharp corners, visible grid lines, hard color blocks, no animation
- Warm/human → rounded shapes, generous whitespace, serif headlines, gentle transitions, softer palette
- Technical/data-dense → tight grids, high info density, mono for data, hoverable everything, keyboard shortcuts visible
- Playful/consumer → asymmetric layouts, color-as-hero, unexpected interactions, more illustration/texture

The brand tells you which direction.

### The omission report

At the very top of the generated HTML file, before `<!DOCTYPE html>`, include an HTML comment that lists:

1. **Omitted sections:** sections from the standard list with no data in the md
2. **Inferred content:** places where the md was ambiguous and you made a reasonable inference
3. **Fallback tokens:** values not in md but needed to render (e.g., "semantic colors not defined, used neutral greys")
4. **Validation warnings:** md values that fail quality checks (contrast failures, missing font weights)

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

Fallback tokens:
— No mono font defined. Data displays use the body font.

Validation warnings:
— Text muted (#A3A3A3) on surface (#FFFFFF) fails WCAG AA at 2.85:1.
  Flagged in Accessibility section.

═══════════════════════════════════════════════════════════════════
-->
<!DOCTYPE html>
```

If the md is complete:

```html
<!-- Brand visualizer generated from brand-guide.md — no omissions, no inferences. -->
<!DOCTYPE html>
```

### Output

1. Write the .html file to the current working directory. Name it `brand-visualizer-{brand-name}.html` (lowercase kebab-case).
2. Tell the user how to open it: `open` (macOS), `xdg-open` (Linux), `start` (Windows), or double-click.
3. Brief response (1-3 sentences): what layout direction you chose, notable omissions, what to check.

Do NOT explain the full artifact. The user will look at it.

---

## USAGE NOTES

**When to use this prompt vs the skill:**
- Skill: default path in Claude Code, triggers automatically when you have a brand-guide.md
- This prompt: use on platforms without the skill, or when iterating on the prompt content

**Iterating on the prompt:**
- If you find the generated visualizers converging on a pattern you don't like, add that pattern to the anti-convergence list and test again
- If a brand archetype keeps producing bad output, add a "reading the brand" example for that archetype
- Keep the structural contract stable; iterate on the creative guidance

**Input expectations:**
- A brand-guide.md following the template format (the one with Meta/Identity/Personality/Voice/Typography/Colors/etc. sections)
- If the md is informal or partial, the omission report surfaces the gaps
- Clean the md before running — the skill and prompt tolerate missing data, but not contradictory data (e.g., colors defined twice with different values)
