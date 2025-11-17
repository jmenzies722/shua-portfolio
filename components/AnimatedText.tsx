'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const phrases = [
  'Building resilient cloud platforms',
  'Scaling serverless infrastructure',
  'Engineering AI-ready platforms',
  'Delivering reliable systems',
]

export default function AnimatedText() {
  const [currentIndex, setCurrentIndex] = useState(0)
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
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % phrases.length)
    }, isMobile ? 3000 : 2500) // Faster transitions

    return () => clearInterval(interval)
  }, [isMobile, mounted])

  return (
    <div className="relative min-h-[80px] md:min-h-[100px] lg:min-h-[110px] overflow-visible flex items-center">
      <AnimatePresence mode="wait">
        <motion.h1
          key={currentIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ 
            duration: isMobile ? 0.2 : 0.4, 
            ease: [0.25, 0.1, 0.25, 1] // Smoother easing
          }}
          className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-[1.1] gradient-text w-full"
          style={{ whiteSpace: 'normal', wordBreak: 'break-word', overflowWrap: 'break-word' }}
        >
          {phrases[currentIndex]}
        </motion.h1>
      </AnimatePresence>
    </div>
  )
}

