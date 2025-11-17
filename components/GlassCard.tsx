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
    <div
      className={`glass-card ${className}`}
      style={{ 
        height: className.includes('h-full') ? '100%' : undefined,
        willChange: 'auto',
        pointerEvents: 'auto',
        position: 'relative',
        zIndex: 1,
        opacity: 1,
      }}
      onClick={onClick}
    >
      {children}
    </div>
  )
})

export default GlassCard

