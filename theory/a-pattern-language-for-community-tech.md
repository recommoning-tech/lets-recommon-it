---
title: "A pattern language for community tech"
date:                  # YYYY-MM-DD, set at publish
threads: [design-patterns]   # first thread is the row in the table
sources:
  - alexander-1977-pattern-language.md
  - alexander-1979-timeless-way-of-building.md
  - iba-2016-pattern-language-3.md
  - iba-2021-practical-guide-pattern-writing.md
  - iba-2014-journey-to-pattern-writing.md
  - hess-ostrom-2007-understanding-knowledge-as-a-commons.md
patterns:
  - wiki/patterns/a-language-users-can-speak.md
  - wiki/patterns/patterns-are-tested-in-practice.md
patterns_applied: []
status: draft          # rough draft for the author to rewrite in their own voice
---

## Why patterns

Every piece on this site is an essay about patterns, and the patterns are what a reader is meant to take away. [This repository is a commons](this-repository-is-a-commons.md) explains how the site is organized: threads as rows, and levels of rules as columns. This essay explains the unit that fills the cells. What is a pattern, who is it for, and why build a commons of them?

## What a pattern is

Christopher Alexander put it in one line: "Each pattern is a three-part rule, which expresses a relation between a certain context, a problem, and a solution" ([*The Timeless Way of Building*](../bibliography/alexander-1979-timeless-way-of-building.md), p. 247). A pattern names a problem that keeps coming up in some situation and says what to do about it. It's general enough to reuse and concrete enough to act on.

Patterns don't stand alone. Each one helps complete larger patterns and is completed by smaller ones, and together they form a *language*. [*A Pattern Language*](../bibliography/alexander-1977-pattern-language.md) has 253 of them, from the shape of a region down to the placement of a window seat. Alexander wrote them so that the people who would live in a place could design it themselves, and he expected places to grow piecemeal, through use and repair, not from a master plan.

## Three generations

[Takashi Iba](../bibliography/iba-2016-pattern-language-3.md) sorts pattern languages into three generations by what they design.

1. **Buildings.** Alexander's patterns were a common language between professional designers and the people who would live in a place.
2. **Software.** Programmers adopted patterns in the late 1980s and 1990s. Patterns passed expertise from experienced developers to less experienced ones, in a field where designs are revised and released again.
3. **Human actions.** Iba and his students have written languages for learning, collaboration, presentation, social change, surviving earthquakes, and living with dementia. Here designing an action and doing it are hard to separate, and patterns become a medium for dialogue among people with any amount of experience. Readers don't need to know pattern theory to use them.

Community tech crosses all three. Some of its patterns are about the shape of a system, like [Small Enough to Understand](../wiki/patterns/small-enough-to-understand.md). Most are about what people do: who holds the keys ([Two Keyholders](../wiki/patterns/two-keyholders.md)), how a group handles a problem ([Talk Before You Enforce](../wiki/patterns/talk-before-you-enforce.md)). Governance is a pattern language of human action, which puts most of this site in Iba's third generation.

## Why this is the metaconstitutional choice

In Ostrom's terms, the metaconstitutional level decides what a commons holds and who it's for. This site's answer is patterns, written for the people who use and run community technology, not only for the people who already know how.

That choice follows from the commons argument. [Hess and Ostrom](../bibliography/hess-ostrom-2007-understanding-knowledge-as-a-commons.md) separate the ideas in a knowledge commons from the artifacts that carry them. A pattern is an idea in a form people can carry: a named problem and solution that a member can bring to a meeting, apply to a different server, or argue with. A guide tells you how to build one thing. A pattern tells you what to look for in the next thing you build.

Patterns also fit how this site grows. Anyone can add one, a language can start small, and a pattern that turns out wrong can be revised without rewriting everything around it.

## Patterns about patterns

Iba calls the patterns for making pattern languages "meta-patterns": how to mine experience for patterns, how to write and illustrate them, and how to review them through shepherding and writers' workshops. The `design-patterns` thread collects this site's own, one cell at a time:

- At the operational level, the [guide to writing a pattern](../guides/writing-a-pattern.md) introduces [Solution First](../wiki/patterns/solution-first.md).
- At the collective-choice level, [Who decides what becomes a pattern?](../governance/who-decides-what-becomes-a-pattern.md) introduces [Workshop the Pattern](../wiki/patterns/workshop-the-pattern.md).
- At the metaconstitutional level, this essay introduces the two patterns below.

## The format

The site's patterns follow the form Iba uses in his "concise deep style" ([Iba 2021](../bibliography/iba-2021-practical-guide-pattern-writing.md)): name, introduction, illustration, context, problem, forces, solution, actions, and consequences. It keeps Alexander's three-part rule and adds four things that matter for community tech:

- **Forces** say why the problem is hard: the tendencies that won't go away, such as volunteers' limited time or the speed of technical enforcement. Sources are cited here.
- **Actions** give concrete examples, so the solution can stay general and the tool names and commands have somewhere to go.
- **Consequences** include side effects as well as benefits. A governance pattern that hides its costs isn't honest advice.
- An **introduction**, one sentence under the name, gives a reader a reason to keep going.

Iba treats the illustration as essential. This site is text-only for now, so the `image` field is optional until there's a way to draw them.

## Patterns introduced

### [A Language Users Can Speak](../wiki/patterns/a-language-users-can-speak.md)
Alexander wrote for residents, and Iba writes for anyone with experience to share. Technical writing pulls the other way, toward the vocabulary of people who already run the system. If the patterns only make sense to admins, they keep power with admins.

> **Therefore:** write each pattern so that a member with no technical background can read it, say its name, and use it in conversation, by keeping the name plain and the technical detail in the Actions.

### [Patterns Are Tested in Practice](../wiki/patterns/patterns-are-tested-in-practice.md)
Alexander's patterns came from observing places that worked, and Iba's are mined from people's experience. This site's patterns often start in reading, which makes them claims until someone uses them.

> **Therefore:** apply every pattern by name in at least one piece besides the one that introduces it, preferably at another level or in another thread, and revise the pattern when it doesn't fit.

### How the patterns fit together
A Language Users Can Speak is the larger pattern: it says who the language is for. Solution First and Workshop the Pattern complete it, one in how a pattern is written, the other in how a group accepts it. Patterns Are Tested in Practice completes [Every Thread at Every Level](../wiki/patterns/every-thread-at-every-level.md) from the institutions thread, and Workshop the Pattern completes it in turn.

## From theory to practice
- The [guide](../guides/writing-a-pattern.md) walks through writing one pattern, solution first.
- The [governance piece](../governance/who-decides-what-becomes-a-pattern.md) sets out how a pattern moves from draft to published, and who decides.

<!-- Author: rewrite in your own voice. Where did you first meet patterns, and what made you want to use them for this site? -->

## In this thread
- **Thread:** design-patterns · [the table](../index.md)
- **Guides:** [Writing a pattern](../guides/writing-a-pattern.md)
- **Governance:** [Who decides what becomes a pattern?](../governance/who-decides-what-becomes-a-pattern.md)
- **Theory:** [A pattern language for community tech](../theory/a-pattern-language-for-community-tech.md)
