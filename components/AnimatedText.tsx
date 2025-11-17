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
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % phrases.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [mounted])

  if (!mounted) {
    return (
      <div className="relative min-h-[80px] md:min-h-[100px] lg:min-h-[120px] overflow-visible flex items-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-[1.1] gradient-text w-full">
          {phrases[0]}
        </h1>
      </div>
    )
  }

  return (
    <div className="relative min-h-[80px] md:min-h-[100px] lg:min-h-[120px] overflow-visible w-full">
      <AnimatePresence mode="wait" initial={false}>
        <motion.h1
          key={currentIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ 
            duration: 0.4,
            ease: [0.4, 0, 0.2, 1]
          }}
          className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-[1.1] gradient-text w-full"
          style={{ 
            whiteSpace: 'normal', 
            wordBreak: 'break-word', 
            overflowWrap: 'break-word',
            hyphens: 'auto',
          }}
        >
          {phrases[currentIndex]}
        </motion.h1>
      </AnimatePresence>
    </div>
  )
}
