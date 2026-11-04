---
title: "Writing for Let's Recommon IT"
date:                  # YYYY-MM-DD, set at publish
updated:
threads: [institutions]   # first thread is the row in the table
difficulty: beginner
status: draft
patterns:
  - wiki/patterns/every-page-links-out.md
patterns_applied:
  - wiki/patterns/every-thread-at-every-level.md
  - wiki/patterns/any-cell-any-time.md
  - wiki/patterns/patterns-are-tested-in-practice.md
---

## What you'll build

One contribution to one cell of [the table](../index.md): a pattern, a guide, a governance piece, or a theory essay. You don't need to fill a whole row ([Any Cell, Any Time](../wiki/patterns/any-cell-any-time.md)). By the end you'll have it on a branch with an open pull request, ready for review under the [operational rules](#operational-rules).

The table has threads as rows and three columns, one for each level of rules ([This repository is a commons](../theory/this-repository-is-a-commons.md)):

| Column | Level | Patterns it introduces |
|---|---|---|
| Guides | Operational | How to do the work |
| Governance | Collective-choice and constitutional | How rules are made and changed, and who makes them |
| Theory | Metaconstitutional | What the resource is, who it's for, what counts as good |

## Prerequisites

- A GitHub account, `git`, a text editor, and some Markdown
- Contributor access to the repository (see [How this project is run](../governance/how-this-project-is-run.md))
- Read [This repository is a commons](../theory/this-repository-is-a-commons.md) and one existing piece in the column you're writing for

## Before you start

### 1. Get the repository and make a branch

```bash
git clone https://github.com/recommoning-tech/lets-recommon-it.git
cd lets-recommon-it
git switch -c guide/backups   # never work directly on main
```

Branch names start with what you're contributing: `pattern/`, `guide/`, `governance/`, `theory/`, `content/` (bibliography entries and fixes), or `structure/` (templates and site structure).

### 2. Find your cell

Open [the table](../index.md). Pick a thread (row) and a column. A cell can hold more than one piece, so a filled cell is still open. To add a new thread, open an issue proposing it; threads are added under the project's [collective-choice rules](../governance/how-this-project-is-run.md).

### 3. Check the existing patterns

The pattern table in [`index.md`](../index.md) lists every pattern with its thread and level. Apply existing patterns by name before inventing new ones.

## Contribute a pattern

A pattern can be contributed on its own, before any piece explains it.

1. Copy the template: `cp templates/wiki-pattern.md wiki/patterns/<slug>.md`
2. Set `number` to the highest existing number + 1.
3. Set `thread` (one) and `level`: `operational`, `collective-choice`, `constitutional`, or `metaconstitutional`. The level decides which column introduces it.
4. Write Context, Problem, Discussion, and **Therefore**. The Therefore line is an instruction a group can follow.
5. Set `introduced_in` to the piece that explains it. If there isn't one yet, leave it empty and write "planned for a [thread] [column] piece" under Connections.
6. Fill in `larger_patterns` and `smaller_patterns`, and update the *other* pattern's page so the link goes both ways.
7. Add the pattern to the pattern table in `index.md`.

## Contribute a guide (operational)

`cp templates/guide.md guides/<slug>.md`

A guide builds something concrete. Each step gives a command or config, says what it does, and says how to check it worked. Fill in **Maintenance** and **Community considerations**: who does the upkeep, and who else needs access. Test every command on a fresh system before the guide is marked `published`.

## Contribute a governance piece (collective-choice and constitutional)

`cp templates/governance.md governance/<slug>.md`

A governance piece describes an action situation (participants, positions, actions, information, control, outcomes, costs and benefits), then the rules for it at each level. Write the key rules in ADICO form: who (A), must / may / must not (D), what (I), when (C), or else (O). End with something a group can copy, such as a charter or checklist. [Who holds root?](../governance/who-holds-root.md) is a worked example.

## Contribute a theory essay (metaconstitutional)

`cp templates/theory.md theory/<slug>.md`

A theory essay argues what the thread is about: what is being shared, who it's for, and what a good outcome looks like. Its patterns are the ones a group would hold to before writing any rules.

## For every piece

### Patterns
- **Introduced here:** list them in `patterns:`, set each pattern page's `introduced_in` to this piece, and give each one a subsection under **Patterns introduced**: a paragraph on how the piece leads to it, its Therefore line, and a link. Don't copy the whole pattern; the wiki page is the single source.
- **Applied here:** list them in `patterns_applied:`, say how under **Patterns applied**, and add this piece to the pattern page's `applied_in` and Connections.

If a pattern doesn't fit what you found, say so and propose a change to it ([Patterns Are Tested in Practice](../wiki/patterns/patterns-are-tested-in-practice.md)).

### Sources
- Cite bibliography entries with relative links: `[Ostrom](../bibliography/ostrom-1990-governing-the-commons.md)`, and list them in `sources:`.
- For a new source, copy `templates/bibliography-entry.md` to `bibliography/author-year-short-title.md`, check the citation against a publisher or library record, and set `status: draft` until the annotation is reviewed.

### Links
Apply [Every Page Links Out](../wiki/patterns/every-page-links-out.md):
1. End the piece with an **In this thread** footer listing every piece in its row.
2. Add the piece to its cell in `index.md`.
3. Add it to the footer of the other pieces in the same row. To find them:

```bash
grep -rln "Thread:\*\* institutions" --include=*.md .
```

## Operational rules

These are the day-to-day rules for contributing. They're made and changed under the collective-choice rules in [How this project is run](../governance/how-this-project-is-run.md).

- **Review:** members (A) must (D) get approval from at least one other member (I) before merging a pull request to `main` (C), or else the merge is reverted (O).
  - *Until there are two members:* the founding member merges their own PRs, and each such merge is listed for review at the first members' meeting.
- **Merging:** pull requests are merged with a merge commit, not squashed.
- **Drafts:** anything with `status: draft` may be merged to `main`. Changing it to `published` requires review by a member other than the author.
- **AI assistance:** see the proposed AI rule in [How this project is run](../governance/how-this-project-is-run.md).

## Commit and open a pull request

```bash
git add -A
git commit -m "Add guide: backups for a shared server"
git push -u origin guide/backups
```

Open a pull request into `main`. Say which cell it fills, what changed and why, and note any AI-assisted drafting.

## Verify it works

Before asking for review:

- [ ] The piece is in its cell in `index.md`, and every piece in its row has the same **In this thread** footer
- [ ] Every pattern has one `thread` and one `level`, and is in the pattern table
- [ ] Every pattern introduced here has `introduced_in` set to this piece
- [ ] Every pattern applied here lists this piece in `applied_in`
- [ ] Larger/smaller pattern links go both ways
- [ ] Every cited source exists in `bibliography/` and is listed in `sources:`
- [ ] Relative links open the right file on GitHub

## Maintenance

- **Renaming or moving a file:** search for its old name with `grep` and update every reference, including front matter and `index.md`.
- **Revising a pattern:** update the Therefore line on the pattern page *and* in the piece that introduces it. Note the reason in the commit message.
- **Status:** move `status: draft` to `published` only after review.

## Community considerations

- **Licensing:** contributions are published under CC BY-SA 4.0 (writing) and MIT (code). By opening a pull request you agree to license your contribution that way.
- **Credit:** contributors are credited by name or handle, as they prefer.
- **Voice:** drafts can be rough. Review is for clarity and accuracy, not for making everyone sound the same.

## Patterns introduced

### [Every Page Links Out](../wiki/patterns/every-page-links-out.md)
Pieces contributed one cell at a time tend to become islands. A guide cut off from its reasons becomes a recipe; a theory essay cut off from practice becomes a slogan. The Links step above is the operational rule that prevents it.

> **Therefore:** every page links to the other pieces in its thread, to the table, to the patterns it introduces or applies, and to the sources it draws on. A page with no links out isn't finished.

## Patterns applied
- [Every Thread at Every Level](../wiki/patterns/every-thread-at-every-level.md): the three "Contribute a..." sections, one per column, and the `level` field on every pattern.
- [Any Cell, Any Time](../wiki/patterns/any-cell-any-time.md): each kind of contribution, including a single pattern, can be made on its own.
- [Patterns Are Tested in Practice](../wiki/patterns/patterns-are-tested-in-practice.md): the Patterns step. Applied patterns are named, and revised when they don't fit.

## Further reading
- [`README.md`](../README.md) for repository structure
- [`templates/`](../templates/) for all templates
- [Alexander, *A Pattern Language*](../bibliography/alexander-1977-pattern-language.md) for the pattern format
- [Crawford & Ostrom, "A Grammar of Institutions"](../bibliography/crawford-ostrom-1995-grammar-of-institutions.md) for ADICO

## In this thread
- **Thread:** institutions · [the table](../index.md)
- **Guides:** [Writing for Let's Recommon IT](../guides/contributing.md)
- **Governance:** [How this project is run](../governance/how-this-project-is-run.md)
- **Theory:** [This repository is a commons](../theory/this-repository-is-a-commons.md)
