import { resumeData } from '@/content/resume'
import Image from 'next/image'
import { Code, Zap, Target } from 'lucide-react'

export default function AboutContent() {
  return (
    <section className="py-20 md:py-28 lg:py-32 bg-transparent">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Profile Block */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <div className="relative">
              {/* Removed gradient background - using global background only */}
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-white/[0.12] bg-white/[0.04] glass-profile">
                <Image
                  src="/IMG_2897.jpg"
                  alt="Josh Menzies"
                  width={160}
                  height={160}
                  className="w-full h-full object-cover rounded-full"
                  priority
                />
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-4 gradient-text">
            Josh Menzies
          </h1>
          <p className="text-lg md:text-xl text-white/60 mb-6">
            Platform Engineer
          </p>
          <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            {resumeData.summary}
          </p>
        </div>

        {/* Two Rows of Glass Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="glass-card p-8 text-center">
            <Code className="w-10 h-10 text-[#007AFF] mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-3 text-white/90">What I Build</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Secure, automated infrastructure on AWS and Kubernetes. Serverless platforms, observability systems, and AI-ready data pipelines.
            </p>
          </div>

          <div className="glass-card p-8 text-center">
            <Zap className="w-10 h-10 text-[#007AFF] mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-3 text-white/90">How I Work</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Infrastructure as Code, CI/CD automation, and data-driven optimization. Focus on reliability, security, and developer experience.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass-card p-8 text-center">
            <Target className="w-10 h-10 text-[#007AFF] mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-3 text-white/90">Principles</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Empowering teams to ship faster with confidence. Building platforms that scale reliably and reduce operational burden.
            </p>
          </div>

          <div className="glass-card p-8 text-center">
            <div className="w-10 h-10 mb-4 mx-auto flex items-center justify-center rounded-full bg-white/[0.08] border border-white/[0.12]">
              <span className="text-xl">🎯</span>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white/90">Background</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Building infrastructure systems at scale. Passionate about automation, observability, and creating reliable developer platforms.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
