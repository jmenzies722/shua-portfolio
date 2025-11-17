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
  disabled = false
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-apple focus:outline-none focus:ring-2 focus:ring-[#007AFF]/50'
  
  const variantClasses = {
    primary: 'glass-card text-white hover:bg-white/[0.05]',
    secondary: 'bg-transparent border border-white/10 text-white hover:border-white/20'
  }
  
  const content = (
    <>
      {icon && <span>{icon}</span>}
      {children}
    </>
  )
  
  if (href) {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Link
          href={href}
          className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        >
          {content}
        </Link>
      </motion.div>
    )
  }
  
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      className={`${baseClasses} ${variantClasses[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {content}
    </motion.button>
  )
}

