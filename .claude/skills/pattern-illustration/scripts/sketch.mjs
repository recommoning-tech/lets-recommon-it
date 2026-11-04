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
<style>.sk-i{fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}.sk-g{fill:none;stroke:currentColor;stroke-width:.9;opacity:.38;stroke-linecap:round}.sk-h{fill:none;stroke:var(--thread,#2f5da8);stroke-width:1.4;stroke-linecap:round;opacity:.85}.sk-s{fill:none;stroke:currentColor;stroke-width:.8;opacity:.45;stroke-linecap:round}.sk-p{fill:var(--paper,#ebe8de);stroke:none}.sk-t{fill:currentColor;font-family:'Architects Daughter',cursive;font-size:13px}</style>
<g filter="url(#rough-${slug})"${body.dx ? ` transform="translate(${body.dx} 0)"` : ''}>
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
function hatch(B, x, y, w, h, { gap = 6, oval = false, cls = 'sk-h' } = {}) {
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
    B.lines.push(`<path class="${cls}" d="M${j(x1, 1)} ${j(y1, 1)} L${j(x2, 1)} ${j(y2, 1)}"/>`);
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
  // Paper fill behind every part, so the horizon and anything behind the figure don't show through.
  // Fills are collected and inserted before the figure's lines when it's done.
  const start = B.lines.length, fills = [];
  const fillPoly = (pts) => fills.push(`<path class="sk-p" d="${poly(pts)}"/>`);
  const fillEll = ([cx, cy], rx, ry) => fills.push(`<ellipse class="sk-p" cx="${cx}" cy="${cy}" rx="${r1(rx)}" ry="${r1(ry)}"/>`);
  const tube = (a, b, w1, w2) => {
    const [ax, ay] = P(a), [bx, by] = P(b); const ang = Math.atan2(by - ay, bx - ax) + Math.PI / 2;
    const o = (w) => [Math.cos(ang) * w * s, Math.sin(ang) * w * s];
    const [o1x, o1y] = o(w1), [o2x, o2y] = o(w2);
    fillPoly([[ax + o1x, ay + o1y], [bx + o2x, by + o2y], [bx - o2x, by - o2y], [ax - o1x, ay - o1y]]);
    line(B, ax + o1x, ay + o1y, bx + o2x, by + o2y, { passes: 1 }); line(B, ax - o1x, ay - o1y, bx - o2x, by - o2y, { passes: 1 });
    guide(B, ax - (bx - ax) * 0.12, ay - (by - ay) * 0.12, bx + (bx - ax) * 0.12, by + (by - ay) * 0.12);
  };
  const joint = (p, rr = 3) => { const [px, py] = P(p); fillEll([px, py], rr * s, rr * s); ellipse(B, px, py, rr * s, rr * s, { passes: 1 }); };
  // head with construction cross, turned toward `face`
  const [hx, hy] = P([0, -113]);
  fillEll([hx, hy], 8.5 * s, 10.5 * s); ellipse(B, hx, hy, 8.5 * s, 10.5 * s);
  B.lines.push(`<path class="sk-g" d="M${r1(hx + face * 3 * s)} ${r1(hy - 10 * s)} Q${r1(hx + face * 5.5 * s)} ${hy} ${r1(hx + face * 3 * s)} ${r1(hy + 10 * s)} M${r1(hx - 8 * s)} ${r1(hy - 1 * s)} Q${hx} ${r1(hy + 1.5 * s)} ${r1(hx + 8 * s)} ${r1(hy - 1 * s)}"/>`);
  fillPoly([P([-2.5, -103]), P([2.5, -103]), P([2.5, -95]), P([-2.5, -95])]); fillPoly([P([-5, -73]), P([5, -73]), P([5, -63]), P([-5, -63])]);
  line(B, ...P([0, -102]), ...P([0, -96]), { passes: 1 });
  fillPoly([P([-15, -95]), P([15, -95]), P([11, -72]), P([-11, -72])]); stroke(B, [P([-15, -95]), P([15, -95]), P([11, -72]), P([-11, -72])], { closed: true });
  fillPoly([P([-10, -64]), P([10, -64]), P([8, -51]), P([-8, -51])]); stroke(B, [P([-10, -64]), P([10, -64]), P([8, -51]), P([-8, -51])], { closed: true });
  guide(B, ...P([0, -100]), ...P([0, -48]));
  joint([0, -68], 2.5);
  for (const [sh, e, w] of [[[-15, -92], el, wl], [[15, -92], er, wr]]) {
    joint(sh); tube(sh, e, 3.2, 2.6); joint(e, 2.6); tube(e, w, 2.6, 2); const [wx, wy] = P(w); fillEll([wx, wy], 3.6 * s, 4.4 * s); ellipse(B, wx, wy, 3.6 * s, 4.4 * s, { passes: 1 });
  }
  for (const [hp, k, ft] of [[[-6, -53], kl, -1], [[6, -53], kr, 1]]) {
    joint(hp); tube(hp, k, 3.8, 3); joint(k, 2.8); const an = [k[0] + (k[0] > 0 ? 1 : -1), -4]; tube(k, an, 3, 2.2);
    fillPoly([P([an[0] - 2, -4]), P([an[0] + face * 9, 0]), P([an[0] - 3, 0])]); stroke(B, [P([an[0] - 2, -4]), P([an[0] + face * 9, 0]), P([an[0] - 3, 0])], { passes: 1 });
  }
  B.lines.splice(start, 0, ...fills);
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
function hatchIn(B, d, [x, y, w, h], gap = 6, cls = 'sk-h') {
  const id = `clip-${CUR}-${++clipN}`;
  B.lines.push(`<clipPath id="${id}"><path d="${d}"/></clipPath><g clip-path="url(#${id})">`); hatch(B, x, y, w, h, { gap, cls }); B.lines.push('</g>');
}
const oval = (cx, cy, rx, ry) => `M${cx - rx} ${cy} a${rx} ${ry} 0 1 0 ${2 * rx} 0 a${rx} ${ry} 0 1 0 ${-2 * rx} 0 Z`;
const poly = (pts) => 'M' + pts.map(([x, y]) => `${x} ${y}`).join(' L') + ' Z';
function wrench(B, x, y, a) { const dx = Math.cos(a), dy = Math.sin(a); line(B, x, y, x + dx * 24, y + dy * 24, { passes: 1 }); ellipse(B, x + dx * 28, y + dy * 28, 5, 5, { passes: 1 }); }
function water(B, x, y) { B.lines.push(`<path class="sk-g" d="M${x} ${y} q5 -4 10 0 t10 0 t10 0"/>`); }

// ---- Drafter's perspective -------------------------------------------------------------
// One two-point camera for the whole set: world units are roughly centimetres, y is up, the
// ground is y = 0. Horizon (the camera's eye height) at about mid-chest on the figures; vanishing
// points far outside the canvas.
let CAM;
function camera({ yaw = 30, e = 120, f = 1200, D = 1333, cx = 160, hs = 147 } = {}) {
  const t = (yaw * Math.PI) / 180;
  CAM = { c: Math.cos(t), s: Math.sin(t), e, f, D, cx, hs, pos: [D * Math.sin(t), e, -D * Math.cos(t)] };
}
let XMIN = Infinity, XMAX = -Infinity; // horizontal extent of the scene, for centring
function P([x, y, z]) {
  const xr = x * CAM.c + z * CAM.s, zr = -x * CAM.s + z * CAM.c, k = CAM.f / (zr + CAM.D);
  const X = r1(CAM.cx + xr * k); XMIN = Math.min(XMIN, X); XMAX = Math.max(XMAX, X);
  return [X, r1(CAM.hs + (CAM.e - y) * k)];
}
const depthScale = (x, z) => CAM.f / (-x * CAM.s + z * CAM.c + CAM.D) / 0.75;
const sub = (a, b) => a.map((v, i) => v - b[i]), dot = (a, b) => a.reduce((t, v, i) => t + v * b[i], 0);
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const avg = (pts) => pts[0].map((_, i) => pts.reduce((t, p) => t + p[i], 0) / pts.length);
const bbox = (pts) => { const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]); const x = Math.min(...xs), y = Math.min(...ys); return [x - 2, y - 2, Math.max(...xs) - x + 4, Math.max(...ys) - y + 4]; };
const horizon = (B) => B.lines.push(`<path class="sk-g" d="M0 ${CAM.hs} L400 ${CAM.hs}"/>`);

// A convex solid from 3D faces. Hidden faces are dropped; visible ones are filled with paper so
// they hide what's behind, shaded with light ink if they face away from the light (from the
// left-front), and hatched in the thread color if marked focus. Base edges get faint guide lines.
function solid(B, faces, { focus = -1, shade = true, guides = true } = {}) {
  const centre = avg(faces.flat());
  faces.forEach((pts, idx) => {
    let n = cross(sub(pts[1], pts[0]), sub(pts[2], pts[0]));
    const fc = avg(pts);
    if (dot(n, sub(fc, centre)) < 0) n = n.map((v) => -v);
    if (dot(n, sub(fc, CAM.pos)) >= 0) return;
    const q = pts.map(P), d = poly(q), len = Math.hypot(...n);
    B.lines.push(`<path class="sk-p" d="${d}"/>`);
    if (idx === focus) hatchIn(B, d, bbox(q), 6);
    else if (shade && n[0] / len > 0.35) hatchIn(B, d, bbox(q), 4.5, 'sk-s');
    stroke(B, q, { closed: true, passes: 2 });
  });
  if (guides) {
    const base = faces.flat().filter((p) => p[1] === Math.min(...faces.flat().map((q) => q[1])));
    for (const p of base.slice(0, 2)) { const [a, b] = [P(p), P([p[0] - 40, p[1], p[2]])]; B.lines.push(`<path class="sk-g" d="M${a[0]} ${a[1]} L${r1(a[0] + (b[0] - a[0]) * 1.6)} ${r1(a[1] + (b[1] - a[1]) * 1.6)}"/>`); }
  }
}
// Box from its near-left-bottom corner [x, y, z] and size [w, h, d]. focus: 'front'|'side'|'top'.
function prism(B, [x, y, z], [w, h, d], { focus, ...o } = {}) {
  const X = x + w, Y = y + h, Z = z + d;
  const f = [
    [[x, y, z], [X, y, z], [X, Y, z], [x, Y, z]], [[x, y, Z], [X, y, Z], [X, Y, Z], [x, Y, Z]],
    [[x, y, z], [x, y, Z], [x, Y, Z], [x, Y, z]], [[X, y, z], [X, y, Z], [X, Y, Z], [X, Y, z]],
    [[x, Y, z], [X, Y, z], [X, Y, Z], [x, Y, Z]], [[x, y, z], [X, y, z], [X, y, Z], [x, y, Z]],
  ];
  solid(B, f, { ...o, focus: { front: 0, back: 1, left: 2, side: 3, top: 4 }[focus] ?? -1 });
}
// A flat quad in 3D (a card, a door, a page), optionally hatched as the focus.
function quad(B, pts, { focus = false, fill = true, cls } = {}) {
  const q = pts.map(P), d = poly(q);
  if (fill) B.lines.push(`<path class="sk-p" d="${d}"/>`);
  if (focus) hatchIn(B, d, bbox(q), 5);
  stroke(B, q, { closed: true, passes: cls ? 1 : 2, cls: cls ?? 'sk-i' });
  return q;
}
const line3 = (B, a, b, o) => line(B, ...P(a), ...P(b), o);
// A circle in 3D: plane 'xz' (horizontal, like a table top) or 'xy' (upright, like a wheel).
function circle3(B, [cx, cy, cz], r, plane = 'xz', { fill = false, focus = false, passes = 2 } = {}) {
  const pts = []; for (let i = 0; i < 36; i++) { const t = (i / 36) * 6.283; pts.push(plane === 'xz' ? [cx + Math.cos(t) * r, cy, cz + Math.sin(t) * r] : [cx + Math.cos(t) * r, cy + Math.sin(t) * r, cz]); }
  const q = pts.map(P), d = poly(q);
  if (fill) B.lines.push(`<path class="sk-p" d="${d}"/>`);
  if (focus) hatchIn(B, d, bbox(q), 6);
  stroke(B, [...q, q[0]], { passes });
  return q;
}
// A mannequin standing at ground point (x, z), scaled for depth. reachR / reachL: a screen point
// the right / left hand should reach; the arm is bent to get there.
function person(B, x, z, { reachR, reachL, s = 1, ...o } = {}) {
  const [X, Y] = P([x, 0, z]); const sc = depthScale(x, z) * s;
  const arm = (t, sh) => {
    if (!t) return null; let w = [(t[0] - X) / sc, (t[1] - Y) / sc];
    const dx = w[0] - sh[0], dy = w[1] - sh[1], L = Math.hypot(dx, dy), MAX = 46; // a natural reach, in mannequin units
    if (L > MAX) w = [sh[0] + (dx / L) * MAX, sh[1] + (dy / L) * MAX];
    return [[(sh[0] + w[0]) / 2 + (w[0] > sh[0] ? -4 : 4), (sh[1] + w[1]) / 2 + 8], w];
  };
  const R = arm(reachR, [15, -92]), L = arm(reachL, [-15, -92]);
  return mannequin(B, X, { ...o, s: sc, gy: Y, ...(R && { er: R[0], wr: R[1] }), ...(L && { el: L[0], wl: L[1] }) });
}

// Scenes, keyed by pattern slug: [title, alt text, draw]. The alt text is written first, from the
// pattern's map; the drawing shows exactly what it says, with no words, letters, or numbers.
// Every scene uses the shared camera() unless a bird's-eye view needs a higher eye.
const W = (xr, zr) => [xr * CAM.c - zr * CAM.s, xr * CAM.s + zr * CAM.c]; // camera-frame ground point -> world
const S = {
'two-keyholders': ['Two Keyholders', "Sketch in perspective: a long wall with one hatched door in it. At the door, a mannequin turns a key in the lock. From the right, a second mannequin walks up holding its own key out, ready to use it. The wall and door are the shared system from the pattern's context: something a group depends on, with one way in. The door is admin access, the focus. Each key is full access, and each figure is a keyholder. Two keys for one door is the first half of the solution: at least two people can get in, without needing each other. The second figure arriving with its own key out, about to take a turn, is the second half: both keyholders use their access regularly. The consequence is that the door still opens whichever of them is away. The metaphor: admin access as the key to a shared building, with a second key cut and carried, not left in a drawer.", (B) => {
  camera(); horizon(B);
  prism(B, [-130, 0, 150], [260, 170, 16]);
  for (let y = 24; y < 170; y += 24) line3(B, [-128, y, 150], [128, y, 150], { cls: 'sk-g', passes: 1 });
  quad(B, [[-20, 0, 150], [30, 0, 150], [30, 112, 150], [-20, 112, 150]], { focus: true });
  prism(B, [-26, 112, 144], [62, 8, 6], { guides: false });
  const L = P([22, 56, 150]); ellipse(B, ...L, 2.4, 2.4, { passes: 1 });
  const a = person(B, -30, 100, { reachR: [L[0] - 14, L[1]] }); key(B, a.hr[0] + 2, a.hr[1], 1);
  const b = person(B, 175, 60, { face: -1, kl: [-12, -27], kr: [13, -28], el: [-22, -84], wl: [-34, -100] }); key(B, b.hl[0] - 2, b.hl[1], -1);
}],
'small-enough-to-understand': ['Small Enough to Understand', "Sketch in perspective: a table with a shallow open tray on it, hatched, holding three small parts. In front of the table, one mannequin points into the tray; behind it, a second mannequin leans in and reaches for a part. Beside the tray, a dashed outline on the table top marks an empty space. The tray and its few parts are the system from the pattern's context: the hardware and software a group runs. Kept this small and open, it is the solution, the focus: a system small enough that everything can be seen at once. The pointing figure knows it; the reaching figure is a second member learning to run it, as the solution says, within a weekend. The dashed space is the solution's second half: room left for complexity, added only when a real need appears. The metaphor: a system as a tray of parts laid out on a table, not a sealed box only its builder can open.", (B) => {
  camera(); horizon(B);
  person(B, 30, 270, { face: -1, s: 0.96, reachL: P([-6, 108, 186]) });
  for (const [x, z] of [[-78, 214], [72, 214]]) prism(B, [x, 0, z], [6, 72, 6], { guides: false, shade: false });
  prism(B, [-82, 72, 150], [164, 6, 72], { guides: false });
  for (const [x, z] of [[-78, 152], [72, 152]]) prism(B, [x, 0, z], [6, 72, 6], { guides: false });
  prism(B, [-56, 78, 160], [96, 8, 50], { focus: 'top', guides: false });
  prism(B, [-46, 86, 172], [22, 16, 18], { guides: false }); prism(B, [-16, 86, 178], [20, 24, 16], { guides: false }); prism(B, [12, 86, 168], [18, 12, 22], { guides: false });
  B.lines.push(`<path class="sk-i" stroke-dasharray="4 4" d="${poly([[40, 78, 172], [72, 78, 172], [72, 78, 204], [40, 78, 204]].map(P))}"/>`);
  person(B, -140, 120, { reachR: P([-36, 100, 180]) });
}],
'talk-before-you-enforce': ['Talk Before You Enforce', "Sketch from above: five mannequins stand in a ring around a round rug, which is hatched, with small arcs of speech coming from them toward its middle. Away to the front right, a fence panel lies flat on the ground, unused. The people are the group sharing a system, from the pattern's context, with problems to deal with. The rug is the solution, the focus: a place set aside for the group to talk, such as a chat channel or a regular check-in. The speech arcs are a problem being raised there first, in front of everyone, instead of decided by an admin alone. The fence panel is technical enforcement, such as quotas, permissions, and bans: set aside, not built, and still there if the group chooses to use it later. The metaphor: a meeting ground everyone stands around as equals, where talking comes before fencing anyone in.", (B) => {
  camera({ e: 450, hs: -150 });
  const T = W(0, 230), at = (xr, zr) => W(xr, 230 + zr), heads = [];
  for (const [xr, zr, f] of [[-70, 95, 1], [0, 112, 1], [70, 95, -1]]) heads.push(person(B, ...at(xr, zr), { face: f, er: [20, -74], wr: [26, -56] }).head);
  circle3(B, [T[0], -2, T[1]], 98, 'xz', { fill: true, passes: 1 }); circle3(B, [T[0], 0, T[1]], 98, 'xz', { fill: true, focus: true });
  heads.push(person(B, ...at(-140, 10), { face: 1, er: [24, -76], wr: [34, -66] }).head);
  heads.push(person(B, ...at(140, 0), { face: -1, el: [-24, -76], wl: [-34, -66] }).head);
  const c = P([T[0], 0, T[1]]);
  for (const [hx, hy] of heads) { const dx = c[0] - hx, dy = c[1] - hy, L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, ax = hx + ux * 22, ay = hy + uy * 22;
    B.lines.push(`<path class="sk-i" stroke-width="1.2" d="M${r1(ax - uy * 5)} ${r1(ay + ux * 5)} q${r1(ux * 5)} ${r1(uy * 5)} ${r1(uy * 10)} ${r1(-ux * 10)}"/>`); }
  const F = at(120, -200); prism(B, [F[0], 0, F[1]], [110, 5, 40]);
  for (let x = F[0] + 20; x < F[0] + 110; x += 24) line3(B, [x, 5, F[1]], [x, 5, F[1] + 40], { passes: 1 });
}],
'every-thread-at-every-level': ['Every Thread at Every Level', "Sketch in perspective: an open-sided building of three storeys, its floors marked at the side, from the ground up, with a square, a triangle, and a diamond. A rope, hatched, hangs from the roof down the front of the building, passing through a ring at the edge of every floor. Beside the building, a mannequin holds the rope's lower end. The building is the site, and its three floors are the levels of rules, in the site's column marks: the square is guides (operational), the triangle is governance (collective-choice and constitutional), and the diamond is theory (metaconstitutional). The rope is one topic thread. Threaded through every floor, it is the solution, the focus: write about each thread at every level. The figure holding it is a contributor. The metaphor: a thread that ties a building's floors together, so moving between levels is a matter of following the rope.", (B) => {
  camera(); horizon(B);
  const cols = [[-100, 140], [42, 140], [-100, 212], [42, 212]];
  for (const [x, z] of cols.slice(2)) prism(B, [x, 0, z], [8, 214, 8], { guides: false });
  for (const y of [0, 62, 132, 202]) prism(B, [-104, y, 136], [154, y ? 8 : 5, 88], { guides: !y });
  for (const [x, z] of cols.slice(0, 2)) prism(B, [x, 0, z], [8, 214, 8], { guides: false });
  for (const [y, m] of [[30, 'square'], [98, 'triangle'], [168, 'diamond']]) mark(B, m, ...P([-124, y, 140]), 8);
  quad(B, [[62, 64, 146], [74, 64, 146], [74, 214, 146], [62, 214, 146]], { focus: true, fill: true });
  for (const y of [66, 136, 206]) { line3(B, [50, y + 4, 146], [62, y + 4, 146], { passes: 1 }); circle3(B, [68, y + 4, 146], 9, 'xz', { passes: 1 }); }
  const w = person(B, 140, 105, { face: -1, reachL: P([68, 96, 146]) });
  stroke(B, [P([68, 64, 146]), P([72, 54, 146]), w.hl], { passes: 1 });
}],
'every-page-links-out': ['Every Page Links Out', "Sketch in perspective: a wooden fingerpost stands where two paths cross, with a blank, hatched board at its top. Below the board, four arms point in four directions. On them, in turn, are a small grid, a card with a circle on it, a closed book, and a thread circle. A mannequin stands at the foot of the post, pointing up at the arms. The post's blank board is a single page on the site, the focus. The crossing paths are where readers arrive, often straight from a search. The arms are the page's links, the solution: the grid points to the table, the card to a pattern the page introduces or applies, the book to the sources it draws on, and the thread circle to the other pieces in its thread. The figure is a reader who has just arrived and can see where to go next. The metaphor: a page as a signpost, not a dead end.", (B) => {
  camera(); horizon(B);
  for (const z of [134, 176]) line3(B, [-230, 0, z], [230, 0, z], { cls: 'sk-g', passes: 1 });
  for (const x of [-22, 22]) line3(B, [x, 0, 20], [x, 0, 420], { cls: 'sk-g', passes: 1 });
  const arm = (o, sz, sym) => { prism(B, o, sz, { guides: false }); return P([o[0] + sz[0] / 2, o[1] + sz[1] / 2, o[2]]); };
  const a3 = arm([-3, 92, 166], [5, 16, 62]);
  prism(B, [-6, 0, 150], [12, 182, 12], { guides: false });
  quad(B, [[-20, 160, 149], [20, 160, 149], [20, 192, 149], [-20, 192, 149]], { focus: true });
  const a1 = arm([6, 136, 152], [64, 16, 5]), a2 = arm([-70, 116, 152], [64, 16, 5]), a4 = arm([-3, 70, 92], [5, 16, 58]);
  { const [x, y] = a1; box(B, x - 7, y - 6, 14, 12, { passes: 1 }); line(B, x, y - 6, x, y + 6, { passes: 1 }); line(B, x - 7, y, x + 7, y, { passes: 1 }); }
  { const [x, y] = a2; box(B, x - 9, y - 6, 18, 12, { passes: 1 }); ellipse(B, x - 3, y, 3, 3, { passes: 1 }); }
  { const [x, y] = a3; stroke(B, [[x - 7, y - 5], [x + 6, y - 6], [x + 7, y + 5], [x - 6, y + 6]], { closed: true, passes: 1 }); line(B, x - 4, y - 5, x - 3, y + 6, { passes: 1 }); }
  { const [x, y] = a4; mark(B, 'circle', x, y, 6); }
  person(B, -110, 90, { reachR: P([10, 150, 152]) });
}],
'patterns-are-tested-in-practice': ['Patterns Are Tested in Practice', "Sketch in perspective: a stove with a pot on it, steam rising. One mannequin stands at the stove tasting from the pot with a spoon. A second mannequin stands nearby holding up a hatched recipe card and writing a correction on it with a pencil. The recipe card is a pattern, the focus. The stove and pot are practice: a real place where the pattern gets used. Cooking from the card and tasting the result is the first half of the solution: apply the pattern somewhere besides where it was written. Writing on the card is the second half: when the pattern doesn't fit what happens in practice, revise it and say why. The two figures are different people, so the test isn't only by the pattern's author. The metaphor: a pattern as a recipe, which proves itself only when it's cooked, and gets corrected in the margins.", (B) => {
  camera(); horizon(B);
  prism(B, [-40, 0, 190], [130, 82, 60]);
  circle3(B, [26, 82, 218], 30, 'xz', { fill: true, passes: 1 });
  const pl = P([-6, 82, 218]), pr = P([58, 82, 218]), tl = P([-6, 128, 218]), tr = P([58, 128, 218]);
  B.lines.push(`<path class="sk-p" d="${poly([pl, pr, tr, tl])}"/>`); line(B, ...pl, ...tl); line(B, ...pr, ...tr); hatchIn(B, poly([pl, pr, tr, tl]), bbox([pl, pr, tr, tl]), 4.5, 'sk-s');
  circle3(B, [26, 82, 218], 32, 'xz', { passes: 1 }); circle3(B, [26, 128, 218], 32, 'xz', { fill: true });
  for (const dx of [-8, 4, 16]) B.lines.push(`<path class="sk-g" d="M${tl[0] + 18 + dx} ${tl[1] - 10} q6 -8 0 -16 t0 -16"/>`);
  const a = person(B, -30, 125, { face: 1, reachR: P([10, 134, 214]) }); line(B, a.hr[0], a.hr[1], a.hr[0] + 14, a.hr[1] + 6, { passes: 1 }); ellipse(B, a.hr[0] + 17, a.hr[1] + 7, 4, 2.5, { passes: 1 });
  const b = person(B, -150, 70, { face: 1, el: [10, -76], wl: [26, -88], er: [26, -76], wr: [36, -84] });
  box(B, b.hl[0] - 2, b.hl[1] - 26, 34, 24); hatch(B, b.hl[0] + 1, b.hl[1] - 23, 28, 18, { gap: 5 }); pencil(B, b.hr[0], b.hr[1], -2.3, 12);
}],
'any-cell-any-time': ['Any Cell, Any Time', "Sketch in perspective: an open shelf divided into three rows of three cubbies, with a square, a triangle, and a diamond above its columns and a thread circle beside each row. Most cubbies hold a box; one, at the left of the middle row, is empty. A mannequin slides a single hatched box into it. The shelf is the site's table: its columns are guides, governance, and theory (the square, triangle, and diamond) and its rows are threads. The boxes already in place are pieces other people have contributed. The hatched box is one contribution, the focus: a single guide, governance piece, essay, or pattern. Sliding it into one cubby while others in the same row are still missing is the solution: accept a contribution to any single cell at any time, without waiting for the rest of the row. The metaphor: a shared shelf that anyone can fill one cubby at a time.", (B) => {
  camera(); horizon(B);
  const z0 = 160, d = 40, X0 = -90, cw = 60, ch = 50;
  quad(B, [[X0, 0, z0 + d], [X0 + 3 * cw, 0, z0 + d], [X0 + 3 * cw, 3 * ch, z0 + d], [X0, 3 * ch, z0 + d]]);
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) if (!(c === 0 && r === 1)) prism(B, [X0 + c * cw + 8, r * ch + 4, z0 + 6], [cw - 16 - (r + c) % 2 * 8, ch - 12 - (c * 2 + r) % 3 * 6, d - 10], { guides: false });
  for (let r = 0; r <= 3; r++) prism(B, [X0 - 2, r * ch, z0], [3 * cw + 4, 4, d], { guides: false, shade: false });
  for (let c = 0; c <= 3; c++) prism(B, [X0 + c * cw - 2, 0, z0], [4, 3 * ch + 4, d], { guides: false, shade: c === 3 });
  ['square', 'triangle', 'diamond'].forEach((m, c) => mark(B, m, ...P([X0 + c * cw + cw / 2, 3 * ch + 16, z0]), 7));
  for (let r = 0; r < 3; r++) mark(B, 'circle', ...P([X0 + 3 * cw + 18, r * ch + ch / 2, z0]), 7);
  B.lines.push(`<path class="sk-i" stroke-dasharray="4 4" d="${poly([[X0 + 4, ch + 6, z0], [X0 + cw - 4, ch + 6, z0], [X0 + cw - 4, 2 * ch - 4, z0], [X0 + 4, 2 * ch - 4, z0]].map(P))}"/>`);
  person(B, -150, 110, { reachR: P([X0 - 16, ch + 22, z0 - 30]) });
  prism(B, [X0 - 18, ch + 8, z0 - 34], [44, 30, 30], { focus: 'front' });
}],
'a-language-users-can-speak': ['A Language Users Can Speak', "Sketch in perspective: two mannequins stand facing each other and talk, one nearer the viewer and one farther back. Both speech bubbles hold the same simple picture of two crossed keys; the nearer figure's bubble is hatched. On the ground between them sits a thick binder, closed. The figures are members of a group running a system together; neither is drawn as an expert. The crossed keys are a pattern's plain name, here Two Keyholders, turned into a picture: short enough for anyone to say. The hatched bubble is the solution, the focus: a member using the name in ordinary conversation. The same picture in the other bubble is the consequence, the name understood and used back, so it becomes the group's word. The closed binder holds the technical detail the solution keeps out of the name, in the Actions and guides. The metaphor: pattern names as everyday words, with the manual nearby but shut.", (B) => {
  camera(); horizon(B);
  const b = person(B, 110, 170, { face: -1, el: [-24, -76], wl: [-34, -86] });
  prism(B, [-20, 0, 70], [36, 44, 10]);
  for (const y of [12, 32]) circle3(B, [-20, y, 75], 3, 'xy', { passes: 1 });
  const a = person(B, -110, 30, { er: [26, -76], wr: [38, -86] });
  const bub = (hx, hy, w, h, dir, hatched) => {
    const x = hx - w / 2 + dir * 20, y = hy - h - 34;
    stroke(B, [[x + 6, y], [x + w - 6, y], [x + w, y + 6], [x + w, y + h - 6], [x + w - 6, y + h], [hx + 10 * dir + 8, y + h], [hx + 4 * dir, y + h + 18], [hx + 10 * dir - 4, y + h], [x + 6, y + h], [x, y + h - 6], [x, y + 6]], { closed: true });
    if (hatched) hatch(B, x + 4, y + 4, w - 8, h - 8, { gap: 7 });
    keysIcon(B, x + w / 2 - 6, y + h / 2);
  };
  bub(...a.head, 96, 56, 1, true); bub(...b.head, 80, 48, -1, false);
}],
'solution-first': ['Solution First', "Sketch in perspective: a large card leans back on a three-legged easel, and a mannequin stands beside it writing with a pencil. Only one band in the middle of the card is written, and it is hatched; the bands above and below it, and a dashed title line at the top, are still blank. The card is a pattern being drafted, with the sections this site's pattern pages use. The written middle band is the solution, the focus: the one thing the writer most wants to share, written first. The blank bands are the problem, context, forces, and consequences, worked out from the solution afterwards. The dashed title line is the name, which the solution says to write last. The writer is anyone with experience to pass on. The metaphor: a pattern written from the middle out, starting from what you'd tell a newcomer and only then explaining when and why.", (B) => {
  camera(); horizon(B);
  const at = (u, v) => [-60 + u * 120, 60 + v * 150, 120 + v * 24];
  line3(B, at(0.5, 1), [0, 0, 220]);
  quad(B, [at(0, 0), at(1, 0), at(1, 1), at(0, 1)]);
  line3(B, at(0.08, 0), [-62, 0, 100]); line3(B, at(0.92, 0), [62, 0, 100]); prism(B, [-66, 52, 112], [132, 6, 12], { guides: false });
  B.lines.push(`<path class="sk-i" stroke-dasharray="5 5" d="M${P(at(0.08, 0.9)).join(' ')} L${P(at(0.92, 0.9)).join(' ')}"/>`);
  for (const v of [0.78, 0.66, 0.3, 0.17]) line3(B, at(0.06, v), at(0.94, v), { cls: 'sk-g', passes: 1 });
  quad(B, [at(0.05, 0.38), at(0.95, 0.38), at(0.95, 0.56), at(0.05, 0.56)], { focus: true });
  for (const v of [0.43, 0.47, 0.51]) stroke(B, [at(0.1, v), at(0.4, v - 0.01), at(0.7, v + 0.01), at(0.9, v)].map(P), { passes: 1 });
  const a = person(B, -112, 70, { reachR: P(at(0.1, 0.47)) }); pencil(B, a.hr[0], a.hr[1], -0.5, 14);
}],
'workshop-the-pattern': ['Workshop the Pattern', "Sketch in perspective: a table on four legs with a hatched pattern card lying on it. In front of the table, one mannequin reader points at the card; behind it, a second reader leans over the card holding a pencil. To the right, apart from the table, the author stands with a hand cupped to one ear. The table and card are a pattern workshop, a new pattern set out to be read before it leaves draft; the card is the focus. The two readers are the solution's readers besides the author. The pointing reader says what works, which comes first; the reader with the pencil says what could be better, which comes second. The author standing apart and listening is the rule that the author listens first and asks questions only at the end. The metaphor: a pattern as a piece of work set on a bench for others to look over, while its maker steps back.", (B) => {
  camera(); horizon(B);
  const r2 = person(B, 40, 236, { face: -1, reachL: P([8, 82, 150]) }); pencil(B, r2.hl[0], r2.hl[1], 2.0, 14);
  for (const [x, z] of [[-76, 186], [70, 186]]) prism(B, [x, 0, z], [6, 72, 6], { guides: false, shade: false });
  prism(B, [-80, 72, 100], [160, 6, 92], { guides: false });
  for (const [x, z] of [[-76, 100], [70, 100]]) prism(B, [x, 0, z], [6, 72, 6], { guides: false });
  quad(B, [[-14, 78, 130], [26, 78, 130], [26, 78, 158], [-14, 78, 158]], { focus: true });
  person(B, -96, 90, { reachR: P([-6, 84, 136]) });
  person(B, 210, 40, { s: 0.92, face: -1, er: [18, -100], wr: [9, -112], el: [-14, -70], wl: [-6, -54] });
}],
};
for (const [slug, [title, desc, build]] of Object.entries(S)) { if (ONLY.length && !ONLY.includes(slug)) continue; seed = slug.length * 977 + 13; CUR = slug; clipN = 0; XMIN = Infinity; XMAX = -Infinity; const B = { lines: [], text: [] }; build(B); if (isFinite(XMIN)) B.dx = r1(Math.max(-60, Math.min(60, 200 - (XMIN + XMAX) / 2))); fs.writeFileSync(`${OUT}/${slug}.svg`, svg(slug, title, desc, B)); }
console.log(ONLY.length ? ONLY.join(', ') : `${Object.keys(S).length} scenes`, 'drawn');
