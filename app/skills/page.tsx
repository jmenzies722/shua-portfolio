/**
 * Skills Page - Enhanced with Premium Visual UX
 * Categories: Languages, Cloud & DevOps, Monitoring & Security, Collaboration
 */
'use client'

import { resumeData } from '@/content/resume'
import SectionShell from '@/components/SectionShell'
import ParallaxCard from '@/components/ui/ParallaxCard'
import SkillTag from '@/components/ui/SkillTag'
import AmbientBackground from '@/components/ui/AmbientBackground'
import NetworkVisualization from '@/components/ui/NetworkVisualization'

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
    <>
      <AmbientBackground />
      <SectionShell 
        className="space-y-8 sm:space-y-10 relative z-10"
        style={{
          paddingTop: '1rem',
          paddingBottom: 'calc(3rem + env(safe-area-inset-bottom))',
          paddingLeft: 'max(1rem, calc(1rem + env(safe-area-inset-left)))',
          paddingRight: 'max(1rem, calc(1rem + env(safe-area-inset-right)))',
        }}
      >
        <div className="max-w-5xl mx-auto px-4 space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-white/60">Skills</p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
              Systems thinking. Hands-on skills.
            </h1>
            <NetworkVisualization />
            <p className="text-base sm:text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
              I operate across AWS infrastructure, automation, observability, and collaboration—bridging platform strategy
              with day-to-day delivery.
            </p>
          </div>

          {/* Skills Grid - Mobile: 1 column, Desktop: 2 columns */}
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
            {categories.map((category, index) => (
              <ParallaxCard key={category.title} className="space-y-4 sm:space-y-5" index={index}>
                <div>
                  <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-white/60 mb-1">
                    {category.title}
                  </p>
                  <h2 className="text-xl sm:text-2xl font-semibold">Core tools</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <SkillTag key={skill} skill={skill} />
                  ))}
                </div>
              </ParallaxCard>
            ))}
          </div>
        </div>
      </SectionShell>
    </>
  )
}
