---
title: "Who holds root? An IAD analysis of a shared server"
date:                  # YYYY-MM-DD, set at publish
threads: [liberatory-tech, institutions]   # first thread is the row in the table
sources:
  - ostrom-2005-understanding-institutional-diversity.md
  - crawford-ostrom-1995-grammar-of-institutions.md
  - ostrom-walker-gardner-1992-covenants-with-and-without-a-sword.md
  - ostrom-1990-governing-the-commons.md
patterns_applied:
  - wiki/patterns/two-keyholders.md
  - wiki/patterns/talk-before-you-enforce.md
status: draft          # rough draft for the author to rewrite in their own voice
---

## The server works. Now what?

You followed the [first server guide](../guides/first-server.md). Then a housemate wants a shared calendar on it, a friend asks about photo backup, and a neighborhood group wants a chat server. Saying yes is technically easy. The hard part is that someone now has to decide who gets an account, who can install software, who gets woken up when it breaks, and what happens if you move away. Most self-hosting guides skip this part, and it's where shared servers usually fail.

## The server as an action situation

Elinor Ostrom's Institutional Analysis and Development (IAD) framework, built to compare fisheries, irrigation systems, and forests, centers on the *action situation*: a setting where people in different roles interact under rules and produce outcomes. A shared server is one. Fill in this table for yours; the gaps are your governance to-do list.

| IAD part | Question | Example for a household or small group |
|---|---|---|
| **Participants** | Who is involved? | You, two housemates, a few friends |
| **Positions** | What roles exist? | Admin (has `sudo`), member (has an account on services), guest (temporary access) |
| **Actions** | What can each position do? | Admins install software and manage accounts; members use services and store data |
| **Information** | Who knows what? | Can admins read members' files? Who sees logs? Is there a status page? |
| **Control** | Who can affect outcomes? | Only admins can restart services or restore backups |
| **Outcomes** | What results? | Uptime, data safety, privacy, who does the work |
| **Costs & benefits** | Who pays, who gains? | Who buys the hardware and pays for electricity; who spends Saturday fixing it |

## Seven kinds of rules

Ostrom's seven rule types each map onto a real decision. Anything you don't decide gets decided by default, usually by whoever holds root.

- **Boundary rules:** who can join, and how? *(Invite only? Anyone in the building?)*
- **Position rules:** what roles exist, and how many people hold each? *(At least two admins. See [Two Keyholders](../wiki/patterns/two-keyholders.md).)*
- **Choice rules:** what each position may, must, or must not do. *(Admins must not read members' files without permission.)*
- **Aggregation rules:** how decisions are made. *(Admins decide routine changes; any member can call a group decision on new services.)*
- **Information rules:** what gets shared, and with whom. *(Planned downtime is announced in the group chat.)*
- **Payoff rules:** who pays and who benefits. *(Members chip in for the hard drive.)*
- **Scope rules:** what the server is for. *(Household services only; no public websites.)*

## Three levels of rules

1. **Operational:** day-to-day use. How to request an account, when updates happen, how much storage each person gets.
2. **Collective-choice:** how operational rules are made and changed. Who can propose a new service, how the group decides.
3. **Constitutional:** who takes part in collective choice, and how the arrangement can change or end. Who counts as a member, what happens to the data if the group dissolves.

The common failure is having only operational rules, kept in one person's head. When the group disagrees there's no agreed way to decide, so the admin decides, and becomes the ruler whether they wanted to or not.

## Writing rules that work

Sue Crawford and Elinor Ostrom's "grammar of institutions" gives a complete rule five parts, ADICO: **A**ttributes (who), **D**eontic (must, may, must not), a**I**m (the action), **C**onditions (when or where), and **O**r else (the consequence). Compare:

> ~~"Admins should try to give notice before downtime."~~

> Admins (A) must (D) announce planned downtime in the group chat (I) at least 48 hours in advance (C), or else the downtime is postponed (O).

The first is a wish; the second can be checked and enforced. Statements without an "or else" are *norms*, and many community norms work fine that way. Just know which is which.

## Quick health check

Ostrom's design principles from *Governing the Commons*, as a five-minute check:

- [ ] It's clear who is a member.
- [ ] The rules fit this group, not copied from a corporation.
- [ ] Members can take part in changing the rules.
- [ ] Someone accountable to the group checks that rules are followed.
- [ ] Responses to problems start small and escalate.
- [ ] There's a quick, low-cost way to resolve disputes.
- [ ] No outside party (landlord, ISP, platform) can override the group's rules without notice.

## Patterns applied
- [Two Keyholders](../wiki/patterns/two-keyholders.md): a position rule. The charter below requires at least two admins.
- [Talk Before You Enforce](../wiki/patterns/talk-before-you-enforce.md): an aggregation and information rule. In Ostrom, Walker, and Gardner's "Covenants With and Without a Sword" experiments, letting people talk sharply increased cooperation even without enforcement, and sanctions worked best when the group chose them. Set up a group channel or regular check-in before any enforcement tools.

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

## In this thread
- **Thread:** liberatory-tech · [the table](../index.md)
- **Guides:** [Setting up your first server](../guides/first-server.md)
- **Governance:** [Who holds root?](../governance/who-holds-root.md)
- **Theory:** [Who owns the machine?](../theory/who-owns-the-machine.md)
