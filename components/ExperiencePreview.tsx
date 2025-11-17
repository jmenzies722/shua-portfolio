'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { experiences } from '@/content/experience'
import GlassCard from './GlassCard'

export default function ExperiencePreview() {
  const featuredExperience = experiences.slice(0, 2)

  return (
    <section id="experience" className="py-32 md:py-48 px-6 lg:px-8 relative glass-section">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-200px' }}
          transition={{ duration: 0.1, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-20"
          style={{ pointerEvents: 'auto', position: 'relative', zIndex: 1 }}
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold mb-6 gradient-text tracking-tight">
            Experience
          </h2>
          <p className="text-xl md:text-2xl text-secondary max-w-3xl mx-auto font-light">
            Building infrastructure systems at scale
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {featuredExperience.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-200px' }}
              transition={{ duration: 0.1, delay: 0, ease: [0.4, 0, 0.2, 1] }}
              className="h-full"
              style={{ pointerEvents: 'auto', position: 'relative', zIndex: 1 }}
            >
              <GlassCard delay={index * 0.1} className="h-full">
                <div className="p-8 lg:p-10 h-full flex flex-col">
                  <div className="mb-6 flex-grow">
                    <h3 className="text-2xl lg:text-3xl font-bold mb-2 gradient-text">{exp.role}</h3>
                    <p className="text-primary-60 text-lg mb-1">{exp.company}</p>
                    <p className="text-primary-40 text-sm">
                      {exp.startDate} - {exp.endDate || 'Present'}
                    </p>
                  </div>
                  {exp.metrics && (
                    <div className="pt-6 border-t border-primary mt-auto">
                      <div className="flex gap-6">
                        {exp.metrics.slice(0, 2).map((metric) => (
                          <div key={metric.label}>
                            <div className="text-3xl font-bold gradient-text mb-1">{metric.value}</div>
                            <div className="text-sm text-tertiary">{metric.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 1 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-200px' }}
          transition={{ duration: 0.1, delay: 0 }}
          className="text-center"
          style={{ pointerEvents: 'auto', position: 'relative', zIndex: 1 }}
        >
          <Link
            href="/experience"
            className="inline-flex items-center gap-2 text-lg text-primary-60 hover:text-primary transition-colors duration-200 group glass-card px-6 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007AFF]/50 focus:ring-offset-2 focus:ring-offset-[#0a0a0a]"
          >
            View all experience
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
