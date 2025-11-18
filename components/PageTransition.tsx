'use client'

import { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { softEase } from '@/lib/motion'

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.35, ease: softEase } }}
        exit={{ opacity: 0, y: -12, transition: { duration: 0.2, ease: softEase } }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

