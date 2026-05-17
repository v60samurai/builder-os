> **Reference Example**: This is the Coach project Final Push, filled into the `sessions/FINAL_PUSH.md` template. It covers the "Studio Swap" choreography (the live demo's kill-shot moment) and the delight layer for a 35-min audience build. Read this alongside `coach-implementation-guide.md` and `coach-session-playbook.md` for the complete worked example.

---

# Final Push: Coach

> The 5% that makes 95% of the difference.
> Nothing here adds features. Everything makes the demo land.
> Read this **before** Session 6 of the [Session Playbook](./coach-session-playbook.md).
> Run the Studio Swap section **inside** Session 6.

---

## Part 1 — The Kill Shot: Studio Swap

Coach's kill shot is not a feature, it's a **demonstration**. The audience watches the same URL, the same login, the same `/chat` question — and the voice changes after a single `git push`. The PRD calls this *the Studio Swap*. This section is its choreography.

### What the audience must believe by the end

1. The voice is a **file**, not a model setting.
2. Swapping the file is **one commit**, not a config UI.
3. The same URL, same DB, same memory store keeps working — only the voice changes.

If any of those three things is unclear, the demo failed regardless of whether the code worked.

### The exact 90-second script

| Beat | Action | What you say (verbatim) | Time |
|---|---|---|---|
| 1 | Open production URL in audience tab. Login screen renders. | "This is Coach, live, at `coach-xxxx.vercel.app`. One passphrase, one owner." | 0:00 → 0:10 |
| 2 | Type passphrase. Land on `/chat`. | (silence) | 0:10 → 0:15 |
| 3 | Send a pre-rehearsed Chat prompt. Wait for the response. | (silence while it loads) | 0:15 → 0:25 |
| 4 | Read the response out loud. | "That's Coach in my voice. Now I'm going to swap the persona file." | 0:25 → 0:35 |
| 5 | Switch to terminal. Run the swap commands. | "One file. One commit. One push." | 0:35 → 0:50 |
| 6 | Switch to Vercel dashboard tab. Show the new deployment building. | "Vercel sees the push. Fluid Compute rebuilds in about thirty seconds." | 0:50 → 1:20 |
| 7 | Once green, switch back to audience tab. Refresh `/chat`. Re-send the **exact same** Chat prompt. | (silence — read the new response out loud after it arrives) | 1:20 → 1:35 |
| 8 | Land the line. | "Same URL. Same model. Same memory. The personality is the file." | 1:35 → 1:40 |

### The commands

```bash
cp coach/persona/CLAUDE.md src/persona/CLAUDE.md
git add src/persona/CLAUDE.md
git commit -m "swap: alt persona"
git push
```

That is the whole swap. Three commands the audience can read on screen. No env vars, no Vercel UI, no model swap, no provider change. The commit diff is one file.

### Choreography rules

- **Use a terminal with a font ≥24px.** The audience must read the commands as you type them.
- **Pre-type nothing.** Audience interest collapses if the commit message is already filled in.
- **Do not switch away from the dashboard until the deploy is "Ready"** — explaining a half-deployed app is a worse story than 20 seconds of silence.
- **Re-use the exact same Chat prompt** in step 7. The point is voice changing on identical input.
- **Do not refresh the page before the deploy is "Ready"** — a 502 mid-demo wastes the whole setup.

### Rehearse the swap with your local server first

The [Session Playbook → Session 5](./coach-session-playbook.md#session-5--local-smoke-test--studio-swap-rehearsal-3-min-022--025) rehearsal runs the swap locally. If the voice doesn't change locally, it won't change in prod either. Do not skip the local rehearsal.

### If the live demo fails

Don't apologize, don't troubleshoot in front of the audience. Pivot:

- **Build still running >60s past expected:** "While Vercel finishes, here's what's in the persona file." Switch to your editor, show the diff between primary and alt persona. The diff IS the demo.
- **502 / cold start fails:** Refresh once. If it fails again, switch to your terminal and `git log --oneline -3` — the commit history alone tells the swap story.
- **Voice didn't change after the redeploy:** The cache survived. Hit `/login` (forces a new request), then back to `/chat` — sometimes the next Lambda invocation gets a fresh process. If still stuck: "The deploy is live, you can see it in the URL. The cache layer is being stubborn — this is what production AI looks like." Move on.

The audience came for the build method, not a flawless demo. Recovery is on-brand.

---

## Part 2 — Persona Authoring (the two files that ARE the product)

The two persona files do more work than any line of code in Coach. Write them with care.

### The primary persona: `src/persona/CLAUDE.md`

This is the voice the audience meets first. Pre-flight copies your real `~/.claude/CLAUDE.md` into `src/persona/CLAUDE.md`. The audience will see your *actual* AI CTO voice. That's the point — Coach is a personal product.

If your `~/.claude/CLAUDE.md` is too long (>3,000 words) trim it for system-prompt economy. Keep:

- Identity (who you are, your role, your context)
- Voice rules (tone, length preferences, what you correct)
- Domain priorities (what you care about, what you refuse)
- The "do not" list (forbidden patterns — these read as real opinions)

Drop:

- File-structure boilerplate (`src/components/...` paths)
- Stack lists (React, Tailwind versions)
- Section headers that exist only for table-of-contents purposes

The model uses every token in the system prompt. Trim ruthlessly.

### The alt persona: `coach/persona/CLAUDE.md`

The swap target. **This is the most important authorial choice in the entire build.** A weak alt persona kills the kill shot.

**What makes a strong alt persona:**

- A voice that is **immediately and obviously different** on any input.
- A voice that is still **useful** — not a parody, not a joke. The audience should think "I'd actually use that," not "lol."
- A voice with **strong constraints** — "must reference one historical figure per response," "always opens with a one-line verdict," etc. Constraints register as design.

**Three alt personas that work (pick one):**

1. **The drill instructor.** Hard, terse, no hedging. Opens every response with the answer. No greetings, no apologies. Names exactly one risk you didn't think of. Closes with a single imperative sentence.
2. **The deadpan magazine editor.** Treats every request as a draft to edit. Replies in editorial prose — paragraphs, not lists. Quotes one rule of style per response (Strunk, Pinker, anyone you like). Refuses to be cheerful.
3. **The Stoic counsellor.** Replies through Stoic philosophy. References Marcus Aurelius, Seneca, or Epictetus by name once per response. Reframes complaints as decisions. Never longer than 120 words.

**Anti-patterns (do not use):**

- "Pirate Coach." It reads as a gimmick and the audience disengages.
- "Helpful assistant Coach." Indistinguishable from the primary. Wastes the swap.
- "Coach but rude." Mean ≠ different. The voice needs structure, not aggression.

### Sanity-check the alt persona before the demo

Run the alt locally (see [Session 5 rehearsal](./coach-session-playbook.md#session-5--local-smoke-test--studio-swap-rehearsal-3-min-022--025)). Ask three questions:

1. A vague question ("What should I work on?")
2. A specific question ("Is this PR ready to merge?")
3. A meta question ("Are you sure?")

If all three responses sound recognizably the alt voice — ship it. If even one sounds like the primary, the alt persona is too weak. Sharpen the constraints.

---

## Part 3 — The Demo Prompt Library

Pre-write the exact prompts you'll send during the demo. Memorize them. Practice them.

### For Chat (use the same prompt before AND after the swap)

Pick a prompt that **invites voice**, not a factual lookup:

- "I shipped three things this week but feel like I shipped nothing. Why?"
- "Should I push the Sunday demo to next weekend or hold the date?"
- "I keep saying 'we' when I mean 'I'. What is that?"

**Bad demo prompts** (they don't differentiate voices):

- "What is the capital of France?" — both voices answer "Paris."
- "Write a SQL query for ..." — voice barely surfaces in technical output.
- "Tell me a joke." — model defaults dominate, persona barely registers.

### For Roast

Pre-paste a 4-6 sentence draft. Realistic content. Examples:

- A Slack message you almost sent
- The opening paragraph of a real PR description
- A LinkedIn post draft

The audience reads the input fast. They should see *their own work* in the input — even if your input is yours, the empathy translates.

### For Receipt

Pre-paste 5-7 short bullets in a mix of formats:

```
- shipped Coach to staging
- 11:00 standup, talked through KV scope cut
- merged #4128, blocked on #4131
- two interviews (frontend candidate, ML candidate)
- gym
- read the Cursor postmortem
```

The bullets should be **slightly chaotic on purpose** — that proves Coach turns mess into prose.

---

## Part 4 — Pre-Demo Checklist (run T-12 hours)

### Persona

- [ ] `src/persona/CLAUDE.md` is the primary voice you want to open with.
- [ ] `coach/persona/CLAUDE.md` is a sharp, useful, immediately-different alt voice.
- [ ] Both files are clean ASCII (no smart quotes, no curly apostrophes — these can break some shells in `cat`/`echo` operations during the swap).
- [ ] The diff between primary and alt is small enough to read in 5 seconds on a projector if you have to fall back to "show the diff."

### Local

- [ ] `pnpm dev` boots in < 5s.
- [ ] Login → `/chat` → 1 turn round-trip in < 5s.
- [ ] Studio Swap rehearsal succeeded — voice clearly changed.
- [ ] Primary persona restored after rehearsal (run `git status` — should be clean).

### Browser

- [ ] Audience tab is in incognito/private mode (no cached cookie, login is part of the demo).
- [ ] Browser zoom set so the reading column is comfortable on a projector (typically 125%).
- [ ] DevTools is **closed**. Audience does not need to see network panels.
- [ ] The Vercel dashboard tab is pre-opened in the same browser, on the deployments page for the Coach project.

### Terminal

- [ ] Font size ≥24px. Background is the warm-paper palette if possible (matches the product).
- [ ] Prompt is short — `~/coach-demo $ ` not `harshitbadiger@MacBook-Pro coach-demo % `.
- [ ] Git CLI is logged in and the remote is set: `git remote -v` shows `origin → github.com/$USER/coach`.

### The line

- [ ] You can recite the closing line without thinking: **"Same URL. Same model. Same memory. The personality is the file."**

---

## Part 5 — Micro-Details That Make Coach Feel Premium

These are small, cheap, and add up. Run through them in the last 5 minutes of the build if time allows.

### Long-form date on Receipt (required, not optional)

`/receipt` title is the date itself — `Tuesday, May 17, 2026`. Use Intl, not `toLocaleDateString` with hardcoded format:

```ts
const today = new Date().toLocaleDateString("en-GB", {
  weekday: "long", year: "numeric", month: "long", day: "numeric",
});
// → "Tuesday, 17 May 2026"  — British order matches editorial reading rhythm
```

### "Thinking" placeholder, not a spinner

The PRD and stitch-tokens both ban spinners. Chat and Roast use the word `Thinking` as the button label during inflight. Chat additionally renders italic `thinking.` (lowercase, period, `--color-ink-mute`, body-md 15/22) in the slot where the next assistant turn would appear. No dots animation. The stillness is the design.

### Empty states that read like sentences

| Screen | Empty-state text | Style |
|---|---|---|
| `/chat` | *"Ask your Coach anything."* | Newsreader italic 22/1.4, `--color-ink-mute`, centered in reading column |
| `/roast` | *"Paste your work."* (output column only) | same |
| `/receipt` | (no empty state — the date title carries the page; eyebrow + input always render) | — |
| `/memory` | *"What Coach remembers."* (takes the place of the title) | Newsreader italic 22/1.4, `--color-ink-mute`, centered |

Periods are intentional. They are sentences, not labels.

### Error states in `--color-accent`, never red

Stitch tokens §6 makes this a hard rule. Errors render as:

> `ERROR — roast failed. Try again in a few seconds.`

The word `ERROR` is utility-label 12px uppercase in `--color-accent`. The rest is body-md 15/22 in `--color-ink`. No emoji. No red. No icon. The accent on the word `ERROR` counts toward the screen's accent budget — drop one of the existing accents (verdict rule, drop cap, etc.) in error state.

### Long-form timestamp on `/memory` entries

`/memory` shows `MAY 14, 2026 — 09:14`, not `2026-05-14T09:14`. Format:

```ts
new Date(entry.ts).toLocaleDateString("en-GB", {
  month: "short", day: "2-digit", year: "numeric",
}).toUpperCase() + " — " + new Date(entry.ts).toLocaleTimeString("en-GB", {
  hour: "2-digit", minute: "2-digit", hour12: false,
});
// → "14 MAY 2026 — 09:14"
```

The em-dash (`—`, U+2014) IS the divider. Per stitch §6, no SVG icons; the dash glyph is the design.

### Tab title that names the active feature

```ts
// inside each page (chat/roast/receipt/memory), set <title> via Next metadata:
export const metadata = { title: "Coach — Chat" };  // / "— Roast" / "— Receipt" / "— Memory"
```

Browser tab titles in the audience demo are an under-noticed signal. "Coach — Chat" in a tab reads as a real product.

### No favicon (intentional)

Stitch tokens §8 forbids icon libraries and decorative SVGs. The default Next.js favicon should be **removed**, not replaced. An empty favicon ask is consistent with the editorial restraint:

```html
<!-- in metadata: -->
<link rel="icon" href="data:," />
```

A browser tab with no favicon next to other tabs reads as **deliberate**. Most apps cannot do this.

---

## Part 6 — What NOT to Add in the Final Push

These tempt you in the last 10 minutes. Resist them:

- **Streaming responses.** PRD §7 cuts streaming explicitly. Adding it now risks a flaky demo for a feature the audience did not ask for.
- **A favicon "just to fill the tab."** No favicon is on-brand. A bad favicon is off-brand forever.
- **A "made by Harshit" footer.** Hard reject per stitch tokens §8. Coach IS your portfolio when it works.
- **Dark mode.** Forbidden. Do not add a toggle "just in case."
- **A second accent color "for emphasis on errors."** Errors render in `--color-accent` (the existing one). A new color would burn the entire "one accent" story.
- **Sentry, PostHog, analytics.** None of this is in the PRD. None of it makes the demo better. Skip until post-launch.
- **Loading dots / spinners / shimmer skeletons.** All banned. The "Thinking" word is the whole loading state.
- **Streaming markdown rendering** of the AI output. Plain text only. Markdown rendering in a magazine-set page reads as web slop.

If you find yourself in the final minutes adding any of the above, stop. Spend that time rehearsing the Studio Swap line one more time.

---

## Part 7 — Day-Of Setup Checklist (run T-30 minutes)

- [ ] Laptop battery > 80% **and** plugged in.
- [ ] Display mirroring tested with the projector. Color is warm-paper, not washed out.
- [ ] Wi-Fi works in the room. Backup hotspot is on.
- [ ] `gh auth status` → logged in.
- [ ] `vercel whoami` → correct team.
- [ ] `pnpm dev` boots locally without errors. Smoke-test all four flows one more time.
- [ ] Run a single Vercel CLI deploy preview to confirm the build pipeline is green (`vercel` without `--prod`). This catches stale dependencies before the audience is watching.
- [ ] Terminal font ≥24px. Browser zoom set. DevTools closed.
- [ ] Vercel dashboard tab pre-opened on the deployments page.
- [ ] The closing line memorized: **"Same URL. Same model. Same memory. The personality is the file."**
- [ ] A glass of water within reach. The Studio Swap moment is 90 seconds of talking through a deploy.

---

*Coach Final Push v1 — Harshit Badiger, 2026-05-17. Studio Swap is the kill shot. The persona file is the product.*
