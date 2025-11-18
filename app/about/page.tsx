/**
 * About Page - Apple-style Profile Section
 * Avatar + Summary + Glass Cards (What I Build, How I Work, Principles, Background)
 */
import Image from 'next/image'
import { resumeData } from '@/content/resume'
import SectionShell from '@/components/SectionShell'
import Card from '@/components/ui/Card'

const aboutSections = [
  {
    title: 'What I build',
    bullets: [
      'AWS-native platforms for data, AI, and internal tooling',
      'Serverless workflows with Glue, Lambda, and event-driven orchestration',
      'Observability foundations with Datadog + OpenTelemetry',
      'Resilient CI/CD pipelines using Terraform + GitLab',
    ],
  },
  {
    title: 'How I work',
    bullets: [
      'Automation-first mindset to remove repetitive toil',
      'Security and compliance built into every environment',
      'Opinionated IaC modules for consistency and velocity',
      'Tight feedback loops with engineers and leadership',
    ],
  },
  {
    title: 'Principles',
    bullets: [
      'Ship measurable value every sprint',
      'Design for clarity, not heroics',
      'Invest in observability before scaling',
      'Create platforms teams love to use',
    ],
  },
  {
    title: 'Background',
    bullets: [
      'B.S. Computer Engineering, University of Hartford',
      'Experience across DevOps, platform, and support roles',
      'Focused on AWS, Kubernetes, and serverless ecosystems',
      'Based in New York, partnering with globally distributed teams',
    ],
  },
]

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
      <div className="max-w-5xl mx-auto px-4 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 sm:space-y-6">
          <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-white/60">About</p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
            Shaping resilient cloud platforms.
          </h1>
          <p className="text-base sm:text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
            {resumeData.summary}
          </p>
        </div>

        {/* Avatar - Centered */}
        <div className="flex justify-center">
          <div className="relative h-28 w-28 sm:h-36 sm:w-36 md:h-44 md:w-44">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#5ac8fa]/30 to-[#7f7bff]/30 blur-2xl opacity-60" />
            <div className="relative h-full w-full rounded-full overflow-hidden border-2 border-white/[0.12] bg-white/[0.04]">
              <Image
                src="/IMG_2897.jpg"
                alt="Josh Menzies"
                fill
                sizes="(max-width: 640px) 112px, (max-width: 768px) 144px, 176px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Cards - Mobile: 1 column, Desktop: 2 columns */}
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          {aboutSections.map((section) => (
            <Card key={section.title} className="flex flex-col space-y-3 sm:space-y-4">
              <h2 className="text-xl sm:text-2xl font-semibold">{section.title}</h2>
              <ul className="space-y-2.5 sm:space-y-3 text-white/70 text-sm sm:text-base leading-relaxed">
                {section.bullets.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-[#5ac8fa] mt-[0.4rem] flex-shrink-0">•</span>
                    <span>{item}</span>
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
