---
title: "Talk Before You Enforce"
number: 3
threads: [design-patterns, institutions]
larger_patterns: [two-keyholders]
smaller_patterns: []
releases: [001-a-shared-server]
status: draft
---

## Context
A group sharing a system has started to have problems: someone uses too much storage, someone installs something without asking, rules are unclear.

## Problem
The admin's instinct is to reach for technical enforcement: quotas, permissions, bans. These are quick, but they put the admin in charge of discipline and skip the group's own judgment. Members experience the rules as imposed from above.

## Discussion
Ostrom, Walker, and Gardner showed in experiments that simply letting people talk to each other sharply increases cooperation, even with no enforcement at all. Sanctions worked best when combined with communication and chosen by the group itself ([*Covenants With and Without a Sword*](../../bibliography/ostrom-walker-gardner-1992-covenants-with-and-without-a-sword.md)). *Governing the Commons* lists graduated sanctions and low-cost conflict resolution among the design principles of lasting institutions ([*Governing the Commons*](../../bibliography/ostrom-1990-governing-the-commons.md)).

Technical enforcement still has a place. But it works better as the group's decision, carried out by an admin, than as the admin's decision imposed on the group.

## Therefore
**Before building any enforcement tool, set up a place for the group to talk (a chat channel, a regular check-in) and use it.** When a problem comes up, raise it there first. If enforcement is needed, let the group choose it, and start with the smallest response that works.

## Used in
- [001 A Shared Server](../../releases/001-a-shared-server.md): [Setting up your first server](../../guides/first-server.md), [Who holds root?](../../governance/who-holds-root.md)
