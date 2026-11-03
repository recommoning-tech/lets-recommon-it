---
title: "Small Enough to Understand"
number: 2
threads: [design-patterns, liberatory-tech]
larger_patterns: []
smaller_patterns: [two-keyholders]
introduced_in: theory/who-owns-the-machine.md
applied_in:
  - guides/first-server.md
status: draft
---

## Context
Choosing hardware, software, and architecture for a household or community system.

## Problem
Powerful, complex systems are tempting. They promise more features and scale. But a system that only one expert can understand can only be maintained by that expert, and members can't take part in decisions about something they can't understand.

## Discussion
Illich argued that tools past a certain size stop serving people and start controlling them ([*Tools for Conviviality*](../../bibliography/illich-1973-tools-for-conviviality.md)). Franklin's holistic technologies keep the whole process within the reach of the people doing the work ([*The Real World of Technology*](../../bibliography/franklin-1990-real-world-of-technology.md)). Alexander favored piecemeal growth over master plans ([*The Timeless Way of Building*](../../bibliography/alexander-1979-timeless-way-of-building.md)).

For a community server, this means: one machine before a cluster, a plain Debian install before an orchestration platform, a few well-documented services before many. Growth should come from real need, one piece at a time.

## Therefore
**Keep the system small enough that a second member could learn to run it in a weekend.** Prefer well-documented, widely used software. Add complexity only when a real need appears, and write down why.

## Connections
- **Introduced in:** [Who owns the machine?](../../theory/who-owns-the-machine.md) (Release 001, liberatory-tech)
- **Applied in:** [Setting up your first server](../../guides/first-server.md)
- **Larger patterns:** none yet
- **Smaller patterns:** [Two Keyholders](two-keyholders.md)
