import { ProjectCard } from '~/components/project-card'
import { Seo } from '~/components/seo'
import { projects } from '~/lib/projects'

export default function Projects() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <Seo
        title="Projects"
        path="/projects"
        description="Open-source libraries and a YouTube channel made by John Dengis."
      />
      <h1 className="text-5xl sm:text-6xl">Projects</h1>
      <p className="text-content-muted mt-4 max-w-2xl text-lg">
        A selection of open-source libraries I&apos;ve built and maintained, mostly for the Angular and Elixir
        ecosystems, plus the channel where I publish videos.
      </p>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard key={p.name} project={p} />
        ))}
      </div>
    </div>
  )
}
