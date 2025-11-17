import { ArrowLeft, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { Project } from '@/types'
import Card from './ui/Card'

interface ProjectCaseStudyProps {
  project: Project
}

export default function ProjectCaseStudy({ project }: ProjectCaseStudyProps) {
  return (
    <section className="py-20 md:py-32">
      <div className="container max-w-5xl">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-12"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Projects
        </Link>

        <div className="mb-16">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 gradient-text">
            {project.title}
          </h1>
          <p className="text-xl md:text-2xl text-white/70 leading-relaxed">{project.description}</p>
        </div>

        {/* Metrics */}
        {project.metrics && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {project.metrics.map((metric, index) => (
              <Card key={metric.label}>
                <div className="text-center">
                  <div className="text-4xl font-bold gradient-text mb-2">{metric.value}</div>
                  <div className="text-sm text-white/60">{metric.label}</div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Technologies */}
        <Card className="mb-8">
          <h2 className="text-2xl font-bold mb-6 gradient-text">Technologies</h2>
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
        </Card>

        {/* Problem */}
        <Card className="mb-8">
          <h2 className="text-3xl font-bold mb-6 gradient-text">Problem</h2>
          <p className="text-white/70 leading-relaxed text-lg">{project.problem}</p>
        </Card>

        {/* Solution */}
        <Card className="mb-8">
          <h2 className="text-3xl font-bold mb-6 gradient-text">Solution</h2>
          <p className="text-white/70 leading-relaxed text-lg">{project.solution}</p>
        </Card>

        {/* Architecture */}
        <Card className="mb-8">
          <h2 className="text-3xl font-bold mb-6 gradient-text">Architecture</h2>
          <div className="space-y-4">
            {project.architecture.map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="p-2 glass-card rounded-lg mt-1 flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-[#007AFF]" />
                </div>
                <p className="text-white/70 leading-relaxed flex-1">{item}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Impact */}
        <Card>
          <h2 className="text-3xl font-bold mb-6 gradient-text">Impact</h2>
          <div className="space-y-4">
            {project.impact.map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="p-2 glass-card rounded-lg mt-1 flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-[#007AFF]" />
                </div>
                <p className="text-white/70 leading-relaxed flex-1 text-lg">{item}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  )
}
