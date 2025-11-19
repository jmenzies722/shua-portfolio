import { ArrowLeft, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { Project } from '@/types'
import { withTrailingSlash } from '@/lib/utils'
import ArchitectureDiagram from './ArchitectureDiagram'

interface ProjectCaseStudyProps {
  project: Project
}

export default function ProjectCaseStudy({ project }: ProjectCaseStudyProps) {
  return (
    <section className="py-20 md:py-28 lg:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href={withTrailingSlash('/projects')}
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-12"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Projects
        </Link>

        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 gradient-text">
            {project.title}
          </h1>
          <p className="text-lg md:text-xl text-white/70 leading-relaxed">{project.description}</p>
        </div>

        {/* Metrics */}
        {project.metrics && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {project.metrics.map((metric, index) => (
              <div key={metric.label} className="glass-card p-6 text-center">
                <div className="text-3xl md:text-4xl font-semibold gradient-text mb-2">{metric.value}</div>
                <div className="text-sm text-white/60">{metric.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Technologies */}
        <div className="glass-card p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6 gradient-text">Technologies</h2>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 glass-card rounded-lg text-white/70 text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Problem */}
        <div className="glass-card p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6 gradient-text">Problem</h2>
          <p className="text-white/70 leading-relaxed text-base md:text-lg">{project.problem}</p>
        </div>

        {/* Solution */}
        <div className="glass-card p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6 gradient-text">Solution</h2>
          <p className="text-white/70 leading-relaxed text-base md:text-lg">{project.solution}</p>
        </div>

        {/* Architecture */}
        <div className="mb-8 space-y-6">
          <div className="glass-card p-8">
            <h2 className="text-2xl font-semibold mb-6 gradient-text">Architecture</h2>
            <div className="space-y-4 mb-6">
              {project.architecture.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="p-2 glass-card rounded-lg mt-1 flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-[#5ac8fa]" />
                  </div>
                  <p className="text-white/70 leading-relaxed flex-1 text-sm md:text-base">{item}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Architecture Diagram */}
          {project.slug === 'ai-data-pipeline-automation' && (
            <ArchitectureDiagram type="data-pipeline" />
          )}
          {project.slug === 'serverless-distribution-platform' && (
            <ArchitectureDiagram type="distribution-platform" />
          )}
        </div>

        {/* Impact */}
        <div className="glass-card p-8">
          <h2 className="text-2xl font-semibold mb-6 gradient-text">Impact</h2>
          <div className="space-y-4">
            {project.impact.map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="p-2 glass-card rounded-lg mt-1 flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-[#007AFF]" />
                </div>
                <p className="text-white/70 leading-relaxed flex-1 text-base md:text-lg">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
