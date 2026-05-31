import { Rss } from 'lucide-react'
import { BlogList } from '~/components/blog-list'
import { Seo } from '~/components/seo'
import { GradientText } from '~/components/ui/gradient-text'
import { IconButton } from '~/components/ui/icon-button'
import { getAllPosts } from '~/lib/posts'
import type { Route } from './+types/index'

export function loader() {
  return { posts: getAllPosts() }
}

export default function BlogIndex({ loaderData }: Route.ComponentProps) {
  const { posts } = loaderData

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <Seo
        title="Blog"
        path="/blog"
        description="Writing by John Dengis on engineering, AI, music, and the craft of making things."
      />
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
            The <GradientText>Blog</GradientText>
          </h1>
          <p className="text-content-muted mt-4 max-w-xl text-lg">
            Notes on engineering, AI, music, and making things — usually with a tangent or two.
          </p>
        </div>
        <IconButton label="RSS feed" href="/rss.xml">
          <Rss className="h-5 w-5" />
        </IconButton>
      </div>

      <div className="mt-14">
        {posts.length > 0 ? (
          <BlogList posts={posts} />
        ) : (
          <p className="text-content-muted">No posts yet — check back soon.</p>
        )}
      </div>
    </div>
  )
}
