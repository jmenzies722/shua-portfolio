'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function Spotlight() {
  const [isVisible, setIsVisible] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(true)
  const pathname = usePathname()
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  // Apple-style smooth spring animation
  const springConfig = { damping: 25, stiffness: 200 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)
  
  // Apple-style spotlight: larger, softer gradient
  const background = useTransform(
    [x, y],
    ([xVal, yVal]) => `radial-gradient(600px circle at ${xVal}px ${yVal}px, rgba(90, 200, 250, 0.12) 0%, rgba(0, 122, 255, 0.08) 30%, transparent 70%)`
  )

  useEffect(() => {
    setMounted(true)
  }, [])

  // Reset visibility on route change
  useEffect(() => {
    setIsVisible(false)
  }, [pathname])

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
    if (!mounted) return
    // Disable on mobile for performance
    if (isMobile) return

    let rafId: number | null = null

    const handleMouseMove = (e: MouseEvent) => {
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          mouseX.set(e.clientX)
          mouseY.set(e.clientY)
          setIsVisible(true)
          rafId = null
        })
      }
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [mouseX, mouseY, isMobile, mounted])

  // Don't render on mobile or before mount
  if (!mounted || isMobile) return null

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    >
      <motion.div
        className="absolute inset-0"
        style={{ background }}
      />
    </motion.div>
  )
}

