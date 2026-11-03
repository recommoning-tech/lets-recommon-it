---
title: "Who holds root? An IAD analysis of a shared server"
date:                  # YYYY-MM-DD, set at publish
threads: [institutions]
sources:
  - ostrom-2005-understanding-institutional-diversity.md
  - crawford-ostrom-1995-grammar-of-institutions.md
  - ostrom-walker-gardner-1992-covenants-with-and-without-a-sword.md
  - ostrom-1990-governing-the-commons.md
release: 001-a-shared-server
status: draft          # rough draft for the author to rewrite in their own voice
---

<!--
OUTLINE
1. Problem: the server works, and now other people want to use it
2. IAD in one paragraph: the action situation
3. Walk through the parts for a shared server
4. Rule types: what has to be decided
5. Three levels of rules: operational, collective-choice, constitutional
6. Writing rules that work: ADICO
7. Talk before you enforce (Covenants)
8. Quick health check: Ostrom's design principles
9. Template: a one-page server charter
-->

## The server works. Now what?

You followed the [first server guide](../guides/first-server.md). You have a small Debian machine with SSH keys, a firewall, and automatic updates. Then a housemate wants a shared calendar on it. A friend asks about photo backup. A neighborhood group wants a chat server.

The technical side of saying yes is easy. The hard part is that the server is no longer yours alone. Someone has to decide who gets an account, who can install software, who gets woken up when it breaks, and what happens if you move away.

Most self-hosting guides skip this. Most community servers fail because of it.

## A tool for thinking about rules

Elinor Ostrom spent decades studying how groups govern shared resources: fisheries, irrigation systems, forests. To compare very different cases, she and her colleagues built the **Institutional Analysis and Development (IAD) framework**. Its central idea is the **action situation**: any setting where people with different roles interact under rules and produce outcomes.

A shared server is an action situation. Breaking it into parts shows what you need to decide.

## The parts of a shared server

| IAD part | Question | Example for a household or small group |
|---|---|---|
| **Participants** | Who is involved? | You, two housemates, a few friends |
| **Positions** | What roles exist? | Admin (has `sudo`), member (has an account on services), guest (temporary access) |
| **Actions** | What can each position do? | Admins install software and manage accounts; members use services and store data |
| **Information** | Who knows what? | Can admins read members' files? Who sees logs? Is there a status page? |
| **Control** | Who can affect outcomes? | Only admins can restart services or restore backups |
| **Outcomes** | What results? | Uptime, data safety, privacy, who does the work |
| **Costs & benefits** | Who pays, who gains? | Who buys the hardware and pays for electricity; who spends Saturday fixing it |

Fill in this table for your own server. The gaps are your governance to-do list.

## Seven kinds of rules

Ostrom identified seven types of rules that shape any action situation. Each maps onto a real decision:

- **Boundary rules:** who can join, and how? *(Invite only? Anyone in the building?)*
- **Position rules:** what roles exist, and how many people hold each? *(At least two admins. See [Two Keyholders](../wiki/patterns/two-keyholders.md).)*
- **Choice rules:** what each position may, must, or must not do. *(Admins must not read members' files without permission.)*
- **Aggregation rules:** how decisions are made. *(Admins decide routine changes; any member can call a group decision on new services.)*
- **Information rules:** what gets shared, and with whom. *(Planned downtime is announced in the group chat.)*
- **Payoff rules:** who pays and who benefits. *(Members chip in for the hard drive.)*
- **Scope rules:** what the server is for. *(Household services only; no public websites.)*

You don't need all of these written down on day one. Know that each one exists, because if you don't decide it, someone will decide it by default, usually whoever holds root.

## Three levels of rules

IAD separates rules by level:

1. **Operational rules** govern day-to-day use: how to request an account, when updates happen, how much storage each person gets.
2. **Collective-choice rules** govern how operational rules are made and changed: who can propose a new service, how the group decides.
3. **Constitutional rules** govern who takes part in collective choice and how the whole arrangement can be changed or ended: who counts as a member, what happens to the data if the group dissolves.

The common failure is having only operational rules, and having them live in one person's head. When the group disagrees, there's no agreed way to decide, so the admin decides. The admin becomes the ruler, whether they wanted that or not.

## Writing rules that actually work

Sue Crawford and Elinor Ostrom proposed a "grammar of institutions" for writing rules clearly. A complete rule has five parts, **ADICO**:

- **A**ttributes: who it applies to
- **D**eontic: must, may, or must not
- a**I**m: the action
- **C**onditions: when or where
- **O**r else: the consequence

Compare:

> ~~"Admins should try to give notice before downtime."~~

> **Admins** (A) **must** (D) **announce planned downtime in the group chat** (I) **at least 48 hours in advance** (C), **or else the downtime is postponed** (O).

The first is a wish. The second can be followed, checked, and enforced. Not every rule needs a sanction. Statements without an "or else" are *norms*, and many good community norms work fine that way. But you should know which is which.

## Talk before you enforce

It's tempting to solve governance with tools: permissions, quotas, automated bans. Ostrom, James Walker, and Roy Gardner tested this in "Covenants With and Without a Sword." In their experiments, simply letting people talk to each other sharply increased cooperation, even with no enforcement at all. Sanctions worked best when the group chose them, combined with communication.

For a shared server: set up a channel to talk (a group chat, a monthly check-in) **before** you set up enforcement tools. See [Talk Before You Enforce](../wiki/patterns/talk-before-you-enforce.md).

## Quick health check

Ostrom's design principles from *Governing the Commons* make a good five-minute check. Can you answer yes?

- [ ] It's clear who is a member.
- [ ] The rules fit this group, not copied from a corporation.
- [ ] Members can take part in changing the rules.
- [ ] Someone accountable to the group checks that rules are followed.
- [ ] Responses to problems start small and escalate.
- [ ] There's a quick, low-cost way to resolve disputes.
- [ ] No outside party (landlord, ISP, platform) can override the group's rules without notice.

## A one-page server charter

Start here. Fill it in together, not alone.

```markdown
# [Server name] Charter

## Purpose (scope)
This server provides [services] for [group].

## Members (boundary)
Members are [who]. New members are added by [how].

## Roles (position)
- Admins: [names]. There must always be at least two.
- Members: everyone with an account.

## Admin duties (choice + information)
- Admins must announce planned downtime in [channel] at least 48 hours ahead.
- Admins must not access members' files without permission, except to restore a backup the member requested.
- Admins check updates and backups [weekly].

## Decisions (aggregation)
- Routine maintenance: any admin.
- New services or rule changes: [majority / consensus] of members at [meeting / chat poll].

## Costs (payoff)
[Who pays for what.]

## Changing this charter (constitutional)
Changes require [rule] of members.
If the group ends, members get [N] weeks to export their data before the server is wiped.
```

<!-- Author: add a real example from your own setup? Even a small one makes this concrete. -->

## In this release
- **Release:** [001 A Shared Server](../releases/001-a-shared-server.md)
- **Theory:** [Who owns the machine?](../theory/who-owns-the-machine.md)
- **Guide:** [Setting up your first server](../guides/first-server.md)
- **Governance:** [Who holds root?](../governance/who-holds-root.md)
- **Patterns:** [Two Keyholders](../wiki/patterns/two-keyholders.md), [Small Enough to Understand](../wiki/patterns/small-enough-to-understand.md), [Talk Before You Enforce](../wiki/patterns/talk-before-you-enforce.md)
