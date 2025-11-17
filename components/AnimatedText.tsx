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

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % phrases.length)
    }, isMobile ? 3000 : 2500) // Faster transitions

    return () => clearInterval(interval)
  }, [isMobile])

  return (
    <div className="relative h-[80px] md:h-[100px] lg:h-[110px] overflow-hidden flex items-center">
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
          className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-[1.1] gradient-text absolute inset-0 flex items-center"
          style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}
        >
          {phrases[currentIndex]}
        </motion.h1>
      </AnimatePresence>
    </div>
  )
}

