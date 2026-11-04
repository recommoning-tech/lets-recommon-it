# Let's Recommon IT

A blog, guide collection, and wiki about building community-scale information and communication technology.

The project has two parts:

1. **Technical:** practical guides to running your own infrastructure, such as servers, Docker stacks, self-hosted apps, and private networks with Tailscale/WireGuard.
2. **Governance:** how to build and run these tools so they serve a community and not just one person, drawing on commons scholarship, social ecology, design theory, and critiques of Big Tech.

The website is at <https://recommoning-tech.github.io/lets-recommon-it/>. It's built with [Astro](https://astro.build) from the Markdown in this repo (source in `site/`) and deployed to GitHub Pages on every merge to `main`.

## Structure

| Folder | Contents |
|---|---|
| `site/` | Website source (Astro). Generates the table, thread footers, and pattern connections from front matter |
| `index.md` | Pointer to the table on the website |
| `guides/` | Operational level: step-by-step guides |
| `governance/` | Collective-choice and constitutional levels: how rules are made and changed, and who makes them |
| `theory/` | Metaconstitutional level: what is shared, who it's for, what counts as good |
| `wiki/patterns/` | The "Pattern Language for Community Tech" |
| `wiki/` | Other reference pages |
| `posts/` | Standalone commentary, essays, and reviews (`drafts/` holds work in progress) |
| `bibliography/` | Annotated bibliography, one Markdown file per source |
| `planning/` | Concept map, post ideas, and task list |
| `templates/` | Starting templates for each content type |

## The table

The site is a table, generated on the [website](https://recommoning-tech.github.io/lets-recommon-it/) from front matter. Rows are threads. Columns are levels of rules from Ostrom's Institutional Analysis and Development framework:

| Column | Level |
|---|---|
| Guides | Operational |
| Governance | Collective-choice and constitutional |
| Theory | Metaconstitutional |

Any cell can be filled at any time, and new threads can be added. Each piece is an essay about the patterns at its level. Patterns live on their own wiki pages (`wiki/patterns/`), each with one `thread` and one `level`, and form one network across the table. [This repository is a commons](theory/this-repository-is-a-commons.md) explains why.

## Threads

Every piece of content is tagged with one or more threads (the first is its row in the table), defined in [`planning/concept-map.md`](planning/concept-map.md). The first three are covered first, in this order:

`institutions` · `liberatory-tech` · `design-patterns` · `commons` · `privacy` · `ai` · `big-tech-critique` · `open-source` · `labor-care`

## Contributing

See [Writing for Let's Recommon IT](guides/contributing.md) for the full workflow, and [How this project is run](governance/how-this-project-is-run.md) for how the rules are made and who decides.

Start from the matching file in `templates/` (`guide.md`, `governance.md`, `theory.md`, `wiki-pattern.md`, `post.md`, `bibliography-entry.md`). Fill in the front matter carefully: the website builds the table and all links between pieces and patterns from it, and `cd site && npm run build` reports any mismatch. File names use lowercase kebab-case, and bibliography entries are named `author-year-short-title.md`.

## License

- **Written content** (posts, guides, wiki, bibliography annotations): [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). See [`LICENSE-CONTENT`](LICENSE-CONTENT).
- **Code and config** (scripts, config files, Docker Compose examples, code snippets in guides, site source): [MIT](https://opensource.org/license/mit). See [`LICENSE-CODE`](LICENSE-CODE).
