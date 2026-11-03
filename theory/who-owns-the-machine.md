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
status: draft          # rough draft for the author to rewrite in their own voice
---

<!--
OUTLINE
1. The cloud is someone else's computer
2. Architecture is politics (Winner)
3. Free software won, and lost (Moglen)
4. Holistic vs. prescriptive (Franklin), convivial tools (Illich)
5. Why lock-in holds (Doctorow)
6. Owning the machine is necessary but not enough → guide + governance
-->

## The cloud is someone else's computer

Almost every digital service you use runs on a machine you will never see. Your email, photos, and group chats live on servers in data centers owned by a few large companies. "The cloud" makes this sound weightless. It isn't. It's a building full of computers, and whoever owns them sets the terms.

The question this release asks is simple: **who owns the machine, and why does it matter?**

## Architecture is politics

In 1980 Langdon Winner asked, ["Do Artifacts Have Politics?"](../bibliography/winner-1980-do-artifacts-have-politics.md) His answer was yes. Some technologies are designed to favor certain people. Others, by their nature, require a certain kind of social order to run them. A nuclear power plant needs a centralized, hierarchical organization. A solar panel on a roof doesn't.

Computing infrastructure is the same. A system where everyone's data passes through one company's servers produces one kind of power. A network of small servers run by households and neighborhoods produces another. The choice of architecture is a choice about who decides.

## Free software won, and lost

In 2010, law professor Eben Moglen gave a talk called ["Freedom in the Cloud."](../bibliography/moglen-2010-freedom-in-the-cloud.md) He pointed out an irony. The free software movement had largely won on the desktop and in server software. Anyone could run free code. But users' data had moved onto servers they didn't control. Every click and message was logged somewhere else. Free software on your laptop didn't help when the important part happened on someone else's machine.

His proposal was small, cheap servers in people's homes, running free software and federating with each other. That idea became the FreedomBox project, and it is the starting point for this blog's guides.

<!-- Author: Moglen's phrase about logs being kept "for free" by the server owner is worth quoting directly once you check the transcript. -->

## Tools you can understand

Ursula Franklin distinguished [holistic and prescriptive technologies](../bibliography/franklin-1990-real-world-of-technology.md). In holistic work, the person doing it controls the whole process, like a potter. In prescriptive work, the process is broken into steps set by someone else, and the worker follows instructions. Most platforms are prescriptive. You use the features they offer, in the way they allow.

Ivan Illich called for [convivial tools](../bibliography/illich-1973-tools-for-conviviality.md): tools that people can understand, use, and adapt for their own purposes. A small server running well-documented software is convivial. You can open it up, change it, and fix it.

## Why it's hard to leave

If owning your own infrastructure is better, why doesn't everyone do it? Cory Doctorow's answer in [*The Internet Con*](../bibliography/doctorow-2023-internet-con.md) is **switching costs**. Leaving a platform means leaving your contacts, your history, and your community behind. Platforms work hard to keep those costs high. Open protocols and federation are what lower them. They let a community server talk to the rest of the world instead of becoming an island.

## Owning the machine is necessary, but not enough

Owning the machine is the first step. It means learning to set up a server you control. That's the [guide in this release](../guides/first-server.md).

But a server owned by one person who holds every password is not a commons. It's a small platform with a friendly owner. As soon as other people depend on it, the question changes from *who owns the machine* to *who decides how it's run*. That's the [governance piece in this release](../governance/who-holds-root.md), and the patterns below.


## In this release
- **Release:** [001 A Shared Server](../releases/001-a-shared-server.md)
- **Theory:** [Who owns the machine?](../theory/who-owns-the-machine.md)
- **Guide:** [Setting up your first server](../guides/first-server.md)
- **Governance:** [Who holds root?](../governance/who-holds-root.md)
- **Patterns:** [Two Keyholders](../wiki/patterns/two-keyholders.md), [Small Enough to Understand](../wiki/patterns/small-enough-to-understand.md), [Talk Before You Enforce](../wiki/patterns/talk-before-you-enforce.md)
