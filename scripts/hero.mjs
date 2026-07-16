// Builds the homepage banner.
//
// Autumn asked for a "full-width video banner featuring a montage". All her footage
// is 9:16, and cropping vertical to a landscape banner throws away ~2/3 of the frame
// (and decapitates people). Instead: hstack three vertical columns.
//   3 x 1080x1920 = 3240x1920 => 1.6875:1, near-identical to 16:9. No crop, full width.
// Then, because the montage is 1.69 wide, `object-fit: cover` in a 9:16 phone viewport
// crops to the centre third — so mobile gets the middle column full-bleed, from the
// same single file. One download, two art directions.
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import fs from 'node:fs/promises';
import path from 'node:path';
import { RAW_DIR } from './manifest.mjs';

const run = promisify(execFile);
const ff = (args) => run('ffmpeg', ['-v', 'error', '-y', ...args], { maxBuffer: 1 << 26 });
const SEG = 3.4;   // seconds per clip
const PER = 3;     // clips per column -> 10.2s loop

// [file, start] — start seconds chosen off a frame-by-frame pass of each source.
// Read as three vertical columns: the place / her / the work.
const COLUMNS = [
  [ // left — Southern Utah itself, and the drone work nobody local can match
    ['Pete Vortex.MP4', 12], ['Videoshop_2025-07-07_16-53-45-889.MOV', 6],
    ['65C725B9-1FEB-4E21-A24F-3AAA1BEDDD6E.MP4', 8],
  ],
  [ // centre — Autumn on camera. `object-fit: cover` crops mobile to exactly this
    // column, so it has to carry the hero alone: she is the subject in all three.
    ['STG MAMA INTRO.mp4', 43],  // arms up under the Vintage Market Days mural
    ['STG MAMA INTRO.mp4', 8],   // painting at the fluid-art studio
    ['STG MAMA INTRO.mp4', 33],  // the Greater Zion mural
  ],
  [ // right — the client work
    ['Lemon Lab Reel W Music.mp4', 8], ['Paletas.MP4', 10], ['The Mod Market.mp4', 14],
  ],
];

const OUT = 'public/media';
const TMP = '/private/tmp/claude-502/-Users-alex-flowers-Desktop-autumns-site-autumns-site/bd40eeb7-127c-414d-88a2-908534bc0024/scratchpad/hero';

async function segment(file, start, out) {
  // Normalise every source to identical 1080x1920/30fps so concat + hstack can't drift.
  await ff(['-ss', String(start), '-t', String(SEG), '-i', path.join(RAW_DIR, file),
    '-vf', 'scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,setsar=1,fps=30',
    '-an', '-c:v', 'libx264', '-crf', '18', '-preset', 'fast', '-pix_fmt', 'yuv420p', out]);
}

async function main() {
  await fs.mkdir(TMP, { recursive: true });
  await fs.mkdir(OUT, { recursive: true });

  const colFiles = [];
  for (const [ci, clips] of COLUMNS.entries()) {
    const segs = [];
    await Promise.all(clips.slice(0, PER).map(async ([file, start], si) => {
      const out = path.join(TMP, `c${ci}s${si}.mp4`);
      await segment(file, start, out);
      segs[si] = out;
    }));
    const list = path.join(TMP, `c${ci}.txt`);
    await fs.writeFile(list, segs.map(s => `file '${s}'`).join('\n'));
    const col = path.join(TMP, `col${ci}.mp4`);
    await ff(['-f', 'concat', '-safe', '0', '-i', list, '-c', 'copy', col]);
    colFiles.push(col);
    console.log(`  column ${ci + 1} built — ${segs.length} clips`);
  }

  // hstack the three columns, scale the 3240x1920 result down to a sane delivery width.
  await ff([
    '-i', colFiles[0], '-i', colFiles[1], '-i', colFiles[2],
    '-filter_complex', '[0:v][1:v][2:v]hstack=inputs=3[s];[s]scale=1620:960,setsar=1[v]',
    '-map', '[v]', '-an',
    '-c:v', 'libx264', '-crf', '30', '-preset', 'slow', '-profile:v', 'high',
    '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
    path.join(OUT, 'hero.mp4'),
  ]);

  // Poster for the first paint, so nothing flashes empty while the video buffers.
  await ff(['-i', path.join(OUT, 'hero.mp4'), '-ss', '1', '-frames:v', '1',
    '-vf', 'scale=1620:-2', '-q:v', '4', path.join(OUT, 'hero.jpg')]);

  const v = await fs.stat(path.join(OUT, 'hero.mp4'));
  const p = await fs.stat(path.join(OUT, 'hero.jpg'));
  console.log(`\nhero.mp4  ${(v.size / 1048576).toFixed(1)} MB  (${(SEG * PER).toFixed(1)}s loop, 1620x960)`);
  console.log(`hero.jpg  ${(p.size / 1024).toFixed(0)} KB`);
}

main().catch(e => { console.error(e.message); process.exit(1); });
