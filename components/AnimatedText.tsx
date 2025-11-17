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
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] gradient-text">
        {phrases[0]}
      </h1>
    )
  }

  return (
    <div className="relative min-h-[3rem] sm:min-h-[3.5rem] md:min-h-[4rem] lg:min-h-[4.5rem]">
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
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] gradient-text"
          style={{ 
            whiteSpace: 'normal',
            wordBreak: 'normal',
            overflowWrap: 'break-word',
          }}
        >
          {phrases[currentIndex]}
        </motion.h1>
      </AnimatePresence>
    </div>
  )
}
