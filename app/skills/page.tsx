/**
 * Skills Page - Apple Settings-style Grid
 * Categories: Languages, Cloud & DevOps, Monitoring & Security, Collaboration
 */
import { Code, Cloud, Shield, Users } from 'lucide-react'
import { resumeData } from '@/content/resume'

const skillCategories = [
  {
    name: 'Languages',
    icon: Code,
    skills: resumeData.skills.languages,
  },
  {
    name: 'Cloud & DevOps',
    icon: Cloud,
    skills: resumeData.skills.cloud_devops,
  },
  {
    name: 'Monitoring & Security',
    icon: Shield,
    skills: resumeData.skills.monitoring_security,
  },
  {
    name: 'Collaboration',
    icon: Users,
    skills: resumeData.skills.collaboration,
  },
]

export default function Page() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      {/* Header */}
      <div className="text-center mb-12 md:mb-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-tight">
          Skills
        </h1>
        <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
          Cloud infrastructure, automation, and DevOps expertise
        </p>
      </div>

      {/* Skills Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {skillCategories.map((category) => {
          const Icon = category.icon
          return (
            <div key={category.name} className="glass-card p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-white/[0.05] rounded-xl">
                  <Icon className="w-6 h-6 text-[#007AFF]" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-semibold">{category.name}</h2>
                  <p className="text-sm text-white/60">{category.skills.length} skills</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 text-sm bg-white/[0.05] border border-white/[0.10] rounded-lg text-white/80"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
