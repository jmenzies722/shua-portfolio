'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { projects } from '@/content/projects'
import GlassCard from './GlassCard'
import GlowHeader from './GlowHeader'
import PillTag from './PillTag'
import AnimatedNumber from './AnimatedNumber'
import SectionContainer from './SectionContainer'
import MotionFadeIn from './MotionFadeIn'

export default function ProjectsContent() {

  return (
    <SectionContainer>
      <GlowHeader 
        title="Projects" 
        subtitle="Real-world infrastructure solutions with measurable impact on cost, reliability, and performance."
      />

      <motion.div 
        className="grid md:grid-cols-2 gap-8 lg:gap-10"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className="h-full"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.5,
                  ease: [0.4, 0, 0.2, 1],
                }
              },
            }}
            style={{
              transform: 'translateZ(0)',
              willChange: 'transform',
            }}
          >
            <Link 
              href={`/projects/${project.slug}`} 
              className="group block h-full focus:outline-none focus:ring-2 focus:ring-[#007AFF]/50 focus:ring-offset-2 focus:ring-offset-[#0a0a0a] rounded-2xl"
            >
              <GlassCard delay={index * 0.1} className="h-full">
                <div className="p-8 lg:p-10 h-full flex flex-col">
                  <div className="mb-8 flex-grow">
                    <h3 className="text-2xl lg:text-3xl font-bold mb-4 gradient-text">{project.title}</h3>
                    <p className="text-white/80 mb-6 leading-relaxed text-lg" style={{ lineHeight: '1.75' }}>{project.shortDescription}</p>
                    <div className="flex flex-wrap gap-2.5 mb-6">
                      {project.technologies.slice(0, 6).map((tech) => (
                        <PillTag key={tech} variant="glow">
                          {tech}
                        </PillTag>
                      ))}
                    </div>
                  </div>
                  {project.metrics && (
                    <div className="pt-8 border-t border-white/10 mt-auto mb-6">
                      <div className="flex gap-8">
                        {project.metrics.slice(0, 2).map((metric, idx) => (
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
                    </div>
                  )}
                  <motion.div 
                    className="flex items-center gap-2 text-white/70 text-sm group-hover:text-[#007AFF] transition-colors duration-200"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
                  >
                    View case study
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </motion.div>
                </div>
              </GlassCard>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </SectionContainer>
  )
}
