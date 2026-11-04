// Builds the site's data from front matter: the table, thread footers, and pattern backlinks.
// validate() fails the build when cross-references in front matter don't match.
import { getCollection, type CollectionEntry } from 'astro:content';
import { THREADS, COLUMNS, BASE, REPO_URL, BRANCH } from './site.mjs';

export type ColumnId = 'guides' | 'governance' | 'theory';
export type Piece = CollectionEntry<'theory'> | CollectionEntry<'guides'> | CollectionEntry<'governance'>;
export type Pattern = CollectionEntry<'patterns'>;
export type Source = CollectionEntry<'bibliography'>;

const COLUMN_IDS: ColumnId[] = ['guides', 'governance', 'theory'];
const slug = (p: string) => p.replace(/^.*\//, '').replace(/\.md$/, '');

export const url = {
  piece: (p: Piece) => `${BASE}${p.collection}/${p.id}/`,
  pattern: (p: Pattern | string) => `${BASE}patterns/${typeof p === 'string' ? p : p.id}/`,
  source: (s: Source | string) => `${BASE}bibliography/${typeof s === 'string' ? s : s.id}/`,
  thread: (id: string) => `${BASE}threads/${id}/`,
};

// Repo-relative path of an entry's file, e.g. "theory/x.md".
export const repoPath = (e: { filePath?: string }) => (e.filePath ?? '').replace(/^(\.\.\/)+/, '');
export const editUrl = (e: { filePath?: string }) => `${REPO_URL}/edit/${BRANCH}/${repoPath(e)}`;
export const newFileUrl = (dir: string, filename: string, value: string) =>
  `${REPO_URL}/new/${BRANCH}/${dir}?filename=${encodeURIComponent(filename)}&value=${encodeURIComponent(value)}`;

export const columnOf = (level: string) => COLUMNS.find((c) => c.levels.includes(level))!;
export const threadOf = (id: string) => THREADS.find((t) => t.id === id);

let cache: Awaited<ReturnType<typeof build>> | undefined;
export async function site() {
  return (cache ??= await build());
}

async function build() {
  const pieces: Piece[] = (
    await Promise.all(COLUMN_IDS.map((c) => getCollection(c)))
  ).flat() as Piece[];
  const patterns = (await getCollection('patterns')).sort((a, b) => a.data.number - b.data.number);
  const sources = await getCollection('bibliography');

  const pieceByPath = new Map(pieces.map((p) => [repoPath(p), p]));
  const patternById = new Map(patterns.map((p) => [p.id, p]));
  const sourceById = new Map(sources.map((s) => [s.id, s]));

  // Table cells: pieces by [thread][column], using each piece's first thread.
  const table: Record<string, Record<ColumnId, Piece[]>> = {};
  for (const t of THREADS) table[t.id] = { guides: [], governance: [], theory: [] };
  for (const p of pieces) table[p.data.threads[0]]?.[p.collection as ColumnId].push(p);
  for (const row of Object.values(table)) for (const cell of Object.values(row)) cell.sort((a, b) => a.data.title.localeCompare(b.data.title));

  // Patterns by [thread][column], placed by level.
  const patternTable: Record<string, Record<ColumnId, Pattern[]>> = {};
  for (const t of THREADS) patternTable[t.id] = { guides: [], governance: [], theory: [] };
  for (const p of patterns) patternTable[p.data.thread]?.[columnOf(p.data.level).id as ColumnId].push(p);

  // Backlinks: which pieces cite each source.
  const citedIn = new Map<string, Piece[]>();
  for (const p of pieces) for (const s of p.data.sources) {
    const id = slug(s);
    citedIn.set(id, [...(citedIn.get(id) ?? []), p]);
  }

  const data = { pieces, patterns, sources, pieceByPath, patternById, sourceById, table, patternTable, citedIn };
  validate(data);
  return data;
}

function validate(d: {
  pieces: Piece[]; patterns: Pattern[]; pieceByPath: Map<string, Piece>;
  patternById: Map<string, Pattern>; sourceById: Map<string, Source>;
}) {
  const errors: string[] = [];
  const threadIds = new Set(THREADS.map((t) => t.id));

  for (const p of d.pieces) {
    const where = repoPath(p);
    for (const t of p.data.threads) if (!threadIds.has(t)) errors.push(`${where}: unknown thread "${t}"`);
    for (const s of p.data.sources) if (!d.sourceById.has(slug(s))) errors.push(`${where}: source not in bibliography: ${s}`);
    for (const ref of p.data.patterns) {
      const pat = d.patternById.get(slug(ref));
      if (!pat) errors.push(`${where}: introduces unknown pattern ${ref}`);
      else if (pat.data.introduced_in !== where) errors.push(`${where}: introduces ${pat.id}, but its introduced_in is "${pat.data.introduced_in ?? ''}"`);
    }
    for (const ref of p.data.patterns_applied) {
      const pat = d.patternById.get(slug(ref));
      if (!pat) errors.push(`${where}: applies unknown pattern ${ref}`);
      else if (!pat.data.applied_in.includes(where)) errors.push(`${where}: applies ${pat.id}, but it isn't in that pattern's applied_in`);
    }
  }

  for (const pat of d.patterns) {
    const where = repoPath(pat);
    if (!threadIds.has(pat.data.thread)) errors.push(`${where}: unknown thread "${pat.data.thread}"`);
    const intro = pat.data.introduced_in;
    if (intro) {
      const piece = d.pieceByPath.get(intro);
      if (!piece) errors.push(`${where}: introduced_in file not found: ${intro}`);
      else {
        if (piece.collection !== columnOf(pat.data.level).id) errors.push(`${where}: level ${pat.data.level} belongs in ${columnOf(pat.data.level).id}/, but introduced_in is ${intro}`);
        if (!piece.data.patterns.some((r) => slug(r) === pat.id)) errors.push(`${where}: introduced_in ${intro} doesn't list it under patterns`);
      }
    }
    for (const a of pat.data.applied_in) {
      const piece = d.pieceByPath.get(a);
      if (!piece) errors.push(`${where}: applied_in file not found: ${a}`);
      else if (!piece.data.patterns_applied.some((r) => slug(r) === pat.id)) errors.push(`${where}: applied_in ${a} doesn't list it under patterns_applied`);
    }
    for (const [mine, theirs] of [['larger_patterns', 'smaller_patterns'], ['smaller_patterns', 'larger_patterns']] as const) {
      for (const other of pat.data[mine]) {
        const o = d.patternById.get(other);
        if (!o) errors.push(`${where}: ${mine} lists unknown pattern ${other}`);
        else if (!o.data[theirs].includes(pat.id)) errors.push(`${where}: ${mine} lists ${other}, but ${other} doesn't list it in ${theirs}`);
      }
    }
  }

  if (errors.length) throw new Error(`Front matter cross-references don't match:\n- ${errors.join('\n- ')}`);
}
