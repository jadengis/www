import { BlogCard } from '~/components/blog-card'
import type { PostMeta } from '~/lib/posts'

export function BlogList({ posts }: { posts: PostMeta[] }) {
  return (
    <div className="flex flex-col gap-8">
      {posts.map((post, i) => (
        <BlogCard key={post.slug} post={post} index={i} />
      ))}
    </div>
  )
}
