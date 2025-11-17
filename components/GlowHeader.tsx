'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface GlowHeaderProps {
  title: string
  subtitle?: string
  children?: ReactNode
  className?: string
}

export default function GlowHeader({ title, subtitle, children, className = '' }: GlowHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className={`text-center mb-20 md:mb-24 relative ${className}`}
    >
      {/* Enhanced soft blue radial lighting behind header */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
        <motion.div
          className="w-[600px] h-[600px] bg-gradient-to-br from-[#007AFF]/12 via-[#5AC8FA]/6 to-transparent rounded-full blur-3xl"
          animate={{
            opacity: [0.5, 0.6, 0.5],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
      
      <h1 className="text-6xl md:text-7xl lg:text-8xl font-display font-bold mb-8 gradient-text tracking-tight">
        {title}
      </h1>
      {subtitle && (
        <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed font-light" style={{ lineHeight: '1.7' }}>
          {subtitle}
        </p>
      )}
      {children}
    </motion.div>
  )
}

