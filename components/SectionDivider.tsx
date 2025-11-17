'use client'

import { motion } from 'framer-motion'

interface SectionDividerProps {
  className?: string
  delay?: number
}

export default function SectionDivider({ className = '', delay = 0 }: SectionDividerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: [0.4, 0, 0.2, 1] 
      }}
      className={`h-px bg-gradient-to-r from-transparent via-white/10 to-transparent ${className}`}
    />
  )
}

