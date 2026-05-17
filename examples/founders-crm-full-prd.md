> **Reference Example**: This is the Founders CRM PRD, filled into the full template as a worked example. The source product is a CRM for early-stage founders managing sales personally. Read this end-to-end to see what "good" looks like for every section before filling your own.

---

# PRD: Founder CRM

**Version**: 1.0
**Status**: Submitted
**Last Updated**: 2025-11-09
**PM**: Harshit Badiger | **Eng Lead**: TBD | **Design Lead**: TBD

---

## A Note to the Team Building This

This document is written for you. Every section exists to give you context so you can make good decisions without coming back to ask. I have explained the "why" behind every choice I made. If something is not clear, that is my failure, not yours. Please ask and I will fix it.

I did the research so you do not have to guess what users need. I made the hard prioritisation calls so you do not have to. I listed the edge cases so you do not discover them mid-build. This is the information I wish I had given you on day one of every previous project.

Build with confidence. I have your back.

---

## Confidence Tag Legend

| Tag | Meaning |
|-----|---------|
| 🟢 | Confirmed by primary research (direct user interviews or observation) |
| 🟡 | Confirmed by secondary research (market data, reports, reviews) |
| 🔵 | A direction we believe in but have not yet proven. Treat it as a hypothesis. |
| 🔴 | We tested this and it turned out to be wrong. Do not rely on it. |

---

# PART 1: DISCOVERY

This part is the foundation. It explains the problem we are solving and the people we are solving it for. Read this before you read the solution section. The decisions in Part 2 only make sense if you understand Part 1.

---

## 0. Document Overview

### 0.1 Purpose and Scope

This document analyses the problem space surrounding CRM for early-stage startups where founders personally manage sales. It covers how sales workflows operate in founder-led startups, where lead tracking breaks down, why existing CRMs fail this segment, and how primary and secondary research validates a narrowed problem statement and solution direction.

**What this document covers**: the architectural choice between bot-first and form-first capture; the decision to defer a desktop UI to Phase 2; the persona definition; the MVP scope and the five hypotheses the MVP exists to validate; the success metrics and kill conditions for each hypothesis.

**What this document does not cover**: specific LLM prompts and evals per extraction stage (handled in the implementation guide); detailed cost modelling per user (will be added once H1 is validated); team CRM features (Phase 3); analytics and reporting (Phase 3).

### 0.2 Research Scope

**Target Segment**: Early stage Indian B2B startups, 0-10 employees, founder-led sales, pre-PMF to early PMF, with no dedicated sales operations. The target segment is defined by a structural condition, not company size: founders who are simultaneously the product owner, salesperson, and system administrator, with no bandwidth left for CRM maintenance.

**Research Inputs**:

| Input Type | Volume | Period | Method |
|-----------|--------|--------|--------|
| Primary interviews | n = 10 founders + 1 aggregated insights doc (11 total); 2 B2B SaaS founders interviewed separately | Cohort 7, Week 4-5 | Semi-structured 1:1 conversations, remote, 45-60 min each |
| Secondary sources | 85+ sources, 362 findings | Same window | Market reports (Fortune Business Insights, IDC, Tracxn), community forums (Reddit, IndieHackers, Twitter/X, Startup India Slack, NASSCOM, TiE India), product reviews (G2, Capterra, Product Hunt) |
| Competitive audit | 16 products across 4 tiers | Same window | Hands-on testing, teardown analysis, review mining |

### 0.3 Confidence Tags

| Level | Description |
|-------|-------------|
| 🟢 High Confidence | Multiple founder interviews, consistent cross-industry patterns, strong secondary research support. |
| 🟡 Moderate Confidence | Limited primary signals + secondary findings. Valid but requires further validation. |
| 🔵 Emerging Signals | Early observations from few interviews or edge cases. Not yet a confirmed pattern. |

---

## 1. Problem Tension

### 1.1 Real User Scenario

In early-stage Indian B2B startups, founders handle the full sales cycle with no dedicated sales team and no CRM admin. Typical behaviour: managing 50-150 active conversations simultaneously across WhatsApp, LinkedIn, email, calls, and in-person meetings. Deals progress informally. Context is stored in chat threads, voice notes, and the founder's head. There is no dedicated salesperson and no dedicated salesperson's notebook.

A typical deal path: LinkedIn intro -> WhatsApp discussion -> call -> email proposal -> multiple follow-ups before close. A single deal moves across at least four channels before money changes hands, and the chronology is rarely captured in any one place.

Because conversations move fluidly across channels, there is no single system of record capturing deal context. Founders rely on starred WhatsApp chats, personal notes, memory, and occasional spreadsheets. This informal system holds temporarily but breaks as active deal volume grows past what one person can hold in their head.

### 1.2 Observable Breakdown

When sales volume increases, founders attempt CRM adoption, but a predictable failure cycle follows:

- CRM setup and initial contact import
- Manual logging required after every conversation
- Logging fatigue within days
- Partial, inconsistent data entry
- CRM abandonment by week 4

Manual logging competes directly with the founder's primary job: closing deals. Conversations remain outside the CRM, follow-ups go untracked, and founders revert to WhatsApp + memory + spreadsheets.

CRM abandonment is not a failure of intent. Every founder in the sample intended to use the tool. The failure is structural: the tool demands effort at the exact moment the founder has none to give - right after a sales conversation, when cognitive load peaks.

### 1.3 Evidence of the Problem

| Evidence | Magnitude | Source | Confidence |
|----------|-----------|--------|-----------|
| Leads never contacted after first message | 73% | Salesforce State of Sales | 🟢 |
| Deals close at 6th touch or later | 93% | HubSpot research | 🟡 |
| Founders give up after just 1 follow-up | 44% | Primary + secondary | 🟢 |
| Founders abandon CRM within 3-4 weeks | 60-70% | G2, Capterra, primary research | 🟡 |

Additional inefficiencies: founders scroll through WhatsApp before every call to recall context (observed: ~12 minutes per call-heavy day on the pre-call scroll); missed reminders because no system tracks interactions; pipeline reconstructed manually before every investor meeting (~40 min per reconstruction).

### 1.4 Why This Problem Matters Now

India's rapidly growing startup ecosystem, the shift to conversational sales channels (WhatsApp, LinkedIn DMs, voice notes), and recent advances in AI for unstructured data all converge to make this problem both urgent and technically solvable. The number of Indian founders attempting CRM adoption is at an all-time high. The number successfully sustaining adoption is not.

AI can now extract structured fields from conversation data, auto-summarise discussions, and surface follow-up opportunities. Whisper-grade transcription is accurate enough for Indian English with regional accents. LLM extraction of entities, intent, and stage signals from short chat threads is reliable enough to put in front of a founder without making them feel they need to babysit the output. None of this was viable two years ago. This combination is what makes the problem newly solvable now, not just newly urgent.

> **Key Insights from this Section**
>
> Important signals:
> - Founders handle 50-150 parallel conversations. Memory-based tracking fails at scale.
> - Conversations are multi-channel and asynchronous.
> - Deal context is stored in human memory instead of a system.
> - CRM abandonment occurs within 3-4 weeks across founders.
>
> This is powerful because it shows behavioural inevitability.
> The failure is not founder discipline or CRM UX. It is structural misalignment.

> **Product Insight**
>
> The core issue is timing friction.
> CRM requires founders to perform data entry right after conversations, which is precisely when their cognitive load is highest. As a result, the logging step gets skipped.
> This reveals that the failure is not behavioural laziness but workflow incompatibility.

---

## 2. Broader Problem Statement

### 2.1 Industry-Level Problem

Traditional CRMs (Salesforce, HubSpot, Zoho) were designed for structured sales orgs: dedicated teams, defined pipelines, consistent data entry, centralised channels, multiple sales representatives, standardised processes, dedicated CRM administrators. Early-stage Indian startups operate oppositely: founder-led, relationship-driven, informal, conversational, highly dynamic, deals evolve organically rather than through structured stages. This mismatch makes existing CRMs feel too complex, too enterprise-focused, too maintenance-heavy.

The CRM industry built a hammer optimised for enterprise nails. Early-stage founders are a different fastener entirely, and no one has built the right tool yet.

### 2.2 User-Level Problem

Founders spend their time talking to customers, running demos, negotiating, building product, and hiring. CRM updates compete directly with these activities. When forced to choose, founders consistently prioritise conversation over documentation. Every time.

Conversation time >> Documentation time

### 2.3 Systemic Gap in Existing Solutions

All existing solutions depend on manual logging. Since conversations occur outside the CRM and logging requires additional effort, the system structurally fails: input data is missing -> follow-up triggers never fire -> pipeline visibility becomes unreliable.

In India specifically, this is amplified because WhatsApp is the dominant B2B sales channel, yet no CRM can access or interpret personal WhatsApp conversations. Meta's Business API serves business numbers only, and the WABA setup is economically and structurally unviable for a seed-stage founder.

> **Product Insight**
>
> This reveals a category-level mismatch.
> Existing CRM systems were designed for teams where sales is a full-time role, but the target users here are founders for whom sales is only one of many responsibilities.
> Therefore, the problem is not about improving CRM features. It is about rethinking the fundamental interaction model of CRM tools. Conversation must become the record, not the input to a record.

---

## 3. Context

### 3.1 The Environment

Target companies: 0-10 employees, no dedicated sales operations, founder responsible for revenue generation, minimal sales infrastructure evolving organically. Pre-seed to seed stage. Pre-revenue to early-revenue.

At this stage, the founder IS the sales process. There is no system to improve - there is only a person to support.

### 3.2 The User's Reality

The founder handles the full customer lifecycle: lead generation, qualification, demos, negotiation, closing, and onboarding. These activities occur conversationally and rarely follow a predefined structure. There is no playbook because there is no time to write one. The founder is also the product owner, the recruiter, the fundraiser, and the office manager.

The founder carries the full revenue function in their head. Every hiring decision, product call, or investor meeting competes directly for the same cognitive budget as sales.

### 3.3 The Multi-Channel Landscape

| Channel | Role |
|---------|------|
| Messaging apps (WhatsApp) | Relationship building. Where deals actually progress day-to-day. |
| LinkedIn | Initial outreach. First-contact channel for most outbound. |
| Email | Proposal and documentation. The system-of-record stage for paper trails. |
| Calls | Detailed discussions, demos, negotiations. |

A single deal typically moves: LinkedIn intro -> WhatsApp conversation -> Email proposal -> Call negotiation -> Close. This fragmentation prevents any single tool from capturing the full deal narrative.

> **Product Insight**
>
> Because deal context is spread across multiple communication platforms, no single tool captures the full narrative of a deal. As a result:
> - CRM pipelines represent only a partial view of reality.
> - Founders must manually reconstruct deal history before every important conversation.
>
> This creates high cognitive overhead and increases the risk of missed follow-ups.

---

## 4. Target User Definition

### 4.1 Stage Definition

Pre-seed to seed stage, 0-10 employees, early revenue or pre-PMF. Founders are still discovering their sales process. A CRM that imposes structure before that process is understood will always be abandoned.

### 4.2 User Responsibilities

The founder acts as the entire sales function: lead gen, qualification, demos, negotiation, closing, and onboarding. Their workflow is extremely time-constrained. Sales is one of five-to-seven roles they hold.

### 4.3 Behavioural Characteristics

| Behaviour | Description |
|-----------|-------------|
| High context switching | Founders switch rapidly between product, hiring, sales, and fundraising - often within the same hour. |
| Mobile-first interaction | Most sales conversations happen directly from smartphones. Desktop is for proposals and email, not for live conversation. |
| Low tolerance for admin overhead | Tools requiring regular manual updates are quickly abandoned. Threshold: roughly two weeks before reversion. |
| Relationship-driven selling | Trust and personal connection are primary drivers of early-stage deals. Founders prioritise warmth over process discipline. |

The four behavioural traits of this user (context switching, mobile-first, low admin tolerance, relationship-driven) are not fixable with better onboarding. They define a fundamentally different product requirement.

> **Product Insight**
>
> These traits translate directly into product design constraints:
> - Tools must support fast mobile interactions.
> - Data capture must require minimal effort.
> - The system must support unstructured conversational workflows.
>
> This section effectively defines the behavioural environment the product must operate within.

---

## 5. Problem Space Context

### 5.1 Current User Behaviour

#### 5.1.1 Sources / Inputs

| Source | Role |
|--------|------|
| Referrals | Highest trust and conversion. Often arrive on WhatsApp. |
| Communities | Early traction channels. Founder-to-founder intros. |
| LinkedIn | Outbound prospecting. First-touch surface. |
| Events / exhibitions | Episodic bursts of 50-400 leads in 2-3 days. |

#### 5.1.2 Communication Channels and Lifecycle

Deal communication moves: LinkedIn introduction -> WhatsApp conversation -> Email proposal -> Call negotiation -> Close. Multiple follow-ups are required before conversion, making untracked conversations a direct cause of deal loss.

All high-converting lead sources - referrals, communities, events - immediately move to WhatsApp. The CRM never sees the lead at the highest-trust moment of the relationship.

### 5.2 Current Management Practices

#### 5.2.1 Tracking Methods Used

| Method | Limitation |
|--------|-----------|
| Memory | Unreliable at scale. Fails on first hire, sick day, or vacation. |
| Starred WhatsApp chats | Quickly cluttered. No search. No structure. No triggers. |
| Spreadsheets | Manual updates required. Decay starts at week 3. |
| CRMs | Frequently abandoned within 3-4 weeks. |

#### 5.2.2 Follow-Up and Tracking

Follow-ups are reactive, based on personal reminders or customer messages. Pipeline visibility is reconstructed manually by reviewing chat threads, emails, and notes - resulting in partial visibility and unreliable forecasting.

Founders don't choose informal tools because they're lazy. They choose them because those tools impose zero cost at the moment of use. Any replacement must match that zero-friction bar at the point of capture.

> **Product Insight**
>
> The real competition for any CRM product in this segment is not other CRM tools. The true competitor is the simplicity of WhatsApp and memory-based tracking. Any successful product must provide equal or lower friction at the point of capture.

---

## 6. Business Impact of the Problem

In founder-led sales environments, conversations with potential customers occur across multiple channels - WhatsApp, LinkedIn, email, and calls. Because these are rarely captured in a structured system, follow-ups often slip through the cracks and pipelines remain partially invisible. While these failures appear operationally small, they compound over time and result in significant revenue leakage, lost opportunities, and increased cognitive load for founders who must manually reconstruct deal context.

### 6.1 Illustrative Scenario

| Stage | Estimated Numbers | Explanation |
|-------|------------------|-------------|
| Active leads in conversation | ~100 / month | Conversations across WhatsApp, LinkedIn, email, calls |
| Leads not followed up | ~40 | ~30-40% receive no structured follow-up |
| Potential deals from these leads | 2-4 | Based on 5-10% B2B conversion rate |
| Average deal size | INR 1.5L | Typical early-stage B2B SaaS/services deal |
| Monthly revenue leakage | INR 3L - INR 6L | Revenue lost due to missed follow-ups |

This leakage occurs simply because leads that showed initial interest do not receive the follow-up required to progress the deal.

### 6.2 Operational Impact

| Problem | Operational Effect | Estimated Impact |
|---------|-------------------|-----------------|
| Missed follow-ups | 30-40% of warm leads receive no follow-up | INR 3L-6L monthly revenue loss |
| Incomplete follow-up cycles | Founders stop after 1-2 attempts while most deals require multiple interactions | INR 4.5L-7.5L lost deals |
| Invisible pipeline | Only ~35-40% of conversations appear in tracking tools | ~INR 3L missed opportunities |
| Context reconstruction | Founders search chat threads before every call | ~330+ hours lost annually |
| Knowledge in founder memory | Difficult to hand off pipeline to first sales hire | INR 10L-30L delayed revenue during transition |

### 6.3 Combined Impact Estimate

When these effects compound across the sales pipeline:

- Missed follow-ups -> INR 3L - 6L per month
- Incomplete follow-up cycles -> INR 4.5L - 7.5L per month
- Invisible pipeline opportunities -> ~INR 3L per month

Estimated total: **INR 10L - 16L per month**
Annualised: **INR 1.2Cr - 2Cr per founder**

> **Key Insight**
>
> The breakdown in lead tracking and follow-up management is not merely an operational inefficiency. In founder-led sales workflows, fragmented conversations and missed follow-ups create a systematic revenue leakage mechanism, where small process gaps accumulate into substantial financial loss over time.

---

## 7. Existing Ecosystem

### 7.1 The Real Existing Solutions

Before evaluating CRMs, the baseline tools founders actually use:

- **Starred WhatsApp messages + memory**: Default for 6 of 9 founders observed. Zero setup, zero maintenance, zero proactive value.
- **Google Sheets / Notion kanban**: Set up with intent, accurate for 2-3 weeks, abandoned as volume grows. Flexibility is the feature; absence of guidance is the failure.
- **Pen and paper / custom-built tools**: Technical founders build rather than buy. One participant: "building takes 4 hours vs 3 hours to learn Odoo."

These are the baselines. CRM tools are the aspirational alternatives that consistently fail.

The most popular CRM among early founders is WhatsApp starred messages. That is the benchmark the product must beat, not HubSpot.

### 7.2 Tool Landscape

16 tools evaluated across 4 structurally different tiers.

| Tier | Products | Design Assumption | User Fit | Key Limitation |
|------|----------|-------------------|----------|----------------|
| Tier 1: Traditional CRM | Salesforce, HubSpot, Pipedrive, Close | Built for multi-rep orgs. Assume sales is the user's primary job. | 1.5-4/10 | 30-90 min/day data entry. Zero WhatsApp. Mobile is scaled-down desktop. |
| Tier 2: Indian Mid-Market | Zoho, Freshsales, LeadSquared, TeleCRM, Kylas, Interakt | Closest cultural fit. INR pricing. Zoho/Freshworks ecosystems. | Low to Moderate for solo founders | WhatsApp via WABA only. Requires business number + BSP middleware (INR 3K-15K/mo) + per-conversation charges. |
| Tier 3: Founder-Adjacent Lightweight | Folk, Streak, Bigin, Kommo | Designed to be simpler than Salesforce. | 5-6/10 | All share the same anchor failure: manual logging breaks at week 3-4. |
| Tier 4: Workaround Stack | Notion CRM, Google Sheets | Adopted because they impose no structure. | High initial, low sustained | Abandoned equally quickly because they provide no guidance. |

Every tier assumes the user has more time, money, or CRM familiarity than the target segment actually has. The tiers differ in complexity and price, not in their fundamental design assumption.

### 7.3 The Actual Usage Pattern

Regardless of tier, the adoption pattern is identical:

- **Week 1**: Contact import, pipeline setup. Feels productive.
- **Weeks 2-3**: WhatsApp logging drops to zero. Email auto-log continues but incomplete.
- **Week 4+**: CRM has 40-60% of conversations missing. Founder reverts to Sheets + WhatsApp.

The "CRM graveyard" effect is structural, not behavioural. Every CRM demands a logging action with zero immediate payoff, at the worst moment: right after a sales conversation, when cognitive load peaks.

### 7.4 Architectural Ceilings

These are the structural constraints that prevent any current tool from solving this problem. They are not product problems waiting to be fixed with better UX.

**Ceiling 1: The WhatsApp Integration Wall**: Zero of 16 tools support personal WhatsApp. 8 support WABA only - which requires a separate business number, verified registration, BSP middleware (INR 3K-15K/mo), and per-conversation charges. For a seed-stage founder at <INR 20L ARR, this is economically and structurally unviable. This is a Meta-imposed architectural constraint, not a product gap.

**Ceiling 2: The Manual Logging Loop**: The only accurate logging moment is immediately after a conversation - also when founders are least available. This is not a discipline problem. It is a timing problem.

**Ceiling 3: The Pricing Cliff**: Free tiers are stripped of useful features. Meaningful plans run $25-$75/user/mo. The upgrade ask arrives exactly when founders are ready to pay - after Week 1 habit forms - but before the tool has proven value. The ask is 3-5x against an unproven product.

These three ceilings are not product problems waiting to be fixed with better UX. They are structural constraints that define the design space. Any solution must work within them, not assume they can be removed.

---

## 8. Primary Research

### 8.1 Methodology

| Parameter | Detail |
|-----------|--------|
| Sample | 10 founder interviews + 1 aggregated insights document (11 total). 2 B2B SaaS founders interviewed separately. |
| Format | Semi-structured, remote, 45-60 min. Open-ended across lead gen, tracking, follow-up, tools, pain points. |
| Selection | Small/early-stage Indian businesses, sub-20 person teams, founder-involved in sales. |
| Key Biases | Sample skews toward non-adopters and unhappy CRM adopters. Zero satisfied CRM users. No pricing sensitivity explored. B2B SaaS subsample is only 2 founders. |

The research captures failure clearly but has a blind spot: zero satisfied CRM users in the sample. Validating what makes a CRM succeed for this segment requires a separate research phase.

### 8.2 The Say-Do Gap

This is the most valuable section. The gap between what founders say and what they actually do is where the real insight lives.

| What Users Say | Reality |
|---------------|---------|
| "I track all my leads in Excel." | Business cards pile up post-event. CRM fields left blank. WhatsApp messages to self serve as the real database. |
| "I remember all the context." | When handing off to a team member, 60-70% of context is lost. |
| "We follow up 2-3 times." | Leads found untouched for 4 months. No reminder system in place. |
| "We use a CRM." | Salespeople skip data entry. Teams abandon tools like HubSpot within weeks. |

Every founder claims to track leads. Actual tracking happens in memory and WhatsApp.

### 8.3 A Week in the Life (Composite)

- **Monday**: Back from trade show with 60 business cards. Enters 12 leads before a product call interrupts. 48 cards sit on desk untouched.
- **Tuesday**: Warm referral arrives on WhatsApp. Great conversation. Promises proposal by Thursday. Does not write this down.
- **Wednesday**: Old lead replies to a forgotten email. Context split across WhatsApp, Gmail, and a spreadsheet. Founder wings it.
- **Thursday**: Co-founder asks about the Tuesday referral. Forgot the proposal. Rushes something at 11pm. Lead has already gone cold.
- **Friday**: Opens CRM. Half the deals are in wrong stages. Spends 45 min fixing data instead of selling. Two trade show leads never got a first email.

Deals don't die in a dramatic moment. They die in the 48-hour gap between a good conversation and the follow-up that never happened.

### 8.4 Friction Points (Ranked by Severity)

| Friction Point | Evidence (X/Y) | Severity | Best Quote |
|----------------|----------------|----------|------------|
| Follow-ups slip through cracks | 7/10 | HIGH | "Some people had not been contacted since like 4 months." - P06 |
| Manual data entry kills adoption | 8/10 | HIGH | "These guys don't always put in all the data." - P06 |
| Context lost across channels | 6/10 | HIGH | "The real problem is remembering the context." - Unnati |
| Exhibition lead digitisation bottleneck | 4/10 | HIGH | "Digitalization of my leads. Number one." - P03 |
| CRM too complex for small teams | 6/10 | MEDIUM | "Too complicated, too power-user centric." - P08 |
| Sales-to-CS handover breaks (B2B SaaS specific) | 1/10 | HIGH | "60-70% of cases, we never got the full context." - P12 |

The highest-severity friction is not a feature gap. It is a timing gap. Follow-ups fail because founders lack context on what to say when the reminder fires.

### 8.5 Recurring Behavioural Patterns

**Pattern 1: The Pocket Database (HIGH)**: Deal context lives in the founder's head. Works until first hire or sick day. Implication: passive capture must replace active note-taking. The system must build the database, not the founder.

**Pattern 2: Post-Event Decay (HIGH)**: Events generate 50-400 leads in 2-3 days. By the time leads are entered, the warm follow-up window has closed. Business card scan -> auto-CRM is a high-value wedge.

**Pattern 3: Automation Paradox (HIGH)**: Founders want automation but resist the structured input it requires. Tools demanding the most data get the least adoption. Resolution: the system must generate its own data through passive capture.

**Pattern 4: Spreadsheet Gravity (HIGH)**: Even after buying a CRM, founders revert to Excel because spreadsheets impose no structure. Product must feel like a spreadsheet but act like a CRM underneath.

**Pattern 5: The Build Reflex (MEDIUM)**: Technical founders build custom CRMs rather than buy. Product must be API-first or builders will build around it.

The Automation Paradox is the core design constraint - founders simultaneously want automation and refuse the data entry that powers it. The only resolution is a system that generates its own data through passive capture.

### 8.6 Key Verbatim Pain Signals

- "I was looking at a report where some people had not been contacted since like 4 months." - P06
- "We don't have reminders, and we don't follow up the way we should." - P08
- "What annoys me the most is losing momentum in deals." - Unnati
- "The sales team had to manually do a lot of things. They hated using HubSpot." - P12
- "The real problem is remembering the context behind each conversation." - Unnati
- "I yet to find any smooth tool." - P11
- "I don't think there is value in CRMs for small companies any more." - P07

Every quote is about missing context or lost momentum, not missing features. The product gap is not functional, it is temporal: the right information isn't available at the right moment.

---

## 9. Secondary Research

Synthesised from 85+ sources and 362 findings across market reports, community forums, and review platforms.

### 9.1 Market Sizing

| Metric | Finding |
|--------|---------|
| India CRM market (2024) | $2.48B (Fortune Business Insights) |
| CAGR | 19.1% - 72% faster than global 11.1% |
| Projected 2034 | $14.24B |
| Intent vs adoption | 94% of SMBs (<10 emp) intend; only ~50% have structured usage |
| SMB CRM sub-segment | 16.2% CAGR with no dominant India-first player |

The <=10 employee segment is the largest unserved tier. The gap between 94% intent and 50% adoption confirms the problem is product-fit, not awareness.

### 9.2 User Time Allocation

YC, Sequoia India, SaaStr consensus on how founders spend their time. CRM maintenance gets ~5% by default - a floor constrained by cognitive bandwidth, not improvable through better UX alone.

| Activity | Time Allocation |
|----------|----------------|
| Product & Engineering | 35% |
| Customer Conversations | 25% |
| Fundraising & Investor Comms | 15% |
| Hiring & Team Management | 12% |
| Operations & Admin | 8% |
| CRM Maintenance | 5% |

CRM gets 5% of founder time by default - and that ceiling doesn't move with better UX. The only lever is reducing how much time the tool requires, not improving how the time is spent.

### 9.3 Community Pain Signals

Universal signals across Reddit, IndieHackers, Twitter/X, Indian startup Slack groups:

- "I don't know who to follow up with today"
- "WhatsApp is where deals happen but no CRM reads it"
- "I used the CRM for 2 weeks then stopped"
- "I scroll through 50 WA messages before every call"
- "Every CRM is built for a VP Sales with 10 reps, not me"
- "The features I need are always behind a paywall"

India-specific signals (Startup India Slack, NASSCOM, TiE India): price ceiling INR 1,500-3,000/month at seed stage. Large proportion conduct deal conversations entirely on mobile. Tier 2/3 founders (Pune, Hyderabad, Jaipur) have lower CRM familiarity and need intuitive onboarding.

The signals are consistent across geographies and platforms, but the India-specific dimension is structurally distinct: WhatsApp dominance + price sensitivity + mobile-first usage creates a product requirement no global CRM has been designed to meet.

### 9.4 Product Review Patterns

| Review Pattern | Frequency |
|----------------|-----------|
| WhatsApp conversations invisible / manual logging required | Very High - across all 15 tools |
| CRM abandoned after 2-4 weeks | Very High - across all lightweight tools |
| Features paywalled | High - Folk, Streak, HubSpot, Freshsales |
| Mobile app is scaled-down desktop | High - Folk, Streak, Salesforce, Pipedrive |
| Follow-up reminders fire for wrong context | Medium - across all tools with auto-reminders |

Tools that track email-only conversations fire follow-up reminders for contacts who replied on WhatsApp two days prior. The tool creates confidence where none should exist.

### 9.5 Industry Insights

**1. The Architectural Inversion**: Every CRM treats conversation as an input requiring data entry. The winning product treats conversation as the log itself. Kommo comes closest (WABA conversations as deal records) but requires Business API and forces pipeline structure at onboarding.

**2. Frequency Drives Retention**: Only daily-frequency features (follow-up reminder, pre-call context recall, WhatsApp context capture) can sustain retention. Pipeline analytics (weekly/monthly) cannot. Design must prioritise daily-frequency features above all else.

**3. The P0 Chain**: Three failures compound in sequence: (1) Input failure - WhatsApp invisibility. (2) Habit failure - manual logging breaks. (3) Output failure - no system knows when to remind. Solving WhatsApp capture and auto-follow-up together addresses all three with a single architectural decision.

---

## 10. Competitor Analysis

### 10.1 Feature Coverage Summary

16 tools evaluated.

| Feature | Coverage (X/Y tools) | Implication |
|---------|---------------------|-------------|
| Email Integration | 13/16 have it | Solved. Table stakes. Not a differentiator. |
| WhatsApp Integration | 0/16 personal WA; 8/16 WABA only | Architecturally unsolved for the target persona. This is the moat. |
| Mobile App | 13/16 have one | All are scaled-down desktop. None are mobile-first. |
| Auto Follow-up Reminder | 7/16 have partial | All reactive, not proactive. None trigger from conversation context. |
| Free Tier | 5/16 have a genuine free tier | Majority require payment before value is demonstrated. |
| Stalled-Deal Alerting | Partial in Pipedrive, Streak, Freshsales (paid) | No tool proactively surfaces "this deal needs attention now" from conversation context. |

Email integration is table stakes. WhatsApp integration is the moat. The feature every Indian founder needs most is the one no tool has built, and the one no global competitor is incentivised to build.

### 10.2 Key Product Gaps

| Gap | Tier | Severity | Description |
|-----|------|----------|-------------|
| Target User Design | T1 | High | All tools assume a dedicated "sales role" user. None design for founder-as-accidental-salesperson. |
| Data Entry Burden | T2 | High | All require the founder to come to the tool. None auto-capture across full conversation surface. |
| Channel Integration | T3 | High | Zero personal WhatsApp support. Architecturally impossible via current API. |
| Follow-up Mechanism | T2 | High | Reactive: founders must manually create tasks. None proactively surface from conversation context. |
| Mobile Usability | T2 | High | No voice-to-CRM. No one-tap update. No 30-sec mobile capture. |
| Pricing Model | T3 | Medium | Automation/reminders paywalled at 3-5x entry price vs founder-viable ceiling. |

### 10.3 Competitive Positioning Summary

- No existing CRM designs for the founder-as-accidental-salesperson.
- Personal WhatsApp gap is structural and unsolvable through integration.
- Closest tools (Folk, Streak, Bigin, Kommo) each solve one dimension while failing at the behavioural anchor: manual logging.
- No tool has achieved the architectural inversion: conversation as the log itself. This is the white space.

The white space is not a feature gap - it is an architectural gap. The first product that makes conversation the primary record, rather than an input to a record, wins by default. No incumbent is positioned to make that shift.

---

## 11. Problem Clustering

### 11.1 Lead Tracking Breakdown

- **Capture failure**: Leads across WhatsApp, email, LinkedIn never centralised. 73% receive no structured follow-up after first contact. [HIGH]
- **Channel gap**: Personal WhatsApp has no integration path with any CRM. Hard architectural constraint by Meta. [HIGH]
- **Recency collapse**: Older but active leads fade as founders focus on recent conversations. Without inactivity detection, cold deals remain "pending" indefinitely. [PRIMARY RESEARCH]

Lead loss begins before the CRM is even opened. By the time a founder attempts to log a new contact, the warm window from the original conversation has often already closed.

### 11.2 Follow-Up Breakdown

- **Timing failure**: 44% make only one follow-up attempt. Deals requiring 6+ touches are systematically lost. [HIGH]
- **Context failure**: Even when follow-up happens, founders can't recall what was discussed. Defaults to generic "checking in" message. [6/10 participants]

These two failures compound: the right follow-up at the right time with the right context almost never happens. Each is harmful; the combination is deal-destroying.

### 11.3 Pipeline Visibility Breakdown

- **Input gap**: 60-70% of active deals on personal WhatsApp, never entered into any pipeline view.
- **Completeness illusion**: Pipeline shows only 30-40% of deals. Founder believes they are tracking when they're tracking a minority.
- **Stage drift**: Deals gone cold remain "active" because no system detects conversation inactivity. Pipeline is indistinguishable from an active one until end-of-month review.

The founder's pipeline isn't inaccurate - it's incomplete by design. A tool that can only see email-logged deals will always show a minority of the actual sales activity.

---

## 12. Problem Prioritisation

### 12.1 Identified Problems

| Problem | Description | Frequency | Severity |
|---------|-------------|-----------|----------|
| P1 - WhatsApp conversation invisibility | Personal WhatsApp cannot integrate with any CRM due to Meta API restrictions. | 10/10 affected | HIGH |
| P2 - Manual data entry failure | Founders stop logging within 2-3 weeks. | 8/10 cited | HIGH |
| P3 - No proactive follow-up nudging | Tools are passive. Cited as direct cause of lost deals. | 7/10 cited | HIGH |
| P4 - Pre-defined pipeline assumption | Tools require stage configuration before use. | 5/10 cited | MODERATE |
| P5 - No behavioural feedback loop | Tools don't learn from founder's selling patterns. | Inferred | MODERATE |
| P6 - 30-second mobile failure | Mobile apps require 3+ taps to log. | 3/10 cited | MODERATE |
| P7 - Pricing cliff | Free tiers stripped; paid plans at $25-$75/user/mo exceed INR 1,500-3,000 ceiling. | Secondary | HIGH |
| P8 - Fast onboarding != early value | "5-minute setup" still needs 2-3 weeks of data input for useful pipeline. | Inferred | MODERATE |
| P9 - Customisation paradox | High-configurability creates setup paralysis. | 5/10 cited | MODERATE |
| P10 - Team-designed UX | CRM features designed for sales teams, not solo founder-sellers. | Inferred | HIGH |

### 12.2 Prioritisation Logic

- **P1, P2, P3** are root-cause problems: high frequency, high severity, directly cause deal loss, architecturally unaddressed by all 16 tools.
- **P4-P6** are symptomatic - downstream consequences of P1 and P2.
- **P7-P10** are tractable adoption barriers once P1-P3 are solved; they do not independently cause revenue loss.

### 12.3 Selected Priority: The P0 Chain

**WhatsApp invisibility (P1) -> Manual logging failure (P2) -> Follow-up failure (P3) -> DEAL LOSS**

Why this chain:
- **Frequency**: 100% of target segment affected. 8/10 primary research participants identified this exact cluster.
- **Architectural gap**: None of 16 tools addresses the full chain.
- **Direct impact**: Causes deal loss, not just productivity loss. ROI case is immediate and personal.
- **Technical feasibility**: AI-assisted conversation capture through share extension/clipboard is now viable without Meta API access.
- **Position in chain**: Earliest failure. Addressing it prevents all downstream failures.

Solving P1 + P2 + P3 together as a single architectural decision, not three separate features, is the product strategy. Treat conversation as the primary record, not the input to a separate record.

---

## 13. Prioritisation Rationale

### 13.1 Why This Problem

| Reason | Evidence |
|--------|----------|
| Frequency | 8/10 primary research participants identified this exact cluster. |
| Revenue directness | Causes deal loss, not just inefficiency. ROI case is immediate and personal. |
| Competitive white space | None of 16 tools addresses the full chain. |
| AI timing | Conversational AI mature enough for near-real-time summarisation on mobile. |
| Market urgency | 19.1% CAGR. 94% intent vs 50% adoption. First product to remove the adoption barrier captures the market. |

Five independent signals - frequency, revenue impact, competitive gap, AI readiness, market timing - converge on the same problem. That convergence is rare. It indicates this is the right problem at the right time.

### 13.2 Why Not Other Problems

| Problem | Reason Excluded |
|---------|----------------|
| D2C/B2C founder sales | Structurally different (platform analytics). Would dilute core architectural solution. [Excluded] |
| Team CRM and collaboration | Requires baseline individual data quality that doesn't exist yet. [Phase 2] |
| Analytics and reporting | Requires data foundation. Reporting on incomplete pipeline produces misleading results. [Phase 3] |
| Enterprise CRM capabilities | Target user has no sales team, no multi-stage approvals. Triggers customisation paradox. [Out of scope] |

Each excluded problem is real - but solving it requires a data foundation that doesn't yet exist. The sequencing is intentional: individual capture first, team features second, analytics third.

### 13.3 Trade-Offs

| Trade-off | Analysis |
|-----------|----------|
| Privacy vs convenience | Any conversation capture requires access to content. Founders must explicitly consent. Trust-critical design constraint. |
| Simplicity vs pipeline completeness | Solving only the P0 chain produces ~25-40% explicit coverage + AI inference. A 70-80% accurate pipeline with no manual effort is more useful than a 100% accurate pipeline the founder has abandoned. |
| Speed vs accuracy | AI-inferred deal stages won't be 100% accurate. But a pipeline with minor inaccuracies the founder uses is categorically more valuable than an accurate pipeline they've abandoned. Accuracy improves continuously; adoption is binary. |

All three trade-offs resolve in the same direction: a slightly imperfect tool the founder actually uses is categorically better than a perfect tool they abandon. Adoption is the primary success metric, not accuracy.

---

## 14. Narrowed Problem Statement

### 14.1 Core Problem Definition

Indian early-stage B2B founders who personally lead sales (0-5 person teams) lose deals not because they lack a CRM, but because every CRM requires the one behaviour they will not sustain: manually logging their conversations. The result is an invisible pipeline, missed follow-ups, and lost deals. The problem is architectural, not motivational. Founders know they are losing deals - 7 of 10 recalled a specific deal lost to follow-up failure. They lack a tool whose input model matches their actual workflow: short, asynchronous, multi-channel, WhatsApp-dominant, phone-first.

Every existing tool requires the founder to adapt to the tool. The solution must adapt to the founder.

### 14.2 Target User Segment

**Primary**: Indian B2B SaaS and B2B services founders, pre-seed to seed, 0-5 employees, pre-revenue to INR 1 Cr ARR, Bengaluru / Mumbai / Delhi NCR.

**Adjacent**: Tier 2 city founders (Pune, Hyderabad, Chennai), 0-10 employees, even higher WhatsApp dominance, lower CRM familiarity.

**Explicit exclusions**: D2C (analytics), EdTech (B2C-dominant), Real Estate (transaction-based), post-seed startups with a dedicated sales hire (different persona).

### 14.3 Problem Scope

**In Scope**:
- Failure to capture and act on sales conversations on personal WhatsApp and other async channels
- Failure to trigger proactive follow-ups when deal momentum is lost
- Absence of pipeline visibility for founder-managed deals across channels

**Out of Scope**:
- Team collaboration, shared pipelines, multi-user access
- Post-hiring sales management tooling
- Integrations with proposal tools, contract management, billing
- B2C sales tracking, marketplace seller analytics

---

## 15. Key Assumptions

### 15.1 User Behaviour

| Assumption | Evidence / Basis | Confidence |
|-----------|-----------------|------------|
| WhatsApp will remain the primary B2B sales channel | 8/10 primary, secondary consensus, Meta India stats | HIGH |
| Founders will not sustain manual data entry | 8/10 primary, 60-70% CRM abandonment rate, identical failure across all 16 tools - behavioural constant | HIGH |
| Founders will engage with <30 sec capture from phone | 3/10 cited 30-sec window; secondary research on mobile CRM adoption | MODERATE |
| Founders will trust AI summaries if they can review/edit quickly | Trust earned incrementally, not assumed from Day 1 | MODERATE |
| A direct deal recovery will create advocates | Untested. Early cohort data needed. | EMERGING |

### 15.2 Market

| Assumption | Evidence / Basis | Confidence |
|-----------|-----------------|------------|
| India CRM market growing at 19.1% CAGR; SMB is fastest-growing sub-market | Fortune Business Insights, IDC, Tracxn | HIGH |
| Price ceiling: INR 1,500-3,000/month | Community signals; products above require explicit ROI in deal terms | HIGH |
| Tier 2/3 city founders are a significant adjacent segment | English onboarding viable; Hindi/regional expands TAM but not required initially | MODERATE |
| Technical builder-founders will self-serve and become evangelists | Both initial target user and most valuable early adopter | MODERATE |
| "Show me it works on 3 deals" onboarding > "set up your full pipeline" | Requires validation through cohort analysis | EMERGING |

---

# PART 2: SOLUTION

---

## 1. Product Concept

### 1.1 The P0 Chain - What We Are Solving

The Discovery PRD identified three root-cause failures that compound in sequence. Solving the first breaks the entire chain downstream:

**Input Failure** -> WhatsApp conversations never enter any system. The pipeline is structurally incomplete from conversation one.

**Habit Failure** -> Manual logging breaks within days. There is no behavioural path that makes consistent entry sustainable for this persona.

**Output Failure** -> With no input, no follow-up triggers fire. The system cannot remind you about deals it does not know exist.

The solution does not patch these failures. It replaces the input model entirely.

### 1.2 What We Built

Founder CRM is not a simpler version of HubSpot. It is a fundamentally different product category - one that inverts the relationship between conversation and record.

In every existing CRM, a conversation is an input that requires a record. The founder must stop, open the CRM, and log what happened. In Founder CRM, the conversation IS the record. The founder forwards a WhatsApp thread, speaks a voice note, or sends a screenshot - and the system builds the deal record automatically.

| Every CRM Today | Founder CRM |
|------------------------|----------------|
| Conversation requires manual logging | Conversation IS the log |
| Founder opens CRM after every call | Bot captures passively via forward or voice |
| Value arrives weeks after consistent usage | Value arrives in the first 30 seconds - Day 1 |
| Built for VP Sales with 10 reps | Built for the founder who is the rep |
| Fails when the founder goes dark for 2 weeks | Catches up automatically when they return |
| Desktop-first, mobile as afterthought | Mobile-first bot. Desktop as visibility layer only. |

### 1.3 Architecture in One Sentence

A Telegram bot captures sales context passively from the founder's existing behaviour. A desktop platform makes that context visible. Neither requires the founder to do anything they are not already doing.

### 1.4 The Non-Negotiables

Any feature, flow, or design decision that violates one of these four constraints was excluded from the MVP. These are not preferences - they are survival conditions for this persona.

| Constraint | What It Means in Practice | Research Basis |
|-----------|--------------------------|---------------|
| Zero manual logging | If the founder must type anything consistently to keep the system alive, the system dies. Full stop. | 8/10 founders cited data entry as primary CRM failure cause |
| Instant first value | Value must arrive before end of Day 1. Not after 2-3 weeks of data input. Not after the pipeline is populated. | Abandonment peaks at week 2-6 across all 16 tools |
| Mobile-first capture | 70%+ of sales activity happens on mobile in 30-second interaction windows. Any product requiring desktop for capture fails architecturally. | Primary research: founders conduct full deal cycles on mobile |
| Conversation-driven | The conversation IS the log. Not an input to a separate log. Any product that inverts this hits the same ceiling as all 16 tools evaluated. | The architectural inversion - Industry Insight #1 from secondary research |

### 1.5 Design Rationale - Telegram as the Capture Layer

The choice of Telegram as the primary interface is not arbitrary. It is the only architecture that satisfies all four non-negotiables simultaneously:

- WhatsApp cannot be integrated directly. Meta's API prohibits personal WhatsApp access permanently. Forwarding to Telegram is not a workaround - it is the design.
- Telegram bots allow voice messages natively via the mic button - no separate app required.
- The forward action (WhatsApp -> Telegram) takes under 5 seconds. This is a lower-friction input than any form-based CRM entry.
- The bot delivers context back in the same interface where the founder already operates - no app switch, no context change.
- The architecture is fully compliant with India's DPDPA 2023. The founder controls what is forwarded. No auto-scraping of personal messages.

The forward architecture is not a workaround. It is the product.

---

## 2. Primary User Persona

### 2.1 The Founding Seller

| Attribute | Detail |
|-----------|--------|
| Name and Age | Arjun Mehta (composite), 29 |
| Company | B2B SaaS - HR tech tool for SMEs. Pre-seed. 3-person team. |
| Location | Bengaluru (applicable to Mumbai, Delhi NCR, Pune, Hyderabad) |
| Sales Reality | Manages 10-20 active conversations simultaneously. Deals span LinkedIn intro -> WhatsApp discussion -> call -> email proposal -> multiple follow-ups. No dedicated sales hire. |
| Current Toolkit | WhatsApp (primary), Gmail, LinkedIn, Google Sheets or Notion as a makeshift CRM, personal memory for context. |
| Primary Goal | Close deals without becoming a CRM administrator. Keep pipeline moving without stopping to update systems. |
| Core Frustration | "I scroll through 50 WhatsApp messages before every call just to remember what we discussed last time." |
| CRM History | Tried HubSpot Free, Zoho, Notion CRM. Abandoned all within 6 weeks. Reason: manual entry fatigue, not product quality. |
| Technical Comfort | Comfortable with apps and smartphones. Uses Telegram already. Not a developer. Zero tolerance for setup overhead. |

---

## 3. Product Flows

The product has five distinct flows. Each is designed to require zero friction at the point of use. The founder never opens a CRM interface to log something. They interact with the Telegram bot in the same way they already interact with colleagues - via forward, voice note, or text command.

### 3.1 Onboarding Flow

Design principle: Zero cognitive load at entry. The pipeline is generic. Value arrives before any configuration is required. The product does not ask the founder to set up a pipeline, define stages, or enter existing deals. Asking them to define their sales process upfront is the exact failure pattern of every CRM they have already abandoned.

| Step | Action | What the User Sees | Time |
|------|--------|-------------------|------|
| 1 | Visits landing page | One-line value prop. Single CTA: 'Start Free' | 30 seconds |
| 2 | Clicks CTA - opens Telegram | Deep link opens Telegram app. Founder taps 'Start'. | 5 seconds |
| 3 | Bot sends welcome message | "Hi! I'm your sales assistant. Forward me any WhatsApp conversation or send a voice note after a call. No setup needed." | Instant |
| 4 | Founder forwards first conversation | Bot extracts lead card. Founder confirms. First deal logged. | < 30 seconds |

What is NOT required at onboarding: name, email, company info, pipeline stages, role description, integrations. The bot waits for the first forward. The first forward IS the activation event.

### 3.2 Input Layer

The founder has three input modes. The bot accepts all three interchangeably. There is no "correct" way to log - any channel the founder is already using becomes a valid capture surface.

| Input Type | User Action | What AI Extracts |
|-----------|-------------|-----------------|
| WhatsApp Conversation Forward | Selects a WhatsApp thread -> Long-presses -> Forward to Founder CRM bot | Contact name, company, deal stage signals, intent phrases, budget mentions, objections, next step indicators |
| Voice Note (Post-Call) | Opens Telegram bot -> Presses mic -> Speaks a 30-second summary of the call | Structured deal note: contact, discussion points, outcome, next action - transcribed and tagged automatically |
| Screenshot / Image | Screenshots a business card, LinkedIn message, email, or any text - sends to bot | Contact identity, company, stated intent, message summary |

Edge cases not in MVP: multi-forward batches, PDF attachments, video call transcripts. These are Phase 2 inputs.

### 3.3 Deal Capture Flow

Once an input arrives, the bot runs a structured extraction sequence. The founder confirms a card - they do not fill one in.

| Step | System Action | User Sees | User Action |
|------|--------------|-----------|-------------|
| 1 | AI processes input | Typing indicator. 2-3 second processing. | Waits |
| 2 | Bot generates Lead Card | Contact name, Company, Deal stage, Budget signal (if present), Key blocker (if present), Suggested next action | Reviews card |
| 3 | Bot checks for missing critical fields | If contact name or stage is missing: bot asks one clarifying question only. Never more than one. | Replies (optional) |
| 4 | Founder confirms or edits | Quick-edit buttons for common changes. No form. Inline reply to edit any field. | Confirms or edits |
| 5 | Deal stored | "Saved. Ankit Sharma from TechCorp is now in Evaluating. I'll remind you in 3 days if no update." | Done |

Fields auto-populated by AI extraction: Contact Name, Company, Deal Stage, Primary Contact, Budget Signal, Decision Maker, Key Blocker, Next Follow-up window, Contact Health Score. Rules per field are defined in the system prompt - the founder never sees them.

### 3.4 Context Recall Flow

The highest-frequency use case from primary research: the founder needs deal context in the 5 minutes before a call. Currently this requires scrolling 50+ WhatsApp messages. The product reduces this to a single command.

| Input | User Action | System Response |
|-------|-------------|----------------|
| Slash command | Types: `/context [company]` | Full deal brief: last conversation, current stage, open questions, suggested talking points for this call |
| Natural language (text) | Types: "What's the status with Rahul from Juspay?" | Conversational summary of all interactions with Rahul, last touchpoint, next action pending |
| Voice | Speaks: "Prep me for my call with TechCorp in 10 minutes" | Voice-friendly deal brief. Optimised for a walking/commuting founder who cannot look at a screen. |

### 3.5 Nudge and Follow-Up Flow

The system fires follow-up nudges automatically. The founder does not set reminders manually. The logic is triggered by deal inactivity, not by the founder's calendar.

| Trigger | System Message | User Action |
|---------|---------------|-------------|
| No update for 3 days (Evaluating stage) | "You haven't updated Ankit Sharma in 3 days. Last status: evaluating pricing. Follow up?" | Taps 'Yes, remind me' / 'Log an update' / 'Mark as cold' |
| No update for 7 days (any active stage) | "Rahul at Juspay has been quiet for 7 days. Do you want to follow up or mark this deal as cold?" | One-tap action. Logging this action re-enters the deal capture flow if needed. |
| Daily digest (8 AM) | "You have 3 deals needing follow-up today. 2 are overdue. Your hottest deal: [Company X]." | Reviews and acts on priority deals first |
| Deal marked Closed (Won or Lost) | "Congratulations on closing TechCorp! Want to log what made this one work?" | Optional voice note. Feeds deal intelligence over time. |

Follow-up rules by stage: New (24h), Contacted (3d), Evaluating (3d), Proposal Sent (2d). Closed deals exit the nudge queue. Rules are system-set. Not configurable in MVP.

---

## 4. Workflow Mapping - Before and After

### 4.1 Before Founder CRM - A Day in Reactive Mode

| Time | User Action | System State | Cost |
|------|-------------|-------------|------|
| 8:00 AM | Manually scrolls WhatsApp to reconstruct yesterday's conversations | Nothing logged. Context lives in WA chat history. | 12-15 min daily |
| 10:00 AM | Takes a discovery call. Good conversation. Means to log it later. | No record created. | Context lost |
| 12:00 PM | Sends a proposal. No reminder set. Moves to next task. | No follow-up queued. | Deal at risk |
| 3:00 PM | Warm lead from 2 weeks ago goes cold. Founder didn't know they needed a touch. | Lead status unknown. No inactivity signal. | Deal lost |
| 5:00 PM | Pre-call prep: scrolls through 50 WA messages to remember what was discussed | All context in personal WA chat threads. | 12 min wasted |
| 8:00 PM | Investor asks for pipeline update. Reconstructs from memory. Spends 40 min. | No real data. Pipeline is a memory exercise. | 40 min + inaccuracy |

### 4.2 After Founder CRM - Same Day, Structured Mode

| Time | User Action | System State | Outcome |
|------|-------------|-------------|---------|
| 8:00 AM | Reviews daily digest from bot. 3 deals needing follow-up. 2 overdue. | Full pipeline visible. Priority ranked automatically. | 2 min. Day planned. |
| 10:00 AM | Takes a discovery call. Sends a 30-sec voice note to bot immediately after. | Deal created. Stage: Evaluating. Nudge queued for day 3. | 30 sec. Context captured. |
| 12:00 PM | Sends a proposal. Logs via `/note`. Bot auto-queues follow-up for 48h. | Stage updated: Proposal Sent. Reminder set. | 10 sec. |
| 3:00 PM | Bot nudges: "Warm lead from 12 days ago. Last status: interested. Follow up?" | Inactivity detected. Founder prompted before deal goes cold. | Deal saved. |
| 5:00 PM | Types `/context TechCorp` before call. | Full brief returned in 4 seconds. | Call starts informed. |
| 8:00 PM | Investor asks for pipeline. Types `/deals`. | Live pipeline snapshot returned. | 10 sec. Accurate. |

---

## 5. Desktop Platform

### 5.1 Architectural Principle

The desktop platform is a visibility layer, not a capture layer. The bot captures. The desktop displays. The founder never needs to open the desktop to keep the system alive.

This is a deliberate inversion of the standard CRM architecture. In HubSpot, Pipedrive, or Zoho, the desktop is where work happens and the mobile app is an afterthought. In Founder CRM, the Telegram bot is where work happens and the desktop is where patterns become visible.

This means: if the founder never opens the desktop, the system still functions. This is not a failure state. It is the intended design.

### 5.2 Feature Set

| Feature | What It Shows | Phase | Priority |
|---------|-------------|-------|----------|
| Pipeline Board | Kanban view of all deals across 5 stages. Read-only in Phase 1 - founder cannot drag cards; they update via bot only. | Phase 1 | P0 |
| Deal Timeline View | Every touchpoint for a contact in a single thread - calls, forwards, voice notes, emails - in chronological order. | Phase 1 | P0 |
| Contact Heat Scores | Hot / Warm / Cold classification for every contact. Calculated from days since last touch, sentiment, and engagement frequency. | Phase 1 | P0 |
| Follow-Up Queue | Priority-ranked list of deals needing attention. Same data as the daily bot digest, displayed as a persistent list. | Phase 1 | P0 |
| Deal Search | Full-text search across all deal records, contact names, companies, and logged notes. | Phase 1 | P0 |
| Win/Loss Patterns | Basic analytics: closed-won vs closed-lost ratio, average deal length by stage, most common blockers. Requires minimum 20 deals to surface. | Phase 2 | P1 |
| Investor Pipeline Export | One-click clean pipeline snapshot formatted for investor conversations. Auto-populated from existing data. | Phase 2 | P1 |
| Team Pipeline (Shared) | Multi-user deal visibility when the founder makes their first sales hire. Shared context, handover notes, deal assignment. | Phase 3 | P2 |

### 5.3 Key Differentiators

| Design Decision | Why (Evidence) | What This Replaces |
|----------------|---------------|-------------------|
| Read-only in Phase 1. Updates via bot only. | Editable pipeline boards invite manual entry. The same failure re-enters through the desktop. | The standard CRM pipeline board (HubSpot, Pipedrive) |
| No required fields. No empty-state friction. | Empty CRM dashboards are the #1 visual trigger for abandonment. Show data from Day 1 or do not show the dashboard. | New user empty-state screens that require onboarding before value |
| Heat score over deal stage as primary sort. | 4/10 founders do not think in pipeline stages. Heat score is intuitive - it maps to how they already prioritise in their head. | Stage-based pipeline views that assume a defined sales process |
| Deal timeline as primary contact view. | Context loss is the #1 follow-up failure cause. Showing the full conversation history eliminates the pre-call WA scroll. | Contact record with individual activity fields (call logged, email sent, etc.) |

### 5.4 Permanent Constraints

The desktop platform will never have direct WhatsApp integration. This is not a roadmap deferral. It is a permanent architectural boundary:

- Meta's Business API does not support personal WhatsApp accounts. The API is designed for business numbers, not personal mobile numbers.
- India's DPDPA 2023 creates additional compliance constraints around processing personal message data without explicit consent flows.
- Any product feature that requires direct WhatsApp API access for personal accounts is not achievable without violating Meta's terms of service.

The Telegram forward architecture is not a workaround. It is the product. The founder remains in control of what is shared. Nothing is auto-captured without founder action.

---

## 6. User Stories

User stories are written from the perspective of Arjun - the founding seller persona. Each story maps to a product flow and a specific pain point validated in primary research. Stories are organised by job-to-be-done, not by feature.

### 6.1 Capture - Getting Conversations Into the System

| # | Story | Acceptance Criteria | Pain Point Addressed |
|---|-------|-------------------|---------------------|
| U1 | As a founder, I want to forward a WhatsApp conversation to the bot and have it automatically create a deal record, so I never have to open a CRM to log a conversation. | Bot processes forward in < 3 seconds. Lead card shown with contact name, company, and inferred stage. Founder confirms in one tap. Deal visible in pipeline. | Zero-capture problem. 70% of deals on personal WA never enter any system. |
| U2 | As a founder, I want to send a 30-second voice note after a call and have it turned into a structured deal note automatically. | Bot transcribes note. Extracts discussion points, outcome, next action. Presents structured record for confirmation. No typing required. | Manual logging fatigue. Founders do not log calls because it requires stopping and typing. |
| U3 | As a founder, I want to send a screenshot of a LinkedIn message and have the contact and intent automatically extracted. | Bot runs OCR on screenshot. Extracts name, company, message intent. Creates lead card or updates existing record if contact already exists. | Multi-channel capture gap. Deals begin on LinkedIn but get lost before reaching any system. |
| U4 | As a founder, I want to be able to correct any field in a lead card without filling out a form. | Inline reply editing works for any field. Changes confirmed with one message. No form UI. No required fields that block save. | CRM rigidity. Mandatory fields and form-based editing are a primary friction point at the point of capture. |

### 6.2 Context Recall - Knowing the Deal Before the Call

| # | Story | Acceptance Criteria | Pain Point Addressed |
|---|-------|-------------------|---------------------|
| U5 | As a founder, I want to type `/context [company]` and receive a full deal brief in under 5 seconds, so I stop scrolling 50 messages before every call. | Bot returns: last interaction, current stage, open questions, budget signal, decision maker, one suggested talking point. Response time < 5 seconds. | Pre-call context scramble. 12 minutes per call day wasted on WA scroll. 6/10 founders cite context loss as critical. |
| U6 | As a founder, I want to ask the bot in natural language "What's the status with Rahul?" and get a conversational answer. | Bot interprets NL query. Identifies contact from name alone. Returns summary in plain conversational language. No command syntax required. | Cognitive load. Founders should not need to remember command syntax to access their own deal data. |
| U7 | As a founder commuting to a meeting, I want to ask the bot via voice note to prep me for my upcoming call. | Bot accepts voice input for context recall. Responds with a voice-friendly brief (no tables, no bullet formatting - readable aloud). | Mobile-first reality. Founders are often moving, not seated, when they need deal context. |

### 6.3 Follow-Up - Deals Moving, Not Dying

| # | Story | Acceptance Criteria | Pain Point Addressed |
|---|-------|-------------------|---------------------|
| U8 | As a founder, I want the bot to automatically remind me when a deal has been inactive for 3 days, so I never let a warm lead go cold by accident. | Bot fires nudge on the correct timer per stage. Message includes deal name, last status, and one-tap actions: Follow up / Mark cold / Snooze 2 days. | Timing failure. 44% of founders make only one follow-up attempt. 48% never follow up even once. |
| U9 | As a founder, I want to receive a morning digest of my pipeline so I start the day knowing exactly what to act on. | Daily 8 AM message: deals needing follow-up today, overdue deals, hottest deals highlighted. No more than 5 items shown. Expandable for full list. | Reactive mode. Founders spend first hour of day reconstructing context instead of acting. |
| U10 | As a founder, I want to mark a deal as won or lost with one message, so the pipeline stays accurate without admin work. | Bot recognises `/won` and `/lost` commands. Updates deal stage immediately. Removes deal from active nudge queue. Prompts optional win/loss note. | Pipeline inaccuracy. Deals stay "active" indefinitely. Founders overestimate pipeline health. |

### 6.4 Pipeline Visibility - Seeing the Full Picture

| # | Story | Acceptance Criteria | Pain Point Addressed |
|---|-------|-------------------|---------------------|
| U11 | As a founder, I want to type `/deals` and see my full pipeline in the bot so I can answer investor questions on the spot. | `/deals` returns: count by stage, total pipeline value (if captured), and top 3 deals by heat score. Response in < 3 seconds. | Investor pipeline scramble. 40 minutes spent reconstructing the pipeline from memory before board meetings. |
| U12 | As a founder, I want to open the desktop dashboard and see my deals in a pipeline view without having to log anything additionally. | Desktop pipeline populates automatically from bot captures. No separate data entry required for desktop to show accurate data. | Completeness illusion. Pipeline shows only 30-40% of actual deals. Founder believes they are tracking when they are not. |
| U13 | As a founder, I want to see a heat score for every contact so I instantly know who needs my attention without reading every record. | Every contact shows Hot / Warm / Cold score. Score auto-updates based on recency, frequency, and sentiment. No manual tagging required. | Recency collapse. Older active leads fade as founders focus on recent conversations. Cold deals remain pending indefinitely. |

---

## 7. MVP Scope

### 7.1 MVP in One Sentence

A Telegram bot that captures sales conversations from WhatsApp forwards and voice notes, creates structured deal records automatically, and reminds the founder when deals need attention - with no setup, no data entry, and no learning curve.

### 7.2 The Hypotheses Driving MVP Design

The MVP is built to validate five specific hypotheses before any Phase 1 desktop build begins. If any of H1-H3 fail, the product does not proceed to Phase 1.

| H# | Hypothesis | Kill Signal | Gate For |
|----|-----------|-------------|----------|
| H1 | Founders will forward WhatsApp conversations to a Telegram bot when it requires less than 5 seconds of additional effort. | < 30% of active users forward at least 1 message per week in 30 days | The entire capture architecture. If this fails, the product has no viable input model. |
| H2 | Founders will use voice notes to log post-call summaries when the interface is present in their existing messaging app. | < 25% of users send at least 1 voice note in first 14 days | Voice as the primary capture fallback. Critical for founders in meetings who cannot type. |
| H3 | Founders will use `/context` to recall deal information before calls, replacing the manual WhatsApp scroll. | < 40% of active users use `/context` within first 30 days | The context recall flow and the value of the bot as a pre-call tool. |
| H4 | Nudge-triggered follow-ups will increase the number of active deals that receive a second touchpoint within 5 days. | No measurable improvement in second-touchpoint rate vs baseline | The nudge and follow-up system as a retention mechanism. |
| H5 | Founders will prefer a bot-first interface for deal management over a traditional CRM interface when both are available. | Majority of deal updates happen through desktop form entry, not bot commands | The architectural bet: bot-first over form-first for this persona. |

### 7.3 In Scope for MVP

| Feature | Description | Priority |
|---------|-------------|----------|
| WhatsApp Conversation Capture | Forward WA thread to bot -> AI extracts lead card -> founder confirms in one tap | P0 - MUST HAVE |
| Voice Note -> Deal Log | Post-call voice note -> Whisper transcription -> structured deal note created automatically | P0 - MUST HAVE |
| Screenshot / Image Capture | Screenshot of WA, LinkedIn, or email -> OCR + AI extracts contact and intent -> lead card created | P0 - MUST HAVE |
| AI Lead Card Generation | Every input produces an auto-populated lead card: contact, company, stage, intent, budget signal, next action | P0 - MUST HAVE |
| One-Tap Confirmation | Founder confirms or edits lead card via inline reply. No form. No mandatory fields. | P0 - MUST HAVE |
| `/context` Command | Returns full deal brief for any company in < 5 seconds | P0 - MUST HAVE |
| `/deals` Command | Returns pipeline snapshot: count by stage, heat-ranked deals | P0 - MUST HAVE |
| `/note` Command | Freeform note logged against an existing deal record | P0 - MUST HAVE |
| `/won` and `/lost` Commands | Marks deal as closed. Removes from active nudge queue. Prompts optional note. | P0 - MUST HAVE |
| `/remind` Command | Sets a manual reminder on any deal. Overrides auto-nudge timer. | P0 - MUST HAVE |
| Inactivity Nudges | Automatic reminders triggered by deal inactivity. Stage-based timers: New 24h, Contacted 3d, Evaluating 3d, Proposal Sent 2d. | P0 - MUST HAVE |
| Daily Digest | 8 AM daily summary: deals needing follow-up, overdue deals, hottest deal. Maximum 5 items shown. | P0 - MUST HAVE |
| Generic 5-Stage Pipeline | New -> Contacted -> Evaluating -> Proposal Sent -> Closed. Pre-configured. Not editable in MVP. | P0 - MUST HAVE |
| Natural Language Queries | Bot interprets freeform questions about deal status in addition to slash commands | P1 - SUPPORTING |
| Contact Heat Score (Bot) | Hot / Warm / Cold score shown in `/deals` output and deal briefs. Calculated automatically. | P1 - SUPPORTING |

---

## 8. What We Left Out and Why

Every feature below was explicitly considered and excluded from the MVP. The exclusions are not oversights - they are architectural decisions designed to prevent the same failure patterns that caused every CRM in the evaluated set to fail this persona.

| Excluded Feature | Why It Was Considered | Why It Was Excluded | Phase |
|-----------------|---------------------|-------------------|-------|
| Desktop UI at launch | Provides pipeline visibility founders say they want | Capture habit must be validated first. A desktop with no data is a useless dashboard that triggers abandonment. | Phase 1 |
| Custom pipeline stages | Founders have different sales processes. Flexibility seems like good UX. | Setup friction kills adoption. 4/10 founders do not know their stages yet. Generic stages eliminate onboarding friction entirely. | Phase 2 |
| Email integration | Email is one of the 4-6 channels founders use | Email sync exists in 12 of 16 tools evaluated. It does not differentiate. The WhatsApp gap is the problem this product exists to solve. | Phase 2 |
| LinkedIn integration | Deals often start on LinkedIn | LinkedIn API has strict rate limits and scraping restrictions. Screenshot capture addresses this without API dependency. | Phase 2 |
| AI follow-up drafting | Founders cite "not knowing what to say" as a follow-up barrier | Requires a validated deal context corpus first. Cannot draft intelligently without deal history. Feature collapses without H1-H3 validated. | Phase 2 |
| Win / loss analytics | Founders want to know why deals close | Requires minimum 20-30 closed deals to surface meaningful patterns. Analytics on <20 deals generate false signals. | Phase 2 |
| Team / shared pipeline | Founders will eventually hire a salesperson | Target persona is solo founder. Multi-user introduces permissions, visibility controls, and role complexity that add setup overhead to MVP. | Phase 3 |
| Investor pipeline export | Founders reconstruct pipeline before investor meetings | The `/deals` command addresses this need in the MVP. A formatted export requires deal corpus + desktop layer. | Phase 2 |
| Auto-capture (no founder action) | True ambient capture would require no founder involvement | Technically infeasible without personal WhatsApp API access (Meta constraint). Legally problematic without explicit consent per DPDPA 2023. | Not viable |
| Direct WhatsApp integration | Would eliminate the forward step entirely | Permanent Meta API constraint. Personal WhatsApp integration is architecturally prohibited. Not a roadmap deferral. | Permanent exclusion |

---

## 9. Success Metrics

Metrics are behaviour-first. We measure what founders do, not what they say they will do. User-reported satisfaction is not a success signal. Behaviour change is the only signal that matters.

Kill condition: if any P0 metric misses its 30-day target, the corresponding hypothesis is marked as failed and the team pauses feature development to diagnose before proceeding.

| Metric | What It Measures | 30-Day Target | Kill Signal | Hypothesis |
|--------|-----------------|---------------|-------------|------------|
| Weekly Forward Rate | % of active users who forward >= 1 WA conversation per week | > 50% | < 30% | H1 |
| Voice Note Adoption | % of active users who send >= 1 voice note in first 14 days | > 40% | < 25% | H2 |
| `/context` Usage Rate | % of active users who use `/context` at least once in 30 days | > 60% | < 40% | H3 |
| Nudge Response Rate | % of nudges that result in a deal update within 24 hours | > 45% | < 20% | H4 |
| Bot vs Desktop Update Ratio | % of deal updates made via bot commands vs desktop form entry | > 80% via bot | < 50% via bot | H5 |
| D7 Retention | % of users who are still active (>= 1 bot interaction) 7 days after signup | > 65% | < 40% | Core |
| D30 Retention | % of users who are still active 30 days after signup | > 40% | < 20% | Core |

---

## 10. Implementation Plan

Full implementation guide (built against a 3-4 day MVP timeline) is maintained separately in the cohort spreadsheet.

### 10.1 Build Phases

| Phase | Duration | What Ships | Hypothesis Tested | Gate to Proceed |
|-------|----------|-----------|------------------|----------------|
| Phase 0: Foundation | 1 day | Telegram bot scaffold, auth, deal-record schema, LLM/Whisper integration plumbing | None - setup | Bot live in a test workspace, no P0 bugs |
| Phase 1: Core Loop | 1-2 days | WhatsApp forward capture, voice-note capture, screenshot capture, lead card generation, one-tap confirmation, slash commands (`/context`, `/deals`, `/note`, `/won`, `/lost`, `/remind`) | H1, H2 | H1 threshold met in cohort test |
| Phase 2: Value Delivery | 1 day | Inactivity nudges, daily digest, contact heat score, NL query interpretation | H3, H4 | H3 threshold met; nudge response rate trending toward target |
| Phase 3: Desktop Visibility | Phase 1+ post-MVP | Pipeline board (read-only), deal timeline view, follow-up queue, deal search | H5 | Usage data confirms bot-first architecture |

### 10.2 Technical Approach

**Stack**: Telegram Bot API (only viable mobile capture surface), LLM for entity extraction and stage inference (prompt and eval design is a separate doc), Whisper for voice transcription (handles Indian English; will degrade on heavy code-switching), Postgres for deal records, a thin Next.js dashboard for Phase 1 desktop.

**Critical path**: LLM extraction quality. If the lead card looks wrong on first forward, H1 dies on Day 1. Prompt engineering and eval coverage gates everything else.

_Specific prompt designs, eval cases, and cost-per-user modelling are not covered in source PRD; would be filled in v2 of this doc, before build kickoff. This was a flagged gap in cohort feedback._

---

## 11. Trade-offs and Limitations

### 11.1 What This Product Does Not Solve

| Area | Why It Is Out of Scope |
|------|----------------------|
| Deal quality or product-market fit | Founder CRM cannot make a weak product win deals. It surfaces context and timing. It cannot change what a prospect thinks about the product. |
| Outbound lead generation | The product manages conversations after they begin. It does not generate new leads or support cold outreach campaigns. |
| Sales coaching / process definition | The MVP does not tell founders how to sell. It captures what they do. Process intelligence is Phase 3 (AI Sales Coach). |
| Prospect responsiveness | The product cannot make a prospect reply. It ensures the founder follows up. Whether the prospect engages is outside product scope. |
| Stop-start founder rhythm | When founders go dark for 2+ weeks (fundraising, product sprint), pipeline data becomes stale. The system catches up when they return, but cannot operate during dark periods without input. |

### 11.2 Known Trade-offs in MVP Design

| Trade-off | What We Gave Up | Why We Made It |
|-----------|----------------|---------------|
| Telegram over WhatsApp native | Forward action adds 2-3 seconds of friction. Some founders will not complete it. | No viable alternative. Personal WhatsApp integration is permanently prohibited. Telegram is the only compliant, frictionless path. |
| Generic 5-stage pipeline | Founders with non-standard sales processes will find the stages do not map to their reality. | Setup friction kills adoption faster than stage mismatch. A wrong stage is better than no stage. |
| No desktop at MVP | Founders who expect a dashboard will feel the product is incomplete. | A desktop with no validated data asset is a failure surface, not a value surface. Bot-first sequence is non-negotiable. |
| Bot-only interface | Not optimal for bulk deal review or complex pipeline analysis. | The target persona's primary device is mobile. A desktop-first product fails to capture the 70% of conversations that happen on mobile. |
| Founder-triggered capture only | True ambient capture - capturing without any founder action - is not possible. | DPDPA 2023 compliance requires explicit consent. Auto-capture of personal messages is both technically constrained and legally problematic. |

### 11.3 Dependency Risks

- The product requires stable Telegram Bot API access. Any Telegram service disruption or API policy change directly affects the capture layer.
- AI extraction quality (lead card accuracy) depends on the quality of the LLM prompt and the clarity of the forwarded conversation. Ambiguous or short WA threads will produce incomplete lead cards.
- Whisper transcription accuracy degrades with background noise, strong regional accents, and non-English speech mixing. Founders who code-switch frequently (English + Hindi + regional language) may see lower voice note accuracy.
- The enrichment layer in Phase 2 depends on third-party data sources (LinkedIn, news APIs, funding databases). Data availability and API terms may vary and are outside product control.

_Per-feature edge cases and fail-safes (e.g., "what happens if the bot is down - does the founder have a fallback?") are not covered in source PRD; would be filled in v2 of this doc. This was a flagged gap in cohort feedback._

---

## 12. The Moonshot

**Phase 3+**
**Separate Surface**

The AI Sales Coach moves Founder CRM from a context management tool to an active competitive intelligence layer. The system continuously enriches every deal record with scraped intelligence about the prospect, their company, and their buying context - and uses this to tailor the founder's pitch, timing, and talking points.

### 12.1 The Problem This Solves

Primary research identified a consistent pattern: founders with deep domain knowledge win deals not because they have better products, but because they understand their prospect's specific situation better than competitors do. The constraint is that research takes 30-90 minutes per account - time most founders do not have.

> "I know my product can solve their problem. But I go into every call not knowing enough about their business. I wing it. Sometimes it works." - Navdeep, B2B Services Founder - Primary Research

The AI Sales Coach eliminates the research gap. The founder arrives at every conversation with account intelligence that would previously take an hour to assemble.

### 12.2 How It Works

The coach operates on two tracks simultaneously - continuous enrichment in the background, and on-demand coaching at the point of need.

| Track | What Happens | Output to User |
|-------|-------------|---------------|
| Continuous Enrichment (Background) | As soon as a company is identified in a deal record, the system begins pulling: LinkedIn company page, recent funding news, headcount signals, recent hiring (ICP match), job descriptions (budget signals), leadership team changes, product launches, competitor mentions. | Deal record enriched silently. Founder sees a richer context card when they recall the deal. |
| Pre-Meeting Coaching (On-Demand) | Founder types or says: "Coach me for my call with TechCorp tomorrow." System pulls all enrichment data + deal history + known objections + competitor context. | A structured pre-call brief: (1) What matters to this company right now (2) The angle most likely to land (3) Three tailored talking points (4) Known objections and responses (5) One thing to ask that unlocks the deal. |
| Touchpoint Sequencing (Intelligence) | System analyses closed-won deals over time. Identifies which sequence of touchpoints (cadence, channel, message type) correlates with faster close rates for this founder's segment. | Personalised outreach sequence recommendation: "For enterprise prospects in HR tech, your win rate is 2x higher when you follow a demo with a case study reference within 48 hours." |

### 12.3 Why This Is Not in the MVP

| Reason | Detail |
|--------|--------|
| Requires deal corpus to be valuable | The coaching layer needs a minimum of 20-30 logged deals to identify patterns. MVP validates that founders will capture deals consistently before building intelligence on top. |
| Separate surface, not a bot command | The depth of coaching output - structured briefs, sequence recommendations, account intelligence - requires a dedicated web interface. It cannot be delivered usefully inside a Telegram thread. |
| Scraping architecture is a separate build | Continuous enrichment requires a separate data pipeline (LinkedIn enrichment, news aggregation, funding data, job signal APIs). This is a non-trivial infrastructure dependency that must not block MVP launch. |
| H1-H3 must be validated first | The moonshot assumes founders forward conversations consistently (H1) and act on context recall (H3). If those hypotheses fail, the coaching layer has nothing to work with. |

### 12.4 If Validated - Strategic Implication

The AI Sales Coach is the product's long-term moat. It is the feature that no general-purpose CRM can replicate for this persona, because it requires: (a) a deal history built through a capture mechanism designed for WhatsApp-first workflows, and (b) a coaching layer trained on founder-led B2B sales patterns in India specifically.

The data asset that the bot builds through passive capture becomes the training input for the coach. The flywheel: more captures -> richer intelligence -> better coaching -> higher win rates -> stronger retention.

---

## Notes on this Example

**Sections that mapped one-to-one with the source PRD**: Document overview, problem tension, broader problem statement, context, target user definition, problem space context, business impact (with the illustrative scenario table), existing ecosystem, primary research (methodology, say-do gap, week-in-the-life, friction, patterns, verbatim signals), secondary research (market sizing, time allocation, community signals, review patterns, three industry insights), competitor analysis, problem clustering, problem prioritisation, prioritisation rationale (incl. trade-offs), narrowed problem, key assumptions, product concept (the P0 chain inversion), persona, all five product flows, before/after, desktop platform, all four user-story job categories, MVP scope, what we left out, success metrics, trade-offs and limitations, and the AI Sales Coach moonshot.

**Sections marked as not-covered**:
- Section 10.2 (Technical Approach > stack and prompt design): the source PRD links to an external implementation spreadsheet and was flagged in cohort feedback for missing prompt design, eval coverage, and per-user cost modelling. Marked as a v2 gap.
- Section 11.3 (Dependency Risks > per-feature fail-safes): the source PRD covers four high-level risks but does not enumerate edge-case fallbacks per feature (e.g., bot downtime path). Also flagged in cohort feedback. Marked as a v2 gap.

**Mapping notes**: The source PRD was already structured very close to this template - that is not coincidence; both descend from the same internal PRD methodology. The hardest mapping call was the Implementation Plan section. The source treats it as a one-line pointer to a Google Sheet. The template wants build phases with hypothesis gates. I rebuilt a phase table from the implicit hypotheses-to-features mapping the rest of the PRD makes obvious, but flagged the missing pieces (prompts, evals, cost) instead of inventing them. The easiest section was the user stories - the source had a complete 13-story appendix with acceptance criteria and pain-point links that dropped directly into the template's job-to-be-done structure with no rewriting.
