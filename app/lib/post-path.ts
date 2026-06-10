// Shared with the blog post route's client bundle; keep this module free of
// content globs (see posts.ts for why).
const POST_PATH_RE = /\/(\d{4})\/(\d{2})-(\d{2})-(.+)\.mdx$/

/** Derive slug + ISO date from a post path of the form YYYY/MM-DD-slug.mdx. */
export function parsePostPath(path: string): { slug: string; date: string } {
  const m = path.match(POST_PATH_RE)
  if (!m) throw new Error(`Blog post path must be YYYY/MM-DD-slug.mdx: ${path}`)
  const [, year, month, day, slug] = m
  return { slug, date: `${year}-${month}-${day}` }
}
