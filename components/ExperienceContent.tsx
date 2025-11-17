'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, MapPin, ChevronDown, X } from 'lucide-react'
import { experiences } from '@/content/experience'
import GlassCard from './GlassCard'
import GlowHeader from './GlowHeader'
import PillTag from './PillTag'
import AnimatedNumber from './AnimatedNumber'
import SectionContainer from './SectionContainer'
import MotionFadeIn from './MotionFadeIn'

export default function ExperienceContent() {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <SectionContainer>
      <GlowHeader 
        title="Experience" 
        subtitle="Building infrastructure systems at scale with measurable impact on cost, reliability, and performance."
      />

      <div className="relative">
        {/* Subtle timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#007AFF]/20 via-[#007AFF]/10 to-transparent hidden md:block" />

        <motion.div 
          className="space-y-8"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.05,
              },
            },
          }}
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              className="relative pl-0 md:pl-16"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    duration: 0.4,
                    ease: [0.4, 0, 0.2, 1],
                  }
                },
              }}
            >
              {/* Timeline dot */}
              <div className="absolute left-6 top-8 w-4 h-4 rounded-full bg-[#007AFF] border-4 border-[#0a0a0a] hidden md:block z-10" />

              <GlassCard delay={index * 0.1} className="h-full">
                <div className="p-8 lg:p-10 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold mb-3 gradient-text">{exp.role}</h2>
                      <div className="flex flex-wrap items-center gap-4 text-white/70 mb-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#007AFF]" />
                          <span>{exp.company}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-[#007AFF]" />
                          <span>
                            {exp.startDate} - {exp.endDate || 'Present'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <motion.button
                      onClick={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
                      className="p-2 glass-card rounded-xl hover:ring-2 hover:ring-[#007AFF]/30 transition-all flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-[#007AFF]/50 focus:ring-offset-2 focus:ring-offset-[#0a0a0a]"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
                      aria-label={expandedId === exp.id ? 'Collapse' : 'Expand'}
                    >
                      <motion.div
                        animate={{ rotate: expandedId === exp.id ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                      >
                        {expandedId === exp.id ? (
                          <X className="w-5 h-5 text-white/80" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-white/80" />
                        )}
                      </motion.div>
                    </motion.button>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {exp.technologies.map((tech) => (
                      <PillTag key={tech} variant="glow">
                        {tech}
                      </PillTag>
                    ))}
                  </div>

                  {exp.metrics && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-6 pt-8 border-t border-white/10">
                      {exp.metrics.map((metric, idx) => (
                        <motion.div
                          key={metric.label}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: idx * 0.1 }}
                        >
                          <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                            <AnimatedNumber value={metric.value} />
                          </div>
                          <div className="text-sm md:text-base text-white/60">{metric.label}</div>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  <AnimatePresence mode="wait">
                    {expandedId === exp.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ 
                          duration: 0.35,
                          ease: [0.4, 0, 0.2, 1],
                          opacity: { duration: 0.25, delay: 0.05 }
                        }}
                        className="overflow-hidden"
                      >
                        <div className="pt-8 border-t border-white/10">
                          <h3 className="text-xl font-bold mb-6 text-white">Key Achievements</h3>
                          <ul className="space-y-4">
                            {exp.achievements.map((achievement, idx) => (
                              <motion.li
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: idx * 0.05 }}
                                className="flex items-start gap-3 text-white/80"
                              >
                                <span className="text-[#007AFF] mt-1.5 text-xl flex-shrink-0">•</span>
                                <span className="flex-1 leading-relaxed text-lg">{achievement}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionContainer>
  )
}
