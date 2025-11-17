'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface PillTagProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'glow'
}

export default function PillTag({ children, className = '', variant = 'default' }: PillTagProps) {
  return (
    <motion.span
      className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
        variant === 'glow'
          ? 'bg-white/10 border border-white/20 text-white/90'
          : 'bg-white/5 border border-white/10 text-white/70'
      } ${className}`}
      whileHover={{
        scale: 1.05,
        borderColor: 'rgba(0, 122, 255, 0.3)',
        boxShadow: '0 0 12px rgba(0, 122, 255, 0.2)',
      }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      style={{ willChange: 'transform' }}
    >
      {children}
    </motion.span>
  )
}

