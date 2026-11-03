---
title: "What does it mean to recommon IT?"
date:                  # YYYY-MM-DD, set at publish
release: 000-design-patterns
threads: [design-patterns, commons, institutions, liberatory-tech, ai]
sources:
  - linebaugh-2008-magna-carta-manifesto.md
  - federici-2004-caliban-and-the-witch.md
  - griziotti-2018-neurocapitalism.md
  - griziotti-2026-how-to-survive-artificial-intelligence.md
  - illich-1973-tools-for-conviviality.md
  - ostrom-2005-understanding-institutional-diversity.md
  - hess-ostrom-2007-understanding-knowledge-as-a-commons.md
  - alexander-1964-notes-on-the-synthesis-of-form.md
  - alexander-1977-pattern-language.md
  - alexander-1979-timeless-way-of-building.md
  - bollier-helfrich-2019-free-fair-and-alive.md
patterns:
  - wiki/patterns/theory-practice-governance.md
  - wiki/patterns/every-page-links-out.md
  - wiki/patterns/patterns-are-tested-in-practice.md
status: draft          # rough draft for the author to rewrite in their own voice
---

<!--
OUTLINE
1. Hook: the tools we depend on belong to someone else
2. Enclosure: the commons were taken before, and digital tools were taken the same way
3. Commoning is a verb
4. Scale: personal → household → community
5. Owning the hardware is not enough: institutions
6. A pattern language for community tech (Alexander)
7. Patterns: Theory, Practice, Governance → Every Page Links Out; Patterns Are Tested in Practice
8. How this site works
9. Invitation
-->

## The tools we depend on belong to someone else

Most of us run our lives through systems we don't own and can't change. Our photos, messages, calendars, and documents sit on servers owned by a handful of companies. The rules are written in terms of service we never negotiated. When a company changes those rules, raises prices, or shuts a service down, we adapt or leave. Leaving usually means losing our data and our connections.

This is not an accident or a temporary phase. It is how the business works.

<!-- Author: personal example here? A service you lost, or a moment you realized how dependent you were. -->

## This has happened before

The word *enclosure* comes from English history. Over several centuries, land that villagers had used in common, for grazing, firewood, and food, was fenced off and turned into private property. Commoners lost not only resources but a way of life and a say in how it was run. [Silvia Federici](../bibliography/federici-2004-caliban-and-the-witch.md) and [Peter Linebaugh](../bibliography/linebaugh-2008-magna-carta-manifesto.md) both show that enclosure was not a single event. It is a process that repeats whenever something shared becomes valuable enough to take.

The early internet and free software were built in a commons spirit. Protocols were open, code was shared, and anyone could run a server. [Giorgio Griziotti](../bibliography/griziotti-2018-neurocapitalism.md) describes how that collective intelligence was gradually captured by platforms that turned our attention, relationships, and knowledge into raw material. [Generative AI continues the pattern](../bibliography/griziotti-2026-how-to-survive-artificial-intelligence.md). It is trained on the shared record of human writing and art, then sold back to us through a few companies that control the hardware.

## Commoning is a verb

Linebaugh puts it simply: there is no commons without commoning. A commons is not just a resource. It is a group of people who share something and the practices they use to look after it together.

That is what *recommon* means here: building the practices, skills, and institutions that let communities hold their information technology in common again. It is not just "use open source" or "self-host your apps." Those can help, but on their own they can remain individual projects. One person's homelab doesn't recommon anything.

## The right scale

[Ivan Illich](../bibliography/illich-1973-tools-for-conviviality.md) argued that tools past a certain size stop serving people and start controlling them. He called for *convivial* tools that people can understand, use, and adapt for themselves.

This site works at three scales:

- **Personal:** learning the skills. Running a server, understanding a network.
- **Household:** sharing with the people you live with. Family photos, shared calendars, a password manager.
- **Community:** a neighborhood, a club, a co-op, a small organization. This is where the hard and interesting problems are, because now the system belongs to more than one person.

Each step up adds people, and with people come questions about who decides.

## Owning the hardware is not enough

A community server can be run as badly as any platform. If one person holds every password, makes every decision, and does all the work, it's a small fiefdom with a friendly ruler. When that person burns out or moves away, the whole thing collapses.

Elinor Ostrom spent her career studying how communities govern shared resources. She showed that people can and do manage commons well, but only with the right institutions: rules about who belongs, who can do what, how decisions are made, and how disputes are settled. Her [Institutional Analysis and Development framework](../bibliography/ostrom-2005-understanding-institutional-diversity.md) gives us a way to look at any shared system and ask: who participates, what positions exist, and what rules apply at each level?

So every technical question on this site comes with a governance question.

## A pattern language for community tech

Christopher Alexander's [*A Pattern Language*](../bibliography/alexander-1977-pattern-language.md) collected 253 patterns for building towns and houses. Each named a recurring problem and a solution, and each linked to larger patterns it helped complete and smaller ones that completed it. He wrote it so that the people who would live in a place could design it themselves, without depending on experts. The idea later shaped software design and the first wiki.

His earlier [*Notes on the Synthesis of Form*](../bibliography/alexander-1964-notes-on-the-synthesis-of-form.md) explains where patterns come from. Good design is about *fit* between a form and its context, and you find fit by paying attention to what goes wrong in real use. [*The Timeless Way of Building*](../bibliography/alexander-1979-timeless-way-of-building.md) adds that good places grow piecemeal, one repair at a time, not from a master plan.

[David Bollier and Silke Helfrich](../bibliography/bollier-helfrich-2019-free-fair-and-alive.md) have already shown that commoning itself can be described as a pattern language. This site tries to do the same for community-scale IT. Three patterns shape how the site itself is built.

## Patterns

### [Theory, Practice, Governance](../wiki/patterns/theory-practice-governance.md)
The argument so far has three parts that can't be separated. An idea about why something matters is empty without a way to build it. A thing you've built, once others depend on it, is a commons only if there are rules for running it together. Most writing about technology does one of these and leaves the others out: theory without instructions, tutorials without politics, governance without anything to govern.

> **Therefore:** present every topic in three linked parts: the idea and the patterns that follow from it, a guide that builds a concrete example, and the governance processes for running it as a commons.

### [Every Page Links Out](../wiki/patterns/every-page-links-out.md)
A commons is a set of relationships, not a pile of resources. [Knowledge works the same way](../bibliography/hess-ostrom-2007-understanding-knowledge-as-a-commons.md). A guide cut off from the reasons behind it becomes a recipe. A theory cut off from practice becomes a slogan. Alexander's patterns get their strength from their links to larger and smaller patterns.

> **Therefore:** every page links to the other parts of its release, to the patterns it introduces or applies, and to the sources it draws on. A page with no links out isn't finished.

### [Patterns Are Tested in Practice](../wiki/patterns/patterns-are-tested-in-practice.md)
Patterns that come only from reading and argument drift toward abstraction. Alexander's came from watching what worked and what failed in real places. Here, theory essays propose patterns, guides and governance pieces apply them, and what happens in use should change them.

> **Therefore:** every pattern is introduced in a theory essay and applied by name in at least one guide or governance piece. When a pattern doesn't fit what happens in practice, revise the pattern and note why.

### How the patterns fit together
**Theory, Practice, Governance** is the larger pattern: it sets the shape of each release. **Every Page Links Out** holds the three parts together. **Patterns Are Tested in Practice** keeps the pattern language honest by tying each pattern to real use. Below these, each thread's release introduces its own patterns. Release 001, for example, introduces [Small Enough to Understand](../wiki/patterns/small-enough-to-understand.md) and [Two Keyholders](../wiki/patterns/two-keyholders.md).

## How this site works

The site is organized as **releases**, one for each of its main threads: liberatory technology, institutions, privacy, AI, commons and enclosure, Big Tech, open source, and labor and care. Each release has:

1. **Theory & patterns:** why the thread matters for community-scale IT, and the patterns that follow
2. **Guide:** step-by-step instructions for a concrete example: servers, Docker stacks, private networks, self-hosted services
3. **Governance:** how to run it as a group, with the risks and trade-offs

Alongside the releases: a wiki of patterns, an annotated bibliography, and occasional commentary and reviews.

This is Release 000. Its [guide](../guides/contributing.md) explains how to write for the site, and its [governance piece](../governance/how-this-project-is-run.md) explains how the project itself is run, applying its own patterns to itself.

## An invitation

<!-- Author: close in your own voice. What do you want a reader to do after reading? Suggested: start with one service for your household, then ask who else could share it. -->

All content here is licensed CC BY-SA 4.0 and all code MIT. Take it, adapt it, share it back.

## In this release
- **Release:** [000 Design Patterns: Recommoning IT](../releases/000-design-patterns.md)
- **Theory & patterns:** [What does it mean to recommon IT?](../theory/recommoning-it.md): [Theory, Practice, Governance](../wiki/patterns/theory-practice-governance.md), [Every Page Links Out](../wiki/patterns/every-page-links-out.md), [Patterns Are Tested in Practice](../wiki/patterns/patterns-are-tested-in-practice.md)
- **Guide:** [Writing for Let's Recommon IT](../guides/contributing.md)
- **Governance:** [How this project is run](../governance/how-this-project-is-run.md)
