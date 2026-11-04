---
title: "Solution First"
number: 9
introduction: "Start with what you'd tell a newcomer."
image: ""
thread: design-patterns
level: operational
introduced_in: guides/writing-a-pattern.md
applied_in:
  - guides/contributing.md
larger_patterns: [a-language-users-can-speak]
smaller_patterns: []
status: draft
---

*Start with what you'd tell a newcomer.*

## Context
You are writing a pattern from your own experience or someone else's.

## Problem
Writers tend to start at the top of the form, with a name and a context, and fill in the boxes in order. The pattern comes out abstract, and the solution, which is the part worth sharing, ends up the weakest part.

## Forces
- The order a pattern is read in (name, context, problem, solution) isn't the order knowledge is found in.
- Alexander identified the solution first, then the problem it solves, then the context, and named the pattern last ([*The Timeless Way of Building*](../../bibliography/alexander-1979-timeless-way-of-building.md), as read by [Iba 2014](../../bibliography/iba-2014-journey-to-pattern-writing.md)).
- A name chosen too early fixes a concept before it's clear.

## Solution
**Therefore, write the solution first and the name last, by starting from the one thing you most want to share and working back to the problem it solves and the context where it applies.**

## Actions
- Follow the order: solution, actions, problem, context, forces, consequences, name, introduction ([Iba 2014](../../bibliography/iba-2014-journey-to-pattern-writing.md); [Iba 2021](../../bibliography/iba-2021-practical-guide-pattern-writing.md)).
- Find the problem by asking what happens when the solution isn't there.
- Check that the solution says both what to do and how.

## Consequences
- **Positive:** the solution is concrete, and the name captures what the pattern is actually about.
- **Negative:** a pattern written this way may overlap one that already exists. Check the pattern table before naming it.
