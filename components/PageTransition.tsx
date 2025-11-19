'use client'

import { ReactNode, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    // Scroll to top when navigating to home
    if (pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [pathname])

  // Ensure content is always visible - only animate on route changes, not initial load
  return (
    <motion.div
      key={pathname || 'home'}
      initial={isMounted ? { opacity: 0 } : { opacity: 1 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: isMounted ? 0.2 : 0,
        ease: [0.4, 0, 0.2, 1],
      }}
      style={{ 
        position: 'relative', 
        zIndex: 1,
        width: '100%',
        minHeight: '100%',
        opacity: 1, // Ensure content is always visible
      }}
      className="w-full"
    >
      {children}
    </motion.div>
  )
}

