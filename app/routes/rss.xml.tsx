import { Feed } from 'feed'
import { getAllPosts } from '~/lib/posts'
import { site } from '~/lib/site'

export function loader() {
  const feed = new Feed({
    title: site.name,
    description: site.description,
    id: site.url,
    link: site.url,
    language: 'en',
    favicon: `${site.url}/favicon.ico`,
    copyright: `© ${new Date().getFullYear()} ${site.name}`,
    feedLinks: { rss: `${site.url}/rss.xml` },
    author: { name: site.name, link: site.url },
  })

  for (const post of getAllPosts()) {
    const url = `${site.url}/blog/${post.slug}`
    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.description,
      date: new Date(`${post.date}T00:00:00Z`),
      image: `${site.url}${post.image.hero}`,
    })
  }

  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
