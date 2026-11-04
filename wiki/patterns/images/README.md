# Pattern illustrations

Each pattern can have one illustration, set in its front matter as `image: images/<slug>.svg`. The website shows it under the pattern's name and introduction, captioned with the pattern number.

The current drawings are drafts made with AI assistance (hand-coded SVG, no image generator). They should be redrawn or replaced by a person; see the AI rule in `governance/how-this-project-is-run.md`.

## What an illustration shows

Diagrams in the spirit of Christopher Alexander's *A Pattern Language*: a fast pen sketch of the pattern working, with no words in it.

- Show the arrangement the Solution creates: who stands where, what is shared, what connects to what.
- No labels, letters, or numbers. Gestures, objects, arrangement, and the one hatched focus carry the meaning. Where a symbol is needed, use the site's marks: the thread circle, and the square, triangle, and diamond for guides, governance, and theory. Arrows are fine.
- Plan views (seen from above) work well for arrangements of people and space.
- People are artist's mannequins: an oval head with construction lines, separate chest and pelvis blocks, circles at the joints, and limbs drawn as two-line tubes. Drawn quickly, not polished.

## Style

- **Canvas:** `viewBox="0 0 400 300"`, with a faint ground line at y = 262 when people stand on it.
- **Pen:** ink lines (`currentColor`, about 1.7px, round caps) drawn twice with a little offset, then roughened with an SVG displacement filter (`feTurbulence` + `feDisplacementMap`). Give the filter an id unique to the file (`rough-<slug>`).
- **Construction lines:** thinner and faint (`opacity` about 0.4), overshooting the shapes they guide.
- **Drafter's perspective:** objects are solids, not flat outlines. Use one two-point perspective for the whole set (horizon at the figures' eye height, vanishing points far outside the canvas), box each object first, show at least two faces, draw circles at an angle as ellipses, and shade the faces away from a single light with light ink hatching. Prefer bird's-eye views to flat plans.
- **Colored pencil:** hatching in `var(--thread)` marks the one thing the pattern is about (the shared server, the cell being filled). Nothing else is colored.
- Don't hard-code colors. The site sets the ink color and `--thread`, so drawings work on paper and on the dark blueprint theme.
- Use the classes in the existing files: `sk-i` (ink), `sk-g` (construction), `sk-h` (hatching).
- Include a `<title>` with the pattern name and a `<desc>`: the alt text. Write it first, in three parts: what is drawn, what each part stands for in the pattern (context, problem, solution, consequences), and the metaphor. It's the spec for the drawing and the alt text on the site.

## License

Illustrations are CC BY-SA 4.0, like the rest of the writing. Credit the illustrator in the pull request.
