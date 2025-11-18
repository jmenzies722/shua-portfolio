'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface SkillTagProps {
  skill: string
  description?: string
}

export default function SkillTag({ skill, description }: SkillTagProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div className="relative inline-block">
      <motion.span
        className={`pill text-xs sm:text-sm cursor-pointer relative transition-shadow duration-200 ${
          isHovered ? 'shadow-[0_0_12px_rgba(90,200,250,0.3)]' : ''
        }`}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={() => description && setShowTooltip(!showTooltip)}
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
        }}
        whileTap={{ scale: 0.98 }}
      >
        {skill}
      </motion.span>

      {description && (
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 4, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-white/[0.08] backdrop-blur-md border border-white/[0.12] rounded-lg text-xs text-white/80 whitespace-nowrap z-50 pointer-events-none"
              style={{ maxWidth: '200px' }}
            >
              {description}
              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px w-2 h-2 bg-white/[0.08] border-r border-b border-white/[0.12] rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  )
}

