'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { resumeData } from '@/content/resume'
import Card from './ui/Card'
import Button from './ui/Button'

export default function ProjectsPreview() {
  const featured = resumeData.projects.slice(0, 2)

  return (
    <section id="projects" className="py-20 md:py-32">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 gradient-text">
            Projects
          </h2>
          <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto">
            Infrastructure solutions with measurable impact
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {featured.map((project, index) => (
            <Link key={index} href={`/projects/${project.name.toLowerCase().replace(/\s+/g, '-')}`}>
              <Card delay={index * 0.1} hover>
                <div className="h-full flex flex-col">
                  <div className="mb-6 flex-grow">
                    <h3 className="text-2xl font-bold mb-4 gradient-text">{project.name}</h3>
                    <p className="text-white/70 leading-relaxed text-lg mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.slice(0, 3).map((tech, i) => (
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

        <div className="text-center">
          <Button href="/projects" variant="secondary" icon={<ArrowRight size={18} />}>
            View all projects
          </Button>
        </div>
      </div>
    </section>
  )
}
