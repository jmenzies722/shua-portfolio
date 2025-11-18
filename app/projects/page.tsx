/**
 * Projects Page - Case Study Cards
 * Each project: Title, Description, Stack, Metrics, Link to case study
 */
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { resumeData } from '@/content/resume'

export default function Page() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      {/* Header */}
      <div className="text-center mb-12 md:mb-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-tight">
          Projects
        </h1>
        <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
          Infrastructure solutions with measurable impact
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {resumeData.projects.map((project, index) => {
          // Extract metrics
          const metrics = project.highlights
            .filter(h => /\d+%/.test(h) || /\d+\+/.test(h) || /\d+K/.test(h) || /\d+TB/.test(h))
            .map(h => {
              const match = h.match(/(\d+[%+KTB]?)\s+([^,]+)/)
              return match ? { value: match[1], label: match[2].trim() } : null
            })
            .filter(Boolean)
            .slice(0, 3)

          return (
            <Link
              key={index}
              href={`/projects/${project.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="glass-card p-8 block hover:bg-white/[0.08] transition-all duration-200"
            >
              <div className="h-full flex flex-col">
                <div className="mb-6 flex-grow">
                  <h2 className="text-2xl md:text-3xl font-semibold mb-4 gradient-text">
                    {project.name}
                  </h2>
                  <p className="text-white/70 leading-relaxed text-base md:text-lg mb-6">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.slice(0, 6).map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 text-xs bg-white/[0.05] border border-white/[0.10] rounded-lg text-white/80"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Metrics */}
                  {metrics.length > 0 && (
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      {metrics.map((metric, i) => (
                        <div key={i} className="text-center p-3 bg-white/[0.03] rounded-lg">
                          <div className="text-lg font-bold gradient-text mb-1">
                            {metric?.value}
                          </div>
                          <div className="text-xs text-white/60 leading-tight">
                            {metric?.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-6 border-t border-white/[0.08] flex items-center gap-2 text-white/60 text-sm group-hover:text-white transition-colors">
                  View case study
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
