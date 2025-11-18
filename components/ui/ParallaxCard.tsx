'use client'

import { ReactNode, useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { enhancedCardInteraction, scrollFadeIn } from '@/lib/motion'
import { cn } from '@/lib/utils'

interface ParallaxCardProps {
  children: ReactNode
  className?: string
  index?: number
}

export default function ParallaxCard({ children, className, index = 0 }: ParallaxCardProps) {
  const [isMobile, setIsMobile] = useState(true)
  const [mounted, setMounted] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { damping: 25, stiffness: 150 })
  const springY = useSpring(mouseY, { damping: 25, stiffness: 150 })

  useEffect(() => {
    setMounted(true)
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth <= 768)
      const checkMobile = () => setIsMobile(window.innerWidth <= 768)
      window.addEventListener('resize', checkMobile)
      return () => window.removeEventListener('resize', checkMobile)
    }
  }, [])

  useEffect(() => {
    if (!mounted || isMobile || !cardRef.current) return

    const card = cardRef.current

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const deltaX = (e.clientX - centerX) / rect.width
      const deltaY = (e.clientY - centerY) / rect.height
      mouseX.set(deltaX * 3) // Subtle parallax intensity
      mouseY.set(deltaY * 3)
    }

    const handleMouseLeave = () => {
      mouseX.set(0)
      mouseY.set(0)
    }

    card.addEventListener('mousemove', handleMouseMove, { passive: true })
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [mounted, isMobile, mouseX, mouseY])

  if (!mounted) {
    return (
      <div className={cn('glass-card p-6 sm:p-8', className)}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      ref={cardRef}
      className={cn('glass-card p-6 sm:p-8', className)}
      style={{
        x: isMobile ? 0 : springX,
        y: isMobile ? 0 : springY,
      }}
      {...enhancedCardInteraction}
      {...scrollFadeIn(index * 0.1)}
    >
      {children}
    </motion.div>
  )
}

