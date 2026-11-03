---
title: "Two Keyholders"
number: 1
threads: [design-patterns, liberatory-tech, institutions, labor-care]
larger_patterns: [small-enough-to-understand]
smaller_patterns: [talk-before-you-enforce]
introduced_in: theory/who-owns-the-machine.md
applied_in:
  - guides/first-server.md
  - governance/who-holds-root.md
  - governance/how-this-project-is-run.md
status: draft
---

## Context
A server, service, or network that more than one person depends on, run by volunteers.

## Problem
When one person holds all the admin access, the system depends on that person. If they burn out, move, get sick, or fall out with the group, the system stops being maintained, and nobody else can get in to fix it. The single admin also ends up deciding everything by default.

## Discussion
Most community tech starts with one enthusiastic person who sets it up. That's fine at the start, but it creates a bus factor of one. Ostrom's work on long-lasting commons shows that rules about positions (who holds which role, and how many people hold it) are part of what makes an institution survive ([*Understanding Institutional Diversity*](../../bibliography/ostrom-2005-understanding-institutional-diversity.md)). Nadia Eghbal's study of open source maintainers ([*Working in Public*](../../bibliography/eghbal-2020-working-in-public.md)) shows the cost of the single-maintainer model. Federici's point about invisible care work ([*Re-enchanting the World*](../../bibliography/federici-2019-re-enchanting-the-world.md)) applies too: the lone admin's work is rarely seen until it stops.

Two keyholders is the minimum, not the ideal. The second keyholder needs to actually use their access now and then, or they won't be able to step in when needed.

## Therefore
**Every shared system has at least two people with full admin access, and both of them use it regularly.** Write down where credentials and recovery information live, and make sure both keyholders can reach them without the other's help.

## Connections
- **Introduced in:** [Who owns the machine?](../../theory/who-owns-the-machine.md) (Release 001, liberatory-tech)
- **Applied in:** [Setting up your first server](../../guides/first-server.md), [Who holds root?](../../governance/who-holds-root.md), [How this project is run](../../governance/how-this-project-is-run.md)
- **Larger patterns:** [Small Enough to Understand](small-enough-to-understand.md)
- **Smaller patterns:** [Talk Before You Enforce](talk-before-you-enforce.md)
