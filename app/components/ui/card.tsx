import type { ReactNode } from 'react'
import { cn } from '~/lib/cn'

/** Framed surface for individual repeated items (cards, tiles). Radius kept small. */
export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('border-edge bg-surface-2 rounded-lg border', className)}>{children}</div>
}
