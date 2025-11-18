/**
 * Projects Page - Case Study Cards
 * Each project: Title, Description, Stack, Metrics, Link to case study
 */
import Link from 'next/link'
import { resumeData } from '@/content/resume'
import SectionShell from '@/components/SectionShell'
import Card from '@/components/ui/Card'
import { withTrailingSlash } from '@/lib/utils'

export default function Page() {
  return (
    <SectionShell 
      className="space-y-8 sm:space-y-10"
      style={{
        paddingTop: '1rem',
        paddingBottom: 'calc(3rem + env(safe-area-inset-bottom))',
        paddingLeft: 'max(1rem, calc(1rem + env(safe-area-inset-left)))',
        paddingRight: 'max(1rem, calc(1rem + env(safe-area-inset-right)))',
      }}
    >
      <div className="max-w-5xl mx-auto px-4 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-white/60">Projects</p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
            Case studies in automation, data, and distribution.
          </h1>
          <p className="text-base sm:text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
            Detailed looks at how I scale infrastructure for data-heavy, security-conscious organizations.
          </p>
        </div>

        {/* Projects Grid - Mobile: 1 column, Desktop: 2 columns */}
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          {resumeData.projects.map((project) => (
            <Card key={project.name} className="space-y-5 sm:space-y-6">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-white/60 mb-1">
                  {project.company}
                </p>
                <h2 className="text-xl sm:text-2xl font-semibold">{project.name}</h2>
              </div>
              <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tech.slice(0, 6).map((tech) => (
                  <span key={tech} className="pill text-xs sm:text-sm">
                    {tech}
                  </span>
                ))}
              </div>
              <ul className="space-y-2 text-white/75 text-sm leading-relaxed">
                {project.highlights.slice(0, 4).map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-[#5ac8fa] mt-[0.3rem] flex-shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={withTrailingSlash(`/projects/${project.name.toLowerCase().replace(/\s+/g, '-')}`)}
                className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors min-h-[44px]"
              >
                View details →
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </SectionShell>
  )
}
