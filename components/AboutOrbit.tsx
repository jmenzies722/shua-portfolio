'use client'

import { useState } from 'react'
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
                opacity: { duration: 0.3 },
                scale: { duration: 0.3 },
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
                transition={{ duration: 0.2 }}
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

