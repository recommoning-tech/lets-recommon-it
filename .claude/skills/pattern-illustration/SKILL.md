---
name: pattern-illustration
description: Draw or redraw an illustration for a pattern in wiki/patterns/ (Alexander-style sketch with mannequin figures, no words in the image). Writes a short alt text describing the illustration first, then draws only what the alt text says, then checks the drawing against the whole set. Use when asked to illustrate a pattern, add or fix a pattern image, or review pattern illustrations.
---

# Pattern illustration: alt text first, then draw

Based on Harasawa, Arao & Iba, "A Pattern Language for Pattern Illustrating" (PLoP 2012). Their Three-Step Drawing (pencil, pen, PC) becomes: **alt text** (the composition), **draft** (the drawing), **review** (against the set). The house style is in `wiki/patterns/images/README.md`; read it before drawing.

## 1. Read the pattern (Expressing Solution)

Read the pattern page. Work from the **Solution** and **Consequences**, not the Problem: the drawing shows the pattern working. Find the action: who does what, with what. Look for a motif or metaphor that carries it.

**No words in the image.** No labels, captions, letters, or numbers. Everything is carried by the picture: figures and their gestures (pointing, holding, listening with a hand to the ear, writing with a pencil), objects, how things are arranged, what is set aside, and the one hatched focus. If an idea needs a symbol, use the site's own marks, which readers already know from the table: the thread circle, and the square, triangle, and diamond for guides, governance, and theory. If a pattern can't be drawn without words, look for a better motif or metaphor.

## 2. Write the alt text

One or two sentences, at most about 45 words. It is the spec for the drawing and becomes the SVG `<desc>`, which is the image's alt text on the site.

- Start with the form: "Sketch:" (people and things) or "Diagram:" (abstract arrangement).
- Name every figure, object, gesture, and arrangement that will be drawn, and where they are relative to each other.
- Say which one thing is hatched in the thread color: the focus of the Solution.
- Mention any of the site's marks used as symbols (e.g. "rows marked with a square, a triangle, and a diamond").
- One moment, no story. Only what a sighted reader would see; no interpretation ("showing that...").

Example: *Sketch: two mannequin figures stand on either side of a server with two keyholes, each turning a key in its own lock at the same time. The server is hatched.*

Before drawing, check the alt text:

- **Expressing Solution:** does it show the Solution, not the Problem? Would someone who sees only the picture, with no words, guess the pattern?
- **Graphical Diversity:** compare with the other illustrations' `<desc>` (`grep -h "<desc" wiki/patterns/images/*.svg`). If the main device (speech bubbles, a grid, a server between people) is already used, give it to whichever pattern needs it most and find another motif for the other.
- **Metaphor Matching:** if the best metaphor fits the pattern better than its name does, propose a new name to the user. Don't rename it yourself; names change through the project's pattern review.

When drawing several patterns, or when the motif isn't obvious, show the alt texts to the user before drawing, unless they've asked you to go ahead.

## 3. Draw from the alt text

Use `scripts/sketch.mjs`. Add or edit the pattern's entry in `S`: `[title, altText, (B) => { ... }]`, then run:

```bash
node .claude/skills/pattern-illustration/scripts/sketch.mjs wiki/patterns/images <slug>
```

- Draw everything the alt text names and nothing it doesn't. If the drawing needs something new, change the alt text first.
- Primitives: `mannequin` (pose with elbow `el`/`er`, wrist `wl`/`wr`, knee positions; `face` ±1; `s` scale), `topPerson` (a person seen from above, for plan views), `box`, `ellipse`, `hatch`, `arrow`, `card`, `server`, `key`, `pencil`, `mark` (the site's circle, square, triangle, diamond), `ground`, `line`, `stroke`. Don't use `text`.
- **Design Rules:** people who talk or work together face each other; gestures carry the action, so make them clear; a line rising to the right reads as hopeful; keep the focus hatched and near the center; leave empty space; keep everything inside the 400×300 canvas.
- Plan views (seen from above, as in Alexander's diagrams) are a good way to show arrangements of people and space.
- Set `image: images/<slug>.svg` in the pattern's front matter.

## 4. Review against the set (Consistent Styles, Graphical Diversity)

```bash
node .claude/skills/pattern-illustration/scripts/contact-sheet.mjs wiki/patterns/images /tmp/<scratch>/sheet.html
```

Screenshot the sheet and look at it.

- Does each drawing match its alt text, element for element?
- Cover the alt text and look: does the picture alone say what the pattern is about?
- No words, letters, or numbers anywhere in the drawing.
- Same style as the others: mannequins, pen weight, construction lines, one hatched focus. Redraw any that drift.
- Is each drawing distinct from the others at a glance?

Then build the site (`cd site && npm run build`) and look at the pattern page in light and dark mode.

## 5. Record it

- Illustrations drafted this way are AI-assisted: say so in the pull request and leave the open task for a person to redraw or review them.
- If a review changes a drawing, update its alt text in the same commit.
