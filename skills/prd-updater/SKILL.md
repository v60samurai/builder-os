---
name: prd-updater
description: Updates an existing PRD (Product Requirements Document) with new information, integrating changes smoothly across all relevant sections rather than appending raw notes. Use whenever the user wants to update, amend, revise, or add new information to a PRD they already have — phrases like "update the PRD", "add this to the PRD", "reflect this in the PRD", "PRD needs to say X", "engineer raised a doubt, update the PRD", or any request to modify a spec, requirements doc, or product document. Works with PRDs in Notion (preferred) and Google Drive. Always integrates new information into the right sections instead of dumping it verbatim at the end.
---

# PRD Updater

Originally written by Rohan Shah.

A skill for cleanly updating an existing PRD with new information. The goal is to integrate changes the way a careful PM would: find every place a change is relevant, rewrite those sections so the new information reads as if it had always been there, and avoid bolting on a raw "update note" at the bottom.

This skill is for **updating existing PRDs**, not writing new ones. If the user wants to write a PRD from scratch, point them to the `prd-writer` skill instead.

## Using inside BuilderOS

Works the same regardless of which template the PRD started from (the current `prd/prd.md`, or an older `archive/` shape) — Step 2 ("map the change to all relevant sections") is what matters, and it applies to any shape. For a project file source, add one more habit: after applying the edit, re-run the `prd-gate` skill. An update that resolves an open question or adds a new claim can silently break confidence-tag consistency if the tag doesn't land along with the claim.

---

## When this skill triggers

Use this skill whenever the user asks to modify an existing PRD. Common phrasings:

- "Update the PRD with this: [content]"
- "Add this to the PRD: [content]"
- "Reflect [decision] in the PRD"
- "Engineer asked X, make sure the PRD covers it"
- "[Stakeholder] said Y in the meeting, update the doc"
- "PRD should clarify [thing]"

The user may or may not provide a link. They may or may not specify where to make the change.

---

## Inputs required

Before doing anything, make sure you have three things. If any is missing, ask once for the missing pieces in a single turn.

1. **The PRD location.** A link to the PRD (Notion URL, Google Docs URL, or a path to a project file). If the user did not provide a link, try in this order:
   - Search Notion using `Notion:notion-search` with terms from the conversation (product name, project name, "PRD")
   - If Notion comes up empty, search Google Drive using `Google Drive:search_files` with the same terms
   - If still nothing, ask the user for the link
2. **The changes to be made.** What is the new information, decision, or clarification that needs to land in the PRD?
3. **Context for why.** Optional but useful — e.g., "an engineer raised a doubt", "decided in a meeting with Vishnu", "user feedback from yesterday". This helps decide framing and where it belongs.

If the user provided all three implicitly (link in message, changes in message, context in message), do not re-ask. Just go.

---

## Workflow

Follow these steps in order. Do not skip the read-first step — integration quality depends on understanding the whole document, not just the section you think needs editing.

### Step 1: Locate and read the entire PRD

Fetch the PRD in full:

- **Notion**: Use `Notion:notion-fetch` with the page ID or URL. The response contains the full markdown content.
- **Google Drive**: Use `Google Drive:read_file_content` after locating it via `Google Drive:search_files`.
- **Project file**: Use the `view` tool on the file path.

Read the entire document. Do not stop after finding the first section that seems relevant.

### Step 2: Map the change to all relevant sections

This is the most important step and the one most often skipped. A single new piece of information almost always touches multiple sections of a PRD. Walk through the doc and ask, for each section:

- Does this change directly modify a statement made here?
- Does this change introduce a new concept that needs definition somewhere (e.g., a new status, a new role, a new integration)?
- Does this change affect any existing rules, gates, integrations, data hierarchies, page inventories, or open questions?
- Does this change resolve an existing open question? If so, remove it from the open questions list.
- Does this change conflict with anything already written? If so, that's the bigger story — flag it.

Build a mental (or written) list of every section that needs an edit. The list should usually have 2-4 entries for a non-trivial change. If it has only 1, double-check that you didn't miss anything.

### Step 3: Draft the integrated edits

For each section identified in Step 2, write the new text **in the voice and style of the existing PRD**. Match:

- The heading hierarchy (don't introduce H1 if the rest of the doc uses H2 for that level)
- The bullet/prose ratio
- The terminology (use the doc's existing names for things — if it says "TGID", don't suddenly say "Tour Group")
- The level of detail (don't write three paragraphs in a doc where every section is two bullets)

Do not paste the user's raw quote into the document. Rewrite it in the doc's voice. The user's words are the source material, not the final copy.

### Step 4: Apply the edits

Apply all edits in a **single batched call** where possible:

- **Notion**: Use `Notion:notion-update-page` with `command: "update_content"` and pass all edits as an array in `content_updates`. Each entry is an `old_str` (exact match from the fetched content) and a `new_str`.
- **Google Drive**: Google Docs editing through MCP is limited. If the user's PRD is on Google Drive, fetch the content, present the proposed edits clearly to the user in chat, and let them know they'll need to apply manually OR offer to create a new doc with the merged version. Be honest about the limitation.
- **Project file**: Use `str_replace` for each edit. Note that project files are usually read-only — if so, output the merged version as a downloadable file and tell the user.

For `old_str` matching: copy the exact text from the fetched content, including punctuation and spacing. If a match fails, re-fetch and look at the actual rendered text — Notion sometimes normalises markdown in subtle ways.

### Step 5: Verify and summarise

After applying the edits, re-fetch the PRD (or the affected sections) to confirm the changes landed. Then give the user a tight summary:

- Which sections were updated
- One line on what each edit accomplishes
- Any open questions, conflicts, or follow-ups the change surfaced (e.g., "Section 4.7 mentioned 'Sprint 2' — your update implies returns can also go to Sprint 3+. I broadened the language.")

Do not paste the full edited PRD back into chat unless asked. The user can read it in the source.

---

## Quality bar

A good PRD update should pass these checks:

- **No raw quotes from the user.** The user said it casually; the PRD says it precisely. Rewrite.
- **No "Update note" sections at the bottom.** Changes are integrated where they belong, not appended.
- **No orphan terms.** If the change introduces a new concept (e.g., a new status name, a new role), it's defined somewhere and referenced everywhere it applies.
- **Open Questions hygiene.** If the change resolves a question that's listed in the doc's Open Questions / Open Decisions section, remove it from that list. If it raises a new one, add it.
- **Integration tables / data hierarchies / page inventories are updated**, not just prose sections. These are easy to miss.
- **Voice match.** Read the edits alongside the original. If they sound different, rewrite.

---

## Failure modes to avoid

- **Copy-paste failure.** Pasting the user's verbatim text into the PRD as a new bullet or section. Always rewrite.
- **One-section failure.** Editing only the most obvious section and missing the related integration table, data model, or open questions list.
- **Bloat failure.** Adding a long new section when a two-line edit to an existing section would do.
- **Conflict-ignoring failure.** Making the new edit fit even though it directly contradicts something earlier in the doc. Surface conflicts to the user; don't paper over them.
- **Wrong-doc failure.** Editing the project file copy when the user's source of truth is Notion (or vice versa). Confirm the source if unsure.

---

## Notes on Notion specifics

- Page IDs can be passed with or without dashes. URLs also work.
- `Notion:notion-fetch` returns markdown that closely matches what `notion-update-page` expects in `old_str` — but tables, callouts, and code blocks have specific syntax. When editing inside a table, the `old_str` should include the full `<tr>...</tr>` block, not just the cell.
- Batch all edits in one `update_content` call. Multiple sequential calls are slower and risk partial-update states.
- After updating, re-fetch to confirm. Notion can occasionally drop edits silently if the `old_str` match isn't exact.
