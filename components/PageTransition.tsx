'use client'

import { ReactNode, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Stable, hardware-accelerated transition
  const transition = {
    duration: 0.2,
    ease: [0.4, 0, 0.2, 1], // Apple-style easing
  }

  if (!isMounted) {
    return <div className="w-full min-h-full">{children}</div>
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={transition}
        style={{ 
          position: 'relative', 
          zIndex: 1,
          width: '100%',
          minHeight: '100%',
          willChange: 'opacity',
        }}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

