/**
 * Experience Page - Clean Stack of Role Cards
 * Each role shows: Title, Company, Location, Dates, Tech Chips, Metrics, Highlights
 */
import { MapPin, Calendar } from 'lucide-react'
import { resumeData } from '@/content/resume'

export default function ExperiencePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      {/* Header */}
      <div className="text-center mb-12 md:mb-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-tight">
          Experience
        </h1>
        <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
          Building infrastructure systems at scale with measurable impact
        </p>
      </div>

      {/* Experience Cards */}
      <div className="space-y-8">
        {resumeData.experience.map((exp, index) => {
          // Extract tech stack from highlights
          const techStack = [
            'AWS Glue', 'Lambda', 'S3', 'Athena', 'Macie', 'Terraform', 
            'Datadog', 'OpenTelemetry', 'EKS', 'Python', 'Go', 'GitLab CI/CD'
          ].filter(tech => 
            exp.highlights.some(h => h.toLowerCase().includes(tech.toLowerCase()))
          )

          // Extract metrics from highlights
          const metrics = exp.highlights
            .filter(h => /\d+%/.test(h) || /\d+\+/.test(h) || /\d+K/.test(h))
            .map(h => {
              const match = h.match(/(\d+[%+K]?)\s+([^,]+)/)
              return match ? { value: match[1], label: match[2].trim() } : null
            })
            .filter(Boolean)
            .slice(0, 4)

          return (
            <div key={index} className="glass-card p-8 md:p-10">
              {/* Header */}
              <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-semibold mb-3 gradient-text">
                  {exp.role}
                </h2>
                <div className="flex flex-wrap items-center gap-4 text-white/70 mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#007AFF]" />
                    <span className="text-sm md:text-base">{exp.company}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#007AFF]" />
                    <span className="text-sm md:text-base">{exp.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#007AFF]" />
                    <span className="text-sm md:text-base">{exp.period}</span>
                  </div>
                </div>
              </div>

              {/* Tech Stack */}
              {techStack.length > 0 && (
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 text-xs bg-white/[0.05] border border-white/[0.10] rounded-lg text-white/80"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Metrics */}
              {metrics.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {metrics.map((metric, i) => (
                    <div key={i} className="text-center p-4 bg-white/[0.03] rounded-xl">
                      <div className="text-2xl md:text-3xl font-bold gradient-text mb-1">
                        {metric?.value}
                      </div>
                      <div className="text-xs text-white/60">{metric?.label}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Highlights */}
              <div className="pt-6 border-t border-white/[0.08]">
                <ul className="space-y-3">
                  {exp.highlights.map((highlight, i) => (
                    <li key={i} className="text-white/70 leading-relaxed flex items-start gap-3 text-sm md:text-base">
                      <span className="text-[#007AFF] mt-1.5 flex-shrink-0">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
