---
title: "A Language Users Can Speak"
number: 8
introduction: "Patterns are for the people who live with the system."
image: ""
thread: design-patterns
level: metaconstitutional
introduced_in: theory/a-pattern-language-for-community-tech.md
applied_in:
  - guides/writing-a-pattern.md
  - governance/who-decides-what-becomes-a-pattern.md
larger_patterns: []
smaller_patterns: [solution-first, workshop-the-pattern]
status: draft
---

*Patterns are for the people who live with the system.*

## Context
Writing patterns for systems that a community uses and runs together.

## Problem
Pattern writing drifts toward experts. Names become jargon and solutions assume background knowledge, so the language ends up serving the people who already run the system instead of the members who could share in running it.

## Forces
- Alexander wrote patterns as a common language between designers and the people who would live in a place ([*A Pattern Language*](../../bibliography/alexander-1977-pattern-language.md)).
- Software patterns, the second generation, were written between professionals to pass on expertise. Iba's third generation treats patterns as a medium for dialogue among people with any amount of experience, who don't need to know pattern theory to use them ([Iba, "Pattern Language 3.0"](../../bibliography/iba-2016-pattern-language-3.md)).
- Technical writers default to the vocabulary of their field.

## Solution
**Therefore, write each pattern so that a member with no technical background can read it, say its name, and use it in conversation, by keeping the name plain and the technical detail in the Actions.**

## Actions
- Name the pattern in ordinary words, usually two or three, and say it aloud to test it ([Iba 2014](../../bibliography/iba-2014-journey-to-pattern-writing.md)).
- Add a one-sentence introduction under the name.
- Put commands, tool names, and configuration in the Actions or in a guide, not in the Solution.
- Use pattern names in meetings and pull requests.

## Consequences
- **Positive:** members can join technical decisions, and pattern names become words the group uses.
- **Negative:** plain language loses some precision, experts may find patterns obvious, and some patterns need a guide beside them to be usable.

## Connections
- **Thread and level:** design-patterns, metaconstitutional
- **Introduced in:** [A pattern language for community tech](../../theory/a-pattern-language-for-community-tech.md)
- **Applied in:** [Writing a pattern](../../guides/writing-a-pattern.md), [Who decides what becomes a pattern?](../../governance/who-decides-what-becomes-a-pattern.md)
- **Larger patterns:** none yet
- **Smaller patterns:** [Solution First](solution-first.md), [Workshop the Pattern](workshop-the-pattern.md)
