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
'two-keyholders': ['Two Keyholders', "Sketch in perspective: a small wooden shed with a pitched roof, seen from its front corner, its door hatched. In front of it on the left, a mannequin turns a key in the door. On the right, a second mannequin walks away from the shed carrying a bag, with its own key hanging from the other hand. The shed is the shared system from the pattern's context: something a group depends on. Its door is admin access, the focus. Each figure is a keyholder and each key is full access. The figure leaving with a bag is the problem the pattern guards against, a keyholder who moves away or burns out; the first figure opening the door anyway is the consequence, the system surviving one person leaving. That the first figure is using the key, not just holding it, is the second half of the solution: both keyholders use their access regularly. The metaphor: a shared shed with two keys cut, so the tools stay within reach whoever is away.", (B) => {
  camera(); horizon(B);
  const b = person(B, 150, 30, { face: 1, kl: [-13, -28], kr: [12, -27], el: [-16, -68], wl: [-14, -46], er: [22, -72], wr: [30, -56] });
  key(B, b.hl[0] - 2, b.hl[1] + 4, -1); box(B, b.hr[0] - 6, b.hr[1], 16, 20, { passes: 1 }); line(B, b.hr[0] - 1, b.hr[1], b.hr[0] + 5, b.hr[1] - 6, { passes: 1 });
  prism(B, [-60, 0, 80], [120, 140, 120]);
  for (let y = 20; y < 140; y += 20) line3(B, [60, y, 82], [60, y, 198], { cls: 'sk-g', passes: 1 });
  solid(B, [[[-66, 140, 76], [66, 140, 76], [0, 192, 76]], [[-66, 140, 204], [66, 140, 204], [0, 192, 204]],
    [[-66, 140, 76], [0, 192, 76], [0, 192, 204], [-66, 140, 204]], [[66, 140, 76], [0, 192, 76], [0, 192, 204], [66, 140, 204]]], { guides: false });
  quad(B, [[-46, 0, 80], [-6, 0, 80], [-6, 106, 80], [-46, 106, 80]], { focus: true });
  const kh = P([-14, 54, 80]); ellipse(B, ...kh, 2.4, 2.4, { passes: 1 });
  const a = person(B, -88, 30, { reachR: [kh[0] - 16, kh[1]] }); key(B, a.hr[0] + 2, a.hr[1], 1);
}],
'small-enough-to-understand': ['Small Enough to Understand', "Sketch in perspective: a bicycle stands side-on between two mannequins, its front frame triangle hatched. Every part is drawn in the open: two wheels, the chain and gear, the saddle, and the handlebars. In front, one figure points at the chain and gear; behind the bicycle, the other reaches a wrench to the front wheel's hub. The bicycle is the system from the pattern's context, the hardware and software a group chooses. Its few, visible parts are the solution, a system small enough to understand, so the frame is the focus. The figure pointing knows how it works; the figure with the wrench is a second member learning to look after it, the person who could learn to run it in a weekend. The metaphor: a system as a bicycle rather than a sealed engine. Anyone can see how it works and a friend can fix it, at the cost the pattern names: it won't go as fast or as far as a car.", (B) => {
  camera(); horizon(B);
  const Rh = [-55, 33, 60], Fh = [55, 33, 60], BB = [-5, 30, 60], S0 = [-15, 82, 60], H = [40, 80, 60];
  const b = person(B, 92, 130, { face: -1, reachL: P(Fh) }); wrench(B, b.hl[0], b.hl[1], 0.2);
  circle3(B, Rh, 33, 'xy'); circle3(B, Fh, 33, 'xy');
  for (const h of [Rh, Fh]) line3(B, [h[0], h[1], h[2] - 8], [h[0], h[1], h[2] + 8], { passes: 1 });
  quad(B, [S0, H, BB], { focus: true, fill: false });
  stroke(B, [P(Rh), P(BB), P(S0), P(Rh)]); stroke(B, [P(H), P(Fh)]);
  circle3(B, BB, 9, 'xy', { passes: 1 }); line3(B, [-55, 37, 60], [-5, 39, 60], { passes: 1 }); line3(B, [-55, 29, 60], [-5, 21, 60], { passes: 1 });
  line3(B, [-15, 82, 60], [-15, 90, 60], { passes: 1 }); prism(B, [-26, 90, 54], [22, 4, 12], { shade: false, guides: false });
  line3(B, [40, 80, 60], [36, 96, 60], { passes: 1 }); line3(B, [36, 96, 48], [36, 96, 72]);
  person(B, -92, 10, { reachR: P(BB) });
}],
'talk-before-you-enforce': ['Talk Before You Enforce', "Sketch from slightly above: five mannequins stand around a round table on a single pedestal, three behind it and one at each side, and the table top is hatched. Small arcs of speech come from them toward the middle of the table. In the front right corner, a fence panel lies flat on the ground, unused. The people are the group sharing a system, from the pattern's context, now with problems to deal with. The round table is the solution: a place for the group to talk, such as a chat channel or a regular check-in, and it is the focus. The speech arcs are a problem being raised there first, with everyone, rather than decided by an admin alone. The fence panel is technical enforcement such as quotas, permissions, and bans: set aside, not built, and still there if the group chooses it later. The metaphor: a round table with no head, where the group's own judgment comes before any fence.", (B) => {
  camera({ e: 450, hs: -150 });
  const T = W(0, 230), at = (xr, zr) => W(xr, 230 + zr), heads = [];
  for (const [xr, zr, f] of [[-70, 115, 1], [0, 135, 1], [70, 115, -1]]) heads.push(person(B, ...at(xr, zr), { face: f, er: [20, -74], wr: [26, -56] }).head);
  heads.push(person(B, ...at(-128, 10), { face: 1, er: [24, -76], wr: [34, -66] }).head);
  line3(B, [T[0], 66, T[1]], [T[0], 0, T[1]]); prism(B, [T[0] - 40, 0, T[1] - 4], [80, 4, 8], { guides: false, shade: false }); prism(B, [T[0] - 4, 0, T[1] - 40], [8, 4, 80], { guides: false, shade: false });
  circle3(B, [T[0], 68, T[1]], 90, 'xz', { fill: true, passes: 1 }); circle3(B, [T[0], 74, T[1]], 90, 'xz', { fill: true, focus: true });
  heads.push(person(B, ...at(128, 0), { face: -1, el: [-24, -76], wl: [-34, -66] }).head);
  const c = P([T[0], 74, T[1]]);
  for (const [hx, hy] of heads) { const dx = c[0] - hx, dy = c[1] - hy, L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, ax = hx + ux * 22, ay = hy + uy * 22;
    B.lines.push(`<path class="sk-i" stroke-width="1.2" d="M${r1(ax - uy * 5)} ${r1(ay + ux * 5)} q${r1(ux * 5)} ${r1(uy * 5)} ${r1(uy * 10)} ${r1(-ux * 10)}"/>`); }
  const F = at(110, -210); prism(B, [F[0], 0, F[1]], [110, 5, 40]);
  for (let x = F[0] + 20; x < F[0] + 110; x += 24) line3(B, [x, 5, F[1]], [x, 5, F[1] + 40], { passes: 1 });
}],
'every-thread-at-every-level': ['Every Thread at Every Level', "Sketch in perspective: a standing loom built from square posts and beams, seen from its front corner, with a mannequin beside it drawing one thread up and over the top beam. Three woven rows cross the upright threads; beside them, from top to bottom, are a diamond, a triangle, and a square. The thread being drawn passes through all three rows and is hatched; the middle row is not yet woven all the way across. The loom is the site. Its three rows are the levels of rules, in the site's column marks: the diamond is theory (metaconstitutional), the triangle is governance (collective-choice and constitutional), and the square is guides (operational). The upright threads are topic threads such as institutions or privacy. The hatched thread crossing every row is the solution, the focus: write about each thread at every level. The weaver is a contributor. The unfinished row is the cost the pattern names: a thread can look unfinished for a long time. The metaphor: the site as woven cloth, which holds together only where threads cross every level.", (B) => {
  camera(); horizon(B);
  const z = 120;
  prism(B, [-90, 0, z - 6], [10, 196, 10]); prism(B, [80, 0, z - 6], [10, 196, 10], { guides: false });
  for (let x = -70; x <= 70; x += 14) if (Math.abs(x - 14) > 3) line3(B, [x, 26, z], [x, 184, z], { cls: 'sk-g', passes: 1 });
  for (const [y, to] of [[60, 76], [105, 30], [150, 76]]) { const pts = []; for (let x = -78, i = 0; x <= to; x += 7, i++) pts.push(P([x, y + (i % 2 ? 2.5 : -2.5), z])); stroke(B, pts, { passes: 1 }); }
  quad(B, [[10, 26, z], [18, 26, z], [18, 186, z], [10, 186, z]], { focus: true, fill: false });
  prism(B, [-96, 184, z - 8], [192, 12, 14], { guides: false }); prism(B, [-96, 14, z - 8], [192, 12, 14], { guides: false });
  for (const [y, m] of [[150, 'diamond'], [105, 'triangle'], [60, 'square']]) mark(B, m, ...P([-118, y, z]), 8);
  const w = person(B, ...W(205, 90), { face: -1, reachL: P([98, 150, z]) });
  stroke(B, [P([14, 186, z]), P([20, 200, z]), P([96, 200, z]), w.hl], { passes: 1 });
}],
'every-page-links-out': ['Every Page Links Out', "Sketch from high above, looking down at an angle over open water: a large island in the middle, its top hatched, with a page standing upright on it, is joined by plank bridges to four smaller islands. On the four islands, in turn, are a small table ruled as a grid, an upright card with a circle on it, a closed book, and a thread circle. Each island is a page on the site. The open water between them is the problem: pages written one at a time drift apart, and a reader who lands on one never reaches the rest. The hatched middle island is any single page, the focus. Its bridges are its links, the solution: the grid is the table, the card is a pattern the page introduces or applies, the book is the sources it draws on, and the thread circle is the other pieces in its thread. The metaphor: the site as an archipelago. A page with no bridges is an island in the bad sense.", (B) => {
  camera({ e: 900, f: 800, hs: -312, cx: 200 });
  const isl = [[0, 260, 80], [-200, 0, 52], [200, 0, 52], [-200, 540, 52], [200, 540, 52]].map(([xr, zr, r]) => [...W(xr, zr), r]);
  for (const [x, z] of [[-280, 300], [260, 260], [0, 0], [0, 560], [-120, 120], [140, 420]].map(([a, b]) => W(a, b))) { const c = P([x, 0, z]); water(B, c[0] - 15, c[1]); }
  const [cx, cz] = isl[0];
  for (const [x, z, r] of isl.slice(1)) {
    const dx = cx - x, dz = cz - z, L = Math.hypot(dx, dz), ux = dx / L, uz = dz / L, nx = -uz * 10, nz = ux * 10;
    const a = [x + ux * r, z + uz * r], b = [cx - ux * 80, cz - uz * 80];
    line3(B, [a[0] + nx, 3, a[1] + nz], [b[0] + nx, 3, b[1] + nz], { passes: 1 }); line3(B, [a[0] - nx, 3, a[1] - nz], [b[0] - nx, 3, b[1] - nz], { passes: 1 });
    for (let t = 0.1; t < 1; t += 0.12) { const px = a[0] + (b[0] - a[0]) * t, pz = a[1] + (b[1] - a[1]) * t; line3(B, [px + nx, 3, pz + nz], [px - nx, 3, pz - nz], { cls: 'sk-g', passes: 1 }); }
  }
  isl.forEach(([x, z, r], i) => { circle3(B, [x, -10, z], r, 'xz', { fill: true, passes: 1 }); circle3(B, [x, 0, z], r, 'xz', { fill: true, focus: i === 0 }); });
  const at = (i, dx = 0, dz = 0) => [isl[i][0] + dx, isl[i][1] + dz];
  { const [x, z] = at(0); quad(B, [[x - 18, 0, z], [x + 18, 0, z], [x + 18, 46, z], [x - 18, 46, z]]); }
  { const [x, z] = at(1); quad(B, [[x - 24, 0, z - 18], [x + 24, 0, z - 18], [x + 24, 0, z + 18], [x - 24, 0, z + 18]]); line3(B, [x, 0, z - 18], [x, 0, z + 18], { passes: 1 }); line3(B, [x - 24, 0, z], [x + 24, 0, z], { passes: 1 }); }
  { const [x, z] = at(2); quad(B, [[x - 16, 0, z], [x + 16, 0, z], [x + 16, 30, z], [x - 16, 30, z]]); circle3(B, [x - 6, 18, z], 5, 'xy', { passes: 1 }); }
  { const [x, z] = at(3); prism(B, [x - 18, 0, z - 12], [36, 10, 26], { guides: false }); }
  { const [x, z] = at(4); line3(B, [x, 0, z], [x, 34, z]); mark(B, 'circle', ...P([x, 44, z]), 8); }
}],
'patterns-are-tested-in-practice': ['Patterns Are Tested in Practice', "Sketch in perspective: in a workroom with a cutting table and a roll of paper behind them, one mannequin stands with its arms held out while a second holds a hatched paper sewing pattern against it. The pattern's sleeve stops short of the wrist, and the second figure is drawing a dashed line with a pencil to lengthen it. The paper sewing pattern is one of this site's patterns, the focus. It was cut on the table for someone else; holding it against a different person is the first half of the solution: apply the pattern in a piece besides the one that introduced it. The figure with its arms out is the practice the pattern meets, a real group or server. The short sleeve is a pattern that doesn't fit what happens in practice, and the pencil lengthening it is the second half: revise the pattern and say why. The metaphor: a pattern in the dressmaker's sense, a template that proves itself only when it's tried on, and is altered when it doesn't fit.", (B) => {
  camera(); horizon(B);
  prism(B, [-90, 0, 280], [230, 82, 70]);
  const rl = circle3(B, [-60, 94, 300], 12, 'xy', { fill: true, passes: 1 }), rr = P([110, 94, 300]);
  line3(B, [-60, 106, 300], [110, 106, 300], { passes: 1 }); line3(B, [-60, 82, 300], [110, 82, 300], { passes: 1 }); circle3(B, [110, 94, 300], 12, 'xy', { passes: 1 });
  const [X, Y] = P([70, 0, 90]), sc = depthScale(70, 90);
  person(B, 70, 90, { face: -1, el: [-30, -92], wl: [-50, -92], er: [30, -92], wr: [50, -92] });
  const L = (pts) => pts.map(([u, v]) => [r1(X + u * sc), r1(Y + v * sc)]);
  const pat = L([[-18, -97], [18, -97], [22, -48], [-22, -48], [-18, -82], [-38, -82], [-38, -95]]);
  B.lines.push(`<path class="sk-p" d="${poly(pat)}"/>`); hatchIn(B, poly(pat), bbox(pat), 6); stroke(B, pat, { closed: true, passes: 1 });
  const e = L([[-38, -95], [-50, -95], [-50, -82], [-38, -82]]); B.lines.push(`<path class="sk-i" stroke-dasharray="3 4" d="M${e[0]} L${e[1]} L${e[2]} L${e[3]}"/>`);
  const t = person(B, -30, 70, { reachR: e[1] }); pencil(B, t.hr[0], t.hr[1], -0.6, 14);
}],
'any-cell-any-time': ['Any Cell, Any Time', "Sketch in perspective: a patchwork quilt hangs from a pole between two posts, seen at an angle, three squares across and three down. Above its columns are a square, a triangle, and a diamond, and a thread circle sits beside each row. Most squares are sewn with simple stitched designs; one, at the left of the middle row, is empty. A mannequin reaches up to fit a single hatched patch into it. The quilt is the site's table: its columns are guides, governance, and theory (the square, triangle, and diamond) and its rows are threads. The sewn squares are pieces other people have already contributed. The hatched patch is one contribution, the focus: a single guide, governance piece, essay, or pattern. Adding it while the rest of its row is unfinished is the solution: accept a contribution to any single cell at any time. The metaphor: a community quilt, made one patch at a time by whoever has one ready, and uneven until it's done.", (B) => {
  camera(); horizon(B);
  const z = 150, X0 = -90, Y0 = 190, cw = 60, ch = 48;
  prism(B, [-124, 0, z - 4], [10, 214, 10]); prism(B, [116, 0, z - 4], [10, 214, 10], { guides: false });
  prism(B, [-128, 204, z - 2], [258, 7, 7], { guides: false });
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) {
    const x = X0 + c * cw, y = Y0 - r * ch, cell = [[x, y - ch, z], [x + cw, y - ch, z], [x + cw, y, z], [x, y, z]];
    if (c === 0 && r === 1) { const q = cell.map(P); B.lines.push(`<path class="sk-i" stroke-dasharray="4 4" d="${poly(q)}"/>`); continue; }
    quad(B, cell);
    const m = (r * 3 + c) % 3, cxm = x + cw / 2, cym = y - ch / 2;
    if (m === 0) { line3(B, [x + 10, y - 8, z], [x + cw - 10, y - ch + 8, z], { cls: 'sk-g', passes: 1 }); line3(B, [x + cw - 10, y - 8, z], [x + 10, y - ch + 8, z], { cls: 'sk-g', passes: 1 }); }
    if (m === 1) stroke(B, [[cxm, y - 8, z], [x + cw - 12, cym, z], [cxm, y - ch + 8, z], [x + 12, cym, z]].map(P), { closed: true, cls: 'sk-g', passes: 1 });
    if (m === 2) stroke(B, [[x + 14, y - 10, z], [x + cw - 14, y - 10, z], [x + cw - 14, y - ch + 10, z], [x + 14, y - ch + 10, z]].map(P), { closed: true, cls: 'sk-g', passes: 1 });
  }
  ['square', 'triangle', 'diamond'].forEach((m, c) => mark(B, m, ...P([X0 + c * cw + cw / 2, 226, z]), 7));
  for (let r = 0; r < 3; r++) mark(B, 'circle', ...P([146, Y0 - r * ch - ch / 2, z]), 7);
  const patch = [[-112, 112, 110], [-74, 112, 110], [-74, 152, 110], [-112, 152, 110]];
  const a = person(B, -170, 70, { reachR: P([-112, 128, 110]) });
  quad(B, patch, { focus: true });
}],
'a-language-users-can-speak': ['A Language Users Can Speak', "Sketch in perspective: two mannequins stand facing each other, one nearer the viewer and one farther back, and talk. Both speech bubbles hold the same simple picture of two crossed keys; the nearer figure's bubble is hatched. On the ground between them sits a thick binder, closed. The figures are members of a group that runs a system together; neither is drawn as an expert. The crossed keys are a pattern's plain name, here Two Keyholders, turned into a picture: something anyone can say. The hatched bubble is the solution working, the focus: a member using the name in ordinary conversation. The same picture in the second bubble shows it understood and used back, the consequence that pattern names become the group's words. The closed binder is the technical detail, such as commands, tools, and configuration, which the solution keeps in the Actions and guides rather than in the name. The metaphor: pattern names as everyday words in a shared language, with the manual nearby but closed.", (B) => {
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
'solution-first': ['Solution First', "Sketch in perspective: a large card leans back on a three-legged easel, seen from its front corner, and a mannequin stands beside it writing with a pencil. Only one section in the middle of the card has been written, and it is hatched; the sections above and below it, and a dashed title line at the top, are still blank. The card is a pattern being drafted, laid out like this site's pattern pages. The written middle section is the solution, the focus: the one thing the writer most wants to share, written first. The blank sections around it are the problem, context, forces, and consequences, worked out from the solution afterwards. The empty title line is the pattern's name, which the solution says to write last. The figure writing is anyone with experience to pass on. The metaphor: writing a pattern from the inside out, starting with what you would tell a newcomer and only then explaining when and why.", (B) => {
  camera(); horizon(B);
  const at = (u, v) => [-60 + u * 120, 60 + v * 150, 120 + v * 24];
  line3(B, at(0.5, 1), [0, 0, 220]);
  const card = quad(B, [at(0, 0), at(1, 0), at(1, 1), at(0, 1)]);
  line3(B, at(0.08, 0), [-62, 0, 100]); line3(B, at(0.92, 0), [62, 0, 100]); prism(B, [-66, 52, 112], [132, 6, 12], { guides: false });
  B.lines.push(`<path class="sk-i" stroke-dasharray="5 5" d="M${P(at(0.08, 0.9)).join(' ')} L${P(at(0.92, 0.9)).join(' ')}"/>`);
  for (const v of [0.78, 0.66, 0.3, 0.17]) line3(B, at(0.06, v), at(0.94, v), { cls: 'sk-g', passes: 1 });
  quad(B, [at(0.05, 0.38), at(0.95, 0.38), at(0.95, 0.56), at(0.05, 0.56)], { focus: true });
  for (const v of [0.43, 0.47, 0.51]) stroke(B, [at(0.1, v), at(0.4, v - 0.01), at(0.7, v + 0.01), at(0.9, v)].map(P), { passes: 1 });
  const a = person(B, -112, 70, { reachR: P(at(0.1, 0.47)) }); pencil(B, a.hr[0], a.hr[1], -0.5, 14);
}],
'workshop-the-pattern': ['Workshop the Pattern', "Sketch in perspective: a table seen from its front corner, with a hatched pattern card lying on it. In front of the table, one mannequin reader points at the card; behind the table, a second reader leans in with a pencil over it. Off to the right, the author stands apart with a hand cupped to one ear. The table and card are a pattern workshop: a new pattern set out for others to read before it leaves draft, and the card is the focus. The two readers are the solution's \"at least two readers besides its author\". The pointing reader is saying what works, which comes first; the reader with the pencil is saying what could be better, which comes second. The author standing apart and listening is the rule that the author listens first and asks questions only at the end. The metaphor: a pattern as a piece of craft set on a bench for others to inspect, with its maker stepping back.", (B) => {
  camera(); horizon(B);
  const card = [[-14, 78, 130], [26, 78, 130], [26, 78, 158], [-14, 78, 158]];
  const r2 = person(B, 40, 236, { face: -1, reachL: P([8, 82, 150]) }); pencil(B, r2.hl[0], r2.hl[1], 2.0, 14);
  for (const [x, z] of [[-76, 186], [70, 186]]) prism(B, [x, 0, z], [6, 72, 6], { guides: false, shade: false });
  prism(B, [-80, 72, 100], [160, 6, 92], { guides: false });
  for (const [x, z] of [[-76, 100], [70, 100]]) prism(B, [x, 0, z], [6, 72, 6], { guides: false });
  quad(B, card, { focus: true });
  person(B, -96, 90, { reachR: P([-6, 84, 136]) });
  person(B, 210, 40, { s: 0.92, face: -1, er: [18, -100], wr: [9, -112], el: [-14, -70], wl: [-6, -54] });
}],
};
for (const [slug, [title, desc, build]] of Object.entries(S)) { if (ONLY.length && !ONLY.includes(slug)) continue; seed = slug.length * 977 + 13; CUR = slug; clipN = 0; XMIN = Infinity; XMAX = -Infinity; const B = { lines: [], text: [] }; build(B); if (isFinite(XMIN)) B.dx = r1(Math.max(-60, Math.min(60, 200 - (XMIN + XMAX) / 2))); fs.writeFileSync(`${OUT}/${slug}.svg`, svg(slug, title, desc, B)); }
console.log(ONLY.length ? ONLY.join(', ') : `${Object.keys(S).length} scenes`, 'drawn');
