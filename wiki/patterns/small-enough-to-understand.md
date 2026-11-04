---
title: "Small Enough to Understand"
number: 2
introduction: "People can only govern what they can understand."
image: ""
thread: liberatory-tech
level: metaconstitutional
larger_patterns: []
smaller_patterns: [two-keyholders]
introduced_in: theory/who-owns-the-machine.md
applied_in:
  - guides/first-server.md
status: draft
---

*People can only govern what they can understand.*

## Context
Choosing hardware, software, and architecture for a household or community system.

## Problem
Powerful, complex systems promise more features and scale. But a system that only one expert understands can only be maintained by that expert, and members can't take part in decisions about something they can't follow.

## Forces
- Tools past a certain size stop serving people and start controlling them ([*Tools for Conviviality*](../../bibliography/illich-1973-tools-for-conviviality.md)).
- Holistic technologies keep the whole process within reach of the people doing the work ([*The Real World of Technology*](../../bibliography/franklin-1990-real-world-of-technology.md)).
- Features and scale are visible up front. The cost of complexity shows up later, when the expert isn't available.
- Good places grow piecemeal, not from master plans ([*The Timeless Way of Building*](../../bibliography/alexander-1979-timeless-way-of-building.md)).

## Solution
**Therefore, keep the system small enough that a second member could learn to run it in a weekend, by adding complexity only when a real need appears.**

## Actions
- One machine before a cluster, a plain Debian install before an orchestration platform, a few well-documented services before many.
- Prefer well-documented, widely used software.
- Write down why each new piece of complexity was added.

## Consequences
- **Positive:** more members can maintain the system and take part in decisions about it. [Two Keyholders](two-keyholders.md) becomes realistic.
- **Negative:** some features and scale come later or not at all, and members may get less convenience than a commercial service offers.
