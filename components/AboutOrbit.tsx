'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Code2, 
  Cloud, 
  Zap, 
  Shield,
  Rocket,
  Settings,
  GitBranch,
  Layers
} from 'lucide-react'

const icons = [
  { Icon: Code2, label: 'Code', color: '#007AFF' },
  { Icon: Cloud, label: 'Cloud', color: '#5AC8FA' },
  { Icon: Zap, label: 'Automation', color: '#FFD700' },
  { Icon: Shield, label: 'Security', color: '#00FF88' },
  { Icon: Rocket, label: 'Performance', color: '#FF6B6B' },
  { Icon: Settings, label: 'DevOps', color: '#9B59B6' },
  { Icon: GitBranch, label: 'CI/CD', color: '#3498DB' },
  { Icon: Layers, label: 'Infrastructure', color: '#E74C3C' },
]

const radius = 120
const orbitDuration = 25

export default function AboutOrbit() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(true) // Default to mobile

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [mounted])

  // On mobile or not mounted, use static layout (no animation)
  if (!mounted || isMobile) {
    return (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="absolute inset-0 flex items-center justify-center">
          {icons.map(({ Icon, label, color }, index) => {
            const angle = (index / icons.length) * Math.PI * 2
            const x = Math.cos(angle) * (radius * 0.7) // Smaller radius on mobile
            const y = Math.sin(angle) * (radius * 0.7)

            return (
              <div
                key={index}
                className="absolute pointer-events-none"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  opacity: 0.5,
                }}
              >
                <div className="glass-badge p-1.5 rounded-lg">
                  <Icon className="w-3 h-3" style={{ color }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // Desktop: Full orbit animation
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ rotate: isPaused ? 0 : -360 }}
        transition={{
          duration: orbitDuration,
          repeat: Infinity,
          ease: 'linear',
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {icons.map(({ Icon, label, color }, index) => {
          const angle = (index / icons.length) * Math.PI * 2
          const x = Math.cos(angle) * radius
          const y = Math.sin(angle) * radius

          return (
            <motion.div
              key={index}
              className="absolute pointer-events-auto"
              style={{
                left: '50%',
                top: '50%',
                x: x,
                y: y,
                transform: 'translate(-50%, -50%)',
              }}
              animate={{
                opacity: hoveredIndex === index ? 1 : 0.4,
                scale: hoveredIndex === index ? 1.4 : 0.9,
              }}
              transition={{
                opacity: { duration: 0.15 },
                scale: { duration: 0.15 },
              }}
              onHoverStart={() => {
                setHoveredIndex(index)
                setIsPaused(true)
              }}
              onHoverEnd={() => {
                setHoveredIndex(null)
                setIsPaused(false)
              }}
            >
              <motion.div
                className="glass-badge p-2 rounded-lg cursor-pointer backdrop-blur-xl"
                whileHover={{ scale: 1.15, rotate: 5 }}
                transition={{ duration: 0.15 }}
              >
                <Icon className="w-4 h-4" style={{ color }} />
              </motion.div>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}

