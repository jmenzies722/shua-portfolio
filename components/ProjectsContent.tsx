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

      <div 
        className="grid md:grid-cols-2 gap-8 lg:gap-10"
      >
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="h-full"
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
                        {project.metrics.slice(0, 2).map((metric) => (
                          <div key={metric.label}>
                            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                              <AnimatedNumber value={metric.value} />
                            </div>
                            <div className="text-sm md:text-base text-white/60">{metric.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-white/70 text-sm group-hover:text-[#007AFF] transition-colors duration-100">
                    View case study
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-100" />
                  </div>
                </div>
              </GlassCard>
            </Link>
          </div>
        ))}
      </div>
    </SectionContainer>
  )
}
