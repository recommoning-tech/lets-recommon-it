---
title: "Who owns the machine?"
date:                  # YYYY-MM-DD, set at publish
release: 001-a-shared-server
threads: [liberatory-tech, privacy, big-tech-critique]
sources:
  - moglen-2010-freedom-in-the-cloud.md
  - winner-1980-do-artifacts-have-politics.md
  - illich-1973-tools-for-conviviality.md
  - franklin-1990-real-world-of-technology.md
  - doctorow-2023-internet-con.md
patterns:
  - wiki/patterns/small-enough-to-understand.md
  - wiki/patterns/two-keyholders.md
status: draft          # rough draft for the author to rewrite in their own voice
---

<!--
OUTLINE
1. The cloud is someone else's computer
2. Architecture is politics (Winner)
3. Free software won, and lost (Moglen)
4. Holistic vs. prescriptive (Franklin), convivial tools (Illich)
5. Why lock-in holds (Doctorow)
6. Owning the machine is necessary but not enough
7. Patterns: Small Enough to Understand → Two Keyholders
8. From theory to practice → guide + governance
-->

## The cloud is someone else's computer

Almost every digital service you use runs on a machine you will never see. Your email, photos, and group chats live on servers in data centers owned by a few large companies. "The cloud" makes this sound weightless, but it's a building full of computers, and whoever owns them sets the terms.

This release asks who owns the machine, and why it matters.

## Architecture is politics

In 1980 Langdon Winner asked, ["Do Artifacts Have Politics?"](../bibliography/winner-1980-do-artifacts-have-politics.md) His answer was yes. Some technologies are designed to favor certain people. Others, by their nature, require a certain kind of social order to run them. A nuclear power plant needs a centralized, hierarchical organization. A solar panel on a roof doesn't.

Computing infrastructure is the same. A system where everyone's data passes through one company's servers produces one kind of power. A network of small servers run by households and neighborhoods produces another. The choice of architecture is a choice about who decides.

## Free software won, and lost

In 2010, law professor Eben Moglen gave a talk called ["Freedom in the Cloud."](../bibliography/moglen-2010-freedom-in-the-cloud.md) He pointed out that the free software movement had largely won: anyone could run free code on a desktop or a server. But users' data had moved onto servers they didn't control, and every click and message was logged there. Free software on your laptop didn't help when the important part happened on someone else's machine.

His proposal was small, cheap servers in people's homes, running free software and federating with each other. That idea became the FreedomBox project, and it is the starting point for this blog's guides.

<!-- Author: Moglen's phrase about logs being kept "for free" by the server owner is worth quoting directly once you check the transcript. -->

## Tools you can understand

Ursula Franklin distinguished [holistic and prescriptive technologies](../bibliography/franklin-1990-real-world-of-technology.md). In holistic work, the person doing it controls the whole process, like a potter. In prescriptive work, the process is broken into steps set by someone else, and the worker follows instructions. Most platforms are prescriptive. You use the features they offer, in the way they allow.

Ivan Illich called for [convivial tools](../bibliography/illich-1973-tools-for-conviviality.md): tools that people can understand, use, and adapt for their own purposes. A small server running well-documented software is convivial. You can open it up, change it, and fix it.

## Why it's hard to leave

In [*The Internet Con*](../bibliography/doctorow-2023-internet-con.md), Cory Doctorow explains why people stay on platforms: switching costs. Leaving a platform means leaving your contacts, your history, and your community behind. Platforms work hard to keep those costs high. Open protocols and federation are what lower them. They let a community server talk to the rest of the world instead of becoming an island.

## Owning the machine is necessary, but not enough

Owning the machine is the first step. A server where one person holds every password is still a small platform, just with a friendly owner. As soon as other people depend on it, the question changes from *who owns the machine* to *who decides how it's run*.

Two patterns follow from this argument.

## Patterns

### [Small Enough to Understand](../wiki/patterns/small-enough-to-understand.md)
Illich's convivial tools and Franklin's holistic technologies point the same way: people can only control what they can understand. A community server built from a stack only one expert can follow is prescriptive technology with a friendlier face. Members can't fix it, change it, or take part in decisions about it. The size of the system is a political choice, as Winner argued.

> **Therefore:** keep the system small enough that a second member could learn to run it in a weekend. Prefer well-documented, widely used software. Add complexity only when a real need appears, and write down why.

### [Two Keyholders](../wiki/patterns/two-keyholders.md)
Owning the machine collectively means more than one person can run it. If one person holds all the access, the community depends on that person's time, health, and goodwill, and the "friendly owner" ends up deciding everything by default.

> **Therefore:** every shared system has at least two people with full admin access, and both of them use it regularly. Write down where credentials and recovery information live, and make sure both keyholders can reach them without the other's help.

### How the patterns fit together
Small Enough to Understand is the larger pattern. A second keyholder is only realistic if the system is small enough for them to learn. Two Keyholders completes it by putting that understanding in more than one pair of hands.

Both lead toward governance. [Talk Before You Enforce](../wiki/patterns/talk-before-you-enforce.md), from the `institutions` thread (Release 002), completes Two Keyholders. Once several people share power, they need a way to settle problems together.

<!-- Author: the Moglen and Doctorow sections suggest a third pattern about federation and exit, e.g. "Federate, Don't Isolate" or "Exit Built In". -->

## From theory to practice
- The [guide](../guides/first-server.md) builds a small, understandable server: one machine, plain Debian, a few standard tools.
- The [governance piece](../governance/who-holds-root.md) turns Two Keyholders and Talk Before You Enforce into rules and a charter a group can adopt.

## In this release
- **Release:** [001 Liberatory Tech: A Shared Server](../releases/001-a-shared-server.md)
- **Theory & patterns:** [Who owns the machine?](../theory/who-owns-the-machine.md): [Small Enough to Understand](../wiki/patterns/small-enough-to-understand.md), [Two Keyholders](../wiki/patterns/two-keyholders.md)
- **Guide:** [Setting up your first server](../guides/first-server.md)
- **Governance:** [Who holds root?](../governance/who-holds-root.md)
