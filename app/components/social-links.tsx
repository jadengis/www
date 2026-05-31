import { SocialIcon } from '~/components/ui/social-icon'
import { cn } from '~/lib/cn'
import { SOCIALS } from '~/lib/site'

/** Row of social links with brand icons. Set `onDark` when placed over a dark image. */
export function SocialLinks({
  className,
  iconClassName,
  onDark = false,
}: {
  className?: string
  iconClassName?: string
  onDark?: boolean
}) {
  return (
    <ul className={cn('flex items-center gap-2', className)}>
      {SOCIALS.map((s) => (
        <li key={s.name}>
          <a
            href={s.href}
            target="_blank"
            rel="noreferrer"
            aria-label={s.label}
            title={s.label}
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-lg border transition-all duration-200 hover:-translate-y-0.5',
              onDark
                ? 'border-white/25 text-white/80 hover:border-white hover:text-white'
                : 'border-edge text-content-muted hover:border-accent hover:text-accent',
            )}
          >
            <SocialIcon name={s.name} className={iconClassName} />
          </a>
        </li>
      ))}
    </ul>
  )
}
