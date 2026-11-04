// Builds an HTML contact sheet of every pattern illustration, with each alt text under its drawing,
// so the set can be checked for consistent style and graphical diversity.
// Usage: node contact-sheet.mjs <images-dir> <out.html>
// Screenshot it with any headless browser, e.g. Playwright's Chromium:
//   chrome --headless --screenshot=<out.png> --window-size=1000,4000 file://<out.html>
import fs from 'node:fs';
import path from 'node:path';
const [dir, out] = process.argv.slice(2);
const root = path.resolve(dir, '../../..');
const font = path.join(root, 'site/node_modules/@fontsource/architects-daughter/files/architects-daughter-latin-400-normal.woff2');
const cells = fs.readdirSync(dir).filter((f) => f.endsWith('.svg')).sort().map((f) => {
  const svg = fs.readFileSync(path.join(dir, f), 'utf8');
  const alt = (svg.match(/<desc[^>]*>([\s\S]*?)<\/desc>/) || [, ''])[1];
  return `<figure>${svg}<figcaption><b>${f.replace('.svg', '')}</b><br>${alt}</figcaption></figure>`;
}).join('\n');
fs.writeFileSync(out, `<!doctype html><meta charset="utf-8"><style>
@font-face{font-family:'Architects Daughter';src:url('file://${font}')}
body{background:#ebe8de;color:#262422;--thread:#2f5da8;font:13px/1.4 monospace;display:grid;grid-template-columns:repeat(2,1fr);gap:14px;padding:14px;margin:0}
figure{margin:0;border:1px dashed #a9a395;padding:6px}svg{width:100%;display:block}figcaption{padding:4px}
</style>${cells}`);
console.log('wrote', out);
