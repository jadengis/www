import { ArrowUpRight } from 'lucide-react'
import { SocialIcon } from '~/components/ui/social-icon'
import { LANGUAGE_COLORS, type Project } from '~/lib/projects'

function Avatar({ project }: { project: Project }) {
  if (project.kind === 'channel') {
    return (
      <span
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-white"
        style={{ backgroundColor: project.color }}
      >
        <SocialIcon name="youtube" className="h-6 w-6" />
      </span>
    )
  }
  return (
    <span
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-white"
      style={{ backgroundColor: project.color }}
    >
      <SocialIcon name="github" className="h-6 w-6" />
    </span>
  )
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noreferrer"
      className="group border-edge bg-surface-2 hover:border-accent relative flex flex-col gap-4 rounded-lg border p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex items-start justify-between gap-3">
        <Avatar project={project} />
        <ArrowUpRight className="text-content-muted group-hover:text-accent h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>

      <div className="space-y-1.5">
        <h3 className="text-content font-semibold">{project.name}</h3>
        <p className="text-content-muted text-sm leading-relaxed">{project.description}</p>
      </div>

      <div className="text-content-muted mt-auto flex items-center gap-4 text-xs">
        {project.language && (
          <span className="inline-flex items-center gap-1.5">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: LANGUAGE_COLORS[project.language] ?? project.color }}
            />
            {project.language}
          </span>
        )}
        {project.kind === 'channel' && <span>YouTube channel</span>}
      </div>
    </a>
  )
}
