---
title: "Who decides what becomes a pattern?"
date:                  # YYYY-MM-DD, set at publish
threads: [design-patterns, institutions]   # first thread is the row in the table
sources:
  - iba-2016-pattern-language-3.md
  - ostrom-2005-understanding-institutional-diversity.md
  - crawford-ostrom-1995-grammar-of-institutions.md
  - ostrom-walker-gardner-1992-covenants-with-and-without-a-sword.md
patterns:
  - wiki/patterns/workshop-the-pattern.md
patterns_applied:
  - wiki/patterns/a-language-users-can-speak.md
  - wiki/patterns/patterns-are-tested-in-practice.md
  - wiki/patterns/talk-before-you-enforce.md
status: draft          # proposal; adopted under the collective-choice rules in How this project is run
---

<!-- Bracketed [placeholders] are for members to fill in together. -->

## The situation

The pattern table is the shared vocabulary of the site. Every guide, governance piece, and essay explains or applies patterns, and members are meant to use pattern names when they talk. So a pattern that gets in carries weight: its name and its Solution show up across the site and in members' heads.

Right now one rule covers patterns: one member approves the pull request. That checks format and facts. It doesn't check whether anyone besides the author understands the pattern, whether it's been tested, or how a pattern gets changed or retired. This piece proposes those rules. Under [How this project is run](how-this-project-is-run.md), they're adopted by lazy consensus.

## Analysis

Adding a pattern as an action situation ([*Understanding Institutional Diversity*](../bibliography/ostrom-2005-understanding-institutional-diversity.md)):

| IAD part | For a pattern |
|---|---|
| **Participants** | The author, readers who take part in a workshop, members, and anyone who later applies the pattern |
| **Positions** | **Author:** proposes and revises. **Reader:** gives feedback; doesn't need to be a member. **Shepherd:** an experienced writer who gives feedback before the workshop (optional). **Member:** approves status changes. |
| **Actions** | Propose, workshop, revise, merge, apply in another piece, change status, retire |
| **Information** | The pattern page, the pull request discussion, `applied_in` (where it's been used), and the commit history (why it changed) |
| **Control** | Merging to `main` and changing the `status` field |
| **Outcomes** | A pattern table whose names and solutions people understand and trust |
| **Costs & benefits** | Costs: readers' and authors' time, slower merges. Benefits: patterns that read clearly, shared vocabulary, skills in writing patterns |

## Rules to decide

### Operational rules
How to write a pattern is in [Writing a pattern](../guides/writing-a-pattern.md). How to submit one is in the [contributing guide](../guides/contributing.md#contribute-a-pattern).

### Collective-choice rules: how a pattern moves from draft to published

A pattern's `status` moves through four stages:

| Status | Meaning |
|---|---|
| `draft` | Merged, open to change |
| `workshopped` | Discussed with at least two readers besides the author |
| `tested` | Workshopped, and applied by name in at least one piece besides the one that introduces it |
| `published` | Tested, and approved by a member who isn't the author |

Rules for each step, in ADICO form ([Crawford & Ostrom](../bibliography/crawford-ostrom-1995-grammar-of-institutions.md)):

- **Workshop:** members (A) must not (D) change a pattern from `draft` to `workshopped` (I) until at least two readers besides the author have discussed it in a meeting or in the pull request (C), or else the status change is reverted (O).
- **Testing:** members (A) must not (D) mark a pattern `tested` (I) until the pattern's `applied_in` lists a piece besides the one that introduces it (C), or else the status change is reverted (O).
- **Revising a published pattern:** members (A) must (D) propose changes to a published pattern's Context, Problem, or Solution in an issue (I) and merge them only after lazy consensus (C), or else the change is reverted (O). Fixes to wording, links, and sources follow the ordinary review rule.
- **Retiring:** a pattern that no longer fits is marked `status: retired` with a note saying why. Its page and number stay, so old links keep working.

### Constitutional rules: who takes part
- **Readers:** anyone can take part in a workshop, member or not. The pattern language is meant for people outside the field ([A Language Users Can Speak](../wiki/patterns/a-language-users-can-speak.md)), so outside readers are a good test.
- **Authorship:** pattern pages are CC BY-SA like everything else. Authors are credited in the pull request and commit history; a pattern isn't owned by its author once it's merged.
- **The format:** changes to the pattern template are collective-choice decisions under [How this project is run](how-this-project-is-run.md).

## Risks and trade-offs

- **Gatekeeping:** a workshop can turn into a test of whether an author writes like the people already in the group. Readers say what works first, and the rules check clarity and testing, not style.
- **Too few people:** a workshop needs two readers besides the author. Until the project has them, ask outside readers, or leave patterns in `draft`. A draft pattern can still be used and applied.
- **Slow growth:** each stage takes time. Only the step to `published` needs every stage; a `draft` pattern can be applied right away.
- **Jargon creep:** as the language grows, new patterns tend to assume the old ones. Workshops with outside readers catch this.

## Patterns introduced

### [Workshop the Pattern](../wiki/patterns/workshop-the-pattern.md)
The patterns community reviews drafts through shepherding and writers' workshops, which Iba counts among the meta-patterns for making pattern languages ([Iba, "Pattern Language 3.0"](../bibliography/iba-2016-pattern-language-3.md)). The workshop rule above makes that the step between `draft` and `workshopped`.

> **Therefore:** discuss each new pattern with at least two readers besides its author before it leaves draft, with the author listening first and the readers saying what works before what could be better.

## Patterns applied
- [Talk Before You Enforce](../wiki/patterns/talk-before-you-enforce.md): disagreements about a pattern go to a workshop or a lazy-consensus issue. The only automatic consequence is reverting a status change.
- [Patterns Are Tested in Practice](../wiki/patterns/patterns-are-tested-in-practice.md): the `tested` stage.
- [A Language Users Can Speak](../wiki/patterns/a-language-users-can-speak.md): anyone can be a reader, and outside readers are encouraged.

## Template: a pattern workshop

```markdown
# Workshop: [Pattern name]
Date: [date]   Author: [name]   Readers: [names, at least two]

1. Author reads the pattern aloud, or readers read it. (5 min)
2. Author listens without replying until step 6.
3. A reader summarizes the pattern in their own words. (5 min)
4. What works: readers say what is clear and useful. (10 min)
5. What could be better: readers suggest changes. (10 min)
6. Author asks questions to clarify. No defending. (5 min)
7. Record agreed changes in the pull request. If the readers agree, a member sets status: workshopped.
```

## In this thread
- **Thread:** design-patterns · [the table](../index.md)
- **Guides:** [Writing a pattern](../guides/writing-a-pattern.md)
- **Governance:** [Who decides what becomes a pattern?](../governance/who-decides-what-becomes-a-pattern.md)
- **Theory:** [A pattern language for community tech](../theory/a-pattern-language-for-community-tech.md)
