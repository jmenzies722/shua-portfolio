import { Code, Cloud, Shield, Users } from 'lucide-react'
import { resumeData } from '@/content/resume'
import Card from './ui/Card'

const skillCategories = [
  { name: 'Languages', icon: Code, skills: resumeData.skills.languages },
  { name: 'Cloud & DevOps', icon: Cloud, skills: resumeData.skills.cloud_devops },
  { name: 'Monitoring & Security', icon: Shield, skills: resumeData.skills.monitoring_security },
  { name: 'Collaboration', icon: Users, skills: resumeData.skills.collaboration },
]

export default function SkillsContent() {
  return (
    <section className="py-20 md:py-32">
      <div className="container">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 gradient-text">
            Skills
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            Cloud infrastructure, automation, and DevOps expertise
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {skillCategories.map((category, index) => {
            const Icon = category.icon
            return (
              <Card key={category.name}>
                <div className="flex items-start gap-4">
                  <div className="p-4 glass-card rounded-xl flex-shrink-0">
                    <Icon className="w-8 h-8 text-[#007AFF]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-4">{category.name}</h3>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 text-sm glass-card rounded-lg text-white/80"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
