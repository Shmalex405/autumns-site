// Branding shots come off the camera at 4480x6720 (~7MB each). Nothing near that
// belongs on a page. Crop to the ratio each slot actually uses, then encode once.
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import fs from 'node:fs/promises';
import path from 'node:path';
import { RAW_DIR } from './manifest.mjs';

const run = promisify(execFile);
const OUT = 'public/img';

// gravity: where to anchor the crop. These are tall shots; north keeps heads in frame.
const JOBS = [
  { src: 'Autumn Branding-12.jpg', out: 'autumn-about', w: 900, h: 1350, g: 'north' },
  { src: 'Autumn Branding-20.jpg', out: 'autumn-headshot', w: 700, h: 700, g: 'north' },
  { src: 'Autumn Branding-02.jpg', out: 'autumn-joy', w: 1200, h: 800, g: 'center' },
  { src: 'Autumn Branding-05.jpg', out: 'autumn-standing', w: 800, h: 1200, g: 'north' },
];

await fs.mkdir(OUT, { recursive: true });

for (const j of JOBS) {
  const src = path.join(RAW_DIR, j.src);
  const jpg = path.join(OUT, `${j.out}.jpg`);
  const args = (o, q) => [src, '-auto-orient',
    '-resize', `${j.w}x${j.h}^`, '-gravity', j.g, '-extent', `${j.w}x${j.h}`,
    '-strip', '-quality', String(q), '-interlace', 'Plane', o];
  await run('magick', args(jpg, 82));
  await run('magick', args(path.join(OUT, `${j.out}.webp`), 80));
  const { size } = await fs.stat(jpg);
  console.log(`  ${j.out.padEnd(18)} ${j.w}x${j.h}  ${(size / 1024).toFixed(0)} KB`);
}

// The downloadable media kit she asked for — served as-is, it's already only 3.6MB.
await fs.copyFile(path.join(RAW_DIR, 'Autumn Flowers UGC 2026 Media Kit.pdf'), 'public/media-kit.pdf');
console.log('  media-kit.pdf copied');

// Favicon: her initials in the brand sage. Inline SVG, no request weight worth measuring.
await fs.writeFile('public/favicon.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
<rect width="64" height="64" rx="12" fill="#74A459"/>
<text x="32" y="44" font-family="Georgia,serif" font-size="34" fill="#F3F4E7"
 text-anchor="middle">AF</text></svg>`);
console.log('  favicon.svg written');
