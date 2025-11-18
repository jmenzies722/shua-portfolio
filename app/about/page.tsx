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
    <SectionShell className="section-wrapper space-y-10">
      <div className="text-center space-y-6">
        <p className="text-sm uppercase tracking-[0.3em] text-white/60">About</p>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">Shaping resilient cloud platforms.</h1>
        <p className="text-white/70 text-lg max-w-3xl mx-auto">{resumeData.summary}</p>
      </div>

      <div className="flex justify-center">
        <div className="relative h-36 w-36 sm:h-44 sm:w-44">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#5ac8fa]/30 to-[#7f7bff]/30 blur-2xl" />
          <div className="relative h-full w-full rounded-full overflow-hidden border border-white/15">
            <Image
              src="/IMG_2897.jpg"
              alt="Josh Menzies"
              fill
              sizes="180px"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {aboutSections.map((section) => (
          <Card key={section.title} className="flex flex-col space-y-3">
            <h2 className="text-2xl font-semibold">{section.title}</h2>
            <ul className="space-y-3 text-white/70 text-base">
              {section.bullets.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-[#5ac8fa] mt-[0.4rem]">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </SectionShell>
  )
}
