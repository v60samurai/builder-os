# {Product Name} — Brand Guide

> {One-line design philosophy. Not a mission statement. A constraint.}

---

## Visual Idea

One sentence: **{core visual principle in bold}.**

{2-3 sentences explaining WHY this direction. Reference comparable tools/products that validate the choice. End with the decision framework: when does the user see X, when do they see Y.}

**Rule:** {the single constraint that governs every visual decision.}

---

## Typography

{If using different type systems across surfaces (e.g. marketing vs app), declare that split upfront.}

### {Surface A} Fonts (e.g. Landing Page, Marketing)

**Display: {Font Name}** ({Source}) — {1-line character description}. Used at ≥{threshold}px only.
- {Weight} — {usage}
- {Weight} — {usage}
- CSS constant: `const FD = "{font stack}"`

**Body: {Font Name}** ({Source}) — {1-line character description}.
- {Weight} — {usage}
- {Weight} — {usage}
- CSS constant: `const FB = "{font stack}"`

**Font loading:** {exact loading mechanism — @import, next/font, CDN link, etc.}

```jsx
// Font loading code
```

### {Surface A} Type Scale

| Context | Font | Weight | Size | Tracking |
|---------|------|--------|------|----------|
| Hero headline | | | | |
| Section headlines | | | | |
| Body / descriptions | | | | |
| Button text | | | | |
| Labels / section labels | | | | |
| Tiny metadata | | | | |

### {Surface B} Fonts (e.g. Dashboard, App)

**Display: {Font Name}** ({Source}) — {1-line character description}.
- {Weight} — {usage}
- CSS var: `--font-{name}`

> **Why not {rejected font}:** {1-2 sentences on why the obvious alternative was rejected. Name the runner-up.}

**Body: {Font Name}** ({Source}) — {1-line character description}.
- {Weight} — {usage}
- CSS var: `--font-{name}`

**Data/Mono: {Font Name}** ({Source}) — {1-line character description}.
- {Weight} — {usage}
- CSS var: `--font-{name}`

**Font loading:** {exact mechanism for this surface}

```tsx
// Font loading code
```

---

## Colors

### {Surface A} Tokens

```ts
const T = {
  bg:         "{value}",    // page background
  surface:    "{value}",    // cards, panels
  surfaceHov: "{value}",    // hover states
  border:     "{value}",    // card borders, dividers
  borderStr:  "{value}",    // strong borders, active inputs
  text:       "{value}",    // primary text
  textSec:    "{value}",    // secondary text, descriptions
  textMute:   "{value}",    // placeholders, timestamps, labels
  accent:     "{value}",    // {accent name} — primary chromatic color
  accentHov:  "{value}",    // button hover state
  accentDim:  "{value}",    // subtle accent backgrounds
  accentBord: "{value}",    // accent-adjacent borders
  accentGlow: "{value}",    // box shadows, glow effects
}
```

{Note any key differences between surface token systems (e.g. RGBA vs hex, transparency expectations).}

### {Surface B} Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `bg` | `{value}` | Page background |
| `surface` | `{value}` | Cards, panels |
| `surface-raised` | `{value}` | Hover states, inputs, elevated elements |
| `border` | `{value}` | Card borders, dividers |
| `border-strong` | `{value}` | Active inputs, emphasis borders |
| `text` | `{value}` | Primary text |
| `text-secondary` | `{value}` | Labels, descriptions |
| `text-muted` | `{value}` | Placeholders, disabled, timestamps |

### Accent: {Accent Name}

{1 sentence on the role of the accent color. When does it appear? What does it signal?}

Usage inventory (where accent appears):
- {usage 1}
- {usage 2}
- {usage 3}

**Cap:** Max {X}% of any screen.

### Semantic (Status Only)

| Token | Value | Usage |
|-------|-------|-------|
| `success` | `{value}` | {usage} |
| `warning` | `{value}` | {usage} |
| `danger` | `{value}` | {usage} |
| `info` | `{value}` | {usage} |

### Special Palettes

{Document any components that break the main color system. Name the component, explain why it diverges, and provide the full token set.}

---

## Logo

```
{Wordmark or logo description}
```

- Font: {font and weight per surface}
- {Color rules for each part of the wordmark}
- {What the logo is NOT: no icon, no symbol, etc.}
- Letter spacing: {value}
- Sizes: {nav size}, {footer size}, {other contexts}

{Any logo interactions or Easter eggs.}

**Favicon:** {description, size}

---

## Page Structure: {Surface A} (e.g. Landing Page)

### Sections (in order)

{Numbered list of every section with a 1-line description of what it contains.}

1. **{Section}** — {description}
2. **{Section}** — {description}
3. ...

### Layout

- Max content width: {value}
- Section padding: {value} (major), {value} (standard)
- Section dividers: {border rule}

### Section Labels

{If there's a repeating label/eyebrow pattern, document the component with code.}

```jsx
// Label component code
```

### Background Layers

{Document all fixed/absolute background elements: grids, vignettes, noise, gradients. Include z-index order.}

### Section-by-Section Specs

{For each section, document:}

#### {Section Name}

- **Background:** {any section-specific background treatment}
- **Key typography:** {font, weight, size, tracking for the main element}
- **Interactive behavior:** {hover, scroll, animation triggers}
- **Data/state:** {any dynamic content, API calls, real-time updates}
- **Responsive:** {breakpoint-specific changes}

---

## Animation

### Principles

{2-3 rules that govern all motion decisions. What motion IS for, what it is NOT for.}

### {Surface A}: {Animation Library}

**Standard ease curve:** `{value}`

**Common patterns:**

```jsx
// Fade up on scroll
// Word-by-word stagger
// Height collapse
```

{Document scroll observer settings: threshold, margin, once vs repeat.}

### {Surface A}: CSS Keyframes

```css
/* List all keyframes with their purpose */
@keyframes {name} { /* ... */ }
```

### {Surface B}: {Animation Approach}

```css
/* List all keyframes */
@keyframes {name} { /* ... */ }
```

{Document scroll observer settings for this surface.}

---

## Visual Texture

{Document each texture layer as a numbered item. Include the exact code for each.}

### 1. {Texture Name} ({where it's used})

{1-line description. Opacity. Position.}

```jsx
// Exact implementation
```

### 2. {Texture Name}

{Description and code.}

### 3. {Texture Name}

{Description and code.}

---

## Spacing

{Base grid unit}px base grid. Every value is a multiple of {base}.

| Value | Common Use |
|-------|-----------|
| {base * 1} | {usage} |
| {base * 2} | {usage} |
| {base * 3} | {usage} |
| {base * 4} | {usage} |
| {base * 6} | {usage} |
| {base * 8} | {usage} |
| {base * 10} | {usage} |
| {base * 12} | {usage} |

---

## Shape

{1-line philosophy on border radius.}

| Element | Radius |
|---------|--------|
| Buttons, inputs | {value} |
| Cards | {value} |
| Modals, sheets | {value} |
| Avatars, dots | {value} |
| Pills, badges | {value} |
| {Special component} | {value} |

---

## Icons

- Library: **{library name}**
- Size: **{default}px** ({range for compact/featured contexts})
- Stroke: **{default}** ({active state value})
- Color: {rule}
- {Any special icon usage patterns}

---

## Responsive Breakpoints

| Breakpoint | Behavior |
|-----------|---------|
| ≤{px} | {what changes} |
| ≤{px} | {what changes} |
| ≤{px} | {what changes} |
| ≤{px} | {what changes} |

---

## {Surface B} (e.g. Dashboard, App)

### Layout

- **Mobile (<{px}):** {layout description, nav pattern, content width}
- **Desktop (>{px}):** {layout description, nav pattern, content width}

### Components

{For each key component, document: background, borders, typography, color coding, interactive states, and internal structure.}

**{Component name}:** {spec block}

**{Component name}:** {spec block}

**{Component name}:** {spec block}

---

## Voice / Personality

{If the product has a bot, assistant, or content voice, document it here.}

{Communication channel/format.}

**Fixed conventions:**
- {convention 1}
- {convention 2}

**Tone rules:**
- {rule 1}
- {rule 2}

---

## What This Brand is NOT

{Explicit anti-patterns. Every line is a guardrail against drift.}

- Not {anti-pattern}.
- Not {anti-pattern}.
- Not {anti-pattern}.
- Not {anti-pattern}.
- Not {anti-pattern}.
