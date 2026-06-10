import { getAllPosts } from '~/lib/posts'
import { site, socials } from '~/lib/site'

/** llms.txt: a concise, markdown site summary for AI crawlers and assistants. */
export function loader() {
  const posts = getAllPosts()

  const body = `# ${site.name}

> ${site.description}

${site.tagline}. Based in San Francisco, California. Previously a founding engineer
on Instacart's Connect API platform and later a Senior Engineering Manager there.

## Pages

- [About](${site.url}/about): Background, selected experience, languages, and life beyond work.
- [Projects](${site.url}/projects): Open-source libraries (Angular, Elixir) and the YouTube channel.
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
