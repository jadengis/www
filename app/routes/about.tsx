import { Cat, Dog, Download, MapPin } from 'lucide-react'
import { JsonLd } from '~/components/jsonld'
import { Seo } from '~/components/seo'
import { SocialLinks } from '~/components/social-links'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { GradientText } from '~/components/ui/gradient-text'
import { personJsonLd } from '~/lib/site'

const highlights = [
  {
    period: '2019–2025',
    role: 'Instacart',
    detail:
      'Joined as a founding engineer on the Connect API and grew into engineering leadership, ending as a Senior Engineering Manager leading ~20 engineers across mobile and backend.',
  },
  {
    period: '2018–2019',
    role: 'Coral Health',
    detail:
      'Built a health-records application from the ground up on serverless infrastructure, integrating with 200+ health systems.',
  },
  {
    period: '2015–2018',
    role: 'IBM · Vena Solutions',
    detail:
      'Tuned a high-performance replacement for the IBM java.lang.Math library and the XL compiler, then sped up enterprise software by multiples at Vena.',
  },
]

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-content-muted mb-4 text-xs font-semibold tracking-widest uppercase">{children}</h2>
}

export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Seo
        title="About"
        path="/about"
        description="John Dengis, software engineer and engineering leader, YouTuber, guitarist, and lifelong language learner."
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ProfilePage',
          mainEntity: personJsonLd,
        }}
      />
      <p className="text-content-muted inline-flex items-center gap-1.5 text-sm">
        <MapPin className="h-4 w-4" /> San Francisco, California
      </p>
      <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
        Hey, I&apos;m <GradientText>John</GradientText>.
      </h1>

      <div className="text-content/90 mt-8 space-y-5 text-lg leading-relaxed">
        <p>
          I&apos;m a software engineer with a background in mathematics and physics. I spent the better part of seven
          years at Instacart, where I went from a founding engineer on a new API platform to leading teams as an
          engineering manager, hiring, growing, and shipping with people I genuinely liked working with.
        </p>
        <p>
          What I actually love is making things. Code is the obvious one, but it shows up everywhere: in the kitchen, on
          a fretboard, behind a camera, and lately in a stack of Japanese flashcards. I&apos;m a generalist by
          temperament and a perfectionist by accident.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Button href="/docs/cv.pdf" variant="gradient">
          <Download className="h-4 w-4" /> Download résumé (PDF)
        </Button>
        <SocialLinks />
      </div>

      {/* Highlights */}
      <section className="mt-16">
        <SectionTitle>Selected experience</SectionTitle>
        <ol className="border-edge space-y-6 border-l pl-6">
          {highlights.map((h) => (
            <li key={h.role} className="relative">
              <span className="bg-blood absolute top-1.5 -left-[1.6rem] h-2.5 w-2.5 rounded-full" />
              <p className="text-content-muted text-sm">{h.period}</p>
              <h3 className="font-semibold">{h.role}</h3>
              <p className="text-content-muted mt-1 text-sm leading-relaxed">{h.detail}</p>
            </li>
          ))}
        </ol>
        <p className="text-content-muted mt-4 text-sm">
          The full history lives in the{' '}
          <a href="/docs/cv.pdf" className="text-accent underline-offset-4 hover:underline">
            résumé
          </a>
          .
        </p>
      </section>

      {/* Beyond work */}
      <section className="mt-16 grid gap-8 sm:grid-cols-2">
        <div>
          <SectionTitle>Music</SectionTitle>
          <p className="text-content-muted text-sm leading-relaxed">
            I&apos;ve played in a few bands, including a progressive metal project. These days I play guitar at home and
            tinker endlessly with gear and signal chains. There&apos;s a whole{' '}
            <a href="/music" className="text-accent underline-offset-4 hover:underline">
              page about the rig
            </a>
            .
          </p>
        </div>
        <div>
          <SectionTitle>Languages</SectionTitle>
          <p className="text-content-muted mb-3 text-sm leading-relaxed">
            I got Mandarin to a comfortable B2 (HSK 4) and I&apos;m bringing it back from rusty. Japanese is the daily
            focus right now.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge tone="accent">中文 · B2 / HSK 4</Badge>
            <Badge tone="accent">日本語 · N4 → N3</Badge>
          </div>
        </div>
        <div>
          <SectionTitle>Video</SectionTitle>
          <p className="text-content-muted text-sm leading-relaxed">
            My{' '}
            <a
              href="https://www.youtube.com/@JohnDengisYT"
              target="_blank"
              rel="noreferrer"
              className="text-accent underline-offset-4 hover:underline"
            >
              YouTube channel
            </a>{' '}
            collects cooking, culture, and travel videos from years of living and eating around the world.
          </p>
        </div>
        <div>
          <SectionTitle>The animals</SectionTitle>
          <p className="text-content-muted flex items-start gap-2 text-sm leading-relaxed">
            <span className="text-accent mt-0.5 inline-flex gap-1">
              <Dog className="h-4 w-4" />
              <Cat className="h-4 w-4" />
            </span>
            A dog and a cat run the household. I&apos;m mostly staff.
          </p>
        </div>
      </section>
    </div>
  )
}
