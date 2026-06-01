export type PostMeta = {
  slug: string
  title: string
  date: string // ISO yyyy-mm-dd
  description: string
  image: {
    hero: string
    thumbnail: string
  }
  tags: string[]
  published: boolean
}

// Date lives in the path, not the frontmatter: YYYY/MM-DD-slug.mdx.
type Frontmatter = Omit<PostMeta, 'slug' | 'date'>

// Frontmatter only: keeps post bodies out of any bundle that just needs the list.
const frontmatters = import.meta.glob<Frontmatter>('../content/blog/**/*.mdx', {
  eager: true,
  import: 'frontmatter',
})

const POST_PATH_RE = /\/(\d{4})\/(\d{2})-(\d{2})-(.+)\.mdx$/

/** Derive slug + ISO date from a post path of the form YYYY/MM-DD-slug.mdx. */
export function parsePostPath(path: string): { slug: string; date: string } {
  const m = path.match(POST_PATH_RE)
  if (!m) throw new Error(`Blog post path must be YYYY/MM-DD-slug.mdx: ${path}`)
  const [, year, month, day, slug] = m
  return { slug, date: `${year}-${month}-${day}` }
}

/** All posts, newest first. Drafts (published: false) are hidden in production. */
export function getAllPosts(): PostMeta[] {
  return Object.entries(frontmatters)
    .map(([path, fm]) => ({ ...parsePostPath(path), ...fm }))
    .filter((p) => p.published || import.meta.env.DEV)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostMeta(slug: string): PostMeta | null {
  return getAllPosts().find((p) => p.slug === slug) ?? null
}
