---
title: "Who owns the machine?"
date:                  # YYYY-MM-DD, set at publish
threads: [liberatory-tech, privacy, big-tech-critique]   # first thread is the row in the table
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

## The cloud is someone else's computer

Your email, photos, and group chats live in data centers owned by a few large companies. "The cloud" makes this sound weightless, but it's a building full of computers, and whoever owns them sets the terms. This essay asks who owns the machine, and why it matters.

Langdon Winner's answer to ["Do Artifacts Have Politics?"](../bibliography/winner-1980-do-artifacts-have-politics.md) was yes. Some technologies require a certain social order to run them: a nuclear plant needs centralized, hierarchical control, and a rooftop solar panel doesn't. Computing is the same. Routing everyone's data through one company's servers produces one kind of power; a network of small servers run by households and neighborhoods produces another.

## Free software won, and lost

In ["Freedom in the Cloud"](../bibliography/moglen-2010-freedom-in-the-cloud.md) (2010), Eben Moglen pointed out that free software had largely won, but users' data had moved onto servers they didn't control, where every click and message was logged. Free code on your laptop didn't help when the important part happened on someone else's machine. His answer was small, cheap servers in people's homes, running free software and federating with each other. That became the FreedomBox project, and it is the starting point for this blog's guides.

<!-- Author: Moglen's phrase about logs being kept "for free" by the server owner is worth quoting directly once you check the transcript. -->

## Tools you can understand

Ursula Franklin distinguished [holistic from prescriptive technologies](../bibliography/franklin-1990-real-world-of-technology.md). In holistic work, like a potter's, the person doing it controls the whole process. In prescriptive work, someone else sets the steps. Most platforms are prescriptive: you use the features they offer, the way they allow. Ivan Illich called for [convivial tools](../bibliography/illich-1973-tools-for-conviviality.md) that people can understand, use, and adapt. A small server running well-documented software is convivial: you can open it up, change it, and fix it.

People stay on platforms anyway because of switching costs, as Cory Doctorow argues in [*The Internet Con*](../bibliography/doctorow-2023-internet-con.md). Leaving means leaving your contacts, history, and community behind. Open protocols and federation lower those costs and let a community server talk to the rest of the world instead of becoming an island.

## Owning it isn't enough

A server where one person holds every password is still a small platform, just with a friendly owner. Once other people depend on it, the question changes from who owns the machine to who decides how it's run. Two patterns follow.

## Patterns introduced

### [Small Enough to Understand](../wiki/patterns/small-enough-to-understand.md)
Illich and Franklin point the same way: people can only control what they can understand. A server only one expert can follow is prescriptive technology with a friendlier face, and members can't fix it or take part in decisions about it.

> **Therefore:** keep the system small enough that a second member could learn to run it in a weekend. Prefer well-documented, widely used software. Add complexity only when a real need appears, and write down why.

### [Two Keyholders](../wiki/patterns/two-keyholders.md)
If one person holds all the access, the community depends on that person's time, health, and goodwill, and the friendly owner ends up deciding everything by default.

> **Therefore:** every shared system has at least two people with full admin access, and both of them use it regularly. Write down where credentials and recovery information live, and make sure both keyholders can reach them without the other's help.

### How the patterns fit together
Small Enough to Understand is the larger pattern: a second keyholder is only realistic if the system is small enough to learn. Two Keyholders completes it. [Talk Before You Enforce](../wiki/patterns/talk-before-you-enforce.md), from the `institutions` thread, completes Two Keyholders: people who share power need a way to settle problems together.

<!-- Author: the Moglen and Doctorow sections suggest a third pattern about federation and exit, e.g. "Federate, Don't Isolate" or "Exit Built In". -->

## From theory to practice
- The [guide](../guides/first-server.md) builds a small, understandable server: one machine, plain Debian, a few standard tools.
- The [governance piece](../governance/who-holds-root.md) turns Two Keyholders and Talk Before You Enforce into rules and a charter a group can adopt.

## In this thread
- **Thread:** liberatory-tech · [the table](../index.md)
- **Guides:** [Setting up your first server](../guides/first-server.md)
- **Governance:** [Who holds root?](../governance/who-holds-root.md)
- **Theory:** [Who owns the machine?](../theory/who-owns-the-machine.md)
