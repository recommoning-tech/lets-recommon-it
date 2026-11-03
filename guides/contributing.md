---
title: "Writing for Let's Recommon IT"
date:                  # YYYY-MM-DD, set at publish
updated:
threads: [design-patterns]
difficulty: beginner
status: draft
release: 000-design-patterns
patterns_applied:
  - wiki/patterns/theory-practice-governance.md
  - wiki/patterns/every-page-links-out.md
  - wiki/patterns/patterns-are-tested-in-practice.md
---

## What you'll build

A complete, linked contribution to the site. This might be a whole release (theory & patterns, guide, governance), a single pattern, or a bibliography entry. By the end you'll have it on a branch with an open pull request, ready for review under the [project's governance](../governance/how-this-project-is-run.md).

## Prerequisites

- Membership or contributor access to the repository (see [How this project is run](../governance/how-this-project-is-run.md))
- `git`, a text editor, and a GitHub account
- Familiarity with Markdown
- Read [What does it mean to recommon IT?](../theory/recommoning-it.md) and one existing release, e.g. [Release 001](../releases/001-a-shared-server.md)

## Steps

### 1. Get the repository and make a branch

```bash
git clone https://github.com/recommon-it/lets-recommon-it.git
cd lets-recommon-it
git switch -c release/002-institutions   # never work directly on main
```

Branch names:
- `release/NNN-thread` for a release
- `content/short-description` for patterns, bibliography entries, or fixes
- `structure/short-description` for changes to templates or site structure

### 2. Find your place in the plan

- [`planning/concept-map.md`](../planning/concept-map.md) lists each thread and its release number.
- [`planning/post-ideas.md`](../planning/post-ideas.md) lists planned releases and ideas.
- Check `wiki/patterns/` for existing patterns before inventing new ones. Use the highest `number` + 1 for a new one.

### 3. Start a release

Copy the templates:

```bash
cp templates/release.md    releases/002-institutions.md
cp templates/theory.md     theory/<slug>.md
cp templates/guide.md      guides/<slug>.md
cp templates/governance.md governance/<slug>.md
```

Fill in the manifest's front matter (`number`, `title`, `thread`, `theory`, `patterns`, `guide`, `governance`) first. It's the single list of what belongs to the release.

### 4. Write the theory and derive the patterns

Theory comes first. The patterns should follow from the argument, not be added afterwards ([Theory, Practice, Governance](../wiki/patterns/theory-practice-governance.md)).

For each pattern the essay introduces:

1. Create the pattern page: `cp templates/wiki-pattern.md wiki/patterns/<slug>.md`
2. Write the full pattern there: Context, Problem, Discussion, **Therefore**.
3. In the theory post's **Patterns** section, give the pattern one paragraph showing how the argument leads to it, copy its **Therefore** line, and link to it. Don't copy the whole pattern; the wiki page is the single source.
4. Set `introduced_in:` on the pattern page to the theory post.
5. Fill in `larger_patterns` and `smaller_patterns`, and update the *other* pattern's page so the link goes both ways.

### 5. Write the guide and governance piece

Each one applies patterns by name ([Patterns Are Tested in Practice](../wiki/patterns/patterns-are-tested-in-practice.md)):

1. List them in `patterns_applied:` in the front matter.
2. Explain how in the **Patterns applied** section.
3. Add the guide or governance file to the pattern page's `applied_in:` list and Connections section.

If a pattern doesn't fit what actually happens when you build or govern the thing, say so, and propose a change to the pattern.

### 6. Cite sources

- Cite bibliography entries with relative links: `[Ostrom](../bibliography/ostrom-1990-governing-the-commons.md)`.
- List cited files in the `sources:` front matter.
- For a new source, copy `templates/bibliography-entry.md` to `bibliography/author-year-short-title.md`, check the citation against a publisher or library record, and set `status: draft` until the annotation is reviewed.

### 7. Link everything

Apply [Every Page Links Out](../wiki/patterns/every-page-links-out.md). Every element of the release ends with the same **In this release** footer, matching the manifest. To find every page that mentions a file (useful after renaming one):

```bash
grep -rn "two-keyholders" --include=*.md .
```

### 8. Commit and open a pull request

```bash
git add -A
git commit -m "Draft Release 002: institutions theory and patterns"
git push -u origin release/002-institutions
```

Open a pull request into `main`. Describe what changed and why, and note any AI-assisted drafting (see governance). Review and merging follow [How this project is run](../governance/how-this-project-is-run.md). PRs are merged with a merge commit, not squashed.

## Verify it works

Before asking for review:

- [ ] The manifest lists every element, and every element's `release:` matches the manifest file name
- [ ] Every element ends with an identical **In this release** footer
- [ ] Every pattern introduced in the theory post has a wiki page with `introduced_in` set
- [ ] Every pattern applied in the guide or governance piece lists that file in `applied_in`
- [ ] Larger/smaller pattern links go both ways
- [ ] Every cited source exists in `bibliography/` and is listed in `sources:`
- [ ] Relative links open the right file on GitHub

## Maintenance

- **Renaming or moving a file:** search for its old name with `grep` and update every reference, including front matter.
- **Revising a pattern:** update the **Therefore** line in the pattern page *and* in the theory post that quotes it. Note the reason in the commit message.
- **Status:** move `status: draft` to `published` only after review.

## Community considerations

- **Licensing:** contributions are published under CC BY-SA 4.0 (writing) and MIT (code). By opening a pull request you agree to license your contribution that way.
- **Credit:** contributors are credited by name or handle, as they prefer.
- **Voice:** drafts can be rough. Review is for clarity and accuracy, not for making everyone sound the same.
- **AI assistance:** see the AI rule in [How this project is run](../governance/how-this-project-is-run.md).

## Patterns applied
- [Theory, Practice, Governance](../wiki/patterns/theory-practice-governance.md): steps 3–5 build a release in three linked parts, theory first.
- [Every Page Links Out](../wiki/patterns/every-page-links-out.md): step 7 and the Verify checklist.
- [Patterns Are Tested in Practice](../wiki/patterns/patterns-are-tested-in-practice.md): step 5. Patterns are applied by name and revised when they don't fit.

## Further reading
- [`README.md`](../README.md) for repository structure
- [`templates/`](../templates/) for all templates
- [Alexander, *A Pattern Language*](../bibliography/alexander-1977-pattern-language.md) for the pattern format

## In this release
- **Release:** [000 Design Patterns: Recommoning IT](../releases/000-design-patterns.md)
- **Theory & patterns:** [What does it mean to recommon IT?](../theory/recommoning-it.md): [Theory, Practice, Governance](../wiki/patterns/theory-practice-governance.md), [Every Page Links Out](../wiki/patterns/every-page-links-out.md), [Patterns Are Tested in Practice](../wiki/patterns/patterns-are-tested-in-practice.md)
- **Guide:** [Writing for Let's Recommon IT](../guides/contributing.md)
- **Governance:** [How this project is run](../governance/how-this-project-is-run.md)
