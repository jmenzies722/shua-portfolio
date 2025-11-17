'use client'

import { motion } from 'framer-motion'
import { skills } from '@/content/skills'
import GlassCard from './GlassCard'
import GlowHeader from './GlowHeader'
import PillTag from './PillTag'
import SectionContainer from './SectionContainer'
import MotionFadeIn from './MotionFadeIn'
import * as LucideIcons from 'lucide-react'

export default function SkillsContent() {
  return (
    <SectionContainer>
      <GlowHeader 
        title="Skills" 
        subtitle="Comprehensive expertise across cloud infrastructure, automation, and DevOps practices."
      />

      <motion.div 
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.04,
            },
          },
        }}
      >
        {skills.map((skill, index) => {
          const IconComponent = (LucideIcons as any)[skill.icon] || LucideIcons.Code
          return (
            <motion.div
              key={skill.category}
              className="h-full"
              variants={{
                hidden: { opacity: 0, y: 20, scale: 0.98 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: 0.4,
                    ease: [0.4, 0, 0.2, 1],
                  }
                },
              }}
            >
              <GlassCard delay={index * 0.04} className="h-full group">
                <div className="p-8 lg:p-10 h-full flex flex-col">
                  <div className="flex items-center gap-4 mb-8">
                    <motion.div 
                      className="p-3 glass-card rounded-xl flex-shrink-0"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                    >
                      <IconComponent className="w-6 h-6 text-[#007AFF]" />
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">{skill.category}</h3>
                      <p className="text-sm text-white/50">{skill.skills.length} skills</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2.5 flex-grow items-start">
                    {skill.skills.map((s) => (
                      <PillTag key={s} variant="glow">
                        {s}
                      </PillTag>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          )
        })}
      </motion.div>
    </SectionContainer>
  )
}
