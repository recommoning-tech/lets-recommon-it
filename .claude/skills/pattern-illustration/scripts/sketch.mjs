// Pattern illustrations in the spirit of Alexander's diagrams: fast pen sketches with
// construction lines, artist's-mannequin figures, hand lettering, and colored-pencil hatching
// in the thread's color. Every stroke is drawn twice with a little jitter, then roughened.
//
// Usage: node sketch.mjs <out-dir> [slug ...]   (no slugs = draw every scene)
// Each scene in S is [title, alt text, draw function]. Write the alt text first; draw only what it says.
import fs from 'node:fs';
const OUT = process.argv[2];
const ONLY = process.argv.slice(3);
const G = 262;
let seed = 1;
const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
const j = (v, a = 1.2) => +(v + (rnd() - 0.5) * 2 * a).toFixed(1);
const r1 = (n) => +n.toFixed(1);

function svg(slug, title, desc, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" role="img" aria-labelledby="t-${slug} d-${slug}">
<title id="t-${slug}">${title}</title>
<desc id="d-${slug}">${desc}</desc>
<defs><filter id="rough-${slug}" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="${slug.length}"/><feDisplacementMap in="SourceGraphic" scale="2.4" xChannelSelector="R" yChannelSelector="G"/></filter></defs>
<style>.sk-i{fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}.sk-g{fill:none;stroke:currentColor;stroke-width:.9;opacity:.38;stroke-linecap:round}.sk-h{fill:none;stroke:var(--thread,#2f5da8);stroke-width:1.4;stroke-linecap:round;opacity:.85}.sk-t{fill:currentColor;font-family:'Architects Daughter',cursive;font-size:13px}</style>
<g filter="url(#rough-${slug})">
${body.lines.join('\n')}
</g>
${body.text.join('\n')}
</svg>
`;
}

// Two quick passes of the same path, the second slightly off.
function stroke(B, pts, { cls = 'sk-i', closed = false, passes = 2 } = {}) {
  for (let p = 0; p < passes; p++) {
    const a = p === 0 ? 0.4 : 1.4;
    const d = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${j(x, a)} ${j(y, a)}`).join(' ') + (closed ? ' Z' : '');
    B.lines.push(`<path class="${cls}"${p ? ' opacity=".55"' : ''} d="${d}"/>`);
  }
}
const line = (B, x1, y1, x2, y2, o) => stroke(B, [[x1, y1], [x2, y2]], o);
const guide = (B, x1, y1, x2, y2) => B.lines.push(`<path class="sk-g" d="M${x1} ${y1} L${x2} ${y2}"/>`);
function ellipse(B, cx, cy, rx, ry, { cls = 'sk-i', passes = 2 } = {}) {
  for (let p = 0; p < passes; p++) {
    const pts = []; const start = rnd() * 6.28; const turns = p === 0 ? 1.08 : 1.02;
    for (let i = 0; i <= 28; i++) { const t = start + (i / 28) * 6.283 * turns; pts.push([cx + Math.cos(t) * j(rx, 0.6), cy + Math.sin(t) * j(ry, 0.6)]); }
    B.lines.push(`<path class="${cls}"${p ? ' opacity=".55"' : ''} d="${pts.map(([x, y], i) => `${i ? 'L' : 'M'}${r1(x)} ${r1(y)}`).join(' ')}"/>`);
  }
}
const box = (B, x, y, w, h, o) => stroke(B, [[x - 2, y], [x + w + 2, y], [x + w, y - 2], [x + w, y + h + 2], [x + w + 2, y + h], [x - 2, y + h], [x, y + h + 2], [x, y - 2]].map(([a, b], i) => [a, b]), o);
// Colored-pencil hatching inside a rectangle or ellipse.
function hatch(B, x, y, w, h, { gap = 6, oval = false } = {}) {
  for (let k = -h; k < w; k += gap) {
    let x1 = x + k, y1 = y + h, x2 = x + k + h, y2 = y;
    if (oval) {
      const cx = x + w / 2, cy = y + h / 2, mx = x + k + h / 2, my = cy;
      if (Math.abs(mx - cx) > w / 2 - 2) continue;
      const half = (h / 2) * Math.sqrt(1 - ((mx - cx) / (w / 2)) ** 2) * 0.9;
      x1 = mx - half; y1 = cy + half; x2 = mx + half; y2 = cy - half;
    } else {
      if (x1 < x) { y1 -= x - x1; x1 = x; }
      if (x2 > x + w) { y2 += x2 - (x + w); x2 = x + w; }
      if (y1 <= y2) continue;
    }
    B.lines.push(`<path class="sk-h" d="M${j(x1, 1)} ${j(y1, 1)} L${j(x2, 1)} ${j(y2, 1)}"/>`);
  }
}
const text = (B, x, y, s, { size = 13, anchor = 'middle', rot = 0 } = {}) =>
  B.text.push(`<text class="sk-t" x="${x}" y="${y}" text-anchor="${anchor}" font-size="${size}"${rot ? ` transform="rotate(${rot} ${x} ${y})"` : ''}>${s}</text>`);
function arrow(B, x1, y1, x2, y2, bend = 0) {
  const mx = (x1 + x2) / 2 + bend, my = (y1 + y2) / 2 - Math.abs(bend) * 0.4;
  B.lines.push(`<path class="sk-i" d="M${x1} ${y1} Q${mx} ${my} ${x2} ${y2}"/>`);
  const a = Math.atan2(y2 - my, x2 - mx), L = 8;
  stroke(B, [[x2 - L * Math.cos(a - 0.45), y2 - L * Math.sin(a - 0.45)], [x2, y2], [x2 - L * Math.cos(a + 0.45), y2 - L * Math.sin(a + 0.45)]], { passes: 1 });
}

// Artist's mannequin: construction head, chest and pelvis blocks, joint circles, tube limbs.
function mannequin(B, x, { s = 1, face = 1, el = [-17, -73], wl = [-20, -52], er = [17, -73], wr = [20, -52], kl = [-8, -27], kr = [8, -27], gy = G } = {}) {
  const P = ([px, py]) => [r1(x + px * s), r1(gy + py * s)];
  const tube = (a, b, w1, w2) => {
    const [ax, ay] = P(a), [bx, by] = P(b); const ang = Math.atan2(by - ay, bx - ax) + Math.PI / 2;
    const o = (w) => [Math.cos(ang) * w * s, Math.sin(ang) * w * s];
    const [o1x, o1y] = o(w1), [o2x, o2y] = o(w2);
    line(B, ax + o1x, ay + o1y, bx + o2x, by + o2y, { passes: 1 }); line(B, ax - o1x, ay - o1y, bx - o2x, by - o2y, { passes: 1 });
    guide(B, ax - (bx - ax) * 0.12, ay - (by - ay) * 0.12, bx + (bx - ax) * 0.12, by + (by - ay) * 0.12);
  };
  const joint = (p, rr = 3) => { const [px, py] = P(p); ellipse(B, px, py, rr * s, rr * s, { passes: 1 }); };
  // head with construction cross, turned toward `face`
  const [hx, hy] = P([0, -113]);
  ellipse(B, hx, hy, 8.5 * s, 10.5 * s);
  B.lines.push(`<path class="sk-g" d="M${r1(hx + face * 3 * s)} ${r1(hy - 10 * s)} Q${r1(hx + face * 5.5 * s)} ${hy} ${r1(hx + face * 3 * s)} ${r1(hy + 10 * s)} M${r1(hx - 8 * s)} ${r1(hy - 1 * s)} Q${hx} ${r1(hy + 1.5 * s)} ${r1(hx + 8 * s)} ${r1(hy - 1 * s)}"/>`);
  line(B, ...P([0, -102]), ...P([0, -96]), { passes: 1 });
  stroke(B, [P([-15, -95]), P([15, -95]), P([11, -72]), P([-11, -72])], { closed: true });
  stroke(B, [P([-10, -64]), P([10, -64]), P([8, -51]), P([-8, -51])], { closed: true });
  guide(B, ...P([0, -100]), ...P([0, -48]));
  joint([0, -68], 2.5);
  for (const [sh, e, w] of [[[-15, -92], el, wl], [[15, -92], er, wr]]) {
    joint(sh); tube(sh, e, 3.2, 2.6); joint(e, 2.6); tube(e, w, 2.6, 2); const [wx, wy] = P(w); ellipse(B, wx, wy, 3.6 * s, 4.4 * s, { passes: 1 });
  }
  for (const [hp, k, ft] of [[[-6, -53], kl, -1], [[6, -53], kr, 1]]) {
    joint(hp); tube(hp, k, 3.8, 3); joint(k, 2.8); const an = [k[0] + (k[0] > 0 ? 1 : -1), -4]; tube(k, an, 3, 2.2);
    stroke(B, [P([an[0] - 2, -4]), P([an[0] + face * 9, 0]), P([an[0] - 3, 0])], { passes: 1 });
  }
  return { hl: P(wl), hr: P(wr), head: [hx, hy] };
}
const ground = (B, x1 = 30, x2 = 370) => B.lines.push(`<path class="sk-g" d="M${x1} ${G} L${x2} ${G}"/>`);
const card = (B, x, y, w = 30, h = 20) => { box(B, x, y, w, h, { passes: 1 }); hatch(B, x + 2, y + 2, w - 4, h - 4, { gap: 4 }); };
function server(B, x, y, w, h) { box(B, x, y, w, h); for (let yy = y + 18; yy < y + h - 6; yy += 18) line(B, x + 6, yy, x + w - 6, yy, { passes: 1 }); hatch(B, x + 3, y + 3, w - 6, h - 6, { gap: 7 }); }
function key(B, x, y, dir = 1) { ellipse(B, x, y, 4.5, 4.5, { passes: 1 }); stroke(B, [[x + dir * 4.5, y], [x + dir * 20, y], [x + dir * 20, y + 5]], { passes: 1 }); line(B, x + dir * 15, y, x + dir * 15, y + 4, { passes: 1 }); }

// Scenes, keyed by pattern slug. Primitives above: mannequin, box, ellipse, hatch, arrow, text, card, server, key, ground.
const S = {
'two-keyholders': ['Two Keyholders', 'Sketch: two mannequin figures on either side of a shared server, each reaching toward it with a key. Labels read "shared system", "keyholder", and "both use it".', (B) => {
  ground(B); server(B, 172, 150, 56, 112); text(B, 200, 136, 'shared system');
  const a = mannequin(B, 96, { er: [30, -84], wr: [48, -92] }); key(B, a.hr[0] + 6, a.hr[1], 1);
  const b = mannequin(B, 304, { face: -1, el: [-30, -84], wl: [-48, -92] }); key(B, b.hl[0] - 6, b.hl[1], -1);
  text(B, 96, 284, 'keyholder'); text(B, 304, 284, 'keyholder');
  arrow(B, 120, 66, 280, 66, 0); arrow(B, 280, 74, 120, 74, 0); text(B, 200, 56, 'both use it');
}],
'small-enough-to-understand': ['Small Enough to Understand', 'Sketch: one mannequin holds a small server while a second leans in to learn it, both inside a dashed circle labeled "a weekend to learn". To the right, a large rack is crossed out with the note "not yet".', (B) => {
  ground(B);
  const a = mannequin(B, 110, { el: [4, -72], wl: [22, -78], er: [26, -74], wr: [38, -80] });
  box(B, a.hl[0] - 2, a.hl[1] - 22, 28, 20, { passes: 2 }); hatch(B, a.hl[0], a.hl[1] - 20, 24, 16, { gap: 4 });
  mannequin(B, 190, { s: 0.9, face: -1, el: [-18, -76], wl: [-26, -68] });
  B.lines.push(`<ellipse class="sk-i" cx="150" cy="180" rx="105" ry="95" stroke-dasharray="6 7"/>`);
  text(B, 150, 74, 'a weekend to learn');
  for (const yy of [120, 160, 200]) box(B, 290, yy, 60, 34, { passes: 1 });
  stroke(B, [[280, 112], [362, 240]]); stroke(B, [[362, 112], [280, 240]]);
  text(B, 320, 100, 'not yet', { rot: -6 });
}],
'talk-before-you-enforce': ['Talk Before You Enforce', 'Sketch: three mannequin figures stand together under a hatched loop labeled "talk first". A fence panel lies on the ground to the side, labeled "enforcement: later, if the group chooses".', (B) => {
  ground(B);
  mannequin(B, 70, { er: [26, -74], wr: [36, -82] }); mannequin(B, 140, { s: 0.92, face: 1, el: [-20, -80], wl: [-28, -90] }); mannequin(B, 210, { face: -1, el: [-24, -74], wl: [-34, -80] });
  ellipse(B, 140, 78, 92, 26); hatch(B, 60, 58, 160, 40, { oval: true, gap: 7 }); text(B, 140, 40, 'talk first', { size: 15 });
  stroke(B, [[268, 256], [370, 248]]); stroke(B, [[268, 262], [370, 254]]); for (const xx of [282, 318, 354]) line(B, xx, 246, xx + 2, 262, { passes: 1 });
  text(B, 318, 196, 'enforcement:', { size: 12 }); text(B, 318, 211, 'later, if the', { size: 11 }); text(B, 318, 225, 'group chooses', { size: 11 });
}],
'every-thread-at-every-level': ['Every Thread at Every Level', 'Diagram: three stacked bands labeled theory, governance, and guides. Vertical threads run down through all three bands, with a hatched dot where each thread crosses each band, marking a pattern.', (B) => {
  const bands = [['theory', 60], ['governance', 130], ['guides', 200]];
  for (const [name, y] of bands) { box(B, 104, y, 270, 52); text(B, 96, y + 31, name, { anchor: 'end', size: 12 }); }
  for (const x of [170, 250, 330]) { line(B, x, 34, x, 270); for (const [, y] of bands) { ellipse(B, x, y + 26, 9, 9, { passes: 1 }); hatch(B, x - 8, y + 18, 16, 16, { oval: true, gap: 3.5 }); } }
  text(B, 250, 24, 'threads'); text(B, 210, 284, 'each dot is a pattern', { size: 11 });
}],
'every-page-links-out': ['Every Page Links Out', 'Diagram: a page labeled "this page" sits in the middle, with lines out to pages labeled "its thread", "the table", "patterns", and "sources".', (B) => {
  const c = [175, 120, 50, 64];
  box(B, ...c); hatch(B, c[0] + 3, c[1] + 3, c[2] - 6, c[3] - 6, { gap: 6 }); text(B, 200, 112, 'this page');
  const others = [[50, 40, 'its thread'], [300, 40, 'the table'], [50, 200, 'patterns'], [300, 200, 'sources']];
  for (const [x, y, name] of others) { box(B, x, y, 50, 40, { passes: 1 }); for (let k = 1; k < 4; k++) line(B, x + 8, y + k * 10, x + 42 - (k === 3 ? 12 : 0), y + k * 10, { cls: 'sk-g', passes: 1 }); text(B, x + 25, y + (y < 100 ? -8 : 56), name); arrow(B, 200 + (x < 200 ? -25 : 25), 152 + (y < 100 ? -32 : 32), x + (x < 200 ? 50 : 0), y + 20, x < 200 ? -12 : 12); }
}],
'patterns-are-tested-in-practice': ['Patterns Are Tested in Practice', 'Sketch: a mannequin holds a pattern card up beside a working server. Labels read "pattern", "practice", and "does it fit? if not, revise".', (B) => {
  ground(B); server(B, 262, 150, 56, 112); text(B, 290, 136, 'practice');
  const a = mannequin(B, 120, { er: [30, -86], wr: [58, -98] }); card(B, a.hr[0] - 2, a.hr[1] - 26, 34, 24); text(B, a.hr[0] + 15, a.hr[1] - 34, 'pattern');
  arrow(B, 214, 112, 256, 160, 10); text(B, 222, 62, 'does it fit?'); text(B, 222, 78, 'if not, revise', { size: 11 });
}],
'any-cell-any-time': ['Any Cell, Any Time', 'Sketch: a mannequin places one card into a single empty cell of a large three-by-three grid whose columns are labeled guides, governance, and theory. A few cells are already hatched. The note reads "one cell at a time".', (B) => {
  ground(B); const gx = 150, gy = 50, cw = 66, ch = 50;
  for (let i = 0; i <= 3; i++) { line(B, gx, gy + i * ch, gx + 3 * cw, gy + i * ch, { passes: 1 }); line(B, gx + i * cw, gy, gx + i * cw, gy + 3 * ch, { passes: 1 }); }
  ['guides', 'governance', 'theory'].forEach((n, i) => text(B, gx + i * cw + cw / 2, gy - 8, n, { size: 11 }));
  for (const [c, r] of [[0, 0], [2, 0], [1, 1]]) hatch(B, gx + c * cw + 4, gy + r * ch + 4, cw - 8, ch - 8, { gap: 6 });
  const a = mannequin(B, 100, { er: [30, -96], wr: [54, -114] }); card(B, a.hr[0] + 4, a.hr[1] - 12, 30, 20);
  text(B, 250, 230, 'one cell at a time');
}],
'a-language-users-can-speak': ['A Language Users Can Speak', 'Sketch: two mannequin figures talk; between them a speech bubble holds a plain pattern name, "Two Keyholders". A side note reads "commands and tools go in the actions".', (B) => {
  ground(B);
  mannequin(B, 110, { er: [26, -76], wr: [38, -86] }); mannequin(B, 290, { s: 0.94, face: -1, el: [-26, -76], wl: [-38, -86] });
  stroke(B, [[140, 40], [262, 40], [268, 46], [268, 92], [262, 98], [214, 98], [204, 116], [200, 98], [140, 98], [134, 92], [134, 46]], { closed: true });
  text(B, 201, 75, 'Two Keyholders', { size: 16 }); text(B, 201, 30, 'a plain name', { size: 11 });
  box(B, 286, 40, 104, 40, { passes: 1 }); text(B, 338, 56, 'commands, tools:', { size: 10 }); text(B, 338, 71, 'in the actions', { size: 10 });
}],
'solution-first': ['Solution First', 'Diagram: a numbered sequence of boxes, read left to right and down: 1 solution (hatched), 2 actions, 3 problem, 4 context, 5 forces, 6 consequences, and finally 7 name.', (B) => {
  const steps = ['solution', 'actions', 'problem', 'context', 'forces', 'consequences', 'name'];
  const pos = [[16, 50], [144, 50], [272, 50], [272, 140], [144, 140], [16, 140], [144, 228]];
  steps.forEach((s, i) => { const [x, y] = pos[i]; box(B, x, y, 112, 44, { passes: i === 0 ? 2 : 1 }); if (i === 0) hatch(B, x + 3, y + 31, 106, 10, { gap: 5 }); text(B, x + 56, y + 25, `${i + 1}  ${s}`, { size: i === 6 ? 15 : 13 }); });
  arrow(B, 130, 72, 142, 72); arrow(B, 258, 72, 270, 72); arrow(B, 328, 96, 328, 138); arrow(B, 270, 162, 258, 162); arrow(B, 142, 162, 130, 162); arrow(B, 72, 186, 142, 246, -20);
  text(B, 200, 30, 'the order you write in', { size: 12 });
}],
'workshop-the-pattern': ['Workshop the Pattern', 'Sketch: two mannequin readers stand at a table with a pattern card on it, labeled "what works" and "what could be better". The author stands apart, labeled "author listens".', (B) => {
  ground(B); stroke(B, [[110, 200], [270, 200]]); line(B, 122, 200, 122, 262); line(B, 258, 200, 258, 262); card(B, 172, 180, 36, 18);
  mannequin(B, 80, { er: [24, -70], wr: [36, -62] }); mannequin(B, 300, { face: -1, el: [-24, -70], wl: [-36, -62] });
  text(B, 80, 116, 'what works', { size: 12 }); text(B, 300, 116, 'what could', { size: 12 }); text(B, 300, 130, 'be better', { size: 12 });
  mannequin(B, 366, { s: 0.8, face: -1, el: [-12, -70], wl: [-4, -58], er: [12, -70], wr: [4, -58] });
  text(B, 362, 140, 'author', { size: 11 }); text(B, 362, 153, 'listens', { size: 11 });
}],
};
for (const [slug, [title, desc, build]] of Object.entries(S)) { if (ONLY.length && !ONLY.includes(slug)) continue; seed = slug.length * 977 + 13; const B = { lines: [], text: [] }; build(B); fs.writeFileSync(`${OUT}/${slug}.svg`, svg(slug, title, desc, B)); }
console.log(ONLY.length ? ONLY.join(', ') : `${Object.keys(S).length} scenes`, 'drawn');
