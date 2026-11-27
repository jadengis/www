import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { CopyEmail } from '~/components/copy-email'
import { useActiveSection } from '~/lib/active-section'
import { cn } from '~/lib/cn'
import { nav, site } from '~/lib/site'

function Wordmark({ onClick }: { onClick?: () => void }) {
  return (
    <Link to="/" onClick={onClick} className="font-display text-content hover:text-accent text-xl transition-colors">
      {site.name}
    </Link>
  )
}

const linkClass = (isActive: boolean) =>
  cn(
    'relative py-1 text-sm transition-colors hover:text-content',
    // Active route: full-strength text with an accent rule underneath.
    "after:absolute after:inset-x-0 after:-bottom-px after:h-px after:bg-accent after:transition-opacity after:content-['']",
    isActive ? 'text-content after:opacity-100' : 'text-content-muted after:opacity-0',
  )

export function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const section = useActiveSection()
  // On the home page, a link also lights up while its section is in view.
  const inView = (item: (typeof nav)[number]) =>
    pathname === '/' && item.section !== undefined && item.section === section

  return (
    <header className="border-edge bg-surface/85 sticky top-0 z-50 border-b backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-6 px-6">
        <Wordmark onClick={() => setOpen(false)} />

        <div className="flex items-center gap-8">
          <ul className="hidden items-center gap-7 md:flex">
            {nav.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} className={({ isActive }) => linkClass(isActive || inView(item))}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <CopyEmail className="hidden sm:inline-flex" />

          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="text-content hover:text-accent -mr-2 flex h-10 w-10 items-center justify-center md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-edge border-t px-6 pt-3 pb-5 md:hidden">
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'font-display block py-2 text-2xl transition-colors',
                      isActive ? 'text-accent' : 'text-content hover:text-accent',
                    )
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <CopyEmail className="mt-4 sm:hidden" />
        </div>
      )}
    </header>
  )
}
