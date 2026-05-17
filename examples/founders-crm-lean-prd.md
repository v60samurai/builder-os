> **Reference Example**: This is the Founders CRM PRD, filled into the lean template as a worked example. The source product is a CRM for early-stage founders managing sales personally. Read this end-to-end to see what "good" looks like for every section before filling your own.

---

# PRD: Founder CRM

**Version**: 1.0 | **Status**: Submitted
**PM**: Harshit Badiger | **Cohort / Program**: Cohort 7 - Week 4-5 | **Date**: 2025-11-09

---

## A Note to the Team Reading This

I wrote this to make your job easier, not to document mine. Every section tells you what I found, why I made the choices I made, and what I need from you. If something is unclear, that is a gap in this document and I want to fix it. Please ask.

---

> **Confidence Tags**
> 🟢 Confirmed by primary research (direct user interviews)
> 🟡 Confirmed by secondary research (market data, reports, reviews)
> 🔵 A direction I believe in but have not yet proven. Treat it as a hypothesis.

---

# PART 1: DISCOVERY

---

## 1. Problem Tension

### 1.1 Real User Scenario

An early-stage Indian B2B SaaS founder runs the full sales motion alone. They juggle 50-150 active conversations at once across WhatsApp, LinkedIn, email, calls, and in-person meetings. Deal context lives in chat threads, voice notes, and memory. There is no dedicated salesperson and no CRM administrator.

A typical deal path: LinkedIn intro -> WhatsApp discussion -> call -> email proposal -> multiple follow-ups before close. The conversation moves fluidly across at least four channels before money changes hands.

Because conversations move fluidly across channels, there is no single system of record capturing deal context. The founder relies on starred WhatsApp chats, personal notes, memory, and occasional spreadsheets. This works for a few weeks but breaks as active deal volume grows past what one person can hold in their head.

### 1.2 Observable Breakdown

When sales volume increases, founders attempt CRM adoption, but a predictable failure cycle follows:

- CRM setup and initial contact import
- Manual logging required after every conversation
- Logging fatigue within days
- Partial, inconsistent data entry
- CRM abandonment by week 4

CRM abandonment is not a failure of intent. Every founder in the sample intended to use the tool. The failure is structural: the tool demands effort at the exact moment the founder has none to give - right after a sales conversation, when cognitive load peaks.

### 1.3 Evidence

| Evidence | Magnitude | Source | Confidence |
|----------|-----------|--------|-----------|
| Leads never contacted after first message | 73% | Salesforce State of Sales | 🟢 |
| Deals close at 6th touch or later | 93% | HubSpot research | 🟡 |
| Founders give up after just 1 follow-up | 44% | Primary + secondary | 🟢 |
| Founders abandon CRM within 3-4 weeks | 60-70% | G2, Capterra, primary | 🟡 |

Additional inefficiencies: founders scroll through WhatsApp before every call to recall context; missed reminders when no system tracks interactions; pipeline reconstructed manually before investor meetings.

### 1.4 Why Now

India's rapidly growing startup ecosystem, the shift to conversational sales channels (WhatsApp, LinkedIn DMs, voice notes), and recent advances in AI for unstructured data all converge to make this problem both urgent and technically solvable. AI can now extract structured fields from conversation data, auto-summarise discussions, and surface follow-up opportunities - enabling tools that work with conversational workflows rather than against them. None of this was viable two years ago.

> **Key Insight**
>
> CRM abandonment is not a discipline problem. It is a timing problem. CRMs ask for data entry at the exact moment - right after a sales conversation - when the founder has the least cognitive bandwidth to give. Until that timing changes, no UX improvement matters.

---

## 2. Broader Problem Statement

### 2.1 Industry-Level Problem

Traditional CRMs (Salesforce, HubSpot, Zoho) were designed for structured sales orgs: dedicated teams, defined pipelines, consistent data entry, centralised channels. Early-stage startups operate oppositely: founder-led, relationship-driven, informal, conversational, highly dynamic. This mismatch makes existing CRMs feel too complex, too enterprise-focused, too maintenance-heavy.

The CRM industry built a hammer optimised for enterprise nails. Early-stage founders are a different fastener entirely, and no one has built the right tool yet.

### 2.2 User-Level Problem

Founders spend their time talking to customers, running demos, negotiating, building product, and hiring. CRM updates compete directly with these activities. When forced to choose, founders consistently prioritise conversation over documentation. Every time.

### 2.3 Systemic Gap

All existing solutions depend on manual logging. Since conversations occur outside the CRM and logging requires additional effort, the system structurally fails: input data is missing, follow-up triggers never fire, and pipeline visibility becomes unreliable. In India specifically, this is amplified because WhatsApp is the dominant B2B sales channel, yet no CRM can access or interpret personal WhatsApp conversations.

> **Product Insight**
>
> The problem is not about improving CRM features. It is about rethinking the fundamental interaction model of CRM tools. Conversation must become the record, not the input to a record.

---

## 3. Target User

**Segment**: Pre-seed to seed stage Indian B2B SaaS and B2B services startups, 0-5 employees, pre-revenue to INR 1 Cr ARR, primarily Bengaluru/Mumbai/Delhi NCR. The structural condition: the founder is simultaneously the product owner, salesperson, and system administrator, with no bandwidth left for CRM maintenance.

**Behavioural traits**:

| Behaviour | Description |
|-----------|-------------|
| High context switching | Founders flip between product, hiring, sales, and fundraising in the same hour. |
| Mobile-first interaction | Most sales conversations happen directly from smartphones. |
| Low tolerance for admin overhead | Tools requiring regular manual updates are abandoned within weeks. |
| Relationship-driven selling | Trust and personal connection drive early-stage deals more than process. |

These four traits are not fixable with better onboarding. They define a fundamentally different product requirement.

**Explicit exclusions**: D2C (platform-analytics problem), EdTech (B2C-dominant), Real Estate (transaction-based), post-seed startups with a dedicated sales hire (different persona entirely).

---

## 4. Business Impact

| Problem | Operational Effect | Estimated Impact |
|---------|-------------------|-----------------|
| Missed follow-ups | 30-40% of warm leads receive no follow-up | INR 3L-6L monthly revenue loss |
| Incomplete follow-up cycles | Founders stop after 1-2 attempts while most deals require 6+ | INR 4.5L-7.5L lost deals |
| Invisible pipeline | Only ~35-40% of conversations appear in tracking tools | ~INR 3L missed opportunities |
| Context reconstruction | Founders search chat threads before every call | ~330+ hours lost annually |
| Knowledge in founder memory | Difficult to hand off pipeline to first sales hire | INR 10L-30L delayed revenue during transition |

**Estimated total impact**: INR 10L-16L per month. Annualised: INR 1.2Cr-2Cr in potential lost revenue per founder.

---

## 5. What Users Actually Do (Primary Research)

**Sample**: 10 founder interviews + 1 aggregated insight document (11 total). 2 B2B SaaS founders interviewed separately. Semi-structured remote conversations, 45-60 min each.

### The Say-Do Gap

| What Users Say | Reality |
|---------------|---------|
| "I track all my leads in Excel." | Business cards pile up post-event. CRM fields left blank. WhatsApp messages to self serve as the real database. |
| "I remember all the context." | When handing off to a team member, 60-70% of context is lost. |
| "We follow up 2-3 times." | Leads found untouched for 4 months. No reminder system in place. |
| "We use a CRM." | Salespeople skip data entry. Teams abandon tools like HubSpot within weeks. |

Every founder claims to track leads. Actual tracking happens in memory and WhatsApp.

### Friction Points (Ranked)

| Friction | Evidence (X/Y) | Severity | Best Quote |
|----------|----------------|----------|------------|
| Follow-ups slip through cracks | 7/10 | HIGH | "Some people had not been contacted since like 4 months." - P06 |
| Manual data entry kills adoption | 8/10 | HIGH | "These guys don't always put in all the data." - P06 |
| Context lost across channels | 6/10 | HIGH | "The real problem is remembering the context." - Unnati |
| Exhibition lead digitisation bottleneck | 4/10 | HIGH | "Digitalization of my leads. Number one." - P03 |
| CRM too complex for small teams | 6/10 | MEDIUM | "Too complicated, too power-user centric." - P08 |

### Recurring Patterns

**The Pocket Database (HIGH)**: Deal context lives in the founder's head. Works until first hire or sick day. Implication: passive capture must replace active note-taking.

**Post-Event Decay (HIGH)**: Events generate 50-400 leads in 2-3 days. By the time leads are entered, the warm follow-up window has closed. Business card scan -> auto-CRM is a high-value wedge.

**Automation Paradox (HIGH)**: Founders want automation but resist the structured input it requires. Tools demanding the most data get the least adoption. Resolution: the system must generate its own data through passive capture.

> **Research Insight**
>
> The highest-severity friction is not a feature gap. It is a timing gap. Follow-ups fail because founders lack context on what to say at the moment the reminder fires. Every quote from primary research is about missing context or lost momentum, not missing features.

---

## 6. Market Context (Secondary Research)

**Market size**: India CRM market $2.48B (2024), 19.1% CAGR (72% faster than global 11.1%), projected $14.24B by 2034 (Fortune Business Insights). 🟡

**Intent vs adoption gap**: 94% of SMBs (<10 emp) intend to adopt; only ~50% have structured usage. The gap confirms the problem is product-fit, not awareness. SMB CRM sub-segment grows at 16.2% CAGR with no dominant India-first player.

**Community signals** (across Reddit, IndieHackers, Twitter/X, Indian startup Slack groups):
- "I don't know who to follow up with today"
- "WhatsApp is where deals happen but no CRM reads it"
- "I used the CRM for 2 weeks then stopped"
- "I scroll through 50 WA messages before every call"
- "Every CRM is built for a VP Sales with 10 reps, not me"

India-specific: price ceiling INR 1,500-3,000/month at seed stage. Tier 2/3 founders (Pune, Hyderabad, Jaipur) have lower CRM familiarity and need intuitive onboarding.

---

## 7. Existing Ecosystem

### Baseline Tools Users Actually Use

- **Starred WhatsApp messages + memory**: Default for 6 of 9 founders. Zero setup, zero maintenance, zero proactive value. This is the actual benchmark.
- **Google Sheets / Notion kanban**: Set up with intent, accurate for 2-3 weeks, abandoned as volume grows. Flexibility is the feature; absence of guidance is the failure.
- **Pen and paper / custom-built tools**: Technical founders build rather than buy. One participant: "building takes 4 hours vs 3 hours to learn Odoo."

The most popular CRM among early founders is WhatsApp starred messages. That is the benchmark the product must beat, not HubSpot.

### Why Existing CRM Tools Fail

| Tool / Tier | What Works | What Fails | Why It Cannot Be Fixed |
|-------------|-----------|------------|----------------------|
| Tier 1: Salesforce, HubSpot, Pipedrive, Close | Mature integrations, deep features | 30-90 min/day data entry burden. Zero WhatsApp. Mobile is scaled-down desktop. | Built for multi-rep orgs that assume sales is the user's primary job. |
| Tier 2: Zoho, Freshsales, LeadSquared, TeleCRM, Kylas, Interakt | INR pricing, India ecosystem | WhatsApp via WABA only - needs business number + BSP middleware at INR 3K-15K/mo. | Still assume a dedicated seller. WABA requirement excludes solo founders economically. |
| Tier 3: Folk, Streak, Bigin, Kommo | Each solves one dimension well | All share the same anchor: manual logging breaks at week 3-4. | The capture model is the problem. Fixing UX cannot fix the input model. |

### Architectural Ceilings

**Ceiling 1: The WhatsApp Integration Wall**: Zero of 16 tools support personal WhatsApp. Meta's API is permanently restricted to business numbers. Not a product gap, a platform constraint.

**Ceiling 2: The Manual Logging Loop**: The only accurate moment to log is right after a conversation - exactly when founders are least available. A timing problem, not a discipline problem.

**Ceiling 3: The Pricing Cliff**: Free tiers are stripped. Meaningful plans run $25-$75/user/mo. The upgrade ask arrives after Week 1 habit forms but before the tool has proven value - and lands at 3-5x the founder-viable ceiling.

---

## 8. Problem Prioritisation

### Problems Identified

| Problem | Description | Frequency | Severity |
|---------|-------------|-----------|----------|
| P1 | WhatsApp conversation invisibility - personal WA cannot integrate with any CRM | 10/10 affected | HIGH |
| P2 | Manual data entry failure - founders stop logging within 2-3 weeks | 8/10 cited | HIGH |
| P3 | No proactive follow-up nudging - tools are passive, deals go cold | 7/10 cited | HIGH |
| P4 | Pre-defined pipeline assumption - stage setup before workflow is understood | 5/10 cited | MODERATE |
| P5 | No behavioural feedback loop - tools don't learn from founder patterns | Inferred | MODERATE |
| P6 | 30-second mobile failure - mobile apps require 3+ taps to log | 3/10 cited | MODERATE |
| P7 | Pricing cliff - paid plans exceed INR 1,500-3,000 ceiling | Secondary | HIGH |
| P8 | Fast onboarding != early value - "5-min setup" still needs 2-3 weeks of data | Inferred | MODERATE |

### Selected Priority: The P0 Chain

**P1 (WhatsApp invisibility) -> P2 (manual logging failure) -> P3 (follow-up failure) -> DEAL LOSS**

Why this chain: 100% frequency in target segment, architecturally unaddressed by any of the 16 tools evaluated, revenue-direct (causes deal loss, not just productivity loss), now technically feasible via AI-assisted capture through forwarding/clipboard (no Meta API required), and earliest in chain - addressing it prevents all downstream failures.

Solving P1 + P2 + P3 together as a single architectural decision, not three separate features, is the product strategy.

### What We Are Not Solving and Why

| Problem | Reason Excluded |
|---------|----------------|
| D2C/B2C founder sales | Structurally different (platform analytics). Would dilute core architectural solution. |
| Team CRM and collaboration | Requires baseline individual data quality that doesn't exist yet. Phase 2. |
| Analytics and reporting | Requires data foundation. Reporting on incomplete pipeline produces misleading results. Phase 3. |
| Enterprise CRM capabilities | Target user has no sales team and no multi-stage approvals. Triggers customisation paradox. |

---

## 9. Narrowed Problem Statement

Indian early-stage B2B founders who personally lead sales (0-5 person teams) lose deals not because they lack a CRM, but because every CRM requires the one behaviour they will not sustain: manually logging their conversations. The result is an invisible pipeline, missed follow-ups, and lost deals. The problem is architectural, not motivational. Founders know they are losing deals - 7 of 10 recalled a specific deal lost to follow-up failure. They lack a tool whose input model matches their actual workflow: short, asynchronous, multi-channel, WhatsApp-dominant, phone-first.

Every existing tool requires the founder to adapt to the tool. The solution must adapt to the founder.

**In scope**:
- Failure to capture and act on sales conversations on personal WhatsApp and other async channels
- Failure to trigger proactive follow-ups when deal momentum is lost
- Absence of pipeline visibility for founder-managed deals across channels

**Out of scope**:
- Team collaboration, shared pipelines, multi-user access
- Post-hiring sales management tooling
- Integrations with proposal tools, contract management, billing
- B2C sales tracking, marketplace seller analytics

### Key Assumptions

| Assumption | Evidence | Confidence |
|-----------|----------|------------|
| WhatsApp will remain the primary B2B sales channel | 8/10 primary, secondary consensus, Meta India stats | 🟢 |
| Founders will not sustain manual data entry | 8/10 primary, 60-70% abandonment, identical failure across 16 tools | 🟢 |
| Founders will engage with <30 sec capture from phone | 3/10 cited; secondary research on mobile CRM adoption | 🔵 |
| Founders will trust AI summaries if they can review/edit quickly | Trust earned incrementally, not assumed from Day 1 | 🔵 |
| India CRM market growing at 19.1% CAGR; SMB is fastest sub-market | Fortune Business Insights, IDC, Tracxn | 🟡 |
| Price ceiling: INR 1,500-3,000/month | Community signals; products above require explicit ROI in deal terms | 🟡 |

---

# PART 2: SOLUTION

---

## 10. Product Concept

### What We Built

Founder CRM is not a simpler version of HubSpot. It is a fundamentally different product - one that inverts the relationship between conversation and record.

| Every CRM Today | Founder CRM |
|------------------------|----------------|
| Conversation requires manual logging | Conversation IS the log |
| Founder opens CRM after every call | Bot captures passively via forward or voice |
| Value arrives weeks after consistent usage | Value arrives in the first 30 seconds - Day 1 |
| Built for VP Sales with 10 reps | Built for the founder who is the rep |
| Fails when the founder goes dark for 2 weeks | Catches up automatically when they return |
| Desktop-first, mobile as afterthought | Mobile-first bot. Desktop as visibility layer only. |

### Architecture in One Sentence

A Telegram bot captures sales context passively from the founder's existing behaviour. A desktop platform makes that context visible. Neither requires the founder to do anything they are not already doing.

### Non-Negotiables

| Constraint | What It Means | Research Basis |
|-----------|--------------|---------------|
| Zero manual logging | If the founder must type anything consistently to keep the system alive, the system dies. Full stop. | 8/10 founders cited data entry as primary CRM failure cause |
| Instant first value | Value must arrive before end of Day 1. Not after 2-3 weeks of data input. | Abandonment peaks at week 2-6 across all 16 tools |
| Mobile-first capture | 70%+ of sales activity on mobile in 30-second windows. Desktop-only capture fails architecturally. | Primary research: founders run full deal cycles on mobile |
| Conversation-driven | Conversation IS the log, not an input to a separate log. Anything else hits the same ceiling as the 16 tools evaluated. | Architectural inversion - Industry Insight #1 from secondary |

### Design Rationale - Telegram as the Capture Layer

Telegram as the primary interface is not arbitrary. It is the only architecture that satisfies all four non-negotiables simultaneously:

- WhatsApp cannot be integrated directly. Meta's API prohibits personal WhatsApp access permanently. Forwarding to Telegram is not a workaround - it is the design.
- Telegram bots support voice messages natively via the mic button - no separate app required.
- The forward action (WhatsApp -> Telegram) takes under 5 seconds. Lower friction than any form-based CRM entry.
- The bot delivers context back in the same interface where the founder already operates - no app switch, no context change.
- The architecture is fully compliant with India's DPDPA 2023. The founder controls what is forwarded. No auto-scraping of personal messages.

---

## 11. Primary Persona

| Attribute | Detail |
|-----------|--------|
| Name / Age | Arjun Mehta (composite), 29 |
| Company | B2B SaaS - HR tech tool for SMEs. Pre-seed. 3-person team. |
| Reality | 10-20 active conversations simultaneously. Deals span LinkedIn intro -> WhatsApp -> call -> email proposal -> multiple follow-ups. No dedicated sales hire. |
| Current Tools | WhatsApp (primary), Gmail, LinkedIn, Google Sheets or Notion as a makeshift CRM, personal memory for context. |
| Goal | Close deals without becoming a CRM administrator. Keep pipeline moving without stopping to update systems. |
| Core Frustration | "I scroll through 50 WhatsApp messages before every call just to remember what we discussed last time." |
| CRM History | Tried HubSpot Free, Zoho, Notion CRM. Abandoned all within 6 weeks. Reason: manual entry fatigue, not product quality. |

---

## 12. Product Flows

### Onboarding

| Step | Action | User Sees | Time |
|------|--------|----------|------|
| 1 | Visits landing page | One-line value prop. Single CTA: 'Start Free' | 30 seconds |
| 2 | Clicks CTA - opens Telegram | Deep link opens Telegram app. Founder taps 'Start'. | 5 seconds |
| 3 | Bot sends welcome message | "Hi! I'm your sales assistant. Forward me any WhatsApp conversation or send a voice note after a call. No setup needed." | Instant |
| 4 | Founder forwards first conversation | Bot extracts lead card. Founder confirms. First deal logged. | < 30 sec |

No name collected. No company info required. No pipeline stages configured. Value before any configuration.

### Input Layer

| Input Type | User Action | What AI Extracts |
|-----------|-------------|-----------------|
| WhatsApp Conversation Forward | Selects a WA thread -> Long-press -> Forward to Founder CRM bot | Contact name, company, deal stage signals, intent phrases, budget mentions, objections, next step indicators |
| Voice Note (Post-Call) | Opens Telegram bot -> Presses mic -> Speaks a 30-second summary of the call | Structured deal note: contact, discussion points, outcome, next action - transcribed and tagged automatically |
| Screenshot / Image | Screenshots a business card, LinkedIn message, email, or any text - sends to bot | Contact identity, company, stated intent, message summary |

### Deal Capture Flow

| Step | System Action | User Sees | User Action |
|------|--------------|-----------|-------------|
| 1 | AI processes input | Typing indicator. 2-3 second processing. | Waits |
| 2 | Bot generates Lead Card | Contact name, Company, Deal stage, Budget signal (if present), Key blocker (if present), Suggested next action | Reviews |
| 3 | Bot checks for missing critical fields | If contact name or stage is missing: bot asks one clarifying question. Never more than one. | Optional reply |
| 4 | Founder confirms or edits | Quick-edit buttons for common changes. No form. Inline reply to edit any field. | Tap confirm |

### Context Recall Flow

| Input | User Action | Response |
|-------|-------------|----------|
| Slash command | Types: `/context [company]` | Full brief: last conversation, current stage, open questions, suggested talking points for this call |
| Natural language (text) | Types: "What's the status with Rahul from Juspay?" | Conversational summary of all interactions, last touchpoint, next action pending |
| Voice | Speaks: "Prep me for my call with TechCorp in 10 minutes" | Voice-friendly brief. No tables. Readable aloud for a walking/commuting founder. |

### Nudge and Follow-Up Flow

| Trigger | Message | User Action |
|---------|---------|-------------|
| No update for 3 days (Evaluating stage) | "You haven't updated Ankit Sharma in 3 days. Last status: evaluating pricing. Follow up?" | One-tap: 'Yes, remind me' / 'Log an update' / 'Mark as cold' |
| No update for 7 days (any active stage) | "Rahul at Juspay has been quiet for 7 days. Follow up or mark cold?" | One-tap action |
| Daily digest (8 AM) | "You have 3 deals needing follow-up today. 2 are overdue. Your hottest deal: [Company X]." | Review and act on priorities |
| Deal marked Closed (Won or Lost) | "Congratulations on closing TechCorp! Want to log what made this one work?" | Optional voice note |

Follow-up rules by stage: New (24h), Contacted (3d), Evaluating (3d), Proposal Sent (2d). Closed deals exit the nudge queue. Rules are system-set, not configurable in MVP.

---

## 13. Before and After

### Before - A Day in Reactive Mode

| Time | Action | System State | Cost |
|------|--------|-------------|------|
| 8:00 AM | Scrolls WA to reconstruct yesterday | Nothing logged. Context in chat history. | 12-15 min daily |
| 10:00 AM | Takes discovery call. Means to log later. | No record created. | Context lost |
| 12:00 PM | Sends proposal. No reminder set. | No follow-up queued. | Deal at risk |
| 3:00 PM | Warm lead from 2 weeks ago goes cold. | Lead status unknown. No inactivity signal. | Deal lost |
| 5:00 PM | Pre-call prep: scrolls 50 WA messages | All context in WA threads. | 12 min wasted |
| 8:00 PM | Investor asks for pipeline. Reconstructs from memory. | No real data. Pipeline is a memory exercise. | 40 min + inaccuracy |

### After - Same Day with Founder CRM

| Time | Action | System State | Outcome |
|------|--------|-------------|---------|
| 8:00 AM | Reviews daily digest | Full pipeline visible. Priority ranked. | 2 min. Day planned. |
| 10:00 AM | 30-sec voice note after discovery call | Deal created. Stage: Evaluating. Nudge queued for day 3. | 30 sec. Captured. |
| 12:00 PM | Logs via `/note`. Bot queues 48h follow-up. | Stage: Proposal Sent. Reminder set. | 10 sec. |
| 3:00 PM | Bot nudges: "Warm lead from 12 days ago. Follow up?" | Inactivity detected. | Deal saved. |
| 5:00 PM | Types `/context TechCorp` before call | Full brief returned in 4 seconds. | Informed. |
| 8:00 PM | Investor asks. Types `/deals`. | Live pipeline snapshot returned. | 10 sec. Accurate. |

---

## 14. User Stories

Organised by job-to-be-done, not by feature.

### Capture: Getting Conversations Into the System

| # | Story | Acceptance Criteria | Pain Point |
|---|-------|-------------------|------------|
| U1 | As a founder, I want to forward a WhatsApp conversation to the bot and have it automatically create a deal record, so I never have to open a CRM to log a conversation. | Bot processes forward in < 3 seconds. Lead card shown with contact name, company, and inferred stage. Founder confirms in one tap. Deal visible in pipeline. | Zero-capture problem. 70% of deals on personal WA never enter any system. |
| U2 | As a founder, I want to send a 30-second voice note after a call and have it turned into a structured deal note automatically. | Bot transcribes note. Extracts discussion points, outcome, next action. Presents structured record for confirmation. No typing required. | Manual logging fatigue. Founders do not log calls because it requires stopping and typing. |
| U3 | As a founder, I want to send a screenshot of a LinkedIn message and have the contact and intent automatically extracted. | OCR on screenshot. Extracts name, company, message intent. Creates lead card or updates existing record. | Multi-channel capture gap. Deals begin on LinkedIn but get lost before reaching any system. |
| U4 | As a founder, I want to correct any field in a lead card without filling out a form. | Inline reply editing works for any field. Changes confirmed with one message. No form UI. No required fields that block save. | CRM rigidity. Mandatory fields and form-based editing are a primary friction point at the point of capture. |

### Context Recall: Knowing the Deal Before the Call

| # | Story | Acceptance Criteria | Pain Point |
|---|-------|-------------------|------------|
| U5 | As a founder, I want to type `/context [company]` and receive a full deal brief in under 5 seconds, so I stop scrolling 50 messages before every call. | Bot returns last interaction, current stage, open questions, budget signal, decision maker, one suggested talking point. Response time < 5 seconds. | Pre-call context scramble. 12 minutes per call day wasted on WA scroll. 6/10 founders cite context loss as critical. |
| U6 | As a founder, I want to ask the bot in natural language "What's the status with Rahul?" and get a conversational answer. | NL query interpreted. Contact identified from name alone. Summary returned in plain conversational language. No command syntax required. | Cognitive load. Founders should not need to remember command syntax to access their own deal data. |
| U7 | As a founder commuting to a meeting, I want to ask the bot via voice note to prep me for my upcoming call. | Bot accepts voice input. Responds with voice-friendly brief (no tables, no bullets - readable aloud). | Mobile-first reality. Founders are often moving, not seated, when they need deal context. |

### Follow-Up: Deals Moving, Not Dying

| # | Story | Acceptance Criteria | Pain Point |
|---|-------|-------------------|------------|
| U8 | As a founder, I want the bot to automatically remind me when a deal has been inactive for 3 days, so I never let a warm lead go cold by accident. | Bot fires nudge on correct timer per stage. Message includes deal name, last status, one-tap actions: Follow up / Mark cold / Snooze 2 days. | Timing failure. 44% of founders make only one follow-up attempt. |
| U9 | As a founder, I want a morning digest of my pipeline so I start the day knowing exactly what to act on. | Daily 8 AM message: deals needing follow-up today, overdue deals, hottest deals highlighted. Max 5 items. Expandable for full list. | Reactive mode. Founders spend first hour of day reconstructing context instead of acting. |
| U10 | As a founder, I want to mark a deal as won or lost with one message, so the pipeline stays accurate without admin work. | Bot recognises `/won` and `/lost`. Updates deal stage immediately. Removes from active nudge queue. Prompts optional win/loss note. | Pipeline inaccuracy. Deals stay "active" indefinitely. Founders overestimate pipeline health. |

### Pipeline Visibility: Seeing the Full Picture

| # | Story | Acceptance Criteria | Pain Point |
|---|-------|-------------------|------------|
| U11 | As a founder, I want to type `/deals` and see my full pipeline in the bot so I can answer investor questions on the spot. | `/deals` returns: count by stage, total pipeline value (if captured), top 3 deals by heat score. Response in < 3 seconds. | Investor pipeline scramble. 40 minutes spent reconstructing the pipeline from memory before board meetings. |
| U12 | As a founder, I want to open the desktop dashboard and see my deals in a pipeline view without having to log anything additionally. | Desktop populates automatically from bot captures. No separate data entry required for desktop to show accurate data. | Completeness illusion. Pipeline shows only 30-40% of actual deals. Founder believes they are tracking when they are not. |
| U13 | As a founder, I want to see a heat score for every contact so I instantly know who needs my attention without reading every record. | Every contact shows Hot / Warm / Cold. Score auto-updates from recency, frequency, sentiment. No manual tagging. | Recency collapse. Older active leads fade. Cold deals remain pending indefinitely. |

---

## 15. MVP Scope

### MVP in One Sentence

A Telegram bot that captures sales conversations from WhatsApp forwards and voice notes, creates structured deal records automatically, and reminds the founder when deals need attention - with no setup, no data entry, and no learning curve.

### Hypotheses

| H# | Hypothesis | Kill Signal | Gate For |
|----|-----------|-------------|----------|
| H1 | Founders will forward WhatsApp conversations to a Telegram bot when it requires < 5 sec of additional effort. | < 30% of active users forward >= 1 message per week in 30 days | Entire capture architecture |
| H2 | Founders will use voice notes to log post-call summaries when the interface is in their existing messaging app. | < 25% send >= 1 voice note in first 14 days | Voice as fallback for in-meeting founders |
| H3 | Founders will use `/context` to recall deal info before calls, replacing the WA scroll. | < 40% of active users use `/context` within first 30 days | Context recall flow and value of bot as a pre-call tool |
| H4 | Nudge-triggered follow-ups will increase active deals receiving a second touchpoint within 5 days. | No measurable improvement vs baseline | Nudge system as retention mechanism |
| H5 | Founders will prefer a bot-first interface over a traditional CRM interface when both are available. | Majority of deal updates happen through desktop form, not bot | The architectural bet: bot-first over form-first |

### In Scope

| Feature | Description | Priority |
|---------|-------------|----------|
| WhatsApp Conversation Capture | Forward WA thread to bot -> AI extracts lead card -> founder confirms in one tap | P0 |
| Voice Note -> Deal Log | Post-call voice note -> Whisper transcription -> structured deal note auto-created | P0 |
| Screenshot / Image Capture | OCR + AI extracts contact and intent from any image | P0 |
| AI Lead Card Generation | Every input produces an auto-populated lead card | P0 |
| One-Tap Confirmation | Inline reply edits. No form. No mandatory fields. | P0 |
| `/context` Command | Returns full deal brief for any company in < 5 sec | P0 |
| `/deals` Command | Returns pipeline snapshot: count by stage, heat-ranked deals | P0 |
| `/note` Command | Freeform note logged against existing deal record | P0 |
| `/won` and `/lost` Commands | Marks deal closed. Removes from nudge queue. Prompts optional note. | P0 |
| `/remind` Command | Sets manual reminder. Overrides auto-nudge timer. | P0 |
| Inactivity Nudges | Stage-based timers: New 24h, Contacted 3d, Evaluating 3d, Proposal Sent 2d | P0 |
| Daily Digest | 8 AM summary: deals needing follow-up, overdue, hottest. Max 5 items. | P0 |
| Generic 5-Stage Pipeline | New -> Contacted -> Evaluating -> Proposal Sent -> Closed. Pre-configured. | P0 |
| Natural Language Queries | Bot interprets freeform questions about deal status | P1 |
| Contact Heat Score (Bot) | Hot / Warm / Cold shown in `/deals` output and deal briefs | P1 |

### What We Left Out and Why

| Feature | Why Excluded | Phase |
|---------|-------------|-------|
| Desktop UI at launch | Capture habit must be validated first. A desktop with no data is a useless dashboard that triggers abandonment. | Phase 1 |
| Custom pipeline stages | Setup friction kills adoption. 4/10 founders do not know their stages yet. Generic stages eliminate onboarding friction. | Phase 2 |
| Email integration | Email sync exists in 12/16 tools. It does not differentiate. WhatsApp is the gap this product exists to close. | Phase 2 |
| LinkedIn integration | LinkedIn API has strict rate limits and scraping restrictions. Screenshot capture addresses this without API dependency. | Phase 2 |
| AI follow-up drafting | Requires a validated deal context corpus first. Cannot draft intelligently without history. | Phase 2 |
| Win / loss analytics | Requires minimum 20-30 closed deals to surface meaningful patterns. Analytics on <20 deals generate false signals. | Phase 2 |
| Team / shared pipeline | Target persona is solo founder. Multi-user adds permissions and role complexity. | Phase 3 |
| Auto-capture (no founder action) | Infeasible without personal WhatsApp API access. Legally problematic under DPDPA 2023. | Not viable |
| Direct WhatsApp integration | Permanent Meta API constraint. Not a roadmap deferral. | Permanent exclusion |

---

## 16. Success Metrics

Behaviour-first. Kill condition: any P0 metric misses 30-day target -> pause and diagnose before proceeding.

| Metric | What It Measures | 30-Day Target | Kill Signal | Hypothesis |
|--------|-----------------|---------------|-------------|------------|
| Weekly Forward Rate | % of active users who forward >= 1 WA conversation per week | > 50% | < 30% | H1 |
| Voice Note Adoption | % of active users who send >= 1 voice note in first 14 days | > 40% | < 25% | H2 |
| `/context` Usage Rate | % of active users who use `/context` at least once in 30 days | > 60% | < 40% | H3 |
| Nudge Response Rate | % of nudges that result in a deal update within 24 hours | > 45% | < 20% | H4 |
| Bot vs Desktop Update Ratio | % of deal updates via bot commands vs desktop form | > 80% via bot | < 50% via bot | H5 |
| D7 Retention | Users active (>= 1 bot interaction) 7 days after signup | > 65% | < 40% | Core |
| D30 Retention | Users active 30 days after signup | > 40% | < 20% | Core |

---

## 17. Trade-offs and Limitations

### What This Product Does Not Solve

| Area | Why Out of Scope |
|------|-----------------|
| Deal quality or product-market fit | Cannot make a weak product win deals. Surfaces context and timing, cannot change what a prospect thinks of the product. |
| Outbound lead generation | Manages conversations after they begin. Does not generate new leads or support cold outreach. |
| Sales coaching / process definition | MVP captures what founders do. Process intelligence is Phase 3 (AI Sales Coach). |
| Prospect responsiveness | Cannot make a prospect reply. Ensures the founder follows up. |
| Stop-start founder rhythm | When founders go dark for 2+ weeks (fundraising, product sprint), pipeline data goes stale. System catches up on return but cannot operate during dark periods. |

### Known Trade-offs

| Trade-off | What We Gave Up | Why |
|-----------|----------------|-----|
| Telegram over WhatsApp native | Forward action adds 2-3 sec friction. Some founders will not complete it. | No viable alternative. Personal WhatsApp integration is permanently prohibited. Telegram is the only compliant, frictionless path. |
| Generic 5-stage pipeline | Founders with non-standard sales processes will find stages don't map. | Setup friction kills adoption faster than stage mismatch. A wrong stage is better than no stage. |
| No desktop at MVP | Founders who expect a dashboard will feel the product is incomplete. | A desktop with no validated data asset is a failure surface. Bot-first sequence is non-negotiable. |
| Bot-only interface | Not optimal for bulk deal review or complex pipeline analysis. | Target persona's primary device is mobile. Desktop-first fails to capture the 70% of conversations that happen on mobile. |
| Founder-triggered capture only | True ambient capture - capturing without any founder action - is not possible. | DPDPA 2023 requires explicit consent. Auto-capture of personal messages is both technically constrained and legally problematic. |

### Dependency Risks

- Product requires stable Telegram Bot API access. Any Telegram disruption or policy change directly affects the capture layer.
- AI extraction quality (lead card accuracy) depends on LLM prompt quality and clarity of the forwarded conversation. Ambiguous or short WA threads will produce incomplete lead cards.
- Whisper transcription accuracy degrades with background noise, regional accents, and English+Hindi code-switching common among Indian founders.
- Phase 2 enrichment layer depends on third-party data (LinkedIn, news APIs, funding databases). Data availability and API terms are outside product control.

---

## 18. The Moonshot (Phase 3+)

The AI Sales Coach moves Founder CRM from a context management tool to an active competitive intelligence layer. The system continuously enriches every deal record with scraped intelligence about the prospect, their company, and their buying context - and uses this to tailor the founder's pitch, timing, and talking points. Founders with deep domain knowledge already win deals by understanding their prospect better than competitors do. The constraint is that research takes 30-90 minutes per account. The coach eliminates that gap.

### How It Works

| Track | What Happens | Output |
|-------|-------------|--------|
| Continuous Enrichment (Background) | As soon as a company is identified, the system pulls LinkedIn company page, recent funding news, headcount signals, recent hiring (ICP match), job descriptions (budget signals), leadership changes, product launches, competitor mentions. | Deal record enriched silently. Founder sees a richer context card when they recall the deal. |
| Pre-Meeting Coaching (On-Demand) | Founder types or says: "Coach me for my call with TechCorp tomorrow." System pulls enrichment + deal history + known objections + competitor context. | Structured pre-call brief: (1) What matters to this company now (2) The angle most likely to land (3) Three tailored talking points (4) Known objections and responses (5) One unlock question. |
| Touchpoint Sequencing (Intelligence) | System analyses closed-won deals over time. Identifies which sequence of touchpoints correlates with faster close rates. | Personalised recommendation: "For enterprise prospects in HR tech, your win rate is 2x higher when you follow a demo with a case study reference within 48 hours." |

### Why Not Now

Requires a 20-30 deal corpus to be valuable + depth of coaching needs a separate web interface (cannot live in a Telegram thread) + scraping pipeline is a non-trivial infrastructure dependency + H1-H3 must be validated first.

### If Validated

The data asset that the bot builds through passive capture becomes the training input for the coach. The flywheel: more captures -> richer intelligence -> better coaching -> higher win rates -> stronger retention. No general-purpose CRM can replicate this for this persona because the flywheel requires (a) a deal history built through a capture mechanism designed for WhatsApp-first workflows, and (b) a coaching layer trained on founder-led B2B sales patterns in India specifically.

---

## Notes on this Example

**Sections that mapped directly without gaps**: Problem tension, evidence, broader problem statement, target user, business impact, primary research (say-do gap, friction, patterns), secondary research, ecosystem, problem prioritisation, narrowed problem, product concept, persona, all flows, before/after, user stories, MVP scope, trade-offs, moonshot.

**Sections marked as not-covered**: None. The source PRD covered every lean-template section in some form.

**Mapping notes**: The lean template's section order (e.g., Business Impact at section 4, then Primary Research at section 5) is slightly different from the source PRD's order (research first, then impact). I followed the lean template's order and pulled source content into the matching slot. The biggest compression task was the friction-points table: the source listed 6 friction points across several sections; the lean template asks for 4-5 in a single table. The biggest expansion was the user stories - the lean template has more story slots than the source listed, so I used all 13 stories from the source's appendix.
