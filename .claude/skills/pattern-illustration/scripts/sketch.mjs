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

// Scenes, keyed by pattern slug: [title, alt text, draw]. The alt text is written first; the drawing
// shows exactly what it says, with no words, letters, or numbers.
const S = {
'two-keyholders': ['Two Keyholders', "Sketch: two mannequin figures stand on either side of a server with two keyholes, each turning a key in its own lock at the same moment. The server is hatched. The server is the shared system from the pattern's context: something a group depends on. Each figure is a keyholder and each key is full admin access; there are two locks, so neither needs the other's help to get in. Both turning their keys at once is the second half of the solution: both keyholders use their access regularly, not just hold it. The metaphor: admin access as a physical key. A single admin is a building with one key; this pattern cuts a second one and puts it to use.", (B) => {
  ground(B); server(B, 172, 150, 56, 112);
  for (const kx of [184, 216]) { ellipse(B, kx, 168, 3.2, 3.2, { passes: 1 }); line(B, kx, 171, kx, 178, { passes: 1 }); }
  const a = mannequin(B, 104, { er: [30, -84], wr: [56, -92] }); key(B, a.hr[0] + 5, a.hr[1], 1);
  const b = mannequin(B, 296, { face: -1, el: [-30, -84], wl: [-56, -92] }); key(B, b.hl[0] - 5, b.hl[1], -1);
}],
'small-enough-to-understand': ['Small Enough to Understand', "Sketch: at a workbench, one mannequin points to a few small parts laid out side by side while a second leans in to look. Above the bench, a shelf holds one box beside a dashed outline of empty space. The parts are hatched. The parts on the bench are the whole system, kept small: few enough pieces that the second figure, a newer member, can see and learn all of them. The pointing and leaning in are the teaching that the solution makes possible: a second member could learn to run it in a weekend. The shelf is room to grow; the dashed outline is complexity that gets added only when a real need appears. The metaphor: a system as parts laid out on a workbench that anyone can see and handle, rather than a sealed machine only its builder can open.", (B) => {
  ground(B); stroke(B, [[140, 200], [300, 200]]); line(B, 150, 200, 150, 262); line(B, 290, 200, 290, 262);
  for (const x of [180, 212, 244]) { box(B, x, 184, 22, 16, { passes: 1 }); hatch(B, x + 2, 186, 18, 12, { gap: 4 }); }
  stroke(B, [[178, 112], [286, 112]]); line(B, 184, 112, 190, 124, { passes: 1 }); line(B, 280, 112, 274, 124, { passes: 1 });
  box(B, 190, 84, 30, 28, { passes: 1 }); B.lines.push('<rect class="sk-i" x="236" y="84" width="30" height="28" stroke-dasharray="4 5"/>');
  mannequin(B, 104, { er: [30, -76], wr: [52, -70] });
  mannequin(B, 336, { s: 0.9, face: -1, el: [-26, -70], wl: [-46, -62], er: [10, -66], wr: [16, -50] });
}],
'talk-before-you-enforce': ['Talk Before You Enforce', "Diagram in plan view, seen from above: six people stand in a ring facing a hatched open space in the middle, with small arcs of speech between them. Outside the ring, a fence panel lies flat on the ground. The ring of people is the group sharing a system, from the pattern's context. The hatched space between them is the solution's place to talk, such as a chat channel or a regular check-in, and the speech arcs are problems being raised there first. The fence panel is enforcement: quotas, permissions, bans. It lies set aside, not built: available if the group chooses it, but not the first response. The metaphor: a commons as a shared clearing where people meet in the open, instead of fencing each other off.", (B) => {
  const cx = 160, cy = 150;
  ellipse(B, cx, cy, 44, 44); hatch(B, cx - 42, cy - 42, 84, 84, { oval: true, gap: 7 });
  for (let i = 0; i < 6; i++) {
    const t = (i / 6) * 6.283 + 0.3, x = cx + Math.cos(t) * 82, y = cy + Math.sin(t) * 82; topPerson(B, x, y, t + Math.PI);
    const ax = cx + Math.cos(t) * 60, ay = cy + Math.sin(t) * 60;
    B.lines.push(`<path class="sk-i" d="M${r1(ax + Math.sin(t) * 6)} ${r1(ay - Math.cos(t) * 6)} Q${r1(ax - Math.cos(t) * 4)} ${r1(ay - Math.sin(t) * 4)} ${r1(ax - Math.sin(t) * 6)} ${r1(ay + Math.cos(t) * 6)}" stroke-width="1.2"/>`);
  }
  B.lines.push('<g transform="rotate(-18 330 170)">'); box(B, 300, 120, 60, 100, { passes: 1 });
  for (const yy of [140, 170, 200]) line(B, 300, yy, 360, yy, { passes: 1 }); B.lines.push('</g>');
}],
'every-thread-at-every-level': ['Every Thread at Every Level', "Sketch: a mannequin draws one thread up through a small hand loom. The loom has three cross rows, marked at the side from top to bottom with a diamond, a triangle, and a square, and the drawn thread passes through all three. That thread is hatched. The loom is the site. The three rows are its three levels of rules, using the site's column marks: the diamond is theory (metaconstitutional), the triangle is governance (collective-choice and constitutional), and the square is guides (operational). Each vertical thread is a topic thread, such as institutions or privacy. The hatched thread crossing every row is the solution: write about each thread at every level. The weaver is a contributor. The metaphor: the site as woven cloth, which only holds together where threads cross every level; the site's threads, taken literally.", (B) => {
  ground(B); line(B, 140, 60, 140, 262); line(B, 300, 60, 300, 262); stroke(B, [[132, 60], [308, 60]]); stroke(B, [[132, 240], [308, 240]]);
  for (let x = 160; x <= 280; x += 20) if (x !== 220) B.lines.push(`<path class="sk-g" d="M${x} 62 L${x} 238"/>`);
  for (const [y, shape] of [[100, 'diamond'], [150, 'triangle'], [200, 'square']]) {
    let d = `M144 ${y}`; for (let x = 150; x <= 296; x += 10) d += ` L${x} ${y + (((x - 150) / 10) % 2 ? 3 : -3)}`;
    B.lines.push(`<path class="sk-i" d="${d}"/>`); mark(B, shape, 118, y, 8);
  }
  for (let y = 66; y < 236; y += 8) B.lines.push(`<path class="sk-h" d="M216 ${y + 6} L224 ${y}"/>`);
  line(B, 216, 62, 216, 238, { passes: 1 }); line(B, 224, 62, 224, 238, { passes: 1 });
  stroke(B, [[220, 60], [236, 48], [304, 50], [330, 140]], { passes: 1 });
  mannequin(B, 350, { face: -1, el: [-14, -100], wl: [-20, -120] });
}],
'every-page-links-out': ['Every Page Links Out', "Diagram: a hatched page in the middle has curved arrows out to four others: a page ruled as a small grid, a card with a circle on it, a closed book, and a page marked with a hatched thread circle. The middle page is any single page on the site, the focus of the pattern, and the arrows are its links, all pointing outward. The grid page is the table; the card with a circle is a pattern; the closed book is the sources in the bibliography; the page with the thread circle is the other pieces in the same thread. Together they are the solution's list: link every page to its thread, the table, its patterns, and its sources. The metaphor: a page as one point in a web of lines. With no lines out, it would be an island, the problem the pattern names.", (B) => {
  box(B, 175, 116, 50, 64); hatch(B, 178, 119, 44, 58, { gap: 6 });
  const others = [[52, 40], [298, 40], [52, 196], [298, 196]];
  for (const [x, y] of others) { const tx = x + 25, ty = y + 22; arrow(B, 200 + (x < 200 ? -25 : 25), 148 + (y < 100 ? -32 : 32), x < 200 ? x + 54 : x - 4, ty, x < 200 ? -14 : 14); }
  box(B, 52, 40, 50, 44, { passes: 1 }); for (const yy of [55, 70]) line(B, 52, yy, 102, yy, { passes: 1 }); for (const xx of [69, 85]) line(B, xx, 40, xx, 84, { passes: 1 });
  box(B, 298, 44, 50, 36, { passes: 1 }); ellipse(B, 312, 62, 7, 7, { passes: 1 }); line(B, 324, 56, 342, 56, { cls: 'sk-g', passes: 1 }); line(B, 324, 66, 338, 66, { cls: 'sk-g', passes: 1 });
  stroke(B, [[52, 200], [96, 196], [102, 202], [102, 240], [58, 244], [52, 238]], { closed: true }); line(B, 60, 200, 60, 242, { passes: 1 });
  box(B, 298, 196, 50, 56, { passes: 1 }); mark(B, 'circle', 323, 214, 7, true); for (const yy of [232, 242]) line(B, 306, yy, 340, yy, { cls: 'sk-g', passes: 1 });
}],
'patterns-are-tested-in-practice': ['Patterns Are Tested in Practice', "Sketch: a mannequin holds a pattern card up beside a doorway it has built. On the card is a small drawing of a door narrower than the real one, and the figure is redrawing it wider with a pencil. The card is hatched. The doorway is practice: something actually built. The card is the pattern itself, the focus. Holding the card up against the real door is the first half of the solution: applying the pattern somewhere besides the piece that introduced it. The door on the card being too narrow is a pattern that doesn't fit what really happened, and the pencil redrawing it is the second half: revise the pattern and note why. The metaphor: a pattern as a plan, checked against the building, so the plan changes to fit the building and not the other way round.", (B) => {
  ground(B); stroke(B, [[250, 262], [250, 130], [320, 130], [320, 262]]); stroke(B, [[244, 130], [326, 130]]);
  for (let y = 150; y < 262; y += 20) { line(B, 238, y, 250, y, { cls: 'sk-g', passes: 1 }); line(B, 320, y, 332, y, { cls: 'sk-g', passes: 1 }); }
  const a = mannequin(B, 130, { er: [30, -96], wr: [52, -112], el: [22, -80], wl: [44, -92] });
  box(B, a.hr[0], a.hr[1] - 40, 46, 40); hatch(B, a.hr[0] + 3, a.hr[1] - 37, 40, 34, { gap: 5 });
  const dx = a.hr[0] + 18, dy = a.hr[1] - 6; stroke(B, [[dx, dy], [dx, dy - 22], [dx + 8, dy - 22], [dx + 8, dy]], { passes: 1 });
  B.lines.push(`<path class="sk-i" stroke-dasharray="3 3" d="M${dx - 6} ${dy} L${dx - 6} ${dy - 24} L${dx + 14} ${dy - 24} L${dx + 14} ${dy}"/>`);
  pencil(B, a.hl[0], a.hl[1], -0.9, 18);
}],
'any-cell-any-time': ['Any Cell, Any Time', "Sketch: a mannequin slots one card into a single empty cell of a large three-by-three grid. The columns are marked above with a square, a triangle, and a diamond, and a few other cells already hold cards. The new card is hatched. The grid is the site's table: its columns are guides, governance, and theory (the square, triangle, and diamond), and its rows are threads. The hatched card is one contribution: a single guide, governance piece, essay, or pattern. Slotting it into one cell while the rest of its row stays unfinished is the solution: accept a contribution to any single cell at any time, without waiting for the rest of the row. The cards already in place are other people's earlier contributions. The metaphor: the site as a shared wall of pigeonholes, filled one slot at a time by whoever has something to put there.", (B) => {
  ground(B); const gx = 150, gy = 50, cw = 66, ch = 50;
  for (let i = 0; i <= 3; i++) { line(B, gx, gy + i * ch, gx + 3 * cw, gy + i * ch, { passes: 1 }); line(B, gx + i * cw, gy, gx + i * cw, gy + 3 * ch, { passes: 1 }); }
  ['square', 'triangle', 'diamond'].forEach((m, i) => mark(B, m, gx + i * cw + cw / 2, gy - 16, 7));
  for (const [c, r] of [[0, 0], [2, 0], [1, 1], [2, 2]]) { const x = gx + c * cw + 12, y = gy + r * ch + 12; box(B, x, y, cw - 24, ch - 24, { passes: 1 }); line(B, x + 6, y + 9, x + cw - 30, y + 9, { cls: 'sk-g', passes: 1 }); line(B, x + 6, y + 17, x + cw - 36, y + 17, { cls: 'sk-g', passes: 1 }); }
  const a = mannequin(B, 100, { er: [30, -96], wr: [54, -114] }); card(B, a.hr[0] + 4, a.hr[1] - 12, 30, 20);
}],
'a-language-users-can-speak': ['A Language Users Can Speak', "Sketch: two mannequin figures face each other and talk. Each has a speech bubble, and both bubbles hold the same simple picture of two crossed keys. The first bubble is hatched. The two figures are members of a group that runs a system together; neither is drawn as an expert. The crossed keys are a pattern name, Two Keyholders, turned into a picture: a short, plain name that anyone can say. The same picture in both bubbles is the solution working: one person says the name, the other understands it and uses it back, so the pattern has become shared vocabulary in an ordinary conversation. The metaphor: pattern names as the words of a common language, simple enough to pass from person to person without a dictionary.", (B) => {
  ground(B);
  mannequin(B, 110, { er: [26, -76], wr: [38, -86] }); mannequin(B, 290, { s: 0.94, face: -1, el: [-26, -76], wl: [-38, -86] });
  stroke(B, [[96, 40], [186, 40], [192, 46], [192, 96], [186, 102], [150, 102], [128, 124], [132, 102], [96, 102], [90, 96], [90, 46]], { closed: true });
  hatch(B, 94, 44, 94, 56, { gap: 7 }); keysIcon(B, 141, 71);
  stroke(B, [[222, 54], [302, 54], [308, 60], [308, 104], [302, 110], [278, 110], [272, 128], [262, 110], [222, 110], [216, 104], [216, 60]], { closed: true });
  keysIcon(B, 262, 82);
}],
'solution-first': ['Solution First', "Sketch: a mannequin writes with a pencil on a large card propped on an easel. Only one section in the middle of the card has been written and is hatched; the sections above and below it and the title line at the top are still blank. The card is a pattern being drafted, laid out like this site's pattern pages. The written middle section is the Solution: the one thing worth sharing, written first. The blank sections around it are the problem, context, forces, and consequences, to be worked out from the solution afterwards. The empty title line is the pattern's name, which the solution says to write last. The metaphor: writing a pattern from the inside out, starting with what you would tell a newcomer and only then explaining why and when.", (B) => {
  ground(B); box(B, 196, 50, 130, 160); stroke(B, [[220, 210], [204, 262]]); stroke(B, [[302, 210], [318, 262]]); line(B, 261, 210, 261, 262, { passes: 1 });
  B.lines.push('<path class="sk-i" stroke-dasharray="5 5" d="M210 70 L312 70"/>');
  for (const y of [92, 120, 176, 196]) line(B, 206, y, 316, y, { cls: 'sk-g', passes: 1 });
  box(B, 204, 132, 114, 34, { passes: 1 }); hatch(B, 207, 135, 108, 28, { gap: 5 });
  for (const y of [142, 150, 158]) stroke(B, [[212, y], [240, y - 2], [270, y + 1], [300, y - 1]], { passes: 1 });
  const a = mannequin(B, 130, { er: [32, -84], wr: [62, -102] }); pencil(B, a.hr[0], a.hr[1], -0.5, 16);
}],
'workshop-the-pattern': ['Workshop the Pattern', "Sketch: two mannequin readers stand at a table with a pattern card on it; one points at the card approvingly, and the other holds a pencil over it to suggest a change. The author stands apart with a hand cupped to one ear. The card is hatched. The table and card are a pattern workshop: a new pattern laid out for others to read before it leaves draft. The pointing reader is saying what works, which comes first; the reader with the pencil is saying what could be better, which comes second. The author standing apart and listening is the rule that the author listens first and asks questions only at the end. The metaphor: a pattern as a piece of craft set on a bench for others to inspect, with its maker stepping back.", (B) => {
  ground(B); stroke(B, [[110, 200], [270, 200]]); line(B, 122, 200, 122, 262); line(B, 258, 200, 258, 262); card(B, 172, 180, 36, 18);
  mannequin(B, 80, { er: [34, -80], wr: [76, -76] });
  const b = mannequin(B, 300, { face: -1, el: [-30, -84], wl: [-62, -92] }); pencil(B, b.hl[0], b.hl[1], 2.2, 16);
  mannequin(B, 368, { s: 0.85, face: -1, er: [20, -100], wr: [10, -112], el: [-14, -70], wl: [-6, -54] });
}],
};
for (const [slug, [title, desc, build]] of Object.entries(S)) { if (ONLY.length && !ONLY.includes(slug)) continue; seed = slug.length * 977 + 13; const B = { lines: [], text: [] }; build(B); fs.writeFileSync(`${OUT}/${slug}.svg`, svg(slug, title, desc, B)); }
console.log(ONLY.length ? ONLY.join(', ') : `${Object.keys(S).length} scenes`, 'drawn');
