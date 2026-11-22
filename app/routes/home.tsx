import { ArrowRight, Code2, Guitar, Languages, Video } from 'lucide-react'
import { Link } from 'react-router'
import { Hero } from '~/components/hero'
import { JsonLd } from '~/components/jsonld'
import { ProjectCard } from '~/components/project-card'
import { Seo } from '~/components/seo'
import { SectionLabel } from '~/components/ui/section-label'
import { projects } from '~/lib/projects'
import { personJsonLd, site } from '~/lib/site'
import type { Route } from './+types/home'

export const links: Route.LinksFunction = () => [
  // The hero background is this page's LCP element; fetch it ahead of render.
  { rel: 'preload', as: 'image', href: '/images/hero.jpg', fetchPriority: 'high' },
]

const facets = [
  {
    icon: Code2,
    title: 'Engineering',
    body: 'A decade building and leading teams on platforms that scale to billions in volume.',
  },
  {
    icon: Video,
    title: 'Video',
    body: 'A YouTube channel of cooking, culture, and travel: stories from life on the move.',
  },
  {
    icon: Guitar,
    title: 'Music',
    body: 'Guitarist and gear tinkerer; ex-prog-metal. Always chasing a better signal chain.',
  },
  {
    icon: Languages,
    title: 'Languages',
    body: 'Mandarin to B2, and a daily Japanese practice climbing through N4 toward N3.',
  },
]

export default function Home() {
  const featured = projects.slice(0, 3)

  const personLd = {
    '@context': 'https://schema.org',
    ...personJsonLd,
  }
  const siteLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: site.url,
  }

  return (
    <>
      <Seo title="John Dengis: Software auteur, code luthier, music maker" path="/" />
      <JsonLd data={personLd} />
      <JsonLd data={siteLd} />

      <Hero />

      {/* Facets */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <SectionLabel index={1}>care</SectionLabel>
        <h2 className="mt-3 text-4xl">A few things I care about</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {facets.map(({ icon: Icon, title, body }) => (
            <div key={title} className="border-edge bg-surface-2 rounded-lg border p-6">
              <Icon className="text-accent h-7 w-7" />
              <h3 className="mt-4 font-semibold">{title}</h3>
              <p className="text-content-muted mt-2 text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured projects */}
      <section className="mx-auto max-w-5xl px-6 pb-8">
        <SectionLabel index={2}>build</SectionLabel>
        <div className="mt-3 flex items-end justify-between gap-4">
          <h2 className="text-4xl">Featured projects</h2>
          <Link
            to="/projects"
            className="text-content-muted hover:text-content inline-flex shrink-0 items-center gap-1 text-sm transition-colors"
          >
            All projects <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProjectCard key={p.name} project={p} />
          ))}
        </div>
      </section>
    </>
  )
}
