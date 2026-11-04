---
title: "This repository is a commons"
date:                  # YYYY-MM-DD, set at publish
threads: [institutions, commons]   # first thread is the row in the table
sources:
  - hess-ostrom-2007-understanding-knowledge-as-a-commons.md
  - ostrom-2005-understanding-institutional-diversity.md
  - crawford-ostrom-1995-grammar-of-institutions.md
  - alexander-1977-pattern-language.md
  - alexander-1979-timeless-way-of-building.md
patterns:
  - wiki/patterns/every-thread-at-every-level.md
patterns_applied: []
status: draft          # rough draft for the author to rewrite in their own voice
---

## What this site is

Let's Recommon IT is a repository of writing: guides, governance pieces, theory essays, and the patterns they explain. Before it says anything about recommoning technology, the site has to answer a smaller question about itself. What is being shared here, who looks after it, and by what rules? This essay answers with Elinor Ostrom's institutional analysis, and the answer sets the structure for the rest of the site.

## What is being shared

Ostrom's early work was on common-pool resources such as fisheries, forests, and irrigation systems. They are rival: a fish one person catches is a fish nobody else can catch. Knowledge isn't like that. Reading a pattern doesn't use it up, and a thousand readers can copy the same guide. So a repository of writing isn't a common-pool resource in the strict sense.

[Charlotte Hess and Elinor Ostrom](../bibliography/hess-ostrom-2007-understanding-knowledge-as-a-commons.md) split a knowledge commons into three parts:

- Facilities store knowledge and give access to it. Here: the Git repository, the GitHub organization, and later a domain and a host.
- Artifacts are the expressions of knowledge. Here: each guide, governance piece, essay, pattern page, and bibliography entry.
- Ideas are what the artifacts carry. Here: mainly the patterns.

The ideas are non-rival. The rest can be used up or worn down. Facilities cost money and need keyholders. Artifacts degrade: links break, commands go out of date, citations go unchecked, drafts sit unfinished. The scarcest thing is people's time, especially time to review and maintain other people's work. That's where the usual commons problems show up: free riding on maintenance, one person holding every key, and contributions arriving faster than anyone can review them. A repository of free writing still needs rules.

## Describing the work: the action situation

Ostrom's [Institutional Analysis and Development (IAD) framework](../bibliography/ostrom-2005-understanding-institutional-diversity.md) studies institutions through the *action situation*: participants in positions choose actions, with some information and some control over the result, and get outcomes that carry costs and benefits.

Merging a pull request is an action situation. The participants are a contributor and a reviewer. Their positions differ: a contributor can propose a change, and only a member can approve it. The actions are review and merge. The information is the diff, the discussion, and any checks. Control sits with whoever can push to `main`. The outcome is a published page, and much of the cost is the reviewer's time.

The vocabulary is useful because it makes roles and rules visible. Every part of the situation is shaped by a rule, written or not: who can become a member (boundary), what each position may do (position and choice), who must be told what (information), how decisions are made (aggregation). Where no rule is written down, the decision gets made by default, usually by whoever holds the keys. Describing the site as a set of action situations shows which rules exist and which are missing. The [governance piece](../governance/how-this-project-is-run.md) does this for the project as a whole.

## Rules about rules

Action situations are nested. In *Understanding Institutional Diversity*, Ostrom separates four levels:

1. Operational: people do the work under the rules in force. Writing a guide, reviewing a pull request.
2. Collective-choice: people make and change the operational rules. Deciding how many reviewers a merge needs.
3. Constitutional: people decide who takes part in collective choice, and how. Who becomes a member, how the charter changes, what happens if the project ends.
4. Metaconstitutional: the ground the constitution stands on. What the resource is, who it's for, and what counts as a good outcome.

The outcomes of each level are the rules for the level below. Deeper rules cost more to change and change less often, which gives the faster levels something stable to work within.

## The site in levels

The same levels organize the writing on this site:

| Level | Kind of writing | Question it answers |
|---|---|---|
| Operational | Guides | How do we do this? |
| Collective-choice and constitutional | Governance | How do we decide, and who decides? |
| Metaconstitutional | Theory | What is this for, and why does it matter? |

Governance covers two levels because in a household or small group, changing the rules and deciding who changes them usually happen in the same meeting. Each pattern still records its exact level.

That makes the site a table, with threads (institutions, commons, privacy, AI, and so on) as rows and guides, governance, and theory as columns. Anyone can fill any cell at any time, and a cell can hold more than one piece. New threads are added through the project's [collective-choice rules](../governance/how-this-project-is-run.md). Empty cells are open invitations. [The table](../index.md) is the site's index.

## Patterns carry the weight

Every piece on the site is an essay about patterns. A pattern, as [Christopher Alexander](../bibliography/alexander-1977-pattern-language.md) used the term, names a recurring problem in a context and a solution to it, and links to the larger patterns it helps complete and the smaller patterns that complete it. Alexander wrote patterns so that the people who would live in a place could design it themselves, and he expected places to grow piecemeal, through use and repair ([*The Timeless Way of Building*](../bibliography/alexander-1979-timeless-way-of-building.md)).

Here, each pattern has a thread and a level, which places it in one cell of the table. A guide explains operational patterns, a governance piece explains collective-choice and constitutional ones, and a theory essay explains metaconstitutional ones. The prose gives the reasons and examples. The patterns are what a reader takes away and reuses. Patterns themselves, including patterns about patterns, have their own thread: `design-patterns`.

[Sue Crawford and Elinor Ostrom's grammar of institutions](../bibliography/crawford-ostrom-1995-grammar-of-institutions.md) connects the two traditions. In their terms, a statement with who, what, and when is a shared strategy; add "must" or "must not" and it's a norm; add a consequence and it's a rule. Most pattern Solutions (the **Therefore** sentence) are strategies or norms: advice a group can adopt, which becomes a rule when the group attaches a consequence.

## Patterns introduced

### [Every Thread at Every Level](../wiki/patterns/every-thread-at-every-level.md)
Writing about technology tends to stay at one level. Tutorials stay operational, critique stays at the level of values, and governance writing floats free of anything concrete. Readers have to connect the levels themselves, and the rules that link them go unwritten.

> **Therefore:** write about each thread at every level, by giving every pattern a thread and a level and introducing it in a piece at that level.

### How the patterns fit together
Every Thread at Every Level is the largest pattern on the site: it sets the shape of the table. [Patterns Are Tested in Practice](../wiki/patterns/patterns-are-tested-in-practice.md), from the `design-patterns` thread, completes it by connecting the cells. Two more smaller patterns are introduced at the levels where they belong: [Any Cell, Any Time](../wiki/patterns/any-cell-any-time.md) (collective-choice) in the [governance piece](../governance/how-this-project-is-run.md), and [Every Page Links Out](../wiki/patterns/every-page-links-out.md) (operational) in the [contributing guide](../guides/contributing.md).

## From theory to practice
- The [guide](../guides/contributing.md) explains how to contribute each kind of piece, and each pattern, on its own.
- The [governance piece](../governance/how-this-project-is-run.md) analyzes the project as an action situation and sets its collective-choice and constitutional rules.

<!-- Author: rewrite in your own voice. A concrete moment from setting up this repo (e.g. realizing one person held every account) would ground the commons section. -->

## In this thread
- **Thread:** institutions · [the table](../index.md)
- **Guides:** [Writing for Let's Recommon IT](../guides/contributing.md)
- **Governance:** [How this project is run](../governance/how-this-project-is-run.md)
- **Theory:** [This repository is a commons](../theory/this-repository-is-a-commons.md)
