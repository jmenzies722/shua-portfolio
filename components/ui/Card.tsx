import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export default function Card({ children, className = '', hover = true }: CardProps) {
  return (
    <div
      className={`glass-card p-6 md:p-8 ${hover ? 'hover:bg-white/[0.06]' : ''} ${className}`}
      style={{
        opacity: 1,
        transform: 'translateY(0)',
        transition: hover ? 'background 0.2s ease, border-color 0.2s ease' : 'none',
      }}
    >
      {children}
    </div>
  )
}
