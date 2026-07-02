# Nomad Scribbles — Editorial Commands

Use with `nomad-editorial-system.md` and `nomad-editorial-linter.md`. **Cursor prompts only** — never paste into page files, CMS fields, or React components.

---

## Mode 1 — Write

Write freely. Do not apply the editorial system during drafting.

---

## Mode 2 — Editorial scan (no rewrite)

```
Run editorial scan only (no rewrite).

Follow nomad-editorial-linter.md (v2): strongest passages first, then flagged issues with severity (HIGH / MEDIUM / LOW).
Scan [PAGE NAME / file path].
Do not rewrite. Do not output the rule system.
```

Or shorthand: **"Linter scan on Athens"** / **"Editorial scan on BudapestNew.js"**

---

## Mode 3 — Targeted rewrite

```
Fix flagged sentences only. Preserve structure.

Run nomad-editorial-linter.md on [PAGE NAME / file path] first.
Then rewrite only the flagged sentences.
Do not change: section headings, image order, editorial block types, routes, or layout.
Do not embed rules, checklists, or system text in the page.
```

---

## Mode 4 — Pre-publish check

```
Pre-publish editorial check.

Read nomad-editorial-system.md.
Check [PAGE NAME] paragraph by paragraph against the observation test.
Return: pass / fail per section, plus a short list of fixes if needed.
No rewrite unless I ask.
```

---

## Leak check

If any page contains rule blocks, checklists, "how to use", or system instructions → strip immediately. System stays in repo docs and Cursor only.
