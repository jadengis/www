/**
 * Build-time image generator. Runs before `react-router build` (see the
 * package.json build script) and writes into public/:
 *
 * - og/blog/<slug>.webp  1200×630 card per published post, over its hero image
 * - og/default.png       1200×630 site card used when a page has no image
 * - favicon.svg, favicon.ico, apple-touch-icon.png  the serif "J" mark
 *
 * Post cards are skipped when the existing file is newer than the source .mdx,
 * the hero image and this script. The site card and icons are cheap and
 * deterministic, so they are always rewritten.
 */
import { Resvg } from '@resvg/resvg-js'
import { glob, mkdir, readFile, stat, writeFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { ReactNode } from 'react'
import satori, { type SatoriOptions } from 'satori'
import sharp from 'sharp'
import { parse as parseYaml } from 'yaml'

const scriptFile = fileURLToPath(import.meta.url)
const root = path.resolve(path.dirname(scriptFile), '..')
const publicDir = path.join(root, 'public')
const contentDir = path.join(root, 'app/content/blog')
const outDir = path.join(publicDir, 'og/blog')
const require = createRequire(import.meta.url)

// Same path convention as app/lib/post-path.ts: YYYY/MM-DD-slug.mdx.
const POST_PATH_RE = /\/(\d{4})\/(\d{2})-(\d{2})-(.+)\.mdx$/

// Brand tokens from app/app.css (dark scheme).
const ink = '#0b0b0c'
const bone = '#ededea'
const muted = 'rgba(237, 237, 234, 0.72)'
const blood = '#ff3d4a'

const W = 1200
const H = 630

type Frontmatter = { title: string; published: boolean; image: { hero: string } }

/** Minimal element factory for satori's React-element-shaped input. */
function el(type: string, style: Record<string, unknown>, children?: unknown): ReactNode {
  return { type, props: { style, children } } as unknown as ReactNode
}

/** Static .woff files from the @fontsource dev packages (satori can't read woff2). */
async function loadFonts(): Promise<SatoriOptions['fonts']> {
  const file = (pkg: string, name: string) => readFile(require.resolve(`@fontsource/${pkg}/files/${name}`))
  const [serif, serifMedium, sans, mono] = await Promise.all([
    file('newsreader', 'newsreader-latin-400-normal.woff'),
    file('newsreader', 'newsreader-latin-500-normal.woff'),
    file('geist', 'geist-latin-400-normal.woff'),
    file('geist-mono', 'geist-mono-latin-400-normal.woff'),
  ])
  return [
    { name: 'Newsreader', data: serif, weight: 400, style: 'normal' },
    { name: 'Newsreader', data: serifMedium, weight: 500, style: 'normal' },
    { name: 'Geist', data: sans, weight: 400, style: 'normal' },
    { name: 'Geist Mono', data: mono, weight: 400, style: 'normal' },
  ]
}

function prettyDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}

/** Shared frame: wordmark top-left, `body` in the middle, mono footer row. */
function frame(body: unknown, footerLeft: string, background: unknown[] = []) {
  return el(
    'div',
    {
      width: W,
      height: H,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '64px 80px 72px',
      backgroundColor: ink,
      color: bone,
      fontFamily: 'Geist',
      position: 'relative',
    },
    [
      ...background,
      el('div', { display: 'flex', fontFamily: 'Newsreader', fontSize: 34 }, 'John Dengis'),
      body,
      el('div', { display: 'flex', flexDirection: 'column', gap: 24 }, [
        el('div', { display: 'flex', width: 72, height: 4, backgroundColor: blood }),
        el(
          'div',
          { display: 'flex', justifyContent: 'space-between', fontFamily: 'Geist Mono', fontSize: 24, color: muted },
          [el('div', { display: 'flex' }, footerLeft), el('div', { display: 'flex' }, 'john.deng.is')],
        ),
      ]),
    ],
  )
}

function postCard(title: string, date: string, heroUri: string) {
  return frame(
    el(
      'div',
      {
        display: 'flex',
        fontFamily: 'Newsreader',
        fontWeight: 500,
        fontSize: title.length > 55 ? 68 : 80,
        lineHeight: 1.08,
        maxWidth: 1000,
      },
      title,
    ),
    prettyDate(date),
    [
      // Hero background + legibility scrim (same treatment as the post header)
      { type: 'img', props: { src: heroUri, width: W, height: H, style: { position: 'absolute', top: 0, left: 0 } } },
      el('div', {
        position: 'absolute',
        top: 0,
        left: 0,
        width: W,
        height: H,
        backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0.92), rgba(0,0,0,0.7) 55%, rgba(0,0,0,0.45))',
      }),
    ],
  )
}

function siteCard() {
  return frame(
    el('div', { display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 940 }, [
      el(
        'div',
        { display: 'flex', fontFamily: 'Newsreader', fontWeight: 500, fontSize: 84, lineHeight: 1.05 },
        'Software engineer, guitarist, language learner.',
      ),
      el(
        'div',
        { display: 'flex', fontSize: 30, color: muted, lineHeight: 1.4 },
        'I build things, make videos and music, and study languages, usually all at once.',
      ),
    ]),
    'San Francisco',
  )
}

/** The favicon mark: a red serif "J" on ink, drawn on a 64-unit canvas. */
function mark() {
  return el(
    'div',
    {
      width: 64,
      height: 64,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: ink,
      borderRadius: 12,
      color: blood,
      fontFamily: 'Newsreader',
      fontWeight: 500,
      fontSize: 56,
    },
    'J',
  )
}

const toPng = (svg: string, width: number) =>
  new Resvg(svg, { fitTo: { mode: 'width', value: width } }).render().asPng()

/** Pack PNGs into an .ico container (PNG-in-ICO, supported by every current browser). */
function ico(images: { size: number; png: Buffer }[]) {
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0) // reserved
  header.writeUInt16LE(1, 2) // type: icon
  header.writeUInt16LE(images.length, 4)

  let offset = 6 + 16 * images.length
  const entries = images.map(({ size, png }) => {
    const entry = Buffer.alloc(16)
    entry.writeUInt8(size >= 256 ? 0 : size, 0) // width
    entry.writeUInt8(size >= 256 ? 0 : size, 1) // height
    entry.writeUInt8(0, 2) // palette size
    entry.writeUInt8(0, 3) // reserved
    entry.writeUInt16LE(1, 4) // color planes
    entry.writeUInt16LE(32, 6) // bits per pixel
    entry.writeUInt32LE(png.length, 8)
    entry.writeUInt32LE(offset, 12)
    offset += png.length
    return entry
  })
  return Buffer.concat([header, ...entries, ...images.map((i) => i.png)])
}

async function main() {
  const fonts = await loadFonts()
  const render = (node: ReactNode, width: number, height: number) => satori(node, { width, height, fonts })
  const scriptStat = await stat(scriptFile)

  // Site card + icons
  await writeFile(
    path.join(publicDir, 'og/default.png'),
    await sharp(toPng(await render(siteCard(), W, H), W))
      .png()
      .toBuffer(),
  )

  const markSvg = await render(mark(), 64, 64)
  await writeFile(path.join(publicDir, 'favicon.svg'), markSvg)
  await writeFile(
    path.join(publicDir, 'favicon.ico'),
    ico([16, 32, 48].map((size) => ({ size, png: toPng(markSvg, size) }))),
  )
  // iOS masks its own corners, so the touch icon is a full-bleed square.
  await writeFile(
    path.join(publicDir, 'apple-touch-icon.png'),
    await sharp(toPng(markSvg, 180)).flatten({ background: ink }).png().toBuffer(),
  )

  // Per-post cards
  await mkdir(outDir, { recursive: true })
  let generated = 0
  let skipped = 0
  for await (const entry of glob('**/*.mdx', { cwd: contentDir })) {
    const file = path.join(contentDir, entry)
    const m = file.match(POST_PATH_RE)
    if (!m) throw new Error(`Blog post path must be YYYY/MM-DD-slug.mdx: ${file}`)
    const [, year, month, day, slug] = m

    const source = await readFile(file, 'utf8')
    const fmMatch = source.match(/^---\n([\s\S]*?)\n---/)
    if (!fmMatch) throw new Error(`Missing frontmatter: ${file}`)
    const fm = parseYaml(fmMatch[1]) as Frontmatter
    if (!fm.published) continue

    const heroFile = path.join(publicDir, fm.image.hero)
    const outFile = path.join(outDir, `${slug}.webp`)
    const [srcStat, heroStat, outStat] = await Promise.all([
      stat(file),
      stat(heroFile),
      stat(outFile).catch(() => null),
    ])
    if (outStat && outStat.mtimeMs > Math.max(srcStat.mtimeMs, heroStat.mtimeMs, scriptStat.mtimeMs)) {
      skipped++
      continue
    }

    // satori/resvg can't decode webp heroes; normalize to a sized JPEG first.
    const hero = await sharp(heroFile).resize(W, H, { fit: 'cover' }).jpeg({ quality: 80 }).toBuffer()
    const heroUri = `data:image/jpeg;base64,${hero.toString('base64')}`

    const svg = await render(postCard(fm.title, `${year}-${month}-${day}`, heroUri), W, H)
    await writeFile(outFile, await sharp(toPng(svg, W)).webp({ quality: 88 }).toBuffer())
    generated++
  }
  console.log(`og: site card + icons written; ${generated} post card(s) generated, ${skipped} up to date`)
}

await main()
