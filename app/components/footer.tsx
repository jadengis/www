import { Rss } from 'lucide-react'
import { SocialLinks } from '~/components/social-links'
import { site } from '~/lib/site'

export function Footer() {
  return (
    <footer className="border-edge mt-24 border-t">
      <div className="text-content-muted mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-6 gap-y-4 px-6 py-8 text-sm">
        <SocialLinks bare iconClassName="h-4 w-4" className="-ml-3 gap-0" />
        <div className="flex items-center gap-5 font-mono text-xs">
          <a href="/rss.xml" className="hover:text-content inline-flex items-center gap-1.5 transition-colors">
            <Rss className="h-3.5 w-3.5" aria-hidden="true" /> RSS
          </a>
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
        </div>
      </div>
    </footer>
  )
}
