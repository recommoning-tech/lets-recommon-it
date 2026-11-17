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
  - wiki/patterns/workshop-the-pattern.md
status: draft          # proposal; members adopt the charter below at the first meeting
---

<!-- Bracketed [placeholders] are for the founding members to fill in together. Author notes mark answers only the author can give. -->

## The situation

Let's Recommon IT is a commons of writing, patterns, and code, run collectively from the start. If it can't follow its own advice on governing commons, readers have no reason to. Right now one founding member wrote most of the content and holds every account, which is the situation [Two Keyholders](../wiki/patterns/two-keyholders.md) warns about. This document sets up shared decision-making while the group is small and changes are cheap.

It is the [charter worksheet](../guides/charter-worksheet.md) filled in for this project, followed by the charter that comes out of it. The charter holds the rules at every level, from reviewing a pull request to ending the project. How to contribute is in the [contributing guide](../CONTRIBUTING.md). Why the project is organized in levels is in [This repository is a commons](../theory/this-repository-is-a-commons.md).

## Analysis

The project as an IAD action situation ([*Understanding Institutional Diversity*](../bibliography/ostrom-2005-understanding-institutional-diversity.md)):

| IAD part | For this project |
|---|---|
| **Participants** | Members, contributors, readers |
| **Positions** | **Member:** shares in decisions and review. **Keyholder:** a member who holds admin access to an account. **Contributor:** submits work but doesn't vote. **Reader.** |
| **Actions** | Contribute a piece or pattern to any cell of [the table](../index.md), review, merge, publish, change templates or structure, add threads, admit members, manage accounts |
| **Information** | Decisions and their reasons are recorded publicly in [decision log location], each linked to its proposal and the pull request that carried it out. Drafts are visible to members on GitHub. |
| **Control** | Merging to `main` publishes. Account access (GitHub, domain, email) controls everything else. |
| **Outcomes** | Published pieces, a growing pattern language, a healthy group |
| **Costs & benefits** | Costs: domain, email, time. Benefits: the work, the skills, the network. |

## The worksheet, filled in

### Part 1: The project and its purpose

#### 1. What resource or value is this project meant to affect, and how?

- **Resource:** a shared body of writing, patterns, and code about community-scale IT, and the shared vocabulary of pattern names that comes with it.
- **Value:** technology held and governed by the people who use it.
- **Now:** guides for running shared tech mostly skip who decides, who does the upkeep, and what happens when people leave ([Who holds root?](who-holds-root.md)). <!-- Author: anything else missing without this project, in your words. -->
- **When it's working:** a group setting up shared tech can find a guide, the rules, and the reasons in one place and adapt them. More than one person writes and reviews here.
- **Used up?** The writing isn't: copying it costs nothing. What gets used up is members' time and attention, and the coherence of the pattern vocabulary if patterns pile up unreviewed.
- **Keeping people out:** readers can't and shouldn't be kept out; content is CC BY-SA 4.0 and code is MIT. Only merging to `main` is limited, to members.
- **Not for:** [scope exclusions].

#### 2. What actions are needed?

- **Using it:** reading, contributing a piece or pattern to any cell, adding bibliography entries, applying patterns in other pieces.
- **Keeping it going:** reviewing pull requests, workshopping patterns, fixing links, updating site dependencies, renewing the domain, holding meetings, recording decisions.
- **Allowed, required, not allowed:** set in the charter below.
- **Information:** the [contributing guide](../CONTRIBUTING.md), `templates/`, and the site build, which lists any front matter mismatch.

#### 3. Who will do them?

- **Roles:** reader, contributor, member, keyholder (see Analysis).
- **Now:** one founding member holds every role and every account. Both GitHub owner accounts are theirs.
- **Joining:** a contributor becomes a member by [invitation from an existing member and consensus of members].
- **Paid or volunteer:** [volunteer]. <!-- Author: confirm nobody is paid. -->
- **Unseen work:** review, link fixing, dependency updates, and renewals ([Eghbal](../bibliography/eghbal-2020-working-in-public.md); [Federici](../bibliography/federici-2019-re-enchanting-the-world.md)).

#### 4. Who decides, and how?

- **One person:** routine maintenance and merging a reviewed pull request.
- **The group:** templates, threads, the table's structure, and the operational rules, by lazy consensus. Objections go to a members' meeting.
- **Discussion:** in [issues / discussions] first, then at the meeting ([Talk Before You Enforce](../wiki/patterns/talk-before-you-enforce.md)).
- **Records:** decisions go in [decision log location], each linked to its proposal and its pull request ([Every Page Links Out](../wiki/patterns/every-page-links-out.md)). Until that exists, pull request descriptions and commit history are the record.

#### 5. What are the costs and benefits?

- **Money:** domain registration at Cloudflare ([amount] per year) and Proton email ([plan, amount]). GitHub hosting and builds cost nothing for a public repository.
- **Time:** writing, review, maintenance, meetings.
- **Who pays:** [who]. <!-- Author: currently you? Say so; it belongs in the founder-dominance risk. -->
- **Benefits:** the work itself, skills, and a network of people doing this.
- **Balance:** today the founding member carries nearly all costs. The charter's goal is to spread them.

#### 6. How will we know it is working?

- A second person is a keyholder on every account.
- Pull requests are reviewed by someone other than their author.
- Pieces in the table come from more than one author.
- Patterns reach `tested`: applied in a piece besides the one that introduces it.
- [A group outside the project uses a guide or the worksheet.]
- All of these can be seen in the repository. The site makes no third-party requests and needs no visitor tracking to answer them.
- **Checked by:** members at the [monthly] meeting. **First review:** [date].

#### 7. What happens if it isn't working?

- Any member can ask for a review at the next meeting. The group can change the rules, pause new work, or end the project.
- Ending follows the dissolution rule in the charter.
- Anyone who disagrees with the direction can fork. The licenses guarantee it.

#### 8. Who monitors and enforces, and how?

- **Review:** every pull request is approved by a member other than its author.
- **Automated check:** the site build runs on every pull request and fails on front matter mismatches.
- **First response:** a comment on the pull request, or a note in [channel].
- **Escalation:** the next members' meeting, then a [two-thirds] vote. The only automatic consequence is reverting an unreviewed merge.
- **Disputes:** at the members' meeting.

#### 9. How will this charter change?

- Charter changes take [consensus] of members at a meeting. Changes to operational and collective-choice rules take lazy consensus.
- The whole charter is reviewed every [period].
- Licenses can't be changed to non-free ones.
- **Larger bodies:** the project has no parent organization. <!-- Author: confirm (no fiscal sponsor). --> GitHub's, Cloudflare's, and Proton's terms of service apply to the accounts the project depends on.

#### 10. Why is this important?

A project about governing technology as a commons has to govern itself that way, or its advice is untested. <!-- Author: why this matters to you, in your own words. -->

#### 11. What other resources and values does this touch?

- **Depends on:** volunteer time, GitHub, Cloudflare, Proton, and the AI tools used in drafting.
- **Crowds out:** members' time for other work, including their own tech.
- **Values that pull against each other:**
  - Open copying and forking versus a coherent pattern vocabulary.
  - Drafting with AI tools versus sources that are critical of AI ([Griziotti](../bibliography/griziotti-2026-how-to-survive-artificial-intelligence.md)).
  - Hosting on GitHub versus the project's own critique of big tech.
- **Outside the group:** readers and the groups that adopt what's written here.

#### 12. What ethical considerations are there?

- **Founder dominance:** one person wrote most of the work and holds every account.
- **Who's left out:** contributing assumes git and a GitHub account.
- **AI drafting:** AI-drafted text stays in draft until a member rewrites or reviews it, and citations are checked against a publisher or library record.
- **Credit:** contributors are credited by name or handle, as they prefer.

### Part 2: The technology

#### 13. What technologies, and who uses them?

- **Content:** Markdown with YAML front matter, in git.
- **GitHub:** the `recommoning-tech` organization holds the repository, pull requests, and issues. Used by members and contributors.
- **Website:** Astro in `site/`, built and checked by GitHub Actions, hosted on GitHub Pages from `main`. Fonts are self-hosted.
- **Domain:** `lets-recommon-it.com`, registered at Cloudflare. DNS is at Cloudflare, set to DNS only, not proxied. Used by keyholders only.
- **Email:** Proton. Used by keyholders.
- **Drafting:** AI coding assistants, used by the founding member.
- **Leaving:** content is plain Markdown and the site is static, so both can move to any git host and static host. Issue and pull request history is harder to move.
- **Weekend test:** a second member could learn to edit Markdown and run the build in a weekend. [Whether they could also manage the site's code and the DNS in a weekend.]

#### 14. How are users and admins given access?

- **Contributors:** fork and open a pull request; no access needed.
- **Members:** write access to the repository, granted by an owner after the membership decision.
- **Keyholders:** owner on the GitHub organization; admin on Cloudflare and Proton. See the keyholders table.
- **Leaving:** access is removed within [time] by a keyholder.
- **Recovery:** [shared password vault], not yet set up.

#### 15. How do we make sure people can use it?

- The [contributing guide](../CONTRIBUTING.md), templates for every kind of piece, an "Edit this page" link on every page, open cells that link to a new file pre-filled from the right template, and a build that lists any mismatch.
- **Barrier:** git and GitHub. [A route for people who don't use git, such as sending a draft by email.]
- **Least technical member:** [not yet tested].

#### 16. Who develops and maintains it?

- **Now:** the founding member does all of it.
- **Tasks:** site dependency updates, domain renewal, DNS, link fixes, review. [How often each.]
- **Cover:** [who covers when the maintainer is away].
- **Handover:** `README.md`, `CONTRIBUTING.md`, and `CLAUDE.md` describe the structure. [A maintainer's checklist.]

#### 17. How are features suggested and added?

Proposed in [issues / discussions]. Changes to templates, threads, and the table's structure pass by lazy consensus. A proposal should say what upkeep it adds.

#### 18. How are bugs addressed?

Reported in GitHub issues. [Expected response time.] Front matter errors are caught by the build before merging.

#### 19. How do maintainers communicate changes and outages?

- Structural changes get at least [7] days' notice through the lazy consensus period.
- Outages: [channel]. Because the site is on GitHub Pages, the channel needs to be somewhere other than GitHub.
- Content changes are visible in the commit history.

#### 20. Who makes the rules about technical changes?

- **Any member, with review:** routine fixes and dependency updates.
- **Lazy consensus:** templates, threads, the table's structure, site features.
- **Charter change:** moving the host, domain, registrar, or email provider, and anything about licenses.
- **Keyholders:** appointed and removed by [consensus of members].

#### 21. Is it accessible?

- The site is static HTML with a dark mode. Pattern illustrations get alt text written before they're drawn.
- **Not yet checked:** screen reader use, contrast in both themes, and how readable the handwriting font is. [Who checks, by when.]
- **Contributing** needs git, which leaves many people out (step 15).

#### 22. Is it ethical with data?

- The site makes no third-party requests. [Whether any analytics are used.] <!-- Author: confirm none. -->
- GitHub Pages serves the site under GitHub's own privacy policy. Cloudflare only answers DNS and doesn't proxy visits.
- **Contributors:** names, handles, and commit email addresses in git history are public and effectively permanent. [Recommend GitHub's noreply address for commits.]
- **Leaving:** contributions stay under the project licenses. Git history can't practically be rewritten.

#### 23. What else does the technology carry with it?

- GitHub is owned by Microsoft, a company whose goals differ from the project's. Plain Markdown in git keeps leaving possible.
- AI tools carry environmental and political costs the project's own sources describe. The static site itself is light.

### Part 3: Design principles check

| # | Principle | Answer | One change |
|---|---|---|---|
| 1 | Clear boundaries | Partly. Roles are defined; the membership rule isn't adopted. | Adopt the membership rule at the first meeting. |
| 2 | Rules fit local conditions | Partly. Rules are sized for a small group, but one person carries the costs. | Name who pays for what (step 5). |
| 3 | Collective-choice arrangements | Not yet. There is one member. | Admit a second member. |
| 4 | Monitoring | Partly. The build checks front matter; review by another member isn't possible yet. | Founder-merged pull requests are listed for the first meeting. |
| 5 | Graduated sanctions | Yes, on paper: comment, meeting, vote, revert. | None until it's tested. |
| 6 | Conflict resolution | Yes, on paper: the members' meeting. | Set the meeting schedule. |
| 7 | Recognized right to organize | Partly. No parent organization, but GitHub, Cloudflare, and Proton can close accounts. | Keep content portable; record how to move hosts. |
| 8 | Nested enterprises | Not applicable yet. | Revisit if the project joins a network. |

## The charter

Adopted [date] by [members present].

### Purpose
Let's Recommon IT exists to build a shared body of writing, patterns, and code about community-scale IT, for groups who want to run their own technology, by writing it and governing it as a commons.
We will know it's working when more than one person writes, reviews, and holds the keys.
It is not for [scope exclusions].

### Members and roles
Members are people admitted under the membership rule below. Contributors are anyone who opens a pull request. Readers are everyone.
- **Member:** shares in decisions and review. Holds write access to the repository.
- **Keyholder:** a member with admin access to an account. Every account has at least two, who are different people.
- **Contributor:** submits work but doesn't vote.

Someone leaves by telling the members. Their access is removed within [time] by a keyholder.

Rules:
- A contributor (A) may (D) become a member (I) by [invitation from an existing member and consensus of members] (C).
- Members (A) may (D) step back (I) at any time (C). Their contributions stay under the project licenses.

### How we use it
Contributors follow the [contributing guide](../CONTRIBUTING.md). Any cell of the table can be filled at any time ([Any Cell, Any Time](../wiki/patterns/any-cell-any-time.md)).

Rules:
- **Review:** members (A) must (D) get approval from at least one other member (I) before merging a pull request to `main` (C), or else the merge is reverted (O).
  - *Until there are two members:* the founding member merges their own pull requests, and each such merge is listed for review at the first members' meeting.
- **Merging:** pull requests are merged with a merge commit, not squashed.
- **Drafts:** anything with `status: draft` may be merged to `main`. Changing it to `published` requires review by a member other than the author.
- **Patterns:** members (A) must not (D) change a pattern from `draft` to `workshopped` (I) until at least two readers besides the author have discussed it (C), or else the status change is reverted (O) ([Workshop the Pattern](../wiki/patterns/workshop-the-pattern.md); the full pattern rules are in [Who decides what becomes a pattern?](who-decides-what-becomes-a-pattern.md)).
- **AI assistance (proposed):** contributors (A) must (D) note in the pull request (I) when a draft was substantially written with AI tools (C), or else the pull request isn't merged until they do (O).
  - AI-drafted text stays `status: draft` until a member has rewritten or reviewed it in their own voice.
  - Citations produced with AI help must be checked against a publisher or library record before publishing.

### How we decide
Any member can decide routine maintenance and merge a reviewed pull request.
Changes to templates, threads, the table's structure, or the rules in "How we use it" are decided by lazy consensus.
Discussion happens in [issues / discussions] before any decision.

Rules:
- **Lazy consensus:** a member (A) may (D) adopt a proposal posted in [issues / discussions] (I) if no member objects within [7] days (C).
- **Objections:** members (A) must (D) take an objected proposal to the next members' meeting (I) and look for a version everyone can accept (C), or else [two-thirds] of members decide (O).
- **Meetings:** members meet [monthly] by [video / in person]. Notes go in the decision log.
- **Records:** members (A) must (D) record each decision in [decision log location] with links to its proposal and pull request (I) within [time] of making it (C).

### Costs
The project costs about [amount] per year in money (domain and email) and [hours] per [period] in time.
Money is covered by [who, how]. Time is shared among members, and maintenance tasks rotate.

### Upkeep
[Names] maintain the site. [Names] cover when they are away.
Dependency updates happen [how often] and are done by [who]. The domain renews [date] and is handled by a keyholder.
Feature requests and bugs go in GitHub issues. Members can expect a response within [time].
Changes and outages are announced in [channel], which doesn't depend on GitHub.

Rules:
- Maintainers (A) must (D) announce planned changes to the site's structure (I) at least [7] days ahead through lazy consensus (C), or else the change is reverted (O).

### Technical changes
Any member can make routine fixes and dependency updates, with review.
Templates, threads, the table's structure, and site features change by lazy consensus.
Moving the host, domain, registrar, or email provider is a charter change.
Keyholders are appointed and removed by [consensus of members].

#### Keyholders

| Account | Keyholders | Status |
|---|---|---|
| GitHub organization `recommoning-tech` | `recommon-it` (owner), `jordaninskeep` (owner) | Both owner accounts belong to the founding member, which guards against losing one account but not against losing the person. **Action needed:** a second member as owner. |
| Domain and DNS (Cloudflare) | [member], [member] | Registered. [Second keyholder needed.] |
| Email (Proton) | [member], [member] | Set up. [Second keyholder needed.] |
| Shared password vault | [member], [member] | Not yet set up |

### Data and access
The site makes no third-party requests and collects [no analytics]. GitHub serves it under GitHub's privacy policy.
Contributors' names, handles, and commit emails are public in git history. Contributors are credited by name or handle, as they prefer.
We check the site with [screen reader, contrast check] every [period].

### Checking in
Members check the signs in step 6 at the [monthly] meeting.
Problems are raised first on the pull request or in [channel] ([Talk Before You Enforce](../wiki/patterns/talk-before-you-enforce.md)).
If a problem continues, it goes to the next meeting, then to a [two-thirds] vote.
Any member can call a review of the whole project. The group may change the rules, pause new work, or end the project.
First review: [date].

### Changing this charter
Any member can propose a change in [issues / discussions].
Changes are adopted by [consensus] of members at a meeting, after [14] days' notice.
The whole charter is reviewed every [period].

Rules:
- **Licensing:** members (A) must not (D) change the content license from CC BY-SA 4.0 or the code license from MIT to a non-free license (I) under any conditions (C). (CC BY-SA content can't be relicensed without its authors' consent anyway.)
- **Dissolution:** if the project ends, the repository is archived publicly, or handed to another commons-oriented group that agrees to keep the licenses. Keyholders transfer or close the domain and accounts.

## Risks and trade-offs

- **Founder dominance:** "collective from the start" is collective in name only if one person wrote everything and holds every account. Counter it with a second keyholder who is a different person, review by other members, and the first meeting's review of founder-merged pull requests.
- **Consensus paralysis:** lazy consensus with a deadline, and a fallback vote, keep decisions moving.
- **Volunteer burnout:** writing is visible; maintenance (fixing links, reviewing, renewing the domain) usually isn't ([Eghbal](../bibliography/eghbal-2020-working-in-public.md); [Federici](../bibliography/federici-2019-re-enchanting-the-world.md)). Name the maintenance tasks and rotate them.
- **Forks:** CC BY-SA and MIT mean anyone can copy the project and go their own way. That's a feature: exit is always possible, which keeps the group honest.
- **Too much process for a small group:** start with "How we use it" and the keyholders table. Add the rest as the group grows.

## Patterns introduced

### [Any Cell, Any Time](../wiki/patterns/any-cell-any-time.md)
If the unit of contribution is a full set of theory, guide, and governance, only people with a lot of time can contribute, and they end up setting the direction. The action situation above makes "contribute a piece to any cell" an action open to every contributor, and the collective-choice rules decide which threads exist.

> **Therefore:** accept a contribution to any single cell of the table at any time, without waiting for the rest of its row.

## Patterns applied
- [Every Thread at Every Level](../wiki/patterns/every-thread-at-every-level.md): the worksheet and the charter both work through every level, from reviewing a pull request to ending the project.
- [Every Page Links Out](../wiki/patterns/every-page-links-out.md): an information rule. Each decision in the log links to its proposal and its pull request.
- [Two Keyholders](../wiki/patterns/two-keyholders.md): the keyholders table, and the open action to add a second person as a GitHub owner.
- [Talk Before You Enforce](../wiki/patterns/talk-before-you-enforce.md): objections go to a meeting before any vote; the only automatic consequence is reverting an unreviewed merge.
- [Workshop the Pattern](../wiki/patterns/workshop-the-pattern.md): the pattern rule in "How we use it".
- [Patterns Are Tested in Practice](../wiki/patterns/patterns-are-tested-in-practice.md): this project is the first test of its own patterns. Problems found here should change the patterns.

## Adopting the charter

At the first members' meeting, fill in the bracketed placeholders, record the date and the members present, and adopt the charter. From then on it changes only under "Changing this charter".
