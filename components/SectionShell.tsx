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
  return (
    <MotionTag
      variants={fadeInUp(delay)}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.1, margin: '0px' }} // Reduced margin to ensure content renders on mobile
      className={cn('space-y-6 w-full', className)}
      style={style}
    >
      {children}
    </MotionTag>
  )
}


