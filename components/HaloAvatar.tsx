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
  const springX = useSpring(mouseX, { damping: 40, stiffness: 200 })
  const springY = useSpring(mouseY, { damping: 40, stiffness: 200 })
  
  // Transform for parallax tilt (1 degree max - Apple subtle)
  const rotateX = useTransform(springY, [-10, 10], [0.5, -0.5])
  const rotateY = useTransform(springX, [-10, 10], [-0.5, 0.5])

  const sizeClasses = {
    sm: 'w-36 h-36',
    md: 'w-56 h-56 md:w-72 md:h-72',
    lg: 'w-72 h-72 md:w-96 md:h-96',
    xl: 'w-96 h-96 md:w-[28rem] md:h-[28rem]',
  }

  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(true)

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
    if (!mounted || isMobile) return

    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      const deltaX = (e.clientX - centerX) / centerX
      const deltaY = (e.clientY - centerY) / centerY

      mouseX.set(deltaX * 8) // Reduced movement for subtlety
      mouseY.set(deltaY * 8)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY, isMobile, mounted])

  return (
    <motion.div 
      className={`relative inline-block ${sizeClasses[size]} ${className}`}
      animate={!mounted || isMobile ? {} : {
        y: [0, -1.5, 0], // Subtle floating (1-2px max)
      }}
      transition={!mounted || isMobile ? {} : {
        duration: 5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      style={!mounted || isMobile ? {} : {
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        transform: 'translate3d(0, 0, 0)', // GPU acceleration
      }}
    >
      {/* Apple-style subtle radial glow - minimal blur, low opacity */}
      {mounted && !isMobile && (
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none -z-10"
          style={{
            x: springX,
            y: springY,
            background: 'radial-gradient(circle, rgba(0, 122, 255, 0.12) 0%, rgba(90, 200, 250, 0.08) 30%, transparent 60%)',
            filter: 'blur(24px)', // Reduced from 80px to 24px
            transform: 'translate3d(0, 0, 0)',
            opacity: 0.8,
          }}
        />
      )}
      
      {/* Subtle depth shadow - no blur, just gradient */}
      <div
        className="absolute -inset-2 rounded-full pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(0, 0, 0, 0.15) 0%, transparent 70%)',
          opacity: mounted && !isMobile ? 0.6 : 0.4,
          transform: 'translate3d(0, 0, 0)',
        }}
      />

      {children}
    </motion.div>
  )
}
