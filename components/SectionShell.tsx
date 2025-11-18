'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/motion'
import { cn } from '@/lib/utils'

type Props = {
  children: ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'section'
}

export default function SectionShell({
  children,
  className,
  delay = 0,
  as: Tag = 'section',
}: Props) {
  const MotionTag = motion(Tag)
  return (
    <MotionTag
      variants={fadeInUp(delay)}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.35, margin: '-80px' }}
      className={cn('space-y-6', className)}
    >
      {children}
    </MotionTag>
  )
}


