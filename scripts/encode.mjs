// Encodes the raw Drive masters down to web-deliverable vertical video + poster frames.
// Raw masters (~15 Mbps, up to 534MB) can never be committed: GitHub rejects any blob
// over 100MB and caps a published Pages site at 1GB. Full length is preserved — only
// the bitrate changes.
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import fs from 'node:fs/promises';
import path from 'node:path';
import { RAW_DIR, ITEMS, SKIP } from './manifest.mjs';

const run = promisify(execFile);
const OUT_V = 'public/media/video';
const OUT_P = 'public/media/poster';
const CONCURRENCY = 4;

const ff = (args) => run('ffmpeg', ['-v', 'error', '-y', ...args], { maxBuffer: 1 << 26 });

async function probe(file) {
  const { stdout } = await run('ffprobe', ['-v', 'error', '-select_streams', 'v:0',
    '-show_entries', 'stream=width,height', '-show_entries', 'format=duration',
    '-of', 'default=nw=1:nk=1', file]);
  const [w, h, d] = stdout.trim().split('\n');
  return { w: +w, h: +h, dur: +d };
}

async function encodeOne(item) {
  const src = path.join(RAW_DIR, item.file);
  const { dur } = await probe(src);
  const mp4 = path.join(OUT_V, `${item.slug}.mp4`);
  const jpg = path.join(OUT_P, `${item.slug}.jpg`);

  // Vertical 720x1280. scale+pad guards the one 1728x3072 and any odd source AR.
  const vf = 'scale=720:1280:force_original_aspect_ratio=decrease,' +
             'pad=720:1280:(ow-iw)/2:(oh-ih)/2:color=black,setsar=1';

  await ff(['-i', src, '-vf', vf, '-c:v', 'libx264', '-crf', '30', '-preset', 'slow',
    '-profile:v', 'high', '-level', '4.0', '-pix_fmt', 'yuv420p', '-r', '30',
    '-movflags', '+faststart', '-c:a', 'aac', '-b:a', '96k', '-ac', '2', mp4]);

  // Poster pulled from the same frame the review sheet used, so what Autumn approved is what ships.
  await ff(['-ss', String(Math.max(0.5, dur * 0.28)), '-i', src, '-frames:v', '1',
    '-vf', 'scale=540:-2', '-q:v', '4', jpg]);

  const { size } = await fs.stat(mp4);
  return { slug: item.slug, mb: size / 1048576, dur };
}

async function main() {
  await fs.mkdir(OUT_V, { recursive: true });
  await fs.mkdir(OUT_P, { recursive: true });

  // Guard: every raw video must be either in the manifest or explicitly skipped.
  const onDisk = (await fs.readdir(RAW_DIR))
    .filter(f => /\.(mp4|mov)$/i.test(f) && !f.startsWith('._'));
  const known = new Set([...ITEMS.map(i => i.file), ...SKIP]);
  const orphans = onDisk.filter(f => !known.has(f));
  const missing = ITEMS.filter(i => !onDisk.includes(i.file)).map(i => i.file);
  if (missing.length) throw new Error(`manifest references missing files:\n  ${missing.join('\n  ')}`);
  if (orphans.length) console.warn(`⚠ not in manifest (will not ship):\n  ${orphans.join('\n  ')}\n`);

  console.log(`encoding ${ITEMS.length} clips (${onDisk.length} on disk, ${SKIP.length} skipped)…\n`);

  const queue = [...ITEMS];
  const done = [];
  await Promise.all(Array.from({ length: CONCURRENCY }, async () => {
    while (queue.length) {
      const item = queue.shift();
      try {
        const r = await encodeOne(item);
        done.push(r);
        console.log(`  ✓ ${r.slug.padEnd(28)} ${r.dur.toFixed(0).padStart(3)}s  ${r.mb.toFixed(1).padStart(5)} MB`);
      } catch (e) {
        console.error(`  ✗ ${item.slug}: ${e.message.split('\n')[0]}`);
      }
    }
  }));

  const total = done.reduce((s, r) => s + r.mb, 0);
  const over = done.filter(r => r.mb > 100);
  console.log(`\n${done.length}/${ITEMS.length} encoded — ${total.toFixed(0)} MB total`);
  console.log(`GitHub Pages ceiling: 1024 MB · headroom: ${(1024 - total).toFixed(0)} MB`);
  if (over.length) console.error(`✗ OVER 100MB BLOB LIMIT: ${over.map(r => r.slug).join(', ')}`);
}

main().catch(e => { console.error(e.message); process.exit(1); });
