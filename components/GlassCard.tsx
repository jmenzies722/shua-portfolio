'use client'

import { memo, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  delay?: number
  onClick?: () => void
  hover?: boolean
}

const GlassCard = memo(function GlassCard({ children, className = '', delay = 0, onClick, hover = true }: GlassCardProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Use CSS media query instead of JS for mobile detection to avoid hydration issues
  const isMobileClass = 'max-md:opacity-100'

  return (
    <motion.div
      initial={{ opacity: 1, y: 0, scale: 1 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ 
        duration: 0.15, 
        delay: 0,
        ease: [0.4, 0, 0.2, 1],
      }}
      className={`glass-card ${className}`}
      style={{ 
        height: className.includes('h-full') ? '100%' : undefined,
        willChange: 'auto',
        pointerEvents: 'auto',
        position: 'relative',
        zIndex: 1,
      }}
      onClick={onClick}
      whileHover={hover && mounted ? { scale: 1.01, y: -2 } : {}}
      whileTap={{ scale: 0.99 }}
    >
      {children}
    </motion.div>
  )
})

export default GlassCard

