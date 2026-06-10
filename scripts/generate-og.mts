/**
 * Build-time OG card generator: renders a 1200×630 WebP per published blog
 * post into public/og/blog/<slug>.webp, with the post's hero image as the
 * card background. Runs before `react-router build` (see the package.json
 * build script). Cards are skipped when the existing file is newer than both
 * the source .mdx and the hero image.
 */
import { Resvg } from '@resvg/resvg-js'
import { glob, mkdir, readFile, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { ReactNode } from 'react'
import satori from 'satori'
import sharp from 'sharp'
import { parse as parseYaml } from 'yaml'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const contentDir = path.join(root, 'app/content/blog')
const outDir = path.join(root, 'public/og/blog')

// Same path convention as app/lib/post-path.ts: YYYY/MM-DD-slug.mdx.
const POST_PATH_RE = /\/(\d{4})\/(\d{2})-(\d{2})-(.+)\.mdx$/

// Brand tokens from app/app.css.
const ink = '#0a0a0b'
const bone = '#fafafa'
const muted = 'rgba(250, 250, 250, 0.78)'
const chromatic = 'linear-gradient(120deg, #ff2d40, #ff7a18, #b829e6, #2d9bff)'

type Frontmatter = { title: string; published: boolean; image: { hero: string } }

/** Minimal element factory for satori's React-element-shaped input. */
function el(type: string, style: Record<string, unknown>, children?: unknown): ReactNode {
  return { type, props: { style, children } } as unknown as ReactNode
}

function card(title: string, date: string, heroUri: string) {
  const prettyDate = new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })

  return el(
    'div',
    {
      width: 1200,
      height: 630,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '72px 80px 88px',
      backgroundColor: ink,
      color: bone,
      fontFamily: 'Inter',
      position: 'relative',
    },
    [
      // Hero background + legibility scrim (same treatment as the post header)
      {
        type: 'img',
        props: {
          src: heroUri,
          width: 1200,
          height: 630,
          style: { position: 'absolute', top: 0, left: 0, objectFit: 'cover' },
        },
      },
      el('div', {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 1200,
        height: 630,
        backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0.92), rgba(0,0,0,0.68) 55%, rgba(0,0,0,0.42))',
      }),
      // Brand row
      el('div', { display: 'flex', alignItems: 'center', gap: 20 }, [
        el(
          'div',
          {
            width: 64,
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 14,
            backgroundImage: chromatic,
            color: '#ffffff',
            fontSize: 30,
            fontWeight: 700,
          },
          'JD',
        ),
        el('div', { display: 'flex', fontSize: 30, fontWeight: 700 }, 'John Dengis'),
      ]),
      // Title
      el(
        'div',
        {
          display: 'flex',
          fontSize: title.length > 55 ? 60 : 72,
          fontWeight: 700,
          lineHeight: 1.12,
          letterSpacing: '-0.02em',
          maxWidth: 1000,
        },
        title,
      ),
      // Footer row
      el('div', { display: 'flex', justifyContent: 'space-between', fontSize: 28, color: muted }, [
        el('div', { display: 'flex' }, prettyDate),
        el('div', { display: 'flex' }, 'john.deng.is'),
      ]),
      // Chromatic baseline
      el('div', {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: 1200,
        height: 12,
        backgroundImage: chromatic,
      }),
    ],
  )
}

async function main() {
  const [regular, bold] = await Promise.all([
    readFile(path.join(root, 'scripts/og/Inter-Regular.ttf')),
    readFile(path.join(root, 'scripts/og/Inter-Bold.ttf')),
  ])
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

    const heroFile = path.join(root, 'public', fm.image.hero)
    const outFile = path.join(outDir, `${slug}.webp`)
    const [srcStat, heroStat, outStat] = await Promise.all([
      stat(file),
      stat(heroFile),
      stat(outFile).catch(() => null),
    ])
    if (outStat && outStat.mtimeMs > Math.max(srcStat.mtimeMs, heroStat.mtimeMs)) {
      skipped++
      continue
    }

    // satori/resvg can't decode webp heroes; normalize to a sized JPEG first.
    const hero = await sharp(heroFile).resize(1200, 630, { fit: 'cover' }).jpeg({ quality: 80 }).toBuffer()
    const heroUri = `data:image/jpeg;base64,${hero.toString('base64')}`

    const svg = await satori(card(fm.title, `${year}-${month}-${day}`, heroUri), {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Inter', data: regular, weight: 400, style: 'normal' },
        { name: 'Inter', data: bold, weight: 700, style: 'normal' },
      ],
    })
    const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng()
    await writeFile(outFile, await sharp(png).webp({ quality: 88 }).toBuffer())
    generated++
  }
  console.log(`og: ${generated} card(s) generated, ${skipped} up to date`)
}

await main()
