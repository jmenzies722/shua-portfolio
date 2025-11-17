'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { resumeData } from '@/content/resume'
import GlassCard from './GlassCard'

export default function AboutPreview() {

  return (
    <section id="about" className="py-32 md:py-48 px-6 lg:px-8 relative glass-section">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold mb-6 gradient-text tracking-tight">
            About
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.3, delay: 0.05, ease: [0.4, 0, 0.2, 1] }}
          className="max-w-4xl mx-auto mb-16"
        >
          <GlassCard delay={0.1}>
            <div className="p-10 md:p-12">
              <p className="text-xl md:text-2xl lg:text-3xl text-primary-80 leading-relaxed font-light text-center">
                {resumeData.summary}
              </p>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.2, delay: 0.1 }}
          className="text-center"
        >
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-lg text-primary-60 hover:text-primary transition-colors duration-200 group glass-card px-6 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007AFF]/50 focus:ring-offset-2 focus:ring-offset-[#0a0a0a]"
          >
            Learn more
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
