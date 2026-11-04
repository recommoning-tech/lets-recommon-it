---
name: pattern-illustration
description: Draw or redraw an illustration for a pattern in wiki/patterns/ (Alexander-style sketch with mannequin figures). Writes a short alt text describing the illustration first, then draws only what the alt text says, then checks the drawing against the whole set. Use when asked to illustrate a pattern, add or fix a pattern image, or review pattern illustrations.
---

# Pattern illustration: alt text first, then draw

Based on Harasawa, Arao & Iba, "A Pattern Language for Pattern Illustrating" (PLoP 2012). Their Three-Step Drawing (pencil, pen, PC) becomes: **alt text** (the composition), **draft** (the drawing), **review** (against the set). The house style is in `wiki/patterns/images/README.md`; read it before drawing.

## 1. Read the pattern (Expressing Solution)

Read the pattern page. Work from the **Solution** and **Consequences**, not the Problem: the drawing shows the pattern working. Find the action: who does what, with what. Look for a motif or metaphor that carries it.

## 2. Write the alt text

One or two sentences, at most about 45 words. It is the spec for the drawing and becomes the SVG `<desc>`, which is the image's alt text on the site.

- Start with the form: "Sketch:" (people and things) or "Diagram:" (abstract arrangement).
- Name every figure, object, and arrangement that will be drawn, and where they are relative to each other.
- Quote every hand-lettered label exactly, e.g. labels read "shared system" and "keyholder".
- Say which one thing is hatched in the thread color: the focus of the Solution.
- One moment, no story. Only what a sighted reader would see; no interpretation ("showing that...").

Example: *Sketch: two mannequin figures on either side of a shared server, each reaching toward it with a key. Labels read "shared system", "keyholder", and "both use it".*

Before drawing, check the alt text:

- **Expressing Solution:** does it show the Solution, not the Problem? Would someone who reads only the alt text guess the pattern?
- **Graphical Diversity:** compare with the other illustrations' `<desc>` (`grep -h "<desc" wiki/patterns/images/*.svg`). If the main device (speech bubbles, a grid, a server between people) is already used, give it to whichever pattern needs it most and find another motif for the other.
- **Metaphor Matching:** if the best metaphor fits the pattern better than its name does, propose a new name to the user. Don't rename it yourself; names change through the project's pattern review.

When drawing several patterns, or when the motif isn't obvious, show the alt texts to the user before drawing.

## 3. Draw from the alt text

Use `scripts/sketch.mjs`. Add or edit the pattern's entry in `S`: `[title, altText, (B) => { ... }]`, then run:

```bash
node .claude/skills/pattern-illustration/scripts/sketch.mjs wiki/patterns/images <slug>
```

- Draw everything the alt text names and nothing it doesn't. If the drawing needs something new, change the alt text first.
- Primitives: `mannequin` (pose with elbow `el`/`er`, wrist `wl`/`wr`, knee positions; `face` ±1; `s` scale), `box`, `ellipse`, `hatch`, `arrow`, `text`, `card`, `server`, `key`, `ground`, `line`, `stroke`.
- **Design Rules:** people who talk or work together face each other; a line rising to the right reads as hopeful; keep the focus hatched and near the center; leave empty space; keep labels off hatching and inside the 400×300 canvas.
- Set `image: images/<slug>.svg` in the pattern's front matter.

## 4. Review against the set (Consistent Styles, Graphical Diversity)

```bash
node .claude/skills/pattern-illustration/scripts/contact-sheet.mjs wiki/patterns/images /tmp/<scratch>/sheet.html
```

Screenshot the sheet and look at it.

- Does each drawing match its alt text, element for element, label for label?
- Same style as the others: mannequins, pen weight, construction lines, one hatched focus, hand lettering. Redraw any that drift.
- Is each drawing distinct from the others at a glance?
- Do any labels overlap figures, hatching, or the canvas edge?

Then build the site (`cd site && npm run build`) and look at the pattern page in light and dark mode.

## 5. Record it

- Illustrations drafted this way are AI-assisted: say so in the pull request and leave the open task for a person to redraw or review them.
- If a review changes a drawing, update its alt text in the same commit.
