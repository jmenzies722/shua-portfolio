/**
 * About Page - Apple-style Profile Section
 * Avatar + Summary + Glass Cards (What I Build, How I Work, Principles, Background)
 */
import Image from 'next/image'
import { Code, Zap, Target, BookOpen } from 'lucide-react'
import { resumeData } from '@/content/resume'

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
      {/* Header */}
      <div className="text-center mb-12 md:mb-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-tight">
          About Josh
        </h1>
        <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
          {resumeData.summary}
        </p>
      </div>

      {/* Avatar */}
      <div className="flex justify-center mb-12 md:mb-16">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/30 via-blue-300/8 to-transparent rounded-full blur-2xl opacity-40" />
          <div className="relative h-32 w-32 md:h-40 md:w-40 rounded-full overflow-hidden border-2 border-white/[0.12] bg-white/[0.04]">
            <Image
              src="/IMG_2897.jpg"
              alt="Josh Menzies"
              width={160}
              height={160}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* What I Build */}
        <div className="glass-card p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-white/[0.05] rounded-xl">
              <Code className="w-6 h-6 text-[#007AFF]" />
            </div>
            <h2 className="text-2xl font-semibold">What I Build</h2>
          </div>
          <ul className="space-y-3 text-white/70">
            <li className="flex items-start gap-3">
              <span className="text-[#007AFF] mt-1">•</span>
              <span>Secure, automated infrastructure on AWS and Kubernetes</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#007AFF] mt-1">•</span>
              <span>Serverless platforms for AI and data workloads</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#007AFF] mt-1">•</span>
              <span>Observability systems with Datadog and OpenTelemetry</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#007AFF] mt-1">•</span>
              <span>CI/CD pipelines with Terraform and GitLab</span>
            </li>
          </ul>
        </div>

        {/* How I Work */}
        <div className="glass-card p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-white/[0.05] rounded-xl">
              <Zap className="w-6 h-6 text-[#007AFF]" />
            </div>
            <h2 className="text-2xl font-semibold">How I Work</h2>
          </div>
          <ul className="space-y-3 text-white/70">
            <li className="flex items-start gap-3">
              <span className="text-[#007AFF] mt-1">•</span>
              <span>Infrastructure as Code with Terraform</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#007AFF] mt-1">•</span>
              <span>Automation-first approach to reduce manual tasks</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#007AFF] mt-1">•</span>
              <span>Data-driven optimization and cost management</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#007AFF] mt-1">•</span>
              <span>Focus on reliability, security, and developer experience</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Principles */}
        <div className="glass-card p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-white/[0.05] rounded-xl">
              <Target className="w-6 h-6 text-[#007AFF]" />
            </div>
            <h2 className="text-2xl font-semibold">Principles</h2>
          </div>
          <ul className="space-y-3 text-white/70">
            <li className="flex items-start gap-3">
              <span className="text-[#007AFF] mt-1">•</span>
              <span>Empower teams to ship faster with confidence</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#007AFF] mt-1">•</span>
              <span>Build platforms that scale reliably</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#007AFF] mt-1">•</span>
              <span>Reduce operational burden through automation</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#007AFF] mt-1">•</span>
              <span>Security and compliance by design</span>
            </li>
          </ul>
        </div>

        {/* Background */}
        <div className="glass-card p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-white/[0.05] rounded-xl">
              <BookOpen className="w-6 h-6 text-[#007AFF]" />
            </div>
            <h2 className="text-2xl font-semibold">Background</h2>
          </div>
          <ul className="space-y-3 text-white/70">
            <li className="flex items-start gap-3">
              <span className="text-[#007AFF] mt-1">•</span>
              <span>B.S. Computer Engineering, University of Hartford (2023)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#007AFF] mt-1">•</span>
              <span>Minor in Computer Science</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#007AFF] mt-1">•</span>
              <span>Platform Engineer at Nectar Services Corp</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#007AFF] mt-1">•</span>
              <span>Specialized in AWS, Kubernetes, and observability</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
