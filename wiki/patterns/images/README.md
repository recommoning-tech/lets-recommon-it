# Pattern illustrations

Each pattern can have one illustration, set in its front matter as `image: images/<slug>.svg`. The website shows it under the pattern's name and introduction, captioned with the pattern number.

The current drawings are drafts made with AI assistance (hand-coded SVG, no image generator). They should be redrawn or replaced by a person; see the AI rule in `governance/how-this-project-is-run.md`.

## What an illustration shows

Diagrams in the spirit of Christopher Alexander's *A Pattern Language*: a fast pen sketch of the pattern working, labeled by hand.

- Show the arrangement the Solution creates: who stands where, what is shared, what connects to what.
- Label the parts in a few words ("shared system", "keyholder", "talk first"). Arrows are fine.
- People are artist's mannequins: an oval head with construction lines, separate chest and pelvis blocks, circles at the joints, and limbs drawn as two-line tubes. Drawn quickly, not polished.

## Style

- **Canvas:** `viewBox="0 0 400 300"`, with a faint ground line at y = 262 when people stand on it.
- **Pen:** ink lines (`currentColor`, about 1.7px, round caps) drawn twice with a little offset, then roughened with an SVG displacement filter (`feTurbulence` + `feDisplacementMap`). Give the filter an id unique to the file (`rough-<slug>`).
- **Construction lines:** thinner and faint (`opacity` about 0.4), overshooting the shapes they guide.
- **Colored pencil:** hatching in `var(--thread)` marks the one thing the pattern is about (the shared server, the cell being filled). Nothing else is colored.
- **Lettering:** labels in Architects Daughter (`font-family: 'Architects Daughter', cursive`), not roughened, so they stay readable.
- Don't hard-code colors. The site sets the ink color and `--thread`, so drawings work on paper and on the dark blueprint theme.
- Use the classes in the existing files: `sk-i` (ink), `sk-g` (construction), `sk-h` (hatching), `sk-t` (lettering).
- Include a `<title>` with the pattern name and a `<desc>` describing the sketch in one sentence, including its labels. The `<desc>` is the alt text.

## License

Illustrations are CC BY-SA 4.0, like the rest of the writing. Credit the illustrator in the pull request.
