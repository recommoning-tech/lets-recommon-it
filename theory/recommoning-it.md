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

## The tools we depend on belong to someone else

Our photos, messages, calendars, and documents sit on servers owned by a handful of companies, under terms of service we never negotiated. When a company changes the rules, raises prices, or shuts a service down, we adapt or leave, and leaving usually means losing our data and our connections. This is how the business works.

<!-- Author: personal example here? A service you lost, or a moment you realized how dependent you were. -->

It has happened before. Over several centuries, English land that villagers had used in common was fenced off and turned into private property: *enclosure*. [Silvia Federici](../bibliography/federici-2004-caliban-and-the-witch.md) and [Peter Linebaugh](../bibliography/linebaugh-2008-magna-carta-manifesto.md) show that enclosure recurs whenever something shared becomes valuable enough to take. The early internet and free software were built in a commons spirit. [Giorgio Griziotti](../bibliography/griziotti-2018-neurocapitalism.md) describes how platforms captured that collective intelligence and turned our attention, relationships, and knowledge into raw material. [Generative AI continues the pattern](../bibliography/griziotti-2026-how-to-survive-artificial-intelligence.md): it is trained on the shared record of human writing and art, then sold back to us by a few companies that control the hardware.

## Recommoning

Linebaugh: there is no commons without commoning. A commons is a group of people who share something, plus the practices they use to look after it. To *recommon* IT is to build the practices, skills, and institutions that let communities hold their technology in common again. Open source and self-hosting help, but on their own they stay individual projects.

[Ivan Illich](../bibliography/illich-1973-tools-for-conviviality.md) argued that tools past a certain size stop serving people and start controlling them. This site works at three scales: personal (learning the skills), household (sharing with the people you live with), and community (a neighborhood, club, co-op, or small organization). Each step adds people, and with people come questions about who decides.

Owning the hardware doesn't answer those questions. If one person holds every password and makes every decision, a community server is a small fiefdom, and it collapses when that person burns out or moves away. Elinor Ostrom showed that communities manage shared resources well when they have rules about who belongs, who can do what, how decisions are made, and how disputes are settled. Her [Institutional Analysis and Development framework](../bibliography/ostrom-2005-understanding-institutional-diversity.md) is a way to analyze those rules in any shared system. So every technical question on this site comes with a governance question.

## A pattern language for community tech

Christopher Alexander's [*A Pattern Language*](../bibliography/alexander-1977-pattern-language.md) collected 253 linked patterns, each naming a recurring problem and its solution, so that the people who would live in a place could design it themselves. [*Notes on the Synthesis of Form*](../bibliography/alexander-1964-notes-on-the-synthesis-of-form.md) grounds design in *fit*: what goes wrong in real use. [*The Timeless Way of Building*](../bibliography/alexander-1979-timeless-way-of-building.md) adds that good places grow piecemeal, through repair. [David Bollier and Silke Helfrich](../bibliography/bollier-helfrich-2019-free-fair-and-alive.md) have described commoning as a pattern language. This site does the same for community-scale IT, starting with three patterns for how the site itself is built.

## Patterns

### [Theory, Practice, Governance](../wiki/patterns/theory-practice-governance.md)
An idea is empty without a way to build it, and a thing others depend on is a commons only if there are rules for running it together. Most writing about technology covers one of these and leaves out the others.

> **Therefore:** present every topic in three linked parts: the idea and the patterns that follow from it, a guide that builds a concrete example, and the governance processes for running it as a commons.

### [Every Page Links Out](../wiki/patterns/every-page-links-out.md)
A commons is a set of relationships, and [so is knowledge](../bibliography/hess-ostrom-2007-understanding-knowledge-as-a-commons.md). A guide cut off from its reasons becomes a recipe; a theory cut off from practice becomes a slogan.

> **Therefore:** every page links to the other parts of its release, to the patterns it introduces or applies, and to the sources it draws on. A page with no links out isn't finished.

### [Patterns Are Tested in Practice](../wiki/patterns/patterns-are-tested-in-practice.md)
Patterns that come only from argument drift toward abstraction. Alexander's came from watching what worked in real places. Here, theory essays propose patterns, and guides and governance pieces test them.

> **Therefore:** every pattern is introduced in a theory essay and applied by name in at least one guide or governance piece. When a pattern doesn't fit what happens in practice, revise the pattern and note why.

### How the patterns fit together
Theory, Practice, Governance sets the shape of each release. Every Page Links Out holds the parts together, and Patterns Are Tested in Practice ties each pattern to real use. Each thread's release adds its own patterns, starting with [Small Enough to Understand](../wiki/patterns/small-enough-to-understand.md) and [Two Keyholders](../wiki/patterns/two-keyholders.md) in Release 001.

## How this site works

Each main thread gets one release: liberatory technology, institutions, privacy, AI, commons and enclosure, Big Tech, open source, and labor and care. Every release has a theory essay with its patterns, a guide, and a governance piece. Alongside them are a pattern wiki, an annotated bibliography, and occasional commentary. This is Release 000. Its [guide](../guides/contributing.md) explains how to write for the site, and its [governance piece](../governance/how-this-project-is-run.md) explains how the project runs.

## An invitation

<!-- Author: close in your own voice. What do you want a reader to do after reading? Suggested: start with one service for your household, then ask who else could share it. -->

All content here is licensed CC BY-SA 4.0 and all code MIT. Take it, adapt it, share it back.

## In this release
- **Release:** [000 Design Patterns: Recommoning IT](../releases/000-design-patterns.md)
- **Theory & patterns:** [What does it mean to recommon IT?](../theory/recommoning-it.md): [Theory, Practice, Governance](../wiki/patterns/theory-practice-governance.md), [Every Page Links Out](../wiki/patterns/every-page-links-out.md), [Patterns Are Tested in Practice](../wiki/patterns/patterns-are-tested-in-practice.md)
- **Guide:** [Writing for Let's Recommon IT](../guides/contributing.md)
- **Governance:** [How this project is run](../governance/how-this-project-is-run.md)
