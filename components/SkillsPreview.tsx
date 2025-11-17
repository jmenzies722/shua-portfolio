import Link from 'next/link'
import { ArrowRight, Code, Cloud, Shield, Users } from 'lucide-react'
import { resumeData } from '@/content/resume'
import Card from './ui/Card'
import Button from './ui/Button'

const skillCategories = [
  { name: 'Languages', icon: Code, skills: resumeData.skills.languages },
  { name: 'Cloud & DevOps', icon: Cloud, skills: resumeData.skills.cloud_devops },
  { name: 'Monitoring & Security', icon: Shield, skills: resumeData.skills.monitoring_security },
  { name: 'Collaboration', icon: Users, skills: resumeData.skills.collaboration },
]

export default function SkillsPreview() {
  const featured = skillCategories.slice(0, 4)

  return (
    <section id="skills" className="py-20 md:py-32">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 gradient-text">
            Skills
          </h2>
          <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto">
            Cloud infrastructure, automation, and DevOps
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featured.map((category, index) => {
            const Icon = category.icon
            return (
              <Card key={category.name}>
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 glass-card rounded-2xl">
                      <Icon className="w-8 h-8 text-[#007AFF]" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                  <p className="text-white/60 text-sm">
                    {category.skills.length} skills
                  </p>
                </div>
              </Card>
            )
          })}
        </div>

        <div className="text-center">
          <Button href="/skills" variant="secondary" icon={<ArrowRight size={18} />}>
            View all skills
          </Button>
        </div>
      </div>
    </section>
  )
}
