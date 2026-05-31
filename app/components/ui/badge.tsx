import type { ReactNode } from 'react'
import { cn } from '~/lib/cn'

type Tone = 'neutral' | 'accent' | 'gradient'

const tones: Record<Tone, string> = {
  neutral: 'border-edge bg-surface text-content-muted',
  accent: 'border-blood/30 bg-blood/10 text-accent',
  gradient: 'gradient-border text-content',
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
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
