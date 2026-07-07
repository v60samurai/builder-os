<!-- Builder OS Pro — operating manifesto. Single source of truth for the 5 modes,
     tripwires, validation protocol, and gate definitions used across discovery/,
     prd/, sessions/, brand/, and postmortem/. Edit here if you fork this — every
     file above links back to this one instead of restating the rules. -->

# Builder OS Pro — Manifesto

Templates alone don't stop you from doing DELIVER work while DEFINE is still open, or from calling a hypothesis a fact because it's been written down for a week. This manifesto is the layer that catches that. Five modes, in order, each with a real exit condition — not "when it feels done."

---

## Operating Modes

### BRAINSTORM
- **Purpose:** Generate options. Expand the space. No commitment.
- **Gear:** SCOPE EXPAND
- **Artifact:** `discovery/idea-log.md`
- **Allowed:** Divergence, "what if," bad ideas logged on purpose.
- **Forbidden:** Converging on one idea, estimating effort, killing an idea without logging why.
- **Exit when:** 3+ distinct ideas are logged and worth narrowing. One idea you've talked yourself into is not an exit condition — it's a sign you skipped this mode.

### DISCOVER
- **Purpose:** Find the real problem and grade the evidence for it. Reduce uncertainty before anyone proposes a solution.
- **Artifact:** `discovery/discovery-brief.md`
- **Allowed:** Interviews, data pulls, competitive scans, say-do gap analysis, steelmanning the case against building this at all.
- **Forbidden:** Proposing solutions before the problem is evidenced. If a feature idea shows up in this document, it moved to the wrong file.
- **Exit when:** Riskiest assumption is named, has a cheapest-test plan, and every claim carries a confidence tag. An ICP with only demographics (no structural condition) is not exit-ready.

### DEFINE
- **Purpose:** Commit to what and why. Lock scope. Then, for a build, spec the engineering.
- **Gear:** SCOPE HOLD
- **Artifact:** `prd/prd.md` (phase-split — Phase 1 = min usable), then `erd/erd-template.md` (the engineering spec)
- **Allowed:** Writing the PRD (phase-split), classifying the build (see gate below), writing the ERD, prioritization calls, gate-checking with `prd-gate` + `erd-gate`.
- **Forbidden:** New discovery ("let's go interview 5 more users" belongs back in DISCOVER, not as a PRD section), scope expansion mid-write, writing code (that's DELIVER).
- **Exit when:** `prd-gate` returns READY — non-goals real, guardrail metric exists, no placeholders, confidence tags on every claim; the build is classified; and for a build, `erd-gate` returns READY — the ⭐ structural decision resolved, no load-bearing 🔵, every chunk has boundary contracts.

### DELIVER
- **Purpose:** Build to spec. Ship.
- **Artifact:** `sessions/SESSION_PLAYBOOK.md` (driven by `session-runner`), building against the ERD's chunk map; `brand/` guide (driven by `brand-guide-visualizer`)
- **Allowed:** Implementation, checkpoint verification, cutting to MVP under real deadline pressure (SCOPE REDUCE gear, invoked deliberately, not by accident).
- **Forbidden:** Re-opening DEFINE without a tripwire firing. A mid-build "actually, let's also add X" is scope creep unless a tripwire below justifies it. Starting a build before `erd-gate` is green.
- **Exit when:** Shipped, and every session's done-check plus both checkpoints are green — not "green enough."

### LEARN
- **Purpose:** Measure against what the PRD said would happen. Extract one lesson. Write the decision record.
- **Artifact:** `postmortem/postmortem-template.md`
- **Allowed:** Metrics review, retro, postmortem, decision records.
- **Forbidden:** Shipping the next thing before the lesson is written. A postmortem "we'll get to" is a postmortem that doesn't happen.
- **Exit when:** The One Lesson is written as a rule (not an anecdote), and Iterate/Scale/Retire has an explicit answer, not "TBD" on all three.

---

## Tripwires

Conditions that force a stop and a re-plan. Run `/tripwire-audit` (if you have it wired up) or check this list by hand at any checkpoint that feels off.

- **Building in DELIVER but a core assumption is still 🔵 hypothesis** → drop back to DISCOVER. Shipping on an untested load-bearing assumption is the single most expensive mistake this manifesto exists to prevent. This includes *architectural* 🔵s — an unresolved ⭐ ERD decision is a load-bearing hypothesis; resolve or spike it before build.
- **"Build our own X" / "new service" / "new table"** → is there an existing pattern to mirror first? Reuse-don't-invent. New infrastructure needs a reason the existing pattern can't cover, stated in the ERD — not a default reached for because it's easier than reading the sibling code.
- **An Open Question has survived two or more `prd-updater` edits unresolved** → escalate it to the DRI directly; don't let a third edit pass with the same question still sitting there.
- **`prd-gate` returns NOT READY but the team starts DELIVER anyway** → stop. Either the gate is wrong (fix the gate) or the PRD isn't ready (fix the PRD). Do not proceed on "we'll fix it during build."
- **A session's done-check has a red item and the next session starts anyway** → stop. Per the playbook's own warning, this is the exact failure `session-runner` exists to catch — a red item at Session 3 is cheap, the same gap at Session 8 is 3x the cost.
- **A guardrail metric breaches its threshold post-launch and nobody's assigned to respond** → this is a kill-switch situation, not a "keep an eye on it" situation. Someone owns the call within the window stated in the PRD's Risk Management section, or the feature auto-pauses.
- **LEARN mode is skipped and the team starts BRAINSTORM on the next bet** → stop. The lesson from this cycle has to be written before it's spent on the next one — otherwise the same mistake ships twice.

---

## Validation Protocol

How a claim earns its confidence tag. Used in `discovery-brief.md`, `prd/prd.md`, `erd/erd-template.md`, and `postmortem-template.md`.

- 🟢 **Primary** — You ran the interview, pulled the query yourself, watched the session recording, or ran the test. Not "someone told me this is true."
- 🟡 **Secondary** — Third-party data: an analyst report, a dashboard someone else built, a support-ticket tag, a community signal you didn't personally verify.
- 🔵 **Hypothesis** — A stated belief, honestly flagged as untested. Not a weakness to hide — a hypothesis with a test plan is more useful than a fact with no source.
- 🔴 **Disproven** — Evidence has since contradicted this. Keep it visible, struck through, with the reason. Deleting a disproven claim erases the lesson that it was ever believed.

**Rule:** no 🔵 hypothesis may sit on the critical path into DELIVER unqualified. If a hypothesis is load-bearing (the riskiest assumption from DISCOVER, or a Success Criteria primary metric), it needs either a test result or an explicit, DRI-signed-off risk acceptance before DEFINE can exit.

---

## Gate Definitions

`prd-gate` and the DEFINE exit condition both refuse to pass until these are real, not templated.

- **ICP (Ideal Customer Profile):** Complete when it names a *structural condition* — something true about the user's situation, independent of demographics, that creates the need. "25-34, urban" is an audience. "Manages 30+ concurrent deals across 4 channels with no shared record" is a structural condition. Incomplete if it can be satisfied by "basically everyone."
- **North Star:** One metric. Not a dashboard of five. It has a stated measurement method (which query, which tool, what the denominator is) and a stated cadence (daily/weekly). If a team can't say in one sentence what the North Star is and how it's measured, DEFINE hasn't actually locked scope yet.
- **Aha Moment:** The specific first-session action that delivers the product's core value — named as an event a product analytics tool could track, not a feeling ("user understands the value"). If Session 2's landing page and Session 5's onboarding don't visibly aim at producing this exact event, DELIVER has drifted from what DEFINE decided.
- **Build classification:** two axes, decided in DEFINE, stamped in the ERD header. **greenfield / extends-existing** — a new app (scaffold, schema-from-fixtures) vs a feature inside an existing repo (mirror a pattern source, spec deltas). **customer-facing / internal** — a product real users see (higher polish + design-system rigor) vs an internal tool (lighter, own conventions). Routes the whole build. Unstated → ask; don't assume.
- **ERD gate:** `erd-gate` refuses to pass until the **⭐ ONE structural decision is resolved (not 🔵)**, no 🔵 sits load-bearing on the critical path, every chunk has explicit boundary contracts, out-of-scope is stated, and auth/authz is declared per endpoint. This is the engineering half of the DEFINE→DELIVER gate — the PRD gate proves *what* is worth building; the ERD gate proves *how* is safe to start.
