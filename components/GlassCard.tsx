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
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '0px' }}
      transition={{ 
        duration: 0.2, 
        delay: delay * 0.02, 
        ease: [0.4, 0, 0.2, 1],
        scale: { duration: 0.15 }
      }}
      className={`glass-card ${className}`}
      style={{ 
        height: className.includes('h-full') ? '100%' : undefined,
        willChange: 'auto',
      }}
      onClick={onClick}
      whileHover={hover && mounted ? {} : {}}
      whileTap={{ scale: 0.99 }}
    >
      {children}
    </motion.div>
  )
})

export default GlassCard

