/**
 * Experience Page - Clean Stack of Role Cards
 * Each role shows: Title, Company, Location, Dates, Tech Chips, Metrics, Highlights
 */
import { resumeData } from '@/content/resume'
import SectionShell from '@/components/SectionShell'
import Card from '@/components/ui/Card'

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
      <div className="max-w-4xl mx-auto px-4 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-white/60">Experience</p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
            Infrastructure and platform work with measurable outcomes.
          </h1>
          <p className="text-base sm:text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
            Every engagement aligns reliability, automation, and developer experience to reduce operational drag for
            engineering teams.
          </p>
        </div>

        {/* Experience Cards - Vertical Stack */}
        <div className="space-y-6 sm:space-y-8">
          {resumeData.experience.map((experience) => (
            <Card key={experience.role} className="space-y-5 sm:space-y-6">
              <header className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                <div className="flex-1">
                  <p className="text-xs sm:text-sm text-white/60 uppercase tracking-[0.2em] mb-1">
                    {experience.company}
                  </p>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold">{experience.role}</h2>
                </div>
                <div className="text-left sm:text-right text-xs sm:text-sm text-white/60 space-y-0.5">
                  <p>{experience.location}</p>
                  <p>{experience.period}</p>
                </div>
              </header>

              {/* Tech Pills */}
              <div className="flex flex-wrap gap-2">
                {['AWS', 'Terraform', 'Datadog', 'GitLab CI/CD', 'OpenTelemetry'].map((tech) => (
                  <span key={tech} className="pill text-xs sm:text-sm">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Highlights */}
              <ul className="space-y-2.5 sm:space-y-3 text-white/75 text-sm sm:text-base leading-relaxed">
                {experience.highlights.map((line) => (
                  <li key={line} className="flex items-start gap-3">
                    <span className="text-[#5ac8fa] mt-[0.35rem] flex-shrink-0">•</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </SectionShell>
  )
}
