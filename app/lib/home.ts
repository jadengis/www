/** Content for the home page's long scroll. Copy lives here; layout in routes/home.tsx. */

export type WorkItem = {
  when: string
  title: string
  href?: string
  body: string
}

export const work: WorkItem[] = [
  {
    when: 'Now',
    title: 'Slash',
    href: 'https://www.slash.com',
    body: 'Engineering. Building the best way for a business to bank: cards, checking and treasury, with an API for all of it.',
  },
  {
    when: '2019–2025',
    title: 'Instacart',
    href: 'https://www.instacart.com',
    body: 'Engineering leadership in the fulfillment org, building with some of the largest enterprises in the world. I joined as a founding engineer on the Connect API and left as a senior engineering manager leading about 20 engineers.',
  },
  {
    when: '2015–2019',
    title: 'Coral Health, IBM and Vena',
    body: 'A health-records app built from scratch on serverless infrastructure at Coral Health, connected to more than 200 health systems. Before that, performance work on the IBM XL compiler and its java.lang.Math replacement, then on enterprise software at Vena Solutions.',
  },
]

/** Tangent is the featured project in the build section, ahead of the open-source libraries. */
export const tangent = {
  title: 'Tangent',
  href: 'https://tangentissues.com',
  logo: '/images/projects/tangent.svg',
  release: 'Version 0.1.0 for macOS, Windows and Linux',
  body: 'A local-first desktop client for GitHub Issues and Projects. Lists, filters, search and edits run on your machine in under a frame, then sync to GitHub in the background.',
}

/** An HSK/JLPT-style ladder: `level` is reached, `next` is in progress. */
export type Language = {
  name: string
  native: string
  scale: string
  steps: string[]
  level: string
  next?: string
  note: string
}

export const languages: Language[] = [
  {
    name: 'Mandarin',
    native: '中文',
    scale: 'HSK',
    steps: ['1', '2', '3', '4', '5', '6'],
    level: '3',
    next: '4',
    note: 'HSK 3 done, and partway through HSK 4.',
  },
  {
    name: 'Japanese',
    native: '日本語',
    scale: 'JLPT',
    steps: ['N5', 'N4', 'N3', 'N2', 'N1'],
    level: 'N4',
    next: 'N3',
    note: 'The daily practice right now, working through N4 toward N3.',
  },
]

export type Video = { id: string; title: string; views: string; year: string }

/** The channel's most-watched videos (view counts as of November 2026). */
export const videos: Video[] = [
  { id: 'wfk0rrAOlVQ', title: 'Cheesy Garlic Mussels', views: '263K', year: '2017' },
  { id: 'cAehRPAH_8U', title: 'Eating Filipino Kamayan (Hand-to-Mouth)', views: '187K', year: '2017' },
  { id: 'tenSdSrjmtc', title: 'Japanese BBQ Eel Rice (Unadon)', views: '43K', year: '2017' },
]

export const rig = [
  { src: '/images/gear/guitar.webp', alt: 'Orange Ibanez RGR5221 Prestige in a red-lined case' },
  { src: '/images/gear/amp.webp', alt: '1978 silverface Fender Deluxe Reverb' },
  { src: '/images/gear/pedalboard.webp', alt: 'Pedalboard with an all-analog signal chain' },
]

/** Month the "now" section was last revised. */
export const nowUpdated = 'November 2026'
