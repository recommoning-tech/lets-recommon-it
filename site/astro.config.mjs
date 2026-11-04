// Site source lives in site/; content is read from the repo folders one level up.
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
import remarkRepoLinks from './src/lib/remark-repo-links.mjs';
import { SITE, BASE, REPO_URL } from './src/lib/site.mjs';

const repoRoot = fileURLToPath(new URL('..', import.meta.url));

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'always',
  markdown: {
    remarkPlugins: [[remarkRepoLinks, { repoRoot, base: BASE, repoUrl: REPO_URL }]],
  },
});
