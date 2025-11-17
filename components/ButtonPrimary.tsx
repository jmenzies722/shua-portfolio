'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import Link from 'next/link'

interface ButtonPrimaryProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  disabled?: boolean
  className?: string
  icon?: ReactNode
}

export default function ButtonPrimary({ 
  children, 
  href, 
  onClick, 
  disabled = false,
  className = '',
  icon 
}: ButtonPrimaryProps) {
  const baseClasses = `group relative glass-card px-8 py-4 flex items-center justify-center gap-3 text-white font-medium rounded-xl overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#007AFF]/50 focus:ring-offset-2 focus:ring-offset-[#0a0a0a] disabled:opacity-50 disabled:cursor-not-allowed ${className}`
  
  const content = (
    <>
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {icon && <span className="relative z-10">{icon}</span>}
      </span>
      {!disabled && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#007AFF]/20 via-[#5AC8FA]/20 to-[#007AFF]/20"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        />
      )}
    </>
  )

  if (href) {
    return (
      <motion.div
        whileHover={disabled ? {} : { scale: 1.02, y: -2 }}
        whileTap={disabled ? {} : { scale: 0.98 }}
        transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
      >
        <Link href={href} className={baseClasses}>
          {content}
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.02, y: -2 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
      className={baseClasses}
    >
      {content}
    </motion.button>
  )
}

