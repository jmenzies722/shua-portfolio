'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import SectionShell from '@/components/SectionShell'
import HeroAvatar from '@/components/HeroAvatar'
import AskShuaModal from '@/components/AskShuaModal'
import { fadeInUp, avatarParallax } from '@/lib/motion'
import { withTrailingSlash } from '@/lib/utils'

const orbitTech = ['AWS', 'Terraform', 'Kubernetes', 'Lambda', 'Python', 'Datadog']

export default function Page() {
  const [isShuaOpen, setIsShuaOpen] = useState(false)

  return (
    <>
      <AskShuaModal isOpen={isShuaOpen} onClose={() => setIsShuaOpen(false)} />
    <SectionShell 
      className="min-h-[70vh] md:min-h-[75vh] flex items-center justify-center bg-transparent"
      style={{
        paddingTop: '4rem',
        paddingBottom: 'calc(3rem + env(safe-area-inset-bottom))',
        paddingLeft: 'max(1rem, calc(1rem + env(safe-area-inset-left)))',
        paddingRight: 'max(1rem, calc(1rem + env(safe-area-inset-right)))',
        overflow: 'visible',
      }}
    >
      <div className="w-full max-w-6xl mx-auto px-4" style={{ overflow: 'visible' }}>
        <div className="glass-card p-6 sm:p-8 md:p-10 lg:p-12" style={{ overflow: 'visible' }}>
          {/* Mobile: Vertical Stack | Desktop: Two-Column Layout - Perfectly Centered */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-center md:gap-12 lg:gap-16" style={{ overflow: 'visible' }}>
            {/* Left: Text Content */}
            <div className="flex-1 text-center md:text-left space-y-6 md:space-y-5 lg:space-y-6">
              {/* Headline */}
              <motion.div 
                {...fadeInUp(0.1)} 
                className="space-y-3 md:space-y-4"
                style={{ overflow: 'visible' }}
              >
                <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-white/60">
                  Platform Engineer | AWS, Serverless, Observability & Automation
                </p>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight">
                  Architecting, optimizing, and automating cloud infrastructure at scale.
                </h1>
              </motion.div>

              {/* Subheadline */}
              <motion.div 
                {...fadeInUp(0.2)}
                style={{ overflow: 'visible' }}
              >
                <p className="text-base sm:text-lg text-white/70 max-w-2xl md:max-w-none mx-auto md:mx-0 leading-relaxed">
                  I build secure, observable platforms that reduce deployment time by 40%, cut cloud costs by $300K annually, and improve MTTR by 25%. 
                  Delivering measurable impact through AWS-native automation and infrastructure as code.
                </p>
              </motion.div>

              {/* CTAs */}
              <motion.div 
                {...fadeInUp(0.3)} 
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start"
                style={{ overflow: 'visible' }}
              >
                <Button href={withTrailingSlash('/projects')} variant="primary" className="w-full sm:w-auto min-h-[48px]">
                  View projects
                </Button>
                <motion.button
                  onClick={() => setIsShuaOpen(true)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto min-h-[48px] px-6 py-3 rounded-2xl border border-white/20 bg-white/[0.05] text-white font-medium text-sm sm:text-base transition-all duration-200 hover:bg-white/[0.1] hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/30"
                >
                  Ask Shua
                </motion.button>
                <Button href={withTrailingSlash('/contact')} variant="secondary" className="w-full sm:w-auto min-h-[48px]">
                  Contact
                </Button>
              </motion.div>

              {/* Tech Pills */}
              <motion.div 
                {...fadeInUp(0.4)} 
                className="flex flex-wrap gap-2 justify-center md:justify-start pt-2"
                style={{ overflow: 'visible' }}
              >
                {orbitTech.map((tech) => (
                  <span key={tech} className="pill text-xs sm:text-sm">
                    {tech}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Right: Avatar - Desktop Only */}
            <motion.div
              {...avatarParallax}
              className="flex justify-center md:flex-shrink-0 order-first md:order-last mb-6 md:mb-0"
              style={{ overflow: 'visible' }}
            >
              <HeroAvatar src="/IMG_2897.jpg" alt="Josh Menzies" />
            </motion.div>
          </div>
        </div>
      </div>
    </SectionShell>
    </>
  )
}
