import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { PostMeta } from '~/components/post-meta'
import { cn } from '~/lib/cn'
import type { PostMeta as Post } from '~/lib/posts'

/**
 * Creative blog index card. Alternates the image side per row and choreographs
 * a hover: card lifts, a chromatic gradient border animates in, the thumbnail
 * zooms, and the title shifts to the gradient fill.
 */
export function BlogCard({ post, index }: { post: Post; index: number }) {
  const imageRight = index % 2 === 1

  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group relative block transition-transform duration-300 hover:-translate-y-1"
    >
      {/* Animated gradient border (revealed on hover) */}
      <div
        aria-hidden="true"
        className="bg-chromatic animate-shimmer absolute -inset-px rounded-2xl opacity-0 blur-[1px] transition-opacity duration-300 group-hover:opacity-100"
      />

      <article
        className={cn(
          'border-edge bg-surface-2 relative grid items-stretch gap-0 overflow-hidden rounded-2xl border sm:grid-cols-[260px_1fr]',
        )}
      >
        {/* Square thumbnail */}
        <div className={cn('aspect-square overflow-hidden sm:aspect-auto', imageRight ? 'sm:order-2' : 'sm:order-1')}>
          <img
            src={post.thumbnail}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* Content */}
        <div className={cn('flex flex-col justify-center gap-3 p-7', imageRight ? 'sm:order-1' : 'sm:order-2')}>
          <PostMeta date={post.date} tags={post.tags} />
          <h2 className="group-hover:text-gradient text-2xl font-bold tracking-tight transition-colors">
            {post.title}
          </h2>
          <p className="text-content-muted leading-relaxed">{post.description}</p>
          <span className="text-accent mt-1 inline-flex items-center gap-1.5 text-sm font-semibold">
            Read post
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </span>
        </div>
      </article>
    </Link>
  )
}
