'use client'

import { motion } from 'framer-motion'

interface GradientFogBackgroundProps {
  fixed?: boolean
}

export default function GradientFogBackground({ fixed = false }: GradientFogBackgroundProps) {
  return (
    <div 
      className={`${fixed ? 'fixed' : 'absolute'} inset-0 overflow-hidden pointer-events-none -z-10`}
    >
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1c] to-[#0a0a0a]" />
      
      {/* Animated gradient fog */}
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
    </div>
  )
}

