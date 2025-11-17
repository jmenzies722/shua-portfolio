'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { projects } from '@/content/projects'
import GlassCard from './GlassCard'

export default function ProjectsPreview() {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 2)

  return (
    <section id="projects" className="py-32 md:py-48 px-6 lg:px-8 relative glass-section">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px' }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold mb-6 gradient-text tracking-tight">
            Projects
          </h2>
          <p className="text-xl md:text-2xl text-secondary max-w-3xl mx-auto font-light">
            Infrastructure solutions with measurable impact
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px' }}
              transition={{ duration: 0.3, delay: index * 0.03, ease: [0.4, 0, 0.2, 1] }}
              className="h-full"
            >
              <Link href={`/projects/${project.slug}`} className="block h-full group focus:outline-none focus:ring-2 focus:ring-[#007AFF]/50 focus:ring-offset-2 focus:ring-offset-[#0a0a0a] rounded-2xl">
                <GlassCard delay={index * 0.1} className="h-full">
                  <div className="p-8 lg:p-10 h-full flex flex-col">
                    <div className="mb-6 flex-grow">
                      <h3 className="text-2xl lg:text-3xl font-bold mb-4 gradient-text">{project.title}</h3>
                      <p className="text-primary-60 leading-relaxed text-lg">{project.shortDescription}</p>
                    </div>
                    {project.metrics && (
                      <div className="pt-6 border-t border-primary mt-auto">
                        <div className="flex gap-6">
                          {project.metrics.slice(0, 2).map((metric) => (
                            <div key={metric.label}>
                              <div className="text-3xl font-bold gradient-text mb-1">{metric.value}</div>
                              <div className="text-sm text-tertiary">{metric.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="mt-6 flex items-center gap-2 text-primary-60 text-sm group-hover:text-primary transition-colors">
                      View case study
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '0px' }}
          transition={{ duration: 0.2, delay: 0.1 }}
          className="text-center"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-lg text-primary-60 hover:text-primary transition-colors duration-200 group glass-card px-6 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007AFF]/50 focus:ring-offset-2 focus:ring-offset-[#0a0a0a]"
          >
            View all projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
