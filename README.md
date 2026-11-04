# Let's Recommon IT

A blog, guide collection, and wiki about building community-scale information and communication technology.

The project has two parts:

1. **Technical:** practical guides to running your own infrastructure, such as servers, Docker stacks, self-hosted apps, and private networks with Tailscale/WireGuard.
2. **Governance:** how to build and run these tools so they serve a community and not just one person, drawing on commons scholarship, social ecology, design theory, and critiques of Big Tech.

There is no website yet. This repo holds the source material.

## Structure

| Folder | Contents |
|---|---|
| `index.md` | The table: every piece and pattern by thread and level |
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

The site is a table, kept in [`index.md`](index.md). Rows are threads. Columns are levels of rules from Ostrom's Institutional Analysis and Development framework:

| Column | Level |
|---|---|
| Guides | Operational |
| Governance | Collective-choice and constitutional |
| Theory | Metaconstitutional |

Any cell can be filled at any time, and new threads can be added. Each piece is an essay about the patterns at its level. Patterns live on their own wiki pages (`wiki/patterns/`), each with one `thread` and one `level`, and form one network across the table. [This repository is a commons](theory/this-repository-is-a-commons.md) explains why.

## Threads

Every piece of content is tagged with one or more threads (the first is its row in the table), defined in [`planning/concept-map.md`](planning/concept-map.md):

`institutions` · `commons` · `liberatory-tech` · `big-tech-critique` · `labor-care` · `open-source` · `ai` · `privacy`

## Contributing

See [Writing for Let's Recommon IT](guides/contributing.md) for the full workflow, and [How this project is run](governance/how-this-project-is-run.md) for how the rules are made and who decides.

Start from the matching file in `templates/` (`guide.md`, `governance.md`, `theory.md`, `wiki-pattern.md`, `post.md`, `bibliography-entry.md`). Add each new piece to `index.md` and to the "In this thread" footer of every piece in its row. File names use lowercase kebab-case, and bibliography entries are named `author-year-short-title.md`.

## License

- **Written content** (posts, guides, wiki, bibliography annotations): [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). See [`LICENSE-CONTENT`](LICENSE-CONTENT).
- **Code and config** (scripts, config files, Docker Compose examples, code snippets in guides, site source): [MIT](https://opensource.org/license/mit). See [`LICENSE-CODE`](LICENSE-CODE).
