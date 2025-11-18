'use client'

import Link from 'next/link'
import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface ButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  className?: string
  icon?: ReactNode
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

export default function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
  icon,
  type = 'button',
  disabled = false,
}: ButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5ac8fa]/70 disabled:opacity-60 disabled:cursor-not-allowed min-h-[48px] sm:min-h-[52px]'

const variantClasses = {
  primary: 'bg-white text-black hover:bg-white/90',
  secondary: 'border border-white/15 text-white hover:border-white/30',
}

const MotionLink = motion(Link)
const MotionButton = motion.button

  const content = (
    <>
      {icon && <span>{icon}</span>}
      {children}
    </>
  )
  
  if (href) {
    return (
      <MotionLink
        href={href}
        prefetch={true}
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {content}
      </MotionLink>
    )
  }
  
  return (
    <MotionButton
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      whileHover={{ scale: disabled ? 1 : 1.015 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      {content}
    </MotionButton>
  )
}
