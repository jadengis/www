import type { SocialName } from '~/components/ui/social-icon'

export const site = {
  name: 'John Dengis',
  url: 'https://john.deng.is',
  tagline: 'Software auteur · Code luthier · Music maker · Animal custodian',
  description:
    'Personal site of John Dengis: software engineer at Slash, maker of Tangent, guitarist, YouTuber, and language learner.',
} as const

/** `section` is the home-page section id that lights this link up while it's in view. */
export const nav: { label: string; to: string; section?: string }[] = [
  { label: 'Projects', to: '/projects', section: 'build' },
  { label: 'Blog', to: '/blog', section: 'write' },
  { label: 'Music', to: '/music', section: 'play' },
]

export const socials: { name: SocialName; label: string; href: string }[] = [
  { name: 'github', label: 'GitHub', href: 'https://github.com/jadengis' },
  { name: 'x', label: 'X', href: 'https://x.com/jadengis' },
  {
    name: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/john-dengis/',
  },
  {
    name: 'youtube',
    label: 'YouTube',
    href: 'https://www.youtube.com/@JohnDengisYT',
  },
]

/** schema.org Person for the home page's JSON-LD (add @context when embedding). */
export const personJsonLd = {
  '@type': 'Person',
  name: site.name,
  url: site.url,
  jobTitle: 'Software Engineer',
  worksFor: { '@type': 'Organization', name: 'Slash' },
  description: site.description,
  sameAs: socials.map((s) => s.href),
  knowsLanguage: ['English', 'Mandarin Chinese', 'Japanese'],
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: 'University of Waterloo' },
    { '@type': 'CollegeOrUniversity', name: 'University of Toronto' },
  ],
}
