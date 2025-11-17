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
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px' }}
      transition={{ 
        duration: 0.2, 
        delay: delay * 0.2,
        ease: [0.4, 0, 0.2, 1] 
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

