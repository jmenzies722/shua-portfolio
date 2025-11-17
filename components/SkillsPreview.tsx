'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { skills } from '@/content/skills'
import GlassCard from './GlassCard'
import * as LucideIcons from 'lucide-react'

export default function SkillsPreview() {
  const featuredSkills = skills.slice(0, 4)

  return (
    <section id="skills" className="py-32 md:py-48 px-6 lg:px-8 relative glass-section">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold mb-6 gradient-text tracking-tight">
            Skills
          </h2>
          <p className="text-xl md:text-2xl text-secondary max-w-3xl mx-auto font-light">
            Cloud infrastructure, automation, and DevOps
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {featuredSkills.map((skill, index) => {
            const IconComponent =
              (LucideIcons as any)[skill.icon] || LucideIcons.Code
            return (
              <motion.div
                key={skill.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.3, delay: index * 0.03, ease: [0.4, 0, 0.2, 1] }}
                className="h-full"
              >
                <GlassCard delay={index * 0.1} className="h-full">
                  <div className="p-8 text-center h-full flex flex-col justify-center">
                    <div className="flex justify-center mb-4">
                      <div className="p-4 glass-badge rounded-2xl">
                        <IconComponent className="w-8 h-8 text-primary-80" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-primary">{skill.category}</h3>
                    <p className="text-tertiary text-sm">
                      {skill.skills.length} skills
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.2, delay: 0.1 }}
          className="text-center"
        >
          <Link
            href="/skills"
            className="inline-flex items-center gap-2 text-lg text-primary-60 hover:text-primary transition-colors duration-200 group glass-card px-6 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007AFF]/50 focus:ring-offset-2 focus:ring-offset-[#0a0a0a]"
          >
            View all skills
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
