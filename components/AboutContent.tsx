'use client'

import { resumeData } from '@/content/resume'
import Card from './ui/Card'
import { Code, Zap, Target } from 'lucide-react'

export default function AboutContent() {
  return (
    <section className="py-20 md:py-32">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-8 gradient-text">
            About Josh
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            {resumeData.summary}
          </p>
        </div>

        {/* Avatar */}
        <div className="flex justify-center mb-16">
          <div className="relative">
            <div className="absolute inset-0 bg-[#007AFF]/20 blur-2xl rounded-full" />
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden glass-profile p-1">
              <img
                src="/IMG_2897.jpg"
                alt="Josh Menzies"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Three Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card delay={0.1}>
            <div className="flex flex-col items-center text-center">
              <Code className="w-12 h-12 text-[#007AFF] mb-4" />
              <h3 className="text-xl font-semibold mb-3">What I Build</h3>
              <p className="text-white/70">
                Secure, automated infrastructure on AWS and Kubernetes. Serverless platforms, observability systems, and AI-ready data pipelines.
              </p>
            </div>
          </Card>

          <Card delay={0.2}>
            <div className="flex flex-col items-center text-center">
              <Zap className="w-12 h-12 text-[#007AFF] mb-4" />
              <h3 className="text-xl font-semibold mb-3">How I Work</h3>
              <p className="text-white/70">
                Infrastructure as Code, CI/CD automation, and data-driven optimization. Focus on reliability, security, and developer experience.
              </p>
            </div>
          </Card>

          <Card delay={0.3}>
            <div className="flex flex-col items-center text-center">
              <Target className="w-12 h-12 text-[#007AFF] mb-4" />
              <h3 className="text-xl font-semibold mb-3">Why I Work</h3>
              <p className="text-white/70">
                Empowering teams to ship faster with confidence. Building platforms that scale reliably and reduce operational burden.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
