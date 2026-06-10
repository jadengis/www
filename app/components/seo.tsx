import { site } from '~/lib/site'

type SeoProps = {
  title: string
  description?: string
  /** Path beginning with "/", used for canonical + og:url. */
  path?: string
  /** Absolute URL to a 1200×630 social card. */
  image?: string
  imageAlt?: string
  type?: 'website' | 'article'
}

/**
 * Per-page document metadata. React 19 hoists these tags into <head>, so this
 * is rendered inside the route component (the recommended approach over the
 * route module `meta` export). Site-wide tags live in root's App component.
 */
export function Seo({
  title,
  description = site.description,
  path = '/',
  image = `${site.url}/og/default.png`,
  imageAlt = site.name,
  type = 'website',
}: SeoProps) {
  const url = `${site.url}${path}`
  const fullTitle = path === '/' ? title : `${title} | ${site.name}`

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={imageAlt} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={imageAlt} />
    </>
  )
}
