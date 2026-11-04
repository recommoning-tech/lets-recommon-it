# Pattern illustrations

Each pattern can have one illustration, set in its front matter as `image: images/<slug>.svg`. The website shows it under the pattern's name and introduction.

The current drawings are drafts made with AI assistance (hand-coded SVG, no image generator). They should be redrawn or replaced by a person; see the AI rule in `governance/how-this-project-is-run.md`.

## What an illustration shows

Following Takashi Iba's pattern illustrations:

- One scene that shows the pattern working, not the problem. Draw the state the Consequences describe.
- People, with faces and body language that show how they feel.
- One moment. No arrows, panels, or before-and-after.
- No words. Speech bubbles hold lines or simple shapes.

## Style

- **Canvas:** `viewBox="0 0 400 300"`, with a faint ground line at y = 262.
- **Two colors, like a riso print:** ink outlines (`currentColor`, 3px, round caps and joins) over one flat color (`var(--thread)`), with the color layer shifted 3px right and 2px down so it prints slightly off-register.
- **Color:** the thread's ink from `site/src/lib/site.mjs`. Don't hard-code colors; the site sets `--thread`, `--paper`, and the ink color, so drawings work in light and dark mode.
- **Figures:** round head (radius 14) with dot eyes and a simple mouth; a tinted trapezoid torso; straight lines for arms and legs; small round hands. Vary size (about 0.85–1×) to show different people.
- **Objects:** servers are tall rounded boxes with horizontal lines; patterns and pages are small cards with two lines of "text".
- Use the classes in the existing files: `il-i` (ink line), `il-t` (thread color), `il-p` (paper fill), `il-f` (ink fill).
- Include a `<title>` with the pattern name and a `<desc>` describing the scene in one sentence. The `<desc>` is the alt text.

## License

Illustrations are CC BY-SA 4.0, like the rest of the writing. Credit the illustrator in the pull request.
