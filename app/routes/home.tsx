import { ArrowRight, Code2, Guitar, Languages, Video } from 'lucide-react'
import { Link } from 'react-router'
import { Hero } from '~/components/hero'
import { JsonLd } from '~/components/jsonld'
import { ProjectCard } from '~/components/project-card'
import { Seo } from '~/components/seo'
import { GradientText } from '~/components/ui/gradient-text'
import { projects } from '~/lib/projects'
import { site, socials } from '~/lib/site'

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
    '@type': 'Person',
    name: site.name,
    url: site.url,
    jobTitle: 'Software Engineer',
    description: site.description,
    sameAs: socials.map((s) => s.href),
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
        <h2 className="text-3xl font-bold tracking-tight">
          A few things I <GradientText>care about</GradientText>
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {facets.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="group border-edge bg-surface-2 hover:border-accent rounded-lg border p-6 transition-colors"
            >
              <Icon className="text-accent h-7 w-7" />
              <h3 className="mt-4 font-semibold">{title}</h3>
              <p className="text-content-muted mt-2 text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured projects */}
      <section className="mx-auto max-w-5xl px-6 pb-8">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl font-bold tracking-tight">
            Featured <GradientText>projects</GradientText>
          </h2>
          <Link
            to="/projects"
            className="text-content-muted hover:text-accent inline-flex items-center gap-1 text-sm font-medium"
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
