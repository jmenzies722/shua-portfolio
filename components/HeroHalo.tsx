'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface HeroHaloProps {
  children: React.ReactNode
}

export default function HeroHalo({ children }: HeroHaloProps) {
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(true)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { damping: 30, stiffness: 150 })
  const springY = useSpring(mouseY, { damping: 30, stiffness: 150 })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [mounted])

  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return
    // Disable on mobile for performance
    if (isMobile) {
      return
    }

    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      const deltaX = (e.clientX - centerX) / centerX
      const deltaY = (e.clientY - centerY) / centerY

      mouseX.set(deltaX * 20)
      mouseY.set(deltaY * 20)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY, isMobile, mounted])

  return (
    <div className="relative">
      {/* Glowing halo - only on desktop */}
      {mounted && !isMobile && (
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            x: springX,
            y: springY,
            background: 'radial-gradient(circle, rgba(0, 122, 255, 0.4) 0%, rgba(90, 200, 250, 0.3) 30%, rgba(138, 43, 226, 0.2) 60%, transparent 80%)',
            filter: 'blur(60px)',
            transform: 'translateZ(0)',
          }}
        />
      )}
      {children}
    </div>
  )
}

