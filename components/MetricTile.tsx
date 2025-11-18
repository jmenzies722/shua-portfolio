'use client'

import { motion } from 'framer-motion'
import AnimatedNumber from './AnimatedNumber'

interface MetricTileProps {
  value: string | number
  label: string
  delay?: number
}

export default function MetricTile({ value, label, delay = 0 }: MetricTileProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ 
        duration: 0.3, 
        delay,
        ease: [0.4, 0, 0.2, 1] 
      }}
      className="text-center"
    >
      <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
        {typeof value === 'number' ? <AnimatedNumber value={value} /> : value}
      </div>
      <div className="text-sm md:text-base text-white/60">{label}</div>
    </motion.div>
  )
}


