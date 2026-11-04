---
title: "Every Page Links Out"
number: 5
introduction: "A page with no links out isn't finished."
image: ""
thread: institutions
level: operational
introduced_in: guides/contributing.md
applied_in:
  - governance/how-this-project-is-run.md
larger_patterns: [every-thread-at-every-level]
smaller_patterns: []
status: draft
---

*A page with no links out isn't finished.*

## Context
A site, wiki, or body of documentation that grows piece by piece over time, often written by different people.

## Problem
Pages written one at a time tend to become islands. A guide loses the reasons behind it and becomes a recipe. A theory essay loses its practical consequences and becomes a slogan. Readers who arrive from a search engine land on one page and never see the rest.

## Forces
- A commons is a set of relationships, not a pile of resources ([*Understanding Knowledge as a Commons*](../../bibliography/hess-ostrom-2007-understanding-knowledge-as-a-commons.md); [*The Magna Carta Manifesto*](../../bibliography/linebaugh-2008-magna-carta-manifesto.md)).
- Alexander's patterns get their meaning from their links to larger and smaller patterns ([*A Pattern Language*](../../bibliography/alexander-1977-pattern-language.md)). The original wiki was built on the same idea.
- Hand-maintained links drift as pages change.

## Solution
**Therefore, link every page to the other pieces in its thread, to the table, to the patterns it introduces or applies, and to the sources it draws on.**

## Actions
- Fill in front matter (`threads`, `patterns`, `patterns_applied`, `sources`) so the website can generate the table, the thread footer, and pattern backlinks.
- Keep hand-written links in the body to the ones that carry meaning.
- After renaming a file, search for its old name and fix every reference.

## Consequences
- **Positive:** readers who arrive anywhere can find the rest, and reasons travel with instructions.
- **Negative:** generated links depend on front matter being right, and links break when files move. The site build checks front matter; renames still need a search.
