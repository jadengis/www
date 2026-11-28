import { getAllPosts } from '~/lib/posts'
import { site, socials } from '~/lib/site'

/** llms.txt: a concise, markdown site summary for AI crawlers and assistants. */
export function loader() {
  const posts = getAllPosts()

  const body = `# ${site.name}

> ${site.description}

${site.tagline}. Based in San Francisco, California. Software engineer at Slash and
maker of Tangent (https://tangentissues.com), a local-first desktop client for GitHub
Issues and Projects. Previously a founding engineer on Instacart's Connect API and later
a Senior Engineering Manager in Instacart's fulfillment org. Before that: Coral Health,
IBM and Vena Solutions. Background in mathematics and physics.

## Pages

- [Home](${site.url}/): Work, writing, music, languages, videos, and what's happening now.
- [Projects](${site.url}/projects): Tangent, open-source libraries (Angular, Elixir), and the YouTube channel.
- [Blog](${site.url}/blog): Writing on engineering, AI, music, and the craft of making things.
- [Music & Gear](${site.url}/music): The guitars, amps, and all-analog signal chain.

## Blog posts

${posts.map((p) => `- [${p.title}](${site.url}/blog/${p.slug}): ${p.description}`).join('\n')}

## Elsewhere

${socials.map((s) => `- [${s.label}](${s.href})`).join('\n')}
`

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
