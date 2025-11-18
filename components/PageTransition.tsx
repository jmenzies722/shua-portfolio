'use client'

import { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  // Stable, hardware-accelerated transition - always renders
  const transition = {
    duration: 0.2,
    ease: [0.4, 0, 0.2, 1], // Apple-style easing
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname || 'home'}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={transition}
        onAnimationComplete={() => {
          // Ensure content is visible after animation
          if (pathname === '/') {
            // Scroll to top when navigating to home
            window.scrollTo({ top: 0, behavior: 'instant' })
          }
        }}
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

