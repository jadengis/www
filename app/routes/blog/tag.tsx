import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router'
import { BlogList } from '~/components/blog-list'
import { Seo } from '~/components/seo'
import { GradientText } from '~/components/ui/gradient-text'
import { getPostsByTag } from '~/lib/posts'
import type { Route } from './+types/tag'

export function loader({ params }: Route.LoaderArgs) {
  const posts = getPostsByTag(params.tag)
  if (posts.length === 0) throw new Response('Not found', { status: 404 })
  return { posts, tag: params.tag }
}

export default function BlogTag({ loaderData }: Route.ComponentProps) {
  const { posts, tag } = loaderData

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <Seo
        title={`Posts tagged #${tag}`}
        path={`/blog/tags/${tag}`}
        description={`Writing by John Dengis tagged #${tag}.`}
      />
      <Link
        to="/blog"
        className="text-content-muted hover:text-accent inline-flex items-center gap-1.5 text-sm font-medium"
      >
        <ArrowLeft className="h-4 w-4" /> All posts
      </Link>
      <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
        Tagged <GradientText>#{tag}</GradientText>
      </h1>
      <p className="text-content-muted mt-4 max-w-xl text-lg">
        {posts.length} {posts.length === 1 ? 'post' : 'posts'} with this tag.
      </p>

      <div className="mt-14">
        <BlogList posts={posts} />
      </div>
    </div>
  )
}
