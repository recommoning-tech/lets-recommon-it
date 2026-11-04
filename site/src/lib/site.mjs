// Shared constants. Plain .mjs so astro.config.mjs can import it too.
export const SITE = 'https://lets-recommon-it.com';
export const BASE = '/';
export const REPO_URL = 'https://github.com/recommoning-tech/lets-recommon-it';
export const BRANCH = 'main';

// Rows of the table, in coverage order. Names and claims follow planning/concept-map.md.
// ink: the thread's stamp color, used for marks, pattern numbers, and illustrations.
export const THREADS = [
  { id: 'institutions', ink: '#2f5da8', name: 'Institutions', claim: 'Rules can be analyzed and designed.' },
  { id: 'liberatory-tech', ink: '#2e8a57', name: 'Liberatory tech', claim: 'Technology liberates only when its scale and control are local and democratic.' },
  { id: 'design-patterns', ink: '#d9a21b', name: 'Design patterns', claim: 'Good systems grow piecemeal from shared patterns that users can apply themselves.' },
  { id: 'commons', ink: '#13808a', name: 'Commons', claim: 'Communities can hold resources in common; enclosure is the recurring threat.' },
  { id: 'privacy', ink: '#6c4fa0', name: 'Privacy', claim: 'Privacy means information flowing appropriately for its context.' },
  { id: 'ai', ink: '#d2453a', name: 'AI', claim: 'Alternatives to extractive AI are small, local, federated, and situated.' },
  { id: 'big-tech-critique', ink: '#8e3354', name: 'Big Tech critique', claim: 'Centralized platforms decay and extract; lock-in is the mechanism.' },
  { id: 'open-source', ink: '#7c7f1f', name: 'Open source', claim: 'Licenses make shared code possible but not sufficient.' },
  { id: 'labor-care', ink: '#d3628e', name: 'Labor & care', claim: 'Maintenance is undervalued care work.' },
];

// Columns of the table. Each column holds the patterns at its IAD level(s); mark is its stamp shape.
export const COLUMNS = [
  { id: 'guides', mark: 'square', name: 'Guides', levels: ['operational'], levelLabel: 'Operational' },
  { id: 'governance', mark: 'triangle', name: 'Governance', levels: ['collective-choice', 'constitutional'], levelLabel: 'Collective-choice & constitutional' },
  { id: 'theory', mark: 'diamond', name: 'Theory', levels: ['metaconstitutional'], levelLabel: 'Metaconstitutional' },
];

export const LEVELS = ['operational', 'collective-choice', 'constitutional', 'metaconstitutional'];
