---
title: "How this project is run"
date:                  # YYYY-MM-DD, set at publish
release: 000-design-patterns
threads: [design-patterns, institutions]
sources:
  - ostrom-2005-understanding-institutional-diversity.md
  - crawford-ostrom-1995-grammar-of-institutions.md
  - ostrom-walker-gardner-1992-covenants-with-and-without-a-sword.md
  - ostrom-1990-governing-the-commons.md
  - eghbal-2020-working-in-public.md
  - federici-2019-re-enchanting-the-world.md
patterns_applied:
  - wiki/patterns/theory-practice-governance.md
  - wiki/patterns/patterns-are-tested-in-practice.md
  - wiki/patterns/two-keyholders.md
  - wiki/patterns/talk-before-you-enforce.md
status: draft          # proposal; members adopt the charter below at the first meeting
---

<!-- Bracketed [placeholders] are for the founding members to fill in together. -->

## The situation

Let's Recommon IT is meant to be run collectively from the start. It is a commons of writing, patterns, and code, so it should follow its own advice on governing commons. If it can't, readers have no reason to.

Right now one founding member wrote most of the content and holds every account. That's normal for a new project, and it's the situation [Two Keyholders](../wiki/patterns/two-keyholders.md) warns about. This document sets up shared decision-making now, while the group is small and changes are cheap.

## Analysis

Using Ostrom's IAD framework ([*Understanding Institutional Diversity*](../bibliography/ostrom-2005-understanding-institutional-diversity.md)):

| IAD part | For this project |
|---|---|
| **Participants** | Members, contributors, readers |
| **Positions** | **Member:** shares in decisions and review. **Keyholder:** a member who holds admin access to an account. **Contributor:** submits work but doesn't vote. **Reader.** |
| **Actions** | Write, review, merge, publish, change templates or structure, admit members, manage accounts |
| **Information** | Decisions and their reasons are recorded publicly in [decision log location]. Drafts are visible to members on GitHub. |
| **Control** | Merging to `main` publishes. Account access (GitHub, domain, hosting) controls everything else. |
| **Outcomes** | Published releases, a growing pattern language, a healthy group |
| **Costs & benefits** | Costs: domain, hosting, time. Benefits: the work, the skills, the network. |

## Rules to decide

### Operational rules: day-to-day work
- **Review:** members (A) must (D) get approval from at least one other member (I) before merging a pull request to `main` (C), or else the merge is reverted (O).
  - *Until there are two members:* the founding member merges their own PRs, and each such merge is listed for review at the first members' meeting.
- **Merging:** pull requests are merged with a merge commit, not squashed.
- **Drafts:** anything with `status: draft` may be merged to `main`. Changing it to `published` requires review by a member other than the author.

### Collective-choice rules: changing how the work is done
- **Lazy consensus:** changes to templates, threads, the release plan, or this document's operational rules are proposed in [issues / discussions]. A proposal passes if no member objects within [7] days.
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

## Patterns applied
- [Two Keyholders](../wiki/patterns/two-keyholders.md): the keyholders table, and the open action to add a second person as a GitHub owner.
- [Talk Before You Enforce](../wiki/patterns/talk-before-you-enforce.md): objections go to a meeting before any vote; the only automatic consequence is reverting an unreviewed merge.
- [Theory, Practice, Governance](../wiki/patterns/theory-practice-governance.md): the review rules cover all three parts of a release equally.
- [Patterns Are Tested in Practice](../wiki/patterns/patterns-are-tested-in-practice.md): this project is the first test of its own patterns. Problems found here should change the patterns.

## Template: project charter

Adopt at the first members' meeting.

```markdown
# Let's Recommon IT: Charter

Adopted: [date]. Members present: [names].

## Purpose (scope)
Let's Recommon IT develops and shares knowledge for community-scale information and
communication technology: theory and patterns, guides, and governance.

## Members (boundary)
Current members: [names]. New members join by [rule].

## Roles (position)
- Members review and decide.
- Keyholders: at least two per account (see keyholders table).
- Contributors submit work through pull requests.

## Work (choice + information)
- Every merge to main needs approval from one member other than the author.
- Decisions are recorded in [location].
- AI-assisted drafts are disclosed in the pull request.

## Decisions (aggregation)
- Routine: lazy consensus, [7] days.
- Objections: discussed at the next meeting; fallback [two-thirds] vote.

## Costs (payoff)
[Who pays for domain/hosting; how costs are shared.]

## Changing this charter (constitutional)
By [consensus] of members at a meeting.
Licenses stay CC BY-SA 4.0 (content) and MIT (code).
If the project ends, the repository is archived publicly or handed to a commons-oriented group that keeps the licenses.
```

## In this release
- **Release:** [000 Design Patterns: Recommoning IT](../releases/000-design-patterns.md)
- **Theory & patterns:** [What does it mean to recommon IT?](../theory/recommoning-it.md): [Theory, Practice, Governance](../wiki/patterns/theory-practice-governance.md), [Every Page Links Out](../wiki/patterns/every-page-links-out.md), [Patterns Are Tested in Practice](../wiki/patterns/patterns-are-tested-in-practice.md)
- **Guide:** [Writing for Let's Recommon IT](../guides/contributing.md)
- **Governance:** [How this project is run](../governance/how-this-project-is-run.md)
