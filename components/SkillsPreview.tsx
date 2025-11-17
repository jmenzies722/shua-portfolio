import Link from 'next/link'
import { ArrowRight, Code, Cloud, Shield, Users } from 'lucide-react'
import { resumeData } from '@/content/resume'

const skillCategories = [
  { name: 'Languages', icon: Code, skills: resumeData.skills.languages },
  { name: 'Cloud & DevOps', icon: Cloud, skills: resumeData.skills.cloud_devops },
  { name: 'Monitoring & Security', icon: Shield, skills: resumeData.skills.monitoring_security },
  { name: 'Collaboration', icon: Users, skills: resumeData.skills.collaboration },
]

export default function SkillsPreview() {
  const featured = skillCategories.slice(0, 4)

  return (
    <section id="skills" className="py-20 md:py-28 lg:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 gradient-text">
            Skills
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            Cloud infrastructure, automation, and DevOps
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featured.map((category, index) => {
            const Icon = category.icon
            return (
              <div key={category.name} className="glass-card p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 glass-card rounded-2xl">
                    <Icon className="w-8 h-8 text-[#007AFF]" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white/90">{category.name}</h3>
                <p className="text-white/60 text-sm">
                  {category.skills.length} skills
                </p>
              </div>
            )
          })}
        </div>

        <div className="text-center">
          <Link
            href="/skills"
            className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 bg-white/[0.05] text-white rounded-xl font-medium transition-all duration-200 hover:bg-white/[0.1] hover:border-white/30 hover:scale-[1.02]"
          >
            View all skills
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
