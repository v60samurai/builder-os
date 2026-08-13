# Blueprint: [Product / Feature Name]

> **PRD is locked — this is HOW to build it and the step-by-step to v0.** One doc. Merges the spec (what connects), the technical reference (how it stays reliable), and the build plan (the sessions that ship it). Do not fork a second engineering doc.

**Status:** Draft / Ready for kickoff
**Mode:** greenfield | extends-existing
**Pattern source:** [the sibling feature this mirrors 1:1  |  "greenfield — no prior art"]
**Authoring inputs:** [PRD path] · [user-flows / journeys] · [Brand Guide] · [any script / pattern refs]
**DRI:** [Name] | **Last updated:** YYYY-MM-DD
**Architecture (one line):** {{FE → BFF/API → routes→controller→service→data → datastore(s) / external services}}
**Stack (one line):** {{Next.js 15 · TS strict · Postgres · Auth provider · host · analytics/monitoring}}

The Blueprint is the DEFINE→DELIVER gate artifact. No feature code ships until §2's ONE structural decision is resolved and no 🔵 hypothesis sits load-bearing on the critical path. Part 1 proves the spec is safe to start; Part 2 makes the running system reliable; Part 3 is the ordered path to v0. The Gate at the bottom runs twice: before build, and before ship.

---

## Confidence tag legend

Tag every load-bearing claim. Untagged prose reads as fact; most of it isn't yet.

- 🟢 **confirmed** — you read the code, ran the query, drove the flow. First-hand, not "someone told me."
- 🟡 **secondary** — the docs, a teammate, the framework README, an analyst report say so — not verified in this repo yet.
- 🔵 **hypothesis** — a stated belief, honestly flagged as untested. Useful *because* it's flagged.
- 🔴 **disproven** — you checked and it's wrong. Recorded so nobody on the build retries the dead end.

**Rule:** a 🔵 on the critical path blocks the Gate. Resolve it (test / spike), downgrade the dependency, or get an explicit DRI-signed risk acceptance. A 🔵 you can only defend by reasoning is a 🔵 — mark it, don't launder it into a 🟢.

## Two modes — pick one in the header

Everything below forks on this. Decide it once, stamp it in the header, read the matching branch in every section.

- **greenfield** — a new app. Frontend prototype + mock fixtures already exist; the **schema is derived from the fixtures** (the prototype discovered the real data shape). Fixtures-first. Principle: *derive, don't invent.* Run the full Part 3 arc top to bottom.
- **extends-existing** — a feature inside an existing repo. There is a **pattern source**: a known-good sibling feature you mirror 1:1. You *read the existing codebase*, cite exact paths, reuse infra/domain, spec only the deltas. Principle: *mirror the pattern, don't invent new infrastructure.* Skip Pre-Flight + the scaffold/landing/auth-setup sessions; build chunk-by-chunk from §8, then rejoin the shared back half.

**Anti-invent tripwire (both modes):** if you catch yourself minting a new table, endpoint, or chunk boundary inside a build session, stop — that decision belongs in Part 1, not in a prompt. "Build our own X / new service / new table" needs a reason the existing pattern can't cover, stated here. Reuse-don't-invent is the default.

---

# Part 1 — The Spec

> From the ERD. Decisions, not description. Every load-bearing claim tagged. This is what an implementation loop consumes — the chunk map (§8) and schema (§4) are what build sessions build *against*, never re-derive.

## 1. Summary & Guiding Principle

One paragraph: what this does, for whom, the core outcome. Then the ONE guiding principle in a sentence.

- greenfield example: *"Greenfield MVP — smallest thing that puts the core loop (capture → process → see result) in front of users. Schema derived from the prototype fixtures."* 🟢
- extends-existing example: *"Structural clone of [sibling feature] — reuse its domain/table/lifecycle; the only genuinely new logic is [X] (§5)."* 🟢

### Confirmed scope decisions

| Decision | Resolution | Tag |
|----------|------------|-----|
| [the core mechanism] | [what was chosen] | 🟢 |
| [a thing deliberately excluded] | **Out of scope** — [why / which future phase] | 🟢 |

Out-of-scope rows are not optional. An unstated exclusion is how "while we're at it" creep re-enters at build time. If a row here is 🔵, it is an Open Decision (§9), not a confirmed decision — move it.

## 2. ⭐ The ONE structural decision (review this first)

The single highest-risk architectural call — the one that forces a rewrite if wrong. State it before anything else, back it with evidence, tag confidence.

Examples of what qualifies: the identity key for the core record · the aggregate/table boundary · a sync-vs-async choice on the hot path · the one place you deviate from the pattern source · the read/write path for the highest-traffic query.

```
Decision:   [state it in one sentence]
Evidence:   [what you read / ran / measured that backs it]
Confidence: 🟢 | 🔵   ← if 🔵, this blocks the Gate until resolved
Blast radius if wrong: [what has to be rewritten]
Alternative considered + why rejected: [one line]
```

If you can only justify it by reasoning (not evidence), it is 🔵 — test it or cut the dependency before DELIVER. An unresolved ⭐ is a load-bearing hypothesis by definition.

## 3. Architecture Overview

The layered flow, top to bottom. greenfield: the intended structure. extends-existing: where it slots into the current layers per the repo's conventions — name the sibling files it sits beside.

```
{{ARCHITECTURE_DIAGRAM — fill from PRD + user-flows. Example skeleton:}}

USER ENTRY POINT(S)
    │
    ├── {{INTERFACE_1}} ─── {{BFF / API}} ─── {{service layer}} ─── {{AI / external, if any}}
    │     ({{capture}})       ({{REST/tRPC}})     ({{core logic}})      ({{model/service}})
    │                                  │
    │                                  ▼
    │                            {{DATASTORE}}  ({{auth · realtime · storage}})
    │                                  │
    │                                  ▼
    ├── {{INTERFACE_2}} ◄──── {{FRONTEND}}
    │     ({{consumption}})
    │
    └── {{BACKGROUND JOBS}} ─── {{SCHEDULER}}   ({{cadence}})
```

**Decision log — one sentence + tag per major choice:**
- Datastore: {{choice}} because {{reason}} 🟢
- Auth: {{choice}} because {{reason}} 🟢
- Frontend framework: {{choice}} because {{reason}} 🟢
- Background jobs: {{choice}} because {{reason}} 🔵
- AI provider (if applicable): {{choice}} because {{reason}} 🔵

## 4. Data Model & Schema

- **greenfield:** the schema derived from the fixtures — tables, columns, keys, relationships, indexes. **Every column traces to a fixture field a screen consumes.** No invented columns.
- **extends-existing:** the schema **delta** vs the live schema — enum values / columns / tables added, what's reused unchanged, and the **migration safety** (additive → backfill → cutover → drop; never a destructive one-step on a live table).
- **Both:** exact types for any stored payload; standard envelope `{ data, error }`; design tables around **access patterns** (write the frequent queries first); index every WHERE/JOIN/ORDER column of a frequent query (composite → most-selective first; don't over-index high-write tables); **cursor pagination** on every list; no N+1.

```
{{entity}} — [what it is, one line]
  id           uuid pk
  {{owner_fk}} uuid → {{parent}}(id) on delete cascade
  {{field}}    {{type}} [null? default?]   ← traces to fixture field / PRD field
  status       {{enum}} default '{{v}}'
  created_at / updated_at  timestamptz
  INDEX ({{owner_fk}}, status)   ← the frequent filter
```

State per user-owned table: row-level security / authz rule, and which tables the frontend subscribes to (if realtime).

## 5. API / Net-New Logic Contract

**Route surface** — every endpoint, its method, auth requirement, and owning chunk. Standard response shape `{ data?, error?, meta? }`.

```
METHOD  /api/{{path}}          auth: none|user|admin    chunk: C_    [one-line purpose]
GET     /api/{{entities}}      user                      C1          list (cursor paginated)
POST    /api/{{entities}}      user                      C1          create → atomic write
...
```

**Net-New Logic Contract** — the only genuinely new business logic. extends-existing: the one thing NOT inherited from the pattern source. Spec it precisely enough to verify a port — rule-by-rule, each claim tagged, ✅ marking what already exists in the source and only needs reuse.

```
Rule 1: [precise statement of the business rule]         ✅ exists in {{source path}} — reuse
Rule 2: [precise statement]                              🆕 net-new — spec below
        - input:  [shape]
        - logic:  [the decision / transform / state transition]
        - output: [shape]
        - failure: [what happens when it can't complete]
```

This is the part reviewers scrutinize hardest. Vague here = bugs in Session [core pipeline].

## 6. Backend Changes

File-by-file. extends-existing tags each entry `new | mirrors <path> | reuse`; greenfield lists files to create. Give exact method/function signatures, the state machine if any, and **explicit DROPs** (what you are deliberately NOT porting/building, e.g. "no LLM layer — out of scope §1"). Parameterized queries only; validate every input at the boundary; timeout on every outbound call.

```
{{path}}/service.ts     new | mirrors {{sibling}} | reuse
  createEntity(userId, input): Promise<Entity>   — calls atomic write fn
  [signature]
DROP: [what you are deliberately not building here, + the §1 out-of-scope row it maps to]
```

## 7. Frontend Changes

File-by-file (extends-existing mirrors siblings). Routing / tab registration, shared constants, and the **design-system rule**: which design system / tokens / components this surface uses — from the Brand Guide. Never mix a hand-rolled section next to real components. State **loading / empty / error** per screen — each gets equal craft to the happy path.

```
{{route}}/page.tsx      new | mirrors {{sibling}}
  shows:   [what data]
  actions: [what the user can do]
  states:  loading → skeleton · empty → "[copy]" · error → "[copy + the fix, not the failure]"
  tokens:  [which Brand Guide tokens / components]
```

## 8. Chunk Map & Boundary Contracts

Split the work into chunks (one flow/unit each), ordered by dependency (a chunk that reads another's tables comes after it). This is the ordered list Part 3 build sessions consume — extends-existing builds these directly as E1.

### C1 — [name]
- **Owns tables:** … · **Reads (contract, not owned):** … · **Endpoints:** …
- **Acceptance criteria:** what "done" looks like — verifiable, not "works".
- **Boundary contracts:** schemas it reads but doesn't own · APIs it calls · shapes exchanged. This is what lets the chunk build in isolation without breaking consistency. **A chunk never writes a table it doesn't own; every cross-chunk read goes through the named owner's documented contract.**

### C2 — …
- (same shape; note it depends on C1 if it reads C1's tables)

## 9. Open Decisions

Remaining 🔵 / unresolved calls, riskiest flagged first. **Nothing here may be load-bearing on the DELIVER critical path** — resolve or cut before the Gate. Each row: the decision, why it's still open, the cheapest test to close it, and who owns it.

| Open decision | Why open | Cheapest test to close | Owner | Tag |
|---------------|----------|------------------------|-------|-----|
| [decision] | [what's unknown] | [the spike / query / interview] | [name] | 🔵 |

---

# Part 2 — Technical Reference

> From the Implementation Guide. How it stays reliable and how it ships. You do not read this linearly — Part 3 sessions say "read Blueprint §N" before each build. Fill every applicable section before the first build session; an unfilled critical section fails the Gate.

## 10. Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Frontend | {{e.g. Next.js 15}} | {{reason}} |
| Backend / API | {{e.g. Next.js route handlers / FastAPI / Hono}} | {{reason}} |
| Database | {{e.g. Postgres / Supabase / Neon}} | {{reason}} |
| Auth | {{e.g. Supabase Auth / Clerk / Lucia}} | {{reason}} |
| Background jobs | {{e.g. Inngest / APScheduler}} | {{reason}} |
| File storage | {{e.g. S3 / R2 / Supabase Storage}} | {{reason}} |
| Email | {{e.g. Resend / Postmark}} | {{reason}} |
| Analytics | {{e.g. PostHog}} | Events + replay + flags in one tool |
| Error monitoring | {{e.g. Sentry}} | {{reason}} |
| Payments (if needed) | {{e.g. Stripe / Razorpay}} | {{reason}} |
| Hosting — FE / BE | {{e.g. Vercel / Railway}} | {{reason}} |

**Forbidden here (canonical — do not soften):** [list the libraries/patterns this project bans, e.g. from the Brand Guide's hard rejections]. A ban is load-bearing; a session that reaches for a banned tool has drifted.

## 11. File Structure

The tree, annotated one line per meaningful file. greenfield: the structure to create. extends-existing: only the files you add or touch, sitting beside their pattern-source siblings.

```
{{repo}}/
├── {{frontend}}/
│   ├── app/
│   │   ├── layout.tsx            ← fonts, analytics init, error boundary
│   │   ├── page.tsx              ← landing
│   │   ├── (auth)/               ← login, signup, forgot-password
│   │   ├── dashboard/            ← shell (auth guard, realtime) + screens
│   │   └── settings/             ← account + billing
│   ├── components/{ui, {{feature}}}/
│   └── lib/{db, auth, validators, analytics, utils}/
└── {{backend}}/                  ← if separate: {{feature}}/, db/, jobs/, integrations/, middleware/
```

## 12. Environment Variables (complete list)

Every key, which surface owns it, and whether it is public. **No secret in source — all from env.** Public keys only carry the framework's public prefix.

```
# Backend / server-only (never public)
{{DB_URL}}=            {{AUTH_SECRET}}=       {{SERVICE_ROLE_KEY}}=
{{AI_KEY / OIDC}}=     {{RESEND_API_KEY}}=    {{STRIPE_SECRET_KEY}}=  {{STRIPE_WEBHOOK_SECRET}}=
{{POSTHOG_API_KEY}}=   {{SENTRY_DSN}}=        ENVIRONMENT=  LOG_LEVEL=

# Frontend / public (safe to expose — anon/publishable keys only)
{{PUBLIC_DB_URL}}=     {{PUBLIC_ANON_KEY}}=   {{PUBLIC_POSTHOG_KEY}}=  {{PUBLIC_APP_URL}}=
{{PUBLIC_STRIPE_PUBLISHABLE_KEY}}=
```

Mark which are set by hand vs auto-populated (integration / OIDC pull). Production and dev use **separate** projects/databases.

## 13. System Design & Key Flows

The reliability patterns this system relies on. Name each one you use; keep the sketch, drop the full impl into code at build time. Include only what applies.

- **Input pipeline** (if input runs through stages) — `validate → preprocess → process → enrich → persist → notify`. Each stage a separate fn; per-stage error handling; a failed stage degrades gracefully, never crashes. Pipeline pauses on `needs_clarification`.
- **Retry + timeout on every outbound call** — DB / external API / AI / email. Backoff + jitter; non-retryable errors (4xx) fail fast. An unbounded call is a hang waiting for load.
- **Atomic persistence** — a single user action that writes N tables uses one DB transaction/function. No partial writes.
- **Idempotency guard** — every state-changing op a client can retry (payment, create, webhook) dedupes on an idempotency key or natural key. A double-submit must not double-charge or double-create.
- **Graceful degradation map** — fill before building:

  | Service down | Fallback | User sees |
  |--------------|----------|-----------|
  | {{external}} | {{queue / cache / skip}} | "{{message}}" |
  | {{AI}} | Save raw input, queue retry | "Processing queued." |
  | Realtime | Poll every 10s | Dot turns gray, data still loads |

- **Optimistic UI** — write actions update instantly, revert + toast on failure.
- **Structured logging** — JSON logs with `user_id / stage / entity_id / duration_ms`. No `console.log` in prod.

## 14. Integrations

Each block is **include if applicable** — delete what the product doesn't use. Note the provider, the key flow, and the one failure mode that matters.

- **Auth** (if applicable) — provider {{}}. Signup creates {{auth record + app user row}} atomically (trigger or transaction). Route protection: public routes {{list}}; protected routes redirect unauthenticated → login; logged-in users on auth routes → dashboard. Tokens short-lived; reset/magic links single-use, 1h expiry.
- **Email** (if applicable) — provider {{}}. Templates to build before you need them: Welcome, Onboarding reminder, Magic link / reset, {{digest}}, {{payment failed}}. Sender + unsubscribe in every marketing mail.
- **Payments** (if applicable) — provider {{}}. Checkout → webhook updates plan. Webhook **verifies signature before processing** and is **idempotent**. Handle: `checkout.completed`, `subscription.deleted`, `payment.failed`.
- **AI** (if applicable) — provider {{}}, model string {{}}. All prompts in one file (`ai/prompts`), never inlined. Validate + clamp model output (enum clamp, numeric clamp, never-throw parse). Streaming: {{on/off, with reason}}.
- **Analytics + monitoring** (instrument before ship, or you decide without data) — event taxonomy `noun_verb` (`user_signed_up`, `{{entity}}_created`, `error_encountered`, `subscription_started`). Identify user after login. Server-side events use the server key + correct distinct_id. Error monitor scrubs PII in `before_send`.

## 15. Security Checklist

Complete before any external user touches the product. (Full pass runs as the §22 Resilience Audit.)

- [ ] All sensitive routes require auth (middleware enforces, not per-handler hope).
- [ ] Row-level security / authz on every user-owned table; service key server-only.
- [ ] Every API body + param validated at the boundary (Zod / Pydantic). Parameterized queries only.
- [ ] File uploads: type + size validated, stored outside public dir.
- [ ] Webhooks verify signatures before processing.
- [ ] No secret in client code or public env vars. CSP set. User content sanitized (no raw-HTML escape hatch on model/user output).
- [ ] Failed logins + paid ops rate-limited. Session replay masks all inputs.
- [ ] DELETE account cascades to all user data (GDPR). Prod and dev are separate databases.

## 16. Performance Targets

Set before building; measure before launching.

| Metric | Target | Tool |
|--------|--------|------|
| First Contentful Paint | < 1.5s | Lighthouse |
| Time to Interactive | < 3s | Lighthouse |
| LCP | < 2.5s | Speed Insights |
| API P95 | < 500ms | host metrics |
| {{AI / heavy op}} P95 | < {{5s}} | custom logging |
| Dashboard initial load | < 2s | Lighthouse |

State the one lever if a target misses (e.g. "lower max output tokens; the model is the long pole, UI tuning won't help").

## 17. CI/CD & Deploy Topology

- **Pipeline:** on push/PR → lint + type-check + test; on main → deploy. Keep it one file, boring, green.
- **Branch strategy:** `main` → production (auto-deploy); `feature/*` → PR only, no deploy. extends-existing: feature branch per chunk → integration branch → main.
- **Topology:** {{FE host}} serves `/frontend` (public env only); {{BE host}} serves `/backend` (all secrets); {{managed DB/auth}}. Env separation table: prod project vs dev project.
- **Pre-deploy checklist (PR template):** new env vars added to both dashboards · migrations run · new tables have RLS · new analytics events instrumented · tested at 390px + 1280px.

## 18. Known Limitations (V1)

Be honest. Users respect a stated V1 boundary; "coming soon" in the UI is a lie with a countdown.

| Limitation | Impact (who, how often) | Planned |
|------------|-------------------------|---------|
| {{limitation}} | {{}} | V2 |
| {{single-user / no teams}} | {{blocks enterprise}} | V2 if deal value justifies |

---

# Part 3 — Build Plan to v0

> From the Session Playbook. The step-by-step. One goal per session. **Do not start a session until the previous done-check is fully green** — a red item at Session 3 is cheap, the same gap at Session 8 is 3x. Rename/reorder sessions to match your §8 chunk map; the arc below is the scaffold, not law.

**Running a session:** (1) read the named Blueprint §§ and Brand Guide sections first; (2) build to the stated goal; (3) exercise it — drive it in the running app, don't type-check and assume; (4) commit only when the done-check is green. One session = one commit, conventional.

**Gate before any build session (both modes):** the §Gate below returns green — ⭐ (§2) resolved, no load-bearing 🔵, every §8 chunk has boundary contracts, out-of-scope stated (§1), auth/authz per endpoint (§5). Every PRD screen/story maps to a chunk. **Do not start Session 1 (greenfield) or the chunk build (extends-existing) until this is green.**

## 19. Pre-Flight

**greenfield (~30 min):**
- [ ] Services created, keys noted (DB/auth, host, analytics, monitoring, email, payments if any).
- [ ] Monorepo scaffolded (FE + BE), dependencies installed, boots clean.
- [ ] `.env` files hold real values for every §12 key.
- [ ] **Project `CLAUDE.md` at repo root** — project context loaded every session: overview (from PRD), architecture (§3), stack (§10), key constraints, naming conventions, Do-Not list (the §10 forbidden set). All Blueprint + Brand Guide + PRD docs in `/docs`.

**extends-existing:**
- [ ] **Locate the pattern source** — the sibling feature each chunk mirrors. Cite exact paths. Read its layering, error handling, test style before touching anything.
- [ ] Confirm the repo's infra you'll reuse (auth middleware, DB client, job runner) — do NOT rebuild it.
- [ ] SKIP the scaffold, base schema, landing, and auth *setup* — they already exist.

## 20. Sessions

**Session block shape:** each session has a **Goal**, an optional **time-box**, **Steps**, a **Done-check** (✅ boxes), and a **Gate** where it's a hard stop. greenfield runs the full arc; extends-existing replaces S1–S8 with the chunk build (below) and rejoins at §22 audits.

---

### S1 — Database Schema *(greenfield · 30–45 min)*
> extends-existing skips this — the base schema exists; your delta (§4) is built inside its chunk.

**Goal:** Every table/enum/index/RLS/view/trigger from §4 exists in the datastore.
**Steps:** build the schema as one migration from §4 → apply → run verification queries (tables, enums, views, RLS on, realtime publication, auth trigger).
**Done-check:**
- [ ] All §4 tables + enums + views exist.
- [ ] RLS/authz on every user-owned table.
- [ ] Auth trigger creates the app-user row on signup.
- [ ] Realtime publishes exactly the subscribed tables.

### S2 — Landing Page *(greenfield · 60–90 min)*
> extends-existing skips this — the public surface exists.

**Goal:** Landing live locally, waitlist capture works, Brand fully applied.
**Steps:** build the single-file landing from Brand Guide + PRD value prop + user-flow; waitlist INSERT via anon client; success / duplicate / error states; meta + OG tags.
**Done-check:**
- [ ] Renders; brand tokens + fonts match the Brand Guide.
- [ ] Waitlist writes a row; duplicate shows the right message.
- [ ] Responsive at 390px and 1280px; meta tags present.

### S2.5 — Schema Verification *(greenfield · 15 min · Gate)*
**Goal:** No silent column drift before backend code depends on it.
**Done-check (do not start S3 until 100% green):**
- [ ] Every PRD field maps to a real column; every enum value matches; every FK correct.

### S3 — Backend Skeleton + Auth *(greenfield · 30–45 min)*
> extends-existing skips the auth *setup* — reuse the skeleton/middleware/client from the pattern source; add only your chunks' new endpoints.

**Goal:** Backend runs, routes respond, DB + auth client work.
**Steps:** DB client · auth middleware (JWT verify → 401, extract user) · rate-limit middleware · app entry with `/health`, structured logging, error monitor init, CORS to FE · email client.
**Done-check:**
- [ ] `GET /health` returns 200.
- [ ] Auth middleware rejects a request with no valid token (401).
- [ ] Error monitor catches a deliberate test error.

### S4 — Core Feature Pipeline *(45–90 min · the hardest session)*
**Goal:** The main value-creating action works end to end — the §5 Net-New Logic Contract, realized.
**Steps:** staged pipeline (§13) with per-stage error handling + graceful degradation · validators (input + model output if any) · prompts file (if AI) · CRUD layer calling the atomic write · activity write · wire the endpoint · track the `{{entity}}_created` event.
**Done-check:**
- [ ] Creates the row + activity entry; analytics event visible.
- [ ] Pipeline survives an intentional failure at each stage without crashing.
- [ ] Net-new logic matches §5 rule-by-rule.

### S5 — Auth UI + Onboarding *(45–60 min)*
**Goal:** User signs up, onboards, reaches the dashboard. The Aha moment lands in onboarding.
**Steps:** browser + server auth clients · route-protection middleware · signup / login pages (standalone, not modals; error + loading states; OAuth if configured) · onboarding steps with `onboarding_step_completed` / `_completed` / `_skipped` events · analytics wrapper wired in root layout · `identifyUser` after signup + login.
**Done-check:**
- [ ] Signup creates both the auth user and the app-user row.
- [ ] Login routes new users → onboarding, returning → dashboard.
- [ ] `user_signed_up` + `onboarding_completed` fire; protected routes redirect.

### S6 — Dashboard Shell + Home *(60–90 min)*
**Goal:** Dashboard loads, auth enforced, nav works, home shows real data, realtime fires.
**Steps:** shell (auth guard, mobile bottom-nav + desktop sidebar, realtime subscription + toast, connection indicator, error boundary) · home screen sections with empty + skeleton states + staggered load · `useAuth` / `useRealtime` (polling fallback).
**Done-check:**
- [ ] Real data loads; unauthenticated access redirects.
- [ ] Backend write → toast on dashboard without refresh; connection dot degrades on disconnect.
- [ ] Every empty state shows copy; layouts hold at 390px + 1280px.

### S7 — Core Dashboard Screens *(60–90 min)*
**Goal:** Every user-flow screen built, showing real data, with detail views.
**Steps:** one focused page per screen (shows / actions / empty state / pageview event) · entity detail view (header, timeline, related, actions) · shared cards/badges.
**Done-check:**
- [ ] All screens + detail views load real data; key interactions tracked; responsive.

### S8 — Settings + Billing *(30–45 min)*
**Goal:** Profile edits save; billing shows plan; upgrade flow works.
**Steps:** settings (profile, notification prefs, danger-zone delete with confirm) · billing (plan badge, upgrade → checkout, manage → portal) · checkout + portal endpoints · webhook handler (completed / cancelled / failed, each idempotent) · GDPR delete cascading all user data.
**Done-check:**
- [ ] Settings saves; checkout completes in test mode; webhook updates plan.
- [ ] `subscription_started` fires; delete removes all user data.

### S9 — Background Jobs + Emails *(45–60 min)*
**Goal:** Scheduled jobs run; emails send.
**Steps:** scheduler + registered jobs (each: interval, trigger query, action, analytics) · email templates · wire welcome email on signup (webhook, signature-verified) · `email_sent` event.
**Done-check:**
- [ ] Each job runs on manual trigger; welcome email arrives; results visible in DB + analytics.

### S10 — Edge Cases + Error States *(30–45 min)*
**Goal:** Nothing crashes; every empty state guides; every error is recoverable.
**Steps:** implement every PRD edge case + user-flow error state · malformed input / service-down → graceful fallback (§13 map) · concurrent edit → last-write-wins + warning · every interactive element has loading + success + error.
**Done-check:**
- [ ] Every empty + error state shows a useful message, never a blank screen.

### S11 — Polish / Delight + Responsive + PWA *(30–45 min)*
**Goal:** Feels alive and intentional; works on real phones.
**Steps:** milestone moments · realtime slide-in · animated numbers · optimistic UI everywhere · page transitions · custom 404 · error boundaries per page · complete OG/meta · (if PWA) manifest + service worker + offline banner · audit + fix 390 / 768 / 1280, 44px touch targets, safe-area insets · Lighthouse pass.
**Done-check:**
- [ ] Installs / runs on a real phone; core nav works offline; Lighthouse ≥ targets (§16).

### S12 — Analytics Audit + Monitoring Verify *(20–30 min)*
**Goal:** Every taxonomy event fires; monitoring works; you can decide from data on day 1.
**Steps:** audit each §14 event (call exists, properties complete, gaps filled) · build the analytics dashboard (DAU + signup/core/upgrade funnels) · verify error monitor with a prod test error + readable stack · uptime monitors on FE + `/health`.
**Done-check:**
- [ ] All taxonomy events fire (checked in live events); dashboard has data; test error visible; uptime active.

---

**extends-existing arc (replaces S1–S8):** for each chunk C1..Cn in §8, in dependency order — branch off integration · read the pattern source (cite paths, invent nothing it provides) · build owned tables/endpoints/logic mirroring the sibling · respect boundary contracts (no write to a table it doesn't own; cross-chunk reads via the documented contract) · **per-chunk done-check:** acceptance criteria (§8) met, contracts honored, mirrors the pattern (validated input, timeouts, parameterized queries), existing suite still green, new tests cover the net-new logic (§5) · PR into integration. Then integrate: all branches merged, full feature drives end to end in the running app, regression suite green, §5 logic matches rule-by-rule. Then rejoin the shared back half (§§22–24), scoped to the changed surface.

## 21. Checkpoints

Hard stops on real infrastructure, not "green enough." Do not proceed past a red checkpoint.

- **🚀 Checkpoint A — Deploy Backend (after S5 · 15 min):** push · provision the backend host, root `/backend`, all §12 env vars · point external webhooks at the deployed URL · `curl …/health` → 200 · send a real authed request → row appears in prod DB. **Do not start S6 until `/health` is 200 from the deployed host.**
- **🚀 Checkpoint B — Full-Loop Test (after S11 · 20 min):** deploy frontend, all public env vars · run the whole journey on the **production URL** (sign up → onboard → core action → verify end to end) · confirm the funnel events land · confirm zero prod errors. **If the loop breaks here, fix it before continuing — every later session builds on this baseline.**

## 22. Audits

Both are **gates**, both adversarial — attack the happy path, don't confirm it.

- **Resilience Audit (§15 realized · 30–45 min · Gate).** Walk every endpoint + state-changing op and hunt each: missing timeout · no/naive retry · missing idempotency · N+1 (count actual queries, don't eyeball) · unvalidated input · hardcoded secret (grep the repo) · swallowed/silent failure · missing auth OR authz (row belongs to caller, per §5). For each finding: endpoint, failure mode, fix applied.
  **Done (no red box ships):** every outbound call has a timeout · retriable ops idempotent · no N+1 on any list · every endpoint validates at the boundary · no secret in source · no silent failure · every protected endpoint enforces auth + authz.
- **Functional-Coverage Audit (§Part 1 realized · 20–30 min · Gate).** One row per PRD story/journey. Trace each **in the running app** (click through, don't read code and assume): entry → each step → terminal success; empty, error, and back-navigation per step. Flag any story with no working path, any dead end, any step that silently does nothing.
  **Done:** every PRD story completes end to end in the running app · no dead ends · empty + error states verified in-app · any gap fixed or logged out-of-scope with sign-off.

## 23. Launch Prep & Deploy Order

The actual ship sequence — numbered, in order. The constraint: **local-green first, then internet.** Linking hosts or pushing before local works guarantees the first prod deploy is broken and people watch you debug.

1. **Build + verify locally.** Every screen, every API path, both audits (§22) green.
2. **Custom domain** on the FE host → DNS → propagate → test (not the `*.vercel.app`).
3. **OG image** 1200×630 with product name + tagline → verify with opengraph.xyz.
4. **Legal pages** `/privacy` + `/terms` → footer links. Cookie consent if tracking EU. Unsubscribe in marketing mail.
5. **Seed demo data** against the production account (the kill-shot demo needs it populated).
6. **Env parity** — every §12 key set in prod on both dashboards; migrations run; new tables have RLS.
7. **Kill-shot rehearsal** — run the primary demo flow 3× on a real phone against the production URL, all the way through.
8. **Final launch checklist** — SSL active · favicon crisp at 16/32 · robots.txt + sitemap.xml · custom 404 · console clean · DB backups on · monitoring + uptime alerting live.
9. **Ship** — tag `v0.1.0`, push. Announce.

extends-existing: steps 1–2 collapse to a **feature-flag flip / staged release** on the existing app; §22 audits + env parity still run, scoped to the changed surface.

## 24. Post-Launch: Week-1 Tracking

Set from the PRD. Check daily for two weeks; build the dashboard **before** launch so you're not scrambling while also answering users.

| North Star | Definition | Week-1 target |
|------------|------------|---------------|
| {{metric}} | {{one query, one denominator}} | {{}} |

| Leading indicator | Predicts | Healthy |
|-------------------|----------|---------|
| Onboarding completion | Activation | > {{X}}% |
| Day-1 retention | Value delivered | > {{X}}% |
| Core action in first session | Aha moment | > {{X}}% |

| Counter-metric | Warns | Threshold |
|----------------|-------|-----------|
| Error rate | Stability | < 1% of sessions |
| Onboarding drop-off at step N | Friction | > 40% = fix now |
| Support requests / active user | UX confusion | > 5% = investigate |

---

# Gate — run before build and before ship

Three checklists, one rule above all: **any 🔵 on the critical path = FAIL.** Run the whole Gate before the first build session and again before ship. A red box is a stop, not a note.

## Part 1 checks (the spec is safe to start)
- [ ] §2 ⭐ decision is resolved — **not 🔵**.
- [ ] No 🔵 hypothesis sits load-bearing on the critical path (§9 holds nothing load-bearing).
- [ ] Every PRD screen/story maps to a table (§4) + an endpoint (§5); every Phase-1 story maps to a chunk (§8).
- [ ] Every chunk (§8) has explicit boundary contracts — no chunk reads a table with no named owner.
- [ ] greenfield: schema covers every fixture field, no invented columns · extends-existing: every new artifact maps to a pattern-source counterpart or is flagged net-new in §5.
- [ ] Out-of-scope stated (§1); auth/authz declared per endpoint (§5).
- [ ] Every load-bearing claim carries a confidence tag.

## Part 2 checks (the running system is reliable)
- [ ] No applicable Part 2 section is unfilled — every §10–§18 section that applies is real, not templated (delete the ones that don't apply; leave none half-filled).
- [ ] §12 env list is complete and split public vs server-only; no secret would live in source.
- [ ] §13 names the reliability patterns in use; §13 degradation map is filled.
- [ ] §15 security checklist has no unchecked critical box (auth, RLS/authz, input validation, webhook signatures, secret handling).
- [ ] §16 targets set; §17 deploy topology + env separation stated; §18 limitations honest.

## Part 3 checks (the plan actually ships it)
- [ ] Every session (§20) has a Done-check with verifiable boxes — none is "works".
- [ ] Sessions are ordered by §8 dependency; each depends only on prior green done-checks.
- [ ] Both checkpoints (§21) are hard stops on real infrastructure.
- [ ] Both audits (§22) are present as gates with their done conditions.
- [ ] §23 Deploy Order is the real ship sequence, numbered, local-green-first.
- [ ] §24 Week-1 tracking is set from the PRD, dashboard built before launch.

---

*Blueprint template — Builder OS. One doc: spec + technical reference + build plan to v0. Fill the header mode first; every branch forks on it. Cross-references: PRD (what + why), Brand Guide (tokens + voice), Manifesto `../pro/MANIFESTO.md` (modes, tripwires, gate definitions).*
