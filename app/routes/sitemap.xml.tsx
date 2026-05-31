import { getAllPosts } from '~/lib/posts'
import { SITE } from '~/lib/site'

const STATIC_PATHS = ['/', '/about', '/projects', '/blog', '/music']

export function loader() {
  const entries = [
    ...STATIC_PATHS.map((p) => ({ loc: `${SITE.url}${p}`, lastmod: '' })),
    ...getAllPosts().map((post) => ({
      loc: `${SITE.url}/blog/${post.slug}`,
      lastmod: post.date,
    })),
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
