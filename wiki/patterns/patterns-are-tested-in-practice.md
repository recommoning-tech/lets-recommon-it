---
title: "Patterns Are Tested in Practice"
number: 6
introduction: "A pattern is a claim until someone uses it."
image: ""
thread: design-patterns
level: metaconstitutional
introduced_in: theory/a-pattern-language-for-community-tech.md
applied_in:
  - guides/contributing.md
  - governance/how-this-project-is-run.md
  - guides/writing-a-pattern.md
  - governance/who-decides-what-becomes-a-pattern.md
larger_patterns: [every-thread-at-every-level]
smaller_patterns: [workshop-the-pattern]
status: draft
---

*A pattern is a claim until someone uses it.*

## Context
A pattern language that grows out of essays, guides, and reading, as this one does.

## Problem
Patterns that come only from argument drift toward abstraction. They sound right, but nobody has checked whether they work, and over time the language fills with good intentions instead of tested solutions.

## Forces
- Alexander's design method starts from fit: what actually goes wrong in real use ([*Notes on the Synthesis of Form*](../../bibliography/alexander-1964-notes-on-the-synthesis-of-form.md)). His patterns came from observing places that worked and places that failed ([*The Timeless Way of Building*](../../bibliography/alexander-1979-timeless-way-of-building.md)).
- Iba's lab mines patterns from experience, through group reflection and interviews with practitioners ([Iba, "Pattern Language 3.0"](../../bibliography/iba-2016-pattern-language-3.md)).
- Writing from reading is faster than writing from practice, and an essay rewards a pattern that sounds right.

## Solution
**Therefore, apply every pattern by name in at least one piece besides the one that introduces it, preferably at another level or in another thread, and revise the pattern when it doesn't fit.**

## Actions
- List each applying piece in the pattern's `applied_in`.
- When a pattern doesn't fit, revise it and say why in the commit message.
- Mine patterns from your own experience or from interviews, not only from reading.

## Consequences
- **Positive:** the language fills with solutions that have met real servers and real groups, and failures improve the patterns.
- **Negative:** a new pattern waits for a second piece before it counts as tested, and a pattern applied only by its own author is still lightly tested.
