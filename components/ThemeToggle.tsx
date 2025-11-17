'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from './ThemeProvider'

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  
  // Use try-catch to handle SSR case gracefully
  let theme: 'light' | 'dark' = 'dark'
  let toggleTheme: () => void = () => {}
  
  try {
    const themeContext = useTheme()
    theme = themeContext.theme
    toggleTheme = themeContext.toggleTheme
  } catch (e) {
    // Context not available during SSR, use defaults
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="glass-badge p-3 rounded-xl">
        <Moon className="w-5 h-5 text-[#007AFF]" />
      </div>
    )
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative glass-badge p-3 rounded-xl hover:bg-white/10 dark:hover:bg-white/10 hover:bg-black/10 transition-all duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <motion.div
        animate={{ rotate: theme === 'light' ? 0 : 180 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {theme === 'light' ? (
          <Sun className="w-5 h-5 text-[#007AFF]" />
        ) : (
          <Moon className="w-5 h-5 text-[#007AFF]" />
        )}
      </motion.div>
    </motion.button>
  )
}

