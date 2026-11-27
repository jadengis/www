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
    body: 'Software engineer.',
  },
  {
    when: '2026',
    title: 'Tangent',
    href: 'https://tangentissues.com',
    body: 'A local-first desktop client for GitHub Issues and Projects. Lists, filters, search and edits run on your machine in under a frame, then sync to GitHub in the background. Version 0.1.0 is out for macOS, Windows and Linux.',
  },
  {
    when: '2019–2025',
    title: 'Instacart',
    body: 'Engineering leadership in the fulfillment org, building with some of the largest enterprises in the world. I joined as a founding engineer on the Connect API and left as a senior engineering manager leading about 20 engineers.',
  },
]

/** A JLPT/CEFR-style ladder: `level` is reached, `next` is in progress. */
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
    scale: 'CEFR',
    steps: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
    level: 'B2',
    note: 'Got it to a comfortable B2 (HSK 4). Bringing it back from rusty.',
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
