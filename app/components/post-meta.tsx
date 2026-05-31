import { Calendar } from 'lucide-react'
import { Badge } from '~/components/ui/badge'
import { cn } from '~/lib/cn'

export function formatDate(iso: string): string {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function PostMeta({ date, tags, className }: { date: string; tags: string[]; className?: string }) {
  return (
    <div className={cn('text-content-muted flex flex-wrap items-center gap-x-4 gap-y-2 text-sm', className)}>
      <span className="inline-flex items-center gap-1.5">
        <Calendar className="h-4 w-4" />
        <time dateTime={date}>{formatDate(date)}</time>
      </span>
      <span className="flex flex-wrap gap-1.5">
        {tags.map((t) => (
          <Badge key={t}>#{t}</Badge>
        ))}
      </span>
    </div>
  )
}
