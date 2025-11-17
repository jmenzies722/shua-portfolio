'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface HeroHaloProps {
  children: React.ReactNode
}

export default function HeroHalo({ children }: HeroHaloProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { damping: 30, stiffness: 150 })
  const springY = useSpring(mouseY, { damping: 30, stiffness: 150 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = (e.currentTarget as Window).innerWidth
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      const deltaX = (e.clientX - centerX) / centerX
      const deltaY = (e.clientY - centerY) / centerY

      mouseX.set(deltaX * 20)
      mouseY.set(deltaY * 20)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <div className="relative">
      {/* Glowing halo */}
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
      {children}
    </div>
  )
}

