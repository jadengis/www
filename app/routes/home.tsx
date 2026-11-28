import { ArrowUpRight, Download } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { CopyEmail } from '~/components/copy-email'
import { JsonLd } from '~/components/jsonld'
import { formatDate } from '~/components/post-meta'
import { RevealEmail } from '~/components/reveal-email'
import { Seo } from '~/components/seo'
import { Button } from '~/components/ui/button'
import { SectionLabel } from '~/components/ui/section-label'
import { useTrackSections } from '~/lib/active-section'
import { cn } from '~/lib/cn'
import { languages, nowUpdated, rig, tangent, videos, work, type Language } from '~/lib/home'
import { getAllPosts } from '~/lib/posts'
import { languageColors, projects } from '~/lib/projects'
import { personJsonLd, site } from '~/lib/site'
import type { Route } from './+types/home'

export function loader() {
  return { posts: getAllPosts().slice(0, 3) }
}

/** Section ids in page order; the index is the label number. */
const SECTIONS = ['build', 'write', 'play', 'speak', 'film', 'now', 'say-hi'] as const
type SectionId = (typeof SECTIONS)[number]

const labels: Record<SectionId, string> = {
  build: 'build',
  write: 'write',
  play: 'play',
  speak: 'speak',
  film: 'film',
  now: 'now',
  'say-hi': 'say hi',
}

/** A full-width band with its numbered label in a sticky left column on desktop. */
function Section({ id, children }: { id: SectionId; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-label`} className="border-edge scroll-mt-16 border-t">
      <div className="mx-auto grid max-w-5xl gap-6 px-6 py-16 md:grid-cols-[10rem_1fr] md:gap-10 md:py-24">
        <div>
          <SectionLabel as="h2" id={`${id}-label`} index={SECTIONS.indexOf(id) + 1} className="md:sticky md:top-28">
            {labels[id]}
          </SectionLabel>
        </div>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  )
}

function Lead({ children }: { children: ReactNode }) {
  return <p className="font-display max-w-2xl text-2xl leading-snug sm:text-3xl">{children}</p>
}

/** Hairline-ruled rows: a narrow "when" column, then the entry. */
function Rows({ children, className }: { children: ReactNode; className?: string }) {
  return <ol className={cn('border-edge divide-edge mt-10 divide-y border-y', className)}>{children}</ol>
}

function Row({ when, children }: { when: ReactNode; children: ReactNode }) {
  return (
    <li className="grid gap-1 py-6 sm:grid-cols-[7.5rem_1fr] sm:gap-6">
      <p className="text-content-muted pt-1 font-mono text-xs">{when}</p>
      <div className="min-w-0">{children}</div>
    </li>
  )
}

function ExternalLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn('hover:text-accent inline-flex items-baseline gap-1 transition-colors', className)}
    >
      {children}
      <ArrowUpRight className="h-3.5 w-3.5 shrink-0 self-center" aria-hidden="true" />
    </a>
  )
}

function TextLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className="text-accent underline decoration-1 underline-offset-4 hover:decoration-2">
      {children}
    </Link>
  )
}

/** A language's level ladder: reached steps filled, the in-progress step outlined. */
function Ladder({ language }: { language: Language }) {
  const reached = language.steps.indexOf(language.level)
  return (
    <div>
      <ol className="grid gap-1" style={{ gridTemplateColumns: `repeat(${language.steps.length}, minmax(0, 1fr))` }}>
        {language.steps.map((step, i) => {
          const state = i <= reached ? 'reached' : step === language.next ? 'next' : 'ahead'
          return (
            <li key={step} className="flex flex-col gap-1.5">
              <span
                className={cn(
                  'h-2 rounded-xs',
                  state === 'reached' && 'bg-accent',
                  state === 'next' && 'border-accent border',
                  state === 'ahead' && 'bg-edge',
                )}
              />
              <span
                className={cn('font-mono text-xs', step === language.level ? 'text-content' : 'text-content-muted')}
              >
                {step}
              </span>
            </li>
          )
        })}
      </ol>
      <p className="sr-only">
        {language.scale} level {language.level}
        {language.next ? `, working toward ${language.next}` : ''}.
      </p>
    </div>
  )
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { posts } = loaderData
  useTrackSections(SECTIONS)

  const repos = projects.filter((p) => p.kind === 'repo')

  return (
    <>
      <Seo title="John Dengis: Software auteur, code luthier, music maker" path="/" />
      <JsonLd data={{ '@context': 'https://schema.org', ...personJsonLd }} />
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'WebSite', name: site.name, url: site.url }} />

      {/* Hero: the name, then a sentence that finishes it (john.deng.is). */}
      <section className="mx-auto max-w-5xl px-6 pt-20 pb-16 sm:pt-28 sm:pb-24">
        <p className="text-content-muted mb-6 font-mono text-xs">San Francisco, California</p>
        <h1 className="text-7xl leading-[0.95] sm:text-9xl">John Dengis</h1>
        <p className="font-display text-content-muted mt-6 max-w-3xl text-2xl leading-snug sm:text-4xl">
          is a software auteur, code luthier, music maker and animal custodian.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <CopyEmail solid className="h-11 px-5" />
          <Button href="/docs/cv.pdf" variant="outline" className="h-11 rounded-full px-5">
            <Download className="h-4 w-4" aria-hidden="true" /> Résumé
          </Button>
        </div>
      </section>

      <Section id="build">
        <Lead>I&apos;ve spent a decade building software and leading the teams that ship it.</Lead>
        <p className="text-content-muted mt-4 max-w-2xl text-lg leading-relaxed">
          I came to it from mathematics and physics. I&apos;m a generalist by temperament and a perfectionist by
          accident.
        </p>
        <Rows>
          {work.map((item) => (
            <Row key={item.title} when={item.when}>
              <h3 className="text-lg font-medium">
                {item.href ? <ExternalLink href={item.href}>{item.title}</ExternalLink> : item.title}
              </h3>
              <p className="text-content-muted mt-1 max-w-2xl leading-relaxed">{item.body}</p>
            </Row>
          ))}
          <Row when="Projects">
            <div className="flex items-start gap-4">
              <img src={tangent.logo} alt="" width={56} height={56} className="-m-1 h-14 w-14 shrink-0" />
              <div className="min-w-0">
                <h3 className="text-lg font-medium">
                  <ExternalLink href={tangent.href}>{tangent.title}</ExternalLink>
                </h3>
                <p className="text-content-muted mt-1 max-w-2xl leading-relaxed">{tangent.body}</p>
              </div>
            </div>
          </Row>
          <Row when="Open source">
            <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {repos.map((repo) => (
                <li key={repo.name}>
                  <ExternalLink href={repo.href} className="font-mono text-sm">
                    {repo.name}
                  </ExternalLink>
                  <p className="text-content-muted mt-0.5 text-sm leading-relaxed">{repo.description}</p>
                  {repo.language && (
                    <p className="text-content-muted mt-1 inline-flex items-center gap-1.5 font-mono text-xs">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: languageColors[repo.language] }}
                        aria-hidden="true"
                      />
                      {repo.language}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </Row>
        </Rows>
      </Section>

      <Section id="write">
        <Lead>Notes on engineering, AI, music and making things.</Lead>
        <Rows>
          {posts.map((post) => (
            <Row key={post.slug} when={<time dateTime={post.date}>{formatDate(post.date)}</time>}>
              <h3 className="font-display text-2xl leading-tight">
                <Link to={`/blog/${post.slug}`} className="hover:text-accent transition-colors">
                  {post.title}
                </Link>
              </h3>
              <p className="text-content-muted mt-2 max-w-2xl leading-relaxed">{post.description}</p>
            </Row>
          ))}
        </Rows>
        <p className="mt-6 text-sm">
          <TextLink to="/blog">All posts</TextLink>
        </p>
      </Section>

      <Section id="play">
        <Lead>
          I&apos;ve played in bands, including a progressive metal project, and I still play most days. The rig is all
          analog, from a Japanese Ibanez to a 1978 Fender Deluxe Reverb.
        </Lead>
        <div className="mt-10 grid grid-cols-3 gap-2 sm:gap-3">
          {rig.map((photo) => (
            <img
              key={photo.src}
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              className="aspect-[4/5] w-full rounded-sm object-cover"
            />
          ))}
        </div>
        <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <TextLink to="/music">The whole rig</TextLink>
          <TextLink to="/blog/signal-chain-as-craft">Why pedal order matters</TextLink>
        </p>
      </Section>

      <Section id="speak">
        <Lead>Learning Mandarin and Japanese.</Lead>
        <Rows>
          {languages.map((language) => (
            <Row key={language.name} when={language.scale}>
              <div className="grid gap-5 sm:grid-cols-[1fr_16rem] sm:items-end sm:gap-10">
                <div>
                  <h3 className="flex items-baseline gap-3">
                    <span className="font-display text-3xl" lang={language.name === 'Mandarin' ? 'zh' : 'ja'}>
                      {language.native}
                    </span>
                    <span className="text-lg font-medium">{language.name}</span>
                  </h3>
                  <p className="text-content-muted mt-2 leading-relaxed">{language.note}</p>
                </div>
                <Ladder language={language} />
              </div>
            </Row>
          ))}
        </Rows>
      </Section>

      <Section id="film">
        <Lead>Before all this, I made cooking and food videos in Toronto. A few of them found an audience.</Lead>
        <ul className="mt-10 grid gap-6 sm:grid-cols-3">
          {videos.map((video) => (
            <li key={video.id}>
              <a
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noreferrer"
                className="group block"
              >
                <img
                  src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                  alt=""
                  loading="lazy"
                  className="aspect-video w-full rounded-sm object-cover"
                />
                <p className="group-hover:text-accent mt-3 leading-snug font-medium transition-colors">{video.title}</p>
                <p className="text-content-muted mt-1 font-mono text-xs">
                  {video.views} views, {video.year}
                </p>
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm">
          <a
            href="https://www.youtube.com/@JohnDengisYT"
            target="_blank"
            rel="noreferrer"
            className="text-accent underline decoration-1 underline-offset-4 hover:decoration-2"
          >
            The channel
          </a>
        </p>
      </Section>

      <Section id="now">
        <p className="text-content-muted font-mono text-xs">Updated {nowUpdated}</p>
        <div className="mt-4 max-w-2xl space-y-4 text-lg leading-relaxed">
          <p>
            Shipping{' '}
            <a
              href="https://tangentissues.com"
              target="_blank"
              rel="noreferrer"
              className="text-accent underline decoration-1 underline-offset-4 hover:decoration-2"
            >
              Tangent
            </a>
            : version 0.1.0 came out on November 22.
          </p>
          <p>Making a couple of games. More on those when they&apos;re announced.</p>
          <p>
            Japanese every day, aiming for N3. The goal is to finish{' '}
            <a
              href="https://en.wikipedia.org/wiki/Bahamut_Lagoon"
              target="_blank"
              rel="noreferrer"
              className="text-accent underline decoration-1 underline-offset-4 hover:decoration-2"
            >
              Bahamut Lagoon
            </a>
            .
          </p>
        </div>
      </Section>

      <Section id="say-hi">
        <Lead>Email is the best way to reach me.</Lead>
        <RevealEmail className="mt-6" />
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <CopyEmail />
          <Button href="/docs/cv.pdf" variant="outline" className="h-9 rounded-full px-3.5">
            <Download className="h-4 w-4" aria-hidden="true" /> Résumé
          </Button>
        </div>
      </Section>
    </>
  )
}
