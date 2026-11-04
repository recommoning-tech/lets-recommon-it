---
title: "Two Keyholders"
number: 1
introduction: "No shared system should depend on one person."
image: ""
thread: liberatory-tech
level: collective-choice
larger_patterns: [small-enough-to-understand]
smaller_patterns: [talk-before-you-enforce]
introduced_in: governance/who-holds-root.md
applied_in:
  - guides/first-server.md
  - governance/how-this-project-is-run.md
status: draft
---

*No shared system should depend on one person.*

## Context
A server, service, or network that more than one person depends on, run by volunteers.

## Problem
When one person holds all the admin access, the system depends on that person. If they burn out, move, get sick, or fall out with the group, nobody else can get in to fix it, and the single admin ends up deciding everything by default.

## Forces
- Most community tech starts with one enthusiastic person who sets it up, so access starts out concentrated.
- Rules about positions (who holds which role, and how many people hold it) are part of what makes an institution last ([*Understanding Institutional Diversity*](../../bibliography/ostrom-2005-understanding-institutional-diversity.md)).
- Single-maintainer projects put the whole load on one person ([*Working in Public*](../../bibliography/eghbal-2020-working-in-public.md)).
- The lone admin's work is rarely seen until it stops ([*Re-enchanting the World*](../../bibliography/federici-2019-re-enchanting-the-world.md)).

## Solution
**Therefore, give at least two people full admin access to every shared system, and make sure both of them use it regularly.**

## Actions
- Write down where credentials and recovery information live, and make sure both keyholders can reach them without the other's help.
- Have the second keyholder do routine tasks now and then (updates, restarts), so they can step in when needed.
- Treat two as the minimum, not the ideal.

## Consequences
- **Positive:** the system survives one person leaving or burning out, and decisions stop defaulting to one admin.
- **Negative:** more people with full access means more trust is needed and more ways for credentials to leak. Keyholders have to coordinate so they don't undo each other's work.

## Connections
- **Thread and level:** liberatory-tech, collective-choice
- **Introduced in:** [Who holds root?](../../governance/who-holds-root.md)
- **Applied in:** [Setting up your first server](../../guides/first-server.md), [How this project is run](../../governance/how-this-project-is-run.md)
- **Larger patterns:** [Small Enough to Understand](small-enough-to-understand.md)
- **Smaller patterns:** [Talk Before You Enforce](talk-before-you-enforce.md)
