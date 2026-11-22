import type { ElementType, ReactNode } from 'react'
import { cn } from '~/lib/cn'

/**
 * Mono section marker, e.g. `01 // build`. Pass `index` for a numbered
 * section; omit it for a plain label.
 */
export function SectionLabel({
  index,
  as: Tag = 'p',
  className,
  children,
}: {
  index?: number
  as?: ElementType
  className?: string
  children: ReactNode
}) {
  return (
    <Tag className={cn('text-content-muted font-mono text-sm', className)}>
      {index !== undefined && (
        <>
          <span className="text-accent">{String(index).padStart(2, '0')}</span>
          <span aria-hidden="true"> // </span>
        </>
      )}
      {children}
    </Tag>
  )
}
