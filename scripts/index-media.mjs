// Merges the manifest with what actually got encoded, so the site can never render a
// card pointing at a video that isn't on disk.
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import fs from 'node:fs/promises';
import { ITEMS, CATEGORIES } from './manifest.mjs';

const run = promisify(execFile);

const dur = async (f) => {
  const { stdout } = await run('ffprobe', ['-v', 'error', '-show_entries',
    'format=duration', '-of', 'default=nw=1:nk=1', f]);
  return Math.round(+stdout.trim());
};

const out = [];
for (const it of ITEMS) {
  const mp4 = `public/media/video/${it.slug}.mp4`;
  const jpg = `public/media/poster/${it.slug}.jpg`;
  try {
    await fs.access(mp4); await fs.access(jpg);
  } catch { console.warn(`  ⚠ skipping ${it.slug} — media missing`); continue; }
  const { size } = await fs.stat(mp4);
  out.push({
    slug: it.slug, title: it.title, brand: it.brand, cat: it.cat, desc: it.desc,
    hero: !!it.hero, dur: await dur(mp4), mb: +(size / 1048576).toFixed(1),
  });
}

const cats = CATEGORIES.filter(c => out.some(i => i.cat === c.id));
await fs.writeFile('src/data/portfolio.json',
  JSON.stringify({ categories: cats, items: out }, null, 2));

console.log(`indexed ${out.length} clips across ${cats.length} categories`);
console.log(`total ${(out.reduce((s, i) => s + i.mb, 0)).toFixed(0)} MB`);
for (const c of cats) console.log(`  ${c.label.padEnd(24)} ${out.filter(i => i.cat === c.id).length}`);
