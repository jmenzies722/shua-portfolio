'use client'

import { motion } from 'framer-motion'
import { Download, Mail, Phone, MapPin, Linkedin } from 'lucide-react'
import { resumeData } from '@/content/resume'
import GlassCard from './GlassCard'
import GlowHeader from './GlowHeader'
import HaloAvatar from './HaloAvatar'
import PillTag from './PillTag'
import SectionContainer from './SectionContainer'
import MotionFadeIn from './MotionFadeIn'

export default function ResumeContent() {
  return (
    <SectionContainer maxWidth="xl">
      {/* Header with Avatar */}
      <MotionFadeIn delay={0.1} className="text-center mb-16">
        <div className="flex flex-col items-center mb-8">
          <HaloAvatar size="md" className="mb-6">
            <div className="relative w-full h-full rounded-full overflow-hidden glass-profile p-1">
              <img
                src="/IMG_2897.jpg"
                alt="Josh Menzies"
                className="w-full h-full object-cover rounded-full"
                loading="lazy"
                decoding="async"
                style={{
                  objectPosition: 'center center',
                  transform: 'translateZ(0)',
                }}
              />
            </div>
          </HaloAvatar>
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-display font-bold mb-4 gradient-text">
            {resumeData.name}
          </h1>
          <p className="text-2xl text-white/70 mb-8">{resumeData.title}</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-white/70 mb-8">
          <a href={`mailto:${resumeData.email}`} className="flex items-center gap-2 hover:text-white transition-colors">
            <Mail className="w-4 h-4" />
            <span>{resumeData.email}</span>
          </a>
          <a href={`tel:${resumeData.phone}`} className="flex items-center gap-2 hover:text-white transition-colors">
            <Phone className="w-4 h-4" />
            <span>{resumeData.phone}</span>
          </a>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{resumeData.location}</span>
          </div>
          <a
            href={resumeData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <Linkedin className="w-4 h-4" />
            <span>LinkedIn</span>
          </a>
        </div>
        <motion.a
          href="/resume.pdf"
          download
          className="inline-flex items-center gap-3 glass-card px-8 py-4 text-white font-medium focus:outline-none focus:ring-2 focus:ring-[#007AFF]/50 focus:ring-offset-2 focus:ring-offset-[#0a0a0a] relative overflow-hidden group"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
        >
          <span className="relative z-10 flex items-center gap-2">
            <Download className="w-5 h-5" />
            Download PDF
          </span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#007AFF]/20 via-[#5AC8FA]/20 to-[#007AFF]/20"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          />
        </motion.a>
      </MotionFadeIn>

      {/* Summary */}
      <MotionFadeIn delay={0.15}>
        <GlassCard delay={0.1} className="mb-8">
          <div className="p-10">
            <h2 className="text-3xl font-bold mb-6 gradient-text">Summary</h2>
            <p className="text-white/80 leading-relaxed text-lg">{resumeData.summary}</p>
          </div>
        </GlassCard>
      </MotionFadeIn>

      {/* Experience */}
      <MotionFadeIn delay={0.2}>
        <div className="mb-12">
          <h2 className="text-4xl font-display font-bold mb-8 gradient-text">Experience</h2>
          <div className="space-y-6">
            {resumeData.experience.map((exp, index) => (
              <GlassCard key={index} delay={0.1 + index * 0.1}>
                <div className="p-10">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold mb-2 gradient-text">{exp.role}</h3>
                      <p className="text-xl text-white/70 mb-1">{exp.company}</p>
                      <p className="text-white/50">{exp.location}</p>
                    </div>
                    <span className="text-white/60 text-sm mt-2 md:mt-0">{exp.period}</span>
                  </div>
                  <ul className="space-y-3.5">
                    {exp.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-white/80">
                        <span className="text-[#007AFF] mt-1.5 text-xl flex-shrink-0">•</span>
                        <span className="flex-1 leading-relaxed text-lg" style={{ lineHeight: '1.75' }}>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </MotionFadeIn>

      {/* Projects */}
      <MotionFadeIn delay={0.25}>
        <div className="mb-12">
          <h2 className="text-4xl font-display font-bold mb-8 gradient-text">Projects</h2>
          <div className="space-y-6">
            {resumeData.projects.map((project, index) => (
              <GlassCard key={index} delay={0.1 + index * 0.1}>
                <div className="p-10">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-2 gradient-text">{project.name}</h3>
                      <p className="text-white/70 mb-1">{project.company}</p>
                    </div>
                    <span className="text-white/60 text-sm mt-2 md:mt-0">{project.period}</span>
                  </div>
                  <p className="text-white/80 mb-6 leading-relaxed">{project.description}</p>
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-3 text-white/90">Key Highlights</h4>
                    <ul className="space-y-2">
                      {project.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-white/70">
                          <span className="text-[#007AFF] mt-1.5">✓</span>
                          <span className="flex-1 text-sm">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-white/90">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <PillTag key={tech}>
                          {tech}
                        </PillTag>
                      ))}
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </MotionFadeIn>

      {/* Skills */}
      <MotionFadeIn delay={0.3}>
        <div className="mb-20">
          <h2 className="text-4xl font-display font-bold mb-8 gradient-text">Skills</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(resumeData.skills).map(([category, skills], index) => (
              <GlassCard key={category} delay={0.1 + index * 0.1}>
                <div className="p-8">
                  <h3 className="text-xl font-bold mb-4 gradient-text capitalize">
                    {category.replace('_', ' ')}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <PillTag key={skill}>
                        {skill}
                      </PillTag>
                    ))}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </MotionFadeIn>

      {/* Education */}
      {resumeData.education && resumeData.education.length > 0 && (
        <MotionFadeIn delay={0.35}>
          <div>
            <h2 className="text-4xl font-display font-bold mb-8 gradient-text">Education</h2>
            <div className="space-y-6">
              {resumeData.education.map((edu, index) => (
                <GlassCard key={index} delay={0.1 + index * 0.1}>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-2 gradient-text">{edu.degree}</h3>
                    <p className="text-white/70 text-lg mb-1">{edu.school}</p>
                    <p className="text-white/50 text-sm">{edu.year}</p>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </MotionFadeIn>
      )}
    </SectionContainer>
  )
}
