import type { ReactNode } from 'react'
import { cn } from '~/lib/cn'

/**
 * Typographic emphasis: display-serif italic in the accent color. Use it for
 * one word or phrase that carries the sentence, not as decoration on every
 * heading.
 */
export function Em({ className, children }: { className?: string; children: ReactNode }) {
  return <em className={cn('font-display text-accent font-normal italic', className)}>{children}</em>
}
