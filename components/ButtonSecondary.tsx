'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import Link from 'next/link'

interface ButtonSecondaryProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  disabled?: boolean
  className?: string
  icon?: ReactNode
}

export default function ButtonSecondary({ 
  children, 
  href, 
  onClick, 
  disabled = false,
  className = '',
  icon 
}: ButtonSecondaryProps) {
  const baseClasses = `group relative px-6 py-3 flex items-center justify-center gap-2 text-white/80 hover:text-white font-medium rounded-xl border border-white/20 hover:border-[#007AFF]/40 bg-white/5 hover:bg-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-[#007AFF]/50 focus:ring-offset-2 focus:ring-offset-[#0a0a0a] disabled:opacity-50 disabled:cursor-not-allowed ${className}`
  
  const content = (
    <>
      {children}
      {icon && <span>{icon}</span>}
    </>
  )

  if (href) {
    return (
      <motion.div
        whileHover={disabled ? {} : { scale: 1.02 }}
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
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
      className={baseClasses}
    >
      {content}
    </motion.button>
  )
}


