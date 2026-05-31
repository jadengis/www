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

type Frontmatter = Omit<PostMeta, 'slug'>

// Frontmatter only — keeps post bodies out of any bundle that just needs the list.
const frontmatters = import.meta.glob<Frontmatter>('../content/blog/*.mdx', {
  eager: true,
  import: 'frontmatter',
})

function slugOf(path: string): string {
  return path
    .split('/')
    .pop()!
    .replace(/\.mdx$/, '')
}

/** All posts, newest first. Drafts (published: false) are hidden in production. */
export function getAllPosts(): PostMeta[] {
  return Object.entries(frontmatters)
    .map(([path, fm]) => ({ slug: slugOf(path), ...fm }))
    .filter((p) => p.published || import.meta.env.DEV)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostMeta(slug: string): PostMeta | null {
  return getAllPosts().find((p) => p.slug === slug) ?? null
}
