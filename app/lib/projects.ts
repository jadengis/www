/** GitHub "linguist" colors, so language dots match what GitHub shows. */
export const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  Elixir: '#6e4a7e',
}

export type Project = {
  name: string
  description: string
  href: string
  kind: 'repo' | 'channel'
  language?: string
  /** Accent color used for the avatar tile + hover glow. */
  color: string
}

/** Curated set — select open-source repos + the YouTube channel. (No Underflow.) */
export const PROJECTS: Project[] = [
  {
    name: 'ngx-clarity',
    description: 'Angular module that drops Microsoft Clarity analytics into an app with a single import.',
    href: 'https://github.com/jadengis/ngx-clarity',
    kind: 'repo',
    language: 'TypeScript',
    color: '#3178c6',
  },
  {
    name: 'ng-helmet',
    description: 'A document-head manager for Angular — declarative title and meta tags per route.',
    href: 'https://github.com/jadengis/ng-helmet',
    kind: 'repo',
    language: 'TypeScript',
    color: '#dd0031',
  },
  {
    name: 'ngx-inject-control',
    description: 'Simple, reusable, injectable form controls for Angular reactive forms.',
    href: 'https://github.com/jadengis/ngx-inject-control',
    kind: 'repo',
    language: 'TypeScript',
    color: '#9b4dca',
  },
  {
    name: 'google_ai_ex',
    description: 'An Elixir client for the Google AI (Gemini) APIs, built for Phoenix apps.',
    href: 'https://github.com/jadengis/google_ai_ex',
    kind: 'repo',
    language: 'Elixir',
    color: '#a855f7',
  },
  {
    name: 'ecto_irs',
    description: 'Easy, low-friction auditing for Ecto schemas and migrations (unlike the IRS).',
    href: 'https://github.com/jadengis/ecto_irs',
    kind: 'repo',
    language: 'Elixir',
    color: '#7c3aed',
  },
  {
    name: 'recaptcha_ex',
    description: 'Community-maintained reCAPTCHA v3 library for Elixir and Phoenix.',
    href: 'https://github.com/jadengis/recaptcha_ex',
    kind: 'repo',
    language: 'Elixir',
    color: '#6d28d9',
  },
  {
    name: 'JohnDengisYT',
    description: 'My YouTube channel — cooking, culture, and travel videos from life on the move.',
    href: 'https://www.youtube.com/@JohnDengisYT',
    kind: 'channel',
    color: '#ff0000',
  },
]
