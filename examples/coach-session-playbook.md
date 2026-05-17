> **Reference Example**: This is the Coach project Session Playbook, filled into the `sessions/SESSION_PLAYBOOK.md` template. The build is timed (~30 minutes live, ~30 minutes pre-flight). Read this alongside `coach-implementation-guide.md` and `coach-final-push.md` for the complete worked example.

---

# Session Playbook: Coach

> The only document you follow linearly. Everything else is reference.
>
> **IG** = [coach-implementation-guide.md](./coach-implementation-guide.md)
> **FP** = [coach-final-push.md](./coach-final-push.md)
> **BG** = *BRAND.md*
> **PRD** = *PRD.md*
> **ST** = *docs/input/stitch-tokens.md*

**Estimated wall-clock time:** **30 minutes** for the live build. Pre-flight (~30 min) is done the day before.
**Operator:** 1 — you, with Claude Code dispatching parallel subagents.

---

## How to Use This Playbook

The Coach build is timed. The audience sees the clock. Every session below has a **time budget** and a **done-check**. If a session blows its budget by more than 30 seconds, skip the remaining polish in that session and move on — the next session depends on it being green, not pretty.

**Running a session:**

1. Read the **Read** line. Open those sections in another tab so they are already in your context window.
2. Paste the **Claude Code prompt verbatim**. Do not paraphrase. The prompts are written to be self-contained.
3. **Smoke-test in the browser** before the timer says move on. UI changes have to be exercised, not just type-checked.
4. **Commit at the end of each session.** Conventional commits. One session = one commit. This matters for the Studio Swap demo at the end — clean history makes the "swap and push" moment legible.

**Subagent discipline.** Sessions 3 (features) and 5 (smoke test) explicitly use parallel subagents. Dispatch them in a single message with multiple Agent calls. Verify each subagent's output before merging — a subagent that returns "I wrote the files" is not proof the files compile.

---

## Pre-Flight (Day Before, ~30 min)

Done once. Do not redo on demo day.

### Services

- [ ] **GitHub account** logged in via `gh auth login`. Confirm with `gh auth status`.
- [ ] **Vercel account** logged in via `vercel login`. Confirm with `vercel whoami`.
- [ ] **Anthropic** access via AI Gateway — confirmed by visiting the Vercel AI Gateway dashboard and seeing `anthropic/claude-sonnet-4.6` listed under Models.
- [ ] **Local CLIs**: `node -v` (>=20), `pnpm -v` (>=9), `gh --version`, `vercel --version` (>=54.x — older versions miss recent agentic features).

### Repository Scaffold (one-time)

The scaffold is committed at `185cb2d Pre-flight: Next.js 15 scaffold + persona files`. If the working tree has been cleaned out (as it currently has), restore with:

```bash
git checkout 185cb2d -- .
```

The scaffold contains:

- `src/app/{layout.tsx, page.tsx, globals.css}` — empty App Router starter
- `src/persona/CLAUDE.md` — the **primary** voice. This is the file Studio Swap will replace.
- `coach/persona/CLAUDE.md` — the **alt** voice. The Studio Swap target. Lives in the Shipwright workspace.
- `package.json` with: `next@15`, `react@19`, `typescript@5`, `tailwindcss@4`, `@upstash/redis`, `ai`, `zod`, `next/font` (built-in)
- `.env.example` listing `COACH_PASSWORD`, `KV_REST_API_URL`, `KV_REST_API_TOKEN`
- `tsconfig.json` with `strict: true` and `"@/*": ["./src/*"]` path mapping

If `package.json` is missing dependencies, run:

```bash
pnpm install
pnpm add next@latest react@latest react-dom@latest \
         typescript @types/react @types/react-dom \
         tailwindcss @tailwindcss/postcss postcss \
         ai zod @upstash/redis
```

### Persona Files

- [ ] **Primary**: `src/persona/CLAUDE.md` — copy of your `~/.claude/CLAUDE.md`. This is the voice the audience meets first.
- [ ] **Alt**: `coach/persona/CLAUDE.md` — a deliberately different voice. Examples: "drill sergeant," "British food critic," "deadpan stoic." It must be obviously different on a single Chat turn.

### Project Root CLAUDE.md

- [ ] `CLAUDE.md` exists at the Next.js project root (`/Users/harshitbadiger/Projects/coach-demo/CLAUDE.md`). It tells Claude Code the stack, the file layout, and the forbidden patterns. See file in the repo.

### What You Do **NOT** Do in Pre-Flight

- ❌ `vercel link` — happens in Session 6 on the clock.
- ❌ `gh repo create` — happens in Session 6 on the clock.
- ❌ Set `COACH_PASSWORD` in Vercel — happens in Session 6 on the clock.
- ❌ Provision Upstash — happens in Session 6 on the clock.

**Why.** The deploy theatre is half the demo. Setting up Vercel/GitHub early flattens the moment when the URL goes live.

**Pre-flight complete when:** scaffold restored, `pnpm dev` boots a blank app at `http://localhost:3000` without errors, both persona files exist, root `CLAUDE.md` is in place.

---

## ⏱ T+0:00 — The 30-Minute Build Starts

Six sessions. Three are parallel. Times are wall-clock, not budgeted minutes — if the audience sees the clock at 0:08, you should be opening Session 3.

| # | Session | Start | End | Budget |
|---|---------|-------|-----|--------|
| 1 | Tokens + Layout | 0:00 | 0:04 | 4 min |
| 2 | Shared libs + Auth gate | 0:04 | 0:08 | 4 min |
| 3 | Three features in parallel (Chat · Roast · Receipt) | 0:08 | 0:18 | 10 min |
| 4 | Memory | 0:18 | 0:22 | 4 min |
| 5 | Local smoke test + Studio Swap rehearsal | 0:22 | 0:25 | 3 min |
| 6 | Ship: GitHub → Vercel → Studio Swap live | 0:25 | 0:30 | 5 min |

---

## Session 1 — Tokens + Layout (4 min) · 0:00 → 0:04

**Goal:** Editorial Intelligence tokens applied. Fonts loaded. Global header with three tabs and the memory link, ready for routes that don't yet exist.

**Read:** IG → §10 *Tokens → Tailwind v4 `@theme`*. ST → §1, §3, §5 (header pattern), §4 *Spacing & Shape*.

**Claude Code prompt:**

```
Read coach/docs/coach-implementation-guide.md §10 (Tokens → Tailwind v4 @theme).
Read coach/docs/input/stitch-tokens.md §1 (Palette), §3 (Typography), §4 (Spacing), and the header description in §5.2.

Build three files. Touch nothing else.

1. src/app/globals.css — exactly the @theme block from IG §10. Include the @layer base
   rules so <body> uses --color-paper and the Source Serif 4 body stack.

2. src/app/layout.tsx — wire Newsreader, Source_Serif_4, IBM_Plex_Mono via next/font/google
   with the variable names from IG §10. Strict-typed RootLayout. Children render inside a
   single <body>. Do NOT add a <Header /> yet — header is omitted on /login and added per-page
   in /chat, /roast, /receipt, /memory.

3. src/components/Header.tsx — 56px tall, max-width 1080px, centered. Coach wordmark in
   Newsreader 22/500. 1px vertical --color-rule. Three uppercase tabs: CHAT|ROAST|RECEIPT
   (utility-label, +0.08em tracking). Right-aligned lowercase `memory` link. Active tab gets a
   2px --color-accent underline 4px below the baseline. Bottom edge is a 1px --color-rule
   hairline, full-bleed. Props: { active: "chat" | "roast" | "receipt" | "memory" }.
```

**Done check:**

- [ ] `pnpm dev` boots at `localhost:3000`. Background is warm paper, not white.
- [ ] In a temporary route or by importing into `app/page.tsx`, the Header renders with the active tab underline visibly terracotta.
- [ ] No console warnings about `next/font`.

**Commit:**

```bash
git add -A && git commit -m "feat: editorial tokens, fonts, global header"
```

---

## Session 2 — Shared Libs + Auth Gate (4 min) · 0:04 → 0:08

**Goal:** Everything every feature depends on. Persona reader, AI client config, KV helpers, cookie auth, middleware, login screen.

**Read:** IG → §5 *Persona Loader*, §6 *The AI Call*, §7 *KV Layout*, §8 *Auth Gate*. ST → §5.1 *Login*.

**Claude Code prompt:**

```
Read coach/docs/coach-implementation-guide.md §5, §6, §7, §8.
Read coach/docs/input/stitch-tokens.md §5.1 for the Login layout mechanics.

Build, exactly per the IG, in this order:

1. src/lib/auth.ts          — COOKIE_NAME, COOKIE_MAX_AGE, isAuthed()
2. src/lib/persona.ts       — readPersona() with process-level cache
3. src/lib/kv.ts            — Redis.fromEnv(), appendMemory, listMemory (with tokenCap),
                              clearMemory, saveRoast, saveReceipt
4. src/lib/ai.ts            — MODEL = "anthropic/claude-sonnet-4.6", MAX_OUTPUT_TOKENS,
                              buildSystemPrompt({ includeMemory })
5. src/middleware.ts        — passphrase gate per IG §8. PUBLIC = ["/login", "/api/login"].
6. src/app/api/login/route.ts — POST passphrase, set http-only cookie. Zod body parse.
7. src/app/login/page.tsx   — client form per ST §5.1. 360px column, vertically centered.
                              No header. Single passphrase input, bottom 1px --color-rule
                              that promotes to 2px --color-accent on focus. "Enter" button
                              88×40, --color-ink fill, white text, IBM Plex Mono 12px uppercase,
                              2px corner. No placeholder text in the input. Display:
                                "Coach" — Newsreader 64px italic 500, --color-ink
                                "This URL belongs to one person." — Source Serif 4 17/28, --color-ink-mute
                              On submit: POST /api/login. 401 → render error line
                              "ERROR — wrong passphrase." in --color-accent eyebrow + --color-ink body.
                              200 → router.push("/chat").

Do NOT scaffold /chat, /roast, /receipt, /memory yet — Session 3 owns those.
```

**Done check:**

- [ ] Visiting `/chat` redirects to `/login?from=/chat`.
- [ ] Submitting the wrong passphrase shows the error line and stays on `/login`.
- [ ] Submitting `COACH_PASSWORD` from `.env.local` redirects to `/chat` (which will 404 until Session 3 — that's expected).
- [ ] DevTools → Application → Cookies shows `coach_session` with `HttpOnly` and `Secure` ticked.

**Commit:**

```bash
git add -A && git commit -m "feat: persona, ai, kv, auth gate, login"
```

---

## Session 3 — Three Features in Parallel (10 min) · 0:08 → 0:18

**Goal:** `/chat`, `/roast`, `/receipt` all reachable, all wired to Claude, all rendered per stitch-tokens. This session uses **three parallel subagents** in a single Agent dispatch.

**Read:** IG → §9 *Per-Route Specs* (Chat, Roast, Receipt). ST → §5.2 *Chat*, §5.3 *Roast*, §5.4 *Receipt*. §6 *Component Specs*.

### How to dispatch (do this exactly)

Send a single message to Claude Code with three Agent tool calls — one per feature. Each subagent owns one route + one page + nothing else. They share Header (already built), the AI client (`lib/ai.ts`), and KV helpers (`lib/kv.ts`) — none of which they should modify.

**Subagent prompt — Chat (subagent A):**

```
Read coach/docs/coach-implementation-guide.md §9 (the `/api/chat` block).
Read coach/docs/input/stitch-tokens.md §5.2 (Chat layout) and §6 (Component Specs).

Build TWO files. Do not touch any other file. Do not modify lib/ai.ts.

1. src/app/api/chat/route.ts — exactly the IG §9 code for /api/chat.

2. src/app/chat/page.tsx — "use client" component.
   - Render <Header active="chat" />.
   - Page width: max 1080px outer, 680px reading column for the transcript and composer.
   - State: messages: { role: "user"|"assistant"; content: string }[].
   - Transcript: each turn is a flat block per ST §5.2 — speaker label "COACH — HH:MM" or
     "YOU — HH:MM" in utility-label --color-ink-mute, 6px gap, then body-md Source Serif 4
     17/28 ragged-right. 32px between turns. A 240px-wide 1px --color-rule centered between
     turns. The "thinking." italic placeholder when in-flight (replaces the slot the next
     assistant turn would occupy).
   - Empty state: italic Newsreader 22/1.4 sentence "Ask your Coach anything." in --color-ink-mute.
   - Composer (bottom of column): a 1px --color-rule separator full-column-width 48px below
     last turn. Textarea, 680px, min-height 96px, --color-recess fill, NO border, body-md.
     Placeholder italic --color-ink-mute "Ask anything.". Right-aligned "Send" text button
     in utility-label 12px uppercase --color-ink, no fill no border. Label swaps to
     "Thinking" while POST /api/chat is in flight.
   - On send: append user turn → POST /api/chat with full messages array → append assistant
     turn from { text } → clear textarea.
   - On unload (window 'beforeunload'): if messages.length >= 2, navigator.sendBeacon to
     /api/extract-memory with the messages array. Best-effort, no error handling.
   - Accent budget: 1 (the active tab underline). No other --color-accent uses anywhere.
```

**Subagent prompt — Roast (subagent B):**

```
Read coach/docs/coach-implementation-guide.md §9 (the `/api/roast` block).
Read coach/docs/input/stitch-tokens.md §5.3 (Roast layout) and §6 (Component Specs).

Build TWO files. Do not touch any other file.

1. src/app/api/roast/route.ts — exactly the IG §9 code for /api/roast, including the
   Zod RoastSchema and the saveRoast call. Uses generateText + Output.object({ schema }).

2. src/app/roast/page.tsx — "use client".
   - <Header active="roast" />.
   - Two-column split inside the 1080px shell, 50/50, with a 1px --color-rule running
     vertically full-height between columns.
   - LEFT column (input):
       * Eyebrow utility-label "PASTE YOUR WORK" in --color-ink-mute.
       * Textarea, --color-recess fill, min-height 60vh, body-md 17/28, 24px padding,
         no visible border.
       * "Roast it" solid button: --color-ink fill, white text, utility-label 12px uppercase,
         96×40px, 2px corner radius.
       * Character count, utility-label --color-ink-mute, below right.
   - RIGHT column (output):
       * Eyebrow utility-label "THE COACH SAYS".
       * Verdict line: headline-sm 24px/1.4 --color-ink, centered, max two lines.
       * Below verdict: 120px-wide 1px --color-accent rule, centered.   ← accent #1
       * Summary: body-md ragged right.
       * Numbered concerns list (no bullets, no rules between items):
           - Mono index "01", "02", ... in utility-label hung in left margin (negative
             indent 32px), --color-ink-mute.
           - Concern text in body-md ragged right.
           - 18px vertical gap between items.
       * For up to TWO concerns where severity === "high": REPLACE the mono index with a
         2px-wide --color-accent vertical rule running the full item-height in the left
         margin. ← accent #2 and (optional) #3.
       * Hard cap: 3 --color-accent instances per screen including the active tab underline.
         If a 4th would render, use --color-ink instead.
   - On "Roast it" click: POST /api/roast → render result. Button label becomes "Thinking"
     while in-flight. On failure, render "ERROR — roast failed. Try again." in --color-ink
     with the eyebrow "ERROR" in --color-accent (counts toward the accent budget for that
     state — drop verdict rule in that case).
```

**Subagent prompt — Receipt (subagent C):**

```
Read coach/docs/coach-implementation-guide.md §9 (the `/api/receipt` block).
Read coach/docs/input/stitch-tokens.md §5.4 (Receipt layout) and §6 (Component Specs).

Build TWO files. Do not touch any other file.

1. src/app/api/receipt/route.ts — exactly the IG §9 code for /api/receipt.

2. src/app/receipt/page.tsx — "use client".
   - <Header active="receipt" />.
   - Single 680px reading column inside the 1080px shell.
   - Page title: headline-md 32px/1.3. Compute the long-form date in IST: e.g.
     "Tuesday, May 17, 2026". The date IS the title — no separate "Receipt" label anywhere.
   - 8px gap. Eyebrow utility-label "WHAT YOU DID TODAY".
   - 48px gap.
   - Textarea (--color-recess, body-md, no border, min-height 30vh) for the user's bullet
     dump / git log / calendar paste.
   - "Compose" solid button (96×40, --color-ink fill, white text, utility-label 12px upper,
     2px corner). Label swaps to "Thinking" while in-flight.
   - On POST /api/receipt success: replace textarea+button area with the summary prose:
       * body-md 17/28 ragged right, paragraphed naturally.
       * Drop cap on the very first character: Newsreader 56px/1 weight 500, color
         --color-accent, floated left, hanging two lines deep, 8px right margin.
       * NEVER render the AI text as a bulleted list. Continuous prose only — Source Serif 4
         column. If the model returned bullets anyway, the spec is to render verbatim — do
         not post-process, the persona is responsible for prose.
       * Below summary: a 1px --color-rule full-width separator.
       * A second --color-recess textarea labelled by eyebrow "TOMORROW" for next-day notes
         (no submit action in v1 — saved with the same /api/receipt call if the user clicks
         Compose again, otherwise persisted only in component state).
   - Accent budget: 2 (active tab underline + drop cap on first paragraph). No 3rd.
```

**While the three subagents run:** monitor each. When all three return, **manually** smoke-test by visiting `/chat`, `/roast`, `/receipt` in three tabs. Do not trust subagent "I'm done" messages — open the browser.

**Done check:**

- [ ] `/chat` → can send a message, get a response, see prior turns with hairline separators. No bubbles, no avatars.
- [ ] `/roast` → paste a paragraph, click "Roast it", see the verdict line + accent rule + numbered concerns. Two high-severity items show vertical accent rules.
- [ ] `/receipt` → paste a bullet list, click "Compose", see prose with a terracotta drop cap.
- [ ] Every screen still shows the Header with the correct active tab underline.

**Commit:**

```bash
git add -A && git commit -m "feat: chat, roast, receipt — three features wired to Claude"
```

---

## Session 4 — Memory (4 min) · 0:18 → 0:22

**Goal:** Memory grows across Chat sessions. `/memory` reads it. `/clear-memory` empties it.

**Read:** IG → §7 *KV Layout*, §9 *`/api/memory` + `/api/extract-memory`*. ST → §5.5 *Memory*.

**Claude Code prompt:**

```
Read coach/docs/coach-implementation-guide.md §7 and §9 (memory routes).
Read coach/docs/input/stitch-tokens.md §5.5 (Memory layout).

Build, in order:

1. src/app/api/memory/route.ts — GET listMemory({ limit: 200 }), DELETE clearMemory.

2. src/app/api/extract-memory/route.ts — exactly the IG §9 code. generateText +
   Output.object({ schema: ExtractSchema }), then appendMemory(result.output.takeaways).

3. src/app/memory/page.tsx — SERVER component (no "use client").
   - <Header active="memory" />.
   - Single 680px column.
   - Title: headline-md 32px/1.3 — "What Coach remembers." (period included; it's a sentence).
   - Eyebrow utility-label --color-ink-mute showing entry count: "N ENTRIES, MOST RECENT FIRST"
     (or "0 ENTRIES" — render normally, the empty state handles the no-data case).
   - 32px gap.
   - Each entry is two lines:
       * Line 1: timestamp in utility-label "MAY 14, 2026 — 09:14" --color-ink-mute.
       * Line 2: italic body-md 16/26 --color-ink, max two lines, truncate with ellipsis.
   - Between entries: 24px vertical gap and a 1px --color-rule hairline. The rule begins
     at the left edge and ENDS 80px short of the right edge (asymmetric marginalia rule).
   - Empty state: italic Newsreader 22/1.4 "What Coach remembers." (centered, --color-ink-mute,
     in place of the title block — the title becomes the empty state. Eyebrow + entries section
     are omitted entirely.)
   - Bottom of list: a text link "/clear-memory" utility-label 11px lowercase --color-accent,
     underlined. Wrap it in a small client form (use a server action OR a "use client" sub-
     component) that calls DELETE /api/memory then router.refresh().
   - Accent budget: 2 (active tab underline + the /clear-memory link).

4. Wire src/app/chat/page.tsx (already exists from Session 3) to fire
   navigator.sendBeacon("/api/extract-memory", JSON.stringify({ messages })) on the
   beforeunload event when messages.length >= 2. Already specced in Session 3's Chat prompt;
   confirm it is in place — if not, add it now.
```

**Done check:**

- [ ] `/memory` renders the empty state on first visit.
- [ ] Have one Chat exchange of at least 2 turns. Reload `/chat` (triggers `beforeunload`).
- [ ] `/memory` now shows a new entry with today's timestamp.
- [ ] `/clear-memory` link returns the page to the empty state without a full page reload.

**Commit:**

```bash
git add -A && git commit -m "feat: memory — extract on session end, read on /memory, clear link"
```

---

## Session 5 — Local Smoke Test + Studio Swap Rehearsal (3 min) · 0:22 → 0:25

**Goal:** Prove everything works locally before touching the internet.

This session is **manual**, not a Claude Code prompt. Time-box it strictly.

### Smoke test sequence (90 seconds)

1. Stop and restart `pnpm dev` to flush the persona cache.
2. Open a private/incognito window → `http://localhost:3000` → redirected to `/login`.
3. Submit `COACH_PASSWORD` → `/chat` loads.
4. **Chat**: send one short question. Confirm voice matches your primary persona. Note the wording.
5. **Roast**: switch to `/roast`, paste a one-paragraph email draft, click "Roast it". Confirm verdict + concerns render with proper accent discipline.
6. **Receipt**: switch to `/receipt`, paste 3 bullets ("shipped X, met with Y, broke Z"), click "Compose". Confirm prose with drop cap, not bullets.
7. **Memory**: close the Chat tab to trigger `beforeunload`. Open `/memory`. Confirm an entry appeared.

### Studio Swap rehearsal (90 seconds)

The rehearsal is local-only. The live swap happens in Session 6.

```bash
# Stop dev server first (Ctrl-C). Cache must clear.
cp src/persona/CLAUDE.md /tmp/coach-primary-persona.md          # safety backup
cp coach/persona/CLAUDE.md src/persona/CLAUDE.md                # swap to alt voice
pnpm dev                                                        # restart, cold cache
```

Open `/chat`, ask the same question you asked above. **The voice should change.** If it doesn't:

- The persona cache didn't clear — `pnpm dev` not restarted? `next.config.ts` doing something unexpected?
- Wrong file path — confirm `src/persona/CLAUDE.md` is the one your route reads (`lib/persona.ts`).

After the rehearsal, **restore the primary voice** so the live demo opens with it:

```bash
# Stop dev server.
cp /tmp/coach-primary-persona.md src/persona/CLAUDE.md
pnpm dev
```

### Done check

- [ ] All four flows pass locally.
- [ ] Studio Swap visibly changes the voice on a local restart.
- [ ] Primary persona is restored — the next `git status` should show `src/persona/CLAUDE.md` unchanged from HEAD.

**No commit yet.** The smoke test changes nothing. If you fixed a bug during the test, commit that as `fix: ...`.

---

## Session 6 — Ship: GitHub → Vercel → Studio Swap Live (5 min) · 0:25 → 0:30

**Goal:** A public URL serves Coach in the primary voice. A `git push` then changes the voice live. Audience sees it.

**Constraint from the brief:** No `gh` remote and no `vercel link` exist until this session. Local-green first, then internet.

### Step 1 — GitHub (60 seconds)

```bash
gh repo create coach --private --source=. --remote=origin --push
```

This creates the repo, adds the remote, and pushes the working tree in one shot. Confirm at `https://github.com/$USER/coach`.

### Step 2 — Vercel link + Upstash KV (90 seconds)

```bash
vercel link            # interactive: pick the team, accept default project name "coach", set root = .
```

Now provision Upstash via the Marketplace — easiest path is the dashboard:

1. Open `https://vercel.com/$TEAM/coach/stores` in a browser tab.
2. Click **Connect Store** → **Marketplace** → **Upstash** → **Redis** (free tier).
3. Accept the integration. `KV_REST_API_URL` and `KV_REST_API_TOKEN` auto-populate across Production, Preview, and Development.

### Step 3 — The passphrase secret (30 seconds)

```bash
echo "your-passphrase-here" | vercel env add COACH_PASSWORD production
echo "your-passphrase-here" | vercel env add COACH_PASSWORD preview
echo "your-passphrase-here" | vercel env add COACH_PASSWORD development
```

(Use the same passphrase as `.env.local` for the demo — it's the one you'll type live.)

### Step 4 — Pull env (so the Studio Swap commit doesn't break local dev later)

```bash
vercel env pull .env.local
```

This rewrites `.env.local` with the OIDC-rotated AI Gateway credentials plus the Upstash vars. `COACH_PASSWORD` is now also pulled.

### Step 5 — First deploy (60 seconds + Vercel build wait)

```bash
vercel --prod
```

Output ends with a production URL like `https://coach-xxxx.vercel.app`. Open it in the audience's tab:

- Redirects to `/login`. Type the passphrase. Lands on `/chat`.
- One Chat turn proves AI Gateway + KV + persona all work in prod.

### Step 6 — Studio Swap, live (60-90 seconds, audience watching the URL)

```bash
cp coach/persona/CLAUDE.md src/persona/CLAUDE.md
git add src/persona/CLAUDE.md
git commit -m "swap: alt persona"
git push
```

Watch the Vercel dashboard. Fluid Compute redeploys in ~30 seconds. Once the new deploy is live, refresh the audience tab. Ask the same Chat question as before. **The voice changes.**

That's the demo.

### Done check

- [ ] Production URL is reachable; login works; one Chat turn works.
- [ ] The swap commit triggers a redeploy automatically.
- [ ] Post-redeploy, the voice is demonstrably different.
- [ ] If anything fails: see [FP → If the live demo fails](./coach-final-push.md#if-the-live-demo-fails).

**Tag and call it shipped:**

```bash
git tag v0.1.0 && git push --tags
```

---

## Appendix A — If You Are Behind at T+0:20

**SCOPE REDUCE.** From PRD §10 risks: "If behind at minute thirty, cut the Studio Swap demo and ship without it." Translation for the 30-min build: if at **0:20** you don't have all three features green, drop Memory (Session 4) entirely — `/memory` page can be a static "coming soon" empty state, and the `extract-memory` route can be omitted. Memory is the most reduction-safe feature because the audience can't see it absent.

Do NOT drop Auth (Session 2) or any of the three features. The PRD success definition requires Chat + Roast + Receipt + Auth on the deployed URL.

---

## Appendix B — Common Failure Modes

**"Voice didn't change after Studio Swap."**

- Server didn't redeploy — check the Vercel deployment list for the swap commit.
- Persona cache survived the deploy — confirm `lib/persona.ts` uses a module-level `let`, not a global on a singleton you import elsewhere. Cold-start = fresh process = fresh cache.
- You swapped the wrong file — `src/persona/CLAUDE.md` is the runtime file; `coach/persona/CLAUDE.md` is the source. `cp` direction matters.

**"AI Gateway returns 401 locally after `vercel env pull`."**

- Old `AI_GATEWAY_API_KEY` shadowing OIDC creds in your shell env — `unset AI_GATEWAY_API_KEY` and restart `pnpm dev`.
- Token expired — re-run `vercel env pull .env.local`. OIDC tokens auto-rotate but only on pull.

**"Roast renders verdict but `concerns` array is empty."**

- The model under-filled the schema. The AI SDK auto-retries once on schema violation; a true empty is the model's choice. Acceptable in v1 — render "No specific concerns. The Coach has nothing to add." (italic body-md, --color-ink-mute) in place of the numbered list.

**"`/memory` page is 500."**

- KV env vars missing in `.env.local`. Run `vercel env pull .env.local`. Confirm `KV_REST_API_URL` is non-empty.
- Upstash integration not provisioned — go back to Session 6 Step 2.

**"Cookie set but every request still redirects to /login."**

- `COACH_PASSWORD` in `.env.local` differs from the value you submitted. `isAuthed` does an exact string match against `process.env.COACH_PASSWORD` — any whitespace or trailing newline breaks it. Reset `.env.local` and the cookie.

---

*Coach Session Playbook v1 — Harshit Badiger, 2026-05-17. Linear 30-minute build sequence with parallel feature dispatch.*
