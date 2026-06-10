import { GearCard, type Gear } from '~/components/gear-card'
import { Seo } from '~/components/seo'
import { GradientText } from '~/components/ui/gradient-text'

const gear: Gear[] = [
  {
    name: 'Ibanez RGR5221 Prestige',
    category: 'Guitar',
    image: '/images/gear/guitar.webp',
    description:
      'A Japanese-made Prestige with a Super Wizard neck and 24 jumbo stainless-steel frets, so the action is fast and the playability is effortless. A pair of Bare Knuckle Brute Force humbuckers over a fixed Gibraltar bridge keep it tight and brutal. It shreds like a machine.',
  },
  {
    name: '1978 Fender Deluxe Reverb',
    category: 'Amplification',
    image: '/images/gear/amp.webp',
    description:
      'A silverface tube amp in great shape, with crystal-clear cleans and lush analog reverb. A wonderfully versatile platform for a diverse set of tones.',
  },
  {
    name: 'The pedalboard',
    category: 'Effects',
    image: '/images/gear/pedalboard.webp',
    description:
      'A Pedaltrain board with a Voodoo Lab Pedal Power 3. The chain is purposefully all-analog: an Empress Buffer+ (with a TC Electronic PolyTune in its tuner slot) into a Dunlop Cry Baby, a Maxon OD808, the Empress Heavy, a TC Electronic Thunderstorm, and an MXR Carbon Copy Deluxe. Drive and dirt up front, modulation and delay at the end.',
  },
  {
    name: 'Two Notes Torpedo Captor X',
    category: 'Recording',
    image: '/images/gear/interface.webp',
    description:
      'A reactive load box and power attenuator that doubles as a capture box, so the Deluxe Reverb can go straight DI into the DAW. A great, versatile tool for a tube-amp lover who still wants to track quietly at home.',
  },
]

export default function Music() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <Seo
        title="Music & Gear"
        path="/music"
        description="John Dengis on guitar, tone, and the gear and signal chains he tinkers with."
      />
      <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
        Music &amp; <GradientText>Gear</GradientText>
      </h1>
      <p className="text-content-muted mt-4 max-w-2xl text-lg">
        I&apos;ve played in bands, including a progressive metal project, and I still play guitar most days. A lot of
        the fun is in the gear: the instruments, the amps, and the order things sit in the signal chain.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {gear.map((g) => (
          <GearCard key={g.name} gear={g} />
        ))}
      </div>
    </div>
  )
}
