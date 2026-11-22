import { SocialIcon } from '~/components/ui/social-icon'
import { cn } from '~/lib/cn'
import { socials } from '~/lib/site'

/**
 * Row of social links with brand icons. Set `onDark` when placed over a dark
 * image, and `bare` for unboxed icons (e.g. the footer).
 */
export function SocialLinks({
  className,
  iconClassName,
  onDark = false,
  bare = false,
}: {
  className?: string
  iconClassName?: string
  onDark?: boolean
  bare?: boolean
}) {
  return (
    <ul className={cn('flex items-center gap-2', className)}>
      {socials.map((s) => (
        <li key={s.name}>
          <a
            href={s.href}
            target="_blank"
            rel="noreferrer"
            aria-label={s.label}
            title={s.label}
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-md transition-colors duration-150',
              bare
                ? 'text-content-muted hover:text-content'
                : onDark
                  ? 'border border-white/25 text-white/80 hover:border-white hover:text-white'
                  : 'border-edge text-content-muted hover:border-content hover:text-content border',
            )}
          >
            <SocialIcon name={s.name} className={iconClassName} />
          </a>
        </li>
      ))}
    </ul>
  )
}
