'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { Project } from '@/types'
import GlassCard from './GlassCard'

interface ProjectCaseStudyProps {
  project: Project
}

export default function ProjectCaseStudy({ project }: ProjectCaseStudyProps) {
  return (
    <div className="pt-32 pb-32 px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-primary-60 hover:text-primary transition-colors mb-12"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Projects
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-16"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 gradient-text">
            {project.title}
          </h1>
          <p className="text-2xl text-primary-70 leading-relaxed">{project.description}</p>
        </motion.div>

        {/* Metrics */}
        {project.metrics && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {project.metrics.map((metric, index) => (
              <GlassCard key={metric.label} delay={index * 0.1}>
                <div className="p-6 text-center">
                  <div className="text-4xl font-bold gradient-text mb-2">{metric.value}</div>
                  <div className="text-sm text-primary-60">{metric.label}</div>
                </div>
              </GlassCard>
            ))}
          </div>
        )}

        {/* Technologies */}
        <GlassCard delay={0.2} className="mb-16">
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-6 gradient-text">Technologies</h2>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 glass-badge rounded-lg text-primary-70 text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </GlassCard>

        {/* Problem */}
        <GlassCard delay={0.3} className="mb-8">
          <div className="p-10">
            <h2 className="text-3xl font-bold mb-6 gradient-text">Problem</h2>
            <p className="text-primary-70 leading-relaxed text-lg">{project.problem}</p>
          </div>
        </GlassCard>

        {/* Solution */}
        <GlassCard delay={0.4} className="mb-8">
          <div className="p-10">
            <h2 className="text-3xl font-bold mb-6 gradient-text">Solution</h2>
            <p className="text-primary-70 leading-relaxed text-lg">{project.solution}</p>
          </div>
        </GlassCard>

        {/* Architecture */}
        <GlassCard delay={0.5} className="mb-8">
          <div className="p-10">
            <h2 className="text-3xl font-bold mb-6 gradient-text">Architecture</h2>
            <div className="space-y-4">
              {project.architecture.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="p-2 glass-badge rounded-lg mt-1">
                    <CheckCircle className="w-5 h-5 text-[#007AFF]" />
                  </div>
                  <p className="text-primary-70 leading-relaxed flex-1">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>

        {/* Impact */}
        <GlassCard delay={0.6}>
          <div className="p-10">
            <h2 className="text-3xl font-bold mb-6 gradient-text">Impact</h2>
            <div className="space-y-4">
              {project.impact.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="p-2 bg-white/5 rounded-lg mt-1">
                    <CheckCircle className="w-5 h-5 text-[#007AFF]" />
                  </div>
                  <p className="text-white/70 leading-relaxed flex-1 text-lg">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}

