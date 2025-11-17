'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Cloud, 
  Code, 
  Database, 
  Server, 
  Zap, 
  Cpu,
  Network,
  GitBranch
} from 'lucide-react'

const icons = [
  { Icon: Cloud, label: 'AWS', color: '#FF9900' },
  { Icon: Code, label: 'Terraform', color: '#7B42BC' },
  { Icon: Server, label: 'Kubernetes', color: '#326CE5' },
  { Icon: Zap, label: 'Lambda', color: '#FF9900' },
  { Icon: Code, label: 'Python', color: '#3776AB' },
  { Icon: Database, label: 'Datadog', color: '#632CA6' },
  { Icon: Cpu, label: 'Infrastructure', color: '#007AFF' },
  { Icon: Network, label: 'Cloud', color: '#5AC8FA' },
]

const radius = 140
const orbitDuration = 20
const mobileOrbitDuration = 12 // Faster on mobile

export default function OrbitIcons() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Use CSS media query to detect mobile - render static on mobile
  const [isMobile, setIsMobile] = useState(true) // Default to mobile to prevent flash

  useEffect(() => {
    if (!mounted) return
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [mounted])

  // On mobile or not mounted, use simpler static layout
  if (!mounted || isMobile) {
    return (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="absolute inset-0 flex items-center justify-center">
          {icons.map(({ Icon, label, color }, index) => {
            const angle = (index / icons.length) * Math.PI * 2
            const x = Math.cos(angle) * (radius * 0.8) // Smaller radius on mobile
            const y = Math.sin(angle) * (radius * 0.8)

            return (
              <div
                key={index}
                className="absolute pointer-events-none"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  opacity: 0.6,
                }}
              >
                <div className="glass-badge p-2 rounded-xl">
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
        animate={{ rotate: isPaused ? 0 : 360 }}
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
                opacity: hoveredIndex === index ? 1 : 0.5,
                scale: hoveredIndex === index ? 1.3 : 1,
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
                className="glass-badge p-2.5 rounded-xl cursor-pointer"
                whileHover={{ scale: 1.1 }}
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
