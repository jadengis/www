import { GearCard, type Gear } from '~/components/gear-card'
import { GradientText } from '~/components/ui/gradient-text'
import { seo } from '~/lib/seo'
import type { Route } from './+types/music'

export function meta(_: Route.MetaArgs) {
  return seo({
    title: 'Music & Gear',
    path: '/music',
    description: 'John Dengis on guitar, tone, and the gear and signal chains he tinkers with.',
  })
}

// Placeholder gear — swap images in public/images/gear and refine copy.
const GEAR: Gear[] = [
  {
    name: 'The main guitar',
    category: 'Guitar',
    image: '/images/gear/guitar.jpg',
    description:
      'My workhorse electric. Set up for fast, low action and tuned down for the heavier stuff — the instrument most of these ideas start on.',
  },
  {
    name: 'The amp',
    category: 'Amplification',
    image: '/images/gear/amp.jpg',
    description:
      "A high-gain tube amp that stays tight at volume. Run mostly on the dirty channel with the gain lower than you'd expect.",
  },
  {
    name: 'The pedalboard',
    category: 'Effects',
    image: '/images/gear/pedalboard.jpg',
    description:
      'Overdrive into the front end, modulation and delay in the loop. The order matters more than the count — this is where the tone-chasing actually happens.',
  },
  {
    name: 'The interface',
    category: 'Recording',
    image: '/images/gear/interface.jpg',
    description:
      'Where the rig meets the computer for tracking demos at home. Low latency, clean converters, and a reamp path for fixing tone later.',
  },
]

export default function Music() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
        Music &amp; <GradientText>Gear</GradientText>
      </h1>
      <p className="text-content-muted mt-4 max-w-2xl text-lg">
        I&apos;ve played in bands — including a progressive metal project — and I still play guitar most days. A lot of
        the fun is in the gear: the instruments, the amps, and the order things sit in the signal chain.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {GEAR.map((g) => (
          <GearCard key={g.name} gear={g} />
        ))}
      </div>

      <p className="text-content-muted mt-10 text-sm">
        Photos and specs are placeholders for now — the real rig shots are coming.
      </p>
    </div>
  )
}
