import type { ReactNode } from 'react'
import { cn } from '~/lib/cn'

type Tone = 'neutral' | 'accent'

const tones: Record<Tone, string> = {
  neutral: 'border-edge bg-surface text-content-muted',
  accent: 'border-accent/40 text-accent',
}

/** Small pill for tags, language levels, statuses. */
export function Badge({
  tone = 'neutral',
  className,
  children,
}: {
  tone?: Tone
  className?: string
  children: ReactNode
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-sm border px-2 py-0.5 font-mono text-xs',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
