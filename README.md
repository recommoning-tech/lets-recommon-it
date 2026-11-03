# Let's Recommon IT

A blog, guide collection, and wiki about building **community-scale information and communication technology**.

The project has two parts:

1. **Technical:** practical guides to running your own infrastructure, such as servers, Docker stacks, self-hosted apps, and private networks with Tailscale/WireGuard.
2. **Governance:** how to build and run these tools so they serve a community and not just one person, drawing on commons scholarship, social ecology, design theory, and critiques of Big Tech.

There is no website yet. This repo holds the source material.

## Structure

| Folder | Contents |
|---|---|
| `releases/` | One manifest per release, listing its parts |
| `theory/` | Theory posts: why a thread matters, deriving its patterns |
| `guides/` | Step-by-step technical guides |
| `governance/` | How to run it as a commons; risks and trade-offs |
| `wiki/patterns/` | The "Pattern Language for Community Tech" |
| `wiki/` | Other reference pages |
| `posts/` | Standalone commentary, essays, and reviews (`drafts/` holds work in progress) |
| `bibliography/` | Annotated bibliography, one Markdown file per source |
| `planning/` | Concept map, post ideas, and task list |
| `templates/` | Starting templates for each content type |

## Releases

Content is published in **releases**. Each thread has one foundational release with three parts:

1. **Theory & patterns:** why the thread matters for community-scale IT commons. The essay derives a set of patterns and shows how they relate to each other.
2. **Guide:** implements a concrete example, applying the patterns.
3. **Governance:** the considerations and processes for running it as a commons, with risks and trade-offs.

Patterns live on their own wiki pages (`wiki/patterns/`) and form one network across all threads. Each pattern records the theory post that introduced it (`introduced_in`) and the guides and governance pieces that apply it (`applied_in`).

Every element links to the others. The manifest in `releases/NNN-slug.md` lists them; each element has `release:` in its front matter and an "In this release" footer.

Release 000 applies this structure to the project itself (the `design-patterns` thread).

## Threads

Every piece of content is tagged with one or more threads, defined in [`planning/concept-map.md`](planning/concept-map.md):

`institutions` · `commons` · `liberatory-tech` · `design-patterns` · `big-tech-critique` · `labor-care` · `open-source` · `ai` · `privacy`

## Contributing

See [Writing for Let's Recommon IT](guides/contributing.md) for the full workflow, and [How this project is run](governance/how-this-project-is-run.md) for review and decision rules.

Start from the matching file in `templates/` (`release.md`, `theory.md`, `guide.md`, `governance.md`, `wiki-pattern.md`, `post.md`, `bibliography-entry.md`). Keep the "In this release" footer in every element in sync with the release manifest. File names use lowercase kebab-case, and bibliography entries are named `author-year-short-title.md`.

## License

- **Written content** (posts, guides, wiki, bibliography annotations): [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). See [`LICENSE-CONTENT`](LICENSE-CONTENT).
- **Code and config** (scripts, config files, Docker Compose examples, code snippets in guides, site source): [MIT](https://opensource.org/license/mit). See [`LICENSE-CODE`](LICENSE-CODE).
