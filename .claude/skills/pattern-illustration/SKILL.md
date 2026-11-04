---
name: pattern-illustration
description: Draw or redraw an illustration for a pattern in wiki/patterns/ (Alexander-style sketch with mannequin figures, no words in the image). Writes an alt text first that describes the illustration, maps each part to the pattern, and names the metaphor, then draws only what the alt text says, then checks the drawing against the whole set. Use when asked to illustrate a pattern, add or fix a pattern image, or review pattern illustrations.
---

# Pattern illustration: alt text first, then draw

Based on Harasawa, Arao & Iba, "A Pattern Language for Pattern Illustrating" (PLoP 2012). Their Three-Step Drawing (pencil, pen, PC) becomes: **alt text** (the composition), **draft** (the drawing), **review** (against the set). The house style is in `wiki/patterns/images/README.md`; read it before drawing.

## 1. Map the pattern, then choose the metaphor (Expressing Solution)

Read the pattern page and write a working map (notes only, not committed) of its parts:

| Pattern part | In this pattern |
|---|---|
| Context | the situation and who is in it |
| Problem / Forces | what goes wrong, and why it's hard |
| Solution: what | what to do |
| Solution: how | how to do it |
| Consequences | what changes, including costs |

Then choose a metaphor: a familiar scene or object whose parts line up with the map (a key for access, a loom for threads, a workbench for something small enough to handle). Fill in a third column saying which visual element stands for each pattern part. The drawing shows the Solution working, so the Solution rows must have elements; the Problem is usually shown as something set aside, avoided, or corrected, not as the main scene.

When redrawing from scratch, don't look at the existing drawing until the review in step 4, so the old picture doesn't decide the new one.

**No words in the image.** No labels, captions, letters, or numbers. Everything is carried by the picture: figures and their gestures (pointing, holding, listening with a hand to the ear, writing with a pencil), objects, how things are arranged, what is set aside, and the one hatched focus. If an idea needs a symbol, use the site's own marks, which readers already know from the table: the thread circle, and the square, triangle, and diamond for guides, governance, and theory. If a pattern can't be drawn without words, look for a better motif or metaphor.

**One hatched focus.** Exactly one element is hatched in the thread color: whatever stands for the heart of the Solution.

## 2. Write the alt text

It is the spec for the drawing and becomes the SVG `<desc>`, which is the image's alt text on the site. A reader who can't see the image should come away knowing both what is drawn and how it explains the pattern. Write three parts, in this order, in about 90–140 words:

1. **What is drawn.** Start with the form: "Sketch:" (people and things) or "Diagram:" (an abstract arrangement or plan view). Name every figure, object, gesture, and arrangement, and where they are relative to each other. Say which one thing is hatched in the thread color, and mention any of the site's marks used as symbols. Describe only what a sighted reader sees; no interpretation yet.
2. **What each part stands for.** Turn the map from step 1 into prose: go through the drawing element by element and say which part of the pattern it represents, using the pattern's own terms: the Context (the situation or the people in it), the Problem or Forces, the Solution (name both halves if it has two, what and how), and the Consequences. Be explicit: "The server is the shared system from the Context." Every drawn element should map to something; if one doesn't, cut it from the drawing.
3. **The metaphor.** One or two sentences starting "The metaphor:", saying what familiar thing the drawing borrows (a key, a loom, a workbench) and what that comparison says about the pattern.

Example (Two Keyholders):

> Sketch: two mannequin figures stand on either side of a server with two keyholes, each turning a key in its own lock at the same moment. The server is hatched. The server is the shared system from the pattern's context: something a group depends on. Each figure is a keyholder and each key is full admin access; there are two locks, so neither needs the other's help to get in. Both turning their keys at once is the second half of the solution: both keyholders use their access regularly, not just hold it. The metaphor: admin access as a physical key. A single admin is a building with one key; this pattern cuts a second one and puts it to use.

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

### Draw like a drafter: three dimensions and perspective

The mannequins are drawn the way an artist builds a figure: simple solids, construction lines, quick confident strokes. Draw every object the same way. Flat outlines read as icons; solids read as things people can use.

- **One perspective for the whole set.** Use two-point perspective with the horizon at the mannequins' eye height (about y = 150) and both vanishing points far outside the canvas (about x = −400 and x = 800), so the distortion is mild and every drawing feels like the same room. Draw the horizon and a few guide lines to the vanishing points as faint construction lines, overshooting their ends.
- **Box it first.** Start every object as a box in perspective (its envelope), then carve it: a shed is a box with a roof prism; a table is a slab on four legs; a loom is a frame of square-section posts; a book has a visible spine and page edge. Show at least two faces of anything solid, usually the front and one side or the top.
- **Circles become ellipses.** Wheels, table tops, cups, and plates seen at an angle are ellipses, with their axes lined up with the perspective. Give flat round things a visible thickness (a second ellipse below the first).
- **Depth.** Objects and figures farther back are smaller and higher on the ground plane, and nearer things overlap farther ones (give near shapes a paper fill so they hide what's behind). Place mannequins in the same perspective as the objects they use; their feet sit on the ground plane.
- **Light from one side.** Shade the faces turned away from the light (always the same side across the set) with light ink hatching at construction weight. Thread-color hatching stays reserved for the one focus.
- **Line weight.** Outer silhouettes heaviest, inner edges lighter, construction and shading lightest; edges nearer the viewer slightly heavier than far ones.
- **Ruled, not traced.** Edges are straight, quick strokes that overshoot a little at corners, drawn twice with a small offset, as with the mannequins. Keep it fast and rough, not polished.
- **Plan views become bird's-eye views.** Instead of a flat plan, look down at an angle (high horizon, or axonometric) so people stay recognizable as mannequins and the space keeps its depth.
- If a primitive you need doesn't exist yet (a box, prism, cylinder, or ellipse in perspective), add it to `scripts/sketch.mjs` and reuse it across drawings.
- Set `image: images/<slug>.svg` in the pattern's front matter.

## 4. Review against the set (Consistent Styles, Graphical Diversity)

```bash
node .claude/skills/pattern-illustration/scripts/contact-sheet.mjs wiki/patterns/images /tmp/<scratch>/sheet.html
```

Screenshot the sheet and look at it.

- Does each drawing match its alt text, element for element?
- Cover the alt text and look: does the picture alone say what the pattern is about?
- No words, letters, or numbers anywhere in the drawing.
- Same style as the others: mannequins, pen weight, construction lines, one hatched focus, and objects drawn as solids in the shared perspective. Redraw any that are still flat.
- Is each drawing distinct from the others at a glance?

Then build the site (`cd site && npm run build`) and look at the pattern page in light and dark mode.

## 5. Record it

- Illustrations drafted this way are AI-assisted: say so in the pull request and leave the open task for a person to redraw or review them.
- If a review changes a drawing, update its alt text in the same commit.
