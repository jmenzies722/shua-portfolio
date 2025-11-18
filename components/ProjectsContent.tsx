import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { resumeData } from '@/content/resume'
import { withTrailingSlash } from '@/lib/utils'

export default function ProjectsContent() {
  return (
    <section className="py-20 md:py-28 lg:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 gradient-text">
            Projects
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            Infrastructure solutions with measurable impact
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {resumeData.projects.map((project, index) => (
            <Link
              key={index}
              href={withTrailingSlash(`/projects/${project.name.toLowerCase().replace(/\s+/g, '-')}`)}
              className="glass-card p-8 block hover:bg-white/[0.06] transition-all duration-200"
            >
              <div className="h-full flex flex-col">
                <div className="mb-6 flex-grow">
                  <h2 className="text-2xl md:text-3xl font-semibold mb-4 gradient-text">{project.name}</h2>
                  <p className="text-white/70 leading-relaxed mb-4 text-sm md:text-base">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.slice(0, 4).map((tech, i) => (
                      <span key={i} className="px-3 py-1 text-xs glass-card rounded-full text-white/70">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="pt-6 border-t border-white/[0.08] flex items-center gap-2 text-white/60 text-sm group-hover:text-white transition-colors">
                  View case study
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
