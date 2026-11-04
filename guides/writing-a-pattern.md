---
title: "Writing a pattern"
date:                  # YYYY-MM-DD, set at publish
updated:
threads: [design-patterns]   # first thread is the row in the table
difficulty: beginner
status: draft
sources:
  - iba-2014-journey-to-pattern-writing.md
  - iba-2021-practical-guide-pattern-writing.md
  - iba-2016-pattern-language-3.md
  - alexander-1979-timeless-way-of-building.md
patterns:
  - wiki/patterns/solution-first.md
patterns_applied:
  - wiki/patterns/a-language-users-can-speak.md
  - wiki/patterns/patterns-are-tested-in-practice.md
---

## What you'll build

One pattern page in this site's format, written from experience: yours, your group's, or someone you interview. The steps follow the order Takashi Iba teaches with his Pattern Writing Sheet ([Iba 2014](../bibliography/iba-2014-journey-to-pattern-writing.md)), which starts with the solution and ends with the name. Each step shows how [Two Keyholders](../wiki/patterns/two-keyholders.md) was written that way.

It doesn't take a specialist. In Iba's workshops, businesspeople and students write patterns from their own work in a three-hour session.

## Prerequisites

- Something you know works, from running a server, a group, or a project
- The pattern template: `templates/wiki-pattern.md`
- A look at the pattern table in [`index.md`](../index.md), so you don't rewrite a pattern that exists
- For submitting it: [Writing for Let's Recommon IT](contributing.md)

## Steps

### 1. Choose a subject and gather experience

Pick a thread and a theme within it: shared servers, backups, meetings, onboarding. Then collect what you know. Iba's lab uses three ways of mining ([Iba, "Pattern Language 3.0"](../bibliography/iba-2016-pattern-language-3.md)):

- **On your own or in a group:** write each rule, tip, or habit you think matters on its own sticky note or line. In a group, take turns reading them out until nobody has more. Then group the notes by what they're really about, not by surface category.
- **Interviewing someone:** ask what they most want to pass on to newcomers. Then ask what happens when people don't do it, and when it matters most.
- **A workshop:** collect problems and solutions on different-colored notes, and pair each problem with a solution.

Each group of notes is the seed of a pattern. Pick one.

> *Two Keyholders:* the subject was running a shared server. The note that stood out: "make sure someone else can get in."

### 2. Write the solution

Write one sentence that says what to do and how ([Iba 2021](../bibliography/iba-2021-practical-guide-pattern-writing.md)). Start it with "Therefore," and use the imperative. Keep it general enough to apply to more than one system, and leave tool names out. Don't use the pattern's name; it doesn't have one yet.

> **Therefore, give at least two people full admin access to every shared system, and make sure both of them use it regularly.**

Check: is the "how" something a newcomer wouldn't think of? "Make sure both use it regularly" is the part that's easy to miss.

### 3. List the actions

Give two to four concrete examples of the solution. This is where commands, tools, and specifics go.

> Write down where credentials and recovery information live... Have the second keyholder do routine tasks now and then.

### 4. Write the problem

Ask what happens in this situation when the solution isn't there. Describe what tends to go wrong, without blaming the reader for it.

> When one person holds all the admin access, the system depends on that person.

### 5. Write the context

One sentence: when does this pattern become useful? Leave out anything that's true of every pattern on the site.

> A server, service, or network that more than one person depends on, run by volunteers.

### 6. List the forces

Why is the problem hard? Forces are tendencies you can't just remove: how people behave, what things cost, how systems work. Cite sources here.

> Most community tech starts with one enthusiastic person who sets it up, so access starts out concentrated.

### 7. Write the consequences

What changes when the solution is used? Include the side effects and costs too.

> **Negative:** more people with full access means more trust is needed and more ways for credentials to leak.

### 8. Name it, then introduce it

Now name it: a few ordinary words that capture the solution. Say the name aloud. Could you use it in a meeting? Then write a one-sentence introduction that makes a reader want to read on ([A Language Users Can Speak](../wiki/patterns/a-language-users-can-speak.md)).

> **Two Keyholders.** *No shared system should depend on one person.*

### 9. Place it

- Set `thread` and `level`. The level decides which kind of piece introduces it: a guide for operational, a governance piece for collective-choice or constitutional, a theory essay for metaconstitutional.
- Compare your context and problem with existing patterns. If they match one, you've found a new solution to an old pattern, or the same pattern twice. Merge them.
- Fill in `larger_patterns` and `smaller_patterns`, and update the other patterns so the links go both ways.

### 10. Submit it

Copy the template to `wiki/patterns/<slug>.md`, fill it in, and follow [Contribute a pattern](contributing.md#contribute-a-pattern) in the contributing guide.

## Verify it works

Read the page from top to bottom, as a reader would:

- [ ] The solution says both what to do and how, in one sentence, with no metaphors and no pattern name
- [ ] The solution still works when the forces are present
- [ ] The problem describes what goes wrong without the solution, and doesn't blame anyone
- [ ] The context says when the pattern applies and nothing more
- [ ] Commands and tool names are in the Actions, not the Solution
- [ ] The consequences include at least one cost
- [ ] Someone outside the field could say the name and explain the pattern after one reading

## Maintenance

- When you apply the pattern somewhere and it doesn't fit, revise it and say why in the commit message ([Patterns Are Tested in Practice](../wiki/patterns/patterns-are-tested-in-practice.md)).
- If the Solution changes, update it everywhere it's quoted. `grep -rn "<pattern-slug>" --include=*.md .` finds them.

## Community considerations

- **Writing together:** patterns mined by a group carry more than one person's view. Iba's lab mines in groups so patterns don't reflect only one person's values.
- **Review:** new patterns are workshopped before they leave draft. See [Who decides what becomes a pattern?](../governance/who-decides-what-becomes-a-pattern.md)
- **Iba's sheet:** the Pattern Writing Sheet is licensed CC BY-NC-SA, which isn't compatible with this site's CC BY-SA. Link to it in [Iba 2014](../bibliography/iba-2014-journey-to-pattern-writing.md), but don't copy it into the repository.

## Patterns introduced

### [Solution First](../wiki/patterns/solution-first.md)
The steps above run backwards from how a pattern is read. Alexander found patterns that way, starting from what worked and asking why, and Iba built his writing sheet around the same order. Starting from the solution keeps the part worth sharing at the center.

> **Therefore:** write the solution first and the name last, by starting from the one thing you most want to share and working back to the problem it solves and the context where it applies.

## Patterns applied
- [A Language Users Can Speak](../wiki/patterns/a-language-users-can-speak.md): step 8 and the last check in Verify. Names and introductions are written for people outside the field.
- [Patterns Are Tested in Practice](../wiki/patterns/patterns-are-tested-in-practice.md): step 1 mines patterns from experience, and Maintenance revises them when they don't fit.

## Further reading
- [Iba, "A Practical Guide on Pattern Writing"](../bibliography/iba-2021-practical-guide-pattern-writing.md): sentence forms and checkpoints for every element
- [Alexander, *The Timeless Way of Building*](../bibliography/alexander-1979-timeless-way-of-building.md), chapter 14, "Patterns Which Can Be Shared"

## In this thread
- **Thread:** design-patterns · [the table](../index.md)
- **Guides:** [Writing a pattern](../guides/writing-a-pattern.md)
- **Governance:** [Who decides what becomes a pattern?](../governance/who-decides-what-becomes-a-pattern.md)
- **Theory:** [A pattern language for community tech](../theory/a-pattern-language-for-community-tech.md)
