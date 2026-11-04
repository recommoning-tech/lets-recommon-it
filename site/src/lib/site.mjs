// Shared constants. Plain .mjs so astro.config.mjs can import it too.
export const SITE = 'https://lets-recommon-it.com';
export const BASE = '/';
export const REPO_URL = 'https://github.com/recommoning-tech/lets-recommon-it';
export const BRANCH = 'main';

// Rows of the table, in coverage order. Names and claims follow planning/concept-map.md.
export const THREADS = [
  { id: 'institutions', name: 'Institutions', claim: 'Rules can be analyzed and designed.' },
  { id: 'liberatory-tech', name: 'Liberatory tech', claim: 'Technology liberates only when its scale and control are local and democratic.' },
  { id: 'design-patterns', name: 'Design patterns', claim: 'Good systems grow piecemeal from shared patterns that users can apply themselves.' },
  { id: 'commons', name: 'Commons', claim: 'Communities can hold resources in common; enclosure is the recurring threat.' },
  { id: 'privacy', name: 'Privacy', claim: 'Privacy means information flowing appropriately for its context.' },
  { id: 'ai', name: 'AI', claim: 'Alternatives to extractive AI are small, local, federated, and situated.' },
  { id: 'big-tech-critique', name: 'Big Tech critique', claim: 'Centralized platforms decay and extract; lock-in is the mechanism.' },
  { id: 'open-source', name: 'Open source', claim: 'Licenses make shared code possible but not sufficient.' },
  { id: 'labor-care', name: 'Labor & care', claim: 'Maintenance is undervalued care work.' },
];

// Columns of the table. Each column holds the patterns at its IAD level(s).
export const COLUMNS = [
  { id: 'guides', name: 'Guides', levels: ['operational'], levelLabel: 'Operational' },
  { id: 'governance', name: 'Governance', levels: ['collective-choice', 'constitutional'], levelLabel: 'Collective-choice & constitutional' },
  { id: 'theory', name: 'Theory', levels: ['metaconstitutional'], levelLabel: 'Metaconstitutional' },
];

export const LEVELS = ['operational', 'collective-choice', 'constitutional', 'metaconstitutional'];
