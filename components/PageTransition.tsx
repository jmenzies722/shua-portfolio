'use client'

import { ReactNode, useEffect } from 'react'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    // Scroll to top when navigating to home
    if (pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [pathname])

  // Simplified transition - no exit animation to prevent white screen
  return (
    <motion.div
      key={pathname || 'home'}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1],
      }}
      style={{ 
        position: 'relative', 
        zIndex: 1,
        width: '100%',
        minHeight: '100%',
      }}
      className="w-full"
    >
      {children}
    </motion.div>
  )
}

