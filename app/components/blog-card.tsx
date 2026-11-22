import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { PostMeta } from '~/components/post-meta'
import type { PostMeta as Post } from '~/lib/posts'

/** Blog index entry: square thumbnail, date and tags in mono, serif title. */
export function BlogCard({ post }: { post: Post }) {
  return (
    <Link to={`/blog/${post.slug}`} className="group block">
      <article className="border-edge bg-surface-2 group-hover:border-content grid items-stretch overflow-hidden rounded-lg border transition-colors duration-150 sm:grid-cols-[220px_1fr]">
        <div className="aspect-square overflow-hidden sm:aspect-auto">
          <img src={post.image.thumbnail} alt="" loading="lazy" className="h-full w-full object-cover" />
        </div>

        <div className="flex flex-col justify-center gap-3 p-6 sm:p-7">
          <PostMeta date={post.date} tags={post.tags} readingTime={post.readingTime} />
          <h2 className="group-hover:text-accent text-3xl leading-tight transition-colors">{post.title}</h2>
          <p className="text-content-muted leading-relaxed">{post.description}</p>
          <span className="text-content mt-1 inline-flex items-center gap-1.5 text-sm">
            Read post
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>
      </article>
    </Link>
  )
}
