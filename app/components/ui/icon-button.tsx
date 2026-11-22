import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { cn } from '~/lib/cn'

const classes =
  'inline-flex h-10 w-10 items-center justify-center rounded-md border border-edge text-content-muted transition-colors duration-150 hover:border-content hover:text-content'

type Props = {
  label: string
  className?: string
  children: ReactNode
  to?: string
  href?: string
}

/** Square, icon-only button. `label` is required for accessibility + tooltip. */
export function IconButton({ label, className, children, to, href }: Props) {
  const merged = cn(classes, className)

  if (to) {
    return (
      <Link to={to} aria-label={label} title={label} className={merged}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" aria-label={label} title={label} className={merged}>
        {children}
      </a>
    )
  }
  return (
    <button type="button" aria-label={label} title={label} className={merged}>
      {children}
    </button>
  )
}
