# john.deng.is: design modernization + Railway migration plan

_Drafted 2026-11-21. Builds on [001-initial-design.md](./001-initial-design.md)._

## Why the site feels off today

The 001 build checked every box in the spec ("gradients, animation, be creative") but did it with a
template's vocabulary, so it looks generated rather than authored. Concretely, these are the
artifacts to remove:

| Artifact                                                                                               | Where                                                                                   |
| ------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------- |
| Chromatic gradient on one word of **every** heading ("care about", "projects", "Gear", "Blog", "John") | `GradientText` used in `home.tsx`, `projects.tsx`, `music.tsx`, `about.tsx`, blog index |
| Shimmer animation on the name and the "JD" monogram                                                    | `hero.tsx`, `header.tsx` (`animate-shimmer bg-chromatic`)                               |
| Uppercase tracked eyebrow ("SAN FRANCISCO · ENGINEER · MAKER")                                         | `hero.tsx`, `SectionTitle` in `about.tsx`, footer "Sitemap"                             |
| Atmospheric hero image under a black scrim; it isn't you or your stuff                                 | `public/images/hero.jpg` (still a placeholder)                                          |
| 4-up icon-tile "facets" grid (lucide icon + title + one line)                                          | `home.tsx`                                                                              |
| Project "avatars" that carry no information (colored square + the same GitHub glyph)                   | `project-card.tsx`                                                                      |
| Lift-on-hover cards with an arrow, the glow-shadow red button, and the gradient-border button          | `project-card.tsx`, `blog-card.tsx`, `ui/button.tsx`                                    |
| Every page is the same shape: H1, muted paragraph, card grid at `max-w-5xl`                            | all routes                                                                              |
| Inter + `tracking-tight` everywhere, so nothing has a typographic voice                                | `app.css`, all headings                                                                 |
| Tagline rendered as a dot-separated list, repeated in hero and footer                                  | `site.tagline`                                                                          |
| Default React Router favicon; no photo of you anywhere on the site                                     | `public/favicon.ico`                                                                    |

## What ssalbdivad.com gets right (the principles, not the look)

We shouldn't copy David's site; it's built around live TypeScript demos that only make sense for him.
The transferable lessons:

1. **Substance over decoration.** Each section tells a specific story with numbers, names and quotes
   ("the itch / the hunt"). The design mostly stays out of the way.
2. **One signature, interactive moment** that only that person could have made (his is a live type
   parser running real compiler output). It does the job our gradients were trying to do.
3. **A real typographic system**: a readable humanist sans for body, a mono for metadata and
   section labels (`01 // work`), heavy display weight only on the name.
4. **Restraint in color**: one dark ground, one warm accent used for the primary call to action.
5. **A home page that is the site**: a long editorial scroll with numbered, anchored sections and a nav
   that tracks where you are. Deep pages exist for depth, not as the only way to see content.
6. **A clear way to reach him**: a "Copy email" button in the header. Our site has no contact path.

## Design direction

Keep what's yours: black / blood red / bone white, the music, languages, video and animals. Change how
it's expressed.

**Typography (biggest single upgrade).** Replace "gradient word" emphasis with typographic emphasis:

- Display/emphasis: a characterful serif with a good italic (recommend **Newsreader** or **Fraunces**,
  both on fontsource). Emphasis becomes serif italic in blood red, not a gradient.
- Body: a neutral sans (**Geist** or keep Inter, but at normal tracking).
- Labels, dates, tags, section numbers: a mono (**Geist Mono** / JetBrains Mono).
- Letter spacing 0 on headings; scale via a fixed type ramp, not viewport units.

**Color.** Dark is the primary experience: near-black ground, bone text, blood red as the single
accent (links, active nav, the CTA). Light mode stays supported but tuned as "paper + ink + red". The
chromatic gradient is retired from UI chrome and kept for **one** place only: the signature
interaction (below), where it means something.

**Layout.** Wider reading column for prose (≈ 68ch), an asymmetric grid on desktop (sticky section
label on the left, content on the right, like a liner-notes layout), full-bleed bands between
sections instead of cards. Cards only for genuinely repeated items (posts, gear).

**Motion.** Subtle reveal-on-scroll for sections, nav underline that follows the active section, and
`prefers-reduced-motion` respected. No infinite shimmer loops.

**Imagery.** Real photos of you, the rig, the animals, places from the channel. Retire the generated
hero and the generated blog heroes as you're able to replace them.

### The signature moment (pick one)

1. **Recommended: an interactive signal chain.** Your pedalboard drawn as a horizontal chain
   (Buffer → Cry Baby → OD808 → Heavy → Thunderstorm → Carbon Copy → Deluxe Reverb). Each pedal is
   clickable: toggling it changes the hero's visual "tone" (drive adds grain/saturation, the flanger
   sweeps the chromatic gradient, delay adds echo trails on the name) and optionally plays a short
   real DI clip through the Web Audio API. It ties music, engineering and craft together, and links
   straight to the "Signal chain as craft" post.
2. **Language toggle on your name**: ジョン / 约翰 / John, with a furigana/pinyin hover and a
   "today's word" from your daily practice.
3. **Live project stats**: build-time-fetched GitHub stars / downloads / YouTube views rendered as
   small sparklines in the projects section. Lower drama, high credibility.

## Information architecture

```
/            Long-form home, numbered sections, each with an anchor:
             00 hero (name, one-line intro, photo, Copy email)
             01 // build   selected engineering work + Instacart story + open source
             02 // write   latest 3 posts
             03 // play    music + the signal-chain moment, link to /music
             04 // speak   Mandarin / Japanese progress
             05 // film    YouTube channel, 2–3 embedded or thumbnailed videos
             06 // now     what you're doing this month
             07 // say hi  email, socials, résumé PDF
/projects    Deeper write-ups per project (story, code snippet, stats)
/blog/*      Unchanged routes, redesigned reading experience
/music       Gear as a liner-notes spread instead of a card grid
/about       Merge into home (301 → /#about), or keep as the long version
```

Header becomes: name (left), section links that scroll on `/` and route elsewhere, **Copy email**
pill (right). Footer slims to one line: socials, RSS, ©.

## Content work (needed regardless of design)

The design will only look as good as the specifics in it. Things only you can supply:

- [ ] A real portrait for the hero (and ideally one with a guitar / dog / cat)
- [ ] For 2–3 projects: one paragraph on why it exists + a notable number or quote
- [ ] The Instacart Connect story in 3–4 sentences (what you built, scale, what you're proud of)
- [ ] 2–3 favorite videos from the channel
- [ ] A short DI recording of the rig (if we do the signal chain with audio)
- [ ] Which email to publish for "Copy email"
- [ ] A "now" paragraph
- [ ] Replacements for the generated blog hero images (optional, can be gradual)

Constraints carried over from 001: no Underflow as a project and minimal mentions; no full CV on the
site, link the PDF.

## Implementation phases

Each phase is one PR. Phase 0 is independent of the rest and should go first because Railway PR
environments give every later design PR a preview URL.

### Phase 0: Migrate Fly.io → Railway

Current state: `Dockerfile` (multi-stage, Node 26 alpine, `pnpm start` on port 3000), `fly.toml`
(256 MB, sjc, auto-stop to zero), `.github/workflows/deploy.yml` running `flyctl deploy` on push to
`master`. Railway workspace "John Dengis's Projects" currently holds one project (`tangent`).

1. **Repo changes**
   - Railway Infrastructure as Code in `.railway/railway.ts` (the replacement for the deprecated
     `railway.json`): source + Wait for CI, Dockerfile builder, healthcheck `/`, restart on failure,
     sleep, region, limits, `PORT`, and the `john.deng.is` domain. `.github/workflows/railway-config.yml`
     posts a plan on PRs that touch `.railway/` and applies it on merge.
   - `react-router-serve` honors `PORT`; the service pins `PORT=3000` to match the domain's target port.
   - Drop the `RELEASE` build arg. Nothing in `app/` reads it; if we want the SHA later, use
     Railway's `RAILWAY_GIT_COMMIT_SHA`.
   - Replace `deploy.yml` with a `ci.yml` (install, `pnpm typecheck`, `pnpm format:check`,
     `pnpm build`) on PRs and `master`.
2. **Railway setup**
   - New project `www` in the same workspace, one service from GitHub `jadengis/www`, branch
     `master`, region US West.
   - Turn on **Serverless** (sleep when idle), the equivalent of Fly's `auto_stop_machines`.
     Accept a cold start on the first hit after idle, as today.
   - Turn on **Wait for CI** so a red `ci.yml` blocks the deploy.
   - Turn on **PR environments** for preview URLs on design PRs.
3. **Cutover**
   - Verify the `*.up.railway.app` URL: home, a blog post, `/rss.xml`, `/sitemap.xml`,
     `/llms.txt`, `/docs/cv.pdf`, OG images.
   - Lower the TTL on the `john` record at the `deng.is` DNS provider a day ahead.
   - Add `john.deng.is` as a custom domain in Railway; set the CNAME (and any TXT verification
     record) it asks for; wait for the certificate.
   - Keep Fly running until Railway serves the domain over HTTPS, then:
     `fly apps destroy john-dengis-www`, delete `fly.toml`, remove the `FLY_API_TOKEN` repo secret.
4. **Cost check** after a week in Railway's usage view. A sleeping Node app with this footprint
   should sit well inside the Hobby plan's included usage you're already paying for with `tangent`.

### Phase 1: Foundation (tokens, type, de-slop)

- New font stack and type ramp in `app.css`; remove `tracking-tight` from headings.
- Rework color tokens (dark-first; light mode as paper/ink/red). Retire `bg-chromatic`,
  `.text-gradient`, `.gradient-border` and `animate-shimmer` from general use.
- Delete `GradientText`; add an `Em` (serif italic, accent) primitive and a `SectionLabel`
  (`01 // build` in mono).
- Simplify `Button` to solid / outline / link variants; drop glow and gradient variants.
- Header: wordmark in the display serif (no monogram), active-section indicator, **Copy email**
  pill. Footer: single line.
- Replace the favicon with a real mark (serif "J" or a small pick/plectrum shape), and regenerate the
  default OG card in the new type via `scripts/generate-og.mts`.

Outcome: every existing page immediately looks less generic, before any layout changes.

### Phase 2: Home page as the editorial long scroll

- Build the section structure above with anchored, numbered sections and sticky left labels on
  desktop.
- New hero: your name large in the display face, one sentence of intro in your voice, real photo,
  Copy email + résumé. No eyebrow, no scrim over stock art.
- Replace the facets grid and project cards with prose-led sections that include specifics.
- Scroll-reveal + active-nav via one small `IntersectionObserver` hook.

### Phase 3: Inner pages

- `/projects`: one rich entry per project (story, code snippet, language, link, stats) instead of a
  grid of identical cards. Give each project a real visual: its logo, a screenshot or a code excerpt.
- `/blog`: calmer index (date in mono, title in serif, description, small square thumb), keep a
  restrained hover. Post page: new prose styles, wider measure, better code blocks, reading progress.
- `/music`: liner-notes layout, large real photos, and the pedal order presented as a chain.
- `/about`: merge into home or keep as long form (see open questions).
- 404 / error page in the new style.

### Phase 4: Signature interaction

- Build the chosen moment (signal chain recommended), progressively enhanced: static, readable SVG
  on SSR; interactivity hydrates on the client; respects reduced motion; audio only on user gesture.

### Phase 5: Polish + verification

- Screenshot pass at 375 / 768 / 1280 / 1920 in both color schemes (the `run-www` skill can drive
  this).
- Lighthouse: keep performance and accessibility ≥ 95; check LCP with the new hero photo (serve AVIF/
  WebP via `sharp` at build time).
- Re-check JSON-LD, sitemap, RSS and `llms.txt` still render.
- Update `CLAUDE.md` with the new design tokens and primitives so future edits stay on-system.

## Open questions

1. Signature moment: signal chain, language toggle, or live stats?
2. `/about`: fold into the home page (301) or keep as a separate long page?
3. Fonts: Newsreader + Geist + Geist Mono, or do you want to see two or three pairings side by side
   first?
4. Do you want to keep light mode as a first-class theme, or go dark-only like David's site?
