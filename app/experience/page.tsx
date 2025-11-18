/**
 * Experience Page - Clean Stack of Role Cards
 * Each role shows: Title, Company, Location, Dates, Tech Chips, Metrics, Highlights
 */
import { resumeData } from '@/content/resume'
import SectionShell from '@/components/SectionShell'
import Card from '@/components/ui/Card'

export default function Page() {
  return (
    <SectionShell className="section-wrapper space-y-10">
      <div className="text-center space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-white/60">Experience</p>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
          Infrastructure and platform work with measurable outcomes.
        </h1>
        <p className="text-white/70 max-w-3xl mx-auto">
          Every engagement aligns reliability, automation, and developer experience to reduce operational drag for
          engineering teams.
        </p>
      </div>

      <div className="space-y-8">
        {resumeData.experience.map((experience) => (
          <Card key={experience.role} className="space-y-6">
            <header className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-sm text-white/60 uppercase tracking-[0.2em]">{experience.company}</p>
                <h2 className="text-2xl sm:text-3xl font-semibold">{experience.role}</h2>
              </div>
              <div className="text-right text-sm text-white/60">
                <p>{experience.location}</p>
                <p>{experience.period}</p>
              </div>
            </header>

            <div className="flex flex-wrap gap-2">
              {['AWS', 'Terraform', 'Datadog', 'GitLab CI/CD', 'OpenTelemetry'].map((tech) => (
                <span key={tech} className="pill">
                  {tech}
                </span>
              ))}
            </div>

            <ul className="space-y-3 text-white/75">
              {experience.highlights.map((line) => (
                <li key={line} className="flex items-start gap-3">
                  <span className="text-[#5ac8fa] mt-[0.35rem]">•</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </SectionShell>
  )
}
