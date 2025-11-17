'use client'

import { useState, useEffect } from 'react'

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
    }, 2500)

    return () => clearInterval(interval)
  }, [mounted])

  return (
    <div className="relative min-h-[80px] md:min-h-[100px] lg:min-h-[110px] overflow-visible flex items-center">
      <h1
        key={currentIndex}
        className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-[1.1] gradient-text w-full"
        style={{ 
          whiteSpace: 'normal', 
          wordBreak: 'break-word', 
          overflowWrap: 'break-word',
          opacity: 1,
          transform: 'translateY(0)',
        }}
      >
        {phrases[currentIndex]}
      </h1>
    </div>
  )
}
