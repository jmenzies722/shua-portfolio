'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface GradientFogBackgroundProps {
  fixed?: boolean
}

export default function GradientFogBackground({ fixed = false }: GradientFogBackgroundProps) {
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(true) // Default to mobile

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

  return (
    <div 
      className={`${fixed ? 'fixed' : 'absolute'} inset-0 overflow-hidden pointer-events-none -z-10`}
    >
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1c] to-[#0a0a0a]" />
      
      {/* Mobile: Static gradient fog (no animation) */}
      {!mounted || isMobile ? (
        <>
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[#007AFF]/15 via-[#5AC8FA]/8 to-[#8A2BE2]/10 rounded-full blur-2xl" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-br from-[#8A2BE2]/10 via-[#007AFF]/8 to-[#5AC8FA]/8 rounded-full blur-2xl" />
        </>
      ) : (
        <>
          {/* Desktop: Animated gradient fog */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-gradient-to-br from-[#007AFF]/20 via-[#5AC8FA]/10 to-[#8A2BE2]/15 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[#8A2BE2]/15 via-[#007AFF]/10 to-[#5AC8FA]/10 rounded-full blur-3xl"
            animate={{
              x: [0, -80, 0],
              y: [0, -40, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </>
      )}
    </div>
  )
}

