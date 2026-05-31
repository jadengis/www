import { Rss } from 'lucide-react'
import { Link } from 'react-router'
import { SocialLinks } from '~/components/social-links'
import { NAV, SITE } from '~/lib/site'

export function Footer() {
  return (
    <footer className="border-edge mt-24 border-t">
      <div className="mx-auto grid max-w-5xl gap-10 px-6 py-12 sm:grid-cols-[1fr_auto]">
        <div className="space-y-3">
          <Link to="/" className="text-lg font-bold tracking-tight">
            {SITE.name}
          </Link>
          <p className="text-content-muted max-w-xs text-sm">{SITE.tagline}</p>
          <SocialLinks />
        </div>

        <nav aria-label="Sitemap" className="sm:text-right">
          <h2 className="text-content-muted mb-3 text-xs font-semibold tracking-widest uppercase">Sitemap</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="text-content-muted hover:text-accent">
                Home
              </Link>
            </li>
            {NAV.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-content-muted hover:text-accent">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href="/rss.xml"
                className="text-content-muted hover:text-accent inline-flex items-center gap-1.5 sm:justify-end"
              >
                <Rss className="h-3.5 w-3.5" /> RSS
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-edge border-t">
        <p className="text-content-muted mx-auto max-w-5xl px-6 py-6 text-xs">
          © {new Date().getFullYear()} {SITE.name}.
        </p>
      </div>
    </footer>
  )
}
