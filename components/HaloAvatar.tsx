'use client'

import { useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ReactNode, useState } from 'react'

interface HaloAvatarProps {
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export default function HaloAvatar({ children, size = 'md', className = '' }: HaloAvatarProps) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { damping: 30, stiffness: 150 })
  const springY = useSpring(mouseY, { damping: 30, stiffness: 150 })
  
  // Transform for parallax tilt (1-2 degrees max)
  const rotateX = useTransform(springY, [-15, 15], [1.5, -1.5])
  const rotateY = useTransform(springX, [-15, 15], [-1.5, 1.5])

  const sizeClasses = {
    sm: 'w-36 h-36',
    md: 'w-56 h-56 md:w-72 md:h-72',
    lg: 'w-72 h-72 md:w-96 md:h-96', // Increased by ~15%
    xl: 'w-96 h-96 md:w-[28rem] md:h-[28rem]',
  }

  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (typeof window === 'undefined') return
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (!mounted) return
    // Only enable parallax on desktop (not mobile)
    if (isMobile) {
      return
    }

    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      const deltaX = (e.clientX - centerX) / centerX
      const deltaY = (e.clientY - centerY) / centerY

      mouseX.set(deltaX * 15)
      mouseY.set(deltaY * 15)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY, isMobile, mounted])

  return (
    <motion.div 
      className={`relative inline-block ${sizeClasses[size]} ${className}`}
      animate={!mounted || isMobile ? {} : {
        y: [0, -3, 0], // Floating effect: disabled on mobile
      }}
      transition={!mounted || isMobile ? {} : {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      style={!mounted || isMobile ? {} : {
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Cinematic radial glow halo - disabled on mobile for performance */}
      {mounted && !isMobile && (
        <>
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none -z-10"
            style={{
              x: springX,
              y: springY,
              background: 'radial-gradient(circle, rgba(0, 122, 255, 0.5) 0%, rgba(90, 200, 250, 0.35) 25%, rgba(138, 43, 226, 0.25) 50%, transparent 75%)',
              filter: 'blur(80px)',
              transform: 'translateZ(0)',
            }}
          />
          
          {/* Secondary softer glow layer */}
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none -z-10"
            style={{
              x: springX,
              y: springY,
              background: 'radial-gradient(circle, rgba(90, 200, 250, 0.2) 0%, transparent 60%)',
              filter: 'blur(100px)',
              transform: 'translateZ(0)',
            }}
          />
        </>
      )}
      
      {/* HaloAura - subtle depth effect - simplified on mobile */}
      <motion.div
        className="absolute -inset-4 rounded-full pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(0, 122, 255, 0.15) 0%, transparent 70%)',
          filter: !mounted || isMobile ? 'blur(20px)' : 'blur(40px)',
          opacity: !mounted || isMobile ? 0.4 : 0.6,
        }}
      />

      {children}
    </motion.div>
  )
}
