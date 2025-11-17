import Hero from '@/components/Hero'
import ExperiencePreview from '@/components/ExperiencePreview'
import SkillsPreview from '@/components/SkillsPreview'
import ProjectsPreview from '@/components/ProjectsPreview'

export default function Home() {
  return (
    <div className="relative overflow-x-hidden">
      <Hero />
      <ExperiencePreview />
      <SkillsPreview />
      <ProjectsPreview />
    </div>
  )
}
