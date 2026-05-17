> **Reference Example**: This is the Coach project Implementation Guide, filled into the `sessions/IMPLEMENTATION_GUIDE.md` template. Coach is a 35-minute live-build product whose kill shot is swapping a persona file (voice = file, not config). Read this alongside `coach-session-playbook.md` and `coach-final-push.md` for the complete worked example. The companion PRD and Brand Guide aren't included in this bundle, but the document references them as `_italic placeholders_`.

---

# Implementation Guide: Coach

> **Status:** Build-ready reference
> **Date:** 2026-05-17
> **Architecture:** Next.js 15 App Router → `src/persona/CLAUDE.md` → AI SDK v6 → Vercel AI Gateway (OIDC) → Anthropic Claude Sonnet 4.6. Memory + saved outputs in Upstash Redis. Passphrase middleware on every route.
> **Stack:** Next.js 15 · React 19 · TypeScript strict · Tailwind CSS 4 · AI SDK v6 · `@upstash/redis` · `next/font/google`. No shadcn. No icon library. No ORM. No analytics.

---

## How to Use This Document

This guide is the **technical source of truth** for Coach. You do not read it linearly. The [Session Playbook](./coach-session-playbook.md) tells you which section to open before each session. When a session prompt says "read [IG → Section Name]", come here.

**Inputs that shaped this guide:**

- *PRD.md* — what to build, scope, success definition, risks
- *BRAND.md* — visual brief, voice ownership rule
- *docs/input/stitch-tokens.md* — tokens, type scale, per-screen layout mechanics, hard rejections

**What this guide adds:** routing, file layout, env wiring, the AI call, the KV layout, the auth gate, and the deploy order.

---

## 1. Architecture in One Diagram

```
┌──────────────────────────────────────────────────────────────────┐
│  Browser                                                         │
│    /login        — passphrase gate                               │
│    /chat         — conversation with Coach                       │
│    /roast        — paste-and-critique                            │
│    /receipt      — list-and-summary                              │
│    /memory       — read-only list, clear button                  │
└──────────────────────────────────────────────────────────────────┘
              │
              ▼
┌──────────────────────────────────────────────────────────────────┐
│  middleware.ts                                                   │
│    - reads `coach_session` cookie                                │
│    - any path except /login → redirect to /login if missing      │
└──────────────────────────────────────────────────────────────────┘
              │
              ▼
┌──────────────────────────────────────────────────────────────────┐
│  /api/login          POST passphrase → set cookie (7-day, http-only)│
│  /api/chat           POST {messages} → AI SDK generateText        │
│  /api/roast          POST {input}    → generateText + Output.object│
│  /api/receipt        POST {input}    → AI SDK generateText        │
│  /api/memory         GET list / DELETE clear                      │
│  /api/extract-memory POST {messages} → background extraction      │
└──────────────────────────────────────────────────────────────────┘
              │                                          │
              ▼                                          ▼
┌──────────────────────────────┐         ┌──────────────────────────┐
│  lib/persona.ts              │         │  lib/kv.ts (Upstash)     │
│   readPersona()              │         │   coach:memory   list    │
│   = fs.readFile(             │         │   coach:roasts   list    │
│      "src/persona/CLAUDE.md")│         │   coach:receipts list    │
│   cached per process         │         │   500-token injection cap│
└──────────────────────────────┘         └──────────────────────────┘
              │
              ▼
┌──────────────────────────────────────────────────────────────────┐
│  Vercel AI Gateway via OIDC (prod + local, via `vercel env pull`)│
│    model string: "anthropic/claude-sonnet-4.6"                   │
└──────────────────────────────────────────────────────────────────┘
```

**Decision log:**

- **AI runtime:** AI SDK v6. `generateText` covers everything: plain text for Chat and Receipt, structured `Output.object({ schema })` for Roast. Streaming intentionally OFF for v1 — wait-for-full-response is in-scope per PRD §7.
- **AI auth:** Vercel AI Gateway via OIDC in every environment, including local dev. After `vercel link`, `vercel env pull .env.local` writes auto-rotating OIDC credentials that the SDK consumes without any code changes. We never instantiate a provider client and we never store a long-lived provider key.
- **AI provider wiring:** AI Gateway model strings (`"anthropic/claude-sonnet-4.6"`). No `@ai-sdk/anthropic` direct import. Swapping providers is a string change later.
- **Persistence:** Upstash Redis via `@upstash/redis`. Two REST env vars only. Vercel's old KV product is gone — the Vercel Marketplace integration provisions Upstash and writes `KV_REST_API_URL` / `KV_REST_API_TOKEN` for us.
- **Auth:** Hand-rolled passphrase + http-only cookie in `middleware.ts`. No Lucia, no NextAuth, no Clerk. One owner, one URL, one secret.
- **Persona:** Read at request time with `fs.readFile`. Cached in a module-level `let` per Node process. Studio Swap = `git push` triggers fresh deploy → fresh process → fresh read.
- **UI:** Plain React + Tailwind 4 with OKLCH tokens in `@theme`. No shadcn, no Base UI, no icon library — the *stitch-tokens hard rejections* ban them.

---

## 2. Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 15 App Router | Server Components + middleware + route handlers in one project. |
| Language | TypeScript strict | No `any`. Zod at boundaries. |
| Styling | Tailwind CSS 4 (`@theme`) | OKLCH tokens land in CSS via `@theme`. No config file needed for v4. |
| Fonts | `next/font/google` | Newsreader · Source Serif 4 · IBM Plex Mono. Self-hosted, zero layout shift. |
| AI | AI SDK v6 (`ai`) | `generateText` for prose; `generateText` + `Output.object({ schema })` for the structured Roast output. |
| AI routing | Vercel AI Gateway via model string `"anthropic/claude-sonnet-4.6"` | OIDC in prod, no provider client wired. |
| Storage | `@upstash/redis` (provisioned via Vercel Marketplace) | REST, no pool, edge-safe. |
| Validation | Zod | Roast structured output schema. Login body. API contracts. |
| Hosting | Vercel (Fluid Compute) | Default. 300s function timeout, OIDC tokens, KV via marketplace. |

**Forbidden by stitch-tokens (canonical list — do not soften):** shadcn, Radix, Material, Chakra, Lucide, Phosphor, Heroicons, Fraunces, Inter, Geist, chat bubbles, gradients, glass effects, dark mode, accent picker, streaming tokens, second accent of any kind.

---

## 3. File Structure

The Next.js project lives at the repo root (`/Users/harshitbadiger/Projects/coach-demo/`). The Shipwright workspace (`coach/` with PRD, BRAND, docs/) stays a sibling for reference and is NOT touched at runtime.

```
coach-demo/                           ← Next.js project root
├── src/
│   ├── app/
│   │   ├── layout.tsx                ← fonts, <body>, global header (no header on /login)
│   │   ├── page.tsx                  ← redirects to /chat
│   │   ├── globals.css               ← Tailwind v4 @theme block with OKLCH tokens
│   │   ├── login/page.tsx            ← single passphrase input
│   │   ├── chat/page.tsx             ← composer + transcript ("use client")
│   │   ├── roast/page.tsx            ← two-column input + critique ("use client")
│   │   ├── receipt/page.tsx          ← list-in, summary-out, drop cap ("use client")
│   │   ├── memory/page.tsx           ← read-only list (server component)
│   │   └── api/
│   │       ├── login/route.ts        ← POST verify passphrase, set cookie
│   │       ├── logout/route.ts       ← POST clear cookie (optional, used by /memory)
│   │       ├── chat/route.ts         ← POST → generateText
│   │       ├── roast/route.ts        ← POST → generateText + Output.object (Zod schema)
│   │       ├── receipt/route.ts      ← POST → generateText
│   │       ├── memory/route.ts       ← GET list, DELETE clear
│   │       └── extract-memory/route.ts ← POST {messages} → 2-3 takeaways → append
│   ├── components/
│   │   ├── Header.tsx                ← Coach wordmark + tabs (CHAT|ROAST|RECEIPT) + memory link
│   │   ├── Composer.tsx              ← shared textarea + send button pattern (Chat)
│   │   └── EmptyState.tsx            ← italic Newsreader 22px sentence
│   ├── lib/
│   │   ├── persona.ts                ← readPersona() — file read, process-cached
│   │   ├── ai.ts                     ← MODEL string, MAX_OUTPUT_TOKENS, buildSystemPrompt()
│   │   ├── kv.ts                     ← Upstash Redis client + helpers (memory/roasts/receipts)
│   │   └── auth.ts                   ← COOKIE_NAME, isAuthed(), setSession()
│   ├── persona/
│   │   └── CLAUDE.md                 ← the voice. Single source. Read on every request.
│   └── middleware.ts                 ← passphrase gate on every path except /login + /api/login
├── public/                           ← empty for v1 (no favicons specced)
├── package.json
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs                ← Tailwind v4 postcss plugin
├── .env.example                      ← committed
├── .env.local                        ← git-ignored, real values
└── CLAUDE.md                         ← Claude Code context, loaded every session

coach/                                ← Shipwright workspace (reference only, untouched at runtime)
├── PRD.md
├── BRAND.md
├── persona/CLAUDE.md                 ← the "alt voice" Studio Swap target lives here
└── docs/
    ├── input/stitch-tokens.md
    ├── coach-implementation-guide.md
    ├── coach-session-playbook.md
    └── coach-final-push.md
```

**Persona path note.** The runtime persona is `src/persona/CLAUDE.md` (inside the Next.js project). The Shipwright workspace at `coach/persona/CLAUDE.md` is the **Studio Swap source**: the file we hot-swap into `src/persona/` to change the voice. See [coach-final-push.md → Studio Swap Choreography](./coach-final-push.md#studio-swap-choreography).

---

## 4. Environment Variables

Three you set, two you pull. Nothing else.

```bash
# .env.local — populated by `vercel env pull .env.local` after `vercel link`.
COACH_PASSWORD=change-me                                  # the only secret you set by hand
KV_REST_API_URL=https://...upstash.io                     # auto-set by Vercel→Upstash integration
KV_REST_API_TOKEN=...                                     # auto-set by Vercel→Upstash integration
# AI Gateway credentials are pulled as auto-rotating OIDC tokens by `vercel env pull` —
# no key to commit, no key to rotate.
```

**Production (Vercel dashboard, all three environments):**

- `COACH_PASSWORD` — set by hand
- `KV_REST_API_URL`, `KV_REST_API_TOKEN` — auto-populated by the Upstash marketplace integration at link time
- **AI auth is OIDC everywhere.** Vercel-hosted runtimes get tokens automatically; local dev gets them via `vercel env pull .env.local`. No long-lived gateway key, no manual rotation.
- **No direct provider credentials.** We route exclusively through AI Gateway, so no long-lived provider key lives in env vars or code.

---

## 5. The Persona Loader

`src/lib/persona.ts`. The whole point of Coach is this file.

```ts
import { readFile } from "node:fs/promises";
import path from "node:path";

let cached: string | null = null;

export async function readPersona(): Promise<string> {
  if (cached) return cached;
  const filePath = path.join(process.cwd(), "src", "persona", "CLAUDE.md");
  cached = await readFile(filePath, "utf8");
  return cached;
}
```

**Why process-cached, not request-cached.** Studio Swap relies on a redeploy = new process = empty cache → fresh read on first request. Caching per request would still re-read on every cold start; caching per process is one read per Lambda instance.

**Why not `import.meta.glob` or a bundled string.** A bundled persona would not be swappable post-deploy. The file read is the swap mechanic.

---

## 6. The AI Call

`src/lib/ai.ts`. One model string, one system-prompt builder, three callers. No provider client — the AI SDK picks the transport from the model string `"provider/model"`.

```ts
import { readPersona } from "./persona";
import { listMemory } from "./kv";

export const MODEL = "anthropic/claude-sonnet-4.6";
export const MAX_OUTPUT_TOKENS = { chat: 1024, roast: 1200, receipt: 800 };

export async function buildSystemPrompt(opts: { includeMemory: boolean }) {
  const persona = await readPersona();
  if (!opts.includeMemory) return persona;

  const memory = await listMemory({ tokenCap: 500 });
  if (memory.length === 0) return persona;

  const block = memory.map((m) => `- ${m.text}`).join("\n");
  return `${persona}\n\n[Memory — what Coach remembers about this user]\n${block}`;
}
```

**Route-level callers (sketch — full impl in route files below).**

- **Chat:** `generateText({ model: MODEL, system: await buildSystemPrompt({ includeMemory: true }), messages, maxOutputTokens: MAX_OUTPUT_TOKENS.chat })`
- **Roast:** `generateText({ model: MODEL, system: persona, output: Output.object({ schema: RoastSchema }), prompt: input, maxOutputTokens: MAX_OUTPUT_TOKENS.roast })` → read `result.output`
- **Receipt:** `generateText({ model: MODEL, system: persona, prompt: \`These are the things I did today:\n\n${input}\`, maxOutputTokens: MAX_OUTPUT_TOKENS.receipt })`

**Why no streaming in v1.** PRD §7. Wait-for-full-response is in-scope. Streaming UI is out-of-scope. If v2 wants streaming, the AI SDK route is `streamText` + `toUIMessageStreamResponse()` on the server and `@ai-sdk/react` `useChat({ transport: new DefaultChatTransport(...) })` on the client. Plan it, do not do it.

**Why memory only injects on Chat.** Roast and Receipt take an explicit pasted input — pre-loading "what Coach remembers" would dilute the response. Memory belongs to the conversational mode.

---

## 7. The KV Layout

`src/lib/kv.ts`. Three list keys. Nothing else.

| Key | Type | Contents | Read by | Written by |
|---|---|---|---|---|
| `coach:memory` | Redis list (LPUSH) | `{ ts: ISO, text: string }` JSON entries | `buildSystemPrompt` (Chat), `/memory` page | `/api/extract-memory` after a Chat session |
| `coach:roasts` | Redis list (LPUSH) | `{ ts, input, verdict, summary, concerns[] }` | (not auto-read; for future ref) | `/api/roast` |
| `coach:receipts` | Redis list (LPUSH) | `{ ts, input, summary }` | (not auto-read) | `/api/receipt` |

```ts
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export type MemoryEntry = { ts: string; text: string };

export async function appendMemory(entries: string[]) {
  if (entries.length === 0) return;
  const now = new Date().toISOString();
  const payloads = entries.map((text) => JSON.stringify({ ts: now, text }));
  await redis.lpush("coach:memory", ...payloads);
}

export async function listMemory(opts?: { tokenCap?: number; limit?: number }) {
  const limit = opts?.limit ?? 50;
  const raw = await redis.lrange<string>("coach:memory", 0, limit - 1);
  const entries: MemoryEntry[] = raw.map((r) => JSON.parse(r));
  if (!opts?.tokenCap) return entries;

  // ~4 chars per token rule of thumb; greedy fill from most recent.
  let used = 0;
  const cap = opts.tokenCap * 4;
  const kept: MemoryEntry[] = [];
  for (const e of entries) {
    used += e.text.length;
    if (used > cap) break;
    kept.push(e);
  }
  return kept;
}

export async function clearMemory() {
  await redis.del("coach:memory");
}

export async function saveRoast(payload: object) {
  await redis.lpush("coach:roasts", JSON.stringify({ ts: new Date().toISOString(), ...payload }));
}

export async function saveReceipt(payload: object) {
  await redis.lpush("coach:receipts", JSON.stringify({ ts: new Date().toISOString(), ...payload }));
}
```

**Why no vector DB, no semantic search, no summarization.** PRD §7 caps memory at ~500 tokens injected. Rolling window is enough at this scale. Don't reach for Pinecone here.

**Why LPUSH + LRANGE 0 N.** Newest first, no sort needed. `/memory` lists the most recent 50; the system prompt takes the most recent that fit under the cap.

---

## 8. Auth Gate

`src/middleware.ts` + `src/app/api/login/route.ts` + `src/lib/auth.ts`.

```ts
// src/lib/auth.ts
export const COOKIE_NAME = "coach_session";
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export function isAuthed(cookieValue: string | undefined): boolean {
  return !!cookieValue && cookieValue === process.env.COACH_PASSWORD;
}
```

```ts
// src/middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME, isAuthed } from "@/lib/auth";

const PUBLIC = ["/login", "/api/login"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (PUBLIC.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    return NextResponse.next();
  }
  const cookie = req.cookies.get(COOKIE_NAME)?.value;
  if (isAuthed(cookie)) return NextResponse.next();

  const loginUrl = new URL("/login", req.url);
  loginUrl.searchParams.set("from", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
```

```ts
// src/app/api/login/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import { COOKIE_NAME, COOKIE_MAX_AGE } from "@/lib/auth";

const Body = z.object({ password: z.string().min(1) });

export async function POST(req: Request) {
  const { password } = Body.parse(await req.json());
  if (password !== process.env.COACH_PASSWORD) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, password, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });
  return res;
}
```

**Why the cookie value IS the password.** Single-user, single-secret design. The cookie cannot leak more than the user already gave. No session table needed. Rotating the secret invalidates all sessions automatically.

**Why `secure: true` always.** Local dev runs on `http://localhost`. Browsers allow `Secure` cookies on `localhost`. If you ever bind dev to a LAN IP, drop `secure` for dev only.

---

## 9. Per-Route Specs

### `/api/chat`

```ts
// src/app/api/chat/route.ts
import { generateText } from "ai";
import { z } from "zod";
import { MODEL, MAX_OUTPUT_TOKENS, buildSystemPrompt } from "@/lib/ai";

const Body = z.object({
  messages: z.array(
    z.object({ role: z.enum(["user", "assistant"]), content: z.string() })
  ),
});

export async function POST(req: Request) {
  const { messages } = Body.parse(await req.json());
  const system = await buildSystemPrompt({ includeMemory: true });
  const { text } = await generateText({
    model: MODEL,
    system,
    messages,
    maxOutputTokens: MAX_OUTPUT_TOKENS.chat,
  });
  return Response.json({ text });
}
```

Client (`/chat/page.tsx`) keeps `messages` in `useState`. On send: append user turn, POST, append assistant turn, clear input. **Button label swaps to `Thinking` during in-flight.** No spinner. On session-end (chat closed or "end session" affordance) → fire-and-forget POST to `/api/extract-memory`.

### `/api/roast`

```ts
// src/app/api/roast/route.ts
import { generateText, Output } from "ai";
import { z } from "zod";
import { MODEL, MAX_OUTPUT_TOKENS, buildSystemPrompt } from "@/lib/ai";
import { saveRoast } from "@/lib/kv";

const Body = z.object({ input: z.string().min(1).max(20000) });

const RoastSchema = z.object({
  verdict: z.string().describe("One-line verdict in the user's voice. Max 18 words."),
  summary: z.string().describe("One paragraph summary, 2-4 sentences."),
  concerns: z.array(
    z.object({
      severity: z.enum(["high", "medium", "low"]),
      text: z.string(),
    })
  ).max(8),
});

export async function POST(req: Request) {
  const { input } = Body.parse(await req.json());
  const system = await buildSystemPrompt({ includeMemory: false });
  const result = await generateText({
    model: MODEL,
    system,
    output: Output.object({ schema: RoastSchema }),
    prompt: `Critique the following in my voice. Be specific, cite lines or fragments when useful.\n\n---\n${input}\n---`,
    maxOutputTokens: MAX_OUTPUT_TOKENS.roast,
  });
  await saveRoast({ input, ...result.output });
  return Response.json(result.output);
}
```

The right column renders `verdict` as `headline-sm`, then a 120px-wide `--accent` rule, then `summary`, then numbered concerns. The two/three `severity === "high"` concerns get the 2px `--accent` left vertical rule per *stitch-tokens §5.3*. **Hard cap: 3 accent instances. Tab underline (1) + verdict rule (1) + 1 severity rule. If you'd render a 4th, replace it with `--ink`.**

### `/api/receipt`

```ts
// src/app/api/receipt/route.ts
import { generateText } from "ai";
import { z } from "zod";
import { MODEL, MAX_OUTPUT_TOKENS, buildSystemPrompt } from "@/lib/ai";
import { saveReceipt } from "@/lib/kv";

const Body = z.object({ input: z.string().min(1).max(10000) });

export async function POST(req: Request) {
  const { input } = Body.parse(await req.json());
  const system = await buildSystemPrompt({ includeMemory: false });
  const { text } = await generateText({
    model: MODEL,
    system,
    prompt: `These are the things I did today, in whatever form I had them. Write a short summary in my voice — continuous prose, no bullets, no table. End-of-day reflection or standup prep tone.\n\n---\n${input}\n---`,
    maxOutputTokens: MAX_OUTPUT_TOKENS.receipt,
  });
  await saveReceipt({ input, summary: text });
  return Response.json({ text });
}
```

UI renders today's long-form date as the title (`Tuesday, May 17, 2026`), eyebrow `WHAT YOU DID TODAY`, then the prose with a drop cap on the first letter. **Continuous prose, never a list.** The drop cap is the only accent on the page besides the tab underline.

### `/api/memory`

```ts
// src/app/api/memory/route.ts
import { listMemory, clearMemory } from "@/lib/kv";

export async function GET() {
  const entries = await listMemory({ limit: 200 });
  return Response.json({ entries });
}

export async function DELETE() {
  await clearMemory();
  return Response.json({ ok: true });
}
```

`/memory` page is a server component that calls `listMemory`. The `/clear-memory` link at the bottom is a client form that DELETEs and refreshes.

### `/api/extract-memory`

```ts
// src/app/api/extract-memory/route.ts
import { generateText, Output } from "ai";
import { z } from "zod";
import { MODEL, buildSystemPrompt } from "@/lib/ai";
import { appendMemory } from "@/lib/kv";

const Body = z.object({
  messages: z.array(
    z.object({ role: z.enum(["user", "assistant"]), content: z.string() })
  ).min(2),
});

const ExtractSchema = z.object({
  takeaways: z.array(z.string()).min(0).max(3).describe(
    "0-3 short third-person facts about the user that would help in a future session. Concrete, specific. No greetings. No advice."
  ),
});

export async function POST(req: Request) {
  const { messages } = Body.parse(await req.json());
  const system = await buildSystemPrompt({ includeMemory: false });
  const transcript = messages.map((m) => `${m.role.toUpperCase()}: ${m.content}`).join("\n\n");
  const result = await generateText({
    model: MODEL,
    system,
    output: Output.object({ schema: ExtractSchema }),
    prompt: `Extract 0-3 takeaways about the user from this conversation. Skip if nothing is worth remembering — empty array is allowed.\n\n${transcript}`,
    maxOutputTokens: 400,
  });
  await appendMemory(result.output.takeaways);
  return Response.json({ written: result.output.takeaways.length });
}
```

**Trigger from client.** Fire after a Chat session ends (tab close, page nav away, explicit "End session" click). Use `navigator.sendBeacon` for tab-close reliability. No retry — losing one extraction is fine.

---

## 10. Tokens → Tailwind v4 `@theme`

`src/app/globals.css`. The six core OKLCH tokens land here. Reference: *stitch-tokens §1*.

```css
@import "tailwindcss";

@theme {
  --color-paper:    oklch(96.5% 0.018 75);
  --color-recess:   oklch(93%   0.022 75);
  --color-rule:     oklch(86%   0.018 70);
  --color-ink-mute: oklch(50%   0.015 40);
  --color-ink:      oklch(22%   0.020 30);
  --color-accent:   oklch(58%   0.18  35);

  --font-display: var(--font-newsreader);
  --font-body:    var(--font-source-serif);
  --font-mono:    var(--font-plex-mono);

  --container-page:    1080px;
  --container-reading: 680px;

  --radius-btn: 2px;
}

@layer base {
  html, body { background: var(--color-paper); color: var(--color-ink); }
  body { font-family: var(--font-body); font-size: 17px; line-height: 1.55; }
}
```

Fonts wired in `src/app/layout.tsx`:

```tsx
import { Newsreader, Source_Serif_4, IBM_Plex_Mono } from "next/font/google";

const newsreader = Newsreader({
  subsets: ["latin"], weight: ["500"], style: ["normal", "italic"],
  display: "swap", variable: "--font-newsreader",
});
const sourceSerif = Source_Serif_4({
  subsets: ["latin"], weight: ["400", "600"],
  display: "swap", variable: "--font-source-serif",
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"], weight: ["400"],
  display: "swap", variable: "--font-plex-mono",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${newsreader.variable} ${sourceSerif.variable} ${plexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

**Why these three fonts (override on BRAND.md draft):** see *stitch-tokens §3*. Fraunces and Inter are the predictable 2026 editorial defaults; Newsreader + Source Serif 4 + IBM Plex Mono are the type-director-level choice.

---

## 11. Screen Implementation Notes

Full per-screen mechanics live in *stitch-tokens §5*. The implementation rules below are the deltas for Coach code.

| Screen | Server / Client | Header? | Notes |
|---|---|---|---|
| `/login` | Server shell + client form | **No** | Sits behind the gate, no header per stitch §5.1. Single 360px column, vertically centered. |
| `/chat` | `"use client"` | Yes (CHAT active) | `useState` for messages. POST `/api/chat`. Replace next-turn slot with italic `thinking.` during in-flight. |
| `/roast` | `"use client"` | Yes (ROAST active) | Two-column 50/50 with vertical 1px `--rule`. Solid `Roast it` button (96×40, 2px corner). |
| `/receipt` | `"use client"` | Yes (RECEIPT active) | Single 680px column. `Compose` button. Date string IS the title. |
| `/memory` | Server component | Yes (memory link active) | `await listMemory`. Read-only list. Italic body-md entries. `<form action={async () => ...}>` for clear. |

**Header** = `src/components/Header.tsx`. 56px tall. Coach wordmark (Newsreader 22/500) · 1px vertical rule · CHAT|ROAST|RECEIPT (`utility-label`, +0.08em tracked) · right-aligned `memory` (lowercase utility-label). Active tab carries 2px `--accent` underline 4px below baseline. Header is omitted on `/login`.

**The accent budget per screen (load-bearing rule, not a guideline):**

- `/login` — 0 (focus state on input may promote bottom rule to 2px `--accent` when focused; counts as 1 only while focused)
- `/chat` — 1 (active tab underline)
- `/roast` — 3 maximum (tab + verdict rule + up to 2 severity vertical rules; never a 4th)
- `/receipt` — 2 (tab + drop cap on first paragraph)
- `/memory` — 2 (tab/link + `/clear-memory` link in `--accent` underlined)

If you reach for a 4th accent on any screen, replace it with `--ink` and revisit the hierarchy. The cap is the brand.

---

## 12. Graceful Degradation

| Failure | Behavior | User-visible |
|---|---|---|
| AI Gateway timeout / 5xx | Catch in route, return 502 with `{ error: "...try again..." }` | `body-md` error line prefixed by `ERROR — ` in `--accent` (never red) |
| Structured `Output.object` returns invalid schema | AI SDK retries internally once; if still invalid, surface a 502 | Same error line |
| KV write fails (memory append, save) | Log to stderr, return 200 anyway — extraction is best-effort | Nothing — user already saw the AI response |
| KV read fails on `/memory` | Show empty-state copy *"What Coach remembers."* + zero entries | Italic empty state |
| Persona file missing | Throw — this is a deploy bug, not a user bug | 500 page (Next default is acceptable, this should never happen post-deploy) |
| Cookie present but `COACH_PASSWORD` rotated | `isAuthed` returns false → middleware redirects to `/login` | Login screen |

No retries on the AI call. Re-asking the same prompt twice in a row is the user's call, not the server's. The 300s Vercel timeout is well above the AI SDK's default; if a response takes 30s+ the model is the bottleneck, not the platform.

---

## 13. Rate Limiting

V1: none. Single-user product, single-user URL, single passphrase. The user is rate-limiting themselves.

If sharing the URL becomes a thing post-launch, add a per-IP token-bucket in `middleware.ts` against `coach:rl:<ip>` in Redis. Out of scope for the live build.

---

## 14. Security Checklist

- [ ] `COACH_PASSWORD` is set in every Vercel environment (Production, Preview, Development) before first deploy.
- [ ] No provider API keys (Anthropic, OpenAI) anywhere in Vercel envs — AI Gateway OIDC handles prod auth.
- [ ] Session cookie is `httpOnly`, `secure`, `sameSite: "lax"`.
- [ ] `middleware.ts` matcher excludes `/login` and `/api/login` only. No leaks.
- [ ] Zod parses every API request body. Reject malformed input with 400.
- [ ] Coach renders plain text only — never use React's raw-HTML escape hatch for AI output (XSS risk).
- [ ] No `console.log` in committed code.
- [ ] `KV_REST_API_TOKEN` is server-only (no `NEXT_PUBLIC_` prefix anywhere).

---

## 15. Performance Targets

| Metric | Target | Source |
|---|---|---|
| First load (`/login`) | < 1.5s | Lighthouse |
| First load (`/chat` cold) | < 2.5s | Lighthouse |
| Chat round-trip (model = sonnet, 200-token reply) | < 5s P95 | Manual stopwatch |
| Roast round-trip (structured output, 600 tokens) | < 8s P95 | Manual stopwatch |
| Receipt round-trip | < 6s P95 | Manual stopwatch |
| Cold start (Fluid Compute) | < 800ms | Vercel logs |

If Chat round-trip exceeds 5s noticeably, lower `MAX_OUTPUT_TOKENS.chat` to 768. The model is the long pole; UI tuning will not help.

---

## 16. Deploy Order (this is the actual ship sequence)

**The constraint:** No `vercel link` and no GitHub remote until local works end to end.

1. **Build locally.** `pnpm dev`. Verify every screen and every API path. See [Session Playbook → Session 7 Smoke Test](./coach-session-playbook.md#session-7--local-smoke-test-3-min).
2. **Studio Swap rehearsal — locally.** Swap `src/persona/CLAUDE.md`. Re-run a Chat turn. Voice changes. Restore the original.
3. **Create the GitHub repo.** `gh repo create coach --private --source=. --remote=origin --push`. First push includes the working tree.
4. **Create the Vercel project + link.** `vercel link` (creates a new project, names it, attaches it to the repo). Then **add the Upstash Marketplace integration** in the Vercel dashboard → KV env vars auto-populate across all environments.
5. **Set the secret.** `vercel env add COACH_PASSWORD production` (and `preview`, `development`).
6. **Pull env locally** (so future `vercel dev` and the Gateway OIDC work). `vercel env pull .env.local`.
7. **Deploy.** `vercel --prod`. Confirm health: open the URL, login, run one Chat turn.
8. **Studio Swap demo (live).** Edit `src/persona/CLAUDE.md` to the alt voice, commit, push, wait for redeploy (~30s on Fluid Compute), re-run the same Chat prompt. Voice changes.

**Why this order matters.** Linking Vercel or pushing to GitHub before local works guarantees the first prod deploy is broken and the audience watches you debug. Local-green first, then ship.

---

## 17. Known Limitations (V1)

| Limit | Reason | Planned |
|---|---|---|
| Single-user (one passphrase) | Per PRD §3, by design | Never |
| No streaming response UI | Out of scope per PRD §7 | V2 maybe (`streamText` + `useChat`) |
| No mobile-perfect layout | Desktop-first per PRD §7 | Adopt the 720px breakpoint from stitch-tokens §7 if usage warrants |
| Memory capped at ~500 tokens injected | Avoids vector DB complexity | Stays — the cap IS the design |
| No tests | 30-minute build, no time | Add Playwright smoke test for the four flows post-launch |

---

## 18. Cross-References

- Linear sequence to build all of this: [coach-session-playbook.md](./coach-session-playbook.md)
- Studio Swap choreography + demo polish: [coach-final-push.md](./coach-final-push.md)
- Token values + per-screen layout: *docs/input/stitch-tokens.md*
- Product scope and rationale: *PRD.md*
- Brand intent: *BRAND.md*

---

*Coach Implementation Guide v1 — Harshit Badiger, 2026-05-17. Source of truth for the build.*
