import { Check, Copy } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { cn } from '~/lib/cn'
import { site } from '~/lib/site'

/**
 * A mailto link that copies the address instead when the Clipboard API is
 * available, then confirms in place. Without JS it is a plain mailto link.
 * `solid` is the filled, primary-action version.
 */
export function CopyEmail({ solid = false, className }: { solid?: boolean; className?: string }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => () => clearTimeout(timer.current), [])

  async function onClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if (!navigator.clipboard) return
    event.preventDefault()
    try {
      await navigator.clipboard.writeText(site.email)
    } catch {
      window.location.href = `mailto:${site.email}`
      return
    }
    setCopied(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), 2000)
  }

  const Icon = copied ? Check : Copy

  return (
    <a
      href={`mailto:${site.email}`}
      onClick={onClick}
      title={site.email}
      className={cn(
        'inline-flex h-9 items-center gap-2 rounded-full border px-3.5 text-sm font-medium transition-colors duration-150',
        solid
          ? 'bg-accent border-accent text-on-accent hover:bg-content hover:border-content hover:text-surface'
          : 'border-edge text-content hover:border-content',
        className,
      )}
    >
      <Icon className={cn('h-4 w-4', copied && !solid && 'text-accent')} aria-hidden="true" />
      {/* Fixed width so the label swap doesn't shift the header. */}
      <span className="inline-block w-[4.75rem] text-left" aria-live="polite">
        {copied ? 'Copied' : 'Copy email'}
      </span>
    </a>
  )
}
