import type { SocialName } from '~/components/ui/social-icon'

export const site = {
  name: 'John Dengis',
  url: 'https://john.deng.is',
  tagline: 'Software auteur · Code luthier · Music maker · Animal custodian',
  description:
    'Personal site of John Dengis: software engineer and engineering leader, YouTuber, guitarist, and language learner.',
} as const

export const nav: { label: string; to: string }[] = [
  { label: 'About', to: '/about' },
  { label: 'Projects', to: '/projects' },
  { label: 'Blog', to: '/blog' },
  { label: 'Music', to: '/music' },
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

/**
 * schema.org Person, shared by the home page (with @context) and the about
 * page's ProfilePage mainEntity (without).
 */
export const personJsonLd = {
  '@type': 'Person',
  name: site.name,
  url: site.url,
  jobTitle: 'Software Engineer',
  description: site.description,
  sameAs: socials.map((s) => s.href),
  knowsLanguage: ['English', 'Mandarin Chinese', 'Japanese'],
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: 'University of Waterloo' },
    { '@type': 'CollegeOrUniversity', name: 'University of Toronto' },
  ],
}
