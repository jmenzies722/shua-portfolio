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
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ 
        duration: isMobile ? 0.2 : 0.35, 
        delay: delay * (isMobile ? 0.02 : 0.05), 
        ease: [0.4, 0, 0.2, 1],
        scale: { duration: isMobile ? 0.15 : 0.3 }
      }}
      className={`glass-card ${className}`}
              style={{ 
                height: className.includes('h-full') ? '100%' : undefined,
                ...(typeof window !== 'undefined' && window.innerWidth > 768 ? {
                  willChange: 'transform, opacity',
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  perspective: '1000px',
                } : {
                  willChange: 'auto',
                }),
              }}
      onClick={onClick}
              whileHover={hover && typeof window !== 'undefined' && window.innerWidth > 768 ? { 
                y: -4, 
                scale: 1.02,
                transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
              } : {}}
      whileTap={{ scale: 0.99 }}
    >
      {children}
    </motion.div>
  )
})

export default GlassCard

