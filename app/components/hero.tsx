import { ArrowRight } from 'lucide-react'
import { SocialLinks } from '~/components/social-links'
import { Button } from '~/components/ui/button'

/** Full-bleed homepage hero: name over a real background image, never in a card. */
export function Hero() {
  return (
    <section className="relative isolate flex min-h-[86vh] items-center overflow-hidden">
      {/* Background bitmap + legibility scrim */}
      <img
        src="/images/hero.jpg"
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/60 to-black/30"
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-5xl px-6 py-20">
        <h1 className="max-w-3xl text-6xl leading-none text-white sm:text-8xl">John Dengis</h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
          Software engineer and engineering leader. I build things, make videos and music, and study languages, usually
          all at once.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Button to="/projects" variant="solid" size="lg">
            See my work <ArrowRight className="h-4 w-4" />
          </Button>
          <Button to="/about" variant="outline" size="lg" className="border-white/30 text-white hover:border-white">
            About me
          </Button>
          <SocialLinks className="ml-1" onDark />
        </div>
      </div>
    </section>
  )
}
