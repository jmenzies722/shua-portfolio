'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function NetworkVisualization() {
  const svgRef = useRef<SVGSVGElement>(null)
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    setMounted(true)
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth <= 768)
      const checkMobile = () => setIsMobile(window.innerWidth <= 768)
      window.addEventListener('resize', checkMobile)
      return () => window.removeEventListener('resize', checkMobile)
    }
  }, [])

  if (!mounted) return null

  // Minimalist network flow visualization
  const nodes = [
    { x: 10, y: 50 },
    { x: 30, y: 30 },
    { x: 50, y: 50 },
    { x: 70, y: 30 },
    { x: 90, y: 50 },
  ]

  const connections = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
  ]

  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
      className="w-full max-w-md mx-auto h-px mt-6 mb-2"
    >
      <svg
        ref={svgRef}
        viewBox="0 0 100 100"
        className="w-full h-full"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="networkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(90, 200, 250, 0)" />
            <stop offset="50%" stopColor="rgba(90, 200, 250, 0.3)" />
            <stop offset="100%" stopColor="rgba(90, 200, 250, 0)" />
          </linearGradient>
        </defs>

        {/* Connections */}
        {connections.map(([start, end], i) => (
          <motion.line
            key={`line-${i}`}
            x1={nodes[start].x}
            y1={nodes[start].y}
            x2={nodes[end].x}
            y2={nodes[end].y}
            stroke="url(#networkGradient)"
            strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.4 }}
            transition={{
              duration: 1.5,
              delay: 0.5 + i * 0.2,
              ease: [0.4, 0, 0.2, 1],
            }}
          />
        ))}

        {/* Nodes */}
        {nodes.map((node, i) => (
          <motion.circle
            key={`node-${i}`}
            cx={node.x}
            cy={node.y}
            r="1.5"
            fill="rgba(90, 200, 250, 0.4)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.6 }}
            transition={{
              duration: 0.4,
              delay: 0.8 + i * 0.1,
              ease: [0.4, 0, 0.2, 1],
            }}
          />
        ))}
      </svg>
    </motion.div>
  )
}

