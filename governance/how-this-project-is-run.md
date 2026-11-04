---
title: "How this project is run"
date:                  # YYYY-MM-DD, set at publish
threads: [institutions]   # first thread is the row in the table
sources:
  - ostrom-2005-understanding-institutional-diversity.md
  - crawford-ostrom-1995-grammar-of-institutions.md
  - ostrom-walker-gardner-1992-covenants-with-and-without-a-sword.md
  - ostrom-1990-governing-the-commons.md
  - eghbal-2020-working-in-public.md
  - federici-2019-re-enchanting-the-world.md
patterns:
  - wiki/patterns/any-cell-any-time.md
patterns_applied:
  - wiki/patterns/every-thread-at-every-level.md
  - wiki/patterns/patterns-are-tested-in-practice.md
  - wiki/patterns/every-page-links-out.md
  - wiki/patterns/two-keyholders.md
  - wiki/patterns/talk-before-you-enforce.md
status: draft          # proposal; members adopt the charter below at the first meeting
---

<!-- Bracketed [placeholders] are for the founding members to fill in together. -->

## The situation

Let's Recommon IT is a commons of writing, patterns, and code, run collectively from the start. If it can't follow its own advice on governing commons, readers have no reason to. Right now one founding member wrote most of the content and holds every account, which is the situation [Two Keyholders](../wiki/patterns/two-keyholders.md) warns about. This document sets up shared decision-making while the group is small and changes are cheap.

It covers the collective-choice and constitutional levels: how the project's rules are made and changed, and who makes them. The operational rules, for day-to-day work, are in the [contributing guide](../guides/contributing.md). Why the project is organized in levels is in [This repository is a commons](../theory/this-repository-is-a-commons.md).

## Analysis

The project as an IAD action situation ([*Understanding Institutional Diversity*](../bibliography/ostrom-2005-understanding-institutional-diversity.md)):

| IAD part | For this project |
|---|---|
| **Participants** | Members, contributors, readers |
| **Positions** | **Member:** shares in decisions and review. **Keyholder:** a member who holds admin access to an account. **Contributor:** submits work but doesn't vote. **Reader.** |
| **Actions** | Contribute a piece or pattern to any cell of [the table](../index.md), review, merge, publish, change templates or structure, add threads, admit members, manage accounts |
| **Information** | Decisions and their reasons are recorded publicly in [decision log location], each linked to its proposal and the pull request that carried it out. Drafts are visible to members on GitHub. |
| **Control** | Merging to `main` publishes. Account access (GitHub, domain, hosting) controls everything else. |
| **Outcomes** | Published pieces, a growing pattern language, a healthy group |
| **Costs & benefits** | Costs: domain, hosting, time. Benefits: the work, the skills, the network. |

## Rules to decide

### Operational rules: day-to-day work
Review, merging, and draft rules are in the [contributing guide](../guides/contributing.md#operational-rules), where contributors use them. They're made and changed under the collective-choice rules below.

### Collective-choice rules: changing how the work is done
- **Lazy consensus:** changes to templates, threads, the table's structure, or the operational rules are proposed in [issues / discussions]. A proposal passes if no member objects within [7] days.
- **Objections** go to the next members' meeting, where the group looks for a version everyone can accept. If that fails, [two-thirds] of members decide.
- **Meetings:** members meet [monthly] by [video / in person]. Notes go in the decision log.

### Constitutional rules: who decides, and how this ends
- **Membership:** a contributor becomes a member by [invitation from an existing member and consensus of members]. Members may step back at any time; their contributions stay under the project license.
- **Charter changes** require [consensus] of members at a meeting.
- **Licensing:** content stays CC BY-SA 4.0 and code stays MIT. These can't be changed to non-free licenses. (CC BY-SA content can't be relicensed without its authors' consent anyway.)
- **Dissolution:** if the project ends, the repository is archived publicly, or handed to another commons-oriented group that agrees to keep the licenses. Domains and accounts are transferred or closed by the keyholders.

### Keyholders
Every account the project depends on has at least two keyholders, who both use their access:

| Account | Keyholders | Status |
|---|---|---|
| GitHub organization `recommoning-tech` | `recommon-it` (owner), `jordaninskeep` (owner) | Org created; repo transferred. Both owner accounts belong to the founding member, which guards against losing one account but not against losing the person. **Action needed:** a second member as owner. |
| Domain registrar | [member], [member] | Not yet registered |
| Hosting | [member], [member] | Not yet chosen |
| Shared password vault | [member], [member] | Not yet set up |

### AI assistance (proposed)
This project uses AI tools in drafting, and its own sources are critical of AI ([Griziotti](../bibliography/griziotti-2026-how-to-survive-artificial-intelligence.md)). The rule tries to keep people in charge of the writing:

- Contributors (A) must (D) note in the pull request (I) when a draft was substantially written with AI tools (C), or else the PR isn't merged until they do (O).
- AI-drafted text stays `status: draft` until a member has rewritten or reviewed it in their own voice.
- Citations produced with AI help must be checked against a publisher or library record before publishing.

## Risks and trade-offs

- **Founder dominance:** "collective from the start" is collective in name only if one person wrote everything and holds every account. Counter it with a second keyholder who is a different person, review by other members, and the first meeting's review of founder-merged PRs.
- **Consensus paralysis:** lazy consensus with a deadline, and a fallback vote, keep decisions moving.
- **Volunteer burnout:** writing is visible; maintenance (fixing links, reviewing, renewing the domain) usually isn't ([Eghbal](../bibliography/eghbal-2020-working-in-public.md); [Federici](../bibliography/federici-2019-re-enchanting-the-world.md)). Name the maintenance tasks and rotate them.
- **Forks:** CC BY-SA and MIT mean anyone can copy the project and go their own way. That's a feature: exit is always possible, which keeps the group honest.
- **Too much process for a small group:** start with the operational rules and the keyholders table. Add the rest as the group grows.

## Patterns introduced

### [Any Cell, Any Time](../wiki/patterns/any-cell-any-time.md)
If the unit of contribution is a full set of theory, guide, and governance, only people with a lot of time can contribute, and they end up setting the direction. The action situation above makes "contribute a piece to any cell" an action open to every contributor, and the collective-choice rules decide which threads exist.

> **Therefore:** accept a contribution to any single cell of the table at any time, without waiting for the rest of its row.

## Patterns applied
- [Every Thread at Every Level](../wiki/patterns/every-thread-at-every-level.md): this piece holds the collective-choice and constitutional rules; operational rules live in the guide.
- [Every Page Links Out](../wiki/patterns/every-page-links-out.md): an information rule. Each decision in the log links to its proposal and its pull request.
- [Two Keyholders](../wiki/patterns/two-keyholders.md): the keyholders table, and the open action to add a second person as a GitHub owner.
- [Talk Before You Enforce](../wiki/patterns/talk-before-you-enforce.md): objections go to a meeting before any vote; the only automatic consequence is reverting an unreviewed merge.
- [Patterns Are Tested in Practice](../wiki/patterns/patterns-are-tested-in-practice.md): this project is the first test of its own patterns. Problems found here should change the patterns.

## Adopting the charter

The rules above are the charter. At the first members' meeting, fill in the bracketed placeholders, record the date and the members present, and adopt it along with the [operational rules](../guides/contributing.md#operational-rules). From then on it changes only under the constitutional rules.

## In this thread
- **Thread:** institutions · [the table](../index.md)
- **Guides:** [Writing for Let's Recommon IT](../guides/contributing.md)
- **Governance:** [How this project is run](../governance/how-this-project-is-run.md)
- **Theory:** [This repository is a commons](../theory/this-repository-is-a-commons.md)
