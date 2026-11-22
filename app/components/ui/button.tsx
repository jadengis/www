import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { cn } from '~/lib/cn'

type Variant = 'solid' | 'outline' | 'link'
type Size = 'sm' | 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50'

const variants: Record<Variant, string> = {
  solid: 'rounded-md bg-accent text-on-accent hover:bg-content hover:text-surface',
  outline: 'rounded-md border border-edge text-content hover:border-content',
  link: 'text-accent underline decoration-1 underline-offset-4 hover:decoration-2',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3.5 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-11 px-5 text-base',
}

// The link variant sits inline with text, so it takes no box size.
const linkSize = 'text-[length:inherit]'

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
  const classes = cn(base, variants[variant], variant === 'link' ? linkSize : sizes[size], className)

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
