import { SITE } from '~/lib/site'

type SeoInput = {
  title: string
  description?: string
  /** Path beginning with "/" — used for canonical + og:url. */
  path?: string
  image?: string
  type?: 'website' | 'article'
}

/** Builds a React Router `meta` array with canonical, Open Graph, and Twitter tags. */
export function seo({
  title,
  description = SITE.description,
  path = '/',
  image = `${SITE.url}/og/default.png`,
  type = 'website',
}: SeoInput) {
  const url = `${SITE.url}${path}`
  const fullTitle = path === '/' ? title : `${title} — ${SITE.name}`

  return [
    { title: fullTitle },
    { name: 'description', content: description },
    { tagName: 'link', rel: 'canonical', href: url },
    { property: 'og:title', content: fullTitle },
    { property: 'og:description', content: description },
    { property: 'og:type', content: type },
    { property: 'og:url', content: url },
    { property: 'og:image', content: image },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: fullTitle },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: image },
  ]
}
