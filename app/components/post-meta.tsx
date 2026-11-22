import { Link } from 'react-router'
import { Badge } from '~/components/ui/badge'
import { cn } from '~/lib/cn'

export function formatDate(iso: string): string {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function PostMeta({
  date,
  tags,
  readingTime,
  linkTags = false,
  className,
}: {
  date: string
  tags: string[]
  readingTime?: number
  /** Tag chips link to /blog/tags/:tag. Keep off inside <BlogCard>, whose whole card is already a link. */
  linkTags?: boolean
  className?: string
}) {
  return (
    <div className={cn('text-content-muted flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs', className)}>
      <span>
        <time dateTime={date}>{formatDate(date)}</time>
        {readingTime !== undefined && <> · {readingTime} min read</>}
      </span>
      <span className="flex flex-wrap gap-1.5">
        {tags.map((t) =>
          linkTags ? (
            <Link key={t} to={`/blog/tags/${t}`} className="transition-opacity hover:opacity-75">
              <Badge>#{t}</Badge>
            </Link>
          ) : (
            <Badge key={t}>#{t}</Badge>
          ),
        )}
      </span>
    </div>
  )
}
