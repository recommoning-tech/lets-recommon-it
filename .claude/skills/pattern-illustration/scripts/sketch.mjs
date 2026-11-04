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

// A person seen from above (plan view): shoulders and head, facing angle `a` in radians.
function topPerson(B, x, y, a) {
  const c = Math.cos(a), si = Math.sin(a);
  const pts = []; for (let t = 0; t <= 6.3; t += 0.35) { const u = Math.cos(t) * 7, v = Math.sin(t) * 18; pts.push([x + u * c - v * si, y + u * si + v * c]); }
  stroke(B, pts, { closed: true, passes: 1 }); ellipse(B, x + c * 3, y + si * 3, 7.5, 7.5, { passes: 1 });
}
// A pencil held at (x, y), pointing along angle a.
function pencil(B, x, y, a = 0.6, L = 22) {
  const dx = Math.cos(a), dy = Math.sin(a), nx = -dy * 2.2, ny = dx * 2.2;
  stroke(B, [[x - dx * 6 + nx, y - dy * 6 + ny], [x + dx * L + nx, y + dy * L + ny], [x + dx * (L + 6), y + dy * (L + 6)], [x + dx * L - nx, y + dy * L - ny], [x - dx * 6 - nx, y - dy * 6 - ny]], { closed: true, passes: 1 });
}
// The site's marks: thread circle, and square / triangle / diamond for guides / governance / theory.
function mark(B, shape, x, y, r = 8, hatched = false) {
  if (shape === 'circle') ellipse(B, x, y, r, r, { passes: 1 });
  if (shape === 'square') box(B, x - r, y - r, 2 * r, 2 * r, { passes: 1 });
  if (shape === 'triangle') stroke(B, [[x, y - r], [x + r, y + r * 0.8], [x - r, y + r * 0.8]], { closed: true, passes: 1 });
  if (shape === 'diamond') stroke(B, [[x, y - r], [x + r, y], [x, y + r], [x - r, y]], { closed: true, passes: 1 });
  if (hatched) hatch(B, x - r + 1, y - r + 1, 2 * r - 2, 2 * r - 2, { oval: shape !== 'square', gap: 3.5 });
}
// Two keys crossed: the pictogram for Two Keyholders, used as a shared "word".
function keysIcon(B, x, y) {
  B.lines.push(`<g transform="rotate(-25 ${x} ${y})">`); key(B, x - 10, y - 4, 1); B.lines.push('</g>');
  B.lines.push(`<g transform="rotate(25 ${x} ${y})">`); key(B, x - 10, y + 4, 1); B.lines.push('</g>');
}

// Hatching clipped to any path, for shapes that aren't rectangles or ovals.
let CUR = '', clipN = 0;
function hatchIn(B, d, [x, y, w, h], gap = 6) {
  const id = `clip-${CUR}-${++clipN}`;
  B.lines.push(`<clipPath id="${id}"><path d="${d}"/></clipPath><g clip-path="url(#${id})">`); hatch(B, x, y, w, h, { gap }); B.lines.push('</g>');
}
const oval = (cx, cy, rx, ry) => `M${cx - rx} ${cy} a${rx} ${ry} 0 1 0 ${2 * rx} 0 a${rx} ${ry} 0 1 0 ${-2 * rx} 0 Z`;
const poly = (pts) => 'M' + pts.map(([x, y]) => `${x} ${y}`).join(' L') + ' Z';
function wrench(B, x, y, a) { const dx = Math.cos(a), dy = Math.sin(a); line(B, x, y, x + dx * 24, y + dy * 24, { passes: 1 }); ellipse(B, x + dx * 28, y + dy * 28, 5, 5, { passes: 1 }); }
function water(B, x, y) { B.lines.push(`<path class="sk-g" d="M${x} ${y} q5 -4 10 0 t10 0 t10 0"/>`); }

// Scenes, keyed by pattern slug: [title, alt text, draw]. The alt text is written first, from the
// pattern's map; the drawing shows exactly what it says, with no words, letters, or numbers.
const S = {
'two-keyholders': ['Two Keyholders', "Sketch: a small shared tool shed stands in the middle; its door is hatched. On the left, a mannequin turns a key in the door. On the right, a second mannequin walks away carrying a bag, with its own key in the other hand. The shed is the shared system from the pattern's context: something a group depends on. Its door is admin access, the focus. Each figure is a keyholder and each key is full access. The figure leaving with a bag is the problem the pattern guards against, a keyholder who moves away or burns out; the first figure opening the door anyway is the consequence, the system surviving one person leaving. That the first figure is using the key, not just holding it, is the second half of the solution: both keyholders use their access regularly. The metaphor: a shared shed with two keys cut, so the tools stay within reach whoever is away.", (B) => {
  ground(B);
  stroke(B, [[170, 262], [170, 150], [290, 150], [290, 262]]); stroke(B, [[162, 152], [230, 108], [298, 152]]);
  for (let y = 166; y < 262; y += 16) line(B, 222, y, 286, y, { cls: 'sk-g', passes: 1 });
  box(B, 178, 178, 36, 84); hatch(B, 181, 181, 30, 78, { gap: 6 });
  ellipse(B, 204, 220, 2.6, 2.6, { passes: 1 });
  const a = mannequin(B, 124, { er: [28, -72], wr: [48, -46] }); key(B, a.hr[0] + 4, a.hr[1], 1);
  const b = mannequin(B, 340, { kl: [-13, -28], kr: [12, -27], el: [-16, -68], wl: [-14, -46], er: [22, -72], wr: [30, -56] });
  key(B, b.hl[0] - 2, b.hl[1] + 4, -1); box(B, b.hr[0] - 8, b.hr[1], 18, 22, { passes: 1 }); line(B, b.hr[0] - 2, b.hr[1], b.hr[0] + 4, b.hr[1] - 6, { passes: 1 });
}],
'small-enough-to-understand': ['Small Enough to Understand', "Sketch: a bicycle stands between two mannequins, its frame hatched. Every part is drawn in the open: two wheels, a chain, a gear, a saddle, handlebars. One figure points at the chain and gear; the other holds a wrench to the front wheel. The bicycle is the system from the pattern's context, the hardware and software a group chooses. Its few, visible parts are the solution: a system small enough to understand, so the frame is the focus. The figure pointing knows how it works; the figure with the wrench is a second member learning to look after it, the person who could learn to run it in a weekend. The metaphor: a system as a bicycle rather than a sealed engine. Anyone can see how it works and a friend can fix it, at the cost the pattern names: it won't go as fast or as far as a car.", (B) => {
  ground(B);
  const R = [168, 228], F = [262, 228], BB = [208, 230], S0 = [198, 182], H = [248, 184];
  ellipse(B, ...R, 32, 32); ellipse(B, ...F, 32, 32); ellipse(B, ...R, 4, 4, { passes: 1 }); ellipse(B, ...F, 4, 4, { passes: 1 });
  hatchIn(B, poly([S0, H, BB]), [196, 180, 56, 52], 5);
  stroke(B, [R, BB, S0, R]); stroke(B, [S0, H, BB]); stroke(B, [H, F]);
  ellipse(B, ...BB, 9, 9, { passes: 1 }); line(B, 168, 223, 208, 221, { passes: 1 }); line(B, 168, 233, 208, 239, { passes: 1 });
  stroke(B, [[188, 176], [208, 176]]); line(B, 198, 176, 198, 182, { passes: 1 }); stroke(B, [[240, 170], [256, 172]]); line(B, 248, 172, 248, 184, { passes: 1 });
  mannequin(B, 100, { er: [30, -72], wr: [56, -56] });
  const b = mannequin(B, 330, { face: -1, s: 0.92, el: [-26, -66], wl: [-44, -54] }); wrench(B, b.hl[0], b.hl[1], Math.PI + 0.4);
}],
'talk-before-you-enforce': ['Talk Before You Enforce', "Diagram in plan view, seen from above: six people sit around a round table, which is hatched, with small arcs of speech between them. Off to the right, a fence panel lies flat on the ground, unused. The people are the group sharing a system, from the pattern's context, now with problems to deal with. The round table is the solution: a place for the group to talk, such as a chat channel or a regular check-in, and it is the focus. The speech arcs are a problem being raised there first, with everyone, rather than decided by an admin alone. The fence panel is technical enforcement such as quotas, permissions, and bans: set aside, not built, and still available if the group chooses it later. The metaphor: a round table with no head, where the group's own judgment comes before any fence.", (B) => {
  const cx = 160, cy = 150;
  ellipse(B, cx, cy, 46, 46); hatchIn(B, oval(cx, cy, 44, 44), [cx - 46, cy - 46, 92, 92], 7);
  for (let i = 0; i < 6; i++) {
    const t = (i / 6) * 6.283 + 0.3, x = cx + Math.cos(t) * 76, y = cy + Math.sin(t) * 76; topPerson(B, x, y, t + Math.PI);
    const ax = cx + Math.cos(t + 0.52) * 60, ay = cy + Math.sin(t + 0.52) * 60;
    B.lines.push(`<path class="sk-i" stroke-width="1.2" d="M${r1(ax - Math.cos(t) * 5)} ${r1(ay - Math.sin(t) * 5)} q${r1(Math.cos(t + 1.57) * 6)} ${r1(Math.sin(t + 1.57) * 6)} ${r1(Math.cos(t) * 10)} ${r1(Math.sin(t) * 10)}"/>`);
  }
  B.lines.push('<g transform="rotate(-18 330 170)">'); box(B, 300, 120, 60, 100, { passes: 1 });
  for (const yy of [140, 170, 200]) line(B, 300, yy, 360, yy, { passes: 1 }); B.lines.push('</g>');
}],
'every-thread-at-every-level': ['Every Thread at Every Level', "Sketch: a mannequin draws one thread up through a small hand loom. The loom has three cross rows, marked at the side from top to bottom with a diamond, a triangle, and a square; the drawn thread passes through all three and is hatched. The loom is the site. Its three rows are the levels of rules, in the site's column marks: the diamond is theory (metaconstitutional), the triangle is governance (collective-choice and constitutional), and the square is guides (operational). The upright threads are topic threads such as institutions or privacy. The hatched thread crossing every row is the solution, the focus: write about each thread at every level. The weaver is a contributor. The empty spaces still left in the weave are the cost the pattern names: a thread can look unfinished for a long time. The metaphor: the site as woven cloth, which holds together only where threads cross every level.", (B) => {
  ground(B); line(B, 140, 60, 140, 262); line(B, 300, 60, 300, 262); stroke(B, [[132, 60], [308, 60]]); stroke(B, [[132, 240], [308, 240]]);
  for (let x = 160; x <= 280; x += 20) if (x !== 220) B.lines.push(`<path class="sk-g" d="M${x} 62 L${x} 238"/>`);
  for (const [y, shape, to] of [[100, 'diamond', 296], [150, 'triangle', 256], [200, 'square', 296]]) {
    let d = `M144 ${y}`; for (let x = 150; x <= to; x += 10) d += ` L${x} ${y + (((x - 150) / 10) % 2 ? 3 : -3)}`;
    B.lines.push(`<path class="sk-i" d="${d}"/>`); mark(B, shape, 118, y, 8);
  }
  for (let y = 66; y < 236; y += 8) B.lines.push(`<path class="sk-h" d="M216 ${y + 6} L224 ${y}"/>`);
  line(B, 216, 62, 216, 238, { passes: 1 }); line(B, 224, 62, 224, 238, { passes: 1 });
  stroke(B, [[220, 60], [236, 48], [304, 50], [330, 140]], { passes: 1 });
  mannequin(B, 350, { face: -1, el: [-14, -100], wl: [-20, -120] });
}],
'every-page-links-out': ['Every Page Links Out', "Diagram in plan view: in open water, a hatched island in the middle with a page drawn on it is joined by small plank bridges to four other islands. The four islands carry, in turn, a small grid, a card with a circle on it, a closed book, and a thread circle. Each island is a page on the site. The open water between them is the problem: pages written one at a time drift apart, and a reader who lands on one never reaches the rest. The hatched middle island is any single page, the focus. Its bridges are its links, the solution: the grid island is the table, the card is a pattern the page introduces or applies, the book is the sources it draws on, and the thread circle is the other pieces in its thread. The metaphor: the site as an archipelago. A page with no bridges is an island in the bad sense.", (B) => {
  for (const [x, y] of [[30, 140], [140, 30], [300, 150], [180, 270], [350, 110], [40, 200], [250, 20], [120, 270]]) water(B, x, y);
  ellipse(B, 200, 150, 50, 36); hatchIn(B, oval(200, 150, 48, 34), [150, 114, 100, 72], 7); box(B, 188, 134, 24, 30, { passes: 1 });
  const isl = [[70, 62], [330, 62], [70, 238], [330, 238]];
  for (const [x, y] of isl) {
    ellipse(B, x, y, 42, 28);
    const dx = x < 200 ? 1 : -1, dy = y < 150 ? 1 : -1, x1 = x + dx * 34, y1 = y + dy * 18, x2 = 200 - dx * 40, y2 = 150 - dy * 22;
    const a = Math.atan2(y2 - y1, x2 - x1), nx = -Math.sin(a) * 5, ny = Math.cos(a) * 5;
    line(B, x1 + nx, y1 + ny, x2 + nx, y2 + ny, { passes: 1 }); line(B, x1 - nx, y1 - ny, x2 - nx, y2 - ny, { passes: 1 });
    for (let t = 0.15; t < 1; t += 0.17) { const px = x1 + (x2 - x1) * t, py = y1 + (y2 - y1) * t; line(B, px + nx, py + ny, px - nx, py - ny, { cls: 'sk-g', passes: 1 }); }
  }
  box(B, 56, 50, 28, 24, { passes: 1 }); line(B, 56, 62, 84, 62, { passes: 1 }); line(B, 70, 50, 70, 74, { passes: 1 });
  box(B, 314, 50, 32, 24, { passes: 1 }); ellipse(B, 324, 62, 5, 5, { passes: 1 }); line(B, 332, 58, 342, 58, { cls: 'sk-g', passes: 1 });
  stroke(B, [[56, 228], [80, 226], [84, 230], [84, 250], [60, 252], [56, 248]], { closed: true }); line(B, 61, 229, 61, 251, { passes: 1 });
  mark(B, 'circle', 330, 238, 9);
}],
'patterns-are-tested-in-practice': ['Patterns Are Tested in Practice', "Sketch: one mannequin stands with its arms held out while a second holds a hatched paper sewing pattern against it. The pattern's sleeve stops short of the wrist, and the second figure is drawing a dashed line with a pencil to lengthen it. The paper sewing pattern is one of this site's patterns, the focus. It was cut for someone else; holding it against a different person is the first half of the solution: apply the pattern in a piece besides the one that introduced it. The figure with its arms out is the practice the pattern meets: a real group or server. The short sleeve is a pattern that doesn't fit what happens in practice, and the pencil lengthening it is the second half of the solution: revise the pattern and say why. The metaphor: a pattern in the dressmaker's sense, a template that proves itself only when it's tried on, and is altered when it doesn't fit.", (B) => {
  ground(B);
  mannequin(B, 260, { face: -1, el: [-30, -92], wl: [-52, -92], er: [30, -92], wr: [52, -92] });
  const P = [[240, 164], [280, 164], [284, 214], [236, 214], [240, 180], [222, 180], [222, 168]];
  hatchIn(B, poly(P), [220, 162, 66, 54], 6); stroke(B, P, { closed: true, passes: 1 });
  B.lines.push('<path class="sk-i" stroke-dasharray="3 4" d="M222 168 L206 168 L206 180 L222 180"/>');
  const t = mannequin(B, 130, { er: [32, -84], wr: [62, -94] }); pencil(B, t.hr[0] + 2, t.hr[1] + 2, -0.2, 14);
}],
'any-cell-any-time': ['Any Cell, Any Time', "Sketch: a patchwork quilt hangs from a line between two posts, three squares across and three down, with a square, a triangle, and a diamond above its columns and a thread circle beside each row. Most squares are already sewn with simple stitched designs; one is empty. A mannequin reaches up to fit a single hatched patch into the empty square. The quilt is the site's table: its columns are guides, governance, and theory (the square, triangle, and diamond) and its rows are threads. The sewn squares are pieces other people have already contributed. The hatched patch is one contribution, the focus: a single guide, governance piece, essay, or pattern. Adding it while the rest of its row is unfinished is the solution: accept a contribution to any single cell at any time. The metaphor: a community quilt, made one patch at a time by whoever has one ready, and uneven until it's done.", (B) => {
  ground(B); line(B, 160, 40, 160, 262); line(B, 350, 40, 350, 262); stroke(B, [[156, 50], [354, 50]]);
  const gx = 174, gy = 60, cw = 54, ch = 48;
  ['square', 'triangle', 'diamond'].forEach((m, i) => mark(B, m, gx + i * cw + cw / 2, 30, 7));
  for (let r = 0; r < 3; r++) mark(B, 'circle', 374, gy + r * ch + ch / 2, 7);
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) {
    const x = gx + c * cw, y = gy + r * ch;
    if (c === 0 && r === 1) { B.lines.push(`<rect class="sk-i" x="${x + 2}" y="${y + 2}" width="${cw - 4}" height="${ch - 4}" stroke-dasharray="4 4"/>`); continue; }
    box(B, x, y, cw, ch, { passes: 1 });
    const m = (r * 3 + c) % 3;
    if (m === 0) { line(B, x + 8, y + 8, x + cw - 8, y + ch - 8, { cls: 'sk-g', passes: 1 }); line(B, x + cw - 8, y + 8, x + 8, y + ch - 8, { cls: 'sk-g', passes: 1 }); }
    if (m === 1) stroke(B, [[x + cw / 2, y + 8], [x + cw - 10, y + ch / 2], [x + cw / 2, y + ch - 8], [x + 10, y + ch / 2]], { closed: true, cls: 'sk-g', passes: 1 });
    if (m === 2) B.lines.push(`<rect class="sk-g" x="${x + 12}" y="${y + 10}" width="${cw - 24}" height="${ch - 20}"/>`);
  }
  const a = mannequin(B, 106, { er: [30, -96], wr: [54, -114] });
  box(B, a.hr[0], a.hr[1] - 20, 40, 36); hatch(B, a.hr[0] + 3, a.hr[1] - 17, 34, 30, { gap: 5 });
}],
'a-language-users-can-speak': ['A Language Users Can Speak', "Sketch: two mannequins face each other and talk. Both speech bubbles hold the same simple picture of two crossed keys; the first bubble is hatched. On the ground beside them sits a thick, closed binder. The figures are members of a group that runs a system together; neither is drawn as an expert. The crossed keys are a pattern's plain name, here Two Keyholders, turned into a picture: something anyone can say. The hatched bubble is the solution working, the focus: a member using the name in ordinary conversation. The same picture in the second bubble shows it understood and used back, the consequence that pattern names become the group's words. The closed binder is the technical detail, such as commands, tools, and configuration, which the solution keeps in the Actions and guides rather than in the name. The metaphor: pattern names as everyday words in a shared language, with the manual nearby but closed.", (B) => {
  ground(B);
  mannequin(B, 110, { er: [26, -76], wr: [38, -86] }); mannequin(B, 290, { s: 0.94, face: -1, el: [-26, -76], wl: [-38, -86] });
  stroke(B, [[96, 40], [186, 40], [192, 46], [192, 96], [186, 102], [150, 102], [128, 124], [132, 102], [96, 102], [90, 96], [90, 46]], { closed: true });
  hatch(B, 94, 44, 94, 56, { gap: 7 }); keysIcon(B, 141, 71);
  stroke(B, [[222, 54], [302, 54], [308, 60], [308, 104], [302, 110], [278, 110], [272, 128], [262, 110], [222, 110], [216, 104], [216, 60]], { closed: true });
  keysIcon(B, 262, 82);
  box(B, 178, 226, 44, 36); for (const yy of [234, 246]) ellipse(B, 182, yy, 3, 3, { passes: 1 }); line(B, 190, 226, 190, 262, { passes: 1 });
}],
'solution-first': ['Solution First', "Sketch: a mannequin writes with a pencil on a large card propped on an easel. Only one section in the middle of the card has been written, and it is hatched; the sections above and below it, and the title line at the top, are still blank. The card is a pattern being drafted, laid out like this site's pattern pages. The written middle section is the solution, the focus: the one thing the writer most wants to share, written first. The blank sections around it are the problem, context, forces, and consequences, worked out from the solution afterwards. The empty title line is the pattern's name, which the solution says to write last. The figure writing is anyone with experience to pass on. The metaphor: writing a pattern from the inside out, starting with what you would tell a newcomer and only then explaining when and why.", (B) => {
  ground(B); box(B, 196, 50, 130, 160); stroke(B, [[220, 210], [204, 262]]); stroke(B, [[302, 210], [318, 262]]); line(B, 261, 210, 261, 262, { passes: 1 });
  B.lines.push('<path class="sk-i" stroke-dasharray="5 5" d="M210 70 L312 70"/>');
  for (const y of [92, 120, 176, 196]) line(B, 206, y, 316, y, { cls: 'sk-g', passes: 1 });
  box(B, 204, 132, 114, 34, { passes: 1 }); hatch(B, 207, 135, 108, 28, { gap: 5 });
  for (const y of [142, 150, 158]) stroke(B, [[212, y], [240, y - 2], [270, y + 1], [300, y - 1]], { passes: 1 });
  const a = mannequin(B, 130, { er: [32, -84], wr: [62, -102] }); pencil(B, a.hr[0], a.hr[1], -0.5, 16);
}],
'workshop-the-pattern': ['Workshop the Pattern', "Sketch: two mannequin readers stand at a table with a hatched pattern card on it; one points at the card approvingly, and the other holds a pencil over it to suggest a change. The author stands apart with a hand cupped to one ear. The table and card are a pattern workshop: a new pattern set out for others to read before it leaves draft, and the card is the focus. The two readers are the solution's \"at least two readers besides its author\". The pointing reader is saying what works, which comes first; the reader with the pencil is saying what could be better, which comes second. The author standing apart and listening is the rule that the author listens first and asks questions only at the end. The metaphor: a pattern as a piece of craft set on a bench for others to inspect, with its maker stepping back.", (B) => {
  ground(B); stroke(B, [[110, 200], [270, 200]]); line(B, 122, 200, 122, 262); line(B, 258, 200, 258, 262); card(B, 172, 180, 36, 18);
  mannequin(B, 80, { er: [34, -80], wr: [76, -76] });
  const b = mannequin(B, 300, { face: -1, el: [-30, -84], wl: [-62, -92] }); pencil(B, b.hl[0], b.hl[1], 2.2, 16);
  mannequin(B, 368, { s: 0.85, face: -1, er: [20, -100], wr: [10, -112], el: [-14, -70], wl: [-6, -54] });
}],
};
for (const [slug, [title, desc, build]] of Object.entries(S)) { if (ONLY.length && !ONLY.includes(slug)) continue; seed = slug.length * 977 + 13; CUR = slug; clipN = 0; const B = { lines: [], text: [] }; build(B); fs.writeFileSync(`${OUT}/${slug}.svg`, svg(slug, title, desc, B)); }
console.log(ONLY.length ? ONLY.join(', ') : `${Object.keys(S).length} scenes`, 'drawn');
