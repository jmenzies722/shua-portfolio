'use client'

import { useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface AnimatedNumberProps {
  value: string | number
  duration?: number
  className?: string
}

export default function AnimatedNumber({ value, duration = 1.5, className = '' }: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!isInView) return

    const numericValue = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.]/g, '')) : value
    if (isNaN(numericValue)) {
      setDisplayValue(value as number)
      return
    }

    const startValue = 0
    const endValue = numericValue
    const startTime = Date.now()

    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function (ease-out-cubic)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = startValue + (endValue - startValue) * eased

      setDisplayValue(Math.floor(current))

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setDisplayValue(endValue)
      }
    }

    animate()
  }, [isInView, value, duration])

  return (
    <span ref={ref} className={className}>
      {typeof value === 'string' && value.includes('%')
        ? `${displayValue}%`
        : typeof value === 'string' && value.includes('$')
        ? `$${displayValue.toLocaleString()}`
        : typeof value === 'string' && value.includes('+')
        ? `${displayValue}+`
        : displayValue.toLocaleString()}
    </span>
  )
}

