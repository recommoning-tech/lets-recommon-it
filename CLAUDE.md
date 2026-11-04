# Let's Recommon IT

Source for a blog, guides, and pattern wiki about community-scale IT, run as a commons. Markdown only; no site generator yet. Content is CC BY-SA 4.0, code is MIT.

## The table

The site is a table (`index.md`): threads are rows, levels of rules from Ostrom's IAD framework are columns.

| Column | Folder | IAD level |
|---|---|---|
| Guides | `guides/` | operational |
| Governance | `governance/` | collective-choice, constitutional |
| Theory | `theory/` | metaconstitutional |

- Threads, in coverage order: `institutions`, `liberatory-tech`, `design-patterns`, then `commons`, `privacy`, `ai`, `big-tech-critique`, `open-source`, `labor-care`. Defined in `planning/concept-map.md`.
- Any cell can be filled at any time, and a cell can hold several pieces. There are no releases.
- A piece's row is the first entry in its `threads:` list.
- Rationale: `theory/this-repository-is-a-commons.md` (table) and `theory/a-pattern-language-for-community-tech.md` (patterns).

## Patterns

Patterns (`wiki/patterns/`) are the main unit; every piece is an essay about the patterns at its level.

- Each pattern has one `thread` and one `level` (`operational` | `collective-choice` | `constitutional` | `metaconstitutional`).
- It is introduced (`introduced_in`) in a piece whose column matches its level, and applied (`applied_in`) in at least one other piece.
- Format, after Takashi Iba's concise deep style: name, `introduction` (one sentence, also shown in italics under the front matter), optional `image`, Context, Problem, Forces, Solution, Actions, Consequences (Positive / Negative), Connections.
  - Solution: one bolded sentence starting "Therefore," in the imperative, saying what and how. No pattern name, no tool names.
  - Forces: why the problem is hard; citations go here.
  - Actions: concrete examples, tools, commands.
- Write in this order: solution, actions, problem, context, forces, consequences, name, introduction (`guides/writing-a-pattern.md`).
- Numbers are permanent. New pattern = highest + 1. Retired patterns keep their page and number.
- `larger_patterns` / `smaller_patterns` must be reciprocal.

## Pieces

- Start from `templates/` (`guide.md`, `governance.md`, `theory.md`, `wiki-pattern.md`, `post.md`, `bibliography-entry.md`).
- Front matter: `threads`, `sources` (bibliography file names), `patterns` (introduced), `patterns_applied`, `status`.
- **Patterns introduced** section: per pattern, one paragraph on how the piece leads to it, then `> **Therefore:**` quoting the pattern's Solution exactly, then the link. Don't copy the whole pattern.
- **Patterns applied** section: one line per pattern saying where it's applied.
- Governance pieces analyze an action situation (IAD table), set rules by level, write key rules in ADICO form (A, D, I, C, O marked in parentheses), and end with something a group can copy.
- Guides: numbered steps with verification, plus Maintenance and Community considerations.
- `posts/` holds standalone essays; `posts/drafts/` holds work in progress.

## Linking

- Relative links only. Pattern pages link with `../../`; pieces with `../`.
- Every piece ends with an identical `## In this thread` footer listing all pieces in its row (Guides, Governance, Theory) and a link to `index.md`.
- Adding a piece or pattern means updating `index.md`, the footers in its row, and the pattern pages' `introduced_in` / `applied_in` and Connections.
- When a Solution changes, update every quote of it. Find references with `grep -rn "<slug>" --include=*.md .`
- No link checker is committed; check links by hand or with a throwaway script.

## Bibliography

- `bibliography/author-year-short-title.md`, one source per file, from `templates/bibliography-entry.md`.
- Check every citation against a publisher or library record. Flag unverified details in a comment rather than guessing.
- Don't copy text from sources with incompatible licenses (e.g. Iba's Pattern Writing Sheet is CC BY-NC-SA); cite and paraphrase.

## Writing style

- Plain, concise, readable. Short paragraphs, no em dashes, minimal bold, no filler.
- `status: draft` on anything AI-drafted until a member rewrites or reviews it.
- Notes for the author go in `<!-- Author: ... -->` comments; values for members to decide go in `[brackets]`.
- Don't invent facts, examples, or experiences for the author; leave an author note instead.

## Workflow

- Branch prefixes: `guide/`, `governance/`, `theory/`, `pattern/`, `content/` (bibliography, fixes, multi-file content), `structure/` (templates, layout, repo files).
- Pull requests are merged with a merge commit. Note AI-assisted drafting in the PR description.
- Operational rules (review, merging, drafts) are in `guides/contributing.md#operational-rules`; collective-choice and constitutional rules are in `governance/how-this-project-is-run.md`.
- Open work is tracked in `planning/task-list.md`; ideas by cell in `planning/post-ideas.md`.
