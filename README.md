# autumnflowerssocials.com

Marketing site for **Autumn Flowers** ([@stgeorgemama](https://www.instagram.com/stgeorgemama/)) —
UGC and content creation in St. George, Utah. Astro, static, deployed to GitHub Pages.

## Run it

```bash
npm install
npm run dev        # http://localhost:4321
npx astro build    # -> dist/
```

## The one constraint that shapes everything

GitHub Pages **hard-caps a published site at 1 GB**, and git rejects any single file over
**100 MB**. Autumn's Drive folder is **5.2 GB** with individual masters up to 534 MB, so the
originals can never be committed. They live outside the repo at `../raw-assets/` and are
encoded down before they ship.

Full length is preserved — only the bitrate changes. All 44 clips come to **~250 MB**,
which leaves comfortable headroom. The CI build fails if `dist/` ever crosses either limit.

> **Never enable Git LFS for the video.** Pages serves LFS pointer files as plain text,
> so every video would 200-OK as a few lines of ASCII instead of playing.

## Asset pipeline

Raw masters are not in git. To re-run against `../raw-assets/`:

```bash
node scripts/encode.mjs      # masters -> 720x1280 H.264 + poster frames
node scripts/hero.mjs        # builds the homepage montage banner
node scripts/index-media.mjs # writes src/data/portfolio.json from what encoded
node scripts/images.mjs      # branding shots -> web sizes, media kit, favicon
```

`scripts/manifest.mjs` maps each raw file to its portfolio entry and is the only place to
add, retitle or recategorise a clip. `encode.mjs` refuses to run if the manifest references
a file that isn't there, and warns about any file on disk it doesn't know about.

### About the hero

Autumn asked for a full-width video banner. All her footage is vertical 9:16, and cropping
that to a landscape banner throws away about two-thirds of the frame. Instead `hero.mjs`
stacks three vertical columns side by side: 3 × 1080×1920 = 3240×1920, which is 1.6875:1 —
near-identical to 16:9. Full width, nothing cropped, one ~3 MB file.

Because the montage is 1.69 wide, `object-fit: cover` in a portrait phone viewport crops to
the centre third — so mobile gets the centre column (Autumn) full-bleed from the same file.
One download, two art directions. **If you re-cut the columns, keep Autumn in the centre one.**

## Bandwidth

Pages allows 100 GB/month (soft). 44 videos totalling 250 MB would burn that in ~300 visits
if they all loaded eagerly, so the portfolio ships **poster images only** — the `<video>`
src is attached on click and removed on close. Don't add `preload` or an eager `src` to the
reel grid.

## The contact form

Static hosting has no backend. The enquiry form relays through Web3Forms.

1. Verify `Autumnflowersugc@gmail.com` at web3forms.com to get an access key.
2. Add it as a repository **variable** named `PUBLIC_WEB3FORMS_KEY`
   (Settings → Secrets and variables → Actions → Variables).

The key is a *publishable* identifier, like a reCAPTCHA site key — it is embedded in the
built HTML by design and can't be a secret. Until it's set the form tells people to email
Autumn directly rather than silently swallowing enquiries.

## Content

All copy, stats and pricing live in `src/data/site.mjs`, taken verbatim from Autumn's 2026
Media Kit and Content Day pricing sheet. **Nothing there is estimated.** If a number isn't
in those PDFs, it shouldn't be on the site.

Testimonials are transcribed from real brand DMs. Portfolio entries with `brand: null` are
clips we couldn't attribute from the footage alone — their copy describes what's visibly in
the frame and must never imply a client relationship that hasn't been confirmed.

Note the site leads with **11.5K weekly reach** and **40.4% local**, not the 1.7K follower
count. The reach-to-follower ratio and local concentration are what a St. George business
is actually buying.

## Deploy

Push to `main`. `.github/workflows/deploy.yml` builds and publishes.

DNS for the apex domain (`autumnflowerssocials.com`) is at GoDaddy and needs GitHub's four
A records plus four AAAA records; `www` is a CNAME to `<user>.github.io`. `public/CNAME`
pins the custom domain through deploys.
