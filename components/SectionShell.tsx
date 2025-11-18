'use client'

import { ReactNode, useEffect, useState } from 'react'
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
  const [isMounted, setIsMounted] = useState(false)
  const MotionTag = motion(Tag)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Simple fade-in that always renders (no viewport dependency)
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
      animate={isMounted ? "animate" : "initial"}
      className={cn('space-y-6 w-full', className)}
      style={style}
    >
      {children}
    </MotionTag>
  )
}


