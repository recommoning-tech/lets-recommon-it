// Rewrites relative links between repo Markdown files into site URLs,
// so the same files read correctly on GitHub and on the website.
// Files without a site page (README, planning, templates) link to GitHub.
import path from 'node:path';

const ROUTES = [
  ['theory/', 'theory/'],
  ['guides/', 'guides/'],
  ['governance/', 'governance/'],
  ['wiki/patterns/', 'patterns/'],
  ['bibliography/', 'bibliography/'],
];

export function repoPathToUrl(repoPath, { base, repoUrl }) {
  if (repoPath === 'index.md') return base;
  for (const [dir, route] of ROUTES) {
    if (repoPath.startsWith(dir) && repoPath.endsWith('.md') && !repoPath.endsWith('README.md')) {
      return `${base}${route}${path.posix.basename(repoPath, '.md')}/`;
    }
  }
  const kind = repoPath.endsWith('/') || !path.posix.extname(repoPath) ? 'tree' : 'blob';
  return `${repoUrl}/${kind}/main/${repoPath.replace(/\/$/, '')}`;
}

function walk(node, fn) {
  fn(node);
  if (node.children) node.children.forEach((c) => walk(c, fn));
}

export default function remarkRepoLinks({ repoRoot, base, repoUrl }) {
  return (tree, file) => {
    const filePath = file.path || file.history?.[0];
    if (!filePath) return;
    const fromDir = path.posix.dirname(path.relative(repoRoot, filePath).split(path.sep).join('/'));
    walk(tree, (node) => {
      if ((node.type !== 'link' && node.type !== 'definition') || !node.url) return;
      if (/^[a-z][a-z+.-]*:/i.test(node.url) || node.url.startsWith('#') || node.url.startsWith('/')) return;
      const [target, hash] = node.url.split('#');
      const trailing = target.endsWith('/') ? '/' : '';
      const repoPath = path.posix.normalize(path.posix.join(fromDir, target)) + trailing;
      node.url = repoPathToUrl(repoPath, { base, repoUrl }) + (hash ? `#${hash}` : '');
    });
  };
}
