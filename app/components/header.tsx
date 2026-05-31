import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router'
import { cn } from '~/lib/cn'
import { nav, site } from '~/lib/site'

function Brand({ onClick }: { onClick?: () => void }) {
  return (
    <Link to="/" onClick={onClick} className="group flex items-center gap-2.5 font-bold tracking-tight">
      <span className="bg-chromatic animate-shimmer flex h-8 w-8 items-center justify-center rounded-md text-sm font-black text-white">
        JD
      </span>
      <span className="text-content">{site.name}</span>
    </Link>
  )
}

const linkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'relative text-sm font-medium transition-colors hover:text-accent',
    isActive ? 'text-accent' : 'text-content-muted',
  )

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="border-edge bg-surface/80 sticky top-0 z-50 border-b backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Brand />

        <ul className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <li key={item.to}>
              <NavLink to={item.to} className={linkClass}>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="text-content hover:text-accent md:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <ul className="border-edge flex flex-col gap-1 border-t px-6 py-4 md:hidden">
          {nav.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'block rounded-md px-3 py-2 text-base font-medium transition-colors',
                    isActive ? 'text-accent bg-surface-2' : 'text-content-muted hover:text-accent hover:bg-surface-2',
                  )
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
