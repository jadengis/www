import { ArrowUpRight } from 'lucide-react'
import { SocialIcon } from '~/components/ui/social-icon'
import { languageColors, type Project } from '~/lib/projects'

function Avatar({ project }: { project: Project }) {
  if (project.logo) {
    // App icons carry their own padding and shadow, so draw them a little
    // larger than the 48px tile and let the margin absorb it.
    return <img src={project.logo} alt="" width={60} height={60} className="-m-1.5 h-15 w-15 shrink-0" />
  }
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
      className="group border-edge bg-surface-2 hover:border-content relative flex flex-col gap-4 rounded-lg border p-5 transition-colors duration-150"
    >
      <div className="flex items-start justify-between gap-3">
        <Avatar project={project} />
        <ArrowUpRight className="text-content-muted group-hover:text-content h-5 w-5 transition-colors" />
      </div>

      <div className="space-y-1.5">
        <h3 className="text-content font-semibold">{project.name}</h3>
        <p className="text-content-muted text-sm leading-relaxed">{project.description}</p>
      </div>

      <div className="text-content-muted mt-auto flex items-center gap-4 font-mono text-xs">
        {project.language && (
          <span className="inline-flex items-center gap-1.5">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: languageColors[project.language] ?? project.color }}
            />
            {project.language}
          </span>
        )}
        {project.kind === 'channel' && <span>YouTube channel</span>}
      </div>
    </a>
  )
}
