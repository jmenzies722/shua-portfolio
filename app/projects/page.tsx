/**
 * Projects Page - Case Study Cards
 * Each project: Title, Description, Stack, Metrics, Link to case study
 */
import { resumeData } from '@/content/resume'

export default function Page() {
  return (
    <div className="section-wrapper space-y-10">
      <div className="text-center space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-white/60">Projects</p>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
          Case studies in automation, data, and distribution.
        </h1>
        <p className="text-white/70 max-w-3xl mx-auto">
          Detailed looks at how I scale infrastructure for data-heavy, security-conscious organizations.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {resumeData.projects.map((project) => (
          <article key={project.name} className="glass-card p-8 space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-white/60">{project.company}</p>
              <h2 className="text-2xl font-semibold mt-2">{project.name}</h2>
            </div>
            <p className="text-white/70">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.slice(0, 6).map((tech) => (
                <span key={tech} className="pill">
                  {tech}
                </span>
              ))}
            </div>
            <ul className="space-y-2 text-white/75 text-sm">
              {project.highlights.slice(0, 4).map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-[#5ac8fa] mt-[0.3rem]">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a
              href={`/projects/${project.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white"
            >
              View details →
            </a>
          </article>
        ))}
      </div>
    </div>
  )
}
