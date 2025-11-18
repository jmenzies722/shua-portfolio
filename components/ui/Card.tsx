'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cardInteraction } from '@/lib/motion'
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
      whileHover={hover ? cardInteraction.whileHover : undefined}
      whileTap={hover ? cardInteraction.whileTap : undefined}
      transition={cardInteraction.transition}
    >
      {children}
    </motion.div>
  )
}
