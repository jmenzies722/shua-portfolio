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
    title: 'Infrastructure',
    description: 'AWS-native platforms, containers, and orchestration',
    skills: [
      { name: 'AWS (EKS, Lambda, S3, RDS, Glue, Athena, Macie, IAM, KMS)', experience: '3+ years' },
      { name: 'Terraform', experience: '3+ years' },
      { name: 'Kubernetes / EKS', experience: '2+ years' },
      { name: 'Docker', experience: '3+ years' },
      { name: 'Helm', experience: '2+ years' },
    ],
  },
  {
    title: 'Automation',
    description: 'CI/CD, IaC, and workflow orchestration',
    skills: [
      { name: 'GitLab CI/CD', experience: '3+ years' },
      { name: 'Python', experience: '3+ years' },
      { name: 'Go', experience: '1+ year' },
      { name: 'Bash', experience: '3+ years' },
      { name: 'CloudFormation', experience: '2+ years' },
    ],
  },
  {
    title: 'Observability',
    description: 'Monitoring, tracing, and alerting at scale',
    skills: [
      { name: 'Datadog', experience: '2+ years' },
      { name: 'OpenTelemetry', experience: '2+ years' },
      { name: 'Prometheus', experience: '1+ year' },
      { name: 'CloudWatch', experience: '3+ years' },
    ],
  },
  {
    title: 'Data & AI',
    description: 'Data pipelines, analytics, and ML infrastructure',
    skills: [
      { name: 'AWS Glue', experience: '1+ year' },
      { name: 'Amazon Athena', experience: '1+ year' },
      { name: 'Amazon Macie', experience: '1+ year' },
      { name: 'SageMaker', experience: '1+ year' },
      { name: 'S3 Data Lakes', experience: '2+ years' },
    ],
  },
]

export default function Page() {
  return (
    <>
      <AmbientBackground />
      <SectionShell 
        className="space-y-8 sm:space-y-10 relative z-10 bg-transparent"
        style={{
          paddingTop: '1rem',
          paddingBottom: 'calc(3rem + env(safe-area-inset-bottom))',
          paddingLeft: 'max(1rem, calc(1rem + env(safe-area-inset-left)))',
          paddingRight: 'max(1rem, calc(1rem + env(safe-area-inset-right)))',
          background: 'transparent',
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
                  <h2 className="text-xl sm:text-2xl font-semibold mb-2">{category.title}</h2>
                  <p className="text-sm text-white/60">{category.description}</p>
                </div>
                <div className="space-y-2">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-sm text-white/90 font-medium">{skill.name}</span>
                      <span className="text-xs text-white/60 px-2 py-1 rounded-md bg-white/5">
                        {skill.experience}
                      </span>
                    </div>
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
