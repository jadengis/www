import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { cn } from '~/lib/cn'

type Variant = 'solid' | 'outline' | 'ghost' | 'gradient'
type Size = 'sm' | 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-50 disabled:pointer-events-none'

const variants: Record<Variant, string> = {
  solid: 'bg-blood text-white hover:bg-blood-bright shadow-sm hover:shadow-[0_0_24px_-4px_var(--color-blood)]',
  outline: 'border border-edge text-content hover:border-accent hover:text-accent',
  ghost: 'text-content hover:bg-surface-2',
  gradient: 'gradient-border text-content hover:text-accent hover:-translate-y-0.5',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3.5 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
}

type CommonProps = {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
}

type ButtonProps = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    to?: undefined
    href?: undefined
  }

type InternalLinkProps = CommonProps & { to: string }

type ExternalLinkProps = CommonProps & {
  href: string
} & React.AnchorHTMLAttributes<HTMLAnchorElement>

type Props = ButtonProps | InternalLinkProps | ExternalLinkProps

export function Button({ variant = 'solid', size = 'md', className, children, ...props }: Props) {
  const classes = cn(base, variants[variant], sizes[size], className)

  if ('to' in props && props.to !== undefined) {
    const { to, ...rest } = props
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    )
  }

  if ('href' in props && props.href !== undefined) {
    const { href, ...rest } = props
    return (
      <a href={href} target="_blank" rel="noreferrer" className={classes} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...(props as ButtonProps)}>
      {children}
    </button>
  )
}
