import { ArrowLeft } from 'lucide-react'
import type { ComponentType } from 'react'
import { Link } from 'react-router'
import { JsonLd } from '~/components/jsonld'
import { PostMeta } from '~/components/post-meta'
import { Prose } from '~/components/ui/prose'
import type { PostMeta as Post } from '~/lib/posts'
import { seo } from '~/lib/seo'
import { SITE } from '~/lib/site'
import type { Route } from './+types/blog.$slug'

type Frontmatter = Omit<Post, 'slug'>
type PostModule = { default: ComponentType; frontmatter: Frontmatter }

// Eager glob lives in the route module (not a loader) so the MDX component is
// available for SSR + hydration. Bodies only bundle into this route's chunk.
const modules = import.meta.glob<PostModule>('../content/blog/*.mdx', {
  eager: true,
})

const bySlug = new Map<string, PostModule>(
  Object.entries(modules).map(([path, mod]) => [
    path
      .split('/')
      .pop()!
      .replace(/\.mdx$/, ''),
    mod,
  ]),
)

export function loader({ params }: Route.LoaderArgs) {
  const mod = bySlug.get(params.slug)
  if (!mod || (!mod.frontmatter.published && import.meta.env.PROD)) {
    throw new Response('Not found', { status: 404 })
  }
  return { meta: { slug: params.slug, ...mod.frontmatter } satisfies Post }
}

export function meta({ data }: Route.MetaArgs) {
  if (!data) return seo({ title: 'Post not found', path: '/blog' })
  const { meta } = data
  return seo({
    title: meta.title,
    description: meta.description,
    path: `/blog/${meta.slug}`,
    image: `${SITE.url}${meta.heroImage}`,
    type: 'article',
  })
}

export default function BlogPost({ loaderData, params }: Route.ComponentProps) {
  const { meta } = loaderData
  const Body = bySlug.get(params.slug)!.default

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: meta.title,
    description: meta.description,
    image: `${SITE.url}${meta.heroImage}`,
    datePublished: meta.date,
    dateModified: meta.date,
    keywords: meta.tags.join(', '),
    author: { '@type': 'Person', name: SITE.name, url: SITE.url },
    publisher: { '@type': 'Person', name: SITE.name },
    mainEntityOfPage: `${SITE.url}/blog/${meta.slug}`,
  }

  return (
    <article>
      <JsonLd data={articleLd} />

      {/* Hero */}
      <header className="relative isolate overflow-hidden">
        <img
          src={meta.heroImage}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/65 to-black/40"
        />
        <div className="mx-auto max-w-3xl px-6 pt-16 pb-12">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white/70 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> All posts
          </Link>
          <h1 className="mt-6 max-w-2xl text-3xl font-black tracking-tight text-white sm:text-5xl">{meta.title}</h1>
          <PostMeta date={meta.date} tags={meta.tags} className="mt-5 text-white/70" />
        </div>
      </header>

      {/* Body */}
      <div className="mx-auto max-w-3xl px-6 py-14">
        <Prose>
          <Body />
        </Prose>
      </div>
    </article>
  )
}
