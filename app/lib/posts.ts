import { parsePostPath } from '~/lib/post-path'

export type PostMeta = {
  slug: string
  title: string
  date: string // ISO yyyy-mm-dd
  /** ISO yyyy-mm-dd; set in frontmatter when a post is meaningfully revised. */
  updated?: string
  description: string
  image: {
    hero: string
    thumbnail: string
  }
  tags: string[]
  published: boolean
  /** Estimated minutes to read, derived from the post body. */
  readingTime: number
}

// Date lives in the path, not the frontmatter: YYYY/MM-DD-slug.mdx.
type Frontmatter = Omit<PostMeta, 'slug' | 'date' | 'readingTime'>

// Frontmatter only: keeps post bodies out of any bundle that just needs the list.
const frontmatters = import.meta.glob<Frontmatter>('../content/blog/**/*.mdx', {
  eager: true,
  import: 'frontmatter',
})

// Build-time reading-time estimates, injected per module by the
// remarkReadingTime plugin in vite.config.ts.
const readingTimes = import.meta.glob<number>('../content/blog/**/*.mdx', {
  eager: true,
  import: 'readingTime',
})

/** All posts, newest first. Drafts (published: false) are hidden in production. */
export function getAllPosts(): PostMeta[] {
  return Object.entries(frontmatters)
    .map(([path, fm]) => ({
      ...parsePostPath(path),
      ...fm,
      readingTime: readingTimes[path],
    }))
    .filter((p) => p.published || import.meta.env.DEV)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostMeta(slug: string): PostMeta | null {
  return getAllPosts().find((p) => p.slug === slug) ?? null
}

/** Unique tags across visible posts, alphabetical. */
export function getAllTags(): string[] {
  return [...new Set(getAllPosts().flatMap((p) => p.tags))].sort()
}

/** Posts carrying a tag, newest first. */
export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPosts().filter((p) => p.tags.includes(tag))
}
