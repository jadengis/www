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
        'prose-headings:font-display prose-headings:font-normal prose-h3:font-sans prose-h3:font-semibold prose-h4:font-sans',
        'prose-a:text-accent prose-a:decoration-1 prose-a:underline-offset-4 prose-a:hover:decoration-2',
        // rehype-autolink-headings wraps headings in anchors; keep them looking like headings.
        '[&_:is(h1,h2,h3,h4)_a]:text-content [&_:is(h1,h2,h3,h4)_a]:no-underline',
        'prose-strong:text-content prose-blockquote:border-l-accent prose-blockquote:font-display prose-blockquote:font-normal',
        "prose-code:font-mono prose-code:rounded prose-code:bg-surface-2 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-[0.85em] prose-code:before:content-[''] prose-code:after:content-['']",
        'prose-img:rounded-md prose-hr:border-edge',
        className,
      )}
    >
      {children}
    </div>
  )
}
