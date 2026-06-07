import type { ReactNode } from 'react'
import { cn } from '~/lib/cn'

/**
 * Typographic wrapper for rendered MDX bodies. Uses @tailwindcss/typography
 * with brand-tuned accents; code blocks are highlighted by rehype-pretty-code.
 */
export function Prose({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        'prose prose-zinc dark:prose-invert max-w-none',
        'prose-headings:font-bold prose-headings:tracking-tight',
        'prose-a:text-accent prose-a:no-underline prose-a:hover:underline prose-a:underline-offset-4',
        'prose-strong:text-content prose-blockquote:border-l-blood',
        "prose-code:rounded prose-code:bg-surface-2 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-[0.85em] prose-code:before:content-[''] prose-code:after:content-['']",
        'prose-img:rounded-xl prose-hr:border-edge',
        className,
      )}
    >
      {children}
    </div>
  )
}
