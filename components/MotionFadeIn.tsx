'use client'

import { motion } from 'framer-motion'
import { ReactNode, useEffect, useState } from 'react'

interface MotionFadeInProps {
  children: ReactNode
  delay?: number
  className?: string
  y?: number
}

export default function MotionFadeIn({ 
  children, 
  delay = 0, 
  className = '',
  y = 20 
}: MotionFadeInProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // On mobile: instant or very fast fade
  if (isMobile) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ 
          duration: 0.15, 
          delay: delay * 0.3, // Much faster delays
          ease: [0.4, 0, 0.2, 1] 
        }}
        className={className}
      >
        {children}
      </motion.div>
    )
  }

  // Desktop: Full animation
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ 
        duration: 0.4, 
        delay,
        ease: [0.4, 0, 0.2, 1] 
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

