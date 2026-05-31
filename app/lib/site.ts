import type { SocialName } from '~/components/ui/social-icon'

export const SITE = {
  name: 'John Dengis',
  url: 'https://john.deng.is',
  tagline: 'Software auteur · Code luthier · Music maker · Animal custodian',
  description:
    'Personal site of John Dengis: software engineer and former engineering leader, YouTuber, guitarist, and language learner.',
  email: 'john@deng.is',
} as const

export const NAV: { label: string; to: string }[] = [
  { label: 'About', to: '/about' },
  { label: 'Projects', to: '/projects' },
  { label: 'Blog', to: '/blog' },
  { label: 'Music', to: '/music' },
]

export const SOCIALS: { name: SocialName; label: string; href: string }[] = [
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
