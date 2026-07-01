# Changelog

All notable changes to Builder OS land here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project uses [Semantic Versioning](https://semver.org/).

## [0.3.0] - 2026-07-01

### Added
- `prd/org-prd.md`: third PRD template for PMs working inside a team/pod rather than shipping solo — DRI, pod, milestone table, operational checklist, GTM section, changelog and open-questions working section. Same confidence-tag discipline as `lean-prd.md`/`full-prd.md`.
- `discovery/idea-log.md` and `discovery/discovery-brief.md`: BRAINSTORM and DISCOVER stage artifacts, fulfilling the `discovery/` roadmap item. Discovery brief covers ICP (as a structural condition, not demographics), riskiest assumption + cheapest test, evidence table, and a steelman of the case against building.
- `postmortem/postmortem-template.md`: LEARN stage artifact, fulfilling the `postmortem/` roadmap item. Forces results against the PRD's original Success Criteria, one lesson written as a rule, and an explicit Iterate/Scale/Retire call.
- `skills/prd-writer/` and `skills/prd-updater/`: Claude Code skills for writing and updating PRDs, ported in from Rohan Shah's originals. Adjusted to be template-agnostic across all three `prd/` templates.
- `skills/prd-gate/`: new Claude Code skill. Systematizes `prd-writer`'s own "Reviewing Existing PRDs" checklist into a pass/fail gate — unresolved placeholders, confidence-tag coverage, non-goals present, vague-metric antipatterns, guardrail metric present, open-question hygiene.
- `skills/session-runner/`: new Claude Code skill. Actively walks `sessions/SESSION_PLAYBOOK.md`, refuses to start a session if the previous done-check isn't fully green, treats Checkpoint A/B as hard stops.
- `pro/MANIFESTO.md` and `pro/README.md`: "Builder OS Pro" — the 5-mode operating layer (BRAINSTORM → DISCOVER → DEFINE → DELIVER → LEARN) wiring every template and skill above into one pipeline, with real tripwires, a real validation protocol, and real gate definitions (ICP, North Star, Aha Moment). Optional layer — the base quickstart is unchanged.

### Fixed
- README quickstart said to search for `{{` to find PRD placeholders — the PRD templates actually use `[bracket]` placeholders; only the session playbook uses `{{double-brace}}`. Instructions now name both.

---

## [0.2.0] - 2026-05-25

### Added
- `skills/brand-guide-visualizer/`: Claude Code skill that turns a `brand-guide.md` into a single-file interactive HTML visualizer. No build step, no framework — opens directly in the browser. The visualizer's layout and visual rhythm are designed from the brand's personality, not a template.

---

## [0.1.0] - 2026-05-17

First public release.

### Added
- `prd/lean-prd.md` and `prd/full-prd.md`: two PRD templates (lean for cohort submissions, full for serious projects).
- `brand/quick-brand-guide.md` and `brand/full-brand-guide.md`: two brand-guide templates.
- `sessions/`: 14-session implementation playbook covering scaffold, schema, auth, core feature, dashboard, billing, jobs, PWA, edge cases, delight, analytics, launch.
- `examples/founders-crm-lean-prd.md` and `examples/founders-crm-full-prd.md`: the Founders CRM PRD rewritten into both PRD templates as worked reference examples.
- `examples/coach-implementation-guide.md`, `examples/coach-session-playbook.md`, `examples/coach-final-push.md`: the Coach project's filled-out implementation docs, showing the session playbook end to end.
- `examples/founders-crm-prd.docx`, `examples/founders-crm-screenshot.png`, `examples/cohort-case-study.docx`: original source material.
- Root `README.md` with decision tree, quickstart, and philosophy.
- Folder READMEs in `prd/`, `brand/`, `examples/` explaining lean-vs-full choices.
- `LICENSE` (MIT), `CONTRIBUTING.md`, `.gitignore`.

### Renamed
- Folder name from `vibe-coding-templates` to `builder-os`.
- `my-prd-template/` to `prd/`.
- `brand-guide/` to `brand/`.
- `implementation-templates/` to `sessions/`.
- `template-full-depth-prd.md` to `full-prd.md`.
- `template-lean-submission-prd.md` to `lean-prd.md`.
- `brand-guide-template.md` to `quick-brand-guide.md`.
- `brand-guide-template_v2.md` to `full-brand-guide.md`.
