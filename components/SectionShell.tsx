'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

type Props = {
  children: ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'section'
  style?: React.CSSProperties
}

export default function SectionShell({
  children,
  className,
  delay = 0,
  as: Tag = 'section',
  style,
}: Props) {
  const MotionTag = motion(Tag)

  // Simple fade-in that always renders immediately (no mount guard)
  const variants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        duration: 0.3,
        delay,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  }

  return (
    <MotionTag
      variants={variants}
      initial="initial"
      animate="animate"
      className={cn('space-y-6 w-full bg-transparent', className)}
      style={{
        ...style,
        overflow: 'visible', // Ensure content is never clipped
        background: 'transparent', // Ensure no section-level backgrounds
      }}
    >
      {children}
    </MotionTag>
  )
}


