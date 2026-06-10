import { getAllPosts, getAllTags, getPostsByTag } from '~/lib/posts'
import { site } from '~/lib/site'

const staticPaths = ['/', '/about', '/projects', '/blog', '/music']

export function loader() {
  const entries = [
    ...staticPaths.map((p) => ({ loc: `${site.url}${p}`, lastmod: '' })),
    ...getAllPosts().map((post) => ({
      loc: `${site.url}/blog/${post.slug}`,
      lastmod: post.updated ?? post.date,
    })),
    // Tag pages, freshest post in the tag as lastmod (posts come newest first).
    ...getAllTags().map((tag) => {
      const [newest] = getPostsByTag(tag)
      return {
        loc: `${site.url}/blog/tags/${tag}`,
        lastmod: newest.updated ?? newest.date,
      }
    }),
  ]

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map((e) => `  <url><loc>${e.loc}</loc>${e.lastmod ? `<lastmod>${e.lastmod}</lastmod>` : ''}</url>`)
  .join('\n')}
</urlset>`

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
