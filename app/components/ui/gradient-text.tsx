import type { ElementType, ReactNode } from 'react'
import { cn } from '~/lib/cn'

/** Applies the chromatic gradient as a text fill. Use sparingly, for accents. */
export function GradientText({
  as: Tag = 'span',
  className,
  children,
}: {
  as?: ElementType
  className?: string
  children: ReactNode
}) {
  return <Tag className={cn('text-gradient', className)}>{children}</Tag>
}
