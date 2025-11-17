import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { resumeData } from '@/content/resume'
import Card from './ui/Card'

export default function ProjectsContent() {
  return (
    <section className="py-20 md:py-32">
      <div className="container">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 gradient-text">
            Projects
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            Infrastructure solutions with measurable impact
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {resumeData.projects.map((project, index) => (
            <Link
              key={index}
              href={`/projects/${project.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <Card hover>
                <div className="h-full flex flex-col">
                  <div className="mb-6 flex-grow">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 gradient-text">{project.name}</h2>
                    <p className="text-white/70 leading-relaxed mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, i) => (
                        <span key={i} className="px-3 py-1 text-xs glass-card rounded-full text-white/70">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="pt-6 border-t border-white/10 flex items-center gap-2 text-white/60 text-sm group-hover:text-white transition-colors">
                    View case study
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
