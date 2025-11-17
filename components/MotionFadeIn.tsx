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
    <div
      className={className}
      style={{ 
        pointerEvents: 'auto', 
        position: 'relative', 
        zIndex: 1,
        opacity: 1,
      }}
    >
      {children}
    </div>
  )
}

