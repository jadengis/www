import { Feed } from 'feed'
import { getAllPosts } from '~/lib/posts'
import { SITE } from '~/lib/site'

export function loader() {
  const feed = new Feed({
    title: SITE.name,
    description: SITE.description,
    id: SITE.url,
    link: SITE.url,
    language: 'en',
    favicon: `${SITE.url}/favicon.ico`,
    copyright: `© ${new Date().getFullYear()} ${SITE.name}`,
    feedLinks: { rss: `${SITE.url}/rss.xml` },
    author: { name: SITE.name, link: SITE.url },
  })

  for (const post of getAllPosts()) {
    const url = `${SITE.url}/blog/${post.slug}`
    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.description,
      date: new Date(`${post.date}T00:00:00Z`),
      image: `${SITE.url}${post.image.hero}`,
    })
  }

  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
