/**
 * Skills Page - Apple Settings-style Grid
 * Categories: Languages, Cloud & DevOps, Monitoring & Security, Collaboration
 */
import { resumeData } from '@/content/resume'
import SectionShell from '@/components/SectionShell'
import Card from '@/components/ui/Card'

const categories = [
  {
    title: 'Languages & scripting',
    skills: resumeData.skills.languages,
  },
  {
    title: 'Cloud & platforms',
    skills: resumeData.skills.cloud_devops,
  },
  {
    title: 'Observability & security',
    skills: resumeData.skills.monitoring_security,
  },
  {
    title: 'Collaboration & delivery',
    skills: resumeData.skills.collaboration,
  },
]

export default function Page() {
  return (
    <SectionShell className="section-wrapper space-y-10">
      <div className="text-center space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-white/60">Skills</p>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">Systems thinking. Hands-on skills.</h1>
        <p className="text-white/70 max-w-3xl mx-auto">
          I operate across AWS infrastructure, automation, observability, and collaboration—bridging platform strategy
          with day-to-day delivery.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {categories.map((category) => (
          <Card key={category.title} className="space-y-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-white/60">{category.title}</p>
              <h2 className="text-2xl font-semibold mt-1">Core tools</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span key={skill} className="pill">
                  {skill}
                </span>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </SectionShell>
  )
}
