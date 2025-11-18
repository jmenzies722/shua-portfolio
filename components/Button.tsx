'use client'

import { motion, MotionProps } from 'framer-motion'
import { ReactNode } from 'react'
import Link from 'next/link'
import { withTrailingSlash } from '@/lib/utils'

interface ButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  variant?: 'primary' | 'secondary' | 'ghost'
  className?: string
  loading?: boolean
  external?: boolean
}

const baseClasses = 'relative inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#007AFF]/50 focus:ring-offset-2 focus:ring-offset-[#0a0a0a]'

const variantClasses = {
  primary: 'glass-card px-6 py-3 text-white hover:scale-[1.02] hover:-translate-y-0.5',
  secondary: 'bg-white/5 border border-white/10 px-6 py-3 text-white hover:bg-white/10 hover:border-white/20',
  ghost: 'px-4 py-2 text-white/70 hover:text-white hover:bg-white/5',
}

export default function Button({
  children,
  href,
  onClick,
  type = 'button',
  disabled = false,
  variant = 'primary',
  className = '',
  loading = false,
  external = false,
}: ButtonProps) {
  const motionProps: MotionProps = {
    whileHover: disabled || loading ? {} : { scale: 1.02, y: -2 },
    whileTap: disabled || loading ? {} : { scale: 0.98 },
    transition: { duration: 0.15, ease: [0.4, 0, 0.2, 1] },
  }

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`

  if (href) {
    if (external) {
      return (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          {...motionProps}
        >
          {children}
        </motion.a>
      )
    }
    const normalizedHref = withTrailingSlash(href)
    return (
      <motion.div {...motionProps}>
        <Link href={normalizedHref} className={classes}>
          {children}
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={classes}
      {...motionProps}
    >
      {loading && (
        <motion.div
          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
        />
      )}
      {children}
    </motion.button>
  )
}


