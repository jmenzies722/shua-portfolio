'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { hoverMotion } from '@/lib/motion'
import { cn } from '@/lib/utils'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export default function Card({ children, className, hover = true }: CardProps) {
  return (
    <motion.div
      className={cn('glass-card p-6 sm:p-8', className)}
      whileHover={hover ? hoverMotion.whileHover : undefined}
      whileTap={hover ? hoverMotion.whileTap : undefined}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
