import { ArrowRight } from 'lucide-react'
import { SocialLinks } from '~/components/social-links'
import { Button } from '~/components/ui/button'
import { site } from '~/lib/site'

/** Full-bleed homepage hero: name over a real background image, never in a card. */
export function Hero() {
  return (
    <section className="relative isolate flex min-h-[86vh] items-center overflow-hidden">
      {/* Background bitmap + legibility scrim */}
      <img
        src="/images/hero.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/60 to-black/30"
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-5xl px-6 py-20">
        <p className="mb-4 text-sm font-semibold tracking-[0.2em] text-white/70 uppercase">
          San Francisco · Engineer · Maker
        </p>
        <h1 className="max-w-3xl text-5xl font-black tracking-tight text-white sm:text-7xl">
          John <span className="text-gradient animate-shimmer bg-chromatic">Dengis</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-white/80 sm:text-xl">{site.tagline}</p>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-white/65">
          Software engineer and engineering leader. I build things, make videos and music, and study languages, usually
          all at once.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Button to="/projects" variant="solid" size="lg">
            See my work <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            to="/about"
            variant="outline"
            size="lg"
            className="border-white/30 text-white hover:border-white hover:text-white"
          >
            About me
          </Button>
          <SocialLinks className="ml-1" onDark />
        </div>
      </div>
    </section>
  )
}
